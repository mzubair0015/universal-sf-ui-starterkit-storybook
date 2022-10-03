export default function (plop) {
  // controller generator
  plop.setGenerator("controller", {
    description: "application controller logic",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Please enter a name to generate the Custom Component",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/main/webpack/core-components/{{dashCase name}}/docs/{{dashCase name}}.stories.js",
        templateFile: "plop-templates/component.stories.js",
      },
      {
        type: "add",
        path: "src/main/webpack/core-components/{{dashCase name}}/scss/styles/_default.scss",
        templateFile: "plop-templates/default/_default.scss",
      },
      {
        type: "add",
        path: "src/main/webpack/core-components/{{dashCase name}}/scss/{{dashCase name}}.scss",
        templateFile: "plop-templates/component.scss",
      },
      {
        type: "add",
        path: "src/main/webpack/core-components/{{dashCase name}}/{{dashCase name}}.hbs",
        templateFile: "plop-templates/component.hbs",
      },

      {
        type: "modify",
        path: "src/main/webpack/site/core-components/sass/main.scss",
        pattern: /(\/\/ import core component end)/,
        template:
          "@import '../../../core-components/{{dashCase name}}/scss/{{dashCase name}}.scss';\n$1",
      },
    ],
  });
}
