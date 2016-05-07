
var BABYLONX;
(function (BABYLONX) {
    var ShaderMaterialHelperStatics = (function () {
        function ShaderMaterialHelperStatics() {
        }
        ShaderMaterialHelperStatics.Dark = false;
        ShaderMaterialHelperStatics.Light = true;
        ShaderMaterialHelperStatics.PrecisionHighMode = 'highp';
        ShaderMaterialHelperStatics.PrecisionMediumMode = 'mediump';
        ShaderMaterialHelperStatics.face_back = "!gl_FrontFacing";
        ShaderMaterialHelperStatics.face_front = "gl_FrontFacing";
        ShaderMaterialHelperStatics.AttrPosition = 'position';
        ShaderMaterialHelperStatics.AttrNormal = 'normal';
        ShaderMaterialHelperStatics.AttrUv = 'uv';
        ShaderMaterialHelperStatics.AttrUv2 = 'uv2';
        ShaderMaterialHelperStatics.AttrTypeForPosition = 'vec3';
        ShaderMaterialHelperStatics.AttrTypeForNormal = 'vec3';
        ShaderMaterialHelperStatics.AttrTypeForUv = 'vec2';
        ShaderMaterialHelperStatics.AttrTypeForUv2 = 'vec2';
        ShaderMaterialHelperStatics.uniformView = "view";
        ShaderMaterialHelperStatics.uniformWorld = "world";
        ShaderMaterialHelperStatics.uniformWorldView = "worldView";
        ShaderMaterialHelperStatics.uniformViewProjection = "viewProjection";
        ShaderMaterialHelperStatics.uniformWorldViewProjection = "worldViewProjection";
        ShaderMaterialHelperStatics.uniformStandardType = "mat4";
        ShaderMaterialHelperStatics.uniformFlags = "flags";
        ShaderMaterialHelperStatics.Mouse = "mouse";
        ShaderMaterialHelperStatics.Screen = "screen";
        ShaderMaterialHelperStatics.Camera = "camera";
        ShaderMaterialHelperStatics.Look = "look";
        ShaderMaterialHelperStatics.Time = "time";
        ShaderMaterialHelperStatics.GlobalTime = "gtime";
        ShaderMaterialHelperStatics.Position = "pos";
        ShaderMaterialHelperStatics.WorldPosition = "wpos";
        ShaderMaterialHelperStatics.Normal = "nrm";
        ShaderMaterialHelperStatics.WorldNormal = "wnrm";
        ShaderMaterialHelperStatics.Uv = "vuv";
        ShaderMaterialHelperStatics.Uv2 = "vuv2";
        ShaderMaterialHelperStatics.Center = 'center';
        ShaderMaterialHelperStatics.ReflectMatrix = "refMat";
        ShaderMaterialHelperStatics.Texture2D = "txtRef_";
        ShaderMaterialHelperStatics.TextureCube = "cubeRef_";
        return ShaderMaterialHelperStatics;
    }());
    BABYLONX.ShaderMaterialHelperStatics = ShaderMaterialHelperStatics;
    var Normals = (function () {
        function Normals() {
        }
        Normals.Default = ShaderMaterialHelperStatics.Normal;
        Normals.Inverse = '-1.*' + ShaderMaterialHelperStatics.Normal;
        Normals.Pointed = 'normalize(' + ShaderMaterialHelperStatics.Position + '-' + ShaderMaterialHelperStatics.Center + ')';
        Normals.Flat = 'normalize(cross(dFdx(' + ShaderMaterialHelperStatics.Position + ' * -1.), dFdy(' + ShaderMaterialHelperStatics.Position + ')))';
        Normals.Map = 'normalMap()';
        return Normals;
    }());
    BABYLONX.Normals = Normals;
    var Speculars = (function () {
        function Speculars() {
        }
        Speculars.Map = 'specularMap()';
        return Speculars;
    }());
    BABYLONX.Speculars = Speculars;
    var ShaderMaterialHelper = (function () {
        function ShaderMaterialHelper() {
        }
        ShaderMaterialHelper.prototype.ShaderMaterial = function (name, scene, shader, helpers) {
            return this.MakeShaderMaterialForEngine(name, scene, shader, helpers);
        };
        ShaderMaterialHelper.prototype.MakeShaderMaterialForEngine = function (name, scene, shader, helpers) { return {}; };
        ShaderMaterialHelper.prototype.DefineTexture = function (txt, scene) {
            return null;
        };
        ShaderMaterialHelper.prototype.DefineCubeTexture = function (txt, scene) {
            return null;
        };
        ShaderMaterialHelper.prototype.SetUniforms = function (meshes, cameraPos, cameraTarget, mouse, screen, time) {
        };
        ShaderMaterialHelper.prototype.PostProcessTextures = function (pps, name, txt) { };
        ShaderMaterialHelper.prototype.DefineRenderTarget = function (name, scale, scene) {
            return {};
        };
        ShaderMaterialHelper.prototype.ShaderPostProcess = function (name, samplers, camera, scale, shader, helpers, option) {
            return {};
        };
        return ShaderMaterialHelper;
    }());
    BABYLONX.ShaderMaterialHelper = ShaderMaterialHelper;
    var Shader = (function () {
        function Shader() {
        }
        Shader.Replace = function (s, t, d) {
            var ignore = null;
            return s.replace(new RegExp(t.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (d) == "string") ? d.replace(/\$/g, "$$$$") : d);
        };
        Shader.Def = function (a, d) {
            if (a != undefined && a != null)
                return (d != undefined && d != null ? a : true);
            else if (d != Shader._null)
                return (d != undefined && d != null ? d : false);
            return null;
        };
        Shader.Join = function (s) {
            return s.join("\n\
                       ");
        };
        Shader.Print = function (n) {
            if (n == undefined)
                return "0.";
            var sn = Shader.Replace(n.toString(), '-', '0');
            var reg = new RegExp('^\\d+$');
            if (reg.test(sn) && n.toString().indexOf('.') == -1)
                return n + ".";
            return n.toString();
        };
        Shader.Custom = function () {
            return "custom_" + this.Print(++this.Me.CustomIndexer) + "_";
        };
        Shader.Index = function () {
            return "_" + Shader.Indexer + "_";
        };
        Shader.DefCustom = function (t, c) {
            this.Me.Body += t + " custom_" + this.Print(++this.Me.CustomIndexer) + "_ = " + c + ";";
        };
        Shader.toRGB = function (a, b) {
            b = Shader.Def(b, 255);
            var x = a - Math.floor(a / b) * b;
            a = Math.floor(a / b);
            var y = a - Math.floor(a / b) * b;
            a = Math.floor(a / b);
            var z = a - Math.floor(a / b) * b;
            if (x > 126)
                x++;
            if (y > 126)
                y++;
            if (z > 126)
                z++;
            return { r: x, g: y, b: z };
        };
        Shader.torgb = function (a, b) {
            b = Shader.Def(b, 255);
            var i = Shader.toRGB(a, b);
            return { r: i.r / 256, g: i.g / 256, b: i.b / 256 };
        };
        Shader.toID = function (a, b) {
            b = Shader.Def(b, 255);
            var c = 255 / b;
            var x = Math.floor(a.r / c);
            var y = Math.floor(a.g / c);
            var z = Math.floor(a.b / c);
            return z * b * b + y * b + x;
        };
        Shader._null = 'set null anyway';
        return Shader;
    }());
    BABYLONX.Shader = Shader;
    var Helper = (function () {
        function Helper() {
            var setting = Shader.Me.Setting;
            var instance = new ShaderBuilder();
            instance.Parent = Shader.Me;
            instance.Setting = setting;
            return instance;
        }
        Helper.Depth = function (far) {
            return 'max(0.,min(1.,(' + Shader.Print(far) + '-abs(length(camera-pos)))/' + Shader.Print(far) + ' ))';
        };
        Helper.Red = 0;
        Helper.Yellow = 1;
        Helper.White = 2;
        Helper.Cyan = 4;
        Helper.Blue = 5;
        Helper.Pink = 6;
        Helper.Black = 7;
        Helper.Green = 8;
        return Helper;
    }());
    BABYLONX.Helper = Helper;
    var ShaderSetting = (function () {
        function ShaderSetting() {
            this.PrecisionMode = ShaderMaterialHelperStatics.PrecisionHighMode;
        }
        return ShaderSetting;
    }());
    BABYLONX.ShaderSetting = ShaderSetting;
    var ShaderBuilder = (function () {
        function ShaderBuilder() {
            this.Setting = new ShaderSetting();
            this.Extentions = [];
            this.Attributes = [];
            this.Fragment = [];
            this.Helpers = [];
            this.Uniforms = [];
            this.Varings = [];
            this.Vertex = [];
            this.Setting.Uv = true;
            this.Setting.Time = true;
            this.Setting.Camera = true;
            this.Setting.Helpers = true;
            this.Setting.NormalMap = "result = vec4(0.5);";
            this.Setting.SpecularMap = "float_result = 1.0;";
            this.Setting.NormalOpacity = "0.5";
            this.Setting.Normal = ShaderMaterialHelperStatics.Normal;
            if (Shader.Indexer == null)
                Shader.Indexer = 1;
            this.CustomIndexer = 1;
            Shader.Me = this;
        }
        ShaderBuilder.InitializeEngine = function () {
            eval(Shader.Replace(Shader.Replace("BABYLONX.ShaderMaterialHelper.prototype.MakeShaderMaterialForEngine=function(name,scene,shader,helpers){BABYLON.Effect.ShadersStore[name+#[QT]VertexShader#[QT]]=shader.Vertex;BABYLON.Effect.ShadersStore[name+#[QT]PixelShader#[QT]]=shader.Pixel;return new BABYLON.ShaderMaterial(name,scene,{vertex:name,fragment:name},helpers);}", "#[QT]", '"'), '#[T]', "'"));
            eval(Shader.Replace(Shader.Replace("BABYLONX.ShaderMaterialHelper.prototype.DefineTexture = function (option, sc) { var tx = new BABYLON.Texture(option, sc); return tx; } ", "#[QT]", '"'), '#[T]', "'"));
            eval(Shader.Replace(Shader.Replace("BABYLONX.ShaderMaterialHelper.prototype.DefineCubeTexture = function (option, sc) { var tx = new BABYLON.CubeTexture(option, sc); tx.coordinatesMode = BABYLON.Texture.PLANAR_MODE; return tx; }  ", "#[QT]", '"'), '#[T]', "'"));
            eval(Shader.Replace(Shader.Replace("BABYLONX.ShaderMaterialHelper.prototype.SetUniforms = function (meshes, cameraPos, cameraTarget, mouse, screen, time) { for (var ms in meshes) { ms = meshes[ms]; if (ms.material && (ms.material.ShaderSetting != null || ms.material.ShaderSetting != undefined)) { if (ms.material.ShaderSetting.Camera)                ms.material.setVector3(BABYLONX.ShaderMaterialHelperStatics.Camera, cameraPos); if (ms.material.ShaderSetting.Center)                ms.material.setVector3(BABYLONX.ShaderMaterialHelperStatics.Center, { x: 0., y: 0., z: 0. }); if (ms.material.ShaderSetting.Mouse)                ms.material.setVector2(BABYLONX.ShaderMaterialHelperStatics.Mouse, mouse); if (ms.material.ShaderSetting.Screen)                ms.material.setVector2(BABYLONX.ShaderMaterialHelperStatics.Screen, screen); if (ms.material.ShaderSetting.GlobalTime)                ms.material.setVector4(BABYLONX.ShaderMaterialHelperStatics.GlobalTime, { x: 0., y: 0., z: 0., w: 0. }); if (ms.material.ShaderSetting.Look)                ms.material.setVector3(BABYLONX.ShaderMaterialHelperStatics.Look, cameraTarget); if (ms.material.ShaderSetting.Time)                ms.material.setFloat(BABYLONX.ShaderMaterialHelperStatics.Time, time);        }        }    }", "#[QT]", '"'), '#[T]', "'"));
            eval(Shader.Replace(Shader.Replace("BABYLONX.ShaderMaterialHelper.prototype.ShaderPostProcess = function (name, samplers, camera, scale, shader, helpers, option) {if (!option) option = {};if (!option.samplingMode) option.samplingMode = BABYLON.Texture.BILINEAR_SAMPLINGMODE;BABYLON.Effect.ShadersStore[name + #[QT]PixelShader#[QT]] = shader.Pixel;var pps = new BABYLON.PostProcess(name, name, helpers.uniforms, samplers, scale, camera, option.samplingMode);pps.onApply = function (effect) {effect.setFloat(#[T]time#[T], time);effect.setVector2(#[QT]screen#[QT], { x: pps.width, y: pps.height });effect.setVector3(#[QT]camera#[QT], camera.position);if (option && option.onApply)option.onApply(effect);};return pps;} ", "#[QT]", '"'), '#[T]', "'"));
            eval(Shader.Replace(Shader.Replace("BABYLONX.ShaderMaterialHelper.prototype.PostProcessTextures = function (pps, name, txt) {pps._effect.setTexture(name, txt);}", "#[QT]", '"'), '#[T]', "'"));
        };
        ShaderBuilder.InitializePostEffects = function (scene, scale) {
            ShaderBuilder.ColorIdRenderTarget = new ShaderMaterialHelper().DefineRenderTarget("ColorId", scale, scene);
        };
        ShaderBuilder.prototype.PrepareBeforeMaterialBuild = function () {
            this.Setting = Shader.Me.Setting;
            this.Attributes.push(ShaderMaterialHelperStatics.AttrPosition);
            this.Attributes.push(ShaderMaterialHelperStatics.AttrNormal);
            if (this.Setting.Uv) {
                this.Attributes.push(ShaderMaterialHelperStatics.AttrUv);
            }
            if (this.Setting.Uv2) {
                this.Attributes.push(ShaderMaterialHelperStatics.AttrUv2);
            }
            this.Uniforms.push(ShaderMaterialHelperStatics.uniformView, ShaderMaterialHelperStatics.uniformWorld, ShaderMaterialHelperStatics.uniformWorldView, ShaderMaterialHelperStatics.uniformViewProjection, ShaderMaterialHelperStatics.uniformWorldViewProjection);
            // start Build Vertex Frame 
            this.Vertex.push("precision " + this.Setting.PrecisionMode + " float;");
            this.Vertex.push("attribute " + ShaderMaterialHelperStatics.AttrTypeForPosition + " " + ShaderMaterialHelperStatics.AttrPosition + ";");
            this.Vertex.push("attribute " + ShaderMaterialHelperStatics.AttrTypeForNormal + " " + ShaderMaterialHelperStatics.AttrNormal + ";");
            if (this.Setting.Uv) {
                this.Vertex.push("attribute " + ShaderMaterialHelperStatics.AttrTypeForUv + " " + ShaderMaterialHelperStatics.AttrUv + ";");
                this.Vertex.push("varying vec2 " + ShaderMaterialHelperStatics.Uv + ";");
            }
            if (this.Setting.Uv2) {
                this.Vertex.push("attribute " + ShaderMaterialHelperStatics.AttrTypeForUv2 + " " + ShaderMaterialHelperStatics.AttrUv2 + ";");
                this.Vertex.push("varying vec2 " + ShaderMaterialHelperStatics.Uv2 + ";");
            }
            this.Vertex.push("varying vec3 " + ShaderMaterialHelperStatics.Position + ";");
            this.Vertex.push("varying vec3 " + ShaderMaterialHelperStatics.Normal + ";");
            this.Vertex.push("uniform   " + ShaderMaterialHelperStatics.uniformStandardType + ' ' + ShaderMaterialHelperStatics.uniformWorldViewProjection + ";");
            if (this.Setting.VertexView) {
                this.Vertex.push("uniform   " + ShaderMaterialHelperStatics.uniformStandardType + ' ' + ShaderMaterialHelperStatics.uniformView + ";");
            }
            if (this.Setting.VertexWorld) {
                this.Vertex.push("uniform   " + ShaderMaterialHelperStatics.uniformStandardType + ' ' + ShaderMaterialHelperStatics.uniformWorld + ";");
            }
            if (this.Setting.VertexViewProjection) {
                this.Vertex.push("uniform   " + ShaderMaterialHelperStatics.uniformStandardType + ' ' + ShaderMaterialHelperStatics.uniformViewProjection + ";");
            }
            if (this.Setting.Flags) {
                this.Uniforms.push(ShaderMaterialHelperStatics.uniformFlags);
                this.Vertex.push("uniform  float " + ShaderMaterialHelperStatics.uniformFlags + ";");
            }
            if (this.Setting.VertexWorldView) {
                this.Vertex.push("uniform   " + ShaderMaterialHelperStatics.uniformStandardType + ' ' + ShaderMaterialHelperStatics.uniformWorldView + ";");
            }
            if (this.VertexUniforms) {
                this.Vertex.push(this.VertexUniforms);
            }
            /*#extension GL_OES_standard_derivatives : enable*/
            this.Fragment.push("precision " + this.Setting.PrecisionMode + " float;\n\
#extension GL_OES_standard_derivatives : enable\n\
\n\
\n\
 ");
            if (this.Setting.Uv) {
                this.Fragment.push("varying vec2 " + ShaderMaterialHelperStatics.Uv + ";");
            }
            if (this.Setting.Uv2) {
                this.Fragment.push("varying vec2 " + ShaderMaterialHelperStatics.Uv2 + ";");
            }
            if (this.Setting.FragmentView) {
                this.Fragment.push("uniform   " + ShaderMaterialHelperStatics.uniformStandardType + ' ' + ShaderMaterialHelperStatics.uniformView + ";");
            }
            if (this.Setting.FragmentWorld) {
                this.Fragment.push("uniform   " + ShaderMaterialHelperStatics.uniformStandardType + ' ' + ShaderMaterialHelperStatics.uniformWorld + ";");
            }
            if (this.Setting.FragmentViewProjection) {
                this.Fragment.push("uniform   " + ShaderMaterialHelperStatics.uniformStandardType + ' ' + ShaderMaterialHelperStatics.uniformViewProjection + ";");
            }
            if (this.Setting.FragmentWorldView) {
                this.Fragment.push("uniform   " + ShaderMaterialHelperStatics.uniformStandardType + ' ' + ShaderMaterialHelperStatics.uniformWorldView + ";");
            }
            if (this.Setting.Flags) {
                this.Fragment.push("uniform  float " + ShaderMaterialHelperStatics.uniformFlags + ";");
            }
            if (this.FragmentUniforms) {
                this.Fragment.push(this.FragmentUniforms);
            }
            this.Fragment.push("varying vec3 " + ShaderMaterialHelperStatics.Position + ";");
            this.Fragment.push("varying vec3 " + ShaderMaterialHelperStatics.Normal + ";");
            if (this.Setting.WorldPosition) {
                this.Vertex.push("varying vec3 " + ShaderMaterialHelperStatics.WorldPosition + ";");
                this.Vertex.push("varying vec3 " + ShaderMaterialHelperStatics.WorldNormal + ";");
                this.Fragment.push("varying vec3 " + ShaderMaterialHelperStatics.WorldPosition + ";");
                this.Fragment.push("varying vec3 " + ShaderMaterialHelperStatics.WorldNormal + ";");
            }
            if (this.Setting.Texture2Ds != null) {
                for (var s in this.Setting.Texture2Ds) {
                    if (this.Setting.Texture2Ds[s].inVertex) {
                        this.Vertex.push("uniform  sampler2D " + ShaderMaterialHelperStatics.Texture2D + s + ";");
                    }
                    if (this.Setting.Texture2Ds[s].inFragment) {
                        this.Fragment.push("uniform  sampler2D  " + ShaderMaterialHelperStatics.Texture2D + s + ";");
                    }
                }
            }
            if (this.Setting.CameraShot) {
                this.Fragment.push("uniform  sampler2D  textureSampler;");
            }
            if (this.Setting.TextureCubes != null) {
                for (var s in this.Setting.TextureCubes) {
                    if (this.Setting.TextureCubes[s].inVertex) {
                        this.Vertex.push("uniform  samplerCube  " + ShaderMaterialHelperStatics.TextureCube + s + ";");
                    }
                    if (this.Setting.TextureCubes[s].inFragment) {
                        this.Fragment.push("uniform  samplerCube   " + ShaderMaterialHelperStatics.TextureCube + s + ";");
                    }
                }
            }
            if (this.Setting.Center) {
                this.Vertex.push("uniform  vec3 " + ShaderMaterialHelperStatics.Center + ";");
                this.Fragment.push("uniform  vec3 " + ShaderMaterialHelperStatics.Center + ";");
            }
            if (this.Setting.Mouse) {
                this.Vertex.push("uniform  vec2 " + ShaderMaterialHelperStatics.Mouse + ";");
                this.Fragment.push("uniform  vec2 " + ShaderMaterialHelperStatics.Mouse + ";");
            }
            if (this.Setting.Screen) {
                this.Vertex.push("uniform  vec2 " + ShaderMaterialHelperStatics.Screen + ";");
                this.Fragment.push("uniform  vec2 " + ShaderMaterialHelperStatics.Screen + ";");
            }
            if (this.Setting.Camera) {
                this.Vertex.push("uniform  vec3 " + ShaderMaterialHelperStatics.Camera + ";");
                this.Fragment.push("uniform  vec3 " + ShaderMaterialHelperStatics.Camera + ";");
            }
            if (this.Setting.Look) {
                this.Vertex.push("uniform  vec3 " + ShaderMaterialHelperStatics.Look + ";");
                this.Fragment.push("uniform  vec3 " + ShaderMaterialHelperStatics.Look + ";");
            }
            if (this.Setting.Time) {
                this.Vertex.push("uniform  float " + ShaderMaterialHelperStatics.Time + ";");
                this.Fragment.push("uniform  float " + ShaderMaterialHelperStatics.Time + ";");
            }
            if (this.Setting.GlobalTime) {
                this.Vertex.push("uniform  vec4 " + ShaderMaterialHelperStatics.GlobalTime + ";");
                this.Fragment.push("uniform  vec4 " + ShaderMaterialHelperStatics.GlobalTime + ";");
            }
            if (this.Setting.ReflectMatrix) {
                this.Vertex.push("uniform  mat4 " + ShaderMaterialHelperStatics.ReflectMatrix + ";");
                this.Fragment.push("uniform  mat4 " + ShaderMaterialHelperStatics.ReflectMatrix + ";");
            }
            if (this.Setting.Helpers) {
                var sresult = Shader.Join([
                    "vec3 random3(vec3 c) {   float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));   vec3 r;   r.z = fract(512.0*j); j *= .125;  r.x = fract(512.0*j); j *= .125; r.y = fract(512.0*j);  return r-0.5;  } ",
                    "float rand(vec2 co){   return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453); } ",
                    "const float F3 =  0.3333333;const float G3 =  0.1666667;",
                    "float simplex3d(vec3 p) {   vec3 s = floor(p + dot(p, vec3(F3)));   vec3 x = p - s + dot(s, vec3(G3));  vec3 e = step(vec3(0.0), x - x.yzx);  vec3 i1 = e*(1.0 - e.zxy);  vec3 i2 = 1.0 - e.zxy*(1.0 - e);   vec3 x1 = x - i1 + G3;   vec3 x2 = x - i2 + 2.0*G3;   vec3 x3 = x - 1.0 + 3.0*G3;   vec4 w, d;    w.x = dot(x, x);   w.y = dot(x1, x1);  w.z = dot(x2, x2);  w.w = dot(x3, x3);   w = max(0.6 - w, 0.0);   d.x = dot(random3(s), x);   d.y = dot(random3(s + i1), x1);   d.z = dot(random3(s + i2), x2);  d.w = dot(random3(s + 1.0), x3);  w *= w;   w *= w;  d *= w;   return dot(d, vec4(52.0));     }  ",
                    "float noise(vec3 m) {  return   0.5333333*simplex3d(m)   +0.2666667*simplex3d(2.0*m) +0.1333333*simplex3d(4.0*m) +0.0666667*simplex3d(8.0*m);   } ",
                    "float dim(vec3 p1 , vec3 p2){   return sqrt((p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y)+(p2.z-p1.z)*(p2.z-p1.z)); }",
                    "vec2  rotate_xy(vec2 pr1,vec2  pr2,float alpha) {vec2 pp2 = vec2( pr2.x - pr1.x,   pr2.y - pr1.y );return  vec2( pr1.x + pp2.x * cos(alpha*3.14159265/180.) - pp2.y * sin(alpha*3.14159265/180.),pr1.y + pp2.x * sin(alpha*3.14159265/180.) + pp2.y * cos(alpha*3.14159265/180.));} \n vec3  r_y(vec3 n, float a,vec3 c) {vec3 c1 = vec3( c.x,  c.y,   c.z );c1.x = c1.x;c1.y = c1.z;vec2 p = rotate_xy(vec2(c1.x,c1.y), vec2( n.x,  n.z ), a);n.x = p.x;n.z = p.y;return n; } \n vec3  r_x(vec3 n, float a,vec3 c) {vec3 c1 = vec3( c.x,  c.y,   c.z );c1.x = c1.y;c1.y = c1.z;vec2 p = rotate_xy(vec2(c1.x,c1.y), vec2( n.y,  n.z ), a);n.y = p.x;n.z = p.y;return n; } \n vec3  r_z(vec3 n, float a,vec3 c) {  vec3 c1 = vec3( c.x,  c.y,   c.z );vec2 p = rotate_xy(vec2(c1.x,c1.y), vec2( n.x,  n.y ), a);n.x = p.x;n.y = p.y;return n; }",
                ]);
                this.Vertex.push(sresult);
                this.Fragment.push(sresult);
            }
            this.Vertex.push("void main(void) { \n\
    " + ShaderMaterialHelperStatics.Position + " = " + ShaderMaterialHelperStatics.AttrPosition + "; \n\
    " + ShaderMaterialHelperStatics.Normal + " = " + ShaderMaterialHelperStatics.AttrNormal + "; \n\
    vec4 result = vec4(" + ShaderMaterialHelperStatics.Position + ",1.);  \n\
      vuv = uv;\n\
     #[Source]\n\
    gl_Position = worldViewProjection * result;\n\
    #[AfterFinishVertex] \n\
 }");
            // start Build Fragment Frame 
            if (this.Setting.NormalMap != null) {
                this.Fragment.push("vec3 normalMap() { vec4 result = vec4(0.); " + this.Setting.NormalMap + "; \n\
                  result = vec4( normalize( " + this.Setting.Normal + " -(normalize(result.xyz)*2.0-vec3(1.))*(max(-0.5,min(0.5," + Shader.Print(this.Setting.NormalOpacity) + ")) )),1.0); return result.xyz;}");
            }
            if (this.Setting.SpecularMap != null) {
                this.Fragment.push("float specularMap() { vec4 result = vec4(0.);float float_result = 0.; " + this.Setting.SpecularMap + "; return float_result ;}");
            }
            this.Fragment.push(this.FragmentBeforeMain);
            this.Fragment.push(" \n\
void main(void) { \n\
     int discardState = 0;\n\
     vec4 result = vec4(0.);\n\
     #[Source] \n\
     if(discardState == 0)gl_FragColor = result; \n\
}");
        };
        ShaderBuilder.prototype.PrepareBeforePostProcessBuild = function () {
            this.Setting = Shader.Me.Setting;
            this.Attributes.push(ShaderMaterialHelperStatics.AttrPosition);
            // start Build Vertex Frame 
            /*#extension GL_OES_standard_derivatives : enable*/
            this.Fragment.push("precision " + this.Setting.PrecisionMode + " float;\n\
\n\
 ");
            if (this.Setting.Uv) {
                this.Fragment.push("varying vec2 vUV;");
            }
            if (this.Setting.Flags) {
                this.Fragment.push("uniform  float " + ShaderMaterialHelperStatics.uniformFlags + ";");
            }
            if (this.Setting.Texture2Ds != null) {
                for (var s in this.Setting.Texture2Ds) {
                    if (this.Setting.Texture2Ds[s].inFragment) {
                        this.Fragment.push("uniform  sampler2D  " + ShaderMaterialHelperStatics.Texture2D + s + ";");
                    }
                }
            }
            if (this.PPSSamplers != null) {
                for (var s in this.PPSSamplers) {
                    if (this.PPSSamplers[s]) {
                        this.Fragment.push("uniform  sampler2D  " + this.PPSSamplers[s] + ";");
                    }
                }
            }
            if (this.Setting.CameraShot) {
                this.Fragment.push("uniform  sampler2D  textureSampler;");
            }
            if (this.Setting.Mouse) {
                this.Fragment.push("uniform  vec2 " + ShaderMaterialHelperStatics.Mouse + ";");
            }
            if (this.Setting.Screen) {
                this.Fragment.push("uniform  vec2 " + ShaderMaterialHelperStatics.Screen + ";");
            }
            if (this.Setting.Camera) {
                this.Fragment.push("uniform  vec3 " + ShaderMaterialHelperStatics.Camera + ";");
            }
            if (this.Setting.Look) {
                this.Fragment.push("uniform  vec3 " + ShaderMaterialHelperStatics.Look + ";");
            }
            if (this.Setting.Time) {
                this.Fragment.push("uniform  float " + ShaderMaterialHelperStatics.Time + ";");
            }
            if (this.Setting.GlobalTime) {
                this.Fragment.push("uniform  vec4 " + ShaderMaterialHelperStatics.GlobalTime + ";");
            }
            if (this.Setting.Helpers) {
                var sresult = Shader.Join([
                    "vec3 random3(vec3 c) {   float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));   vec3 r;   r.z = fract(512.0*j); j *= .125;  r.x = fract(512.0*j); j *= .125; r.y = fract(512.0*j);  return r-0.5;  } ",
                    "float rand(vec2 co){   return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453); } ",
                    "const float F3 =  0.3333333;const float G3 =  0.1666667;",
                    "float simplex3d(vec3 p) {   vec3 s = floor(p + dot(p, vec3(F3)));   vec3 x = p - s + dot(s, vec3(G3));  vec3 e = step(vec3(0.0), x - x.yzx);  vec3 i1 = e*(1.0 - e.zxy);  vec3 i2 = 1.0 - e.zxy*(1.0 - e);   vec3 x1 = x - i1 + G3;   vec3 x2 = x - i2 + 2.0*G3;   vec3 x3 = x - 1.0 + 3.0*G3;   vec4 w, d;    w.x = dot(x, x);   w.y = dot(x1, x1);  w.z = dot(x2, x2);  w.w = dot(x3, x3);   w = max(0.6 - w, 0.0);   d.x = dot(random3(s), x);   d.y = dot(random3(s + i1), x1);   d.z = dot(random3(s + i2), x2);  d.w = dot(random3(s + 1.0), x3);  w *= w;   w *= w;  d *= w;   return dot(d, vec4(52.0));     }  ",
                    "float noise(vec3 m) {  return   0.5333333*simplex3d(m)   +0.2666667*simplex3d(2.0*m) +0.1333333*simplex3d(4.0*m) +0.0666667*simplex3d(8.0*m);   } ",
                    "vec2  rotate_xy(vec2 pr1,vec2  pr2,float alpha) {vec2 pp2 = vec2( pr2.x - pr1.x,   pr2.y - pr1.y );return  vec2( pr1.x + pp2.x * cos(alpha*3.14159265/180.) - pp2.y * sin(alpha*3.14159265/180.),pr1.y + pp2.x * sin(alpha*3.14159265/180.) + pp2.y * cos(alpha*3.14159265/180.));} \n vec3  r_y(vec3 n, float a,vec3 c) {vec3 c1 = vec3( c.x,  c.y,   c.z );c1.x = c1.x;c1.y = c1.z;vec2 p = rotate_xy(vec2(c1.x,c1.y), vec2( n.x,  n.z ), a);n.x = p.x;n.z = p.y;return n; } \n vec3  r_x(vec3 n, float a,vec3 c) {vec3 c1 = vec3( c.x,  c.y,   c.z );c1.x = c1.y;c1.y = c1.z;vec2 p = rotate_xy(vec2(c1.x,c1.y), vec2( n.y,  n.z ), a);n.y = p.x;n.z = p.y;return n; } \n vec3  r_z(vec3 n, float a,vec3 c) {  vec3 c1 = vec3( c.x,  c.y,   c.z );vec2 p = rotate_xy(vec2(c1.x,c1.y), vec2( n.x,  n.y ), a);n.x = p.x;n.y = p.y;return n; }",
                    "float getIdColor(vec4 a){    float b = 255.;float c = 255. / b;float x = floor(a.x*256. / c);float y = floor(a.y *256./ c);float z = floor(a.z*256. / c);return z * b * b + y * b + x;}"
                ]);
                this.Fragment.push(sresult);
            }
            if (this.Setting.NormalMap != null) {
                this.Fragment.push("vec3 normalMap() { vec4 result = vec4(0.);   return result.xyz;}");
            }
            // start Build Fragment Frame  
            this.Fragment.push(this.FragmentBeforeMain);
            this.Fragment.push(" \n\
void main(void) { \n\
     int discardState = 0;\n\
     vec2 vuv = vUV;\n\
     vec3 center = vec3(0.);\n\
     vec4 result = vec4(0.);\n\
     #[Source] \n\
     if(discardState == 0)gl_FragColor = result; \n\
}");
        };
        ShaderBuilder.prototype.PrepareMaterial = function (material, scene) {
            material.ShaderSetting =
                this.Setting;
            if (!this.Setting.Transparency) {
                material.needAlphaBlending = function () { return false; };
            }
            else {
                material.needAlphaBlending = function () { return true; };
            }
            ;
            if (!this.Setting.Back)
                this.Setting.Back = false;
            material.needAlphaTesting = function () { return true; };
            material.setVector3("camera", { x: 18., y: 18., z: 18. });
            material.backFaceCulling = !this.Setting.Back;
            material.wireframe = this.Setting.Wire;
            material.setFlags = function (flags) {
                if (this.ShaderSetting.Flags) {
                    var s = 0.;
                    for (var i = 0; i < 20; i++) {
                        if (flags.length > i && flags[i] == '1')
                            s += Math.pow(2., i);
                    }
                    this.flagNumber = s;
                    this.setFloat(ShaderMaterialHelperStatics.uniformFlags, s);
                }
            };
            material.flagNumber = 0.;
            material.flagUp = function (flag) {
                if (this.ShaderSetting.Flags) {
                    if (Math.floor((this.flagNumber / Math.pow(2., flag) % 2.)) != 1.)
                        this.flagNumber += Math.pow(2., flag);
                    this.setFloat(ShaderMaterialHelperStatics.uniformFlags, this.flagNumber);
                }
            };
            material.flagDown = function (flag) {
                if (this.ShaderSetting.Flags) {
                    if (Math.floor((this.flagNumber / Math.pow(2., flag) % 2.)) == 1.)
                        this.flagNumber -= Math.pow(2., flag);
                    this.setFloat(ShaderMaterialHelperStatics.uniformFlags, this.flagNumber);
                }
            };
            material.onCompiled = function () {
            };
            if (this.Setting.Texture2Ds != null) {
                for (var s in this.Setting.Texture2Ds) {
                    // setTexture2D
                    var texture = new ShaderMaterialHelper().DefineTexture(this.Setting.Texture2Ds[s].key, scene);
                    material.setTexture(ShaderMaterialHelperStatics.Texture2D + s, texture);
                }
            }
            if (this.Setting.TextureCubes != null) {
                for (var s in this.Setting.TextureCubes) {
                    // setTexture2D
                    var texture = new ShaderMaterialHelper().DefineCubeTexture(this.Setting.TextureCubes[s].key, scene);
                    material.setTexture(ShaderMaterialHelperStatics.TextureCube + s, texture);
                    material.setMatrix(ShaderMaterialHelperStatics.ReflectMatrix, texture.getReflectionTextureMatrix());
                }
            }
            Shader.Me = null;
            return material;
        };
        ShaderBuilder.prototype.Build = function () {
            Shader.Me.Parent.Setting = Shader.Me.Setting;
            Shader.Me = Shader.Me.Parent;
            return this.Body;
        };
        ShaderBuilder.prototype.BuildVertex = function () {
            Shader.Me.Parent.Setting = Shader.Me.Setting;
            Shader.Me = Shader.Me.Parent;
            return this.VertexBody;
        };
        ShaderBuilder.prototype.SetUniform = function (name, type) {
            if (!Shader.Me.VertexUniforms)
                Shader.Me.VertexUniforms = "";
            if (!Shader.Me.FragmentUniforms)
                Shader.Me.FragmentUniforms = "";
            this.VertexUniforms += 'uniform ' + type + ' ' + name + ';\n\
            ';
            this.FragmentUniforms += 'uniform ' + type + ' ' + name + ';\n\
            ';
            return this;
        };
        ShaderBuilder.prototype.BuildMaterial = function (scene) {
            this.PrepareBeforeMaterialBuild();
            if (Shader.ShaderIdentity == null)
                Shader.ShaderIdentity = 0;
            Shader.ShaderIdentity++;
            var shaderMaterial = new ShaderMaterialHelper().ShaderMaterial("ShaderBuilder_" + Shader.ShaderIdentity, scene, {
                Pixel: Shader.Join(this.Fragment)
                    .replace("#[Source]", this.Body),
                Vertex: Shader.Join(this.Vertex)
                    .replace("#[Source]", Shader.Def(this.VertexBody, ""))
                    .replace("#[AfterFinishVertex]", Shader.Def(this.AfterVertex, ""))
            }, {
                uniforms: this.Uniforms,
                attributes: this.Attributes
            });
            Shader.Indexer = 1;
            return this.PrepareMaterial(shaderMaterial, scene);
        };
        ShaderBuilder.prototype.BuildPostProcess = function (camera, scene, scale, option) {
            this.Setting.Screen = true;
            this.Setting.Mouse = true;
            this.Setting.Time = true;
            this.Setting.CameraShot = true;
            this.PrepareBeforePostProcessBuild();
            if (Shader.ShaderIdentity == null)
                Shader.ShaderIdentity = 0;
            Shader.ShaderIdentity++;
            var samplers = [];
            for (var s in this.Setting.Texture2Ds) {
                samplers.push(ShaderMaterialHelperStatics.Texture2D + s);
            }
            if (this.PPSSamplers != null) {
                for (var s in this.PPSSamplers) {
                    if (this.PPSSamplers[s]) {
                        samplers.push(this.PPSSamplers[s]);
                    }
                }
            }
            var shaderPps = new ShaderMaterialHelper().ShaderPostProcess("ShaderBuilder_" + Shader.ShaderIdentity, samplers, camera, scale, {
                Pixel: Shader.Join(this.Fragment)
                    .replace("#[Source]", this.Body),
                Vertex: Shader.Join(this.Vertex)
                    .replace("#[Source]", Shader.Def(this.VertexBody, ""))
                    .replace("#[AfterFinishVertex]", Shader.Def(this.AfterVertex, ""))
            }, {
                uniforms: this.Uniforms,
                attributes: this.Attributes
            }, option);
            if (this.Setting.Texture2Ds != null) {
                for (var s in this.Setting.Texture2Ds) {
                    // setTexture2D
                    var texture = new ShaderMaterialHelper().DefineTexture(this.Setting.Texture2Ds[s].key, scene);
                    new ShaderMaterialHelper().PostProcessTextures(shaderPps, ShaderMaterialHelperStatics.Texture2D + s, texture);
                }
            }
            return shaderPps;
        };
        ShaderBuilder.prototype.Event = function (index, mat) {
            Shader.Me.Setting.Flags = true;
            Shader.Indexer++;
            this.Body = Shader.Def(this.Body, "");
            this.Body += "  if ( floor(mod( " + ShaderMaterialHelperStatics.uniformFlags + "/pow(2.," + Shader.Print(index) + "),2.)) == 1.) { " + mat + " } ";
            return this;
        };
        ShaderBuilder.prototype.EventVertex = function (index, mat) {
            Shader.Me.Setting.Flags = true;
            Shader.Me.Setting.Vertex = true;
            Shader.Indexer++;
            this.VertexBody = Shader.Def(this.VertexBody, "");
            this.VertexBody += " if( floor(mod( " + ShaderMaterialHelperStatics.uniformFlags + "/pow(2.," + Shader.Print(index) + "),2.)) == 1. ){ " + mat + "}";
            return this;
        };
        ShaderBuilder.prototype.Transparency = function () {
            Shader.Me.Setting.Transparency = true;
            return this;
        };
        ShaderBuilder.prototype.PostEffect1 = function (id, effect) {
            if (Shader.Me.PostEffect1Effects == null)
                Shader.Me.PostEffect1Effects = [];
            Shader.Me.PostEffect1[id] = effect;
            return this;
        };
        ShaderBuilder.prototype.PostEffect2 = function (id, effect) {
            if (Shader.Me.PostEffect2Effects == null)
                Shader.Me.PostEffect2Effects = [];
            Shader.Me.PostEffect2[id] = effect;
            return this;
        };
        ShaderBuilder.prototype.ImportSamplers = function (txts) {
            if (Shader.Me.PPSSamplers == null)
                Shader.Me.PPSSamplers = [];
            for (var s in txts) {
                Shader.Me.PPSSamplers.push(txts[s]);
            }
            return this;
        };
        ShaderBuilder.prototype.Wired = function () {
            Shader.Me.Setting.Wire = true;
            return this;
        };
        ShaderBuilder.prototype.VertexShader = function (mat) {
            this.VertexBody = Shader.Def(this.VertexBody, "");
            this.VertexBody += mat;
            return this;
        };
        ShaderBuilder.prototype.Solid = function (color) {
            color = Shader.Def(color, { r: 0., g: 0., b: 0., a: 1. });
            color.a = Shader.Def(color.a, 1.);
            color.r = Shader.Def(color.r, 0.);
            color.g = Shader.Def(color.g, 0.);
            color.b = Shader.Def(color.b, 0.);
            this.Body = Shader.Def(this.Body, "");
            this.Body += " result = vec4(" + Shader.Print(color.r) + "," + Shader.Print(color.g) + "," + Shader.Print(color.b) + "," + Shader.Print(color.a) + ");";
            return this;
        };
        ShaderBuilder.prototype.GetMapIndex = function (key) {
            if (Shader.Me.Setting.Texture2Ds != null) {
                for (var it in Shader.Me.Setting.Texture2Ds) {
                    if (this.Setting.Texture2Ds[it].key == key) {
                        return it;
                    }
                }
            }
            else
                Shader.Me.Setting.Texture2Ds = [];
            return -1;
        };
        ShaderBuilder.prototype.GetCubeMapIndex = function (key) {
            if (Shader.Me.Setting.TextureCubes != null) {
                for (var it in Shader.Me.Setting.TextureCubes) {
                    if (this.Setting.TextureCubes[it].key == key) {
                        return it;
                    }
                }
            }
            else
                Shader.Me.Setting.TextureCubes = [];
            return -1;
        };
        ShaderBuilder.prototype.Func = function (fun) {
            return fun(Shader.Me);
        };
        ShaderBuilder.prototype.Nut = function (value, option) {
            Shader.Indexer++;
            option = Shader.Def(option, {});
            option.frame = Shader.Def(option.frame, 'sin(time*0.4)');
            var sresult = Shader.Join([
                "float nut#[Ind]= " + Shader.Print(value) + ";",
                "float nut_ts#[Ind] = " + Shader.Print(option.frame) + ";",
                this.Func(function (me) {
                    var f = [];
                    for (var i = 0; i < option.bones.length; i++) {
                        f.push('vec3 nut_p#[Ind]_' + i + ' = ' + option.bones[i].center + ';');
                    }
                    return Shader.Join(f);
                }),
                this.Func(function (me) {
                    var f = [];
                    for (var i = 0; i < option.bones.length; i++) {
                        f.push('if(nut#[Ind] ' + option.bones[i].bet + '){ ');
                        for (var j = 0; j < option.array.length; j++) {
                            if (option.bones[i].rotation.x != null && option.bones[i].rotation.x != undefined) {
                                f.push(option.array[j] + ' = r_x(' + option.array[j] +
                                    ',nut_ts#[Ind]*' + Shader.Print(option.bones[i].rotation.x)
                                    + ',nut_p#[Ind]_' + i + ');');
                                for (var v = i + 1; v < option.bones.length; v++) {
                                    f.push('nut_p#[Ind]_' + v + ' = r_x(nut_p#[Ind]_' + v +
                                        ',nut_ts#[Ind]*' + Shader.Print(option.bones[i].rotation.x)
                                        + ',nut_p#[Ind]_' + i + ');');
                                }
                            }
                            if (option.bones[i].rotation.y != null && option.bones[i].rotation.y != undefined) {
                                f.push(option.array[j] + ' = r_y(' + option.array[j] + ',nut_ts#[Ind]*' + Shader.Print(option.bones[i].rotation.y)
                                    + ',nut_p#[Ind]_' + i + ');');
                                for (var v = i + 1; v < option.bones.length; v++) {
                                    f.push('nut_p#[Ind]_' + v + ' = r_y(nut_p#[Ind]_' + v + ',nut_ts#[Ind]*' + Shader.Print(option.bones[i].rotation.y)
                                        + ',nut_p#[Ind]_' + i + ');');
                                }
                            }
                            if (option.bones[i].rotation.z != null && option.bones[i].rotation.z != undefined) {
                                f.push(option.array[j] + ' = r_z(' + option.array[j] + ',nut_ts#[Ind]*' + Shader.Print(option.bones[i].rotation.z)
                                    + ',nut_p#[Ind]_' + i + ');');
                                for (var v = i + 1; v < option.bones.length; v++) {
                                    f.push('nut_p#[Ind]_' + v + ' = r_z(nut_p#[Ind]_' + v + ',nut_ts#[Ind]*' + Shader.Print(option.bones[i].rotation.z)
                                        + ',nut_p#[Ind]_' + i + ');');
                                }
                            }
                        }
                        f.push('}');
                    }
                    return Shader.Join(f);
                })
            ]);
            this.VertexBody = Shader.Def(this.VertexBody, "");
            sresult = Shader.Replace(sresult, '#[Ind]', Shader.Indexer.toString()) + " result = vec4(pos,1.);";
            this.VertexBody += sresult;
            return this;
        };
        ShaderBuilder.prototype.Map = function (option) {
            Shader.Indexer++;
            option = Shader.Def(option, { path: '/images/color.png' });
            var s = 0.;
            var refInd = '';
            if (option.index == null || option.index == undefined) {
                s = Shader.Me.GetMapIndex(option.path);
                if (s == -1) {
                    Shader.Me.Setting.Texture2Ds.push({ key: option.path, inVertex: option.useInVertex, inFragment: true });
                }
                else {
                    Shader.Me.Setting.Texture2Ds[s].inVertex = option.useInVertex;
                }
                s = Shader.Me.GetMapIndex(option.path);
                refInd = ShaderMaterialHelperStatics.Texture2D + s;
            }
            else if (option.index == "current") {
                refInd = "textureSampler"; // used Only for postProcess
            }
            else {
                var sn = Shader.Replace(option.index.toString(), '-', '0');
                var reg = new RegExp('^\\d+$');
                if (reg.test(sn) && option.index.toString().indexOf('.') == -1)
                    refInd = ShaderMaterialHelperStatics.Texture2D + option.index;
                else {
                    refInd = option.index;
                }
            }
            Shader.Me.Setting.Center = true;
            Shader.Me.Setting.Helpers = true;
            Shader.Me.Setting.Uv = true;
            option.normal = Shader.Def(option.normal, Normals.Map);
            option.alpha = Shader.Def(option.alpha, false);
            option.bias = Shader.Def(option.bias, "0.");
            option.normalLevel = Shader.Def(option.normalLevel, 1.0);
            option.path = Shader.Def(option.path, "qa.jpg");
            option.rotation = Shader.Def(option.rotation, { x: 0, y: 0, z: 0 });
            option.scaleX = Shader.Def(option.scaleX, 1.);
            option.scaleY = Shader.Def(option.scaleY, 1.);
            option.useInVertex = Shader.Def(option.useInVertex, false);
            option.x = Shader.Def(option.x, 0.0);
            option.y = Shader.Def(option.y, 0.0);
            option.uv = Shader.Def(option.uv, ShaderMaterialHelperStatics.Uv);
            option.animation = Shader.Def(option.animation, false);
            option.tiled = Shader.Def(option.tiled, false);
            option.columnIndex = Shader.Def(option.columnIndex, 1);
            option.rowIndex = Shader.Def(option.rowIndex, 1);
            option.animationSpeed = Shader.Def(option.animationSpeed, 2000);
            option.animationFrameEnd = Shader.Def(option.animationFrameEnd, 100) + option.indexCount;
            option.animationFrameStart = Shader.Def(option.animationFrameStart, 0) + option.indexCount;
            option.indexCount = Shader.Def(option.indexCount, 1);
            var frameLength = Math.min(option.animationFrameEnd - option.animationFrameStart, option.indexCount * option.indexCount);
            var uv = Shader.Def(option.uv, ShaderMaterialHelperStatics.Uv);
            if (option.uv == "planar") {
                uv = ShaderMaterialHelperStatics.Position;
            }
            else {
                uv = 'vec3(' + option.uv + '.x,' + option.uv + '.y,0.)';
            }
            option.scaleX /= option.indexCount;
            option.scaleY /= option.indexCount;
            var rotate = ["vec3 centeri#[Ind] = " + ShaderMaterialHelperStatics.Center + ";",
                "vec3 ppo#[Ind] = r_z( " + uv + "," + Shader.Print(option.rotation.x) + ",centeri#[Ind]);  ",
                " ppo#[Ind] = r_y( ppo#[Ind]," + Shader.Print(option.rotation.y) + ",centeri#[Ind]);  ",
                " ppo#[Ind] = r_x( ppo#[Ind]," + Shader.Print(option.rotation.x) + ",centeri#[Ind]); ",
                "vec3 nrm#[Ind] = r_z( " + option.normal + "," + Shader.Print(option.rotation.x) + ",centeri#[Ind]);  ",
                " nrm#[Ind] = r_y( nrm#[Ind]," + Shader.Print(option.rotation.y) + ",centeri#[Ind]);  ",
                " nrm#[Ind] = r_x( nrm#[Ind]," + Shader.Print(option.rotation.z) + ",centeri#[Ind]);  "].join("\n\
");
            var sresult = Shader.Join([rotate,
                " vec4 color#[Ind] = texture2D(" +
                    refInd + " ,ppo#[Ind].xy*vec2(" +
                    Shader.Print(option.scaleX) + "," + Shader.Print(option.scaleY) + ")+vec2(" +
                    Shader.Print(option.x) + "," + Shader.Print(option.y) + ")" + (option.bias == null || Shader.Print(option.bias) == '0.' ? "" : "," + Shader.Print(option.bias)) + ");",
                " if(nrm#[Ind].z < " + Shader.Print(option.normalLevel) + "){ ",
                (option.alpha ? " result =  color#[Ind];" : "result = vec4(color#[Ind].rgb , 1.); "),
                "}"]);
            if (option.indexCount > 1 || option.tiled) {
                option.columnIndex = option.indexCount - option.columnIndex + 1.0;
                sresult = [
                    " vec3 uvt#[Ind] = vec3(" + uv + ".x*" + Shader.Print(option.scaleX) + "+" + Shader.Print(option.x) + "," + uv + ".y*" + Shader.Print(option.scaleY) + "+" + Shader.Print(option.y) + ",0.0);     ",
                    "             ",
                    " float xst#[Ind] = 1./(" + Shader.Print(option.indexCount) + "*2.);                                                    ",
                    " float yst#[Ind] =1./(" + Shader.Print(option.indexCount) + "*2.);                                                     ",
                    " float xs#[Ind] = 1./" + Shader.Print(option.indexCount) + ";                                                     ",
                    " float ys#[Ind] = 1./" + Shader.Print(option.indexCount) + ";                                                     ",
                    " float yid#[Ind] = " + Shader.Print(option.columnIndex - 1.0) + " ;                                                      ",
                    " float xid#[Ind] =  " + Shader.Print(option.rowIndex - 1.0) + ";                                                      ",
                    option.animation ? " float ind_a#[Ind] = floor(mod(time*0.001*" + Shader.Print(option.animationSpeed) + ",   " + Shader.Print(frameLength) + " )+" + Shader.Print(option.animationFrameStart) + ");" +
                        " yid#[Ind] = " + Shader.Print(option.indexCount) + "- floor(ind_a#[Ind] /  " + Shader.Print(option.indexCount) + ");" +
                        " xid#[Ind] =  floor(mod(ind_a#[Ind] ,  " + Shader.Print(option.indexCount) + ")); "
                        : "",
                    " float xi#[Ind] = mod(uvt#[Ind].x ,xs#[Ind])+xs#[Ind]*xid#[Ind]  ;                                   ",
                    " float yi#[Ind] = mod(uvt#[Ind].y ,ys#[Ind])+ys#[Ind]*yid#[Ind]  ;                                   ",
                    "                                                                       ",
                    " float xi2#[Ind] = mod(uvt#[Ind].x -xs#[Ind]*0.5 ,xs#[Ind])+xs#[Ind]*xid#[Ind]      ;                     ",
                    " float yi2#[Ind] = mod(uvt#[Ind].y -ys#[Ind]*0.5,ys#[Ind])+ys#[Ind]*yid#[Ind]   ;                         ",
                    "                                                                       ",
                    "                                                                       ",
                    " vec4 f#[Ind] = texture2D(" + refInd + ",vec2(xi#[Ind],yi#[Ind])) ;                             ",
                    " result =   f#[Ind] ;                                               ",
                    (option.tiled ? [" vec4 f2#[Ind] = texture2D(" + refInd + ",vec2(xi2#[Ind]+xid#[Ind] ,yi#[Ind])) ;                      ",
                        " vec4 f3#[Ind] = texture2D(" + refInd + ",vec2(xi#[Ind],yi2#[Ind]+yid#[Ind])) ;                       ",
                        " vec4 f4#[Ind] = texture2D(" + refInd + ",vec2(xi2#[Ind]+xid#[Ind],yi2#[Ind]+yid#[Ind])) ;                  ",
                        "                                                                       ",
                        "                                                                       ",
                        " float ir#[Ind]  = 0.,ir2#[Ind] = 0.;                                              ",
                        "                                                                       ",
                        "     if( yi2#[Ind]  >= yid#[Ind] *ys#[Ind] ){                                            ",
                        "         ir2#[Ind]  = min(2.,max(0.,( yi2#[Ind]-yid#[Ind] *ys#[Ind])*2.0/ys#[Ind] ))   ;             ",
                        "         if(ir2#[Ind] > 1.0) ir2#[Ind] =1.0-(ir2#[Ind]-1.0);                             ",
                        "         ir2#[Ind] = min(1.0,max(0.0,pow(ir2#[Ind]," + Shader.Print(15.) + " )*" + Shader.Print(3.) + ")); ",
                        "         result =  result *(1.0-ir2#[Ind]) +f3#[Ind]*ir2#[Ind]  ;           ",
                        "     }                                                                 ",
                        " if( xi2#[Ind]  >= xid#[Ind] *xs#[Ind]   ){                                               ",
                        "         ir2#[Ind]  = min(2.,max(0.,( xi2#[Ind]-xid#[Ind] *xs#[Ind])*2.0/xs#[Ind] ))   ;             ",
                        "         if(ir2#[Ind] > 1.0) ir2#[Ind] =1.0-(ir2#[Ind]-1.0);                             ",
                        "         ir2#[Ind] = min(1.0,max(0.0,pow(ir2#[Ind]," + Shader.Print(15.) + " )*" + Shader.Print(3.) + ")); ",
                        "         result = result *(1.0-ir2#[Ind]) +f2#[Ind]*ir2#[Ind]  ;           ",
                        "     }  ",
                        " if( xi2#[Ind]  >= xid#[Ind] *xs#[Ind]  && xi2#[Ind]  >= xid#[Ind] *xs#[Ind]  ){                                               ",
                        "         ir2#[Ind]  = min(2.,max(0.,( xi2#[Ind]-xid#[Ind] *xs#[Ind])*2.0/xs#[Ind] ))   ;             ",
                        "  float       ir3#[Ind]  = min(2.,max(0.,( yi2#[Ind]-yid#[Ind] *ys#[Ind])*2.0/ys#[Ind] ))   ;             ",
                        "         if(ir2#[Ind] > 1.0) ir2#[Ind] =1.0-(ir2#[Ind]-1.0);                             ",
                        "         if(ir3#[Ind] > 1.0) ir3#[Ind] =1.0-(ir3#[Ind]-1.0);                             ",
                        "         ir2#[Ind] = min(1.0,max(0.0,pow(ir2#[Ind]," + Shader.Print(15.) + " )*" + Shader.Print(3.) + ")); ",
                        "         ir3#[Ind] = min(1.0,max(0.0,pow(ir3#[Ind]," + Shader.Print(15.) + " )*" + Shader.Print(3.) + ")); ",
                        "         ir2#[Ind] = min(1.0,max(0.0, ir2#[Ind]* ir3#[Ind] )); ",
                        " if(nrm#[Ind].z < " + Shader.Print(option.normalLevel) + "){ ",
                        (option.alpha ? "    result =  result *(1.0-ir2#[Ind]) +f4#[Ind]* ir2#[Ind]   ;" : "    result = vec4(result.xyz*(1.0-ir2#[Ind]) +f4#[Ind].xyz* ir2#[Ind]   ,1.0); "),
                        "}",
                        "     }  "
                    ].join("\n") : "")].join("\n");
            }
            sresult = Shader.Replace(sresult, '#[Ind]', "_" + Shader.Indexer + "_");
            this.Body = Shader.Def(this.Body, "");
            this.Body += sresult;
            return this;
        };
        ShaderBuilder.prototype.Multi = function (mats, combine) {
            combine = Shader.Def(combine, true);
            Shader.Indexer++;
            var pre = "", ps = ["", "", "", ""], psh = "0.0";
            for (var i = 0; i < mats.length; i++) {
                if (mats[i].result == undefined || mats[i].result == null)
                    mats[i] = { result: mats[i], opacity: 1.0 };
                pre += " vec4 result#[Ind]" + i + ";result#[Ind]" + i + " = vec4(0.,0.,0.,0.); float rp#[Ind]" + i + " = " + Shader.Print(mats[i].opacity) + "; \n\
";
                pre += mats[i].result + "\n\
                ";
                pre += " result#[Ind]" + i + " = result; \n\
";
                ps[0] += (i == 0 ? "" : " + ") + "result#[Ind]" + i + ".x*rp#[Ind]" + i;
                ps[1] += (i == 0 ? "" : " + ") + "result#[Ind]" + i + ".y*rp#[Ind]" + i;
                ps[2] += (i == 0 ? "" : " + ") + "result#[Ind]" + i + ".z*rp#[Ind]" + i;
                ps[3] += (i == 0 ? "" : " + ") + "result#[Ind]" + i + ".w*rp#[Ind]" + i;
                psh += "+" + Shader.Print(mats[i].opacity);
            }
            if (combine) {
                ps[0] = "(" + ps[0] + ")/(" + Shader.Print(psh) + ")";
                ps[1] = "(" + ps[1] + ")/(" + Shader.Print(psh) + ")";
                ps[2] = "(" + ps[2] + ")/(" + Shader.Print(psh) + ")";
                ps[3] = "(" + ps[3] + ")/(" + Shader.Print(psh) + ")";
            }
            pre += "result = vec4(" + ps[0] + "," + ps[1] + "," + ps[2] + "," + ps[3] + ");";
            this.Body = Shader.Def(this.Body, "");
            this.Body += Shader.Replace(pre, "#[Ind]", "_" + Shader.Indexer + "_");
            return this;
        };
        ShaderBuilder.prototype.Back = function (mat) {
            Shader.Me.Setting.Back = true;
            mat = Shader.Def(mat, '');
            this.Body = Shader.Def(this.Body, "");
            this.Body += 'if(' + ShaderMaterialHelperStatics.face_back + '){' + mat + ';}';
            return this;
        };
        ShaderBuilder.prototype.InLine = function (mat) {
            mat = Shader.Def(mat, '');
            this.Body = Shader.Def(this.Body, "");
            this.Body += mat;
            return this;
        };
        ShaderBuilder.prototype.Front = function (mat) {
            mat = Shader.Def(mat, '');
            this.Body = Shader.Def(this.Body, "");
            this.Body += 'if(' + ShaderMaterialHelperStatics.face_front + '){' + mat + ';}';
            return this;
        };
        ShaderBuilder.prototype.Range = function (mat1, mat2, option) {
            Shader.Indexer++;
            var k = Shader.Indexer;
            option.start = Shader.Def(option.start, 0.);
            option.end = Shader.Def(option.end, 1.);
            option.direction = Shader.Def(option.direction, ShaderMaterialHelperStatics.Position + '.y');
            var sresult = [
                "float s_r_dim#[Ind] = " + option.direction + ";",
                "if(s_r_dim#[Ind] > " + Shader.Print(option.end) + "){",
                mat2,
                "}",
                "else { ",
                mat1,
                "   vec4 mat1#[Ind]; mat1#[Ind]  = result;",
                "   if(s_r_dim#[Ind] > " + Shader.Print(option.start) + "){ ",
                mat2,
                "       vec4 mati2#[Ind];mati2#[Ind] = result;",
                "       float s_r_cp#[Ind]  = (s_r_dim#[Ind] - (" + Shader.Print(option.start) + "))/(" + Shader.Print(option.end) + "-(" + Shader.Print(option.start) + "));",
                "       float s_r_c#[Ind]  = 1.0 - s_r_cp#[Ind];",
                "       result = vec4(mat1#[Ind].x*s_r_c#[Ind]+mati2#[Ind].x*s_r_cp#[Ind],mat1#[Ind].y*s_r_c#[Ind]+mati2#[Ind].y*s_r_cp#[Ind],mat1#[Ind].z*s_r_c#[Ind]+mati2#[Ind].z*s_r_cp#[Ind],mat1#[Ind].w*s_r_c#[Ind]+mati2#[Ind].w*s_r_cp#[Ind]);",
                "   }",
                "   else { result = mat1#[Ind]; }",
                "}"
            ].join('\n\
');
            sresult = Shader.Replace(sresult, '#[Ind]', "_" + Shader.Indexer + "_");
            this.Body = Shader.Def(this.Body, "");
            this.Body += sresult;
            return this;
        };
        ShaderBuilder.prototype.Reference = function (index, mat) {
            if (Shader.Me.References == null)
                Shader.Me.References = "";
            var sresult = "vec4 resHelp#[Ind] = result;";
            if (Shader.Me.References.indexOf("," + index + ",") == -1) {
                Shader.Me.References += "," + index + ",";
                sresult += " vec4 result_" + index + " = vec4(0.);\n\
                ";
            }
            if (mat == null) {
                sresult += "  result_" + index + " = result;";
            }
            else {
                sresult += mat + "\n\
                 result_" + index + " = result;";
            }
            sresult += "result = resHelp#[Ind] ;";
            sresult = Shader.Replace(sresult, '#[Ind]', "_" + Shader.Indexer + "_");
            this.Body = Shader.Def(this.Body, "");
            this.Body += sresult;
            return this;
        };
        ShaderBuilder.prototype.ReplaceColor = function (index, color, mat, option) {
            Shader.Indexer++;
            option = Shader.Def(option, {});
            var d = Shader.Def(option.rangeStep, -0.280);
            var d2 = Shader.Def(option.rangePower, 0.0);
            var d3 = Shader.Def(option.colorIndex, 0.0);
            var d4 = Shader.Def(option.colorStep, 1.0);
            var ilg = Shader.Def(option.indexToEnd, false);
            var lg = " > 0.5 + " + Shader.Print(d) + " ";
            var lw = " < 0.5 - " + Shader.Print(d) + " ";
            var rr = "((result_" + index + ".x*" + Shader.Print(d4) + "-" + Shader.Print(d3) + ")>1.0 ? 0. : max(0.,(result_" + index + ".x*" + Shader.Print(d4) + "-" + Shader.Print(d3) + ")))";
            var rg = "((result_" + index + ".y*" + Shader.Print(d4) + "-" + Shader.Print(d3) + ")>1.0 ? 0. : max(0.,(result_" + index + ".y*" + Shader.Print(d4) + "-" + Shader.Print(d3) + ")))";
            var rb = "((result_" + index + ".z*" + Shader.Print(d4) + "-" + Shader.Print(d3) + ")>1.0 ? 0. : max(0.,(result_" + index + ".z*" + Shader.Print(d4) + "-" + Shader.Print(d3) + ")))";
            if (ilg) {
                rr = "min(1.0, max(0.,(result_" + index + ".x*" + Shader.Print(d4) + "-" + Shader.Print(d3) + ")))";
                rg = "min(1.0, max(0.,(result_" + index + ".y*" + Shader.Print(d4) + "-" + Shader.Print(d3) + ")))";
                rb = "min(1.0, max(0.,(result_" + index + ".z*" + Shader.Print(d4) + "-" + Shader.Print(d3) + ")))";
            }
            var a = " && ";
            var p = " + ";
            var r = "";
            var cond = "";
            switch (color) {
                case Helper.White:
                    cond = rr + lg + a + rg + lg + a + rb + lg;
                    r = "(" + rr + p + rg + p + rb + ")/3.0";
                    break;
                case Helper.Cyan:
                    cond = rr + lw + a + rg + lg + a + rb + lg;
                    r = "(" + rg + p + rb + ")/2.0 - (" + rr + ")/1.0";
                    break;
                case Helper.Pink:
                    cond = rr + lg + a + rg + lw + a + rb + lg;
                    r = "(" + rr + p + rb + ")/2.0 - (" + rg + ")/1.0";
                    break;
                case Helper.Yellow:
                    cond = rr + lg + a + rg + lg + a + rb + lw;
                    r = "(" + rr + p + rg + ")/2.0 - (" + rb + ")/1.0";
                    break;
                case Helper.Blue:
                    cond = rr + lw + a + rg + lw + a + rb + lg;
                    r = "(" + rb + ")/1.0 - (" + rr + p + rg + ")/2.0";
                    break;
                case Helper.Red:
                    cond = rr + lg + a + rg + lw + a + rb + lw;
                    r = "(" + rr + ")/1.0 - (" + rg + p + rb + ")/2.0";
                    break;
                case Helper.Green:
                    cond = rr + lw + a + rg + lg + a + rb + lw;
                    r = "(" + rg + ")/1.0 - (" + rr + p + rb + ")/2.0";
                    break;
                case Helper.Black:
                    cond = rr + lw + a + rg + lw + a + rb + lw;
                    r = "1.0-(" + rr + p + rg + p + rb + ")/3.0";
                    break;
            }
            var sresult = " if( " + cond + " ) { vec4 oldrs#[Ind] = vec4(result);float al#[Ind] = max(0.0,min(1.0," + r + "+(" + Shader.Print(d2) + "))); float  l#[Ind] =  1.0-al#[Ind];  " + mat + " result = result*al#[Ind] +  oldrs#[Ind] * l#[Ind];    }";
            sresult = Shader.Replace(sresult, '#[Ind]', "_" + Shader.Indexer + "_");
            this.Body = Shader.Def(this.Body, "");
            this.Body += sresult;
            return this;
        };
        ShaderBuilder.prototype.Blue = function (index, mat, option) {
            return this.ReplaceColor(index, Helper.Blue, mat, option);
        };
        ShaderBuilder.prototype.Cyan = function (index, mat, option) {
            return this.ReplaceColor(index, Helper.Cyan, mat, option);
        };
        ShaderBuilder.prototype.Red = function (index, mat, option) {
            return this.ReplaceColor(index, Helper.Red, mat, option);
        };
        ShaderBuilder.prototype.Yellow = function (index, mat, option) {
            return this.ReplaceColor(index, Helper.Yellow, mat, option);
        };
        ShaderBuilder.prototype.Green = function (index, mat, option) {
            return this.ReplaceColor(index, Helper.Green, mat, option);
        };
        ShaderBuilder.prototype.Pink = function (index, mat, option) {
            return this.ReplaceColor(index, Helper.Pink, mat, option);
        };
        ShaderBuilder.prototype.White = function (index, mat, option) {
            return this.ReplaceColor(index, Helper.White, mat, option);
        };
        ShaderBuilder.prototype.Black = function (index, mat, option) {
            return this.ReplaceColor(index, Helper.Black, mat, option);
        };
        ShaderBuilder.prototype.ReflectCube = function (option) {
            Shader.Indexer++;
            option = Shader.Def(option, { path: '/images/cube/a' });
            var s = Shader.Me.GetCubeMapIndex(option.path);
            if (s == -1) {
                Shader.Me.Setting.TextureCubes.push({ key: option.path, inVertex: option.useInVertex, inFragment: true });
            }
            else {
                Shader.Me.Setting.TextureCubes[s].inVertex = true;
            }
            s = Shader.Me.GetCubeMapIndex(option.path);
            option.normal = Shader.Def(option.normal, Normals.Map);
            option.alpha = Shader.Def(option.alpha, false);
            option.bias = Shader.Def(option.bias, "0.");
            option.normalLevel = Shader.Def(option.normalLevel, 1.0);
            option.rotation = Shader.Def(option.rotation, { x: 0, y: 0, z: 0 });
            option.scaleX = Shader.Def(option.scaleX, 1.);
            option.scaleY = Shader.Def(option.scaleY, 1.);
            option.useInVertex = Shader.Def(option.useInVertex, false);
            option.x = Shader.Def(option.x, 0.0);
            option.y = Shader.Def(option.y, 0.0);
            option.uv = Shader.Def(option.uv, ShaderMaterialHelperStatics.Uv);
            option.reflectMap = Shader.Def(option.reflectMap, "1.");
            Shader.Me.Setting.Center = true;
            Shader.Me.Setting.Camera = true;
            Shader.Me.Setting.ReflectMatrix = true;
            var sresult = "";
            if (option.equirectangular) {
                option.path = Shader.Def(option.path, '/images/cube/roofl1.jpg');
                var s = Shader.Me.GetMapIndex(option.path);
                if (s == -1) {
                    Shader.Me.Setting.Texture2Ds.push({ key: option.path, inVertex: option.useInVertex, inFragment: true });
                }
                else {
                    Shader.Me.Setting.Texture2Ds[s].inVertex = true;
                }
                s = Shader.Me.GetMapIndex(option.path);
                Shader.Me.Setting.VertexWorld = true;
                Shader.Me.Setting.FragmentWorld = true;
                sresult = ' vec3 nWorld#[Ind] = normalize( mat3( world[0].xyz, world[1].xyz, world[2].xyz ) *  ' + option.normal + '); ' +
                    ' vec3 vReflect#[Ind] = normalize( reflect( normalize(  ' + ShaderMaterialHelperStatics.Camera + '- vec3(world * vec4(' + ShaderMaterialHelperStatics.Position + ', 1.0))),  nWorld#[Ind] ) ); ' +
                    'float yaw#[Ind] = .5 - atan( vReflect#[Ind].z, -1.* vReflect#[Ind].x ) / ( 2.0 * 3.14159265358979323846264);  ' +
                    ' float pitch#[Ind] = .5 - atan( vReflect#[Ind].y, length( vReflect#[Ind].xz ) ) / ( 3.14159265358979323846264);  ' +
                    ' vec3 color#[Ind] = texture2D( ' + ShaderMaterialHelperStatics.Texture2D + s + ', vec2( yaw#[Ind], pitch#[Ind])' + (option.bias == null || Shader.Print(option.bias) == '0.' ? "" : "," + Shader.Print(option.bias)) + ' ).rgb; result = vec4(color#[Ind] ,1.);';
            }
            else {
                option.path = Shader.Def(option.path, "/images/cube/a");
                sresult = [
                    "vec3 viewDir#[Ind] =  " + ShaderMaterialHelperStatics.Position + " - " + ShaderMaterialHelperStatics.Camera + " ;",
                    "  viewDir#[Ind] =r_x(viewDir#[Ind] ," + Shader.Print(option.rotation.x) + ",  " + ShaderMaterialHelperStatics.Center + ");",
                    "  viewDir#[Ind] =r_y(viewDir#[Ind] ," + Shader.Print(option.rotation.y) + "," + ShaderMaterialHelperStatics.Center + ");",
                    "  viewDir#[Ind] =r_z(viewDir#[Ind] ," + Shader.Print(option.rotation.z) + "," + ShaderMaterialHelperStatics.Center + ");",
                    "vec3 coords#[Ind] = " + (option.refract ? "refract" : "reflect") + "(viewDir#[Ind]" + (option.revers ? "*vec3(1.0)" : "*vec3(-1.0)") + ", " + option.normal + " " + (option.refract ? ",(" + Shader.Print(option.refractMap) + ")" : "") + " )+" + ShaderMaterialHelperStatics.Position + "; ",
                    "vec3 vReflectionUVW#[Ind] = vec3( " + ShaderMaterialHelperStatics.ReflectMatrix + " *  vec4(coords#[Ind], 0)); ",
                    "vec3 rc#[Ind]= textureCube(" +
                        ShaderMaterialHelperStatics.TextureCube + s + ", vReflectionUVW#[Ind] " + (option.bias == null || Shader.Print(option.bias) == '0.' ? "" : "," + Shader.Print(option.bias)) + ").rgb;",
                    "result =result  + vec4(rc#[Ind].x ,rc#[Ind].y,rc#[Ind].z, " + (!option.alpha ? "1." : "(rc#[Ind].x+rc#[Ind].y+rc#[Ind].z)/3.0 ") + ")*(min(1.,max(0.," + Shader.Print(option.reflectMap) + ")));  "
                ].join('\n\
            ');
            }
            sresult = Shader.Replace(sresult, '#[Ind]', "_" + Shader.Indexer + "_");
            this.Body = Shader.Def(this.Body, "");
            this.Body += sresult;
            return this;
        };
        ShaderBuilder.prototype.NormalMap = function (val, mat) {
            Shader.Me.Setting.NormalOpacity = val;
            Shader.Me.Setting.NormalMap = mat;
            return this;
        };
        ShaderBuilder.prototype.SpecularMap = function (mat) {
            Shader.Me.Setting.SpecularMap = mat;
            return this;
        };
        ShaderBuilder.prototype.Instance = function () {
            var setting = Shader.Me.Setting;
            var instance = new ShaderBuilder();
            instance.Parent = Shader.Me;
            instance.Setting = setting;
            return instance;
        };
        ShaderBuilder.prototype.Reflect = function (option, opacity) {
            opacity = Shader.Def(opacity, 1.);
            return this.Multi(["result = result;", { result: this.Instance().ReflectCube(option).Build(), opacity: opacity }], true);
        };
        ShaderBuilder.prototype.Light = function (option) {
            option = Shader.Def(option, {});
            option.color = Shader.Def(option.color, { r: 1., g: 1., b: 1., a: 1. });
            option.darkColorMode = Shader.Def(option.darkColorMode, false);
            option.direction = Shader.Def(option.direction, "vec3(sin(time*0.02)*28.,sin(time*0.02)*8.+10.,cos(time*0.02)*28.)");
            option.normal = Shader.Def(option.normal, Normals.Map);
            option.rotation = Shader.Def(option.rotation, { x: 0., y: 0., z: 0. });
            option.specular = Shader.Def(option.specular, Speculars.Map);
            option.specularLevel = Shader.Def(option.specularLevel, 1.);
            option.specularPower = Shader.Def(option.specularPower, 1.);
            option.phonge = Shader.Def(option.phonge, 0.);
            option.phongePower = Shader.Def(option.phongePower, 1.);
            option.phongeLevel = Shader.Def(option.phongeLevel, 1.);
            option.supplement = Shader.Def(option.supplement, false);
            option.reducer = Shader.Def(option.reducer, '1.');
            var c_c = option.color;
            if (option.darkColorMode) {
                c_c.a = 1.0 - c_c.a;
                c_c.r = 1.0 - c_c.r;
                c_c.g = 1.0 - c_c.g;
                c_c.b = 1.0 - c_c.b;
                c_c.a = c_c.a - 1.0;
            }
            Shader.Indexer++;
            Shader.Me.Setting.Camera = true;
            Shader.Me.Setting.FragmentWorld = true;
            Shader.Me.Setting.VertexWorld = true;
            Shader.Me.Setting.Helpers = true;
            Shader.Me.Setting.Center = true;
            var sresult = Shader.Join([
                "  vec3 dir#[Ind] = normalize(  vec3(world * vec4(" + ShaderMaterialHelperStatics.Position + ",1.)) - " + ShaderMaterialHelperStatics.Camera + ");",
                "  dir#[Ind] =r_x(dir#[Ind] ," + Shader.Print(option.rotation.x) + ",vec3(" + ShaderMaterialHelperStatics.Center + "));",
                "  dir#[Ind] =r_y(dir#[Ind] ," + Shader.Print(option.rotation.y) + ",vec3(" + ShaderMaterialHelperStatics.Center + "));",
                "  dir#[Ind] =r_z(dir#[Ind] ," + Shader.Print(option.rotation.z) + ",vec3(" + ShaderMaterialHelperStatics.Center + "));",
                "  vec4 p1#[Ind] = vec4(" + option.direction + ",.0);                                ",
                "  vec4 c1#[Ind] = vec4(" + Shader.Print(c_c.r) + "," + Shader.Print(c_c.g) + "," + Shader.Print(c_c.b) + ",0.0); ",
                "  vec3 vnrm#[Ind] = normalize(vec3(world * vec4(" + option.normal + ", 0.0)));          ",
                "  vec3 l#[Ind]= normalize(p1#[Ind].xyz " +
                    (!option.parallel ? "- vec3(world * vec4(" + ShaderMaterialHelperStatics.Position + ",1.))  " : "")
                    + ");   ",
                "  vec3 vw#[Ind]= normalize(camera -  vec3(world * vec4(" + ShaderMaterialHelperStatics.Position + ",1.)));  ",
                "  vec3 aw#[Ind]= normalize(vw#[Ind]+ l#[Ind]);  ",
                "  float sc#[Ind]= max(0.,min(1., dot(vnrm#[Ind], aw#[Ind])));   ",
                "  sc#[Ind]= pow(sc#[Ind]*min(1.,max(0.," + Shader.Print(option.specular) + ")), (" + Shader.Print(option.specularPower * 1000.) + "))/" + Shader.Print(option.specularLevel) + " ;  ",
                " float  ph#[Ind]= pow(" + Shader.Print(option.phonge) + "*2., (" + Shader.Print(option.phongePower) + "*0.3333))/(" + Shader.Print(option.phongeLevel) + "*3.) ;  ",
                "  float ndl#[Ind] = max(0., dot(vnrm#[Ind], l#[Ind]));                            ",
                "  float ls#[Ind] = " + (option.supplement ? "1.0 -" : "") + "max(0.,min(1.,ndl#[Ind]*ph#[Ind]*(" + Shader.Print(option.reducer) + "))) ;         ",
                "  result  += vec4( c1#[Ind].xyz*( ls#[Ind])*" + Shader.Print(c_c.a) + " ,  ls#[Ind]); ",
                "  float ls2#[Ind] = " + (option.supplement ? "0.*" : "1.*") + "max(0.,min(1., sc#[Ind]*(" + Shader.Print(option.reducer) + "))) ;         ",
                "  result  += vec4( c1#[Ind].xyz*( ls2#[Ind])*" + Shader.Print(c_c.a) + " ,  ls2#[Ind]); ",
            ]);
            sresult = Shader.Replace(sresult, '#[Ind]', "_" + Shader.Indexer + "_");
            this.Body = Shader.Def(this.Body, "");
            this.Body += sresult;
            return this;
        };
        ShaderBuilder.prototype.Effect = function (option) {
            var op = Shader.Def(option, {});
            Shader.Indexer++;
            var sresult = [
                'vec4 res#[Ind] = vec4(0.);',
                'res#[Ind].x = ' + (op.px ? Shader.Replace(Shader.Replace(Shader.Replace(Shader.Replace(op.px, 'px', 'result.x'), 'py', 'result.y'), 'pz', 'result.z'), 'pw', 'result.w') + ';' : ' result.x;'),
                'res#[Ind].y = ' + (op.py ? Shader.Replace(Shader.Replace(Shader.Replace(Shader.Replace(op.py, 'px', 'result.x'), 'py', 'result.y'), 'pz', 'result.z'), 'pw', 'result.w') + ';' : ' result.y;'),
                'res#[Ind].z = ' + (op.pz ? Shader.Replace(Shader.Replace(Shader.Replace(Shader.Replace(op.pz, 'px', 'result.x'), 'py', 'result.y'), 'pz', 'result.z'), 'pw', 'result.w') + ';' : ' result.z;'),
                'res#[Ind].w = ' + (op.pw ? Shader.Replace(Shader.Replace(Shader.Replace(Shader.Replace(op.pw, 'px', 'result.x'), 'py', 'result.y'), 'pz', 'result.z'), 'pw', 'result.w') + ';' : ' result.w;'),
                'res#[Ind]  = ' + (op.pr ? ' vec4(' + Shader.Replace(Shader.Replace(Shader.Replace(Shader.Replace(Shader.Replace(op.pr, 'pr', 'res#[Ind].x'), 'px', 'result.x'), 'py', 'result.y'), 'pz', 'result.z'), 'pw', 'result.w') + ','
                    + Shader.Replace(Shader.Replace(Shader.Replace(Shader.Replace(Shader.Replace(op.pr, 'pr', 'res#[Ind].y'), 'px', 'result.x'), 'py', 'result.y'), 'pz', 'result.z'), 'pw', 'result.w') + ',' +
                    Shader.Replace(Shader.Replace(Shader.Replace(Shader.Replace(Shader.Replace(op.pr, 'pr', 'res#[Ind].z'), 'px', 'result.x'), 'py', 'result.y'), 'pz', 'result.z'), 'pw', 'result.w')
                    + ',' +
                    Shader.Replace(Shader.Replace(Shader.Replace(Shader.Replace(Shader.Replace(op.pr, 'pr', 'res#[Ind].w'), 'px', 'result.x'), 'py', 'result.y'), 'pz', 'result.z'), 'pw', 'result.w')
                    + ');' : ' res#[Ind]*1.0;'),
                'result = res#[Ind] ;'
            ].join('\n\
');
            sresult = Shader.Replace(sresult, '#[Ind]', "_" + Shader.Indexer + "_");
            this.Body = Shader.Def(this.Body, "");
            this.Body += sresult;
            return this;
        };
        ShaderBuilder.prototype.IdColor = function (id, w) {
            var kg = { r: 0.0, g: 0.0, b: .0 };
            kg = Shader.torgb(id.valueOf() * 1.0, 255);
            this.Body = Shader.Def(this.Body, "");
            this.Body += 'result = vec4(' + Shader.Print(kg.r) + ',' + Shader.Print(kg.g) + ',' + Shader.Print(Math.max(kg.b, 0.0)) + ',' + Shader.Print(w) + ');';
            return this;
        };
        ShaderBuilder.prototype.Discard = function () {
            this.Body = Shader.Def(this.Body, "");
            this.Body += 'discard;';
            return this;
        };
        return ShaderBuilder;
    }());
    BABYLONX.ShaderBuilder = ShaderBuilder;
})(BABYLONX || (BABYLONX = {}));
//# sourceMappingURL=ShaderBuilder.js.map

