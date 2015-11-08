Router.configure({ layoutTemplate: 'layout'});

Router.route('/', {name: "welcome"});

Router.route('/tasks', {name: "tasks"});

Router.route('/profile', {name: "profile"});