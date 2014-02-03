// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Players = new Meteor.Collection("players");

if (Meteor.isClient) {
  Template.leaderboard.players = function () {
    return Players.find({}, {sort: {score: -1, name: 1}});
  };

  Template.leaderboard.selected_name = function () {
    var player = Players.findOne(Session.get("selected_player"));
    return player && player.name;
  };

  Template.player.selected = function () {
    return Session.equals("selected_player", this._id) ? "selected" : '';
  };

  Template.leaderboard.events({
    'click input.inc3': function () {
      Players.update(Session.get("selected_player"), {$inc: {score: 3}});
    },
    'click input.inc1': function () {
    Players.update(Session.get("selected_player"), {$inc: {score: 1}});
    },
    'click input.reset': function () {
    Players.update(Session.get("selected_player"), {score: 0});
    },
      'click #insert': function () {
      var n = $("input[name=name]").val();
      if (n != "") {
        Players.insert({name: n, score: 0});
        $("input[name=name]").val('');
      }
      // return false so the page will not reload
      return false;
    },
  });

  Template.player.events({
    'click': function () {
      Session.set("selected_player", this._id);
    }
  });
}
