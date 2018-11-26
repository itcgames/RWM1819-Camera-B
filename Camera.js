class Camera
{
  /**
   * Constructor for the camera object
   */
  constructor()
  {
    var canvas = document.getElementById('mycanvas');
    this.width = canvas.width;

    this.pos = { x: 0, y: 0};

    this.zoomScale = 1;
    this.zoomSpeed = 0.01;
    this.zoomNew = 0;
    this.zooming = false;
    this.zoomMax = 2;
    this.zoomMin = 0.5;

    //flags
    this.smoothZoom = false;

  }

  /**
   * Returns the current zoom level
   */
  getZoom(){
    return this.zoomScale;
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

  update(trackPos)
  {
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

  /**
   * Transforms the canvas according to the camera's position
   * @param  {canvas} canvas
   * @param  {context} ctx
   */
  draw(canvas, ctx)
  {
    ctx.setTransform(
      this.zoomScale,             // Horizontal Scale
      0,                          // Horizontal Scew
      0,                          // Vertical Scew
      this.zoomScale,             // Vertical Scale
      -this.zoomScale*this.pos.x, // Horizontal Move
      -this.zoomScale*this.pos.y, // Vertical Move
      );
  }
}
