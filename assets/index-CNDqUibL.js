(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Dc="168",za={ROTATE:0,DOLLY:1,PAN:2},Ih=0,xl=1,Hh=2,hd=1,fd=2,Sn=3,Vn=0,Ut=1,Zt=2,Bn=0,Zi=1,Ml=2,Sl=3,yl=4,Lh=5,li=100,Uh=101,Nh=102,Oh=103,Fh=104,zh=200,Bh=201,kh=202,Gh=203,Ro=204,Co=205,Vh=206,Wh=207,Xh=208,Yh=209,qh=210,Kh=211,$h=212,jh=213,Zh=214,Jh=0,Qh=1,ef=2,Zs=3,tf=4,nf=5,rf=6,sf=7,pd=0,af=1,of=2,kn=0,cf=1,lf=2,uf=3,df=4,hf=5,ff=6,pf=7,md=300,rr=301,sr=302,Io=303,Ho=304,Ma=306,Lr=1e3,di=1001,Lo=1002,Lt=1003,mf=1004,ns=1005,rn=1006,Ba=1007,hi=1008,bn=1009,gd=1010,_d=1011,Ur=1012,wc=1013,_i=1014,dn=1015,Xr=1016,Pc=1017,Rc=1018,ar=1020,vd=35902,xd=1021,Md=1022,on=1023,Sd=1024,yd=1025,Ji=1026,or=1027,Cc=1028,Ic=1029,Ed=1030,Hc=1031,Lc=1033,Gs=33776,Vs=33777,Ws=33778,Xs=33779,Uo=35840,No=35841,Oo=35842,Fo=35843,zo=36196,Bo=37492,ko=37496,Go=37808,Vo=37809,Wo=37810,Xo=37811,Yo=37812,qo=37813,Ko=37814,$o=37815,jo=37816,Zo=37817,Jo=37818,Qo=37819,ec=37820,tc=37821,Ys=36492,nc=36494,ic=36495,Ad=36283,rc=36284,sc=36285,ac=36286,gf=3200,_f=3201,Td=0,vf=1,Fn="",Rt="srgb",$n="srgb-linear",Uc="display-p3",Sa="display-p3-linear",Js="linear",it="srgb",Qs="rec709",ea="p3",Ti=7680,El=519,xf=512,Mf=513,Sf=514,bd=515,yf=516,Ef=517,Af=518,Tf=519,oc=35044,Al="300 es",En=2e3,ta=2001;class Si{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const At=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Tl=1234567;const Rr=Math.PI/180,Nr=180/Math.PI;function An(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(At[n&255]+At[n>>8&255]+At[n>>16&255]+At[n>>24&255]+"-"+At[e&255]+At[e>>8&255]+"-"+At[e>>16&15|64]+At[e>>24&255]+"-"+At[t&63|128]+At[t>>8&255]+"-"+At[t>>16&255]+At[t>>24&255]+At[i&255]+At[i>>8&255]+At[i>>16&255]+At[i>>24&255]).toLowerCase()}function Ct(n,e,t){return Math.max(e,Math.min(t,n))}function Nc(n,e){return(n%e+e)%e}function bf(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Df(n,e,t){return n!==e?(t-n)/(e-n):0}function Cr(n,e,t){return(1-t)*n+t*e}function wf(n,e,t,i){return Cr(n,e,1-Math.exp(-t*i))}function Pf(n,e=1){return e-Math.abs(Nc(n,e*2)-e)}function Rf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Cf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function If(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Hf(n,e){return n+Math.random()*(e-n)}function Lf(n){return n*(.5-Math.random())}function Uf(n){n!==void 0&&(Tl=n);let e=Tl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Nf(n){return n*Rr}function Of(n){return n*Nr}function Ff(n){return(n&n-1)===0&&n!==0}function zf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Bf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function kf(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+i)/2),u=a((e+i)/2),d=s((e-i)/2),h=a((e-i)/2),p=s((i-e)/2),g=a((i-e)/2);switch(r){case"XYX":n.set(o*u,c*d,c*h,o*l);break;case"YZY":n.set(c*h,o*u,c*d,o*l);break;case"ZXZ":n.set(c*d,c*h,o*u,o*l);break;case"XZX":n.set(o*u,c*g,c*p,o*l);break;case"YXY":n.set(c*p,o*u,c*g,o*l);break;case"ZYZ":n.set(c*g,c*p,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function sn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function et(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const cc={DEG2RAD:Rr,RAD2DEG:Nr,generateUUID:An,clamp:Ct,euclideanModulo:Nc,mapLinear:bf,inverseLerp:Df,lerp:Cr,damp:wf,pingpong:Pf,smoothstep:Rf,smootherstep:Cf,randInt:If,randFloat:Hf,randFloatSpread:Lf,seededRandom:Uf,degToRad:Nf,radToDeg:Of,isPowerOfTwo:Ff,ceilPowerOfTwo:zf,floorPowerOfTwo:Bf,setQuaternionFromProperEuler:kf,normalize:et,denormalize:sn};class Se{constructor(e=0,t=0){Se.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ct(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ne{constructor(e,t,i,r,s,a,o,c,l){Ne.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],d=i[7],h=i[2],p=i[5],g=i[8],v=r[0],m=r[3],f=r[6],S=r[1],_=r[4],E=r[7],C=r[2],T=r[5],D=r[8];return s[0]=a*v+o*S+c*C,s[3]=a*m+o*_+c*T,s[6]=a*f+o*E+c*D,s[1]=l*v+u*S+d*C,s[4]=l*m+u*_+d*T,s[7]=l*f+u*E+d*D,s[2]=h*v+p*S+g*C,s[5]=h*m+p*_+g*T,s[8]=h*f+p*E+g*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-i*s*u+i*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*a-o*l,h=o*c-u*s,p=l*s-a*c,g=t*d+i*h+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(r*l-u*i)*v,e[2]=(o*i-r*a)*v,e[3]=h*v,e[4]=(u*t-r*c)*v,e[5]=(r*s-o*t)*v,e[6]=p*v,e[7]=(i*c-l*t)*v,e[8]=(a*t-i*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ka.makeScale(e,t)),this}rotate(e){return this.premultiply(ka.makeRotation(-e)),this}translate(e,t){return this.premultiply(ka.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ka=new Ne;function Dd(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Or(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Gf(){const n=Or("canvas");return n.style.display="block",n}const bl={};function Qi(n){n in bl||(bl[n]=!0,console.warn(n))}function Vf(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Dl=new Ne().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),wl=new Ne().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),pr={[$n]:{transfer:Js,primaries:Qs,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[Rt]:{transfer:it,primaries:Qs,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Sa]:{transfer:Js,primaries:ea,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(wl),fromReference:n=>n.applyMatrix3(Dl)},[Uc]:{transfer:it,primaries:ea,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(wl),fromReference:n=>n.applyMatrix3(Dl).convertLinearToSRGB()}},Wf=new Set([$n,Sa]),Je={enabled:!0,_workingColorSpace:$n,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Wf.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=pr[e].toReference,r=pr[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return pr[n].primaries},getTransfer:function(n){return n===Fn?Js:pr[n].transfer},getLuminanceCoefficients:function(n,e=this._workingColorSpace){return n.fromArray(pr[e].luminanceCoefficients)}};function er(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ga(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let bi;class Xf{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{bi===void 0&&(bi=Or("canvas")),bi.width=e.width,bi.height=e.height;const i=bi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=bi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Or("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=er(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(er(t[i]/255)*255):t[i]=er(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Yf=0;class wd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yf++}),this.uuid=An(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Va(r[a].image)):s.push(Va(r[a]))}else s=Va(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Va(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Xf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let qf=0;class yt extends Si{constructor(e=yt.DEFAULT_IMAGE,t=yt.DEFAULT_MAPPING,i=di,r=di,s=rn,a=hi,o=on,c=bn,l=yt.DEFAULT_ANISOTROPY,u=Fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qf++}),this.uuid=An(),this.name="",this.source=new wd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==md)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Lr:e.x=e.x-Math.floor(e.x);break;case di:e.x=e.x<0?0:1;break;case Lo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Lr:e.y=e.y-Math.floor(e.y);break;case di:e.y=e.y<0?0:1;break;case Lo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}yt.DEFAULT_IMAGE=null;yt.DEFAULT_MAPPING=md;yt.DEFAULT_ANISOTROPY=1;class rt{constructor(e=0,t=0,i=0,r=1){rt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],p=c[5],g=c[9],v=c[2],m=c[6],f=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(l+1)/2,E=(p+1)/2,C=(f+1)/2,T=(u+h)/4,D=(d+v)/4,L=(g+m)/4;return _>E&&_>C?_<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(_),r=T/i,s=D/i):E>C?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=T/r,s=L/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=D/s,r=L/s),this.set(i,r,s,t),this}let S=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(d-v)/S,this.z=(h-u)/S,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Kf extends Si{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t);const r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new yt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new wd(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vi extends Kf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Pd extends yt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class $f extends yt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class wn{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],u=i[r+2],d=i[r+3];const h=s[a+0],p=s[a+1],g=s[a+2],v=s[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=h,e[t+1]=p,e[t+2]=g,e[t+3]=v;return}if(d!==v||c!==h||l!==p||u!==g){let m=1-o;const f=c*h+l*p+u*g+d*v,S=f>=0?1:-1,_=1-f*f;if(_>Number.EPSILON){const C=Math.sqrt(_),T=Math.atan2(C,f*S);m=Math.sin(m*T)/C,o=Math.sin(o*T)/C}const E=o*S;if(c=c*m+h*E,l=l*m+p*E,u=u*m+g*E,d=d*m+v*E,m===1-o){const C=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=C,l*=C,u*=C,d*=C}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],u=i[r+3],d=s[a],h=s[a+1],p=s[a+2],g=s[a+3];return e[t]=o*g+u*d+c*p-l*h,e[t+1]=c*g+u*h+l*d-o*p,e[t+2]=l*g+u*p+o*h-c*d,e[t+3]=u*g-o*d-c*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(r/2),d=o(s/2),h=c(i/2),p=c(r/2),g=c(s/2);switch(a){case"XYZ":this._x=h*u*d+l*p*g,this._y=l*p*d-h*u*g,this._z=l*u*g+h*p*d,this._w=l*u*d-h*p*g;break;case"YXZ":this._x=h*u*d+l*p*g,this._y=l*p*d-h*u*g,this._z=l*u*g-h*p*d,this._w=l*u*d+h*p*g;break;case"ZXY":this._x=h*u*d-l*p*g,this._y=l*p*d+h*u*g,this._z=l*u*g+h*p*d,this._w=l*u*d-h*p*g;break;case"ZYX":this._x=h*u*d-l*p*g,this._y=l*p*d+h*u*g,this._z=l*u*g-h*p*d,this._w=l*u*d+h*p*g;break;case"YZX":this._x=h*u*d+l*p*g,this._y=l*p*d+h*u*g,this._z=l*u*g-h*p*d,this._w=l*u*d-h*p*g;break;case"XZY":this._x=h*u*d-l*p*g,this._y=l*p*d-h*u*g,this._z=l*u*g+h*p*d,this._w=l*u*d+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=i+o+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-c)*p,this._y=(s-l)*p,this._z=(a-r)*p}else if(i>o&&i>d){const p=2*Math.sqrt(1+i-o-d);this._w=(u-c)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+l)/p}else if(o>d){const p=2*Math.sqrt(1+o-i-d);this._w=(s-l)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+d-i-o);this._w=(a-r)/p,this._x=(s+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ct(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-i*l,this._z=s*u+a*l+i*c-r*o,this._w=a*u-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),d=Math.sin((1-t)*u)/l,h=Math.sin(t*u)/l;return this._w=a*d+this._w*h,this._x=i*d+this._x*h,this._y=r*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,i=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Pl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Pl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),u=2*(o*t-s*r),d=2*(s*i-a*t);return this.x=t+c*l+a*d-o*u,this.y=i+c*u+o*l-s*d,this.z=r+c*d+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Wa.copy(this).projectOnVector(e),this.sub(Wa)}reflect(e){return this.sub(Wa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ct(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Wa=new P,Pl=new wn;class yi{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Qt):Qt.fromBufferAttribute(s,a),Qt.applyMatrix4(e.matrixWorld),this.expandByPoint(Qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),is.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),is.copy(i.boundingBox)),is.applyMatrix4(e.matrixWorld),this.union(is)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qt),Qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(mr),rs.subVectors(this.max,mr),Di.subVectors(e.a,mr),wi.subVectors(e.b,mr),Pi.subVectors(e.c,mr),Rn.subVectors(wi,Di),Cn.subVectors(Pi,wi),Jn.subVectors(Di,Pi);let t=[0,-Rn.z,Rn.y,0,-Cn.z,Cn.y,0,-Jn.z,Jn.y,Rn.z,0,-Rn.x,Cn.z,0,-Cn.x,Jn.z,0,-Jn.x,-Rn.y,Rn.x,0,-Cn.y,Cn.x,0,-Jn.y,Jn.x,0];return!Xa(t,Di,wi,Pi,rs)||(t=[1,0,0,0,1,0,0,0,1],!Xa(t,Di,wi,Pi,rs))?!1:(ss.crossVectors(Rn,Cn),t=[ss.x,ss.y,ss.z],Xa(t,Di,wi,Pi,rs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(pn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const pn=[new P,new P,new P,new P,new P,new P,new P,new P],Qt=new P,is=new yi,Di=new P,wi=new P,Pi=new P,Rn=new P,Cn=new P,Jn=new P,mr=new P,rs=new P,ss=new P,Qn=new P;function Xa(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Qn.fromArray(n,s);const o=r.x*Math.abs(Qn.x)+r.y*Math.abs(Qn.y)+r.z*Math.abs(Qn.z),c=e.dot(Qn),l=t.dot(Qn),u=i.dot(Qn);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const jf=new yi,gr=new P,Ya=new P;class Ei{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):jf.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;gr.subVectors(e,this.center);const t=gr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(gr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ya.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(gr.copy(e.center).add(Ya)),this.expandByPoint(gr.copy(e.center).sub(Ya))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const mn=new P,qa=new P,as=new P,In=new P,Ka=new P,os=new P,$a=new P;class ya{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,mn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=mn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(mn.copy(this.origin).addScaledVector(this.direction,t),mn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){qa.copy(e).add(t).multiplyScalar(.5),as.copy(t).sub(e).normalize(),In.copy(this.origin).sub(qa);const s=e.distanceTo(t)*.5,a=-this.direction.dot(as),o=In.dot(this.direction),c=-In.dot(as),l=In.lengthSq(),u=Math.abs(1-a*a);let d,h,p,g;if(u>0)if(d=a*c-o,h=a*o-c,g=s*u,d>=0)if(h>=-g)if(h<=g){const v=1/u;d*=v,h*=v,p=d*(d+a*h+2*o)+h*(a*d+h+2*c)+l}else h=s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*c)+l;else h=-s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*c)+l;else h<=-g?(d=Math.max(0,-(-a*s+o)),h=d>0?-s:Math.min(Math.max(-s,-c),s),p=-d*d+h*(h+2*c)+l):h<=g?(d=0,h=Math.min(Math.max(-s,-c),s),p=h*(h+2*c)+l):(d=Math.max(0,-(a*s+o)),h=d>0?s:Math.min(Math.max(-s,-c),s),p=-d*d+h*(h+2*c)+l);else h=a>0?-s:s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(qa).addScaledVector(as,h),p}intersectSphere(e,t){mn.subVectors(e.center,this.origin);const i=mn.dot(this.direction),r=mn.dot(mn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,mn)!==null}intersectTriangle(e,t,i,r,s){Ka.subVectors(t,e),os.subVectors(i,e),$a.crossVectors(Ka,os);let a=this.direction.dot($a),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;In.subVectors(this.origin,e);const c=o*this.direction.dot(os.crossVectors(In,os));if(c<0)return null;const l=o*this.direction.dot(Ka.cross(In));if(l<0||c+l>a)return null;const u=-o*In.dot($a);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qe{constructor(e,t,i,r,s,a,o,c,l,u,d,h,p,g,v,m){Qe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,u,d,h,p,g,v,m)}set(e,t,i,r,s,a,o,c,l,u,d,h,p,g,v,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qe().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Ri.setFromMatrixColumn(e,0).length(),s=1/Ri.setFromMatrixColumn(e,1).length(),a=1/Ri.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=a*u,p=a*d,g=o*u,v=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=p+g*l,t[5]=h-v*l,t[9]=-o*c,t[2]=v-h*l,t[6]=g+p*l,t[10]=a*c}else if(e.order==="YXZ"){const h=c*u,p=c*d,g=l*u,v=l*d;t[0]=h+v*o,t[4]=g*o-p,t[8]=a*l,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=p*o-g,t[6]=v+h*o,t[10]=a*c}else if(e.order==="ZXY"){const h=c*u,p=c*d,g=l*u,v=l*d;t[0]=h-v*o,t[4]=-a*d,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*u,t[9]=v-h*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const h=a*u,p=a*d,g=o*u,v=o*d;t[0]=c*u,t[4]=g*l-p,t[8]=h*l+v,t[1]=c*d,t[5]=v*l+h,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const h=a*c,p=a*l,g=o*c,v=o*l;t[0]=c*u,t[4]=v-h*d,t[8]=g*d+p,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=p*d+g,t[10]=h-v*d}else if(e.order==="XZY"){const h=a*c,p=a*l,g=o*c,v=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+v,t[5]=a*u,t[9]=p*d-g,t[2]=g*d-p,t[6]=o*u,t[10]=v*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zf,e,Jf)}lookAt(e,t,i){const r=this.elements;return Ft.subVectors(e,t),Ft.lengthSq()===0&&(Ft.z=1),Ft.normalize(),Hn.crossVectors(i,Ft),Hn.lengthSq()===0&&(Math.abs(i.z)===1?Ft.x+=1e-4:Ft.z+=1e-4,Ft.normalize(),Hn.crossVectors(i,Ft)),Hn.normalize(),cs.crossVectors(Ft,Hn),r[0]=Hn.x,r[4]=cs.x,r[8]=Ft.x,r[1]=Hn.y,r[5]=cs.y,r[9]=Ft.y,r[2]=Hn.z,r[6]=cs.z,r[10]=Ft.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],d=i[5],h=i[9],p=i[13],g=i[2],v=i[6],m=i[10],f=i[14],S=i[3],_=i[7],E=i[11],C=i[15],T=r[0],D=r[4],L=r[8],A=r[12],M=r[1],R=r[5],B=r[9],O=r[13],X=r[2],q=r[6],V=r[10],Y=r[14],k=r[3],se=r[7],ue=r[11],me=r[15];return s[0]=a*T+o*M+c*X+l*k,s[4]=a*D+o*R+c*q+l*se,s[8]=a*L+o*B+c*V+l*ue,s[12]=a*A+o*O+c*Y+l*me,s[1]=u*T+d*M+h*X+p*k,s[5]=u*D+d*R+h*q+p*se,s[9]=u*L+d*B+h*V+p*ue,s[13]=u*A+d*O+h*Y+p*me,s[2]=g*T+v*M+m*X+f*k,s[6]=g*D+v*R+m*q+f*se,s[10]=g*L+v*B+m*V+f*ue,s[14]=g*A+v*O+m*Y+f*me,s[3]=S*T+_*M+E*X+C*k,s[7]=S*D+_*R+E*q+C*se,s[11]=S*L+_*B+E*V+C*ue,s[15]=S*A+_*O+E*Y+C*me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],p=e[14],g=e[3],v=e[7],m=e[11],f=e[15];return g*(+s*c*d-r*l*d-s*o*h+i*l*h+r*o*p-i*c*p)+v*(+t*c*p-t*l*h+s*a*h-r*a*p+r*l*u-s*c*u)+m*(+t*l*d-t*o*p-s*a*d+i*a*p+s*o*u-i*l*u)+f*(-r*o*u-t*c*d+t*o*h+r*a*d-i*a*h+i*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],p=e[11],g=e[12],v=e[13],m=e[14],f=e[15],S=d*m*l-v*h*l+v*c*p-o*m*p-d*c*f+o*h*f,_=g*h*l-u*m*l-g*c*p+a*m*p+u*c*f-a*h*f,E=u*v*l-g*d*l+g*o*p-a*v*p-u*o*f+a*d*f,C=g*d*c-u*v*c-g*o*h+a*v*h+u*o*m-a*d*m,T=t*S+i*_+r*E+s*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/T;return e[0]=S*D,e[1]=(v*h*s-d*m*s-v*r*p+i*m*p+d*r*f-i*h*f)*D,e[2]=(o*m*s-v*c*s+v*r*l-i*m*l-o*r*f+i*c*f)*D,e[3]=(d*c*s-o*h*s-d*r*l+i*h*l+o*r*p-i*c*p)*D,e[4]=_*D,e[5]=(u*m*s-g*h*s+g*r*p-t*m*p-u*r*f+t*h*f)*D,e[6]=(g*c*s-a*m*s-g*r*l+t*m*l+a*r*f-t*c*f)*D,e[7]=(a*h*s-u*c*s+u*r*l-t*h*l-a*r*p+t*c*p)*D,e[8]=E*D,e[9]=(g*d*s-u*v*s-g*i*p+t*v*p+u*i*f-t*d*f)*D,e[10]=(a*v*s-g*o*s+g*i*l-t*v*l-a*i*f+t*o*f)*D,e[11]=(u*o*s-a*d*s-u*i*l+t*d*l+a*i*p-t*o*p)*D,e[12]=C*D,e[13]=(u*v*r-g*d*r+g*i*h-t*v*h-u*i*m+t*d*m)*D,e[14]=(g*o*r-a*v*r-g*i*c+t*v*c+a*i*m-t*o*m)*D,e[15]=(a*d*r-u*o*r+u*i*c-t*d*c-a*i*h+t*o*h)*D,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+i,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,d=o+o,h=s*l,p=s*u,g=s*d,v=a*u,m=a*d,f=o*d,S=c*l,_=c*u,E=c*d,C=i.x,T=i.y,D=i.z;return r[0]=(1-(v+f))*C,r[1]=(p+E)*C,r[2]=(g-_)*C,r[3]=0,r[4]=(p-E)*T,r[5]=(1-(h+f))*T,r[6]=(m+S)*T,r[7]=0,r[8]=(g+_)*D,r[9]=(m-S)*D,r[10]=(1-(h+v))*D,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Ri.set(r[0],r[1],r[2]).length();const a=Ri.set(r[4],r[5],r[6]).length(),o=Ri.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],en.copy(this);const l=1/s,u=1/a,d=1/o;return en.elements[0]*=l,en.elements[1]*=l,en.elements[2]*=l,en.elements[4]*=u,en.elements[5]*=u,en.elements[6]*=u,en.elements[8]*=d,en.elements[9]*=d,en.elements[10]*=d,t.setFromRotationMatrix(en),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=En){const c=this.elements,l=2*s/(t-e),u=2*s/(i-r),d=(t+e)/(t-e),h=(i+r)/(i-r);let p,g;if(o===En)p=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===ta)p=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=En){const c=this.elements,l=1/(t-e),u=1/(i-r),d=1/(a-s),h=(t+e)*l,p=(i+r)*u;let g,v;if(o===En)g=(a+s)*d,v=-2*d;else if(o===ta)g=s*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ri=new P,en=new Qe,Zf=new P(0,0,0),Jf=new P(1,1,1),Hn=new P,cs=new P,Ft=new P,Rl=new Qe,Cl=new wn;class cn{constructor(e=0,t=0,i=0,r=cn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],d=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ct(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ct(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ct(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ct(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Rl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Rl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Cl.setFromEuler(this),this.setFromQuaternion(Cl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}cn.DEFAULT_ORDER="XYZ";class Oc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Qf=0;const Il=new P,Ci=new wn,gn=new Qe,ls=new P,_r=new P,ep=new P,tp=new wn,Hl=new P(1,0,0),Ll=new P(0,1,0),Ul=new P(0,0,1),Nl={type:"added"},np={type:"removed"},Ii={type:"childadded",child:null},ja={type:"childremoved",child:null};class Et extends Si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qf++}),this.uuid=An(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Et.DEFAULT_UP.clone();const e=new P,t=new cn,i=new wn,r=new P(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Qe},normalMatrix:{value:new Ne}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=Et.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Oc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ci.setFromAxisAngle(e,t),this.quaternion.multiply(Ci),this}rotateOnWorldAxis(e,t){return Ci.setFromAxisAngle(e,t),this.quaternion.premultiply(Ci),this}rotateX(e){return this.rotateOnAxis(Hl,e)}rotateY(e){return this.rotateOnAxis(Ll,e)}rotateZ(e){return this.rotateOnAxis(Ul,e)}translateOnAxis(e,t){return Il.copy(e).applyQuaternion(this.quaternion),this.position.add(Il.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Hl,e)}translateY(e){return this.translateOnAxis(Ll,e)}translateZ(e){return this.translateOnAxis(Ul,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(gn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ls.copy(e):ls.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),_r.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gn.lookAt(_r,ls,this.up):gn.lookAt(ls,_r,this.up),this.quaternion.setFromRotationMatrix(gn),r&&(gn.extractRotation(r.matrixWorld),Ci.setFromRotationMatrix(gn),this.quaternion.premultiply(Ci.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Nl),Ii.child=e,this.dispatchEvent(Ii),Ii.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(np),ja.child=e,this.dispatchEvent(ja),ja.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),gn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),gn.multiply(e.parent.matrixWorld)),e.applyMatrix4(gn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Nl),Ii.child=e,this.dispatchEvent(Ii),Ii.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_r,e,ep),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_r,tp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Et.DEFAULT_UP=new P(0,1,0);Et.DEFAULT_MATRIX_AUTO_UPDATE=!0;Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const tn=new P,_n=new P,Za=new P,vn=new P,Hi=new P,Li=new P,Ol=new P,Ja=new P,Qa=new P,eo=new P;class an{constructor(e=new P,t=new P,i=new P){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),tn.subVectors(e,t),r.cross(tn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){tn.subVectors(r,t),_n.subVectors(i,t),Za.subVectors(e,t);const a=tn.dot(tn),o=tn.dot(_n),c=tn.dot(Za),l=_n.dot(_n),u=_n.dot(Za),d=a*l-o*o;if(d===0)return s.set(0,0,0),null;const h=1/d,p=(l*c-o*u)*h,g=(a*u-o*c)*h;return s.set(1-p-g,g,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,vn)===null?!1:vn.x>=0&&vn.y>=0&&vn.x+vn.y<=1}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,vn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,vn.x),c.addScaledVector(a,vn.y),c.addScaledVector(o,vn.z),c)}static isFrontFacing(e,t,i,r){return tn.subVectors(i,t),_n.subVectors(e,t),tn.cross(_n).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return tn.subVectors(this.c,this.b),_n.subVectors(this.a,this.b),tn.cross(_n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return an.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return an.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return an.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return an.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return an.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Hi.subVectors(r,i),Li.subVectors(s,i),Ja.subVectors(e,i);const c=Hi.dot(Ja),l=Li.dot(Ja);if(c<=0&&l<=0)return t.copy(i);Qa.subVectors(e,r);const u=Hi.dot(Qa),d=Li.dot(Qa);if(u>=0&&d<=u)return t.copy(r);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(i).addScaledVector(Hi,a);eo.subVectors(e,s);const p=Hi.dot(eo),g=Li.dot(eo);if(g>=0&&p<=g)return t.copy(s);const v=p*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(Li,o);const m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return Ol.subVectors(s,r),o=(d-u)/(d-u+(p-g)),t.copy(r).addScaledVector(Ol,o);const f=1/(m+v+h);return a=v*f,o=h*f,t.copy(i).addScaledVector(Hi,a).addScaledVector(Li,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Rd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ln={h:0,s:0,l:0},us={h:0,s:0,l:0};function to(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Oe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Rt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=Je.workingColorSpace){return this.r=e,this.g=t,this.b=i,Je.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=Je.workingColorSpace){if(e=Nc(e,1),t=Ct(t,0,1),i=Ct(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=to(a,s,e+1/3),this.g=to(a,s,e),this.b=to(a,s,e-1/3)}return Je.toWorkingColorSpace(this,r),this}setStyle(e,t=Rt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Rt){const i=Rd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=er(e.r),this.g=er(e.g),this.b=er(e.b),this}copyLinearToSRGB(e){return this.r=Ga(e.r),this.g=Ga(e.g),this.b=Ga(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Rt){return Je.fromWorkingColorSpace(Tt.copy(this),e),Math.round(Ct(Tt.r*255,0,255))*65536+Math.round(Ct(Tt.g*255,0,255))*256+Math.round(Ct(Tt.b*255,0,255))}getHexString(e=Rt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.fromWorkingColorSpace(Tt.copy(this),t);const i=Tt.r,r=Tt.g,s=Tt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case i:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-i)/d+2;break;case s:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Je.workingColorSpace){return Je.fromWorkingColorSpace(Tt.copy(this),t),e.r=Tt.r,e.g=Tt.g,e.b=Tt.b,e}getStyle(e=Rt){Je.fromWorkingColorSpace(Tt.copy(this),e);const t=Tt.r,i=Tt.g,r=Tt.b;return e!==Rt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Ln),this.setHSL(Ln.h+e,Ln.s+t,Ln.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ln),e.getHSL(us);const i=Cr(Ln.h,us.h,t),r=Cr(Ln.s,us.s,t),s=Cr(Ln.l,us.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Tt=new Oe;Oe.NAMES=Rd;let ip=0;class jn extends Si{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ip++}),this.uuid=An(),this.name="",this.type="Material",this.blending=Zi,this.side=Vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ro,this.blendDst=Co,this.blendEquation=li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=Zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=El,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ti,this.stencilZFail=Ti,this.stencilZPass=Ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Zi&&(i.blending=this.blending),this.side!==Vn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ro&&(i.blendSrc=this.blendSrc),this.blendDst!==Co&&(i.blendDst=this.blendDst),this.blendEquation!==li&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Zs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==El&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ti&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ti&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ti&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Fr extends jn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cn,this.combine=pd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ht=new P,ds=new Se;class Wt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=oc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=dn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Qi("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ds.fromBufferAttribute(this,t),ds.applyMatrix3(e),this.setXY(t,ds.x,ds.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix3(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix4(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ht.fromBufferAttribute(this,t),ht.applyNormalMatrix(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ht.fromBufferAttribute(this,t),ht.transformDirection(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=sn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=et(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=sn(t,this.array)),t}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=sn(t,this.array)),t}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=sn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=sn(t,this.array)),t}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),i=et(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),i=et(i,this.array),r=et(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),i=et(i,this.array),r=et(r,this.array),s=et(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==oc&&(e.usage=this.usage),e}}class Cd extends Wt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Id extends Wt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class lt extends Wt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let rp=0;const Kt=new Qe,no=new Et,Ui=new P,zt=new yi,vr=new yi,_t=new P;class pt extends Si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rp++}),this.uuid=An(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Dd(e)?Id:Cd)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ne().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Kt.makeRotationFromQuaternion(e),this.applyMatrix4(Kt),this}rotateX(e){return Kt.makeRotationX(e),this.applyMatrix4(Kt),this}rotateY(e){return Kt.makeRotationY(e),this.applyMatrix4(Kt),this}rotateZ(e){return Kt.makeRotationZ(e),this.applyMatrix4(Kt),this}translate(e,t,i){return Kt.makeTranslation(e,t,i),this.applyMatrix4(Kt),this}scale(e,t,i){return Kt.makeScale(e,t,i),this.applyMatrix4(Kt),this}lookAt(e){return no.lookAt(e),no.updateMatrix(),this.applyMatrix4(no.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ui).negate(),this.translate(Ui.x,Ui.y,Ui.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new lt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];zt.setFromBufferAttribute(s),this.morphTargetsRelative?(_t.addVectors(this.boundingBox.min,zt.min),this.boundingBox.expandByPoint(_t),_t.addVectors(this.boundingBox.max,zt.max),this.boundingBox.expandByPoint(_t)):(this.boundingBox.expandByPoint(zt.min),this.boundingBox.expandByPoint(zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ei);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const i=this.boundingSphere.center;if(zt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];vr.setFromBufferAttribute(o),this.morphTargetsRelative?(_t.addVectors(zt.min,vr.min),zt.expandByPoint(_t),_t.addVectors(zt.max,vr.max),zt.expandByPoint(_t)):(zt.expandByPoint(vr.min),zt.expandByPoint(vr.max))}zt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)_t.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(_t));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)_t.fromBufferAttribute(o,l),c&&(Ui.fromBufferAttribute(e,l),_t.add(Ui)),r=Math.max(r,i.distanceToSquared(_t))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Wt(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let L=0;L<i.count;L++)o[L]=new P,c[L]=new P;const l=new P,u=new P,d=new P,h=new Se,p=new Se,g=new Se,v=new P,m=new P;function f(L,A,M){l.fromBufferAttribute(i,L),u.fromBufferAttribute(i,A),d.fromBufferAttribute(i,M),h.fromBufferAttribute(s,L),p.fromBufferAttribute(s,A),g.fromBufferAttribute(s,M),u.sub(l),d.sub(l),p.sub(h),g.sub(h);const R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(R),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(R),o[L].add(v),o[A].add(v),o[M].add(v),c[L].add(m),c[A].add(m),c[M].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let L=0,A=S.length;L<A;++L){const M=S[L],R=M.start,B=M.count;for(let O=R,X=R+B;O<X;O+=3)f(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const _=new P,E=new P,C=new P,T=new P;function D(L){C.fromBufferAttribute(r,L),T.copy(C);const A=o[L];_.copy(A),_.sub(C.multiplyScalar(C.dot(A))).normalize(),E.crossVectors(T,A);const R=E.dot(c[L])<0?-1:1;a.setXYZW(L,_.x,_.y,_.z,R)}for(let L=0,A=S.length;L<A;++L){const M=S[L],R=M.start,B=M.count;for(let O=R,X=R+B;O<X;O+=3)D(e.getX(O+0)),D(e.getX(O+1)),D(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Wt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new P,s=new P,a=new P,o=new P,c=new P,l=new P,u=new P,d=new P;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),v=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,m),o.add(u),c.add(u),l.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)_t.fromBufferAttribute(e,t),_t.normalize(),e.setXYZ(t,_t.x,_t.y,_t.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,d=o.normalized,h=new l.constructor(c.length*u);let p=0,g=0;for(let v=0,m=c.length;v<m;v++){o.isInterleavedBufferAttribute?p=c[v]*o.data.stride+o.offset:p=c[v]*u;for(let f=0;f<u;f++)h[g++]=l[p++]}return new Wt(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new pt,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,d=l.length;u<d;u++){const h=l[u],p=e(h,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const p=l[d];u.push(p.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],d=s[l];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Fl=new Qe,ei=new ya,hs=new Ei,zl=new P,Ni=new P,Oi=new P,Fi=new P,io=new P,fs=new P,ps=new Se,ms=new Se,gs=new Se,Bl=new P,kl=new P,Gl=new P,_s=new P,vs=new P;class It extends Et{constructor(e=new pt,t=new Fr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){fs.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],d=s[c];u!==0&&(io.fromBufferAttribute(d,e),a?fs.addScaledVector(io,u):fs.addScaledVector(io.sub(t),u))}t.add(fs)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),hs.copy(i.boundingSphere),hs.applyMatrix4(s),ei.copy(e.ray).recast(e.near),!(hs.containsPoint(ei.origin)===!1&&(ei.intersectSphere(hs,zl)===null||ei.origin.distanceToSquared(zl)>(e.far-e.near)**2))&&(Fl.copy(s).invert(),ei.copy(e.ray).applyMatrix4(Fl),!(i.boundingBox!==null&&ei.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ei)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const m=h[g],f=a[m.materialIndex],S=Math.max(m.start,p.start),_=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let E=S,C=_;E<C;E+=3){const T=o.getX(E),D=o.getX(E+1),L=o.getX(E+2);r=xs(this,f,e,i,l,u,d,T,D,L),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const S=o.getX(m),_=o.getX(m+1),E=o.getX(m+2);r=xs(this,a,e,i,l,u,d,S,_,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const m=h[g],f=a[m.materialIndex],S=Math.max(m.start,p.start),_=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let E=S,C=_;E<C;E+=3){const T=E,D=E+1,L=E+2;r=xs(this,f,e,i,l,u,d,T,D,L),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const S=m,_=m+1,E=m+2;r=xs(this,a,e,i,l,u,d,S,_,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function sp(n,e,t,i,r,s,a,o){let c;if(e.side===Ut?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===Vn,o),c===null)return null;vs.copy(o),vs.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(vs);return l<t.near||l>t.far?null:{distance:l,point:vs.clone(),object:n}}function xs(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,Ni),n.getVertexPosition(c,Oi),n.getVertexPosition(l,Fi);const u=sp(n,e,t,i,Ni,Oi,Fi,_s);if(u){r&&(ps.fromBufferAttribute(r,o),ms.fromBufferAttribute(r,c),gs.fromBufferAttribute(r,l),u.uv=an.getInterpolation(_s,Ni,Oi,Fi,ps,ms,gs,new Se)),s&&(ps.fromBufferAttribute(s,o),ms.fromBufferAttribute(s,c),gs.fromBufferAttribute(s,l),u.uv1=an.getInterpolation(_s,Ni,Oi,Fi,ps,ms,gs,new Se)),a&&(Bl.fromBufferAttribute(a,o),kl.fromBufferAttribute(a,c),Gl.fromBufferAttribute(a,l),u.normal=an.getInterpolation(_s,Ni,Oi,Fi,Bl,kl,Gl,new P),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new P,materialIndex:0};an.getNormal(Ni,Oi,Fi,d.normal),u.face=d}return u}class Yr extends pt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],d=[];let h=0,p=0;g("z","y","x",-1,-1,i,t,e,a,s,0),g("z","y","x",1,-1,i,t,-e,a,s,1),g("x","z","y",1,1,e,i,t,r,a,2),g("x","z","y",1,-1,e,i,-t,r,a,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new lt(l,3)),this.setAttribute("normal",new lt(u,3)),this.setAttribute("uv",new lt(d,2));function g(v,m,f,S,_,E,C,T,D,L,A){const M=E/D,R=C/L,B=E/2,O=C/2,X=T/2,q=D+1,V=L+1;let Y=0,k=0;const se=new P;for(let ue=0;ue<V;ue++){const me=ue*R-O;for(let Ce=0;Ce<q;Ce++){const qe=Ce*M-B;se[v]=qe*S,se[m]=me*_,se[f]=X,l.push(se.x,se.y,se.z),se[v]=0,se[m]=0,se[f]=T>0?1:-1,u.push(se.x,se.y,se.z),d.push(Ce/D),d.push(1-ue/L),Y+=1}}for(let ue=0;ue<L;ue++)for(let me=0;me<D;me++){const Ce=h+me+q*ue,qe=h+me+q*(ue+1),W=h+(me+1)+q*(ue+1),Q=h+(me+1)+q*ue;c.push(Ce,qe,Q),c.push(qe,W,Q),k+=6}o.addGroup(p,k,A),p+=k,h+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function cr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Pt(n){const e={};for(let t=0;t<n.length;t++){const i=cr(n[t]);for(const r in i)e[r]=i[r]}return e}function ap(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Hd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}const op={clone:cr,merge:Pt};var cp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wn extends jn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cp,this.fragmentShader=lp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=cr(e.uniforms),this.uniformsGroups=ap(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Ld extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe,this.coordinateSystem=En}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Un=new P,Vl=new Se,Wl=new Se;class Gt extends Ld{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Nr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Rr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Nr*2*Math.atan(Math.tan(Rr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Un.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Un.x,Un.y).multiplyScalar(-e/Un.z),Un.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Un.x,Un.y).multiplyScalar(-e/Un.z)}getViewSize(e,t){return this.getViewBounds(e,Vl,Wl),t.subVectors(Wl,Vl)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Rr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const zi=-90,Bi=1;class up extends Et{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Gt(zi,Bi,e,t);r.layers=this.layers,this.add(r);const s=new Gt(zi,Bi,e,t);s.layers=this.layers,this.add(s);const a=new Gt(zi,Bi,e,t);a.layers=this.layers,this.add(a);const o=new Gt(zi,Bi,e,t);o.layers=this.layers,this.add(o);const c=new Gt(zi,Bi,e,t);c.layers=this.layers,this.add(c);const l=new Gt(zi,Bi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===En)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ta)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Ud extends yt{constructor(e,t,i,r,s,a,o,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:rr,super(e,t,i,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class dp extends vi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Ud(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:rn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Yr(5,5,5),s=new Wn({name:"CubemapFromEquirect",uniforms:cr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ut,blending:Bn});s.uniforms.tEquirect.value=t;const a=new It(r,s),o=t.minFilter;return t.minFilter===hi&&(t.minFilter=rn),new up(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const ro=new P,hp=new P,fp=new Ne;class ai{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=ro.subVectors(i,t).cross(hp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(ro),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||fp.getNormalMatrix(e),r=this.coplanarPoint(ro).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ti=new Ei,Ms=new P;class Fc{constructor(e=new ai,t=new ai,i=new ai,r=new ai,s=new ai,a=new ai){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=En){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],c=r[3],l=r[4],u=r[5],d=r[6],h=r[7],p=r[8],g=r[9],v=r[10],m=r[11],f=r[12],S=r[13],_=r[14],E=r[15];if(i[0].setComponents(c-s,h-l,m-p,E-f).normalize(),i[1].setComponents(c+s,h+l,m+p,E+f).normalize(),i[2].setComponents(c+a,h+u,m+g,E+S).normalize(),i[3].setComponents(c-a,h-u,m-g,E-S).normalize(),i[4].setComponents(c-o,h-d,m-v,E-_).normalize(),t===En)i[5].setComponents(c+o,h+d,m+v,E+_).normalize();else if(t===ta)i[5].setComponents(o,d,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ti.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ti)}intersectsSprite(e){return ti.center.set(0,0,0),ti.radius=.7071067811865476,ti.applyMatrix4(e.matrixWorld),this.intersectsSphere(ti)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ms.x=r.normal.x>0?e.max.x:e.min.x,Ms.y=r.normal.y>0?e.max.y:e.min.y,Ms.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ms)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Nd(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function pp(n){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,d=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,c,l){const u=c.array,d=c._updateRange,h=c.updateRanges;if(n.bindBuffer(l,o),d.count===-1&&h.length===0&&n.bufferSubData(l,0,u),h.length!==0){for(let p=0,g=h.length;p<g;p++){const v=h[p];n.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}d.count!==-1&&(n.bufferSubData(l,d.offset*u.BYTES_PER_ELEMENT,u,d.offset,d.count),d.count=-1),c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}class qr extends pt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,u=c+1,d=e/o,h=t/c,p=[],g=[],v=[],m=[];for(let f=0;f<u;f++){const S=f*h-a;for(let _=0;_<l;_++){const E=_*d-s;g.push(E,-S,0),v.push(0,0,1),m.push(_/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let S=0;S<o;S++){const _=S+l*f,E=S+l*(f+1),C=S+1+l*(f+1),T=S+1+l*f;p.push(_,E,T),p.push(E,C,T)}this.setIndex(p),this.setAttribute("position",new lt(g,3)),this.setAttribute("normal",new lt(v,3)),this.setAttribute("uv",new lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qr(e.width,e.height,e.widthSegments,e.heightSegments)}}var mp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gp=`#ifdef USE_ALPHAHASH
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
#endif`,_p=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Mp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Sp=`#ifdef USE_AOMAP
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
#endif`,yp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ep=`#ifdef USE_BATCHING
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
#endif`,Ap=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Tp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,bp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Dp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,wp=`#ifdef USE_IRIDESCENCE
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
#endif`,Pp=`#ifdef USE_BUMPMAP
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
#endif`,Rp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Cp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ip=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Hp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Up=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Np=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Op=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Fp=`#define PI 3.141592653589793
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
} // validated`,zp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Bp=`vec3 transformedNormal = objectNormal;
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
#endif`,kp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Yp=`
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
}`,qp=`#ifdef USE_ENVMAP
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
#endif`,Kp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,$p=`#ifdef USE_ENVMAP
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
#endif`,jp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zp=`#ifdef USE_ENVMAP
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
#endif`,Jp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,em=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,tm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,nm=`#ifdef USE_GRADIENTMAP
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
}`,im=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,am=`uniform bool receiveShadow;
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
#endif`,om=`#ifdef USE_ENVMAP
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
#endif`,cm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,um=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hm=`PhysicalMaterial material;
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
#endif`,fm=`struct PhysicalMaterial {
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
}`,pm=`
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
#endif`,mm=`#if defined( RE_IndirectDiffuse )
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
#endif`,gm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_m=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ym=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Em=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Am=`#if defined( USE_POINTS_UV )
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
#endif`,Tm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Pm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rm=`#ifdef USE_MORPHTARGETS
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
#endif`,Cm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Im=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Hm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Lm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Um=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Om=`#ifdef USE_NORMALMAP
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
#endif`,Fm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,km=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Gm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Wm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Xm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ym=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Km=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$m=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Zm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Qm=`float getShadowMask() {
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
}`,eg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,tg=`#ifdef USE_SKINNING
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
#endif`,ng=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ig=`#ifdef USE_SKINNING
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
#endif`,rg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ag=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,og=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,cg=`#ifdef USE_TRANSMISSION
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
#endif`,lg=`#ifdef USE_TRANSMISSION
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
#endif`,ug=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const pg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mg=`uniform sampler2D t2D;
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
}`,gg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_g=`#ifdef ENVMAP_TYPE_CUBE
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
}`,vg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mg=`#include <common>
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
}`,Sg=`#if DEPTH_PACKING == 3200
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
}`,yg=`#define DISTANCE
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
}`,Eg=`#define DISTANCE
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
}`,Ag=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Tg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bg=`uniform float scale;
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
}`,Dg=`uniform vec3 diffuse;
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
}`,wg=`#include <common>
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
}`,Pg=`uniform vec3 diffuse;
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
}`,Rg=`#define LAMBERT
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
}`,Cg=`#define LAMBERT
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
}`,Ig=`#define MATCAP
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
}`,Hg=`#define MATCAP
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
}`,Lg=`#define NORMAL
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
}`,Ug=`#define NORMAL
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
}`,Ng=`#define PHONG
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
}`,Og=`#define PHONG
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
}`,Fg=`#define STANDARD
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
}`,zg=`#define STANDARD
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
}`,Bg=`#define TOON
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
}`,kg=`#define TOON
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
}`,Gg=`uniform float size;
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
}`,Vg=`uniform vec3 diffuse;
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
}`,Wg=`#include <common>
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
}`,Xg=`uniform vec3 color;
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
}`,Yg=`uniform float rotation;
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
}`,qg=`uniform vec3 diffuse;
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
}`,Ue={alphahash_fragment:mp,alphahash_pars_fragment:gp,alphamap_fragment:_p,alphamap_pars_fragment:vp,alphatest_fragment:xp,alphatest_pars_fragment:Mp,aomap_fragment:Sp,aomap_pars_fragment:yp,batching_pars_vertex:Ep,batching_vertex:Ap,begin_vertex:Tp,beginnormal_vertex:bp,bsdfs:Dp,iridescence_fragment:wp,bumpmap_pars_fragment:Pp,clipping_planes_fragment:Rp,clipping_planes_pars_fragment:Cp,clipping_planes_pars_vertex:Ip,clipping_planes_vertex:Hp,color_fragment:Lp,color_pars_fragment:Up,color_pars_vertex:Np,color_vertex:Op,common:Fp,cube_uv_reflection_fragment:zp,defaultnormal_vertex:Bp,displacementmap_pars_vertex:kp,displacementmap_vertex:Gp,emissivemap_fragment:Vp,emissivemap_pars_fragment:Wp,colorspace_fragment:Xp,colorspace_pars_fragment:Yp,envmap_fragment:qp,envmap_common_pars_fragment:Kp,envmap_pars_fragment:$p,envmap_pars_vertex:jp,envmap_physical_pars_fragment:om,envmap_vertex:Zp,fog_vertex:Jp,fog_pars_vertex:Qp,fog_fragment:em,fog_pars_fragment:tm,gradientmap_pars_fragment:nm,lightmap_pars_fragment:im,lights_lambert_fragment:rm,lights_lambert_pars_fragment:sm,lights_pars_begin:am,lights_toon_fragment:cm,lights_toon_pars_fragment:lm,lights_phong_fragment:um,lights_phong_pars_fragment:dm,lights_physical_fragment:hm,lights_physical_pars_fragment:fm,lights_fragment_begin:pm,lights_fragment_maps:mm,lights_fragment_end:gm,logdepthbuf_fragment:_m,logdepthbuf_pars_fragment:vm,logdepthbuf_pars_vertex:xm,logdepthbuf_vertex:Mm,map_fragment:Sm,map_pars_fragment:ym,map_particle_fragment:Em,map_particle_pars_fragment:Am,metalnessmap_fragment:Tm,metalnessmap_pars_fragment:bm,morphinstance_vertex:Dm,morphcolor_vertex:wm,morphnormal_vertex:Pm,morphtarget_pars_vertex:Rm,morphtarget_vertex:Cm,normal_fragment_begin:Im,normal_fragment_maps:Hm,normal_pars_fragment:Lm,normal_pars_vertex:Um,normal_vertex:Nm,normalmap_pars_fragment:Om,clearcoat_normal_fragment_begin:Fm,clearcoat_normal_fragment_maps:zm,clearcoat_pars_fragment:Bm,iridescence_pars_fragment:km,opaque_fragment:Gm,packing:Vm,premultiplied_alpha_fragment:Wm,project_vertex:Xm,dithering_fragment:Ym,dithering_pars_fragment:qm,roughnessmap_fragment:Km,roughnessmap_pars_fragment:$m,shadowmap_pars_fragment:jm,shadowmap_pars_vertex:Zm,shadowmap_vertex:Jm,shadowmask_pars_fragment:Qm,skinbase_vertex:eg,skinning_pars_vertex:tg,skinning_vertex:ng,skinnormal_vertex:ig,specularmap_fragment:rg,specularmap_pars_fragment:sg,tonemapping_fragment:ag,tonemapping_pars_fragment:og,transmission_fragment:cg,transmission_pars_fragment:lg,uv_pars_fragment:ug,uv_pars_vertex:dg,uv_vertex:hg,worldpos_vertex:fg,background_vert:pg,background_frag:mg,backgroundCube_vert:gg,backgroundCube_frag:_g,cube_vert:vg,cube_frag:xg,depth_vert:Mg,depth_frag:Sg,distanceRGBA_vert:yg,distanceRGBA_frag:Eg,equirect_vert:Ag,equirect_frag:Tg,linedashed_vert:bg,linedashed_frag:Dg,meshbasic_vert:wg,meshbasic_frag:Pg,meshlambert_vert:Rg,meshlambert_frag:Cg,meshmatcap_vert:Ig,meshmatcap_frag:Hg,meshnormal_vert:Lg,meshnormal_frag:Ug,meshphong_vert:Ng,meshphong_frag:Og,meshphysical_vert:Fg,meshphysical_frag:zg,meshtoon_vert:Bg,meshtoon_frag:kg,points_vert:Gg,points_frag:Vg,shadow_vert:Wg,shadow_frag:Xg,sprite_vert:Yg,sprite_frag:qg},re={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},un={basic:{uniforms:Pt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Ue.meshbasic_vert,fragmentShader:Ue.meshbasic_frag},lambert:{uniforms:Pt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Ue.meshlambert_vert,fragmentShader:Ue.meshlambert_frag},phong:{uniforms:Pt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30}}]),vertexShader:Ue.meshphong_vert,fragmentShader:Ue.meshphong_frag},standard:{uniforms:Pt([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag},toon:{uniforms:Pt([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Ue.meshtoon_vert,fragmentShader:Ue.meshtoon_frag},matcap:{uniforms:Pt([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Ue.meshmatcap_vert,fragmentShader:Ue.meshmatcap_frag},points:{uniforms:Pt([re.points,re.fog]),vertexShader:Ue.points_vert,fragmentShader:Ue.points_frag},dashed:{uniforms:Pt([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ue.linedashed_vert,fragmentShader:Ue.linedashed_frag},depth:{uniforms:Pt([re.common,re.displacementmap]),vertexShader:Ue.depth_vert,fragmentShader:Ue.depth_frag},normal:{uniforms:Pt([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Ue.meshnormal_vert,fragmentShader:Ue.meshnormal_frag},sprite:{uniforms:Pt([re.sprite,re.fog]),vertexShader:Ue.sprite_vert,fragmentShader:Ue.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ue.background_vert,fragmentShader:Ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Ue.backgroundCube_vert,fragmentShader:Ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ue.cube_vert,fragmentShader:Ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ue.equirect_vert,fragmentShader:Ue.equirect_frag},distanceRGBA:{uniforms:Pt([re.common,re.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ue.distanceRGBA_vert,fragmentShader:Ue.distanceRGBA_frag},shadow:{uniforms:Pt([re.lights,re.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:Ue.shadow_vert,fragmentShader:Ue.shadow_frag}};un.physical={uniforms:Pt([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new Se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new Se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag};const Ss={r:0,b:0,g:0},ni=new cn,Kg=new Qe;function $g(n,e,t,i,r,s,a){const o=new Oe(0);let c=s===!0?0:1,l,u,d=null,h=0,p=null;function g(S){let _=S.isScene===!0?S.background:null;return _&&_.isTexture&&(_=(S.backgroundBlurriness>0?t:e).get(_)),_}function v(S){let _=!1;const E=g(S);E===null?f(o,c):E&&E.isColor&&(f(E,1),_=!0);const C=n.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(S,_){const E=g(_);E&&(E.isCubeTexture||E.mapping===Ma)?(u===void 0&&(u=new It(new Yr(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:cr(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:Ut,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,T,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),ni.copy(_.backgroundRotation),ni.x*=-1,ni.y*=-1,ni.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ni.y*=-1,ni.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Kg.makeRotationFromEuler(ni)),u.material.toneMapped=Je.getTransfer(E.colorSpace)!==it,(d!==E||h!==E.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,d=E,h=E.version,p=n.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new It(new qr(2,2),new Wn({name:"BackgroundMaterial",uniforms:cr(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=Je.getTransfer(E.colorSpace)!==it,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||h!==E.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,d=E,h=E.version,p=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function f(S,_){S.getRGB(Ss,Hd(n)),i.buffers.color.setClear(Ss.r,Ss.g,Ss.b,_,a)}return{getClearColor:function(){return o},setClearColor:function(S,_=1){o.set(S),c=_,f(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,f(o,c)},render:v,addToRenderList:m}}function jg(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(M,R,B,O,X){let q=!1;const V=d(O,B,R);s!==V&&(s=V,l(s.object)),q=p(M,O,B,X),q&&g(M,O,B,X),X!==null&&e.update(X,n.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,E(M,R,B,O),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function c(){return n.createVertexArray()}function l(M){return n.bindVertexArray(M)}function u(M){return n.deleteVertexArray(M)}function d(M,R,B){const O=B.wireframe===!0;let X=i[M.id];X===void 0&&(X={},i[M.id]=X);let q=X[R.id];q===void 0&&(q={},X[R.id]=q);let V=q[O];return V===void 0&&(V=h(c()),q[O]=V),V}function h(M){const R=[],B=[],O=[];for(let X=0;X<t;X++)R[X]=0,B[X]=0,O[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:B,attributeDivisors:O,object:M,attributes:{},index:null}}function p(M,R,B,O){const X=s.attributes,q=R.attributes;let V=0;const Y=B.getAttributes();for(const k in Y)if(Y[k].location>=0){const ue=X[k];let me=q[k];if(me===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(me=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(me=M.instanceColor)),ue===void 0||ue.attribute!==me||me&&ue.data!==me.data)return!0;V++}return s.attributesNum!==V||s.index!==O}function g(M,R,B,O){const X={},q=R.attributes;let V=0;const Y=B.getAttributes();for(const k in Y)if(Y[k].location>=0){let ue=q[k];ue===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(ue=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(ue=M.instanceColor));const me={};me.attribute=ue,ue&&ue.data&&(me.data=ue.data),X[k]=me,V++}s.attributes=X,s.attributesNum=V,s.index=O}function v(){const M=s.newAttributes;for(let R=0,B=M.length;R<B;R++)M[R]=0}function m(M){f(M,0)}function f(M,R){const B=s.newAttributes,O=s.enabledAttributes,X=s.attributeDivisors;B[M]=1,O[M]===0&&(n.enableVertexAttribArray(M),O[M]=1),X[M]!==R&&(n.vertexAttribDivisor(M,R),X[M]=R)}function S(){const M=s.newAttributes,R=s.enabledAttributes;for(let B=0,O=R.length;B<O;B++)R[B]!==M[B]&&(n.disableVertexAttribArray(B),R[B]=0)}function _(M,R,B,O,X,q,V){V===!0?n.vertexAttribIPointer(M,R,B,X,q):n.vertexAttribPointer(M,R,B,O,X,q)}function E(M,R,B,O){v();const X=O.attributes,q=B.getAttributes(),V=R.defaultAttributeValues;for(const Y in q){const k=q[Y];if(k.location>=0){let se=X[Y];if(se===void 0&&(Y==="instanceMatrix"&&M.instanceMatrix&&(se=M.instanceMatrix),Y==="instanceColor"&&M.instanceColor&&(se=M.instanceColor)),se!==void 0){const ue=se.normalized,me=se.itemSize,Ce=e.get(se);if(Ce===void 0)continue;const qe=Ce.buffer,W=Ce.type,Q=Ce.bytesPerElement,he=W===n.INT||W===n.UNSIGNED_INT||se.gpuType===wc;if(se.isInterleavedBufferAttribute){const ce=se.data,ye=ce.stride,Ae=se.offset;if(ce.isInstancedInterleavedBuffer){for(let be=0;be<k.locationSize;be++)f(k.location+be,ce.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let be=0;be<k.locationSize;be++)m(k.location+be);n.bindBuffer(n.ARRAY_BUFFER,qe);for(let be=0;be<k.locationSize;be++)_(k.location+be,me/k.locationSize,W,ue,ye*Q,(Ae+me/k.locationSize*be)*Q,he)}else{if(se.isInstancedBufferAttribute){for(let ce=0;ce<k.locationSize;ce++)f(k.location+ce,se.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let ce=0;ce<k.locationSize;ce++)m(k.location+ce);n.bindBuffer(n.ARRAY_BUFFER,qe);for(let ce=0;ce<k.locationSize;ce++)_(k.location+ce,me/k.locationSize,W,ue,me*Q,me/k.locationSize*ce*Q,he)}}else if(V!==void 0){const ue=V[Y];if(ue!==void 0)switch(ue.length){case 2:n.vertexAttrib2fv(k.location,ue);break;case 3:n.vertexAttrib3fv(k.location,ue);break;case 4:n.vertexAttrib4fv(k.location,ue);break;default:n.vertexAttrib1fv(k.location,ue)}}}}S()}function C(){L();for(const M in i){const R=i[M];for(const B in R){const O=R[B];for(const X in O)u(O[X].object),delete O[X];delete R[B]}delete i[M]}}function T(M){if(i[M.id]===void 0)return;const R=i[M.id];for(const B in R){const O=R[B];for(const X in O)u(O[X].object),delete O[X];delete R[B]}delete i[M.id]}function D(M){for(const R in i){const B=i[R];if(B[M.id]===void 0)continue;const O=B[M.id];for(const X in O)u(O[X].object),delete O[X];delete B[M.id]}}function L(){A(),a=!0,s!==r&&(s=r,l(s.object))}function A(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:L,resetDefaultState:A,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfProgram:D,initAttributes:v,enableAttribute:m,disableUnusedAttributes:S}}function Zg(n,e,t){let i;function r(l){i=l}function s(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function a(l,u,d){d!==0&&(n.drawArraysInstanced(i,l,u,d),t.update(u,i,d))}function o(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let p=0;for(let g=0;g<d;g++)p+=u[g];t.update(p,i,1)}function c(l,u,d,h){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)a(l[g],u[g],h[g]);else{p.multiDrawArraysInstancedWEBGL(i,l,0,u,0,h,0,d);let g=0;for(let v=0;v<d;v++)g+=u[v];for(let v=0;v<h.length;v++)t.update(g,i,h[v])}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Jg(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(T){return!(T!==on&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const D=T===Xr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==bn&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==dn&&!D)}function c(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),v=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),f=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=p>0,C=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,maxTextures:h,maxVertexTextures:p,maxTextureSize:g,maxCubemapSize:v,maxAttributes:m,maxVertexUniforms:f,maxVaryings:S,maxFragmentUniforms:_,vertexTextures:E,maxSamples:C}}function Qg(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new ai,o=new Ne,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||i!==0||r;return r=h,i=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){const g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,f=n.get(d);if(!r||g===null||g.length===0||s&&!m)s?u(null):l();else{const S=s?0:i,_=S*4;let E=f.clippingState||null;c.value=E,E=u(g,h,_,p);for(let C=0;C!==_;++C)E[C]=t[C];f.clippingState=E,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,p,g){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const f=p+v*4,S=h.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<f)&&(m=new Float32Array(f));for(let _=0,E=p;_!==v;++_,E+=4)a.copy(d[_]).applyMatrix4(S,o),a.normal.toArray(m,E),m[E+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function e0(n){let e=new WeakMap;function t(a,o){return o===Io?a.mapping=rr:o===Ho&&(a.mapping=sr),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Io||o===Ho)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new dp(c.height);return l.fromEquirectangularTexture(n,a),e.set(a,l),a.addEventListener("dispose",r),t(l.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class t0 extends Ld{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ki=4,Xl=[.125,.215,.35,.446,.526,.582],ui=20,so=new t0,Yl=new Oe;let ao=null,oo=0,co=0,lo=!1;const oi=(1+Math.sqrt(5))/2,ki=1/oi,ql=[new P(-oi,ki,0),new P(oi,ki,0),new P(-ki,0,oi),new P(ki,0,oi),new P(0,oi,-ki),new P(0,oi,ki),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class Kl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){ao=this._renderer.getRenderTarget(),oo=this._renderer.getActiveCubeFace(),co=this._renderer.getActiveMipmapLevel(),lo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ao,oo,co),this._renderer.xr.enabled=lo,e.scissorTest=!1,ys(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===rr||e.mapping===sr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ao=this._renderer.getRenderTarget(),oo=this._renderer.getActiveCubeFace(),co=this._renderer.getActiveMipmapLevel(),lo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:rn,minFilter:rn,generateMipmaps:!1,type:Xr,format:on,colorSpace:$n,depthBuffer:!1},r=$l(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$l(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=n0(s)),this._blurMaterial=i0(s,e,t)}return r}_compileMaterial(e){const t=new It(this._lodPlanes[0],e);this._renderer.compile(t,so)}_sceneToCubeUV(e,t,i,r){const o=new Gt(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(Yl),u.toneMapping=kn,u.autoClear=!1;const p=new Fr({name:"PMREM.Background",side:Ut,depthWrite:!1,depthTest:!1}),g=new It(new Yr,p);let v=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,v=!0):(p.color.copy(Yl),v=!0);for(let f=0;f<6;f++){const S=f%3;S===0?(o.up.set(0,c[f],0),o.lookAt(l[f],0,0)):S===1?(o.up.set(0,0,c[f]),o.lookAt(0,l[f],0)):(o.up.set(0,c[f],0),o.lookAt(0,0,l[f]));const _=this._cubeSize;ys(r,S*_,f>2?_:0,_,_),u.setRenderTarget(r),v&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===rr||e.mapping===sr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new It(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;ys(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,so)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=ql[(r-s-1)%ql.length];this._blur(e,s-1,s,a,o)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new It(this._lodPlanes[r],l),h=l.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*ui-1),v=s/g,m=isFinite(s)?1+Math.floor(u*v):ui;m>ui&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ui}`);const f=[];let S=0;for(let D=0;D<ui;++D){const L=D/v,A=Math.exp(-L*L/2);f.push(A),D===0?S+=A:D<m&&(S+=2*A)}for(let D=0;D<f.length;D++)f[D]=f[D]/S;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:_}=this;h.dTheta.value=g,h.mipInt.value=_-i;const E=this._sizeLods[r],C=3*E*(r>_-Ki?r-_+Ki:0),T=4*(this._cubeSize-E);ys(t,C,T,3*E,2*E),c.setRenderTarget(t),c.render(d,so)}}function n0(n){const e=[],t=[],i=[];let r=n;const s=n-Ki+1+Xl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let c=1/o;a>n-Ki?c=Xl[a-n+Ki-1]:a===0&&(c=0),i.push(c);const l=1/(o-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,g=6,v=3,m=2,f=1,S=new Float32Array(v*g*p),_=new Float32Array(m*g*p),E=new Float32Array(f*g*p);for(let T=0;T<p;T++){const D=T%3*2/3-1,L=T>2?0:-1,A=[D,L,0,D+2/3,L,0,D+2/3,L+1,0,D,L,0,D+2/3,L+1,0,D,L+1,0];S.set(A,v*g*T),_.set(h,m*g*T);const M=[T,T,T,T,T,T];E.set(M,f*g*T)}const C=new pt;C.setAttribute("position",new Wt(S,v)),C.setAttribute("uv",new Wt(_,m)),C.setAttribute("faceIndex",new Wt(E,f)),e.push(C),r>Ki&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function $l(n,e,t){const i=new vi(n,e,t);return i.texture.mapping=Ma,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ys(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function i0(n,e,t){const i=new Float32Array(ui),r=new P(0,1,0);return new Wn({name:"SphericalGaussianBlur",defines:{n:ui,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:zc(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function jl(){return new Wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zc(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Zl(){return new Wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function zc(){return`

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
	`}function r0(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===Io||c===Ho,u=c===rr||c===sr;if(l||u){let d=e.get(o);const h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new Kl(n)),d=l?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const p=o.image;return l&&p&&p.height>0||u&&p&&r(p)?(t===null&&(t=new Kl(n)),d=l?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function r(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function s0(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Qi("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function a0(n,e,t,i){const r={},s=new WeakMap;function a(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const v=h.morphAttributes[g];for(let m=0,f=v.length;m<f;m++)e.remove(v[m])}h.removeEventListener("dispose",a),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function c(d){const h=d.attributes;for(const g in h)e.update(h[g],n.ARRAY_BUFFER);const p=d.morphAttributes;for(const g in p){const v=p[g];for(let m=0,f=v.length;m<f;m++)e.update(v[m],n.ARRAY_BUFFER)}}function l(d){const h=[],p=d.index,g=d.attributes.position;let v=0;if(p!==null){const S=p.array;v=p.version;for(let _=0,E=S.length;_<E;_+=3){const C=S[_+0],T=S[_+1],D=S[_+2];h.push(C,T,T,D,D,C)}}else if(g!==void 0){const S=g.array;v=g.version;for(let _=0,E=S.length/3-1;_<E;_+=3){const C=_+0,T=_+1,D=_+2;h.push(C,T,T,D,D,C)}}else return;const m=new(Dd(h)?Id:Cd)(h,1);m.version=v;const f=s.get(d);f&&e.remove(f),s.set(d,m)}function u(d){const h=s.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&l(d)}else l(d);return s.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function o0(n,e,t){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function c(h,p){n.drawElements(i,p,s,h*a),t.update(p,i,1)}function l(h,p,g){g!==0&&(n.drawElementsInstanced(i,p,s,h*a,g),t.update(p,i,g))}function u(h,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,h,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,i,1)}function d(h,p,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<h.length;f++)l(h[f]/a,p[f],v[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,h,0,v,0,g);let f=0;for(let S=0;S<g;S++)f+=p[S];for(let S=0;S<v.length;S++)t.update(f,i,v[S])}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function c0(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function l0(n,e,t){const i=new WeakMap,r=new rt;function s(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==d){let M=function(){L.dispose(),i.delete(o),o.removeEventListener("dispose",M)};var p=M;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let E=0;g===!0&&(E=1),v===!0&&(E=2),m===!0&&(E=3);let C=o.attributes.position.count*E,T=1;C>e.maxTextureSize&&(T=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const D=new Float32Array(C*T*4*d),L=new Pd(D,C,T,d);L.type=dn,L.needsUpdate=!0;const A=E*4;for(let R=0;R<d;R++){const B=f[R],O=S[R],X=_[R],q=C*T*4*R;for(let V=0;V<B.count;V++){const Y=V*A;g===!0&&(r.fromBufferAttribute(B,V),D[q+Y+0]=r.x,D[q+Y+1]=r.y,D[q+Y+2]=r.z,D[q+Y+3]=0),v===!0&&(r.fromBufferAttribute(O,V),D[q+Y+4]=r.x,D[q+Y+5]=r.y,D[q+Y+6]=r.z,D[q+Y+7]=0),m===!0&&(r.fromBufferAttribute(X,V),D[q+Y+8]=r.x,D[q+Y+9]=r.y,D[q+Y+10]=r.z,D[q+Y+11]=X.itemSize===4?r.w:1)}}h={count:d,texture:L,size:new Se(C,T)},i.set(o,h),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const v=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",v),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function u0(n,e,t,i){let r=new WeakMap;function s(c){const l=i.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==l&&(e.update(d),r.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==l&&(h.update(),r.set(h,l))}return d}function a(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:a}}class Od extends yt{constructor(e,t,i,r,s,a,o,c,l,u=Ji){if(u!==Ji&&u!==or)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Ji&&(i=_i),i===void 0&&u===or&&(i=ar),super(null,r,s,a,o,c,u,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Lt,this.minFilter=c!==void 0?c:Lt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Fd=new yt,Jl=new Od(1,1),zd=new Pd,Bd=new $f,kd=new Ud,Ql=[],eu=[],tu=new Float32Array(16),nu=new Float32Array(9),iu=new Float32Array(4);function fr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Ql[r];if(s===void 0&&(s=new Float32Array(r),Ql[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function mt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function gt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ea(n,e){let t=eu[e];t===void 0&&(t=new Int32Array(e),eu[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function d0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function h0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;n.uniform2fv(this.addr,e),gt(t,e)}}function f0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mt(t,e))return;n.uniform3fv(this.addr,e),gt(t,e)}}function p0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;n.uniform4fv(this.addr,e),gt(t,e)}}function m0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(mt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,i))return;iu.set(i),n.uniformMatrix2fv(this.addr,!1,iu),gt(t,i)}}function g0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(mt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,i))return;nu.set(i),n.uniformMatrix3fv(this.addr,!1,nu),gt(t,i)}}function _0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(mt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,i))return;tu.set(i),n.uniformMatrix4fv(this.addr,!1,tu),gt(t,i)}}function v0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function x0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;n.uniform2iv(this.addr,e),gt(t,e)}}function M0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;n.uniform3iv(this.addr,e),gt(t,e)}}function S0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;n.uniform4iv(this.addr,e),gt(t,e)}}function y0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function E0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;n.uniform2uiv(this.addr,e),gt(t,e)}}function A0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;n.uniform3uiv(this.addr,e),gt(t,e)}}function T0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;n.uniform4uiv(this.addr,e),gt(t,e)}}function b0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Jl.compareFunction=bd,s=Jl):s=Fd,t.setTexture2D(e||s,r)}function D0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Bd,r)}function w0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||kd,r)}function P0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||zd,r)}function R0(n){switch(n){case 5126:return d0;case 35664:return h0;case 35665:return f0;case 35666:return p0;case 35674:return m0;case 35675:return g0;case 35676:return _0;case 5124:case 35670:return v0;case 35667:case 35671:return x0;case 35668:case 35672:return M0;case 35669:case 35673:return S0;case 5125:return y0;case 36294:return E0;case 36295:return A0;case 36296:return T0;case 35678:case 36198:case 36298:case 36306:case 35682:return b0;case 35679:case 36299:case 36307:return D0;case 35680:case 36300:case 36308:case 36293:return w0;case 36289:case 36303:case 36311:case 36292:return P0}}function C0(n,e){n.uniform1fv(this.addr,e)}function I0(n,e){const t=fr(e,this.size,2);n.uniform2fv(this.addr,t)}function H0(n,e){const t=fr(e,this.size,3);n.uniform3fv(this.addr,t)}function L0(n,e){const t=fr(e,this.size,4);n.uniform4fv(this.addr,t)}function U0(n,e){const t=fr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function N0(n,e){const t=fr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function O0(n,e){const t=fr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function F0(n,e){n.uniform1iv(this.addr,e)}function z0(n,e){n.uniform2iv(this.addr,e)}function B0(n,e){n.uniform3iv(this.addr,e)}function k0(n,e){n.uniform4iv(this.addr,e)}function G0(n,e){n.uniform1uiv(this.addr,e)}function V0(n,e){n.uniform2uiv(this.addr,e)}function W0(n,e){n.uniform3uiv(this.addr,e)}function X0(n,e){n.uniform4uiv(this.addr,e)}function Y0(n,e,t){const i=this.cache,r=e.length,s=Ea(t,r);mt(i,s)||(n.uniform1iv(this.addr,s),gt(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Fd,s[a])}function q0(n,e,t){const i=this.cache,r=e.length,s=Ea(t,r);mt(i,s)||(n.uniform1iv(this.addr,s),gt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Bd,s[a])}function K0(n,e,t){const i=this.cache,r=e.length,s=Ea(t,r);mt(i,s)||(n.uniform1iv(this.addr,s),gt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||kd,s[a])}function $0(n,e,t){const i=this.cache,r=e.length,s=Ea(t,r);mt(i,s)||(n.uniform1iv(this.addr,s),gt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||zd,s[a])}function j0(n){switch(n){case 5126:return C0;case 35664:return I0;case 35665:return H0;case 35666:return L0;case 35674:return U0;case 35675:return N0;case 35676:return O0;case 5124:case 35670:return F0;case 35667:case 35671:return z0;case 35668:case 35672:return B0;case 35669:case 35673:return k0;case 5125:return G0;case 36294:return V0;case 36295:return W0;case 36296:return X0;case 35678:case 36198:case 36298:case 36306:case 35682:return Y0;case 35679:case 36299:case 36307:return q0;case 35680:case 36300:case 36308:case 36293:return K0;case 36289:case 36303:case 36311:case 36292:return $0}}class Z0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=R0(t.type)}}class J0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=j0(t.type)}}class Q0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const uo=/(\w+)(\])?(\[|\.)?/g;function ru(n,e){n.seq.push(e),n.map[e.id]=e}function e1(n,e,t){const i=n.name,r=i.length;for(uo.lastIndex=0;;){const s=uo.exec(i),a=uo.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){ru(t,l===void 0?new Z0(o,n,e):new J0(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new Q0(o),ru(t,d)),t=d}}}class qs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);e1(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function su(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const t1=37297;let n1=0;function i1(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function r1(n){const e=Je.getPrimaries(Je.workingColorSpace),t=Je.getPrimaries(n);let i;switch(e===t?i="":e===ea&&t===Qs?i="LinearDisplayP3ToLinearSRGB":e===Qs&&t===ea&&(i="LinearSRGBToLinearDisplayP3"),n){case $n:case Sa:return[i,"LinearTransferOETF"];case Rt:case Uc:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function au(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+i1(n.getShaderSource(e),a)}else return r}function s1(n,e){const t=r1(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function a1(n,e){let t;switch(e){case cf:t="Linear";break;case lf:t="Reinhard";break;case uf:t="Cineon";break;case df:t="ACESFilmic";break;case ff:t="AgX";break;case pf:t="Neutral";break;case hf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Es=new P;function o1(){Je.getLuminanceCoefficients(Es);const n=Es.x.toFixed(4),e=Es.y.toFixed(4),t=Es.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function c1(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wr).join(`
`)}function l1(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function u1(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function wr(n){return n!==""}function ou(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function cu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const d1=/^[ \t]*#include +<([\w\d./]+)>/gm;function lc(n){return n.replace(d1,f1)}const h1=new Map;function f1(n,e){let t=Ue[e];if(t===void 0){const i=h1.get(e);if(i!==void 0)t=Ue[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return lc(t)}const p1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lu(n){return n.replace(p1,m1)}function m1(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function uu(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function g1(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===hd?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===fd?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Sn&&(e="SHADOWMAP_TYPE_VSM"),e}function _1(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case rr:case sr:e="ENVMAP_TYPE_CUBE";break;case Ma:e="ENVMAP_TYPE_CUBE_UV";break}return e}function v1(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case sr:e="ENVMAP_MODE_REFRACTION";break}return e}function x1(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case pd:e="ENVMAP_BLENDING_MULTIPLY";break;case af:e="ENVMAP_BLENDING_MIX";break;case of:e="ENVMAP_BLENDING_ADD";break}return e}function M1(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function S1(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=g1(t),l=_1(t),u=v1(t),d=x1(t),h=M1(t),p=c1(t),g=l1(s),v=r.createProgram();let m,f,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(wr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(wr).join(`
`),f.length>0&&(f+=`
`)):(m=[uu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wr).join(`
`),f=[uu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==kn?"#define TONE_MAPPING":"",t.toneMapping!==kn?Ue.tonemapping_pars_fragment:"",t.toneMapping!==kn?a1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ue.colorspace_pars_fragment,s1("linearToOutputTexel",t.outputColorSpace),o1(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(wr).join(`
`)),a=lc(a),a=ou(a,t),a=cu(a,t),o=lc(o),o=ou(o,t),o=cu(o,t),a=lu(a),o=lu(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Al?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Al?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const _=S+m+a,E=S+f+o,C=su(r,r.VERTEX_SHADER,_),T=su(r,r.FRAGMENT_SHADER,E);r.attachShader(v,C),r.attachShader(v,T),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function D(R){if(n.debug.checkShaderErrors){const B=r.getProgramInfoLog(v).trim(),O=r.getShaderInfoLog(C).trim(),X=r.getShaderInfoLog(T).trim();let q=!0,V=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,C,T);else{const Y=au(r,C,"vertex"),k=au(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+B+`
`+Y+`
`+k)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(O===""||X==="")&&(V=!1);V&&(R.diagnostics={runnable:q,programLog:B,vertexShader:{log:O,prefix:m},fragmentShader:{log:X,prefix:f}})}r.deleteShader(C),r.deleteShader(T),L=new qs(r,v),A=u1(r,v)}let L;this.getUniforms=function(){return L===void 0&&D(this),L};let A;this.getAttributes=function(){return A===void 0&&D(this),A};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(v,t1)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=n1++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=T,this}let y1=0;class E1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new A1(e),t.set(e,i)),i}}class A1{constructor(e){this.id=y1++,this.code=e,this.usedTimes=0}}function T1(n,e,t,i,r,s,a){const o=new Oc,c=new E1,l=new Set,u=[],d=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(A){return l.add(A),A===0?"uv":`uv${A}`}function m(A,M,R,B,O){const X=B.fog,q=O.geometry,V=A.isMeshStandardMaterial?B.environment:null,Y=(A.isMeshStandardMaterial?t:e).get(A.envMap||V),k=Y&&Y.mapping===Ma?Y.image.height:null,se=g[A.type];A.precision!==null&&(p=r.getMaxPrecision(A.precision),p!==A.precision&&console.warn("THREE.WebGLProgram.getParameters:",A.precision,"not supported, using",p,"instead."));const ue=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,me=ue!==void 0?ue.length:0;let Ce=0;q.morphAttributes.position!==void 0&&(Ce=1),q.morphAttributes.normal!==void 0&&(Ce=2),q.morphAttributes.color!==void 0&&(Ce=3);let qe,W,Q,he;if(se){const Ke=un[se];qe=Ke.vertexShader,W=Ke.fragmentShader}else qe=A.vertexShader,W=A.fragmentShader,c.update(A),Q=c.getVertexShaderID(A),he=c.getFragmentShaderID(A);const ce=n.getRenderTarget(),ye=O.isInstancedMesh===!0,Ae=O.isBatchedMesh===!0,be=!!A.map,nt=!!A.matcap,w=!!Y,tt=!!A.aoMap,ze=!!A.lightMap,Xe=!!A.bumpMap,ve=!!A.normalMap,st=!!A.displacementMap,Te=!!A.emissiveMap,He=!!A.metalnessMap,b=!!A.roughnessMap,x=A.anisotropy>0,z=A.clearcoat>0,j=A.dispersion>0,J=A.iridescence>0,Z=A.sheen>0,Ee=A.transmission>0,ae=x&&!!A.anisotropyMap,fe=z&&!!A.clearcoatMap,Le=z&&!!A.clearcoatNormalMap,ee=z&&!!A.clearcoatRoughnessMap,de=J&&!!A.iridescenceMap,Ge=J&&!!A.iridescenceThicknessMap,Re=Z&&!!A.sheenColorMap,pe=Z&&!!A.sheenRoughnessMap,Ie=!!A.specularMap,Fe=!!A.specularColorMap,at=!!A.specularIntensityMap,I=Ee&&!!A.transmissionMap,te=Ee&&!!A.thicknessMap,K=!!A.gradientMap,$=!!A.alphaMap,ie=A.alphaTest>0,De=!!A.alphaHash,We=!!A.extensions;let ut=kn;A.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(ut=n.toneMapping);const Mt={shaderID:se,shaderType:A.type,shaderName:A.name,vertexShader:qe,fragmentShader:W,defines:A.defines,customVertexShaderID:Q,customFragmentShaderID:he,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:p,batching:Ae,batchingColor:Ae&&O._colorsTexture!==null,instancing:ye,instancingColor:ye&&O.instanceColor!==null,instancingMorph:ye&&O.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ce===null?n.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:$n,alphaToCoverage:!!A.alphaToCoverage,map:be,matcap:nt,envMap:w,envMapMode:w&&Y.mapping,envMapCubeUVHeight:k,aoMap:tt,lightMap:ze,bumpMap:Xe,normalMap:ve,displacementMap:h&&st,emissiveMap:Te,normalMapObjectSpace:ve&&A.normalMapType===vf,normalMapTangentSpace:ve&&A.normalMapType===Td,metalnessMap:He,roughnessMap:b,anisotropy:x,anisotropyMap:ae,clearcoat:z,clearcoatMap:fe,clearcoatNormalMap:Le,clearcoatRoughnessMap:ee,dispersion:j,iridescence:J,iridescenceMap:de,iridescenceThicknessMap:Ge,sheen:Z,sheenColorMap:Re,sheenRoughnessMap:pe,specularMap:Ie,specularColorMap:Fe,specularIntensityMap:at,transmission:Ee,transmissionMap:I,thicknessMap:te,gradientMap:K,opaque:A.transparent===!1&&A.blending===Zi&&A.alphaToCoverage===!1,alphaMap:$,alphaTest:ie,alphaHash:De,combine:A.combine,mapUv:be&&v(A.map.channel),aoMapUv:tt&&v(A.aoMap.channel),lightMapUv:ze&&v(A.lightMap.channel),bumpMapUv:Xe&&v(A.bumpMap.channel),normalMapUv:ve&&v(A.normalMap.channel),displacementMapUv:st&&v(A.displacementMap.channel),emissiveMapUv:Te&&v(A.emissiveMap.channel),metalnessMapUv:He&&v(A.metalnessMap.channel),roughnessMapUv:b&&v(A.roughnessMap.channel),anisotropyMapUv:ae&&v(A.anisotropyMap.channel),clearcoatMapUv:fe&&v(A.clearcoatMap.channel),clearcoatNormalMapUv:Le&&v(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&v(A.clearcoatRoughnessMap.channel),iridescenceMapUv:de&&v(A.iridescenceMap.channel),iridescenceThicknessMapUv:Ge&&v(A.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&v(A.sheenColorMap.channel),sheenRoughnessMapUv:pe&&v(A.sheenRoughnessMap.channel),specularMapUv:Ie&&v(A.specularMap.channel),specularColorMapUv:Fe&&v(A.specularColorMap.channel),specularIntensityMapUv:at&&v(A.specularIntensityMap.channel),transmissionMapUv:I&&v(A.transmissionMap.channel),thicknessMapUv:te&&v(A.thicknessMap.channel),alphaMapUv:$&&v(A.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(ve||x),vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!q.attributes.uv&&(be||$),fog:!!X,useFog:A.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:A.flatShading===!0,sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:O.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:me,morphTextureStride:Ce,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:A.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:ut,decodeVideoTexture:be&&A.map.isVideoTexture===!0&&Je.getTransfer(A.map.colorSpace)===it,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===Zt,flipSided:A.side===Ut,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:We&&A.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(We&&A.extensions.multiDraw===!0||Ae)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return Mt.vertexUv1s=l.has(1),Mt.vertexUv2s=l.has(2),Mt.vertexUv3s=l.has(3),l.clear(),Mt}function f(A){const M=[];if(A.shaderID?M.push(A.shaderID):(M.push(A.customVertexShaderID),M.push(A.customFragmentShaderID)),A.defines!==void 0)for(const R in A.defines)M.push(R),M.push(A.defines[R]);return A.isRawShaderMaterial===!1&&(S(M,A),_(M,A),M.push(n.outputColorSpace)),M.push(A.customProgramCacheKey),M.join()}function S(A,M){A.push(M.precision),A.push(M.outputColorSpace),A.push(M.envMapMode),A.push(M.envMapCubeUVHeight),A.push(M.mapUv),A.push(M.alphaMapUv),A.push(M.lightMapUv),A.push(M.aoMapUv),A.push(M.bumpMapUv),A.push(M.normalMapUv),A.push(M.displacementMapUv),A.push(M.emissiveMapUv),A.push(M.metalnessMapUv),A.push(M.roughnessMapUv),A.push(M.anisotropyMapUv),A.push(M.clearcoatMapUv),A.push(M.clearcoatNormalMapUv),A.push(M.clearcoatRoughnessMapUv),A.push(M.iridescenceMapUv),A.push(M.iridescenceThicknessMapUv),A.push(M.sheenColorMapUv),A.push(M.sheenRoughnessMapUv),A.push(M.specularMapUv),A.push(M.specularColorMapUv),A.push(M.specularIntensityMapUv),A.push(M.transmissionMapUv),A.push(M.thicknessMapUv),A.push(M.combine),A.push(M.fogExp2),A.push(M.sizeAttenuation),A.push(M.morphTargetsCount),A.push(M.morphAttributeCount),A.push(M.numDirLights),A.push(M.numPointLights),A.push(M.numSpotLights),A.push(M.numSpotLightMaps),A.push(M.numHemiLights),A.push(M.numRectAreaLights),A.push(M.numDirLightShadows),A.push(M.numPointLightShadows),A.push(M.numSpotLightShadows),A.push(M.numSpotLightShadowsWithMaps),A.push(M.numLightProbes),A.push(M.shadowMapType),A.push(M.toneMapping),A.push(M.numClippingPlanes),A.push(M.numClipIntersection),A.push(M.depthPacking)}function _(A,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),A.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.skinning&&o.enable(4),M.morphTargets&&o.enable(5),M.morphNormals&&o.enable(6),M.morphColors&&o.enable(7),M.premultipliedAlpha&&o.enable(8),M.shadowMapEnabled&&o.enable(9),M.doubleSided&&o.enable(10),M.flipSided&&o.enable(11),M.useDepthPacking&&o.enable(12),M.dithering&&o.enable(13),M.transmission&&o.enable(14),M.sheen&&o.enable(15),M.opaque&&o.enable(16),M.pointsUvs&&o.enable(17),M.decodeVideoTexture&&o.enable(18),M.alphaToCoverage&&o.enable(19),A.push(o.mask)}function E(A){const M=g[A.type];let R;if(M){const B=un[M];R=op.clone(B.uniforms)}else R=A.uniforms;return R}function C(A,M){let R;for(let B=0,O=u.length;B<O;B++){const X=u[B];if(X.cacheKey===M){R=X,++R.usedTimes;break}}return R===void 0&&(R=new S1(n,M,A,s),u.push(R)),R}function T(A){if(--A.usedTimes===0){const M=u.indexOf(A);u[M]=u[u.length-1],u.pop(),A.destroy()}}function D(A){c.remove(A)}function L(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:E,acquireProgram:C,releaseProgram:T,releaseShaderCache:D,programs:u,dispose:L}}function b1(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,c){n.get(a)[o]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function D1(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function du(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function hu(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d,h,p,g,v,m){let f=n[e];return f===void 0?(f={id:d.id,object:d,geometry:h,material:p,groupOrder:g,renderOrder:d.renderOrder,z:v,group:m},n[e]=f):(f.id=d.id,f.object=d,f.geometry=h,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=v,f.group=m),e++,f}function o(d,h,p,g,v,m){const f=a(d,h,p,g,v,m);p.transmission>0?i.push(f):p.transparent===!0?r.push(f):t.push(f)}function c(d,h,p,g,v,m){const f=a(d,h,p,g,v,m);p.transmission>0?i.unshift(f):p.transparent===!0?r.unshift(f):t.unshift(f)}function l(d,h){t.length>1&&t.sort(d||D1),i.length>1&&i.sort(h||du),r.length>1&&r.sort(h||du)}function u(){for(let d=e,h=n.length;d<h;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:c,finish:u,sort:l}}function w1(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new hu,n.set(i,[a])):r>=s.length?(a=new hu,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function P1(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new Oe};break;case"SpotLight":t={position:new P,direction:new P,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":t={color:new Oe,position:new P,halfWidth:new P,halfHeight:new P};break}return n[e.id]=t,t}}}function R1(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let C1=0;function I1(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function H1(n){const e=new P1,t=R1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new P);const r=new P,s=new Qe,a=new Qe;function o(l){let u=0,d=0,h=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let p=0,g=0,v=0,m=0,f=0,S=0,_=0,E=0,C=0,T=0,D=0;l.sort(I1);for(let A=0,M=l.length;A<M;A++){const R=l[A],B=R.color,O=R.intensity,X=R.distance,q=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=B.r*O,d+=B.g*O,h+=B.b*O;else if(R.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(R.sh.coefficients[V],O);D++}else if(R.isDirectionalLight){const V=e.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const Y=R.shadow,k=t.get(R);k.shadowIntensity=Y.intensity,k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,i.directionalShadow[p]=k,i.directionalShadowMap[p]=q,i.directionalShadowMatrix[p]=R.shadow.matrix,S++}i.directional[p]=V,p++}else if(R.isSpotLight){const V=e.get(R);V.position.setFromMatrixPosition(R.matrixWorld),V.color.copy(B).multiplyScalar(O),V.distance=X,V.coneCos=Math.cos(R.angle),V.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),V.decay=R.decay,i.spot[v]=V;const Y=R.shadow;if(R.map&&(i.spotLightMap[C]=R.map,C++,Y.updateMatrices(R),R.castShadow&&T++),i.spotLightMatrix[v]=Y.matrix,R.castShadow){const k=t.get(R);k.shadowIntensity=Y.intensity,k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,i.spotShadow[v]=k,i.spotShadowMap[v]=q,E++}v++}else if(R.isRectAreaLight){const V=e.get(R);V.color.copy(B).multiplyScalar(O),V.halfWidth.set(R.width*.5,0,0),V.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=V,m++}else if(R.isPointLight){const V=e.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),V.distance=R.distance,V.decay=R.decay,R.castShadow){const Y=R.shadow,k=t.get(R);k.shadowIntensity=Y.intensity,k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,k.shadowCameraNear=Y.camera.near,k.shadowCameraFar=Y.camera.far,i.pointShadow[g]=k,i.pointShadowMap[g]=q,i.pointShadowMatrix[g]=R.shadow.matrix,_++}i.point[g]=V,g++}else if(R.isHemisphereLight){const V=e.get(R);V.skyColor.copy(R.color).multiplyScalar(O),V.groundColor.copy(R.groundColor).multiplyScalar(O),i.hemi[f]=V,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=re.LTC_FLOAT_1,i.rectAreaLTC2=re.LTC_FLOAT_2):(i.rectAreaLTC1=re.LTC_HALF_1,i.rectAreaLTC2=re.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const L=i.hash;(L.directionalLength!==p||L.pointLength!==g||L.spotLength!==v||L.rectAreaLength!==m||L.hemiLength!==f||L.numDirectionalShadows!==S||L.numPointShadows!==_||L.numSpotShadows!==E||L.numSpotMaps!==C||L.numLightProbes!==D)&&(i.directional.length=p,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=E+C-T,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=D,L.directionalLength=p,L.pointLength=g,L.spotLength=v,L.rectAreaLength=m,L.hemiLength=f,L.numDirectionalShadows=S,L.numPointShadows=_,L.numSpotShadows=E,L.numSpotMaps=C,L.numLightProbes=D,i.version=C1++)}function c(l,u){let d=0,h=0,p=0,g=0,v=0;const m=u.matrixWorldInverse;for(let f=0,S=l.length;f<S;f++){const _=l[f];if(_.isDirectionalLight){const E=i.directional[d];E.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),d++}else if(_.isSpotLight){const E=i.spot[p];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),p++}else if(_.isRectAreaLight){const E=i.rectArea[g];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(m),a.identity(),s.copy(_.matrixWorld),s.premultiply(m),a.extractRotation(s),E.halfWidth.set(_.width*.5,0,0),E.halfHeight.set(0,_.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),g++}else if(_.isPointLight){const E=i.point[h];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(m),h++}else if(_.isHemisphereLight){const E=i.hemi[v];E.direction.setFromMatrixPosition(_.matrixWorld),E.direction.transformDirection(m),v++}}}return{setup:o,setupView:c,state:i}}function fu(n){const e=new H1(n),t=[],i=[];function r(u){l.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function a(u){i.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function L1(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new fu(n),e.set(r,[o])):s>=a.length?(o=new fu(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}class U1 extends jn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class N1 extends jn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const O1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,F1=`uniform sampler2D shadow_pass;
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
}`;function z1(n,e,t){let i=new Fc;const r=new Se,s=new Se,a=new rt,o=new U1({depthPacking:_f}),c=new N1,l={},u=t.maxTextureSize,d={[Vn]:Ut,[Ut]:Vn,[Zt]:Zt},h=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:O1,fragmentShader:F1}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new pt;g.setAttribute("position",new Wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new It(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hd;let f=this.type;this.render=function(T,D,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const A=n.getRenderTarget(),M=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),B=n.state;B.setBlending(Bn),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const O=f!==Sn&&this.type===Sn,X=f===Sn&&this.type!==Sn;for(let q=0,V=T.length;q<V;q++){const Y=T[q],k=Y.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const se=k.getFrameExtents();if(r.multiply(se),s.copy(k.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/se.x),r.x=s.x*se.x,k.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/se.y),r.y=s.y*se.y,k.mapSize.y=s.y)),k.map===null||O===!0||X===!0){const me=this.type!==Sn?{minFilter:Lt,magFilter:Lt}:{};k.map!==null&&k.map.dispose(),k.map=new vi(r.x,r.y,me),k.map.texture.name=Y.name+".shadowMap",k.camera.updateProjectionMatrix()}n.setRenderTarget(k.map),n.clear();const ue=k.getViewportCount();for(let me=0;me<ue;me++){const Ce=k.getViewport(me);a.set(s.x*Ce.x,s.y*Ce.y,s.x*Ce.z,s.y*Ce.w),B.viewport(a),k.updateMatrices(Y,me),i=k.getFrustum(),E(D,L,k.camera,Y,this.type)}k.isPointLightShadow!==!0&&this.type===Sn&&S(k,L),k.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(A,M,R)};function S(T,D){const L=e.update(v);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new vi(r.x,r.y)),h.uniforms.shadow_pass.value=T.map.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(D,null,L,h,v,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(D,null,L,p,v,null)}function _(T,D,L,A){let M=null;const R=L.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)M=R;else if(M=L.isPointLight===!0?c:o,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0){const B=M.uuid,O=D.uuid;let X=l[B];X===void 0&&(X={},l[B]=X);let q=X[O];q===void 0&&(q=M.clone(),X[O]=q,D.addEventListener("dispose",C)),M=q}if(M.visible=D.visible,M.wireframe=D.wireframe,A===Sn?M.side=D.shadowSide!==null?D.shadowSide:D.side:M.side=D.shadowSide!==null?D.shadowSide:d[D.side],M.alphaMap=D.alphaMap,M.alphaTest=D.alphaTest,M.map=D.map,M.clipShadows=D.clipShadows,M.clippingPlanes=D.clippingPlanes,M.clipIntersection=D.clipIntersection,M.displacementMap=D.displacementMap,M.displacementScale=D.displacementScale,M.displacementBias=D.displacementBias,M.wireframeLinewidth=D.wireframeLinewidth,M.linewidth=D.linewidth,L.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const B=n.properties.get(M);B.light=L}return M}function E(T,D,L,A,M){if(T.visible===!1)return;if(T.layers.test(D.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===Sn)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,T.matrixWorld);const O=e.update(T),X=T.material;if(Array.isArray(X)){const q=O.groups;for(let V=0,Y=q.length;V<Y;V++){const k=q[V],se=X[k.materialIndex];if(se&&se.visible){const ue=_(T,se,A,M);T.onBeforeShadow(n,T,D,L,O,ue,k),n.renderBufferDirect(L,null,O,ue,T,k),T.onAfterShadow(n,T,D,L,O,ue,k)}}}else if(X.visible){const q=_(T,X,A,M);T.onBeforeShadow(n,T,D,L,O,q,null),n.renderBufferDirect(L,null,O,q,T,null),T.onAfterShadow(n,T,D,L,O,q,null)}}const B=T.children;for(let O=0,X=B.length;O<X;O++)E(B[O],D,L,A,M)}function C(T){T.target.removeEventListener("dispose",C);for(const L in l){const A=l[L],M=T.target.uuid;M in A&&(A[M].dispose(),delete A[M])}}}function B1(n){function e(){let I=!1;const te=new rt;let K=null;const $=new rt(0,0,0,0);return{setMask:function(ie){K!==ie&&!I&&(n.colorMask(ie,ie,ie,ie),K=ie)},setLocked:function(ie){I=ie},setClear:function(ie,De,We,ut,Mt){Mt===!0&&(ie*=ut,De*=ut,We*=ut),te.set(ie,De,We,ut),$.equals(te)===!1&&(n.clearColor(ie,De,We,ut),$.copy(te))},reset:function(){I=!1,K=null,$.set(-1,0,0,0)}}}function t(){let I=!1,te=null,K=null,$=null;return{setTest:function(ie){ie?he(n.DEPTH_TEST):ce(n.DEPTH_TEST)},setMask:function(ie){te!==ie&&!I&&(n.depthMask(ie),te=ie)},setFunc:function(ie){if(K!==ie){switch(ie){case Jh:n.depthFunc(n.NEVER);break;case Qh:n.depthFunc(n.ALWAYS);break;case ef:n.depthFunc(n.LESS);break;case Zs:n.depthFunc(n.LEQUAL);break;case tf:n.depthFunc(n.EQUAL);break;case nf:n.depthFunc(n.GEQUAL);break;case rf:n.depthFunc(n.GREATER);break;case sf:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}K=ie}},setLocked:function(ie){I=ie},setClear:function(ie){$!==ie&&(n.clearDepth(ie),$=ie)},reset:function(){I=!1,te=null,K=null,$=null}}}function i(){let I=!1,te=null,K=null,$=null,ie=null,De=null,We=null,ut=null,Mt=null;return{setTest:function(Ke){I||(Ke?he(n.STENCIL_TEST):ce(n.STENCIL_TEST))},setMask:function(Ke){te!==Ke&&!I&&(n.stencilMask(Ke),te=Ke)},setFunc:function(Ke,fn,ln){(K!==Ke||$!==fn||ie!==ln)&&(n.stencilFunc(Ke,fn,ln),K=Ke,$=fn,ie=ln)},setOp:function(Ke,fn,ln){(De!==Ke||We!==fn||ut!==ln)&&(n.stencilOp(Ke,fn,ln),De=Ke,We=fn,ut=ln)},setLocked:function(Ke){I=Ke},setClear:function(Ke){Mt!==Ke&&(n.clearStencil(Ke),Mt=Ke)},reset:function(){I=!1,te=null,K=null,$=null,ie=null,De=null,We=null,ut=null,Mt=null}}}const r=new e,s=new t,a=new i,o=new WeakMap,c=new WeakMap;let l={},u={},d=new WeakMap,h=[],p=null,g=!1,v=null,m=null,f=null,S=null,_=null,E=null,C=null,T=new Oe(0,0,0),D=0,L=!1,A=null,M=null,R=null,B=null,O=null;const X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,V=0;const Y=n.getParameter(n.VERSION);Y.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(Y)[1]),q=V>=1):Y.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),q=V>=2);let k=null,se={};const ue=n.getParameter(n.SCISSOR_BOX),me=n.getParameter(n.VIEWPORT),Ce=new rt().fromArray(ue),qe=new rt().fromArray(me);function W(I,te,K,$){const ie=new Uint8Array(4),De=n.createTexture();n.bindTexture(I,De),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let We=0;We<K;We++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(te,0,n.RGBA,1,1,$,0,n.RGBA,n.UNSIGNED_BYTE,ie):n.texImage2D(te+We,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ie);return De}const Q={};Q[n.TEXTURE_2D]=W(n.TEXTURE_2D,n.TEXTURE_2D,1),Q[n.TEXTURE_CUBE_MAP]=W(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[n.TEXTURE_2D_ARRAY]=W(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Q[n.TEXTURE_3D]=W(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),a.setClear(0),he(n.DEPTH_TEST),s.setFunc(Zs),Xe(!1),ve(xl),he(n.CULL_FACE),tt(Bn);function he(I){l[I]!==!0&&(n.enable(I),l[I]=!0)}function ce(I){l[I]!==!1&&(n.disable(I),l[I]=!1)}function ye(I,te){return u[I]!==te?(n.bindFramebuffer(I,te),u[I]=te,I===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=te),I===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=te),!0):!1}function Ae(I,te){let K=h,$=!1;if(I){K=d.get(te),K===void 0&&(K=[],d.set(te,K));const ie=I.textures;if(K.length!==ie.length||K[0]!==n.COLOR_ATTACHMENT0){for(let De=0,We=ie.length;De<We;De++)K[De]=n.COLOR_ATTACHMENT0+De;K.length=ie.length,$=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,$=!0);$&&n.drawBuffers(K)}function be(I){return p!==I?(n.useProgram(I),p=I,!0):!1}const nt={[li]:n.FUNC_ADD,[Uh]:n.FUNC_SUBTRACT,[Nh]:n.FUNC_REVERSE_SUBTRACT};nt[Oh]=n.MIN,nt[Fh]=n.MAX;const w={[zh]:n.ZERO,[Bh]:n.ONE,[kh]:n.SRC_COLOR,[Ro]:n.SRC_ALPHA,[qh]:n.SRC_ALPHA_SATURATE,[Xh]:n.DST_COLOR,[Vh]:n.DST_ALPHA,[Gh]:n.ONE_MINUS_SRC_COLOR,[Co]:n.ONE_MINUS_SRC_ALPHA,[Yh]:n.ONE_MINUS_DST_COLOR,[Wh]:n.ONE_MINUS_DST_ALPHA,[Kh]:n.CONSTANT_COLOR,[$h]:n.ONE_MINUS_CONSTANT_COLOR,[jh]:n.CONSTANT_ALPHA,[Zh]:n.ONE_MINUS_CONSTANT_ALPHA};function tt(I,te,K,$,ie,De,We,ut,Mt,Ke){if(I===Bn){g===!0&&(ce(n.BLEND),g=!1);return}if(g===!1&&(he(n.BLEND),g=!0),I!==Lh){if(I!==v||Ke!==L){if((m!==li||_!==li)&&(n.blendEquation(n.FUNC_ADD),m=li,_=li),Ke)switch(I){case Zi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ml:n.blendFunc(n.ONE,n.ONE);break;case Sl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case yl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Zi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ml:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Sl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case yl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}f=null,S=null,E=null,C=null,T.set(0,0,0),D=0,v=I,L=Ke}return}ie=ie||te,De=De||K,We=We||$,(te!==m||ie!==_)&&(n.blendEquationSeparate(nt[te],nt[ie]),m=te,_=ie),(K!==f||$!==S||De!==E||We!==C)&&(n.blendFuncSeparate(w[K],w[$],w[De],w[We]),f=K,S=$,E=De,C=We),(ut.equals(T)===!1||Mt!==D)&&(n.blendColor(ut.r,ut.g,ut.b,Mt),T.copy(ut),D=Mt),v=I,L=!1}function ze(I,te){I.side===Zt?ce(n.CULL_FACE):he(n.CULL_FACE);let K=I.side===Ut;te&&(K=!K),Xe(K),I.blending===Zi&&I.transparent===!1?tt(Bn):tt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),s.setFunc(I.depthFunc),s.setTest(I.depthTest),s.setMask(I.depthWrite),r.setMask(I.colorWrite);const $=I.stencilWrite;a.setTest($),$&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Te(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?he(n.SAMPLE_ALPHA_TO_COVERAGE):ce(n.SAMPLE_ALPHA_TO_COVERAGE)}function Xe(I){A!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),A=I)}function ve(I){I!==Ih?(he(n.CULL_FACE),I!==M&&(I===xl?n.cullFace(n.BACK):I===Hh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ce(n.CULL_FACE),M=I}function st(I){I!==R&&(q&&n.lineWidth(I),R=I)}function Te(I,te,K){I?(he(n.POLYGON_OFFSET_FILL),(B!==te||O!==K)&&(n.polygonOffset(te,K),B=te,O=K)):ce(n.POLYGON_OFFSET_FILL)}function He(I){I?he(n.SCISSOR_TEST):ce(n.SCISSOR_TEST)}function b(I){I===void 0&&(I=n.TEXTURE0+X-1),k!==I&&(n.activeTexture(I),k=I)}function x(I,te,K){K===void 0&&(k===null?K=n.TEXTURE0+X-1:K=k);let $=se[K];$===void 0&&($={type:void 0,texture:void 0},se[K]=$),($.type!==I||$.texture!==te)&&(k!==K&&(n.activeTexture(K),k=K),n.bindTexture(I,te||Q[I]),$.type=I,$.texture=te)}function z(){const I=se[k];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function j(){try{n.compressedTexImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function J(){try{n.compressedTexImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Z(){try{n.texSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ee(){try{n.texSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ae(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function fe(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Le(){try{n.texStorage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ee(){try{n.texStorage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function de(){try{n.texImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ge(){try{n.texImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Re(I){Ce.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),Ce.copy(I))}function pe(I){qe.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),qe.copy(I))}function Ie(I,te){let K=c.get(te);K===void 0&&(K=new WeakMap,c.set(te,K));let $=K.get(I);$===void 0&&($=n.getUniformBlockIndex(te,I.name),K.set(I,$))}function Fe(I,te){const $=c.get(te).get(I);o.get(te)!==$&&(n.uniformBlockBinding(te,$,I.__bindingPointIndex),o.set(te,$))}function at(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),l={},k=null,se={},u={},d=new WeakMap,h=[],p=null,g=!1,v=null,m=null,f=null,S=null,_=null,E=null,C=null,T=new Oe(0,0,0),D=0,L=!1,A=null,M=null,R=null,B=null,O=null,Ce.set(0,0,n.canvas.width,n.canvas.height),qe.set(0,0,n.canvas.width,n.canvas.height),r.reset(),s.reset(),a.reset()}return{buffers:{color:r,depth:s,stencil:a},enable:he,disable:ce,bindFramebuffer:ye,drawBuffers:Ae,useProgram:be,setBlending:tt,setMaterial:ze,setFlipSided:Xe,setCullFace:ve,setLineWidth:st,setPolygonOffset:Te,setScissorTest:He,activeTexture:b,bindTexture:x,unbindTexture:z,compressedTexImage2D:j,compressedTexImage3D:J,texImage2D:de,texImage3D:Ge,updateUBOMapping:Ie,uniformBlockBinding:Fe,texStorage2D:Le,texStorage3D:ee,texSubImage2D:Z,texSubImage3D:Ee,compressedTexSubImage2D:ae,compressedTexSubImage3D:fe,scissor:Re,viewport:pe,reset:at}}function pu(n,e,t,i){const r=k1(i);switch(t){case xd:return n*e;case Sd:return n*e;case yd:return n*e*2;case Cc:return n*e/r.components*r.byteLength;case Ic:return n*e/r.components*r.byteLength;case Ed:return n*e*2/r.components*r.byteLength;case Hc:return n*e*2/r.components*r.byteLength;case Md:return n*e*3/r.components*r.byteLength;case on:return n*e*4/r.components*r.byteLength;case Lc:return n*e*4/r.components*r.byteLength;case Gs:case Vs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ws:case Xs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case No:case Fo:return Math.max(n,16)*Math.max(e,8)/4;case Uo:case Oo:return Math.max(n,8)*Math.max(e,8)/2;case zo:case Bo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ko:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Go:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Vo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Wo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Xo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Yo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case qo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ko:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case $o:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case jo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Zo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Jo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Qo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case ec:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case tc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ys:case nc:case ic:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Ad:case rc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case sc:case ac:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function k1(n){switch(n){case bn:case gd:return{byteLength:1,components:1};case Ur:case _d:case Xr:return{byteLength:2,components:1};case Pc:case Rc:return{byteLength:2,components:4};case _i:case wc:case dn:return{byteLength:4,components:1};case vd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function G1(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Se,u=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,x){return p?new OffscreenCanvas(b,x):Or("canvas")}function v(b,x,z){let j=1;const J=He(b);if((J.width>z||J.height>z)&&(j=z/Math.max(J.width,J.height)),j<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const Z=Math.floor(j*J.width),Ee=Math.floor(j*J.height);d===void 0&&(d=g(Z,Ee));const ae=x?g(Z,Ee):d;return ae.width=Z,ae.height=Ee,ae.getContext("2d").drawImage(b,0,0,Z,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+Z+"x"+Ee+")."),ae}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),b;return b}function m(b){return b.generateMipmaps&&b.minFilter!==Lt&&b.minFilter!==rn}function f(b){n.generateMipmap(b)}function S(b,x,z,j,J=!1){if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let Z=x;if(x===n.RED&&(z===n.FLOAT&&(Z=n.R32F),z===n.HALF_FLOAT&&(Z=n.R16F),z===n.UNSIGNED_BYTE&&(Z=n.R8)),x===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.R8UI),z===n.UNSIGNED_SHORT&&(Z=n.R16UI),z===n.UNSIGNED_INT&&(Z=n.R32UI),z===n.BYTE&&(Z=n.R8I),z===n.SHORT&&(Z=n.R16I),z===n.INT&&(Z=n.R32I)),x===n.RG&&(z===n.FLOAT&&(Z=n.RG32F),z===n.HALF_FLOAT&&(Z=n.RG16F),z===n.UNSIGNED_BYTE&&(Z=n.RG8)),x===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.RG8UI),z===n.UNSIGNED_SHORT&&(Z=n.RG16UI),z===n.UNSIGNED_INT&&(Z=n.RG32UI),z===n.BYTE&&(Z=n.RG8I),z===n.SHORT&&(Z=n.RG16I),z===n.INT&&(Z=n.RG32I)),x===n.RGB&&z===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),x===n.RGBA){const Ee=J?Js:Je.getTransfer(j);z===n.FLOAT&&(Z=n.RGBA32F),z===n.HALF_FLOAT&&(Z=n.RGBA16F),z===n.UNSIGNED_BYTE&&(Z=Ee===it?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function _(b,x){let z;return b?x===null||x===_i||x===ar?z=n.DEPTH24_STENCIL8:x===dn?z=n.DEPTH32F_STENCIL8:x===Ur&&(z=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===_i||x===ar?z=n.DEPTH_COMPONENT24:x===dn?z=n.DEPTH_COMPONENT32F:x===Ur&&(z=n.DEPTH_COMPONENT16),z}function E(b,x){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==Lt&&b.minFilter!==rn?Math.log2(Math.max(x.width,x.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?x.mipmaps.length:1}function C(b){const x=b.target;x.removeEventListener("dispose",C),D(x),x.isVideoTexture&&u.delete(x)}function T(b){const x=b.target;x.removeEventListener("dispose",T),A(x)}function D(b){const x=i.get(b);if(x.__webglInit===void 0)return;const z=b.source,j=h.get(z);if(j){const J=j[x.__cacheKey];J.usedTimes--,J.usedTimes===0&&L(b),Object.keys(j).length===0&&h.delete(z)}i.remove(b)}function L(b){const x=i.get(b);n.deleteTexture(x.__webglTexture);const z=b.source,j=h.get(z);delete j[x.__cacheKey],a.memory.textures--}function A(b){const x=i.get(b);if(b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(x.__webglFramebuffer[j]))for(let J=0;J<x.__webglFramebuffer[j].length;J++)n.deleteFramebuffer(x.__webglFramebuffer[j][J]);else n.deleteFramebuffer(x.__webglFramebuffer[j]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[j])}else{if(Array.isArray(x.__webglFramebuffer))for(let j=0;j<x.__webglFramebuffer.length;j++)n.deleteFramebuffer(x.__webglFramebuffer[j]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let j=0;j<x.__webglColorRenderbuffer.length;j++)x.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[j]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const z=b.textures;for(let j=0,J=z.length;j<J;j++){const Z=i.get(z[j]);Z.__webglTexture&&(n.deleteTexture(Z.__webglTexture),a.memory.textures--),i.remove(z[j])}i.remove(b)}let M=0;function R(){M=0}function B(){const b=M;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),M+=1,b}function O(b){const x=[];return x.push(b.wrapS),x.push(b.wrapT),x.push(b.wrapR||0),x.push(b.magFilter),x.push(b.minFilter),x.push(b.anisotropy),x.push(b.internalFormat),x.push(b.format),x.push(b.type),x.push(b.generateMipmaps),x.push(b.premultiplyAlpha),x.push(b.flipY),x.push(b.unpackAlignment),x.push(b.colorSpace),x.join()}function X(b,x){const z=i.get(b);if(b.isVideoTexture&&st(b),b.isRenderTargetTexture===!1&&b.version>0&&z.__version!==b.version){const j=b.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{qe(z,b,x);return}}t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+x)}function q(b,x){const z=i.get(b);if(b.version>0&&z.__version!==b.version){qe(z,b,x);return}t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+x)}function V(b,x){const z=i.get(b);if(b.version>0&&z.__version!==b.version){qe(z,b,x);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+x)}function Y(b,x){const z=i.get(b);if(b.version>0&&z.__version!==b.version){W(z,b,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+x)}const k={[Lr]:n.REPEAT,[di]:n.CLAMP_TO_EDGE,[Lo]:n.MIRRORED_REPEAT},se={[Lt]:n.NEAREST,[mf]:n.NEAREST_MIPMAP_NEAREST,[ns]:n.NEAREST_MIPMAP_LINEAR,[rn]:n.LINEAR,[Ba]:n.LINEAR_MIPMAP_NEAREST,[hi]:n.LINEAR_MIPMAP_LINEAR},ue={[xf]:n.NEVER,[Tf]:n.ALWAYS,[Mf]:n.LESS,[bd]:n.LEQUAL,[Sf]:n.EQUAL,[Af]:n.GEQUAL,[yf]:n.GREATER,[Ef]:n.NOTEQUAL};function me(b,x){if(x.type===dn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===rn||x.magFilter===Ba||x.magFilter===ns||x.magFilter===hi||x.minFilter===rn||x.minFilter===Ba||x.minFilter===ns||x.minFilter===hi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,k[x.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,k[x.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,k[x.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,se[x.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,se[x.minFilter]),x.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,ue[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Lt||x.minFilter!==ns&&x.minFilter!==hi||x.type===dn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Ce(b,x){let z=!1;b.__webglInit===void 0&&(b.__webglInit=!0,x.addEventListener("dispose",C));const j=x.source;let J=h.get(j);J===void 0&&(J={},h.set(j,J));const Z=O(x);if(Z!==b.__cacheKey){J[Z]===void 0&&(J[Z]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,z=!0),J[Z].usedTimes++;const Ee=J[b.__cacheKey];Ee!==void 0&&(J[b.__cacheKey].usedTimes--,Ee.usedTimes===0&&L(x)),b.__cacheKey=Z,b.__webglTexture=J[Z].texture}return z}function qe(b,x,z){let j=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(j=n.TEXTURE_3D);const J=Ce(b,x),Z=x.source;t.bindTexture(j,b.__webglTexture,n.TEXTURE0+z);const Ee=i.get(Z);if(Z.version!==Ee.__version||J===!0){t.activeTexture(n.TEXTURE0+z);const ae=Je.getPrimaries(Je.workingColorSpace),fe=x.colorSpace===Fn?null:Je.getPrimaries(x.colorSpace),Le=x.colorSpace===Fn||ae===fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);let ee=v(x.image,!1,r.maxTextureSize);ee=Te(x,ee);const de=s.convert(x.format,x.colorSpace),Ge=s.convert(x.type);let Re=S(x.internalFormat,de,Ge,x.colorSpace,x.isVideoTexture);me(j,x);let pe;const Ie=x.mipmaps,Fe=x.isVideoTexture!==!0,at=Ee.__version===void 0||J===!0,I=Z.dataReady,te=E(x,ee);if(x.isDepthTexture)Re=_(x.format===or,x.type),at&&(Fe?t.texStorage2D(n.TEXTURE_2D,1,Re,ee.width,ee.height):t.texImage2D(n.TEXTURE_2D,0,Re,ee.width,ee.height,0,de,Ge,null));else if(x.isDataTexture)if(Ie.length>0){Fe&&at&&t.texStorage2D(n.TEXTURE_2D,te,Re,Ie[0].width,Ie[0].height);for(let K=0,$=Ie.length;K<$;K++)pe=Ie[K],Fe?I&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,pe.width,pe.height,de,Ge,pe.data):t.texImage2D(n.TEXTURE_2D,K,Re,pe.width,pe.height,0,de,Ge,pe.data);x.generateMipmaps=!1}else Fe?(at&&t.texStorage2D(n.TEXTURE_2D,te,Re,ee.width,ee.height),I&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ee.width,ee.height,de,Ge,ee.data)):t.texImage2D(n.TEXTURE_2D,0,Re,ee.width,ee.height,0,de,Ge,ee.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Fe&&at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,te,Re,Ie[0].width,Ie[0].height,ee.depth);for(let K=0,$=Ie.length;K<$;K++)if(pe=Ie[K],x.format!==on)if(de!==null)if(Fe){if(I)if(x.layerUpdates.size>0){const ie=pu(pe.width,pe.height,x.format,x.type);for(const De of x.layerUpdates){const We=pe.data.subarray(De*ie/pe.data.BYTES_PER_ELEMENT,(De+1)*ie/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,De,pe.width,pe.height,1,de,We,0,0)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,pe.width,pe.height,ee.depth,de,pe.data,0,0)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,K,Re,pe.width,pe.height,ee.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?I&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,pe.width,pe.height,ee.depth,de,Ge,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,K,Re,pe.width,pe.height,ee.depth,0,de,Ge,pe.data)}else{Fe&&at&&t.texStorage2D(n.TEXTURE_2D,te,Re,Ie[0].width,Ie[0].height);for(let K=0,$=Ie.length;K<$;K++)pe=Ie[K],x.format!==on?de!==null?Fe?I&&t.compressedTexSubImage2D(n.TEXTURE_2D,K,0,0,pe.width,pe.height,de,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,K,Re,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?I&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,pe.width,pe.height,de,Ge,pe.data):t.texImage2D(n.TEXTURE_2D,K,Re,pe.width,pe.height,0,de,Ge,pe.data)}else if(x.isDataArrayTexture)if(Fe){if(at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,te,Re,ee.width,ee.height,ee.depth),I)if(x.layerUpdates.size>0){const K=pu(ee.width,ee.height,x.format,x.type);for(const $ of x.layerUpdates){const ie=ee.data.subarray($*K/ee.data.BYTES_PER_ELEMENT,($+1)*K/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,$,ee.width,ee.height,1,de,Ge,ie)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,de,Ge,ee.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Re,ee.width,ee.height,ee.depth,0,de,Ge,ee.data);else if(x.isData3DTexture)Fe?(at&&t.texStorage3D(n.TEXTURE_3D,te,Re,ee.width,ee.height,ee.depth),I&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,de,Ge,ee.data)):t.texImage3D(n.TEXTURE_3D,0,Re,ee.width,ee.height,ee.depth,0,de,Ge,ee.data);else if(x.isFramebufferTexture){if(at)if(Fe)t.texStorage2D(n.TEXTURE_2D,te,Re,ee.width,ee.height);else{let K=ee.width,$=ee.height;for(let ie=0;ie<te;ie++)t.texImage2D(n.TEXTURE_2D,ie,Re,K,$,0,de,Ge,null),K>>=1,$>>=1}}else if(Ie.length>0){if(Fe&&at){const K=He(Ie[0]);t.texStorage2D(n.TEXTURE_2D,te,Re,K.width,K.height)}for(let K=0,$=Ie.length;K<$;K++)pe=Ie[K],Fe?I&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,de,Ge,pe):t.texImage2D(n.TEXTURE_2D,K,Re,de,Ge,pe);x.generateMipmaps=!1}else if(Fe){if(at){const K=He(ee);t.texStorage2D(n.TEXTURE_2D,te,Re,K.width,K.height)}I&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,de,Ge,ee)}else t.texImage2D(n.TEXTURE_2D,0,Re,de,Ge,ee);m(x)&&f(j),Ee.__version=Z.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function W(b,x,z){if(x.image.length!==6)return;const j=Ce(b,x),J=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+z);const Z=i.get(J);if(J.version!==Z.__version||j===!0){t.activeTexture(n.TEXTURE0+z);const Ee=Je.getPrimaries(Je.workingColorSpace),ae=x.colorSpace===Fn?null:Je.getPrimaries(x.colorSpace),fe=x.colorSpace===Fn||Ee===ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const Le=x.isCompressedTexture||x.image[0].isCompressedTexture,ee=x.image[0]&&x.image[0].isDataTexture,de=[];for(let $=0;$<6;$++)!Le&&!ee?de[$]=v(x.image[$],!0,r.maxCubemapSize):de[$]=ee?x.image[$].image:x.image[$],de[$]=Te(x,de[$]);const Ge=de[0],Re=s.convert(x.format,x.colorSpace),pe=s.convert(x.type),Ie=S(x.internalFormat,Re,pe,x.colorSpace),Fe=x.isVideoTexture!==!0,at=Z.__version===void 0||j===!0,I=J.dataReady;let te=E(x,Ge);me(n.TEXTURE_CUBE_MAP,x);let K;if(Le){Fe&&at&&t.texStorage2D(n.TEXTURE_CUBE_MAP,te,Ie,Ge.width,Ge.height);for(let $=0;$<6;$++){K=de[$].mipmaps;for(let ie=0;ie<K.length;ie++){const De=K[ie];x.format!==on?Re!==null?Fe?I&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,ie,0,0,De.width,De.height,Re,De.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,ie,Ie,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,ie,0,0,De.width,De.height,Re,pe,De.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,ie,Ie,De.width,De.height,0,Re,pe,De.data)}}}else{if(K=x.mipmaps,Fe&&at){K.length>0&&te++;const $=He(de[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,te,Ie,$.width,$.height)}for(let $=0;$<6;$++)if(ee){Fe?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,de[$].width,de[$].height,Re,pe,de[$].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ie,de[$].width,de[$].height,0,Re,pe,de[$].data);for(let ie=0;ie<K.length;ie++){const We=K[ie].image[$].image;Fe?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,ie+1,0,0,We.width,We.height,Re,pe,We.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,ie+1,Ie,We.width,We.height,0,Re,pe,We.data)}}else{Fe?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Re,pe,de[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ie,Re,pe,de[$]);for(let ie=0;ie<K.length;ie++){const De=K[ie];Fe?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,ie+1,0,0,Re,pe,De.image[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,ie+1,Ie,Re,pe,De.image[$])}}}m(x)&&f(n.TEXTURE_CUBE_MAP),Z.__version=J.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function Q(b,x,z,j,J,Z){const Ee=s.convert(z.format,z.colorSpace),ae=s.convert(z.type),fe=S(z.internalFormat,Ee,ae,z.colorSpace);if(!i.get(x).__hasExternalTextures){const ee=Math.max(1,x.width>>Z),de=Math.max(1,x.height>>Z);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,Z,fe,ee,de,x.depth,0,Ee,ae,null):t.texImage2D(J,Z,fe,ee,de,0,Ee,ae,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),ve(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,J,i.get(z).__webglTexture,0,Xe(x)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,J,i.get(z).__webglTexture,Z),t.bindFramebuffer(n.FRAMEBUFFER,null)}function he(b,x,z){if(n.bindRenderbuffer(n.RENDERBUFFER,b),x.depthBuffer){const j=x.depthTexture,J=j&&j.isDepthTexture?j.type:null,Z=_(x.stencilBuffer,J),Ee=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=Xe(x);ve(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ae,Z,x.width,x.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,ae,Z,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,Z,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ee,n.RENDERBUFFER,b)}else{const j=x.textures;for(let J=0;J<j.length;J++){const Z=j[J],Ee=s.convert(Z.format,Z.colorSpace),ae=s.convert(Z.type),fe=S(Z.internalFormat,Ee,ae,Z.colorSpace),Le=Xe(x);z&&ve(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Le,fe,x.width,x.height):ve(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Le,fe,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,fe,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ce(b,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),X(x.depthTexture,0);const j=i.get(x.depthTexture).__webglTexture,J=Xe(x);if(x.depthTexture.format===Ji)ve(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0);else if(x.depthTexture.format===or)ve(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function ye(b){const x=i.get(b),z=b.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==b.depthTexture){const j=b.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),j){const J=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,j.removeEventListener("dispose",J)};j.addEventListener("dispose",J),x.__depthDisposeCallback=J}x.__boundDepthTexture=j}if(b.depthTexture&&!x.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");ce(x.__webglFramebuffer,b)}else if(z){x.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[j]),x.__webglDepthbuffer[j]===void 0)x.__webglDepthbuffer[j]=n.createRenderbuffer(),he(x.__webglDepthbuffer[j],b,!1);else{const J=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=x.__webglDepthbuffer[j];n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,Z)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),he(x.__webglDepthbuffer,b,!1);else{const j=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,J)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ae(b,x,z){const j=i.get(b);x!==void 0&&Q(j.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&ye(b)}function be(b){const x=b.texture,z=i.get(b),j=i.get(x);b.addEventListener("dispose",T);const J=b.textures,Z=b.isWebGLCubeRenderTarget===!0,Ee=J.length>1;if(Ee||(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=x.version,a.memory.textures++),Z){z.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer[ae]=[];for(let fe=0;fe<x.mipmaps.length;fe++)z.__webglFramebuffer[ae][fe]=n.createFramebuffer()}else z.__webglFramebuffer[ae]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer=[];for(let ae=0;ae<x.mipmaps.length;ae++)z.__webglFramebuffer[ae]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(Ee)for(let ae=0,fe=J.length;ae<fe;ae++){const Le=i.get(J[ae]);Le.__webglTexture===void 0&&(Le.__webglTexture=n.createTexture(),a.memory.textures++)}if(b.samples>0&&ve(b)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ae=0;ae<J.length;ae++){const fe=J[ae];z.__webglColorRenderbuffer[ae]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[ae]);const Le=s.convert(fe.format,fe.colorSpace),ee=s.convert(fe.type),de=S(fe.internalFormat,Le,ee,fe.colorSpace,b.isXRRenderTarget===!0),Ge=Xe(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ge,de,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,z.__webglColorRenderbuffer[ae])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),he(z.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),me(n.TEXTURE_CUBE_MAP,x);for(let ae=0;ae<6;ae++)if(x.mipmaps&&x.mipmaps.length>0)for(let fe=0;fe<x.mipmaps.length;fe++)Q(z.__webglFramebuffer[ae][fe],b,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,fe);else Q(z.__webglFramebuffer[ae],b,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);m(x)&&f(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let ae=0,fe=J.length;ae<fe;ae++){const Le=J[ae],ee=i.get(Le);t.bindTexture(n.TEXTURE_2D,ee.__webglTexture),me(n.TEXTURE_2D,Le),Q(z.__webglFramebuffer,b,Le,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,0),m(Le)&&f(n.TEXTURE_2D)}t.unbindTexture()}else{let ae=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ae=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ae,j.__webglTexture),me(ae,x),x.mipmaps&&x.mipmaps.length>0)for(let fe=0;fe<x.mipmaps.length;fe++)Q(z.__webglFramebuffer[fe],b,x,n.COLOR_ATTACHMENT0,ae,fe);else Q(z.__webglFramebuffer,b,x,n.COLOR_ATTACHMENT0,ae,0);m(x)&&f(ae),t.unbindTexture()}b.depthBuffer&&ye(b)}function nt(b){const x=b.textures;for(let z=0,j=x.length;z<j;z++){const J=x[z];if(m(J)){const Z=b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,Ee=i.get(J).__webglTexture;t.bindTexture(Z,Ee),f(Z),t.unbindTexture()}}}const w=[],tt=[];function ze(b){if(b.samples>0){if(ve(b)===!1){const x=b.textures,z=b.width,j=b.height;let J=n.COLOR_BUFFER_BIT;const Z=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ee=i.get(b),ae=x.length>1;if(ae)for(let fe=0;fe<x.length;fe++)t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let fe=0;fe<x.length;fe++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),ae){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[fe]);const Le=i.get(x[fe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Le,0)}n.blitFramebuffer(0,0,z,j,0,0,z,j,J,n.NEAREST),c===!0&&(w.length=0,tt.length=0,w.push(n.COLOR_ATTACHMENT0+fe),b.depthBuffer&&b.resolveDepthBuffer===!1&&(w.push(Z),tt.push(Z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,tt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,w))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ae)for(let fe=0;fe<x.length;fe++){t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[fe]);const Le=i.get(x[fe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,Le,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const x=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function Xe(b){return Math.min(r.maxSamples,b.samples)}function ve(b){const x=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function st(b){const x=a.render.frame;u.get(b)!==x&&(u.set(b,x),b.update())}function Te(b,x){const z=b.colorSpace,j=b.format,J=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||z!==$n&&z!==Fn&&(Je.getTransfer(z)===it?(j!==on||J!==bn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),x}function He(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=R,this.setTexture2D=X,this.setTexture2DArray=q,this.setTexture3D=V,this.setTextureCube=Y,this.rebindTextures=Ae,this.setupRenderTarget=be,this.updateRenderTargetMipmap=nt,this.updateMultisampleRenderTarget=ze,this.setupDepthRenderbuffer=ye,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=ve}function V1(n,e){function t(i,r=Fn){let s;const a=Je.getTransfer(r);if(i===bn)return n.UNSIGNED_BYTE;if(i===Pc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Rc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===vd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===gd)return n.BYTE;if(i===_d)return n.SHORT;if(i===Ur)return n.UNSIGNED_SHORT;if(i===wc)return n.INT;if(i===_i)return n.UNSIGNED_INT;if(i===dn)return n.FLOAT;if(i===Xr)return n.HALF_FLOAT;if(i===xd)return n.ALPHA;if(i===Md)return n.RGB;if(i===on)return n.RGBA;if(i===Sd)return n.LUMINANCE;if(i===yd)return n.LUMINANCE_ALPHA;if(i===Ji)return n.DEPTH_COMPONENT;if(i===or)return n.DEPTH_STENCIL;if(i===Cc)return n.RED;if(i===Ic)return n.RED_INTEGER;if(i===Ed)return n.RG;if(i===Hc)return n.RG_INTEGER;if(i===Lc)return n.RGBA_INTEGER;if(i===Gs||i===Vs||i===Ws||i===Xs)if(a===it)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Gs)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Vs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ws)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Xs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Gs)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Vs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ws)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Xs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Uo||i===No||i===Oo||i===Fo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Uo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===No)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Oo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Fo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===zo||i===Bo||i===ko)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===zo||i===Bo)return a===it?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ko)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Go||i===Vo||i===Wo||i===Xo||i===Yo||i===qo||i===Ko||i===$o||i===jo||i===Zo||i===Jo||i===Qo||i===ec||i===tc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Go)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Vo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Wo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Xo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Yo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===qo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ko)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===$o)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===jo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Zo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Jo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Qo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ec)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===tc)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ys||i===nc||i===ic)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ys)return a===it?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===nc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ic)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ad||i===rc||i===sc||i===ac)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ys)return s.COMPRESSED_RED_RGTC1_EXT;if(i===rc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===sc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ac)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ar?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class W1 extends Gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class fi extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}}const X1={type:"move"};class ho{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),f=this._getHandJoint(l,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,g=.005;l.inputState.pinching&&h>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(X1)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new fi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Y1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,q1=`
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

}`;class K1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new yt,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Wn({vertexShader:Y1,fragmentShader:q1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new It(new qr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $1 extends Si{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,d=null,h=null,p=null,g=null;const v=new K1,m=t.getContextAttributes();let f=null,S=null;const _=[],E=[],C=new Se;let T=null;const D=new Gt;D.layers.enable(1),D.viewport=new rt;const L=new Gt;L.layers.enable(2),L.viewport=new rt;const A=[D,L],M=new W1;M.layers.enable(1),M.layers.enable(2);let R=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let Q=_[W];return Q===void 0&&(Q=new ho,_[W]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(W){let Q=_[W];return Q===void 0&&(Q=new ho,_[W]=Q),Q.getGripSpace()},this.getHand=function(W){let Q=_[W];return Q===void 0&&(Q=new ho,_[W]=Q),Q.getHandSpace()};function O(W){const Q=E.indexOf(W.inputSource);if(Q===-1)return;const he=_[Q];he!==void 0&&(he.update(W.inputSource,W.frame,l||a),he.dispatchEvent({type:W.type,data:W.inputSource}))}function X(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",q);for(let W=0;W<_.length;W++){const Q=E[W];Q!==null&&(E[W]=null,_[W].disconnect(Q))}R=null,B=null,v.reset(),e.setRenderTarget(f),p=null,h=null,d=null,r=null,S=null,qe.stop(),i.isPresenting=!1,e.setPixelRatio(T),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(W){l=W},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(f=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",X),r.addEventListener("inputsourceschange",q),m.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(C),r.renderState.layers===void 0){const Q={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,Q),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new vi(p.framebufferWidth,p.framebufferHeight,{format:on,type:bn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let Q=null,he=null,ce=null;m.depth&&(ce=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Q=m.stencil?or:Ji,he=m.stencil?ar:_i);const ye={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:s};d=new XRWebGLBinding(r,t),h=d.createProjectionLayer(ye),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new vi(h.textureWidth,h.textureHeight,{format:on,type:bn,depthTexture:new Od(h.textureWidth,h.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),qe.setContext(r),qe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function q(W){for(let Q=0;Q<W.removed.length;Q++){const he=W.removed[Q],ce=E.indexOf(he);ce>=0&&(E[ce]=null,_[ce].disconnect(he))}for(let Q=0;Q<W.added.length;Q++){const he=W.added[Q];let ce=E.indexOf(he);if(ce===-1){for(let Ae=0;Ae<_.length;Ae++)if(Ae>=E.length){E.push(he),ce=Ae;break}else if(E[Ae]===null){E[Ae]=he,ce=Ae;break}if(ce===-1)break}const ye=_[ce];ye&&ye.connect(he)}}const V=new P,Y=new P;function k(W,Q,he){V.setFromMatrixPosition(Q.matrixWorld),Y.setFromMatrixPosition(he.matrixWorld);const ce=V.distanceTo(Y),ye=Q.projectionMatrix.elements,Ae=he.projectionMatrix.elements,be=ye[14]/(ye[10]-1),nt=ye[14]/(ye[10]+1),w=(ye[9]+1)/ye[5],tt=(ye[9]-1)/ye[5],ze=(ye[8]-1)/ye[0],Xe=(Ae[8]+1)/Ae[0],ve=be*ze,st=be*Xe,Te=ce/(-ze+Xe),He=Te*-ze;if(Q.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(He),W.translateZ(Te),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),ye[10]===-1)W.projectionMatrix.copy(Q.projectionMatrix),W.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const b=be+Te,x=nt+Te,z=ve-He,j=st+(ce-He),J=w*nt/x*b,Z=tt*nt/x*b;W.projectionMatrix.makePerspective(z,j,J,Z,b,x),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function se(W,Q){Q===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(Q.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;let Q=W.near,he=W.far;v.texture!==null&&(v.depthNear>0&&(Q=v.depthNear),v.depthFar>0&&(he=v.depthFar)),M.near=L.near=D.near=Q,M.far=L.far=D.far=he,(R!==M.near||B!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),R=M.near,B=M.far);const ce=W.parent,ye=M.cameras;se(M,ce);for(let Ae=0;Ae<ye.length;Ae++)se(ye[Ae],ce);ye.length===2?k(M,D,L):M.projectionMatrix.copy(D.projectionMatrix),ue(W,M,ce)};function ue(W,Q,he){he===null?W.matrix.copy(Q.matrixWorld):(W.matrix.copy(he.matrixWorld),W.matrix.invert(),W.matrix.multiply(Q.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(Q.projectionMatrix),W.projectionMatrixInverse.copy(Q.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Nr*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function(W){c=W,h!==null&&(h.fixedFoveation=W),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=W)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let me=null;function Ce(W,Q){if(u=Q.getViewerPose(l||a),g=Q,u!==null){const he=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let ce=!1;he.length!==M.cameras.length&&(M.cameras.length=0,ce=!0);for(let Ae=0;Ae<he.length;Ae++){const be=he[Ae];let nt=null;if(p!==null)nt=p.getViewport(be);else{const tt=d.getViewSubImage(h,be);nt=tt.viewport,Ae===0&&(e.setRenderTargetTextures(S,tt.colorTexture,h.ignoreDepthValues?void 0:tt.depthStencilTexture),e.setRenderTarget(S))}let w=A[Ae];w===void 0&&(w=new Gt,w.layers.enable(Ae),w.viewport=new rt,A[Ae]=w),w.matrix.fromArray(be.transform.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale),w.projectionMatrix.fromArray(be.projectionMatrix),w.projectionMatrixInverse.copy(w.projectionMatrix).invert(),w.viewport.set(nt.x,nt.y,nt.width,nt.height),Ae===0&&(M.matrix.copy(w.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ce===!0&&M.cameras.push(w)}const ye=r.enabledFeatures;if(ye&&ye.includes("depth-sensing")){const Ae=d.getDepthInformation(he[0]);Ae&&Ae.isValid&&Ae.texture&&v.init(e,Ae,r.renderState)}}for(let he=0;he<_.length;he++){const ce=E[he],ye=_[he];ce!==null&&ye!==void 0&&ye.update(ce,Q,l||a)}me&&me(W,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),g=null}const qe=new Nd;qe.setAnimationLoop(Ce),this.setAnimationLoop=function(W){me=W},this.dispose=function(){}}}const ii=new cn,j1=new Qe;function Z1(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Hd(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,S,_,E){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),u(m,f)):f.isMeshStandardMaterial?(s(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,E)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),v(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,S,_):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ut&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ut&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const S=e.get(f),_=S.envMap,E=S.envMapRotation;_&&(m.envMap.value=_,ii.copy(E),ii.x*=-1,ii.y*=-1,ii.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),m.envMapRotation.value.setFromMatrix4(j1.makeRotationFromEuler(ii)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,S,_){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*S,m.scale.value=_*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,S){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ut&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){const S=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function J1(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,_){const E=_.program;i.uniformBlockBinding(S,E)}function l(S,_){let E=r[S.id];E===void 0&&(g(S),E=u(S),r[S.id]=E,S.addEventListener("dispose",m));const C=_.program;i.updateUBOMapping(S,C);const T=e.render.frame;s[S.id]!==T&&(h(S),s[S.id]=T)}function u(S){const _=d();S.__bindingPointIndex=_;const E=n.createBuffer(),C=S.__size,T=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,C,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,_,E),E}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const _=r[S.id],E=S.uniforms,C=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let T=0,D=E.length;T<D;T++){const L=Array.isArray(E[T])?E[T]:[E[T]];for(let A=0,M=L.length;A<M;A++){const R=L[A];if(p(R,T,A,C)===!0){const B=R.__offset,O=Array.isArray(R.value)?R.value:[R.value];let X=0;for(let q=0;q<O.length;q++){const V=O[q],Y=v(V);typeof V=="number"||typeof V=="boolean"?(R.__data[0]=V,n.bufferSubData(n.UNIFORM_BUFFER,B+X,R.__data)):V.isMatrix3?(R.__data[0]=V.elements[0],R.__data[1]=V.elements[1],R.__data[2]=V.elements[2],R.__data[3]=0,R.__data[4]=V.elements[3],R.__data[5]=V.elements[4],R.__data[6]=V.elements[5],R.__data[7]=0,R.__data[8]=V.elements[6],R.__data[9]=V.elements[7],R.__data[10]=V.elements[8],R.__data[11]=0):(V.toArray(R.__data,X),X+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(S,_,E,C){const T=S.value,D=_+"_"+E;if(C[D]===void 0)return typeof T=="number"||typeof T=="boolean"?C[D]=T:C[D]=T.clone(),!0;{const L=C[D];if(typeof T=="number"||typeof T=="boolean"){if(L!==T)return C[D]=T,!0}else if(L.equals(T)===!1)return L.copy(T),!0}return!1}function g(S){const _=S.uniforms;let E=0;const C=16;for(let D=0,L=_.length;D<L;D++){const A=Array.isArray(_[D])?_[D]:[_[D]];for(let M=0,R=A.length;M<R;M++){const B=A[M],O=Array.isArray(B.value)?B.value:[B.value];for(let X=0,q=O.length;X<q;X++){const V=O[X],Y=v(V),k=E%C,se=k%Y.boundary,ue=k+se;E+=se,ue!==0&&C-ue<Y.storage&&(E+=C-ue),B.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=E,E+=Y.storage}}}const T=E%C;return T>0&&(E+=C-T),S.__size=E,S.__cache={},this}function v(S){const _={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(_.boundary=4,_.storage=4):S.isVector2?(_.boundary=8,_.storage=8):S.isVector3||S.isColor?(_.boundary=16,_.storage=12):S.isVector4?(_.boundary=16,_.storage=16):S.isMatrix3?(_.boundary=48,_.storage=48):S.isMatrix4?(_.boundary=64,_.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),_}function m(S){const _=S.target;_.removeEventListener("dispose",m);const E=a.indexOf(_.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(r[_.id]),delete r[_.id],delete s[_.id]}function f(){for(const S in r)n.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:c,update:l,dispose:f}}class Q1{constructor(e={}){const{canvas:t=Gf(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=a;const p=new Uint32Array(4),g=new Int32Array(4);let v=null,m=null;const f=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Rt,this.toneMapping=kn,this.toneMappingExposure=1;const _=this;let E=!1,C=0,T=0,D=null,L=-1,A=null;const M=new rt,R=new rt;let B=null;const O=new Oe(0);let X=0,q=t.width,V=t.height,Y=1,k=null,se=null;const ue=new rt(0,0,q,V),me=new rt(0,0,q,V);let Ce=!1;const qe=new Fc;let W=!1,Q=!1;const he=new Qe,ce=new P,ye=new rt,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let be=!1;function nt(){return D===null?Y:1}let w=i;function tt(y,H){return t.getContext(y,H)}try{const y={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Dc}`),t.addEventListener("webglcontextlost",K,!1),t.addEventListener("webglcontextrestored",$,!1),t.addEventListener("webglcontextcreationerror",ie,!1),w===null){const H="webgl2";if(w=tt(H,y),w===null)throw tt(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let ze,Xe,ve,st,Te,He,b,x,z,j,J,Z,Ee,ae,fe,Le,ee,de,Ge,Re,pe,Ie,Fe,at;function I(){ze=new s0(w),ze.init(),Ie=new V1(w,ze),Xe=new Jg(w,ze,e,Ie),ve=new B1(w),st=new c0(w),Te=new b1,He=new G1(w,ze,ve,Te,Xe,Ie,st),b=new e0(_),x=new r0(_),z=new pp(w),Fe=new jg(w,z),j=new a0(w,z,st,Fe),J=new u0(w,j,z,st),Ge=new l0(w,Xe,He),Le=new Qg(Te),Z=new T1(_,b,x,ze,Xe,Fe,Le),Ee=new Z1(_,Te),ae=new w1,fe=new L1(ze),de=new $g(_,b,x,ve,J,h,c),ee=new z1(_,J,Xe),at=new J1(w,st,Xe,ve),Re=new Zg(w,ze,st),pe=new o0(w,ze,st),st.programs=Z.programs,_.capabilities=Xe,_.extensions=ze,_.properties=Te,_.renderLists=ae,_.shadowMap=ee,_.state=ve,_.info=st}I();const te=new $1(_,w);this.xr=te,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const y=ze.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=ze.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(y){y!==void 0&&(Y=y,this.setSize(q,V,!1))},this.getSize=function(y){return y.set(q,V)},this.setSize=function(y,H,N=!0){if(te.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=y,V=H,t.width=Math.floor(y*Y),t.height=Math.floor(H*Y),N===!0&&(t.style.width=y+"px",t.style.height=H+"px"),this.setViewport(0,0,y,H)},this.getDrawingBufferSize=function(y){return y.set(q*Y,V*Y).floor()},this.setDrawingBufferSize=function(y,H,N){q=y,V=H,Y=N,t.width=Math.floor(y*N),t.height=Math.floor(H*N),this.setViewport(0,0,y,H)},this.getCurrentViewport=function(y){return y.copy(M)},this.getViewport=function(y){return y.copy(ue)},this.setViewport=function(y,H,N,F){y.isVector4?ue.set(y.x,y.y,y.z,y.w):ue.set(y,H,N,F),ve.viewport(M.copy(ue).multiplyScalar(Y).round())},this.getScissor=function(y){return y.copy(me)},this.setScissor=function(y,H,N,F){y.isVector4?me.set(y.x,y.y,y.z,y.w):me.set(y,H,N,F),ve.scissor(R.copy(me).multiplyScalar(Y).round())},this.getScissorTest=function(){return Ce},this.setScissorTest=function(y){ve.setScissorTest(Ce=y)},this.setOpaqueSort=function(y){k=y},this.setTransparentSort=function(y){se=y},this.getClearColor=function(y){return y.copy(de.getClearColor())},this.setClearColor=function(){de.setClearColor.apply(de,arguments)},this.getClearAlpha=function(){return de.getClearAlpha()},this.setClearAlpha=function(){de.setClearAlpha.apply(de,arguments)},this.clear=function(y=!0,H=!0,N=!0){let F=0;if(y){let U=!1;if(D!==null){const ne=D.texture.format;U=ne===Lc||ne===Hc||ne===Ic}if(U){const ne=D.texture.type,le=ne===bn||ne===_i||ne===Ur||ne===ar||ne===Pc||ne===Rc,ge=de.getClearColor(),_e=de.getClearAlpha(),we=ge.r,Pe=ge.g,xe=ge.b;le?(p[0]=we,p[1]=Pe,p[2]=xe,p[3]=_e,w.clearBufferuiv(w.COLOR,0,p)):(g[0]=we,g[1]=Pe,g[2]=xe,g[3]=_e,w.clearBufferiv(w.COLOR,0,g))}else F|=w.COLOR_BUFFER_BIT}H&&(F|=w.DEPTH_BUFFER_BIT),N&&(F|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",K,!1),t.removeEventListener("webglcontextrestored",$,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),ae.dispose(),fe.dispose(),Te.dispose(),b.dispose(),x.dispose(),J.dispose(),Fe.dispose(),at.dispose(),Z.dispose(),te.dispose(),te.removeEventListener("sessionstart",ln),te.removeEventListener("sessionend",hl),Zn.stop()};function K(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function $(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const y=st.autoReset,H=ee.enabled,N=ee.autoUpdate,F=ee.needsUpdate,U=ee.type;I(),st.autoReset=y,ee.enabled=H,ee.autoUpdate=N,ee.needsUpdate=F,ee.type=U}function ie(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function De(y){const H=y.target;H.removeEventListener("dispose",De),We(H)}function We(y){ut(y),Te.remove(y)}function ut(y){const H=Te.get(y).programs;H!==void 0&&(H.forEach(function(N){Z.releaseProgram(N)}),y.isShaderMaterial&&Z.releaseShaderCache(y))}this.renderBufferDirect=function(y,H,N,F,U,ne){H===null&&(H=Ae);const le=U.isMesh&&U.matrixWorld.determinant()<0,ge=wh(y,H,N,F,U);ve.setMaterial(F,le);let _e=N.index,we=1;if(F.wireframe===!0){if(_e=j.getWireframeAttribute(N),_e===void 0)return;we=2}const Pe=N.drawRange,xe=N.attributes.position;let $e=Pe.start*we,ot=(Pe.start+Pe.count)*we;ne!==null&&($e=Math.max($e,ne.start*we),ot=Math.min(ot,(ne.start+ne.count)*we)),_e!==null?($e=Math.max($e,0),ot=Math.min(ot,_e.count)):xe!=null&&($e=Math.max($e,0),ot=Math.min(ot,xe.count));const ct=ot-$e;if(ct<0||ct===1/0)return;Fe.setup(U,F,ge,N,_e);let Nt,je=Re;if(_e!==null&&(Nt=z.get(_e),je=pe,je.setIndex(Nt)),U.isMesh)F.wireframe===!0?(ve.setLineWidth(F.wireframeLinewidth*nt()),je.setMode(w.LINES)):je.setMode(w.TRIANGLES);else if(U.isLine){let Me=F.linewidth;Me===void 0&&(Me=1),ve.setLineWidth(Me*nt()),U.isLineSegments?je.setMode(w.LINES):U.isLineLoop?je.setMode(w.LINE_LOOP):je.setMode(w.LINE_STRIP)}else U.isPoints?je.setMode(w.POINTS):U.isSprite&&je.setMode(w.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)je.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(ze.get("WEBGL_multi_draw"))je.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Me=U._multiDrawStarts,St=U._multiDrawCounts,Ze=U._multiDrawCount,Jt=_e?z.get(_e).bytesPerElement:1,Ai=Te.get(F).currentProgram.getUniforms();for(let Ot=0;Ot<Ze;Ot++)Ai.setValue(w,"_gl_DrawID",Ot),je.render(Me[Ot]/Jt,St[Ot])}else if(U.isInstancedMesh)je.renderInstances($e,ct,U.count);else if(N.isInstancedBufferGeometry){const Me=N._maxInstanceCount!==void 0?N._maxInstanceCount:1/0,St=Math.min(N.instanceCount,Me);je.renderInstances($e,ct,St)}else je.render($e,ct)};function Mt(y,H,N){y.transparent===!0&&y.side===Zt&&y.forceSinglePass===!1?(y.side=Ut,y.needsUpdate=!0,ts(y,H,N),y.side=Vn,y.needsUpdate=!0,ts(y,H,N),y.side=Zt):ts(y,H,N)}this.compile=function(y,H,N=null){N===null&&(N=y),m=fe.get(N),m.init(H),S.push(m),N.traverseVisible(function(U){U.isLight&&U.layers.test(H.layers)&&(m.pushLight(U),U.castShadow&&m.pushShadow(U))}),y!==N&&y.traverseVisible(function(U){U.isLight&&U.layers.test(H.layers)&&(m.pushLight(U),U.castShadow&&m.pushShadow(U))}),m.setupLights();const F=new Set;return y.traverse(function(U){const ne=U.material;if(ne)if(Array.isArray(ne))for(let le=0;le<ne.length;le++){const ge=ne[le];Mt(ge,N,U),F.add(ge)}else Mt(ne,N,U),F.add(ne)}),S.pop(),m=null,F},this.compileAsync=function(y,H,N=null){const F=this.compile(y,H,N);return new Promise(U=>{function ne(){if(F.forEach(function(le){Te.get(le).currentProgram.isReady()&&F.delete(le)}),F.size===0){U(y);return}setTimeout(ne,10)}ze.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let Ke=null;function fn(y){Ke&&Ke(y)}function ln(){Zn.stop()}function hl(){Zn.start()}const Zn=new Nd;Zn.setAnimationLoop(fn),typeof self<"u"&&Zn.setContext(self),this.setAnimationLoop=function(y){Ke=y,te.setAnimationLoop(y),y===null?Zn.stop():Zn.start()},te.addEventListener("sessionstart",ln),te.addEventListener("sessionend",hl),this.render=function(y,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(te.cameraAutoUpdate===!0&&te.updateCamera(H),H=te.getCamera()),y.isScene===!0&&y.onBeforeRender(_,y,H,D),m=fe.get(y,S.length),m.init(H),S.push(m),he.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),qe.setFromProjectionMatrix(he),Q=this.localClippingEnabled,W=Le.init(this.clippingPlanes,Q),v=ae.get(y,f.length),v.init(),f.push(v),te.enabled===!0&&te.isPresenting===!0){const ne=_.xr.getDepthSensingMesh();ne!==null&&Ua(ne,H,-1/0,_.sortObjects)}Ua(y,H,0,_.sortObjects),v.finish(),_.sortObjects===!0&&v.sort(k,se),be=te.enabled===!1||te.isPresenting===!1||te.hasDepthSensing()===!1,be&&de.addToRenderList(v,y),this.info.render.frame++,W===!0&&Le.beginShadows();const N=m.state.shadowsArray;ee.render(N,y,H),W===!0&&Le.endShadows(),this.info.autoReset===!0&&this.info.reset();const F=v.opaque,U=v.transmissive;if(m.setupLights(),H.isArrayCamera){const ne=H.cameras;if(U.length>0)for(let le=0,ge=ne.length;le<ge;le++){const _e=ne[le];pl(F,U,y,_e)}be&&de.render(y);for(let le=0,ge=ne.length;le<ge;le++){const _e=ne[le];fl(v,y,_e,_e.viewport)}}else U.length>0&&pl(F,U,y,H),be&&de.render(y),fl(v,y,H);D!==null&&(He.updateMultisampleRenderTarget(D),He.updateRenderTargetMipmap(D)),y.isScene===!0&&y.onAfterRender(_,y,H),Fe.resetDefaultState(),L=-1,A=null,S.pop(),S.length>0?(m=S[S.length-1],W===!0&&Le.setGlobalState(_.clippingPlanes,m.state.camera)):m=null,f.pop(),f.length>0?v=f[f.length-1]:v=null};function Ua(y,H,N,F){if(y.visible===!1)return;if(y.layers.test(H.layers)){if(y.isGroup)N=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(H);else if(y.isLight)m.pushLight(y),y.castShadow&&m.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||qe.intersectsSprite(y)){F&&ye.setFromMatrixPosition(y.matrixWorld).applyMatrix4(he);const le=J.update(y),ge=y.material;ge.visible&&v.push(y,le,ge,N,ye.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||qe.intersectsObject(y))){const le=J.update(y),ge=y.material;if(F&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),ye.copy(y.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),ye.copy(le.boundingSphere.center)),ye.applyMatrix4(y.matrixWorld).applyMatrix4(he)),Array.isArray(ge)){const _e=le.groups;for(let we=0,Pe=_e.length;we<Pe;we++){const xe=_e[we],$e=ge[xe.materialIndex];$e&&$e.visible&&v.push(y,le,$e,N,ye.z,xe)}}else ge.visible&&v.push(y,le,ge,N,ye.z,null)}}const ne=y.children;for(let le=0,ge=ne.length;le<ge;le++)Ua(ne[le],H,N,F)}function fl(y,H,N,F){const U=y.opaque,ne=y.transmissive,le=y.transparent;m.setupLightsView(N),W===!0&&Le.setGlobalState(_.clippingPlanes,N),F&&ve.viewport(M.copy(F)),U.length>0&&es(U,H,N),ne.length>0&&es(ne,H,N),le.length>0&&es(le,H,N),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function pl(y,H,N,F){if((N.isScene===!0?N.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[F.id]===void 0&&(m.state.transmissionRenderTarget[F.id]=new vi(1,1,{generateMipmaps:!0,type:ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float")?Xr:bn,minFilter:hi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Je.workingColorSpace}));const ne=m.state.transmissionRenderTarget[F.id],le=F.viewport||M;ne.setSize(le.z,le.w);const ge=_.getRenderTarget();_.setRenderTarget(ne),_.getClearColor(O),X=_.getClearAlpha(),X<1&&_.setClearColor(16777215,.5),_.clear(),be&&de.render(N);const _e=_.toneMapping;_.toneMapping=kn;const we=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),m.setupLightsView(F),W===!0&&Le.setGlobalState(_.clippingPlanes,F),es(y,N,F),He.updateMultisampleRenderTarget(ne),He.updateRenderTargetMipmap(ne),ze.has("WEBGL_multisampled_render_to_texture")===!1){let Pe=!1;for(let xe=0,$e=H.length;xe<$e;xe++){const ot=H[xe],ct=ot.object,Nt=ot.geometry,je=ot.material,Me=ot.group;if(je.side===Zt&&ct.layers.test(F.layers)){const St=je.side;je.side=Ut,je.needsUpdate=!0,ml(ct,N,F,Nt,je,Me),je.side=St,je.needsUpdate=!0,Pe=!0}}Pe===!0&&(He.updateMultisampleRenderTarget(ne),He.updateRenderTargetMipmap(ne))}_.setRenderTarget(ge),_.setClearColor(O,X),we!==void 0&&(F.viewport=we),_.toneMapping=_e}function es(y,H,N){const F=H.isScene===!0?H.overrideMaterial:null;for(let U=0,ne=y.length;U<ne;U++){const le=y[U],ge=le.object,_e=le.geometry,we=F===null?le.material:F,Pe=le.group;ge.layers.test(N.layers)&&ml(ge,H,N,_e,we,Pe)}}function ml(y,H,N,F,U,ne){y.onBeforeRender(_,H,N,F,U,ne),y.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),U.onBeforeRender(_,H,N,F,y,ne),U.transparent===!0&&U.side===Zt&&U.forceSinglePass===!1?(U.side=Ut,U.needsUpdate=!0,_.renderBufferDirect(N,H,F,U,y,ne),U.side=Vn,U.needsUpdate=!0,_.renderBufferDirect(N,H,F,U,y,ne),U.side=Zt):_.renderBufferDirect(N,H,F,U,y,ne),y.onAfterRender(_,H,N,F,U,ne)}function ts(y,H,N){H.isScene!==!0&&(H=Ae);const F=Te.get(y),U=m.state.lights,ne=m.state.shadowsArray,le=U.state.version,ge=Z.getParameters(y,U.state,ne,H,N),_e=Z.getProgramCacheKey(ge);let we=F.programs;F.environment=y.isMeshStandardMaterial?H.environment:null,F.fog=H.fog,F.envMap=(y.isMeshStandardMaterial?x:b).get(y.envMap||F.environment),F.envMapRotation=F.environment!==null&&y.envMap===null?H.environmentRotation:y.envMapRotation,we===void 0&&(y.addEventListener("dispose",De),we=new Map,F.programs=we);let Pe=we.get(_e);if(Pe!==void 0){if(F.currentProgram===Pe&&F.lightsStateVersion===le)return _l(y,ge),Pe}else ge.uniforms=Z.getUniforms(y),y.onBeforeCompile(ge,_),Pe=Z.acquireProgram(ge,_e),we.set(_e,Pe),F.uniforms=ge.uniforms;const xe=F.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(xe.clippingPlanes=Le.uniform),_l(y,ge),F.needsLights=Rh(y),F.lightsStateVersion=le,F.needsLights&&(xe.ambientLightColor.value=U.state.ambient,xe.lightProbe.value=U.state.probe,xe.directionalLights.value=U.state.directional,xe.directionalLightShadows.value=U.state.directionalShadow,xe.spotLights.value=U.state.spot,xe.spotLightShadows.value=U.state.spotShadow,xe.rectAreaLights.value=U.state.rectArea,xe.ltc_1.value=U.state.rectAreaLTC1,xe.ltc_2.value=U.state.rectAreaLTC2,xe.pointLights.value=U.state.point,xe.pointLightShadows.value=U.state.pointShadow,xe.hemisphereLights.value=U.state.hemi,xe.directionalShadowMap.value=U.state.directionalShadowMap,xe.directionalShadowMatrix.value=U.state.directionalShadowMatrix,xe.spotShadowMap.value=U.state.spotShadowMap,xe.spotLightMatrix.value=U.state.spotLightMatrix,xe.spotLightMap.value=U.state.spotLightMap,xe.pointShadowMap.value=U.state.pointShadowMap,xe.pointShadowMatrix.value=U.state.pointShadowMatrix),F.currentProgram=Pe,F.uniformsList=null,Pe}function gl(y){if(y.uniformsList===null){const H=y.currentProgram.getUniforms();y.uniformsList=qs.seqWithValue(H.seq,y.uniforms)}return y.uniformsList}function _l(y,H){const N=Te.get(y);N.outputColorSpace=H.outputColorSpace,N.batching=H.batching,N.batchingColor=H.batchingColor,N.instancing=H.instancing,N.instancingColor=H.instancingColor,N.instancingMorph=H.instancingMorph,N.skinning=H.skinning,N.morphTargets=H.morphTargets,N.morphNormals=H.morphNormals,N.morphColors=H.morphColors,N.morphTargetsCount=H.morphTargetsCount,N.numClippingPlanes=H.numClippingPlanes,N.numIntersection=H.numClipIntersection,N.vertexAlphas=H.vertexAlphas,N.vertexTangents=H.vertexTangents,N.toneMapping=H.toneMapping}function wh(y,H,N,F,U){H.isScene!==!0&&(H=Ae),He.resetTextureUnits();const ne=H.fog,le=F.isMeshStandardMaterial?H.environment:null,ge=D===null?_.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:$n,_e=(F.isMeshStandardMaterial?x:b).get(F.envMap||le),we=F.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,Pe=!!N.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),xe=!!N.morphAttributes.position,$e=!!N.morphAttributes.normal,ot=!!N.morphAttributes.color;let ct=kn;F.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(ct=_.toneMapping);const Nt=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,je=Nt!==void 0?Nt.length:0,Me=Te.get(F),St=m.state.lights;if(W===!0&&(Q===!0||y!==A)){const qt=y===A&&F.id===L;Le.setState(F,y,qt)}let Ze=!1;F.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==St.state.version||Me.outputColorSpace!==ge||U.isBatchedMesh&&Me.batching===!1||!U.isBatchedMesh&&Me.batching===!0||U.isBatchedMesh&&Me.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Me.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Me.instancing===!1||!U.isInstancedMesh&&Me.instancing===!0||U.isSkinnedMesh&&Me.skinning===!1||!U.isSkinnedMesh&&Me.skinning===!0||U.isInstancedMesh&&Me.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Me.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Me.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Me.instancingMorph===!1&&U.morphTexture!==null||Me.envMap!==_e||F.fog===!0&&Me.fog!==ne||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==Le.numPlanes||Me.numIntersection!==Le.numIntersection)||Me.vertexAlphas!==we||Me.vertexTangents!==Pe||Me.morphTargets!==xe||Me.morphNormals!==$e||Me.morphColors!==ot||Me.toneMapping!==ct||Me.morphTargetsCount!==je)&&(Ze=!0):(Ze=!0,Me.__version=F.version);let Jt=Me.currentProgram;Ze===!0&&(Jt=ts(F,H,U));let Ai=!1,Ot=!1,Na=!1;const dt=Jt.getUniforms(),Pn=Me.uniforms;if(ve.useProgram(Jt.program)&&(Ai=!0,Ot=!0,Na=!0),F.id!==L&&(L=F.id,Ot=!0),Ai||A!==y){dt.setValue(w,"projectionMatrix",y.projectionMatrix),dt.setValue(w,"viewMatrix",y.matrixWorldInverse);const qt=dt.map.cameraPosition;qt!==void 0&&qt.setValue(w,ce.setFromMatrixPosition(y.matrixWorld)),Xe.logarithmicDepthBuffer&&dt.setValue(w,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&dt.setValue(w,"isOrthographic",y.isOrthographicCamera===!0),A!==y&&(A=y,Ot=!0,Na=!0)}if(U.isSkinnedMesh){dt.setOptional(w,U,"bindMatrix"),dt.setOptional(w,U,"bindMatrixInverse");const qt=U.skeleton;qt&&(qt.boneTexture===null&&qt.computeBoneTexture(),dt.setValue(w,"boneTexture",qt.boneTexture,He))}U.isBatchedMesh&&(dt.setOptional(w,U,"batchingTexture"),dt.setValue(w,"batchingTexture",U._matricesTexture,He),dt.setOptional(w,U,"batchingIdTexture"),dt.setValue(w,"batchingIdTexture",U._indirectTexture,He),dt.setOptional(w,U,"batchingColorTexture"),U._colorsTexture!==null&&dt.setValue(w,"batchingColorTexture",U._colorsTexture,He));const Oa=N.morphAttributes;if((Oa.position!==void 0||Oa.normal!==void 0||Oa.color!==void 0)&&Ge.update(U,N,Jt),(Ot||Me.receiveShadow!==U.receiveShadow)&&(Me.receiveShadow=U.receiveShadow,dt.setValue(w,"receiveShadow",U.receiveShadow)),F.isMeshGouraudMaterial&&F.envMap!==null&&(Pn.envMap.value=_e,Pn.flipEnvMap.value=_e.isCubeTexture&&_e.isRenderTargetTexture===!1?-1:1),F.isMeshStandardMaterial&&F.envMap===null&&H.environment!==null&&(Pn.envMapIntensity.value=H.environmentIntensity),Ot&&(dt.setValue(w,"toneMappingExposure",_.toneMappingExposure),Me.needsLights&&Ph(Pn,Na),ne&&F.fog===!0&&Ee.refreshFogUniforms(Pn,ne),Ee.refreshMaterialUniforms(Pn,F,Y,V,m.state.transmissionRenderTarget[y.id]),qs.upload(w,gl(Me),Pn,He)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(qs.upload(w,gl(Me),Pn,He),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&dt.setValue(w,"center",U.center),dt.setValue(w,"modelViewMatrix",U.modelViewMatrix),dt.setValue(w,"normalMatrix",U.normalMatrix),dt.setValue(w,"modelMatrix",U.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){const qt=F.uniformsGroups;for(let Fa=0,Ch=qt.length;Fa<Ch;Fa++){const vl=qt[Fa];at.update(vl,Jt),at.bind(vl,Jt)}}return Jt}function Ph(y,H){y.ambientLightColor.needsUpdate=H,y.lightProbe.needsUpdate=H,y.directionalLights.needsUpdate=H,y.directionalLightShadows.needsUpdate=H,y.pointLights.needsUpdate=H,y.pointLightShadows.needsUpdate=H,y.spotLights.needsUpdate=H,y.spotLightShadows.needsUpdate=H,y.rectAreaLights.needsUpdate=H,y.hemisphereLights.needsUpdate=H}function Rh(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(y,H,N){Te.get(y.texture).__webglTexture=H,Te.get(y.depthTexture).__webglTexture=N;const F=Te.get(y);F.__hasExternalTextures=!0,F.__autoAllocateDepthBuffer=N===void 0,F.__autoAllocateDepthBuffer||ze.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),F.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,H){const N=Te.get(y);N.__webglFramebuffer=H,N.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(y,H=0,N=0){D=y,C=H,T=N;let F=!0,U=null,ne=!1,le=!1;if(y){const _e=Te.get(y);if(_e.__useDefaultFramebuffer!==void 0)ve.bindFramebuffer(w.FRAMEBUFFER,null),F=!1;else if(_e.__webglFramebuffer===void 0)He.setupRenderTarget(y);else if(_e.__hasExternalTextures)He.rebindTextures(y,Te.get(y.texture).__webglTexture,Te.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const xe=y.depthTexture;if(_e.__boundDepthTexture!==xe){if(xe!==null&&Te.has(xe)&&(y.width!==xe.image.width||y.height!==xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");He.setupDepthRenderbuffer(y)}}const we=y.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(le=!0);const Pe=Te.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Pe[H])?U=Pe[H][N]:U=Pe[H],ne=!0):y.samples>0&&He.useMultisampledRTT(y)===!1?U=Te.get(y).__webglMultisampledFramebuffer:Array.isArray(Pe)?U=Pe[N]:U=Pe,M.copy(y.viewport),R.copy(y.scissor),B=y.scissorTest}else M.copy(ue).multiplyScalar(Y).floor(),R.copy(me).multiplyScalar(Y).floor(),B=Ce;if(ve.bindFramebuffer(w.FRAMEBUFFER,U)&&F&&ve.drawBuffers(y,U),ve.viewport(M),ve.scissor(R),ve.setScissorTest(B),ne){const _e=Te.get(y.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+H,_e.__webglTexture,N)}else if(le){const _e=Te.get(y.texture),we=H||0;w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,_e.__webglTexture,N||0,we)}L=-1},this.readRenderTargetPixels=function(y,H,N,F,U,ne,le){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ge=Te.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&le!==void 0&&(ge=ge[le]),ge){ve.bindFramebuffer(w.FRAMEBUFFER,ge);try{const _e=y.texture,we=_e.format,Pe=_e.type;if(!Xe.textureFormatReadable(we)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xe.textureTypeReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=y.width-F&&N>=0&&N<=y.height-U&&w.readPixels(H,N,F,U,Ie.convert(we),Ie.convert(Pe),ne)}finally{const _e=D!==null?Te.get(D).__webglFramebuffer:null;ve.bindFramebuffer(w.FRAMEBUFFER,_e)}}},this.readRenderTargetPixelsAsync=async function(y,H,N,F,U,ne,le){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ge=Te.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&le!==void 0&&(ge=ge[le]),ge){ve.bindFramebuffer(w.FRAMEBUFFER,ge);try{const _e=y.texture,we=_e.format,Pe=_e.type;if(!Xe.textureFormatReadable(we))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xe.textureTypeReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=y.width-F&&N>=0&&N<=y.height-U){const xe=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,xe),w.bufferData(w.PIXEL_PACK_BUFFER,ne.byteLength,w.STREAM_READ),w.readPixels(H,N,F,U,Ie.convert(we),Ie.convert(Pe),0),w.flush();const $e=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);await Vf(w,$e,4);try{w.bindBuffer(w.PIXEL_PACK_BUFFER,xe),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,ne)}finally{w.deleteBuffer(xe),w.deleteSync($e)}return ne}}finally{const _e=D!==null?Te.get(D).__webglFramebuffer:null;ve.bindFramebuffer(w.FRAMEBUFFER,_e)}}},this.copyFramebufferToTexture=function(y,H=null,N=0){y.isTexture!==!0&&(Qi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,y=arguments[1]);const F=Math.pow(2,-N),U=Math.floor(y.image.width*F),ne=Math.floor(y.image.height*F),le=H!==null?H.x:0,ge=H!==null?H.y:0;He.setTexture2D(y,0),w.copyTexSubImage2D(w.TEXTURE_2D,N,0,0,le,ge,U,ne),ve.unbindTexture()},this.copyTextureToTexture=function(y,H,N=null,F=null,U=0){y.isTexture!==!0&&(Qi("WebGLRenderer: copyTextureToTexture function signature has changed."),F=arguments[0]||null,y=arguments[1],H=arguments[2],U=arguments[3]||0,N=null);let ne,le,ge,_e,we,Pe;N!==null?(ne=N.max.x-N.min.x,le=N.max.y-N.min.y,ge=N.min.x,_e=N.min.y):(ne=y.image.width,le=y.image.height,ge=0,_e=0),F!==null?(we=F.x,Pe=F.y):(we=0,Pe=0);const xe=Ie.convert(H.format),$e=Ie.convert(H.type);He.setTexture2D(H,0),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,H.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,H.unpackAlignment);const ot=w.getParameter(w.UNPACK_ROW_LENGTH),ct=w.getParameter(w.UNPACK_IMAGE_HEIGHT),Nt=w.getParameter(w.UNPACK_SKIP_PIXELS),je=w.getParameter(w.UNPACK_SKIP_ROWS),Me=w.getParameter(w.UNPACK_SKIP_IMAGES),St=y.isCompressedTexture?y.mipmaps[U]:y.image;w.pixelStorei(w.UNPACK_ROW_LENGTH,St.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,St.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,ge),w.pixelStorei(w.UNPACK_SKIP_ROWS,_e),y.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,U,we,Pe,ne,le,xe,$e,St.data):y.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,U,we,Pe,St.width,St.height,xe,St.data):w.texSubImage2D(w.TEXTURE_2D,U,we,Pe,ne,le,xe,$e,St),w.pixelStorei(w.UNPACK_ROW_LENGTH,ot),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,ct),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Nt),w.pixelStorei(w.UNPACK_SKIP_ROWS,je),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Me),U===0&&H.generateMipmaps&&w.generateMipmap(w.TEXTURE_2D),ve.unbindTexture()},this.copyTextureToTexture3D=function(y,H,N=null,F=null,U=0){y.isTexture!==!0&&(Qi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),N=arguments[0]||null,F=arguments[1]||null,y=arguments[2],H=arguments[3],U=arguments[4]||0);let ne,le,ge,_e,we,Pe,xe,$e,ot;const ct=y.isCompressedTexture?y.mipmaps[U]:y.image;N!==null?(ne=N.max.x-N.min.x,le=N.max.y-N.min.y,ge=N.max.z-N.min.z,_e=N.min.x,we=N.min.y,Pe=N.min.z):(ne=ct.width,le=ct.height,ge=ct.depth,_e=0,we=0,Pe=0),F!==null?(xe=F.x,$e=F.y,ot=F.z):(xe=0,$e=0,ot=0);const Nt=Ie.convert(H.format),je=Ie.convert(H.type);let Me;if(H.isData3DTexture)He.setTexture3D(H,0),Me=w.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)He.setTexture2DArray(H,0),Me=w.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,H.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,H.unpackAlignment);const St=w.getParameter(w.UNPACK_ROW_LENGTH),Ze=w.getParameter(w.UNPACK_IMAGE_HEIGHT),Jt=w.getParameter(w.UNPACK_SKIP_PIXELS),Ai=w.getParameter(w.UNPACK_SKIP_ROWS),Ot=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,ct.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,ct.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,_e),w.pixelStorei(w.UNPACK_SKIP_ROWS,we),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Pe),y.isDataTexture||y.isData3DTexture?w.texSubImage3D(Me,U,xe,$e,ot,ne,le,ge,Nt,je,ct.data):H.isCompressedArrayTexture?w.compressedTexSubImage3D(Me,U,xe,$e,ot,ne,le,ge,Nt,ct.data):w.texSubImage3D(Me,U,xe,$e,ot,ne,le,ge,Nt,je,ct),w.pixelStorei(w.UNPACK_ROW_LENGTH,St),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,Ze),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Jt),w.pixelStorei(w.UNPACK_SKIP_ROWS,Ai),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Ot),U===0&&H.generateMipmaps&&w.generateMipmap(Me),ve.unbindTexture()},this.initRenderTarget=function(y){Te.get(y).__webglFramebuffer===void 0&&He.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?He.setTextureCube(y,0):y.isData3DTexture?He.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?He.setTexture2DArray(y,0):He.setTexture2D(y,0),ve.unbindTexture()},this.resetState=function(){C=0,T=0,D=null,ve.reset(),Fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Uc?"display-p3":"srgb",t.unpackColorSpace=Je.workingColorSpace===Sa?"display-p3":"srgb"}}class e_ extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new cn,this.environmentIntensity=1,this.environmentRotation=new cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class t_{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=oc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=An()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Qi("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=An()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=An()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const wt=new P;class na{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=sn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=et(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=sn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=sn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=sn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=sn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),i=et(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),i=et(i,this.array),r=et(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),i=et(i,this.array),r=et(r,this.array),s=et(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Wt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new na(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Gd extends jn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Gi;const xr=new P,Vi=new P,Wi=new P,Xi=new Se,Mr=new Se,Vd=new Qe,As=new P,Sr=new P,Ts=new P,mu=new Se,fo=new Se,gu=new Se;class n_ extends Et{constructor(e=new Gd){if(super(),this.isSprite=!0,this.type="Sprite",Gi===void 0){Gi=new pt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new t_(t,5);Gi.setIndex([0,1,2,0,2,3]),Gi.setAttribute("position",new na(i,3,0,!1)),Gi.setAttribute("uv",new na(i,2,3,!1))}this.geometry=Gi,this.material=e,this.center=new Se(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Vi.setFromMatrixScale(this.matrixWorld),Vd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Wi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Vi.multiplyScalar(-Wi.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const a=this.center;bs(As.set(-.5,-.5,0),Wi,a,Vi,r,s),bs(Sr.set(.5,-.5,0),Wi,a,Vi,r,s),bs(Ts.set(.5,.5,0),Wi,a,Vi,r,s),mu.set(0,0),fo.set(1,0),gu.set(1,1);let o=e.ray.intersectTriangle(As,Sr,Ts,!1,xr);if(o===null&&(bs(Sr.set(-.5,.5,0),Wi,a,Vi,r,s),fo.set(0,1),o=e.ray.intersectTriangle(As,Ts,Sr,!1,xr),o===null))return;const c=e.ray.origin.distanceTo(xr);c<e.near||c>e.far||t.push({distance:c,point:xr.clone(),uv:an.getInterpolation(xr,As,Sr,Ts,mu,fo,gu,new Se),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function bs(n,e,t,i,r,s){Xi.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(Mr.x=s*Xi.x-r*Xi.y,Mr.y=r*Xi.x+s*Xi.y):Mr.copy(Xi),n.copy(e),n.x+=Mr.x,n.y+=Mr.y,n.applyMatrix4(Vd)}class i_ extends yt{constructor(e=null,t=1,i=1,r,s,a,o,c,l=Lt,u=Lt,d,h){super(null,a,o,c,l,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _u extends Wt{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Yi=new Qe,vu=new Qe,Ds=[],xu=new yi,r_=new Qe,yr=new It,Er=new Ei;class s_ extends It{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new _u(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,r_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new yi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Yi),xu.copy(e.boundingBox).applyMatrix4(Yi),this.boundingBox.union(xu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ei),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Yi),Er.copy(e.boundingSphere).applyMatrix4(Yi),this.boundingSphere.union(Er)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(yr.geometry=this.geometry,yr.material=this.material,yr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Er.copy(this.boundingSphere),Er.applyMatrix4(i),e.ray.intersectsSphere(Er)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Yi),vu.multiplyMatrices(i,Yi),yr.matrixWorld=vu,yr.raycast(e,Ds);for(let a=0,o=Ds.length;a<o;a++){const c=Ds[a];c.instanceId=s,c.object=this,t.push(c)}Ds.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new _u(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new i_(new Float32Array(r*this.count),r,this.count,Cc,dn));const s=this.morphTexture.source.data.data;let a=0;for(let l=0;l<i.length;l++)a+=i[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=r*e;s[c]=o,s.set(i,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Aa extends jn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ia=new P,ra=new P,Mu=new Qe,Ar=new ya,ws=new Ei,po=new P,Su=new P;class Bc extends Et{constructor(e=new pt,t=new Aa){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)ia.fromBufferAttribute(t,r-1),ra.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=ia.distanceTo(ra);e.setAttribute("lineDistance",new lt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ws.copy(i.boundingSphere),ws.applyMatrix4(r),ws.radius+=s,e.ray.intersectsSphere(ws)===!1)return;Mu.copy(r).invert(),Ar.copy(e.ray).applyMatrix4(Mu);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=l){const f=u.getX(v),S=u.getX(v+1),_=Ps(this,e,Ar,c,f,S);_&&t.push(_)}if(this.isLineLoop){const v=u.getX(g-1),m=u.getX(p),f=Ps(this,e,Ar,c,v,m);f&&t.push(f)}}else{const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=l){const f=Ps(this,e,Ar,c,v,v+1);f&&t.push(f)}if(this.isLineLoop){const v=Ps(this,e,Ar,c,g-1,p);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ps(n,e,t,i,r,s){const a=n.geometry.attributes.position;if(ia.fromBufferAttribute(a,r),ra.fromBufferAttribute(a,s),t.distanceSqToSegment(ia,ra,po,Su)>i)return;po.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(po);if(!(c<e.near||c>e.far))return{distance:c,point:Su.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,object:n}}const yu=new P,Eu=new P;class Au extends Bc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)yu.fromBufferAttribute(t,r),Eu.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+yu.distanceTo(Eu);e.setAttribute("lineDistance",new lt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class sa extends jn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Tu=new Qe,uc=new ya,Rs=new Ei,Cs=new P;class dc extends Et{constructor(e=new pt,t=new sa){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Rs.copy(i.boundingSphere),Rs.applyMatrix4(r),Rs.radius+=s,e.ray.intersectsSphere(Rs)===!1)return;Tu.copy(r).invert(),uc.copy(e.ray).applyMatrix4(Tu);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,d=i.attributes.position;if(l!==null){const h=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let g=h,v=p;g<v;g++){const m=l.getX(g);Cs.fromBufferAttribute(d,m),bu(Cs,m,c,r,e,t,this)}}else{const h=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let g=h,v=p;g<v;g++)Cs.fromBufferAttribute(d,g),bu(Cs,g,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function bu(n,e,t,i,r,s,a){const o=uc.distanceSqToPoint(n);if(o<t){const c=new P;uc.closestPointToPoint(n,c),c.applyMatrix4(i);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,object:a})}}class Wd extends yt{constructor(e,t,i,r,s,a,o,c,l){super(e,t,i,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class kc extends pt{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],a=[];o(r),l(i),u(),this.setAttribute("position",new lt(s,3)),this.setAttribute("normal",new lt(s.slice(),3)),this.setAttribute("uv",new lt(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(S){const _=new P,E=new P,C=new P;for(let T=0;T<t.length;T+=3)p(t[T+0],_),p(t[T+1],E),p(t[T+2],C),c(_,E,C,S)}function c(S,_,E,C){const T=C+1,D=[];for(let L=0;L<=T;L++){D[L]=[];const A=S.clone().lerp(E,L/T),M=_.clone().lerp(E,L/T),R=T-L;for(let B=0;B<=R;B++)B===0&&L===T?D[L][B]=A:D[L][B]=A.clone().lerp(M,B/R)}for(let L=0;L<T;L++)for(let A=0;A<2*(T-L)-1;A++){const M=Math.floor(A/2);A%2===0?(h(D[L][M+1]),h(D[L+1][M]),h(D[L][M])):(h(D[L][M+1]),h(D[L+1][M+1]),h(D[L+1][M]))}}function l(S){const _=new P;for(let E=0;E<s.length;E+=3)_.x=s[E+0],_.y=s[E+1],_.z=s[E+2],_.normalize().multiplyScalar(S),s[E+0]=_.x,s[E+1]=_.y,s[E+2]=_.z}function u(){const S=new P;for(let _=0;_<s.length;_+=3){S.x=s[_+0],S.y=s[_+1],S.z=s[_+2];const E=m(S)/2/Math.PI+.5,C=f(S)/Math.PI+.5;a.push(E,1-C)}g(),d()}function d(){for(let S=0;S<a.length;S+=6){const _=a[S+0],E=a[S+2],C=a[S+4],T=Math.max(_,E,C),D=Math.min(_,E,C);T>.9&&D<.1&&(_<.2&&(a[S+0]+=1),E<.2&&(a[S+2]+=1),C<.2&&(a[S+4]+=1))}}function h(S){s.push(S.x,S.y,S.z)}function p(S,_){const E=S*3;_.x=e[E+0],_.y=e[E+1],_.z=e[E+2]}function g(){const S=new P,_=new P,E=new P,C=new P,T=new Se,D=new Se,L=new Se;for(let A=0,M=0;A<s.length;A+=9,M+=6){S.set(s[A+0],s[A+1],s[A+2]),_.set(s[A+3],s[A+4],s[A+5]),E.set(s[A+6],s[A+7],s[A+8]),T.set(a[M+0],a[M+1]),D.set(a[M+2],a[M+3]),L.set(a[M+4],a[M+5]),C.copy(S).add(_).add(E).divideScalar(3);const R=m(C);v(T,M+0,S,R),v(D,M+2,_,R),v(L,M+4,E,R)}}function v(S,_,E,C){C<0&&S.x===1&&(a[_]=S.x-1),E.x===0&&E.z===0&&(a[_]=C/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function f(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kc(e.vertices,e.indices,e.radius,e.details)}}class Gc extends kc{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Gc(e.radius,e.detail)}}class aa extends pt{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],c=[],l=[],u=[];let d=e;const h=(t-e)/r,p=new P,g=new Se;for(let v=0;v<=r;v++){for(let m=0;m<=i;m++){const f=s+m/i*a;p.x=d*Math.cos(f),p.y=d*Math.sin(f),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,u.push(g.x,g.y)}d+=h}for(let v=0;v<r;v++){const m=v*(i+1);for(let f=0;f<i;f++){const S=f+m,_=S,E=S+i+1,C=S+i+2,T=S+1;o.push(_,E,T),o.push(E,C,T)}}this.setIndex(o),this.setAttribute("position",new lt(c,3)),this.setAttribute("normal",new lt(l,3)),this.setAttribute("uv",new lt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new aa(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Vc extends pt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const u=[],d=new P,h=new P,p=[],g=[],v=[],m=[];for(let f=0;f<=i;f++){const S=[],_=f/i;let E=0;f===0&&a===0?E=.5/t:f===i&&c===Math.PI&&(E=-.5/t);for(let C=0;C<=t;C++){const T=C/t;d.x=-e*Math.cos(r+T*s)*Math.sin(a+_*o),d.y=e*Math.cos(a+_*o),d.z=e*Math.sin(r+T*s)*Math.sin(a+_*o),g.push(d.x,d.y,d.z),h.copy(d).normalize(),v.push(h.x,h.y,h.z),m.push(T+E,1-_),S.push(l++)}u.push(S)}for(let f=0;f<i;f++)for(let S=0;S<t;S++){const _=u[f][S+1],E=u[f][S],C=u[f+1][S],T=u[f+1][S+1];(f!==0||a>0)&&p.push(_,E,T),(f!==i-1||c<Math.PI)&&p.push(E,C,T)}this.setIndex(p),this.setAttribute("position",new lt(g,3)),this.setAttribute("normal",new lt(v,3)),this.setAttribute("uv",new lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class hc extends jn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Td,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const Du={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class a_{constructor(e,t,i){const r=this;let s=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){const d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){const p=l[d],g=l[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null}}}const o_=new a_;class Wc{constructor(e){this.manager=e!==void 0?e:o_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Wc.DEFAULT_MATERIAL_NAME="__DEFAULT";class c_ extends Wc{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Du.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;const o=Or("img");function c(){u(),Du.add(e,this),t&&t(this),s.manager.itemEnd(e)}function l(d){u(),r&&r(d),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class Xd extends Wc{constructor(e){super(e)}load(e,t,i,r){const s=new yt,a=new c_(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}class Yd extends Et{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const mo=new Qe,wu=new P,Pu=new P;class l_{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Se(512,512),this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fc,this._frameExtents=new Se(1,1),this._viewportCount=1,this._viewports=[new rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;wu.setFromMatrixPosition(e.matrixWorld),t.position.copy(wu),Pu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Pu),t.updateMatrixWorld(),mo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(mo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(mo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ru=new Qe,Tr=new P,go=new P;class u_ extends l_{constructor(){super(new Gt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Se(4,2),this._viewportCount=6,this._viewports=[new rt(2,1,1,1),new rt(0,1,1,1),new rt(3,1,1,1),new rt(1,1,1,1),new rt(3,0,1,1),new rt(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Tr.setFromMatrixPosition(e.matrixWorld),i.position.copy(Tr),go.copy(i.position),go.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(go),i.updateMatrixWorld(),r.makeTranslation(-Tr.x,-Tr.y,-Tr.z),Ru.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ru)}}class d_ extends Yd{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new u_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class h_ extends Yd{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Cu=new Qe;class qd{constructor(e,t,i=0,r=1/0){this.ray=new ya(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Oc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Cu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Cu),this}intersectObject(e,t=!0,i=[]){return fc(e,this,i,t),i.sort(Iu),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)fc(e[r],this,i,t);return i.sort(Iu),i}}function Iu(n,e){return n.distance-e.distance}function fc(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)fc(s[a],e,t,!0)}}class f_ extends Si{constructor(e,t){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Dc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Dc);const tr=Date.UTC(2e3,0,1,12,0,0),On=36525,Dn=1495978707e-1;class p_{days;logMag=0;reversed=!1;paused=!1;constructor(e=Date.now()){this.days=(e-tr)/864e5}get t(){return this.days}setDate(e){const t=e instanceof Date?e.getTime():e;this.days=(t-tr)/864e5}getSpeed(){return(this.reversed?-1:1)*10**this.logMag}setLogSpeed(e){this.logMag=e}get isReversed(){return this.reversed}setReversed(e){this.reversed=e}get isPaused(){return this.paused}setPaused(e){this.paused=e}tick(e){this.paused||(this.days+=this.getSpeed()*e)}toDate(){return new Date(tr+this.days*864e5)}}const oe=n=>[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255],Xc={id:"sun",name:"Sun",kind:"star",radiusKm:695700,rotationHours:609.12,tiltDeg:7.25,color:oe(16765567),color2:oe(16751935),texture:"sun"},kt=[{id:"mercury",name:"Mercury",kind:"planet",parent:"sun",elements:{a:.38709843,e:.20563661,i:7.00559432,node:48.33961819,peri:29.118100759999997,M0:174.79394829,n:4.09233444,rates:{a:0,e:2123e-8,i:-.00590158,node:-.12214182,peri:.28154195}},radiusKm:2439.7,rotationHours:1407.5,tiltDeg:.034,color:oe(10263708),color2:oe(7828591),texture:"rock"},{id:"venus",name:"Venus",kind:"planet",parent:"sun",elements:{a:.72332102,e:.00676399,i:3.39777545,node:76.67261496,peri:55.094942169999996,M0:50.21215136999999,n:1.60212892,rates:{a:-26e-8,e:-5107e-8,i:43494e-8,node:-.27274174,peri:.32953822}},radiusKm:6051.8,rotationHours:-5832.5,tiltDeg:177.36,color:oe(15124874),color2:oe(13215850),texture:"gas"},{id:"earth",name:"Earth",kind:"planet",parent:"sun",elements:{a:1.00000018,e:.01673163,i:-54346e-8,node:-5.11260389,peri:108.04266274,M0:-2.4631431299999917,n:.98560041,rates:{a:-3e-8,e:-3661e-8,i:-.01337178,node:-.24123856,peri:.5591911599999999}},radiusKm:6371,rotationHours:23.93,tiltDeg:23.44,color:oe(5211846),color2:oe(4160831),texture:"earth"},{id:"mars",name:"Mars",kind:"planet",parent:"sun",elements:{a:1.52371243,e:.09336511,i:1.85181869,node:49.71320984,peri:-73.63065768,M0:19.3493162,n:.52402045,rates:{a:97e-8,e:9149e-8,i:-.00724757,node:-.26852431,peri:.72076056}},radiusKm:3389.5,rotationHours:24.62,tiltDeg:25.19,color:oe(12671035),color2:oe(9387304),texture:"rock"},{id:"jupiter",name:"Jupiter",kind:"planet",parent:"sun",elements:{a:5.20248019,e:.0485359,i:1.29861416,node:100.29282654,peri:-86.0178741,M0:20.059839080000003,n:.08308615,rates:{a:-2864e-8,e:18026e-8,i:-.00322699,node:.13024619,peri:.051745769999999996},periodicM:[{b:-12452e-8,c:.0606406,s:-.35635438,f:38.35125}]},radiusKm:69911,rotationHours:9.93,tiltDeg:3.13,color:oe(14203277),color2:oe(11041872),texture:"gas"},{id:"saturn",name:"Saturn",kind:"planet",parent:"sun",elements:{a:9.54149883,e:.05550825,i:2.49424102,node:113.63998702,peri:-20.778626390000014,M0:-42.78564733999999,n:.03344485,rates:{a:-3065e-8,e:-32044e-8,i:.00451969,node:-.25015002,peri:.7919448},periodicM:[{b:25899e-8,c:-.13434469,s:.87320147,f:38.35125}]},radiusKm:58232,rotationHours:10.66,tiltDeg:26.73,color:oe(14930851),color2:oe(12560250),texture:"gas",rings:{inner:1.24,outer:2.27,opacity:.85,color:oe(13616294)}},{id:"uranus",name:"Uranus",kind:"planet",parent:"sun",elements:{a:19.18797948,e:.0468574,i:.77298127,node:73.96250215,peri:98.47154226,M0:141.76872184,n:.01172902,rates:{a:-20455e-8,e:-155e-7,i:-.00180155,node:.05739699,peri:.035272859999999996},periodicM:[{b:58331e-8,c:-.97731848,s:.17689245,f:7.67025}]},radiusKm:25362,rotationHours:-17.24,tiltDeg:97.77,color:oe(10475744),color2:oe(8176332),texture:"ice",rings:{inner:1.64,outer:2,opacity:.25,color:oe(10467520)}},{id:"neptune",name:"Neptune",kind:"planet",parent:"sun",elements:{a:30.06952752,e:.00895439,i:1.7700552,node:131.78635853,peri:-85.10477129,M0:257.54130563,n:.00598097,rates:{a:6447e-8,e:818e-8,i:224e-6,node:-.00606302,peri:.0161624},periodicM:[{b:-41348e-8,c:.68346318,s:-.10162547,f:7.67025}]},radiusKm:24622,rotationHours:16.11,tiltDeg:28.32,color:oe(4613833),color2:oe(3099294),texture:"ice"}],m_=[{id:"pluto",name:"Pluto",kind:"dwarf",parent:"sun",elements:{a:39.48211675,e:.2488273,i:17.14,node:110.299,peri:113.834,M0:14.53,n:.003964},radiusKm:1188.3,rotationHours:-153.29,tiltDeg:119.6,color:oe(12101268),color2:oe(9404270),texture:"rock"},{id:"ceres",name:"Ceres",kind:"dwarf",parent:"sun",elements:{a:2.7675,e:.0758,i:10.594,node:80.305,peri:73.597,M0:32.84,n:.21426},radiusKm:469.7,rotationHours:9.07,tiltDeg:3.8,color:oe(9211020),color2:oe(6974058),texture:"rock"},{id:"eris",name:"Eris",kind:"dwarf",parent:"sun",elements:{a:67.864,e:.436,i:44.04,node:35.95,peri:151.61,M0:235.7,n:.001763},radiusKm:1163,rotationHours:25.9,tiltDeg:26.6,color:oe(12895428),color2:oe(10132122),texture:"ice"},{id:"haumea",name:"Haumea",kind:"dwarf",parent:"sun",elements:{a:43.11,e:.1948,i:28.26,node:122.29,peri:239.75,M0:202.4,n:.003482},radiusKm:745,rotationHours:15.94,tiltDeg:0,color:oe(14210252),color2:oe(11052188),texture:"ice"},{id:"makemake",name:"Makemake",kind:"dwarf",parent:"sun",elements:{a:45.43,e:.1611,i:29,node:79.35,peri:294.2,M0:16.2,n:.003219},radiusKm:715,rotationHours:22.8,tiltDeg:0,color:oe(12884600),color2:oe(10122328),texture:"ice"}],Yc=[{id:"moon",name:"Moon",kind:"moon",parent:"earth",elements:{a:384400,e:.0549,i:5.145,node:125.08,peri:318.15,M0:115.36,n:13.17635},radiusKm:1737.4,rotationHours:655.72,tiltDeg:6.68,color:oe(12434877),color2:oe(9408399),texture:"rock"},{id:"phobos",name:"Phobos",kind:"moon",parent:"mars",elements:{a:9376,e:.0151,i:1.075,node:318.7,peri:260,M0:140,n:1128.96},radiusKm:11.27,rotationHours:7.65,tiltDeg:1.08,color:oe(9076594),texture:"rock"},{id:"deimos",name:"Deimos",kind:"moon",parent:"mars",elements:{a:23460,e:3e-4,i:1.796,node:104.4,peri:305.6,M0:180,n:285.16},radiusKm:6.2,rotationHours:30.3,tiltDeg:1.78,color:oe(10260612),texture:"rock"},{id:"io",name:"Io",kind:"moon",parent:"jupiter",elements:{a:421700,e:.0041,i:.04,node:150.8,peri:137.3,M0:100,n:203.494},radiusKm:1821.6,rotationHours:42.46,tiltDeg:.05,color:oe(14271850),color2:oe(12092987),texture:"volcanic"},{id:"europa",name:"Europa",kind:"moon",parent:"jupiter",elements:{a:671100,e:.009,i:.47,node:124.8,peri:160.4,M0:100,n:101.375},radiusKm:1560.8,rotationHours:43.45,tiltDeg:.47,color:oe(13616302),color2:oe(10521976),texture:"ice"},{id:"ganymede",name:"Ganymede",kind:"moon",parent:"jupiter",elements:{a:1070400,e:.0013,i:.2,node:197,peri:118.5,M0:105,n:50.318},radiusKm:2634.1,rotationHours:71.94,tiltDeg:.2,color:oe(11050124),color2:oe(8221800),texture:"rock"},{id:"callisto",name:"Callisto",kind:"moon",parent:"jupiter",elements:{a:1882700,e:.0074,i:.19,node:308.5,peri:332.5,M0:35,n:21.57},radiusKm:2410.3,rotationHours:89.56,tiltDeg:.19,color:oe(8221800),color2:oe(6051405),texture:"rock"},{id:"titan",name:"Titan",kind:"moon",parent:"saturn",elements:{a:1221870,e:.0288,i:.35,node:125.8,peri:346.8,M0:100,n:22.577},radiusKm:2574.7,rotationHours:15.94,tiltDeg:.35,color:oe(14068058),color2:oe(11042364),texture:"gas"},{id:"triton",name:"Triton",kind:"moon",parent:"neptune",elements:{a:354759,e:16e-6,i:156.74,node:47.4,peri:5.4,M0:145,n:61.256},radiusKm:1353.4,rotationHours:-5.88,tiltDeg:156.74,color:oe(13156270),color2:oe(10261636),texture:"ice"},{id:"amalthea",name:"Amalthea",kind:"moon",parent:"jupiter",elements:{a:181353,e:.0761,i:.32,node:206.9,peri:271.2,M0:200,n:722.57},radiusKm:85.5,rotationHours:11.96,tiltDeg:.32,color:oe(9062970),color2:oe(7223852),texture:"rock"},{id:"himalia",name:"Himalia",kind:"moon",parent:"jupiter",elements:{a:11509150,e:.1137,i:28.57,node:96.9,peri:186,M0:100,n:2.131},radiusKm:85,rotationHours:382.7,tiltDeg:28.57,color:oe(9209984),color2:oe(6973024),texture:"rock"},{id:"enceladus",name:"Enceladus",kind:"moon",parent:"saturn",elements:{a:237948,e:.0047,i:.01,node:272.9,peri:130.8,M0:200,n:262.74},radiusKm:252.1,rotationHours:32.89,tiltDeg:.01,color:oe(15266034),color2:oe(12899544),texture:"ice"},{id:"tethys",name:"Tethys",kind:"moon",parent:"saturn",elements:{a:294600,e:1e-4,i:1.09,node:127,peri:193.8,M0:90,n:225.87},radiusKm:531.1,rotationHours:38.25,tiltDeg:1.09,color:oe(14210248),color2:oe(11841700),texture:"ice"},{id:"dione",name:"Dione",kind:"moon",parent:"saturn",elements:{a:377300,e:.0022,i:.02,node:117.3,peri:127.4,M0:200,n:131.53},radiusKm:561.4,rotationHours:65.69,tiltDeg:.02,color:oe(12631216),color2:oe(10262668),texture:"ice"},{id:"rhea",name:"Rhea",kind:"moon",parent:"saturn",elements:{a:527108,e:.0013,i:.35,node:250.4,peri:130.1,M0:100,n:79.68},radiusKm:763.8,rotationHours:108.44,tiltDeg:.35,color:oe(11578528),color2:oe(9209984),texture:"ice"},{id:"iapetus",name:"Iapetus",kind:"moon",parent:"saturn",elements:{a:3560820,e:.0286,i:15.47,node:213.9,peri:198.1,M0:200,n:4.54},radiusKm:734.5,rotationHours:1903.7,tiltDeg:15.47,color:oe(10127992),color2:oe(5129272),texture:"rock"},{id:"miranda",name:"Miranda",kind:"moon",parent:"uranus",elements:{a:129390,e:.0013,i:.1,node:180.9,peri:222.9,M0:100,n:254.69},radiusKm:235.8,rotationHours:33.92,tiltDeg:.1,color:oe(11052188),color2:oe(8683642),texture:"rock"},{id:"ariel",name:"Ariel",kind:"moon",parent:"uranus",elements:{a:190900,e:.0012,i:.26,node:169.5,peri:294.9,M0:100,n:142.86},radiusKm:578.9,rotationHours:60.48,tiltDeg:.26,color:oe(12631214),color2:oe(10263182),texture:"ice"},{id:"umbriel",name:"Umbriel",kind:"moon",parent:"uranus",elements:{a:266e3,e:.0039,i:.13,node:133.3,peri:250.7,M0:100,n:86.87},radiusKm:584.7,rotationHours:99.46,tiltDeg:.13,color:oe(7236196),color2:oe(5525578),texture:"ice"},{id:"titania",name:"Titania",kind:"moon",parent:"uranus",elements:{a:435910,e:.0011,i:.34,node:98.7,peri:290.8,M0:100,n:41.35},radiusKm:788.4,rotationHours:208.9,tiltDeg:.34,color:oe(10262156),color2:oe(8025194),texture:"ice"},{id:"oberon",name:"Oberon",kind:"moon",parent:"uranus",elements:{a:583520,e:8e-4,i:.06,node:79.3,peri:70.6,M0:100,n:26.75},radiusKm:761.4,rotationHours:323,tiltDeg:.06,color:oe(8946298),color2:oe(6709338),texture:"ice"},{id:"nereid",name:"Nereid",kind:"moon",parent:"neptune",elements:{a:5513700,e:.7482,i:7.31,node:130,peri:5.2,M0:100,n:1.1731},radiusKm:170,rotationHours:5.2,tiltDeg:7.31,color:oe(9472120),color2:oe(6972504),texture:"rock"}],Kr=[Xc,...kt,...m_,...Yc],g_={sun:["solar","star"],moon:["luna","earth moon","the moon"],mercury:["mercury"],venus:["venus","morning star"],earth:["earth","world"],mars:["mars"],jupiter:["jupiter"],saturn:["saturn"],uranus:["uranus"],neptune:["neptune"],pluto:["pluto"],ceres:["ceres"],eris:["eris"],haumea:["haumea"],makemake:["makemake"]};function Kd(n){const e=[],t=new Set,i=r=>r.name;for(const r of n)if(r.kind!=="moon"){if(r.kind==="star"){e.push({id:r.id,name:i(r),kind:r.kind,sub:"the star"}),t.add(r.id);continue}if(r.kind!=="dwarf"){e.push({id:r.id,name:i(r),kind:r.kind,sub:"planet"}),t.add(r.id);for(const s of n)s.kind!=="moon"||s.parent!==r.id||(e.push({id:s.id,name:i(s),kind:"moon",parentName:i(r),sub:`moon of ${i(r)}`}),t.add(s.id))}}for(const r of n)r.kind==="dwarf"&&!t.has(r.id)&&(e.push({id:r.id,name:i(r),kind:r.kind,parentName:"sun",sub:"dwarf planet"}),t.add(r.id));return e}const $t=n=>n.toLowerCase().trim().replace(/\s+/g," ");function __(n,e,t){const i=new Set;i.add($t(e.name)),i.add($t(e.kind));for(const r of g_[n]??[])i.add($t(r));return t&&(i.add($t(t)),i.add($t(`${e.kind} of ${t}`)),i.add($t(`${t} ${e.kind}`))),[...i]}function v_(n,e,t,i){const r=__(n,e,i);let s=-1;if(t===$t(e.name))s=100;else if($t(e.name).startsWith(t))s=80;else if($t(e.name).includes(t))s=60;else{for(const a of r)if(a.includes(t)){s=a===t?70:40;break}if(s<0)return-1}return i&&$t(i).includes(t)&&(s+=10),s-=$t(e.name).length/4,s}function x_(n,e){const t=$t(e),i=Kd(n);return t?i.map(s=>({e:s,s:v_(s.id,s,t,s.parentName)})).filter(s=>s.s>=0).sort((s,a)=>a.s-s.s||s.e.name.localeCompare(a.e.name)).map(s=>({id:s.e.id,name:s.e.name,kind:s.e.kind,parentName:s.e.parentName})):i.map(s=>({id:s.id,name:s.name,kind:s.kind,parentName:s.parentName}))}function Ta(n,e){const t=Math.PI/180,i=n*15*t,r=e*t,s=Math.cos(r),a=s*Math.cos(i),o=s*Math.sin(i),c=Math.sin(r);return[-a,c,-o]}const Dt=[{name:"Andromeda",stars:[{name:"Alpheratz",raHours:.1398,decDeg:29.0908},{name:"HIP 3092",raHours:.6554,decDeg:30.8612},{name:"Mirach",raHours:1.1622,decDeg:35.6208},{name:"Almach",raHours:2.065,decDeg:42.3298},{name:"Alfarasalkamil",raHours:23.032,decDeg:42.326},{name:"Rasalnaqa",raHours:23.6356,decDeg:43.2681},{name:"Kaffalmusalsala",raHours:23.6735,decDeg:44.334},{name:"Udkadua",raHours:23.626,decDeg:46.4592},{name:"HIP 2912",raHours:.6147,decDeg:33.7194},{name:"HIP 4436",raHours:.9459,decDeg:38.4993},{name:"HIP 3881",raHours:.8302,decDeg:41.079},{name:"Junnanmen",raHours:1.1584,decDeg:47.2418},{name:"Nembus",raHours:1.6332,decDeg:48.6285},{name:"HIP 3031",raHours:.6426,decDeg:29.3124},{name:"Shimu",raHours:.789,decDeg:24.2674},{name:"Kui",raHours:.9535,decDeg:23.4178}],lines:[[0,1],[1,2],[2,3],[4,5],[5,6],[6,7],[5,8],[8,1],[8,2],[2,9],[9,10],[10,11],[11,12],[1,13],[13,14],[14,15]]},{name:"Antlia",stars:[{name:"HIP 53502",raHours:10.9453,decDeg:-37.1375},{name:"HIP 51172",raHours:10.4525,decDeg:-31.0678},{name:"HIP 46515",raHours:9.4874,decDeg:-35.9513}],lines:[[0,1],[1,2]]},{name:"Apus",stars:[{name:"Paradys",raHours:14.7977,decDeg:-79.0447},{name:"HIP 81065",raHours:16.5576,decDeg:-78.897},{name:"HIP 80047",raHours:16.3391,decDeg:-78.6957},{name:"HIP 81852",raHours:16.7182,decDeg:-77.5166}],lines:[[0,1],[2,3],[3,1]]},{name:"Aquarius",stars:[{name:"Albali",raHours:20.7946,decDeg:-9.4957},{name:"Sadalsuud",raHours:21.526,decDeg:-5.5712},{name:"Sadalmelik",raHours:22.0964,decDeg:-.3198},{name:"Sadachbia",raHours:22.3609,decDeg:-1.3874},{name:"Sadaltager",raHours:22.4805,decDeg:-.0201},{name:"HIP 111497",raHours:22.5893,decDeg:-.1174},{name:"Seat",raHours:22.4213,decDeg:1.3774},{name:"HIP 109139",raHours:22.1073,decDeg:-13.8695},{name:"Ancha",raHours:22.2805,decDeg:-7.7832},{name:"Hydor",raHours:22.8769,decDeg:-7.5797},{name:"HIP 114724",raHours:23.2387,decDeg:-6.0485},{name:"HIP 115033",raHours:23.2984,decDeg:-9.1825},{name:"HIP 115438",raHours:23.3829,decDeg:-20.1003},{name:"Safina",raHours:23.1574,decDeg:-21.1725},{name:"Skat",raHours:22.9108,decDeg:-15.8208},{name:"HIP 112716",raHours:22.8265,decDeg:-13.5925}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[4,6],[6,2],[7,1],[2,8],[8,9],[9,10],[10,11],[11,12],[11,13],[11,14],[14,15],[15,9]]},{name:"Aquila",stars:[{name:"Alshain",raHours:19.9219,decDeg:6.4079},{name:"Altair",raHours:19.8463,decDeg:8.8674},{name:"Tarazed",raHours:19.771,decDeg:10.6133},{name:"Almizan I",raHours:19.4249,decDeg:3.1146},{name:"Al Thalimain Prior",raHours:19.1042,decDeg:-4.8823},{name:"Okab",raHours:19.0902,decDeg:13.8637},{name:"Almizan II",raHours:19.8745,decDeg:1.0057},{name:"Almizan III",raHours:20.1884,decDeg:-.8215},{name:"Deneb al Okab Borealis",raHours:18.9937,decDeg:15.0685},{name:"HIP 93429",raHours:19.028,decDeg:-5.739},{name:"Al Thalimain Posterior",raHours:19.612,decDeg:-1.2866}],lines:[[0,1],[1,2],[2,3],[3,4],[3,5],[3,6],[6,7],[8,5],[4,9],[7,10],[10,4],[4,5]]},{name:"Ara",stars:[{name:"HIP 85267",raHours:17.4232,decDeg:-56.3777},{name:"HIP 85727",raHours:17.5183,decDeg:-60.6836},{name:"HIP 82363",raHours:16.8298,decDeg:-59.0413},{name:"HIP 83081",raHours:16.977,decDeg:-55.9901},{name:"HIP 83153",raHours:16.9931,decDeg:-53.1605},{name:"HIP 85792",raHours:17.5307,decDeg:-49.876},{name:"HIP 88714",raHours:18.1105,decDeg:-50.0915},{name:"HIP 85258",raHours:17.4217,decDeg:-55.5298}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[5,7]]},{name:"Aries",stars:[{name:"Mesarthim",raHours:1.8922,decDeg:19.2941},{name:"Sheratan",raHours:1.9107,decDeg:20.8083},{name:"Hamal",raHours:2.1195,decDeg:23.4628},{name:"Bharani",raHours:2.8331,decDeg:27.2608}],lines:[[0,1],[1,2],[2,3]]},{name:"Auriga",stars:[{name:"Elnath",raHours:5.4382,decDeg:28.6079},{name:"Hassaleh",raHours:4.9499,decDeg:33.1661},{name:"Haedus",raHours:5.1086,decDeg:41.2346},{name:"Capella",raHours:5.2781,decDeg:45.999},{name:"Menkalinan",raHours:5.9922,decDeg:44.9474},{name:"Mahasim",raHours:5.9953,decDeg:37.2128},{name:"Saclateni",raHours:5.0413,decDeg:41.0759},{name:"Almaaz",raHours:5.0328,decDeg:43.8233},{name:"Prijipati",raHours:5.9921,decDeg:54.285}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[2,6],[6,7],[7,3],[3,8],[8,4]]},{name:"Boötes",stars:[{name:"Arcturus",raHours:14.2612,decDeg:19.1873},{name:"Izar",raHours:14.7498,decDeg:27.0742},{name:"Thiba",raHours:15.2584,decDeg:33.3151},{name:"Nekkar",raHours:15.0324,decDeg:40.3906},{name:"Seginus",raHours:14.5347,decDeg:38.3079},{name:"Kalasungsang",raHours:14.5305,decDeg:30.3711},{name:"Muphrid",raHours:13.9114,decDeg:18.3986},{name:"Tepiamenit",raHours:13.7878,decDeg:17.4568},{name:"HIP 71795",raHours:14.6858,decDeg:13.7283},{name:"Xuange",raHours:14.2731,decDeg:46.0879},{name:"First Donkey",raHours:14.42,decDeg:51.8517},{name:"Asellus Tertius",raHours:14.2247,decDeg:51.79}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,6],[6,7],[0,8],[4,9],[9,10],[10,11],[11,9]]},{name:"Caelum",stars:[{name:"HIP 23595",raHours:5.0734,decDeg:-35.4829},{name:"HIP 21861",raHours:4.701,decDeg:-37.1448},{name:"HIP 21770",raHours:4.6761,decDeg:-41.8636},{name:"HIP 21060",raHours:4.5139,decDeg:-44.9537}],lines:[[0,1],[1,2],[2,3]]},{name:"Camelopardalis",stars:[{name:"HIP 23040",raHours:4.9548,decDeg:53.7521},{name:"HIP 23522",raHours:5.057,decDeg:60.4423},{name:"HIP 22783",raHours:4.9008,decDeg:66.3427},{name:"Shangwei",raHours:6.3141,decDeg:69.32},{name:"Tonglingxing",raHours:7.0011,decDeg:76.9774},{name:"Shaowei",raHours:3.8393,decDeg:71.3324},{name:"Custos",raHours:3.8254,decDeg:65.526},{name:"HIP 16228",raHours:3.4845,decDeg:59.9403}],lines:[[0,1],[1,2],[2,3],[3,4],[2,5],[5,6],[6,7]]},{name:"Cancer",stars:[{name:"Acubens",raHours:8.9748,decDeg:11.8578},{name:"Asellus Australis",raHours:8.7448,decDeg:18.1549},{name:"Tarf",raHours:8.2753,decDeg:9.1857},{name:"Asellus Borealis",raHours:8.7214,decDeg:21.4686},{name:"Zubanah",raHours:8.7783,decDeg:28.76}],lines:[[0,1],[1,2],[1,3],[3,4]]},{name:"Canes Venatici",stars:[{name:"Cor Caroli",raHours:12.9338,decDeg:38.3182},{name:"Chara",raHours:12.5625,decDeg:41.3568}],lines:[[0,1]]},{name:"Canis Major",stars:[{name:"Mirzam",raHours:6.3783,decDeg:-17.9559},{name:"Sirius",raHours:6.7526,decDeg:-16.7131},{name:"Wezen",raHours:7.1399,decDeg:-26.3932},{name:"Adhara",raHours:6.9771,decDeg:-28.9721},{name:"Aludra",raHours:7.4016,decDeg:-29.3031},{name:"HIP 31592",raHours:6.6114,decDeg:-19.2557},{name:"Udra",raHours:6.9022,decDeg:-24.1842},{name:"HIP 33347",raHours:6.9356,decDeg:-17.0542},{name:"Muliphein",raHours:7.0626,decDeg:-15.6333},{name:"HIP 33160",raHours:6.9032,decDeg:-12.0386}],lines:[[0,1],[1,2],[2,3],[2,4],[0,5],[5,6],[6,3],[1,7],[7,8],[8,9],[9,7]]},{name:"Canis Minor",stars:[{name:"Procyon",raHours:7.6551,decDeg:5.2275},{name:"Gomeisa",raHours:7.4525,decDeg:8.2894}],lines:[[0,1]]},{name:"Capricornus",stars:[{name:"Algedi",raHours:20.3009,decDeg:-12.5449},{name:"Dabih",raHours:20.3502,decDeg:-14.7814},{name:"HIP 102485",raHours:20.7683,decDeg:-25.2705},{name:"HIP 102978",raHours:20.8637,decDeg:-26.9191},{name:"HIP 105881",raHours:21.4445,decDeg:-22.4114},{name:"HIP 106723",raHours:21.618,decDeg:-19.466},{name:"Deneb Algedi",raHours:21.784,decDeg:-16.1266},{name:"Nashira",raHours:21.6682,decDeg:-16.6623},{name:"Udang",raHours:21.0991,decDeg:-17.2327}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,0]]},{name:"Carina",stars:[{name:"Canopus",raHours:6.3992,decDeg:-52.6957},{name:"Miaplacidus",raHours:9.2201,decDeg:-69.7175},{name:"HIP 50099",raHours:10.229,decDeg:-70.0379},{name:"HIP 52419",raHours:10.716,decDeg:-64.3945},{name:"HIP 51576",raHours:10.5337,decDeg:-61.6854},{name:"HIP 50371",raHours:10.2847,decDeg:-61.3323},{name:"Aspidiske",raHours:9.2848,decDeg:-59.2753},{name:"Alsephina",raHours:8.7451,decDeg:-54.7086},{name:"HIP 53253",raHours:10.8915,decDeg:-58.8533},{name:"HIP 54301",raHours:11.109,decDeg:-62.4241},{name:"HIP 54751",raHours:11.21,decDeg:-60.3176},{name:"HIP 54463",raHours:11.1432,decDeg:-58.975},{name:"Avior",raHours:8.3752,decDeg:-59.5095},{name:"HIP 38827",raHours:7.9463,decDeg:-52.9824},{name:"Regor",raHours:8.1589,decDeg:-47.3366}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[4,8],[3,9],[9,10],[10,11],[11,8],[6,12],[12,13],[13,14]]},{name:"Cassiopeia",stars:[{name:"Caph",raHours:.1528,decDeg:59.1502},{name:"Schedar",raHours:.6751,decDeg:56.5374},{name:"Navi",raHours:.9451,decDeg:60.7167},{name:"Ruchbah",raHours:1.4302,decDeg:60.2354},{name:"Segin",raHours:1.9066,decDeg:63.6701}],lines:[[0,1],[1,2],[2,3],[3,4]]},{name:"Centaurus",stars:[{name:"Muhlifain",raHours:12.692,decDeg:-48.9599},{name:"HIP 66657",raHours:13.6648,decDeg:-53.4664},{name:"Hadar",raHours:14.0637,decDeg:-60.373},{name:"Rigil Kentaurus",raHours:14.6614,decDeg:-60.8351},{name:"Alnair",raHours:13.9257,decDeg:-47.2883},{name:"HIP 68282",raHours:13.978,decDeg:-44.8035},{name:"HIP 68245",raHours:13.9712,decDeg:-42.1007},{name:"HIP 71352",raHours:14.5918,decDeg:-42.1577},{name:"HIP 68862",raHours:14.1008,decDeg:-41.1796},{name:"HIP 70090",raHours:14.3426,decDeg:-37.8853},{name:"Menkent",raHours:14.1115,decDeg:-36.3687},{name:"Heng",raHours:13.8251,decDeg:-41.6877},{name:"HIP 55425",raHours:11.3501,decDeg:-54.491},{name:"HIP 59196",raHours:12.1393,decDeg:-50.7224},{name:"HIP 60823",raHours:12.4673,decDeg:-50.2306},{name:"HIP 59449",raHours:12.1942,decDeg:-52.3684},{name:"HIP 56243",raHours:11.5295,decDeg:-59.4421},{name:"HIP 65936",raHours:13.5174,decDeg:-39.4073},{name:"Kulou",raHours:13.3434,decDeg:-36.7121},{name:"HIP 61789",raHours:12.6646,decDeg:-39.9872},{name:"HIP 73334",raHours:14.986,decDeg:-42.1041}],lines:[[0,1],[1,2],[2,3],[1,4],[4,0],[4,5],[5,6],[6,7],[6,8],[8,9],[9,10],[10,11],[11,4],[12,13],[13,14],[14,0],[14,15],[15,16],[11,17],[17,18],[18,19],[7,20]]},{name:"Cepheus",stars:[{name:"Kabalfird",raHours:20.7548,decDeg:61.8368},{name:"Alderamin",raHours:21.3096,decDeg:62.5855},{name:"Alfirk",raHours:21.4777,decDeg:70.5607},{name:"HIP 112724",raHours:22.828,decDeg:66.2007},{name:"Errai",raHours:23.6558,decDeg:77.632},{name:"HIP 110991",raHours:22.4862,decDeg:58.4152},{name:"HIP 109492",raHours:22.1809,decDeg:58.2012},{name:"HIP 109857",raHours:22.2505,decDeg:57.0435},{name:"The Garnet Star",raHours:21.7251,decDeg:58.7801},{name:"Al Kidr",raHours:20.493,decDeg:62.9941}],lines:[[0,1],[1,2],[2,3],[2,4],[4,3],[3,5],[5,6],[6,7],[7,8],[8,1],[9,0]]},{name:"Cetus",stars:[{name:"Kaffaljidhma",raHours:2.7217,decDeg:3.2362},{name:"Menkar",raHours:3.038,decDeg:4.0899},{name:"Menkar (13954)",raHours:2.9952,decDeg:8.9074},{name:"Al Kaff al Jidhmah IV",raHours:2.749,decDeg:10.1142},{name:"Al Kaff al Jidhmah II",raHours:2.4693,decDeg:8.4601},{name:"Al Kaff al Jidhmah III",raHours:2.658,decDeg:.3285},{name:"Mira",raHours:2.3224,decDeg:-2.9771},{name:"Baten Kaitos",raHours:1.8577,decDeg:-10.3349},{name:"Al Naymat II",raHours:1.7348,decDeg:-15.9396},{name:"Diphda",raHours:.7265,decDeg:-17.9867},{name:"Deneb Kaitos Shemali",raHours:.3238,decDeg:-8.8238},{name:"Dheneb",raHours:1.1431,decDeg:-10.1819},{name:"Al Naymat I",raHours:1.4004,decDeg:-8.1828}],lines:[[0,1],[1,2],[2,3],[3,4],[4,0],[0,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,7]]},{name:"Chamaeleon",stars:[{name:"HIP 40702",raHours:8.3087,decDeg:-76.92},{name:"HIP 51839",raHours:10.5912,decDeg:-78.6078},{name:"HIP 52633",raHours:10.7631,decDeg:-80.5402},{name:"HIP 60000",raHours:12.3058,decDeg:-79.3123},{name:"HIP 58484",raHours:11.9938,decDeg:-78.2218}],lines:[[0,1],[1,2],[2,3],[3,4],[4,1]]},{name:"Circinus",stars:[{name:"HIP 74824",raHours:15.2919,decDeg:-58.8009},{name:"Xami",raHours:14.7085,decDeg:-64.9746},{name:"HIP 75323",raHours:15.3896,decDeg:-59.3207}],lines:[[0,1],[1,2]]},{name:"Columba",stars:[{name:"Phact",raHours:5.6608,decDeg:-34.074},{name:"Wazn",raHours:5.8493,decDeg:-35.7693},{name:"HIP 25859",raHours:5.5202,decDeg:-35.4704},{name:"HIP 28328",raHours:5.9858,decDeg:-42.8151},{name:"HIP 28199",raHours:5.9589,decDeg:-35.2833},{name:"HIP 30277",raHours:6.3686,decDeg:-33.4363}],lines:[[0,1],[2,0],[3,1],[1,4],[4,5]]},{name:"Coma Berenices",stars:[{name:"Diadem",raHours:13.1665,decDeg:17.5291},{name:"HIP 64394",raHours:13.198,decDeg:27.876},{name:"Al Dafirah",raHours:12.449,decDeg:28.2686}],lines:[[0,1],[1,2]]},{name:"Corona Australis",stars:[{name:"HIP 93825",raHours:19.107,decDeg:-37.0628},{name:"Meridiana",raHours:19.1579,decDeg:-37.9042},{name:"HIP 94160",raHours:19.1672,decDeg:-39.3407},{name:"HIP 94005",raHours:19.1391,decDeg:-40.4966},{name:"HIP 90982",raHours:18.5584,decDeg:-42.3125}],lines:[[0,1],[1,2],[2,3],[3,4]]},{name:"Corona Borealis",stars:[{name:"Guansuo",raHours:15.5488,decDeg:31.3592},{name:"Nusakan",raHours:15.4638,decDeg:29.1055},{name:"Alphecca",raHours:15.5781,decDeg:26.7149},{name:"Baltesha",raHours:15.7124,decDeg:26.2955},{name:"Matrichakra",raHours:15.8266,decDeg:26.0685},{name:"HIP 78159",raHours:15.9598,decDeg:26.878},{name:"Aurwandilsta",raHours:16.0241,decDeg:29.8511}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]]},{name:"Corvus",stars:[{name:"Algorab",raHours:12.4978,decDeg:-16.5151},{name:"Gienah",raHours:12.2635,decDeg:-17.542},{name:"Minkar",raHours:12.1688,decDeg:-22.6198},{name:"Kraz",raHours:12.5731,decDeg:-23.3966},{name:"Alchiba",raHours:12.1402,decDeg:-24.7288}],lines:[[0,1],[1,2],[2,3],[3,0],[2,4]]},{name:"Crater",stars:[{name:"Alkes",raHours:10.9963,decDeg:-18.2991},{name:"Al Sharasif",raHours:11.1943,decDeg:-22.8256},{name:"HIP 55705",raHours:11.4147,decDeg:-17.684},{name:"HIP 57283",raHours:11.746,decDeg:-18.3506},{name:"HIP 58188",raHours:11.9336,decDeg:-17.1508},{name:"HIP 55282",raHours:11.3224,decDeg:-14.779},{name:"HIP 55687",raHours:11.4102,decDeg:-10.8594},{name:"HIP 56633",raHours:11.6114,decDeg:-9.8023}],lines:[[0,1],[1,2],[2,3],[3,4],[2,5],[5,6],[6,7],[5,0]]},{name:"Crux",stars:[{name:"Acrux",raHours:12.4433,decDeg:-63.0991},{name:"Gacrux",raHours:12.5194,decDeg:-57.1126},{name:"Mimosa",raHours:12.7954,decDeg:-59.6887},{name:"Imai",raHours:12.2524,decDeg:-58.7489}],lines:[[0,1],[2,3]]},{name:"Cygnus",stars:[{name:"Deneb",raHours:20.6905,decDeg:45.2803},{name:"Sadr",raHours:20.3705,decDeg:40.2567},{name:"Aljanah",raHours:20.7701,decDeg:33.9695},{name:"Albireo",raHours:19.512,decDeg:27.9597},{name:"Fawaris",raHours:19.7496,decDeg:45.1307},{name:"HIP 95853",raHours:19.4951,decDeg:51.7295},{name:"Fawaris I",raHours:19.285,decDeg:53.3682},{name:"HIP 99848",raHours:20.2579,decDeg:47.7142},{name:"HIP 103413",raHours:20.9529,decDeg:41.1672},{name:"Fawaris III",raHours:21.2156,decDeg:30.2271}],lines:[[0,1],[1,2],[1,3],[1,4],[4,5],[5,6],[5,7],[7,0],[0,8],[8,9],[9,2]]},{name:"Delphinus",stars:[{name:"Aldulfin",raHours:20.5535,decDeg:11.3033},{name:"Rotanev",raHours:20.6258,decDeg:14.5952},{name:"Sualocin",raHours:20.6606,decDeg:15.9121},{name:"Al Salib",raHours:20.7776,decDeg:16.1248},{name:"Al Ukud",raHours:20.7243,decDeg:15.0747}],lines:[[0,1],[1,2],[2,3],[3,4],[4,1]]},{name:"Dorado",stars:[{name:"HIP 19893",raHours:4.2671,decDeg:-51.4871},{name:"HIP 21281",raHours:4.5666,decDeg:-55.045},{name:"HIP 23693",raHours:5.0919,decDeg:-57.473},{name:"HIP 26069",raHours:5.5604,decDeg:-62.4899},{name:"HIP 27100",raHours:5.7462,decDeg:-65.7355},{name:"HIP 27890",raHours:5.9016,decDeg:-63.091}],lines:[[0,1],[1,2],[2,3],[3,1],[3,4],[4,5],[5,3]]},{name:"Draco",stars:[{name:"Giausar",raHours:11.5234,decDeg:69.3311},{name:"HIP 61281",raHours:12.5581,decDeg:69.7882},{name:"Thuban",raHours:14.0732,decDeg:64.3758},{name:"Edasich",raHours:15.4155,decDeg:58.966},{name:"HIP 78527",raHours:16.0316,decDeg:58.5644},{name:"Athebyne",raHours:16.3999,decDeg:61.5141},{name:"Aldhibah",raHours:17.1465,decDeg:65.7146},{name:"Aldhiba",raHours:18.346,decDeg:71.3377},{name:"Alahakan",raHours:18.3506,decDeg:72.7337},{name:"Altais",raHours:19.2092,decDeg:67.6613},{name:"Tyl",raHours:19.8028,decDeg:70.2678},{name:"Grumium",raHours:17.8921,decDeg:56.8725},{name:"Kuma",raHours:17.5377,decDeg:55.1728},{name:"Rastaban",raHours:17.5072,decDeg:52.3014},{name:"Eltanin",raHours:17.9434,decDeg:51.489}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[7,9],[9,10],[9,11],[11,12],[12,13],[13,14],[14,11]]},{name:"Equuleus",stars:[{name:"Kitalpha",raHours:21.2637,decDeg:5.2481},{name:"HIP 104858",raHours:21.2413,decDeg:10.0077},{name:"HIP 104521",raHours:21.1724,decDeg:10.1319}],lines:[[0,1],[1,2]]},{name:"Eridanus",stars:[{name:"Cursa",raHours:5.1308,decDeg:-5.0863},{name:"HIP 22109",raHours:4.7584,decDeg:-3.2546},{name:"HIP 21444",raHours:4.6053,decDeg:-3.3524},{name:"Beid",raHours:4.1978,decDeg:-6.8378},{name:"Zaurak",raHours:3.9671,decDeg:-13.5082},{name:"HIP 17593",raHours:3.769,decDeg:-12.1017},{name:"Rana",raHours:3.7208,decDeg:-9.7652},{name:"Ran",raHours:3.549,decDeg:-9.4583},{name:"Azha",raHours:2.9404,decDeg:-8.8976},{name:"Sadr al Kaitos IV",raHours:2.7354,decDeg:-13.8587},{name:"HIP 12843",raHours:2.7517,decDeg:-18.5727},{name:"HIP 14146",raHours:3.0399,decDeg:-23.6243},{name:"HIP 15474",raHours:3.3253,decDeg:-21.7579},{name:"HIP 16611",raHours:3.5631,decDeg:-21.6328},{name:"HIP 17651",raHours:3.7808,decDeg:-23.2484},{name:"HIP 18216",raHours:3.8952,decDeg:-24.6122},{name:"HIP 18673",raHours:3.9987,decDeg:-24.0163},{name:"Beemim",raHours:4.5585,decDeg:-29.7658},{name:"Theemin",raHours:4.5925,decDeg:-30.5623},{name:"Beemim (20535)",raHours:4.4006,decDeg:-34.017},{name:"Beemim I",raHours:4.2982,decDeg:-33.7983},{name:"HIP 17874",raHours:3.8242,decDeg:-36.2001},{name:"HIP 16870",raHours:3.6182,decDeg:-40.2745},{name:"HIP 15510",raHours:3.3315,decDeg:-43.0715},{name:"Acamar",raHours:2.971,decDeg:-40.3047},{name:"HIP 12486",raHours:2.6778,decDeg:-39.8553},{name:"HIP 12413",raHours:2.6633,decDeg:-42.8916},{name:"HIP 11407",raHours:2.4498,decDeg:-47.7038},{name:"HIP 9007",raHours:1.9325,decDeg:-51.6096},{name:"Achernar",raHours:1.6285,decDeg:-57.2367}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],[17,18],[18,19],[19,20],[20,21],[21,22],[22,23],[23,24],[24,25],[25,26],[26,27],[27,28],[28,29]]},{name:"Fornax",stars:[{name:"Dalim",raHours:3.2012,decDeg:-28.9891},{name:"HIP 13147",raHours:2.8182,decDeg:-32.4063},{name:"HIP 9677",raHours:2.0748,decDeg:-29.2968}],lines:[[0,1],[1,2]]},{name:"Gemini",stars:[{name:"Alzirr",raHours:6.7548,decDeg:12.8961},{name:"HIP 35350",raHours:7.3016,decDeg:16.5405},{name:"Wasat",raHours:7.3354,decDeg:21.9823},{name:"Mekbuda",raHours:7.0685,decDeg:20.5703},{name:"Alhena",raHours:6.6285,decDeg:16.3994},{name:"HIP 36962",raHours:7.5987,decDeg:26.896},{name:"HIP 37740",raHours:7.7408,decDeg:24.3981},{name:"Pollux",raHours:7.7554,decDeg:28.0263},{name:"HIP 36046",raHours:7.4288,decDeg:27.7983},{name:"HIP 34693",raHours:7.1857,decDeg:30.2453},{name:"Castor",raHours:7.5767,decDeg:31.8886},{name:"HIP 33018",raHours:6.8798,decDeg:33.9614},{name:"Mebsuta",raHours:6.7322,decDeg:25.1312},{name:"Nucatai",raHours:6.4827,decDeg:20.2122},{name:"Tejat",raHours:6.3827,decDeg:22.5139},{name:"Propus",raHours:6.248,decDeg:22.5068},{name:"HIP 28734",raHours:6.0687,decDeg:23.2636}],lines:[[0,1],[1,2],[2,3],[3,4],[2,5],[5,6],[5,7],[5,8],[8,9],[9,10],[9,11],[9,12],[12,13],[12,14],[14,15],[15,16]]},{name:"Grus",stars:[{name:"Aldhanab",raHours:21.8988,decDeg:-37.3648},{name:"HIP 109111",raHours:22.1019,decDeg:-39.543},{name:"HIP 110997",raHours:22.4878,decDeg:-43.4956},{name:"Alnair",raHours:22.1372,decDeg:-46.9606},{name:"Tiaki",raHours:22.7111,decDeg:-46.8846},{name:"HIP 112623",raHours:22.8092,decDeg:-51.3167},{name:"HIP 113638",raHours:23.0147,decDeg:-52.7541}],lines:[[0,1],[1,2],[2,3],[3,4],[4,2],[4,5],[5,6]]},{name:"Hercules",stars:[{name:"Sarin",raHours:17.2505,decDeg:24.8396},{name:"Rasalgethi",raHours:17.2441,decDeg:14.3903},{name:"Kornephoros",raHours:16.5037,decDeg:21.4896},{name:"Nasak Shamiya III",raHours:16.3653,decDeg:19.153},{name:"Tianji",raHours:16.6882,decDeg:31.6019},{name:"Khepdenreret",raHours:17.0048,decDeg:30.9263},{name:"HIP 81833",raHours:16.7149,decDeg:38.9225},{name:"HIP 81126",raHours:16.5684,decDeg:42.4369},{name:"Asuusiha",raHours:16.329,decDeg:46.3133},{name:"Nuchuang",raHours:17.2508,decDeg:36.8092},{name:"HIP 85112",raHours:17.3947,decDeg:37.1459},{name:"HIP 87808",raHours:17.9375,decDeg:37.2505},{name:"Tianbang",raHours:17.6577,decDeg:46.0063},{name:"Maasym",raHours:17.5123,decDeg:26.1106},{name:"HIP 86974",raHours:17.7744,decDeg:27.7225},{name:"HIP 87933",raHours:17.9627,decDeg:29.2479},{name:"HIP 88794",raHours:18.1257,decDeg:28.7625},{name:"HIP 77760",raHours:15.8778,decDeg:42.45},{name:"HIP 79101",raHours:16.1462,decDeg:44.9348},{name:"Cujam",raHours:16.4236,decDeg:14.0334},{name:"HIP 81008",raHours:16.5434,decDeg:11.4882}],lines:[[0,1],[1,2],[2,3],[2,4],[4,5],[4,6],[6,7],[7,8],[6,9],[9,10],[10,11],[11,12],[9,5],[5,0],[0,13],[13,14],[14,15],[15,16],[17,18],[18,8],[3,19],[19,20]]},{name:"Horologium",stars:[{name:"HIP 19747",raHours:4.2334,decDeg:-42.2939},{name:"HIP 12653",raHours:2.7092,decDeg:-50.8008},{name:"HIP 12225",raHours:2.6234,decDeg:-52.5431},{name:"HIP 12484",raHours:2.6777,decDeg:-54.5499},{name:"HIP 14240",raHours:3.0603,decDeg:-59.7376},{name:"HIP 13884",raHours:2.9799,decDeg:-64.0713}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5]]},{name:"Hydra",stars:[{name:"Minazal IV",raHours:8.8072,decDeg:5.8379},{name:"Minazal II",raHours:8.7204,decDeg:3.3987},{name:"Minchir",raHours:8.646,decDeg:3.3415},{name:"Minazal I",raHours:8.6276,decDeg:5.7038},{name:"Ashlesha",raHours:8.7796,decDeg:6.4189},{name:"Minazal V",raHours:8.9232,decDeg:5.9455},{name:"HIP 45336",raHours:9.2394,decDeg:2.315},{name:"Ukdah",raHours:9.6643,decDeg:-1.1427},{name:"Alphard",raHours:9.4598,decDeg:-8.6587},{name:"Zhang",raHours:9.858,decDeg:-14.8465},{name:"HIP 49402",raHours:10.0854,decDeg:-13.0647},{name:"HIP 49841",raHours:10.1765,decDeg:-12.3538},{name:"HIP 51069",raHours:10.4349,decDeg:-16.8361},{name:"HIP 52943",raHours:10.8271,decDeg:-16.1941},{name:"Alkes",raHours:10.9963,decDeg:-18.2991},{name:"Al Sharasif",raHours:11.1943,decDeg:-22.8256},{name:"HIP 56343",raHours:11.5501,decDeg:-31.8575},{name:"HIP 57936",raHours:11.8818,decDeg:-33.9081},{name:"Naga",raHours:13.3153,decDeg:-23.1714},{name:"HIP 68895",raHours:14.1062,decDeg:-26.682},{name:"Solitaire",raHours:14.8382,decDeg:-27.9602}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[15,16],[16,17],[17,18],[18,19],[19,20]]},{name:"Hydrus",stars:[{name:"HIP 2021",raHours:.4276,decDeg:-77.255},{name:"HIP 17678",raHours:3.7873,decDeg:-74.2392},{name:"HIP 11001",raHours:2.3625,decDeg:-68.6594},{name:"HIP 9236",raHours:1.9794,decDeg:-61.5699}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Indus",stars:[{name:"HIP 103227",raHours:20.9135,decDeg:-58.4541},{name:"HIP 102333",raHours:20.7339,decDeg:-51.9208},{name:"Persian",raHours:20.6261,decDeg:-47.2917},{name:"HIP 105319",raHours:21.3311,decDeg:-53.4493},{name:"HIP 108431",raHours:21.9653,decDeg:-54.9926}],lines:[[0,1],[1,2],[2,3],[3,4],[4,0]]},{name:"Lacerta",stars:[{name:"HIP 111022",raHours:22.4922,decDeg:47.7069},{name:"Stellio",raHours:22.5215,decDeg:50.2824},{name:"HIP 110538",raHours:22.3927,decDeg:52.2295},{name:"HIP 110609",raHours:22.4086,decDeg:49.4764},{name:"HIP 110351",raHours:22.3504,decDeg:46.5366},{name:"HIP 111104",raHours:22.5081,decDeg:43.1234},{name:"HIP 111944",raHours:22.6752,decDeg:44.2763},{name:"HIP 109754",raHours:22.2313,decDeg:39.7149},{name:"HIP 109937",raHours:22.2662,decDeg:37.7487}],lines:[[0,1],[1,2],[2,3],[3,0],[0,4],[4,5],[5,6],[6,0],[5,7],[7,8]]},{name:"Leo",stars:[{name:"Regulus",raHours:10.1396,decDeg:11.9672},{name:"Al Jabhah",raHours:10.1222,decDeg:16.7627},{name:"Algieba",raHours:10.3328,decDeg:19.8419},{name:"Adhafera",raHours:10.2782,decDeg:23.4173},{name:"Rasalas",raHours:9.8794,decDeg:26.0071},{name:"Algenubi",raHours:9.7642,decDeg:23.7743},{name:"Zosma",raHours:11.2351,decDeg:20.524},{name:"Denebola",raHours:11.8177,decDeg:14.5723},{name:"Chertan",raHours:11.2373,decDeg:15.4298},{name:"Al Minlear al Asad",raHours:9.4109,decDeg:26.1824},{name:"Alterf",raHours:9.5287,decDeg:22.9681},{name:"Tsze Tseang",raHours:11.3987,decDeg:10.5297},{name:"HIP 55434",raHours:11.3523,decDeg:6.0294}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[2,6],[6,7],[7,8],[8,6],[8,1],[4,9],[9,10],[10,5],[5,1],[8,11],[11,12]]},{name:"Leo Minor",stars:[{name:"HIP 46952",raHours:9.5704,decDeg:36.3976},{name:"HIP 49593",raHours:10.1238,decDeg:35.2447},{name:"HIP 51233",raHours:10.4647,decDeg:36.7075},{name:"Praecipua",raHours:10.8885,decDeg:34.2156},{name:"HIP 51056",raHours:10.4319,decDeg:33.7963}],lines:[[0,1],[1,2],[2,3],[3,4],[4,1]]},{name:"Lepus",stars:[{name:"Ping",raHours:5.091,decDeg:-22.3709},{name:"Bade",raHours:5.2155,decDeg:-16.2054},{name:"Arneb",raHours:5.5455,decDeg:-17.8223},{name:"Nihal",raHours:5.4708,decDeg:-20.7592},{name:"HIP 24845",raHours:5.3263,decDeg:-13.1768},{name:"HIP 24327",raHours:5.2205,decDeg:-12.9413},{name:"Kursi al Jabbar",raHours:5.7411,decDeg:-22.4475},{name:"Arsh al Jauzah",raHours:5.8553,decDeg:-20.8775},{name:"HIP 28910",raHours:6.1026,decDeg:-14.9353},{name:"HIP 28103",raHours:5.9401,decDeg:-14.168},{name:"Darlugal",raHours:5.7826,decDeg:-14.8219}],lines:[[0,1],[1,2],[2,3],[3,0],[4,1],[1,5],[3,6],[6,7],[7,8],[8,9],[9,10],[10,2]]},{name:"Libra",stars:[{name:"Zubenelgenubi",raHours:14.848,decDeg:-16.0416},{name:"Zubeneschamali",raHours:15.2835,decDeg:-9.3829},{name:"Brachium",raHours:15.0679,decDeg:-25.2819},{name:"Zubenelhakrabi",raHours:15.5921,decDeg:-14.7896},{name:"HIP 76470",raHours:15.6171,decDeg:-28.1351},{name:"HIP 76600",raHours:15.6443,decDeg:-29.7777}],lines:[[0,1],[0,2],[1,3],[3,0],[3,4],[4,5]]},{name:"Lupus",stars:[{name:"Uridim",raHours:14.6988,decDeg:-47.3881},{name:"HIP 74395",raHours:15.2048,decDeg:-52.0991},{name:"HIP 75264",raHours:15.378,decDeg:-44.6896},{name:"HIP 76297",raHours:15.5857,decDeg:-41.1667},{name:"HIP 75141",raHours:15.3562,decDeg:-40.6475},{name:"HIP 73273",raHours:14.9755,decDeg:-43.1339},{name:"HIP 78384",raHours:16.002,decDeg:-38.3966},{name:"HIP 75177",raHours:15.3635,decDeg:-36.2612},{name:"HIP 77634",raHours:15.8493,decDeg:-33.6271}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[3,6],[6,7],[7,8],[8,6],[6,1]]},{name:"Lynx",stars:[{name:"HIP 45860",raHours:9.351,decDeg:34.3925},{name:"HIP 45688",raHours:9.3141,decDeg:36.8029},{name:"HIP 44700",raHours:9.1088,decDeg:38.4523},{name:"HIP 44248",raHours:9.0108,decDeg:41.7834},{name:"Alsciaukat",raHours:8.3806,decDeg:43.1884},{name:"HIP 36145",raHours:7.4452,decDeg:49.2116},{name:"HIP 33449",raHours:6.9546,decDeg:58.4231},{name:"HIP 30060",raHours:6.3271,decDeg:59.0109}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]},{name:"Lyra",stars:[{name:"Vega",raHours:18.6156,decDeg:38.783},{name:"Double Double I",raHours:18.739,decDeg:39.67},{name:"Nasr Alwaki I",raHours:18.7462,decDeg:37.6051},{name:"Jiantai",raHours:18.9084,decDeg:36.8986},{name:"Sulafat",raHours:18.9824,decDeg:32.6896},{name:"Sheliak",raHours:18.8347,decDeg:33.3627}],lines:[[0,1],[1,2],[2,0],[2,3],[3,4],[4,5],[5,2]]},{name:"Mensa",stars:[{name:"Hoerikwaggo",raHours:6.1706,decDeg:-74.7525},{name:"HIP 23467",raHours:5.0453,decDeg:-71.3143}],lines:[[0,1]]},{name:"Microscopium",stars:[{name:"HIP 102831",raHours:20.8328,decDeg:-33.7797},{name:"HIP 102989",raHours:20.8663,decDeg:-33.178}],lines:[[0,1]]},{name:"Monoceros",stars:[{name:"HIP 31978",raHours:6.683,decDeg:9.8958},{name:"HIP 31216",raHours:6.5484,decDeg:7.333},{name:"HIP 30419",raHours:6.3961,decDeg:4.5928},{name:"HIP 32578",raHours:6.7977,decDeg:2.4122},{name:"HIP 34769",raHours:7.1977,decDeg:-.4928},{name:"HIP 30867",raHours:6.4803,decDeg:-7.0331},{name:"HIP 29651",raHours:6.2476,decDeg:-6.2747},{name:"HIP 39863",raHours:8.1432,decDeg:-2.9838},{name:"HIP 37447",raHours:7.6875,decDeg:-9.5511}],lines:[[0,1],[1,2],[2,3],[3,1],[3,4],[4,5],[5,6],[4,7],[7,8]]},{name:"Musca",stars:[{name:"HIP 57363",raHours:11.7602,decDeg:-66.7288},{name:"HIP 59929",raHours:12.293,decDeg:-67.9607},{name:"HIP 61585",raHours:12.6197,decDeg:-69.1355},{name:"HIP 62322",raHours:12.7714,decDeg:-68.1081},{name:"HIP 63613",raHours:13.0377,decDeg:-71.5488},{name:"HIP 61199",raHours:12.5411,decDeg:-72.133}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,2]]},{name:"Norma",stars:[{name:"HIP 78639",raHours:16.0536,decDeg:-49.2297},{name:"HIP 80000",raHours:16.3307,decDeg:-50.1554},{name:"Yaqana",raHours:16.4531,decDeg:-47.5547},{name:"HIP 78914",raHours:16.1082,decDeg:-45.1733}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Octans",stars:[{name:"HIP 70638",raHours:14.4488,decDeg:-83.6679},{name:"HIP 107089",raHours:21.6912,decDeg:-77.3895},{name:"HIP 112405",raHours:22.7677,decDeg:-81.3816}],lines:[[0,1],[1,2],[2,0]]},{name:"Ophiuchus",stars:[{name:"Rasalhague",raHours:17.5822,decDeg:12.5606},{name:"HIP 83000",raHours:16.9612,decDeg:9.3751},{name:"Marfik",raHours:16.5152,decDeg:1.9841},{name:"Yed Prior",raHours:16.2391,decDeg:-3.694},{name:"Yed Posterior",raHours:16.3053,decDeg:-4.6926},{name:"HIP 80628",raHours:16.4634,decDeg:-8.3717},{name:"Saik",raHours:16.6193,decDeg:-10.5672},{name:"Sabik",raHours:17.173,decDeg:-15.7251},{name:"Cebalrai",raHours:17.7245,decDeg:4.5669},{name:"Muliphen",raHours:17.7982,decDeg:2.7075},{name:"HIP 88048",raHours:17.9838,decDeg:-9.7733},{name:"Garafsa",raHours:17.3668,decDeg:-24.9995},{name:"HIP 85423",raHours:17.4559,decDeg:-29.8667},{name:"HIP 80894",raHours:16.519,decDeg:-16.6126},{name:"HIP 80569",raHours:16.4504,decDeg:-18.4562},{name:"HIP 80343",raHours:16.4017,decDeg:-20.0372},{name:"HIP 80473",raHours:16.4264,decDeg:-23.4471}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[1,6],[6,7],[7,8],[8,9],[9,10],[8,0],[7,11],[11,12],[6,13],[13,14],[14,15],[15,16]]},{name:"Orion",stars:[{name:"Betelgeuse",raHours:5.9195,decDeg:7.407},{name:"Alnitak",raHours:5.6793,decDeg:-1.9426},{name:"Saiph",raHours:5.7959,decDeg:-9.6696},{name:"Alnilam",raHours:5.6036,decDeg:-1.2019},{name:"Mintaka",raHours:5.5334,decDeg:-.2991},{name:"Bellatrix",raHours:5.4189,decDeg:6.3497},{name:"Saif al Jabbar",raHours:5.4079,decDeg:-2.3971},{name:"Rigel",raHours:5.2423,decDeg:-8.2016},{name:"Meissa",raHours:5.5856,decDeg:9.9342},{name:"HIP 23607",raHours:5.0761,decDeg:15.4042},{name:"Al Kumm II",raHours:4.9395,decDeg:13.5146},{name:"Al Taj IV",raHours:4.9149,decDeg:10.1511},{name:"Al Taj I",raHours:4.8435,decDeg:8.9003},{name:"Tabit",raHours:4.8306,decDeg:6.9612},{name:"Al Taj II",raHours:4.8534,decDeg:5.6051},{name:"Al Taj III",raHours:4.9042,decDeg:2.4407},{name:"Al Taj V",raHours:4.9758,decDeg:1.714},{name:"HIP 28614",raHours:6.0397,decDeg:9.6474},{name:"HIP 29038",raHours:6.1262,decDeg:14.7685},{name:"HIP 29426",raHours:6.199,decDeg:14.2088},{name:"HIP 28716",raHours:6.0653,decDeg:20.1385},{name:"HIP 27913",raHours:5.9064,decDeg:20.2764}],lines:[[0,1],[1,2],[1,3],[3,4],[4,5],[4,6],[6,7],[0,5],[5,8],[8,0],[9,10],[10,11],[11,12],[12,13],[13,5],[13,14],[14,15],[15,16],[0,17],[17,18],[19,20],[20,21],[21,18]]},{name:"Pavo",stars:[{name:"Peacock",raHours:20.4275,decDeg:-56.7349},{name:"HIP 99240",raHours:20.145,decDeg:-66.1793},{name:"HIP 102395",raHours:20.7493,decDeg:-66.2032},{name:"HIP 105858",raHours:21.4407,decDeg:-65.3681},{name:"HIP 91792",raHours:18.7173,decDeg:-71.4277},{name:"HIP 98495",raHours:20.0098,decDeg:-72.9102},{name:"HIP 93015",raHours:18.9492,decDeg:-67.2335},{name:"HIP 88866",raHours:18.143,decDeg:-63.668},{name:"HIP 86929",raHours:17.7622,decDeg:-64.7237},{name:"HIP 90098",raHours:18.3871,decDeg:-61.4939},{name:"HIP 92609",raHours:18.8703,decDeg:-62.1876}],lines:[[0,1],[1,2],[0,3],[3,2],[4,1],[1,5],[1,6],[6,7],[7,8],[7,9],[9,10],[10,1]]},{name:"Pegasus",stars:[{name:"HIP 109410",raHours:22.1665,decDeg:33.1783},{name:"Matar",raHours:22.7167,decDeg:30.2213},{name:"Scheat",raHours:23.0629,decDeg:28.0825},{name:"Sadalbari",raHours:22.8334,decDeg:24.6017},{name:"Sadalnazi",raHours:22.7755,decDeg:23.5657},{name:"HIP 109176",raHours:22.1168,decDeg:25.345},{name:"HIP 107354",raHours:21.7441,decDeg:25.645},{name:"Alpheratz",raHours:.1398,decDeg:29.0908},{name:"Markab",raHours:23.0793,decDeg:15.2054},{name:"Algenib",raHours:.2206,decDeg:15.1836},{name:"Enif",raHours:21.7364,decDeg:9.875},{name:"Biham",raHours:22.1699,decDeg:6.1978},{name:"Homam",raHours:22.691,decDeg:10.8314}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[7,2],[2,8],[8,9],[9,7],[10,11],[11,12],[12,8]]},{name:"Perseus",stars:[{name:"Atik",raHours:3.7386,decDeg:32.2883},{name:"Atik (18246)",raHours:3.9022,decDeg:31.8837},{name:"Menkib",raHours:3.9827,decDeg:35.791},{name:"Aldu",raHours:3.9642,decDeg:40.0103},{name:"Sarvvis",raHours:3.7154,decDeg:47.7877},{name:"Mirfak",raHours:3.4054,decDeg:49.8612},{name:"HIP 14328",raHours:3.0799,decDeg:53.5065},{name:"Miram",raHours:2.8449,decDeg:55.8955},{name:"HIP 13531",raHours:2.9043,decDeg:52.7625},{name:"HIP 14632",raHours:3.1508,decDeg:49.6135},{name:"Misam",raHours:3.1582,decDeg:44.8579},{name:"Algol",raHours:3.1361,decDeg:40.9557},{name:"Gorgonea Tertia",raHours:3.0862,decDeg:38.8405},{name:"HIP 19343",raHours:4.1444,decDeg:47.7126},{name:"HIP 19812",raHours:4.2483,decDeg:48.4094},{name:"HIP 20070",raHours:4.304,decDeg:50.2956},{name:"HIP 19167",raHours:4.1097,decDeg:50.3514},{name:"HIP 12777",raHours:2.7366,decDeg:49.2287},{name:"Dajiangjunbei",raHours:1.7277,decDeg:50.6888}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,6],[8,9],[9,5],[9,10],[10,11],[11,3],[11,12],[4,13],[13,14],[14,15],[15,16],[9,17],[17,18]]},{name:"Phoenix",stars:[{name:"Ankaa",raHours:.438,decDeg:-42.3051},{name:"Alrial III",raHours:1.1014,decDeg:-46.7185},{name:"Alrial V",raHours:1.4728,decDeg:-43.3177},{name:"HIP 765",raHours:.1568,decDeg:-45.747},{name:"Wurren",raHours:1.1397,decDeg:-55.2458},{name:"HIP 7083",raHours:1.5208,decDeg:-49.0731}],lines:[[0,1],[1,2],[0,3],[3,1],[1,4],[4,5],[5,2]]},{name:"Pictor",stars:[{name:"HIP 32607",raHours:6.8032,decDeg:-61.942},{name:"HIP 27530",raHours:5.8304,decDeg:-56.1665},{name:"HIP 27321",raHours:5.7881,decDeg:-51.0667}],lines:[[0,1],[1,2]]},{name:"Pisces",stars:[{name:"HIP 5742",raHours:1.2291,decDeg:24.5838},{name:"HIP 6193",raHours:1.3244,decDeg:27.2641},{name:"HIP 5586",raHours:1.1943,decDeg:30.0897},{name:"Alpherg",raHours:1.5247,decDeg:15.3458},{name:"Torcular",raHours:1.7566,decDeg:9.1576},{name:"Alrescha",raHours:2.0341,decDeg:2.7638},{name:"HIP 7884",raHours:1.6905,decDeg:5.4876},{name:"HIP 4906",raHours:1.0491,decDeg:7.8901},{name:"Kuton I",raHours:.8114,decDeg:7.5852},{name:"HIP 118268",raHours:23.9885,decDeg:6.8636},{name:"HIP 116771",raHours:23.6658,decDeg:5.6274},{name:"HIP 115830",raHours:23.4662,decDeg:6.3791},{name:"HIP 114971",raHours:23.286,decDeg:3.2822},{name:"HIP 115738",raHours:23.4489,decDeg:1.2558},{name:"HIP 116928",raHours:23.7008,decDeg:1.7804}],lines:[[0,1],[1,2],[2,0],[0,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,10]]},{name:"Piscis Austrinus",stars:[{name:"Fomalhaut",raHours:22.9608,decDeg:-29.6218},{name:"HIP 113246",raHours:22.9325,decDeg:-32.5397},{name:"HIP 112948",raHours:22.8754,decDeg:-32.8755},{name:"Fum al Hui",raHours:22.5251,decDeg:-32.346},{name:"HIP 109285",raHours:22.1397,decDeg:-32.9884},{name:"HIP 107380",raHours:21.7491,decDeg:-33.0256},{name:"HIP 107608",raHours:21.7956,decDeg:-30.8983},{name:"HIP 111954",raHours:22.6776,decDeg:-27.0436}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,4],[4,7],[7,0]]},{name:"Puppis",stars:[{name:"Regor",raHours:8.1589,decDeg:-47.3366},{name:"Naos",raHours:8.0597,decDeg:-40.0032},{name:"Tureis",raHours:8.1258,decDeg:-24.3044},{name:"Azmidi",raHours:7.8216,decDeg:-24.8598},{name:"HIP 37229",raHours:7.6472,decDeg:-26.8039},{name:"HIP 36917",raHours:7.5897,decDeg:-28.3693},{name:"HIP 35264",raHours:7.2857,decDeg:-37.0975},{name:"Pipit",raHours:6.6294,decDeg:-43.1959},{name:"Canopus",raHours:6.3992,decDeg:-52.6957},{name:"HIP 37677",raHours:7.7301,decDeg:-28.9548},{name:"HIP 38070",raHours:7.8014,decDeg:-25.9372}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,3]]},{name:"Pyxis",stars:[{name:"Naos",raHours:8.0597,decDeg:-40.0032},{name:"HIP 42515",raHours:8.6684,decDeg:-35.3083},{name:"HIP 42828",raHours:8.7265,decDeg:-33.1864},{name:"HIP 43409",raHours:8.8422,decDeg:-27.7101}],lines:[[0,1],[1,2],[2,3]]},{name:"Reticulum",stars:[{name:"Rhombus",raHours:4.2404,decDeg:-62.474},{name:"HIP 17440",raHours:3.7365,decDeg:-64.8071},{name:"HIP 18597",raHours:3.9791,decDeg:-61.4002},{name:"HIP 19921",raHours:4.2747,decDeg:-59.3017}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Sagitta",stars:[{name:"Telum",raHours:19.9793,decDeg:19.4921},{name:"Zuoqi",raHours:19.7898,decDeg:18.5343},{name:"Sham",raHours:19.6683,decDeg:18.0139},{name:"Shakh",raHours:19.6841,decDeg:17.4761}],lines:[[0,1],[1,2],[1,3]]},{name:"Sagittarius",stars:[{name:"Kaus Australis",raHours:18.4029,decDeg:-34.3843},{name:"Alnasl",raHours:18.0968,decDeg:-30.4237},{name:"Kaus Media",raHours:18.3499,decDeg:-29.828},{name:"Kaus Borealis",raHours:18.4662,decDeg:-25.4212},{name:"Namalsadirah I",raHours:18.7609,decDeg:-26.9908},{name:"Nunki",raHours:18.9211,decDeg:-26.2966},{name:"Namalsadirah II",raHours:19.1157,decDeg:-27.6698},{name:"Ascella",raHours:19.0435,decDeg:-29.8801},{name:"Hamalwarid",raHours:18.2938,decDeg:-36.7613},{name:"Polis",raHours:18.2294,decDeg:-21.0588},{name:"HIP 95168",raHours:19.3612,decDeg:-17.8473},{name:"Albaldah",raHours:19.1627,decDeg:-21.0235},{name:"HIP 93683",raHours:19.078,decDeg:-21.7414},{name:"HIP 93085",raHours:18.9622,decDeg:-21.1066}],lines:[[0,1],[1,2],[2,0],[2,3],[3,4],[4,2],[4,5],[5,6],[6,7],[7,4],[7,0],[0,8],[3,9],[10,11],[11,12],[12,13],[13,11]]},{name:"Scorpius",stars:[{name:"Acrab",raHours:16.0906,decDeg:-19.8054},{name:"Dschubba",raHours:16.0056,decDeg:-22.6216},{name:"Fang",raHours:15.9809,decDeg:-26.114},{name:"Alniyat",raHours:16.3531,decDeg:-25.5928},{name:"Antares",raHours:16.4901,decDeg:-26.4319},{name:"Paikauhale",raHours:16.598,decDeg:-28.216},{name:"Larawag",raHours:16.8362,decDeg:-34.2926},{name:"Xamidimura",raHours:16.8645,decDeg:-38.0473},{name:"HIP 82729",raHours:16.9098,decDeg:-42.3608},{name:"HIP 84143",raHours:17.2025,decDeg:-43.2385},{name:"Sargas",raHours:17.622,decDeg:-42.9978},{name:"Girtab",raHours:17.7931,decDeg:-40.127},{name:"Mula",raHours:17.7081,decDeg:-39.0299},{name:"Lesath",raHours:17.5127,decDeg:-37.2957},{name:"Shaula",raHours:17.5601,decDeg:-37.1037},{name:"Fuyue",raHours:17.831,decDeg:-37.0434},{name:"Jabbah",raHours:16.1999,decDeg:-19.4606},{name:"Iklil",raHours:15.9481,decDeg:-29.214}],lines:[[0,1],[1,2],[1,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[0,16],[2,17]]},{name:"Sculptor",stars:[{name:"HIP 4577",raHours:.9768,decDeg:-29.3575},{name:"HIP 117452",raHours:23.8154,decDeg:-28.13},{name:"HIP 115102",raHours:23.3137,decDeg:-32.5318},{name:"HIP 116231",raHours:23.5495,decDeg:-37.8184}],lines:[[0,1],[1,2],[2,3]]},{name:"Scutum",stars:[{name:"HIP 92175",raHours:18.7862,decDeg:-4.7478},{name:"Tianbian",raHours:18.5868,decDeg:-8.2433},{name:"HIP 90595",raHours:18.4866,decDeg:-14.5658},{name:"HIP 91726",raHours:18.7046,decDeg:-9.0526}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Serpens",stars:[{name:"Chow",raHours:15.7698,decDeg:15.4219},{name:"Nasak Shamiya II",raHours:15.9408,decDeg:15.6647},{name:"Gudja",raHours:15.8123,decDeg:18.1418},{name:"HIP 76852",raHours:15.6925,decDeg:19.6705},{name:"Nasak Yamani I",raHours:15.5801,decDeg:10.5389},{name:"Unukalhai",raHours:15.7378,decDeg:6.4255},{name:"Nasak Yamani II",raHours:15.8469,decDeg:4.4776},{name:"HIP 77516",raHours:15.827,decDeg:-3.4301},{name:"Yed Prior",raHours:16.2391,decDeg:-3.694},{name:"Sabik",raHours:17.173,decDeg:-15.7251},{name:"HIP 86263",raHours:17.6265,decDeg:-15.3984},{name:"HIP 88048",raHours:17.9838,decDeg:-9.7733},{name:"HIP 89962",raHours:18.3553,decDeg:-2.8971},{name:"Alya",raHours:18.937,decDeg:4.2035}],lines:[[0,1],[1,2],[2,3],[3,0],[0,4],[4,5],[5,6],[6,7],[7,8],[9,10],[10,11],[11,12],[12,13]]},{name:"Sextans",stars:[{name:"HIP 48437",raHours:9.8751,decDeg:-8.1049},{name:"HIP 49641",raHours:10.1323,decDeg:-.3716},{name:"HIP 51437",raHours:10.5049,decDeg:-.637},{name:"HIP 51362",raHours:10.4913,decDeg:-2.739}],lines:[[0,1],[1,2],[2,3]]},{name:"Taurus",stars:[{name:"Tianguan",raHours:5.6274,decDeg:21.1426},{name:"Aldebaran",raHours:4.5987,decDeg:16.5098},{name:"Chamukuy",raHours:4.4777,decDeg:15.8709},{name:"Prima Hyadum",raHours:4.3299,decDeg:15.6277},{name:"Secunda Hyadum",raHours:4.3822,decDeg:17.5426},{name:"Ain",raHours:4.4769,decDeg:19.1805},{name:"Elnath",raHours:5.4382,decDeg:28.6079},{name:"HIP 16083",raHours:3.4528,decDeg:9.7328},{name:"HIP 18907",raHours:4.0526,decDeg:5.9893},{name:"HIP 15900",raHours:3.4136,decDeg:9.0291},{name:"HIP 16852",raHours:3.6146,decDeg:.4028},{name:"Bibing",raHours:4.0113,decDeg:12.4904}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[7,8],[9,10],[3,11],[11,7]]},{name:"Telescopium",stars:[{name:"HIP 89112",raHours:18.1872,decDeg:-45.9543},{name:"HIP 90422",raHours:18.4496,decDeg:-45.9683},{name:"HIP 90568",raHours:18.4805,decDeg:-49.07}],lines:[[0,1],[1,2]]},{name:"Triangulum",stars:[{name:"Mothallah",raHours:1.8847,decDeg:29.5794},{name:"Mizan",raHours:2.159,decDeg:34.9874},{name:"Apdu",raHours:2.2886,decDeg:33.8473}],lines:[[0,1],[1,2],[2,0]]},{name:"Triangulum Australe",stars:[{name:"Atria",raHours:16.8111,decDeg:-69.0276},{name:"HIP 77952",raHours:15.9191,decDeg:-63.4297},{name:"HIP 76440",raHours:15.612,decDeg:-66.3169},{name:"HIP 74946",raHours:15.3152,decDeg:-68.6795}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Tucana",stars:[{name:"HIP 2484",raHours:.5257,decDeg:-62.9581},{name:"HIP 1599",raHours:.3339,decDeg:-64.8776},{name:"HIP 118322",raHours:23.9986,decDeg:-65.5771},{name:"HIP 110838",raHours:22.4555,decDeg:-64.9664},{name:"Lang-Exster",raHours:22.3084,decDeg:-60.2595},{name:"HIP 114996",raHours:23.2905,decDeg:-58.2359}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},{name:"Ursa Major",stars:[{name:"Phecda",raHours:11.8972,decDeg:53.6947},{name:"Taiyangshou",raHours:11.7675,decDeg:47.7793},{name:"HIP 54539",raHours:11.1611,decDeg:44.4986},{name:"Tania Australis",raHours:10.3722,decDeg:41.4994},{name:"Tania Borealis",raHours:10.285,decDeg:42.9145},{name:"Alula Borealis",raHours:11.308,decDeg:33.0942},{name:"Alula Australis",raHours:11.3031,decDeg:31.5308},{name:"Megrez",raHours:12.2571,decDeg:57.0326},{name:"Dubhe",raHours:11.0622,decDeg:61.7511},{name:"Merak",raHours:11.0307,decDeg:56.3823},{name:"Alioth",raHours:12.9005,decDeg:55.9598},{name:"Mizar",raHours:13.3987,decDeg:54.9254},{name:"Alkaid",raHours:13.7924,decDeg:49.3133},{name:"Alhaud IV",raHours:9.5254,decDeg:63.0618},{name:"Alhaud VI",raHours:9.8499,decDeg:59.0391},{name:"Muscida",raHours:8.5045,decDeg:60.7184},{name:"Alhaud V",raHours:9.5479,decDeg:51.6786},{name:"Alkaphrah",raHours:9.0604,decDeg:47.1567},{name:"Talitha",raHours:8.9869,decDeg:48.0423}],lines:[[0,1],[1,2],[2,3],[3,4],[1,5],[5,6],[7,8],[8,9],[9,0],[0,7],[7,10],[10,11],[11,12],[8,13],[13,14],[13,15],[15,14],[14,9],[14,16],[16,17],[17,18]]},{name:"Ursa Minor",stars:[{name:"Polaris",raHours:2.5297,decDeg:89.2641},{name:"Yildun",raHours:17.5369,decDeg:86.5863},{name:"Circitores",raHours:16.7662,decDeg:82.0373},{name:"Akfa Farkadain",raHours:15.7343,decDeg:77.7945},{name:"Anwa Farkadain",raHours:16.2918,decDeg:75.7547},{name:"Pherkad",raHours:15.3455,decDeg:71.834},{name:"Kochab",raHours:14.8451,decDeg:74.1555}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]]},{name:"Vela",stars:[{name:"Alsephina",raHours:8.7451,decDeg:-54.7086},{name:"Regor",raHours:8.1589,decDeg:-47.3366},{name:"Suhail",raHours:9.1333,decDeg:-43.4326},{name:"HIP 46651",raHours:9.5117,decDeg:-40.4669},{name:"HIP 50191",raHours:10.2456,decDeg:-42.1221},{name:"HIP 52727",raHours:10.7795,decDeg:-49.4201},{name:"HIP 48774",raHours:9.9477,decDeg:-54.5678},{name:"Markeb",raHours:9.3686,decDeg:-55.0107}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0]]},{name:"Virgo",stars:[{name:"Zaniah",raHours:12.3318,decDeg:-.6667},{name:"HIP 58948",raHours:12.0869,decDeg:8.7328},{name:"HIP 57380",raHours:11.7643,decDeg:6.5298},{name:"Zavijava",raHours:11.8448,decDeg:1.7654},{name:"Porrima",raHours:12.6944,decDeg:-1.4495},{name:"Minelauva",raHours:12.9268,decDeg:3.3976},{name:"Vindemiatrix",raHours:13.0363,decDeg:10.9591},{name:"HIP 64238",raHours:13.1658,decDeg:-5.5389},{name:"Spica",raHours:13.4199,decDeg:-11.1612},{name:"Heze",raHours:13.5783,decDeg:-.5959},{name:"HIP 68520",raHours:14.0274,decDeg:1.5446},{name:"Maenalus",raHours:14.7708,decDeg:1.8929},{name:"Syrma",raHours:14.2669,decDeg:-5.9995},{name:"Rijl al Awwa",raHours:14.7177,decDeg:-5.6574}],lines:[[0,1],[1,2],[2,3],[3,0],[0,4],[4,5],[5,6],[4,7],[7,8],[4,9],[9,10],[10,11],[9,12],[12,13]]},{name:"Volans",stars:[{name:"HIP 44382",raHours:9.0408,decDeg:-66.3958},{name:"HIP 41312",raHours:8.429,decDeg:-66.1365},{name:"HIP 39794",raHours:8.1322,decDeg:-68.6171},{name:"HIP 35228",raHours:7.2805,decDeg:-67.9572},{name:"HIP 34481",raHours:7.1458,decDeg:-70.4992}],lines:[[0,1],[1,2],[2,3],[3,4],[4,2],[2,0]]},{name:"Vulpecula",stars:[{name:"Anser",raHours:19.4784,decDeg:24.6652},{name:"HIP 97886",raHours:19.891,decDeg:24.0795}],lines:[[0,1]]}],zr="const:";function M_(n){return`${zr}${n.name}`}function $d(){return Dt.map(n=>({id:M_(n),name:n.name,sub:"constellation"}))}const jd=n=>n.toLowerCase().trim().replace(/\s+/g," ");function S_(n,e){const t=jd(n);return t===e?100:t.startsWith(e)?80:t.includes(e)?60:-1}function y_(n){const e=jd(n),t=$d();return e?t.map(i=>({e:i,s:S_(i.name,e)})).filter(i=>i.s>=0).sort((i,r)=>r.s-i.s||i.e.name.localeCompare(r.e.name)).map(i=>i.e):t}const _o={type:"change"},qc={type:"start"},Kc={type:"end"},Hu=1e-6,Ye={NONE:-1,ROTATE:0,ZOOM:1,PAN:2,TOUCH_ROTATE:3,TOUCH_ZOOM_PAN:4},Is=new Se,Nn=new Se,E_=new P,Hs=new P,vo=new P,qi=new wn,Lu=new P,Ls=new P,xo=new P,Us=new P;class A_ extends f_{constructor(e,t=null){super(e,t),this.enabled=!0,this.screen={left:0,top:0,width:0,height:0},this.rotateSpeed=1,this.zoomSpeed=1.2,this.panSpeed=.3,this.noRotate=!1,this.noZoom=!1,this.noPan=!1,this.staticMoving=!1,this.dynamicDampingFactor=.2,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.keys=["KeyA","KeyS","KeyD"],this.mouseButtons={LEFT:za.ROTATE,MIDDLE:za.DOLLY,RIGHT:za.PAN},this.state=Ye.NONE,this.keyState=Ye.NONE,this.target=new P,this._lastPosition=new P,this._lastZoom=1,this._touchZoomDistanceStart=0,this._touchZoomDistanceEnd=0,this._lastAngle=0,this._eye=new P,this._movePrev=new Se,this._moveCurr=new Se,this._lastAxis=new P,this._zoomStart=new Se,this._zoomEnd=new Se,this._panStart=new Se,this._panEnd=new Se,this._pointers=[],this._pointerPositions={},this._onPointerMove=b_.bind(this),this._onPointerDown=T_.bind(this),this._onPointerUp=D_.bind(this),this._onPointerCancel=w_.bind(this),this._onContextMenu=U_.bind(this),this._onMouseWheel=L_.bind(this),this._onKeyDown=R_.bind(this),this._onKeyUp=P_.bind(this),this._onTouchStart=N_.bind(this),this._onTouchMove=O_.bind(this),this._onTouchEnd=F_.bind(this),this._onMouseDown=C_.bind(this),this._onMouseMove=I_.bind(this),this._onMouseUp=H_.bind(this),this._target0=this.target.clone(),this._position0=this.object.position.clone(),this._up0=this.object.up.clone(),this._zoom0=this.object.zoom,t!==null&&(this.connect(),this.handleResize()),this.update()}connect(){window.addEventListener("keydown",this._onKeyDown),window.addEventListener("keyup",this._onKeyUp),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerCancel),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.style.touchAction="none"}disconnect(){window.removeEventListener("keydown",this._onKeyDown),window.removeEventListener("keyup",this._onKeyUp),this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerCancel),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}handleResize(){const e=this.domElement.getBoundingClientRect(),t=this.domElement.ownerDocument.documentElement;this.screen.left=e.left+window.pageXOffset-t.clientLeft,this.screen.top=e.top+window.pageYOffset-t.clientTop,this.screen.width=e.width,this.screen.height=e.height}update(){this._eye.subVectors(this.object.position,this.target),this.noRotate||this._rotateCamera(),this.noZoom||this._zoomCamera(),this.noPan||this._panCamera(),this.object.position.addVectors(this.target,this._eye),this.object.isPerspectiveCamera?(this._checkDistances(),this.object.lookAt(this.target),this._lastPosition.distanceToSquared(this.object.position)>Hu&&(this.dispatchEvent(_o),this._lastPosition.copy(this.object.position))):this.object.isOrthographicCamera?(this.object.lookAt(this.target),(this._lastPosition.distanceToSquared(this.object.position)>Hu||this._lastZoom!==this.object.zoom)&&(this.dispatchEvent(_o),this._lastPosition.copy(this.object.position),this._lastZoom=this.object.zoom)):console.warn("THREE.TrackballControls: Unsupported camera type.")}reset(){this.state=Ye.NONE,this.keyState=Ye.NONE,this.target.copy(this._target0),this.object.position.copy(this._position0),this.object.up.copy(this._up0),this.object.zoom=this._zoom0,this.object.updateProjectionMatrix(),this._eye.subVectors(this.object.position,this.target),this.object.lookAt(this.target),this.dispatchEvent(_o),this._lastPosition.copy(this.object.position),this._lastZoom=this.object.zoom}_panCamera(){if(Nn.copy(this._panEnd).sub(this._panStart),Nn.lengthSq()){if(this.object.isOrthographicCamera){const e=(this.object.right-this.object.left)/this.object.zoom/this.domElement.clientWidth,t=(this.object.top-this.object.bottom)/this.object.zoom/this.domElement.clientWidth;Nn.x*=e,Nn.y*=t}Nn.multiplyScalar(this._eye.length()*this.panSpeed),Hs.copy(this._eye).cross(this.object.up).setLength(Nn.x),Hs.add(E_.copy(this.object.up).setLength(Nn.y)),this.object.position.add(Hs),this.target.add(Hs),this.staticMoving?this._panStart.copy(this._panEnd):this._panStart.add(Nn.subVectors(this._panEnd,this._panStart).multiplyScalar(this.dynamicDampingFactor))}}_rotateCamera(){Us.set(this._moveCurr.x-this._movePrev.x,this._moveCurr.y-this._movePrev.y,0);let e=Us.length();e?(this._eye.copy(this.object.position).sub(this.target),Lu.copy(this._eye).normalize(),Ls.copy(this.object.up).normalize(),xo.crossVectors(Ls,Lu).normalize(),Ls.setLength(this._moveCurr.y-this._movePrev.y),xo.setLength(this._moveCurr.x-this._movePrev.x),Us.copy(Ls.add(xo)),vo.crossVectors(Us,this._eye).normalize(),e*=this.rotateSpeed,qi.setFromAxisAngle(vo,e),this._eye.applyQuaternion(qi),this.object.up.applyQuaternion(qi),this._lastAxis.copy(vo),this._lastAngle=e):!this.staticMoving&&this._lastAngle&&(this._lastAngle*=Math.sqrt(1-this.dynamicDampingFactor),this._eye.copy(this.object.position).sub(this.target),qi.setFromAxisAngle(this._lastAxis,this._lastAngle),this._eye.applyQuaternion(qi),this.object.up.applyQuaternion(qi)),this._movePrev.copy(this._moveCurr)}_zoomCamera(){let e;this.state===Ye.TOUCH_ZOOM_PAN?(e=this._touchZoomDistanceStart/this._touchZoomDistanceEnd,this._touchZoomDistanceStart=this._touchZoomDistanceEnd,this.object.isPerspectiveCamera?this._eye.multiplyScalar(e):this.object.isOrthographicCamera?(this.object.zoom=cc.clamp(this.object.zoom/e,this.minZoom,this.maxZoom),this._lastZoom!==this.object.zoom&&this.object.updateProjectionMatrix()):console.warn("THREE.TrackballControls: Unsupported camera type")):(e=1+(this._zoomEnd.y-this._zoomStart.y)*this.zoomSpeed,e!==1&&e>0&&(this.object.isPerspectiveCamera?this._eye.multiplyScalar(e):this.object.isOrthographicCamera?(this.object.zoom=cc.clamp(this.object.zoom/e,this.minZoom,this.maxZoom),this._lastZoom!==this.object.zoom&&this.object.updateProjectionMatrix()):console.warn("THREE.TrackballControls: Unsupported camera type")),this.staticMoving?this._zoomStart.copy(this._zoomEnd):this._zoomStart.y+=(this._zoomEnd.y-this._zoomStart.y)*this.dynamicDampingFactor)}_getMouseOnScreen(e,t){return Is.set((e-this.screen.left)/this.screen.width,(t-this.screen.top)/this.screen.height),Is}_getMouseOnCircle(e,t){return Is.set((e-this.screen.width*.5-this.screen.left)/(this.screen.width*.5),(this.screen.height+2*(this.screen.top-t))/this.screen.width),Is}_addPointer(e){this._pointers.push(e)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t].pointerId==e.pointerId){this._pointers.splice(t,1);return}}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Se,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0].pointerId?this._pointers[1]:this._pointers[0];return this._pointerPositions[t.pointerId]}_checkDistances(){(!this.noZoom||!this.noPan)&&(this._eye.lengthSq()>this.maxDistance*this.maxDistance&&(this.object.position.addVectors(this.target,this._eye.setLength(this.maxDistance)),this._zoomStart.copy(this._zoomEnd)),this._eye.lengthSq()<this.minDistance*this.minDistance&&(this.object.position.addVectors(this.target,this._eye.setLength(this.minDistance)),this._zoomStart.copy(this._zoomEnd)))}}function T_(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n))}function b_(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function D_(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchEnd(n):this._onMouseUp(),this._removePointer(n),this._pointers.length===0&&(this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp)))}function w_(n){this._removePointer(n)}function P_(){this.enabled!==!1&&(this.keyState=Ye.NONE,window.addEventListener("keydown",this._onKeyDown))}function R_(n){this.enabled!==!1&&(window.removeEventListener("keydown",this._onKeyDown),this.keyState===Ye.NONE&&(n.code===this.keys[Ye.ROTATE]&&!this.noRotate?this.keyState=Ye.ROTATE:n.code===this.keys[Ye.ZOOM]&&!this.noZoom?this.keyState=Ye.ZOOM:n.code===this.keys[Ye.PAN]&&!this.noPan&&(this.keyState=Ye.PAN)))}function C_(n){if(this.state===Ye.NONE)switch(n.button){case this.mouseButtons.LEFT:this.state=Ye.ROTATE;break;case this.mouseButtons.MIDDLE:this.state=Ye.ZOOM;break;case this.mouseButtons.RIGHT:this.state=Ye.PAN;break}const e=this.keyState!==Ye.NONE?this.keyState:this.state;e===Ye.ROTATE&&!this.noRotate?(this._moveCurr.copy(this._getMouseOnCircle(n.pageX,n.pageY)),this._movePrev.copy(this._moveCurr)):e===Ye.ZOOM&&!this.noZoom?(this._zoomStart.copy(this._getMouseOnScreen(n.pageX,n.pageY)),this._zoomEnd.copy(this._zoomStart)):e===Ye.PAN&&!this.noPan&&(this._panStart.copy(this._getMouseOnScreen(n.pageX,n.pageY)),this._panEnd.copy(this._panStart)),this.dispatchEvent(qc)}function I_(n){const e=this.keyState!==Ye.NONE?this.keyState:this.state;e===Ye.ROTATE&&!this.noRotate?(this._movePrev.copy(this._moveCurr),this._moveCurr.copy(this._getMouseOnCircle(n.pageX,n.pageY))):e===Ye.ZOOM&&!this.noZoom?this._zoomEnd.copy(this._getMouseOnScreen(n.pageX,n.pageY)):e===Ye.PAN&&!this.noPan&&this._panEnd.copy(this._getMouseOnScreen(n.pageX,n.pageY))}function H_(){this.state=Ye.NONE,this.dispatchEvent(Kc)}function L_(n){if(this.enabled!==!1&&this.noZoom!==!0){switch(n.preventDefault(),n.deltaMode){case 2:this._zoomStart.y-=n.deltaY*.025;break;case 1:this._zoomStart.y-=n.deltaY*.01;break;default:this._zoomStart.y-=n.deltaY*25e-5;break}this.dispatchEvent(qc),this.dispatchEvent(Kc)}}function U_(n){this.enabled!==!1&&n.preventDefault()}function N_(n){switch(this._trackPointer(n),this._pointers.length){case 1:this.state=Ye.TOUCH_ROTATE,this._moveCurr.copy(this._getMouseOnCircle(this._pointers[0].pageX,this._pointers[0].pageY)),this._movePrev.copy(this._moveCurr);break;default:this.state=Ye.TOUCH_ZOOM_PAN;const e=this._pointers[0].pageX-this._pointers[1].pageX,t=this._pointers[0].pageY-this._pointers[1].pageY;this._touchZoomDistanceEnd=this._touchZoomDistanceStart=Math.sqrt(e*e+t*t);const i=(this._pointers[0].pageX+this._pointers[1].pageX)/2,r=(this._pointers[0].pageY+this._pointers[1].pageY)/2;this._panStart.copy(this._getMouseOnScreen(i,r)),this._panEnd.copy(this._panStart);break}this.dispatchEvent(qc)}function O_(n){switch(this._trackPointer(n),this._pointers.length){case 1:this._movePrev.copy(this._moveCurr),this._moveCurr.copy(this._getMouseOnCircle(n.pageX,n.pageY));break;default:const e=this._getSecondPointerPosition(n),t=n.pageX-e.x,i=n.pageY-e.y;this._touchZoomDistanceEnd=Math.sqrt(t*t+i*i);const r=(n.pageX+e.x)/2,s=(n.pageY+e.y)/2;this._panEnd.copy(this._getMouseOnScreen(r,s));break}}function F_(n){switch(this._pointers.length){case 0:this.state=Ye.NONE;break;case 1:this.state=Ye.TOUCH_ROTATE,this._moveCurr.copy(this._getMouseOnCircle(n.pageX,n.pageY)),this._movePrev.copy(this._moveCurr);break;case 2:this.state=Ye.TOUCH_ZOOM_PAN;for(let e=0;e<this._pointers.length;e++)if(this._pointers[e].pointerId!==n.pointerId){const t=this._pointerPositions[this._pointers[e].pointerId];this._moveCurr.copy(this._getMouseOnCircle(t.x,t.y)),this._movePrev.copy(this._moveCurr);break}break}this.dispatchEvent(Kc)}const $i=Math.PI/180;function z_(n,e,t=1e-10){const i=n%(2*Math.PI);let r=e<.8?i:Math.PI;for(let s=0;s<64;s++){const a=r-e*Math.sin(r)-i,o=1-e*Math.cos(r),c=a/o;if(r-=c,Math.abs(c)<t)break}return r}function Zd(n,e){const t=e/On,i=n.rates;return{a:n.a+(i?.a??0)*t,e:n.e+(i?.e??0)*t,i:n.i+(i?.i??0)*t,node:n.node+(i?.node??0)*t,peri:n.peri+(i?.peri??0)*t,M0:n.M0+(i?.M0??0)*t+Jd(n,e),n:n.n}}function Jd(n,e){if(!n.periodicM)return 0;const t=e/On;let i=0;for(const r of n.periodicM){const s=r.f*t;i+=r.b*t*t+r.c*Math.cos(s*$i)+r.s*Math.sin(s*$i)}return i}function vt(n,e){return oa(n,e,{x:0,y:0,z:0})}function oa(n,e,t){const i=n.a+(n.rates?.a??0)*(e/On),r=n.e+(n.rates?.e??0)*(e/On),s=n.i+(n.rates?.i??0)*(e/On),a=n.node+(n.rates?.node??0)*(e/On),o=n.peri+(n.rates?.peri??0)*(e/On),c=n.M0+(n.rates?.M0??0)*(e/On)+Jd(n,e);return Qd(i,r,s,a,o,c,n.n,e,t)}function B_(n,e){return Qd(n.a,n.e,n.i,n.node,n.peri,n.M0,n.n,0,{x:0,y:0,z:0},e)}function Qd(n,e,t,i,r,s,a,o,c,l){const u=l??(s+a*o)*$i,d=z_(u,e),h=n*(Math.cos(d)-e),p=n*Math.sqrt(1-e*e)*Math.sin(d),g=r*$i,v=i*$i,m=t*$i,f=Math.cos(v),S=Math.sin(v),_=Math.cos(g),E=Math.sin(g),C=Math.cos(m),T=Math.sin(m);return c.x=(f*_-S*E*C)*h+(-f*E-S*_*C)*p,c.y=(S*_+f*E*C)*h+(-S*E+f*_*C)*p,c.z=E*T*h+_*T*p,c}function k_(n,e,t=256){const i=Zd(n,e),r=[];for(let s=0;s<=t;s++){const a=s*(2*Math.PI/t);r.push(B_(i,a))}return r}const nn=Math.PI/180,G_=1495978707e-1,V_=[[0,0,1,0,6288770,-20905400],[2,0,-1,0,1274030,-3699110],[2,0,0,0,658314,-2955970],[0,0,2,0,213618,-569925],[0,1,0,0,-185116,48888],[0,0,0,2,-114332,-3149],[2,0,-2,0,58793,246158],[2,-1,-1,0,57066,-152138],[2,0,1,0,53322,-170733],[2,-1,0,0,45758,-204586],[0,1,-1,0,-40923,-129620],[1,0,0,0,-34720,108743],[0,1,1,0,-30383,104755],[2,0,0,-2,15327,10321],[0,0,1,2,-12528,0],[0,0,1,-2,10980,79661],[4,0,-1,0,10675,-34782],[0,0,3,0,10034,-23210],[4,0,-2,0,8548,-21636],[2,1,-1,0,-7888,24208],[2,1,0,0,-6766,30824],[1,0,-1,0,-5163,-8379],[1,1,0,0,4987,-16675],[2,-1,1,0,4036,-12831],[2,0,2,0,3994,-10445],[4,0,0,0,3861,-11650],[2,0,-3,0,3665,14403],[0,1,-2,0,-2689,-7003],[2,0,-1,2,-2602,0],[2,-1,-2,0,2390,10056],[1,0,1,0,-2348,6322],[2,-2,0,0,2236,-9884],[0,1,2,0,-2120,5751],[0,2,0,0,-2069,0],[2,-2,-1,0,2048,-4950],[2,0,1,-2,-1773,4130],[2,0,0,2,-1595,0],[4,-1,-1,0,1215,-3958],[0,0,2,2,-1110,0],[3,0,-1,0,-892,3258],[2,1,1,0,-810,2616],[4,-1,-2,0,759,-1897],[0,2,-1,0,-713,-2117],[2,2,-1,0,-700,2354],[2,1,-2,0,691,0],[2,-1,0,-2,596,0],[4,0,1,0,549,-1423],[0,0,4,0,537,-1117],[4,-1,0,0,520,-1571],[1,0,-2,0,-487,-1739],[2,1,0,-2,-399,0],[0,0,2,-2,-381,-4421],[1,1,1,0,351,0],[3,0,-2,0,-340,0],[4,0,-3,0,330,0],[2,-1,2,0,327,0],[0,2,1,0,-323,1165],[1,1,-1,0,299,0],[2,0,3,0,294,0],[2,0,-1,-2,0,8752]],W_=[[0,0,0,1,5128120],[0,0,1,1,280602],[0,0,1,-1,277693],[2,0,0,-1,173237],[2,0,-1,1,55413],[2,0,-1,-1,46271],[2,0,0,1,32573],[0,0,2,1,17198],[2,0,1,-1,9266],[0,0,2,-1,8822],[2,-1,0,-1,8216],[2,0,-2,-1,4324],[2,0,1,1,4200],[2,1,0,-1,-3359],[2,-1,-1,1,2463],[2,-1,0,1,2211],[2,-1,-1,-1,2065],[0,1,-1,-1,-1870],[4,0,-1,-1,1828],[0,1,0,1,-1794],[0,0,0,3,-1749],[0,1,-1,1,-1565],[1,0,0,1,-1491],[0,1,1,1,-1475],[0,1,1,-1,-1410],[0,1,0,-1,-1344],[1,0,0,-1,-1335],[0,0,3,1,1107],[4,0,0,-1,1021],[4,0,-1,1,833],[0,0,1,-3,777],[4,0,-2,1,671],[2,0,0,-3,607],[2,0,2,-1,596],[2,-1,1,-1,491],[2,0,-2,1,-451],[0,0,3,-1,439],[2,0,2,1,422],[2,0,-3,-1,421],[2,1,-1,1,-366],[2,1,0,1,-351],[4,0,0,1,331],[2,-1,1,1,315],[2,-2,0,-1,302],[0,0,1,3,-283],[2,1,1,-1,-229],[1,1,0,-1,223],[1,1,0,1,223],[0,1,-2,-1,-220],[2,1,-1,-1,-220],[1,0,1,1,-185],[2,-1,-2,-1,181],[0,1,2,1,-177],[4,0,-2,-1,176],[4,-1,-1,-1,166],[1,0,1,-1,-164],[4,0,1,-1,132],[1,0,-1,-1,-119],[4,-1,0,-1,115],[2,-2,0,1,107]];function xn(n){let e=n%360;return e<0&&(e+=360),e}function X_(n){const e=n/36525,t=218.3164477+(481267.8812342+(-.0015786+(1/538841-e/65194e3)*e)*e)*e,i=297.8501921+(445267.1114034+(-.0018819+(1/545868-e/113065e3)*e)*e)*e,r=357.5291092+(35999.0502909+(-1536e-7+e/2449e4)*e)*e,s=134.9633964+(477198.8675055+(.0087414+(1/69699.9+e/14712e3)*e)*e)*e,a=93.272095+(483202.0175233+(-.0036539+(-1/3526e3+e/86331e4)*e)*e)*e,o=119.75+131.849*e,c=53.09+479264.29*e,l=313.45+481266.484*e,u=1+(-.002516-74e-7*e)*e,d=u*u,h=xn(t)*nn,p=xn(i)*nn,g=xn(r)*nn,v=xn(s)*nn,m=xn(a)*nn,f=xn(o)*nn,S=xn(c)*nn,_=xn(l)*nn;let E=0,C=0;for(const M of V_){const[R,B,O,X,q,V]=M,Y=R*p+B*g+O*v+X*m;let k=q,se=V;Math.abs(B)===1?(k*=u,se*=u):Math.abs(B)===2&&(k*=d,se*=d),E+=k*Math.sin(Y),C+=se*Math.cos(Y)}E+=3958*Math.sin(f)+1962*Math.sin(h-m)+318*Math.sin(S);let T=0;for(const M of W_){const[R,B,O,X,q]=M,V=R*p+B*g+O*v+X*m;let Y=q;Math.abs(B)===1?Y*=u:Math.abs(B)===2&&(Y*=d),T+=Y*Math.sin(V)}T+=-2235*Math.sin(h)+382*Math.sin(_)+175*Math.sin(f-m)+175*Math.sin(f+m)+127*Math.sin(h-v)-115*Math.sin(h+v);const D=xn(t+E/1e6),L=T/1e6,A=385000.56+C/1e3;return{lon:D,lat:L,deltaAu:A/G_}}function Y_(n,e,t){const i=t/36525,r=(5028.796195*i+.556602*i*i)/3600,s=-46.836769*i+.005971*i*i,a=n-r,o=e-Math.cos(n*nn)*s/3600;return{lon:a,lat:o}}function $r(n){const e=X_(n),t=Y_(e.lon,e.lat,n),i=t.lon*nn,r=t.lat*nn,s=e.deltaAu;return[s*Math.cos(r)*Math.cos(i),s*Math.cos(r)*Math.sin(i),s*Math.sin(r)]}function q_(n){let e=n>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function K_(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function Bt(n,e,t){const i=r=>Math.round(255*(n[r]+(e[r]-n[r])*t));return`rgb(${i(0)},${i(1)},${i(2)})`}function $_(n){const i=document.createElement("canvas");i.width=512,i.height=256;const r=i.getContext("2d"),s=q_(K_(n.id)),a=n.color,o=n.color2??n.color,c=n.texture??"rock";if(c==="sun"){const u=r.createLinearGradient(0,0,0,256);u.addColorStop(0,Bt(a,o,.6)),u.addColorStop(.5,Bt(a,o,.2)),u.addColorStop(1,Bt(a,o,.6)),r.fillStyle=u,r.fillRect(0,0,512,256);for(let d=0;d<900;d++){const h=s()*512,p=s()*256,g=1+s()*5;r.fillStyle=s()>.5?`rgba(255,220,140,${.05+s()*.1})`:`rgba(255,140,40,${.05+s()*.08})`,r.beginPath(),r.arc(h,p,g,0,Math.PI*2),r.fill()}}else if(c==="gas"){const u=14+Math.floor(s()*8);for(let d=0;d<u;d++){const h=d/u*256,p=256/u,g=.5+.5*Math.sin(d/u*Math.PI*(2+s()*2));r.fillStyle=Bt(a,o,g),r.fillRect(0,h,512,p+1)}for(let d=0;d<260;d++){const h=s()*512,p=s()*256,g=20+s()*90,v=2+s()*6;r.fillStyle=`rgba(255,255,255,${.02+s()*.05})`,r.fillRect(h,p,g,v)}if(s()>.4){const d=s()*512,h=256*(.3+s()*.4),p=26+s()*20,g=10+s()*8;r.fillStyle=Bt(o,[1,.95,.9],.55),r.beginPath(),r.ellipse(d,h,p,g,0,0,Math.PI*2),r.fill()}}else if(c==="ice"){const u=r.createLinearGradient(0,0,0,256);u.addColorStop(0,Bt(a,[1,1,1],.25)),u.addColorStop(.5,Bt(a,o,.3)),u.addColorStop(1,Bt(a,[1,1,1],.25)),r.fillStyle=u,r.fillRect(0,0,512,256);for(let d=0;d<40;d++){const h=s()*256;r.fillStyle=`rgba(255,255,255,${.03+s()*.05})`,r.fillRect(0,h,512,1+s()*3)}}else if(c==="earth"){r.fillStyle=Bt(a,[0,.1,.35],.3),r.fillRect(0,0,512,256);const u=Bt(n.color2??a,[.3,.5,.25],.5);for(let d=0;d<26;d++){const h=s()*512,p=256*(.15+s()*.7);r.fillStyle=s()>.25?u:Bt(a,[.4,.35,.25],.5);const g=6+Math.floor(s()*8);for(let v=0;v<g;v++){const m=h+(s()-.5)*90,f=p+(s()-.5)*44;r.beginPath(),r.arc(m,f,6+s()*18,0,Math.PI*2),r.fill()}}r.fillStyle="rgba(245,248,252,0.9)",r.fillRect(0,0,512,14),r.fillRect(0,242,512,14);for(let d=0;d<120;d++){const h=s()*512,p=s()*256;r.fillStyle=`rgba(255,255,255,${.06+s()*.12})`,r.beginPath(),r.ellipse(h,p,8+s()*26,2+s()*5,0,0,Math.PI*2),r.fill()}}else if(c==="volcanic"){r.fillStyle=Bt(a,o,.4),r.fillRect(0,0,512,256);for(let u=0;u<300;u++){const d=s()*512,h=s()*256,p=1+s()*4;r.fillStyle=s()>.7?`rgba(255,90,20,${.25+s()*.4})`:`rgba(60,40,30,${.1+s()*.2})`,r.beginPath(),r.arc(d,h,p,0,Math.PI*2),r.fill()}}else{r.fillStyle=Bt(a,o,.3),r.fillRect(0,0,512,256);for(let u=0;u<700;u++){const d=s()*512,h=s()*256,p=.5+s()*3,g=s()>.5?"255,255,255":"0,0,0";r.fillStyle=`rgba(${g},${.03+s()*.08})`,r.beginPath(),r.arc(d,h,p,0,Math.PI*2),r.fill()}for(let u=0;u<90;u++){const d=s()*512,h=s()*256,p=2+s()*9;r.fillStyle=`rgba(0,0,0,${.12+s()*.12})`,r.beginPath(),r.arc(d,h,p,0,Math.PI*2),r.fill(),r.strokeStyle=`rgba(255,255,255,${.08+s()*.1})`,r.lineWidth=1,r.beginPath(),r.arc(d,h,p,-.4*Math.PI,.6*Math.PI),r.stroke()}}const l=new Wd(i);return l.colorSpace=Rt,l.wrapS=Lr,l}const j_={A:690,B:665,C:725,D:725,E:620,F:580,G:770,H:755,I:350,J:430,K:720,L:565,M:945,N:760,O:775,P:635,Q:775,R:695,S:610,T:630,U:730,V:680,W:1020,X:680,Y:670,Z:600},jt=512,eh=128,Z_=60,J_=464,th=.24;function ba(n){const e=n.toUpperCase(),t=e.split("").map(u=>j_[u]??600),i=t.reduce((u,d)=>u+d,0)/1e3,r=th,s=Math.min(Z_,J_/(i+r*(e.length-1))),a=t.map(u=>u/1e3*s),o=s*r,c=a.reduce((u,d)=>u+d,0)+o*(e.length-1),l=jt/2-c/2;return{fontSize:s,inkStartX:l,inkWidthPx:c,charWidths:a}}function Q_(n,e,t="base"){n.textAlign="center",n.textBaseline="middle";const i=e.toUpperCase(),{fontSize:r,inkStartX:s,inkWidthPx:a,charWidths:o}=ba(e),c=r*th;n.font=`${r}px Georgia, "Times New Roman", serif`;const l=()=>{let h=s;for(let p=0;p<i.length;p++)n.fillText(i[p],h+o[p]/2,50),h+=o[p]+c},u=t==="green"?{glow:"rgba(124, 252, 90, 0.9)",halo:"rgba(150, 255, 120, 0.85)",core:"#eaffe8",flourish:"rgba(124, 252, 90, 0.5)",diamond:"rgba(190, 255, 160, 0.85)"}:{glow:"rgba(143, 176, 255, 0.9)",halo:"rgba(190, 210, 250, 0.9)",core:"#eef4ff",flourish:"rgba(160, 185, 235, 0.5)",diamond:"rgba(205, 224, 255, 0.85)"};n.shadowColor=u.glow,n.shadowBlur=14,n.fillStyle=u.halo,l(),l(),n.shadowBlur=0,n.fillStyle=u.core,l();const d=90;n.strokeStyle=u.flourish,n.lineWidth=2,n.beginPath(),n.moveTo(s-16,d),n.lineTo(jt/2-10,d),n.moveTo(jt/2+10,d),n.lineTo(s+a+16,d),n.stroke(),n.fillStyle=u.diamond,n.beginPath(),n.moveTo(jt/2,d-5),n.lineTo(jt/2+5,d),n.lineTo(jt/2,d+5),n.lineTo(jt/2-5,d),n.closePath(),n.fill()}function e2(n){const e=document.createElement("canvas");e.width=256,e.height=64;const t=e.getContext("2d");t.font="600 30px system-ui, sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillStyle="rgba(10,14,24,0.45)";const i=t.measureText(n).width;t.fillRect(128-i/2-10,12,i+20,40),t.fillStyle="#dbe6f5",t.fillText(n,128,33);const r=new Wd(e);return r.colorSpace=Rt,r}const t2=[{id:"asteroid-belt",name:"Main asteroid belt",count:1800,seed:24301,a:[2.1,3.3],e:[0,.25],i:[0,12],baseSize:.05,sizeJitter:.5,color:13615788},{id:"kuiper-belt",name:"Kuiper belt",count:1400,seed:6923,a:[30,48],e:[0,.3],i:[0,8],baseSize:.075,sizeJitter:.6,color:12374766}];function n2(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function i2(n){const e=n2(n.seed),t=(r,s)=>r+e()*(s-r),i=[];for(let r=0;r<n.count;r++){const s=t(n.a[0],n.a[1]),a=t(n.e[0],n.e[1]),o=t(n.i[0],n.i[1]),c=365.25*Math.pow(s,1.5);i.push({elements:{a:s,e:a,i:o,node:t(0,360),peri:t(0,360),M0:t(0,360),n:360/c},size:n.baseSize*(1-n.sizeJitter+2*n.sizeJitter*e()),spin:[e()*Math.PI*2,e()*Math.PI*2,e()*Math.PI*2],shade:e()})}return i}const r2=new Gc(1,0),s2=new Qe,a2=new P,o2=new wn,c2=new P,l2=new cn,u2={x:0,y:0,z:0};function d2(n){const e=i2(n),t=new hc({color:n.color,emissive:new Oe(n.color).multiplyScalar(.12),roughness:.85,metalness:0}),i=new s_(r2,t,e.length);i.name=n.name,i.castShadow=!1,i.receiveShadow=!1,i.frustumCulled=!1;const r=new Oe(n.color),s=new Oe;for(let a=0;a<e.length;a++){const o=.65+.5*e[a].shade;s.copy(r).multiplyScalar(o),i.setColorAt(a,s)}return i.instanceColor&&(i.instanceColor.needsUpdate=!0),{def:n,mesh:i,objects:e,dispose:()=>t.dispose()}}function h2(n,e,t,i=1){const{objects:r,mesh:s}=n,a=s2,o=a2,c=o2,l=c2,u=l2,d=u2;for(let h=0;h<r.length;h++){const p=r[h];oa(p.elements,e,d),o.set(-d.x,d.z,-d.y);const g=Math.hypot(d.x,d.y,d.z),v=t.planetDistance(g)/Math.max(1e-9,g);o.multiplyScalar(v),u.set(p.spin[0]+e*.05,p.spin[1],p.spin[2]),c.setFromEuler(u),l.setScalar(Math.max(1e-6,p.size*i)),a.compose(o,c,l),s.setMatrixAt(h,a)}s.instanceMatrix.needsUpdate=!0}const f2=[{constellation:"Andromeda",centerRAHours:1.0395,centerDecDeg:38.3081,sizeW:33.58,sizeH:33.58,rotationDeg:104.8},{constellation:"Antlia",centerRAHours:10.2756,centerDecDeg:-28.7018,sizeW:18.52,sizeH:18.52,rotationDeg:-7.06},{constellation:"Apus",centerRAHours:15.2834,centerDecDeg:-81.9025,sizeW:14.06,sizeH:14.06,rotationDeg:-8.04},{constellation:"Aquarius",centerRAHours:22.2682,centerDecDeg:-12.0784,sizeW:39.52,sizeH:39.52,rotationDeg:36.19},{constellation:"Aquila",centerRAHours:19.3715,centerDecDeg:4.6274,sizeW:33.34,sizeH:33.34,rotationDeg:8.17},{constellation:"Ara",centerRAHours:17.4865,centerDecDeg:-54.3975,sizeW:14.37,sizeH:14.37,rotationDeg:123.01},{constellation:"Aries",centerRAHours:2.4582,centerDecDeg:21.6925,sizeW:15.47,sizeH:15.47,rotationDeg:53.16},{constellation:"Auriga",centerRAHours:5.6464,centerDecDeg:37.7631,sizeW:27.38,sizeH:27.38,rotationDeg:-50.09},{constellation:"Boötes",centerRAHours:14.0786,centerDecDeg:30.7778,sizeW:41.45,sizeH:41.45,rotationDeg:-59.35},{constellation:"Caelum",centerRAHours:4.8036,centerDecDeg:-38.5623,sizeW:8.61,sizeH:8.61,rotationDeg:-64.4},{constellation:"Camelopardalis",centerRAHours:4.8352,centerDecDeg:66.1305,sizeW:27.7,sizeH:27.7,rotationDeg:31.64},{constellation:"Cancer",centerRAHours:8.514,centerDecDeg:18.7572,sizeW:23.95,sizeH:23.95,rotationDeg:-36.21},{constellation:"Canes Venatici",centerRAHours:12.374,centerDecDeg:37.7938,sizeW:13.4,sizeH:13.4,rotationDeg:-1.44},{constellation:"Canis Major",centerRAHours:6.7685,centerDecDeg:-22.5863,sizeW:21.77,sizeH:21.77,rotationDeg:-22.51},{constellation:"Canis Minor",centerRAHours:7.511,centerDecDeg:6.5471,sizeW:8.05,sizeH:8.05,rotationDeg:-15.14},{constellation:"Capricornus",centerRAHours:20.9965,centerDecDeg:-16.7297,sizeW:19.54,sizeH:19.54,rotationDeg:38.18},{constellation:"Carina",centerRAHours:8.5278,centerDecDeg:-49.9536,sizeW:56.59,sizeH:56.59,rotationDeg:5.3},{constellation:"Cassiopeia",centerRAHours:1.012,centerDecDeg:61.2874,sizeW:14.38,sizeH:14.38,rotationDeg:-174.71},{constellation:"Centaurus",centerRAHours:13.4657,centerDecDeg:-48.339,sizeW:43.27,sizeH:43.27,rotationDeg:19.52},{constellation:"Cepheus",centerRAHours:21.8497,centerDecDeg:62.7364,sizeW:27.44,sizeH:27.44,rotationDeg:110.54},{constellation:"Cetus",centerRAHours:1.9036,centerDecDeg:-4.0029,sizeW:46.26,sizeH:46.26,rotationDeg:-30.44},{constellation:"Chamaeleon",centerRAHours:9.806,centerDecDeg:-80.5706,sizeW:12.92,sizeH:12.92,rotationDeg:38.7},{constellation:"Circinus",centerRAHours:15.068,centerDecDeg:-62.052,sizeW:6.08,sizeH:6.08,rotationDeg:-80},{constellation:"Columba",centerRAHours:6.0208,centerDecDeg:-36.9013,sizeW:12.03,sizeH:12.03,rotationDeg:-59.17},{constellation:"Coma Berenices",centerRAHours:12.7221,centerDecDeg:21.8852,sizeW:13.67,sizeH:13.67,rotationDeg:-5.4},{constellation:"Corona Australis",centerRAHours:18.9382,centerDecDeg:-38.9407,sizeW:5.73,sizeH:5.73,rotationDeg:49.76},{constellation:"Corona Borealis",centerRAHours:15.7454,centerDecDeg:28.8407,sizeW:7.46,sizeH:7.46,rotationDeg:35.96},{constellation:"Corvus",centerRAHours:12.3689,centerDecDeg:-19.8,sizeW:10.05,sizeH:10.05,rotationDeg:12.08},{constellation:"Crater",centerRAHours:11.4061,centerDecDeg:-16.6513,sizeW:15.03,sizeH:15.03,rotationDeg:-59.19},{constellation:"Crux",centerRAHours:12.4909,centerDecDeg:-59.4203,sizeW:6.16,sizeH:6.16,rotationDeg:-51},{constellation:"Cygnus",centerRAHours:20.5417,centerDecDeg:40.7423,sizeW:33.49,sizeH:33.49,rotationDeg:-3.98},{constellation:"Delphinus",centerRAHours:20.6889,centerDecDeg:14.1666,sizeW:5.38,sizeH:5.38,rotationDeg:11.94},{constellation:"Dorado",centerRAHours:4.9914,centerDecDeg:-59.9197,sizeW:17.18,sizeH:17.18,rotationDeg:2.95},{constellation:"Draco",centerRAHours:16.4625,centerDecDeg:68.1989,sizeW:53.91,sizeH:53.91,rotationDeg:157.16},{constellation:"Equuleus",centerRAHours:21.2857,centerDecDeg:7.0768,sizeW:6.82,sizeH:6.82,rotationDeg:140.86},{constellation:"Eridanus",centerRAHours:3.6997,centerDecDeg:-29.3322,sizeW:62.38,sizeH:62.38,rotationDeg:15.76},{constellation:"Fornax",centerRAHours:2.9332,centerDecDeg:-27.6337,sizeW:10.35,sizeH:10.35,rotationDeg:32.8},{constellation:"Gemini",centerRAHours:6.8661,centerDecDeg:23.0133,sizeW:23.64,sizeH:23.64,rotationDeg:-16.6},{constellation:"Grus",centerRAHours:22.4926,centerDecDeg:-45.9337,sizeW:21.03,sizeH:21.03,rotationDeg:-3.05},{constellation:"Hercules",centerRAHours:16.9534,centerDecDeg:32.6047,sizeW:34.25,sizeH:34.25,rotationDeg:-154.02},{constellation:"Horologium",centerRAHours:3.3301,centerDecDeg:-52.1545,sizeW:21.4,sizeH:21.4,rotationDeg:82.8},{constellation:"Hydra",centerRAHours:10.7434,centerDecDeg:-13.0387,sizeW:69,sizeH:69,rotationDeg:25.08},{constellation:"Hydrus",centerRAHours:1.7871,centerDecDeg:-70.8057,sizeW:18.13,sizeH:18.13,rotationDeg:116.07},{constellation:"Indus",centerRAHours:20.9868,centerDecDeg:-51.0624,sizeW:19.37,sizeH:19.37,rotationDeg:158.9},{constellation:"Lacerta",centerRAHours:22.4731,centerDecDeg:43.7246,sizeW:14.83,sizeH:14.83,rotationDeg:-52.15},{constellation:"Leo",centerRAHours:10.6939,centerDecDeg:15.7158,sizeW:34.87,sizeH:34.87,rotationDeg:41.32},{constellation:"Leo Minor",centerRAHours:10.0684,centerDecDeg:33.1938,sizeW:15.92,sizeH:15.92,rotationDeg:-30.85},{constellation:"Lepus",centerRAHours:5.5834,centerDecDeg:-18.7299,sizeW:15.47,sizeH:15.47,rotationDeg:-17.59},{constellation:"Libra",centerRAHours:15.4844,centerDecDeg:-18.4806,sizeW:20.85,sizeH:20.85,rotationDeg:56.73},{constellation:"Lupus",centerRAHours:15.2093,centerDecDeg:-44.014,sizeW:24.43,sizeH:24.43,rotationDeg:-95.96},{constellation:"Lynx",centerRAHours:7.8559,centerDecDeg:43.9368,sizeW:41.1,sizeH:41.1,rotationDeg:-19.6},{constellation:"Lyra",centerRAHours:18.837,centerDecDeg:34.8687,sizeW:12.31,sizeH:12.31,rotationDeg:17.08},{constellation:"Mensa",centerRAHours:5.3062,centerDecDeg:-72.4754,sizeW:10.83,sizeH:10.83,rotationDeg:85.44},{constellation:"Microscopium",centerRAHours:20.8316,centerDecDeg:-33.2382,sizeW:2.54,sizeH:2.54,rotationDeg:60.01},{constellation:"Monoceros",centerRAHours:7.186,centerDecDeg:-.671,sizeW:30.36,sizeH:30.36,rotationDeg:.47},{constellation:"Musca",centerRAHours:12.3534,centerDecDeg:-69.5563,sizeW:8.77,sizeH:8.77,rotationDeg:-118.48},{constellation:"Norma",centerRAHours:16.293,centerDecDeg:-52.2943,sizeW:8.41,sizeH:8.41,rotationDeg:112.64},{constellation:"Octans",centerRAHours:21.5805,centerDecDeg:-81.1772,sizeW:9.36,sizeH:9.36,rotationDeg:-168.38},{constellation:"Ophiuchus",centerRAHours:17.1828,centerDecDeg:-4.6091,sizeW:56.3,sizeH:56.3,rotationDeg:3.97},{constellation:"Orion",centerRAHours:5.6152,centerDecDeg:3.5699,sizeW:29.12,sizeH:29.12,rotationDeg:27.5},{constellation:"Pavo",centerRAHours:19.4327,centerDecDeg:-65.8902,sizeW:26.78,sizeH:26.78,rotationDeg:.78},{constellation:"Pegasus",centerRAHours:23.0709,centerDecDeg:21.6673,sizeW:48.7,sizeH:48.7,rotationDeg:138.12},{constellation:"Perseus",centerRAHours:3.5718,centerDecDeg:44.6834,sizeW:29.4,sizeH:29.4,rotationDeg:-8.39},{constellation:"Phoenix",centerRAHours:.9855,centerDecDeg:-47.5277,sizeW:16.91,sizeH:16.91,rotationDeg:54.9},{constellation:"Pictor",centerRAHours:6.1132,centerDecDeg:-57.6748,sizeW:13.08,sizeH:13.08,rotationDeg:-2.22},{constellation:"Pisces",centerRAHours:.6197,centerDecDeg:9.4168,sizeW:44.47,sizeH:44.47,rotationDeg:40.9},{constellation:"Piscis Austrinus",centerRAHours:22.3306,centerDecDeg:-32.5012,sizeW:14.14,sizeH:14.14,rotationDeg:-124.26},{constellation:"Puppis",centerRAHours:7.608,centerDecDeg:-36.52,sizeW:43.46,sizeH:21.14,rotationDeg:67.2},{constellation:"Pyxis",centerRAHours:8.7629,centerDecDeg:-31.3781,sizeW:7.45,sizeH:7.45,rotationDeg:-67.04},{constellation:"Reticulum",centerRAHours:4.057,centerDecDeg:-62.2078,sizeW:6.14,sizeH:6.14,rotationDeg:104.71},{constellation:"Sagitta",centerRAHours:19.8636,centerDecDeg:18.8067,sizeW:4.97,sizeH:4.97,rotationDeg:-115.1},{constellation:"Sagittarius",centerRAHours:18.9367,centerDecDeg:-29.5732,sizeW:30.49,sizeH:30.49,rotationDeg:23.71},{constellation:"Scorpius",centerRAHours:16.7957,centerDecDeg:-32.1996,sizeW:26.41,sizeH:26.41,rotationDeg:-.89},{constellation:"Sculptor",centerRAHours:.2885,centerDecDeg:-31.0322,sizeW:23.27,sizeH:23.27,rotationDeg:41.08},{constellation:"Scutum",centerRAHours:18.6347,centerDecDeg:-9.8787,sizeW:11.56,sizeH:11.56,rotationDeg:34.15},{constellation:"Sextans",centerRAHours:10.2407,centerDecDeg:-2.1621,sizeW:15.91,sizeH:15.91,rotationDeg:20.26},{constellation:"Taurus",centerRAHours:4.3438,centerDecDeg:18.0278,sizeW:34.74,sizeH:34.74,rotationDeg:-19.7},{constellation:"Telescopium",centerRAHours:18.39,centerDecDeg:-46.7658,sizeW:4.91,sizeH:4.91,rotationDeg:12.21},{constellation:"Triangulum",centerRAHours:2.0458,centerDecDeg:31.5524,sizeW:7.92,sizeH:7.92,rotationDeg:32.51},{constellation:"Triangulum Australe",centerRAHours:16.142,centerDecDeg:-68.6055,sizeW:9.97,sizeH:9.97,rotationDeg:58.74},{constellation:"Tucana",centerRAHours:23.3453,centerDecDeg:-62.819,sizeW:23.69,sizeH:23.69,rotationDeg:-16.67},{constellation:"Ursa Major",centerRAHours:11.4059,centerDecDeg:54.6756,sizeW:55.12,sizeH:55.12,rotationDeg:-34.58},{constellation:"Ursa Minor",centerRAHours:14.914,centerDecDeg:78.7873,sizeW:18.67,sizeH:18.67,rotationDeg:49.09},{constellation:"Vela",centerRAHours:9.494,centerDecDeg:-49.58,sizeW:32.58,sizeH:19.03,rotationDeg:-171.6},{constellation:"Virgo",centerRAHours:13.2926,centerDecDeg:1.7026,sizeW:40.52,sizeH:40.52,rotationDeg:34.44},{constellation:"Volans",centerRAHours:7.9189,centerDecDeg:-71.7208,sizeW:11.99,sizeH:11.99,rotationDeg:-9.09},{constellation:"Vulpecula",centerRAHours:19.7674,centerDecDeg:25.1729,sizeW:14.78,sizeH:14.78,rotationDeg:31.89}];function p2(n){const e=n.centerRAHours*15*Math.PI/180,t=n.centerDecDeg*Math.PI/180,i=Math.cos(t),r=[-i*Math.cos(e),Math.sin(t),-i*Math.sin(e)];let s=[-r[1]*r[0],1-r[1]*r[1],-r[1]*r[2]];s[0]*s[0]+s[1]*s[1]+s[2]*s[2]<1e-6&&(s=[1,0,0]);const a=m2(s);return{position:r,upHint:a,planeSize:[n.sizeW*Math.PI/180,n.sizeH*Math.PI/180],rotationRad:n.rotationDeg*Math.PI/180}}function m2(n){const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]}const ci={mapSize:2048,near:.05,far:140,bias:-4e-4,normalBias:.02};function g2(n,e=ci.far){n.castShadow=!0;const t=n.shadow;t.mapSize.set(ci.mapSize,ci.mapSize),t.camera.near=ci.near,t.camera.far=e,t.bias=ci.bias,t.normalBias=ci.normalBias}function _2(n,e){n.castShadow=!e,n.receiveShadow=!e}const Uu=1.35,Mn=[[.387098,5],[.723321,9.724486],[1,15.051293],[1.523712,23.211311],[2.7675,28.814579],[5.20248,43.956733],[9.541499,66.964136],[19.187979,84.022651],[30.069528,102.130054],[39.482117,126.602786],[43.11,128.602786],[45.43,130.602786],[67.864,132.602786]];function v2(n){if(n<=Mn[0][0])return Mn[0][1];for(let s=1;s<Mn.length;s++){const[a,o]=Mn[s];if(n<=a){const[c,l]=Mn[s-1];return l+(n-c)/(a-c)*(o-l)}}const[e,t]=Mn[Mn.length-2],[i,r]=Mn[Mn.length-1];return r+(n-i)/(i-e)*(r-t)}function nh(n){return .8+.45*Math.log10(n/100+1)}function x2(n){return Math.max(.08,.08+.09*Math.log10(n/100+1))}function ih(n){return .9+1.7*Math.sqrt(n/4e5)}const M2={moon:{floor:2.208715,cap:3.111655},phobos:{floor:1.978417,cap:2.79312},deimos:{floor:2.294943,cap:2.794943},amalthea:{floor:2.584476,cap:11.023209},io:{floor:3.034156,cap:10.93183},europa:{floor:3.569515,cap:10.937531},ganymede:{floor:4.118656,cap:10.918046},callisto:{floor:4.683945,cap:10.921384},himalia:{floor:5.143966,cap:11.023314},enceladus:{floor:5.170574,cap:8.103596},tethys:{floor:5.601783,cap:8.080787},dione:{floor:6.057633,cap:8.078954},rhea:{floor:6.525752,cap:8.068518},titan:{floor:7.048484,cap:8.024341},iapetus:{floor:7.569867,cap:8.069867},miranda:{floor:4.292651,cap:6.671852},ariel:{floor:4.72486,cap:6.644337},umbriel:{floor:5.184918,cap:6.644004},titania:{floor:5.655488,cap:6.633825},oberon:{floor:6.135031,cap:6.635031},triton:{floor:2.461502,cap:9.679395},nereid:{floor:8.720057,cap:9.745187}};function S2(n,e){const t=M2[n];if(!t)return null;let i=ih(e);return i<t.floor&&(i=t.floor),t.cap!==void 0&&i>t.cap&&(i=t.cap),i}function y2(n){return Math.max(3,nh(n)*6)}const Mo=1,ji=1495978707e-1,lr={bodyRadiusKm:nh,moonRadiusKm:x2,planetDistance:v2,moonDistance:(n,e)=>(e?S2(e,n):null)??ih(n),followDistanceKm:y2,beltSizeFactor:1},Gn={bodyRadiusKm:n=>n/ji*Mo,moonRadiusKm:n=>n/ji*Mo,planetDistance:n=>n,moonDistance:n=>n/ji*Mo,followDistanceKm:n=>Math.max(1.5,n/ji*8),beltSizeFactor:0};function E2(n,e,t){const i=(r,s)=>r+(s-r)*t;return{bodyRadiusKm:r=>i(n.bodyRadiusKm(r),e.bodyRadiusKm(r)),moonRadiusKm:r=>i(n.moonRadiusKm(r),e.moonRadiusKm(r)),planetDistance:r=>i(n.planetDistance(r),e.planetDistance(r)),moonDistance:(r,s)=>i(n.moonDistance(r,s),e.moonDistance(r,s)),followDistanceKm:r=>i(n.followDistanceKm(r),e.followDistanceKm(r)),beltSizeFactor:i(n.beltSizeFactor??1,e.beltSizeFactor??0)}}function ca(n){return new P(-n.x,n.z,-n.y)}function Nu(n,e){return e.set(-n.x,n.z,-n.y),e}function A2(n,e){const t=k_(n,0,256),i=t.map(u=>{const d=Math.hypot(u.x,u.y,u.z);return ca(u).multiplyScalar(e(d)/Math.max(1e-9,d))}),r=new pt().setFromPoints(i),s=new Aa({color:5599392,transparent:!0,opacity:.45}),a=new Bc(r,s),o=t.length,c=new Float32Array(o),l=new Float32Array(o*3);for(let u=0;u<o;u++){const d=t[u];c[u]=Math.hypot(d.x,d.y,d.z);const h=ca(d).normalize();l[u*3]=h.x,l[u*3+1]=h.y,l[u*3+2]=h.z}return a.userData.radii=c,a.userData.unitDirs=l,a.userData.geo=r,a.userData.mat=s,a}function T2(n,e,t){const i=new Q1({canvas:n,antialias:!0,preserveDrawingBuffer:!0});i.setPixelRatio(Math.min(window.devicePixelRatio,2)),i.setSize(window.innerWidth,window.innerHeight),i.outputColorSpace=Rt,i.shadowMap.enabled=!0,i.shadowMap.type=fd;const r=new e_;r.background=new Oe(5);const s=new Gt(50,window.innerWidth/window.innerHeight,5e-4,2e4);s.position.set(0,16,30);const a=new A_(s,i.domElement);a.rotateSpeed=4,a.zoomSpeed=1.2,a.dynamicDampingFactor=.2;const o=new d_(16773848,3.5,0,0);g2(o,ci.far),r.add(o),r.add(new h_(2240580,.4));const c=4e3,l=new Float32Array(c*3);for(let _=0;_<c;_++){const E=Math.random(),C=Math.random(),T=2*Math.PI*E,D=Math.acos(2*C-1),L=5e3+Math.random()*3e3;l[_*3]=L*Math.sin(D)*Math.cos(T),l[_*3+1]=L*Math.cos(D),l[_*3+2]=L*Math.sin(D)*Math.sin(T)}const u=new pt;u.setAttribute("position",new Wt(l,3));const d=new sa({color:14542581,size:1.3,sizeAttenuation:!1,transparent:!0,opacity:.55});r.add(new dc(u,d));const h=X2();r.add(h);const p=q2();r.add(p);const g=[u,d],v=new Map,m=[...e.filter(_=>_.kind!=="moon"),...e.filter(_=>_.kind==="moon")];for(const _ of m){const E=_.kind==="star",C=_.kind==="moon",T=E?t===Gn?_.radiusKm/ji*1.15:Uu:C?t.moonRadiusKm(_.radiusKm):t.bodyRadiusKm(_.radiusKm),D=E?_.radiusKm/ji*1.15:C?Gn.moonRadiusKm(_.radiusKm):Gn.bodyRadiusKm(_.radiusKm),L=E?Uu:C?lr.moonRadiusKm(_.radiusKm):lr.bodyRadiusKm(_.radiusKm),A=new Vc(T,48,32),M=$_(_),R=E?new Fr({map:M}):new hc({map:M,roughness:.92,metalness:0});g.push(A,R,M);const B=new It(A,R);B.name=_.name,B.userData.id=_.id,_2(B,E);const O=new fi;O.name=`pivot:${_.name}`,O.rotation.z=cc.degToRad(_.tiltDeg??0),O.add(B),r.add(O);const X=new aa(1.55,2.35,64),q=new Fr({color:8378623,side:Zt,transparent:!0,opacity:0,depthWrite:!1}),V=new It(X,q);V.rotation.x=-Math.PI/2,V.scale.setScalar(Math.max(.001,T)),V.visible=!1,O.add(V),g.push(X,q);let Y=null;if(_.rings){const he=T*_.rings.inner,ce=T*_.rings.outer,ye=new aa(he,ce,96),Ae=new hc({color:new Oe(..._.rings.color),side:Zt,transparent:!0,opacity:_.rings.opacity,roughness:.9,metalness:0}),be=new It(ye,Ae);be.rotation.x=-Math.PI/2,be.castShadow=!0,be.receiveShadow=!0,O.add(be),Y=be,g.push(ye,Ae)}const k=e2(_.name),se=new Gd({map:k,depthTest:!1}),ue=new n_(se),me=E?3.4:Math.max(1.3,T*2.4);ue.scale.set(me,me*.25,1),ue.position.y=T+me*.35,O.add(ue),g.push(k,se);let Ce=null;if(_.elements){const he=ce=>C?t.moonDistance(ce,_.id):t.planetDistance(ce);if(_.id==="moon"){const ye=[],Ae=new Float32Array(129),be=new Float32Array(129*3);for(let tt=0;tt<=128;tt++){const ze=$r(0+tt/128*27.55455),Xe=Math.hypot(ze[0],ze[1],ze[2]),ve=Xe*Dn,st=ca({x:ze[0],y:ze[1],z:ze[2]});ye.push(st.clone().multiplyScalar(t.moonDistance(ve,"moon")/Math.max(1e-9,Xe))),Ae[tt]=ve;const Te=st.normalize();be[tt*3]=Te.x,be[tt*3+1]=Te.y,be[tt*3+2]=Te.z}const nt=new pt().setFromPoints(ye),w=new Aa({color:5599392,transparent:!0,opacity:.45});Ce=new Bc(nt,w),Ce.userData.geo=nt,Ce.userData.mat=w,Ce.userData.radii=Ae,Ce.userData.unitDirs=be,g.push(nt,w)}else Ce=A2(_.elements,he),C||r.add(Ce)}const qe=C&&_.parent?v.get(_.parent)??null:null,W=_.rings?2*T*_.rings.outer:2*T,Q={def:_,pivot:O,mesh:B,label:ue,orbit:Ce,orbitEmphasis:V,ringsMesh:Y,parent:qe,spin:0,worldPos:new P,sceneRadius:T,visibleRadius:L,trueRadius:D,builtRadius:T,frameExtent:W};v.set(_.id,Q)}for(const _ of v.values())_.orbit&&_.parent&&(_.orbit.removeFromParent(),_.parent.pivot.add(_.orbit));const f=[];for(const _ of t2){const E=d2(_);f.push(E),r.add(E.mesh)}ch({belts:f},0,t);function S(){for(const _ of g)_.dispose();for(const _ of f)_.dispose();h.userData.dispose?.();for(const _ of p.children){const E=_;E.geometry.dispose(),E.material.dispose()}a.dispose(),i.dispose()}return{renderer:i,camera:s,controls:a,scene:r,bodies:v,belts:f,sunLight:o,starMat:d,constellations:h,constellationFigures:p,userData:{},dispose:S}}const ft=4800;function $c(n){let e=0,t=0,i=0;for(const s of n.stars){const[a,o,c]=Ta(s.raHours,s.decDeg);e+=a,t+=o,i+=c}const r=Math.hypot(e,t,i)||1;return[e/r,t/r,i/r]}function Ir(n,e){return n[0]*e[0]+n[1]*e[1]+n[2]*e[2]}function la(n,e){return[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]]}function Ks(n){const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]}function Da(n){const e=$c(n),t=n.stars.map(m=>Ta(m.raHours,m.decDeg)),i=Math.abs(e[1])<.9?[0,1,0]:[1,0,0],r=Ks(la(e,i)),s=la(e,r);let a=0,o=0,c=0;for(const m of t){const f=Ir(m,r),S=Ir(m,s);a+=f*f,c+=f*S,o+=S*S}const l=.5*Math.atan2(2*c,a-o),u=Math.cos(l),d=Math.sin(l);let h=[r[0]*u+s[0]*d,r[1]*u+s[1]*d,r[2]*u+s[2]*d],p=0,g=0;for(const m of t){const f=Ir(m,h);f>p&&(p=f),-f>g&&(g=-f)}return g>p&&(h=[-h[0],-h[1],-h[2]]),{halfExtent:Math.max(p,g),axis:h,labelDir:m=>{const f=Math.cos(m),S=Math.sin(m);return[e[0]*f+h[0]*S,e[1]*f+h[1]*S,e[2]*f+h[2]*S]}}}const Ou=22,So=48;function b2(n,e){const t=n[0]*e[0]+n[1]*e[1]+n[2]*e[2],i=Math.PI/180,r=Math.acos(Math.min(1,Math.max(-1,t)))/i;return r<=Ou?1:r>=So?0:(So-r)/(So-Ou)}const pc=.28,D2=1,Fu=.05,w2=1,P2=.75;function jc(n){return Fu+(w2-Fu)*Math.pow(n,P2)}const mc=9416959,rh=8191066,R2=.15,C2=2.5;function gc(n){const e=2*Math.PI*(n/C2);return 1-R2*(1-Math.sin(e))/2}const I2=.02,H2=.35,L2=.016,U2=.011,N2=.018;function Zc(n){return Da(n).halfExtent<=N2?U2:L2}function O2(n){const e=Zc(n),t=ba(n.name).fontSize;return e*(jt/t)}function Jc(n){return ba(n.name).inkWidthPx/jt*O2(n)}function F2(n){const e=Da(n);return Math.min(e.halfExtent,H2)+I2+Jc(n)/2}const zu=.006;function z2(n,e){const t=Ks(e),i=Jc(n)/2,r=Zc(n)/2,s=Math.abs(t[1])<.9?[0,1,0]:[1,0,0],a=Ks(la(t,s)),o=Ks(la(t,a)),c=n.stars.map(u=>Ta(u.raHours,u.decDeg)),l=u=>Math.abs(Ir(u,a))<i+zu&&Math.abs(Ir(u,o))<r+zu;for(const[u,d]of n.lines)for(let h=0;h<=1.0001;h+=.05){const p=[c[u][0]+(c[d][0]-c[u][0])*h,c[u][1]+(c[d][1]-c[u][1])*h,c[u][2]+(c[d][2]-c[u][2])*h];if(l(p))return!0}for(const u of c)if(l(u))return!0;return!1}const B2=[1,1.5],k2=[1,-1],Bu=.004,G2=.25,V2=10;function sh(n){const e=n.map((r,s)=>{const a=Da(r),o=$c(r);return{i:s,pose:a,dir:o,margin0:F2(r),inkHalf:Jc(r)/2,halfH:Zc(r)/2+Bu/2}}),t=e.map(r=>r.i).sort((r,s)=>{const a=e[s].pose.halfExtent-e[r].pose.halfExtent;return a!==0?a:n[r].name.localeCompare(n[s].name)}),i=new Array(n.length).fill(null);for(const r of t){const s=e[r];let a=null;for(const c of k2)for(const l of B2){const u=s.margin0*l,d=Math.cos(u),h=c*Math.sin(u),p=[s.dir[0]*d+s.pose.axis[0]*h,s.dir[1]*d+s.pose.axis[1]*h,s.dir[2]*d+s.pose.axis[2]*h];let g=G2*(l-1);z2(n[r],p)&&(g+=V2);for(const v of t){const m=i[v];m&&(g+=W2(s,p,m))}(!a||g<a.score)&&(a={score:g,side:c,marginScale:l,dir:p,offset:u})}const o=a;i[r]={side:o.side,marginScale:o.marginScale,dir:o.dir,inkHalf:s.inkHalf+Bu/2,halfH:s.halfH,offset:o.offset}}return i}function W2(n,e,t){const i=n.inkHalf+t.inkHalf,r=n.halfH+t.halfH;let s=e[0]+t.dir[0],a=e[1]+t.dir[1],o=e[2]+t.dir[2];const c=Math.hypot(s,a,o);if(c<1e-6)return 0;s/=c,a/=c,o/=c;let l=a*e[2]-o*e[1],u=o*e[0]-s*e[2],d=s*e[1]-a*e[0];const h=Math.hypot(l,u,d);if(h<1e-6)return 0;l/=h,u/=h,d/=h;const p=a*d-o*u,g=o*l-s*d,v=s*u-a*l,m=l*e[0]+u*e[1]+d*e[2],f=p*e[0]+g*e[1]+v*e[2],S=l*t.dir[0]+u*t.dir[1]+d*t.dir[2],_=p*t.dir[0]+g*t.dir[1]+v*t.dir[2],E=(m-S)/i,C=(f-_)/r,T=E*E+C*C;return T<1?1-T:0}const yo=2,ku=2756,Eo=.5;function ah(n){if(n<=yo)return Eo;if(n>=ku)return 1;const e=(n-yo)/(ku-yo);return Eo+(1-Eo)*e*e*(3-2*e)}function X2(){const n=new fi;n.name="constellations";const e=new sa({color:13623551,size:3.2,sizeAttenuation:!1,transparent:!0,opacity:.9,depthWrite:!1}),t=sh(Dt),i=[],r=[],s=[],a=[];for(let l=0;l<Dt.length;l++){i.push(t[l].dir);const u=Dt[l],d=u.stars.map(C=>{const[T,D,L]=Ta(C.raHours,C.decDeg);return[T*ft,D*ft,L*ft]}),h=[];for(const[C,T]of u.lines)h.push(...d[C],...d[T]);const p=new pt;p.setAttribute("position",new lt(h,3));const g=new Aa({color:mc,transparent:!0,opacity:pc,depthWrite:!1});g.userData.baseColor=mc;const v=new Au(p,g);v.name=`constellation-lines:${u.name}`,n.add(v);const m=(ft+4)/ft,f=[];for(const C of d)f.push(C[0]*m,C[1]*m,C[2]*m);const S=new pt;S.setAttribute("position",new lt(f,3));const _=new sa({color:rh,size:5.2,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1}),E=new dc(S,_);E.name=`constellation-stars-emph:${u.name}`,E.visible=!1,n.add(E),s.push(S),a.push(_);for(const C of d)r.push(...C)}const o=new pt;o.setAttribute("position",new lt(r,3));const c=new dc(o,e);return c.name="constellation-stars",n.add(c),n.userData.labelDirs=i,n.userData.dispose=()=>{for(const l of n.children){const u=l;u instanceof Au&&(u.geometry.dispose(),u.material.dispose())}for(const l of s)l.dispose();for(const l of a)l.dispose();o.dispose(),e.dispose()},n}const ua=new Map(Dt.map((n,e)=>[n.name,e])),Gu=new Map;function Y2(n){return`constellation-figures/${n.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g,"_")}.png`}function q2(){const n=new fi;n.name="constellation-figures",n.visible=!1;const e=new Xd;for(const t of f2){if(!ua.has(t.constellation))continue;let i=Gu.get(t.constellation);i||(i=e.load(Y2(t.constellation)),Gu.set(t.constellation,i)),i.colorSpace=Rt,i.anisotropy=4;const r=p2(t),s=new Fr({map:i,transparent:!0,opacity:0,depthWrite:!1,side:Zt}),a=new It(new qr(1,1),s),o=ft*.998;a.position.set(r.position[0]*o,r.position[1]*o,r.position[2]*o),a.up.set(r.upHint[0],r.upHint[1],r.upHint[2]),a.lookAt(0,0,0),a.rotateZ(r.rotationRad),a.scale.set(r.planeSize[0]*ft,r.planeSize[1]*ft,1),a.name=`constellation-figure:${t.constellation}`,n.add(a)}return n}function K2(n,e,t){for(const i of n.children){const r=i.name??"";if(!r.startsWith("constellation-figure:"))continue;const s=ua.get(r.slice(21));if(s===void 0)continue;const a=e[s]??0,o=Math.min(.85,jc(a))*t;i.visible=o>.005,i.material.opacity=o}}function $2(n,e,t=1,i,r=0){for(const s of n.children){const a=s.name??"";if(a==="constellation-stars"){s.material.opacity=t;continue}if(a.startsWith("constellation-stars-emph:")){if(ua.get(a.slice(25))===void 0)continue;const h=i!=null&&i!==""&&a===`constellation-stars-emph:${i}`,p=s.material;h?p.opacity=gc(r):p.opacity=0,s.visible=p.opacity>.005;continue}const o=a.startsWith("constellation-")?ua.get(a.slice(14).split(":")[1]):void 0;if(o===void 0)continue;const c=e[o]??0,l=s.material;i!=null&&i!==""&&a===`constellation-lines:${i}`?(l.color.setHex(rh),l.opacity=gc(r)):(l.color.setHex(mc),l.opacity=(pc+(D2-pc)*c)*t)}}function oh(n,e,t){let i=n.userData.updateOrder;i||(i=[...n.bodies.values()].sort((a,o)=>{const c=a.parent?1:0,l=o.parent?1:0;return c-l}),n.userData.updateOrder=i);const r=j2,s=Z2;for(const a of i){const{def:o,pivot:c}=a;if(o.kind==="star")c.position.set(0,0,0),a.worldPos.set(0,0,0);else if((o.kind==="planet"||o.kind==="dwarf")&&o.elements){const l=oa(o.elements,e,s),u=Nu(l,r),d=Math.hypot(l.x,l.y,l.z),h=t.planetDistance(d)/Math.max(1e-9,d);c.position.copy(u.multiplyScalar(h)),a.worldPos.copy(c.position)}else if(o.kind==="moon"&&o.elements){let l;if(o.id==="moon"){const m=$r(e);l={x:m[0],y:m[1],z:m[2]}}else l=oa(o.elements,e,s);const u=Nu(l,r),d=Math.hypot(l.x,l.y,l.z),h=o.id==="moon"?d*Dn:d,p=t.moonDistance(h,o.id)/Math.max(1e-9,d),g=u.multiplyScalar(p),v=a.parent;v?(g.applyQuaternion(v.pivot.quaternion),c.position.copy(v.worldPos).add(g)):c.position.copy(g),a.worldPos.copy(c.position)}}}const j2=new P,Z2={x:0,y:0,z:0};function ch(n,e,t){for(const i of n.belts)h2(i,e,t,t.beltSizeFactor)}function J2(n,e){for(const t of n.bodies.values()){const i=t.visibleRadius+(t.trueRadius-t.visibleRadius)*e,r=Math.max(1e-7,i/t.builtRadius);t.mesh.scale.setScalar(r),t.ringsMesh&&t.ringsMesh.scale.setScalar(r),t.orbitEmphasis.scale.setScalar(Math.max(.001,i));const s=t.def.kind==="star"?3.4:Math.max(1.3,i*2.4);t.label.scale.set(s,s*.25,1),t.label.position.y=i+s*.35,t.label.material.opacity=1,t.sceneRadius=i}}function Q2(n,e,t){const i=n.userData.radii,r=n.userData.unitDirs,s=n.userData.geo;if(!i||!r||!s)return;const a=s.getAttribute("position"),o=i.length;for(let c=0;c<o;c++){const l=i[c],u=t?e.moonDistance(l,t):e.planetDistance(l);a.setXYZ(c,r[c*3]*u,r[c*3+1]*u,r[c*3+2]*u)}a.needsUpdate=!0,s.computeBoundingSphere()}function lh(n,e,t){const i=n.userData.radii,r=n.userData.unitDirs,s=n.userData.geo;if(!i||!r||!s)return;const a=s.getAttribute("position"),o=27.55455;for(let c=0;c<=128;c++){const l=$r(e+c/128*o),d=Math.hypot(l[0],l[1],l[2])*Dn,p=ca({x:l[0],y:l[1],z:l[2]}).normalize();i[c]=d,r[c*3]=p.x,r[c*3+1]=p.y,r[c*3+2]=p.z;const g=t.moonDistance(d,"moon");a.setXYZ(c,p.x*g,p.y*g,p.z*g)}a.needsUpdate=!0,s.computeBoundingSphere()}function ev(n,e){for(const t of n.bodies.values()){if(!t.def.rotationHours)continue;const i=t.def.rotationHours/24;t.spin+=e/Math.abs(i)*Math.PI*2*Math.sign(i),t.mesh.rotation.y=t.spin}}function tv(n,e){const t=n.elements?n.elements.a:0;return e.moonDistance(t,n.id)}function uh(n,e){let t=0;for(const i of Yc)i.parent===n&&(t=Math.max(t,tv(i,e)));return t}function nv(n,e,t,i){const r=e!==""&&n===e,s=.5+.5*Math.sin(i*3.4);return{ringVisible:r,ringOpacity:r?.35+.55*s:0,ringBreath:1+.12*s,orbitOpacity:t?r?.95:.45:null,orbitColor:t?r?8378623:5599392:null}}function iv(n,e,t){for(const i of n.bodies.values()){const r=nv(i.def.id,e,i.orbit!==null,t);if(i.orbitEmphasis.visible=r.ringVisible,r.ringVisible){const s=i.orbitEmphasis.material;s.opacity=r.ringOpacity,i.orbitEmphasis.scale.setScalar(i.sceneRadius*r.ringBreath)}if(i.orbit&&r.orbitOpacity!==null&&r.orbitColor!==null){const s=i.orbit.material;s.opacity=r.orbitOpacity,s.color.set(r.orbitColor)}}}const rv=30,_c=.02,sv=260,av=8,ri=new P;function ov(n,e,t,i){if(ri.set(n[0]*ft,n[1]*ft,n[2]*ft),ri.applyMatrix4(e.matrixWorldInverse),ri.z>=-e.near)return{x:0,y:0,ok:!1};const r=ri.x/-ri.z,s=ri.y/-ri.z,a=(r*.5+.5)*t,o=(-s*.5+.5)*i;return!Number.isFinite(a)||!Number.isFinite(o)?{x:0,y:0,ok:!1}:{x:a,y:o,ok:!0}}const vc=new Map;function cv(n,e="base"){const t=`${e}:${n}`;let i=vc.get(t);return i||(i=document.createElement("canvas"),i.width=jt,i.height=eh,Q_(i.getContext("2d"),n,e),vc.set(t,i)),i}function lv(n){const e=document.createElement("canvas");e.id="cst-labels",e.style.cssText="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:5;";const t=n.parentElement;return t&&(t.style.position=t.style.position||"relative"),n.insertAdjacentElement("afterend",e),{canvas:e,setVisible:i=>{e.style.display=i?"block":"none"},dispose:()=>{e.remove(),vc.clear()}}}const uv=4;function dv(n,e,t,i,r,s=av){if(r<=_c)return[];const a=sv,o=uv,c=jt/eh,l=[];for(const h of n){if(h.occluded||!h.emphasized&&h.emphasis<=0)continue;const p=jc(h.emphasis)*r;if(p<=_c)continue;const g=ov(h.dir,e,t,i);if(!g.ok||g.x<-a||g.x>t+a||g.y<-a||g.y>i+a)continue;const v=rv*(h.emphasized?1.12:1),m=c*v,f=ba(h.name).inkWidthPx/jt;l.push({name:h.name,emphasized:h.emphasized,emphasis:h.emphasis,rank:h.emphasized?1:0,x:g.x,y:g.y,inkW:m*f,h:v,w:m,opacity:Math.min(1,p)})}l.sort((h,p)=>p.rank-h.rank||p.emphasis-h.emphasis);const u=[],d=[];for(const h of l){if(u.length>=s)break;const p=h.x-h.inkW/2-o,g=h.x+h.inkW/2+o,v=h.y-h.h/2-o,m=h.y+h.h/2+o;let f=!1;for(const S of d)if(p<S.x2&&g>S.x1&&v<S.y2&&m>S.y1){f=!0;break}f||(d.push({x1:p,x2:g,y1:v,y2:m}),u.push({name:h.name,emphasized:h.emphasized,x:h.x,y:h.y,w:h.w,h:h.h,opacity:h.opacity}))}return u}function hv(n,e,t,i,r,s){const a=n.canvas,o=Math.min(window.devicePixelRatio,2),c=Math.max(1,Math.round(r*o)),l=Math.max(1,Math.round(s*o));a.width!==c&&(a.width=c),a.height!==l&&(a.height=l);const u=a.getContext("2d");if(u.setTransform(1,0,0,1,0,0),u.clearRect(0,0,c,l),i<=.01)return;const d=dv(t,e,r,s,i);for(const h of d){const p=cv(h.name,h.emphasized?"green":"base");u.globalAlpha=h.opacity,u.drawImage(p,h.x-h.w/2,h.y-h.h/2,h.w,h.h)}u.globalAlpha=1}function da(n){const e=Math.min(1,Math.max(0,n));return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2}function Vu(n,e){return[n[0]-e[0],n[1]-e[1],n[2]-e[2]]}function fv(n,e){return[n[0]+e[0],n[1]+e[1],n[2]+e[2]]}const Wu=.62,pv=38;function mv(n,e,t,i=1){const r=t*Math.PI/360,s=Math.atan(Math.tan(r)*i),a=Math.max(e/(2*Wu*Math.tan(r)),e/(2*Wu*Math.tan(s)),.35),o=pv*Math.PI/180,c=Math.sin(o),l=Math.cos(o);return{pos:[n[0],n[1]+a*c,n[2]+a*l],target:n}}function gv(n,e,t=.85){const i=e*Math.PI/360,r=n/(t*Math.tan(i)),s=.42;return{pos:[0,r*s,r*Math.sqrt(1-s*s)],target:[0,0,0]}}function _v(n,e,t){const i=t*Math.PI/360,r=e/(.08*Math.tan(i)),s=Math.min(r,n*.82),a=.35;return{pos:[0,s*a,s*Math.sqrt(1-a*a)],target:[0,0,0],fov:120}}function vv(n,e,t,i,r=1,s=.55,a=6,o=120){const l=Math.atan2(t*Math.sin(e),t*Math.cos(e)-i)/s,u=180/Math.PI,d=2*l*u,h=2*Math.atan(l/r)*u,p=Math.min(o,Math.max(a,Math.max(d,h)));return{pos:[n[0]*i,n[1]*i,n[2]*i],target:[n[0]*t,n[1]*t,n[2]*t],fov:p}}function xv(n,e){n.t+=e;const t=da(n.t/n.duration),i=(o,c)=>o+(c-o)*t,r=[i(n.fromTarget[0],n.toTarget[0]),i(n.fromTarget[1],n.toTarget[1]),i(n.fromTarget[2],n.toTarget[2])],s=[i(n.fromOffset[0],n.toOffset[0]),i(n.fromOffset[1],n.toOffset[1]),i(n.fromOffset[2],n.toOffset[2])],a=n.fromFov+(n.toFov-n.fromFov)*t;return{target:r,offset:s,pos:fv(r,s),fov:a,done:n.t>=n.duration}}function Qc(n,e,t,i,r,s,a){return{fromTarget:e,fromOffset:Vu(n,e),toTarget:t.target,toOffset:Vu(t.pos,t.target),duration:i,t:0,followId:r,toFov:t.fov??a,fromFov:s}}const Mv="textures";function Sv(n){return`${Mv}/${n}.jpg`}const Xu=new Map;function yv(n,e=fetch){let t=Xu.get(n);return t||(t=e(n,{method:"HEAD"}).then(i=>i.ok).catch(()=>!1),Xu.set(n,t)),t}const Yu=new Map;async function Ev(n,e,t=fetch){const i=Yu.get(n);if(i)return i;const r=Sv(n);if(!await yv(r,t))return null;const s=await new Promise((a,o)=>{e.load(r,a,void 0,o)}).catch(()=>null);return s?(s.colorSpace=Rt,s.wrapS=Lr,Yu.set(n,s),s):null}async function Av(n,e,t=fetch){let i=0;for(const r of n){const s=await Ev(r.def.id,e,t);if(!s)continue;const a=r.mesh.material;a.map=s,a.needsUpdate=!0,i+=1}return i}function Tv(n,e){const t=n.elements;if(!t)return null;const i=Zd(t,e);if(i.n===0)return null;const r=vt(t,e),s=n.kind==="moon"?1:Dn;return{periodDays:360/Math.abs(i.n),distanceKm:Math.hypot(r.x,r.y,r.z)*s,perihelionKm:i.a*(1-i.e)*s,aphelionKm:i.a*(1+i.e)*s}}function bv(n){if(!Number.isFinite(n)||n<=0)return"—";if(n<2)return`${(n*24).toFixed(1)} h`;if(n<365)return`${n.toFixed(1)} d`;const e=n/365.25;return`${e>=100?e.toFixed(0):e>=10?e.toFixed(1):e.toFixed(2)} yr`}function Ns(n){return!Number.isFinite(n)||n<0?"—":n<1e6?`${Math.round(n).toLocaleString("en-US")} km`:n<1e8?`${(n/1e6).toFixed(1)} M km`:`${(n/1e9).toFixed(2)} B km`}const dh=Number.isFinite;function qu(n){if(n==null||n==="")return;const e=Number(n);return dh(e)?e:void 0}function si(n){if(!(n==null||n===""))return n==="1"||n==="true"}function Dv(n){const t=new URL(n,"http://localhost").searchParams,i={},r=qu(t.get("t"));r!==void 0&&(i.timeMs=r);const s=qu(t.get("sp"));s!==void 0&&(i.speedLog=s);const a=t.get("f");a!=null&&(i.follow=a);const o=t.get("c");o!=null&&(i.constellation=o);const c=t.get("sc");c==="t"?i.scale="true":c==="v"&&(i.scale="visible");const l=si(t.get("o"));l!==void 0&&(i.orbits=l);const u=si(t.get("l"));u!==void 0&&(i.labels=u);const d=si(t.get("b"));d!==void 0&&(i.belts=d);const h=si(t.get("fig"));h!==void 0&&(i.figures=h);const p=si(t.get("p"));p!==void 0&&(i.paused=p);const g=si(t.get("rv"));g!==void 0&&(i.reversed=g);const v=si(t.get("ev"));v!==void 0&&(i.eventsOpen=v);const m=t.get("cam");if(m){const f=m.split(",").map(Number);f.length===6&&f.every(dh)&&(i.cam={pos:[f[0],f[1],f[2]],target:[f[3],f[4],f[5]]})}return i}function hh(n,e){const t=new URL(n,"http://localhost"),i=t.searchParams,r=(o,c)=>{c===void 0?i.delete(o):i.set(o,c)};if(r("t",e.timeMs!==void 0?String(Math.round(e.timeMs)):void 0),r("sp",e.speedLog!==void 0?String(Ku(e.speedLog)):void 0),r("f",e.follow===void 0?void 0:e.follow),r("c",e.constellation===void 0?void 0:e.constellation),r("sc",e.scale===void 0?void 0:e.scale==="true"?"t":"v"),r("o",e.orbits===void 0?void 0:e.orbits?"1":"0"),r("l",e.labels===void 0?void 0:e.labels?"1":"0"),r("b",e.belts===void 0?void 0:e.belts?"1":"0"),r("fig",e.figures===void 0?void 0:e.figures?"1":"0"),r("p",e.paused===void 0?void 0:e.paused?"1":"0"),r("rv",e.reversed===void 0?void 0:e.reversed?"1":"0"),r("ev",e.eventsOpen===void 0?void 0:e.eventsOpen?"1":"0"),e.cam){const[o,c,l,u,d,h]=[...e.cam.pos,...e.cam.target].map(Ku);r("cam",`${o},${c},${l},${u},${d},${h}`)}else i.delete("cam");const s=i.toString();return`${t.origin.startsWith("http")&&n.includes("://")?`${t.origin}${t.pathname}`:t.pathname}${s?`?${s}`:""}${t.hash}`}function Ku(n){return Math.round(n*1e6)/1e6}const Ao=Math.PI/180,el=180/Math.PI,Br=kt.map(n=>n.id),wa=new Map(kt.map(n=>[n.id,n])),Vt=wa.get("earth"),wv=Yc.find(n=>n.id==="moon"),Pv=["mercury","venus"],Rv=["mars","jupiter","saturn","uranus","neptune"];function Xn(n){return Math.hypot(n.x,n.y,n.z)}function xi(n,e){return{x:n.x-e.x,y:n.y-e.y,z:n.z-e.z}}function kr(n){return{x:-n.x,y:-n.y,z:-n.z}}function Mi(n,e){const t=n.x*e.x+n.y*e.y+n.z*e.z,i=Xn(n),r=Xn(e);if(i===0||r===0)return 0;const s=Math.min(1,Math.max(-1,t/(i*r)));return Math.acos(s)*el}function pi(n,e){const t=n/e;return t>=1?90:t<=0?0:Math.asin(t)*el}function Cv(n){return tr+Math.round(n*864e5)}function jr(n,e){return e}function tl(n,e,t){const i=[];for(let r=n;r<=e+1e-9;r+=t)i.push(r);return(i.length===0||i[i.length-1]<e)&&i.push(e),i}function Zr(n,e,t,i,r=48){const s=(Math.sqrt(5)-1)/2,a=u=>i?-n(u):n(u);let o=e,c=t;for(let u=0;u<r;u++){const d=c-s*(c-o),h=o+s*(c-o);a(d)<a(h)?c=h:o=d}const l=(o+c)/2;return{t:l,value:n(l)}}function ur(n,e,t,i,r,s){return{type:n,tDays:e,dateMs:Cv(e),title:t,detail:i,bodyId:r,bodyId2:s}}function nl(n,e,t){const i=tl(n,e,t),r=kt.map(s=>i.map(a=>vt(s.elements,a)));return{times:i,pos:r}}function il(n,e,t){return xi(n.pos[e][t],n.pos[Br.indexOf("earth")][t])}function To(n){const e=vt(Vt.elements,n),t=kr(e),[i,r,s]=$r(n),a={x:i,y:r,z:s},o=Mi(t,a),c=Xn(e)*Dn,l=Xn(a)*Dn;return{sep:o,sunR:pi(Xc.radiusKm,c),moonR:pi(wv.radiusKm,l),dSunKm:c,dMoonKm:l}}function Iv(n,e,t){const i=jr(e-n,t?.coarseStepDays),r=tl(n,e,i),s=r.map(o=>To(o).sep),a=[];for(let o=1;o<s.length-1;o++){const c=s[o],l=c<s[o-1]&&c<s[o+1],u=c>s[o-1]&&c>s[o+1];if(!l&&!u)continue;const d=r[o],{t:h}=Zr(g=>To(g).sep,d-2,d+2,u),p=To(h);if(l){const g=pi(Vt.radiusKm,p.dMoonKm);if(p.sep<p.sunR+p.moonR+g){const v=p.sep<p.moonR-p.sunR?"Total solar eclipse":p.sep<p.sunR-p.moonR?"Annular solar eclipse":"Partial solar eclipse";a.push(ur("solar-eclipse",h,"Solar eclipse",`${v} · Sun–Moon sep ${p.sep.toFixed(2)}°`,"sun","moon"))}}else{const g=180-p.sep,[v,m,f]=$r(h),S=Xn({x:v,y:m,z:f})*Dn,_=pi(Vt.radiusKm,S)-p.sunR,E=pi(Vt.radiusKm,S)+p.sunR;if(g<p.moonR+E){const C=g<_-p.moonR?"Total lunar eclipse":g<_+p.moonR?"Partial lunar eclipse":"Penumbral lunar eclipse";a.push(ur("lunar-eclipse",h,"Lunar eclipse",`${C} · ${g.toFixed(2)}° from opposition`,"moon"))}}}return a}function Hv(n,e,t){const i=nl(n,e,jr(e-n,t?.coarseStepDays)),r=Br.indexOf("earth"),s=[];for(const a of Pv){const o=Br.indexOf(a),c=wa.get(a),l=i.times.map((u,d)=>{const h=il(i,o,d),p=kr(i.pos[r][d]);return Mi(h,p)});for(let u=1;u<l.length-1;u++){if(!(l[u]<l[u-1]&&l[u]<l[u+1])||l[u]>30)continue;const d=i.times[u],h=E=>{const C=xi(vt(c.elements,E),vt(Vt.elements,E)),T=kr(vt(Vt.elements,E));return Mi(C,T)},{t:p,value:g}=Zr(h,d-2,d+2,!1),v=Xn(vt(Vt.elements,p))*Dn,m=xi(vt(c.elements,p),vt(Vt.elements,p)),f=Xn(m)*Dn,S=pi(Xc.radiusKm,v),_=pi(c.radiusKm,f);if(g<S+_){const E=g<S-_?"Transit (planet fully on the Sun)":"Partial transit";s.push(ur("transit",p,`${c.name} transit`,`${E} · sep ${g.toFixed(2)}°`,a))}}}return s}function Lv(n,e,t){const i=t?.conjunctionDeg??1,r=nl(n,e,jr(e-n,t?.coarseStepDays)),s=r.times.length,a=[],o=kt.map((c,l)=>{const u=new Array(s);for(let d=0;d<s;d++)u[d]=il(r,l,d);return u});for(let c=0;c<kt.length;c++)for(let l=c+1;l<kt.length;l++){const u=d=>Mi(o[c][d],o[l][d]);for(let d=1;d<s-1;d++){const h=u(d);if(!(h<u(d-1)&&h<u(d+1))||h>i*2.5)continue;const p=r.times[d],g=f=>{const S=xi(vt(kt[c].elements,f),vt(Vt.elements,f)),_=xi(vt(kt[l].elements,f),vt(Vt.elements,f));return Mi(S,_)},{t:v,value:m}=Zr(g,p-2,p+2,!1);if(m<i){const f=kt[c].name,S=kt[l].name;a.push(ur("conjunction",v,`${f}–${S} conjunction`,`sep ${m.toFixed(2)}°`,kt[c].id,kt[l].id))}}}return a}function Uv(n,e,t){const i=t?.oppositionDeg??170,r=nl(n,e,jr(e-n,t?.coarseStepDays)),s=Br.indexOf("earth"),a=[];for(const o of Rv){const c=Br.indexOf(o),l=wa.get(o),u=r.times.map((d,h)=>Mi(il(r,c,h),kr(r.pos[s][h])));for(let d=1;d<u.length-1;d++){if(!(u[d]>u[d-1]&&u[d]>u[d+1])||u[d]<170)continue;const h=r.times[d],p=m=>Mi(xi(vt(l.elements,m),vt(Vt.elements,m)),kr(vt(Vt.elements,m))),{t:g,value:v}=Zr(p,h-3,h+3,!0);v>i&&a.push(ur("opposition",g,`${l.name} opposition`,`elongation ${v.toFixed(2)}° from the Sun`,o))}}return a}function Nv(){const n=40.588*Ao,e=83.537*Ao,t=23.4392911*Ao,i=Math.cos(e)*Math.cos(n),r=Math.cos(e)*Math.sin(n),s=Math.sin(e),a=r*Math.cos(t)+s*Math.sin(t),o=-r*Math.sin(t)+s*Math.cos(t),c=Math.hypot(i,a,o);return{x:i/c,y:a/c,z:o/c}}const bo=Nv();function $u(n){const e=vt(wa.get("saturn").elements,n),t=vt(Vt.elements,n),i=xi(t,e),r=Math.abs(i.x*bo.x+i.y*bo.y+i.z*bo.z),s=Math.min(1,r/(Xn(i)||1));return 90-Math.acos(s)*el}function Ov(n,e,t){const i=t?.edgeOnDeg??2,r=jr(e-n,t?.coarseStepDays),s=tl(n,e,r),a=s.map($u),o=[];for(let l=1;l<a.length-1;l++){if(!(a[l]<a[l-1]&&a[l]<a[l+1])||a[l]>i*2.5)continue;const u=s[l],{t:d,value:h}=Zr($u,u-45,u+45,!1);h<i&&o.push(ur("saturn-edge-on",d,"Saturn rings edge-on",`ring plane tilt ${h.toFixed(2)}° from Earth`,"saturn"))}o.sort((l,u)=>l.tDays-u.tDays);const c=[];for(const l of o){const u=c[c.length-1];if(u&&l.tDays-u.tDays<30){const d=h=>parseFloat(h.detail.match(/tilt ([\d.]+)/)?.[1]??"99");d(l)<d(u)&&(c[c.length-1]=l)}else c.push(l)}return c}function Fv(n,e,t){const i=[...Iv(n,e,t),...Hv(n,e,t),...Lv(n,e,t),...Uv(n,e,{coarseStepDays:t?.coarseStepDays}),...Ov(n,e,t)];return i.sort((r,s)=>r.dateMs-s.dateMs),i}"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js").catch(()=>{})});const zv=.15;let mi=null,ha=!1;function Gr(){mi&&(mi=null,G.controls.enabled=!0,G.controls.update())}function Bv(){const n=G.camera.position,e=n.length();if(e<1e-6)return;const t=Math.acos(Math.min(1,Math.max(-1,n.y/e)));mi={theta:Math.atan2(n.x,n.z),phi:t,radius:e},G.controls.enabled=!1}function kv(n){if(!mi)return;mi.theta+=zv*n;const{theta:e,phi:t,radius:i}=mi,r=Math.sin(t);G.camera.position.set(i*r*Math.sin(e),i*Math.cos(t),i*r*Math.cos(e)),fh(1),G.camera.lookAt(0,0,0)}for(const n of["pointerdown","wheel","keydown","touchstart"])window.addEventListener(n,Gr,{passive:!0});const fa=Dt.map(n=>$c(n)),Gv=Dt.map(n=>Da(n).halfExtent),pa=new Float32Array(Dt.length),Vv=200;let ju=0,Vr="";const Os=new P,Fs=new P,zs=new P,br=new P,Zu=new P,Ju=new wn,Wv=new wn;let Yn=null;const Xv=sh(Dt).map(n=>n.dir),Do=new qd,Qu=new P;function fh(n){n<=0||(zs.subVectors(G.controls.target,G.camera.position).normalize(),br.set(0,1,0),Math.abs(zs.dot(br))>.99&&br.set(0,0,1),Zu.copy(br).addScaledVector(zs,-br.dot(zs)).normalize(),Ju.setFromUnitVectors(G.camera.up,Zu).slerp(Wv,1-n),G.camera.up.applyQuaternion(Ju))}function Yv(){Os.set(0,0,-1).applyQuaternion(G.camera.quaternion);const n=Os.x,e=Os.y,t=Os.z;for(let i=0;i<fa.length;i++){const r=fa[i];pa[i]=b2(r,[n,e,t])}}function qv(n){if(n-ju<Vv)return;const e=G.camera.position,t=`${e.x.toFixed(2)}|${e.y.toFixed(2)}|${e.z.toFixed(2)}|${G.camera.quaternion.w.toFixed(3)}|${Yt}`;if(t===Vr)return;ju=n,Vr=t;const i=ah(G.camera.position.length());$2(G.constellations,pa,i,Yt||null,n/1e3),Jr&&K2(G.constellationFigures,pa,i)}function Kv(n){if(!Yt)return;const e=G.constellations.children.find(t=>t.name===`constellation-lines:${Yt}`);e&&(e.material.opacity=gc(n/1e3))}const hn=document.getElementById("app"),gi=document.getElementById("date"),ma=document.getElementById("speed"),$v=document.getElementById("speed-value"),xc=document.getElementById("pause"),$s=document.getElementById("reverse"),jv=document.getElementById("now"),qn=document.getElementById("find"),Tn=document.getElementById("find-list"),Pa=document.getElementById("orbits"),Kn=document.getElementById("labels"),Ra=document.getElementById("belts"),Mc=document.getElementById("figures");let Jr=!1;const Bs=document.getElementById("share"),ks=document.getElementById("screenshot"),Pr=document.getElementById("tooltip"),Dr=document.getElementById("info"),ga=document.getElementById("gl-lost"),Zv=document.getElementById("gl-reload"),ed=document.getElementById("info-name"),td=document.getElementById("info-period"),nd=document.getElementById("info-distance"),id=document.getElementById("info-range"),rd=document.getElementById("info-label-1"),sd=document.getElementById("info-label-2"),ad=document.getElementById("info-label-3"),Sc=document.getElementById("events-toggle"),ph=document.getElementById("events-range"),zn=document.getElementById("events-row"),nr=document.getElementById("events-list"),Hr=document.getElementById("date-pick"),dr=new Map(Kr.map(n=>[n.id,n])),Wr=new Map(Kr.filter(n=>n.kind==="moon"&&n.parent).map(n=>[n.id,n.parent])),Be=new p_(Date.now());let G,Xt=lr,bt="",Ca="",Yt="",od=Be.t,yc=performance.now(),Ec=0,rl=!1,Ht=null;const Jv=3;let Ve=null;const Ac=document.getElementById("scale-real"),mh=document.getElementById("scale-visible"),wo=document.getElementById("scale-caption"),cd=[[0,"Morphing to real scale…"],[.2,"Sizes snap to reality — the default view exaggerates radii ~300× (Sun) to ~40,000× (Earth)."],[.5,"Distances snap to reality — Earth is 150 million km from the Sun, not 15 units."],[.8,"At real scale Neptune is 4.5 BILLION km out. Most of this view is empty space."]];function Qv(n){let e=cd[0][1];for(const[t,i]of cd)n>=t&&(e=i);return e}function gh(){return Ve?Ve.dir===0?Ve.p>=.5?"real":"visible":Ve.dir===1?"real":"visible":Xt===Gn?"real":"visible"}function sl(){const n=gh()==="real";for(const e of[Ac,mh]){if(!e)continue;const t=e===Ac?n:!n;e.classList.toggle("active",t),e.setAttribute("aria-checked",String(t))}wo&&(wo.hidden=!Ve,Ve&&(wo.textContent=Ve.dir===-1?"Returning to the visible view…":Ve.dir===0?"Real scale — sizes and distances to the same ratio. Toggle back any time.":Qv(da(Ve.p))))}function ex(){Ve&&(Ve.p>=1?(Ve={p:1,dir:0,reframed:!1},Xt=Gn):(Ve=null,Xt=lr),sl(),xt())}function ld(n){gh()!==n&&(Ve&&Ve.dir!==0?(Ve.dir=n==="real"?1:-1,Ve.reframed=!1):n==="real"?(Ht=null,Gr(),Ve={p:0,dir:1,reframed:!1}):(Ht=null,Gr(),Ve={p:1,dir:-1,reframed:!1}),sl())}function al(){const n=G.bodies.get("moon");n?.orbit&&lh(n.orbit,Be.t,Xt),Ec=performance.now()}function tx(n){G&&G.dispose(),G=T2(hn,Kr,n),G.controls.addEventListener("change",xt);for(const t of G.bodies.values())t.orbit&&t.parent&&t.parent.pivot.add(t.orbit);Qr(),oh(G,Be.t,Xt);const e=new Xd;if(Av(G.bodies.values(),e),bt){const t=G.bodies.get(bt);if(t){const i=Xt.followDistanceKm(t.def.radiusKm);G.controls.target.copy(t.worldPos),G.camera.position.copy(t.worldPos).add(new P(i,i*.6,i))}}return G}const hr=50;function ud(n=!1){let e=0;for(const t of G.bodies.values()){const i=t.def.elements;if(i&&(t.def.kind==="planet"||!n&&t.def.kind==="dwarf")){const r=i.a*(1+i.e);e=Math.max(e,Xt.planetDistance(r))}}return Math.max(e,1)}function Tc(n){return n==="constellations"?_v(ft,ud(),hr):gv(ud(!0),hr,.95)}function Ia(n){const e=G.bodies.get(n);if(!e)return null;const t=Wr.get(n)??n,i=G.bodies.get(t)??e,r=uh(t,Xt),s=Math.max(i.frameExtent,r>0?2*r+i.sceneRadius:0);return mv([i.worldPos.x,i.worldPos.y,i.worldPos.z],s,hr,G.camera.aspect)}function nx(n){const e=Dt.findIndex(t=>t.name===n);return e<0?null:vv(fa[e],Gv[e],ft,ft/8,G.camera.aspect)}function ir(n,e=1.4,t=null,i=!1){bt=t??"",cl(bt),Ca=t??"",Yt="",Vr="",xt(),Gr(),ha=i,Ha();const r=t?Wr.has(t)?Wr.get(t):t:null;Ht=Qc([G.camera.position.x,G.camera.position.y,G.camera.position.z],[G.controls.target.x,G.controls.target.y,G.controls.target.z],n,e,r,G.camera.fov,hr)}function ix(n){const e=nx(n);e&&(Yt=n,bt="",Ca="",Gr(),ha=!1,Vr="",Ha(),Ht=Qc([G.camera.position.x,G.camera.position.y,G.camera.position.z],[G.controls.target.x,G.controls.target.y,G.controls.target.z],e,1.6,null,G.camera.fov,hr),xt())}function rx(){const n=document.getElementById("anchors");n&&(n.addEventListener("click",e=>{const t=e.target.closest("button[data-fly]");if(!t)return;const i=t.dataset.fly;if(i==="system")ir(Tc("system"),1.6);else if(i==="constellations")ir(Tc("constellations"),1.8,null,!0);else{const r=Ia(i);r&&ir(r,1.4,i)}xt()}),Ac?.addEventListener("click",()=>ld("real")),mh?.addEventListener("click",()=>ld("visible")))}function Qr(){for(const n of G.bodies.values())n.orbit&&(n.orbit.material.visible=Pa.checked),n.label.visible=Kn.checked;Yn?.setVisible(Kn.checked);for(const n of G.belts)n.mesh.visible=Ra.checked;G.constellationFigures.visible=Jr}function ol(){const n=Be.getSpeed(),e=Be.isReversed?"← ":"",t=Math.abs(n);let i,r;t>=100?(i=t.toFixed(0),r="d/s"):t>=1?(i=t.toFixed(1),r="d/s"):t>=.1?(i=t.toFixed(2),r="d/s"):(i=(t*24).toFixed(2),r="h/s"),$v.textContent=`${e}${i} ${r}`}function _h(){const n=Be.toDate(),e=n.getUTCFullYear(),t=String(n.getUTCMonth()+1).padStart(2,"0"),i=String(n.getUTCDate()).padStart(2,"0"),r=String(n.getUTCHours()).padStart(2,"0"),s=String(n.getUTCMinutes()).padStart(2,"0");if(gi.textContent=`${e}-${t}-${i} ${r}:${s} UTC`,document.activeElement!==Hr){const a=`${e}-${t}-${i}`;Hr.value!==a&&(Hr.value=a)}}function sx(){const n=Hr.value;if(!n)return;const[e,t,i]=n.split("-").map(Number);if(!e||!t||!i)return;const r=Be.toDate(),s=new Date(Date.UTC(e,t-1,i,r.getUTCHours(),r.getUTCMinutes()));Math.abs(s.getTime()-r.getTime())<6e4||(Be.setDate(s),al(),gi.classList.remove("flash"),gi.offsetWidth,gi.classList.add("flash"),vh()&&La(),xt())}function Ha(){if(!bt){if(Yt){const t=Dt.findIndex(l=>l.name===Yt),i=t>=0?Dt[t]:void 0;if(!i){Dr.hidden=!0;return}const[r,s,a]=fa[t],o=Math.asin(Math.min(1,Math.max(-1,s)))*180/Math.PI;let c=Math.atan2(-a,-r)*180/Math.PI/15;c<0&&(c+=24),Dr.hidden=!1,ed.textContent=`${i.name} — constellation`,rd.textContent="Center RA",sd.textContent="Center Dec",ad.textContent="Stars",td.textContent=`${c.toFixed(1)}h`,nd.textContent=`${o>=0?"+":""}${o.toFixed(1)}°`,id.textContent=`${i.stars.length} stars`;return}Dr.hidden=!0;return}const n=dr.get(bt),e=n?Tv(n,Be.t):null;if(!n||!e){Dr.hidden=!0;return}Dr.hidden=!1,ed.textContent=n.name,rd.textContent="Orbit period",sd.textContent="Distance",ad.textContent="Peri / Apo",td.textContent=bv(e.periodDays),nd.textContent=n.kind==="moon"?`${Ns(e.distanceKm)} from ${dr.get(n.parent??"")?.name??"parent"}`:`${Ns(e.distanceKm)} from Sun`,id.textContent=`${Ns(e.perihelionKm)} / ${Ns(e.aphelionKm)}`}ma.addEventListener("input",()=>{Be.setLogSpeed(parseFloat(ma.value)),ol(),xt()});xc.addEventListener("click",()=>{Be.setPaused(!Be.isPaused),xc.textContent=Be.isPaused?"Resume":"Pause",xt()});$s.addEventListener("click",()=>{Be.setReversed(!Be.isReversed),$s.textContent=Be.isReversed?"Reverse ←":"Reverse →",$s.classList.toggle("active",Be.isReversed),ol(),xt()});jv.addEventListener("click",()=>{Be.setDate(new Date),al(),xt()});function vh(){return!zn.hidden}function ax(n){nr.textContent=n,nr.classList.add("computing")}function ox(){nr.classList.remove("computing")}function La(){if(!vh())return;const n=parseInt(ph.value,10)||5;ax("Computing events…"),requestAnimationFrame(()=>{const e=Be.toDate().getTime(),t=n*365.25*864e5,i=(e-t-tr)/864e5,r=(e+t-tr)/864e5,s=Fv(i,r,{coarseStepDays:.2});cx(s)})}function cx(n){if(ox(),nr.replaceChildren(),n.length===0){const t=document.createElement("p");t.className="ev-note",t.textContent="No events in this window.",nr.appendChild(t);return}const e=document.createDocumentFragment();for(const t of n){const i=document.createElement("div");i.className="ev "+lx(t);const r=new Date(t.dateMs),s=r.getUTCFullYear(),a=String(r.getUTCMonth()+1).padStart(2,"0"),o=String(r.getUTCDate()).padStart(2,"0"),c=document.createElement("span");c.className="ev-date",c.textContent=`${s}-${a}-${o}`;const l=document.createElement("span");l.className="ev-what",l.textContent=t.title,l.title=t.detail;const u=document.createElement("span");u.className="ev-detail",u.textContent=t.detail,l.appendChild(u),i.append(c,l),i.addEventListener("click",()=>{Be.setDate(new Date(t.dateMs)),al(),xt(),gi.classList.remove("flash"),gi.offsetWidth,gi.classList.add("flash");const d=t.bodyId;if(d){const h=Ia(d);h&&ir(h,1.4,d)}}),e.appendChild(i)}nr.appendChild(e)}function lx(n){switch(n.type){case"solar-eclipse":return"ecl-solar";case"lunar-eclipse":return"ecl-lunar";case"transit":return"transit";case"saturn-edge-on":return"saturn";default:return""}}Sc.addEventListener("click",()=>{zn.hidden=!zn.hidden,Sc.classList.toggle("active",!zn.hidden),zn.hidden||La(),xt()});ph.addEventListener("change",()=>{La()});Hr.addEventListener("change",()=>{sx()});const ux=Kd(Kr),dx=$d(),hx=15;let yn=-1;function fx(n){const e=[];if(!n.trim()){for(const r of ux)e.push({c:!1,id:r.id,name:r.name,sub:r.sub});for(const r of dx.slice(0,hx))e.push({c:!0,id:r.id,name:r.name,sub:r.sub});return e}const t=x_(Kr,n);for(const r of t)e.push({c:!1,id:r.id,name:r.name,sub:r.parentName?`moon of ${r.parentName}`:r.kind});const i=y_(n);for(const r of i)e.push({c:!0,id:r.id,name:r.name,sub:r.sub});return e}function xh(n){return n===""?"Free camera":n.startsWith(zr)?n.slice(zr.length):dr.get(n)?.name??n}function cl(n){qn.value=xh(n)}function ll(){Tn.hidden=!0,yn=-1}function bc(){const n=Tn.querySelectorAll(".fr");n.forEach((e,t)=>e.classList.toggle("active",t===yn)),n[yn]?.scrollIntoView({block:"nearest"})}function Mh(n){const e=fx(n);Tn.replaceChildren();const t=document.createDocumentFragment();if(n.trim())if(e.length===0){const i=document.createElement("div");i.className="fr-empty",i.textContent="No matches",t.appendChild(i)}else for(const i of e){const r=document.createElement("div");r.className=i.c?"fr fr-const":"fr",r.innerHTML=`<span class="fr-name">${i.name}</span><span class="fr-sub">${i.sub}</span>`,r.addEventListener("click",()=>js(i.id)),t.appendChild(r)}else{const i=document.createElement("div");i.className="fr fr-free",i.innerHTML='<span class="fr-name">Free camera</span><span class="fr-sub">orbit wherever</span>',i.addEventListener("click",()=>js("")),t.appendChild(i);for(const r of e){const s=document.createElement("div");s.className=r.c?"fr fr-const":"fr",s.innerHTML=`<span class="fr-name">${r.name}</span><span class="fr-sub">${r.sub}</span>`,s.addEventListener("click",()=>js(r.id)),t.appendChild(s)}}Tn.appendChild(t),yn=0,bc(),Tn.hidden=!1}function js(n){if(qn.value=xh(n),ll(),qn.blur(),n.startsWith(zr)){ix(n.slice(zr.length));return}if(n){const e=Ia(n);if(e){ir(e,1.4,n);return}}bt="",Yt="",Ha(),xt()}qn.addEventListener("focus",()=>Mh(qn.value));qn.addEventListener("input",()=>{Mh(qn.value)});qn.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),Tn.hidden?js(""):ll();return}if(Tn.hidden)return;const e=Tn.querySelectorAll(".fr");if(n.key==="ArrowDown")n.preventDefault(),yn=Math.min(e.length-1,yn+1),bc();else if(n.key==="ArrowUp")n.preventDefault(),yn=Math.max(0,yn-1),bc();else if(n.key==="Enter"){n.preventDefault();const t=e[yn];t&&t.click()}});document.addEventListener("pointerdown",n=>{!Tn.hidden&&!n.target?.closest("#find-wrap")&&ll()});Pa.addEventListener("change",()=>{Qr(),xt()});Kn.addEventListener("change",()=>{Qr(),xt()});Ra.addEventListener("change",()=>{Qr(),xt()});Mc.addEventListener("change",()=>{Jr=Mc.checked,Qr(),xt()});window.addEventListener("resize",()=>{G.camera.aspect=window.innerWidth/window.innerHeight,G.camera.updateProjectionMatrix(),G.renderer.setSize(window.innerWidth,window.innerHeight),G.controls.handleResize()});const ke=Dv(window.location.href);ke.timeMs!=null&&Be.setDate(new Date(ke.timeMs));if(ke.speedLog!=null){const n=Math.max(-3,Math.min(2.5,ke.speedLog));ma.value=String(n),Be.setLogSpeed(n)}ke.reversed!=null&&(Be.setReversed(ke.reversed),$s.textContent=ke.reversed?"Reverse ←":"Reverse →");ke.scale&&(Xt=ke.scale==="true"?Gn:lr);ke.orbits!=null&&(Pa.checked=ke.orbits);ke.labels!=null&&(Kn.checked=ke.labels);ke.belts!=null&&(Ra.checked=ke.belts);ke.figures!=null&&(Mc.checked=ke.figures,Jr=ke.figures);ke.paused!=null&&(Be.setPaused(ke.paused),xc.textContent=ke.paused?"Resume":"Pause");ke.eventsOpen!=null&&(zn.hidden=!ke.eventsOpen,Sc.classList.toggle("active",ke.eventsOpen));zn.hidden||La();ke.follow&&dr.has(ke.follow)&&(cl(ke.follow),bt=ke.follow,Ca=ke.follow);ke.constellation&&Dt.some(n=>n.name===ke.constellation)&&(Yt=ke.constellation,cl(`const:${ke.constellation}`),Vr="");function Sh(){return{timeMs:Be.toDate().getTime(),speedLog:parseFloat(ma.value),reversed:Be.isReversed,follow:bt||void 0,constellation:Yt||void 0,scale:Xt===Gn?"true":"visible",orbits:Pa.checked,labels:Kn.checked,belts:Ra.checked,figures:Jr,paused:Be.isPaused,eventsOpen:!zn.hidden,cam:{pos:[G.camera.position.x,G.camera.position.y,G.camera.position.z],target:[G.controls.target.x,G.controls.target.y,G.controls.target.z]}}}let Po;function xt(){Po===void 0&&(Po=setTimeout(()=>{Po=void 0,window.history.replaceState(null,"",hh(window.location.href,Sh()))},300))}Bs.addEventListener("click",async()=>{const n=hh(window.location.href,Sh());window.history.replaceState(null,"",n);try{await navigator.clipboard.writeText(n),Bs.textContent="Link copied ✓"}catch{Bs.textContent="Link in address bar"}setTimeout(()=>{Bs.textContent="Copy share link"},1500)});ks.addEventListener("click",async()=>{const n=G.renderer.domElement,e=Be.toDate(),t=c=>String(c).padStart(2,"0"),i=`${e.getUTCFullYear()}-${t(e.getUTCMonth()+1)}-${t(e.getUTCDate())}T${t(e.getUTCHours())}${t(e.getUTCMinutes())}Z`,r=Yn&&Kn.checked?Yn.canvas:null;let s=n;if(r){s=document.createElement("canvas"),s.width=n.width,s.height=n.height;const c=s.getContext("2d");c.drawImage(n,0,0),c.drawImage(r,0,0,n.width,n.height)}const a=await new Promise(c=>s.toBlob(l=>c(l),"image/png"));if(!a){ks.textContent="Export failed";return}const o=document.createElement("a");o.href=URL.createObjectURL(a),o.download=`solar-system-${i}.png`,o.click(),setTimeout(()=>URL.revokeObjectURL(o.href),5e3),ks.textContent="Saved ✓",setTimeout(()=>{ks.textContent="Save screenshot"},1500)});tx(Xt);Yn=lv(hn);Yn.setVisible(Kn.checked);rx();sl();ke.cam&&(G.camera.position.set(...ke.cam.pos),G.controls.target.set(...ke.cam.target),G.controls.update());ol();_h();window.__solar={get scene(){return G.scene},get camera(){return G.camera},get controls(){return G.controls},get renderer(){return G.renderer},get labelLayer(){return Yn},get bodies(){return G.bodies},satelliteExtentScene:n=>uh(n,Xt),clock:Be};const _a=new qd,va=new Se;let yh=0,Eh=0,ul=!1,dd=0,dl=!1;function Ah(){const n=[];for(const e of G.bodies.values())n.push(e.mesh);return n}function px(n,e){Pr.innerHTML=`${n}${e?`<span class="sub"> ${e}</span>`:""}`,Pr.style.left=`${yh}px`,Pr.style.top=`${Eh}px`,Pr.classList.add("show")}function xa(){Pr.classList.remove("show")}function mx(){if(!ul||dl){xa();return}_a.setFromCamera(va,G.camera);const n=_a.intersectObjects(Ah(),!1);if(n.length>0){const e=n[0].object.userData.id,t=e?dr.get(e):void 0;if(t){const i=t.kind==="moon"?`moon of ${dr.get(t.parent??"")?.name??""}`:t.kind.charAt(0).toUpperCase()+t.kind.slice(1);px(t.name,i);return}}xa()}hn.addEventListener("pointermove",n=>{ul=!0,yh=n.clientX,Eh=n.clientY,va.set(n.clientX/window.innerWidth*2-1,-(n.clientY/window.innerHeight)*2+1);const e=performance.now();e-dd<50||(dd=e,mx())});hn.addEventListener("pointerleave",()=>{ul=!1,xa()});hn.addEventListener("pointerdown",()=>{dl=!0,xa()});window.addEventListener("pointerup",()=>{dl=!1});let Th=0,bh=0;hn.addEventListener("pointerdown",n=>{Th=n.clientX,bh=n.clientY});hn.addEventListener("pointerup",n=>{if(Math.hypot(n.clientX-Th,n.clientY-bh)>6)return;const e=hn.getBoundingClientRect();va.set((n.clientX-e.left)/e.width*2-1,-((n.clientY-e.top)/e.height)*2+1),_a.setFromCamera(va,G.camera);const t=_a.intersectObjects(Ah(),!1);if(t.length>0){const i=t[0].object.userData.id,r=i?Ia(i):null;r&&ir(r,1.4,i)}});function gx(){if(!Yn||!Kn.checked)return;const n=G.camera,e=n.position,t=e.x,i=e.y,r=e.z,s=ah(e.length()),a=Yt?Dt.findIndex(c=>c.name===Yt):-1,o=[];for(let c=0;c<Dt.length;c++){const l=pa[c];if(jc(l)*s<=_c)continue;const u=Xv[c],d=t*u[0]+i*u[1]+r*u[2],h=Math.sqrt(ft*ft+(t*t+i*i+r*r)-2*ft*d);Do.set(e,Qu.set(u[0]*ft-t,u[1]*ft-i,u[2]*ft-r).normalize());let p=!1;const g=Qu;for(const v of G.bodies.values()){if(!v.mesh.visible)continue;const m=v.worldPos,f=m.x-t,S=m.y-i,_=m.z-r,E=Math.sqrt(f*f+S*S+_*_);if(E<1e-6)continue;const C=1/E,T=f*C,D=S*C,L=_*C,A=D*g.z-L*g.y,M=L*g.x-T*g.z,R=T*g.y-D*g.x,B=Math.sqrt(Math.min(1,A*A+M*M+R*R)),O=Math.max(1,v.frameExtent>0?v.frameExtent/2:v.sceneRadius);if(B>(O+2)/E)continue;Do.far=E*2;const X=Do.intersectObject(v.mesh,!1);if(X.length>0&&X[0].distance<h){p=!0;break}}o.push({name:Dt[c].name,dir:u,emphasis:l,emphasized:a>=0?c===a:!1,occluded:p})}hv(Yn,n,o,s,window.innerWidth,window.innerHeight)}function Dh(){if(requestAnimationFrame(Dh),rl)return;const n=performance.now(),e=Math.min(.1,(n-yc)/1e3);yc=n,Be.tick(e);const t=Be.t-od;od=Be.t;let i=Xt;if(Ve){Ve.dir!==0&&(Ve.p=Math.min(1,Math.max(0,Ve.p+Ve.dir*e/Jv)),(Ve.dir===1&&Ve.p>=1||Ve.dir===-1&&Ve.p<=0)&&ex());const o=Ve.dir===0?1:da(Ve.p);i=E2(lr,Gn,o),J2(G,o);for(const c of G.bodies.values())c.orbit&&Q2(c.orbit,i,c.parent?c.def.id:null);Ve.dir===0?Ve.reframed||(Ve.reframed=!0,Ht=Qc([G.camera.position.x,G.camera.position.y,G.camera.position.z],[G.controls.target.x,G.controls.target.y,G.controls.target.z],Tc("system"),1.2,null,G.camera.fov,hr),G.controls.enabled=!1):Ht&&Ve.reframed&&(Ht=null,G.controls.enabled=!0,G.controls.update())}{const o=performance.now();if(o-Ec>250){Ec=o;const c=G.bodies.get("moon");c?.orbit&&lh(c.orbit,Be.t,i)}}if(oh(G,Be.t,i),Be.isPaused||ch(G,Be.t,i),ev(G,t),Ht){G.controls.enabled=!1;const o=xv(Ht,e);let c=o.target;if(Ht.followId){const l=G.bodies.get(Ht.followId);l&&(c=[l.worldPos.x,l.worldPos.y,l.worldPos.z])}if(G.controls.target.set(c[0],c[1],c[2]),G.camera.position.set(c[0]+o.offset[0],c[1]+o.offset[1],c[2]+o.offset[2]),Math.abs(G.camera.fov-o.fov)>.001&&(G.camera.fov=o.fov,G.camera.updateProjectionMatrix()),fh(da(Math.min(1,Ht.t/Ht.duration))),G.camera.lookAt(c[0],c[1],c[2]),o.done){if(Ht=null,ha)ha=!1,Bv();else if(G.controls.enabled=!0,G.controls.update(),bt){const l=G.bodies.get(bt);l&&G.controls.target.copy(l.worldPos)}xt()}}else if(mi)kv(e);else if(bt){const o=G.bodies.get(bt),c=o&&Wr.has(bt)?G.bodies.get(Wr.get(bt)):o;if(c){Fs.copy(G.controls.target),G.controls.target.lerp(c.worldPos,.2);const l=G.controls.target.x-Fs.x,u=G.controls.target.y-Fs.y,d=G.controls.target.z-Fs.z;G.camera.position.x+=l,G.camera.position.y+=u,G.camera.position.z+=d}G.controls.update()}else G.controls.update();Yv(),qv(n),Kv(n),iv(G,Ca,n/1e3);const a=G.camera.position.length()<=170;a!==G.sunLight.castShadow&&(G.sunLight.castShadow=a),G.renderer.render(G.scene,G.camera),gx(),_h(),Ha()}requestAnimationFrame(Dh);hn.addEventListener("webglcontextlost",n=>{n.preventDefault(),rl=!0,ga.hidden=!1,ga.classList.add("show")});hn.addEventListener("webglcontextrestored",()=>{rl=!1,ga.hidden=!0,ga.classList.remove("show"),G.renderer.setSize(window.innerWidth,window.innerHeight),yc=performance.now()});Zv.addEventListener("click",()=>window.location.reload());