//===============================================================


//  GeometryBuilder  Source
var _null = 'set null anyway';
function def(a, d) {
    if (a != undefined && a != null) return (d != undefined && d != null ? a : true);
    else
        if (d != _null)
            return (d != undefined && d != null ? d : false);
    return null;
}
var isInOp;
var mid =1;
function _each(ar, _do, e, b) {
    if (def(b)) b();
    for (var x in ar) {
        _do(ar[x], x);
    }
    if (def(e)) return e();
}

var importGeo = function (geo, v, f, op) {
        var st = 0;
        st = geo.vertices.length;

        if (!op) op = {};

        if (!op.t) {
            op.t = { x: 0, y: 0, z: 0 };
        }

        for (var i = 0; i < v.length ; i++) {
            geo.vertices.push({ x: v[i].x + (op.t.x), y: v[i].y + (op.t.y), z: v[i].z + (op.t.z) });
            geo.positions.push(v[i].x + (op.t.x), v[i].y + (op.t.y), v[i].z + (op.t.z));
        }

        for (var i = 0; i < f.length; i++) {
            if (!op || !op.checkFace || op.face(i, f[i]))
                geo.faces.push(f[i].a + st, f[i].b + st, f[i].c + st);
        }
} 
  var  face3 = function (geo, p1, p2, p3, op) {
        if (!op) { op = {}; }

        function exch(p) { return (p.x || p.x == 0.0); }
        if (!op.uv) { op.uv = "0123"; }

        //if (def(op.noUV, false)) op.uv = ".....";

        function addUv(i) {
            if (op.uv[i].toString() == "0") geo.uvs.push(0.0, 0.0);
            if (op.uv[i].toString() == "1") geo.uvs.push(0.0, op.vp);
            if (op.uv[i].toString() == "2") geo.uvs.push(op.up, 0.0);
        };

        if (!op.up) { op.up = 1.0; }
        if (!op.vp) { op.vp = 1.0; }


        if (exch(p1)) { geo.vertices.push(p1); geo.positions.push(p1.x, p1.y, p1.z); addUv(0); op.p1Ind = geo.vertices.length - 1; }
        if (exch(p2)) { geo.vertices.push(p2); geo.positions.push(p2.x, p2.y, p2.z); addUv(1); op.p2Ind = geo.vertices.length - 1; }
        if (exch(p3)) { geo.vertices.push(p3); geo.positions.push(p3.x, p3.y, p3.z); addUv(2); op.p3Ind = geo.vertices.length - 1; }


        if (op.p1Ind == null || op.p1Ind == undefined) op.p1Ind = p1;
        if (op.p2Ind == null || op.p2Ind == undefined) op.p2Ind = p2;
        if (op.p3Ind == null || op.p3Ind == undefined) op.p3Ind = p3;

        if (!def(isInOp)) {
            if (op.flip) {
                geo.faces.push(op.p1Ind, op.p2Ind, op.p3Ind);
            }
            else {
                geo.faces.push(op.p1Ind, op.p3Ind, op.p2Ind);
            }
        }
        else {
            if (op.flip) {
                if (isInOp.a && isInOp.b && isInOp.c) geo.faces.push(op.p1Ind, op.p2Ind, op.p3Ind);
            }
            else {
                if (isInOp.a && isInOp.c && isInOp.b) geo.faces.push(op.p1Ind, op.p3Ind, op.p2Ind);
            }
        }

        isInOp = null;

        return [op.p1Ind, op.p2Ind, op.p3Ind];
    } 
    var push1 = function (geo, p1, uv) {
        uv = def(uv, true);
        geo.vertices.push(p1); geo.positions.push(p1.x, p1.y, p1.z);
        if (uv) geo.uvs.push(0.0, 0.0);
        return geo.vertices.length - 1;
    } 
    var push3 = function (geo, p1, p2, p3, op) {
        if (!op) { op = {}; }

        if (!op.uv) { op.uv = "0123"; }

        function addUv(i) {
            if (op.uv[i].toString() == "0") geo.uvs.push(0.0, 0.0);
            if (op.uv[i].toString() == "1") geo.uvs.push(0.0, op.vp);
            if (op.uv[i].toString() == "2") geo.uvs.push(op.up, 0.0);
        };

        if (!op.up) { op.up = 1.0; }
        if (!op.vp) { op.vp = 1.0; }

        geo.vertices.push(p1); geo.positions.push(p1.x, p1.y, p1.z); addUv(0); op.p1Ind = geo.vertices.length - 1;
        geo.vertices.push(p2); geo.positions.push(p2.x, p2.y, p2.z); addUv(1); op.p2Ind = geo.vertices.length - 1;
        geo.vertices.push(p3); geo.positions.push(p3.x, p3.y, p3.z); addUv(2); op.p3Ind = geo.vertices.length - 1;

        return [op.p1Ind, op.p2Ind, op.p3Ind];
    } 
    var face = function (geo, p1, p2, p3, p4, op) {
        if (!op) { op = {}; }

        function exch(p) { if (!def(p)) return false; return (p.x || p.x == 0.0); }
        if (!op.uv) { op.uv = "0132"; }

        function addUv(i) {
            if (op.uv[i].toString() == "0") geo.uvs.push(0.0, 0.0);
            if (op.uv[i].toString() == "1") geo.uvs.push(0.0, op.vp);
            if (op.uv[i].toString() == "2") geo.uvs.push(op.up, 0.0);
            if (op.uv[i].toString() == "3") geo.uvs.push(op.up, op.vp);
        };

        if (!op.up) { op.up = 1.0; }
        if (!op.vp) { op.vp = 1.0; }


        if (exch(p1)) { geo.vertices.push(p1); geo.positions.push(p1.x, p1.y, p1.z); addUv(0); op.p1Ind = geo.vertices.length - 1; }
        if (exch(p2)) { geo.vertices.push(p2); geo.positions.push(p2.x, p2.y, p2.z); addUv(1); op.p2Ind = geo.vertices.length - 1; }
        if (exch(p3)) { geo.vertices.push(p3); geo.positions.push(p3.x, p3.y, p3.z); addUv(2); op.p3Ind = geo.vertices.length - 1; }
        if (exch(p4)) { geo.vertices.push(p4); geo.positions.push(p4.x, p4.y, p4.z); addUv(3); op.p4Ind = geo.vertices.length - 1; }


        if (op.p1Ind == null || op.p1Ind == undefined) op.p1Ind = p1;
        if (op.p2Ind == null || op.p2Ind == undefined) op.p2Ind = p2;
        if (op.p3Ind == null || op.p3Ind == undefined) op.p3Ind = p3;
        if (op.p4Ind == null || op.p4Ind == undefined) op.p4Ind = p4;

        if (!def(isInOp)) {
            if (op.flip) {

                geo.faces.push(op.p1Ind, op.p2Ind, op.p3Ind);
                geo.faces.push(op.p2Ind, op.p4Ind, op.p3Ind);
            }
            else {
                geo.faces.push(op.p1Ind, op.p3Ind, op.p2Ind);
                geo.faces.push(op.p2Ind, op.p3Ind, op.p4Ind);
            }
        }
        else {
            if (op.flip) {
                if (isInOp.a && isInOp.b && isInOp.c) geo.faces.push(op.p1Ind, op.p2Ind, op.p3Ind);
                if (isInOp.b && isInOp.d && isInOp.c) geo.faces.push(op.p2Ind, op.p4Ind, op.p3Ind);
            }
            else {
                if (isInOp.a && isInOp.c && isInOp.b) geo.faces.push(op.p1Ind, op.p3Ind, op.p2Ind);
                if (isInOp.b && isInOp.c && isInOp.d) geo.faces.push(op.p2Ind, op.p3Ind, op.p4Ind);
            }
        }

        isInOp = null;
        return [op.p1Ind, op.p2Ind, op.p3Ind, op.p4Ind];
    } 
    var push =  function (geo, p1, p2, p3, p4, op) {
        if (!op) { op = {}; }

        if (!op.uv) { op.uv = "0123"; }

        function addUv(i) {
            if (op.uv[i].toString() == "0") geo.uvs.push(0.0, 0.0);
            if (op.uv[i].toString() == "1") geo.uvs.push(0.0, op.vp);
            if (op.uv[i].toString() == "2") geo.uvs.push(op.up, 0.0);
            if (op.uv[i].toString() == "3") geo.uvs.push(op.up, op.vp);
        };

        if (!op.up) { op.up = 1.0; }
        if (!op.vp) { op.vp = 1.0; }

        geo.vertices.push(p1); geo.positions.push(p1.x, p1.y, p1.z); addUv(0); op.p1Ind = geo.vertices.length - 1;
        geo.vertices.push(p2); geo.positions.push(p2.x, p2.y, p2.z); addUv(1); op.p2Ind = geo.vertices.length - 1;
        geo.vertices.push(p3); geo.positions.push(p3.x, p3.y, p3.z); addUv(2); op.p3Ind = geo.vertices.length - 1;
        geo.vertices.push(p4); geo.positions.push(p4.x, p4.y, p4.z); addUv(3); op.p4Ind = geo.vertices.length - 1;

        return [op.p1Ind, op.p2Ind, op.p3Ind, op.p4Ind];
    } 

	var geometryBase = function (firstp, builder, exgeo, custom, op) {
        var geo = {
            faces: [],
            vertices: [],
            normals: [],
            positions: [],
            uvs: []
        };

        if (!exgeo)
            exgeo = geo;

        if (builder) {
            builder(firstp, exgeo);
        }

        if (custom) {
            exgeo = custom(exgeo);
        }

        return exgeo;
    };
	
	function toBabylonGeometry(op) {
    var vertexData = new BABYLON.VertexData();

    vertexData.indices = op.faces;
    vertexData.positions = op.positions;
    vertexData.normals = op.normals;
    vertexData.uvs = op.uvs;

    if (def(op.uv2s))
        vertexData.uv2s = op.uv2s;
    else
        vertexData.uv2s = [];
    return vertexData;
}

