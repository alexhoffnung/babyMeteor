Router.configure({ layoutTemplate: 'layout'});

Router.configure({ layoutTemplate: 'layout-user'});

//Simple Routes Config.

Router.route('/gotbaby', {
    layoutTemplate: 'layout-user'
});

Router.route('/meals', {name: "meals"});

Router.route('/diapers', {name: "diapers"});

Router.route('/sleep', {name: "sleep"});

Router.route('/', {name: "welcome"});

Router.route('/tasks', {name: "tasks"});

Router.route('/profile', {name: "profile"});

Router.route('/dynamic', {
  name: 'dynamic',
  template: 'dynamicFields'
});