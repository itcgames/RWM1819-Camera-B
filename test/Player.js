class Player
{
  /**
   * constructor of the Player object.
   */
  constructor(x, y, size)
  {
    this.pos = {
      x: x,
      y: y,
    };
    this.size = size;

    this.speed = 5;
  }


  /**
  * Updates the Player object
  */
  update()
  {
    // Move character
  }

  /**
   * Draws the player
   * @param {canvas} canvas 
   * @param {context} ctx 
   * @param {float} deltaTime 
   */
  draw(canvas, ctx, deltaTime)
  {
    ctx.fillStyle = "#FFFFFF";

    ctx.fillRect(
      this.pos.x,
      this.pos.y,
      this.size,
      this.size,
    );
  }

  /**
   * Moves the player in the given direction
   * @param {num} x X-direction
   * @param {num} y Y-direction
   */
  move(x,y)
  {
    this.pos.x += x*this.speed;
    this.pos.y += y*this.speed;
  }

  /**
   * Instantly warps player to new location
   * @param {number} x x coordinate
   * @param {number} y y coordinate
   */
  warp(x,y)
  {
    this.pos.x = x;
    this.pos.y = y;
  }
} 