function fromBabylonGeometry(op, ref) {
    ref.faces = op.indices;
    ref.positions = op.positions;
    ref.normals = op.normals;
    ref.uvs = op.uvs;

    return ref;
	}

function buildBabylonMesh(op) {
    mid++;
    var geo = toBabylonGeometry(op.geo);

    var mesh = new BABYLON.Mesh('def_' + op.geo.id, op.scene);

    geo.normals = def(geo.normals, [])
    try {
        BABYLON.VertexData.ComputeNormals(geo.positions, geo.indices, geo.normals);

       } catch (e) {  
    }

    geo.applyToMesh(mesh, false);

    var center = { x: 0, y: 0, z: 0 };

    for (i = 0; i < geo.positions.length; i += 3.0) {
        center.x += geo.positions[i];
        center.y += geo.positions[i + 1];
        center.z += geo.positions[i + 2];
    }

    center = { x: center.x * 3.0 / geo.positions.length, y: center.y * 3.0 / geo.positions.length, z: center.z * 3.0 / geo.positions.length };
    mesh.center = center;
    return mesh;
}

 

var geometryInstance = function (op) {
    op = def(op, {});
    this.faces = def(op.faces, []);
    this.positions = def(op.positions, []);
    this.normals = def(op.normals, []);
    this.uvs = def(op.uvs, []);
    this.uv2s = def(op.uv2s, []);
    this.id = op.id;
    this.clone = function (th) {

        var s = { faces: [], positions: [], normals: [], uvs: [], vertices: [] };

        s.faces = _each(th.faces, function (at, t) { s.faces.push(at); }, function () { return s.faces; });
        s.positions = _each(th.positions, function (at, t) { s.positions.push(at); }, function () { return s.positions; });
        s.normals = _each(th.normals, function (at, t) { s.normals.push(at); }, function () { return s.normals; });
        s.uvs = _each(th.uvs, function (at, t) { s.uvs.push(at); }, function () { return s.uvs; });
        s.uv2s = _each(th.uv2s, function (at, t) { s.uv2s.push(at); }, function () { return s.uv2s; });

        s.vertices = _each(th.vertices, function (at, t) { s.vertices.push(at); }, function () { return s.vertices; });

        return s;
    }
} 
 geometryInstance.prototype = {
    faces: {},
    positions: {},
    normals: {},
    uvs: {}, uv2s: {},
    toMesh: function (  scene ) {
         
        
        var mesh = buildBabylonMesh({ scene: scene, geo: this });
 
         return mesh;
   
    }
}


