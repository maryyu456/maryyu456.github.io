import $ from "jquery";
import "../vital-ui-kit.css";
// var avatar = document.querySelectorAll(".sg-avatar");

// NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

// avatar.forEach
let isDraging = false;
let dragTarget;
let firstTime = true;
let elementFirstOffset;
let firstMousePosition;

$(document).ready(function() {
  $(".user").each(function(el) {
    this.addEventListener("click", function(e) {
      console.log(this);
      this.style.scale = 1.5;
      this.addEventListener("mouseleave", function() {
        this.style.scale = 1;
      });
    });
  });

  $(".userslist").on("mousedown", "div", function(e) {
    firstMousePosition = {
      X: e.clientX - this.offsetLeft,
      Y: e.clientY - this.offsetTop
    };
    e.preventDefault();
    isDraging = true;
    dragTarget = this;
    $(this).addClass("is-draging");
    firstTime = true;
  });

  $("body").on("mousemove", function(event) {
    if (isDraging) {
      if (firstTime) {
        elementFirstOffset = {
          X: $(dragTarget).offset().left,
          Y: $(dragTarget).offset().top
        };
        firstTime = !firstTime;
      }
      const mPos = {
        X: event.clientX - elementFirstOffset.X - firstMousePosition.X,
        Y: event.clientY - elementFirstOffset.Y - firstMousePosition.Y
      };
      $(dragTarget).css(
        "transform",
        `translateX(${mPos.X}px) translateY(${mPos.Y}px)`
      );
    }
    //console.log(event.clientX, event.clientY);
  });

  $("body").on("mouseup", function() {
    $(dragTarget).removeClass("is-draging");
    $(dragTarget).css("transform", "");
    isDraging = false;
    dragTarget = null;
    firstMousePosition = null;
  });
});
