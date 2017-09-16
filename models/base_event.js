class BaseEvent {
  constructor(title, type, description, location) {
      this.title = title;
      this.type = type;
      this.description = description;
      this.location = location;
  }

  toString() {
      var result = "Title: " + this.title + "\n" + "Type: " + this.type + "\n";
      if ( this.description ) {
          result += "Description: " + this.description + "\n";
      }

      if ( this.location ) {
          result += "Location: " + this.location;
      }

      return result;
  }
};



module.exports = BaseEvent;