// math base 
var floor = Math.floor;
var sin = Math.sin;
var cos = Math.cos;
var tan = Math.tan;
var atan = Math.atan;
var asin = Math.asin;
var acos = Math.acos;
var pow = function (x, y) { return Math.pow(x, (y ? y : 2.)); }
var ceil = Math.ceil;
var abs = Math.abs;
var exp = Math.exp;
var log = Math.log;
var max = Math.max;
var min = Math.min;
var random = Math.random;

// 
function r3(x) { return floor(x * 1000) / 1000; }
function r2(x) { return floor(x * 100) / 100; }
function r1(x) { return floor(x * 10) / 10; }
function r_3(x) { return floor(x * 1000000) / 1000 }
function r_2(x) { return floor(x * 10000) / 100; }
function r_1(x) { return floor(x * 100) / 10; }


function rd(min, max) {
    return (random()) * (max - min) + min;
}

var round = Math.round;
var sqrt = Math.sqrt;
var PI = Math.PI;
var E = Math.E;

var deg = PI / 180.;
var rad = 180. / PI;



//  ver 1.0.01.003
function dim(v, u) {
    return sqrt(pow(u.x - v.x) + pow(u.y - v.y) + (def(u.z) ? pow(u.z - v.z) : 0));
}
function norm(v) {
    var x = v.x, y = v.y, z = v.z;
    var n = sqrt(x * x + y * y + z * z);

    if (n == 0) return { x: 0.1, y: 0.1, z: 0.1 };

    var invN = 1 / n;
    v.x *= invN;
    v.y *= invN;
    v.z *= invN;

    return v;
}
function sub(v, u) {
    return { x: u.x - v.x, y: u.y - v.y, z: u.z - v.z };
}
function dot(v, u) {
    return { x: u.x * v.x, y: u.y * v.y, z: u.z * v.z };
}
function cross(v, u) {
    var vx = v.x, vy = v.y, vz = v.z, x = u.x, y = u.y, z = u.z;
    var target = { x: 0, y: 0, z: 0 };

    target.x = ((y * vz) - (z * vy));
    target.y = ((z * vx) - (x * vz));
    target.z = ((x * vy) - (y * vx));

    return target;
}
function nott(v) {
    return { x: -1 * v.x, y: -1 * v.y, z: -1 * v.z };
}
function add(v, u) {
    return { x: u.x + v.x, y: u.y + v.y, z: u.z + v.z };
}
function rotate_xy(pr1, pr2, alpha) {
    pp2 = { x: pr2.x - pr1.x, y: pr2.y - pr1.y };

    return {
        x: pr1.x + pp2.x * cos(alpha) - pp2.y * sin(alpha),
        y: pr1.y + pp2.x * sin(alpha) + pp2.y * cos(alpha)
    };
}

