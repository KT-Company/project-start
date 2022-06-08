export function createCanvas(){
    let canvas = document.createElement('canvas')

    canvas.style.cssText = 'width:100vw;height:100vh;'
    
    document.body.append(canvas)

    return canvas
}
