import _ from 'lodash';

export default {
  install(app) {
    // Add base components
    const baseComponents = require.context('../components/base', false, /[A-Za-a0-9-_,\s]+\.vue$/i);
    baseComponents.keys().forEach((fileName) => {
      const componentName = _.upperFirst(
        _.camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')),
      );
      const componentConfig = baseComponents(fileName);
      app.component(
        `Base${componentName}`,
        componentConfig.default || componentConfig,
      );
    });

    // Add components
    const components = require.context('../components', false, /[A-Za-a0-9-_,\s]+\.vue$/i);
    components.keys().forEach((fileName) => {
      const componentName = _.upperFirst(
        _.camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')),
      );
      const componentConfig = components(fileName);
      app.component(
        componentName,
        componentConfig.default || componentConfig,
      );
    });
  },
};
