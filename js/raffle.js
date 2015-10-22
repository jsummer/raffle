(function (win, $) {


  function Raffle(settings) {

    this.settings = settings;

    this.init(settings);

  };

  Raffle.prototype = {
    init: function (data) {

      var sectors = this.createSector(data);
      this.addEvent(data, sectors);

    },
    createSector: function (data) {

      var length = data.length;
      var sectors = [];
      var $sectorContainer = $(".raffle ul");

      $sectorContainer.html("");

      var deg = 360 / length;
      var startDeg;
      var endDeg;
      var _deg_ = 0;

      for (var i = 0; i < length; i++) {
        $sectorContainer.append('<li class="sector sector' + i + '"><span>' + data[i].name + '</span></li>');

        $(".sector" + i).css({
          'transform': 'rotate(' + (0 + _deg_) + 'deg) skewX(' + (90 - deg) + 'deg)'
        });
        startDeg = 0 + _deg_;
        endDeg = 0 + _deg_ + deg;
        $(".sector span").css({
          'transform': 'skewX(-' + (90 - deg) + 'deg) rotate(-' + (90 - deg / 2) + 'deg)'
        });
        sectors.push({
          'start': (startDeg + 1),
          'end': (endDeg - 1),
          'probability': data[i].probability
        });
        _deg_ += deg;

      }
      return sectors;
    },
    addEvent: function (data, sectors) {
      var _this = this;

      $(".raffle-btn button").on("click", function () {
        var sectorIndex = _this.getRandom(sectors);
        console.log("index:" + sectorIndex);
        var min = sectors[sectorIndex].start;
        var max = sectors[sectorIndex].end;

        var randDeg = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log(min + "," + max);
        console.log("randDeg:" + randDeg);

        $(".raffle-btn").css({
          'transform': 'rotate(' + (360 * 5 + randDeg) + 'deg)',
          '-webkit-transform': 'rotate(' + (360 * 5 + randDeg - 90) + 'deg)',
          'transition':'4s'
        });



        setTimeout(function () {
          alert(data[sectorIndex].name);
          $(".raffle-btn").css({
          'transform': 'rotate(0deg)',
          '-webkit-transform': 'rotate(0deg)',
          'transition':'0s'
        });
        }, 4000);


      });
      
      $(".doorr .doork-nob").click(function(){
        $(".doorr").addClass("openr");
      });
      
      $(".doorl .doork-nob").click(function(){
        $(".doorl").addClass("openl");
      });
      
    },
    getRandom: function (data) {
      var proSum = 0;
      var proArr = [];
      data.map(function (sector) {
        proArr.push(parseInt(sector.probability));
        proSum += parseInt(sector.probability);

      });

      for (var i = 0; i < proArr.length; i++) {
        var randNum = Math.floor((Math.random() * proSum) + 1);

        if (randNum <= proArr[i]) {
          return i;
        } else {
          proSum -= proArr[i];

        }
      }

    }
  };

  win.Raffle = Raffle;

})(window, jQuery);