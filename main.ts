namespace SpriteKind {
    export const Clone_Like = SpriteKind.create()
    export const Ball = SpriteKind.create()
    export const Booth = SpriteKind.create()
    export const Mouse = SpriteKind.create()
    export const Crosshair = SpriteKind.create()
    export const Moon = SpriteKind.create()
    export const StatusBar = SpriteKind.create()
    export const Text = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let spr of sprites2) {
        if (coder.overlapsWith(spr)) {
            if (spr.kind() == SpriteKind.Enemy) {
                sprites.destroy(spr, effects.ashes, 500)
            } else if (spr.kind() == SpriteKind.Clone_Like) {
                info.changeLifeBy(1)
            } else {
            	
            }
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite = sprites.create(assets.image`Clone-ish`, SpriteKind.Clone_Like)
    sprites2.push(mySprite)
})
sprites.onCreated(SpriteKind.Clone_Like, function (sprite) {
    sprite.setStayInScreen(true)
    sprite.setPosition(coder.x, coder.y)
    pause(1000)
    if (Math.percentChance(50)) {
        sprite.setKind(SpriteKind.Enemy)
        sprite.follow(coder, 50)
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    pauseUntil(() => !(otherSprite.overlapsWith(sprite)))
})
info.onLifeZero(function () {
    game.gameOver(false)
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    info.changeScoreBy(1)
    console.logValue("Enemy", sprites.allOfKind(SpriteKind.Enemy))
    if (sprites.allOfKind(SpriteKind.Enemy).length < 1) {
        if (info.score() >= 10) {
            game.gameOver(true)
        } else {
            game.setGameOverPlayable(false, music.createSoundEffect(WaveShape.Noise, 5000, 1, 255, 0, 5000, SoundExpressionEffect.None, InterpolationCurve.Linear), false)
            game.setGameOverMessage(false, "Nice Try!")
            game.gameOver(false)
        }
    }
})
let mySprite: Sprite = null
let coder: Sprite = null
let sprites2: Sprite[] = []
music.setVolume(255)
info.setLife(10)
scene.setBackgroundColor(13)
sprites2 = []
coder = sprites.create(assets.image`coder`, SpriteKind.Player)
coder.scale = 2
controller.moveSprite(coder, 100, 100)
coder.setStayInScreen(true)
game.showLongText("I have to make sprites!", DialogLayout.Bottom)
game.showLongText("But I haven't tested their AI's though...", DialogLayout.Bottom)
game.showLongText("If one goes rogue, I might as well delete it", DialogLayout.Bottom)
game.splash("Press A to create a sprite", "Press B on a sprite to delete it")
game.setGameOverMessage(false, "A sprite killed you! Press A to Try again")
game.setGameOverMessage(true, "You destroyed all rogue sprites! W")
game.setGameOverEffect(true, effects.smiles)
game.setGameOverEffect(false, effects.melt)
