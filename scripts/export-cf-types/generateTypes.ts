import {
  CFDefinitionsBuilder,
  renderTypeGeneric,
  TypeGuardRenderer,
  V10ContentTypeRenderer,
} from 'cf-content-types-generator';
import { resolve } from 'path';

// Read the contentful export data
const contentfulDataPath = process.argv[2];
if (!contentfulDataPath) {
  throw new Error('Please specify the path to contentful export json as first argument');
}
if (!contentfulDataPath.endsWith('.json')) {
  throw new Error(`Expected a path to JSON, got: ${contentfulDataPath}`);
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const contentfulData = require(resolve(contentfulDataPath));

class GlobalRefBuilder extends V10ContentTypeRenderer {
  override renderEntry(...args: Parameters<V10ContentTypeRenderer['renderEntry']>) {
    const [contentType, context] = args;

    context.imports.add({
      moduleSpecifier: 'contentful',
      namedImports: ['Entry'],
      isTypeOnly: true,
    });

    return {
      name: context.moduleName(contentType.sys.id),
      isExported: true,
      type: renderTypeGeneric(
        'Entry',
        context.moduleSkeletonName(contentType.sys.id),
        `'WITHOUT_UNRESOLVABLE_LINKS'`
      ),
    };
  }
}

// Generate the definitions
const builder = new CFDefinitionsBuilder([new GlobalRefBuilder(), new TypeGuardRenderer()]);
console.log(builder.appendTypes(contentfulData.contentTypes).toString());
