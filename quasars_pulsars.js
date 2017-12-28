    var hl = new BABYLON.HighlightLayer('hl', scene);

    var ht = 1;
    var td = 0.001;
    var bd = 1;
    var sides = 4;

    var pulsarMaster = BABYLON.Mesh.CreateCylinder('q-cone', ht, td, bd, sides, 0, scene);

    pulsarMaster.rotation.y = Math.PI/4;
    pulsarMaster.bakeCurrentTransformIntoVertices();

    pulsarMaster.setPivotMatrix(BABYLON.Matrix.Translation(0, -ht/2, 0));

    pulsarMaster.material = new BABYLON.StandardMaterial('cmat', scene);
    pulsarMaster.material.diffuseColor = new BABYLON.Color3(.1, .4, .3);
    pulsarMaster.position = new BABYLON.Vector3(-10, 30, 0);
    pulsarMaster.renderingGroupId = 2;

    var pulsars = [];

    var halfcirc = BABYLON.MeshBuilder.CreateCylinder("hc", {
        height: .1,
        diameter: 1,
        tessellation: 16,
        subdivisions: 1,
        arc: .4999,
        sideOrientation: 0,
        enclose: true
    }, scene);
    halfcirc.renderingGroupId = 1;
    // halfcirc.showBoundingBox = true;
    halfcirc.position = new BABYLON.Vector3(0,30,0);
    halfcirc.material = matq1;
    halfcirc.renderingGroupId = 2;


    var createQuasar = function(name, which, power, positionalOffset, size, color1, color2, parentToMesh) {
        // console.log("createQuasar");
        var quasar = new BABYLON.AbstractMesh("qM", scene);
        quasar.scaling = new BABYLON.Vector3(size, size, size);
        if (typeof(which) == "string") {
            // console.log("string");
            quasar.mesh = scene.getMeshByName(which);
        }
        else {
            quasar.mesh = which;
        }
        // console.log("target name", quasar.mesh.name);

        quasar.impulse = function(bevt) {
            var src = bevt.source;
            // power /= 2;
            // console.log('quasar impulse: ', src.name);

            if (src.name == 'hc1') {
                src.parent.mesh.physicsImpostor.setAngularVelocity(
                    src.parent.mesh.physicsImpostor.getAngularVelocity().add(
                        new BABYLON.Vector3(0, power, 0)
                    )
                );
            }
            else if (src.name == 'hc2') {
                src.parent.mesh.physicsImpostor.setAngularVelocity(
                    src.parent.mesh.physicsImpostor.getAngularVelocity().add(
                        new BABYLON.Vector3(0, -power, 0)
                    )
                );
            }
            else if (src.name == 'hc3') {
                src.parent.mesh.physicsImpostor.setAngularVelocity(
                    src.parent.mesh.physicsImpostor.getAngularVelocity().add(
                        new BABYLON.Vector3(0, 0, power)
                    )
                );
            }
            else if (src.name == 'hc4') {
                src.parent.mesh.physicsImpostor.setAngularVelocity(
                    src.parent.mesh.physicsImpostor.getAngularVelocity().add(
                        new BABYLON.Vector3(0, 0, -power)
                    )
                );
            }
            else if (src.name == 'hc5') {
                src.parent.mesh.physicsImpostor.setAngularVelocity(
                    src.parent.mesh.physicsImpostor.getAngularVelocity().add(
                        new BABYLON.Vector3(power, 0, 0)
                    )
                );
            }
            else if (src.name == 'hc6') {
                src.parent.mesh.physicsImpostor.setAngularVelocity(
                    src.parent.mesh.physicsImpostor.getAngularVelocity().add(
                        new BABYLON.Vector3(-power, 0, 0)
                    )
                );
            }
        }

        var hc1 = halfcirc.clone('hc1');
        hc1.renderingGroupId = 2;
        hc1.material = matq1;
        hc1.position = new BABYLON.Vector3(0, 0, 0);
        hc1.rotation = new BABYLON.Vector3(0, Math.PI/2, 0);
        hc1.actionManager = new BABYLON.ActionManager(scene);
        hc1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, quasar.impulse));
        hl.addMesh(hc1, (color2 ? color2 : new BABYLON.Color3(.8, 0, .2)));

        var hc2 = halfcirc.clone('hc2');
        hc2.renderingGroupId = 2;
        hc2.material = matq2;
        hc2.position = new BABYLON.Vector3(0, 0, 0);
        hc2.rotation = new BABYLON.Vector3(0, -Math.PI/2, 0);
        hc2.actionManager = new BABYLON.ActionManager(scene);
        hc2.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, quasar.impulse));
        hl.addMesh(hc2, (color2 ? color2 : new BABYLON.Color3(.8, 0, .2)));

        var hc3 = halfcirc.clone('hc3');
        hc3.renderingGroupId = 2;
        hc3.material = matq3;
        hc3.position = new BABYLON.Vector3(0, 0, 0);
        hc3.rotation = new BABYLON.Vector3(Math.PI, -Math.PI/2, -Math.PI/2);
        hc3.actionManager = new BABYLON.ActionManager(scene);
        hc3.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, quasar.impulse));
        hl.addMesh(hc3, (color2 ? color2 : new BABYLON.Color3(.8, 0, .2)));

        var hc4 = halfcirc.clone('hc4');
        hc4.renderingGroupId = 2;
        hc4.material = matq4;
        hc4.position = new BABYLON.Vector3(0, 0, 0);
        hc4.rotation = new BABYLON.Vector3(0, -Math.PI/2, Math.PI/2);
        hc4.actionManager = new BABYLON.ActionManager(scene);
        hc4.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, quasar.impulse));
        hl.addMesh(hc4, (color2 ? color2 : new BABYLON.Color3(.8, 0, .2)));

        var hc5 = halfcirc.clone('hc5');
        hc5.renderingGroupId = 2;
        hc5.material = matq5;
        hc5.position = new BABYLON.Vector3(0, 0, 0);
        hc5.rotation = new BABYLON.Vector3(Math.PI/2, -Math.PI, -Math.PI/2);
        hc5.actionManager = new BABYLON.ActionManager(scene);
        hc5.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, quasar.impulse));
        hl.addMesh(hc5, (color2 ? color2 : new BABYLON.Color3(.8, 0, .2)));

        var hc6 = halfcirc.clone('hc6');
        hc6.renderingGroupId = 2;
        hc6.material = matq6;
        hc6.position = new BABYLON.Vector3(0, 0, 0);
        hc6.rotation = new BABYLON.Vector3(-Math.PI/2, Math.PI, Math.PI/2);
        hc6.actionManager = new BABYLON.ActionManager(scene);
        hc6.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, quasar.impulse));
        hl.addMesh(hc6, (color2 ? color2 : new BABYLON.Color3(.8, 0, .2)));

        hc1.parent=hc2.parent=hc3.parent=hc4.parent=hc5.parent=hc6.parent = quasar;

        if (parentToMesh) {
            quasar.parent = quasar.mesh;
        }
        else {
            quasar.position = quasar.mesh.getAbsolutePosition().add(positionalOffset);
            // quasar.position = quasar.mesh.getAbsolutePosition();
        }
        return quasar;

    }


    var echoPulsar = function(name, which, color1, color2, side) {
        // console.log("echoPulsar");

        if (typeof(which) == "string") {
            // console.log("string");
            var imp = scene.getMeshByName(which);
            if (!imp) {
                console.error("Pulsar named " + which + " not found");
                return;
            }
            else if (imp.type != "pulsar") {
                console.error("Mesh found, but it is NOT of type == pulsar");
                return;
            }
        }
        else {
            var imp = which;
        }
        // console.log(imp)

        if (side && side == "left") {
            // console.log("left");

            var newImp = createPulsar(
                imp.name + "_" + String(engine.getDeltaTime()),
                imp.mesh,
                BABYLON.Vector3.Cross(imp.rotation.multiply(BABYLON.Vector3.Up()), imp.direction.negate()),
                imp.magnitude,
                new BABYLON.Vector3(imp.contact.z*-1, imp.contact.y, imp.contact.x*-1),
                imp.size,
                color1 ? color1 : imp.color1,
                color2 ? color2 : imp.color2
            );
        }
        else if (side && side == "right") {
            // console.log("right");
            var newImp = createPulsar(
                imp.name + "_" + String(engine.getDeltaTime()),
                imp.mesh,
                BABYLON.Vector3.Cross(imp.rotation.multiply(BABYLON.Vector3.Up()), imp.direction),
                imp.magnitude,
                new BABYLON.Vector3(-imp.contact.z*-1, imp.contact.y, -imp.contact.x*-1),
                imp.size,
                color1 ? color1 : imp.color1,
                color2 ? color2 : imp.color2
            );
        }
        else {
            // console.log("opposite");
            var newImp = createPulsar(
                imp.name + "_" + String(engine.getDeltaTime()),
                imp.mesh,
                imp.direction.negate(),
                imp.magnitude,
                new BABYLON.Vector3(imp.contact.x*-1, imp.contact.y, imp.contact.z*-1),
                imp.size,
                color1 ? color1 : imp.color1,
                color2 ? color2 : imp.color2
            );
        }
        return newImp;
    }

    var createPulsar = function(name, mesh, direction, magnitude, contact, size, color1, color2) {
        // console.log("createPulsar");
        var arrow = pulsarMaster.clone();
        arrow.name = name;
        arrow.type = "pulsar";
        arrow.impostor = mesh.physicsImpostor;
        arrow.mesh = mesh;
        arrow.direction = direction;
        arrow.magnitude = magnitude;
        arrow.contact = contact;
        arrow.size = size;
        arrow.position = arrow.contact;
        arrow.force = direction.multiply(magnitude);
        arrow.parent = mesh;

        hl.addMesh(arrow, (color2 ? color2 : BABYLON.Color3.Green()));

        arrow.scaling = new BABYLON.Vector3(size, size, size);
        arrow.color1 = color1;
        arrow.color2 = color2;

        arrow.lookAt(arrow.position.add(arrow.direction), 0, -Math.PI*.5)
        arrow.material.diffuseColor = color1;

        arrow.impulse = function(bevt) {
            var src = bevt.source;
            if (!src.parent.physicsImpostor) return;
            if (src.particleSystem) {
                src.particleSystem.pulse(src);
            }
            // console.log("pulse! force: ", src.force, "contact: ", src.parent.getAbsolutePosition().add(src.contact));
            src.parent.applyImpulse(src.force, src.parent.getAbsolutePosition().add(src.contact));
        }

        arrow.actionManager = new BABYLON.ActionManager(scene);
        arrow.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, arrow.impulse));

        pulsars.push(arrow);

        return arrow;
    }

    var g = 1.0;
    var gf = new BABYLON.Vector3(g,g,g);  // global force
    var size = .7;

    var p1 = createPulsar(
        "p1",
        part2,
        new BABYLON.Vector3(-1, 0, 0),  // dir
        // new BABYLON.Vector3(1, 1, 1),  // mag
        gf,  // mag
        new BABYLON.Vector3(1, -3, 0), // contact
        size, // size
        new BABYLON.Color3(.5,0,.5), // main color
        new BABYLON.Color3(1,1,0) // highlightColor
    );

    var p2 = createPulsar(
        "p2",
        part3,
        new BABYLON.Vector3(-1, 0, 0),  // dir
        // new BABYLON.Vector3(1, 1, 1),  // mag
        gf,  // mag
        new BABYLON.Vector3(1, -2, 0), // contact
        size, // size
        new BABYLON.Color3(.5,0,.5), // main color
        new BABYLON.Color3(1,0,0) // highlightColor
    );

    var p3 = createPulsar(
        "p3",
        part4,
        new BABYLON.Vector3(-1, 0, 0),  // dir
        // new BABYLON.Vector3(1, 1, 1),  // mag
        gf,  // mag
        new BABYLON.Vector3(1, -1, 0), // contact
        size, // size
        new BABYLON.Color3(.5,0,.5), // main color
        new BABYLON.Color3(0,2,0) // highlightColor
    );
