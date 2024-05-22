const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const Handlebars = require('handlebars');

Handlebars.registerHelper('capitalize', function (str) {
  if (typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
});

module.exports = (plop) => {
  plop.setHelper('capitalize', function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  });

  // Custom action type for creating a new NestJS service
  plop.setActionType('nest-new', function (answers) {
    return new Promise((resolve, reject) => {
      const serviceName = answers.serviceName;
      const appsDirectory = path.join(__dirname, 'apps/');
      const serviceDirectory = path.join(appsDirectory, `${serviceName}-service`);

      if (fs.existsSync(serviceDirectory)) {
        console.log(`Service ${serviceName} already exists. Skipping...`);
        resolve();
        return;
      }

      exec(`nest new ${serviceName}-service -p npm`, { cwd: appsDirectory }, (error) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          reject(error);
        } else {
          console.log(`Nest service created successfully`);

          // Run npm install dep
          exec(`npm install -D @nestjs/swagger @nestjs/event-emitter @nestjs/typeorm`, { cwd: serviceDirectory }, (installError) => {
            if (installError) {
              console.error(`Error installing dep Dev: ${installError.message}`);
              reject(installError);
            } else {
              console.log(`dep Dev installed successfully`);
              resolve();
            }
          });

          exec(
            `npm install ../../packages/types ../../packages/logger ../../packages/config ../../packages/database ../../packages/auth`,
            { cwd: serviceDirectory },
            (installError) => {
              if (installError) {
                console.error(`Error installing dep: ${installError.message}`);
                reject(installError);
              } else {
                console.log(`dep installed successfully`);
                resolve();
              }
            },
          );
        }
      });
    });
  });

  plop.setGenerator('createNestService', {
    description: 'Create the project structure',
    prompts: [
      {
        type: 'input',
        name: 'serviceName',
        message: 'Enter the name of the service:',
        default: 'order',
      },
    ],
    actions: [
      {
        type: 'nest-new',
      },
      {
        type: 'add',
        path: 'apps/{{serviceName}}-service/src/app/app.constants.ts',
        templateFile: 'packages/templates/app.constants.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'apps/{{serviceName}}-service/src/app/domain/domain.module.ts',
        templateFile: 'packages/templates/domain/domain.module.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'apps/{{serviceName}}-service/src/app/domain/{{serviceName}}/controllers/{{serviceName}}.controller.ts',
        templateFile: 'packages/templates/domain/root/controller/root.controller.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'apps/{{serviceName}}-service/src/app/domain/{{serviceName}}/dto/{{serviceName}}.dto.ts',
        templateFile: 'packages/templates/domain/root/dto/root.dto.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'apps/{{serviceName}}-service/src/app/domain/{{serviceName}}/entity/{{serviceName}}.entity.ts',
        templateFile: 'packages/templates/domain/root/entity/root.entity.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'apps/{{serviceName}}-service/src/app/domain/{{serviceName}}/services/{{serviceName}}.service.ts',
        templateFile: 'packages/templates/domain/root/services/root.service.hbs',
        skipIfExists: true,
      },
    ],
  });
};
