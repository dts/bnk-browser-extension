import Vue from 'vue';
import fs from 'fs';
import path from 'path';
import 'regenerator-runtime';

function autoloadComponents() {
  const componentDirectory = path.resolve(__dirname,'../source/popup/components/')
  const components = fs.readdirSync(componentDirectory)

  for(let component of components) {
    const componentName = component.replace(/^\.\//, '').replace(/\.\w+$/, '');
    const module = require(path.resolve(componentDirectory,component))
    
    Vue.component(componentName,module.default || module);
  }
}

autoloadComponents();
