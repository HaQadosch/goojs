define([
    'goo/fsmpack/statemachine/actions/ArrowsAction',
    'goo/fsmpack/statemachine/actions/MouseUpAction',
    'goo/fsmpack/statemachine/actions/MouseDownAction',
    'goo/fsmpack/statemachine/actions/MouseMoveAction',
    'goo/fsmpack/statemachine/actions/KeyUpAction',
    'goo/fsmpack/statemachine/actions/KeyDownAction',
    'goo/fsmpack/statemachine/actions/KeyPressedAction',
    'goo/fsmpack/statemachine/actions/PickAction',
    'goo/fsmpack/statemachine/actions/PickAndExitAction',
    'goo/fsmpack/statemachine/actions/WASDAction',
    'goo/fsmpack/statemachine/actions/MoveAction',
    'goo/fsmpack/statemachine/actions/RotateAction',
    'goo/fsmpack/statemachine/actions/ScaleAction',
    'goo/fsmpack/statemachine/actions/LookAtAction',
    'goo/fsmpack/statemachine/actions/TweenMoveAction',
    'goo/fsmpack/statemachine/actions/TweenRotationAction',
    'goo/fsmpack/statemachine/actions/TweenScaleAction',
    'goo/fsmpack/statemachine/actions/TweenLookAtAction',
    'goo/fsmpack/statemachine/actions/ShakeAction',
    'goo/fsmpack/statemachine/actions/PauseAnimationAction',
    'goo/fsmpack/statemachine/actions/ResumeAnimationAction',
    'goo/fsmpack/statemachine/actions/SetAnimationAction',
    'goo/fsmpack/statemachine/actions/WaitAction',
    'goo/fsmpack/statemachine/actions/TransitionAction',
    'goo/fsmpack/statemachine/actions/RandomTransitionAction',
    'goo/fsmpack/statemachine/actions/EmitAction',
    'goo/fsmpack/statemachine/actions/TransitionOnMessageAction',
    'goo/fsmpack/statemachine/actions/EvalAction',
    'goo/fsmpack/statemachine/actions/HideAction',
    'goo/fsmpack/statemachine/actions/ShowAction',
    'goo/fsmpack/statemachine/actions/RemoveAction',
    'goo/fsmpack/statemachine/actions/AddLightAction',
    'goo/fsmpack/statemachine/actions/RemoveLightAction',
    'goo/fsmpack/statemachine/actions/TweenLightColorAction',
    'goo/fsmpack/statemachine/actions/SetClearColorAction',
    'goo/fsmpack/statemachine/actions/SwitchCameraAction',
    'goo/fsmpack/statemachine/actions/InFrustumAction',
    'goo/fsmpack/statemachine/actions/DollyZoomAction',
    'goo/fsmpack/statemachine/actions/InBoxAction',
    'goo/fsmpack/statemachine/actions/CompareDistanceAction',
    'goo/fsmpack/statemachine/actions/CollidesAction',
    'goo/fsmpack/statemachine/actions/TagAction',
    'goo/fsmpack/statemachine/actions/SmokeAction',
    'goo/fsmpack/statemachine/actions/FireAction',
    'goo/fsmpack/statemachine/actions/RemoveParticlesAction',
    'goo/fsmpack/statemachine/actions/SoundFadeInAction',
    'goo/fsmpack/statemachine/actions/SoundFadeOutAction',
    'goo/fsmpack/statemachine/actions/SetRenderTargetAction',
    'goo/fsmpack/statemachine/actions/TweenTextureOffsetAction',
    'goo/fsmpack/statemachine/actions/LogMessageAction',
    'goo/fsmpack/statemachine/actions/TweenOpacityAction',
    'goo/fsmpack/statemachine/actions/HTMLAction',
    'goo/fsmpack/statemachine/actions/CopyJointTransformAction',
    'goo/fsmpack/statemachine/actions/TweenOpacityAction'
], function () {
    'use strict';
    __touch(6314);
    var _actions = {};
    __touch(6315);
    var Actions = {};
    __touch(6316);
    Actions.register = function (name, actionClass) {
        _actions[name] = actionClass;
        __touch(6324);
    };
    __touch(6317);
    Actions.actionForType = function (name) {
        return _actions[name];
        __touch(6325);
    };
    __touch(6318);
    Actions.allActions = function () {
        var actions = {};
        __touch(6326);
        var keys = Object.keys(_actions);
        __touch(6327);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            __touch(6329);
            if (key === 'Eval' || key === 'HTMLPick' || key === 'Remove') {
                continue;
                __touch(6331);
            }
            actions[key] = _actions[key];
            __touch(6330);
        }
        return actions;
        __touch(6328);
    };
    __touch(6319);
    Actions.allActionsArray = function () {
        var actions = [];
        __touch(6332);
        var keys = Object.keys(_actions);
        __touch(6333);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            __touch(6335);
            if (key === 'Eval' || key === 'HTMLPick' || key === 'Remove') {
                continue;
                __touch(6337);
            }
            actions.push(_actions[key]);
            __touch(6336);
        }
        return actions;
        __touch(6334);
    };
    __touch(6320);
    function registerAll(args) {
        var actionsStartIndex = 0;
        __touch(6338);
        for (var i = actionsStartIndex; i < args.length; i++) {
            var arg = args[i];
            __touch(6339);
            Actions.register(arg.external.key || arg.external.name, arg);
            __touch(6340);
        }
    }
    __touch(6321);
    registerAll(arguments);
    __touch(6322);
    return Actions;
    __touch(6323);
});
__touch(6313);