export default function (plop) {
  // controller generator
  plop.setGenerator("UI Component", {
    description: "UI Component Generator",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Please enter a name to generate the UI Component",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/main/webpack/components/{{dashCase name}}/docs/{{dashCase name}}.stories.js",
        templateFile: "plop-templates/component/doc/component.stories.js",
      },
      {
        type: "add",
        path: "src/main/webpack/components/{{dashCase name}}/htl/{{dashCase name}}.htl",
        templateFile: "plop-templates/component/htl/component.htl",
      },
      {
        type: "add",
        path: "src/main/webpack/components/{{dashCase name}}/{{dashCase name}}.hbs",
        templateFile: "plop-templates/component/component.hbs",
      },
      {
        type: "add",
        path: "src/main/webpack/components/{{dashCase name}}/{{dashCase name}}.js",
        templateFile: "plop-templates/component/component.js",
      },
      {
        type: "add",
        path: "src/main/webpack/components/{{dashCase name}}/{{dashCase name}}.scss",
        templateFile: "plop-templates/component/component.scss",
      },
      {
        type: "modify",
        path: "src/main/webpack/site/main.scss",
        pattern:
          /(\/\/ import core component end \| do not remove see, plopfile\.mjs)/,
        template:
          "@import './../components/{{dashCase name}}/{{dashCase name}}';\n$1",
      },
    ],
  });

  plop.setGenerator("React Component", {
    description: "React Component Generator",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Please enter a name to generate the React Component",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/main/webpack/components/{{dashCase name}}/docs/{{dashCase name}}.stories.js",
        templateFile: "plop-templates/react-cmp/doc/component.stories.js",
      },
      {
        type: "add",
        path: "src/main/webpack/components/{{dashCase name}}/{{dashCase name}}.hbs",
        templateFile: "plop-templates/react-cmp/component.hbs",
      },
      {
        type: "add",
        path: "src/main/webpack/components/{{dashCase name}}/{{dashCase name}}.js",
        templateFile: "plop-templates/react-cmp/component.js",
      },
      {
        type: "add",
        path: "src/main/webpack/components/{{dashCase name}}/{{pascalCase name}}.jsx",
        templateFile: "plop-templates/react-cmp/Component.jsx",
      },
      {
        type: "add",
        path: "src/main/webpack/components/{{dashCase name}}/{{dashCase name}}.scss",
        templateFile: "plop-templates/react-cmp/component.scss",
      },
      {
        type: "modify",
        path: "src/main/webpack/site/main.scss",
        pattern:
          /(\/\/ import core component end \| do not remove see, plopfile\.mjs)/,
        template:
          "@import './../components/{{dashCase name}}/{{dashCase name}}';\n$1",
      }
    ],
  });
}
