class Schedule {
    /**
     * Creates a possible schedule for the user of fixed times
     * @param title string name of scheduled
     * @param ranking int representing the ranking in relation to other schedules
     * @param events array of HardEvent
     */
    constructor(title, ranking, events) {
      this.title = title;
      this.ranking = ranking;
      this.events = events;
    }

  toString() {
      var result = "Title: " + this.title + "\n" + "Ranking: " + this.ranking + "\n Events:\n";
      for (var i = 0; i < this.events.length; i++) {
          result += "\nEvent " + i + "\n";
          result += this.events[i].toString();
      }

      return result;
  }
};



module.exports = Schedule;
