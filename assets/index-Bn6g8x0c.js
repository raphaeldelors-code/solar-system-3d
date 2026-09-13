(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const mu="168",Gs={ROTATE:0,DOLLY:1,PAN:2},Fs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},wm=0,md=1,Dm=2,Df=1,Pf=2,qn=3,ri=0,Bt=1,fn=2,$n=0,Vs=1,Di=2,gd=3,_d=4,Pm=5,Ki=100,Cm=101,Rm=102,Lm=103,Im=104,Hm=200,Um=201,Nm=202,Om=203,ml=204,gl=205,Fm=206,zm=207,Bm=208,km=209,Gm=210,Vm=211,Wm=212,Xm=213,Ym=214,jm=0,Km=1,qm=2,bo=3,Zm=4,Jm=5,Qm=6,$m=7,Cf=0,eg=1,tg=2,Ai=0,Rf=1,Lf=2,If=3,gu=4,ng=5,Hf=6,Uf=7,Nf=300,Js=301,Qs=302,_l=303,vl=304,Ko=306,$s=1e3,Ji=1001,xl=1002,zt=1003,ig=1004,Sa=1005,pn=1006,gc=1007,Qi=1008,ai=1009,Of=1010,Ff=1011,Yr=1012,_u=1013,ss=1014,Ln=1015,mn=1016,vu=1017,xu=1018,er=1020,zf=35902,Bf=1021,kf=1022,bn=1023,Gf=1024,Vf=1025,Ws=1026,tr=1027,Mu=1028,Su=1029,Wf=1030,yu=1031,Eu=1033,ho=33776,fo=33777,po=33778,mo=33779,Ml=35840,Sl=35841,yl=35842,El=35843,bl=36196,Al=37492,Tl=37496,wl=37808,Dl=37809,Pl=37810,Cl=37811,Rl=37812,Ll=37813,Il=37814,Hl=37815,Ul=37816,Nl=37817,Ol=37818,Fl=37819,zl=37820,Bl=37821,go=36492,kl=36494,Gl=36495,Xf=36283,Vl=36284,Wl=36285,Xl=36286,sg=3200,rg=3201,Yf=0,ag=1,Cn="",Mt="srgb",Hi="srgb-linear",bu="display-p3",qo="display-p3-linear",Ao="linear",rt="srgb",To="rec709",wo="p3",ms=7680,vd=519,og=512,cg=513,lg=514,jf=515,ug=516,dg=517,hg=518,fg=519,Yl=35044,pg=35048,xd="300 es",Jn=2e3,Do=2001;class hs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Ot=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Md=1234567;const zr=Math.PI/180,jr=180/Math.PI;function ei(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ot[n&255]+Ot[n>>8&255]+Ot[n>>16&255]+Ot[n>>24&255]+"-"+Ot[e&255]+Ot[e>>8&255]+"-"+Ot[e>>16&15|64]+Ot[e>>24&255]+"-"+Ot[t&63|128]+Ot[t>>8&255]+"-"+Ot[t>>16&255]+Ot[t>>24&255]+Ot[i&255]+Ot[i>>8&255]+Ot[i>>16&255]+Ot[i>>24&255]).toLowerCase()}function Lt(n,e,t){return Math.max(e,Math.min(t,n))}function Au(n,e){return(n%e+e)%e}function mg(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function gg(n,e,t){return n!==e?(t-n)/(e-n):0}function Br(n,e,t){return(1-t)*n+t*e}function _g(n,e,t,i){return Br(n,e,1-Math.exp(-t*i))}function vg(n,e=1){return e-Math.abs(Au(n,e*2)-e)}function xg(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Mg(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Sg(n,e){return n+Math.floor(Math.random()*(e-n+1))}function yg(n,e){return n+Math.random()*(e-n)}function Eg(n){return n*(.5-Math.random())}function bg(n){n!==void 0&&(Md=n);let e=Md+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ag(n){return n*zr}function Tg(n){return n*jr}function wg(n){return(n&n-1)===0&&n!==0}function Dg(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Pg(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Cg(n,e,t,i,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+i)/2),u=a((e+i)/2),d=r((e-i)/2),h=a((e-i)/2),f=r((i-e)/2),g=a((i-e)/2);switch(s){case"XYX":n.set(o*u,c*d,c*h,o*l);break;case"YZY":n.set(c*h,o*u,c*d,o*l);break;case"ZXZ":n.set(c*d,c*h,o*u,o*l);break;case"XZX":n.set(o*u,c*g,c*f,o*l);break;case"YXY":n.set(c*f,o*u,c*g,o*l);break;case"ZYZ":n.set(c*g,c*f,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function yn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function nt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Kr={DEG2RAD:zr,RAD2DEG:jr,generateUUID:ei,clamp:Lt,euclideanModulo:Au,mapLinear:mg,inverseLerp:gg,lerp:Br,damp:_g,pingpong:vg,smoothstep:xg,smootherstep:Mg,randInt:Sg,randFloat:yg,randFloatSpread:Eg,seededRandom:bg,degToRad:Ag,radToDeg:Tg,isPowerOfTwo:wg,ceilPowerOfTwo:Dg,floorPowerOfTwo:Pg,setQuaternionFromProperEuler:Cg,normalize:nt,denormalize:yn};class ae{constructor(e=0,t=0){ae.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Oe{constructor(e,t,i,s,r,a,o,c,l){Oe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l)}set(e,t,i,s,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],d=i[7],h=i[2],f=i[5],g=i[8],_=s[0],m=s[3],p=s[6],v=s[1],x=s[4],E=s[7],R=s[2],A=s[5],D=s[8];return r[0]=a*_+o*v+c*R,r[3]=a*m+o*x+c*A,r[6]=a*p+o*E+c*D,r[1]=l*_+u*v+d*R,r[4]=l*m+u*x+d*A,r[7]=l*p+u*E+d*D,r[2]=h*_+f*v+g*R,r[5]=h*m+f*x+g*A,r[8]=h*p+f*E+g*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-i*r*u+i*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*a-o*l,h=o*c-u*r,f=l*r-a*c,g=t*d+i*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(s*l-u*i)*_,e[2]=(o*i-s*a)*_,e[3]=h*_,e[4]=(u*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(i*c-l*t)*_,e[8]=(a*t-i*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(_c.makeScale(e,t)),this}rotate(e){return this.premultiply(_c.makeRotation(-e)),this}translate(e,t){return this.premultiply(_c.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const _c=new Oe;function Kf(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function qr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Rg(){const n=qr("canvas");return n.style.display="block",n}const Sd={};function Xs(n){n in Sd||(Sd[n]=!0,console.warn(n))}function Lg(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const yd=new Oe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ed=new Oe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),vr={[Hi]:{transfer:Ao,primaries:To,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[Mt]:{transfer:rt,primaries:To,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[qo]:{transfer:Ao,primaries:wo,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(Ed),fromReference:n=>n.applyMatrix3(yd)},[bu]:{transfer:rt,primaries:wo,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(Ed),fromReference:n=>n.applyMatrix3(yd).convertLinearToSRGB()}},Ig=new Set([Hi,qo]),Ke={enabled:!0,_workingColorSpace:Hi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Ig.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=vr[e].toReference,s=vr[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return vr[n].primaries},getTransfer:function(n){return n===Cn?Ao:vr[n].transfer},getLuminanceCoefficients:function(n,e=this._workingColorSpace){return n.fromArray(vr[e].luminanceCoefficients)}};function Ys(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function vc(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let gs;class Hg{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{gs===void 0&&(gs=qr("canvas")),gs.width=e.width,gs.height=e.height;const i=gs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=gs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=qr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ys(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ys(t[i]/255)*255):t[i]=Ys(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ug=0;class qf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ug++}),this.uuid=ei(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(xc(s[a].image)):r.push(xc(s[a]))}else r=xc(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function xc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Hg.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ng=0;class St extends hs{constructor(e=St.DEFAULT_IMAGE,t=St.DEFAULT_MAPPING,i=Ji,s=Ji,r=pn,a=Qi,o=bn,c=ai,l=St.DEFAULT_ANISOTROPY,u=Cn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ng++}),this.uuid=ei(),this.name="",this.source=new qf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ae(0,0),this.repeat=new ae(1,1),this.center=new ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Nf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $s:e.x=e.x-Math.floor(e.x);break;case Ji:e.x=e.x<0?0:1;break;case xl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $s:e.y=e.y-Math.floor(e.y);break;case Ji:e.y=e.y<0?0:1;break;case xl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}St.DEFAULT_IMAGE=null;St.DEFAULT_MAPPING=Nf;St.DEFAULT_ANISOTROPY=1;class tt{constructor(e=0,t=0,i=0,s=1){tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,E=(f+1)/2,R=(p+1)/2,A=(u+h)/4,D=(d+_)/4,H=(g+m)/4;return x>E&&x>R?x<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(x),s=A/i,r=D/i):E>R?E<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),i=A/s,r=H/s):R<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),i=D/r,s=H/r),this.set(i,s,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(d-_)/v,this.z=(h-u)/v,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Og extends hs{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new tt(0,0,e,t),this.scissorTest=!1,this.viewport=new tt(0,0,e,t);const s={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:pn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new St(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new qf(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Jt extends Og{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Zf extends St{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=zt,this.minFilter=zt,this.wrapR=Ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Fg extends St{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=zt,this.minFilter=zt,this.wrapR=Ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pi{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let c=i[s+0],l=i[s+1],u=i[s+2],d=i[s+3];const h=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(d!==_||c!==h||l!==f||u!==g){let m=1-o;const p=c*h+l*f+u*g+d*_,v=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const R=Math.sqrt(x),A=Math.atan2(R,p*v);m=Math.sin(m*A)/R,o=Math.sin(o*A)/R}const E=o*v;if(c=c*m+h*E,l=l*m+f*E,u=u*m+g*E,d=d*m+_*E,m===1-o){const R=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=R,l*=R,u*=R,d*=R}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],c=i[s+1],l=i[s+2],u=i[s+3],d=r[a],h=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+u*d+c*f-l*h,e[t+1]=c*g+u*h+l*d-o*f,e[t+2]=l*g+u*f+o*h-c*d,e[t+3]=u*g-o*d-c*h-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(s/2),d=o(r/2),h=c(i/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"YZX":this._x=h*u*d+l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d-h*f*g;break;case"XZY":this._x=h*u*d-l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=i+o+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(i>o&&i>d){const f=2*Math.sqrt(1+i-o-d);this._w=(u-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>d){const f=2*Math.sqrt(1+o-i-d);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+d-i-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Lt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-i*l,this._z=r*u+a*l+i*c-s*o,this._w=a*u-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),d=Math.sin((1-t)*u)/l,h=Math.sin(t*u)/l;return this._w=a*d+this._w*h,this._x=i*d+this._x*h,this._y=s*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(e=0,t=0,i=0){w.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*i),u=2*(o*t-r*s),d=2*(r*i-a*t);return this.x=t+c*l+a*d-o*u,this.y=i+c*u+o*l-r*d,this.z=s+c*d+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Mc.copy(this).projectOnVector(e),this.sub(Mc)}reflect(e){return this.sub(Mc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Mc=new w,bd=new Pi;class Fn{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(vn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(vn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=vn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,vn):vn.fromBufferAttribute(r,a),vn.applyMatrix4(e.matrixWorld),this.expandByPoint(vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ya.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ya.copy(i.boundingBox)),ya.applyMatrix4(e.matrixWorld),this.union(ya)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,vn),vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xr),Ea.subVectors(this.max,xr),_s.subVectors(e.a,xr),vs.subVectors(e.b,xr),xs.subVectors(e.c,xr),fi.subVectors(vs,_s),pi.subVectors(xs,vs),Fi.subVectors(_s,xs);let t=[0,-fi.z,fi.y,0,-pi.z,pi.y,0,-Fi.z,Fi.y,fi.z,0,-fi.x,pi.z,0,-pi.x,Fi.z,0,-Fi.x,-fi.y,fi.x,0,-pi.y,pi.x,0,-Fi.y,Fi.x,0];return!Sc(t,_s,vs,xs,Ea)||(t=[1,0,0,0,1,0,0,0,1],!Sc(t,_s,vs,xs,Ea))?!1:(ba.crossVectors(fi,pi),t=[ba.x,ba.y,ba.z],Sc(t,_s,vs,xs,Ea))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Bn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Bn=[new w,new w,new w,new w,new w,new w,new w,new w],vn=new w,ya=new Fn,_s=new w,vs=new w,xs=new w,fi=new w,pi=new w,Fi=new w,xr=new w,Ea=new w,ba=new w,zi=new w;function Sc(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){zi.fromArray(n,r);const o=s.x*Math.abs(zi.x)+s.y*Math.abs(zi.y)+s.z*Math.abs(zi.z),c=e.dot(zi),l=t.dot(zi),u=i.dot(zi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const zg=new Fn,Mr=new w,yc=new w;class di{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):zg.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Mr.subVectors(e,this.center);const t=Mr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Mr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(yc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Mr.copy(e.center).add(yc)),this.expandByPoint(Mr.copy(e.center).sub(yc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const kn=new w,Ec=new w,Aa=new w,mi=new w,bc=new w,Ta=new w,Ac=new w;class oa{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(kn.copy(this.origin).addScaledVector(this.direction,t),kn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Ec.copy(e).add(t).multiplyScalar(.5),Aa.copy(t).sub(e).normalize(),mi.copy(this.origin).sub(Ec);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Aa),o=mi.dot(this.direction),c=-mi.dot(Aa),l=mi.lengthSq(),u=Math.abs(1-a*a);let d,h,f,g;if(u>0)if(d=a*c-o,h=a*o-c,g=r*u,d>=0)if(h>=-g)if(h<=g){const _=1/u;d*=_,h*=_,f=d*(d+a*h+2*o)+h*(a*d+h+2*c)+l}else h=r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*c)+l;else h=-r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*c)+l;else h<=-g?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+h*(h+2*c)+l):h<=g?(d=0,h=Math.min(Math.max(-r,-c),r),f=h*(h+2*c)+l):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+h*(h+2*c)+l);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Ec).addScaledVector(Aa,h),f}intersectSphere(e,t){kn.subVectors(e.center,this.origin);const i=kn.dot(this.direction),s=kn.dot(kn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,s=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,s=(e.min.x-h.x)*l),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,kn)!==null}intersectTriangle(e,t,i,s,r){bc.subVectors(t,e),Ta.subVectors(i,e),Ac.crossVectors(bc,Ta);let a=this.direction.dot(Ac),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;mi.subVectors(this.origin,e);const c=o*this.direction.dot(Ta.crossVectors(mi,Ta));if(c<0)return null;const l=o*this.direction.dot(bc.cross(mi));if(l<0||c+l>a)return null;const u=-o*mi.dot(Ac);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ze{constructor(e,t,i,s,r,a,o,c,l,u,d,h,f,g,_,m){Ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l,u,d,h,f,g,_,m)}set(e,t,i,s,r,a,o,c,l,u,d,h,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ze().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Ms.setFromMatrixColumn(e,0).length(),r=1/Ms.setFromMatrixColumn(e,1).length(),a=1/Ms.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const h=a*u,f=a*d,g=o*u,_=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=f+g*l,t[5]=h-_*l,t[9]=-o*c,t[2]=_-h*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){const h=c*u,f=c*d,g=l*u,_=l*d;t[0]=h+_*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-g,t[6]=_+h*o,t[10]=a*c}else if(e.order==="ZXY"){const h=c*u,f=c*d,g=l*u,_=l*d;t[0]=h-_*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*u,t[9]=_-h*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const h=a*u,f=a*d,g=o*u,_=o*d;t[0]=c*u,t[4]=g*l-f,t[8]=h*l+_,t[1]=c*d,t[5]=_*l+h,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const h=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=_-h*d,t[8]=g*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=f*d+g,t[10]=h-_*d}else if(e.order==="XZY"){const h=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+_,t[5]=a*u,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bg,e,kg)}lookAt(e,t,i){const s=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),gi.crossVectors(i,tn),gi.lengthSq()===0&&(Math.abs(i.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),gi.crossVectors(i,tn)),gi.normalize(),wa.crossVectors(tn,gi),s[0]=gi.x,s[4]=wa.x,s[8]=tn.x,s[1]=gi.y,s[5]=wa.y,s[9]=tn.y,s[2]=gi.z,s[6]=wa.z,s[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],d=i[5],h=i[9],f=i[13],g=i[2],_=i[6],m=i[10],p=i[14],v=i[3],x=i[7],E=i[11],R=i[15],A=s[0],D=s[4],H=s[8],b=s[12],S=s[1],C=s[5],k=s[9],O=s[13],Y=s[2],W=s[6],V=s[10],j=s[14],G=s[3],re=s[7],de=s[11],xe=s[15];return r[0]=a*A+o*S+c*Y+l*G,r[4]=a*D+o*C+c*W+l*re,r[8]=a*H+o*k+c*V+l*de,r[12]=a*b+o*O+c*j+l*xe,r[1]=u*A+d*S+h*Y+f*G,r[5]=u*D+d*C+h*W+f*re,r[9]=u*H+d*k+h*V+f*de,r[13]=u*b+d*O+h*j+f*xe,r[2]=g*A+_*S+m*Y+p*G,r[6]=g*D+_*C+m*W+p*re,r[10]=g*H+_*k+m*V+p*de,r[14]=g*b+_*O+m*j+p*xe,r[3]=v*A+x*S+E*Y+R*G,r[7]=v*D+x*C+E*W+R*re,r[11]=v*H+x*k+E*V+R*de,r[15]=v*b+x*O+E*j+R*xe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*d-s*l*d-r*o*h+i*l*h+s*o*f-i*c*f)+_*(+t*c*f-t*l*h+r*a*h-s*a*f+s*l*u-r*c*u)+m*(+t*l*d-t*o*f-r*a*d+i*a*f+r*o*u-i*l*u)+p*(-s*o*u-t*c*d+t*o*h+s*a*d-i*a*h+i*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],v=d*m*l-_*h*l+_*c*f-o*m*f-d*c*p+o*h*p,x=g*h*l-u*m*l-g*c*f+a*m*f+u*c*p-a*h*p,E=u*_*l-g*d*l+g*o*f-a*_*f-u*o*p+a*d*p,R=g*d*c-u*_*c-g*o*h+a*_*h+u*o*m-a*d*m,A=t*v+i*x+s*E+r*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/A;return e[0]=v*D,e[1]=(_*h*r-d*m*r-_*s*f+i*m*f+d*s*p-i*h*p)*D,e[2]=(o*m*r-_*c*r+_*s*l-i*m*l-o*s*p+i*c*p)*D,e[3]=(d*c*r-o*h*r-d*s*l+i*h*l+o*s*f-i*c*f)*D,e[4]=x*D,e[5]=(u*m*r-g*h*r+g*s*f-t*m*f-u*s*p+t*h*p)*D,e[6]=(g*c*r-a*m*r-g*s*l+t*m*l+a*s*p-t*c*p)*D,e[7]=(a*h*r-u*c*r+u*s*l-t*h*l-a*s*f+t*c*f)*D,e[8]=E*D,e[9]=(g*d*r-u*_*r-g*i*f+t*_*f+u*i*p-t*d*p)*D,e[10]=(a*_*r-g*o*r+g*i*l-t*_*l-a*i*p+t*o*p)*D,e[11]=(u*o*r-a*d*r-u*i*l+t*d*l+a*i*f-t*o*f)*D,e[12]=R*D,e[13]=(u*_*s-g*d*s+g*i*h-t*_*h-u*i*m+t*d*m)*D,e[14]=(g*o*s-a*_*s-g*i*c+t*_*c+a*i*m-t*o*m)*D,e[15]=(a*d*s-u*o*s+u*i*c-t*d*c-a*i*h+t*o*h)*D,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+i,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,d=o+o,h=r*l,f=r*u,g=r*d,_=a*u,m=a*d,p=o*d,v=c*l,x=c*u,E=c*d,R=i.x,A=i.y,D=i.z;return s[0]=(1-(_+p))*R,s[1]=(f+E)*R,s[2]=(g-x)*R,s[3]=0,s[4]=(f-E)*A,s[5]=(1-(h+p))*A,s[6]=(m+v)*A,s[7]=0,s[8]=(g+x)*D,s[9]=(m-v)*D,s[10]=(1-(h+_))*D,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=Ms.set(s[0],s[1],s[2]).length();const a=Ms.set(s[4],s[5],s[6]).length(),o=Ms.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],xn.copy(this);const l=1/r,u=1/a,d=1/o;return xn.elements[0]*=l,xn.elements[1]*=l,xn.elements[2]*=l,xn.elements[4]*=u,xn.elements[5]*=u,xn.elements[6]*=u,xn.elements[8]*=d,xn.elements[9]*=d,xn.elements[10]*=d,t.setFromRotationMatrix(xn),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=Jn){const c=this.elements,l=2*r/(t-e),u=2*r/(i-s),d=(t+e)/(t-e),h=(i+s)/(i-s);let f,g;if(o===Jn)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Do)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Jn){const c=this.elements,l=1/(t-e),u=1/(i-s),d=1/(a-r),h=(t+e)*l,f=(i+s)*u;let g,_;if(o===Jn)g=(a+r)*d,_=-2*d;else if(o===Do)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ms=new w,xn=new Ze,Bg=new w(0,0,0),kg=new w(1,1,1),gi=new w,wa=new w,tn=new w,Ad=new Ze,Td=new Pi;class Tn{constructor(e=0,t=0,i=0,s=Tn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Lt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Lt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Lt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Ad.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ad,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Td.setFromEuler(this),this.setFromQuaternion(Td,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Tn.DEFAULT_ORDER="XYZ";class Tu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Gg=0;const wd=new w,Ss=new Pi,Gn=new Ze,Da=new w,Sr=new w,Vg=new w,Wg=new Pi,Dd=new w(1,0,0),Pd=new w(0,1,0),Cd=new w(0,0,1),Rd={type:"added"},Xg={type:"removed"},ys={type:"childadded",child:null},Tc={type:"childremoved",child:null};class It extends hs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gg++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=It.DEFAULT_UP.clone();const e=new w,t=new Tn,i=new Pi,s=new w(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ze},normalMatrix:{value:new Oe}}),this.matrix=new Ze,this.matrixWorld=new Ze,this.matrixAutoUpdate=It.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ss.setFromAxisAngle(e,t),this.quaternion.multiply(Ss),this}rotateOnWorldAxis(e,t){return Ss.setFromAxisAngle(e,t),this.quaternion.premultiply(Ss),this}rotateX(e){return this.rotateOnAxis(Dd,e)}rotateY(e){return this.rotateOnAxis(Pd,e)}rotateZ(e){return this.rotateOnAxis(Cd,e)}translateOnAxis(e,t){return wd.copy(e).applyQuaternion(this.quaternion),this.position.add(wd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Dd,e)}translateY(e){return this.translateOnAxis(Pd,e)}translateZ(e){return this.translateOnAxis(Cd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Gn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Da.copy(e):Da.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Gn.lookAt(Sr,Da,this.up):Gn.lookAt(Da,Sr,this.up),this.quaternion.setFromRotationMatrix(Gn),s&&(Gn.extractRotation(s.matrixWorld),Ss.setFromRotationMatrix(Gn),this.quaternion.premultiply(Ss.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Rd),ys.child=e,this.dispatchEvent(ys),ys.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Xg),Tc.child=e,this.dispatchEvent(Tc),Tc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Gn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Gn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Gn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Rd),ys.child=e,this.dispatchEvent(ys),ys.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sr,e,Vg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sr,Wg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}It.DEFAULT_UP=new w(0,1,0);It.DEFAULT_MATRIX_AUTO_UPDATE=!0;It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Mn=new w,Vn=new w,wc=new w,Wn=new w,Es=new w,bs=new w,Ld=new w,Dc=new w,Pc=new w,Cc=new w;class En{constructor(e=new w,t=new w,i=new w){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Mn.subVectors(e,t),s.cross(Mn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Mn.subVectors(s,t),Vn.subVectors(i,t),wc.subVectors(e,t);const a=Mn.dot(Mn),o=Mn.dot(Vn),c=Mn.dot(wc),l=Vn.dot(Vn),u=Vn.dot(wc),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const h=1/d,f=(l*c-o*u)*h,g=(a*u-o*c)*h;return r.set(1-f-g,g,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Wn)===null?!1:Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1}static getInterpolation(e,t,i,s,r,a,o,c){return this.getBarycoord(e,t,i,s,Wn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Wn.x),c.addScaledVector(a,Wn.y),c.addScaledVector(o,Wn.z),c)}static isFrontFacing(e,t,i,s){return Mn.subVectors(i,t),Vn.subVectors(e,t),Mn.cross(Vn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mn.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),Mn.cross(Vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return En.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return En.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return En.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return En.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return En.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;Es.subVectors(s,i),bs.subVectors(r,i),Dc.subVectors(e,i);const c=Es.dot(Dc),l=bs.dot(Dc);if(c<=0&&l<=0)return t.copy(i);Pc.subVectors(e,s);const u=Es.dot(Pc),d=bs.dot(Pc);if(u>=0&&d<=u)return t.copy(s);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(i).addScaledVector(Es,a);Cc.subVectors(e,r);const f=Es.dot(Cc),g=bs.dot(Cc);if(g>=0&&f<=g)return t.copy(r);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(bs,o);const m=u*g-f*d;if(m<=0&&d-u>=0&&f-g>=0)return Ld.subVectors(r,s),o=(d-u)/(d-u+(f-g)),t.copy(s).addScaledVector(Ld,o);const p=1/(m+_+h);return a=_*p,o=h*p,t.copy(i).addScaledVector(Es,a).addScaledVector(bs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Jf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_i={h:0,s:0,l:0},Pa={h:0,s:0,l:0};function Rc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Le{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ke.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=Ke.workingColorSpace){if(e=Au(e,1),t=Lt(t,0,1),i=Lt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Rc(a,r,e+1/3),this.g=Rc(a,r,e),this.b=Rc(a,r,e-1/3)}return Ke.toWorkingColorSpace(this,s),this}setStyle(e,t=Mt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mt){const i=Jf[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ys(e.r),this.g=Ys(e.g),this.b=Ys(e.b),this}copyLinearToSRGB(e){return this.r=vc(e.r),this.g=vc(e.g),this.b=vc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mt){return Ke.fromWorkingColorSpace(Ft.copy(this),e),Math.round(Lt(Ft.r*255,0,255))*65536+Math.round(Lt(Ft.g*255,0,255))*256+Math.round(Lt(Ft.b*255,0,255))}getHexString(e=Mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(Ft.copy(this),t);const i=Ft.r,s=Ft.g,r=Ft.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case i:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-i)/d+2;break;case r:c=(i-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(Ft.copy(this),t),e.r=Ft.r,e.g=Ft.g,e.b=Ft.b,e}getStyle(e=Mt){Ke.fromWorkingColorSpace(Ft.copy(this),e);const t=Ft.r,i=Ft.g,s=Ft.b;return e!==Mt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(_i),this.setHSL(_i.h+e,_i.s+t,_i.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(_i),e.getHSL(Pa);const i=Br(_i.h,Pa.h,t),s=Br(_i.s,Pa.s,t),r=Br(_i.l,Pa.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ft=new Le;Le.NAMES=Jf;let Yg=0;class Ui extends hs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yg++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=Vs,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ml,this.blendDst=gl,this.blendEquation=Ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Le(0,0,0),this.blendAlpha=0,this.depthFunc=bo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ms,this.stencilZFail=ms,this.stencilZPass=ms,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Vs&&(i.blending=this.blending),this.side!==ri&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ml&&(i.blendSrc=this.blendSrc),this.blendDst!==gl&&(i.blendDst=this.blendDst),this.blendEquation!==Ki&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==bo&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==vd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ms&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ms&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ms&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class rs extends Ui{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=Cf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const _t=new w,Ca=new ae;class Ht{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Yl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Xs("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ca.fromBufferAttribute(this,t),Ca.applyMatrix3(e),this.setXY(t,Ca.x,Ca.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix3(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix4(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)_t.fromBufferAttribute(this,t),_t.applyNormalMatrix(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)_t.fromBufferAttribute(this,t),_t.transformDirection(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=yn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=nt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yn(t,this.array)),t}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yn(t,this.array)),t}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yn(t,this.array)),t}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array),r=nt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Yl&&(e.usage=this.usage),e}}class Qf extends Ht{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class $f extends Ht{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class at extends Ht{constructor(e,t,i){super(new Float32Array(e),t,i)}}let jg=0;const un=new Ze,Lc=new It,As=new w,nn=new Fn,yr=new Fn,bt=new w;class ut extends hs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jg++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Kf(e)?$f:Qf)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Oe().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return un.makeRotationFromQuaternion(e),this.applyMatrix4(un),this}rotateX(e){return un.makeRotationX(e),this.applyMatrix4(un),this}rotateY(e){return un.makeRotationY(e),this.applyMatrix4(un),this}rotateZ(e){return un.makeRotationZ(e),this.applyMatrix4(un),this}translate(e,t,i){return un.makeTranslation(e,t,i),this.applyMatrix4(un),this}scale(e,t,i){return un.makeScale(e,t,i),this.applyMatrix4(un),this}lookAt(e){return Lc.lookAt(e),Lc.updateMatrix(),this.applyMatrix4(Lc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(As).negate(),this.translate(As.x,As.y,As.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new at(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];nn.setFromBufferAttribute(r),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new di);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(e){const i=this.boundingSphere.center;if(nn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];yr.setFromBufferAttribute(o),this.morphTargetsRelative?(bt.addVectors(nn.min,yr.min),nn.expandByPoint(bt),bt.addVectors(nn.max,yr.max),nn.expandByPoint(bt)):(nn.expandByPoint(yr.min),nn.expandByPoint(yr.max))}nn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)bt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(bt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)bt.fromBufferAttribute(o,l),c&&(As.fromBufferAttribute(e,l),bt.add(As)),s=Math.max(s,i.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ht(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let H=0;H<i.count;H++)o[H]=new w,c[H]=new w;const l=new w,u=new w,d=new w,h=new ae,f=new ae,g=new ae,_=new w,m=new w;function p(H,b,S){l.fromBufferAttribute(i,H),u.fromBufferAttribute(i,b),d.fromBufferAttribute(i,S),h.fromBufferAttribute(r,H),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,S),u.sub(l),d.sub(l),f.sub(h),g.sub(h);const C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(C),m.copy(d).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(C),o[H].add(_),o[b].add(_),o[S].add(_),c[H].add(m),c[b].add(m),c[S].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let H=0,b=v.length;H<b;++H){const S=v[H],C=S.start,k=S.count;for(let O=C,Y=C+k;O<Y;O+=3)p(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const x=new w,E=new w,R=new w,A=new w;function D(H){R.fromBufferAttribute(s,H),A.copy(R);const b=o[H];x.copy(b),x.sub(R.multiplyScalar(R.dot(b))).normalize(),E.crossVectors(A,b);const C=E.dot(c[H])<0?-1:1;a.setXYZW(H,x.x,x.y,x.z,C)}for(let H=0,b=v.length;H<b;++H){const S=v[H],C=S.start,k=S.count;for(let O=C,Y=C+k;O<Y;O+=3)D(e.getX(O+0)),D(e.getX(O+1)),D(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ht(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);const s=new w,r=new w,a=new w,o=new w,c=new w,l=new w,u=new w,d=new w;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),o.add(u),c.add(u),l.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,d=o.normalized,h=new l.constructor(c.length*u);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*u;for(let p=0;p<u;p++)h[g++]=l[f++]}return new Ht(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ut,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,i);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,d=l.length;u<d;u++){const h=l[u],f=e(h,i);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const f=l[d];u.push(f.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],d=r[l];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Id=new Ze,Bi=new oa,Ra=new di,Hd=new w,Ts=new w,ws=new w,Ds=new w,Ic=new w,La=new w,Ia=new ae,Ha=new ae,Ua=new ae,Ud=new w,Nd=new w,Od=new w,Na=new w,Oa=new w;class pt extends It{constructor(e=new ut,t=new rs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){La.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],d=r[c];u!==0&&(Ic.fromBufferAttribute(d,e),a?La.addScaledVector(Ic,u):La.addScaledVector(Ic.sub(t),u))}t.add(La)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ra.copy(i.boundingSphere),Ra.applyMatrix4(r),Bi.copy(e.ray).recast(e.near),!(Ra.containsPoint(Bi.origin)===!1&&(Bi.intersectSphere(Ra,Hd)===null||Bi.origin.distanceToSquared(Hd)>(e.far-e.near)**2))&&(Id.copy(r).invert(),Bi.copy(e.ray).applyMatrix4(Id),!(i.boundingBox!==null&&Bi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Bi)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=a[m.materialIndex],v=Math.max(m.start,f.start),x=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let E=v,R=x;E<R;E+=3){const A=o.getX(E),D=o.getX(E+1),H=o.getX(E+2);s=Fa(this,p,e,i,l,u,d,A,D,H),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const v=o.getX(m),x=o.getX(m+1),E=o.getX(m+2);s=Fa(this,a,e,i,l,u,d,v,x,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=a[m.materialIndex],v=Math.max(m.start,f.start),x=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let E=v,R=x;E<R;E+=3){const A=E,D=E+1,H=E+2;s=Fa(this,p,e,i,l,u,d,A,D,H),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const v=m,x=m+1,E=m+2;s=Fa(this,a,e,i,l,u,d,v,x,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Kg(n,e,t,i,s,r,a,o){let c;if(e.side===Bt?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,e.side===ri,o),c===null)return null;Oa.copy(o),Oa.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Oa);return l<t.near||l>t.far?null:{distance:l,point:Oa.clone(),object:n}}function Fa(n,e,t,i,s,r,a,o,c,l){n.getVertexPosition(o,Ts),n.getVertexPosition(c,ws),n.getVertexPosition(l,Ds);const u=Kg(n,e,t,i,Ts,ws,Ds,Na);if(u){s&&(Ia.fromBufferAttribute(s,o),Ha.fromBufferAttribute(s,c),Ua.fromBufferAttribute(s,l),u.uv=En.getInterpolation(Na,Ts,ws,Ds,Ia,Ha,Ua,new ae)),r&&(Ia.fromBufferAttribute(r,o),Ha.fromBufferAttribute(r,c),Ua.fromBufferAttribute(r,l),u.uv1=En.getInterpolation(Na,Ts,ws,Ds,Ia,Ha,Ua,new ae)),a&&(Ud.fromBufferAttribute(a,o),Nd.fromBufferAttribute(a,c),Od.fromBufferAttribute(a,l),u.normal=En.getInterpolation(Na,Ts,ws,Ds,Ud,Nd,Od,new w),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new w,materialIndex:0};En.getNormal(Ts,ws,Ds,d.normal),u.face=d}return u}class ca extends ut{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],d=[];let h=0,f=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new at(l,3)),this.setAttribute("normal",new at(u,3)),this.setAttribute("uv",new at(d,2));function g(_,m,p,v,x,E,R,A,D,H,b){const S=E/D,C=R/H,k=E/2,O=R/2,Y=A/2,W=D+1,V=H+1;let j=0,G=0;const re=new w;for(let de=0;de<V;de++){const xe=de*C-O;for(let Fe=0;Fe<W;Fe++){const Ye=Fe*S-k;re[_]=Ye*v,re[m]=xe*x,re[p]=Y,l.push(re.x,re.y,re.z),re[_]=0,re[m]=0,re[p]=A>0?1:-1,u.push(re.x,re.y,re.z),d.push(Fe/D),d.push(1-de/H),j+=1}}for(let de=0;de<H;de++)for(let xe=0;xe<D;xe++){const Fe=h+xe+W*de,Ye=h+xe+W*(de+1),X=h+(xe+1)+W*(de+1),$=h+(xe+1)+W*de;c.push(Fe,Ye,$),c.push(Ye,X,$),G+=6}o.addGroup(f,G,b),f+=G,h+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ca(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function nr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Vt(n){const e={};for(let t=0;t<n.length;t++){const i=nr(n[t]);for(const s in i)e[s]=i[s]}return e}function qg(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function ep(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const Nn={clone:nr,merge:Vt};var Zg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class lt extends Ui{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Zg,this.fragmentShader=Jg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=nr(e.uniforms),this.uniformsGroups=qg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class tp extends It{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ze,this.projectionMatrix=new Ze,this.projectionMatrixInverse=new Ze,this.coordinateSystem=Jn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const vi=new w,Fd=new ae,zd=new ae;class rn extends tp{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=jr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return jr*2*Math.atan(Math.tan(zr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vi.x,vi.y).multiplyScalar(-e/vi.z),vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(vi.x,vi.y).multiplyScalar(-e/vi.z)}getViewSize(e,t){return this.getViewBounds(e,Fd,zd),t.subVectors(zd,Fd)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(zr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ps=-90,Cs=1;class Qg extends It{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new rn(Ps,Cs,e,t);s.layers=this.layers,this.add(s);const r=new rn(Ps,Cs,e,t);r.layers=this.layers,this.add(r);const a=new rn(Ps,Cs,e,t);a.layers=this.layers,this.add(a);const o=new rn(Ps,Cs,e,t);o.layers=this.layers,this.add(o);const c=new rn(Ps,Cs,e,t);c.layers=this.layers,this.add(c);const l=new rn(Ps,Cs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===Jn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Do)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,c),e.setRenderTarget(i,4,s),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class np extends St{constructor(e,t,i,s,r,a,o,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:Js,super(e,t,i,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class $g extends Jt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new np(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:pn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ca(5,5,5),r=new lt({name:"CubemapFromEquirect",uniforms:nr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Bt,blending:$n});r.uniforms.tEquirect.value=t;const a=new pt(s,r),o=t.minFilter;return t.minFilter===Qi&&(t.minFilter=pn),new Qg(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}const Hc=new w,e0=new w,t0=new Oe;class xi{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Hc.subVectors(i,t).cross(e0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Hc),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||t0.getNormalMatrix(e),s=this.coplanarPoint(Hc).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ki=new di,za=new w;class wu{constructor(e=new xi,t=new xi,i=new xi,s=new xi,r=new xi,a=new xi){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Jn){const i=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],u=s[5],d=s[6],h=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],v=s[13],x=s[14],E=s[15];if(i[0].setComponents(c-r,h-l,m-f,E-p).normalize(),i[1].setComponents(c+r,h+l,m+f,E+p).normalize(),i[2].setComponents(c+a,h+u,m+g,E+v).normalize(),i[3].setComponents(c-a,h-u,m-g,E-v).normalize(),i[4].setComponents(c-o,h-d,m-_,E-x).normalize(),t===Jn)i[5].setComponents(c+o,h+d,m+_,E+x).normalize();else if(t===Do)i[5].setComponents(o,d,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(e){return ki.center.set(0,0,0),ki.radius=.7071067811865476,ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(za.x=s.normal.x>0?e.max.x:e.min.x,za.y=s.normal.y>0?e.max.y:e.min.y,za.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(za)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ip(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function n0(n){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,d=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=n.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=n.SHORT;else if(l instanceof Uint32Array)f=n.UNSIGNED_INT;else if(l instanceof Int32Array)f=n.INT;else if(l instanceof Int8Array)f=n.BYTE;else if(l instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,c,l){const u=c.array,d=c._updateRange,h=c.updateRanges;if(n.bindBuffer(l,o),d.count===-1&&h.length===0&&n.bufferSubData(l,0,u),h.length!==0){for(let f=0,g=h.length;f<g;f++){const _=h[f];n.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}d.count!==-1&&(n.bufferSubData(l,d.offset*u.BYTES_PER_ELEMENT,u,d.offset,d.count),d.count=-1),c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}class la extends ut{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),c=Math.floor(s),l=o+1,u=c+1,d=e/o,h=t/c,f=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const v=p*h-a;for(let x=0;x<l;x++){const E=x*d-r;g.push(E,-v,0),_.push(0,0,1),m.push(x/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<o;v++){const x=v+l*p,E=v+l*(p+1),R=v+1+l*(p+1),A=v+1+l*p;f.push(x,E,A),f.push(E,R,A)}this.setIndex(f),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(_,3)),this.setAttribute("uv",new at(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new la(e.width,e.height,e.widthSegments,e.heightSegments)}}var i0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,s0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,r0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,a0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,o0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,c0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,l0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,u0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,d0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,h0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,f0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,p0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,m0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,g0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,_0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,v0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,x0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,M0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,S0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,y0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,E0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,b0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,A0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,T0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,w0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,D0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,P0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,C0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,R0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,L0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,I0="gl_FragColor = linearToOutputTexel( gl_FragColor );",H0=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,U0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,N0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,O0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,F0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,z0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,B0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,k0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,G0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,V0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,W0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,X0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Y0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,j0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,K0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,q0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Z0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,J0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Q0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,e1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,t1=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,n1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,i1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,s1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,r1=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,a1=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,o1=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,c1=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,l1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,u1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,d1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,h1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,f1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,p1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,m1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,g1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,v1=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,x1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,M1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,S1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,y1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,E1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,b1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,A1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,T1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,w1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,D1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,P1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,C1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,R1=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,L1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,I1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,H1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,U1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,N1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,O1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,F1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,z1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,B1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,k1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,G1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,V1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,W1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,X1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Y1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,j1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,K1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,q1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Z1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,J1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Q1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,e_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,t_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const n_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,i_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,s_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,r_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,a_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,o_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,c_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,l_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,u_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,d_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,h_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,f_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,p_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,m_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,g_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,__=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,v_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,x_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,M_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,S_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,y_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,E_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,b_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,A_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,T_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,w_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,D_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,P_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,R_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,L_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,I_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,H_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,U_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ne={alphahash_fragment:i0,alphahash_pars_fragment:s0,alphamap_fragment:r0,alphamap_pars_fragment:a0,alphatest_fragment:o0,alphatest_pars_fragment:c0,aomap_fragment:l0,aomap_pars_fragment:u0,batching_pars_vertex:d0,batching_vertex:h0,begin_vertex:f0,beginnormal_vertex:p0,bsdfs:m0,iridescence_fragment:g0,bumpmap_pars_fragment:_0,clipping_planes_fragment:v0,clipping_planes_pars_fragment:x0,clipping_planes_pars_vertex:M0,clipping_planes_vertex:S0,color_fragment:y0,color_pars_fragment:E0,color_pars_vertex:b0,color_vertex:A0,common:T0,cube_uv_reflection_fragment:w0,defaultnormal_vertex:D0,displacementmap_pars_vertex:P0,displacementmap_vertex:C0,emissivemap_fragment:R0,emissivemap_pars_fragment:L0,colorspace_fragment:I0,colorspace_pars_fragment:H0,envmap_fragment:U0,envmap_common_pars_fragment:N0,envmap_pars_fragment:O0,envmap_pars_vertex:F0,envmap_physical_pars_fragment:q0,envmap_vertex:z0,fog_vertex:B0,fog_pars_vertex:k0,fog_fragment:G0,fog_pars_fragment:V0,gradientmap_pars_fragment:W0,lightmap_pars_fragment:X0,lights_lambert_fragment:Y0,lights_lambert_pars_fragment:j0,lights_pars_begin:K0,lights_toon_fragment:Z0,lights_toon_pars_fragment:J0,lights_phong_fragment:Q0,lights_phong_pars_fragment:$0,lights_physical_fragment:e1,lights_physical_pars_fragment:t1,lights_fragment_begin:n1,lights_fragment_maps:i1,lights_fragment_end:s1,logdepthbuf_fragment:r1,logdepthbuf_pars_fragment:a1,logdepthbuf_pars_vertex:o1,logdepthbuf_vertex:c1,map_fragment:l1,map_pars_fragment:u1,map_particle_fragment:d1,map_particle_pars_fragment:h1,metalnessmap_fragment:f1,metalnessmap_pars_fragment:p1,morphinstance_vertex:m1,morphcolor_vertex:g1,morphnormal_vertex:_1,morphtarget_pars_vertex:v1,morphtarget_vertex:x1,normal_fragment_begin:M1,normal_fragment_maps:S1,normal_pars_fragment:y1,normal_pars_vertex:E1,normal_vertex:b1,normalmap_pars_fragment:A1,clearcoat_normal_fragment_begin:T1,clearcoat_normal_fragment_maps:w1,clearcoat_pars_fragment:D1,iridescence_pars_fragment:P1,opaque_fragment:C1,packing:R1,premultiplied_alpha_fragment:L1,project_vertex:I1,dithering_fragment:H1,dithering_pars_fragment:U1,roughnessmap_fragment:N1,roughnessmap_pars_fragment:O1,shadowmap_pars_fragment:F1,shadowmap_pars_vertex:z1,shadowmap_vertex:B1,shadowmask_pars_fragment:k1,skinbase_vertex:G1,skinning_pars_vertex:V1,skinning_vertex:W1,skinnormal_vertex:X1,specularmap_fragment:Y1,specularmap_pars_fragment:j1,tonemapping_fragment:K1,tonemapping_pars_fragment:q1,transmission_fragment:Z1,transmission_pars_fragment:J1,uv_pars_fragment:Q1,uv_pars_vertex:$1,uv_vertex:e_,worldpos_vertex:t_,background_vert:n_,background_frag:i_,backgroundCube_vert:s_,backgroundCube_frag:r_,cube_vert:a_,cube_frag:o_,depth_vert:c_,depth_frag:l_,distanceRGBA_vert:u_,distanceRGBA_frag:d_,equirect_vert:h_,equirect_frag:f_,linedashed_vert:p_,linedashed_frag:m_,meshbasic_vert:g_,meshbasic_frag:__,meshlambert_vert:v_,meshlambert_frag:x_,meshmatcap_vert:M_,meshmatcap_frag:S_,meshnormal_vert:y_,meshnormal_frag:E_,meshphong_vert:b_,meshphong_frag:A_,meshphysical_vert:T_,meshphysical_frag:w_,meshtoon_vert:D_,meshtoon_frag:P_,points_vert:C_,points_frag:R_,shadow_vert:L_,shadow_frag:I_,sprite_vert:H_,sprite_frag:U_},se={common:{diffuse:{value:new Le(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Le(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new Le(16777215)},opacity:{value:1},center:{value:new ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},qt={basic:{uniforms:Vt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:Vt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Le(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:Vt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Le(0)},specular:{value:new Le(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:Vt([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new Le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:Vt([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new Le(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:Vt([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:Vt([se.points,se.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:Vt([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:Vt([se.common,se.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:Vt([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:Vt([se.sprite,se.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:Vt([se.common,se.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:Vt([se.lights,se.fog,{color:{value:new Le(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};qt.physical={uniforms:Vt([qt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new Le(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new Le(0)},specularColor:{value:new Le(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const Ba={r:0,b:0,g:0},Gi=new Tn,N_=new Ze;function O_(n,e,t,i,s,r,a){const o=new Le(0);let c=r===!0?0:1,l,u,d=null,h=0,f=null;function g(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?t:e).get(x)),x}function _(v){let x=!1;const E=g(v);E===null?p(o,c):E&&E.isColor&&(p(E,1),x=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(v,x){const E=g(x);E&&(E.isCubeTexture||E.mapping===Ko)?(u===void 0&&(u=new pt(new ca(1,1,1),new lt({name:"BackgroundCubeMaterial",uniforms:nr(qt.backgroundCube.uniforms),vertexShader:qt.backgroundCube.vertexShader,fragmentShader:qt.backgroundCube.fragmentShader,side:Bt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,A,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Gi.copy(x.backgroundRotation),Gi.x*=-1,Gi.y*=-1,Gi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Gi.y*=-1,Gi.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(N_.makeRotationFromEuler(Gi)),u.material.toneMapped=Ke.getTransfer(E.colorSpace)!==rt,(d!==E||h!==E.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,d=E,h=E.version,f=n.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new pt(new la(2,2),new lt({name:"BackgroundMaterial",uniforms:nr(qt.background.uniforms),vertexShader:qt.background.vertexShader,fragmentShader:qt.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=Ke.getTransfer(E.colorSpace)!==rt,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||h!==E.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,d=E,h=E.version,f=n.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,x){v.getRGB(Ba,ep(n)),i.buffers.color.setClear(Ba.r,Ba.g,Ba.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(v,x=1){o.set(v),c=x,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,p(o,c)},render:_,addToRenderList:m}}function F_(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,a=!1;function o(S,C,k,O,Y){let W=!1;const V=d(O,k,C);r!==V&&(r=V,l(r.object)),W=f(S,O,k,Y),W&&g(S,O,k,Y),Y!==null&&e.update(Y,n.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,E(S,C,k,O),Y!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function c(){return n.createVertexArray()}function l(S){return n.bindVertexArray(S)}function u(S){return n.deleteVertexArray(S)}function d(S,C,k){const O=k.wireframe===!0;let Y=i[S.id];Y===void 0&&(Y={},i[S.id]=Y);let W=Y[C.id];W===void 0&&(W={},Y[C.id]=W);let V=W[O];return V===void 0&&(V=h(c()),W[O]=V),V}function h(S){const C=[],k=[],O=[];for(let Y=0;Y<t;Y++)C[Y]=0,k[Y]=0,O[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:k,attributeDivisors:O,object:S,attributes:{},index:null}}function f(S,C,k,O){const Y=r.attributes,W=C.attributes;let V=0;const j=k.getAttributes();for(const G in j)if(j[G].location>=0){const de=Y[G];let xe=W[G];if(xe===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(xe=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(xe=S.instanceColor)),de===void 0||de.attribute!==xe||xe&&de.data!==xe.data)return!0;V++}return r.attributesNum!==V||r.index!==O}function g(S,C,k,O){const Y={},W=C.attributes;let V=0;const j=k.getAttributes();for(const G in j)if(j[G].location>=0){let de=W[G];de===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(de=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(de=S.instanceColor));const xe={};xe.attribute=de,de&&de.data&&(xe.data=de.data),Y[G]=xe,V++}r.attributes=Y,r.attributesNum=V,r.index=O}function _(){const S=r.newAttributes;for(let C=0,k=S.length;C<k;C++)S[C]=0}function m(S){p(S,0)}function p(S,C){const k=r.newAttributes,O=r.enabledAttributes,Y=r.attributeDivisors;k[S]=1,O[S]===0&&(n.enableVertexAttribArray(S),O[S]=1),Y[S]!==C&&(n.vertexAttribDivisor(S,C),Y[S]=C)}function v(){const S=r.newAttributes,C=r.enabledAttributes;for(let k=0,O=C.length;k<O;k++)C[k]!==S[k]&&(n.disableVertexAttribArray(k),C[k]=0)}function x(S,C,k,O,Y,W,V){V===!0?n.vertexAttribIPointer(S,C,k,Y,W):n.vertexAttribPointer(S,C,k,O,Y,W)}function E(S,C,k,O){_();const Y=O.attributes,W=k.getAttributes(),V=C.defaultAttributeValues;for(const j in W){const G=W[j];if(G.location>=0){let re=Y[j];if(re===void 0&&(j==="instanceMatrix"&&S.instanceMatrix&&(re=S.instanceMatrix),j==="instanceColor"&&S.instanceColor&&(re=S.instanceColor)),re!==void 0){const de=re.normalized,xe=re.itemSize,Fe=e.get(re);if(Fe===void 0)continue;const Ye=Fe.buffer,X=Fe.type,$=Fe.bytesPerElement,ge=X===n.INT||X===n.UNSIGNED_INT||re.gpuType===_u;if(re.isInterleavedBufferAttribute){const he=re.data,Ee=he.stride,Ae=re.offset;if(he.isInstancedInterleavedBuffer){for(let Ie=0;Ie<G.locationSize;Ie++)p(G.location+Ie,he.meshPerAttribute);S.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let Ie=0;Ie<G.locationSize;Ie++)m(G.location+Ie);n.bindBuffer(n.ARRAY_BUFFER,Ye);for(let Ie=0;Ie<G.locationSize;Ie++)x(G.location+Ie,xe/G.locationSize,X,de,Ee*$,(Ae+xe/G.locationSize*Ie)*$,ge)}else{if(re.isInstancedBufferAttribute){for(let he=0;he<G.locationSize;he++)p(G.location+he,re.meshPerAttribute);S.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let he=0;he<G.locationSize;he++)m(G.location+he);n.bindBuffer(n.ARRAY_BUFFER,Ye);for(let he=0;he<G.locationSize;he++)x(G.location+he,xe/G.locationSize,X,de,xe*$,xe/G.locationSize*he*$,ge)}}else if(V!==void 0){const de=V[j];if(de!==void 0)switch(de.length){case 2:n.vertexAttrib2fv(G.location,de);break;case 3:n.vertexAttrib3fv(G.location,de);break;case 4:n.vertexAttrib4fv(G.location,de);break;default:n.vertexAttrib1fv(G.location,de)}}}}v()}function R(){H();for(const S in i){const C=i[S];for(const k in C){const O=C[k];for(const Y in O)u(O[Y].object),delete O[Y];delete C[k]}delete i[S]}}function A(S){if(i[S.id]===void 0)return;const C=i[S.id];for(const k in C){const O=C[k];for(const Y in O)u(O[Y].object),delete O[Y];delete C[k]}delete i[S.id]}function D(S){for(const C in i){const k=i[C];if(k[S.id]===void 0)continue;const O=k[S.id];for(const Y in O)u(O[Y].object),delete O[Y];delete k[S.id]}}function H(){b(),a=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:H,resetDefaultState:b,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfProgram:D,initAttributes:_,enableAttribute:m,disableUnusedAttributes:v}}function z_(n,e,t){let i;function s(l){i=l}function r(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function a(l,u,d){d!==0&&(n.drawArraysInstanced(i,l,u,d),t.update(u,i,d))}function o(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let f=0;for(let g=0;g<d;g++)f+=u[g];t.update(f,i,1)}function c(l,u,d,h){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],u[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(i,l,0,u,0,h,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_];for(let _=0;_<h.length;_++)t.update(g,i,h[_])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function B_(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==bn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const D=A===mn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==ai&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Ln&&!D)}function c(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),v=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=f>0,R=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,maxTextures:h,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:p,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:E,maxSamples:R}}function k_(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new xi,o=new Oe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||i!==0||s;return s=h,i=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{const v=r?0:i,x=v*4;let E=p.clippingState||null;c.value=E,E=u(g,h,x,f);for(let R=0;R!==x;++R)E[R]=t[R];p.clippingState=E,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,f,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,v=h.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,E=f;x!==_;++x,E+=4)a.copy(d[x]).applyMatrix4(v,o),a.normal.toArray(m,E),m[E+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function G_(n){let e=new WeakMap;function t(a,o){return o===_l?a.mapping=Js:o===vl&&(a.mapping=Qs),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===_l||o===vl)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new $g(c.height);return l.fromEquirectangularTexture(n,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class sp extends tp{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const zs=4,Bd=[.125,.215,.35,.446,.526,.582],qi=20,Uc=new sp,kd=new Le;let Nc=null,Oc=0,Fc=0,zc=!1;const Yi=(1+Math.sqrt(5))/2,Rs=1/Yi,Gd=[new w(-Yi,Rs,0),new w(Yi,Rs,0),new w(-Rs,0,Yi),new w(Rs,0,Yi),new w(0,Yi,-Rs),new w(0,Yi,Rs),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)];class Vd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){Nc=this._renderer.getRenderTarget(),Oc=this._renderer.getActiveCubeFace(),Fc=this._renderer.getActiveMipmapLevel(),zc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Yd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Nc,Oc,Fc),this._renderer.xr.enabled=zc,e.scissorTest=!1,ka(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Js||e.mapping===Qs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Nc=this._renderer.getRenderTarget(),Oc=this._renderer.getActiveCubeFace(),Fc=this._renderer.getActiveMipmapLevel(),zc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:pn,minFilter:pn,generateMipmaps:!1,type:mn,format:bn,colorSpace:Hi,depthBuffer:!1},s=Wd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wd(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=V_(r)),this._blurMaterial=W_(r,e,t)}return s}_compileMaterial(e){const t=new pt(this._lodPlanes[0],e);this._renderer.compile(t,Uc)}_sceneToCubeUV(e,t,i,s){const o=new rn(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(kd),u.toneMapping=Ai,u.autoClear=!1;const f=new rs({name:"PMREM.Background",side:Bt,depthWrite:!1,depthTest:!1}),g=new pt(new ca,f);let _=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(kd),_=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):v===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));const x=this._cubeSize;ka(s,v*x,p>2?x:0,x,x),u.setRenderTarget(s),_&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Js||e.mapping===Qs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Yd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xd());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new pt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;ka(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,Uc)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Gd[(s-r-1)%Gd.length];this._blur(e,r-1,r,a,o)}t.autoClear=i}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new pt(this._lodPlanes[s],l),h=l.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*qi-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):qi;m>qi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${qi}`);const p=[];let v=0;for(let D=0;D<qi;++D){const H=D/_,b=Math.exp(-H*H/2);p.push(b),D===0?v+=b:D<m&&(v+=2*b)}for(let D=0;D<p.length;D++)p[D]=p[D]/v;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:x}=this;h.dTheta.value=g,h.mipInt.value=x-i;const E=this._sizeLods[s],R=3*E*(s>x-zs?s-x+zs:0),A=4*(this._cubeSize-E);ka(t,R,A,3*E,2*E),c.setRenderTarget(t),c.render(d,Uc)}}function V_(n){const e=[],t=[],i=[];let s=n;const r=n-zs+1+Bd.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>n-zs?c=Bd[a-n+zs-1]:a===0&&(c=0),i.push(c);const l=1/(o-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,_=3,m=2,p=1,v=new Float32Array(_*g*f),x=new Float32Array(m*g*f),E=new Float32Array(p*g*f);for(let A=0;A<f;A++){const D=A%3*2/3-1,H=A>2?0:-1,b=[D,H,0,D+2/3,H,0,D+2/3,H+1,0,D,H,0,D+2/3,H+1,0,D,H+1,0];v.set(b,_*g*A),x.set(h,m*g*A);const S=[A,A,A,A,A,A];E.set(S,p*g*A)}const R=new ut;R.setAttribute("position",new Ht(v,_)),R.setAttribute("uv",new Ht(x,m)),R.setAttribute("faceIndex",new Ht(E,p)),e.push(R),s>zs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Wd(n,e,t){const i=new Jt(n,e,t);return i.texture.mapping=Ko,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ka(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function W_(n,e,t){const i=new Float32Array(qi),s=new w(0,1,0);return new lt({name:"SphericalGaussianBlur",defines:{n:qi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Du(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Xd(){return new lt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Du(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Yd(){return new lt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Du(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Du(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function X_(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===_l||c===vl,u=c===Js||c===Qs;if(l||u){let d=e.get(o);const h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new Vd(n)),d=l?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return l&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new Vd(n)),d=l?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Y_(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Xs("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function j_(n,e,t,i){const s={},r=new WeakMap;function a(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}h.removeEventListener("dispose",a),delete s[h.id];const f=r.get(h);f&&(e.remove(f),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function c(d){const h=d.attributes;for(const g in h)e.update(h[g],n.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],n.ARRAY_BUFFER)}}function l(d){const h=[],f=d.index,g=d.attributes.position;let _=0;if(f!==null){const v=f.array;_=f.version;for(let x=0,E=v.length;x<E;x+=3){const R=v[x+0],A=v[x+1],D=v[x+2];h.push(R,A,A,D,D,R)}}else if(g!==void 0){const v=g.array;_=g.version;for(let x=0,E=v.length/3-1;x<E;x+=3){const R=x+0,A=x+1,D=x+2;h.push(R,A,A,D,D,R)}}else return;const m=new(Kf(h)?$f:Qf)(h,1);m.version=_;const p=r.get(d);p&&e.remove(p),r.set(d,m)}function u(d){const h=r.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function K_(n,e,t){let i;function s(h){i=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function c(h,f){n.drawElements(i,f,r,h*a),t.update(f,i,1)}function l(h,f,g){g!==0&&(n.drawElementsInstanced(i,f,r,h*a,g),t.update(f,i,g))}function u(h,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,h,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,i,1)}function d(h,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)l(h[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,r,h,0,_,0,g);let p=0;for(let v=0;v<g;v++)p+=f[v];for(let v=0;v<_.length;v++)t.update(p,i,_[v])}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function q_(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Z_(n,e,t){const i=new WeakMap,s=new tt;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==d){let S=function(){H.dispose(),i.delete(o),o.removeEventListener("dispose",S)};var f=S;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let E=0;g===!0&&(E=1),_===!0&&(E=2),m===!0&&(E=3);let R=o.attributes.position.count*E,A=1;R>e.maxTextureSize&&(A=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const D=new Float32Array(R*A*4*d),H=new Zf(D,R,A,d);H.type=Ln,H.needsUpdate=!0;const b=E*4;for(let C=0;C<d;C++){const k=p[C],O=v[C],Y=x[C],W=R*A*4*C;for(let V=0;V<k.count;V++){const j=V*b;g===!0&&(s.fromBufferAttribute(k,V),D[W+j+0]=s.x,D[W+j+1]=s.y,D[W+j+2]=s.z,D[W+j+3]=0),_===!0&&(s.fromBufferAttribute(O,V),D[W+j+4]=s.x,D[W+j+5]=s.y,D[W+j+6]=s.z,D[W+j+7]=0),m===!0&&(s.fromBufferAttribute(Y,V),D[W+j+8]=s.x,D[W+j+9]=s.y,D[W+j+10]=s.z,D[W+j+11]=Y.itemSize===4?s.w:1)}}h={count:d,texture:H,size:new ae(R,A)},i.set(o,h),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",_),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function J_(n,e,t,i){let s=new WeakMap;function r(c){const l=i.render.frame,u=c.geometry,d=e.get(c,u);if(s.get(d)!==l&&(e.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;s.get(h)!==l&&(h.update(),s.set(h,l))}return d}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}class rp extends St{constructor(e,t,i,s,r,a,o,c,l,u=Ws){if(u!==Ws&&u!==tr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Ws&&(i=ss),i===void 0&&u===tr&&(i=er),super(null,s,r,a,o,c,u,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:zt,this.minFilter=c!==void 0?c:zt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const ap=new St,jd=new rp(1,1),op=new Zf,cp=new Fg,lp=new np,Kd=[],qd=[],Zd=new Float32Array(16),Jd=new Float32Array(9),Qd=new Float32Array(4);function fr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Kd[s];if(r===void 0&&(r=new Float32Array(s),Kd[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function yt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Et(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Zo(n,e){let t=qd[e];t===void 0&&(t=new Int32Array(e),qd[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Q_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function $_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;n.uniform2fv(this.addr,e),Et(t,e)}}function ev(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(yt(t,e))return;n.uniform3fv(this.addr,e),Et(t,e)}}function tv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;n.uniform4fv(this.addr,e),Et(t,e)}}function nv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(yt(t,i))return;Qd.set(i),n.uniformMatrix2fv(this.addr,!1,Qd),Et(t,i)}}function iv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(yt(t,i))return;Jd.set(i),n.uniformMatrix3fv(this.addr,!1,Jd),Et(t,i)}}function sv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(yt(t,i))return;Zd.set(i),n.uniformMatrix4fv(this.addr,!1,Zd),Et(t,i)}}function rv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function av(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;n.uniform2iv(this.addr,e),Et(t,e)}}function ov(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;n.uniform3iv(this.addr,e),Et(t,e)}}function cv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;n.uniform4iv(this.addr,e),Et(t,e)}}function lv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function uv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;n.uniform2uiv(this.addr,e),Et(t,e)}}function dv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;n.uniform3uiv(this.addr,e),Et(t,e)}}function hv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;n.uniform4uiv(this.addr,e),Et(t,e)}}function fv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(jd.compareFunction=jf,r=jd):r=ap,t.setTexture2D(e||r,s)}function pv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||cp,s)}function mv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||lp,s)}function gv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||op,s)}function _v(n){switch(n){case 5126:return Q_;case 35664:return $_;case 35665:return ev;case 35666:return tv;case 35674:return nv;case 35675:return iv;case 35676:return sv;case 5124:case 35670:return rv;case 35667:case 35671:return av;case 35668:case 35672:return ov;case 35669:case 35673:return cv;case 5125:return lv;case 36294:return uv;case 36295:return dv;case 36296:return hv;case 35678:case 36198:case 36298:case 36306:case 35682:return fv;case 35679:case 36299:case 36307:return pv;case 35680:case 36300:case 36308:case 36293:return mv;case 36289:case 36303:case 36311:case 36292:return gv}}function vv(n,e){n.uniform1fv(this.addr,e)}function xv(n,e){const t=fr(e,this.size,2);n.uniform2fv(this.addr,t)}function Mv(n,e){const t=fr(e,this.size,3);n.uniform3fv(this.addr,t)}function Sv(n,e){const t=fr(e,this.size,4);n.uniform4fv(this.addr,t)}function yv(n,e){const t=fr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Ev(n,e){const t=fr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function bv(n,e){const t=fr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Av(n,e){n.uniform1iv(this.addr,e)}function Tv(n,e){n.uniform2iv(this.addr,e)}function wv(n,e){n.uniform3iv(this.addr,e)}function Dv(n,e){n.uniform4iv(this.addr,e)}function Pv(n,e){n.uniform1uiv(this.addr,e)}function Cv(n,e){n.uniform2uiv(this.addr,e)}function Rv(n,e){n.uniform3uiv(this.addr,e)}function Lv(n,e){n.uniform4uiv(this.addr,e)}function Iv(n,e,t){const i=this.cache,s=e.length,r=Zo(t,s);yt(i,r)||(n.uniform1iv(this.addr,r),Et(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||ap,r[a])}function Hv(n,e,t){const i=this.cache,s=e.length,r=Zo(t,s);yt(i,r)||(n.uniform1iv(this.addr,r),Et(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||cp,r[a])}function Uv(n,e,t){const i=this.cache,s=e.length,r=Zo(t,s);yt(i,r)||(n.uniform1iv(this.addr,r),Et(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||lp,r[a])}function Nv(n,e,t){const i=this.cache,s=e.length,r=Zo(t,s);yt(i,r)||(n.uniform1iv(this.addr,r),Et(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||op,r[a])}function Ov(n){switch(n){case 5126:return vv;case 35664:return xv;case 35665:return Mv;case 35666:return Sv;case 35674:return yv;case 35675:return Ev;case 35676:return bv;case 5124:case 35670:return Av;case 35667:case 35671:return Tv;case 35668:case 35672:return wv;case 35669:case 35673:return Dv;case 5125:return Pv;case 36294:return Cv;case 36295:return Rv;case 36296:return Lv;case 35678:case 36198:case 36298:case 36306:case 35682:return Iv;case 35679:case 36299:case 36307:return Hv;case 35680:case 36300:case 36308:case 36293:return Uv;case 36289:case 36303:case 36311:case 36292:return Nv}}class Fv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=_v(t.type)}}class zv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ov(t.type)}}class Bv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Bc=/(\w+)(\])?(\[|\.)?/g;function $d(n,e){n.seq.push(e),n.map[e.id]=e}function kv(n,e,t){const i=n.name,s=i.length;for(Bc.lastIndex=0;;){const r=Bc.exec(i),a=Bc.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){$d(t,l===void 0?new Fv(o,n,e):new zv(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new Bv(o),$d(t,d)),t=d}}}class _o{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);kv(r,a,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function eh(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Gv=37297;let Vv=0;function Wv(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function Xv(n){const e=Ke.getPrimaries(Ke.workingColorSpace),t=Ke.getPrimaries(n);let i;switch(e===t?i="":e===wo&&t===To?i="LinearDisplayP3ToLinearSRGB":e===To&&t===wo&&(i="LinearSRGBToLinearDisplayP3"),n){case Hi:case qo:return[i,"LinearTransferOETF"];case Mt:case bu:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function th(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Wv(n.getShaderSource(e),a)}else return s}function Yv(n,e){const t=Xv(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function jv(n,e){let t;switch(e){case Rf:t="Linear";break;case Lf:t="Reinhard";break;case If:t="Cineon";break;case gu:t="ACESFilmic";break;case Hf:t="AgX";break;case Uf:t="Neutral";break;case ng:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ga=new w;function Kv(){Ke.getLuminanceCoefficients(Ga);const n=Ga.x.toFixed(4),e=Ga.y.toFixed(4),t=Ga.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lr).join(`
`)}function Zv(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Jv(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Lr(n){return n!==""}function nh(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ih(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Qv=/^[ \t]*#include +<([\w\d./]+)>/gm;function jl(n){return n.replace(Qv,ex)}const $v=new Map;function ex(n,e){let t=Ne[e];if(t===void 0){const i=$v.get(e);if(i!==void 0)t=Ne[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return jl(t)}const tx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sh(n){return n.replace(tx,nx)}function nx(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function rh(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ix(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Df?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Pf?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===qn&&(e="SHADOWMAP_TYPE_VSM"),e}function sx(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Js:case Qs:e="ENVMAP_TYPE_CUBE";break;case Ko:e="ENVMAP_TYPE_CUBE_UV";break}return e}function rx(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Qs:e="ENVMAP_MODE_REFRACTION";break}return e}function ax(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Cf:e="ENVMAP_BLENDING_MULTIPLY";break;case eg:e="ENVMAP_BLENDING_MIX";break;case tg:e="ENVMAP_BLENDING_ADD";break}return e}function ox(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function cx(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=ix(t),l=sx(t),u=rx(t),d=ax(t),h=ox(t),f=qv(t),g=Zv(r),_=s.createProgram();let m,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Lr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Lr).join(`
`),p.length>0&&(p+=`
`)):(m=[rh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lr).join(`
`),p=[rh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ai?"#define TONE_MAPPING":"",t.toneMapping!==Ai?Ne.tonemapping_pars_fragment:"",t.toneMapping!==Ai?jv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,Yv("linearToOutputTexel",t.outputColorSpace),Kv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Lr).join(`
`)),a=jl(a),a=nh(a,t),a=ih(a,t),o=jl(o),o=nh(o,t),o=ih(o,t),a=sh(a),o=sh(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===xd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===xd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=v+m+a,E=v+p+o,R=eh(s,s.VERTEX_SHADER,x),A=eh(s,s.FRAGMENT_SHADER,E);s.attachShader(_,R),s.attachShader(_,A),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function D(C){if(n.debug.checkShaderErrors){const k=s.getProgramInfoLog(_).trim(),O=s.getShaderInfoLog(R).trim(),Y=s.getShaderInfoLog(A).trim();let W=!0,V=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,R,A);else{const j=th(s,R,"vertex"),G=th(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+k+`
`+j+`
`+G)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(O===""||Y==="")&&(V=!1);V&&(C.diagnostics={runnable:W,programLog:k,vertexShader:{log:O,prefix:m},fragmentShader:{log:Y,prefix:p}})}s.deleteShader(R),s.deleteShader(A),H=new _o(s,_),b=Jv(s,_)}let H;this.getUniforms=function(){return H===void 0&&D(this),H};let b;this.getAttributes=function(){return b===void 0&&D(this),b};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(_,Gv)),S},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Vv++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=A,this}let lx=0;class ux{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new dx(e),t.set(e,i)),i}}class dx{constructor(e){this.id=lx++,this.code=e,this.usedTimes=0}}function hx(n,e,t,i,s,r,a){const o=new Tu,c=new ux,l=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,S,C,k,O){const Y=k.fog,W=O.geometry,V=b.isMeshStandardMaterial?k.environment:null,j=(b.isMeshStandardMaterial?t:e).get(b.envMap||V),G=j&&j.mapping===Ko?j.image.height:null,re=g[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const de=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,xe=de!==void 0?de.length:0;let Fe=0;W.morphAttributes.position!==void 0&&(Fe=1),W.morphAttributes.normal!==void 0&&(Fe=2),W.morphAttributes.color!==void 0&&(Fe=3);let Ye,X,$,ge;if(re){const Je=qt[re];Ye=Je.vertexShader,X=Je.fragmentShader}else Ye=b.vertexShader,X=b.fragmentShader,c.update(b),$=c.getVertexShaderID(b),ge=c.getFragmentShaderID(b);const he=n.getRenderTarget(),Ee=O.isInstancedMesh===!0,Ae=O.isBatchedMesh===!0,Ie=!!b.map,st=!!b.matcap,P=!!j,je=!!b.aoMap,We=!!b.lightMap,ke=!!b.bumpMap,Me=!!b.normalMap,ot=!!b.displacementMap,Te=!!b.emissiveMap,Ce=!!b.metalnessMap,T=!!b.roughnessMap,M=b.anisotropy>0,B=b.clearcoat>0,Z=b.dispersion>0,Q=b.iridescence>0,J=b.sheen>0,be=b.transmission>0,oe=M&&!!b.anisotropyMap,pe=B&&!!b.clearcoatMap,Ue=B&&!!b.clearcoatNormalMap,ee=B&&!!b.clearcoatRoughnessMap,fe=Q&&!!b.iridescenceMap,Ve=Q&&!!b.iridescenceThicknessMap,Re=J&&!!b.sheenColorMap,me=J&&!!b.sheenRoughnessMap,He=!!b.specularMap,ze=!!b.specularColorMap,ct=!!b.specularIntensityMap,L=be&&!!b.transmissionMap,te=be&&!!b.thicknessMap,K=!!b.gradientMap,q=!!b.alphaMap,ie=b.alphaTest>0,we=!!b.alphaHash,Xe=!!b.extensions;let mt=Ai;b.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(mt=n.toneMapping);const wt={shaderID:re,shaderType:b.type,shaderName:b.name,vertexShader:Ye,fragmentShader:X,defines:b.defines,customVertexShaderID:$,customFragmentShaderID:ge,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Ae,batchingColor:Ae&&O._colorsTexture!==null,instancing:Ee,instancingColor:Ee&&O.instanceColor!==null,instancingMorph:Ee&&O.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:he===null?n.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Hi,alphaToCoverage:!!b.alphaToCoverage,map:Ie,matcap:st,envMap:P,envMapMode:P&&j.mapping,envMapCubeUVHeight:G,aoMap:je,lightMap:We,bumpMap:ke,normalMap:Me,displacementMap:h&&ot,emissiveMap:Te,normalMapObjectSpace:Me&&b.normalMapType===ag,normalMapTangentSpace:Me&&b.normalMapType===Yf,metalnessMap:Ce,roughnessMap:T,anisotropy:M,anisotropyMap:oe,clearcoat:B,clearcoatMap:pe,clearcoatNormalMap:Ue,clearcoatRoughnessMap:ee,dispersion:Z,iridescence:Q,iridescenceMap:fe,iridescenceThicknessMap:Ve,sheen:J,sheenColorMap:Re,sheenRoughnessMap:me,specularMap:He,specularColorMap:ze,specularIntensityMap:ct,transmission:be,transmissionMap:L,thicknessMap:te,gradientMap:K,opaque:b.transparent===!1&&b.blending===Vs&&b.alphaToCoverage===!1,alphaMap:q,alphaTest:ie,alphaHash:we,combine:b.combine,mapUv:Ie&&_(b.map.channel),aoMapUv:je&&_(b.aoMap.channel),lightMapUv:We&&_(b.lightMap.channel),bumpMapUv:ke&&_(b.bumpMap.channel),normalMapUv:Me&&_(b.normalMap.channel),displacementMapUv:ot&&_(b.displacementMap.channel),emissiveMapUv:Te&&_(b.emissiveMap.channel),metalnessMapUv:Ce&&_(b.metalnessMap.channel),roughnessMapUv:T&&_(b.roughnessMap.channel),anisotropyMapUv:oe&&_(b.anisotropyMap.channel),clearcoatMapUv:pe&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:Ue&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Ve&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:me&&_(b.sheenRoughnessMap.channel),specularMapUv:He&&_(b.specularMap.channel),specularColorMapUv:ze&&_(b.specularColorMap.channel),specularIntensityMapUv:ct&&_(b.specularIntensityMap.channel),transmissionMapUv:L&&_(b.transmissionMap.channel),thicknessMapUv:te&&_(b.thicknessMap.channel),alphaMapUv:q&&_(b.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(Me||M),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!W.attributes.uv&&(Ie||q),fog:!!Y,useFog:b.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:O.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:Fe,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:mt,decodeVideoTexture:Ie&&b.map.isVideoTexture===!0&&Ke.getTransfer(b.map.colorSpace)===rt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===fn,flipSided:b.side===Bt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Xe&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xe&&b.extensions.multiDraw===!0||Ae)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return wt.vertexUv1s=l.has(1),wt.vertexUv2s=l.has(2),wt.vertexUv3s=l.has(3),l.clear(),wt}function p(b){const S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(const C in b.defines)S.push(C),S.push(b.defines[C]);return b.isRawShaderMaterial===!1&&(v(S,b),x(S,b),S.push(n.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function v(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function x(b,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.skinning&&o.enable(4),S.morphTargets&&o.enable(5),S.morphNormals&&o.enable(6),S.morphColors&&o.enable(7),S.premultipliedAlpha&&o.enable(8),S.shadowMapEnabled&&o.enable(9),S.doubleSided&&o.enable(10),S.flipSided&&o.enable(11),S.useDepthPacking&&o.enable(12),S.dithering&&o.enable(13),S.transmission&&o.enable(14),S.sheen&&o.enable(15),S.opaque&&o.enable(16),S.pointsUvs&&o.enable(17),S.decodeVideoTexture&&o.enable(18),S.alphaToCoverage&&o.enable(19),b.push(o.mask)}function E(b){const S=g[b.type];let C;if(S){const k=qt[S];C=Nn.clone(k.uniforms)}else C=b.uniforms;return C}function R(b,S){let C;for(let k=0,O=u.length;k<O;k++){const Y=u[k];if(Y.cacheKey===S){C=Y,++C.usedTimes;break}}return C===void 0&&(C=new cx(n,S,b,r),u.push(C)),C}function A(b){if(--b.usedTimes===0){const S=u.indexOf(b);u[S]=u[u.length-1],u.pop(),b.destroy()}}function D(b){c.remove(b)}function H(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:E,acquireProgram:R,releaseProgram:A,releaseShaderCache:D,programs:u,dispose:H}}function fx(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function px(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function ah(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function oh(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(d,h,f,g,_,m){let p=n[e];return p===void 0?(p={id:d.id,object:d,geometry:h,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},n[e]=p):(p.id=d.id,p.object=d,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=_,p.group=m),e++,p}function o(d,h,f,g,_,m){const p=a(d,h,f,g,_,m);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):t.push(p)}function c(d,h,f,g,_,m){const p=a(d,h,f,g,_,m);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function l(d,h){t.length>1&&t.sort(d||px),i.length>1&&i.sort(h||ah),s.length>1&&s.sort(h||ah)}function u(){for(let d=e,h=n.length;d<h;d++){const f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:c,finish:u,sort:l}}function mx(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new oh,n.set(i,[a])):s>=r.length?(a=new oh,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function gx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new Le};break;case"SpotLight":t={position:new w,direction:new w,color:new Le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new Le,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new Le,groundColor:new Le};break;case"RectAreaLight":t={color:new Le,position:new w,halfWidth:new w,halfHeight:new w};break}return n[e.id]=t,t}}}function _x(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let vx=0;function xx(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Mx(n){const e=new gx,t=_x(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new w);const s=new w,r=new Ze,a=new Ze;function o(l){let u=0,d=0,h=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,v=0,x=0,E=0,R=0,A=0,D=0;l.sort(xx);for(let b=0,S=l.length;b<S;b++){const C=l[b],k=C.color,O=C.intensity,Y=C.distance,W=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=k.r*O,d+=k.g*O,h+=k.b*O;else if(C.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(C.sh.coefficients[V],O);D++}else if(C.isDirectionalLight){const V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const j=C.shadow,G=t.get(C);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,i.directionalShadow[f]=G,i.directionalShadowMap[f]=W,i.directionalShadowMatrix[f]=C.shadow.matrix,v++}i.directional[f]=V,f++}else if(C.isSpotLight){const V=e.get(C);V.position.setFromMatrixPosition(C.matrixWorld),V.color.copy(k).multiplyScalar(O),V.distance=Y,V.coneCos=Math.cos(C.angle),V.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),V.decay=C.decay,i.spot[_]=V;const j=C.shadow;if(C.map&&(i.spotLightMap[R]=C.map,R++,j.updateMatrices(C),C.castShadow&&A++),i.spotLightMatrix[_]=j.matrix,C.castShadow){const G=t.get(C);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,i.spotShadow[_]=G,i.spotShadowMap[_]=W,E++}_++}else if(C.isRectAreaLight){const V=e.get(C);V.color.copy(k).multiplyScalar(O),V.halfWidth.set(C.width*.5,0,0),V.halfHeight.set(0,C.height*.5,0),i.rectArea[m]=V,m++}else if(C.isPointLight){const V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),V.distance=C.distance,V.decay=C.decay,C.castShadow){const j=C.shadow,G=t.get(C);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,G.shadowCameraNear=j.camera.near,G.shadowCameraFar=j.camera.far,i.pointShadow[g]=G,i.pointShadowMap[g]=W,i.pointShadowMatrix[g]=C.shadow.matrix,x++}i.point[g]=V,g++}else if(C.isHemisphereLight){const V=e.get(C);V.skyColor.copy(C.color).multiplyScalar(O),V.groundColor.copy(C.groundColor).multiplyScalar(O),i.hemi[p]=V,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=se.LTC_FLOAT_1,i.rectAreaLTC2=se.LTC_FLOAT_2):(i.rectAreaLTC1=se.LTC_HALF_1,i.rectAreaLTC2=se.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const H=i.hash;(H.directionalLength!==f||H.pointLength!==g||H.spotLength!==_||H.rectAreaLength!==m||H.hemiLength!==p||H.numDirectionalShadows!==v||H.numPointShadows!==x||H.numSpotShadows!==E||H.numSpotMaps!==R||H.numLightProbes!==D)&&(i.directional.length=f,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=E+R-A,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=D,H.directionalLength=f,H.pointLength=g,H.spotLength=_,H.rectAreaLength=m,H.hemiLength=p,H.numDirectionalShadows=v,H.numPointShadows=x,H.numSpotShadows=E,H.numSpotMaps=R,H.numLightProbes=D,i.version=vx++)}function c(l,u){let d=0,h=0,f=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,v=l.length;p<v;p++){const x=l[p];if(x.isDirectionalLight){const E=i.directional[d];E.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),d++}else if(x.isSpotLight){const E=i.spot[f];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),f++}else if(x.isRectAreaLight){const E=i.rectArea[g];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(m),a.identity(),r.copy(x.matrixWorld),r.premultiply(m),a.extractRotation(r),E.halfWidth.set(x.width*.5,0,0),E.halfHeight.set(0,x.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),g++}else if(x.isPointLight){const E=i.point[h];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(m),h++}else if(x.isHemisphereLight){const E=i.hemi[_];E.direction.setFromMatrixPosition(x.matrixWorld),E.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:i}}function ch(n){const e=new Mx(n),t=[],i=[];function s(u){l.camera=u,t.length=0,i.length=0}function r(u){t.push(u)}function a(u){i.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Sx(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new ch(n),e.set(s,[o])):r>=a.length?(o=new ch(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}class yx extends Ui{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=sg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ex extends Ui{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const bx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ax=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Tx(n,e,t){let i=new wu;const s=new ae,r=new ae,a=new tt,o=new yx({depthPacking:rg}),c=new Ex,l={},u=t.maxTextureSize,d={[ri]:Bt,[Bt]:ri,[fn]:fn},h=new lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ae},radius:{value:4}},vertexShader:bx,fragmentShader:Ax}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new ut;g.setAttribute("position",new Ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new pt(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Df;let p=this.type;this.render=function(A,D,H){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const b=n.getRenderTarget(),S=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),k=n.state;k.setBlending($n),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const O=p!==qn&&this.type===qn,Y=p===qn&&this.type!==qn;for(let W=0,V=A.length;W<V;W++){const j=A[W],G=j.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const re=G.getFrameExtents();if(s.multiply(re),r.copy(G.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/re.x),s.x=r.x*re.x,G.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/re.y),s.y=r.y*re.y,G.mapSize.y=r.y)),G.map===null||O===!0||Y===!0){const xe=this.type!==qn?{minFilter:zt,magFilter:zt}:{};G.map!==null&&G.map.dispose(),G.map=new Jt(s.x,s.y,xe),G.map.texture.name=j.name+".shadowMap",G.camera.updateProjectionMatrix()}n.setRenderTarget(G.map),n.clear();const de=G.getViewportCount();for(let xe=0;xe<de;xe++){const Fe=G.getViewport(xe);a.set(r.x*Fe.x,r.y*Fe.y,r.x*Fe.z,r.y*Fe.w),k.viewport(a),G.updateMatrices(j,xe),i=G.getFrustum(),E(D,H,G.camera,j,this.type)}G.isPointLightShadow!==!0&&this.type===qn&&v(G,H),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(b,S,C)};function v(A,D){const H=e.update(_);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Jt(s.x,s.y)),h.uniforms.shadow_pass.value=A.map.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(D,null,H,h,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(D,null,H,f,_,null)}function x(A,D,H,b){let S=null;const C=H.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(C!==void 0)S=C;else if(S=H.isPointLight===!0?c:o,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0){const k=S.uuid,O=D.uuid;let Y=l[k];Y===void 0&&(Y={},l[k]=Y);let W=Y[O];W===void 0&&(W=S.clone(),Y[O]=W,D.addEventListener("dispose",R)),S=W}if(S.visible=D.visible,S.wireframe=D.wireframe,b===qn?S.side=D.shadowSide!==null?D.shadowSide:D.side:S.side=D.shadowSide!==null?D.shadowSide:d[D.side],S.alphaMap=D.alphaMap,S.alphaTest=D.alphaTest,S.map=D.map,S.clipShadows=D.clipShadows,S.clippingPlanes=D.clippingPlanes,S.clipIntersection=D.clipIntersection,S.displacementMap=D.displacementMap,S.displacementScale=D.displacementScale,S.displacementBias=D.displacementBias,S.wireframeLinewidth=D.wireframeLinewidth,S.linewidth=D.linewidth,H.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const k=n.properties.get(S);k.light=H}return S}function E(A,D,H,b,S){if(A.visible===!1)return;if(A.layers.test(D.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&S===qn)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,A.matrixWorld);const O=e.update(A),Y=A.material;if(Array.isArray(Y)){const W=O.groups;for(let V=0,j=W.length;V<j;V++){const G=W[V],re=Y[G.materialIndex];if(re&&re.visible){const de=x(A,re,b,S);A.onBeforeShadow(n,A,D,H,O,de,G),n.renderBufferDirect(H,null,O,de,A,G),A.onAfterShadow(n,A,D,H,O,de,G)}}}else if(Y.visible){const W=x(A,Y,b,S);A.onBeforeShadow(n,A,D,H,O,W,null),n.renderBufferDirect(H,null,O,W,A,null),A.onAfterShadow(n,A,D,H,O,W,null)}}const k=A.children;for(let O=0,Y=k.length;O<Y;O++)E(k[O],D,H,b,S)}function R(A){A.target.removeEventListener("dispose",R);for(const H in l){const b=l[H],S=A.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}function wx(n){function e(){let L=!1;const te=new tt;let K=null;const q=new tt(0,0,0,0);return{setMask:function(ie){K!==ie&&!L&&(n.colorMask(ie,ie,ie,ie),K=ie)},setLocked:function(ie){L=ie},setClear:function(ie,we,Xe,mt,wt){wt===!0&&(ie*=mt,we*=mt,Xe*=mt),te.set(ie,we,Xe,mt),q.equals(te)===!1&&(n.clearColor(ie,we,Xe,mt),q.copy(te))},reset:function(){L=!1,K=null,q.set(-1,0,0,0)}}}function t(){let L=!1,te=null,K=null,q=null;return{setTest:function(ie){ie?ge(n.DEPTH_TEST):he(n.DEPTH_TEST)},setMask:function(ie){te!==ie&&!L&&(n.depthMask(ie),te=ie)},setFunc:function(ie){if(K!==ie){switch(ie){case jm:n.depthFunc(n.NEVER);break;case Km:n.depthFunc(n.ALWAYS);break;case qm:n.depthFunc(n.LESS);break;case bo:n.depthFunc(n.LEQUAL);break;case Zm:n.depthFunc(n.EQUAL);break;case Jm:n.depthFunc(n.GEQUAL);break;case Qm:n.depthFunc(n.GREATER);break;case $m:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}K=ie}},setLocked:function(ie){L=ie},setClear:function(ie){q!==ie&&(n.clearDepth(ie),q=ie)},reset:function(){L=!1,te=null,K=null,q=null}}}function i(){let L=!1,te=null,K=null,q=null,ie=null,we=null,Xe=null,mt=null,wt=null;return{setTest:function(Je){L||(Je?ge(n.STENCIL_TEST):he(n.STENCIL_TEST))},setMask:function(Je){te!==Je&&!L&&(n.stencilMask(Je),te=Je)},setFunc:function(Je,zn,wn){(K!==Je||q!==zn||ie!==wn)&&(n.stencilFunc(Je,zn,wn),K=Je,q=zn,ie=wn)},setOp:function(Je,zn,wn){(we!==Je||Xe!==zn||mt!==wn)&&(n.stencilOp(Je,zn,wn),we=Je,Xe=zn,mt=wn)},setLocked:function(Je){L=Je},setClear:function(Je){wt!==Je&&(n.clearStencil(Je),wt=Je)},reset:function(){L=!1,te=null,K=null,q=null,ie=null,we=null,Xe=null,mt=null,wt=null}}}const s=new e,r=new t,a=new i,o=new WeakMap,c=new WeakMap;let l={},u={},d=new WeakMap,h=[],f=null,g=!1,_=null,m=null,p=null,v=null,x=null,E=null,R=null,A=new Le(0,0,0),D=0,H=!1,b=null,S=null,C=null,k=null,O=null;const Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,V=0;const j=n.getParameter(n.VERSION);j.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(j)[1]),W=V>=1):j.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),W=V>=2);let G=null,re={};const de=n.getParameter(n.SCISSOR_BOX),xe=n.getParameter(n.VIEWPORT),Fe=new tt().fromArray(de),Ye=new tt().fromArray(xe);function X(L,te,K,q){const ie=new Uint8Array(4),we=n.createTexture();n.bindTexture(L,we),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Xe=0;Xe<K;Xe++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(te,0,n.RGBA,1,1,q,0,n.RGBA,n.UNSIGNED_BYTE,ie):n.texImage2D(te+Xe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ie);return we}const $={};$[n.TEXTURE_2D]=X(n.TEXTURE_2D,n.TEXTURE_2D,1),$[n.TEXTURE_CUBE_MAP]=X(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[n.TEXTURE_2D_ARRAY]=X(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),$[n.TEXTURE_3D]=X(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),ge(n.DEPTH_TEST),r.setFunc(bo),ke(!1),Me(md),ge(n.CULL_FACE),je($n);function ge(L){l[L]!==!0&&(n.enable(L),l[L]=!0)}function he(L){l[L]!==!1&&(n.disable(L),l[L]=!1)}function Ee(L,te){return u[L]!==te?(n.bindFramebuffer(L,te),u[L]=te,L===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=te),L===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=te),!0):!1}function Ae(L,te){let K=h,q=!1;if(L){K=d.get(te),K===void 0&&(K=[],d.set(te,K));const ie=L.textures;if(K.length!==ie.length||K[0]!==n.COLOR_ATTACHMENT0){for(let we=0,Xe=ie.length;we<Xe;we++)K[we]=n.COLOR_ATTACHMENT0+we;K.length=ie.length,q=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,q=!0);q&&n.drawBuffers(K)}function Ie(L){return f!==L?(n.useProgram(L),f=L,!0):!1}const st={[Ki]:n.FUNC_ADD,[Cm]:n.FUNC_SUBTRACT,[Rm]:n.FUNC_REVERSE_SUBTRACT};st[Lm]=n.MIN,st[Im]=n.MAX;const P={[Hm]:n.ZERO,[Um]:n.ONE,[Nm]:n.SRC_COLOR,[ml]:n.SRC_ALPHA,[Gm]:n.SRC_ALPHA_SATURATE,[Bm]:n.DST_COLOR,[Fm]:n.DST_ALPHA,[Om]:n.ONE_MINUS_SRC_COLOR,[gl]:n.ONE_MINUS_SRC_ALPHA,[km]:n.ONE_MINUS_DST_COLOR,[zm]:n.ONE_MINUS_DST_ALPHA,[Vm]:n.CONSTANT_COLOR,[Wm]:n.ONE_MINUS_CONSTANT_COLOR,[Xm]:n.CONSTANT_ALPHA,[Ym]:n.ONE_MINUS_CONSTANT_ALPHA};function je(L,te,K,q,ie,we,Xe,mt,wt,Je){if(L===$n){g===!0&&(he(n.BLEND),g=!1);return}if(g===!1&&(ge(n.BLEND),g=!0),L!==Pm){if(L!==_||Je!==H){if((m!==Ki||x!==Ki)&&(n.blendEquation(n.FUNC_ADD),m=Ki,x=Ki),Je)switch(L){case Vs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Di:n.blendFunc(n.ONE,n.ONE);break;case gd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case _d:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Vs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Di:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case gd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case _d:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}p=null,v=null,E=null,R=null,A.set(0,0,0),D=0,_=L,H=Je}return}ie=ie||te,we=we||K,Xe=Xe||q,(te!==m||ie!==x)&&(n.blendEquationSeparate(st[te],st[ie]),m=te,x=ie),(K!==p||q!==v||we!==E||Xe!==R)&&(n.blendFuncSeparate(P[K],P[q],P[we],P[Xe]),p=K,v=q,E=we,R=Xe),(mt.equals(A)===!1||wt!==D)&&(n.blendColor(mt.r,mt.g,mt.b,wt),A.copy(mt),D=wt),_=L,H=!1}function We(L,te){L.side===fn?he(n.CULL_FACE):ge(n.CULL_FACE);let K=L.side===Bt;te&&(K=!K),ke(K),L.blending===Vs&&L.transparent===!1?je($n):je(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),r.setFunc(L.depthFunc),r.setTest(L.depthTest),r.setMask(L.depthWrite),s.setMask(L.colorWrite);const q=L.stencilWrite;a.setTest(q),q&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Te(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ge(n.SAMPLE_ALPHA_TO_COVERAGE):he(n.SAMPLE_ALPHA_TO_COVERAGE)}function ke(L){b!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),b=L)}function Me(L){L!==wm?(ge(n.CULL_FACE),L!==S&&(L===md?n.cullFace(n.BACK):L===Dm?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):he(n.CULL_FACE),S=L}function ot(L){L!==C&&(W&&n.lineWidth(L),C=L)}function Te(L,te,K){L?(ge(n.POLYGON_OFFSET_FILL),(k!==te||O!==K)&&(n.polygonOffset(te,K),k=te,O=K)):he(n.POLYGON_OFFSET_FILL)}function Ce(L){L?ge(n.SCISSOR_TEST):he(n.SCISSOR_TEST)}function T(L){L===void 0&&(L=n.TEXTURE0+Y-1),G!==L&&(n.activeTexture(L),G=L)}function M(L,te,K){K===void 0&&(G===null?K=n.TEXTURE0+Y-1:K=G);let q=re[K];q===void 0&&(q={type:void 0,texture:void 0},re[K]=q),(q.type!==L||q.texture!==te)&&(G!==K&&(n.activeTexture(K),G=K),n.bindTexture(L,te||$[L]),q.type=L,q.texture=te)}function B(){const L=re[G];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Z(){try{n.compressedTexImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{n.compressedTexImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function J(){try{n.texSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function be(){try{n.texSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function oe(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function pe(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ue(){try{n.texStorage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ee(){try{n.texStorage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function fe(){try{n.texImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ve(){try{n.texImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Re(L){Fe.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),Fe.copy(L))}function me(L){Ye.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Ye.copy(L))}function He(L,te){let K=c.get(te);K===void 0&&(K=new WeakMap,c.set(te,K));let q=K.get(L);q===void 0&&(q=n.getUniformBlockIndex(te,L.name),K.set(L,q))}function ze(L,te){const q=c.get(te).get(L);o.get(te)!==q&&(n.uniformBlockBinding(te,q,L.__bindingPointIndex),o.set(te,q))}function ct(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),l={},G=null,re={},u={},d=new WeakMap,h=[],f=null,g=!1,_=null,m=null,p=null,v=null,x=null,E=null,R=null,A=new Le(0,0,0),D=0,H=!1,b=null,S=null,C=null,k=null,O=null,Fe.set(0,0,n.canvas.width,n.canvas.height),Ye.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:ge,disable:he,bindFramebuffer:Ee,drawBuffers:Ae,useProgram:Ie,setBlending:je,setMaterial:We,setFlipSided:ke,setCullFace:Me,setLineWidth:ot,setPolygonOffset:Te,setScissorTest:Ce,activeTexture:T,bindTexture:M,unbindTexture:B,compressedTexImage2D:Z,compressedTexImage3D:Q,texImage2D:fe,texImage3D:Ve,updateUBOMapping:He,uniformBlockBinding:ze,texStorage2D:Ue,texStorage3D:ee,texSubImage2D:J,texSubImage3D:be,compressedTexSubImage2D:oe,compressedTexSubImage3D:pe,scissor:Re,viewport:me,reset:ct}}function lh(n,e,t,i){const s=Dx(i);switch(t){case Bf:return n*e;case Gf:return n*e;case Vf:return n*e*2;case Mu:return n*e/s.components*s.byteLength;case Su:return n*e/s.components*s.byteLength;case Wf:return n*e*2/s.components*s.byteLength;case yu:return n*e*2/s.components*s.byteLength;case kf:return n*e*3/s.components*s.byteLength;case bn:return n*e*4/s.components*s.byteLength;case Eu:return n*e*4/s.components*s.byteLength;case ho:case fo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case po:case mo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Sl:case El:return Math.max(n,16)*Math.max(e,8)/4;case Ml:case yl:return Math.max(n,8)*Math.max(e,8)/2;case bl:case Al:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Tl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case wl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Dl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Pl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Cl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Rl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ll:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Il:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Hl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ul:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Nl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ol:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Fl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case zl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Bl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case go:case kl:case Gl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Xf:case Vl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Wl:case Xl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Dx(n){switch(n){case ai:case Of:return{byteLength:1,components:1};case Yr:case Ff:case mn:return{byteLength:2,components:1};case vu:case xu:return{byteLength:2,components:4};case ss:case _u:case Ln:return{byteLength:4,components:1};case zf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Px(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ae,u=new WeakMap;let d;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,M){return f?new OffscreenCanvas(T,M):qr("canvas")}function _(T,M,B){let Z=1;const Q=Ce(T);if((Q.width>B||Q.height>B)&&(Z=B/Math.max(Q.width,Q.height)),Z<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const J=Math.floor(Z*Q.width),be=Math.floor(Z*Q.height);d===void 0&&(d=g(J,be));const oe=M?g(J,be):d;return oe.width=J,oe.height=be,oe.getContext("2d").drawImage(T,0,0,J,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+J+"x"+be+")."),oe}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function m(T){return T.generateMipmaps&&T.minFilter!==zt&&T.minFilter!==pn}function p(T){n.generateMipmap(T)}function v(T,M,B,Z,Q=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let J=M;if(M===n.RED&&(B===n.FLOAT&&(J=n.R32F),B===n.HALF_FLOAT&&(J=n.R16F),B===n.UNSIGNED_BYTE&&(J=n.R8)),M===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(J=n.R8UI),B===n.UNSIGNED_SHORT&&(J=n.R16UI),B===n.UNSIGNED_INT&&(J=n.R32UI),B===n.BYTE&&(J=n.R8I),B===n.SHORT&&(J=n.R16I),B===n.INT&&(J=n.R32I)),M===n.RG&&(B===n.FLOAT&&(J=n.RG32F),B===n.HALF_FLOAT&&(J=n.RG16F),B===n.UNSIGNED_BYTE&&(J=n.RG8)),M===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(J=n.RG8UI),B===n.UNSIGNED_SHORT&&(J=n.RG16UI),B===n.UNSIGNED_INT&&(J=n.RG32UI),B===n.BYTE&&(J=n.RG8I),B===n.SHORT&&(J=n.RG16I),B===n.INT&&(J=n.RG32I)),M===n.RGB&&B===n.UNSIGNED_INT_5_9_9_9_REV&&(J=n.RGB9_E5),M===n.RGBA){const be=Q?Ao:Ke.getTransfer(Z);B===n.FLOAT&&(J=n.RGBA32F),B===n.HALF_FLOAT&&(J=n.RGBA16F),B===n.UNSIGNED_BYTE&&(J=be===rt?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT_4_4_4_4&&(J=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(J=n.RGB5_A1)}return(J===n.R16F||J===n.R32F||J===n.RG16F||J===n.RG32F||J===n.RGBA16F||J===n.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function x(T,M){let B;return T?M===null||M===ss||M===er?B=n.DEPTH24_STENCIL8:M===Ln?B=n.DEPTH32F_STENCIL8:M===Yr&&(B=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===ss||M===er?B=n.DEPTH_COMPONENT24:M===Ln?B=n.DEPTH_COMPONENT32F:M===Yr&&(B=n.DEPTH_COMPONENT16),B}function E(T,M){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==zt&&T.minFilter!==pn?Math.log2(Math.max(M.width,M.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?M.mipmaps.length:1}function R(T){const M=T.target;M.removeEventListener("dispose",R),D(M),M.isVideoTexture&&u.delete(M)}function A(T){const M=T.target;M.removeEventListener("dispose",A),b(M)}function D(T){const M=i.get(T);if(M.__webglInit===void 0)return;const B=T.source,Z=h.get(B);if(Z){const Q=Z[M.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&H(T),Object.keys(Z).length===0&&h.delete(B)}i.remove(T)}function H(T){const M=i.get(T);n.deleteTexture(M.__webglTexture);const B=T.source,Z=h.get(B);delete Z[M.__cacheKey],a.memory.textures--}function b(T){const M=i.get(T);if(T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(M.__webglFramebuffer[Z]))for(let Q=0;Q<M.__webglFramebuffer[Z].length;Q++)n.deleteFramebuffer(M.__webglFramebuffer[Z][Q]);else n.deleteFramebuffer(M.__webglFramebuffer[Z]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[Z])}else{if(Array.isArray(M.__webglFramebuffer))for(let Z=0;Z<M.__webglFramebuffer.length;Z++)n.deleteFramebuffer(M.__webglFramebuffer[Z]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Z=0;Z<M.__webglColorRenderbuffer.length;Z++)M.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[Z]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const B=T.textures;for(let Z=0,Q=B.length;Z<Q;Z++){const J=i.get(B[Z]);J.__webglTexture&&(n.deleteTexture(J.__webglTexture),a.memory.textures--),i.remove(B[Z])}i.remove(T)}let S=0;function C(){S=0}function k(){const T=S;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),S+=1,T}function O(T){const M=[];return M.push(T.wrapS),M.push(T.wrapT),M.push(T.wrapR||0),M.push(T.magFilter),M.push(T.minFilter),M.push(T.anisotropy),M.push(T.internalFormat),M.push(T.format),M.push(T.type),M.push(T.generateMipmaps),M.push(T.premultiplyAlpha),M.push(T.flipY),M.push(T.unpackAlignment),M.push(T.colorSpace),M.join()}function Y(T,M){const B=i.get(T);if(T.isVideoTexture&&ot(T),T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){const Z=T.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ye(B,T,M);return}}t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+M)}function W(T,M){const B=i.get(T);if(T.version>0&&B.__version!==T.version){Ye(B,T,M);return}t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+M)}function V(T,M){const B=i.get(T);if(T.version>0&&B.__version!==T.version){Ye(B,T,M);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+M)}function j(T,M){const B=i.get(T);if(T.version>0&&B.__version!==T.version){X(B,T,M);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+M)}const G={[$s]:n.REPEAT,[Ji]:n.CLAMP_TO_EDGE,[xl]:n.MIRRORED_REPEAT},re={[zt]:n.NEAREST,[ig]:n.NEAREST_MIPMAP_NEAREST,[Sa]:n.NEAREST_MIPMAP_LINEAR,[pn]:n.LINEAR,[gc]:n.LINEAR_MIPMAP_NEAREST,[Qi]:n.LINEAR_MIPMAP_LINEAR},de={[og]:n.NEVER,[fg]:n.ALWAYS,[cg]:n.LESS,[jf]:n.LEQUAL,[lg]:n.EQUAL,[hg]:n.GEQUAL,[ug]:n.GREATER,[dg]:n.NOTEQUAL};function xe(T,M){if(M.type===Ln&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===pn||M.magFilter===gc||M.magFilter===Sa||M.magFilter===Qi||M.minFilter===pn||M.minFilter===gc||M.minFilter===Sa||M.minFilter===Qi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,G[M.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,G[M.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,G[M.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,re[M.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,re[M.minFilter]),M.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,de[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===zt||M.minFilter!==Sa&&M.minFilter!==Qi||M.type===Ln&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function Fe(T,M){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,M.addEventListener("dispose",R));const Z=M.source;let Q=h.get(Z);Q===void 0&&(Q={},h.set(Z,Q));const J=O(M);if(J!==T.__cacheKey){Q[J]===void 0&&(Q[J]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Q[J].usedTimes++;const be=Q[T.__cacheKey];be!==void 0&&(Q[T.__cacheKey].usedTimes--,be.usedTimes===0&&H(M)),T.__cacheKey=J,T.__webglTexture=Q[J].texture}return B}function Ye(T,M,B){let Z=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Z=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Z=n.TEXTURE_3D);const Q=Fe(T,M),J=M.source;t.bindTexture(Z,T.__webglTexture,n.TEXTURE0+B);const be=i.get(J);if(J.version!==be.__version||Q===!0){t.activeTexture(n.TEXTURE0+B);const oe=Ke.getPrimaries(Ke.workingColorSpace),pe=M.colorSpace===Cn?null:Ke.getPrimaries(M.colorSpace),Ue=M.colorSpace===Cn||oe===pe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);let ee=_(M.image,!1,s.maxTextureSize);ee=Te(M,ee);const fe=r.convert(M.format,M.colorSpace),Ve=r.convert(M.type);let Re=v(M.internalFormat,fe,Ve,M.colorSpace,M.isVideoTexture);xe(Z,M);let me;const He=M.mipmaps,ze=M.isVideoTexture!==!0,ct=be.__version===void 0||Q===!0,L=J.dataReady,te=E(M,ee);if(M.isDepthTexture)Re=x(M.format===tr,M.type),ct&&(ze?t.texStorage2D(n.TEXTURE_2D,1,Re,ee.width,ee.height):t.texImage2D(n.TEXTURE_2D,0,Re,ee.width,ee.height,0,fe,Ve,null));else if(M.isDataTexture)if(He.length>0){ze&&ct&&t.texStorage2D(n.TEXTURE_2D,te,Re,He[0].width,He[0].height);for(let K=0,q=He.length;K<q;K++)me=He[K],ze?L&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,me.width,me.height,fe,Ve,me.data):t.texImage2D(n.TEXTURE_2D,K,Re,me.width,me.height,0,fe,Ve,me.data);M.generateMipmaps=!1}else ze?(ct&&t.texStorage2D(n.TEXTURE_2D,te,Re,ee.width,ee.height),L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ee.width,ee.height,fe,Ve,ee.data)):t.texImage2D(n.TEXTURE_2D,0,Re,ee.width,ee.height,0,fe,Ve,ee.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){ze&&ct&&t.texStorage3D(n.TEXTURE_2D_ARRAY,te,Re,He[0].width,He[0].height,ee.depth);for(let K=0,q=He.length;K<q;K++)if(me=He[K],M.format!==bn)if(fe!==null)if(ze){if(L)if(M.layerUpdates.size>0){const ie=lh(me.width,me.height,M.format,M.type);for(const we of M.layerUpdates){const Xe=me.data.subarray(we*ie/me.data.BYTES_PER_ELEMENT,(we+1)*ie/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,we,me.width,me.height,1,fe,Xe,0,0)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,me.width,me.height,ee.depth,fe,me.data,0,0)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,K,Re,me.width,me.height,ee.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ze?L&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,me.width,me.height,ee.depth,fe,Ve,me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,K,Re,me.width,me.height,ee.depth,0,fe,Ve,me.data)}else{ze&&ct&&t.texStorage2D(n.TEXTURE_2D,te,Re,He[0].width,He[0].height);for(let K=0,q=He.length;K<q;K++)me=He[K],M.format!==bn?fe!==null?ze?L&&t.compressedTexSubImage2D(n.TEXTURE_2D,K,0,0,me.width,me.height,fe,me.data):t.compressedTexImage2D(n.TEXTURE_2D,K,Re,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?L&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,me.width,me.height,fe,Ve,me.data):t.texImage2D(n.TEXTURE_2D,K,Re,me.width,me.height,0,fe,Ve,me.data)}else if(M.isDataArrayTexture)if(ze){if(ct&&t.texStorage3D(n.TEXTURE_2D_ARRAY,te,Re,ee.width,ee.height,ee.depth),L)if(M.layerUpdates.size>0){const K=lh(ee.width,ee.height,M.format,M.type);for(const q of M.layerUpdates){const ie=ee.data.subarray(q*K/ee.data.BYTES_PER_ELEMENT,(q+1)*K/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,q,ee.width,ee.height,1,fe,Ve,ie)}M.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,fe,Ve,ee.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Re,ee.width,ee.height,ee.depth,0,fe,Ve,ee.data);else if(M.isData3DTexture)ze?(ct&&t.texStorage3D(n.TEXTURE_3D,te,Re,ee.width,ee.height,ee.depth),L&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,fe,Ve,ee.data)):t.texImage3D(n.TEXTURE_3D,0,Re,ee.width,ee.height,ee.depth,0,fe,Ve,ee.data);else if(M.isFramebufferTexture){if(ct)if(ze)t.texStorage2D(n.TEXTURE_2D,te,Re,ee.width,ee.height);else{let K=ee.width,q=ee.height;for(let ie=0;ie<te;ie++)t.texImage2D(n.TEXTURE_2D,ie,Re,K,q,0,fe,Ve,null),K>>=1,q>>=1}}else if(He.length>0){if(ze&&ct){const K=Ce(He[0]);t.texStorage2D(n.TEXTURE_2D,te,Re,K.width,K.height)}for(let K=0,q=He.length;K<q;K++)me=He[K],ze?L&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,fe,Ve,me):t.texImage2D(n.TEXTURE_2D,K,Re,fe,Ve,me);M.generateMipmaps=!1}else if(ze){if(ct){const K=Ce(ee);t.texStorage2D(n.TEXTURE_2D,te,Re,K.width,K.height)}L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe,Ve,ee)}else t.texImage2D(n.TEXTURE_2D,0,Re,fe,Ve,ee);m(M)&&p(Z),be.__version=J.version,M.onUpdate&&M.onUpdate(M)}T.__version=M.version}function X(T,M,B){if(M.image.length!==6)return;const Z=Fe(T,M),Q=M.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+B);const J=i.get(Q);if(Q.version!==J.__version||Z===!0){t.activeTexture(n.TEXTURE0+B);const be=Ke.getPrimaries(Ke.workingColorSpace),oe=M.colorSpace===Cn?null:Ke.getPrimaries(M.colorSpace),pe=M.colorSpace===Cn||be===oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const Ue=M.isCompressedTexture||M.image[0].isCompressedTexture,ee=M.image[0]&&M.image[0].isDataTexture,fe=[];for(let q=0;q<6;q++)!Ue&&!ee?fe[q]=_(M.image[q],!0,s.maxCubemapSize):fe[q]=ee?M.image[q].image:M.image[q],fe[q]=Te(M,fe[q]);const Ve=fe[0],Re=r.convert(M.format,M.colorSpace),me=r.convert(M.type),He=v(M.internalFormat,Re,me,M.colorSpace),ze=M.isVideoTexture!==!0,ct=J.__version===void 0||Z===!0,L=Q.dataReady;let te=E(M,Ve);xe(n.TEXTURE_CUBE_MAP,M);let K;if(Ue){ze&&ct&&t.texStorage2D(n.TEXTURE_CUBE_MAP,te,He,Ve.width,Ve.height);for(let q=0;q<6;q++){K=fe[q].mipmaps;for(let ie=0;ie<K.length;ie++){const we=K[ie];M.format!==bn?Re!==null?ze?L&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ie,0,0,we.width,we.height,Re,we.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ie,He,we.width,we.height,0,we.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ze?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ie,0,0,we.width,we.height,Re,me,we.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ie,He,we.width,we.height,0,Re,me,we.data)}}}else{if(K=M.mipmaps,ze&&ct){K.length>0&&te++;const q=Ce(fe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,te,He,q.width,q.height)}for(let q=0;q<6;q++)if(ee){ze?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,fe[q].width,fe[q].height,Re,me,fe[q].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,He,fe[q].width,fe[q].height,0,Re,me,fe[q].data);for(let ie=0;ie<K.length;ie++){const Xe=K[ie].image[q].image;ze?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ie+1,0,0,Xe.width,Xe.height,Re,me,Xe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ie+1,He,Xe.width,Xe.height,0,Re,me,Xe.data)}}else{ze?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,Re,me,fe[q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,He,Re,me,fe[q]);for(let ie=0;ie<K.length;ie++){const we=K[ie];ze?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ie+1,0,0,Re,me,we.image[q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ie+1,He,Re,me,we.image[q])}}}m(M)&&p(n.TEXTURE_CUBE_MAP),J.__version=Q.version,M.onUpdate&&M.onUpdate(M)}T.__version=M.version}function $(T,M,B,Z,Q,J){const be=r.convert(B.format,B.colorSpace),oe=r.convert(B.type),pe=v(B.internalFormat,be,oe,B.colorSpace);if(!i.get(M).__hasExternalTextures){const ee=Math.max(1,M.width>>J),fe=Math.max(1,M.height>>J);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?t.texImage3D(Q,J,pe,ee,fe,M.depth,0,be,oe,null):t.texImage2D(Q,J,pe,ee,fe,0,be,oe,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),Me(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,Q,i.get(B).__webglTexture,0,ke(M)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Z,Q,i.get(B).__webglTexture,J),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ge(T,M,B){if(n.bindRenderbuffer(n.RENDERBUFFER,T),M.depthBuffer){const Z=M.depthTexture,Q=Z&&Z.isDepthTexture?Z.type:null,J=x(M.stencilBuffer,Q),be=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=ke(M);Me(M)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,oe,J,M.width,M.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,J,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,J,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,be,n.RENDERBUFFER,T)}else{const Z=M.textures;for(let Q=0;Q<Z.length;Q++){const J=Z[Q],be=r.convert(J.format,J.colorSpace),oe=r.convert(J.type),pe=v(J.internalFormat,be,oe,J.colorSpace),Ue=ke(M);B&&Me(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ue,pe,M.width,M.height):Me(M)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ue,pe,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,pe,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function he(T,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Y(M.depthTexture,0);const Z=i.get(M.depthTexture).__webglTexture,Q=ke(M);if(M.depthTexture.format===Ws)Me(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0);else if(M.depthTexture.format===tr)Me(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Ee(T){const M=i.get(T),B=T.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==T.depthTexture){const Z=T.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Z){const Q=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Z.removeEventListener("dispose",Q)};Z.addEventListener("dispose",Q),M.__depthDisposeCallback=Q}M.__boundDepthTexture=Z}if(T.depthTexture&&!M.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");he(M.__webglFramebuffer,T)}else if(B){M.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[Z]),M.__webglDepthbuffer[Z]===void 0)M.__webglDepthbuffer[Z]=n.createRenderbuffer(),ge(M.__webglDepthbuffer[Z],T,!1);else{const Q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=M.__webglDepthbuffer[Z];n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,J)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),ge(M.__webglDepthbuffer,T,!1);else{const Z=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Q),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,Q)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ae(T,M,B){const Z=i.get(T);M!==void 0&&$(Z.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&Ee(T)}function Ie(T){const M=T.texture,B=i.get(T),Z=i.get(M);T.addEventListener("dispose",A);const Q=T.textures,J=T.isWebGLCubeRenderTarget===!0,be=Q.length>1;if(be||(Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture()),Z.__version=M.version,a.memory.textures++),J){B.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer[oe]=[];for(let pe=0;pe<M.mipmaps.length;pe++)B.__webglFramebuffer[oe][pe]=n.createFramebuffer()}else B.__webglFramebuffer[oe]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer=[];for(let oe=0;oe<M.mipmaps.length;oe++)B.__webglFramebuffer[oe]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(be)for(let oe=0,pe=Q.length;oe<pe;oe++){const Ue=i.get(Q[oe]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&Me(T)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let oe=0;oe<Q.length;oe++){const pe=Q[oe];B.__webglColorRenderbuffer[oe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[oe]);const Ue=r.convert(pe.format,pe.colorSpace),ee=r.convert(pe.type),fe=v(pe.internalFormat,Ue,ee,pe.colorSpace,T.isXRRenderTarget===!0),Ve=ke(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ve,fe,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,B.__webglColorRenderbuffer[oe])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),ge(B.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(J){t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),xe(n.TEXTURE_CUBE_MAP,M);for(let oe=0;oe<6;oe++)if(M.mipmaps&&M.mipmaps.length>0)for(let pe=0;pe<M.mipmaps.length;pe++)$(B.__webglFramebuffer[oe][pe],T,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,pe);else $(B.__webglFramebuffer[oe],T,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);m(M)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let oe=0,pe=Q.length;oe<pe;oe++){const Ue=Q[oe],ee=i.get(Ue);t.bindTexture(n.TEXTURE_2D,ee.__webglTexture),xe(n.TEXTURE_2D,Ue),$(B.__webglFramebuffer,T,Ue,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,0),m(Ue)&&p(n.TEXTURE_2D)}t.unbindTexture()}else{let oe=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(oe=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(oe,Z.__webglTexture),xe(oe,M),M.mipmaps&&M.mipmaps.length>0)for(let pe=0;pe<M.mipmaps.length;pe++)$(B.__webglFramebuffer[pe],T,M,n.COLOR_ATTACHMENT0,oe,pe);else $(B.__webglFramebuffer,T,M,n.COLOR_ATTACHMENT0,oe,0);m(M)&&p(oe),t.unbindTexture()}T.depthBuffer&&Ee(T)}function st(T){const M=T.textures;for(let B=0,Z=M.length;B<Z;B++){const Q=M[B];if(m(Q)){const J=T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,be=i.get(Q).__webglTexture;t.bindTexture(J,be),p(J),t.unbindTexture()}}}const P=[],je=[];function We(T){if(T.samples>0){if(Me(T)===!1){const M=T.textures,B=T.width,Z=T.height;let Q=n.COLOR_BUFFER_BIT;const J=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,be=i.get(T),oe=M.length>1;if(oe)for(let pe=0;pe<M.length;pe++)t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let pe=0;pe<M.length;pe++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),oe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,be.__webglColorRenderbuffer[pe]);const Ue=i.get(M[pe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ue,0)}n.blitFramebuffer(0,0,B,Z,0,0,B,Z,Q,n.NEAREST),c===!0&&(P.length=0,je.length=0,P.push(n.COLOR_ATTACHMENT0+pe),T.depthBuffer&&T.resolveDepthBuffer===!1&&(P.push(J),je.push(J),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,je)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,P))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),oe)for(let pe=0;pe<M.length;pe++){t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,be.__webglColorRenderbuffer[pe]);const Ue=i.get(M[pe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,Ue,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const M=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function ke(T){return Math.min(s.maxSamples,T.samples)}function Me(T){const M=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function ot(T){const M=a.render.frame;u.get(T)!==M&&(u.set(T,M),T.update())}function Te(T,M){const B=T.colorSpace,Z=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==Hi&&B!==Cn&&(Ke.getTransfer(B)===rt?(Z!==bn||Q!==ai)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),M}function Ce(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=C,this.setTexture2D=Y,this.setTexture2DArray=W,this.setTexture3D=V,this.setTextureCube=j,this.rebindTextures=Ae,this.setupRenderTarget=Ie,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=We,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=$,this.useMultisampledRTT=Me}function Cx(n,e){function t(i,s=Cn){let r;const a=Ke.getTransfer(s);if(i===ai)return n.UNSIGNED_BYTE;if(i===vu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===xu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===zf)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Of)return n.BYTE;if(i===Ff)return n.SHORT;if(i===Yr)return n.UNSIGNED_SHORT;if(i===_u)return n.INT;if(i===ss)return n.UNSIGNED_INT;if(i===Ln)return n.FLOAT;if(i===mn)return n.HALF_FLOAT;if(i===Bf)return n.ALPHA;if(i===kf)return n.RGB;if(i===bn)return n.RGBA;if(i===Gf)return n.LUMINANCE;if(i===Vf)return n.LUMINANCE_ALPHA;if(i===Ws)return n.DEPTH_COMPONENT;if(i===tr)return n.DEPTH_STENCIL;if(i===Mu)return n.RED;if(i===Su)return n.RED_INTEGER;if(i===Wf)return n.RG;if(i===yu)return n.RG_INTEGER;if(i===Eu)return n.RGBA_INTEGER;if(i===ho||i===fo||i===po||i===mo)if(a===rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ho)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===po)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ho)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===fo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===po)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===mo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ml||i===Sl||i===yl||i===El)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ml)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Sl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===yl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===El)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===bl||i===Al||i===Tl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===bl||i===Al)return a===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Tl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===wl||i===Dl||i===Pl||i===Cl||i===Rl||i===Ll||i===Il||i===Hl||i===Ul||i===Nl||i===Ol||i===Fl||i===zl||i===Bl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===wl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Dl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Pl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Cl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Rl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ll)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Il)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Hl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ul)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Nl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ol)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Fl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===zl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Bl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===go||i===kl||i===Gl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===go)return a===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===kl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Gl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Xf||i===Vl||i===Wl||i===Xl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===go)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Vl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Wl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Xl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===er?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class Rx extends rn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class yi extends It{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Lx={type:"move"};class kc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&h>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Lx)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new yi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Ix=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Hx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Ux{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const s=new St,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new lt({vertexShader:Ix,fragmentShader:Hx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pt(new la(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Nx extends hs{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,d=null,h=null,f=null,g=null;const _=new Ux,m=t.getContextAttributes();let p=null,v=null;const x=[],E=[],R=new ae;let A=null;const D=new rn;D.layers.enable(1),D.viewport=new tt;const H=new rn;H.layers.enable(2),H.viewport=new tt;const b=[D,H],S=new Rx;S.layers.enable(1),S.layers.enable(2);let C=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let $=x[X];return $===void 0&&($=new kc,x[X]=$),$.getTargetRaySpace()},this.getControllerGrip=function(X){let $=x[X];return $===void 0&&($=new kc,x[X]=$),$.getGripSpace()},this.getHand=function(X){let $=x[X];return $===void 0&&($=new kc,x[X]=$),$.getHandSpace()};function O(X){const $=E.indexOf(X.inputSource);if($===-1)return;const ge=x[$];ge!==void 0&&(ge.update(X.inputSource,X.frame,l||a),ge.dispatchEvent({type:X.type,data:X.inputSource}))}function Y(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",W);for(let X=0;X<x.length;X++){const $=E[X];$!==null&&(E[X]=null,x[X].disconnect($))}C=null,k=null,_.reset(),e.setRenderTarget(p),f=null,h=null,d=null,s=null,v=null,Ye.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",W),m.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(R),s.renderState.layers===void 0){const $={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,$),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Jt(f.framebufferWidth,f.framebufferHeight,{format:bn,type:ai,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let $=null,ge=null,he=null;m.depth&&(he=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,$=m.stencil?tr:Ws,ge=m.stencil?er:ss);const Ee={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:r};d=new XRWebGLBinding(s,t),h=d.createProjectionLayer(Ee),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),v=new Jt(h.textureWidth,h.textureHeight,{format:bn,type:ai,depthTexture:new rp(h.textureWidth,h.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Ye.setContext(s),Ye.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function W(X){for(let $=0;$<X.removed.length;$++){const ge=X.removed[$],he=E.indexOf(ge);he>=0&&(E[he]=null,x[he].disconnect(ge))}for(let $=0;$<X.added.length;$++){const ge=X.added[$];let he=E.indexOf(ge);if(he===-1){for(let Ae=0;Ae<x.length;Ae++)if(Ae>=E.length){E.push(ge),he=Ae;break}else if(E[Ae]===null){E[Ae]=ge,he=Ae;break}if(he===-1)break}const Ee=x[he];Ee&&Ee.connect(ge)}}const V=new w,j=new w;function G(X,$,ge){V.setFromMatrixPosition($.matrixWorld),j.setFromMatrixPosition(ge.matrixWorld);const he=V.distanceTo(j),Ee=$.projectionMatrix.elements,Ae=ge.projectionMatrix.elements,Ie=Ee[14]/(Ee[10]-1),st=Ee[14]/(Ee[10]+1),P=(Ee[9]+1)/Ee[5],je=(Ee[9]-1)/Ee[5],We=(Ee[8]-1)/Ee[0],ke=(Ae[8]+1)/Ae[0],Me=Ie*We,ot=Ie*ke,Te=he/(-We+ke),Ce=Te*-We;if($.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ce),X.translateZ(Te),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Ee[10]===-1)X.projectionMatrix.copy($.projectionMatrix),X.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const T=Ie+Te,M=st+Te,B=Me-Ce,Z=ot+(he-Ce),Q=P*st/M*T,J=je*st/M*T;X.projectionMatrix.makePerspective(B,Z,Q,J,T,M),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function re(X,$){$===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices($.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let $=X.near,ge=X.far;_.texture!==null&&(_.depthNear>0&&($=_.depthNear),_.depthFar>0&&(ge=_.depthFar)),S.near=H.near=D.near=$,S.far=H.far=D.far=ge,(C!==S.near||k!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),C=S.near,k=S.far);const he=X.parent,Ee=S.cameras;re(S,he);for(let Ae=0;Ae<Ee.length;Ae++)re(Ee[Ae],he);Ee.length===2?G(S,D,H):S.projectionMatrix.copy(D.projectionMatrix),de(X,S,he)};function de(X,$,ge){ge===null?X.matrix.copy($.matrixWorld):(X.matrix.copy(ge.matrixWorld),X.matrix.invert(),X.matrix.multiply($.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy($.projectionMatrix),X.projectionMatrixInverse.copy($.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=jr*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&f===null))return c},this.setFoveation=function(X){c=X,h!==null&&(h.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(S)};let xe=null;function Fe(X,$){if(u=$.getViewerPose(l||a),g=$,u!==null){const ge=u.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let he=!1;ge.length!==S.cameras.length&&(S.cameras.length=0,he=!0);for(let Ae=0;Ae<ge.length;Ae++){const Ie=ge[Ae];let st=null;if(f!==null)st=f.getViewport(Ie);else{const je=d.getViewSubImage(h,Ie);st=je.viewport,Ae===0&&(e.setRenderTargetTextures(v,je.colorTexture,h.ignoreDepthValues?void 0:je.depthStencilTexture),e.setRenderTarget(v))}let P=b[Ae];P===void 0&&(P=new rn,P.layers.enable(Ae),P.viewport=new tt,b[Ae]=P),P.matrix.fromArray(Ie.transform.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale),P.projectionMatrix.fromArray(Ie.projectionMatrix),P.projectionMatrixInverse.copy(P.projectionMatrix).invert(),P.viewport.set(st.x,st.y,st.width,st.height),Ae===0&&(S.matrix.copy(P.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),he===!0&&S.cameras.push(P)}const Ee=s.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")){const Ae=d.getDepthInformation(ge[0]);Ae&&Ae.isValid&&Ae.texture&&_.init(e,Ae,s.renderState)}}for(let ge=0;ge<x.length;ge++){const he=E[ge],Ee=x[ge];he!==null&&Ee!==void 0&&Ee.update(he,$,l||a)}xe&&xe(X,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),g=null}const Ye=new ip;Ye.setAnimationLoop(Fe),this.setAnimationLoop=function(X){xe=X},this.dispose=function(){}}}const Vi=new Tn,Ox=new Ze;function Fx(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,ep(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,v,x,E){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,E)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,v,x):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Bt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Bt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=e.get(p),x=v.envMap,E=v.envMapRotation;x&&(m.envMap.value=x,Vi.copy(E),Vi.x*=-1,Vi.y*=-1,Vi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Vi.y*=-1,Vi.z*=-1),m.envMapRotation.value.setFromMatrix4(Ox.makeRotationFromEuler(Vi)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Bt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function zx(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,x){const E=x.program;i.uniformBlockBinding(v,E)}function l(v,x){let E=s[v.id];E===void 0&&(g(v),E=u(v),s[v.id]=E,v.addEventListener("dispose",m));const R=x.program;i.updateUBOMapping(v,R);const A=e.render.frame;r[v.id]!==A&&(h(v),r[v.id]=A)}function u(v){const x=d();v.__bindingPointIndex=x;const E=n.createBuffer(),R=v.__size,A=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,R,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,E),E}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const x=s[v.id],E=v.uniforms,R=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let A=0,D=E.length;A<D;A++){const H=Array.isArray(E[A])?E[A]:[E[A]];for(let b=0,S=H.length;b<S;b++){const C=H[b];if(f(C,A,b,R)===!0){const k=C.__offset,O=Array.isArray(C.value)?C.value:[C.value];let Y=0;for(let W=0;W<O.length;W++){const V=O[W],j=_(V);typeof V=="number"||typeof V=="boolean"?(C.__data[0]=V,n.bufferSubData(n.UNIFORM_BUFFER,k+Y,C.__data)):V.isMatrix3?(C.__data[0]=V.elements[0],C.__data[1]=V.elements[1],C.__data[2]=V.elements[2],C.__data[3]=0,C.__data[4]=V.elements[3],C.__data[5]=V.elements[4],C.__data[6]=V.elements[5],C.__data[7]=0,C.__data[8]=V.elements[6],C.__data[9]=V.elements[7],C.__data[10]=V.elements[8],C.__data[11]=0):(V.toArray(C.__data,Y),Y+=j.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(v,x,E,R){const A=v.value,D=x+"_"+E;if(R[D]===void 0)return typeof A=="number"||typeof A=="boolean"?R[D]=A:R[D]=A.clone(),!0;{const H=R[D];if(typeof A=="number"||typeof A=="boolean"){if(H!==A)return R[D]=A,!0}else if(H.equals(A)===!1)return H.copy(A),!0}return!1}function g(v){const x=v.uniforms;let E=0;const R=16;for(let D=0,H=x.length;D<H;D++){const b=Array.isArray(x[D])?x[D]:[x[D]];for(let S=0,C=b.length;S<C;S++){const k=b[S],O=Array.isArray(k.value)?k.value:[k.value];for(let Y=0,W=O.length;Y<W;Y++){const V=O[Y],j=_(V),G=E%R,re=G%j.boundary,de=G+re;E+=re,de!==0&&R-de<j.storage&&(E+=R-de),k.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=E,E+=j.storage}}}const A=E%R;return A>0&&(E+=R-A),v.__size=E,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function m(v){const x=v.target;x.removeEventListener("dispose",m);const E=a.indexOf(x.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(const v in s)n.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}class Bx{constructor(e={}){const{canvas:t=Rg(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=a;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Mt,this.toneMapping=Ai,this.toneMappingExposure=1;const x=this;let E=!1,R=0,A=0,D=null,H=-1,b=null;const S=new tt,C=new tt;let k=null;const O=new Le(0);let Y=0,W=t.width,V=t.height,j=1,G=null,re=null;const de=new tt(0,0,W,V),xe=new tt(0,0,W,V);let Fe=!1;const Ye=new wu;let X=!1,$=!1;const ge=new Ze,he=new w,Ee=new tt,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ie=!1;function st(){return D===null?j:1}let P=i;function je(y,I){return t.getContext(y,I)}try{const y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${mu}`),t.addEventListener("webglcontextlost",K,!1),t.addEventListener("webglcontextrestored",q,!1),t.addEventListener("webglcontextcreationerror",ie,!1),P===null){const I="webgl2";if(P=je(I,y),P===null)throw je(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let We,ke,Me,ot,Te,Ce,T,M,B,Z,Q,J,be,oe,pe,Ue,ee,fe,Ve,Re,me,He,ze,ct;function L(){We=new Y_(P),We.init(),He=new Cx(P,We),ke=new B_(P,We,e,He),Me=new wx(P),ot=new q_(P),Te=new fx,Ce=new Px(P,We,Me,Te,ke,He,ot),T=new G_(x),M=new X_(x),B=new n0(P),ze=new F_(P,B),Z=new j_(P,B,ot,ze),Q=new J_(P,Z,B,ot),Ve=new Z_(P,ke,Ce),Ue=new k_(Te),J=new hx(x,T,M,We,ke,ze,Ue),be=new Fx(x,Te),oe=new mx,pe=new Sx(We),fe=new O_(x,T,M,Me,Q,h,c),ee=new Tx(x,Q,ke),ct=new zx(P,ot,ke,Me),Re=new z_(P,We,ot),me=new K_(P,We,ot),ot.programs=J.programs,x.capabilities=ke,x.extensions=We,x.properties=Te,x.renderLists=oe,x.shadowMap=ee,x.state=Me,x.info=ot}L();const te=new Nx(x,P);this.xr=te,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const y=We.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=We.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(y){y!==void 0&&(j=y,this.setSize(W,V,!1))},this.getSize=function(y){return y.set(W,V)},this.setSize=function(y,I,F=!0){if(te.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=y,V=I,t.width=Math.floor(y*j),t.height=Math.floor(I*j),F===!0&&(t.style.width=y+"px",t.style.height=I+"px"),this.setViewport(0,0,y,I)},this.getDrawingBufferSize=function(y){return y.set(W*j,V*j).floor()},this.setDrawingBufferSize=function(y,I,F){W=y,V=I,j=F,t.width=Math.floor(y*F),t.height=Math.floor(I*F),this.setViewport(0,0,y,I)},this.getCurrentViewport=function(y){return y.copy(S)},this.getViewport=function(y){return y.copy(de)},this.setViewport=function(y,I,F,z){y.isVector4?de.set(y.x,y.y,y.z,y.w):de.set(y,I,F,z),Me.viewport(S.copy(de).multiplyScalar(j).round())},this.getScissor=function(y){return y.copy(xe)},this.setScissor=function(y,I,F,z){y.isVector4?xe.set(y.x,y.y,y.z,y.w):xe.set(y,I,F,z),Me.scissor(C.copy(xe).multiplyScalar(j).round())},this.getScissorTest=function(){return Fe},this.setScissorTest=function(y){Me.setScissorTest(Fe=y)},this.setOpaqueSort=function(y){G=y},this.setTransparentSort=function(y){re=y},this.getClearColor=function(y){return y.copy(fe.getClearColor())},this.setClearColor=function(){fe.setClearColor.apply(fe,arguments)},this.getClearAlpha=function(){return fe.getClearAlpha()},this.setClearAlpha=function(){fe.setClearAlpha.apply(fe,arguments)},this.clear=function(y=!0,I=!0,F=!0){let z=0;if(y){let U=!1;if(D!==null){const ne=D.texture.format;U=ne===Eu||ne===yu||ne===Su}if(U){const ne=D.texture.type,ue=ne===ai||ne===ss||ne===Yr||ne===er||ne===vu||ne===xu,_e=fe.getClearColor(),ve=fe.getClearAlpha(),De=_e.r,Pe=_e.g,Se=_e.b;ue?(f[0]=De,f[1]=Pe,f[2]=Se,f[3]=ve,P.clearBufferuiv(P.COLOR,0,f)):(g[0]=De,g[1]=Pe,g[2]=Se,g[3]=ve,P.clearBufferiv(P.COLOR,0,g))}else z|=P.COLOR_BUFFER_BIT}I&&(z|=P.DEPTH_BUFFER_BIT),F&&(z|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",K,!1),t.removeEventListener("webglcontextrestored",q,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),oe.dispose(),pe.dispose(),Te.dispose(),T.dispose(),M.dispose(),Q.dispose(),ze.dispose(),ct.dispose(),J.dispose(),te.dispose(),te.removeEventListener("sessionstart",wn),te.removeEventListener("sessionend",cd),Oi.stop()};function K(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function q(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const y=ot.autoReset,I=ee.enabled,F=ee.autoUpdate,z=ee.needsUpdate,U=ee.type;L(),ot.autoReset=y,ee.enabled=I,ee.autoUpdate=F,ee.needsUpdate=z,ee.type=U}function ie(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function we(y){const I=y.target;I.removeEventListener("dispose",we),Xe(I)}function Xe(y){mt(y),Te.remove(y)}function mt(y){const I=Te.get(y).programs;I!==void 0&&(I.forEach(function(F){J.releaseProgram(F)}),y.isShaderMaterial&&J.releaseShaderCache(y))}this.renderBufferDirect=function(y,I,F,z,U,ne){I===null&&(I=Ae);const ue=U.isMesh&&U.matrixWorld.determinant()<0,_e=Em(y,I,F,z,U);Me.setMaterial(z,ue);let ve=F.index,De=1;if(z.wireframe===!0){if(ve=Z.getWireframeAttribute(F),ve===void 0)return;De=2}const Pe=F.drawRange,Se=F.attributes.position;let Qe=Pe.start*De,dt=(Pe.start+Pe.count)*De;ne!==null&&(Qe=Math.max(Qe,ne.start*De),dt=Math.min(dt,(ne.start+ne.count)*De)),ve!==null?(Qe=Math.max(Qe,0),dt=Math.min(dt,ve.count)):Se!=null&&(Qe=Math.max(Qe,0),dt=Math.min(dt,Se.count));const ht=dt-Qe;if(ht<0||ht===1/0)return;ze.setup(U,z,_e,F,ve);let $t,$e=Re;if(ve!==null&&($t=B.get(ve),$e=me,$e.setIndex($t)),U.isMesh)z.wireframe===!0?(Me.setLineWidth(z.wireframeLinewidth*st()),$e.setMode(P.LINES)):$e.setMode(P.TRIANGLES);else if(U.isLine){let ye=z.linewidth;ye===void 0&&(ye=1),Me.setLineWidth(ye*st()),U.isLineSegments?$e.setMode(P.LINES):U.isLineLoop?$e.setMode(P.LINE_LOOP):$e.setMode(P.LINE_STRIP)}else U.isPoints?$e.setMode(P.POINTS):U.isSprite&&$e.setMode(P.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)$e.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(We.get("WEBGL_multi_draw"))$e.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const ye=U._multiDrawStarts,Dt=U._multiDrawCounts,et=U._multiDrawCount,_n=ve?B.get(ve).bytesPerElement:1,ps=Te.get(z).currentProgram.getUniforms();for(let en=0;en<et;en++)ps.setValue(P,"_gl_DrawID",en),$e.render(ye[en]/_n,Dt[en])}else if(U.isInstancedMesh)$e.renderInstances(Qe,ht,U.count);else if(F.isInstancedBufferGeometry){const ye=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,Dt=Math.min(F.instanceCount,ye);$e.renderInstances(Qe,ht,Dt)}else $e.render(Qe,ht)};function wt(y,I,F){y.transparent===!0&&y.side===fn&&y.forceSinglePass===!1?(y.side=Bt,y.needsUpdate=!0,Ma(y,I,F),y.side=ri,y.needsUpdate=!0,Ma(y,I,F),y.side=fn):Ma(y,I,F)}this.compile=function(y,I,F=null){F===null&&(F=y),m=pe.get(F),m.init(I),v.push(m),F.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(m.pushLight(U),U.castShadow&&m.pushShadow(U))}),y!==F&&y.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(m.pushLight(U),U.castShadow&&m.pushShadow(U))}),m.setupLights();const z=new Set;return y.traverse(function(U){const ne=U.material;if(ne)if(Array.isArray(ne))for(let ue=0;ue<ne.length;ue++){const _e=ne[ue];wt(_e,F,U),z.add(_e)}else wt(ne,F,U),z.add(ne)}),v.pop(),m=null,z},this.compileAsync=function(y,I,F=null){const z=this.compile(y,I,F);return new Promise(U=>{function ne(){if(z.forEach(function(ue){Te.get(ue).currentProgram.isReady()&&z.delete(ue)}),z.size===0){U(y);return}setTimeout(ne,10)}We.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let Je=null;function zn(y){Je&&Je(y)}function wn(){Oi.stop()}function cd(){Oi.start()}const Oi=new ip;Oi.setAnimationLoop(zn),typeof self<"u"&&Oi.setContext(self),this.setAnimationLoop=function(y){Je=y,te.setAnimationLoop(y),y===null?Oi.stop():Oi.start()},te.addEventListener("sessionstart",wn),te.addEventListener("sessionend",cd),this.render=function(y,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(te.cameraAutoUpdate===!0&&te.updateCamera(I),I=te.getCamera()),y.isScene===!0&&y.onBeforeRender(x,y,I,D),m=pe.get(y,v.length),m.init(I),v.push(m),ge.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),Ye.setFromProjectionMatrix(ge),$=this.localClippingEnabled,X=Ue.init(this.clippingPlanes,$),_=oe.get(y,p.length),_.init(),p.push(_),te.enabled===!0&&te.isPresenting===!0){const ne=x.xr.getDepthSensingMesh();ne!==null&&hc(ne,I,-1/0,x.sortObjects)}hc(y,I,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(G,re),Ie=te.enabled===!1||te.isPresenting===!1||te.hasDepthSensing()===!1,Ie&&fe.addToRenderList(_,y),this.info.render.frame++,X===!0&&Ue.beginShadows();const F=m.state.shadowsArray;ee.render(F,y,I),X===!0&&Ue.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=_.opaque,U=_.transmissive;if(m.setupLights(),I.isArrayCamera){const ne=I.cameras;if(U.length>0)for(let ue=0,_e=ne.length;ue<_e;ue++){const ve=ne[ue];ud(z,U,y,ve)}Ie&&fe.render(y);for(let ue=0,_e=ne.length;ue<_e;ue++){const ve=ne[ue];ld(_,y,ve,ve.viewport)}}else U.length>0&&ud(z,U,y,I),Ie&&fe.render(y),ld(_,y,I);D!==null&&(Ce.updateMultisampleRenderTarget(D),Ce.updateRenderTargetMipmap(D)),y.isScene===!0&&y.onAfterRender(x,y,I),ze.resetDefaultState(),H=-1,b=null,v.pop(),v.length>0?(m=v[v.length-1],X===!0&&Ue.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function hc(y,I,F,z){if(y.visible===!1)return;if(y.layers.test(I.layers)){if(y.isGroup)F=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(I);else if(y.isLight)m.pushLight(y),y.castShadow&&m.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||Ye.intersectsSprite(y)){z&&Ee.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ge);const ue=Q.update(y),_e=y.material;_e.visible&&_.push(y,ue,_e,F,Ee.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||Ye.intersectsObject(y))){const ue=Q.update(y),_e=y.material;if(z&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Ee.copy(y.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),Ee.copy(ue.boundingSphere.center)),Ee.applyMatrix4(y.matrixWorld).applyMatrix4(ge)),Array.isArray(_e)){const ve=ue.groups;for(let De=0,Pe=ve.length;De<Pe;De++){const Se=ve[De],Qe=_e[Se.materialIndex];Qe&&Qe.visible&&_.push(y,ue,Qe,F,Ee.z,Se)}}else _e.visible&&_.push(y,ue,_e,F,Ee.z,null)}}const ne=y.children;for(let ue=0,_e=ne.length;ue<_e;ue++)hc(ne[ue],I,F,z)}function ld(y,I,F,z){const U=y.opaque,ne=y.transmissive,ue=y.transparent;m.setupLightsView(F),X===!0&&Ue.setGlobalState(x.clippingPlanes,F),z&&Me.viewport(S.copy(z)),U.length>0&&xa(U,I,F),ne.length>0&&xa(ne,I,F),ue.length>0&&xa(ue,I,F),Me.buffers.depth.setTest(!0),Me.buffers.depth.setMask(!0),Me.buffers.color.setMask(!0),Me.setPolygonOffset(!1)}function ud(y,I,F,z){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[z.id]===void 0&&(m.state.transmissionRenderTarget[z.id]=new Jt(1,1,{generateMipmaps:!0,type:We.has("EXT_color_buffer_half_float")||We.has("EXT_color_buffer_float")?mn:ai,minFilter:Qi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace}));const ne=m.state.transmissionRenderTarget[z.id],ue=z.viewport||S;ne.setSize(ue.z,ue.w);const _e=x.getRenderTarget();x.setRenderTarget(ne),x.getClearColor(O),Y=x.getClearAlpha(),Y<1&&x.setClearColor(16777215,.5),x.clear(),Ie&&fe.render(F);const ve=x.toneMapping;x.toneMapping=Ai;const De=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),m.setupLightsView(z),X===!0&&Ue.setGlobalState(x.clippingPlanes,z),xa(y,F,z),Ce.updateMultisampleRenderTarget(ne),Ce.updateRenderTargetMipmap(ne),We.has("WEBGL_multisampled_render_to_texture")===!1){let Pe=!1;for(let Se=0,Qe=I.length;Se<Qe;Se++){const dt=I[Se],ht=dt.object,$t=dt.geometry,$e=dt.material,ye=dt.group;if($e.side===fn&&ht.layers.test(z.layers)){const Dt=$e.side;$e.side=Bt,$e.needsUpdate=!0,dd(ht,F,z,$t,$e,ye),$e.side=Dt,$e.needsUpdate=!0,Pe=!0}}Pe===!0&&(Ce.updateMultisampleRenderTarget(ne),Ce.updateRenderTargetMipmap(ne))}x.setRenderTarget(_e),x.setClearColor(O,Y),De!==void 0&&(z.viewport=De),x.toneMapping=ve}function xa(y,I,F){const z=I.isScene===!0?I.overrideMaterial:null;for(let U=0,ne=y.length;U<ne;U++){const ue=y[U],_e=ue.object,ve=ue.geometry,De=z===null?ue.material:z,Pe=ue.group;_e.layers.test(F.layers)&&dd(_e,I,F,ve,De,Pe)}}function dd(y,I,F,z,U,ne){y.onBeforeRender(x,I,F,z,U,ne),y.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),U.onBeforeRender(x,I,F,z,y,ne),U.transparent===!0&&U.side===fn&&U.forceSinglePass===!1?(U.side=Bt,U.needsUpdate=!0,x.renderBufferDirect(F,I,z,U,y,ne),U.side=ri,U.needsUpdate=!0,x.renderBufferDirect(F,I,z,U,y,ne),U.side=fn):x.renderBufferDirect(F,I,z,U,y,ne),y.onAfterRender(x,I,F,z,U,ne)}function Ma(y,I,F){I.isScene!==!0&&(I=Ae);const z=Te.get(y),U=m.state.lights,ne=m.state.shadowsArray,ue=U.state.version,_e=J.getParameters(y,U.state,ne,I,F),ve=J.getProgramCacheKey(_e);let De=z.programs;z.environment=y.isMeshStandardMaterial?I.environment:null,z.fog=I.fog,z.envMap=(y.isMeshStandardMaterial?M:T).get(y.envMap||z.environment),z.envMapRotation=z.environment!==null&&y.envMap===null?I.environmentRotation:y.envMapRotation,De===void 0&&(y.addEventListener("dispose",we),De=new Map,z.programs=De);let Pe=De.get(ve);if(Pe!==void 0){if(z.currentProgram===Pe&&z.lightsStateVersion===ue)return fd(y,_e),Pe}else _e.uniforms=J.getUniforms(y),y.onBeforeCompile(_e,x),Pe=J.acquireProgram(_e,ve),De.set(ve,Pe),z.uniforms=_e.uniforms;const Se=z.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Se.clippingPlanes=Ue.uniform),fd(y,_e),z.needsLights=Am(y),z.lightsStateVersion=ue,z.needsLights&&(Se.ambientLightColor.value=U.state.ambient,Se.lightProbe.value=U.state.probe,Se.directionalLights.value=U.state.directional,Se.directionalLightShadows.value=U.state.directionalShadow,Se.spotLights.value=U.state.spot,Se.spotLightShadows.value=U.state.spotShadow,Se.rectAreaLights.value=U.state.rectArea,Se.ltc_1.value=U.state.rectAreaLTC1,Se.ltc_2.value=U.state.rectAreaLTC2,Se.pointLights.value=U.state.point,Se.pointLightShadows.value=U.state.pointShadow,Se.hemisphereLights.value=U.state.hemi,Se.directionalShadowMap.value=U.state.directionalShadowMap,Se.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Se.spotShadowMap.value=U.state.spotShadowMap,Se.spotLightMatrix.value=U.state.spotLightMatrix,Se.spotLightMap.value=U.state.spotLightMap,Se.pointShadowMap.value=U.state.pointShadowMap,Se.pointShadowMatrix.value=U.state.pointShadowMatrix),z.currentProgram=Pe,z.uniformsList=null,Pe}function hd(y){if(y.uniformsList===null){const I=y.currentProgram.getUniforms();y.uniformsList=_o.seqWithValue(I.seq,y.uniforms)}return y.uniformsList}function fd(y,I){const F=Te.get(y);F.outputColorSpace=I.outputColorSpace,F.batching=I.batching,F.batchingColor=I.batchingColor,F.instancing=I.instancing,F.instancingColor=I.instancingColor,F.instancingMorph=I.instancingMorph,F.skinning=I.skinning,F.morphTargets=I.morphTargets,F.morphNormals=I.morphNormals,F.morphColors=I.morphColors,F.morphTargetsCount=I.morphTargetsCount,F.numClippingPlanes=I.numClippingPlanes,F.numIntersection=I.numClipIntersection,F.vertexAlphas=I.vertexAlphas,F.vertexTangents=I.vertexTangents,F.toneMapping=I.toneMapping}function Em(y,I,F,z,U){I.isScene!==!0&&(I=Ae),Ce.resetTextureUnits();const ne=I.fog,ue=z.isMeshStandardMaterial?I.environment:null,_e=D===null?x.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Hi,ve=(z.isMeshStandardMaterial?M:T).get(z.envMap||ue),De=z.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Pe=!!F.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Se=!!F.morphAttributes.position,Qe=!!F.morphAttributes.normal,dt=!!F.morphAttributes.color;let ht=Ai;z.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(ht=x.toneMapping);const $t=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,$e=$t!==void 0?$t.length:0,ye=Te.get(z),Dt=m.state.lights;if(X===!0&&($===!0||y!==b)){const ln=y===b&&z.id===H;Ue.setState(z,y,ln)}let et=!1;z.version===ye.__version?(ye.needsLights&&ye.lightsStateVersion!==Dt.state.version||ye.outputColorSpace!==_e||U.isBatchedMesh&&ye.batching===!1||!U.isBatchedMesh&&ye.batching===!0||U.isBatchedMesh&&ye.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&ye.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&ye.instancing===!1||!U.isInstancedMesh&&ye.instancing===!0||U.isSkinnedMesh&&ye.skinning===!1||!U.isSkinnedMesh&&ye.skinning===!0||U.isInstancedMesh&&ye.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&ye.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&ye.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&ye.instancingMorph===!1&&U.morphTexture!==null||ye.envMap!==ve||z.fog===!0&&ye.fog!==ne||ye.numClippingPlanes!==void 0&&(ye.numClippingPlanes!==Ue.numPlanes||ye.numIntersection!==Ue.numIntersection)||ye.vertexAlphas!==De||ye.vertexTangents!==Pe||ye.morphTargets!==Se||ye.morphNormals!==Qe||ye.morphColors!==dt||ye.toneMapping!==ht||ye.morphTargetsCount!==$e)&&(et=!0):(et=!0,ye.__version=z.version);let _n=ye.currentProgram;et===!0&&(_n=Ma(z,I,U));let ps=!1,en=!1,fc=!1;const gt=_n.getUniforms(),hi=ye.uniforms;if(Me.useProgram(_n.program)&&(ps=!0,en=!0,fc=!0),z.id!==H&&(H=z.id,en=!0),ps||b!==y){gt.setValue(P,"projectionMatrix",y.projectionMatrix),gt.setValue(P,"viewMatrix",y.matrixWorldInverse);const ln=gt.map.cameraPosition;ln!==void 0&&ln.setValue(P,he.setFromMatrixPosition(y.matrixWorld)),ke.logarithmicDepthBuffer&&gt.setValue(P,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&gt.setValue(P,"isOrthographic",y.isOrthographicCamera===!0),b!==y&&(b=y,en=!0,fc=!0)}if(U.isSkinnedMesh){gt.setOptional(P,U,"bindMatrix"),gt.setOptional(P,U,"bindMatrixInverse");const ln=U.skeleton;ln&&(ln.boneTexture===null&&ln.computeBoneTexture(),gt.setValue(P,"boneTexture",ln.boneTexture,Ce))}U.isBatchedMesh&&(gt.setOptional(P,U,"batchingTexture"),gt.setValue(P,"batchingTexture",U._matricesTexture,Ce),gt.setOptional(P,U,"batchingIdTexture"),gt.setValue(P,"batchingIdTexture",U._indirectTexture,Ce),gt.setOptional(P,U,"batchingColorTexture"),U._colorsTexture!==null&&gt.setValue(P,"batchingColorTexture",U._colorsTexture,Ce));const pc=F.morphAttributes;if((pc.position!==void 0||pc.normal!==void 0||pc.color!==void 0)&&Ve.update(U,F,_n),(en||ye.receiveShadow!==U.receiveShadow)&&(ye.receiveShadow=U.receiveShadow,gt.setValue(P,"receiveShadow",U.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(hi.envMap.value=ve,hi.flipEnvMap.value=ve.isCubeTexture&&ve.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&I.environment!==null&&(hi.envMapIntensity.value=I.environmentIntensity),en&&(gt.setValue(P,"toneMappingExposure",x.toneMappingExposure),ye.needsLights&&bm(hi,fc),ne&&z.fog===!0&&be.refreshFogUniforms(hi,ne),be.refreshMaterialUniforms(hi,z,j,V,m.state.transmissionRenderTarget[y.id]),_o.upload(P,hd(ye),hi,Ce)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(_o.upload(P,hd(ye),hi,Ce),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&gt.setValue(P,"center",U.center),gt.setValue(P,"modelViewMatrix",U.modelViewMatrix),gt.setValue(P,"normalMatrix",U.normalMatrix),gt.setValue(P,"modelMatrix",U.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const ln=z.uniformsGroups;for(let mc=0,Tm=ln.length;mc<Tm;mc++){const pd=ln[mc];ct.update(pd,_n),ct.bind(pd,_n)}}return _n}function bm(y,I){y.ambientLightColor.needsUpdate=I,y.lightProbe.needsUpdate=I,y.directionalLights.needsUpdate=I,y.directionalLightShadows.needsUpdate=I,y.pointLights.needsUpdate=I,y.pointLightShadows.needsUpdate=I,y.spotLights.needsUpdate=I,y.spotLightShadows.needsUpdate=I,y.rectAreaLights.needsUpdate=I,y.hemisphereLights.needsUpdate=I}function Am(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(y,I,F){Te.get(y.texture).__webglTexture=I,Te.get(y.depthTexture).__webglTexture=F;const z=Te.get(y);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=F===void 0,z.__autoAllocateDepthBuffer||We.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,I){const F=Te.get(y);F.__webglFramebuffer=I,F.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(y,I=0,F=0){D=y,R=I,A=F;let z=!0,U=null,ne=!1,ue=!1;if(y){const ve=Te.get(y);if(ve.__useDefaultFramebuffer!==void 0)Me.bindFramebuffer(P.FRAMEBUFFER,null),z=!1;else if(ve.__webglFramebuffer===void 0)Ce.setupRenderTarget(y);else if(ve.__hasExternalTextures)Ce.rebindTextures(y,Te.get(y.texture).__webglTexture,Te.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Se=y.depthTexture;if(ve.__boundDepthTexture!==Se){if(Se!==null&&Te.has(Se)&&(y.width!==Se.image.width||y.height!==Se.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ce.setupDepthRenderbuffer(y)}}const De=y.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(ue=!0);const Pe=Te.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Pe[I])?U=Pe[I][F]:U=Pe[I],ne=!0):y.samples>0&&Ce.useMultisampledRTT(y)===!1?U=Te.get(y).__webglMultisampledFramebuffer:Array.isArray(Pe)?U=Pe[F]:U=Pe,S.copy(y.viewport),C.copy(y.scissor),k=y.scissorTest}else S.copy(de).multiplyScalar(j).floor(),C.copy(xe).multiplyScalar(j).floor(),k=Fe;if(Me.bindFramebuffer(P.FRAMEBUFFER,U)&&z&&Me.drawBuffers(y,U),Me.viewport(S),Me.scissor(C),Me.setScissorTest(k),ne){const ve=Te.get(y.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+I,ve.__webglTexture,F)}else if(ue){const ve=Te.get(y.texture),De=I||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,ve.__webglTexture,F||0,De)}H=-1},this.readRenderTargetPixels=function(y,I,F,z,U,ne,ue){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=Te.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ue!==void 0&&(_e=_e[ue]),_e){Me.bindFramebuffer(P.FRAMEBUFFER,_e);try{const ve=y.texture,De=ve.format,Pe=ve.type;if(!ke.textureFormatReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ke.textureTypeReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=y.width-z&&F>=0&&F<=y.height-U&&P.readPixels(I,F,z,U,He.convert(De),He.convert(Pe),ne)}finally{const ve=D!==null?Te.get(D).__webglFramebuffer:null;Me.bindFramebuffer(P.FRAMEBUFFER,ve)}}},this.readRenderTargetPixelsAsync=async function(y,I,F,z,U,ne,ue){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=Te.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ue!==void 0&&(_e=_e[ue]),_e){Me.bindFramebuffer(P.FRAMEBUFFER,_e);try{const ve=y.texture,De=ve.format,Pe=ve.type;if(!ke.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ke.textureTypeReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=y.width-z&&F>=0&&F<=y.height-U){const Se=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Se),P.bufferData(P.PIXEL_PACK_BUFFER,ne.byteLength,P.STREAM_READ),P.readPixels(I,F,z,U,He.convert(De),He.convert(Pe),0),P.flush();const Qe=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);await Lg(P,Qe,4);try{P.bindBuffer(P.PIXEL_PACK_BUFFER,Se),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ne)}finally{P.deleteBuffer(Se),P.deleteSync(Qe)}return ne}}finally{const ve=D!==null?Te.get(D).__webglFramebuffer:null;Me.bindFramebuffer(P.FRAMEBUFFER,ve)}}},this.copyFramebufferToTexture=function(y,I=null,F=0){y.isTexture!==!0&&(Xs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,y=arguments[1]);const z=Math.pow(2,-F),U=Math.floor(y.image.width*z),ne=Math.floor(y.image.height*z),ue=I!==null?I.x:0,_e=I!==null?I.y:0;Ce.setTexture2D(y,0),P.copyTexSubImage2D(P.TEXTURE_2D,F,0,0,ue,_e,U,ne),Me.unbindTexture()},this.copyTextureToTexture=function(y,I,F=null,z=null,U=0){y.isTexture!==!0&&(Xs("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,y=arguments[1],I=arguments[2],U=arguments[3]||0,F=null);let ne,ue,_e,ve,De,Pe;F!==null?(ne=F.max.x-F.min.x,ue=F.max.y-F.min.y,_e=F.min.x,ve=F.min.y):(ne=y.image.width,ue=y.image.height,_e=0,ve=0),z!==null?(De=z.x,Pe=z.y):(De=0,Pe=0);const Se=He.convert(I.format),Qe=He.convert(I.type);Ce.setTexture2D(I,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,I.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,I.unpackAlignment);const dt=P.getParameter(P.UNPACK_ROW_LENGTH),ht=P.getParameter(P.UNPACK_IMAGE_HEIGHT),$t=P.getParameter(P.UNPACK_SKIP_PIXELS),$e=P.getParameter(P.UNPACK_SKIP_ROWS),ye=P.getParameter(P.UNPACK_SKIP_IMAGES),Dt=y.isCompressedTexture?y.mipmaps[U]:y.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,Dt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Dt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,_e),P.pixelStorei(P.UNPACK_SKIP_ROWS,ve),y.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,U,De,Pe,ne,ue,Se,Qe,Dt.data):y.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,U,De,Pe,Dt.width,Dt.height,Se,Dt.data):P.texSubImage2D(P.TEXTURE_2D,U,De,Pe,ne,ue,Se,Qe,Dt),P.pixelStorei(P.UNPACK_ROW_LENGTH,dt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ht),P.pixelStorei(P.UNPACK_SKIP_PIXELS,$t),P.pixelStorei(P.UNPACK_SKIP_ROWS,$e),P.pixelStorei(P.UNPACK_SKIP_IMAGES,ye),U===0&&I.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),Me.unbindTexture()},this.copyTextureToTexture3D=function(y,I,F=null,z=null,U=0){y.isTexture!==!0&&(Xs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,z=arguments[1]||null,y=arguments[2],I=arguments[3],U=arguments[4]||0);let ne,ue,_e,ve,De,Pe,Se,Qe,dt;const ht=y.isCompressedTexture?y.mipmaps[U]:y.image;F!==null?(ne=F.max.x-F.min.x,ue=F.max.y-F.min.y,_e=F.max.z-F.min.z,ve=F.min.x,De=F.min.y,Pe=F.min.z):(ne=ht.width,ue=ht.height,_e=ht.depth,ve=0,De=0,Pe=0),z!==null?(Se=z.x,Qe=z.y,dt=z.z):(Se=0,Qe=0,dt=0);const $t=He.convert(I.format),$e=He.convert(I.type);let ye;if(I.isData3DTexture)Ce.setTexture3D(I,0),ye=P.TEXTURE_3D;else if(I.isDataArrayTexture||I.isCompressedArrayTexture)Ce.setTexture2DArray(I,0),ye=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,I.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,I.unpackAlignment);const Dt=P.getParameter(P.UNPACK_ROW_LENGTH),et=P.getParameter(P.UNPACK_IMAGE_HEIGHT),_n=P.getParameter(P.UNPACK_SKIP_PIXELS),ps=P.getParameter(P.UNPACK_SKIP_ROWS),en=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,ht.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ht.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,ve),P.pixelStorei(P.UNPACK_SKIP_ROWS,De),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Pe),y.isDataTexture||y.isData3DTexture?P.texSubImage3D(ye,U,Se,Qe,dt,ne,ue,_e,$t,$e,ht.data):I.isCompressedArrayTexture?P.compressedTexSubImage3D(ye,U,Se,Qe,dt,ne,ue,_e,$t,ht.data):P.texSubImage3D(ye,U,Se,Qe,dt,ne,ue,_e,$t,$e,ht),P.pixelStorei(P.UNPACK_ROW_LENGTH,Dt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,et),P.pixelStorei(P.UNPACK_SKIP_PIXELS,_n),P.pixelStorei(P.UNPACK_SKIP_ROWS,ps),P.pixelStorei(P.UNPACK_SKIP_IMAGES,en),U===0&&I.generateMipmaps&&P.generateMipmap(ye),Me.unbindTexture()},this.initRenderTarget=function(y){Te.get(y).__webglFramebuffer===void 0&&Ce.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Ce.setTextureCube(y,0):y.isData3DTexture?Ce.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Ce.setTexture2DArray(y,0):Ce.setTexture2D(y,0),Me.unbindTexture()},this.resetState=function(){R=0,A=0,D=null,Me.reset(),ze.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===bu?"display-p3":"srgb",t.unpackColorSpace=Ke.workingColorSpace===qo?"display-p3":"srgb"}}class kx extends It{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tn,this.environmentIntensity=1,this.environmentRotation=new Tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class up{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Yl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=ei()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Xs("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Gt=new w;class In{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=yn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=nt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=yn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=yn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=yn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=yn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array),r=nt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ht(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new In(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Pu extends Ui{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ls;const Er=new w,Is=new w,Hs=new w,Us=new ae,br=new ae,dp=new Ze,Va=new w,Ar=new w,Wa=new w,uh=new ae,Gc=new ae,dh=new ae;class hp extends It{constructor(e=new Pu){if(super(),this.isSprite=!0,this.type="Sprite",Ls===void 0){Ls=new ut;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new up(t,5);Ls.setIndex([0,1,2,0,2,3]),Ls.setAttribute("position",new In(i,3,0,!1)),Ls.setAttribute("uv",new In(i,2,3,!1))}this.geometry=Ls,this.material=e,this.center=new ae(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Is.setFromMatrixScale(this.matrixWorld),dp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Hs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Is.multiplyScalar(-Hs.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const a=this.center;Xa(Va.set(-.5,-.5,0),Hs,a,Is,s,r),Xa(Ar.set(.5,-.5,0),Hs,a,Is,s,r),Xa(Wa.set(.5,.5,0),Hs,a,Is,s,r),uh.set(0,0),Gc.set(1,0),dh.set(1,1);let o=e.ray.intersectTriangle(Va,Ar,Wa,!1,Er);if(o===null&&(Xa(Ar.set(-.5,.5,0),Hs,a,Is,s,r),Gc.set(0,1),o=e.ray.intersectTriangle(Va,Wa,Ar,!1,Er),o===null))return;const c=e.ray.origin.distanceTo(Er);c<e.near||c>e.far||t.push({distance:c,point:Er.clone(),uv:En.getInterpolation(Er,Va,Ar,Wa,uh,Gc,dh,new ae),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Xa(n,e,t,i,s,r){Us.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(br.x=r*Us.x-s*Us.y,br.y=s*Us.x+r*Us.y):br.copy(Us),n.copy(e),n.x+=br.x,n.y+=br.y,n.applyMatrix4(dp)}class Gx extends St{constructor(e=null,t=1,i=1,s,r,a,o,c,l=zt,u=zt,d,h){super(null,a,o,c,l,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hh extends Ht{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ns=new Ze,fh=new Ze,Ya=[],ph=new Fn,Vx=new Ze,Tr=new pt,wr=new di;class Wx extends pt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new hh(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Vx)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Fn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ns),ph.copy(e.boundingBox).applyMatrix4(Ns),this.boundingBox.union(ph)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new di),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ns),wr.copy(e.boundingSphere).applyMatrix4(Ns),this.boundingSphere.union(wr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Tr.geometry=this.geometry,Tr.material=this.material,Tr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wr.copy(this.boundingSphere),wr.applyMatrix4(i),e.ray.intersectsSphere(wr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ns),fh.multiplyMatrices(i,Ns),Tr.matrixWorld=fh,Tr.raycast(e,Ya);for(let a=0,o=Ya.length;a<o;a++){const c=Ya[a];c.instanceId=r,c.object=this,t.push(c)}Ya.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new hh(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Gx(new Float32Array(s*this.count),s,this.count,Mu,Ln));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<i.length;l++)a+=i[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;r[c]=o,r.set(i,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Jo extends Ui{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Le(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Po=new w,Co=new w,mh=new Ze,Dr=new oa,ja=new di,Vc=new w,gh=new w;class Cu extends It{constructor(e=new ut,t=new Jo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Po.fromBufferAttribute(t,s-1),Co.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Po.distanceTo(Co);e.setAttribute("lineDistance",new at(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ja.copy(i.boundingSphere),ja.applyMatrix4(s),ja.radius+=r,e.ray.intersectsSphere(ja)===!1)return;mh.copy(s).invert(),Dr.copy(e.ray).applyMatrix4(mh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=u.getX(_),v=u.getX(_+1),x=Ka(this,e,Dr,c,p,v);x&&t.push(x)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(f),p=Ka(this,e,Dr,c,_,m);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=Ka(this,e,Dr,c,_,_+1);p&&t.push(p)}if(this.isLineLoop){const _=Ka(this,e,Dr,c,g-1,f);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ka(n,e,t,i,s,r){const a=n.geometry.attributes.position;if(Po.fromBufferAttribute(a,s),Co.fromBufferAttribute(a,r),t.distanceSqToSegment(Po,Co,Vc,gh)>i)return;Vc.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Vc);if(!(c<e.near||c>e.far))return{distance:c,point:gh.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,object:n}}const _h=new w,vh=new w;class xh extends Cu{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)_h.fromBufferAttribute(t,s),vh.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+_h.distanceTo(vh);e.setAttribute("lineDistance",new at(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ro extends Ui{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Mh=new Ze,Kl=new oa,qa=new di,Za=new w;class Zr extends It{constructor(e=new ut,t=new Ro){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),qa.copy(i.boundingSphere),qa.applyMatrix4(s),qa.radius+=r,e.ray.intersectsSphere(qa)===!1)return;Mh.copy(s).invert(),Kl.copy(e.ray).applyMatrix4(Mh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,d=i.attributes.position;if(l!==null){const h=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=h,_=f;g<_;g++){const m=l.getX(g);Za.fromBufferAttribute(d,m),Sh(Za,m,c,s,e,t,this)}}else{const h=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=h,_=f;g<_;g++)Za.fromBufferAttribute(d,g),Sh(Za,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Sh(n,e,t,i,s,r,a){const o=Kl.distanceSqToPoint(n);if(o<t){const c=new w;Kl.closestPointToPoint(n,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,object:a})}}class Qo extends St{constructor(e,t,i,s,r,a,o,c,l){super(e,t,i,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ru extends ut{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],a=[];o(s),l(i),u(),this.setAttribute("position",new at(r,3)),this.setAttribute("normal",new at(r.slice(),3)),this.setAttribute("uv",new at(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const x=new w,E=new w,R=new w;for(let A=0;A<t.length;A+=3)f(t[A+0],x),f(t[A+1],E),f(t[A+2],R),c(x,E,R,v)}function c(v,x,E,R){const A=R+1,D=[];for(let H=0;H<=A;H++){D[H]=[];const b=v.clone().lerp(E,H/A),S=x.clone().lerp(E,H/A),C=A-H;for(let k=0;k<=C;k++)k===0&&H===A?D[H][k]=b:D[H][k]=b.clone().lerp(S,k/C)}for(let H=0;H<A;H++)for(let b=0;b<2*(A-H)-1;b++){const S=Math.floor(b/2);b%2===0?(h(D[H][S+1]),h(D[H+1][S]),h(D[H][S])):(h(D[H][S+1]),h(D[H+1][S+1]),h(D[H+1][S]))}}function l(v){const x=new w;for(let E=0;E<r.length;E+=3)x.x=r[E+0],x.y=r[E+1],x.z=r[E+2],x.normalize().multiplyScalar(v),r[E+0]=x.x,r[E+1]=x.y,r[E+2]=x.z}function u(){const v=new w;for(let x=0;x<r.length;x+=3){v.x=r[x+0],v.y=r[x+1],v.z=r[x+2];const E=m(v)/2/Math.PI+.5,R=p(v)/Math.PI+.5;a.push(E,1-R)}g(),d()}function d(){for(let v=0;v<a.length;v+=6){const x=a[v+0],E=a[v+2],R=a[v+4],A=Math.max(x,E,R),D=Math.min(x,E,R);A>.9&&D<.1&&(x<.2&&(a[v+0]+=1),E<.2&&(a[v+2]+=1),R<.2&&(a[v+4]+=1))}}function h(v){r.push(v.x,v.y,v.z)}function f(v,x){const E=v*3;x.x=e[E+0],x.y=e[E+1],x.z=e[E+2]}function g(){const v=new w,x=new w,E=new w,R=new w,A=new ae,D=new ae,H=new ae;for(let b=0,S=0;b<r.length;b+=9,S+=6){v.set(r[b+0],r[b+1],r[b+2]),x.set(r[b+3],r[b+4],r[b+5]),E.set(r[b+6],r[b+7],r[b+8]),A.set(a[S+0],a[S+1]),D.set(a[S+2],a[S+3]),H.set(a[S+4],a[S+5]),R.copy(v).add(x).add(E).divideScalar(3);const C=m(R);_(A,S+0,v,C),_(D,S+2,x,C),_(H,S+4,E,C)}}function _(v,x,E,R){R<0&&v.x===1&&(a[x]=v.x-1),E.x===0&&E.z===0&&(a[x]=R/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ru(e.vertices,e.indices,e.radius,e.details)}}class Lu extends Ru{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Lu(e.radius,e.detail)}}class Lo extends ut{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);const o=[],c=[],l=[],u=[];let d=e;const h=(t-e)/s,f=new w,g=new ae;for(let _=0;_<=s;_++){for(let m=0;m<=i;m++){const p=r+m/i*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}d+=h}for(let _=0;_<s;_++){const m=_*(i+1);for(let p=0;p<i;p++){const v=p+m,x=v,E=v+i+1,R=v+i+2,A=v+1;o.push(x,E,A),o.push(E,R,A)}}this.setIndex(o),this.setAttribute("position",new at(c,3)),this.setAttribute("normal",new at(l,3)),this.setAttribute("uv",new at(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lo(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class as extends ut{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const u=[],d=new w,h=new w,f=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){const v=[],x=p/i;let E=0;p===0&&a===0?E=.5/t:p===i&&c===Math.PI&&(E=-.5/t);for(let R=0;R<=t;R++){const A=R/t;d.x=-e*Math.cos(s+A*r)*Math.sin(a+x*o),d.y=e*Math.cos(a+x*o),d.z=e*Math.sin(s+A*r)*Math.sin(a+x*o),g.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),m.push(A+E,1-x),v.push(l++)}u.push(v)}for(let p=0;p<i;p++)for(let v=0;v<t;v++){const x=u[p][v+1],E=u[p][v],R=u[p+1][v],A=u[p+1][v+1];(p!==0||a>0)&&f.push(x,E,A),(p!==i-1||c<Math.PI)&&f.push(E,R,A)}this.setIndex(f),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(_,3)),this.setAttribute("uv",new at(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new as(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Xx extends ut{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],i=new Set,s=new w,r=new w;if(e.index!==null){const a=e.attributes.position,o=e.index;let c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,u=c.length;l<u;++l){const d=c[l],h=d.start,f=d.count;for(let g=h,_=h+f;g<_;g+=3)for(let m=0;m<3;m++){const p=o.getX(g+m),v=o.getX(g+(m+1)%3);s.fromBufferAttribute(a,p),r.fromBufferAttribute(a,v),yh(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{const a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){const u=3*o+l,d=3*o+(l+1)%3;s.fromBufferAttribute(a,u),r.fromBufferAttribute(a,d),yh(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new at(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function yh(n,e,t){const i=`${n.x},${n.y},${n.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${n.x},${n.y},${n.z}`;return t.has(i)===!0||t.has(s)===!0?!1:(t.add(i),t.add(s),!0)}class Yx extends lt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Jr extends Ui{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Le(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yf,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const Eh={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class jx{constructor(e,t,i){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){const d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){const f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}}const Kx=new jx;class Iu{constructor(e){this.manager=e!==void 0?e:Kx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Iu.DEFAULT_MATERIAL_NAME="__DEFAULT";class qx extends Iu{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Eh.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=qr("img");function c(){u(),Eh.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(d){u(),s&&s(d),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class Hu extends Iu{constructor(e){super(e)}load(e,t,i,s){const r=new St,a=new qx(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}}class fp extends It{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Le(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Wc=new Ze,bh=new w,Ah=new w;class Zx{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ae(512,512),this.map=null,this.mapPass=null,this.matrix=new Ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wu,this._frameExtents=new ae(1,1),this._viewportCount=1,this._viewports=[new tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;bh.setFromMatrixPosition(e.matrixWorld),t.position.copy(bh),Ah.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ah),t.updateMatrixWorld(),Wc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wc),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Wc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Th=new Ze,Pr=new w,Xc=new w;class Jx extends Zx{constructor(){super(new rn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ae(4,2),this._viewportCount=6,this._viewports=[new tt(2,1,1,1),new tt(0,1,1,1),new tt(3,1,1,1),new tt(1,1,1,1),new tt(3,0,1,1),new tt(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Pr.setFromMatrixPosition(e.matrixWorld),i.position.copy(Pr),Xc.copy(i.position),Xc.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Xc),i.updateMatrixWorld(),s.makeTranslation(-Pr.x,-Pr.y,-Pr.z),Th.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Th)}}class Qx extends fp{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Jx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class $x extends fp{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class e2 extends ut{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class t2{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=wh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=wh();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function wh(){return(typeof performance>"u"?Date:performance).now()}class ql extends up{constructor(e,t,i=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}const Dh=new Ze;class pp{constructor(e,t,i=0,s=1/0){this.ray=new oa(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new Tu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Dh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Dh),this}intersectObject(e,t=!0,i=[]){return Zl(e,this,i,t),i.sort(Ph),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Zl(e[s],this,i,t);return i.sort(Ph),i}}function Ph(n,e){return n.distance-e.distance}function Zl(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let a=0,o=r.length;a<o;a++)Zl(r[a],e,t,!0)}}class Ch{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Lt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Rh=new w,Ja=new w;class n2{constructor(e=new w,t=new w){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Rh.subVectors(e,this.start),Ja.subVectors(this.end,this.start);const i=Ja.dot(Ja);let r=Ja.dot(Rh)/i;return t&&(r=Lt(r,0,1)),r}closestPointToPoint(e,t,i){const s=this.closestPointToPointParameter(e,t);return this.delta(i).multiplyScalar(s).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}class i2 extends hs{constructor(e,t){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:mu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=mu);const gn=Date.UTC(2e3,0,1,12,0,0),Mi=36525,oi=1495978707e-1;class s2{days;logMag=0;reversed=!1;paused=!1;constructor(e=Date.now()){this.days=(e-gn)/864e5}get t(){return this.days}setDate(e){const t=e instanceof Date?e.getTime():e;this.days=(t-gn)/864e5}getSpeed(){return(this.reversed?-1:1)*10**this.logMag}setLogSpeed(e){this.logMag=e}getLogSpeed(){return this.logMag}get isReversed(){return this.reversed}setReversed(e){this.reversed=e}get isPaused(){return this.paused}setPaused(e){this.paused=e}tick(e){this.paused||(this.days+=this.getSpeed()*e)}preScrubPaused=!1;beginScrub(){this.preScrubPaused=this.paused,this.paused=!0}endScrub(){this.paused=this.preScrubPaused}toDate(){return new Date(gn+this.days*864e5)}}const ce=n=>[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255],Uu={id:"sun",name:"Sun",kind:"star",radiusKm:695700,rotationHours:609.12,tiltDeg:7.25,color:ce(16765567),color2:ce(16751935),texture:"sun"},Xt=[{id:"mercury",name:"Mercury",kind:"planet",parent:"sun",elements:{a:.38709843,e:.20563661,i:7.00559432,node:48.33961819,peri:29.118100759999997,M0:174.79394829,n:4.09233444,rates:{a:0,e:2123e-8,i:-.00590158,node:-.12214182,peri:.28154195}},radiusKm:2439.7,rotationHours:1407.5,tiltDeg:.034,color:ce(10263708),color2:ce(7828591),texture:"rock"},{id:"venus",name:"Venus",kind:"planet",parent:"sun",elements:{a:.72332102,e:.00676399,i:3.39777545,node:76.67261496,peri:55.094942169999996,M0:50.21215136999999,n:1.60212892,rates:{a:-26e-8,e:-5107e-8,i:43494e-8,node:-.27274174,peri:.32953822}},radiusKm:6051.8,rotationHours:-5832.5,tiltDeg:177.36,color:ce(15124874),color2:ce(13215850),texture:"gas"},{id:"earth",name:"Earth",kind:"planet",parent:"sun",elements:{a:1.00000018,e:.01673163,i:-54346e-8,node:-5.11260389,peri:108.04266274,M0:-2.4631431299999917,n:.98560041,rates:{a:-3e-8,e:-3661e-8,i:-.01337178,node:-.24123856,peri:.5591911599999999}},radiusKm:6371,rotationHours:23.93,tiltDeg:23.44,color:ce(5211846),color2:ce(4160831),texture:"earth"},{id:"mars",name:"Mars",kind:"planet",parent:"sun",elements:{a:1.52371243,e:.09336511,i:1.85181869,node:49.71320984,peri:-73.63065768,M0:19.3493162,n:.52402045,rates:{a:97e-8,e:9149e-8,i:-.00724757,node:-.26852431,peri:.72076056}},radiusKm:3389.5,rotationHours:24.62,tiltDeg:25.19,color:ce(12671035),color2:ce(9387304),texture:"rock"},{id:"jupiter",name:"Jupiter",kind:"planet",parent:"sun",elements:{a:5.20248019,e:.0485359,i:1.29861416,node:100.29282654,peri:-86.0178741,M0:20.059839080000003,n:.08308615,rates:{a:-2864e-8,e:18026e-8,i:-.00322699,node:.13024619,peri:.051745769999999996},periodicM:[{b:-12452e-8,c:.0606406,s:-.35635438,f:38.35125}]},radiusKm:69911,rotationHours:9.93,tiltDeg:3.13,color:ce(14203277),color2:ce(11041872),texture:"gas"},{id:"saturn",name:"Saturn",kind:"planet",parent:"sun",elements:{a:9.54149883,e:.05550825,i:2.49424102,node:113.63998702,peri:-20.778626390000014,M0:-42.78564733999999,n:.03344485,rates:{a:-3065e-8,e:-32044e-8,i:.00451969,node:-.25015002,peri:.7919448},periodicM:[{b:25899e-8,c:-.13434469,s:.87320147,f:38.35125}]},radiusKm:58232,rotationHours:10.66,tiltDeg:26.73,color:ce(14930851),color2:ce(12560250),texture:"gas",rings:{inner:1.24,outer:2.27,opacity:.85,color:ce(13616294)}},{id:"uranus",name:"Uranus",kind:"planet",parent:"sun",elements:{a:19.18797948,e:.0468574,i:.77298127,node:73.96250215,peri:98.47154226,M0:141.76872184,n:.01172902,rates:{a:-20455e-8,e:-155e-7,i:-.00180155,node:.05739699,peri:.035272859999999996},periodicM:[{b:58331e-8,c:-.97731848,s:.17689245,f:7.67025}]},radiusKm:25362,rotationHours:-17.24,tiltDeg:97.77,color:ce(10475744),color2:ce(8176332),texture:"ice",rings:{inner:1.64,outer:2,opacity:.25,color:ce(10467520)}},{id:"neptune",name:"Neptune",kind:"planet",parent:"sun",elements:{a:30.06952752,e:.00895439,i:1.7700552,node:131.78635853,peri:-85.10477129,M0:257.54130563,n:.00598097,rates:{a:6447e-8,e:818e-8,i:224e-6,node:-.00606302,peri:.0161624},periodicM:[{b:-41348e-8,c:.68346318,s:-.10162547,f:7.67025}]},radiusKm:24622,rotationHours:16.11,tiltDeg:28.32,color:ce(4613833),color2:ce(3099294),texture:"ice"}],r2=[{id:"pluto",name:"Pluto",kind:"dwarf",parent:"sun",elements:{a:39.48211675,e:.2488273,i:17.14,node:110.299,peri:113.834,M0:14.53,n:.003964},radiusKm:1188.3,rotationHours:-153.29,tiltDeg:119.6,color:ce(12101268),color2:ce(9404270),texture:"rock"},{id:"ceres",name:"Ceres",kind:"dwarf",parent:"sun",elements:{a:2.7675,e:.0758,i:10.594,node:80.305,peri:73.597,M0:32.84,n:.21426},radiusKm:469.7,rotationHours:9.07,tiltDeg:3.8,color:ce(9211020),color2:ce(6974058),texture:"rock"},{id:"eris",name:"Eris",kind:"dwarf",parent:"sun",elements:{a:67.864,e:.436,i:44.04,node:35.95,peri:151.61,M0:235.7,n:.001763},radiusKm:1163,rotationHours:25.9,tiltDeg:26.6,color:ce(12895428),color2:ce(10132122),texture:"ice"},{id:"haumea",name:"Haumea",kind:"dwarf",parent:"sun",elements:{a:43.11,e:.1948,i:28.26,node:122.29,peri:239.75,M0:202.4,n:.003482},radiusKm:745,rotationHours:15.94,tiltDeg:0,color:ce(14210252),color2:ce(11052188),texture:"ice"},{id:"makemake",name:"Makemake",kind:"dwarf",parent:"sun",elements:{a:45.43,e:.1611,i:29,node:79.35,peri:294.2,M0:16.2,n:.003219},radiusKm:715,rotationHours:22.8,tiltDeg:0,color:ce(12884600),color2:ce(10122328),texture:"ice"}],Nu=[{id:"moon",name:"Moon",kind:"moon",parent:"earth",elements:{a:384400,e:.0549,i:5.145,node:125.08,peri:318.15,M0:115.36,n:13.17635},radiusKm:1737.4,rotationHours:655.72,tiltDeg:6.68,color:ce(12434877),color2:ce(9408399),texture:"rock"},{id:"phobos",name:"Phobos",kind:"moon",parent:"mars",elements:{a:9376,e:.0151,i:1.075,node:318.7,peri:260,M0:140,n:1128.96},radiusKm:11.27,rotationHours:7.65,tiltDeg:1.08,color:ce(9076594),texture:"rock"},{id:"deimos",name:"Deimos",kind:"moon",parent:"mars",elements:{a:23460,e:3e-4,i:1.796,node:104.4,peri:305.6,M0:180,n:285.16},radiusKm:6.2,rotationHours:30.3,tiltDeg:1.78,color:ce(10260612),texture:"rock"},{id:"io",name:"Io",kind:"moon",parent:"jupiter",elements:{a:421700,e:.0041,i:.04,node:150.8,peri:137.3,M0:100,n:203.494},radiusKm:1821.6,rotationHours:42.46,tiltDeg:.05,color:ce(14271850),color2:ce(12092987),texture:"volcanic"},{id:"europa",name:"Europa",kind:"moon",parent:"jupiter",elements:{a:671100,e:.009,i:.47,node:124.8,peri:160.4,M0:100,n:101.375},radiusKm:1560.8,rotationHours:43.45,tiltDeg:.47,color:ce(13616302),color2:ce(10521976),texture:"ice"},{id:"ganymede",name:"Ganymede",kind:"moon",parent:"jupiter",elements:{a:1070400,e:.0013,i:.2,node:197,peri:118.5,M0:105,n:50.318},radiusKm:2634.1,rotationHours:71.94,tiltDeg:.2,color:ce(11050124),color2:ce(8221800),texture:"rock"},{id:"callisto",name:"Callisto",kind:"moon",parent:"jupiter",elements:{a:1882700,e:.0074,i:.19,node:308.5,peri:332.5,M0:35,n:21.57},radiusKm:2410.3,rotationHours:89.56,tiltDeg:.19,color:ce(8221800),color2:ce(6051405),texture:"rock"},{id:"titan",name:"Titan",kind:"moon",parent:"saturn",elements:{a:1221870,e:.0288,i:.35,node:125.8,peri:346.8,M0:100,n:22.577},radiusKm:2574.7,rotationHours:15.94,tiltDeg:.35,color:ce(14068058),color2:ce(11042364),texture:"gas"},{id:"triton",name:"Triton",kind:"moon",parent:"neptune",elements:{a:354759,e:16e-6,i:156.74,node:47.4,peri:5.4,M0:145,n:61.256},radiusKm:1353.4,rotationHours:-5.88,tiltDeg:156.74,color:ce(13156270),color2:ce(10261636),texture:"ice"},{id:"amalthea",name:"Amalthea",kind:"moon",parent:"jupiter",elements:{a:181353,e:.0761,i:.32,node:206.9,peri:271.2,M0:200,n:722.57},radiusKm:85.5,rotationHours:11.96,tiltDeg:.32,color:ce(9062970),color2:ce(7223852),texture:"rock"},{id:"himalia",name:"Himalia",kind:"moon",parent:"jupiter",elements:{a:11509150,e:.1137,i:28.57,node:96.9,peri:186,M0:100,n:2.131},radiusKm:85,rotationHours:382.7,tiltDeg:28.57,color:ce(9209984),color2:ce(6973024),texture:"rock"},{id:"enceladus",name:"Enceladus",kind:"moon",parent:"saturn",elements:{a:237948,e:.0047,i:.01,node:272.9,peri:130.8,M0:200,n:262.74},radiusKm:252.1,rotationHours:32.89,tiltDeg:.01,color:ce(15266034),color2:ce(12899544),texture:"ice"},{id:"tethys",name:"Tethys",kind:"moon",parent:"saturn",elements:{a:294600,e:1e-4,i:1.09,node:127,peri:193.8,M0:90,n:225.87},radiusKm:531.1,rotationHours:38.25,tiltDeg:1.09,color:ce(14210248),color2:ce(11841700),texture:"ice"},{id:"dione",name:"Dione",kind:"moon",parent:"saturn",elements:{a:377300,e:.0022,i:.02,node:117.3,peri:127.4,M0:200,n:131.53},radiusKm:561.4,rotationHours:65.69,tiltDeg:.02,color:ce(12631216),color2:ce(10262668),texture:"ice"},{id:"rhea",name:"Rhea",kind:"moon",parent:"saturn",elements:{a:527108,e:.0013,i:.35,node:250.4,peri:130.1,M0:100,n:79.68},radiusKm:763.8,rotationHours:108.44,tiltDeg:.35,color:ce(11578528),color2:ce(9209984),texture:"ice"},{id:"iapetus",name:"Iapetus",kind:"moon",parent:"saturn",elements:{a:3560820,e:.0286,i:15.47,node:213.9,peri:198.1,M0:200,n:4.54},radiusKm:734.5,rotationHours:1903.7,tiltDeg:15.47,color:ce(10127992),color2:ce(5129272),texture:"rock"},{id:"miranda",name:"Miranda",kind:"moon",parent:"uranus",elements:{a:129390,e:.0013,i:.1,node:180.9,peri:222.9,M0:100,n:254.69},radiusKm:235.8,rotationHours:33.92,tiltDeg:.1,color:ce(11052188),color2:ce(8683642),texture:"rock"},{id:"ariel",name:"Ariel",kind:"moon",parent:"uranus",elements:{a:190900,e:.0012,i:.26,node:169.5,peri:294.9,M0:100,n:142.86},radiusKm:578.9,rotationHours:60.48,tiltDeg:.26,color:ce(12631214),color2:ce(10263182),texture:"ice"},{id:"umbriel",name:"Umbriel",kind:"moon",parent:"uranus",elements:{a:266e3,e:.0039,i:.13,node:133.3,peri:250.7,M0:100,n:86.87},radiusKm:584.7,rotationHours:99.46,tiltDeg:.13,color:ce(7236196),color2:ce(5525578),texture:"ice"},{id:"titania",name:"Titania",kind:"moon",parent:"uranus",elements:{a:435910,e:.0011,i:.34,node:98.7,peri:290.8,M0:100,n:41.35},radiusKm:788.4,rotationHours:208.9,tiltDeg:.34,color:ce(10262156),color2:ce(8025194),texture:"ice"},{id:"oberon",name:"Oberon",kind:"moon",parent:"uranus",elements:{a:583520,e:8e-4,i:.06,node:79.3,peri:70.6,M0:100,n:26.75},radiusKm:761.4,rotationHours:323,tiltDeg:.06,color:ce(8946298),color2:ce(6709338),texture:"ice"},{id:"nereid",name:"Nereid",kind:"moon",parent:"neptune",elements:{a:5513700,e:.7482,i:7.31,node:130,peri:5.2,M0:100,n:1.1731},radiusKm:170,rotationHours:5.2,tiltDeg:7.31,color:ce(9472120),color2:ce(6972504),texture:"rock"}],ua=[Uu,...Xt,...r2,...Nu],a2={sun:["solar","star"],moon:["luna","earth moon","the moon"],mercury:["mercury"],venus:["venus","morning star"],earth:["earth","world"],mars:["mars"],jupiter:["jupiter"],saturn:["saturn"],uranus:["uranus"],neptune:["neptune"],pluto:["pluto"],ceres:["ceres"],eris:["eris"],haumea:["haumea"],makemake:["makemake"]};function mp(n){const e=[],t=new Set,i=s=>s.name;for(const s of n)if(s.kind!=="moon"){if(s.kind==="star"){e.push({id:s.id,name:i(s),kind:s.kind,sub:"the star"}),t.add(s.id);continue}if(s.kind!=="dwarf"){e.push({id:s.id,name:i(s),kind:s.kind,sub:"planet"}),t.add(s.id);for(const r of n)r.kind!=="moon"||r.parent!==s.id||(e.push({id:r.id,name:i(r),kind:"moon",parentName:i(s),sub:`moon of ${i(s)}`}),t.add(r.id))}}for(const s of n)s.kind==="dwarf"&&!t.has(s.id)&&(e.push({id:s.id,name:i(s),kind:s.kind,parentName:"sun",sub:"dwarf planet"}),t.add(s.id));return e}const dn=n=>n.toLowerCase().trim().replace(/\s+/g," ");function o2(n,e,t){const i=new Set;i.add(dn(e.name)),i.add(dn(e.kind));for(const s of a2[n]??[])i.add(dn(s));return t&&(i.add(dn(t)),i.add(dn(`${e.kind} of ${t}`)),i.add(dn(`${t} ${e.kind}`))),[...i]}function c2(n,e,t,i){const s=o2(n,e,i);let r=-1;if(t===dn(e.name))r=100;else if(dn(e.name).startsWith(t))r=80;else if(dn(e.name).includes(t))r=60;else{for(const a of s)if(a.includes(t)){r=a===t?70:40;break}if(r<0)return-1}return i&&dn(i).includes(t)&&(r+=10),r-=dn(e.name).length/4,r}function l2(n,e){const t=dn(e),i=mp(n);return t?i.map(r=>({e:r,s:c2(r.id,r,t,r.parentName)})).filter(r=>r.s>=0).sort((r,a)=>a.s-r.s||r.e.name.localeCompare(a.e.name)).map(r=>({id:r.e.id,name:r.e.name,kind:r.e.kind,parentName:r.e.parentName})):i.map(r=>({id:r.id,name:r.name,kind:r.kind,parentName:r.parentName}))}function $o(n,e){const t=Math.PI/180,i=n*15*t,s=e*t,r=Math.cos(s),a=r*Math.cos(i),o=r*Math.sin(i),c=Math.sin(s);return[-a,c,-o]}const kt=[{name:"Andromeda",stars:[{name:"Alpheratz",raHours:.1398,decDeg:29.0908},{name:"HIP 3092",raHours:.6554,decDeg:30.8612},{name:"Mirach",raHours:1.1622,decDeg:35.6208},{name:"Almach",raHours:2.065,decDeg:42.3298},{name:"Alfarasalkamil",raHours:23.032,decDeg:42.326},{name:"Rasalnaqa",raHours:23.6356,decDeg:43.2681},{name:"Kaffalmusalsala",raHours:23.6735,decDeg:44.334},{name:"Udkadua",raHours:23.626,decDeg:46.4592},{name:"HIP 2912",raHours:.6147,decDeg:33.7194},{name:"HIP 4436",raHours:.9459,decDeg:38.4993},{name:"HIP 3881",raHours:.8302,decDeg:41.079},{name:"Junnanmen",raHours:1.1584,decDeg:47.2418},{name:"Nembus",raHours:1.6332,decDeg:48.6285},{name:"HIP 3031",raHours:.6426,decDeg:29.3124},{name:"Shimu",raHours:.789,decDeg:24.2674},{name:"Kui",raHours:.9535,decDeg:23.4178}],lines:[[0,1],[1,2],[2,3],[4,5],[5,6],[6,7],[5,8],[8,1],[8,2],[2,9],[9,10],[10,11],[11,12],[1,13],[13,14],[14,15]]},{name:"Antlia",stars:[{name:"HIP 53502",raHours:10.9453,decDeg:-37.1375},{name:"HIP 51172",raHours:10.4525,decDeg:-31.0678},{name:"HIP 46515",raHours:9.4874,decDeg:-35.9513}],lines:[[0,1],[1,2]]},{name:"Apus",stars:[{name:"Paradys",raHours:14.7977,decDeg:-79.0447},{name:"HIP 81065",raHours:16.5576,decDeg:-78.897},{name:"HIP 80047",raHours:16.3391,decDeg:-78.6957},{name:"HIP 81852",raHours:16.7182,decDeg:-77.5166}],lines:[[0,1],[2,3],[3,1]]},{name:"Aquarius",stars:[{name:"Albali",raHours:20.7946,decDeg:-9.4957},{name:"Sadalsuud",raHours:21.526,decDeg:-5.5712},{name:"Sadalmelik",raHours:22.0964,decDeg:-.3198},{name:"Sadachbia",raHours:22.3609,decDeg:-1.3874},{name:"Sadaltager",raHours:22.4805,decDeg:-.0201},{name:"HIP 111497",raHours:22.5893,decDeg:-.1174},{name:"Seat",raHours:22.4213,decDeg:1.3774},{name:"HIP 109139",raHours:22.1073,decDeg:-13.8695},{name:"Ancha",raHours:22.2805,decDeg:-7.7832},{name:"Hydor",raHours:22.8769,decDeg:-7.5797},{name:"HIP 114724",raHours:23.2387,decDeg:-6.0485},{name:"HIP 115033",raHours:23.2984,decDeg:-9.1825},{name:"HIP 115438",raHours:23.3829,decDeg:-20.1003},{name:"Safina",raHours:23.1574,decDeg:-21.1725},{name:"Skat",raHours:22.9108,decDeg:-15.8208},{name:"HIP 112716",raHours:22.8265,decDeg:-13.5925}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[4,6],[6,2],[7,1],[2,8],[8,9],[9,10],[10,11],[11,12],[11,13],[11,14],[14,15],[15,9]]},{name:"Aquila",stars:[{name:"Alshain",raHours:19.9219,decDeg:6.4079},{name:"Altair",raHours:19.8463,decDeg:8.8674},{name:"Tarazed",raHours:19.771,decDeg:10.6133},{name:"Almizan I",raHours:19.4249,decDeg:3.1146},{name:"Al Thalimain Prior",raHours:19.1042,decDeg:-4.8823},{name:"Okab",raHours:19.0902,decDeg:13.8637},{name:"Almizan II",raHours:19.8745,decDeg:1.0057},{name:"Almizan III",raHours:20.1884,decDeg:-.8215},{name:"Deneb al Okab Borealis",raHours:18.9937,decDeg:15.0685},{name:"HIP 93429",raHours:19.028,decDeg:-5.739},{name:"Al Thalimain Posterior",raHours:19.612,decDeg:-1.2866}],lines:[[0,1],[1,2],[2,3],[3,4],[3,5],[3,6],[6,7],[8,5],[4,9],[7,10],[10,4],[4,5]]},{name:"Ara",stars:[{name:"HIP 85267",raHours:17.4232,decDeg:-56.3777},{name:"HIP 85727",raHours:17.5183,decDeg:-60.6836},{name:"HIP 82363",raHours:16.8298,decDeg:-59.0413},{name:"HIP 83081",raHours:16.977,decDeg:-55.9901},{name:"HIP 83153",raHours:16.9931,decDeg:-53.1605},{name:"HIP 85792",raHours:17.5307,decDeg:-49.876},{name:"HIP 88714",raHours:18.1105,decDeg:-50.0915},{name:"HIP 85258",raHours:17.4217,decDeg:-55.5298}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[5,7]]},{name:"Aries",stars:[{name:"Mesarthim",raHours:1.8922,decDeg:19.2941},{name:"Sheratan",raHours:1.9107,decDeg:20.8083},{name:"Hamal",raHours:2.1195,decDeg:23.4628},{name:"Bharani",raHours:2.8331,decDeg:27.2608}],lines:[[0,1],[1,2],[2,3]]},{name:"Auriga",stars:[{name:"Elnath",raHours:5.4382,decDeg:28.6079},{name:"Hassaleh",raHours:4.9499,decDeg:33.1661},{name:"Haedus",raHours:5.1086,decDeg:41.2346},{name:"Capella",raHours:5.2781,decDeg:45.999},{name:"Menkalinan",raHours:5.9922,decDeg:44.9474},{name:"Mahasim",raHours:5.9953,decDeg:37.2128},{name:"Saclateni",raHours:5.0413,decDeg:41.0759},{name:"Almaaz",raHours:5.0328,decDeg:43.8233},{name:"Prijipati",raHours:5.9921,decDeg:54.285}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[2,6],[6,7],[7,3],[3,8],[8,4]]},{name:"Boötes",stars:[{name:"Arcturus",raHours:14.2612,decDeg:19.1873},{name:"Izar",raHours:14.7498,decDeg:27.0742},{name:"Thiba",raHours:15.2584,decDeg:33.3151},{name:"Nekkar",raHours:15.0324,decDeg:40.3906},{name:"Seginus",raHours:14.5347,decDeg:38.3079},{name:"Kalasungsang",raHours:14.5305,decDeg:30.3711},{name:"Muphrid",raHours:13.9114,decDeg:18.3986},{name:"Tepiamenit",raHours:13.7878,decDeg:17.4568},{name:"HIP 71795",raHours:14.6858,decDeg:13.7283},{name:"Xuange",raHours:14.2731,decDeg:46.0879},{name:"First Donkey",raHours:14.42,decDeg:51.8517},{name:"Asellus Tertius",raHours:14.2247,decDeg:51.79}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,6],[6,7],[0,8],[4,9],[9,10],[10,11],[11,9]]},{name:"Caelum",stars:[{name:"HIP 23595",raHours:5.0734,decDeg:-35.4829},{name:"HIP 21861",raHours:4.701,decDeg:-37.1448},{name:"HIP 21770",raHours:4.6761,decDeg:-41.8636},{name:"HIP 21060",raHours:4.5139,decDeg:-44.9537}],lines:[[0,1],[1,2],[2,3]]},{name:"Camelopardalis",stars:[{name:"HIP 23040",raHours:4.9548,decDeg:53.7521},{name:"HIP 23522",raHours:5.057,decDeg:60.4423},{name:"HIP 22783",raHours:4.9008,decDeg:66.3427},{name:"Shangwei",raHours:6.3141,decDeg:69.32},{name:"Tonglingxing",raHours:7.0011,decDeg:76.9774},{name:"Shaowei",raHours:3.8393,decDeg:71.3324},{name:"Custos",raHours:3.8254,decDeg:65.526},{name:"HIP 16228",raHours:3.4845,decDeg:59.9403}],lines:[[0,1],[1,2],[2,3],[3,4],[2,5],[5,6],[6,7]]},{name:"Cancer",stars:[{name:"Acubens",raHours:8.9748,decDeg:11.8578},{name:"Asellus Australis",raHours:8.7448,decDeg:18.1549},{name:"Tarf",raHours:8.2753,decDeg:9.1857},{name:"Asellus Borealis",raHours:8.7214,decDeg:21.4686},{name:"Zubanah",raHours:8.7783,decDeg:28.76}],lines:[[0,1],[1,2],[1,3],[3,4]]},{name:"Canes Venatici",stars:[{name:"Cor Caroli",raHours:12.9338,decDeg:38.3182},{name:"Chara",raHours:12.5625,decDeg:41.3568}],lines:[[0,1]]},{name:"Canis Major",stars:[{name:"Mirzam",raHours:6.3783,decDeg:-17.9559},{name:"Sirius",raHours:6.7526,decDeg:-16.7131},{name:"Wezen",raHours:7.1399,decDeg:-26.3932},{name:"Adhara",raHours:6.9771,decDeg:-28.9721},{name:"Aludra",raHours:7.4016,decDeg:-29.3031},{name:"HIP 31592",raHours:6.6114,decDeg:-19.2557},{name:"Udra",raHours:6.9022,decDeg:-24.1842},{name:"HIP 33347",raHours:6.9356,decDeg:-17.0542},{name:"Muliphein",raHours:7.0626,decDeg:-15.6333},{name:"HIP 33160",raHours:6.9032,decDeg:-12.0386}],lines:[[0,1],[1,2],[2,3],[2,4],[0,5],[5,6],[6,3],[1,7],[7,8],[8,9],[9,7]]},{name:"Canis Minor",stars:[{name:"Procyon",raHours:7.6551,decDeg:5.2275},{name:"Gomeisa",raHours:7.4525,decDeg:8.2894}],lines:[[0,1]]},{name:"Capricornus",stars:[{name:"Algedi",raHours:20.3009,decDeg:-12.5449},{name:"Dabih",raHours:20.3502,decDeg:-14.7814},{name:"HIP 102485",raHours:20.7683,decDeg:-25.2705},{name:"HIP 102978",raHours:20.8637,decDeg:-26.9191},{name:"HIP 105881",raHours:21.4445,decDeg:-22.4114},{name:"HIP 106723",raHours:21.618,decDeg:-19.466},{name:"Deneb Algedi",raHours:21.784,decDeg:-16.1266},{name:"Nashira",raHours:21.6682,decDeg:-16.6623},{name:"Udang",raHours:21.0991,decDeg:-17.2327}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,0]]},{name:"Carina",stars:[{name:"Canopus",raHours:6.3992,decDeg:-52.6957},{name:"Miaplacidus",raHours:9.2201,decDeg:-69.7175},{name:"HIP 50099",raHours:10.229,decDeg:-70.0379},{name:"HIP 52419",raHours:10.716,decDeg:-64.3945},{name:"HIP 51576",raHours:10.5337,decDeg:-61.6854},{name:"HIP 50371",raHours:10.2847,decDeg:-61.3323},{name:"Aspidiske",raHours:9.2848,decDeg:-59.2753},{name:"Alsephina",raHours:8.7451,decDeg:-54.7086},{name:"HIP 53253",raHours:10.8915,decDeg:-58.8533},{name:"HIP 54301",raHours:11.109,decDeg:-62.4241},{name:"HIP 54751",raHours:11.21,decDeg:-60.3176},{name:"HIP 54463",raHours:11.1432,decDeg:-58.975},{name:"Avior",raHours:8.3752,decDeg:-59.5095},{name:"HIP 38827",raHours:7.9463,decDeg:-52.9824},{name:"Regor",raHours:8.1589,decDeg:-47.3366}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[4,8],[3,9],[9,10],[10,11],[11,8],[6,12],[12,13],[13,14]]},{name:"Cassiopeia",stars:[{name:"Caph",raHours:.1528,decDeg:59.1502},{name:"Schedar",raHours:.6751,decDeg:56.5374},{name:"Navi",raHours:.9451,decDeg:60.7167},{name:"Ruchbah",raHours:1.4302,decDeg:60.2354},{name:"Segin",raHours:1.9066,decDeg:63.6701}],lines:[[0,1],[1,2],[2,3],[3,4]]},{name:"Centaurus",stars:[{name:"Muhlifain",raHours:12.692,decDeg:-48.9599},{name:"HIP 66657",raHours:13.6648,decDeg:-53.4664},{name:"Hadar",raHours:14.0637,decDeg:-60.373},{name:"Rigil Kentaurus",raHours:14.6614,decDeg:-60.8351},{name:"Alnair",raHours:13.9257,decDeg:-47.2883},{name:"HIP 68282",raHours:13.978,decDeg:-44.8035},{name:"HIP 68245",raHours:13.9712,decDeg:-42.1007},{name:"HIP 71352",raHours:14.5918,decDeg:-42.1577},{name:"HIP 68862",raHours:14.1008,decDeg:-41.1796},{name:"HIP 70090",raHours:14.3426,decDeg:-37.8853},{name:"Menkent",raHours:14.1115,decDeg:-36.3687},{name:"Heng",raHours:13.8251,decDeg:-41.6877},{name:"HIP 55425",raHours:11.3501,decDeg:-54.491},{name:"HIP 59196",raHours:12.1393,decDeg:-50.7224},{name:"HIP 60823",raHours:12.4673,decDeg:-50.2306},{name:"HIP 59449",raHours:12.1942,decDeg:-52.3684},{name:"HIP 56243",raHours:11.5295,decDeg:-59.4421},{name:"HIP 65936",raHours:13.5174,decDeg:-39.4073},{name:"Kulou",raHours:13.3434,decDeg:-36.7121},{name:"HIP 61789",raHours:12.6646,decDeg:-39.9872},{name:"HIP 73334",raHours:14.986,decDeg:-42.1041}],lines:[[0,1],[1,2],[2,3],[1,4],[4,0],[4,5],[5,6],[6,7],[6,8],[8,9],[9,10],[10,11],[11,4],[12,13],[13,14],[14,0],[14,15],[15,16],[11,17],[17,18],[18,19],[7,20]]},{name:"Cepheus",stars:[{name:"Kabalfird",raHours:20.7548,decDeg:61.8368},{name:"Alderamin",raHours:21.3096,decDeg:62.5855},{name:"Alfirk",raHours:21.4777,decDeg:70.5607},{name:"HIP 112724",raHours:22.828,decDeg:66.2007},{name:"Errai",raHours:23.6558,decDeg:77.632},{name:"HIP 110991",raHours:22.4862,decDeg:58.4152},{name:"HIP 109492",raHours:22.1809,decDeg:58.2012},{name:"HIP 109857",raHours:22.2505,decDeg:57.0435},{name:"The Garnet Star",raHours:21.7251,decDeg:58.7801},{name:"Al Kidr",raHours:20.493,decDeg:62.9941}],lines:[[0,1],[1,2],[2,3],[2,4],[4,3],[3,5],[5,6],[6,7],[7,8],[8,1],[9,0]]},{name:"Cetus",stars:[{name:"Kaffaljidhma",raHours:2.7217,decDeg:3.2362},{name:"Menkar",raHours:3.038,decDeg:4.0899},{name:"Menkar (13954)",raHours:2.9952,decDeg:8.9074},{name:"Al Kaff al Jidhmah IV",raHours:2.749,decDeg:10.1142},{name:"Al Kaff al Jidhmah II",raHours:2.4693,decDeg:8.4601},{name:"Al Kaff al Jidhmah III",raHours:2.658,decDeg:.3285},{name:"Mira",raHours:2.3224,decDeg:-2.9771},{name:"Baten Kaitos",raHours:1.8577,decDeg:-10.3349},{name:"Al Naymat II",raHours:1.7348,decDeg:-15.9396},{name:"Diphda",raHours:.7265,decDeg:-17.9867},{name:"Deneb Kaitos Shemali",raHours:.3238,decDeg:-8.8238},{name:"Dheneb",raHours:1.1431,decDeg:-10.1819},{name:"Al Naymat I",raHours:1.4004,decDeg:-8.1828}],lines:[[0,1],[1,2],[2,3],[3,4],[4,0],[0,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,7]]},{name:"Chamaeleon",stars:[{name:"HIP 40702",raHours:8.3087,decDeg:-76.92},{name:"HIP 51839",raHours:10.5912,decDeg:-78.6078},{name:"HIP 52633",raHours:10.7631,decDeg:-80.5402},{name:"HIP 60000",raHours:12.3058,decDeg:-79.3123},{name:"HIP 58484",raHours:11.9938,decDeg:-78.2218}],lines:[[0,1],[1,2],[2,3],[3,4],[4,1]]},{name:"Circinus",stars:[{name:"HIP 74824",raHours:15.2919,decDeg:-58.8009},{name:"Xami",raHours:14.7085,decDeg:-64.9746},{name:"HIP 75323",raHours:15.3896,decDeg:-59.3207}],lines:[[0,1],[1,2]]},{name:"Columba",stars:[{name:"Phact",raHours:5.6608,decDeg:-34.074},{name:"Wazn",raHours:5.8493,decDeg:-35.7693},{name:"HIP 25859",raHours:5.5202,decDeg:-35.4704},{name:"HIP 28328",raHours:5.9858,decDeg:-42.8151},{name:"HIP 28199",raHours:5.9589,decDeg:-35.2833},{name:"HIP 30277",raHours:6.3686,decDeg:-33.4363}],lines:[[0,1],[2,0],[3,1],[1,4],[4,5]]},{name:"Coma Berenices",stars:[{name:"Diadem",raHours:13.1665,decDeg:17.5291},{name:"HIP 64394",raHours:13.198,decDeg:27.876},{name:"Al Dafirah",raHours:12.449,decDeg:28.2686}],lines:[[0,1],[1,2]]},{name:"Corona Australis",stars:[{name:"HIP 93825",raHours:19.107,decDeg:-37.0628},{name:"Meridiana",raHours:19.1579,decDeg:-37.9042},{name:"HIP 94160",raHours:19.1672,decDeg:-39.3407},{name:"HIP 94005",raHours:19.1391,decDeg:-40.4966},{name:"HIP 90982",raHours:18.5584,decDeg:-42.3125}],lines:[[0,1],[1,2],[2,3],[3,4]]},{name:"Corona Borealis",stars:[{name:"Guansuo",raHours:15.5488,decDeg:31.3592},{name:"Nusakan",raHours:15.4638,decDeg:29.1055},{name:"Alphecca",raHours:15.5781,decDeg:26.7149},{name:"Baltesha",raHours:15.7124,decDeg:26.2955},{name:"Matrichakra",raHours:15.8266,decDeg:26.0685},{name:"HIP 78159",raHours:15.9598,decDeg:26.878},{name:"Aurwandilsta",raHours:16.0241,decDeg:29.8511}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]]},{name:"Corvus",stars:[{name:"Algorab",raHours:12.4978,decDeg:-16.5151},{name:"Gienah",raHours:12.2635,decDeg:-17.542},{name:"Minkar",raHours:12.1688,decDeg:-22.6198},{name:"Kraz",raHours:12.5731,decDeg:-23.3966},{name:"Alchiba",raHours:12.1402,decDeg:-24.7288}],lines:[[0,1],[1,2],[2,3],[3,0],[2,4]]},{name:"Crater",stars:[{name:"Alkes",raHours:10.9963,decDeg:-18.2991},{name:"Al Sharasif",raHours:11.1943,decDeg:-22.8256},{name:"HIP 55705",raHours:11.4147,decDeg:-17.684},{name:"HIP 57283",raHours:11.746,decDeg:-18.3506},{name:"HIP 58188",raHours:11.9336,decDeg:-17.1508},{name:"HIP 55282",raHours:11.3224,decDeg:-14.779},{name:"HIP 55687",raHours:11.4102,decDeg:-10.8594},{name:"HIP 56633",raHours:11.6114,decDeg:-9.8023}],lines:[[0,1],[1,2],[2,3],[3,4],[2,5],[5,6],[6,7],[5,0]]},{name:"Crux",stars:[{name:"Acrux",raHours:12.4433,decDeg:-63.0991},{name:"Gacrux",raHours:12.5194,decDeg:-57.1126},{name:"Mimosa",raHours:12.7954,decDeg:-59.6887},{name:"Imai",raHours:12.2524,decDeg:-58.7489}],lines:[[0,1],[2,3]]},{name:"Cygnus",stars:[{name:"Deneb",raHours:20.6905,decDeg:45.2803},{name:"Sadr",raHours:20.3705,decDeg:40.2567},{name:"Aljanah",raHours:20.7701,decDeg:33.9695},{name:"Albireo",raHours:19.512,decDeg:27.9597},{name:"Fawaris",raHours:19.7496,decDeg:45.1307},{name:"HIP 95853",raHours:19.4951,decDeg:51.7295},{name:"Fawaris I",raHours:19.285,decDeg:53.3682},{name:"HIP 99848",raHours:20.2579,decDeg:47.7142},{name:"HIP 103413",raHours:20.9529,decDeg:41.1672},{name:"Fawaris III",raHours:21.2156,decDeg:30.2271}],lines:[[0,1],[1,2],[1,3],[1,4],[4,5],[5,6],[5,7],[7,0],[0,8],[8,9],[9,2]]},{name:"Delphinus",stars:[{name:"Aldulfin",raHours:20.5535,decDeg:11.3033},{name:"Rotanev",raHours:20.6258,decDeg:14.5952},{name:"Sualocin",raHours:20.6606,decDeg:15.9121},{name:"Al Salib",raHours:20.7776,decDeg:16.1248},{name:"Al Ukud",raHours:20.7243,decDeg:15.0747}],lines:[[0,1],[1,2],[2,3],[3,4],[4,1]]},{name:"Dorado",stars:[{name:"HIP 19893",raHours:4.2671,decDeg:-51.4871},{name:"HIP 21281",raHours:4.5666,decDeg:-55.045},{name:"HIP 23693",raHours:5.0919,decDeg:-57.473},{name:"HIP 26069",raHours:5.5604,decDeg:-62.4899},{name:"HIP 27100",raHours:5.7462,decDeg:-65.7355},{name:"HIP 27890",raHours:5.9016,decDeg:-63.091}],lines:[[0,1],[1,2],[2,3],[3,1],[3,4],[4,5],[5,3]]},{name:"Draco",stars:[{name:"Giausar",raHours:11.5234,decDeg:69.3311},{name:"HIP 61281",raHours:12.5581,decDeg:69.7882},{name:"Thuban",raHours:14.0732,decDeg:64.3758},{name:"Edasich",raHours:15.4155,decDeg:58.966},{name:"HIP 78527",raHours:16.0316,decDeg:58.5644},{name:"Athebyne",raHours:16.3999,decDeg:61.5141},{name:"Aldhibah",raHours:17.1465,decDeg:65.7146},{name:"Aldhiba",raHours:18.346,decDeg:71.3377},{name:"Alahakan",raHours:18.3506,decDeg:72.7337},{name:"Altais",raHours:19.2092,decDeg:67.6613},{name:"Tyl",raHours:19.8028,decDeg:70.2678},{name:"Grumium",raHours:17.8921,decDeg:56.8725},{name:"Kuma",raHours:17.5377,decDeg:55.1728},{name:"Rastaban",raHours:17.5072,decDeg:52.3014},{name:"Eltanin",raHours:17.9434,decDeg:51.489}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[7,9],[9,10],[9,11],[11,12],[12,13],[13,14],[14,11]]},{name:"Equuleus",stars:[{name:"Kitalpha",raHours:21.2637,decDeg:5.2481},{name:"HIP 104858",raHours:21.2413,decDeg:10.0077},{name:"HIP 104521",raHours:21.1724,decDeg:10.1319}],lines:[[0,1],[1,2]]},{name:"Eridanus",stars:[{name:"Cursa",raHours:5.1308,decDeg:-5.0863},{name:"HIP 22109",raHours:4.7584,decDeg:-3.2546},{name:"HIP 21444",raHours:4.6053,decDeg:-3.3524},{name:"Beid",raHours:4.1978,decDeg:-6.8378},{name:"Zaurak",raHours:3.9671,decDeg:-13.5082},{name:"HIP 17593",raHours:3.769,decDeg:-12.1017},{name:"Rana",raHours:3.7208,decDeg:-9.7652},{name:"Ran",raHours:3.549,decDeg:-9.4583},{name:"Azha",raHours:2.9404,decDeg:-8.8976},{name:"Sadr al Kaitos IV",raHours:2.7354,decDeg:-13.8587},{name:"HIP 12843",raHours:2.7517,decDeg:-18.5727},{name:"HIP 14146",raHours:3.0399,decDeg:-23.6243},{name:"HIP 15474",raHours:3.3253,decDeg:-21.7579},{name:"HIP 16611",raHours:3.5631,decDeg:-21.6328},{name:"HIP 17651",raHours:3.7808,decDeg:-23.2484},{name:"HIP 18216",raHours:3.8952,decDeg:-24.6122},{name:"HIP 18673",raHours:3.9987,decDeg:-24.0163},{name:"Beemim",raHours:4.5585,decDeg:-29.7658},{name:"Theemin",raHours:4.5925,decDeg:-30.5623},{name:"Beemim (20535)",raHours:4.4006,decDeg:-34.017},{name:"Beemim I",raHours:4.2982,decDeg:-33.7983},{name:"HIP 17874",raHours:3.8242,decDeg:-36.2001},{name:"HIP 16870",raHours:3.6182,decDeg:-40.2745},{name:"HIP 15510",raHours:3.3315,decDeg:-43.0715},{name:"Acamar",raHours:2.971,decDeg:-40.3047},{name:"HIP 12486",raHours:2.6778,decDeg:-39.8553},{name:"HIP 12413",raHours:2.6633,decDeg:-42.8916},{name:"HIP 11407",raHours:2.4498,decDeg:-47.7038},{name:"HIP 9007",raHours:1.9325,decDeg:-51.6096},{name:"Achernar",raHours:1.6285,decDeg:-57.2367}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],[17,18],[18,19],[19,20],[20,21],[21,22],[22,23],[23,24],[24,25],[25,26],[26,27],[27,28],[28,29]]},{name:"Fornax",stars:[{name:"Dalim",raHours:3.2012,decDeg:-28.9891},{name:"HIP 13147",raHours:2.8182,decDeg:-32.4063},{name:"HIP 9677",raHours:2.0748,decDeg:-29.2968}],lines:[[0,1],[1,2]]},{name:"Gemini",stars:[{name:"Alzirr",raHours:6.7548,decDeg:12.8961},{name:"HIP 35350",raHours:7.3016,decDeg:16.5405},{name:"Wasat",raHours:7.3354,decDeg:21.9823},{name:"Mekbuda",raHours:7.0685,decDeg:20.5703},{name:"Alhena",raHours:6.6285,decDeg:16.3994},{name:"HIP 36962",raHours:7.5987,decDeg:26.896},{name:"HIP 37740",raHours:7.7408,decDeg:24.3981},{name:"Pollux",raHours:7.7554,decDeg:28.0263},{name:"HIP 36046",raHours:7.4288,decDeg:27.7983},{name:"HIP 34693",raHours:7.1857,decDeg:30.2453},{name:"Castor",raHours:7.5767,decDeg:31.8886},{name:"HIP 33018",raHours:6.8798,decDeg:33.9614},{name:"Mebsuta",raHours:6.7322,decDeg:25.1312},{name:"Nucatai",raHours:6.4827,decDeg:20.2122},{name:"Tejat",raHours:6.3827,decDeg:22.5139},{name:"Propus",raHours:6.248,decDeg:22.5068},{name:"HIP 28734",raHours:6.0687,decDeg:23.2636}],lines:[[0,1],[1,2],[2,3],[3,4],[2,5],[5,6],[5,7],[5,8],[8,9],[9,10],[9,11],[9,12],[12,13],[12,14],[14,15],[15,16]]},{name:"Grus",stars:[{name:"Aldhanab",raHours:21.8988,decDeg:-37.3648},{name:"HIP 109111",raHours:22.1019,decDeg:-39.543},{name:"HIP 110997",raHours:22.4878,decDeg:-43.4956},{name:"Alnair",raHours:22.1372,decDeg:-46.9606},{name:"Tiaki",raHours:22.7111,decDeg:-46.8846},{name:"HIP 112623",raHours:22.8092,decDeg:-51.3167},{name:"HIP 113638",raHours:23.0147,decDeg:-52.7541}],lines:[[0,1],[1,2],[2,3],[3,4],[4,2],[4,5],[5,6]]},{name:"Hercules",stars:[{name:"Sarin",raHours:17.2505,decDeg:24.8396},{name:"Rasalgethi",raHours:17.2441,decDeg:14.3903},{name:"Kornephoros",raHours:16.5037,decDeg:21.4896},{name:"Nasak Shamiya III",raHours:16.3653,decDeg:19.153},{name:"Tianji",raHours:16.6882,decDeg:31.6019},{name:"Khepdenreret",raHours:17.0048,decDeg:30.9263},{name:"HIP 81833",raHours:16.7149,decDeg:38.9225},{name:"HIP 81126",raHours:16.5684,decDeg:42.4369},{name:"Asuusiha",raHours:16.329,decDeg:46.3133},{name:"Nuchuang",raHours:17.2508,decDeg:36.8092},{name:"HIP 85112",raHours:17.3947,decDeg:37.1459},{name:"HIP 87808",raHours:17.9375,decDeg:37.2505},{name:"Tianbang",raHours:17.6577,decDeg:46.0063},{name:"Maasym",raHours:17.5123,decDeg:26.1106},{name:"HIP 86974",raHours:17.7744,decDeg:27.7225},{name:"HIP 87933",raHours:17.9627,decDeg:29.2479},{name:"HIP 88794",raHours:18.1257,decDeg:28.7625},{name:"HIP 77760",raHours:15.8778,decDeg:42.45},{name:"HIP 79101",raHours:16.1462,decDeg:44.9348},{name:"Cujam",raHours:16.4236,decDeg:14.0334},{name:"HIP 81008",raHours:16.5434,decDeg:11.4882}],lines:[[0,1],[1,2],[2,3],[2,4],[4,5],[4,6],[6,7],[7,8],[6,9],[9,10],[10,11],[11,12],[9,5],[5,0],[0,13],[13,14],[14,15],[15,16],[17,18],[18,8],[3,19],[19,20]]},{name:"Horologium",stars:[{name:"HIP 19747",raHours:4.2334,decDeg:-42.2939},{name:"HIP 12653",raHours:2.7092,decDeg:-50.8008},{name:"HIP 12225",raHours:2.6234,decDeg:-52.5431},{name:"HIP 12484",raHours:2.6777,decDeg:-54.5499},{name:"HIP 14240",raHours:3.0603,decDeg:-59.7376},{name:"HIP 13884",raHours:2.9799,decDeg:-64.0713}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5]]},{name:"Hydra",stars:[{name:"Minazal IV",raHours:8.8072,decDeg:5.8379},{name:"Minazal II",raHours:8.7204,decDeg:3.3987},{name:"Minchir",raHours:8.646,decDeg:3.3415},{name:"Minazal I",raHours:8.6276,decDeg:5.7038},{name:"Ashlesha",raHours:8.7796,decDeg:6.4189},{name:"Minazal V",raHours:8.9232,decDeg:5.9455},{name:"HIP 45336",raHours:9.2394,decDeg:2.315},{name:"Ukdah",raHours:9.6643,decDeg:-1.1427},{name:"Alphard",raHours:9.4598,decDeg:-8.6587},{name:"Zhang",raHours:9.858,decDeg:-14.8465},{name:"HIP 49402",raHours:10.0854,decDeg:-13.0647},{name:"HIP 49841",raHours:10.1765,decDeg:-12.3538},{name:"HIP 51069",raHours:10.4349,decDeg:-16.8361},{name:"HIP 52943",raHours:10.8271,decDeg:-16.1941},{name:"Alkes",raHours:10.9963,decDeg:-18.2991},{name:"Al Sharasif",raHours:11.1943,decDeg:-22.8256},{name:"HIP 56343",raHours:11.5501,decDeg:-31.8575},{name:"HIP 57936",raHours:11.8818,decDeg:-33.9081},{name:"Naga",raHours:13.3153,decDeg:-23.1714},{name:"HIP 68895",raHours:14.1062,decDeg:-26.682},{name:"Solitaire",raHours:14.8382,decDeg:-27.9602}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[15,16],[16,17],[17,18],[18,19],[19,20]]},{name:"Hydrus",stars:[{name:"HIP 2021",raHours:.4276,decDeg:-77.255},{name:"HIP 17678",raHours:3.7873,decDeg:-74.2392},{name:"HIP 11001",raHours:2.3625,decDeg:-68.6594},{name:"HIP 9236",raHours:1.9794,decDeg:-61.5699}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Indus",stars:[{name:"HIP 103227",raHours:20.9135,decDeg:-58.4541},{name:"HIP 102333",raHours:20.7339,decDeg:-51.9208},{name:"Persian",raHours:20.6261,decDeg:-47.2917},{name:"HIP 105319",raHours:21.3311,decDeg:-53.4493},{name:"HIP 108431",raHours:21.9653,decDeg:-54.9926}],lines:[[0,1],[1,2],[2,3],[3,4],[4,0]]},{name:"Lacerta",stars:[{name:"HIP 111022",raHours:22.4922,decDeg:47.7069},{name:"Stellio",raHours:22.5215,decDeg:50.2824},{name:"HIP 110538",raHours:22.3927,decDeg:52.2295},{name:"HIP 110609",raHours:22.4086,decDeg:49.4764},{name:"HIP 110351",raHours:22.3504,decDeg:46.5366},{name:"HIP 111104",raHours:22.5081,decDeg:43.1234},{name:"HIP 111944",raHours:22.6752,decDeg:44.2763},{name:"HIP 109754",raHours:22.2313,decDeg:39.7149},{name:"HIP 109937",raHours:22.2662,decDeg:37.7487}],lines:[[0,1],[1,2],[2,3],[3,0],[0,4],[4,5],[5,6],[6,0],[5,7],[7,8]]},{name:"Leo",stars:[{name:"Regulus",raHours:10.1396,decDeg:11.9672},{name:"Al Jabhah",raHours:10.1222,decDeg:16.7627},{name:"Algieba",raHours:10.3328,decDeg:19.8419},{name:"Adhafera",raHours:10.2782,decDeg:23.4173},{name:"Rasalas",raHours:9.8794,decDeg:26.0071},{name:"Algenubi",raHours:9.7642,decDeg:23.7743},{name:"Zosma",raHours:11.2351,decDeg:20.524},{name:"Denebola",raHours:11.8177,decDeg:14.5723},{name:"Chertan",raHours:11.2373,decDeg:15.4298},{name:"Al Minlear al Asad",raHours:9.4109,decDeg:26.1824},{name:"Alterf",raHours:9.5287,decDeg:22.9681},{name:"Tsze Tseang",raHours:11.3987,decDeg:10.5297},{name:"HIP 55434",raHours:11.3523,decDeg:6.0294}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[2,6],[6,7],[7,8],[8,6],[8,1],[4,9],[9,10],[10,5],[5,1],[8,11],[11,12]]},{name:"Leo Minor",stars:[{name:"HIP 46952",raHours:9.5704,decDeg:36.3976},{name:"HIP 49593",raHours:10.1238,decDeg:35.2447},{name:"HIP 51233",raHours:10.4647,decDeg:36.7075},{name:"Praecipua",raHours:10.8885,decDeg:34.2156},{name:"HIP 51056",raHours:10.4319,decDeg:33.7963}],lines:[[0,1],[1,2],[2,3],[3,4],[4,1]]},{name:"Lepus",stars:[{name:"Ping",raHours:5.091,decDeg:-22.3709},{name:"Bade",raHours:5.2155,decDeg:-16.2054},{name:"Arneb",raHours:5.5455,decDeg:-17.8223},{name:"Nihal",raHours:5.4708,decDeg:-20.7592},{name:"HIP 24845",raHours:5.3263,decDeg:-13.1768},{name:"HIP 24327",raHours:5.2205,decDeg:-12.9413},{name:"Kursi al Jabbar",raHours:5.7411,decDeg:-22.4475},{name:"Arsh al Jauzah",raHours:5.8553,decDeg:-20.8775},{name:"HIP 28910",raHours:6.1026,decDeg:-14.9353},{name:"HIP 28103",raHours:5.9401,decDeg:-14.168},{name:"Darlugal",raHours:5.7826,decDeg:-14.8219}],lines:[[0,1],[1,2],[2,3],[3,0],[4,1],[1,5],[3,6],[6,7],[7,8],[8,9],[9,10],[10,2]]},{name:"Libra",stars:[{name:"Zubenelgenubi",raHours:14.848,decDeg:-16.0416},{name:"Zubeneschamali",raHours:15.2835,decDeg:-9.3829},{name:"Brachium",raHours:15.0679,decDeg:-25.2819},{name:"Zubenelhakrabi",raHours:15.5921,decDeg:-14.7896},{name:"HIP 76470",raHours:15.6171,decDeg:-28.1351},{name:"HIP 76600",raHours:15.6443,decDeg:-29.7777}],lines:[[0,1],[0,2],[1,3],[3,0],[3,4],[4,5]]},{name:"Lupus",stars:[{name:"Uridim",raHours:14.6988,decDeg:-47.3881},{name:"HIP 74395",raHours:15.2048,decDeg:-52.0991},{name:"HIP 75264",raHours:15.378,decDeg:-44.6896},{name:"HIP 76297",raHours:15.5857,decDeg:-41.1667},{name:"HIP 75141",raHours:15.3562,decDeg:-40.6475},{name:"HIP 73273",raHours:14.9755,decDeg:-43.1339},{name:"HIP 78384",raHours:16.002,decDeg:-38.3966},{name:"HIP 75177",raHours:15.3635,decDeg:-36.2612},{name:"HIP 77634",raHours:15.8493,decDeg:-33.6271}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[3,6],[6,7],[7,8],[8,6],[6,1]]},{name:"Lynx",stars:[{name:"HIP 45860",raHours:9.351,decDeg:34.3925},{name:"HIP 45688",raHours:9.3141,decDeg:36.8029},{name:"HIP 44700",raHours:9.1088,decDeg:38.4523},{name:"HIP 44248",raHours:9.0108,decDeg:41.7834},{name:"Alsciaukat",raHours:8.3806,decDeg:43.1884},{name:"HIP 36145",raHours:7.4452,decDeg:49.2116},{name:"HIP 33449",raHours:6.9546,decDeg:58.4231},{name:"HIP 30060",raHours:6.3271,decDeg:59.0109}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]},{name:"Lyra",stars:[{name:"Vega",raHours:18.6156,decDeg:38.783},{name:"Double Double I",raHours:18.739,decDeg:39.67},{name:"Nasr Alwaki I",raHours:18.7462,decDeg:37.6051},{name:"Jiantai",raHours:18.9084,decDeg:36.8986},{name:"Sulafat",raHours:18.9824,decDeg:32.6896},{name:"Sheliak",raHours:18.8347,decDeg:33.3627}],lines:[[0,1],[1,2],[2,0],[2,3],[3,4],[4,5],[5,2]]},{name:"Mensa",stars:[{name:"Hoerikwaggo",raHours:6.1706,decDeg:-74.7525},{name:"HIP 23467",raHours:5.0453,decDeg:-71.3143}],lines:[[0,1]]},{name:"Microscopium",stars:[{name:"HIP 102831",raHours:20.8328,decDeg:-33.7797},{name:"HIP 102989",raHours:20.8663,decDeg:-33.178}],lines:[[0,1]]},{name:"Monoceros",stars:[{name:"HIP 31978",raHours:6.683,decDeg:9.8958},{name:"HIP 31216",raHours:6.5484,decDeg:7.333},{name:"HIP 30419",raHours:6.3961,decDeg:4.5928},{name:"HIP 32578",raHours:6.7977,decDeg:2.4122},{name:"HIP 34769",raHours:7.1977,decDeg:-.4928},{name:"HIP 30867",raHours:6.4803,decDeg:-7.0331},{name:"HIP 29651",raHours:6.2476,decDeg:-6.2747},{name:"HIP 39863",raHours:8.1432,decDeg:-2.9838},{name:"HIP 37447",raHours:7.6875,decDeg:-9.5511}],lines:[[0,1],[1,2],[2,3],[3,1],[3,4],[4,5],[5,6],[4,7],[7,8]]},{name:"Musca",stars:[{name:"HIP 57363",raHours:11.7602,decDeg:-66.7288},{name:"HIP 59929",raHours:12.293,decDeg:-67.9607},{name:"HIP 61585",raHours:12.6197,decDeg:-69.1355},{name:"HIP 62322",raHours:12.7714,decDeg:-68.1081},{name:"HIP 63613",raHours:13.0377,decDeg:-71.5488},{name:"HIP 61199",raHours:12.5411,decDeg:-72.133}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,2]]},{name:"Norma",stars:[{name:"HIP 78639",raHours:16.0536,decDeg:-49.2297},{name:"HIP 80000",raHours:16.3307,decDeg:-50.1554},{name:"Yaqana",raHours:16.4531,decDeg:-47.5547},{name:"HIP 78914",raHours:16.1082,decDeg:-45.1733}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Octans",stars:[{name:"HIP 70638",raHours:14.4488,decDeg:-83.6679},{name:"HIP 107089",raHours:21.6912,decDeg:-77.3895},{name:"HIP 112405",raHours:22.7677,decDeg:-81.3816}],lines:[[0,1],[1,2],[2,0]]},{name:"Ophiuchus",stars:[{name:"Rasalhague",raHours:17.5822,decDeg:12.5606},{name:"HIP 83000",raHours:16.9612,decDeg:9.3751},{name:"Marfik",raHours:16.5152,decDeg:1.9841},{name:"Yed Prior",raHours:16.2391,decDeg:-3.694},{name:"Yed Posterior",raHours:16.3053,decDeg:-4.6926},{name:"HIP 80628",raHours:16.4634,decDeg:-8.3717},{name:"Saik",raHours:16.6193,decDeg:-10.5672},{name:"Sabik",raHours:17.173,decDeg:-15.7251},{name:"Cebalrai",raHours:17.7245,decDeg:4.5669},{name:"Muliphen",raHours:17.7982,decDeg:2.7075},{name:"HIP 88048",raHours:17.9838,decDeg:-9.7733},{name:"Garafsa",raHours:17.3668,decDeg:-24.9995},{name:"HIP 85423",raHours:17.4559,decDeg:-29.8667},{name:"HIP 80894",raHours:16.519,decDeg:-16.6126},{name:"HIP 80569",raHours:16.4504,decDeg:-18.4562},{name:"HIP 80343",raHours:16.4017,decDeg:-20.0372},{name:"HIP 80473",raHours:16.4264,decDeg:-23.4471}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[1,6],[6,7],[7,8],[8,9],[9,10],[8,0],[7,11],[11,12],[6,13],[13,14],[14,15],[15,16]]},{name:"Orion",stars:[{name:"Betelgeuse",raHours:5.9195,decDeg:7.407},{name:"Alnitak",raHours:5.6793,decDeg:-1.9426},{name:"Saiph",raHours:5.7959,decDeg:-9.6696},{name:"Alnilam",raHours:5.6036,decDeg:-1.2019},{name:"Mintaka",raHours:5.5334,decDeg:-.2991},{name:"Bellatrix",raHours:5.4189,decDeg:6.3497},{name:"Saif al Jabbar",raHours:5.4079,decDeg:-2.3971},{name:"Rigel",raHours:5.2423,decDeg:-8.2016},{name:"Meissa",raHours:5.5856,decDeg:9.9342},{name:"HIP 23607",raHours:5.0761,decDeg:15.4042},{name:"Al Kumm II",raHours:4.9395,decDeg:13.5146},{name:"Al Taj IV",raHours:4.9149,decDeg:10.1511},{name:"Al Taj I",raHours:4.8435,decDeg:8.9003},{name:"Tabit",raHours:4.8306,decDeg:6.9612},{name:"Al Taj II",raHours:4.8534,decDeg:5.6051},{name:"Al Taj III",raHours:4.9042,decDeg:2.4407},{name:"Al Taj V",raHours:4.9758,decDeg:1.714},{name:"HIP 28614",raHours:6.0397,decDeg:9.6474},{name:"HIP 29038",raHours:6.1262,decDeg:14.7685},{name:"HIP 29426",raHours:6.199,decDeg:14.2088},{name:"HIP 28716",raHours:6.0653,decDeg:20.1385},{name:"HIP 27913",raHours:5.9064,decDeg:20.2764}],lines:[[0,1],[1,2],[1,3],[3,4],[4,5],[4,6],[6,7],[0,5],[5,8],[8,0],[9,10],[10,11],[11,12],[12,13],[13,5],[13,14],[14,15],[15,16],[0,17],[17,18],[19,20],[20,21],[21,18]]},{name:"Pavo",stars:[{name:"Peacock",raHours:20.4275,decDeg:-56.7349},{name:"HIP 99240",raHours:20.145,decDeg:-66.1793},{name:"HIP 102395",raHours:20.7493,decDeg:-66.2032},{name:"HIP 105858",raHours:21.4407,decDeg:-65.3681},{name:"HIP 91792",raHours:18.7173,decDeg:-71.4277},{name:"HIP 98495",raHours:20.0098,decDeg:-72.9102},{name:"HIP 93015",raHours:18.9492,decDeg:-67.2335},{name:"HIP 88866",raHours:18.143,decDeg:-63.668},{name:"HIP 86929",raHours:17.7622,decDeg:-64.7237},{name:"HIP 90098",raHours:18.3871,decDeg:-61.4939},{name:"HIP 92609",raHours:18.8703,decDeg:-62.1876}],lines:[[0,1],[1,2],[0,3],[3,2],[4,1],[1,5],[1,6],[6,7],[7,8],[7,9],[9,10],[10,1]]},{name:"Pegasus",stars:[{name:"HIP 109410",raHours:22.1665,decDeg:33.1783},{name:"Matar",raHours:22.7167,decDeg:30.2213},{name:"Scheat",raHours:23.0629,decDeg:28.0825},{name:"Sadalbari",raHours:22.8334,decDeg:24.6017},{name:"Sadalnazi",raHours:22.7755,decDeg:23.5657},{name:"HIP 109176",raHours:22.1168,decDeg:25.345},{name:"HIP 107354",raHours:21.7441,decDeg:25.645},{name:"Alpheratz",raHours:.1398,decDeg:29.0908},{name:"Markab",raHours:23.0793,decDeg:15.2054},{name:"Algenib",raHours:.2206,decDeg:15.1836},{name:"Enif",raHours:21.7364,decDeg:9.875},{name:"Biham",raHours:22.1699,decDeg:6.1978},{name:"Homam",raHours:22.691,decDeg:10.8314}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[7,2],[2,8],[8,9],[9,7],[10,11],[11,12],[12,8]]},{name:"Perseus",stars:[{name:"Atik",raHours:3.7386,decDeg:32.2883},{name:"Atik (18246)",raHours:3.9022,decDeg:31.8837},{name:"Menkib",raHours:3.9827,decDeg:35.791},{name:"Aldu",raHours:3.9642,decDeg:40.0103},{name:"Sarvvis",raHours:3.7154,decDeg:47.7877},{name:"Mirfak",raHours:3.4054,decDeg:49.8612},{name:"HIP 14328",raHours:3.0799,decDeg:53.5065},{name:"Miram",raHours:2.8449,decDeg:55.8955},{name:"HIP 13531",raHours:2.9043,decDeg:52.7625},{name:"HIP 14632",raHours:3.1508,decDeg:49.6135},{name:"Misam",raHours:3.1582,decDeg:44.8579},{name:"Algol",raHours:3.1361,decDeg:40.9557},{name:"Gorgonea Tertia",raHours:3.0862,decDeg:38.8405},{name:"HIP 19343",raHours:4.1444,decDeg:47.7126},{name:"HIP 19812",raHours:4.2483,decDeg:48.4094},{name:"HIP 20070",raHours:4.304,decDeg:50.2956},{name:"HIP 19167",raHours:4.1097,decDeg:50.3514},{name:"HIP 12777",raHours:2.7366,decDeg:49.2287},{name:"Dajiangjunbei",raHours:1.7277,decDeg:50.6888}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,6],[8,9],[9,5],[9,10],[10,11],[11,3],[11,12],[4,13],[13,14],[14,15],[15,16],[9,17],[17,18]]},{name:"Phoenix",stars:[{name:"Ankaa",raHours:.438,decDeg:-42.3051},{name:"Alrial III",raHours:1.1014,decDeg:-46.7185},{name:"Alrial V",raHours:1.4728,decDeg:-43.3177},{name:"HIP 765",raHours:.1568,decDeg:-45.747},{name:"Wurren",raHours:1.1397,decDeg:-55.2458},{name:"HIP 7083",raHours:1.5208,decDeg:-49.0731}],lines:[[0,1],[1,2],[0,3],[3,1],[1,4],[4,5],[5,2]]},{name:"Pictor",stars:[{name:"HIP 32607",raHours:6.8032,decDeg:-61.942},{name:"HIP 27530",raHours:5.8304,decDeg:-56.1665},{name:"HIP 27321",raHours:5.7881,decDeg:-51.0667}],lines:[[0,1],[1,2]]},{name:"Pisces",stars:[{name:"HIP 5742",raHours:1.2291,decDeg:24.5838},{name:"HIP 6193",raHours:1.3244,decDeg:27.2641},{name:"HIP 5586",raHours:1.1943,decDeg:30.0897},{name:"Alpherg",raHours:1.5247,decDeg:15.3458},{name:"Torcular",raHours:1.7566,decDeg:9.1576},{name:"Alrescha",raHours:2.0341,decDeg:2.7638},{name:"HIP 7884",raHours:1.6905,decDeg:5.4876},{name:"HIP 4906",raHours:1.0491,decDeg:7.8901},{name:"Kuton I",raHours:.8114,decDeg:7.5852},{name:"HIP 118268",raHours:23.9885,decDeg:6.8636},{name:"HIP 116771",raHours:23.6658,decDeg:5.6274},{name:"HIP 115830",raHours:23.4662,decDeg:6.3791},{name:"HIP 114971",raHours:23.286,decDeg:3.2822},{name:"HIP 115738",raHours:23.4489,decDeg:1.2558},{name:"HIP 116928",raHours:23.7008,decDeg:1.7804}],lines:[[0,1],[1,2],[2,0],[0,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,10]]},{name:"Piscis Austrinus",stars:[{name:"Fomalhaut",raHours:22.9608,decDeg:-29.6218},{name:"HIP 113246",raHours:22.9325,decDeg:-32.5397},{name:"HIP 112948",raHours:22.8754,decDeg:-32.8755},{name:"Fum al Hui",raHours:22.5251,decDeg:-32.346},{name:"HIP 109285",raHours:22.1397,decDeg:-32.9884},{name:"HIP 107380",raHours:21.7491,decDeg:-33.0256},{name:"HIP 107608",raHours:21.7956,decDeg:-30.8983},{name:"HIP 111954",raHours:22.6776,decDeg:-27.0436}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,4],[4,7],[7,0]]},{name:"Puppis",stars:[{name:"Regor",raHours:8.1589,decDeg:-47.3366},{name:"Naos",raHours:8.0597,decDeg:-40.0032},{name:"Tureis",raHours:8.1258,decDeg:-24.3044},{name:"Azmidi",raHours:7.8216,decDeg:-24.8598},{name:"HIP 37229",raHours:7.6472,decDeg:-26.8039},{name:"HIP 36917",raHours:7.5897,decDeg:-28.3693},{name:"HIP 35264",raHours:7.2857,decDeg:-37.0975},{name:"Pipit",raHours:6.6294,decDeg:-43.1959},{name:"Canopus",raHours:6.3992,decDeg:-52.6957},{name:"HIP 37677",raHours:7.7301,decDeg:-28.9548},{name:"HIP 38070",raHours:7.8014,decDeg:-25.9372}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,3]]},{name:"Pyxis",stars:[{name:"Naos",raHours:8.0597,decDeg:-40.0032},{name:"HIP 42515",raHours:8.6684,decDeg:-35.3083},{name:"HIP 42828",raHours:8.7265,decDeg:-33.1864},{name:"HIP 43409",raHours:8.8422,decDeg:-27.7101}],lines:[[0,1],[1,2],[2,3]]},{name:"Reticulum",stars:[{name:"Rhombus",raHours:4.2404,decDeg:-62.474},{name:"HIP 17440",raHours:3.7365,decDeg:-64.8071},{name:"HIP 18597",raHours:3.9791,decDeg:-61.4002},{name:"HIP 19921",raHours:4.2747,decDeg:-59.3017}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Sagitta",stars:[{name:"Telum",raHours:19.9793,decDeg:19.4921},{name:"Zuoqi",raHours:19.7898,decDeg:18.5343},{name:"Sham",raHours:19.6683,decDeg:18.0139},{name:"Shakh",raHours:19.6841,decDeg:17.4761}],lines:[[0,1],[1,2],[1,3]]},{name:"Sagittarius",stars:[{name:"Kaus Australis",raHours:18.4029,decDeg:-34.3843},{name:"Alnasl",raHours:18.0968,decDeg:-30.4237},{name:"Kaus Media",raHours:18.3499,decDeg:-29.828},{name:"Kaus Borealis",raHours:18.4662,decDeg:-25.4212},{name:"Namalsadirah I",raHours:18.7609,decDeg:-26.9908},{name:"Nunki",raHours:18.9211,decDeg:-26.2966},{name:"Namalsadirah II",raHours:19.1157,decDeg:-27.6698},{name:"Ascella",raHours:19.0435,decDeg:-29.8801},{name:"Hamalwarid",raHours:18.2938,decDeg:-36.7613},{name:"Polis",raHours:18.2294,decDeg:-21.0588},{name:"HIP 95168",raHours:19.3612,decDeg:-17.8473},{name:"Albaldah",raHours:19.1627,decDeg:-21.0235},{name:"HIP 93683",raHours:19.078,decDeg:-21.7414},{name:"HIP 93085",raHours:18.9622,decDeg:-21.1066}],lines:[[0,1],[1,2],[2,0],[2,3],[3,4],[4,2],[4,5],[5,6],[6,7],[7,4],[7,0],[0,8],[3,9],[10,11],[11,12],[12,13],[13,11]]},{name:"Scorpius",stars:[{name:"Acrab",raHours:16.0906,decDeg:-19.8054},{name:"Dschubba",raHours:16.0056,decDeg:-22.6216},{name:"Fang",raHours:15.9809,decDeg:-26.114},{name:"Alniyat",raHours:16.3531,decDeg:-25.5928},{name:"Antares",raHours:16.4901,decDeg:-26.4319},{name:"Paikauhale",raHours:16.598,decDeg:-28.216},{name:"Larawag",raHours:16.8362,decDeg:-34.2926},{name:"Xamidimura",raHours:16.8645,decDeg:-38.0473},{name:"HIP 82729",raHours:16.9098,decDeg:-42.3608},{name:"HIP 84143",raHours:17.2025,decDeg:-43.2385},{name:"Sargas",raHours:17.622,decDeg:-42.9978},{name:"Girtab",raHours:17.7931,decDeg:-40.127},{name:"Mula",raHours:17.7081,decDeg:-39.0299},{name:"Lesath",raHours:17.5127,decDeg:-37.2957},{name:"Shaula",raHours:17.5601,decDeg:-37.1037},{name:"Fuyue",raHours:17.831,decDeg:-37.0434},{name:"Jabbah",raHours:16.1999,decDeg:-19.4606},{name:"Iklil",raHours:15.9481,decDeg:-29.214}],lines:[[0,1],[1,2],[1,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[0,16],[2,17]]},{name:"Sculptor",stars:[{name:"HIP 4577",raHours:.9768,decDeg:-29.3575},{name:"HIP 117452",raHours:23.8154,decDeg:-28.13},{name:"HIP 115102",raHours:23.3137,decDeg:-32.5318},{name:"HIP 116231",raHours:23.5495,decDeg:-37.8184}],lines:[[0,1],[1,2],[2,3]]},{name:"Scutum",stars:[{name:"HIP 92175",raHours:18.7862,decDeg:-4.7478},{name:"Tianbian",raHours:18.5868,decDeg:-8.2433},{name:"HIP 90595",raHours:18.4866,decDeg:-14.5658},{name:"HIP 91726",raHours:18.7046,decDeg:-9.0526}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Serpens",stars:[{name:"Chow",raHours:15.7698,decDeg:15.4219},{name:"Nasak Shamiya II",raHours:15.9408,decDeg:15.6647},{name:"Gudja",raHours:15.8123,decDeg:18.1418},{name:"HIP 76852",raHours:15.6925,decDeg:19.6705},{name:"Nasak Yamani I",raHours:15.5801,decDeg:10.5389},{name:"Unukalhai",raHours:15.7378,decDeg:6.4255},{name:"Nasak Yamani II",raHours:15.8469,decDeg:4.4776},{name:"HIP 77516",raHours:15.827,decDeg:-3.4301},{name:"Yed Prior",raHours:16.2391,decDeg:-3.694},{name:"Sabik",raHours:17.173,decDeg:-15.7251},{name:"HIP 86263",raHours:17.6265,decDeg:-15.3984},{name:"HIP 88048",raHours:17.9838,decDeg:-9.7733},{name:"HIP 89962",raHours:18.3553,decDeg:-2.8971},{name:"Alya",raHours:18.937,decDeg:4.2035}],lines:[[0,1],[1,2],[2,3],[3,0],[0,4],[4,5],[5,6],[6,7],[7,8],[9,10],[10,11],[11,12],[12,13]]},{name:"Sextans",stars:[{name:"HIP 48437",raHours:9.8751,decDeg:-8.1049},{name:"HIP 49641",raHours:10.1323,decDeg:-.3716},{name:"HIP 51437",raHours:10.5049,decDeg:-.637},{name:"HIP 51362",raHours:10.4913,decDeg:-2.739}],lines:[[0,1],[1,2],[2,3]]},{name:"Taurus",stars:[{name:"Tianguan",raHours:5.6274,decDeg:21.1426},{name:"Aldebaran",raHours:4.5987,decDeg:16.5098},{name:"Chamukuy",raHours:4.4777,decDeg:15.8709},{name:"Prima Hyadum",raHours:4.3299,decDeg:15.6277},{name:"Secunda Hyadum",raHours:4.3822,decDeg:17.5426},{name:"Ain",raHours:4.4769,decDeg:19.1805},{name:"Elnath",raHours:5.4382,decDeg:28.6079},{name:"HIP 16083",raHours:3.4528,decDeg:9.7328},{name:"HIP 18907",raHours:4.0526,decDeg:5.9893},{name:"HIP 15900",raHours:3.4136,decDeg:9.0291},{name:"HIP 16852",raHours:3.6146,decDeg:.4028},{name:"Bibing",raHours:4.0113,decDeg:12.4904}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[7,8],[9,10],[3,11],[11,7]]},{name:"Telescopium",stars:[{name:"HIP 89112",raHours:18.1872,decDeg:-45.9543},{name:"HIP 90422",raHours:18.4496,decDeg:-45.9683},{name:"HIP 90568",raHours:18.4805,decDeg:-49.07}],lines:[[0,1],[1,2]]},{name:"Triangulum",stars:[{name:"Mothallah",raHours:1.8847,decDeg:29.5794},{name:"Mizan",raHours:2.159,decDeg:34.9874},{name:"Apdu",raHours:2.2886,decDeg:33.8473}],lines:[[0,1],[1,2],[2,0]]},{name:"Triangulum Australe",stars:[{name:"Atria",raHours:16.8111,decDeg:-69.0276},{name:"HIP 77952",raHours:15.9191,decDeg:-63.4297},{name:"HIP 76440",raHours:15.612,decDeg:-66.3169},{name:"HIP 74946",raHours:15.3152,decDeg:-68.6795}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Tucana",stars:[{name:"HIP 2484",raHours:.5257,decDeg:-62.9581},{name:"HIP 1599",raHours:.3339,decDeg:-64.8776},{name:"HIP 118322",raHours:23.9986,decDeg:-65.5771},{name:"HIP 110838",raHours:22.4555,decDeg:-64.9664},{name:"Lang-Exster",raHours:22.3084,decDeg:-60.2595},{name:"HIP 114996",raHours:23.2905,decDeg:-58.2359}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},{name:"Ursa Major",stars:[{name:"Phecda",raHours:11.8972,decDeg:53.6947},{name:"Taiyangshou",raHours:11.7675,decDeg:47.7793},{name:"HIP 54539",raHours:11.1611,decDeg:44.4986},{name:"Tania Australis",raHours:10.3722,decDeg:41.4994},{name:"Tania Borealis",raHours:10.285,decDeg:42.9145},{name:"Alula Borealis",raHours:11.308,decDeg:33.0942},{name:"Alula Australis",raHours:11.3031,decDeg:31.5308},{name:"Megrez",raHours:12.2571,decDeg:57.0326},{name:"Dubhe",raHours:11.0622,decDeg:61.7511},{name:"Merak",raHours:11.0307,decDeg:56.3823},{name:"Alioth",raHours:12.9005,decDeg:55.9598},{name:"Mizar",raHours:13.3987,decDeg:54.9254},{name:"Alkaid",raHours:13.7924,decDeg:49.3133},{name:"Alhaud IV",raHours:9.5254,decDeg:63.0618},{name:"Alhaud VI",raHours:9.8499,decDeg:59.0391},{name:"Muscida",raHours:8.5045,decDeg:60.7184},{name:"Alhaud V",raHours:9.5479,decDeg:51.6786},{name:"Alkaphrah",raHours:9.0604,decDeg:47.1567},{name:"Talitha",raHours:8.9869,decDeg:48.0423}],lines:[[0,1],[1,2],[2,3],[3,4],[1,5],[5,6],[7,8],[8,9],[9,0],[0,7],[7,10],[10,11],[11,12],[8,13],[13,14],[13,15],[15,14],[14,9],[14,16],[16,17],[17,18]]},{name:"Ursa Minor",stars:[{name:"Polaris",raHours:2.5297,decDeg:89.2641},{name:"Yildun",raHours:17.5369,decDeg:86.5863},{name:"Circitores",raHours:16.7662,decDeg:82.0373},{name:"Akfa Farkadain",raHours:15.7343,decDeg:77.7945},{name:"Anwa Farkadain",raHours:16.2918,decDeg:75.7547},{name:"Pherkad",raHours:15.3455,decDeg:71.834},{name:"Kochab",raHours:14.8451,decDeg:74.1555}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]]},{name:"Vela",stars:[{name:"Alsephina",raHours:8.7451,decDeg:-54.7086},{name:"Regor",raHours:8.1589,decDeg:-47.3366},{name:"Suhail",raHours:9.1333,decDeg:-43.4326},{name:"HIP 46651",raHours:9.5117,decDeg:-40.4669},{name:"HIP 50191",raHours:10.2456,decDeg:-42.1221},{name:"HIP 52727",raHours:10.7795,decDeg:-49.4201},{name:"HIP 48774",raHours:9.9477,decDeg:-54.5678},{name:"Markeb",raHours:9.3686,decDeg:-55.0107}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0]]},{name:"Virgo",stars:[{name:"Zaniah",raHours:12.3318,decDeg:-.6667},{name:"HIP 58948",raHours:12.0869,decDeg:8.7328},{name:"HIP 57380",raHours:11.7643,decDeg:6.5298},{name:"Zavijava",raHours:11.8448,decDeg:1.7654},{name:"Porrima",raHours:12.6944,decDeg:-1.4495},{name:"Minelauva",raHours:12.9268,decDeg:3.3976},{name:"Vindemiatrix",raHours:13.0363,decDeg:10.9591},{name:"HIP 64238",raHours:13.1658,decDeg:-5.5389},{name:"Spica",raHours:13.4199,decDeg:-11.1612},{name:"Heze",raHours:13.5783,decDeg:-.5959},{name:"HIP 68520",raHours:14.0274,decDeg:1.5446},{name:"Maenalus",raHours:14.7708,decDeg:1.8929},{name:"Syrma",raHours:14.2669,decDeg:-5.9995},{name:"Rijl al Awwa",raHours:14.7177,decDeg:-5.6574}],lines:[[0,1],[1,2],[2,3],[3,0],[0,4],[4,5],[5,6],[4,7],[7,8],[4,9],[9,10],[10,11],[9,12],[12,13]]},{name:"Volans",stars:[{name:"HIP 44382",raHours:9.0408,decDeg:-66.3958},{name:"HIP 41312",raHours:8.429,decDeg:-66.1365},{name:"HIP 39794",raHours:8.1322,decDeg:-68.6171},{name:"HIP 35228",raHours:7.2805,decDeg:-67.9572},{name:"HIP 34481",raHours:7.1458,decDeg:-70.4992}],lines:[[0,1],[1,2],[2,3],[3,4],[4,2],[2,0]]},{name:"Vulpecula",stars:[{name:"Anser",raHours:19.4784,decDeg:24.6652},{name:"HIP 97886",raHours:19.891,decDeg:24.0795}],lines:[[0,1]]}],Qr="const:";function u2(n){return`${Qr}${n.name}`}function gp(){return kt.map(n=>({id:u2(n),name:n.name,sub:"constellation"}))}const _p=n=>n.toLowerCase().trim().replace(/\s+/g," ");function d2(n,e){const t=_p(n);return t===e?100:t.startsWith(e)?80:t.includes(e)?60:-1}function h2(n){const e=_p(n),t=gp();return e?t.map(i=>({e:i,s:d2(i.name,e)})).filter(i=>i.s>=0).sort((i,s)=>s.s-i.s||i.e.name.localeCompare(s.e.name)).map(i=>i.e):t}const Lh={type:"change"},Ou={type:"start"},vp={type:"end"},Qa=new oa,Ih=new xi,f2=Math.cos(70*Kr.DEG2RAD),xt=new w,Kt=2*Math.PI,it={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Yc=1e-6;class p2 extends i2{constructor(e,t=null){super(e,t),this.state=it.NONE,this.enabled=!0,this.target=new w,this.cursor=new w,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Gs.ROTATE,MIDDLE:Gs.DOLLY,RIGHT:Gs.PAN},this.touches={ONE:Fs.ROTATE,TWO:Fs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new w,this._lastQuaternion=new Pi,this._lastTargetPosition=new w,this._quat=new Pi().setFromUnitVectors(e.up,new w(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ch,this._sphericalDelta=new Ch,this._scale=1,this._panOffset=new w,this._rotateStart=new ae,this._rotateEnd=new ae,this._rotateDelta=new ae,this._panStart=new ae,this._panEnd=new ae,this._panDelta=new ae,this._dollyStart=new ae,this._dollyEnd=new ae,this._dollyDelta=new ae,this._dollyDirection=new w,this._mouse=new ae,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=g2.bind(this),this._onPointerDown=m2.bind(this),this._onPointerUp=_2.bind(this),this._onContextMenu=b2.bind(this),this._onMouseWheel=M2.bind(this),this._onKeyDown=S2.bind(this),this._onTouchStart=y2.bind(this),this._onTouchMove=E2.bind(this),this._onMouseDown=v2.bind(this),this._onMouseMove=x2.bind(this),this._interceptControlDown=A2.bind(this),this._interceptControlUp=T2.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Lh),this.update(),this.state=it.NONE}update(e=null){const t=this.object.position;xt.copy(t).sub(this.target),xt.applyQuaternion(this._quat),this._spherical.setFromVector3(xt),this.autoRotate&&this.state===it.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Kt:i>Math.PI&&(i-=Kt),s<-Math.PI?s+=Kt:s>Math.PI&&(s-=Kt),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(xt.setFromSpherical(this._spherical),xt.applyQuaternion(this._quatInverse),t.copy(this.target).add(xt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=xt.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new w(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new w(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=xt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Qa.origin.copy(this.object.position),Qa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Qa.direction))<f2?this.object.lookAt(this.target):(Ih.setFromNormalAndCoplanarPoint(this.object.up,this.target),Qa.intersectPlane(Ih,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Yc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Yc||this._lastTargetPosition.distanceToSquared(this.target)>Yc?(this.dispatchEvent(Lh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Kt/60*this.autoRotateSpeed*e:Kt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){xt.setFromMatrixColumn(t,0),xt.multiplyScalar(-e),this._panOffset.add(xt)}_panUp(e,t){this.screenSpacePanning===!0?xt.setFromMatrixColumn(t,1):(xt.setFromMatrixColumn(t,0),xt.crossVectors(this.object.up,xt)),xt.multiplyScalar(e),this._panOffset.add(xt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;xt.copy(s).sub(this.target);let r=xt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Kt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Kt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(Kt*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-Kt*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(Kt*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-Kt*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Kt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Kt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ae,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function m2(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function g2(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function _2(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(vp),this.state=it.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function v2(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Gs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=it.DOLLY;break;case Gs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=it.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=it.ROTATE}break;case Gs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=it.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=it.PAN}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(Ou)}function x2(n){switch(this.state){case it.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case it.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case it.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function M2(n){this.enabled===!1||this.enableZoom===!1||this.state!==it.NONE||(n.preventDefault(),this.dispatchEvent(Ou),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(vp))}function S2(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function y2(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Fs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=it.TOUCH_ROTATE;break;case Fs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=it.TOUCH_PAN;break;default:this.state=it.NONE}break;case 2:switch(this.touches.TWO){case Fs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=it.TOUCH_DOLLY_PAN;break;case Fs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=it.TOUCH_DOLLY_ROTATE;break;default:this.state=it.NONE}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(Ou)}function E2(n){switch(this._trackPointer(n),this.state){case it.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case it.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case it.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case it.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=it.NONE}}function b2(n){this.enabled!==!1&&n.preventDefault()}function A2(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function T2(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Hh=new Fn,$a=new w;class xp extends e2{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new at(e,3)),this.setAttribute("uv",new at(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const i=new ql(t,6,1);return this.setAttribute("instanceStart",new In(i,3,0)),this.setAttribute("instanceEnd",new In(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const i=new ql(t,6,1);return this.setAttribute("instanceColorStart",new In(i,3,0)),this.setAttribute("instanceColorEnd",new In(i,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new Xx(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fn);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Hh.setFromBufferAttribute(t),this.boundingBox.union(Hh))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new di),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)$a.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared($a)),$a.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared($a));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}se.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new ae(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};qt.line={uniforms:Nn.merge([se.common,se.fog,se.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class Io extends lt{constructor(e){super({type:"LineMaterial",uniforms:Nn.clone(qt.line.uniforms),vertexShader:qt.line.vertexShader,fragmentShader:qt.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const jc=new tt,Uh=new w,Nh=new w,Pt=new tt,Ct=new tt,Dn=new tt,Kc=new w,qc=new Ze,Rt=new n2,Oh=new w,eo=new Fn,to=new di,Pn=new tt;let Rn,es;function Fh(n,e,t){return Pn.set(0,0,-e,1).applyMatrix4(n.projectionMatrix),Pn.multiplyScalar(1/Pn.w),Pn.x=es/t.width,Pn.y=es/t.height,Pn.applyMatrix4(n.projectionMatrixInverse),Pn.multiplyScalar(1/Pn.w),Math.abs(Math.max(Pn.x,Pn.y))}function w2(n,e){const t=n.matrixWorld,i=n.geometry,s=i.attributes.instanceStart,r=i.attributes.instanceEnd,a=Math.min(i.instanceCount,s.count);for(let o=0,c=a;o<c;o++){Rt.start.fromBufferAttribute(s,o),Rt.end.fromBufferAttribute(r,o),Rt.applyMatrix4(t);const l=new w,u=new w;Rn.distanceSqToSegment(Rt.start,Rt.end,u,l),u.distanceTo(l)<es*.5&&e.push({point:u,pointOnLine:l,distance:Rn.origin.distanceTo(u),object:n,face:null,faceIndex:o,uv:null,uv1:null})}}function D2(n,e,t){const i=e.projectionMatrix,r=n.material.resolution,a=n.matrixWorld,o=n.geometry,c=o.attributes.instanceStart,l=o.attributes.instanceEnd,u=Math.min(o.instanceCount,c.count),d=-e.near;Rn.at(1,Dn),Dn.w=1,Dn.applyMatrix4(e.matrixWorldInverse),Dn.applyMatrix4(i),Dn.multiplyScalar(1/Dn.w),Dn.x*=r.x/2,Dn.y*=r.y/2,Dn.z=0,Kc.copy(Dn),qc.multiplyMatrices(e.matrixWorldInverse,a);for(let h=0,f=u;h<f;h++){if(Pt.fromBufferAttribute(c,h),Ct.fromBufferAttribute(l,h),Pt.w=1,Ct.w=1,Pt.applyMatrix4(qc),Ct.applyMatrix4(qc),Pt.z>d&&Ct.z>d)continue;if(Pt.z>d){const x=Pt.z-Ct.z,E=(Pt.z-d)/x;Pt.lerp(Ct,E)}else if(Ct.z>d){const x=Ct.z-Pt.z,E=(Ct.z-d)/x;Ct.lerp(Pt,E)}Pt.applyMatrix4(i),Ct.applyMatrix4(i),Pt.multiplyScalar(1/Pt.w),Ct.multiplyScalar(1/Ct.w),Pt.x*=r.x/2,Pt.y*=r.y/2,Ct.x*=r.x/2,Ct.y*=r.y/2,Rt.start.copy(Pt),Rt.start.z=0,Rt.end.copy(Ct),Rt.end.z=0;const _=Rt.closestPointToPointParameter(Kc,!0);Rt.at(_,Oh);const m=Kr.lerp(Pt.z,Ct.z,_),p=m>=-1&&m<=1,v=Kc.distanceTo(Oh)<es*.5;if(p&&v){Rt.start.fromBufferAttribute(c,h),Rt.end.fromBufferAttribute(l,h),Rt.start.applyMatrix4(a),Rt.end.applyMatrix4(a);const x=new w,E=new w;Rn.distanceSqToSegment(Rt.start,Rt.end,E,x),t.push({point:E,pointOnLine:x,distance:Rn.origin.distanceTo(E),object:n,face:null,faceIndex:h,uv:null,uv1:null})}}}class P2 extends pt{constructor(e=new xp,t=new Io({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let a=0,o=0,c=t.count;a<c;a++,o+=2)Uh.fromBufferAttribute(t,a),Nh.fromBufferAttribute(i,a),s[o]=o===0?0:s[o-1],s[o+1]=s[o]+Uh.distanceTo(Nh);const r=new ql(s,2,1);return e.setAttribute("instanceDistanceStart",new In(r,1,0)),e.setAttribute("instanceDistanceEnd",new In(r,1,1)),this}raycast(e,t){const i=this.material.worldUnits,s=e.camera;s===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;Rn=e.ray;const a=this.matrixWorld,o=this.geometry,c=this.material;es=c.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),to.copy(o.boundingSphere).applyMatrix4(a);let l;if(i)l=es*.5;else{const d=Math.max(s.near,to.distanceToPoint(Rn.origin));l=Fh(s,d,c.resolution)}if(to.radius+=l,Rn.intersectsSphere(to)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),eo.copy(o.boundingBox).applyMatrix4(a);let u;if(i)u=es*.5;else{const d=Math.max(s.near,eo.distanceToPoint(Rn.origin));u=Fh(s,d,c.resolution)}eo.expandByScalar(u),Rn.intersectsBox(eo)!==!1&&(i?w2(this,t):D2(this,s,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(jc),this.material.uniforms.resolution.value.set(jc.z,jc.w))}}class Jl extends xp{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,i=new Float32Array(2*t);for(let s=0;s<t;s+=3)i[2*s]=e[s],i[2*s+1]=e[s+1],i[2*s+2]=e[s+2],i[2*s+3]=e[s+3],i[2*s+4]=e[s+4],i[2*s+5]=e[s+5];return super.setPositions(i),this}setColors(e){const t=e.length-3,i=new Float32Array(2*t);for(let s=0;s<t;s+=3)i[2*s]=e[s],i[2*s+1]=e[s+1],i[2*s+2]=e[s+2],i[2*s+3]=e[s+3],i[2*s+4]=e[s+4],i[2*s+5]=e[s+5];return super.setColors(i),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class Zc extends P2{constructor(e=new Jl,t=new Io({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const Bs=Math.PI/180;function C2(n,e,t=1e-10){const i=n%(2*Math.PI);let s=e<.8?i:Math.PI;for(let r=0;r<64;r++){const a=s-e*Math.sin(s)-i,o=1-e*Math.cos(s),c=a/o;if(s-=c,Math.abs(c)<t)break}return s}function Mp(n,e){const t=e/Mi,i=n.rates;return{a:n.a+(i?.a??0)*t,e:n.e+(i?.e??0)*t,i:n.i+(i?.i??0)*t,node:n.node+(i?.node??0)*t,peri:n.peri+(i?.peri??0)*t,M0:n.M0+(i?.M0??0)*t+Sp(n,e),n:n.n}}function Sp(n,e){if(!n.periodicM)return 0;const t=e/Mi;let i=0;for(const s of n.periodicM){const r=s.f*t;i+=s.b*t*t+s.c*Math.cos(r*Bs)+s.s*Math.sin(r*Bs)}return i}function At(n,e){return Ho(n,e,{x:0,y:0,z:0})}function Ho(n,e,t){const i=n.a+(n.rates?.a??0)*(e/Mi),s=n.e+(n.rates?.e??0)*(e/Mi),r=n.i+(n.rates?.i??0)*(e/Mi),a=n.node+(n.rates?.node??0)*(e/Mi),o=n.peri+(n.rates?.peri??0)*(e/Mi),c=n.M0+(n.rates?.M0??0)*(e/Mi)+Sp(n,e);return yp(i,s,r,a,o,c,n.n,e,t)}function R2(n,e){return yp(n.a,n.e,n.i,n.node,n.peri,n.M0,n.n,0,{x:0,y:0,z:0},e)}function yp(n,e,t,i,s,r,a,o,c,l){const u=l??(r+a*o)*Bs,d=C2(u,e),h=n*(Math.cos(d)-e),f=n*Math.sqrt(1-e*e)*Math.sin(d),g=s*Bs,_=i*Bs,m=t*Bs,p=Math.cos(_),v=Math.sin(_),x=Math.cos(g),E=Math.sin(g),R=Math.cos(m),A=Math.sin(m);return c.x=(p*x-v*E*R)*h+(-p*E-v*x*R)*f,c.y=(v*x+p*E*R)*h+(-v*E+p*x*R)*f,c.z=E*A*h+x*A*f,c}function L2(n,e,t=256){const i=Mp(n,e),s=[];for(let r=0;r<=t;r++){const a=r*(2*Math.PI/t);s.push(R2(i,a))}return s}const Sn=Math.PI/180,I2=1495978707e-1,H2=[[0,0,1,0,6288770,-20905400],[2,0,-1,0,1274030,-3699110],[2,0,0,0,658314,-2955970],[0,0,2,0,213618,-569925],[0,1,0,0,-185116,48888],[0,0,0,2,-114332,-3149],[2,0,-2,0,58793,246158],[2,-1,-1,0,57066,-152138],[2,0,1,0,53322,-170733],[2,-1,0,0,45758,-204586],[0,1,-1,0,-40923,-129620],[1,0,0,0,-34720,108743],[0,1,1,0,-30383,104755],[2,0,0,-2,15327,10321],[0,0,1,2,-12528,0],[0,0,1,-2,10980,79661],[4,0,-1,0,10675,-34782],[0,0,3,0,10034,-23210],[4,0,-2,0,8548,-21636],[2,1,-1,0,-7888,24208],[2,1,0,0,-6766,30824],[1,0,-1,0,-5163,-8379],[1,1,0,0,4987,-16675],[2,-1,1,0,4036,-12831],[2,0,2,0,3994,-10445],[4,0,0,0,3861,-11650],[2,0,-3,0,3665,14403],[0,1,-2,0,-2689,-7003],[2,0,-1,2,-2602,0],[2,-1,-2,0,2390,10056],[1,0,1,0,-2348,6322],[2,-2,0,0,2236,-9884],[0,1,2,0,-2120,5751],[0,2,0,0,-2069,0],[2,-2,-1,0,2048,-4950],[2,0,1,-2,-1773,4130],[2,0,0,2,-1595,0],[4,-1,-1,0,1215,-3958],[0,0,2,2,-1110,0],[3,0,-1,0,-892,3258],[2,1,1,0,-810,2616],[4,-1,-2,0,759,-1897],[0,2,-1,0,-713,-2117],[2,2,-1,0,-700,2354],[2,1,-2,0,691,0],[2,-1,0,-2,596,0],[4,0,1,0,549,-1423],[0,0,4,0,537,-1117],[4,-1,0,0,520,-1571],[1,0,-2,0,-487,-1739],[2,1,0,-2,-399,0],[0,0,2,-2,-381,-4421],[1,1,1,0,351,0],[3,0,-2,0,-340,0],[4,0,-3,0,330,0],[2,-1,2,0,327,0],[0,2,1,0,-323,1165],[1,1,-1,0,299,0],[2,0,3,0,294,0],[2,0,-1,-2,0,8752]],U2=[[0,0,0,1,5128120],[0,0,1,1,280602],[0,0,1,-1,277693],[2,0,0,-1,173237],[2,0,-1,1,55413],[2,0,-1,-1,46271],[2,0,0,1,32573],[0,0,2,1,17198],[2,0,1,-1,9266],[0,0,2,-1,8822],[2,-1,0,-1,8216],[2,0,-2,-1,4324],[2,0,1,1,4200],[2,1,0,-1,-3359],[2,-1,-1,1,2463],[2,-1,0,1,2211],[2,-1,-1,-1,2065],[0,1,-1,-1,-1870],[4,0,-1,-1,1828],[0,1,0,1,-1794],[0,0,0,3,-1749],[0,1,-1,1,-1565],[1,0,0,1,-1491],[0,1,1,1,-1475],[0,1,1,-1,-1410],[0,1,0,-1,-1344],[1,0,0,-1,-1335],[0,0,3,1,1107],[4,0,0,-1,1021],[4,0,-1,1,833],[0,0,1,-3,777],[4,0,-2,1,671],[2,0,0,-3,607],[2,0,2,-1,596],[2,-1,1,-1,491],[2,0,-2,1,-451],[0,0,3,-1,439],[2,0,2,1,422],[2,0,-3,-1,421],[2,1,-1,1,-366],[2,1,0,1,-351],[4,0,0,1,331],[2,-1,1,1,315],[2,-2,0,-1,302],[0,0,1,3,-283],[2,1,1,-1,-229],[1,1,0,-1,223],[1,1,0,1,223],[0,1,-2,-1,-220],[2,1,-1,-1,-220],[1,0,1,1,-185],[2,-1,-2,-1,181],[0,1,2,1,-177],[4,0,-2,-1,176],[4,-1,-1,-1,166],[1,0,1,-1,-164],[4,0,1,-1,132],[1,0,-1,-1,-119],[4,-1,0,-1,115],[2,-2,0,1,107]];function Xn(n){let e=n%360;return e<0&&(e+=360),e}function N2(n){const e=n/36525,t=218.3164477+(481267.8812342+(-.0015786+(1/538841-e/65194e3)*e)*e)*e,i=297.8501921+(445267.1114034+(-.0018819+(1/545868-e/113065e3)*e)*e)*e,s=357.5291092+(35999.0502909+(-1536e-7+e/2449e4)*e)*e,r=134.9633964+(477198.8675055+(.0087414+(1/69699.9+e/14712e3)*e)*e)*e,a=93.272095+(483202.0175233+(-.0036539+(-1/3526e3+e/86331e4)*e)*e)*e,o=119.75+131.849*e,c=53.09+479264.29*e,l=313.45+481266.484*e,u=1+(-.002516-74e-7*e)*e,d=u*u,h=Xn(t)*Sn,f=Xn(i)*Sn,g=Xn(s)*Sn,_=Xn(r)*Sn,m=Xn(a)*Sn,p=Xn(o)*Sn,v=Xn(c)*Sn,x=Xn(l)*Sn;let E=0,R=0;for(const S of H2){const[C,k,O,Y,W,V]=S,j=C*f+k*g+O*_+Y*m;let G=W,re=V;Math.abs(k)===1?(G*=u,re*=u):Math.abs(k)===2&&(G*=d,re*=d),E+=G*Math.sin(j),R+=re*Math.cos(j)}E+=3958*Math.sin(p)+1962*Math.sin(h-m)+318*Math.sin(v);let A=0;for(const S of U2){const[C,k,O,Y,W]=S,V=C*f+k*g+O*_+Y*m;let j=W;Math.abs(k)===1?j*=u:Math.abs(k)===2&&(j*=d),A+=j*Math.sin(V)}A+=-2235*Math.sin(h)+382*Math.sin(x)+175*Math.sin(p-m)+175*Math.sin(p+m)+127*Math.sin(h-_)-115*Math.sin(h+_);const D=Xn(t+E/1e6),H=A/1e6,b=385000.56+R/1e3;return{lon:D,lat:H,deltaAu:b/I2}}function O2(n,e,t){const i=t/36525,s=(5028.796195*i+.556602*i*i)/3600,r=-46.836769*i+.005971*i*i,a=n-s,o=e-Math.cos(n*Sn)*r/3600;return{lon:a,lat:o}}function da(n){const e=N2(n),t=O2(e.lon,e.lat,n),i=t.lon*Sn,s=t.lat*Sn,r=e.deltaAu;return[r*Math.cos(s)*Math.cos(i),r*Math.cos(s)*Math.sin(i),r*Math.sin(s)]}function F2(n){let e=n>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function z2(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function sn(n,e,t){const i=s=>Math.round(255*(n[s]+(e[s]-n[s])*t));return`rgb(${i(0)},${i(1)},${i(2)})`}function B2(n){const i=document.createElement("canvas");i.width=512,i.height=256;const s=i.getContext("2d"),r=F2(z2(n.id)),a=n.color,o=n.color2??n.color,c=n.texture??"rock";if(c==="sun"){const u=s.createLinearGradient(0,0,0,256);u.addColorStop(0,sn(a,o,.6)),u.addColorStop(.5,sn(a,o,.2)),u.addColorStop(1,sn(a,o,.6)),s.fillStyle=u,s.fillRect(0,0,512,256);for(let d=0;d<900;d++){const h=r()*512,f=r()*256,g=1+r()*5;s.fillStyle=r()>.5?`rgba(255,220,140,${.05+r()*.1})`:`rgba(255,140,40,${.05+r()*.08})`,s.beginPath(),s.arc(h,f,g,0,Math.PI*2),s.fill()}}else if(c==="gas"){const u=14+Math.floor(r()*8);for(let d=0;d<u;d++){const h=d/u*256,f=256/u,g=.5+.5*Math.sin(d/u*Math.PI*(2+r()*2));s.fillStyle=sn(a,o,g),s.fillRect(0,h,512,f+1)}for(let d=0;d<260;d++){const h=r()*512,f=r()*256,g=20+r()*90,_=2+r()*6;s.fillStyle=`rgba(255,255,255,${.02+r()*.05})`,s.fillRect(h,f,g,_)}if(r()>.4){const d=r()*512,h=256*(.3+r()*.4),f=26+r()*20,g=10+r()*8;s.fillStyle=sn(o,[1,.95,.9],.55),s.beginPath(),s.ellipse(d,h,f,g,0,0,Math.PI*2),s.fill()}}else if(c==="ice"){const u=s.createLinearGradient(0,0,0,256);u.addColorStop(0,sn(a,[1,1,1],.25)),u.addColorStop(.5,sn(a,o,.3)),u.addColorStop(1,sn(a,[1,1,1],.25)),s.fillStyle=u,s.fillRect(0,0,512,256);for(let d=0;d<40;d++){const h=r()*256;s.fillStyle=`rgba(255,255,255,${.03+r()*.05})`,s.fillRect(0,h,512,1+r()*3)}}else if(c==="earth"){s.fillStyle=sn(a,[0,.1,.35],.3),s.fillRect(0,0,512,256);const u=sn(n.color2??a,[.3,.5,.25],.5);for(let d=0;d<26;d++){const h=r()*512,f=256*(.15+r()*.7);s.fillStyle=r()>.25?u:sn(a,[.4,.35,.25],.5);const g=6+Math.floor(r()*8);for(let _=0;_<g;_++){const m=h+(r()-.5)*90,p=f+(r()-.5)*44;s.beginPath(),s.arc(m,p,6+r()*18,0,Math.PI*2),s.fill()}}s.fillStyle="rgba(245,248,252,0.9)",s.fillRect(0,0,512,14),s.fillRect(0,242,512,14);for(let d=0;d<120;d++){const h=r()*512,f=r()*256;s.fillStyle=`rgba(255,255,255,${.06+r()*.12})`,s.beginPath(),s.ellipse(h,f,8+r()*26,2+r()*5,0,0,Math.PI*2),s.fill()}}else if(c==="volcanic"){s.fillStyle=sn(a,o,.4),s.fillRect(0,0,512,256);for(let u=0;u<300;u++){const d=r()*512,h=r()*256,f=1+r()*4;s.fillStyle=r()>.7?`rgba(255,90,20,${.25+r()*.4})`:`rgba(60,40,30,${.1+r()*.2})`,s.beginPath(),s.arc(d,h,f,0,Math.PI*2),s.fill()}}else{s.fillStyle=sn(a,o,.3),s.fillRect(0,0,512,256);for(let u=0;u<700;u++){const d=r()*512,h=r()*256,f=.5+r()*3,g=r()>.5?"255,255,255":"0,0,0";s.fillStyle=`rgba(${g},${.03+r()*.08})`,s.beginPath(),s.arc(d,h,f,0,Math.PI*2),s.fill()}for(let u=0;u<90;u++){const d=r()*512,h=r()*256,f=2+r()*9;s.fillStyle=`rgba(0,0,0,${.12+r()*.12})`,s.beginPath(),s.arc(d,h,f,0,Math.PI*2),s.fill(),s.strokeStyle=`rgba(255,255,255,${.08+r()*.1})`,s.lineWidth=1,s.beginPath(),s.arc(d,h,f,-.4*Math.PI,.6*Math.PI),s.stroke()}}const l=new Qo(i);return l.colorSpace=Mt,l.wrapS=$s,l}const k2={A:690,B:665,C:725,D:725,E:620,F:580,G:770,H:755,I:350,J:430,K:720,L:565,M:945,N:760,O:775,P:635,Q:775,R:695,S:610,T:630,U:730,V:680,W:1020,X:680,Y:670,Z:600},hn=512,Ep=128,G2=60,V2=464,bp=.24;function ec(n){const e=n.toUpperCase(),t=e.split("").map(u=>k2[u]??600),i=t.reduce((u,d)=>u+d,0)/1e3,s=bp,r=Math.min(G2,V2/(i+s*(e.length-1))),a=t.map(u=>u/1e3*r),o=r*s,c=a.reduce((u,d)=>u+d,0)+o*(e.length-1),l=hn/2-c/2;return{fontSize:r,inkStartX:l,inkWidthPx:c,charWidths:a}}function W2(n,e,t="base"){n.textAlign="center",n.textBaseline="middle";const i=e.toUpperCase(),{fontSize:s,inkStartX:r,inkWidthPx:a,charWidths:o}=ec(e),c=s*bp;n.font=`${s}px Georgia, "Times New Roman", serif`;const l=()=>{let h=r;for(let f=0;f<i.length;f++)n.fillText(i[f],h+o[f]/2,50),h+=o[f]+c},u=t==="green"?{glow:"rgba(124, 252, 90, 0.9)",halo:"rgba(150, 255, 120, 0.85)",core:"#eaffe8",flourish:"rgba(124, 252, 90, 0.5)",diamond:"rgba(190, 255, 160, 0.85)"}:{glow:"rgba(143, 176, 255, 0.9)",halo:"rgba(190, 210, 250, 0.9)",core:"#eef4ff",flourish:"rgba(160, 185, 235, 0.5)",diamond:"rgba(205, 224, 255, 0.85)"};n.shadowColor=u.glow,n.shadowBlur=14,n.fillStyle=u.halo,l(),l(),n.shadowBlur=0,n.fillStyle=u.core,l();const d=90;n.strokeStyle=u.flourish,n.lineWidth=2,n.beginPath(),n.moveTo(r-16,d),n.lineTo(hn/2-10,d),n.moveTo(hn/2+10,d),n.lineTo(r+a+16,d),n.stroke(),n.fillStyle=u.diamond,n.beginPath(),n.moveTo(hn/2,d-5),n.lineTo(hn/2+5,d),n.lineTo(hn/2,d+5),n.lineTo(hn/2-5,d),n.closePath(),n.fill()}function X2(n){const e=document.createElement("canvas");e.width=256,e.height=64;const t=e.getContext("2d");t.font="600 30px system-ui, sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillStyle="rgba(10,14,24,0.45)";const i=t.measureText(n).width;t.fillRect(128-i/2-10,12,i+20,40),t.fillStyle="#dbe6f5",t.fillText(n,128,33);const s=new Qo(e);return s.colorSpace=Mt,s}const Y2=[{id:"asteroid-belt",name:"Main asteroid belt",count:1100,seed:24301,a:[2.1,3.3],e:[0,.25],i:[0,12],baseSize:.027,sizeJitter:.5,color:11575945,farPointSize:.75},{id:"kuiper-belt",name:"Kuiper belt",count:1400,seed:6923,a:[30,48],e:[0,.3],i:[0,8],baseSize:.05,sizeJitter:.6,color:12374766,farPointSize:.7}];function j2(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function K2(n){const e=j2(n.seed),t=(s,r)=>s+e()*(r-s),i=[];for(let s=0;s<n.count;s++){const r=t(n.a[0],n.a[1]),a=t(n.e[0],n.e[1]),o=t(n.i[0],n.i[1]),c=365.25*Math.pow(r,1.5);i.push({elements:{a:r,e:a,i:o,node:t(0,360),peri:t(0,360),M0:t(0,360),n:360/c},size:n.baseSize*(1-n.sizeJitter+2*n.sizeJitter*e()),spin:[e()*Math.PI*2,e()*Math.PI*2,e()*Math.PI*2],shade:e()})}return i}const q2=120,Z2=40;function J2(n,e){const t=n-(e+q2),i=Q2(t/Z2),s=1-i*i*(3-2*i);return{mode:s>=.5?"near":"far",blend:s}}function Q2(n){return n<0?0:n>1?1:n}const $2=new Lu(1,0),eM=new Ze,tM=new w,nM=new Pi,iM=new w,sM=new Tn,rM={x:0,y:0,z:0};function aM(n){const e=K2(n),t=e.length,i=new Jr({color:n.color,emissive:new Le(n.color).multiplyScalar(.05),roughness:.85,metalness:0,transparent:!0}),s=new Wx($2,i,t);s.name=n.name,s.castShadow=!1,s.receiveShadow=!1,s.frustumCulled=!1;const r=new Le(n.color),a=new Le;for(let h=0;h<t;h++){const f=.65+.5*e[h].shade;a.copy(r).multiplyScalar(f),s.setColorAt(h,a)}s.instanceColor&&(s.instanceColor.needsUpdate=!0);const o=new ut,c=new Float32Array(t*3),l=new Float32Array(t*3);for(let h=0;h<t;h++){const f=.65+.5*e[h].shade;a.copy(r).multiplyScalar(f),l[h*3]=a.r,l[h*3+1]=a.g,l[h*3+2]=a.b}o.setAttribute("position",new Ht(c,3).setUsage(pg)),o.setAttribute("color",new Ht(l,3));const u=new Ro({size:n.farPointSize??1.5,sizeAttenuation:!0,vertexColors:!0,transparent:!0,opacity:0,depthWrite:!1,blending:Di}),d=new Zr(o,u);return d.name=n.name+" (far)",d.frustumCulled=!1,d.visible=!1,{def:n,mesh:s,points:d,objects:e,dispose:()=>{i.dispose(),u.dispose(),o.dispose()}}}function oM(n,e,t,i=1){const{objects:s,mesh:r}=n,a=eM,o=tM,c=nM,l=iM,u=sM,d=rM,h=n.points.geometry.getAttribute("position"),f=h.array;for(let g=0;g<s.length;g++){const _=s[g];Ho(_.elements,e,d),o.set(-d.x,d.z,-d.y);const m=Math.hypot(d.x,d.y,d.z),p=t.planetDistance(m)/Math.max(1e-9,m);o.multiplyScalar(p),u.set(_.spin[0]+e*.05,_.spin[1],_.spin[2]),c.setFromEuler(u),l.setScalar(Math.max(1e-6,_.size*i)),a.compose(o,c,l),r.setMatrixAt(g,a),f[g*3]=o.x,f[g*3+1]=o.y,f[g*3+2]=o.z}r.instanceMatrix.needsUpdate=!0,h.needsUpdate=!0}function Ap(n,e,t,i){let s=J2(e,t);i<.25&&(s={mode:"far",blend:0});const{mesh:r,points:a}=n,o=r.material,c=a.material;return r.visible=s.blend>.02,a.visible=s.blend<.98,o.opacity=s.blend,c.opacity=(1-s.blend)*.45,s.mode}const cM=[{constellation:"Andromeda",centerRAHours:1.0395,centerDecDeg:38.3081,sizeW:33.58,sizeH:33.58,rotationDeg:104.8},{constellation:"Antlia",centerRAHours:10.2756,centerDecDeg:-28.7018,sizeW:18.52,sizeH:18.52,rotationDeg:-7.06},{constellation:"Apus",centerRAHours:15.2834,centerDecDeg:-81.9025,sizeW:14.06,sizeH:14.06,rotationDeg:-8.04},{constellation:"Aquarius",centerRAHours:22.2682,centerDecDeg:-12.0784,sizeW:39.52,sizeH:39.52,rotationDeg:36.19},{constellation:"Aquila",centerRAHours:19.3715,centerDecDeg:4.6274,sizeW:33.34,sizeH:33.34,rotationDeg:8.17},{constellation:"Ara",centerRAHours:17.4865,centerDecDeg:-54.3975,sizeW:14.37,sizeH:14.37,rotationDeg:123.01},{constellation:"Aries",centerRAHours:2.4582,centerDecDeg:21.6925,sizeW:15.47,sizeH:15.47,rotationDeg:53.16},{constellation:"Auriga",centerRAHours:5.6464,centerDecDeg:37.7631,sizeW:27.38,sizeH:27.38,rotationDeg:-50.09},{constellation:"Boötes",centerRAHours:14.0786,centerDecDeg:30.7778,sizeW:41.45,sizeH:41.45,rotationDeg:-59.35},{constellation:"Caelum",centerRAHours:4.8036,centerDecDeg:-38.5623,sizeW:8.61,sizeH:8.61,rotationDeg:-64.4},{constellation:"Camelopardalis",centerRAHours:4.8352,centerDecDeg:66.1305,sizeW:27.7,sizeH:27.7,rotationDeg:31.64},{constellation:"Cancer",centerRAHours:8.514,centerDecDeg:18.7572,sizeW:23.95,sizeH:23.95,rotationDeg:-36.21},{constellation:"Canes Venatici",centerRAHours:12.374,centerDecDeg:37.7938,sizeW:13.4,sizeH:13.4,rotationDeg:-1.44},{constellation:"Canis Major",centerRAHours:6.7685,centerDecDeg:-22.5863,sizeW:21.77,sizeH:21.77,rotationDeg:-22.51},{constellation:"Canis Minor",centerRAHours:7.511,centerDecDeg:6.5471,sizeW:8.05,sizeH:8.05,rotationDeg:-15.14},{constellation:"Capricornus",centerRAHours:20.9965,centerDecDeg:-16.7297,sizeW:19.54,sizeH:19.54,rotationDeg:38.18},{constellation:"Carina",centerRAHours:8.5278,centerDecDeg:-49.9536,sizeW:56.59,sizeH:56.59,rotationDeg:5.3},{constellation:"Cassiopeia",centerRAHours:1.012,centerDecDeg:61.2874,sizeW:14.38,sizeH:14.38,rotationDeg:-174.71},{constellation:"Centaurus",centerRAHours:13.4657,centerDecDeg:-48.339,sizeW:43.27,sizeH:43.27,rotationDeg:19.52},{constellation:"Cepheus",centerRAHours:21.8497,centerDecDeg:62.7364,sizeW:27.44,sizeH:27.44,rotationDeg:110.54},{constellation:"Cetus",centerRAHours:1.9036,centerDecDeg:-4.0029,sizeW:46.26,sizeH:46.26,rotationDeg:-30.44},{constellation:"Chamaeleon",centerRAHours:9.806,centerDecDeg:-80.5706,sizeW:12.92,sizeH:12.92,rotationDeg:38.7},{constellation:"Circinus",centerRAHours:15.068,centerDecDeg:-62.052,sizeW:6.08,sizeH:6.08,rotationDeg:-80},{constellation:"Columba",centerRAHours:6.0208,centerDecDeg:-36.9013,sizeW:12.03,sizeH:12.03,rotationDeg:-59.17},{constellation:"Coma Berenices",centerRAHours:12.7221,centerDecDeg:21.8852,sizeW:13.67,sizeH:13.67,rotationDeg:-5.4},{constellation:"Corona Australis",centerRAHours:18.9382,centerDecDeg:-38.9407,sizeW:5.73,sizeH:5.73,rotationDeg:49.76},{constellation:"Corona Borealis",centerRAHours:15.7454,centerDecDeg:28.8407,sizeW:7.46,sizeH:7.46,rotationDeg:35.96},{constellation:"Corvus",centerRAHours:12.3689,centerDecDeg:-19.8,sizeW:10.05,sizeH:10.05,rotationDeg:12.08},{constellation:"Crater",centerRAHours:11.4061,centerDecDeg:-16.6513,sizeW:15.03,sizeH:15.03,rotationDeg:-59.19},{constellation:"Crux",centerRAHours:12.4909,centerDecDeg:-59.4203,sizeW:6.16,sizeH:6.16,rotationDeg:-51},{constellation:"Cygnus",centerRAHours:20.5417,centerDecDeg:40.7423,sizeW:33.49,sizeH:33.49,rotationDeg:-3.98},{constellation:"Delphinus",centerRAHours:20.6889,centerDecDeg:14.1666,sizeW:5.38,sizeH:5.38,rotationDeg:11.94},{constellation:"Dorado",centerRAHours:4.9914,centerDecDeg:-59.9197,sizeW:17.18,sizeH:17.18,rotationDeg:2.95},{constellation:"Draco",centerRAHours:16.4625,centerDecDeg:68.1989,sizeW:53.91,sizeH:53.91,rotationDeg:157.16},{constellation:"Equuleus",centerRAHours:21.2857,centerDecDeg:7.0768,sizeW:6.82,sizeH:6.82,rotationDeg:140.86},{constellation:"Eridanus",centerRAHours:3.6997,centerDecDeg:-29.3322,sizeW:62.38,sizeH:62.38,rotationDeg:15.76},{constellation:"Fornax",centerRAHours:2.9332,centerDecDeg:-27.6337,sizeW:10.35,sizeH:10.35,rotationDeg:32.8},{constellation:"Gemini",centerRAHours:6.8661,centerDecDeg:23.0133,sizeW:23.64,sizeH:23.64,rotationDeg:-16.6},{constellation:"Grus",centerRAHours:22.4926,centerDecDeg:-45.9337,sizeW:21.03,sizeH:21.03,rotationDeg:-3.05},{constellation:"Hercules",centerRAHours:16.9534,centerDecDeg:32.6047,sizeW:34.25,sizeH:34.25,rotationDeg:-154.02},{constellation:"Horologium",centerRAHours:3.3301,centerDecDeg:-52.1545,sizeW:21.4,sizeH:21.4,rotationDeg:82.8},{constellation:"Hydra",centerRAHours:10.7434,centerDecDeg:-13.0387,sizeW:69,sizeH:69,rotationDeg:25.08},{constellation:"Hydrus",centerRAHours:1.7871,centerDecDeg:-70.8057,sizeW:18.13,sizeH:18.13,rotationDeg:116.07},{constellation:"Indus",centerRAHours:20.9868,centerDecDeg:-51.0624,sizeW:19.37,sizeH:19.37,rotationDeg:158.9},{constellation:"Lacerta",centerRAHours:22.4731,centerDecDeg:43.7246,sizeW:14.83,sizeH:14.83,rotationDeg:-52.15},{constellation:"Leo",centerRAHours:10.6939,centerDecDeg:15.7158,sizeW:34.87,sizeH:34.87,rotationDeg:41.32},{constellation:"Leo Minor",centerRAHours:10.0684,centerDecDeg:33.1938,sizeW:15.92,sizeH:15.92,rotationDeg:-30.85},{constellation:"Lepus",centerRAHours:5.5834,centerDecDeg:-18.7299,sizeW:15.47,sizeH:15.47,rotationDeg:-17.59},{constellation:"Libra",centerRAHours:15.4844,centerDecDeg:-18.4806,sizeW:20.85,sizeH:20.85,rotationDeg:56.73},{constellation:"Lupus",centerRAHours:15.2093,centerDecDeg:-44.014,sizeW:24.43,sizeH:24.43,rotationDeg:-95.96},{constellation:"Lynx",centerRAHours:7.8559,centerDecDeg:43.9368,sizeW:41.1,sizeH:41.1,rotationDeg:-19.6},{constellation:"Lyra",centerRAHours:18.837,centerDecDeg:34.8687,sizeW:12.31,sizeH:12.31,rotationDeg:17.08},{constellation:"Mensa",centerRAHours:5.3062,centerDecDeg:-72.4754,sizeW:10.83,sizeH:10.83,rotationDeg:85.44},{constellation:"Microscopium",centerRAHours:20.8316,centerDecDeg:-33.2382,sizeW:2.54,sizeH:2.54,rotationDeg:60.01},{constellation:"Monoceros",centerRAHours:7.186,centerDecDeg:-.671,sizeW:30.36,sizeH:30.36,rotationDeg:.47},{constellation:"Musca",centerRAHours:12.3534,centerDecDeg:-69.5563,sizeW:8.77,sizeH:8.77,rotationDeg:-118.48},{constellation:"Norma",centerRAHours:16.293,centerDecDeg:-52.2943,sizeW:8.41,sizeH:8.41,rotationDeg:112.64},{constellation:"Octans",centerRAHours:21.5805,centerDecDeg:-81.1772,sizeW:9.36,sizeH:9.36,rotationDeg:-168.38},{constellation:"Ophiuchus",centerRAHours:17.1828,centerDecDeg:-4.6091,sizeW:56.3,sizeH:56.3,rotationDeg:3.97},{constellation:"Orion",centerRAHours:5.6152,centerDecDeg:3.5699,sizeW:29.12,sizeH:29.12,rotationDeg:27.5},{constellation:"Pavo",centerRAHours:19.4327,centerDecDeg:-65.8902,sizeW:26.78,sizeH:26.78,rotationDeg:.78},{constellation:"Pegasus",centerRAHours:23.0709,centerDecDeg:21.6673,sizeW:48.7,sizeH:48.7,rotationDeg:138.12},{constellation:"Perseus",centerRAHours:3.5718,centerDecDeg:44.6834,sizeW:29.4,sizeH:29.4,rotationDeg:-8.39},{constellation:"Phoenix",centerRAHours:.9855,centerDecDeg:-47.5277,sizeW:16.91,sizeH:16.91,rotationDeg:54.9},{constellation:"Pictor",centerRAHours:6.1132,centerDecDeg:-57.6748,sizeW:13.08,sizeH:13.08,rotationDeg:-2.22},{constellation:"Pisces",centerRAHours:.6197,centerDecDeg:9.4168,sizeW:44.47,sizeH:44.47,rotationDeg:40.9},{constellation:"Piscis Austrinus",centerRAHours:22.3306,centerDecDeg:-32.5012,sizeW:14.14,sizeH:14.14,rotationDeg:-124.26},{constellation:"Puppis",centerRAHours:7.608,centerDecDeg:-36.52,sizeW:43.46,sizeH:21.14,rotationDeg:67.2},{constellation:"Pyxis",centerRAHours:8.7629,centerDecDeg:-31.3781,sizeW:7.45,sizeH:7.45,rotationDeg:-67.04},{constellation:"Reticulum",centerRAHours:4.057,centerDecDeg:-62.2078,sizeW:6.14,sizeH:6.14,rotationDeg:104.71},{constellation:"Sagitta",centerRAHours:19.8636,centerDecDeg:18.8067,sizeW:4.97,sizeH:4.97,rotationDeg:-115.1},{constellation:"Sagittarius",centerRAHours:18.9367,centerDecDeg:-29.5732,sizeW:30.49,sizeH:30.49,rotationDeg:23.71},{constellation:"Scorpius",centerRAHours:16.7957,centerDecDeg:-32.1996,sizeW:26.41,sizeH:26.41,rotationDeg:-.89},{constellation:"Sculptor",centerRAHours:.2885,centerDecDeg:-31.0322,sizeW:23.27,sizeH:23.27,rotationDeg:41.08},{constellation:"Scutum",centerRAHours:18.6347,centerDecDeg:-9.8787,sizeW:11.56,sizeH:11.56,rotationDeg:34.15},{constellation:"Sextans",centerRAHours:10.2407,centerDecDeg:-2.1621,sizeW:15.91,sizeH:15.91,rotationDeg:20.26},{constellation:"Taurus",centerRAHours:4.3438,centerDecDeg:18.0278,sizeW:34.74,sizeH:34.74,rotationDeg:-19.7},{constellation:"Telescopium",centerRAHours:18.39,centerDecDeg:-46.7658,sizeW:4.91,sizeH:4.91,rotationDeg:12.21},{constellation:"Triangulum",centerRAHours:2.0458,centerDecDeg:31.5524,sizeW:7.92,sizeH:7.92,rotationDeg:32.51},{constellation:"Triangulum Australe",centerRAHours:16.142,centerDecDeg:-68.6055,sizeW:9.97,sizeH:9.97,rotationDeg:58.74},{constellation:"Tucana",centerRAHours:23.3453,centerDecDeg:-62.819,sizeW:23.69,sizeH:23.69,rotationDeg:-16.67},{constellation:"Ursa Major",centerRAHours:11.4059,centerDecDeg:54.6756,sizeW:55.12,sizeH:55.12,rotationDeg:-34.58},{constellation:"Ursa Minor",centerRAHours:14.914,centerDecDeg:78.7873,sizeW:18.67,sizeH:18.67,rotationDeg:49.09},{constellation:"Vela",centerRAHours:9.494,centerDecDeg:-49.58,sizeW:32.58,sizeH:19.03,rotationDeg:-171.6},{constellation:"Virgo",centerRAHours:13.2926,centerDecDeg:1.7026,sizeW:40.52,sizeH:40.52,rotationDeg:34.44},{constellation:"Volans",centerRAHours:7.9189,centerDecDeg:-71.7208,sizeW:11.99,sizeH:11.99,rotationDeg:-9.09},{constellation:"Vulpecula",centerRAHours:19.7674,centerDecDeg:25.1729,sizeW:14.78,sizeH:14.78,rotationDeg:31.89}];function lM(n){const e=n.centerRAHours*15*Math.PI/180,t=n.centerDecDeg*Math.PI/180,i=Math.cos(t),s=[-i*Math.cos(e),Math.sin(t),-i*Math.sin(e)];let r=[-s[1]*s[0],1-s[1]*s[1],-s[1]*s[2]];r[0]*r[0]+r[1]*r[1]+r[2]*r[2]<1e-6&&(r=[1,0,0]);const a=uM(r);return{position:s,upHint:a,planeSize:[n.sizeW*Math.PI/180,n.sizeH*Math.PI/180],rotationRad:n.rotationDeg*Math.PI/180}}function uM(n){const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]}const ji={mapSize:2048,near:.05,far:140,bias:-4e-4,normalBias:.02};function dM(n,e=ji.far){n.castShadow=!0;const t=n.shadow;t.mapSize.set(ji.mapSize,ji.mapSize),t.camera.near=ji.near,t.camera.far=e,t.bias=ji.bias,t.normalBias=ji.normalBias}function hM(n,e){n.castShadow=!e,n.receiveShadow=!e}const Jc=1.35,Yn=[[.387098,5],[.723321,9.724486],[1,15.051293],[1.523712,23.211311],[2.7675,28.814579],[5.20248,43.956733],[9.541499,66.964136],[19.187979,84.022651],[30.069528,102.130054],[39.482117,126.602786],[43.11,128.602786],[45.43,130.602786],[67.864,132.602786]];function Tp(n){if(n<=Yn[0][0])return Yn[0][1];for(let r=1;r<Yn.length;r++){const[a,o]=Yn[r];if(n<=a){const[c,l]=Yn[r-1];return l+(n-c)/(a-c)*(o-l)}}const[e,t]=Yn[Yn.length-2],[i,s]=Yn[Yn.length-1];return s+(n-i)/(i-e)*(s-t)}function wp(n){return .8+.45*Math.log10(n/100+1)}function Dp(n){return .15+.3*Math.log10(n/100+1)}function fM(n){return Math.max(.08,.08+.09*Math.log10(n/100+1))}function Pp(n){return .9+1.7*Math.sqrt(n/4e5)}const pM={moon:{floor:2.208715,cap:3.111655},phobos:{floor:1.978417,cap:2.79312},deimos:{floor:2.294943,cap:2.794943},amalthea:{floor:2.584476,cap:11.023209},io:{floor:3.034156,cap:10.93183},europa:{floor:3.569515,cap:10.937531},ganymede:{floor:4.118656,cap:10.918046},callisto:{floor:4.683945,cap:10.921384},himalia:{floor:5.143966,cap:11.023314},enceladus:{floor:5.170574,cap:8.103596},tethys:{floor:5.601783,cap:8.080787},dione:{floor:6.057633,cap:8.078954},rhea:{floor:6.525752,cap:8.068518},titan:{floor:7.048484,cap:8.024341},iapetus:{floor:7.569867,cap:8.069867},miranda:{floor:4.292651,cap:6.671852},ariel:{floor:4.72486,cap:6.644337},umbriel:{floor:5.184918,cap:6.644004},titania:{floor:5.655488,cap:6.633825},oberon:{floor:6.135031,cap:6.635031},triton:{floor:2.461502,cap:9.679395},nereid:{floor:8.720057,cap:9.745187}};function mM(n,e){const t=pM[n];if(!t)return null;let i=Pp(e);return i<t.floor&&(i=t.floor),t.cap!==void 0&&i>t.cap&&(i=t.cap),i}function gM(n,e=!1){const t=e?Dp(n):wp(n);return Math.max(3,t*6)}const Cp={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class fs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const _M=new sp(-1,1,1,-1,0,1);class vM extends ut{constructor(){super(),this.setAttribute("position",new at([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new at([0,2,0,0,2,0],2))}}const xM=new vM;class tc{constructor(e){this._mesh=new pt(xM,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,_M)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class MM extends fs{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof lt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Nn.clone(e.uniforms),this.material=new lt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new tc(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class zh extends fs{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class SM extends fs{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class yM{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new ae);this._width=i.width,this._height=i.height,t=new Jt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:mn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new MM(Cp),this.copyPass.material.blending=$n,this.clock=new t2}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}zh!==void 0&&(a instanceof zh?i=!0:a instanceof SM&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ae);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class EM extends fs{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Le}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const bM={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Le(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class ir extends fs{constructor(e,t,i,s){super(),this.strength=t!==void 0?t:1,this.radius=i,this.threshold=s,this.resolution=e!==void 0?new ae(e.x,e.y):new ae(256,256),this.clearColor=new Le(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Jt(r,a,{type:mn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const h=new Jt(r,a,{type:mn});h.texture.name="UnrealBloomPass.h"+d,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const f=new Jt(r,a,{type:mn});f.texture.name="UnrealBloomPass.v"+d,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),a=Math.round(a/2)}const o=bM;this.highPassUniforms=Nn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new lt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new ae(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new w(1,1,1),new w(1,1,1),new w(1,1,1),new w(1,1,1),new w(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Cp;this.copyUniforms=Nn.clone(u.uniforms),this.blendMaterial=new lt({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Di,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Le,this.oldClearAlpha=1,this.basic=new rs,this.fsQuad=new tc(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ae(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(e,t,i,s,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=ir.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=ir.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){const t=[];for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new lt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ae(.5,.5)},direction:{value:new ae(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new lt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}ir.BlurDirectionX=new ae(1,0);ir.BlurDirectionY=new ae(0,1);const AM={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class TM extends fs{constructor(){super();const e=AM;this.uniforms=Nn.clone(e.uniforms),this.material=new Yx({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new tc(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ke.getTransfer(this._outputColorSpace)===rt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Rf?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Lf?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===If?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===gu?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Hf?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Uf&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const no={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new ae(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		void SMAAEdgeDetectionVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAAEdgeDetectionVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {
			vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );

			// Calculate color deltas:
			vec4 delta;
			vec3 C = texture2D( colorTex, texcoord ).rgb;

			vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;
			vec3 t = abs( C - Cleft );
			delta.x = max( max( t.r, t.g ), t.b );

			vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;
			t = abs( C - Ctop );
			delta.y = max( max( t.r, t.g ), t.b );

			// We do the usual threshold:
			vec2 edges = step( threshold, delta.xy );

			// Then discard if there is no edge:
			if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )
				discard;

			// Calculate right and bottom deltas:
			vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;
			t = abs( C - Cright );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;
			t = abs( C - Cbottom );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the maximum delta in the direct neighborhood:
			float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );

			// Calculate left-left and top-top deltas:
			vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;
			t = abs( C - Cleftleft );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;
			t = abs( C - Ctoptop );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the final maximum delta:
			maxDelta = max( max( maxDelta, delta.z ), delta.w );

			// Local contrast adaptation in action:
			edges.xy *= step( 0.5 * maxDelta, delta.xy );

			return vec4( edges, 0.0, 0.0 );
		}

		void main() {

			gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );

		}`},io={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new ae(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];
		varying vec2 vPixcoord;

		void SMAABlendingWeightCalculationVS( vec2 texcoord ) {
			vPixcoord = texcoord / resolution;

			// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components

			// And these for the searches, they indicate the ends of the loops:
			vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );

		}

		void main() {

			vUv = uv;

			SMAABlendingWeightCalculationVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )

		uniform sampler2D tDiffuse;
		uniform sampler2D tArea;
		uniform sampler2D tSearch;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[3];
		varying vec2 vPixcoord;

		#if __VERSION__ == 100
		vec2 round( vec2 x ) {
			return sign( x ) * floor( abs( x ) + 0.5 );
		}
		#endif

		float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {
			// Not required if searchTex accesses are set to point:
			// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);
			// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +
			//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;
			e.r = bias + e.r * scale;
			return 255.0 * texture2D( searchTex, e, 0.0 ).r;
		}

		float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			/**
				* @PSEUDO_GATHER4
				* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to
				* sample between edge, thus fetching four edges in a row.
				* Sampling with different offsets in each direction allows to disambiguate
				* which edges are active from the four fetched ones.
				*/
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			// We correct the previous (-0.25, -0.125) offset we applied:
			texcoord.x += 0.25 * resolution.x;

			// The searches are bias by 1, so adjust the coords accordingly:
			texcoord.x += resolution.x;

			// Disambiguate the length added by the last step:
			texcoord.x += 2.0 * resolution.x; // Undo last step
			texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);

			return texcoord.x;
		}

		float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			texcoord.x -= 0.25 * resolution.x;
			texcoord.x -= resolution.x;
			texcoord.x -= 2.0 * resolution.x;
			texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );

			return texcoord.x;
		}

		float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y; // WebGL port note: Changed sign
			texcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y; // WebGL port note: Changed sign
			texcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {
			// Rounding prevents precision errors of bilinear filtering:
			vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;

			// We do a scale and bias for mapping to texel space:
			texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );

			// Move to proper place, according to the subpixel offset:
			texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;

			return texture2D( areaTex, texcoord, 0.0 ).rg;
		}

		vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {
			vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );

			vec2 e = texture2D( edgesTex, texcoord ).rg;

			if ( e.g > 0.0 ) { // Edge at north
				vec2 d;

				// Find the distance to the left:
				vec2 coords;
				coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );
				coords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)
				d.x = coords.x;

				// Now fetch the left crossing edges, two at a time using bilinear
				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to
				// discern what value each edge has:
				float e1 = texture2D( edgesTex, coords, 0.0 ).r;

				// Find the distance to the right:
				coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );
				d.y = coords.x;

				// We want the distances to be in pixel units (doing this here allow to
				// better interleave arithmetic and memory accesses):
				d = d / resolution.x - pixcoord.x;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the right crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;

				// Ok, we know how this pattern looks like, now it is time for getting
				// the actual area:
				weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );
			}

			if ( e.r > 0.0 ) { // Edge at west
				vec2 d;

				// Find the distance to the top:
				vec2 coords;

				coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );
				coords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;
				d.x = coords.y;

				// Fetch the top crossing edges:
				float e1 = texture2D( edgesTex, coords, 0.0 ).g;

				// Find the distance to the bottom:
				coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );
				d.y = coords.y;

				// We want the distances to be in pixel units:
				d = d / resolution.y - pixcoord.y;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the bottom crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;

				// Get the area for this direction:
				weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );
			}

			return weights;
		}

		void main() {

			gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );

		}`},Qc={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new ae(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		void SMAANeighborhoodBlendingVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAANeighborhoodBlendingVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform sampler2D tColor;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {
			// Fetch the blending weights for current pixel:
			vec4 a;
			a.xz = texture2D( blendTex, texcoord ).xz;
			a.y = texture2D( blendTex, offset[ 1 ].zw ).g;
			a.w = texture2D( blendTex, offset[ 1 ].xy ).a;

			// Is there any blending weight with a value greater than 0.0?
			if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {
				return texture2D( colorTex, texcoord, 0.0 );
			} else {
				// Up to 4 lines can be crossing a pixel (one through each edge). We
				// favor blending by choosing the line with the maximum weight for each
				// direction:
				vec2 offset;
				offset.x = a.a > a.b ? a.a : -a.b; // left vs. right
				offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs

				// Then we go in the direction that has the maximum weight:
				if ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical
					offset.y = 0.0;
				} else {
					offset.x = 0.0;
				}

				// Fetch the opposite color and lerp by hand:
				vec4 C = texture2D( colorTex, texcoord, 0.0 );
				texcoord += sign( offset ) * resolution;
				vec4 Cop = texture2D( colorTex, texcoord, 0.0 );
				float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );

				// WebGL port note: Added gamma correction
				C.xyz = pow(C.xyz, vec3(2.2));
				Cop.xyz = pow(Cop.xyz, vec3(2.2));
				vec4 mixed = mix(C, Cop, s);
				mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));

				return mixed;
			}
		}

		void main() {

			gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );

		}`};class wM extends fs{constructor(e,t){super(),this.edgesRT=new Jt(e,t,{depthBuffer:!1,type:mn}),this.edgesRT.texture.name="SMAAPass.edges",this.weightsRT=new Jt(e,t,{depthBuffer:!1,type:mn}),this.weightsRT.texture.name="SMAAPass.weights";const i=this,s=new Image;s.src=this.getAreaTexture(),s.onload=function(){i.areaTexture.needsUpdate=!0},this.areaTexture=new St,this.areaTexture.name="SMAAPass.area",this.areaTexture.image=s,this.areaTexture.minFilter=pn,this.areaTexture.generateMipmaps=!1,this.areaTexture.flipY=!1;const r=new Image;r.src=this.getSearchTexture(),r.onload=function(){i.searchTexture.needsUpdate=!0},this.searchTexture=new St,this.searchTexture.name="SMAAPass.search",this.searchTexture.image=r,this.searchTexture.magFilter=zt,this.searchTexture.minFilter=zt,this.searchTexture.generateMipmaps=!1,this.searchTexture.flipY=!1,this.uniformsEdges=Nn.clone(no.uniforms),this.uniformsEdges.resolution.value.set(1/e,1/t),this.materialEdges=new lt({defines:Object.assign({},no.defines),uniforms:this.uniformsEdges,vertexShader:no.vertexShader,fragmentShader:no.fragmentShader}),this.uniformsWeights=Nn.clone(io.uniforms),this.uniformsWeights.resolution.value.set(1/e,1/t),this.uniformsWeights.tDiffuse.value=this.edgesRT.texture,this.uniformsWeights.tArea.value=this.areaTexture,this.uniformsWeights.tSearch.value=this.searchTexture,this.materialWeights=new lt({defines:Object.assign({},io.defines),uniforms:this.uniformsWeights,vertexShader:io.vertexShader,fragmentShader:io.fragmentShader}),this.uniformsBlend=Nn.clone(Qc.uniforms),this.uniformsBlend.resolution.value.set(1/e,1/t),this.uniformsBlend.tDiffuse.value=this.weightsRT.texture,this.materialBlend=new lt({uniforms:this.uniformsBlend,vertexShader:Qc.vertexShader,fragmentShader:Qc.fragmentShader}),this.fsQuad=new tc(null)}render(e,t,i){this.uniformsEdges.tDiffuse.value=i.texture,this.fsQuad.material=this.materialEdges,e.setRenderTarget(this.edgesRT),this.clear&&e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.materialWeights,e.setRenderTarget(this.weightsRT),this.clear&&e.clear(),this.fsQuad.render(e),this.uniformsBlend.tColor.value=i.texture,this.fsQuad.material=this.materialBlend,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.fsQuad.render(e))}setSize(e,t){this.edgesRT.setSize(e,t),this.weightsRT.setSize(e,t),this.materialEdges.uniforms.resolution.value.set(1/e,1/t),this.materialWeights.uniforms.resolution.value.set(1/e,1/t),this.materialBlend.uniforms.resolution.value.set(1/e,1/t)}getAreaTexture(){return"data:image/png;base64,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"}getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}dispose(){this.edgesRT.dispose(),this.weightsRT.dispose(),this.areaTexture.dispose(),this.searchTexture.dispose(),this.materialEdges.dispose(),this.materialWeights.dispose(),this.materialBlend.dispose(),this.fsQuad.dispose()}}function DM(n,e,t,i,s){n.toneMapping=gu,n.toneMappingExposure=1.15,n.outputColorSpace=Mt;const r=n.getPixelRatio(),a=new Jt(Math.max(1,Math.round(i*r)),Math.max(1,Math.round(s*r)),{type:mn,colorSpace:Cn}),o=new yM(n,a);o.setPixelRatio(r),o.setSize(i,s),o.addPass(new EM(e,t));const c=new ir(new ae(i,s),.32,.3,.96);o.addPass(c);const l=new wM(i,s);return o.addPass(l),o.addPass(new TM),{composer:o,setSize:(h,f)=>{const g=n.getPixelRatio();c.resolution.set(h*g,f*g),o.setPixelRatio(g),o.setSize(h,f)},dispose:()=>{o.dispose(),a.dispose()}}}let kr=null;function PM(){if(kr)return kr;const n=256,e=document.createElement("canvas");e.width=n,e.height=n;const t=e.getContext("2d"),i=n/2,s=t.createRadialGradient(i,i,0,i,i,i);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.1,"rgba(255,248,224,0.9)"),s.addColorStop(.2,"rgba(255,214,140,0.5)"),s.addColorStop(.35,"rgba(255,170,80,0.18)"),s.addColorStop(.55,"rgba(230,80,20,0.04)"),s.addColorStop(.8,"rgba(180,50,10,0.008)"),s.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=s,t.fillRect(0,0,n,n);const r=new Qo(e);return r.colorSpace=Mt,kr=r,r}function CM(n){const e=PM(),t=new Pu({map:e,color:16777215,blending:Di,depthWrite:!1,depthTest:!0,transparent:!0,opacity:1}),i=new hp(t);return i.scale.set(n*4.5,n*4.5,1),i.name="sun-glow",i.renderOrder=2,{sprite:i,dispose:()=>{t.dispose(),kr===e&&(e.dispose(),kr=null)}}}const RM=9e3,LM=5e3,IM=5600,HM=9e3,UM=96,Bh=4e3,$c=.3,NM=[[.6,.72,1],[.79,.85,1],[.95,.97,1],[1,.96,.86],[1,.85,.62],[1,.62,.42]],kh=[.04,.09,.18,.34,.24,.11];function OM(n){let e=n>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function FM(n){let e=n();for(let t=0;t<kh.length;t++)if(e-=kh[t],e<=0)return t;return 3}function zM(n,e,t,i=1592598566){const s=OM(i),r=new Float32Array(n*3),a=new Float32Array(n*3),o=new Float32Array(n);for(let c=0;c<n;c++){const l=s(),u=s(),d=2*Math.PI*l,h=Math.acos(2*u-1),f=e+s()*(t-e);r[c*3]=f*Math.sin(h)*Math.cos(d),r[c*3+1]=f*Math.cos(h),r[c*3+2]=f*Math.sin(h)*Math.sin(d);const[g,_,m]=NM[FM(s)],p=.45+s()*.55;a[c*3]=g*p,a[c*3+1]=_*p,a[c*3+2]=m*p,o[c]=.8+Math.pow(s(),3)*2.6}return{position:r,color:a,size:o}}function BM(n,e){const t=new yi;t.name="deep-sky";const i=[],s=n.load(e);s.colorSpace=Mt,s.wrapS=$s;const r=new as(RM,UM,48),a=new rs({map:s,color:new Le($c,$c,$c),side:Bt,depthWrite:!1,toneMapped:!1}),o=new pt(r,a);o.name="milkyway-skybox",o.renderOrder=-10,t.add(o),i.push(r,a,s);const{position:c,color:l,size:u}=zM(HM,LM,IM),d=new ut;d.setAttribute("position",new Ht(c,3)),d.setAttribute("color",new Ht(l,3)),d.setAttribute("aSize",new Ht(u,1));const h=new lt({uniforms:{uPixelRatio:{value:1}},vertexColors:!0,transparent:!0,depthWrite:!1,depthTest:!0,blending:Di,vertexShader:`
      attribute float aSize;
      varying vec3 vColor;
      uniform float uPixelRatio;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * uPixelRatio;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      varying vec3 vColor;
      void main() {
        // Soft round point: 0 at centre -> 1 at edge.
        float d = length(gl_PointCoord - 0.5) * 2.0;
        float alpha = smoothstep(1.0, 0.15, d);
        if (alpha < 0.01) discard;
        gl_FragColor = vec4(vColor, alpha);
      }
    `});h.toneMapped=!1;const f=new Zr(d,h);f.name="starfield",f.renderOrder=-9,t.add(f),i.push(d,h);const g=new as(Bh,64,16,0,Math.PI*2,0,Math.PI/2),_=new lt({uniforms:{uColor:{value:new Le(1,.85,.62)},uPeak:{value:.015},uR:{value:Bh},uCamPos:{value:new w(0,16,30)}},transparent:!0,side:Bt,depthWrite:!1,depthTest:!0,blending:Di,vertexShader:`
      varying vec3 vWorldPos;
      void main() {
        vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uColor;
      uniform float uPeak;
      uniform float uR;
      uniform vec3 uCamPos;
      varying vec3 vWorldPos;
      void main() {
        vec3 toView = normalize(uCamPos - vWorldPos);
        // Elevation above the ecliptic plane (+Y) at this sky direction.
        float alt = asin(clamp(toView.y, -1.0, 1.0));
        // Separation from the Sun (at the world origin).
        vec3 toSun = normalize(-vWorldPos);
        float sep = acos(clamp(dot(toView, toSun), -1.0, 1.0));
        float t = max(0.0, cos(sep));
        float a = max(0.0, cos(alt));
        // Mirror of the pure JS model: peak * t^3 * (0.25 + 0.75*a^2).
        float alpha = uPeak * t * t * t * (0.25 + 0.75 * a * a);
        gl_FragColor = vec4(uColor, alpha);
      }
    `});_.toneMapped=!1;const m=new pt(g,_);m.name="zodiacal-light",m.renderOrder=-8,t.add(m),i.push(g,_);const p=new w;return{group:t,update(v){v.getWorldPosition(p),_.uniforms.uCamPos.value.copy(p)},dispose:()=>{for(const v of i)v.dispose()}}}const kM=`
  varying float vNdotView;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 viewDir = normalize(-mvPosition.xyz);
    vec3 nrm = normalize(normalMatrix * normal);
    vNdotView = dot(nrm, viewDir);
    gl_Position = projectionMatrix * mvPosition;
  }
`,GM=`
  precision mediump float;
  uniform vec3 uColor;
  uniform float uBase;
  uniform float uPower;
  uniform float uIntensity;
  varying float vNdotView;
  void main() {
    // Front-limb rim: 1 - nDotView is 1 at the silhouette, 0 head-on. BackSide
    // is culled (FrontSide), so the back face never renders. pow concentrates
    // it into a thin bright limb hugging the planet's edge.
    float rim = max(0.0, 1.0 - max(0.0, vNdotView));
    float shaped = pow(rim, uPower);
    float a = (uBase + shaped * (1.0 - uBase)) * uIntensity;
    // Slight lift of the colour toward white at the brightest rim for a
    // "scattering" hot edge (like real planetary limb brightening).
    vec3 col = mix(uColor, vec3(1.0), shaped * 0.35);
    gl_FragColor = vec4(col, a);
  }
`,VM={earth:{tint:[.35,.6,1],power:3,intensity:1},venus:{tint:[1,.82,.55],power:2.6,intensity:.95},mars:{tint:[1,.55,.35],power:4,intensity:.4},jupiter:{tint:[.95,.8,.6],power:3.2,intensity:.55},saturn:{tint:[1,.9,.65],power:3.2,intensity:.5},uranus:{tint:[.6,.85,.95],power:3.2,intensity:.6},neptune:{tint:[.35,.5,.95],power:3.2,intensity:.6}};function WM(n){return VM[n]??null}function XM(n,e,t){const i=t?.power??3.2,s=t?.intensity??.9,r=t?.base??.08,a=new as(n*1.06,48,32),o=new lt({vertexShader:kM,fragmentShader:GM,uniforms:{uColor:{value:new Le(...e)},uBase:{value:r},uPower:{value:i},uIntensity:{value:s}},transparent:!0,blending:Di,side:ri,depthWrite:!1});o.toneMapped=!1;const c=new pt(a,o);return c.renderOrder=2,c.frustumCulled=!1,c.name="atmosphere",c.disposeAtmosphere=()=>{a.dispose(),o.dispose()},c}function YM(n,e){const i=1-Math.abs(n-.42)*1.4,s=1-Math.abs(n-.86)*2.2;let r=Math.max(i,s*.8);r*=1-Math.exp(-Math.pow((n-.72)/.012,2))*.9,r*=1-Math.exp(-Math.pow((n-.95)/.008,2))*.5;const a=Math.min(n,1-n);return r*=Kr.clamp(a/.03,0,1),Kr.clamp(r,0,1)}function jM(n){const i=document.createElement("canvas");i.width=1024,i.height=1;const s=i.getContext("2d"),r=s.createImageData(1024,1),[a,o,c]=n;for(let u=0;u<1024;u++){const d=u/1023,h=YM(d),f=h;r.data[u*4+0]=a*(.7+.3*f),r.data[u*4+1]=o*(.7+.3*f),r.data[u*4+2]=c*(.7+.3*f),r.data[u*4+3]=h*255}s.putImageData(r,0,0);const l=new Qo(i);return l.colorSpace=Mt,l.anisotropy=4,l.needsUpdate=!0,l}function KM(n){const e=n.attributes.position,t=n.attributes.uv;for(let a=0;a<e.count;a++){const o=e.getX(a),c=e.getY(a),l=Math.hypot(o,c);t.setXY(a,l,0)}let i=1/0,s=-1/0;for(let a=0;a<e.count;a++){const o=Math.hypot(e.getX(a),e.getY(a));o<i&&(i=o),o>s&&(s=o)}const r=s-i||1;for(let a=0;a<e.count;a++){const o=Math.hypot(e.getX(a),e.getY(a));t.setXY(a,(o-i)/r,0)}t.needsUpdate=!0}const so=1,Zi=1495978707e-1,Gh=new Map;function qM(n,e){let t=Gh.get(n);return t||(t=jM(e),Gh.set(n,t)),t}const ts={bodyRadiusKm:wp,dwarfRadiusKm:Dp,moonRadiusKm:fM,planetDistance:Tp,moonDistance:(n,e)=>(e?mM(e,n):null)??Pp(n),followDistanceKm:gM,beltSizeFactor:1},Hn={bodyRadiusKm:n=>n/Zi*so,dwarfRadiusKm:n=>n/Zi*so,moonRadiusKm:n=>n/Zi*so,planetDistance:n=>n,moonDistance:n=>n/Zi*so,followDistanceKm:n=>Math.max(1.5,n/Zi*8),beltSizeFactor:0};function ZM(n,e,t){const i=(s,r)=>s+(r-s)*t;return{bodyRadiusKm:s=>i(n.bodyRadiusKm(s),e.bodyRadiusKm(s)),dwarfRadiusKm:s=>i(n.dwarfRadiusKm(s),e.dwarfRadiusKm(s)),moonRadiusKm:s=>i(n.moonRadiusKm(s),e.moonRadiusKm(s)),planetDistance:s=>i(n.planetDistance(s),e.planetDistance(s)),moonDistance:(s,r)=>i(n.moonDistance(s,r),e.moonDistance(s,r)),followDistanceKm:(s,r)=>i(n.followDistanceKm(s,r),e.followDistanceKm(s,r)),beltSizeFactor:i(n.beltSizeFactor??1,e.beltSizeFactor??0)}}function Uo(n){return new w(-n.x,n.z,-n.y)}function Vh(n,e){return e.set(-n.x,n.z,-n.y),e}function JM(n,e){const t=L2(n,0,256),i=t.map(u=>{const d=Math.hypot(u.x,u.y,u.z);return Uo(u).multiplyScalar(e(d)/Math.max(1e-9,d))}),s=new ut().setFromPoints(i),r=new Jo({color:5599392,transparent:!0,opacity:.45}),a=new Cu(s,r),o=t.length,c=new Float32Array(o),l=new Float32Array(o*3);for(let u=0;u<o;u++){const d=t[u];c[u]=Math.hypot(d.x,d.y,d.z);const h=Uo(d).normalize();l[u*3]=h.x,l[u*3+1]=h.y,l[u*3+2]=h.z}return a.userData.radii=c,a.userData.unitDirs=l,a.userData.geo=s,a.userData.mat=r,a}function QM(n,e,t){const i=new Bx({canvas:n,antialias:!0,preserveDrawingBuffer:!0});i.setPixelRatio(Math.min(window.devicePixelRatio,2)),i.setSize(window.innerWidth,window.innerHeight),i.outputColorSpace=Mt,i.shadowMap.enabled=!0,i.shadowMap.type=Pf;const s=new kx;s.background=new Le(5);const r=new rn(50,window.innerWidth/window.innerHeight,5e-4,2e4);r.position.set(0,16,30);const a=new p2(r,i.domElement);a.enableDamping=!0,a.dampingFactor=.08,a.enablePan=!1;const o=new Qx(16773848,3.5,0,0);dM(o,ji.far),s.add(o),s.add(new $x(2240580,.4));const c=BM(new Hu,"textures/milkyway_equirect.png");c.group.traverse(v=>{v instanceof Zr&&v.material instanceof lt&&(v.material.uniforms.uPixelRatio.value=i.getPixelRatio())}),s.add(c.group);const l=yS();s.add(l);const u=bS();s.add(u);const d=DM(i,s,r,window.innerWidth,window.innerHeight),h=CM(Jc*4.5);s.add(h.sprite);const f=[c,d,h],g=new Map,_=[...e.filter(v=>v.kind!=="moon"),...e.filter(v=>v.kind==="moon")];for(const v of _){const x=v.kind==="star",E=v.kind==="moon",R=v.kind==="dwarf",A=x?t===Hn?v.radiusKm/Zi*1.15:Jc:E?t.moonRadiusKm(v.radiusKm):R?t.dwarfRadiusKm(v.radiusKm):t.bodyRadiusKm(v.radiusKm),D=x?v.radiusKm/Zi*1.15:E?Hn.moonRadiusKm(v.radiusKm):R?Hn.dwarfRadiusKm(v.radiusKm):Hn.bodyRadiusKm(v.radiusKm),H=x?Jc:E?ts.moonRadiusKm(v.radiusKm):R?ts.dwarfRadiusKm(v.radiusKm):ts.bodyRadiusKm(v.radiusKm),b=new as(A,48,32),S=B2(v),C=x?new rs({map:S}):new Jr({map:S,roughness:.92,metalness:0});f.push(b,C,S);const k=new pt(b,C);k.name=v.name,k.userData.id=v.id,hM(k,x);const O=new yi;O.name=`pivot:${v.name}`,O.rotation.z=Kr.degToRad(v.tiltDeg??0),O.add(k),s.add(O);const Y=new Lo(1.03,1.08,64),W=new rs({color:8378623,side:fn,transparent:!0,opacity:0,depthWrite:!1}),V=new pt(Y,W);V.rotation.x=-Math.PI/2,V.scale.setScalar(Math.max(.001,A)),V.visible=!1,O.add(V),f.push(Y,W);let j=null;if(v.rings){const Ee=A*v.rings.inner,Ae=A*v.rings.outer,Ie=new Lo(Ee,Ae,96,16);KM(Ie);const st=qM(v.id,v.rings.color),P=new Jr({map:st,color:16777215,side:fn,transparent:!0,opacity:v.rings.opacity,roughness:.85,metalness:0,depthWrite:!1}),je=new pt(Ie,P);je.rotation.x=-Math.PI/2,je.castShadow=!0,je.receiveShadow=!0,je.renderOrder=1,O.add(je),j=je,f.push(Ie,P)}let G=null;const re=WM(v.id);re&&!x&&!E&&(G=XM(A,re.tint,{power:re.power,intensity:re.intensity}),O.add(G));const de=X2(v.name),xe=new Pu({map:de,depthTest:!1}),Fe=new hp(xe),Ye=x?3.4:Math.max(1.3,A*2.4);Fe.scale.set(Ye,Ye*.25,1),Fe.position.y=A+Ye*.35,O.add(Fe),f.push(de,xe);let X=null;if(v.elements){const Ee=Ae=>E?t.moonDistance(Ae,v.id):t.planetDistance(Ae);if(v.id==="moon"){const Ie=[],st=new Float32Array(129),P=new Float32Array(129*3);for(let ke=0;ke<=128;ke++){const Me=da(0+ke/128*27.55455),ot=Math.hypot(Me[0],Me[1],Me[2]),Te=ot*oi,Ce=Uo({x:Me[0],y:Me[1],z:Me[2]});Ie.push(Ce.clone().multiplyScalar(t.moonDistance(Te,"moon")/Math.max(1e-9,ot))),st[ke]=Te;const T=Ce.normalize();P[ke*3]=T.x,P[ke*3+1]=T.y,P[ke*3+2]=T.z}const je=new ut().setFromPoints(Ie),We=new Jo({color:5599392,transparent:!0,opacity:.45});X=new Cu(je,We),X.userData.geo=je,X.userData.mat=We,X.userData.radii=st,X.userData.unitDirs=P,f.push(je,We)}else X=JM(v.elements,Ee),E||s.add(X)}const $=E&&v.parent?g.get(v.parent)??null:null,ge=v.rings?2*A*v.rings.outer:2*A,he={def:v,pivot:O,mesh:k,label:Fe,orbit:X,orbitEmphasis:V,ringsMesh:j,atmosphereMesh:G,parent:$,spin:0,worldPos:new w,sceneRadius:A,visibleRadius:H,trueRadius:D,builtRadius:A,cloudsMesh:null,frameExtent:ge};g.set(v.id,he)}for(const v of g.values())v.orbit&&v.parent&&(v.orbit.removeFromParent(),v.parent.pivot.add(v.orbit));const m=[];for(const v of Y2){const x=aM(v);m.push(x),s.add(x.mesh),s.add(x.points)}Up({belts:m},0,t,0);function p(){for(const v of f)v.dispose();for(const v of m)v.dispose();for(const v of g.values())v.cloudsMesh&&(v.cloudsMesh.geometry.dispose(),v.cloudsMesh.material.dispose()),v.atmosphereMesh&&v.atmosphereMesh.disposeAtmosphere();l.userData.dispose?.();for(const v of u.children){const x=v;x.geometry.dispose(),x.material.dispose()}a.dispose(),i.dispose()}return{renderer:i,camera:r,controls:a,scene:s,bodies:g,belts:m,sunLight:o,skybox:c,constellations:l,constellationFigures:u,post:d,sunGlow:h.sprite,userData:{},dispose:p}}const vt=4800;function Fu(n){let e=0,t=0,i=0;for(const r of n.stars){const[a,o,c]=$o(r.raHours,r.decDeg);e+=a,t+=o,i+=c}const s=Math.hypot(e,t,i)||1;return[e/s,t/s,i/s]}function Gr(n,e){return n[0]*e[0]+n[1]*e[1]+n[2]*e[2]}function No(n,e){return[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]]}function vo(n){const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]}function nc(n){const e=Fu(n),t=n.stars.map(m=>$o(m.raHours,m.decDeg)),i=Math.abs(e[1])<.9?[0,1,0]:[1,0,0],s=vo(No(e,i)),r=No(e,s);let a=0,o=0,c=0;for(const m of t){const p=Gr(m,s),v=Gr(m,r);a+=p*p,c+=p*v,o+=v*v}const l=.5*Math.atan2(2*c,a-o),u=Math.cos(l),d=Math.sin(l);let h=[s[0]*u+r[0]*d,s[1]*u+r[1]*d,s[2]*u+r[2]*d],f=0,g=0;for(const m of t){const p=Gr(m,h);p>f&&(f=p),-p>g&&(g=-p)}return g>f&&(h=[-h[0],-h[1],-h[2]]),{halfExtent:Math.max(f,g),axis:h,labelDir:m=>{const p=Math.cos(m),v=Math.sin(m);return[e[0]*p+h[0]*v,e[1]*p+h[1]*v,e[2]*p+h[2]*v]}}}const Wh=22,el=48;function $M(n,e){const t=n[0]*e[0]+n[1]*e[1]+n[2]*e[2],i=Math.PI/180,s=Math.acos(Math.min(1,Math.max(-1,t)))/i;return s<=Wh?1:s>=el?0:(el-s)/(el-Wh)}const ks=.28,Xh=1,eS=.5,Yh=.05,tS=1,nS=.75;function zu(n){return Yh+(tS-Yh)*Math.pow(n,nS)}const Vr=9416959,Ql=8191066,iS=0,$l=.45,sS=.7,rS=8,aS=11,oS=.15,cS=2.5;function Ir(n){const e=2*Math.PI*(n/cS);return 1-oS*(1-Math.sin(e))/2}const lS=.02,uS=.35,dS=.016,hS=.011,fS=.018;function Bu(n){return nc(n).halfExtent<=fS?hS:dS}function pS(n){const e=Bu(n),t=ec(n.name).fontSize;return e*(hn/t)}function ku(n){return ec(n.name).inkWidthPx/hn*pS(n)}function mS(n){const e=nc(n);return Math.min(e.halfExtent,uS)+lS+ku(n)/2}const jh=.006;function gS(n,e){const t=vo(e),i=ku(n)/2,s=Bu(n)/2,r=Math.abs(t[1])<.9?[0,1,0]:[1,0,0],a=vo(No(t,r)),o=vo(No(t,a)),c=n.stars.map(u=>$o(u.raHours,u.decDeg)),l=u=>Math.abs(Gr(u,a))<i+jh&&Math.abs(Gr(u,o))<s+jh;for(const[u,d]of n.lines)for(let h=0;h<=1.0001;h+=.05){const f=[c[u][0]+(c[d][0]-c[u][0])*h,c[u][1]+(c[d][1]-c[u][1])*h,c[u][2]+(c[d][2]-c[u][2])*h];if(l(f))return!0}for(const u of c)if(l(u))return!0;return!1}const _S=[1,1.5],vS=[1,-1],Kh=.004,xS=.25,MS=10;function Rp(n){const e=n.map((s,r)=>{const a=nc(s),o=Fu(s);return{i:r,pose:a,dir:o,margin0:mS(s),inkHalf:ku(s)/2,halfH:Bu(s)/2+Kh/2}}),t=e.map(s=>s.i).sort((s,r)=>{const a=e[r].pose.halfExtent-e[s].pose.halfExtent;return a!==0?a:n[s].name.localeCompare(n[r].name)}),i=new Array(n.length).fill(null);for(const s of t){const r=e[s];let a=null;for(const c of vS)for(const l of _S){const u=r.margin0*l,d=Math.cos(u),h=c*Math.sin(u),f=[r.dir[0]*d+r.pose.axis[0]*h,r.dir[1]*d+r.pose.axis[1]*h,r.dir[2]*d+r.pose.axis[2]*h];let g=xS*(l-1);gS(n[s],f)&&(g+=MS);for(const _ of t){const m=i[_];m&&(g+=SS(r,f,m))}(!a||g<a.score)&&(a={score:g,side:c,marginScale:l,dir:f,offset:u})}const o=a;i[s]={side:o.side,marginScale:o.marginScale,dir:o.dir,inkHalf:r.inkHalf+Kh/2,halfH:r.halfH,offset:o.offset}}return i}function SS(n,e,t){const i=n.inkHalf+t.inkHalf,s=n.halfH+t.halfH;let r=e[0]+t.dir[0],a=e[1]+t.dir[1],o=e[2]+t.dir[2];const c=Math.hypot(r,a,o);if(c<1e-6)return 0;r/=c,a/=c,o/=c;let l=a*e[2]-o*e[1],u=o*e[0]-r*e[2],d=r*e[1]-a*e[0];const h=Math.hypot(l,u,d);if(h<1e-6)return 0;l/=h,u/=h,d/=h;const f=a*d-o*u,g=o*l-r*d,_=r*u-a*l,m=l*e[0]+u*e[1]+d*e[2],p=f*e[0]+g*e[1]+_*e[2],v=l*t.dir[0]+u*t.dir[1]+d*t.dir[2],x=f*t.dir[0]+g*t.dir[1]+_*t.dir[2],E=(m-v)/i,R=(p-x)/s,A=E*E+R*R;return A<1?1-A:0}const tl=2,qh=2756,nl=.5;function Lp(n){if(n<=tl)return nl;if(n>=qh)return 1;const e=(n-tl)/(qh-tl);return nl+(1-nl)*e*e*(3-2*e)}function yS(){const n=new yi;n.name="constellations";const e=new Ro({color:13623551,size:3.2,sizeAttenuation:!1,transparent:!0,opacity:.9,depthWrite:!1}),t=Rp(kt),i=[],s=[],r=[],a=[],o=[],c=[],l=[],u=[];for(let f=0;f<kt.length;f++){i.push(t[f].dir);const g=kt[f],_=g.stars.map(W=>{const[V,j,G]=$o(W.raHours,W.decDeg);return[V*vt,j*vt,G*vt]}),m=[];for(const[W,V]of g.lines)m.push(..._[W],..._[V]);const p=new ut;p.setAttribute("position",new at(m,3));const v=new Jo({color:Vr,transparent:!0,opacity:ks,depthWrite:!1});v.userData.baseColor=Vr;const x=new xh(p,v);x.name=`constellation-lines-core:${g.name}`,x.renderOrder=3,n.add(x);const E=new Jl;E.setPositions(m);const R=new Io({color:Vr,transparent:!0,opacity:ks,depthWrite:!1,linewidth:rS,worldUnits:!0});R.resolution.set(1,1);const A=new Zc(E,R);A.name=`constellation-lines:${g.name}`,A.renderOrder=2,A.computeLineDistances(),n.add(A),o.push(E),c.push(R);const D=new Jl;D.setPositions(m);const H=new Io({color:iS,transparent:!0,opacity:$l,depthWrite:!1,linewidth:aS,worldUnits:!0});H.resolution.set(1,1);const b=new Zc(D,H);b.name=`constellation-lines-halo:${g.name}`,b.renderOrder=1,b.computeLineDistances(),n.add(b),l.push(D),u.push(H);const S=(vt+4)/vt,C=[];for(const W of _)C.push(W[0]*S,W[1]*S,W[2]*S);const k=new ut;k.setAttribute("position",new at(C,3));const O=new Ro({color:Ql,size:5.2,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1}),Y=new Zr(k,O);Y.name=`constellation-stars-emph:${g.name}`,Y.visible=!1,Y.renderOrder=4,n.add(Y),r.push(k),a.push(O);for(const W of _)s.push(...W)}const d=new ut;d.setAttribute("position",new at(s,3));const h=new Zr(d,e);return h.name="constellation-stars",h.renderOrder=4,n.add(h),n.userData.labelDirs=i,n.userData.dispose=()=>{for(const f of n.children){const g=f;(g instanceof xh||g instanceof Zc)&&(g.geometry.dispose(),g.material.dispose())}for(const f of r)f.dispose();for(const f of a)f.dispose();for(const f of o)f.dispose();for(const f of c)f.dispose();for(const f of l)f.dispose();for(const f of u)f.dispose();d.dispose(),e.dispose()},n}const Wr=new Map(kt.map((n,e)=>[n.name,e])),Zh=new Map;function ES(n){return`constellation-figures/${n.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g,"_")}.png`}function bS(){const n=new yi;n.name="constellation-figures",n.visible=!1;const e=new Hu;for(const t of cM){if(!Wr.has(t.constellation))continue;let i=Zh.get(t.constellation);i||(i=e.load(ES(t.constellation)),Zh.set(t.constellation,i)),i.colorSpace=Mt,i.anisotropy=4;const s=lM(t),r=new rs({map:i,transparent:!0,opacity:0,depthWrite:!1,side:fn}),a=new pt(new la(1,1),r),o=vt*.998;a.position.set(s.position[0]*o,s.position[1]*o,s.position[2]*o),a.up.set(s.upHint[0],s.upHint[1],s.upHint[2]),a.lookAt(0,0,0),a.rotateZ(s.rotationRad),a.scale.set(s.planeSize[0]*vt,s.planeSize[1]*vt,1),a.name=`constellation-figure:${t.constellation}`,n.add(a)}return n}function AS(n,e,t){for(const i of n.children){const s=i.name??"";if(!s.startsWith("constellation-figure:"))continue;const r=Wr.get(s.slice(21));if(r===void 0)continue;const a=e[r]??0,o=Math.min(eS,zu(a))*t;i.visible=o>.005,i.material.opacity=o}}function TS(n,e,t=1,i,s=0){for(const r of n.children){const a=r.name??"";if(a==="constellation-stars"){r.material.opacity=t;continue}if(a.startsWith("constellation-stars-emph:")){if(Wr.get(a.slice(25))===void 0)continue;const _=i!=null&&i!==""&&a===`constellation-stars-emph:${i}`,m=r.material;_?m.opacity=Ir(s):m.opacity=0,r.visible=m.opacity>.005;continue}const o=a.startsWith("constellation-lines-halo:")?a.slice(25):null;if(o!==null){const g=Wr.get(o);if(g===void 0)continue;const _=e[g]??0,m=i!=null&&i!==""&&o===i,p=r.material;m?p.opacity=Ir(s):p.opacity=($l+(sS-$l)*_)*t;continue}const c=a.startsWith("constellation-lines-core:")?a.slice(25):null,l=c===null&&a.startsWith("constellation-lines:")?a.slice(20):null,u=c??l;if(u===null)continue;const d=Wr.get(u);if(d===void 0)continue;const h=e[d]??0,f=i!=null&&i!==""&&u===i;if(c!==null){const g=r.material;f?(g.color.setHex(Ql),g.opacity=Ir(s)):(g.color.setHex(Vr),g.opacity=(ks+(Xh-ks)*h)*t);continue}{const g=r.material;f?(g.color.setHex(Ql),g.opacity=Ir(s)):(g.color.setHex(Vr),g.opacity=(ks+(Xh-ks)*h)*t)}}}function Ip(n,e,t){let i=n.userData.updateOrder;i||(i=[...n.bodies.values()].sort((a,o)=>{const c=a.parent?1:0,l=o.parent?1:0;return c-l}),n.userData.updateOrder=i);const s=wS,r=DS;for(const a of i){const{def:o,pivot:c}=a;if(o.kind==="star")c.position.set(0,0,0),a.worldPos.set(0,0,0);else if((o.kind==="planet"||o.kind==="dwarf")&&o.elements){const l=Ho(o.elements,e,r),u=Vh(l,s),d=Math.hypot(l.x,l.y,l.z),h=t.planetDistance(d)/Math.max(1e-9,d);c.position.copy(u.multiplyScalar(h)),a.worldPos.copy(c.position)}else if(o.kind==="moon"&&o.elements){let l;if(o.id==="moon"){const m=da(e);l={x:m[0],y:m[1],z:m[2]}}else l=Ho(o.elements,e,r);const u=Vh(l,s),d=Math.hypot(l.x,l.y,l.z),h=o.id==="moon"?d*oi:d,f=t.moonDistance(h,o.id)/Math.max(1e-9,d),g=u.multiplyScalar(f),_=a.parent;_?(g.applyQuaternion(_.pivot.quaternion),c.position.copy(_.worldPos).add(g)):c.position.copy(g),a.worldPos.copy(c.position)}}}const wS=new w,DS={x:0,y:0,z:0},Jh=new Map;function Hp(n){let e=Jh.get(n.def.id);if(e===void 0){const t=(n.def.a[0]+n.def.a[1])/2;e=Tp(t),Jh.set(n.def.id,e)}return e}function Up(n,e,t,i){for(const s of n.belts)oM(s,e,t,t.beltSizeFactor),Ap(s,i,Hp(s),t.beltSizeFactor??1)}function PS(n,e,t){for(const i of n.belts)Ap(i,t,Hp(i),e.beltSizeFactor??1)}function CS(n,e){for(const i of n.bodies.values()){const s=i.visibleRadius+(i.trueRadius-i.visibleRadius)*e,r=Math.max(1e-7,s/i.builtRadius);i.mesh.scale.setScalar(r),i.ringsMesh&&i.ringsMesh.scale.setScalar(r),i.atmosphereMesh&&i.atmosphereMesh.scale.setScalar(r),i.orbitEmphasis.scale.setScalar(Math.max(.001,s));const a=i.def.kind==="star"?3.4:Math.max(1.3,s*2.4);i.label.scale.set(a,a*.25,1),i.label.position.y=s+a*.35,i.label.material.opacity=1,i.sceneRadius=s}const t=n.bodies.get("sun");t&&n.sunGlow.scale.set(t.sceneRadius*4.5,t.sceneRadius*4.5,1)}function RS(n,e,t){const i=n.userData.radii,s=n.userData.unitDirs,r=n.userData.geo;if(!i||!s||!r)return;const a=r.getAttribute("position"),o=i.length;for(let c=0;c<o;c++){const l=i[c],u=t?e.moonDistance(l,t):e.planetDistance(l);a.setXYZ(c,s[c*3]*u,s[c*3+1]*u,s[c*3+2]*u)}a.needsUpdate=!0,r.computeBoundingSphere()}function Np(n,e,t){const i=n.userData.radii,s=n.userData.unitDirs,r=n.userData.geo;if(!i||!s||!r)return;const a=r.getAttribute("position"),o=27.55455;for(let c=0;c<=128;c++){const l=da(e+c/128*o),d=Math.hypot(l[0],l[1],l[2])*oi,f=Uo({x:l[0],y:l[1],z:l[2]}).normalize();i[c]=d,s[c*3]=f.x,s[c*3+1]=f.y,s[c*3+2]=f.z;const g=t.moonDistance(d,"moon");a.setXYZ(c,f.x*g,f.y*g,f.z*g)}a.needsUpdate=!0,r.computeBoundingSphere()}function LS(n,e){for(const t of n.bodies.values()){if(!t.def.rotationHours)continue;const i=t.def.rotationHours/24;t.spin+=e/Math.abs(i)*Math.PI*2*Math.sign(i),t.mesh.rotation.y=t.spin,t.cloudsMesh&&(t.cloudsMesh.rotation.y=t.spin*.05)}}function IS(n,e){const t=n.elements?n.elements.a:0;return e.moonDistance(t,n.id)}function Op(n,e){let t=0;for(const i of Nu)i.parent===n&&(t=Math.max(t,IS(i,e)));return t}function HS(n,e,t,i){const s=e!==""&&n===e,r=.5+.5*Math.sin(i*3.4);return{ringVisible:s,ringOpacity:s?.35+.55*r:0,ringBreath:1+.12*r,orbitOpacity:t?s?.95:.45:null,orbitColor:t?s?8378623:5599392:null}}function US(n,e,t){for(const i of n.bodies.values()){const s=HS(i.def.id,e,i.orbit!==null,t);if(i.orbitEmphasis.visible=s.ringVisible,s.ringVisible){const r=i.orbitEmphasis.material;r.opacity=s.ringOpacity,i.orbitEmphasis.scale.setScalar(i.sceneRadius*s.ringBreath)}if(i.orbit&&s.orbitOpacity!==null&&s.orbitColor!==null){const r=i.orbit.material;r.opacity=s.orbitOpacity,r.color.set(s.orbitColor)}}}const NS=30,eu=.02,OS=260,FS=8,Wi=new w;function zS(n,e,t,i){if(Wi.set(n[0]*vt,n[1]*vt,n[2]*vt),Wi.applyMatrix4(e.matrixWorldInverse),Wi.z>=-e.near)return{x:0,y:0,ok:!1};const s=Wi.x/-Wi.z,r=Wi.y/-Wi.z,a=(s*.5+.5)*t,o=(-r*.5+.5)*i;return!Number.isFinite(a)||!Number.isFinite(o)?{x:0,y:0,ok:!1}:{x:a,y:o,ok:!0}}const tu=new Map;function BS(n,e="base"){const t=`${e}:${n}`;let i=tu.get(t);return i||(i=document.createElement("canvas"),i.width=hn,i.height=Ep,W2(i.getContext("2d"),n,e),tu.set(t,i)),i}function kS(n){const e=document.createElement("canvas");e.id="cst-labels",e.style.cssText="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:5;";const t=n.parentElement;return t&&(t.style.position=t.style.position||"relative"),n.insertAdjacentElement("afterend",e),{canvas:e,setVisible:i=>{e.style.display=i?"block":"none"},dispose:()=>{e.remove(),tu.clear()}}}const GS=4;function VS(n,e,t,i,s,r=FS){if(s<=eu)return[];const a=OS,o=GS,c=hn/Ep,l=[];for(const h of n){if(h.occluded||!h.emphasized&&h.emphasis<=0)continue;const f=zu(h.emphasis)*s;if(f<=eu)continue;const g=zS(h.dir,e,t,i);if(!g.ok||g.x<-a||g.x>t+a||g.y<-a||g.y>i+a)continue;const _=NS*(h.emphasized?1.12:1),m=c*_,p=ec(h.name).inkWidthPx/hn;l.push({name:h.name,emphasized:h.emphasized,emphasis:h.emphasis,rank:h.emphasized?1:0,x:g.x,y:g.y,inkW:m*p,h:_,w:m,opacity:Math.min(1,f)})}l.sort((h,f)=>f.rank-h.rank||f.emphasis-h.emphasis);const u=[],d=[];for(const h of l){if(u.length>=r)break;const f=h.x-h.inkW/2-o,g=h.x+h.inkW/2+o,_=h.y-h.h/2-o,m=h.y+h.h/2+o;let p=!1;for(const v of d)if(f<v.x2&&g>v.x1&&_<v.y2&&m>v.y1){p=!0;break}p||(d.push({x1:f,x2:g,y1:_,y2:m}),u.push({name:h.name,emphasized:h.emphasized,x:h.x,y:h.y,w:h.w,h:h.h,opacity:h.opacity}))}return u}function WS(n,e,t,i,s,r){const a=n.canvas,o=Math.min(window.devicePixelRatio,2),c=Math.max(1,Math.round(s*o)),l=Math.max(1,Math.round(r*o));a.width!==c&&(a.width=c),a.height!==l&&(a.height=l);const u=a.getContext("2d");if(u.setTransform(o,0,0,o,0,0),u.clearRect(0,0,s,r),i<=.01)return;const d=VS(t,e,s,r,i);for(const h of d){const f=BS(h.name,h.emphasized?"green":"base");u.globalAlpha=h.opacity,u.drawImage(f,h.x-h.w/2,h.y-h.h/2,h.w,h.h)}u.globalAlpha=1}function Gu(n){const e=Math.min(1,Math.max(0,n));return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2}function Qh(n,e){return[n[0]-e[0],n[1]-e[1],n[2]-e[2]]}function XS(n,e){return[n[0]+e[0],n[1]+e[1],n[2]+e[2]]}const $h=.62,YS=38;function Fp(n,e,t,i=1){const s=t*Math.PI/360,r=Math.atan(Math.tan(s)*i),a=Math.max(e/(2*$h*Math.tan(s)),e/(2*$h*Math.tan(r)),.35),o=YS*Math.PI/180,c=Math.sin(o),l=Math.cos(o);return{pos:[n[0],n[1]+a*c,n[2]+a*l],target:n}}function jS(n,e,t=.85){const i=e*Math.PI/360,s=n/(t*Math.tan(i)),r=.42;return{pos:[0,s*r,s*Math.sqrt(1-r*r)],target:[0,0,0]}}function KS(n,e,t){const i=t*Math.PI/360,s=e/(.08*Math.tan(i)),r=Math.min(s,n*.82),a=.35;return{pos:[0,r*a,r*Math.sqrt(1-a*a)],target:[0,0,0],fov:120}}function qS(n,e,t,i,s=1,r=.55,a=6,o=120){const l=Math.atan2(t*Math.sin(e),t*Math.cos(e)-i)/r,u=180/Math.PI,d=2*l*u,h=2*Math.atan(l/s)*u,f=Math.min(o,Math.max(a,Math.max(d,h)));return{pos:[n[0]*i,n[1]*i,n[2]*i],target:[n[0]*t,n[1]*t,n[2]*t],fov:f}}function ZS(n,e,t){n.t+=e;const i=Gu(n.t/n.duration),s=(l,u)=>l+(u-l)*i,r=t??n.toTarget,a=[s(n.fromTarget[0],r[0]),s(n.fromTarget[1],r[1]),s(n.fromTarget[2],r[2])],o=[s(n.fromOffset[0],n.toOffset[0]),s(n.fromOffset[1],n.toOffset[1]),s(n.fromOffset[2],n.toOffset[2])],c=n.fromFov+(n.toFov-n.fromFov)*i;return{target:a,offset:o,pos:XS(a,o),fov:c,done:n.t>=n.duration}}function ha(n,e,t,i,s,r,a){return{fromTarget:e,fromOffset:Qh(n,e),toTarget:t.target,toOffset:Qh(t.pos,t.target),duration:i,t:0,followId:s,toFov:t.fov??a,fromFov:r}}const JS="textures/planets",QS={day:"_day.jpg",normal:"_normal.jpg",roughness:"_roughness.jpg",clouds:"_clouds.png"};function $S(n,e="day"){return`${JS}/${n}${QS[e]}`}const ef=new Map;function ey(n,e=fetch){let t=ef.get(n);return t||(t=e(n,{method:"HEAD"}).then(i=>i.ok).catch(()=>!1),ef.set(n,t)),t}const tf=new Map;async function ro(n,e,t,i=fetch){const s=`${n}:${e}`,r=tf.get(s);if(r)return r;const a=$S(n,e);if(!await ey(a,i))return null;const o=await new Promise((c,l)=>{t.load(a,c,void 0,l)}).catch(()=>null);return o?(o.colorSpace=e==="normal"||e==="roughness"?Cn:Mt,o.wrapS=$s,tf.set(s,o),o):null}async function ty(n,e,t=fetch){const i=await ro(n,"day",e,t);if(!i)return null;const[s,r,a]=await Promise.all([ro(n,"normal",e,t),ro(n,"roughness",e,t),ro(n,"clouds",e,t)]);return{day:i,normal:s,roughness:r,clouds:a}}function ny(n,e,t){const i=t*1.015,s=new as(i,48,32),r=new Jr({map:e,transparent:!0,opacity:.85,depthWrite:!1,roughness:1,metalness:0}),a=new pt(s,r);return a.name=`clouds:${n.def.name}`,a.castShadow=!1,a.receiveShadow=!1,n.pivot.add(a),{mesh:a,geo:s,mat:r}}async function iy(n,e,t=fetch){let i=0;for(const s of n){const r=s.def.id,a=await ty(r,e,t);if(!a)continue;const o=s.mesh.material;if(o.map=a.day,o instanceof Jr&&(a.normal&&(o.normalMap=a.normal,o.normalScale=new ae(.8,.8)),a.roughness&&(o.roughnessMap=a.roughness,o.roughness=1)),o.needsUpdate=!0,i+=1,a.clouds&&!s.cloudsMesh){const{mesh:c}=ny(s,a.clouds,s.builtRadius);s.cloudsMesh=c}}return i}const Vu=[{bodyId:"sun",duration:2,zoom:3},{bodyId:"sun",duration:1.6,zoom:1},{bodyId:"earth",duration:2.2,zoom:1}],Wu=Vu.reduce((n,e)=>n+e.duration,0),il=.3,nf=1.4,sf=Wu-1.6,sl=Wu-.6;function sy(n,e,t,i){return!(n||e==="0"||t||i)}const zp="solar_intro_seen";function ry(n){return n<il||n>sl?0:n<nf?(n-il)/(nf-il):n<sf?1:(sl-n)/(sl-sf)}const Xu=[{id:"pause",key:"Space",keys:["Space"],label:"Play / pause",hint:"Toggle the clock",group:"time"},{id:"speed-up",key:"ArrowUp",keys:["↑"],label:"Speed up",hint:"Raise sim speed",group:"time"},{id:"speed-down",key:"ArrowDown",keys:["↓"],label:"Slow down",hint:"Lower sim speed",group:"time"},{id:"now",key:"n",keys:["N"],label:"Jump to now",hint:"Reset the clock to today",group:"time"},{id:"reverse",key:"r",keys:["R"],label:"Reverse time",hint:"Run the clock backwards",group:"time"},{id:"orbits",key:"o",keys:["O"],label:"Toggle orbits",hint:"Show / hide orbit lines",group:"view"},{id:"labels",key:"l",keys:["L"],label:"Toggle labels",hint:"Show / hide body labels",group:"view"},{id:"belts",key:"b",keys:["B"],label:"Toggle belts",hint:"Show / hide the asteroid belts",group:"view"},{id:"figures",key:"f",keys:["F"],label:"Toggle figures",hint:"Show / hide constellation figures",group:"view"},{id:"milkyway",key:"m",keys:["M"],label:"Toggle Milky Way",hint:"Show / hide the deep-sky background",group:"sky"},{id:"zodiacal",key:"z",keys:["Z"],label:"Toggle zodiacal light",hint:"Show / hide the sunlit dust glow",group:"sky"},{id:"atmospheres",key:"a",keys:["A"],label:"Toggle atmospheres",hint:"Show / hide the fresnel rims",group:"sky"},{id:"post",key:"p",keys:["P"],label:"Toggle bloom / HDR",hint:"Post-processing on / off (F2)",group:"sky"},{id:"scale",key:"t",keys:["T"],label:"True / visible scale",hint:"Swap the scale mode",group:"camera"},{id:"camera-preset",key:"c",keys:["C"],label:"Camera preset",hint:"Cycle top / side view",group:"camera"},{id:"release",key:"Escape",keys:["Esc"],label:"Release follow",hint:"Stop tracking the picked body",group:"camera"},{id:"screenshot",key:"s",keys:["S"],label:"Save screenshot",hint:"Download a PNG of the view",group:"system"}];function ay(n){return n.map(e=>({id:`jump-${e.id}`,keys:[],label:`Go to ${e.name}`,hint:"Fly the camera to this body",group:"jump"}))}function oy(n){return[...Xu.map(t=>({id:t.id,keys:t.keys,label:t.label,hint:t.hint,group:t.group})),...ay(n)]}function cy(n){const e=n.length===1?n.toLowerCase():n;for(const t of Xu)if((t.key.length===1?t.key.toLowerCase():t.key)===e)return t.id;return/^[1-9]$/.test(n)?`jump-digit-${n}`:n==="0"?"jump-digit-0":null}function ly(n,e,t){if(n==="0")return t;const i=parseInt(n,10)-1;return i<0||i>=e.length?null:e[i].id}function uy(n,e){const t=n.elements;if(!t)return null;const i=Mp(t,e);if(i.n===0)return null;const s=At(t,e),r=n.kind==="moon"?1:oi;return{periodDays:360/Math.abs(i.n),distanceKm:Math.hypot(s.x,s.y,s.z)*r,perihelionKm:i.a*(1-i.e)*r,aphelionKm:i.a*(1+i.e)*r}}function dy(n){if(!Number.isFinite(n)||n<=0)return"—";if(n<2)return`${(n*24).toFixed(1)} h`;if(n<365)return`${n.toFixed(1)} d`;const e=n/365.25;return`${e>=100?e.toFixed(0):e>=10?e.toFixed(1):e.toFixed(2)} yr`}function Hr(n){return!Number.isFinite(n)||n<0?"—":n<1e6?`${Math.round(n).toLocaleString("en-US")} km`:n<1e8?`${(n/1e6).toFixed(1)} M km`:`${(n/1e9).toFixed(2)} B km`}const hy={sun:"The Sun holds 99.86% of the Solar System’s mass.",mercury:"A Mercury year is just 88 days, yet one of its days lasts 176 Earth days.",venus:"Venus spins backwards, so there the Sun rises in the west.",earth:"The only known world with liquid-water oceans on its surface.",mars:"Home to Olympus Mons, the tallest volcano in the Solar System.",jupiter:"The Great Red Spot is a storm wider than Earth, raging for centuries.",saturn:"Its rings are mostly water ice, yet the system is barely 1 km thick in places.",uranus:"Uranus rolls around the Sun on its side — tilted about 98°.",neptune:"Winds here reach ~2,100 km/h, the fastest in the Solar System.",moon:"The Moon drifts away from Earth by about 3.8 cm each year.",pluto:"Pluto’s bright heart is Sputnik Planitia, a nitrogen-ice plain."};function fy(n){if(!Number.isFinite(n)||n===0)return"—";const e=n<0,t=Math.abs(n),i=t<48?`${t.toFixed(1)} h`:`${(t/24).toFixed(1)} d`;return e?`${i} (retrograde)`:i}function py(n){const e=[{label:"Radius",value:Hr(n.radiusKm)},{label:"Day length",value:fy(n.rotationHours)},{label:"Axial tilt",value:`${n.tiltDeg.toFixed(0)}°`}],t=hy[n.id];return t&&e.push({label:"Fun fact",value:t}),e}function my(n){return n.paused&&!n.cameraMoving&&!n.scrubbing&&!n.flightActive&&!n.morphActive&&!n.skyTourActive&&!n.introActive}const Bp=Number.isFinite;function rf(n){if(n==null||n==="")return;const e=Number(n);return Bp(e)?e:void 0}function Xi(n){if(!(n==null||n===""))return n==="1"||n==="true"}function gy(n){const t=new URL(n,"http://localhost").searchParams,i={},s=rf(t.get("t"));s!==void 0&&(i.timeMs=s);const r=rf(t.get("sp"));r!==void 0&&(i.speedLog=r);const a=t.get("f");a!=null&&(i.follow=a);const o=t.get("c");o!=null&&(i.constellation=o);const c=t.get("sc");c==="t"?i.scale="true":c==="v"&&(i.scale="visible");const l=Xi(t.get("o"));l!==void 0&&(i.orbits=l);const u=Xi(t.get("l"));u!==void 0&&(i.labels=u);const d=Xi(t.get("b"));d!==void 0&&(i.belts=d);const h=Xi(t.get("fig"));h!==void 0&&(i.figures=h);const f=Xi(t.get("p"));f!==void 0&&(i.paused=f);const g=Xi(t.get("rv"));g!==void 0&&(i.reversed=g);const _=Xi(t.get("ev"));_!==void 0&&(i.eventsOpen=_);const m=t.get("cam");if(m){const p=m.split(",").map(Number);p.length===6&&p.every(Bp)&&(i.cam={pos:[p[0],p[1],p[2]],target:[p[3],p[4],p[5]]})}return i}function kp(n,e){const t=new URL(n,"http://localhost"),i=t.searchParams,s=(o,c)=>{c===void 0?i.delete(o):i.set(o,c)};if(s("t",e.timeMs!==void 0?String(Math.round(e.timeMs)):void 0),s("sp",e.speedLog!==void 0?String(af(e.speedLog)):void 0),s("f",e.follow===void 0?void 0:e.follow),s("c",e.constellation===void 0?void 0:e.constellation),s("sc",e.scale===void 0?void 0:e.scale==="true"?"t":"v"),s("o",e.orbits===void 0?void 0:e.orbits?"1":"0"),s("l",e.labels===void 0?void 0:e.labels?"1":"0"),s("b",e.belts===void 0?void 0:e.belts?"1":"0"),s("fig",e.figures===void 0?void 0:e.figures?"1":"0"),s("p",e.paused===void 0?void 0:e.paused?"1":"0"),s("rv",e.reversed===void 0?void 0:e.reversed?"1":"0"),s("ev",e.eventsOpen===void 0?void 0:e.eventsOpen?"1":"0"),e.cam){const[o,c,l,u,d,h]=[...e.cam.pos,...e.cam.target].map(af);s("cam",`${o},${c},${l},${u},${d},${h}`)}else i.delete("cam");const r=i.toString();return`${t.origin.startsWith("http")&&n.includes("://")?`${t.origin}${t.pathname}`:t.pathname}${r?`?${r}`:""}${t.hash}`}function af(n){return Math.round(n*1e6)/1e6}const rl=Math.PI/180,Yu=180/Math.PI,sr=Xt.map(n=>n.id),ic=new Map(Xt.map(n=>[n.id,n])),an=ic.get("earth"),_y=Nu.find(n=>n.id==="moon"),vy=["mercury","venus"],xy=["mars","jupiter","saturn","uranus","neptune"];function Ci(n){return Math.hypot(n.x,n.y,n.z)}function os(n,e){return{x:n.x-e.x,y:n.y-e.y,z:n.z-e.z}}function $r(n){return{x:-n.x,y:-n.y,z:-n.z}}function cs(n,e){const t=n.x*e.x+n.y*e.y+n.z*e.z,i=Ci(n),s=Ci(e);if(i===0||s===0)return 0;const r=Math.min(1,Math.max(-1,t/(i*s)));return Math.acos(r)*Yu}function ns(n,e){const t=n/e;return t>=1?90:t<=0?0:Math.asin(t)*Yu}function My(n){return gn+Math.round(n*864e5)}function fa(n,e){return e||Math.min(2,Math.max(.25,n/2e4))}function ju(n,e,t){const i=[];for(let s=n;s<=e+1e-9;s+=t)i.push(s);return(i.length===0||i[i.length-1]<e)&&i.push(e),i}function pa(n,e,t,i,s=48){const r=(Math.sqrt(5)-1)/2,a=u=>i?-n(u):n(u);let o=e,c=t;for(let u=0;u<s;u++){const d=c-r*(c-o),h=o+r*(c-o);a(d)<a(h)?c=h:o=d}const l=(o+c)/2;return{t:l,value:n(l)}}function rr(n,e,t,i,s,r){return{type:n,tDays:e,dateMs:My(e),title:t,detail:i,bodyId:s,bodyId2:r}}function Ku(n,e,t){const i=ju(n,e,t),s=Xt.map(r=>i.map(a=>At(r.elements,a)));return{times:i,pos:s}}function qu(n,e,t){return os(n.pos[e][t],n.pos[sr.indexOf("earth")][t])}function al(n){const e=At(an.elements,n),t=$r(e),[i,s,r]=da(n),a={x:i,y:s,z:r},o=cs(t,a),c=Ci(e)*oi,l=Ci(a)*oi;return{sep:o,sunR:ns(Uu.radiusKm,c),moonR:ns(_y.radiusKm,l),dSunKm:c,dMoonKm:l}}function Sy(n,e,t){const i=fa(e-n,t?.coarseStepDays),s=ju(n,e,i),r=s.map(o=>al(o).sep),a=[];for(let o=1;o<r.length-1;o++){const c=r[o],l=c<r[o-1]&&c<r[o+1],u=c>r[o-1]&&c>r[o+1];if(!l&&!u)continue;const d=s[o],{t:h}=pa(g=>al(g).sep,d-2,d+2,u),f=al(h);if(l){const g=ns(an.radiusKm,f.dMoonKm);if(f.sep<f.sunR+f.moonR+g){const _=f.sep<f.moonR-f.sunR?"Total solar eclipse":f.sep<f.sunR-f.moonR?"Annular solar eclipse":"Partial solar eclipse";a.push(rr("solar-eclipse",h,"Solar eclipse",`${_} · Sun–Moon sep ${f.sep.toFixed(2)}°`,"sun","moon"))}}else{const g=180-f.sep,[_,m,p]=da(h),v=Ci({x:_,y:m,z:p})*oi,x=ns(an.radiusKm,v)-f.sunR,E=ns(an.radiusKm,v)+f.sunR;if(g<f.moonR+E){const R=g<x-f.moonR?"Total lunar eclipse":g<x+f.moonR?"Partial lunar eclipse":"Penumbral lunar eclipse";a.push(rr("lunar-eclipse",h,"Lunar eclipse",`${R} · ${g.toFixed(2)}° from opposition`,"moon"))}}}return a}function yy(n,e,t){const i=Ku(n,e,fa(e-n,t?.coarseStepDays)),s=sr.indexOf("earth"),r=[];for(const a of vy){const o=sr.indexOf(a),c=ic.get(a),l=i.times.map((u,d)=>{const h=qu(i,o,d),f=$r(i.pos[s][d]);return cs(h,f)});for(let u=1;u<l.length-1;u++){if(!(l[u]<l[u-1]&&l[u]<l[u+1])||l[u]>30)continue;const d=i.times[u],h=E=>{const R=os(At(c.elements,E),At(an.elements,E)),A=$r(At(an.elements,E));return cs(R,A)},{t:f,value:g}=pa(h,d-2,d+2,!1),_=Ci(At(an.elements,f))*oi,m=os(At(c.elements,f),At(an.elements,f)),p=Ci(m)*oi,v=ns(Uu.radiusKm,_),x=ns(c.radiusKm,p);if(g<v+x){const E=g<v-x?"Transit (planet fully on the Sun)":"Partial transit";r.push(rr("transit",f,`${c.name} transit`,`${E} · sep ${g.toFixed(2)}°`,a))}}}return r}function Ey(n,e,t){const i=t?.conjunctionDeg??1,s=Ku(n,e,fa(e-n,t?.coarseStepDays));sr.indexOf("earth");const r=s.times.length,a=[],o=Xt.map((c,l)=>{const u=new Array(r);for(let d=0;d<r;d++)u[d]=qu(s,l,d);return u});for(let c=0;c<Xt.length;c++)for(let l=c+1;l<Xt.length;l++){const u=d=>cs(o[c][d],o[l][d]);for(let d=1;d<r-1;d++){const h=u(d);if(!(h<u(d-1)&&h<u(d+1))||h>i*2.5)continue;const f=s.times[d],g=p=>{const v=os(At(Xt[c].elements,p),At(an.elements,p)),x=os(At(Xt[l].elements,p),At(an.elements,p));return cs(v,x)},{t:_,value:m}=pa(g,f-2,f+2,!1);if(m<i){const p=Xt[c].name,v=Xt[l].name;a.push(rr("conjunction",_,`${p}–${v} conjunction`,`sep ${m.toFixed(2)}°`,Xt[c].id,Xt[l].id))}}}return a}function by(n,e,t){const i=t?.oppositionDeg??170,s=Ku(n,e,fa(e-n,t?.coarseStepDays)),r=sr.indexOf("earth"),a=[];for(const o of xy){const c=sr.indexOf(o),l=ic.get(o),u=s.times.map((d,h)=>cs(qu(s,c,h),$r(s.pos[r][h])));for(let d=1;d<u.length-1;d++){if(!(u[d]>u[d-1]&&u[d]>u[d+1])||u[d]<170)continue;const h=s.times[d],f=m=>cs(os(At(l.elements,m),At(an.elements,m)),$r(At(an.elements,m))),{t:g,value:_}=pa(f,h-3,h+3,!0);_>i&&a.push(rr("opposition",g,`${l.name} opposition`,`elongation ${_.toFixed(2)}° from the Sun`,o))}}return a}function Ay(){const n=40.588*rl,e=83.537*rl,t=23.4392911*rl,i=Math.cos(e)*Math.cos(n),s=Math.cos(e)*Math.sin(n),r=Math.sin(e),a=s*Math.cos(t)+r*Math.sin(t),o=-s*Math.sin(t)+r*Math.cos(t),c=Math.hypot(i,a,o);return{x:i/c,y:a/c,z:o/c}}const ol=Ay();function of(n){const e=At(ic.get("saturn").elements,n),t=At(an.elements,n),i=os(t,e),s=Math.abs(i.x*ol.x+i.y*ol.y+i.z*ol.z),r=Math.min(1,s/(Ci(i)||1));return 90-Math.acos(r)*Yu}function Ty(n,e,t){const i=t?.edgeOnDeg??2,s=fa(e-n,t?.coarseStepDays),r=ju(n,e,s),a=r.map(of),o=[];for(let l=1;l<a.length-1;l++){if(!(a[l]<a[l-1]&&a[l]<a[l+1])||a[l]>i*2.5)continue;const u=r[l],{t:d,value:h}=pa(of,u-45,u+45,!1);h<i&&o.push(rr("saturn-edge-on",d,"Saturn rings edge-on",`ring plane tilt ${h.toFixed(2)}° from Earth`,"saturn"))}o.sort((l,u)=>l.tDays-u.tDays);const c=[];for(const l of o){const u=c[c.length-1];if(u&&l.tDays-u.tDays<30){const d=h=>parseFloat(h.detail.match(/tilt ([\d.]+)/)?.[1]??"99");d(l)<d(u)&&(c[c.length-1]=l)}else c.push(l)}return c}function Gp(n,e,t){const i=[...Sy(n,e,t),...yy(n,e,t),...Ey(n,e,t),...by(n,e,{coarseStepDays:t?.coarseStepDays}),...Ty(n,e,t)];return i.sort((s,r)=>s.dateMs-r.dateMs),i}const wy=1,Dy=.01,Py=-3,Cy=2.5;function Vp(n){const e=Date.UTC(n,0,1),t=Date.UTC(n+1,0,1);return{span0Days:(e-gn)/864e5,spanLenDays:(t-e)/864e5}}function Ry(n,e,t,i){const s=n+i*wy;return Math.max(e,Math.min(e+t-1e-6,s))}function Ly(n,e){const t=n-e*Dy;return Math.max(Py,Math.min(Cy,t))}const Iy={sun:"☀️",moon:"🌙",mercury:"⚪",venus:"💛",earth:"🌍",mars:"🔴",jupiter:"🟠",saturn:"🪐",uranus:"🔵",neptune:"🟣"},Hy={"solar-eclipse":"🌑","lunar-eclipse":"🌕","saturn-edge-on":"🪐"};function Uy(n){const e=Hy[n.type];if(e)return e;const t=i=>i&&Iy[i]||"●";return n.type==="transit"?t(n.bodyId):n.type==="conjunction"?t(n.bodyId)+t(n.bodyId2):n.type==="opposition"?t(n.bodyId):"✦"}const Ny=40;function sc(n,e,t,i,s=Ny){const r=e>0?e:1,a=l=>Math.max(0,Math.min(1,(l-n)/r)),o=t.filter(l=>l.tDays>=n-1e-6&&l.tDays<n+r+1e-6).map(l=>({frac:a(l.tDays),emoji:Uy(l),title:l.title})).sort((l,u)=>l.frac-u.frac),c=Math.max(0,o.length-s);return{markers:o.slice(0,s),overflow:c,caretFrac:a(i)}}const Wp=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Oy(n){const e=n,t=[];for(let i=0;i<12;i++){const s=(Date.UTC(2001,i,1)-Date.UTC(2001,0,1))/864e5;s>=e||t.push({abbr:Wp[i],day:s,frac:s/e})}return t}function cf(n,e){const t=new Date(Date.UTC(n,0,1+Math.floor(e)));return`${Wp[t.getUTCMonth()]} ${t.getUTCDate()}`}function Fy(n,e,t){let i=null,s=1/0;for(const r of n){const a=Math.abs(r.x-e);a<=t&&a<s&&(s=a,i=r)}return i}const Wt=56,zy=4;function By(n){const e=Math.max(0,1-n/Wt);return 1+(zy-1)*e*e}function ao(n,e){const t=Math.sqrt(n*n+e*e);if(t>=Wt)return null;const i=By(t);return{x:n*i,y:e*i,scale:i}}function lf(n,e){return Math.max(0,Math.min(e,n))}const ky=["January","February","March","April","May","June","July","August","September","October","November","December"];function Gy(n,e){return new Date(Date.UTC(n,e+1,0)).getUTCDate()}function Vy(n,e){return new Date(Date.UTC(n,e,1)).getUTCDay()}function Wy(n,e){const t=Gy(n,e),i=Vy(n,e),s=new Array(42).fill(0);for(let r=1;r<=t;r++)s[i+(r-1)]=r;return{grid:s,daysInMonth:t,firstWeekday:i}}function Xy(n,e){return`${ky[e]} ${n}`}function uf(n,e){return n.getUTCFullYear()===e.getUTCFullYear()&&n.getUTCMonth()===e.getUTCMonth()&&n.getUTCDate()===e.getUTCDate()}const Yy=.5,df=864e5,nu=new Map;function Xp(n){const e=Date.UTC(n,0,1),t=Date.UTC(n+1,0,1);return{span0Days:(e-gn)/df,spanLenDays:(t-e)/df}}function Yp(n){return nu.has(n)}function jp(n){const e=nu.get(n);if(e)return e;const{span0Days:t,spanLenDays:i}=Xp(n),s=Gp(t,t+i,{coarseStepDays:Yy}),r={year:n,span0Days:t,spanLenDays:i,events:s};return nu.set(n,r),r}"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js").catch(()=>{})});const jy=.15;let Ti=null,Oo=!1;function ea(){Ti&&(Ti=null,N.controls.enabled=!0,N.controls.update())}function Ky(){const n=N.camera.position,e=n.length();if(e<1e-6)return;const t=Math.acos(Math.min(1,Math.max(-1,n.y/e)));Ti={theta:Math.atan2(n.x,n.z),phi:t,radius:e},N.controls.enabled=!1}function qy(n){if(!Ti)return;Ti.theta+=jy*n;const{theta:e,phi:t,radius:i}=Ti,s=Math.sin(t);N.camera.position.set(i*s*Math.sin(e),i*Math.cos(t),i*s*Math.cos(e)),N.camera.lookAt(0,0,0)}for(const n of["pointerdown","wheel","keydown","touchstart"])window.addEventListener(n,ea,{passive:!0});const Fo=kt.map(n=>Fu(n)),Zy=kt.map(n=>nc(n).halfExtent),zo=new Float32Array(kt.length),Jy=200;let hf=0,ar="";const oo=new w;let Ri=null;const Qy=Rp(kt).map(n=>n.dir),cl=new pp,ff=new w;function $y(){oo.set(0,0,-1).applyQuaternion(N.camera.quaternion);const n=oo.x,e=oo.y,t=oo.z;for(let i=0;i<Fo.length;i++){const s=Fo[i];zo[i]=$M(s,[n,e,t])}}function eE(n){if(n-hf<Jy)return;const e=N.camera.position,t=`${e.x.toFixed(2)}|${e.y.toFixed(2)}|${e.z.toFixed(2)}|${N.camera.quaternion.w.toFixed(3)}|${jt}`;if(t===ar)return;hf=n,ar=t;const i=Lp(N.camera.position.length());TS(N.constellations,zo,i,jt||null,n/1e3),pr&&AS(N.constellationFigures,zo,i)}function tE(n){if(!jt)return;const e=N.constellations.children.find(t=>t.name===`constellation-lines:${jt}`);e&&(e.material.opacity=Ir(n/1e3))}const Nt=document.getElementById("app"),on=document.getElementById("date"),or=document.getElementById("speed"),nE=document.getElementById("speed-value"),Bo=document.getElementById("pause"),js=document.getElementById("reverse"),iE=document.getElementById("now"),Li=document.getElementById("find"),ti=document.getElementById("find-list"),cr=document.getElementById("orbits"),On=document.getElementById("labels"),lr=document.getElementById("belts"),Ks=document.getElementById("figures");let pr=!1;const co=document.getElementById("share"),Ur=document.getElementById("screenshot"),Nr=document.getElementById("tooltip"),Cr=document.getElementById("info"),ko=document.getElementById("gl-lost");let Ut=null;const qs=document.getElementById("intro"),lo=document.getElementById("intro-title"),Ei=document.getElementById("intro-skip"),ta=document.getElementById("palette"),$i=document.getElementById("palette-input"),Or=document.getElementById("palette-list");let ur=!1,Go="",Si=0,na=[],ll=!0,Vo=!0,iu=!0,uo=0;const sE=document.getElementById("gl-reload"),Zu=document.getElementById("hud-mini"),mr=document.getElementById("hud-date"),Ju=document.getElementById("hud-speed"),is=document.getElementById("hud-timeline"),ma=document.getElementById("hud-timeline-track"),su=document.getElementById("hud-timeline-dynamic"),Kp=document.getElementById("hud-timeline-fill"),qp=document.getElementById("hud-timeline-caret"),ru=document.getElementById("hud-timeline-year"),Os=document.getElementById("hud-tl-tip"),au=document.getElementById("hud-tl-lens"),xo=document.getElementById("hud-tl-lens-canvas"),rE=document.getElementById("hud-tl-lens-date"),Wo=document.getElementById("date-cal"),aE=document.getElementById("date-cal-title"),oE=document.getElementById("date-cal-prev"),cE=document.getElementById("date-cal-next"),lE=document.getElementById("date-cal-grid"),uE=document.getElementById("date-cal-today"),dE=document.getElementById("date-cal-y-5"),hE=document.getElementById("date-cal-y-1"),fE=document.getElementById("date-cal-y+1"),pE=document.getElementById("date-cal-y+5");let An=0,Un=0,ls=!1,ou=-1,cu=window.innerWidth<560;const pf=document.getElementById("info-name"),mf=document.getElementById("info-period"),gf=document.getElementById("info-distance"),_f=document.getElementById("info-range"),ul=document.getElementById("info-facts"),vf=document.getElementById("info-label-1"),xf=document.getElementById("info-label-2"),Mf=document.getElementById("info-label-3"),lu=document.getElementById("events-toggle"),Zp=document.getElementById("events-range"),bi=document.getElementById("events-row"),Zs=document.getElementById("events-list"),Xr=document.getElementById("date-pick"),dr=new Map(ua.map(n=>[n.id,n])),ia=new Map(ua.filter(n=>n.kind==="moon"&&n.parent).map(n=>[n.id,n.parent])),le=new s2(Date.now());let N,Qt=ts,ft="",ni=!0,Ii="",jt="",Sf=le.t,uu=performance.now(),sa=0,du=!0;function cn(){du=!0}const jn={x:0,y:0,z:0},Kn={x:0,y:0,z:0};let yf=!1,dl=!1,Qu=!1,Yt=null;const mE=3;let Ge=null;const hu=document.getElementById("scale-real"),Jp=document.getElementById("scale-visible"),hl=document.getElementById("scale-caption"),Ef=[[0,"Morphing to real scale…"],[.2,"Sizes snap to reality — the default view exaggerates radii ~300× (Sun) to ~40,000× (Earth)."],[.5,"Distances snap to reality — Earth is 150 million km from the Sun, not 15 units."],[.8,"At real scale Neptune is 4.5 BILLION km out. Most of this view is empty space."]];function gE(n){let e=Ef[0][1];for(const[t,i]of Ef)n>=t&&(e=i);return e}function Qp(){return Ge?Ge.dir===0?Ge.p>=.5?"real":"visible":Ge.dir===1?"real":"visible":Qt===Hn?"real":"visible"}function $u(){const n=Qp()==="real";for(const e of[hu,Jp]){if(!e)continue;const t=e===hu?n:!n;e.classList.toggle("active",t),e.setAttribute("aria-checked",String(t))}hl&&(hl.hidden=!Ge,Ge&&(hl.textContent=Ge.dir===-1?"Returning to the visible view…":Ge.dir===0?"Real scale — sizes and distances to the same ratio. Toggle back any time.":gE(Gu(Ge.p))))}function _E(){Ge&&(Ge.p>=1?(Ge={p:1,dir:0,reframed:!1},Qt=Hn):(Ge=null,Qt=ts),$u(),qe())}function fu(n){Qp()!==n&&(cn(),Ge&&Ge.dir!==0?(Ge.dir=n==="real"?1:-1,Ge.reframed=!1):n==="real"?(Yt=null,ea(),Ge={p:0,dir:1,reframed:!1}):(Yt=null,ea(),Ge={p:1,dir:-1,reframed:!1}),$u())}function Ni(){const n=N.bodies.get("moon");n?.orbit&&Np(n.orbit,le.t,Qt),sa=performance.now()}function vE(n){N&&N.dispose(),N=QM(Nt,ua,n),N.controls.addEventListener("change",qe);for(const t of N.bodies.values())t.orbit&&t.parent&&t.parent.pivot.add(t.orbit);Qn(),Ip(N,le.t,Qt);const e=new Hu;if(iy(N.bodies.values(),e),ft){const t=N.bodies.get(ft);if(t){const i=Qt.followDistanceKm(t.def.radiusKm,t.def.kind==="dwarf");N.controls.target.copy(t.worldPos),N.camera.position.copy(t.worldPos).add(new w(i,i*.6,i))}}return N}const ci=50;function bf(n=!1){let e=0;for(const t of N.bodies.values()){const i=t.def.elements;if(i&&(t.def.kind==="planet"||!n&&t.def.kind==="dwarf")){const s=i.a*(1+i.e);e=Math.max(e,Qt.planetDistance(s))}}return Math.max(e,1)}function ra(n){return n==="constellations"?KS(vt,bf(),ci):jS(bf(!0),ci,.95)}function li(n){const e=N.bodies.get(n);if(!e)return null;const t=ia.get(n)??n,i=N.bodies.get(t)??e,s=Op(t,Qt),r=Math.max(i.frameExtent,s>0?2*s+i.sceneRadius:0);return Fp([i.worldPos.x,i.worldPos.y,i.worldPos.z],r,ci,N.camera.aspect)}function xE(n){const e=kt.findIndex(t=>t.name===n);return e<0?null:qS(Fo[e],Zy[e],vt,vt/8,N.camera.aspect)}function ii(n,e=1.4,t=null,i=!1){ft=t??"",us(ft),Ii=t??"",jt="",ar="",qe(),ea(),Oo=i,cc();const s=t?ia.has(t)?ia.get(t):t:null;Yt=ha([N.camera.position.x,N.camera.position.y,N.camera.position.z],[N.controls.target.x,N.controls.target.y,N.controls.target.z],n,e,s,N.camera.fov,ci)}function ME(n){const e=xE(n);e&&(jt=n,ft="",Ii="",ea(),Oo=!1,ar="",cc(),Yt=ha([N.camera.position.x,N.camera.position.y,N.camera.position.z],[N.controls.target.x,N.controls.target.y,N.controls.target.z],e,1.6,null,N.camera.fov,ci),qe())}function SE(){const n=document.getElementById("anchors");n&&(n.addEventListener("click",e=>{const t=e.target.closest("button[data-fly]");if(!t)return;const i=t.dataset.fly;if(i==="system")ii(ra("system"),1.6,"sun");else if(i==="constellations")ii(ra("constellations"),1.8,"sun",!0);else{const s=li(i);s&&ii(s,1.4,i)}qe()}),hu?.addEventListener("click",()=>fu("real")),Jp?.addEventListener("click",()=>fu("visible")))}function Qn(){cn();for(const n of N.bodies.values())n.orbit&&(n.orbit.material.visible=cr.checked),n.label.visible=On.checked;Ri?.setVisible(On.checked);for(const n of N.belts)n.mesh.visible=lr.checked;N.constellationFigures.visible=pr}function yE(){const n=le.getSpeed(),e=le.isReversed?"← ":"",t=Math.abs(n);let i,s;return t>=100?(i=t.toFixed(0),s="d/s"):t>=1?(i=t.toFixed(1),s="d/s"):t>=.1?(i=t.toFixed(2),s="d/s"):(i=(t*24).toFixed(2),s="h/s"),`${e}${i} ${s}`}function rc(){const n=yE();nE.textContent=n,Ju.textContent=n}function ed(){const n=le.toDate(),e=n.getUTCFullYear(),t=String(n.getUTCMonth()+1).padStart(2,"0"),i=String(n.getUTCDate()).padStart(2,"0"),s=String(n.getUTCHours()).padStart(2,"0"),r=String(n.getUTCMinutes()).padStart(2,"0");on.textContent=`${e}-${t}-${i} ${s}:${r} UTC`,mr.textContent=cu?`${e}-${t}-${i}`:`${e}-${t}-${i} ${s}:${r}`;const a=String(e);if(ru.textContent!==a&&(ru.textContent=a),document.activeElement!==Xr){const o=`${e}-${t}-${i}`;Xr.value!==o&&(Xr.value=o)}}function EE(){const n=Xr.value;if(!n)return;const[e,t,i]=n.split("-").map(Number);if(!e||!t||!i)return;const s=le.toDate(),r=new Date(Date.UTC(e,t-1,i,s.getUTCHours(),s.getUTCMinutes()));Math.abs(r.getTime()-s.getTime())<6e4||(le.setDate(r),Ni(),cn(),on.classList.remove("flash"),on.offsetWidth,on.classList.add("flash"),lc()&&_r(),qe())}function gr(){aE.textContent=Xy(An,Un);const{grid:n}=Wy(An,Un),e=le.toDate(),t=new Date,i=document.createDocumentFragment();for(const s of n){const r=document.createElement("div");if(r.className="cal-day",s===0)r.classList.add("blank");else{r.textContent=String(s);const a=new Date(Date.UTC(An,Un,s));uf(a,e)&&r.classList.add("sel"),uf(a,t)&&An===t.getUTCFullYear()&&Un===t.getUTCMonth()&&r.classList.add("today"),r.addEventListener("click",()=>bE(s))}i.appendChild(r)}lE.replaceChildren(i)}function bE(n){const e=le.toDate(),t=new Date(Date.UTC(An,Un,n,e.getUTCHours(),e.getUTCMinutes()));Math.abs(t.getTime()-e.getTime())<6e4||(le.setDate(t),Ni(),cn(),on.classList.remove("flash"),on.offsetWidth,on.classList.add("flash"),lc()&&_r(),qe(),gr())}function $p(){const n=le.toDate();An=n.getUTCFullYear(),Un=n.getUTCMonth(),ou=n.getUTCDate(),ls=!0,Wo.classList.add("open"),Wo.setAttribute("aria-hidden","false"),gr()}function ac(){ls&&(ls=!1,Wo.classList.remove("open"),Wo.setAttribute("aria-hidden","true"))}function em(n){const e=An*12+Un+n;An=Math.floor(e/12),Un=(e%12+12)%12,gr()}function oc(n){An+=n,gr()}dE.addEventListener("click",()=>oc(-5));hE.addEventListener("click",()=>oc(-1));fE.addEventListener("click",()=>oc(1));pE.addEventListener("click",()=>oc(5));mr.addEventListener("click",()=>{ls?ac():$p()});mr.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),ls?ac():$p())});oE.addEventListener("click",()=>em(-1));cE.addEventListener("click",()=>em(1));uE.addEventListener("click",()=>{const n=new Date,e=le.toDate(),t=new Date(Date.UTC(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate(),e.getUTCHours(),e.getUTCMinutes()));le.setDate(t),Ni(),on.classList.remove("flash"),on.offsetWidth,on.classList.add("flash"),lc()&&_r(),qe(),An=n.getUTCFullYear(),Un=n.getUTCMonth(),gr()});document.addEventListener("pointerdown",n=>{if(!ls)return;const e=n.target;e&&(e.closest("#date-cal")||e===mr)||ac()});document.addEventListener("keydown",n=>{n.key==="Escape"?ac():n.key==="F2"&&(n.preventDefault(),ni=!ni,N.sunGlow.visible=ni,cn())});function cc(){if(!ft){if(jt){const t=kt.findIndex(l=>l.name===jt),i=t>=0?kt[t]:void 0;if(!i){Cr.hidden=!0,Rr(null);return}const[s,r,a]=Fo[t],o=Math.asin(Math.min(1,Math.max(-1,r)))*180/Math.PI;let c=Math.atan2(-a,-s)*180/Math.PI/15;c<0&&(c+=24),Cr.hidden=!1,pf.textContent=`${i.name} — constellation`,vf.textContent="Center RA",xf.textContent="Center Dec",Mf.textContent="Stars",mf.textContent=`${c.toFixed(1)}h`,gf.textContent=`${o>=0?"+":""}${o.toFixed(1)}°`,_f.textContent=`${i.stars.length} stars`,Rr(null);return}Cr.hidden=!0,Rr(null);return}const n=dr.get(ft),e=n?uy(n,le.t):null;if(!n||!e){Cr.hidden=!0,Rr(null);return}Cr.hidden=!1,pf.textContent=n.name,vf.textContent="Orbit period",xf.textContent="Distance",Mf.textContent="Peri / Apo",mf.textContent=dy(e.periodDays),gf.textContent=n.kind==="moon"?`${Hr(e.distanceKm)} from ${dr.get(n.parent??"")?.name??"parent"}`:`${Hr(e.distanceKm)} from Sun`,_f.textContent=`${Hr(e.perihelionKm)} / ${Hr(e.aphelionKm)}`,Rr(n)}function Rr(n){if(ul&&(ul.replaceChildren(),!!n))for(const e of py(n)){const t=document.createElement("div");t.className="info-row";const i=document.createElement("span");i.textContent=e.label;const s=document.createElement("span");s.className="value",s.textContent=e.value,t.append(i,s),ul.appendChild(t)}}function td(n){or.value=String(n),le.setLogSpeed(n),cn(),rc(),qe()}or.addEventListener("input",()=>{td(parseFloat(or.value))});Bo.addEventListener("click",()=>{le.setPaused(!le.isPaused),Bo.textContent=le.isPaused?"Resume":"Pause",cn(),qe()});js.addEventListener("click",()=>{le.setReversed(!le.isReversed),js.textContent=le.isReversed?"Reverse ←":"Reverse →",js.classList.toggle("active",le.isReversed),cn(),rc(),qe()});iE.addEventListener("click",()=>{le.setDate(new Date),Ni(),cn(),qe()});function lc(){return!bi.hidden}function AE(n){Zs.textContent=n,Zs.classList.add("computing")}function TE(){Zs.classList.remove("computing")}function _r(){if(!lc())return;const n=parseInt(Zp.value,10)||5;AE("Computing events…"),requestAnimationFrame(()=>{const e=le.toDate().getTime(),t=n*365.25*864e5,i=(e-t-gn)/864e5,s=(e+t-gn)/864e5,r=Gp(i,s,{coarseStepDays:.2});wE(r)})}function wE(n){if(TE(),Zs.replaceChildren(),n.length===0){const t=document.createElement("p");t.className="ev-note",t.textContent="No events in this window.",Zs.appendChild(t);return}const e=document.createDocumentFragment();for(const t of n){const i=document.createElement("div");i.className="ev "+DE(t);const s=new Date(t.dateMs),r=s.getUTCFullYear(),a=String(s.getUTCMonth()+1).padStart(2,"0"),o=String(s.getUTCDate()).padStart(2,"0"),c=document.createElement("span");c.className="ev-date",c.textContent=`${r}-${a}-${o}`;const l=document.createElement("span");l.className="ev-what",l.textContent=t.title,l.title=t.detail;const u=document.createElement("span");u.className="ev-detail",u.textContent=t.detail,l.appendChild(u),i.append(c,l),i.addEventListener("click",()=>{le.setDate(new Date(t.dateMs)),Ni(),qe(),on.classList.remove("flash"),on.offsetWidth,on.classList.add("flash");const d=t.bodyId;if(d){const h=li(d);h&&ii(h,1.4,d)}}),e.appendChild(i)}Zs.appendChild(e)}function DE(n){switch(n.type){case"solar-eclipse":return"ecl-solar";case"lunar-eclipse":return"ecl-lunar";case"transit":return"transit";case"saturn-edge-on":return"saturn";default:return""}}lu.addEventListener("click",()=>{bi.hidden=!bi.hidden,lu.classList.toggle("active",!bi.hidden),bi.hidden||_r(),qe()});Zp.addEventListener("change",()=>{_r()});Xr.addEventListener("change",()=>{EE()});const PE=mp(ua),CE=gp(),RE=15;let Zn=-1;function LE(n){const e=[];if(!n.trim()){for(const s of PE)e.push({c:!1,id:s.id,name:s.name,sub:s.sub});for(const s of CE.slice(0,RE))e.push({c:!0,id:s.id,name:s.name,sub:s.sub});return e}const t=l2(ua,n);for(const s of t)e.push({c:!1,id:s.id,name:s.name,sub:s.parentName?`moon of ${s.parentName}`:s.kind});const i=h2(n);for(const s of i)e.push({c:!0,id:s.id,name:s.name,sub:s.sub});return e}function tm(n){return n.startsWith(Qr)?n.slice(Qr.length):dr.get(n)?.name??n}function us(n){Li.value=tm(n)}function nd(){ti.hidden=!0,Zn=-1}function pu(){const n=ti.querySelectorAll(".fr");n.forEach((e,t)=>e.classList.toggle("active",t===Zn)),n[Zn]?.scrollIntoView({block:"nearest"})}function nm(n){const e=LE(n);ti.replaceChildren();const t=document.createDocumentFragment();if(e.length===0){const i=document.createElement("div");i.className="fr-empty",i.textContent="No matches",t.appendChild(i)}else for(const i of e){const s=document.createElement("div");s.className=i.c?"fr fr-const":"fr",s.innerHTML=`<span class="fr-name">${i.name}</span><span class="fr-sub">${i.sub}</span>`,s.addEventListener("click",()=>im(i.id)),t.appendChild(s)}ti.appendChild(t),Zn=0,pu(),ti.hidden=!1}function im(n){if(Li.value=tm(n),nd(),Li.blur(),n.startsWith(Qr)){ME(n.slice(Qr.length));return}const e=n&&li(n)?n:"sun",t=li(e);t&&ii(t,1.4,e)}Li.addEventListener("focus",()=>nm(Li.value));Li.addEventListener("input",()=>{nm(Li.value)});Li.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),ti.hidden?im(""):nd();return}if(ti.hidden)return;const e=ti.querySelectorAll(".fr");if(n.key==="ArrowDown")n.preventDefault(),Zn=Math.min(e.length-1,Zn+1),pu();else if(n.key==="ArrowUp")n.preventDefault(),Zn=Math.max(0,Zn-1),pu();else if(n.key==="Enter"){n.preventDefault();const t=e[Zn];t&&t.click()}});document.addEventListener("pointerdown",n=>{!ti.hidden&&!n.target?.closest("#find-wrap")&&nd()});cr.addEventListener("change",()=>{Qn(),qe()});On.addEventListener("change",()=>{Qn(),qe()});lr.addEventListener("change",()=>{Qn(),qe()});Ks.addEventListener("change",()=>{pr=Ks.checked,Qn(),qe()});function IE(){ll=!ll;for(const n of N.bodies.values())n.atmosphereMesh&&(n.atmosphereMesh.visible=ll)}function Af(){cn();const n=N.skybox.group,e=n.getObjectByName("milkyway-skybox"),t=n.getObjectByName("starfield"),i=n.getObjectByName("zodiacal-light");e&&(e.visible=Vo),t&&(t.visible=Vo),i&&(i.visible=iu)}function HE(){uo=(uo+1)%3;const n=ft||"sun",e=N.bodies.get(n);if(!e)return;const t=N.camera.aspect;if(uo===2){const c=li(n);c&&ii(c,.9,n);return}const i=e.radius??1,s=Math.max(i*2,.5),r=Fp([e.worldPos.x,e.worldPos.y,e.worldPos.z],s,ci,t),a=Math.hypot(r.pos[0]-r.target[0],r.pos[1]-r.target[1],r.pos[2]-r.target[2]),o=uo===0?{pos:[r.target[0],r.target[1]+a,r.target[2]],target:r.target}:{pos:[r.target[0],r.target[1],r.target[2]+a],target:r.target};ii(o,.9,n)}function Tf(n){const e=li(n);e&&ii(e,1.4,n)}function sm(){ft="",Ii="",jt="",ar="",us(""),cc(),qe()}function uc(n){if(cn(),n.startsWith("jump-digit-")){const e=n.slice(11),t=ly(e,Xt,"sun");t&&Tf(t);return}if(n.startsWith("jump-")){Tf(n.slice(5));return}switch(n){case"pause":le.setPaused(!le.isPaused),Bo.textContent=le.isPaused?"Resume":"Pause",qe();break;case"speed-up":case"speed-down":{const e=n==="speed-up"?.25:-.25,t=Math.max(-3,Math.min(2.5,parseFloat(or.value)+e));td(t);break}case"now":le.setDate(new Date),Ni(),qe();break;case"reverse":le.setReversed(!le.isReversed),js.textContent=le.isReversed?"Reverse ←":"Reverse →",js.classList.toggle("active",le.isReversed),rc(),qe();break;case"orbits":cr.checked=!cr.checked,Qn(),qe();break;case"labels":On.checked=!On.checked,Qn(),qe();break;case"belts":lr.checked=!lr.checked,Qn(),qe();break;case"figures":Ks.checked=!Ks.checked,pr=Ks.checked,Qn(),qe();break;case"milkyway":Vo=!Vo,Af();break;case"zodiacal":iu=!iu,Af();break;case"atmospheres":IE();break;case"post":ni=!ni,N.sunGlow.visible=ni;break;case"scale":fu(Qt===Hn?"visible":"real");break;case"camera-preset":HE();break;case"release":sm();break;case"screenshot":Ur.click();break;case"palette":ur?ds():om();break}}function UE(){if(Ut||!lo||!qs)return;qs.hidden=!1,qs.setAttribute("aria-hidden","false"),lo.hidden=!1,lo.style.opacity="0",Ei&&(Ei.hidden=!1);const n=ra("system"),e={pos:[n.pos[0]*3,n.pos[1]*3,n.pos[2]*3]};N.camera.position.set(e.pos[0],e.pos[1],e.pos[2]),N.controls.target.set(0,0,0),Ut={leg:0,titleEl:lo},N.controls.enabled=!1,Mo=0,rm(0)}function rm(n){if(!Ut)return;const e=Vu[n],t=li(e.bodyId)??ra("system");n===0&&(t.pos=[t.pos[0]*e.zoom,t.pos[1]*e.zoom,t.pos[2]*e.zoom]),ft=e.bodyId,us(e.bodyId),Ii=e.bodyId,jt="",Ut.leg=n,N.controls.enabled=!1,Yt=ha([N.camera.position.x,N.camera.position.y,N.camera.position.z],[N.controls.target.x,N.controls.target.y,N.controls.target.z],t,e.duration,e.bodyId,N.camera.fov,ci)}let Mo=0;function NE(n){Ut?.titleEl&&(Mo+=n,Ut.titleEl.style.opacity=String(ry(Mo)),Mo>Wu+1.5&&ga(!1))}function OE(){Ut&&(Ut.leg<Vu.length-1?rm(Ut.leg+1):ga(!1))}function ga(n){if(!Ut)return;const e=Ut.titleEl;Ut=null;try{sessionStorage.setItem(zp,"1")}catch{}if(qs&&(qs.hidden=!0,qs.setAttribute("aria-hidden","true")),!(ft==="earth")){const s=li("earth");if(s){ft="earth",us("earth"),Ii="earth",jt="",Yt=ha([N.camera.position.x,N.camera.position.y,N.camera.position.z],[N.controls.target.x,N.controls.target.y,N.controls.target.z],s,n?.6:1,"earth",N.camera.fov,ci),N.controls.enabled=!1,e&&(e.style.opacity="0",e.hidden=!0),Ei&&(Ei.hidden=!0),qe();return}}N.controls.enabled=!0,N.controls.update();const i=N.bodies.get(ft);i&&N.controls.target.copy(i.worldPos),e&&(e.style.opacity="0",e.hidden=!0),Ei&&(Ei.hidden=!0),qe()}for(const n of["pointerdown","wheel","touchstart"])Nt.addEventListener(n,()=>{Ut&&ga(!0)});window.addEventListener("keydown",n=>{if(!Ut||n.key==="/"||n.key==="?"||n.ctrlKey||n.metaKey||n.altKey)return;const e=n.target?.tagName;e==="INPUT"||e==="TEXTAREA"||ga(!0)});Ei&&Ei.addEventListener("click",()=>ga(!0));window.addEventListener("keydown",n=>{if(n.ctrlKey||n.metaKey||n.altKey)return;const e=n.target?.tagName;if(e==="INPUT"||e==="TEXTAREA")return;if(n.key==="/"||n.key==="?"){n.preventDefault(),ur?ds():om();return}if(n.key==="Escape"){ur?ds():sm();return}const t=n.key.length===1?n.key.toLowerCase():n.key,i=cy(t);i&&(n.preventDefault(),uc(i))});function am(n,e,t,i){if(!i)return!0;const s=i.toLowerCase();return n.includes(s)||e.toLowerCase().includes(s)||t.toLowerCase().includes(s)}function So(){if(!Or)return;Or.replaceChildren();const n=Go.trim();let e=0;for(let t=0;t<na.length;t++){const i=na[t];if(!am(i.id,i.label,i.hint,n))continue;const s=document.createElement("div");s.className="pal-item"+(t===Si?" active":"");const r=document.createElement("span");r.className="pal-keys",r.textContent=i.keys.join(" ")||"•";const a=document.createElement("span");a.className="pal-label",a.textContent=i.label;const o=document.createElement("span");o.className="pal-hint",o.textContent=i.hint,s.append(r,a,o),s.addEventListener("click",()=>{uc(i.id),ds()}),Or.appendChild(s),e++}if(e===0){const t=document.createElement("div");t.className="pal-empty",t.textContent="No matching commands",Or.appendChild(t)}}function om(){!ta||!$i||!Or||(ur=!0,Go="",Si=0,ta.hidden=!1,$i.value="",na=oy(Xt.map(n=>({id:n.id,name:n.name}))).map(n=>({id:n.id,label:n.label,keys:n.keys,hint:n.hint})),So(),requestAnimationFrame(()=>$i.focus()))}function ds(){ta&&(ur=!1,ta.hidden=!0)}$i&&($i.addEventListener("input",()=>{Go=$i.value,Si=0,So()}),$i.addEventListener("keydown",n=>{if(n.stopPropagation(),n.key==="Escape")ds();else if(n.key==="ArrowDown")n.preventDefault(),Si=Math.min(na.length-1,Si+1),So();else if(n.key==="ArrowUp")n.preventDefault(),Si=Math.max(0,Si-1),So();else if(n.key==="Enter"){n.preventDefault();const e=Go.trim();let t=0;for(const i of na)if(am(i.id,i.label,i.hint,e)){if(t===Si){uc(i.id),ds();break}t++}}}));document.addEventListener("pointerdown",n=>{ur&&ta&&!n.target?.closest("#palette")&&ds()});window.addEventListener("resize",()=>{cn(),N.camera.aspect=window.innerWidth/window.innerHeight,N.camera.updateProjectionMatrix(),N.renderer.setSize(window.innerWidth,window.innerHeight),N.post.setSize(window.innerWidth,window.innerHeight);const n=window.innerWidth<560;n!==cu&&(cu=n,ed())});const Be=gy(window.location.href);Be.timeMs!=null&&le.setDate(new Date(Be.timeMs));if(Be.speedLog!=null){const n=Math.max(-3,Math.min(2.5,Be.speedLog));or.value=String(n),le.setLogSpeed(n)}Be.reversed!=null&&(le.setReversed(Be.reversed),js.textContent=Be.reversed?"Reverse ←":"Reverse →");Be.scale&&(Qt=Be.scale==="true"?Hn:ts);Be.orbits!=null&&(cr.checked=Be.orbits);Be.labels!=null&&(On.checked=Be.labels);new URL(window.location.href,"http://localhost").searchParams.get("post")==="0"&&(ni=!1);Be.belts!=null&&(lr.checked=Be.belts);Be.figures!=null&&(Ks.checked=Be.figures,pr=Be.figures);Be.paused!=null&&(le.setPaused(Be.paused),Bo.textContent=Be.paused?"Resume":"Pause");Be.eventsOpen!=null&&(bi.hidden=!Be.eventsOpen,lu.classList.toggle("active",Be.eventsOpen));bi.hidden||_r();const yo=Be.constellation&&kt.some(n=>n.name===Be.constellation)?Be.constellation:null;Be.follow&&dr.has(Be.follow)?(us(Be.follow),ft=Be.follow,Ii=Be.follow):yo||(us("sun"),ft="sun",Ii="sun");yo&&(jt=yo,us(`const:${yo}`),ar="");function cm(){return{timeMs:le.toDate().getTime(),speedLog:parseFloat(or.value),reversed:le.isReversed,follow:ft||void 0,constellation:jt||void 0,scale:Qt===Hn?"true":"visible",orbits:cr.checked,labels:On.checked,belts:lr.checked,figures:pr,paused:le.isPaused,eventsOpen:!bi.hidden,cam:{pos:[N.camera.position.x,N.camera.position.y,N.camera.position.z],target:[N.controls.target.x,N.controls.target.y,N.controls.target.z]}}}let fl;function qe(){fl===void 0&&(fl=setTimeout(()=>{fl=void 0,window.history.replaceState(null,"",kp(window.location.href,cm()))},300))}co.addEventListener("click",async()=>{const n=kp(window.location.href,cm());window.history.replaceState(null,"",n);try{await navigator.clipboard.writeText(n),co.textContent="Link copied ✓"}catch{co.textContent="Link in address bar"}setTimeout(()=>{co.textContent="Copy share link"},1500)});Ur.addEventListener("click",async()=>{const n=N.renderer.domElement,e=le.toDate(),t=c=>String(c).padStart(2,"0"),i=`${e.getUTCFullYear()}-${t(e.getUTCMonth()+1)}-${t(e.getUTCDate())}T${t(e.getUTCHours())}${t(e.getUTCMinutes())}Z`,s=Ri&&On.checked?Ri.canvas:null;let r=n;if(s){r=document.createElement("canvas"),r.width=n.width,r.height=n.height;const c=r.getContext("2d");c.drawImage(n,0,0),c.drawImage(s,0,0,n.width,n.height)}const a=await new Promise(c=>r.toBlob(l=>c(l),"image/png"));if(!a){Ur.textContent="Export failed";return}const o=document.createElement("a");o.href=URL.createObjectURL(a),o.download=`solar-system-${i}.png`,o.click(),setTimeout(()=>URL.revokeObjectURL(o.href),5e3),Ur.textContent="Saved ✓",setTimeout(()=>{Ur.textContent="Save screenshot"},1500)});vE(Qt);N.sunGlow.visible=ni;Ri=kS(Nt);Ri.setVisible(On.checked);SE();$u();Be.cam&&(N.camera.position.set(...Be.cam.pos),N.controls.target.set(...Be.cam.target),N.controls.update());rc();ed();const wi=new URLSearchParams(window.location.search).get("cmd")?.toLowerCase()??null,lm=new Set(Xu.map(n=>n.id));lm.add("palette");const um=wi!=null&&/^[0-9]$/.test(wi),dm=wi!=null&&(um||lm.has(wi));wi&&dm&&uc(um?`jump-digit-${wi}`:wi);{const n=window.matchMedia("(prefers-reduced-motion: reduce)").matches,e=new URLSearchParams(window.location.search).get("intro"),t=!!Be.follow||!!Be.constellation||!!Be.cam||!!(wi&&dm);let i=!1;try{i=sessionStorage.getItem(zp)==="1"}catch{}sy(n,e,t,i)&&UE()}window.__solar={get scene(){return N.scene},get camera(){return N.camera},get controls(){return N.controls},get renderer(){return N.renderer},get labelLayer(){return Ri},get bodies(){return N.bodies},satelliteExtentScene:n=>Op(n,Qt),clock:le};const Xo=new pp,Yo=new ae;let hm=0,fm=0,id=!1,wf=0,sd=!1;function pm(){const n=[];for(const e of N.bodies.values())n.push(e.mesh);return n}function FE(n,e){Nr.innerHTML=`${n}${e?`<span class="sub"> ${e}</span>`:""}`,Nr.style.left=`${hm}px`,Nr.style.top=`${fm}px`,Nr.classList.add("show")}function jo(){Nr.classList.remove("show")}function zE(){if(!id||sd){jo();return}Xo.setFromCamera(Yo,N.camera);const n=Xo.intersectObjects(pm(),!1);if(n.length>0){const e=n[0].object.userData.id,t=e?dr.get(e):void 0;if(t){const i=t.kind==="moon"?`moon of ${dr.get(t.parent??"")?.name??""}`:t.kind.charAt(0).toUpperCase()+t.kind.slice(1);FE(t.name,i);return}}jo()}Nt.addEventListener("pointermove",n=>{id=!0,hm=n.clientX,fm=n.clientY,Yo.set(n.clientX/window.innerWidth*2-1,-(n.clientY/window.innerHeight)*2+1);const e=performance.now();e-wf<50||(wf=e,zE())});Nt.addEventListener("pointerleave",()=>{id=!1,jo()});Nt.addEventListener("pointerdown",()=>{sd=!0,jo()});window.addEventListener("pointerup",()=>{sd=!1});let mm=0,gm=0;Nt.addEventListener("pointerdown",n=>{mm=n.clientX,gm=n.clientY});Nt.addEventListener("pointerup",n=>{if(Eo)return;if(hr){hr=!1;return}if(n.pointerType==="touch"&&Tt.size>1||n.button===2||Math.hypot(n.clientX-mm,n.clientY-gm)>6)return;const e=Nt.getBoundingClientRect();Yo.set((n.clientX-e.left)/e.width*2-1,-((n.clientY-e.top)/e.height)*2+1),Xo.setFromCamera(Yo,N.camera);const t=Xo.intersectObjects(pm(),!1);if(t.length>0){const i=t[0].object.userData.id,s=i?li(i):null;s&&ii(s,1.4,i)}});let Zt=null,hr=!1;function rd(){Zu.classList.remove("scrubbing"),mr.classList.remove("hot"),Ju.classList.remove("hot"),si=null,Fr.clear(),aa=[],su.replaceChildren(),Kp.style.width="0%",qp.style.left="0%",od(),vm(),is.classList.remove("visible")}let si=null;const Fr=new Set;let _a=0,va=365,aa=[];function BE(){return new Date(gn+le.t*864e5).getUTCFullYear()}function ad(){is.classList.contains("visible")||is.classList.add("visible")}function _m(n){qp.style.left=`${n*100}%`,Kp.style.width=`${n*100}%`}function pl(n){const{span0Days:e,spanLenDays:t}=Xp(n);_a=e,va=t;const i=Yp(n)?jp(n).events:[],{markers:s,overflow:r,caretFrac:a}=sc(e,t,i,le.t);ru.textContent=String(n),su.replaceChildren();const o=ma.clientWidth||window.innerWidth,l=Math.max(1,o-2*12),u=document.createDocumentFragment();aa=[];for(const d of s){const h=document.createElement("span");h.className="tl-event",h.style.left=`${d.frac*100}%`,h.textContent=d.emoji,h.title=d.title,u.appendChild(h),aa.push({day:d.frac*t,x:d.frac*l,emoji:d.emoji,title:d.title})}if(r>0){const d=document.createElement("span");d.className="tl-overflow",d.textContent=`+${r}`,u.appendChild(d)}su.appendChild(u),_m(a)}const kE=0,GE=120,VE=24,WE=Oy(365);function od(){Os.classList.remove("show")}function vm(){au.classList.remove("show"),xo.getContext("2d")?.clearRect(0,0,xo.width,xo.height)}function XE(n){const e=xo,t=window.devicePixelRatio||1,i=Wt*2;(e.width!==i*t||e.height!==i*t)&&(e.width=Math.round(i*t),e.height=Math.round(i*t));const s=e.getContext("2d");if(!s)return;s.setTransform(t,0,0,t,0,0),s.clearRect(0,0,i,i);const r=ma.clientWidth||window.innerWidth,a=12,o=Math.max(1,r-2*a),c=sc(_a,va,[],le.t).caretFrac,l=n-a;s.lineCap="round",s.strokeStyle="rgba(160, 190, 220, 0.5)",s.lineWidth=20,s.beginPath(),s.moveTo(2,Wt),s.lineTo(i-2,Wt),s.stroke();for(const u of WE){const d=u.frac*o-l,h=ao(d,0);if(!h)continue;const f=Wt+h.x;s.strokeStyle="rgba(120, 150, 200, 0.55)",s.lineWidth=Math.max(1,h.scale),s.beginPath(),s.moveTo(f,Wt-4.5*h.scale),s.lineTo(f,Wt+4.5*h.scale),s.stroke();const g=ao(d,9);g&&(s.save(),s.translate(Wt+g.x,Wt+g.y),s.rotate(Math.PI/4),s.scale(g.scale,g.scale),s.fillStyle="#7d90ad",s.font="10px system-ui, sans-serif",s.fillText(u.abbr,0,9),s.restore())}for(const u of aa){const d=u.x-l,h=ao(d,0);h&&(s.save(),s.translate(Wt+h.x,Wt+h.y),s.scale(h.scale,h.scale),s.font="13px system-ui, sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText(u.emoji,0,0),s.restore())}if(is.classList.contains("visible")){const u=c*o-l,d=ao(u,0);if(d){const h=Wt+d.x;s.fillStyle="#57c785",s.shadowColor="rgba(87, 199, 133, 0.7)",s.shadowBlur=6*d.scale;const f=Math.max(2,3*d.scale);s.fillRect(h-f/2,Wt-7.5*d.scale,f,15*d.scale),s.shadowBlur=0}}}function YE(){const n=ma.clientWidth||window.innerWidth,e=12,t=Math.max(1,n-2*e),i=sc(_a,va,[],le.t).caretFrac;return e+i*t}function xm(n){if(si===null)return;const e=ma.getBoundingClientRect();if(e.width<2)return;const t=e.width,i=!!(Zt?.movedX||ui?.live),s=Math.max(0,Math.min(t,n-e.left)),r=lf(i?YE():s,t),a=r-12,o=Fy(aa,a,VE);if(o){const l=cf(si,o.day);Os.innerHTML=`<span class="tl-tip-date">${l}</span>${o.emoji} ${o.title}`;const u=Zu.getBoundingClientRect(),d=Os.offsetWidth,h=u.right-4,f=Math.max(12,h-d);Os.style.left=`${f}px`,Os.style.top=`${u.bottom+6}px`,Os.classList.add("show")}else od();au.style.left=`${r-Wt}px`,XE(r);const c=i?Math.max(0,le.t-_a):r/t*va;rE.textContent=cf(si,c),au.classList.add("show")}function jE(){si!==null&&(dc(),ad(),xm(Number.POSITIVE_INFINITY))}window.addEventListener("pointermove",n=>{if(n.pointerType!=="mouse")return;const e=ma.getBoundingClientRect();n.clientY>=e.top-kE&&n.clientY<=e.bottom+GE?(dc(),is.classList.contains("hover")||is.classList.add("hover"),xm(n.clientX)):(od(),vm(),is.classList.remove("hover"))});function dc(){const n=BE();if(!(n===si&&!Fr.has(n))){if(si=n,Yp(n)){pl(n);return}Fr.has(n)||(Fr.add(n),pl(n),requestAnimationFrame(()=>{Fr.delete(n),jp(n),si===n&&pl(n)}))}}function KE(){if(si===null)return;const{caretFrac:n}=sc(_a,va,[],le.t);_m(n)}function Mm(n,e,t){let i=!1;const s=!n.movedX&&Math.abs(e)>6,r=!n.movedY&&Math.abs(t)>4;return s&&(n.movedX=!0),r&&(n.movedY=!0),(s||r)&&Zu.classList.add("scrubbing"),n.movedX&&(mr.classList.add("hot"),le.setDate(new Date(gn+Ry(n.startDays,n.span0Days,n.spanLenDays,e)*864e5)),i=!0),n.movedY&&(Ju.classList.add("hot"),td(Ly(n.startLog,t)),i=!0),i}Nt.addEventListener("contextmenu",n=>n.preventDefault());Nt.addEventListener("pointerdown",n=>{if(hr=!1,n.pointerType!=="mouse"||n.button!==2)return;const e=new Date(gn+le.t*864e5).getUTCFullYear(),t=Vp(e);Zt={startX:n.clientX,startY:n.clientY,startDays:le.t,startLog:le.getLogSpeed(),movedX:!1,movedY:!1,span0Days:t.span0Days,spanLenDays:t.spanLenDays},le.beginScrub()});window.addEventListener("pointermove",n=>{if(!Zt||n.pointerType!=="mouse"||!(n.buttons&4))return;const e=n.clientX-Zt.startX,t=n.clientY-Zt.startY;Mm(Zt,e,t)&&(sa=performance.now(),qe()),(Zt.movedX||Zt.movedY)&&(ad(),dc())});window.addEventListener("pointerup",n=>{if(!Zt||n.pointerType!=="mouse"||n.button!==2)return;const e=Zt;Zt=null,le.endScrub(),(e.movedX||e.movedY)&&(Ni(),hr=!0),rd()});window.addEventListener("pointercancel",n=>{!Zt||n.pointerType!=="mouse"||(Zt=null,le.endScrub(),rd())});const Tt=new Map;let ui=null,Eo=!1;function Sm(n){const e=ui;!e||e.ended||(e.ended=!0,le.endScrub(),n&&(Ni(),hr=!0),rd())}Nt.addEventListener("pointerdown",n=>{if(n.pointerType!=="touch"||Tt.size>=4||(Tt.set(n.pointerId,{x:n.clientX,y:n.clientY}),Tt.size!==3))return;const e=[...Tt.values()],t=(e[0].x+e[1].x+e[2].x)/3,i=(e[0].y+e[1].y+e[2].y)/3,s=new Date(gn+le.t*864e5).getUTCFullYear(),r=Vp(s);ui={startX:t,startY:i,startDays:le.t,startLog:le.getLogSpeed(),movedX:!1,movedY:!1,live:!1,ended:!1,span0Days:r.span0Days,spanLenDays:r.spanLenDays},le.beginScrub()});Nt.addEventListener("pointermove",n=>{if(n.pointerType!=="touch"||!Tt.has(n.pointerId))return;Tt.set(n.pointerId,{x:n.clientX,y:n.clientY});const e=ui;if(!e||e.ended||Tt.size<3)return;const t=[...Tt.values()],i=(t[0].x+t[1].x+t[2].x)/3,s=(t[0].y+t[1].y+t[2].y)/3;Mm(e,i-e.startX,s-e.startY)&&(e.live=!0,sa=performance.now(),qe()),(e.movedX||e.movedY)&&(ad(),dc(),jE())});window.addEventListener("pointerup",n=>{if(n.pointerType!=="touch"||Eo||Tt.size===0)return;const e=Tt.size>=3;Tt.delete(n.pointerId);const t=ui;if(t&&e&&!t.ended&&(hr=!0,Sm(t.live),ui=null,Tt.size===2)){const i=[...Tt.keys()][0],s=Tt.get(i);Eo=!0,Nt.dispatchEvent(new PointerEvent("pointerup",{pointerId:i,pointerType:"touch",clientX:s.x,clientY:s.y})),Nt.dispatchEvent(new PointerEvent("pointerdown",{pointerId:i,pointerType:"touch",clientX:s.x,clientY:s.y})),Eo=!1}});window.addEventListener("pointercancel",n=>{if(n.pointerType!=="touch")return;Tt.delete(n.pointerId);const e=ui;e&&!e.ended&&Tt.size<3&&Sm(e.live),e&&Tt.size<3&&(ui=null)});function qE(){if(!Ri||!On.checked)return;const n=N.camera,e=n.position,t=e.x,i=e.y,s=e.z,r=Lp(e.length()),a=jt?kt.findIndex(c=>c.name===jt):-1,o=[];for(let c=0;c<kt.length;c++){const l=zo[c];if(zu(l)*r<=eu)continue;const u=Qy[c],d=t*u[0]+i*u[1]+s*u[2],h=Math.sqrt(vt*vt+(t*t+i*i+s*s)-2*vt*d);cl.set(e,ff.set(u[0]*vt-t,u[1]*vt-i,u[2]*vt-s).normalize());let f=!1;const g=ff;for(const _ of N.bodies.values()){if(!_.mesh.visible)continue;const m=_.worldPos,p=m.x-t,v=m.y-i,x=m.z-s,E=Math.sqrt(p*p+v*v+x*x);if(E<1e-6)continue;const R=1/E,A=p*R,D=v*R,H=x*R,b=D*g.z-H*g.y,S=H*g.x-A*g.z,C=A*g.y-D*g.x,k=Math.sqrt(Math.min(1,b*b+S*S+C*C)),O=Math.max(1,_.frameExtent>0?_.frameExtent/2:_.sceneRadius);if(k>(O+2)/E)continue;cl.far=E*2;const Y=cl.intersectObject(_.mesh,!1);if(Y.length>0&&Y[0].distance<h){f=!0;break}}o.push({name:kt[c].name,dir:u,emphasis:l,emphasized:a>=0?c===a:!1,occluded:f})}WS(Ri,n,o,r,window.innerWidth,window.innerHeight)}function ym(){if(requestAnimationFrame(ym),Qu)return;const n=performance.now(),e=Math.min(.1,(n-uu)/1e3);uu=n,yf||(jn.x=N.camera.position.x,jn.y=N.camera.position.y,jn.z=N.camera.position.z,Kn.x=N.controls.target.x,Kn.y=N.controls.target.y,Kn.z=N.controls.target.z,yf=!0),Ut&&NE(e),le.tick(e);const t=le.t-Sf;Sf=le.t;let i=Qt;if(Ge){Ge.dir!==0&&(Ge.p=Math.min(1,Math.max(0,Ge.p+Ge.dir*e/mE)),(Ge.dir===1&&Ge.p>=1||Ge.dir===-1&&Ge.p<=0)&&_E());const o=Ge.dir===0?1:Gu(Ge.p);i=ZM(ts,Hn,o),CS(N,o);for(const c of N.bodies.values())c.orbit&&RS(c.orbit,i,c.parent?c.def.id:null);Ge.dir===0?Ge.reframed||(Ge.reframed=!0,Yt=ha([N.camera.position.x,N.camera.position.y,N.camera.position.z],[N.controls.target.x,N.controls.target.y,N.controls.target.z],ra("system"),1.2,null,N.camera.fov,ci),N.controls.enabled=!1):Yt&&Ge.reframed&&(Yt=null,N.controls.enabled=!0,N.controls.update())}{const o=performance.now();if(o-sa>250){sa=o;const c=N.bodies.get("moon");c?.orbit&&Np(c.orbit,le.t,i)}}if(Ip(N,le.t,i),le.isPaused||Up(N,le.t,i,N.camera.position.length()),LS(N,t),Yt){N.controls.enabled=!1;let o;if(Yt.followId){const u=N.bodies.get(Yt.followId);u&&(o=[u.worldPos.x,u.worldPos.y,u.worldPos.z])}const c=ZS(Yt,e,o),l=c.target;if(N.controls.target.set(l[0],l[1],l[2]),N.camera.position.set(l[0]+c.offset[0],l[1]+c.offset[1],l[2]+c.offset[2]),Math.abs(N.camera.fov-c.fov)>.001&&(N.camera.fov=c.fov,N.camera.updateProjectionMatrix()),N.camera.lookAt(l[0],l[1],l[2]),c.done){if(Yt=null,Ut)OE();else if(Oo)Oo=!1,Ky();else if(N.controls.enabled=!0,N.controls.update(),ft){const u=N.bodies.get(ft);u&&N.controls.target.copy(u.worldPos)}qe()}}else if(Ti)qy(e);else if(ft){const o=N.bodies.get(ft),c=o&&ia.has(ft)?N.bodies.get(ia.get(ft)):o;c&&N.controls.target.lerp(c.worldPos,.2),N.controls.update()}else N.controls.update();{const o=N.camera.position,c=N.controls.target;if(dl=Math.abs(o.x-jn.x)+Math.abs(o.y-jn.y)+Math.abs(o.z-jn.z)+Math.abs(c.x-Kn.x)+Math.abs(c.y-Kn.y)+Math.abs(c.z-Kn.z)>1e-4,le.isPaused&&dl&&PS(N,i,o.length()),!du&&my({paused:le.isPaused,cameraMoving:dl,scrubbing:!!(Zt?.movedX||ui?.live),flightActive:Yt!==null,morphActive:Ge!==null,skyTourActive:Ti!==null,introActive:Ut!==null}))return;jn.x=o.x,jn.y=o.y,jn.z=o.z,Kn.x=c.x,Kn.y=c.y,Kn.z=c.z,du=!1}$y(),eE(n),tE(n),US(N,Ii,n/1e3);const a=N.camera.position.length()<=170;if(a!==N.sunLight.castShadow&&(N.sunLight.castShadow=a),N.skybox.update(N.camera),ni?N.post.composer.render():N.renderer.render(N.scene,N.camera),qE(),ed(),ls){const o=le.toDate();if(o.getUTCFullYear()===An&&o.getUTCMonth()===Un){const c=o.getUTCDate();c!==ou&&(ou=c,gr())}}KE(),cc()}requestAnimationFrame(ym);Nt.addEventListener("webglcontextlost",n=>{n.preventDefault(),Qu=!0,ko.hidden=!1,ko.classList.add("show")});Nt.addEventListener("webglcontextrestored",()=>{Qu=!1,cn(),ko.hidden=!0,ko.classList.remove("show"),N.renderer.setSize(window.innerWidth,window.innerHeight),uu=performance.now()});sE.addEventListener("click",()=>window.location.reload());
