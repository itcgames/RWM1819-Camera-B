class Camera
{
  /**
   * Constructor for the camera object
   */
  constructor(x,y,w,h, wMax, hMax)
  {
    var canvas = document.getElementById('mycanvas');
    this.width = canvas.width;

    this.pos = { x: x, y: y};
    this.size = {
      w: w,
      h: h,
    };
    this.bounds = {
      x: 0,
      y: 0,
      w: w,
      h: h,
    };

    this.zoomScale = 1;
    this.zoomSpeed = 0.01;
    this.zoomNew = 0;
    this.zooming = false;
    this.zoomMax = 2;
    this.zoomMin = 0.5;

    this.panSpeed = {
      x: 2,
      y: 2,
    };
    this.panNew = {
      x: 0,
      y: 0,
    };
    this.panning = false;
  }

  /**
   * Sets the zoom level
   * @param {number} val New zoom level
   */
  setZoom(val){
    this.zooming = false;
    this.zoomScale = val;
  }

  /**
   * 
   * @param {number} val end zoom
   */
  zoomTo(val)
  {
    this.zoomNew = val;
    this.zooming = true;
  }

  /**
   * Zooms the camera by a set amount
   * @param {number} val percentage zoom
   */
  zoomBy(val)
  {
    this.zooming = false;

    val *= 0.1;

    console.log(this.zoomScale + val);

    this.zoomScale += val;
  }

  /**
   * Pan in a direction by a set distance
   * @param {number} x x direction
   * @param {number} y y direction
   */
  pan(x,y)
  {
    this.pos.x += x;
    this.pos.y += y;
    this.panning = false;
  }

  /**
   * Pan to a new location over a number of frames
   * @param {number} x x coordinate
   * @param {number} y y coordinate
   */
  panTo(x,y)
  {
    console.log("panTo");
    this.panNew.x = x+this.pos.x-(this.size.w/2);
    this.panNew.y = y+this.pos.y-(this.size.h/2);

    this.panning = true;
  }

  update(trackPos)
  {
    // Zoom logic
    if(this.zoomScale > this.zoomMax){
      this.zoomScale = this.zoomMax;
      this.zooming = false;
    }
    else if (this.zoomScale < this.zoomMin){
      this.zoomScale = this.zoomMin;
      this.zooming = false;
    }

    if(this.zooming){
      if(this.zoomScale > this.zoomNew){
        this.zoomScale -= this.zoomSpeed;
      }
      if(this.zoomScale < this.zoomNew){
        this.zoomScale += this.zoomSpeed;
      }
      if(Math.abs(this.zoomScale - this.zoomNew) < this.zoomSpeed){
        this.zoomScale = this.zoomNew;
        this.zooming = false;
      }
    }

    // Pan logic
    if(this.pos.x > this.bounds.x + this.bounds.w){
      this.pos.x = this.bounds.x + this.bounds.w;
      this.panning = false;
    }
    else if (this.pos.x < this.bounds.x){
      this.pos.x = this.bounds.x;
      this.panning = false;
    }
    else if(this.pos.y > this.bounds.y + this.bounds.h){
      this.pos.y = this.bounds.y + this.bounds.h;
      this.panning = false;
    } 
    else if (this.pos.y < this.bounds.y){
      this.pos.y = this.bounds.y;
      this.panning = false;
    }

    if(this.panning)
    {
      console.log("PANNING");
      if(this.pos.x > this.panNew.x){
        this.pos.x -= this.panSpeed.x;
      }
      else if(this.pos.x < this.panNew.x){
        this.pos.x += this.panSpeed.x;
      }
      if(this.pos.y > this.panNew.y){
        this.pos.y -= this.panSpeed.y;
      }
      else if(this.pos.y < this.panNew.y){
        this.pos.y += this.panSpeed.y;
      }
      if(Math.abs(this.pos.x - this.panNew.x) < this.panSpeed.x){
        this.pos.x = this.panNew.x;
      }
      if(Math.abs(this.pos.y - this.panNew.y) < this.panSpeed.y){
        this.pos.y = this.panNew.y;
      }
      if(this.pos.x === this.panNew.x && this.pos.y === this.panNew.y){
        this.panning = false;
      }
      
      console.log(this.pos);
      console.log(this.panNew);
    }
  }

  /**
   * Transforms the canvas according to the camera's position
   * @param  {canvas} canvas
   * @param  {context} ctx
   */
  draw(canvas, ctx) {
    ctx.setTransform(
      this.zoomScale,             // Horizontal Scale
      0,                          // Horizontal Skew
      0,                          // Vertical Skew
      this.zoomScale,             // Vertical Scale
      -this.zoomScale*this.pos.x, // Horizontal Move
      -this.zoomScale*this.pos.y, // Vertical Move
      );
  }
}
