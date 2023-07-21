const refAnchor = '$ref';

export function findAllOpenApiRelatedComponents(body: string, componentKey: string): string {
  componentKey = removeComponentsSchemasPrefix(componentKey);

  const openapi: ComponentsMap = JSON.parse(body);

  const componentBody = openapi.components.schemas[componentKey];
  if (!componentBody) {
    throw Error('Could not find component: ' + componentKey);
  }

  const objectList = [];
  objectList.push({ [componentKey]: componentBody });
  objectList.push(...collectRelatedComponents(openapi.components.schemas, componentBody));

  objectList.forEach(i => {
    const [left, right] = Object.entries(i)[0];
    resultMap.components.schemas[left] = right;
  });

  return JSON.stringify(resultMap, null, 2);
}

function isLiteralObject(a: { constructor: ObjectConstructor; }) {
  return (!!a) && (a.constructor === Object);
};

function findRefs(object: SchemaPair): any[] {
  const result: any[] = [];
  for (const property in object) {
    const body = object[property];
    if (property === refAnchor) {
      result.push(body);
    }
    if (isLiteralObject(body)) {
      result.push(...findRefs(body));
    }
    if (Array.isArray(body)) {
      for (const child of body) {
        result.push(...findRefs(child));
      }
    }
  }
  return result;
}

function removeComponentsSchemasPrefix(text: string): string {
  return text.replace('#/components/schemas/', '');
}

function trimComponentPath(items: any[]) {
  return items.map(removeComponentsSchemasPrefix);
}

function collectRelatedComponents(schemas: SchemaPair, object: any): SchemaPair[] {
  const result: SchemaPair[] = [];
  const childComponents = trimComponentPath(findRefs(object));

  if (!childComponents) {
    return result;
  }

  for (const childComponent of childComponents) {
    const childComponentBody = schemas[childComponent];
    if (!childComponentBody) {
      throw Error('Could not find child component: ' + childComponent);
    }

    result.push({ [childComponent]: childComponentBody });
    result.push(...collectRelatedComponents(schemas, childComponentBody));
  }

  return result;
}

type SchemaPair = {
  [x: string]: any;
};

type ComponentsMap = {
  components: {
    schemas: SchemaPair
  }
};

const resultMap: ComponentsMap = {
  components: {
    schemas: new Map<string, any>()
  }
};
