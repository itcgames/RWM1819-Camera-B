class Camera
{

  constructor(x,y,w,h) {

    // Current position of the camera (top-left corner)
    this.pos = {
      x: x,
      y: y
    };
    // Size of the camera window
    this.size = {
      w: w,
      h: h,
    };
    this.origin = {
      x: x + w/2,
      y: y + h/2,
    };
    // The area the camera is confined to
    this.bounds = {
      x: 0,
      y: 0,
      w: 2000,
      h: 2000,
    };

    // Zoom variables
    this.zoomScale = 1;
    this.zoomSpeed = 0.01;
    this.zoomNew = 0;
    this.zooming = false;
    this.zoomMax = 2;
    this.zoomMin = 0.5;

    // Pan variables
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
   * Defines the area the camera can move in
   * @param x default 0
   * @param y default 0
   * @param maxW max width, default 2000
   * @param maxH max height, default 2000
   */
  setBounds(x,y,maxW,maxH){
    this.bounds = {
      x: x,
      y: y,
      w: maxW,
      h: maxH,
    };
  }


  /**
   * Translates coordinates of the game world to their relative camera
   * coordinates
   * @param {number} x camera x-coordinate
   * @param {number} x camera y-coordinate
   * @returns {{x: number, y: number}} world coordinates
   */
  cameraToWorld(x,y){
    return {
      x: x + (this.pos.x-this.size.w/2),
      y: y + (this.pos.y-this.size.h/2),
    };
  }

  /**
   * Translates coordinates of the camera to their relative world coordinates
   * @param {number} x world x-coordinate
   * @param {number} x world y-coordinate
   * @returns {{x: number, y: number}} camera coordinates
   */
  worldToCamera(x,y){
    return {
      x: x - (this.pos.x-this.size.w/2),
      y: y - (this.pos.y-this.size.h/2),
    };
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
   * @param {number} x x coordinate (world)
   * @param {number} y y coordinate (world)
   */
  panTo(x,y) {
    console.log("panTo");

    this.panNew.x = x;
    this.panNew.y = y;

    this.panning = true;
  }

  /**
   * Updates the camera's zoom
   */
  zoomUpdate(){
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
  }


  panUpdate(){
    // Pan logic
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


  follow(x,y){
    if(this.panning === false){

      this.pos.x += (x - this.pos.x)*0.8;
      this.pos.y += (y - this.pos.y)*0.8;

      console.log(this.pos);
    }
  }

  update()
  {
    this.zoomUpdate();
    this.panUpdate();
    this.checkBounds();
  }

  checkBounds(){
    const topLeft = {
      x: this.pos.x - (this.size.w / 2),
      y: this.pos.y - (this.size.h / 2),
    };

    if (topLeft.x < this.bounds.x){
      this.pos.x = this.bounds.x + (this.size.w/2);
    }
    if (topLeft.x + this.size.w > this.bounds.x + this.bounds.w){
      this.pos.x = this.bounds.x + this.bounds.w - (this.size.w/2);
    }

    if (topLeft.y < this.bounds.y){
      this.pos.y = this.bounds.y + (this.size.h/2);
    }
    if (topLeft.y + this.size.h > this.bounds.y + this.bounds.h){
      this.pos.y = this.bounds.y + this.bounds.h - (this.size.h/2);
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
      -this.zoomScale*(this.pos.x-this.size.w/2), // Horizontal Move
      -this.zoomScale*(this.pos.y-this.size.h/2), // Vertical Move
      );
  }
}