function r_y(n, a, c) {

    c = def(c, { x: 0, y: 0, z: 0 });
    var c1 = { x: c.x, y: c.y, z: c.z };
    c1.x = c1.x;
    c1.y = c1.z;

    var p = rotate_xy(c1, { x: n.x, y: n.z }, a);

    n.x = p.x;
    n.z = p.y;

    return n;

}

function r_x(n, a, c) {

    c = def(c, { x: 0, y: 0, z: 0 });
    var c1 = { x: c.x, y: c.y, z: c.z };
    c1.x = c1.y;
    c1.y = c1.z;

    var p = rotate_xy(c1, { x: n.y, y: n.z }, a);

    n.y = p.x;
    n.z = p.y;

    return n;

}

function r_z(n, a, c) {

    c = def(c, { x: 0, y: 0, z: 0 });
    var c1 = { x: c.x, y: c.y, z: c.z };
    var p = rotate_xy(c1, { x: n.x, y: n.y }, a);

    n.x = p.x;
    n.y = p.y;

    return n;

}


 var svg = {
	 svgCalibration: 0.00001,
		cached:[],
        getPoints: function (op) {
            var h1 = 1;
            function getLenRounded(pat, i) {

				if (cached) { 
					return pois[i+1];
				}
				else {
					  
					pois[i+1] =  pat.getPointAtLength(i);

					return pois[i+1];
				}
            } 

            op.step = def(op.step, 0.5);
			var pois = [];
			var cached = false;
			
			if (!def(op.path.length)) { 
				pois = svg.cached[op.path];
				if (pois.length > 0)
					cached = true; 
			}

            var path = {};

			if (!cached) {

				path = document.createElementNS("http://www.w3.org/2000/svg", "path");
				path.setAttribute("d", op.path);
			}

            var result = [];


            var len = 0;
			
			if (cached)
				len = pois[0];
			else {
				len = path.getTotalLength();
                pois[0] = len;
			}

            if (def(op.inLine) && (!def(op.pointLength) || op.pointLength < 1000)) {
                op.step = 0.3;
            }

            if (def(op.pointLength)) {
                op.min = len / op.pointLength;
            }

            var plen = 0.0
            var s = getLenRounded(path, 0);

            op.density = def(op.density, [1]);

            function getDensityMapStep(index) {
                var ps = floor(op.density.length * (index / len));

                return op.step / op.density[ps];
            }

            var p = s;
            var c = getLenRounded(path, op.step);
            plen += op.step;
			
			if (!cached) { 
				svg.cached.push(pois);
				
			}


            op.push(result, s);

            var p_o = 0;
            var oo_p = { x: 0, y: 0 };
            for (var i = op.step * 2; i < len; i += getDensityMapStep(i)) {
                h1++;
                var n = getLenRounded(path, i);
                plen += op.step;

                if (def(op.inLine, true)) {
                    if (i == op.step * 2)
                        op.push(result, c);

                    if (plen > def(op.min, 10.)) {
                        op.push(result, n); plen = 0.0;
                    }
                }
                else {

                    var d1 = dim(p, c);
                    var d2 = dim(c, n);
                    var d3 = dim(p, n);

                    var d4 = 0;
                    var d5 = 0;

                    if (def(p_o)) {
                        d4 = dim(p_o, c);
                        d5 = dim(p_o, n);
                    }

                    var iilen = abs(d3 - (d2 + d1));
                    var lll =  svg.svgCalibration;



                    if (iilen > lll || p_o > lll) {

                        if (dim(n, oo_p) > 4.0) {
                            op.push(result, n); oo_p = n;
                        }
                        plen = 0.0;

                        p_o = 0;
                    }
                    else {
                        p_o += iilen;
                    }
                }

                p = c;
                c = n;
            }

            //alert(h1 + "  a25");

            result = op.push(result, getLenRounded(path, len), true);

            var sr = [];

            for (var i = def(op.start, 0) ; i < result.length - def(op.end, 0) ; i++) {
                sr.push(result[i]);
            }

            return sr;
        },
    }
 


