function Task(name) {
  this.name = name;
}

function TaskViewModel() {
  var self = this;

  self.names = ko.observableArray([new Task("afwassen"), new Task("slapen")]);
}

ko.applyBindings(new TaskViewModel());