// Builders
 var wall = function (op) {
    // pre : { p1,p2 }

    op = def(op, {
        d: 2,
        h: 2,
        path: [{ x: 10, y: 0, z: 10 }, { x: -10, y: 0, z: 10 }, { x: -10, y: 0, z: -10 }, { x: 10, y: 0, z: -10 }],
        left: function (p) { return true; },
        right: function (p) { return true; },
        top: function (p) { return true; },
        bottom: function (p) { return true; },
        lr: function (p) { return true; },
        closed: true,
    });

    if (op.lr == 'default') {
        op.lr = function (p) { return true; };
        op.left = def(op.left, function (p) { return true; });
        op.right = def(op.right, function (p) { return true; });
        op.top = def(op.top, function () { return true; });
        op.bottom = def(op.bottom, function (p) { return true; });
        op.front = def(op.front, function (p) { return true; });
        op.back = def(op.back, function (p) { return true; });
    }

    // op.path.push({ x: 0.1, y: 0.1, z: 0.1 });

    op.d = def(op.d, 1.0);
    op.h = def(op.h, 35.0);

    op.uv = '0213';

    var builder = function (p, geo) {


        ag = function (a, b) {
            return { x: (a.x + b.x) / 2.0, y: (a.y + b.y) / 2.0, z: (a.z + b.z) / 2.0 };
        }

        rt = function (m, a, b, c, u) {
            if (!u) u = 1.0;
            nn = norm({ x: (a.z - b.z), y: 0.0, z: (a.x - b.x) });
            var nd = op.d;
            if (def(op._out, 0) != 0 && (m == 'xu' || m == 'pu')) {
                nd = op._out.valueOf() * 1.0;
            }
            if (def(op._in, 0) != 0 && (m == 'xd' || m == 'pd')) {
                nd = op._in.valueOf() * 1.0;
            }
            var sn = { x: c.x + nn.x * nd * u, y: c.y, z: c.z - nn.z * nd * u };
            if (def(op.cu, '{}') != '{}') {
                var ojs = js('function(o){' + prop.html.decode(op.cu) + '}');
                if (def(ojs))
                    sn = ojs({ sn: sn, m: m, a: a, b: b, c: c, u: u, nrm: nrm, op: op });
            }
            return sn;
        }

        nxu = rt('xu', p.n, p.n1, p.n);
        nxd = rt('xd', p.n, p.n1, p.n, -1.0);

        if (p.n_1 != null && p.n_1 != undefined) {

            npu = rt('pu', p.n_1, p.n, p.n);
            npd = rt('pd', p.n_1, p.n, p.n, -1.0);

            nxu = ag(nxu, npu);
            nxd = ag(nxd, npd);
        }
        if (op.t) { nxu.y += op.t.y; nxd.y += op.t.y; }


        nhu = { x: nxu.x, y: nxu.y + (op.h - def(p.n.hgt, 0)), z: nxu.z };
        nhd = { x: nxd.x, y: nxd.y + (op.h - def(p.n.hgt, 0)), z: nxd.z };


        if (op.front && op.front(p))  face(geo, nxu, nxd, nhu, nhd, {});
        if (op.back && op.back(p))
             face(geo, nxu, nxd, nhu, nhd, { flip: 1.0, uv: op.uv });


        if (op.start && (p.i == 0)) {
             face(geo, nxu, nxd, nhu, nhd, { flip: 1.0, uv: op.uv });
        }

        if (op.end && (p.i == op.path.length - 2)) {
             face(geo, nxu, nxd, nhu, nhd, { uv: op.uv });
        }

        if (op.smooth) {
            var x =  push(geo, nxu, nxd, nhu, nhd);
            nxu = x[0];
            nxd = x[1];
            nhu = x[2];
            nhd = x[3];
        }

        if (p.fold  ) {

            if (op.right(op)) face(geo, p.fold[1], nxd, p.fold[3], nhd, { flip: 1.0, uv: op.uv });
            if (op.left(op))  face(geo, nxu, p.fold[0], nhu, p.fold[2], { flip: 1.0, uv: op.uv });

            if (op.top(op)) face(geo, p.fold[2], p.fold[3], nhu, nhd, { flip: 1.0, uv: op.uv });
            if (op.bottom(op))  face(geo, nxu, nxd, p.fold[0], p.fold[1], { flip: 1.0, uv: op.uv });
        }

        if (p.fs == null || p.fs == undefined)
            p.fs = [nxu, nxd, nhu, nhd];

        p.i++;

        if (op.path.length > p.i + 1)
            builder({ i: p.i, fold: [nxu, nxd, nhu, nhd], fs: p.fs, n_1: op.path[p.i - 1], n: op.path[p.i], n1: op.path[p.i + 1], bu: p.bu }, geo);
        else if (op.closed  ) {

            if (op.right)  face(geo, p.fs[1], nxd, p.fs[3], nhd, { flip: 0.0, uv: op.uv });
            if (op.left)  face(geo, nxu, p.fs[0], nhu, p.fs[2], { flip: 0.0, uv: op.uv });

            if (op.top)  face(geo, p.fs[2], p.fs[3], nhu, nhd, { flip: 0.0, uv: op.uv });
            if (op.bottom)  face(geo, nxu, nxd, p.fs[0], p.fs[1], { flip: 0.0, uv: op.uv });
        }
    };

    var geo =  geometryBase({ i: 0, n_1: (op.closed ? op.path[op.path.length - 1] : null), n: op.path[0], n1: op.path[1], bu: builder }, builder, op.exgeo, op.custom);

    if (op.buildGeo) {
        return geo;
    }
    if (def(op.end)) {
        op.end(op);
    }
    return new  geometryInstance(geo);
}


