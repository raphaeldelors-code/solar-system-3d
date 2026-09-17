(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const n1="168",pr={ROTATE:0,DOLLY:1,PAN:2},lr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},bf=0,q1=1,Ef=2,md=1,gd=2,yi=3,Ri=0,en=1,Pn=2,si=0,mr=1,ai=2,K1=3,Z1=4,Tf=5,_s=100,Af=101,wf=102,Df=103,Cf=104,Pf=200,Rf=201,Lf=202,If=203,el=204,tl=205,Hf=206,Uf=207,Nf=208,Of=209,zf=210,Ff=211,Bf=212,kf=213,Gf=214,Wf=0,Vf=1,Xf=2,l0=3,Yf=4,jf=5,qf=6,Kf=7,vd=0,Zf=1,Jf=2,Ji=0,xd=1,_d=2,Md=3,i1=4,Qf=5,yd=6,Sd=7,bd=300,br=301,Er=302,nl=303,il=304,H0=306,Tr=1e3,Ss=1001,sl=1002,kt=1003,$f=1004,ra=1005,Rn=1006,Q0=1007,bs=1008,Li=1009,Ed=1010,Td=1011,Ao=1012,s1=1013,Ps=1014,$n=1015,bn=1016,r1=1017,o1=1018,Ar=1020,Ad=35902,wd=1021,Dd=1022,Bn=1023,Cd=1024,Pd=1025,gr=1026,wr=1027,a1=1028,c1=1029,Rd=1030,l1=1031,u1=1033,Ja=33776,Qa=33777,$a=33778,e0=33779,rl=35840,ol=35841,al=35842,cl=35843,ll=36196,ul=37492,dl=37496,hl=37808,fl=37809,pl=37810,ml=37811,gl=37812,vl=37813,xl=37814,_l=37815,Ml=37816,yl=37817,Sl=37818,bl=37819,El=37820,Tl=37821,t0=36492,Al=36494,wl=36495,Ld=36283,Dl=36284,Cl=36285,Pl=36286,e3=3200,Id=3201,Hd=0,t3=1,Jn="",wt="srgb",is="srgb-linear",d1="display-p3",U0="display-p3-linear",u0="linear",mt="srgb",d0="rec709",h0="p3",Bs=7680,J1=519,n3=512,i3=513,s3=514,Ud=515,r3=516,o3=517,a3=518,c3=519,Rl=35044,l3=35048,Q1="300 es",Ei=2e3,f0=2001;class Fs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let $1=1234567;const vo=Math.PI/180,wo=180/Math.PI;function wi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Qt[n&255]+Qt[n>>8&255]+Qt[n>>16&255]+Qt[n>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[t&63|128]+Qt[t>>8&255]+"-"+Qt[t>>16&255]+Qt[t>>24&255]+Qt[i&255]+Qt[i>>8&255]+Qt[i>>16&255]+Qt[i>>24&255]).toLowerCase()}function jt(n,e,t){return Math.max(e,Math.min(t,n))}function h1(n,e){return(n%e+e)%e}function u3(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function d3(n,e,t){return n!==e?(t-n)/(e-n):0}function xo(n,e,t){return(1-t)*n+t*e}function h3(n,e,t,i){return xo(n,e,1-Math.exp(-t*i))}function f3(n,e=1){return e-Math.abs(h1(n,e*2)-e)}function p3(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function m3(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function g3(n,e){return n+Math.floor(Math.random()*(e-n+1))}function v3(n,e){return n+Math.random()*(e-n)}function x3(n){return n*(.5-Math.random())}function _3(n){n!==void 0&&($1=n);let e=$1+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function M3(n){return n*vo}function y3(n){return n*wo}function S3(n){return(n&n-1)===0&&n!==0}function b3(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function E3(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function T3(n,e,t,i,s){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+i)/2),u=o((e+i)/2),d=r((e-i)/2),h=o((e-i)/2),f=r((i-e)/2),g=o((i-e)/2);switch(s){case"XYX":n.set(a*u,c*d,c*h,a*l);break;case"YZY":n.set(c*h,a*u,c*d,a*l);break;case"ZXZ":n.set(c*d,c*h,a*u,a*l);break;case"XZX":n.set(a*u,c*g,c*f,a*l);break;case"YXY":n.set(c*f,a*u,c*g,a*l);break;case"ZYZ":n.set(c*g,c*f,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function zn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function lt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Wn={DEG2RAD:vo,RAD2DEG:wo,generateUUID:wi,clamp:jt,euclideanModulo:h1,mapLinear:u3,inverseLerp:d3,lerp:xo,damp:h3,pingpong:f3,smoothstep:p3,smootherstep:m3,randInt:g3,randFloat:v3,randFloatSpread:x3,seededRandom:_3,degToRad:M3,radToDeg:y3,isPowerOfTwo:S3,ceilPowerOfTwo:b3,floorPowerOfTwo:E3,setQuaternionFromProperEuler:T3,normalize:lt,denormalize:zn};class be{constructor(e=0,t=0){be.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(jt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ke{constructor(e,t,i,s,r,o,a,c,l){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l)}set(e,t,i,s,r,o,a,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],d=i[7],h=i[2],f=i[5],g=i[8],v=s[0],m=s[3],p=s[6],y=s[1],x=s[4],b=s[7],L=s[2],A=s[5],D=s[8];return r[0]=o*v+a*y+c*L,r[3]=o*m+a*x+c*A,r[6]=o*p+a*b+c*D,r[1]=l*v+u*y+d*L,r[4]=l*m+u*x+d*A,r[7]=l*p+u*b+d*D,r[2]=h*v+f*y+g*L,r[5]=h*m+f*x+g*A,r[8]=h*p+f*b+g*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-i*r*u+i*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*o-a*l,h=a*c-u*r,f=l*r-o*c,g=t*d+i*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(s*l-u*i)*v,e[2]=(a*i-s*o)*v,e[3]=h*v,e[4]=(u*t-s*c)*v,e[5]=(s*r-a*t)*v,e[6]=f*v,e[7]=(i*c-l*t)*v,e[8]=(o*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply($0.makeScale(e,t)),this}rotate(e){return this.premultiply($0.makeRotation(-e)),this}translate(e,t){return this.premultiply($0.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const $0=new Ke;function Nd(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Do(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function A3(){const n=Do("canvas");return n.style.display="block",n}const e2={};function vr(n){n in e2||(e2[n]=!0,console.warn(n))}function w3(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const t2=new Ke().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),n2=new Ke().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),qr={[is]:{transfer:u0,primaries:d0,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[wt]:{transfer:mt,primaries:d0,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[U0]:{transfer:u0,primaries:h0,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(n2),fromReference:n=>n.applyMatrix3(t2)},[d1]:{transfer:mt,primaries:h0,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(n2),fromReference:n=>n.applyMatrix3(t2).convertLinearToSRGB()}},D3=new Set([is,U0]),rt={enabled:!0,_workingColorSpace:is,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!D3.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=qr[e].toReference,s=qr[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return qr[n].primaries},getTransfer:function(n){return n===Jn?u0:qr[n].transfer},getLuminanceCoefficients:function(n,e=this._workingColorSpace){return n.fromArray(qr[e].luminanceCoefficients)}};function xr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ec(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ks;class C3{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ks===void 0&&(ks=Do("canvas")),ks.width=e.width,ks.height=e.height;const i=ks.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=ks}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Do("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=xr(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(xr(t[i]/255)*255):t[i]=xr(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let P3=0;class Od{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:P3++}),this.uuid=wi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(tc(s[o].image)):r.push(tc(s[o]))}else r=tc(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function tc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?C3.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let R3=0;class It extends Fs{constructor(e=It.DEFAULT_IMAGE,t=It.DEFAULT_MAPPING,i=Ss,s=Ss,r=Rn,o=bs,a=Bn,c=Li,l=It.DEFAULT_ANISOTROPY,u=Jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:R3++}),this.uuid=wi(),this.name="",this.source=new Od(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new be(0,0),this.repeat=new be(1,1),this.center=new be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Tr:e.x=e.x-Math.floor(e.x);break;case Ss:e.x=e.x<0?0:1;break;case sl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Tr:e.y=e.y-Math.floor(e.y);break;case Ss:e.y=e.y<0?0:1;break;case sl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}It.DEFAULT_IMAGE=null;It.DEFAULT_MAPPING=bd;It.DEFAULT_ANISOTROPY=1;class ct{constructor(e=0,t=0,i=0,s=1){ct.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],f=c[5],g=c[9],v=c[2],m=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,b=(f+1)/2,L=(p+1)/2,A=(u+h)/4,D=(d+v)/4,I=(g+m)/4;return x>b&&x>L?x<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(x),s=A/i,r=D/i):b>L?b<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),i=A/s,r=I/s):L<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),i=D/r,s=I/r),this.set(i,s,r,t),this}let y=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(d-v)/y,this.z=(h-u)/y,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class L3 extends Fs{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t);const s={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new It(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Od(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cn extends L3{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class zd extends It{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=kt,this.minFilter=kt,this.wrapR=Ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class I3 extends It{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=kt,this.minFilter=kt,this.wrapR=Ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class es{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let c=i[s+0],l=i[s+1],u=i[s+2],d=i[s+3];const h=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=v;return}if(d!==v||c!==h||l!==f||u!==g){let m=1-a;const p=c*h+l*f+u*g+d*v,y=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const L=Math.sqrt(x),A=Math.atan2(L,p*y);m=Math.sin(m*A)/L,a=Math.sin(a*A)/L}const b=a*y;if(c=c*m+h*b,l=l*m+f*b,u=u*m+g*b,d=d*m+v*b,m===1-a){const L=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=L,l*=L,u*=L,d*=L}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],c=i[s+1],l=i[s+2],u=i[s+3],d=r[o],h=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+u*d+c*f-l*h,e[t+1]=c*g+u*h+l*d-a*f,e[t+2]=l*g+u*f+a*h-c*d,e[t+3]=u*g-a*d-c*h-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(s/2),d=a(r/2),h=c(i/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"YZX":this._x=h*u*d+l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d-h*f*g;break;case"XZY":this._x=h*u*d-l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=i+a+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(i>a&&i>d){const f=2*Math.sqrt(1+i-a-d);this._w=(u-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>d){const f=2*Math.sqrt(1+a-i-d);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+d-i-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(jt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-i*l,this._z=r*u+o*l+i*c-s*a,this._w=o*u-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+i*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),d=Math.sin((1-t)*u)/l,h=Math.sin(t*u)/l;return this._w=o*d+this._w*h,this._x=i*d+this._x*h,this._y=s*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,i=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(i2.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(i2.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*i),u=2*(a*t-r*s),d=2*(r*i-o*t);return this.x=t+c*l+o*d-a*u,this.y=i+c*u+a*l-r*d,this.z=s+c*d+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return nc.copy(this).projectOnVector(e),this.sub(nc)}reflect(e){return this.sub(nc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(jt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const nc=new R,i2=new es;class li{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Hn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Hn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Hn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Hn):Hn.fromBufferAttribute(r,o),Hn.applyMatrix4(e.matrixWorld),this.expandByPoint(Hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),oa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),oa.copy(i.boundingBox)),oa.applyMatrix4(e.matrixWorld),this.union(oa)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Hn),Hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Kr),aa.subVectors(this.max,Kr),Gs.subVectors(e.a,Kr),Ws.subVectors(e.b,Kr),Vs.subVectors(e.c,Kr),Fi.subVectors(Ws,Gs),Bi.subVectors(Vs,Ws),cs.subVectors(Gs,Vs);let t=[0,-Fi.z,Fi.y,0,-Bi.z,Bi.y,0,-cs.z,cs.y,Fi.z,0,-Fi.x,Bi.z,0,-Bi.x,cs.z,0,-cs.x,-Fi.y,Fi.x,0,-Bi.y,Bi.x,0,-cs.y,cs.x,0];return!ic(t,Gs,Ws,Vs,aa)||(t=[1,0,0,0,1,0,0,0,1],!ic(t,Gs,Ws,Vs,aa))?!1:(ca.crossVectors(Fi,Bi),t=[ca.x,ca.y,ca.z],ic(t,Gs,Ws,Vs,aa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(hi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const hi=[new R,new R,new R,new R,new R,new R,new R,new R],Hn=new R,oa=new li,Gs=new R,Ws=new R,Vs=new R,Fi=new R,Bi=new R,cs=new R,Kr=new R,aa=new R,ca=new R,ls=new R;function ic(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){ls.fromArray(n,r);const a=s.x*Math.abs(ls.x)+s.y*Math.abs(ls.y)+s.z*Math.abs(ls.z),c=e.dot(ls),l=t.dot(ls),u=i.dot(ls);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const H3=new li,Zr=new R,sc=new R;class Oi{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):H3.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Zr.subVectors(e,this.center);const t=Zr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Zr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(sc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Zr.copy(e.center).add(sc)),this.expandByPoint(Zr.copy(e.center).sub(sc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fi=new R,rc=new R,la=new R,ki=new R,oc=new R,ua=new R,ac=new R;class Yo{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fi.copy(this.origin).addScaledVector(this.direction,t),fi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){rc.copy(e).add(t).multiplyScalar(.5),la.copy(t).sub(e).normalize(),ki.copy(this.origin).sub(rc);const r=e.distanceTo(t)*.5,o=-this.direction.dot(la),a=ki.dot(this.direction),c=-ki.dot(la),l=ki.lengthSq(),u=Math.abs(1-o*o);let d,h,f,g;if(u>0)if(d=o*c-a,h=o*a-c,g=r*u,d>=0)if(h>=-g)if(h<=g){const v=1/u;d*=v,h*=v,f=d*(d+o*h+2*a)+h*(o*d+h+2*c)+l}else h=r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;else h=-r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;else h<=-g?(d=Math.max(0,-(-o*r+a)),h=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+h*(h+2*c)+l):h<=g?(d=0,h=Math.min(Math.max(-r,-c),r),f=h*(h+2*c)+l):(d=Math.max(0,-(o*r+a)),h=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+h*(h+2*c)+l);else h=o>0?-r:r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(rc).addScaledVector(la,h),f}intersectSphere(e,t){fi.subVectors(e.center,this.origin);const i=fi.dot(this.direction),s=fi.dot(fi)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,s=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,s=(e.min.x-h.x)*l),u>=0?(r=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,fi)!==null}intersectTriangle(e,t,i,s,r){oc.subVectors(t,e),ua.subVectors(i,e),ac.crossVectors(oc,ua);let o=this.direction.dot(ac),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ki.subVectors(this.origin,e);const c=a*this.direction.dot(ua.crossVectors(ki,ua));if(c<0)return null;const l=a*this.direction.dot(oc.cross(ki));if(l<0||c+l>o)return null;const u=-a*ki.dot(ac);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ot{constructor(e,t,i,s,r,o,a,c,l,u,d,h,f,g,v,m){ot.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l,u,d,h,f,g,v,m)}set(e,t,i,s,r,o,a,c,l,u,d,h,f,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ot().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Xs.setFromMatrixColumn(e,0).length(),r=1/Xs.setFromMatrixColumn(e,1).length(),o=1/Xs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const h=o*u,f=o*d,g=a*u,v=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=f+g*l,t[5]=h-v*l,t[9]=-a*c,t[2]=v-h*l,t[6]=g+f*l,t[10]=o*c}else if(e.order==="YXZ"){const h=c*u,f=c*d,g=l*u,v=l*d;t[0]=h+v*a,t[4]=g*a-f,t[8]=o*l,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=f*a-g,t[6]=v+h*a,t[10]=o*c}else if(e.order==="ZXY"){const h=c*u,f=c*d,g=l*u,v=l*d;t[0]=h-v*a,t[4]=-o*d,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*u,t[9]=v-h*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const h=o*u,f=o*d,g=a*u,v=a*d;t[0]=c*u,t[4]=g*l-f,t[8]=h*l+v,t[1]=c*d,t[5]=v*l+h,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const h=o*c,f=o*l,g=a*c,v=a*l;t[0]=c*u,t[4]=v-h*d,t[8]=g*d+f,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=f*d+g,t[10]=h-v*d}else if(e.order==="XZY"){const h=o*c,f=o*l,g=a*c,v=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+v,t[5]=o*u,t[9]=f*d-g,t[2]=g*d-f,t[6]=a*u,t[10]=v*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(U3,e,N3)}lookAt(e,t,i){const s=this.elements;return vn.subVectors(e,t),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),Gi.crossVectors(i,vn),Gi.lengthSq()===0&&(Math.abs(i.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),Gi.crossVectors(i,vn)),Gi.normalize(),da.crossVectors(vn,Gi),s[0]=Gi.x,s[4]=da.x,s[8]=vn.x,s[1]=Gi.y,s[5]=da.y,s[9]=vn.y,s[2]=Gi.z,s[6]=da.z,s[10]=vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],d=i[5],h=i[9],f=i[13],g=i[2],v=i[6],m=i[10],p=i[14],y=i[3],x=i[7],b=i[11],L=i[15],A=s[0],D=s[4],I=s[8],E=s[12],S=s[1],P=s[5],O=s[9],z=s[13],X=s[2],j=s[6],k=s[10],K=s[14],G=s[3],ne=s[7],ce=s[11],ue=s[15];return r[0]=o*A+a*S+c*X+l*G,r[4]=o*D+a*P+c*j+l*ne,r[8]=o*I+a*O+c*k+l*ce,r[12]=o*E+a*z+c*K+l*ue,r[1]=u*A+d*S+h*X+f*G,r[5]=u*D+d*P+h*j+f*ne,r[9]=u*I+d*O+h*k+f*ce,r[13]=u*E+d*z+h*K+f*ue,r[2]=g*A+v*S+m*X+p*G,r[6]=g*D+v*P+m*j+p*ne,r[10]=g*I+v*O+m*k+p*ce,r[14]=g*E+v*z+m*K+p*ue,r[3]=y*A+x*S+b*X+L*G,r[7]=y*D+x*P+b*j+L*ne,r[11]=y*I+x*O+b*k+L*ce,r[15]=y*E+x*z+b*K+L*ue,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+r*c*d-s*l*d-r*a*h+i*l*h+s*a*f-i*c*f)+v*(+t*c*f-t*l*h+r*o*h-s*o*f+s*l*u-r*c*u)+m*(+t*l*d-t*a*f-r*o*d+i*o*f+r*a*u-i*l*u)+p*(-s*a*u-t*c*d+t*a*h+s*o*d-i*o*h+i*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],y=d*m*l-v*h*l+v*c*f-a*m*f-d*c*p+a*h*p,x=g*h*l-u*m*l-g*c*f+o*m*f+u*c*p-o*h*p,b=u*v*l-g*d*l+g*a*f-o*v*f-u*a*p+o*d*p,L=g*d*c-u*v*c-g*a*h+o*v*h+u*a*m-o*d*m,A=t*y+i*x+s*b+r*L;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/A;return e[0]=y*D,e[1]=(v*h*r-d*m*r-v*s*f+i*m*f+d*s*p-i*h*p)*D,e[2]=(a*m*r-v*c*r+v*s*l-i*m*l-a*s*p+i*c*p)*D,e[3]=(d*c*r-a*h*r-d*s*l+i*h*l+a*s*f-i*c*f)*D,e[4]=x*D,e[5]=(u*m*r-g*h*r+g*s*f-t*m*f-u*s*p+t*h*p)*D,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*p-t*c*p)*D,e[7]=(o*h*r-u*c*r+u*s*l-t*h*l-o*s*f+t*c*f)*D,e[8]=b*D,e[9]=(g*d*r-u*v*r-g*i*f+t*v*f+u*i*p-t*d*p)*D,e[10]=(o*v*r-g*a*r+g*i*l-t*v*l-o*i*p+t*a*p)*D,e[11]=(u*a*r-o*d*r-u*i*l+t*d*l+o*i*f-t*a*f)*D,e[12]=L*D,e[13]=(u*v*s-g*d*s+g*i*h-t*v*h-u*i*m+t*d*m)*D,e[14]=(g*a*s-o*v*s-g*i*c+t*v*c+o*i*m-t*a*m)*D,e[15]=(o*d*s-u*a*s+u*i*c-t*d*c-o*i*h+t*a*h)*D,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+i,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,d=a+a,h=r*l,f=r*u,g=r*d,v=o*u,m=o*d,p=a*d,y=c*l,x=c*u,b=c*d,L=i.x,A=i.y,D=i.z;return s[0]=(1-(v+p))*L,s[1]=(f+b)*L,s[2]=(g-x)*L,s[3]=0,s[4]=(f-b)*A,s[5]=(1-(h+p))*A,s[6]=(m+y)*A,s[7]=0,s[8]=(g+x)*D,s[9]=(m-y)*D,s[10]=(1-(h+v))*D,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=Xs.set(s[0],s[1],s[2]).length();const o=Xs.set(s[4],s[5],s[6]).length(),a=Xs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Un.copy(this);const l=1/r,u=1/o,d=1/a;return Un.elements[0]*=l,Un.elements[1]*=l,Un.elements[2]*=l,Un.elements[4]*=u,Un.elements[5]*=u,Un.elements[6]*=u,Un.elements[8]*=d,Un.elements[9]*=d,Un.elements[10]*=d,t.setFromRotationMatrix(Un),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=Ei){const c=this.elements,l=2*r/(t-e),u=2*r/(i-s),d=(t+e)/(t-e),h=(i+s)/(i-s);let f,g;if(a===Ei)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===f0)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=Ei){const c=this.elements,l=1/(t-e),u=1/(i-s),d=1/(o-r),h=(t+e)*l,f=(i+s)*u;let g,v;if(a===Ei)g=(o+r)*d,v=-2*d;else if(a===f0)g=r*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Xs=new R,Un=new ot,U3=new R(0,0,0),N3=new R(1,1,1),Gi=new R,da=new R,vn=new R,s2=new ot,r2=new es;class Vn{constructor(e=0,t=0,i=0,s=Vn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-jt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-jt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(jt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return s2.makeRotationFromQuaternion(e),this.setFromRotationMatrix(s2,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return r2.setFromEuler(this),this.setFromQuaternion(r2,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vn.DEFAULT_ORDER="XYZ";class f1{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let O3=0;const o2=new R,Ys=new es,pi=new ot,ha=new R,Jr=new R,z3=new R,F3=new es,a2=new R(1,0,0),c2=new R(0,1,0),l2=new R(0,0,1),u2={type:"added"},B3={type:"removed"},js={type:"childadded",child:null},cc={type:"childremoved",child:null};class qt extends Fs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:O3++}),this.uuid=wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qt.DEFAULT_UP.clone();const e=new R,t=new Vn,i=new es,s=new R(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ot},normalMatrix:{value:new Ke}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=qt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new f1,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ys.setFromAxisAngle(e,t),this.quaternion.multiply(Ys),this}rotateOnWorldAxis(e,t){return Ys.setFromAxisAngle(e,t),this.quaternion.premultiply(Ys),this}rotateX(e){return this.rotateOnAxis(a2,e)}rotateY(e){return this.rotateOnAxis(c2,e)}rotateZ(e){return this.rotateOnAxis(l2,e)}translateOnAxis(e,t){return o2.copy(e).applyQuaternion(this.quaternion),this.position.add(o2.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(a2,e)}translateY(e){return this.translateOnAxis(c2,e)}translateZ(e){return this.translateOnAxis(l2,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ha.copy(e):ha.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Jr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pi.lookAt(Jr,ha,this.up):pi.lookAt(ha,Jr,this.up),this.quaternion.setFromRotationMatrix(pi),s&&(pi.extractRotation(s.matrixWorld),Ys.setFromRotationMatrix(pi),this.quaternion.premultiply(Ys.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(u2),js.child=e,this.dispatchEvent(js),js.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(B3),cc.child=e,this.dispatchEvent(cc),cc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pi.multiply(e.parent.matrixWorld)),e.applyMatrix4(pi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(u2),js.child=e,this.dispatchEvent(js),js.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jr,e,z3),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jr,F3,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}qt.DEFAULT_UP=new R(0,1,0);qt.DEFAULT_MATRIX_AUTO_UPDATE=!0;qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Nn=new R,mi=new R,lc=new R,gi=new R,qs=new R,Ks=new R,d2=new R,uc=new R,dc=new R,hc=new R;class Fn{constructor(e=new R,t=new R,i=new R){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Nn.subVectors(e,t),s.cross(Nn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Nn.subVectors(s,t),mi.subVectors(i,t),lc.subVectors(e,t);const o=Nn.dot(Nn),a=Nn.dot(mi),c=Nn.dot(lc),l=mi.dot(mi),u=mi.dot(lc),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;const h=1/d,f=(l*c-a*u)*h,g=(o*u-a*c)*h;return r.set(1-f-g,g,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,gi)===null?!1:gi.x>=0&&gi.y>=0&&gi.x+gi.y<=1}static getInterpolation(e,t,i,s,r,o,a,c){return this.getBarycoord(e,t,i,s,gi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,gi.x),c.addScaledVector(o,gi.y),c.addScaledVector(a,gi.z),c)}static isFrontFacing(e,t,i,s){return Nn.subVectors(i,t),mi.subVectors(e,t),Nn.cross(mi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Nn.subVectors(this.c,this.b),mi.subVectors(this.a,this.b),Nn.cross(mi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Fn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Fn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Fn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Fn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Fn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;qs.subVectors(s,i),Ks.subVectors(r,i),uc.subVectors(e,i);const c=qs.dot(uc),l=Ks.dot(uc);if(c<=0&&l<=0)return t.copy(i);dc.subVectors(e,s);const u=qs.dot(dc),d=Ks.dot(dc);if(u>=0&&d<=u)return t.copy(s);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(i).addScaledVector(qs,o);hc.subVectors(e,r);const f=qs.dot(hc),g=Ks.dot(hc);if(g>=0&&f<=g)return t.copy(r);const v=f*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(i).addScaledVector(Ks,a);const m=u*g-f*d;if(m<=0&&d-u>=0&&f-g>=0)return d2.subVectors(r,s),a=(d-u)/(d-u+(f-g)),t.copy(s).addScaledVector(d2,a);const p=1/(m+v+h);return o=v*p,a=h*p,t.copy(i).addScaledVector(qs,o).addScaledVector(Ks,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Fd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wi={h:0,s:0,l:0},fa={h:0,s:0,l:0};function fc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class je{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=rt.workingColorSpace){return this.r=e,this.g=t,this.b=i,rt.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=rt.workingColorSpace){if(e=h1(e,1),t=jt(t,0,1),i=jt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=fc(o,r,e+1/3),this.g=fc(o,r,e),this.b=fc(o,r,e-1/3)}return rt.toWorkingColorSpace(this,s),this}setStyle(e,t=wt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wt){const i=Fd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=xr(e.r),this.g=xr(e.g),this.b=xr(e.b),this}copyLinearToSRGB(e){return this.r=ec(e.r),this.g=ec(e.g),this.b=ec(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wt){return rt.fromWorkingColorSpace($t.copy(this),e),Math.round(jt($t.r*255,0,255))*65536+Math.round(jt($t.g*255,0,255))*256+Math.round(jt($t.b*255,0,255))}getHexString(e=wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=rt.workingColorSpace){rt.fromWorkingColorSpace($t.copy(this),t);const i=$t.r,s=$t.g,r=$t.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case i:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-i)/d+2;break;case r:c=(i-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=rt.workingColorSpace){return rt.fromWorkingColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=wt){rt.fromWorkingColorSpace($t.copy(this),e);const t=$t.r,i=$t.g,s=$t.b;return e!==wt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Wi),this.setHSL(Wi.h+e,Wi.s+t,Wi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Wi),e.getHSL(fa);const i=xo(Wi.h,fa.h,t),s=xo(Wi.s,fa.s,t),r=xo(Wi.l,fa.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const $t=new je;je.NAMES=Fd;let k3=0;class ss extends Fs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:k3++}),this.uuid=wi(),this.name="",this.type="Material",this.blending=mr,this.side=Ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=el,this.blendDst=tl,this.blendEquation=_s,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=l0,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=J1,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bs,this.stencilZFail=Bs,this.stencilZPass=Bs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==mr&&(i.blending=this.blending),this.side!==Ri&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==el&&(i.blendSrc=this.blendSrc),this.blendDst!==tl&&(i.blendDst=this.blendDst),this.blendEquation!==_s&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==l0&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==J1&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Bs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Bs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Bs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Fr extends ss{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=vd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Pt=new R,pa=new be;class Kt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Rl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=$n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return vr("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)pa.fromBufferAttribute(this,t),pa.applyMatrix3(e),this.setXY(t,pa.x,pa.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=zn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=lt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=zn(t,this.array)),t}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=zn(t,this.array)),t}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=zn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=zn(t,this.array)),t}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),s=lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),s=lt(s,this.array),r=lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Rl&&(e.usage=this.usage),e}}class Bd extends Kt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class kd extends Kt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class vt extends Kt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let G3=0;const wn=new ot,pc=new qt,Zs=new R,xn=new li,Qr=new li,Ot=new R;class yt extends Fs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:G3++}),this.uuid=wi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Nd(e)?kd:Bd)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ke().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return wn.makeRotationFromQuaternion(e),this.applyMatrix4(wn),this}rotateX(e){return wn.makeRotationX(e),this.applyMatrix4(wn),this}rotateY(e){return wn.makeRotationY(e),this.applyMatrix4(wn),this}rotateZ(e){return wn.makeRotationZ(e),this.applyMatrix4(wn),this}translate(e,t,i){return wn.makeTranslation(e,t,i),this.applyMatrix4(wn),this}scale(e,t,i){return wn.makeScale(e,t,i),this.applyMatrix4(wn),this}lookAt(e){return pc.lookAt(e),pc.updateMatrix(),this.applyMatrix4(pc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zs).negate(),this.translate(Zs.x,Zs.y,Zs.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new vt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new li);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];xn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Oi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){const i=this.boundingSphere.center;if(xn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Qr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ot.addVectors(xn.min,Qr.min),xn.expandByPoint(Ot),Ot.addVectors(xn.max,Qr.max),xn.expandByPoint(Ot)):(xn.expandByPoint(Qr.min),xn.expandByPoint(Qr.max))}xn.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Ot.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Ot));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ot.fromBufferAttribute(a,l),c&&(Zs.fromBufferAttribute(e,l),Ot.add(Zs)),s=Math.max(s,i.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Kt(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<i.count;I++)a[I]=new R,c[I]=new R;const l=new R,u=new R,d=new R,h=new be,f=new be,g=new be,v=new R,m=new R;function p(I,E,S){l.fromBufferAttribute(i,I),u.fromBufferAttribute(i,E),d.fromBufferAttribute(i,S),h.fromBufferAttribute(r,I),f.fromBufferAttribute(r,E),g.fromBufferAttribute(r,S),u.sub(l),d.sub(l),f.sub(h),g.sub(h);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(P),m.copy(d).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(P),a[I].add(v),a[E].add(v),a[S].add(v),c[I].add(m),c[E].add(m),c[S].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let I=0,E=y.length;I<E;++I){const S=y[I],P=S.start,O=S.count;for(let z=P,X=P+O;z<X;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const x=new R,b=new R,L=new R,A=new R;function D(I){L.fromBufferAttribute(s,I),A.copy(L);const E=a[I];x.copy(E),x.sub(L.multiplyScalar(L.dot(E))).normalize(),b.crossVectors(A,E);const P=b.dot(c[I])<0?-1:1;o.setXYZW(I,x.x,x.y,x.z,P)}for(let I=0,E=y.length;I<E;++I){const S=y[I],P=S.start,O=S.count;for(let z=P,X=P+O;z<X;z+=3)D(e.getX(z+0)),D(e.getX(z+1)),D(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Kt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);const s=new R,r=new R,o=new R,a=new R,c=new R,l=new R,u=new R,d=new R;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),v=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,m),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,m),a.add(u),c.add(u),l.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,d=a.normalized,h=new l.constructor(c.length*u);let f=0,g=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?f=c[v]*a.data.stride+a.offset:f=c[v]*u;for(let p=0;p<u;p++)h[g++]=l[f++]}return new Kt(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new yt,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,i);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,d=l.length;u<d;u++){const h=l[u],f=e(h,i);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const f=l[d];u.push(f.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],d=r[l];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,u=o.length;l<u;l++){const d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const h2=new ot,us=new Yo,ma=new Oi,f2=new R,Js=new R,Qs=new R,$s=new R,mc=new R,ga=new R,va=new be,xa=new be,_a=new be,p2=new R,m2=new R,g2=new R,Ma=new R,ya=new R;class Dt extends qt{constructor(e=new yt,t=new Fr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){ga.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],d=r[c];u!==0&&(mc.fromBufferAttribute(d,e),o?ga.addScaledVector(mc,u):ga.addScaledVector(mc.sub(t),u))}t.add(ga)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ma.copy(i.boundingSphere),ma.applyMatrix4(r),us.copy(e.ray).recast(e.near),!(ma.containsPoint(us.origin)===!1&&(us.intersectSphere(ma,f2)===null||us.origin.distanceToSquared(f2)>(e.far-e.near)**2))&&(h2.copy(r).invert(),us.copy(e.ray).applyMatrix4(h2),!(i.boundingBox!==null&&us.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,us)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),x=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let b=y,L=x;b<L;b+=3){const A=a.getX(b),D=a.getX(b+1),I=a.getX(b+2);s=Sa(this,p,e,i,l,u,d,A,D,I),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const y=a.getX(m),x=a.getX(m+1),b=a.getX(m+2);s=Sa(this,o,e,i,l,u,d,y,x,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),x=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let b=y,L=x;b<L;b+=3){const A=b,D=b+1,I=b+2;s=Sa(this,p,e,i,l,u,d,A,D,I),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const y=m,x=m+1,b=m+2;s=Sa(this,o,e,i,l,u,d,y,x,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function W3(n,e,t,i,s,r,o,a){let c;if(e.side===en?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,e.side===Ri,a),c===null)return null;ya.copy(a),ya.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(ya);return l<t.near||l>t.far?null:{distance:l,point:ya.clone(),object:n}}function Sa(n,e,t,i,s,r,o,a,c,l){n.getVertexPosition(a,Js),n.getVertexPosition(c,Qs),n.getVertexPosition(l,$s);const u=W3(n,e,t,i,Js,Qs,$s,Ma);if(u){s&&(va.fromBufferAttribute(s,a),xa.fromBufferAttribute(s,c),_a.fromBufferAttribute(s,l),u.uv=Fn.getInterpolation(Ma,Js,Qs,$s,va,xa,_a,new be)),r&&(va.fromBufferAttribute(r,a),xa.fromBufferAttribute(r,c),_a.fromBufferAttribute(r,l),u.uv1=Fn.getInterpolation(Ma,Js,Qs,$s,va,xa,_a,new be)),o&&(p2.fromBufferAttribute(o,a),m2.fromBufferAttribute(o,c),g2.fromBufferAttribute(o,l),u.normal=Fn.getInterpolation(Ma,Js,Qs,$s,p2,m2,g2,new R),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new R,materialIndex:0};Fn.getNormal(Js,Qs,$s,d.normal),u.face=d}return u}class jo extends yt{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],d=[];let h=0,f=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,s,o,2),g("x","z","y",1,-1,e,i,-t,s,o,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new vt(l,3)),this.setAttribute("normal",new vt(u,3)),this.setAttribute("uv",new vt(d,2));function g(v,m,p,y,x,b,L,A,D,I,E){const S=b/D,P=L/I,O=b/2,z=L/2,X=A/2,j=D+1,k=I+1;let K=0,G=0;const ne=new R;for(let ce=0;ce<k;ce++){const ue=ce*P-z;for(let Te=0;Te<j;Te++){const Ue=Te*S-O;ne[v]=Ue*y,ne[m]=ue*x,ne[p]=X,l.push(ne.x,ne.y,ne.z),ne[v]=0,ne[m]=0,ne[p]=A>0?1:-1,u.push(ne.x,ne.y,ne.z),d.push(Te/D),d.push(1-ce/I),K+=1}}for(let ce=0;ce<I;ce++)for(let ue=0;ue<D;ue++){const Te=h+ue+j*ce,Ue=h+ue+j*(ce+1),q=h+(ue+1)+j*(ce+1),Y=h+(ue+1)+j*ce;c.push(Te,Ue,Y),c.push(Ue,q,Y),G+=6}a.addGroup(f,G,E),f+=G,h+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Dr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function sn(n){const e={};for(let t=0;t<n.length;t++){const i=Dr(n[t]);for(const s in i)e[s]=i[s]}return e}function V3(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Gd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:rt.workingColorSpace}const Gn={clone:Dr,merge:sn};var X3=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Y3=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _t extends ss{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=X3,this.fragmentShader=Y3,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Dr(e.uniforms),this.uniformsGroups=V3(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Wd extends qt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=Ei}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Vi=new R,v2=new be,x2=new be;class Mn extends Wd{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=wo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(vo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return wo*2*Math.atan(Math.tan(vo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Vi.x,Vi.y).multiplyScalar(-e/Vi.z),Vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Vi.x,Vi.y).multiplyScalar(-e/Vi.z)}getViewSize(e,t){return this.getViewBounds(e,v2,x2),t.subVectors(x2,v2)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(vo*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const er=-90,tr=1;class j3 extends qt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Mn(er,tr,e,t);s.layers=this.layers,this.add(s);const r=new Mn(er,tr,e,t);r.layers=this.layers,this.add(r);const o=new Mn(er,tr,e,t);o.layers=this.layers,this.add(o);const a=new Mn(er,tr,e,t);a.layers=this.layers,this.add(a);const c=new Mn(er,tr,e,t);c.layers=this.layers,this.add(c);const l=new Mn(er,tr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===Ei)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===f0)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,c),e.setRenderTarget(i,4,s),e.render(t,l),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Vd extends It{constructor(e,t,i,s,r,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:br,super(e,t,i,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class q3 extends cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Vd(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Rn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new jo(5,5,5),r=new _t({name:"CubemapFromEquirect",uniforms:Dr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:en,blending:si});r.uniforms.tEquirect.value=t;const o=new Dt(s,r),a=t.minFilter;return t.minFilter===bs&&(t.minFilter=Rn),new j3(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}const gc=new R,K3=new R,Z3=new Ke;class Yi{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=gc.subVectors(i,t).cross(K3.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(gc),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Z3.getNormalMatrix(e),s=this.coplanarPoint(gc).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ds=new Oi,ba=new R;class p1{constructor(e=new Yi,t=new Yi,i=new Yi,s=new Yi,r=new Yi,o=new Yi){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ei){const i=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],u=s[5],d=s[6],h=s[7],f=s[8],g=s[9],v=s[10],m=s[11],p=s[12],y=s[13],x=s[14],b=s[15];if(i[0].setComponents(c-r,h-l,m-f,b-p).normalize(),i[1].setComponents(c+r,h+l,m+f,b+p).normalize(),i[2].setComponents(c+o,h+u,m+g,b+y).normalize(),i[3].setComponents(c-o,h-u,m-g,b-y).normalize(),i[4].setComponents(c-a,h-d,m-v,b-x).normalize(),t===Ei)i[5].setComponents(c+a,h+d,m+v,b+x).normalize();else if(t===f0)i[5].setComponents(a,d,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ds.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ds.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ds)}intersectsSprite(e){return ds.center.set(0,0,0),ds.radius=.7071067811865476,ds.applyMatrix4(e.matrixWorld),this.intersectsSphere(ds)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(ba.x=s.normal.x>0?e.max.x:e.min.x,ba.y=s.normal.y>0?e.max.y:e.min.y,ba.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ba)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Xd(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function J3(n){const e=new WeakMap;function t(a,c){const l=a.array,u=a.usage,d=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,u),a.onUploadCallback();let f;if(l instanceof Float32Array)f=n.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=n.SHORT;else if(l instanceof Uint32Array)f=n.UNSIGNED_INT;else if(l instanceof Int32Array)f=n.INT;else if(l instanceof Int8Array)f=n.BYTE;else if(l instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,c,l){const u=c.array,d=c._updateRange,h=c.updateRanges;if(n.bindBuffer(l,a),d.count===-1&&h.length===0&&n.bufferSubData(l,0,u),h.length!==0){for(let f=0,g=h.length;f<g;f++){const v=h[f];n.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}d.count!==-1&&(n.bufferSubData(l,d.offset*u.BYTES_PER_ELEMENT,u,d.offset,d.count),d.count=-1),c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class qo extends yt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),c=Math.floor(s),l=a+1,u=c+1,d=e/a,h=t/c,f=[],g=[],v=[],m=[];for(let p=0;p<u;p++){const y=p*h-o;for(let x=0;x<l;x++){const b=x*d-r;g.push(b,-y,0),v.push(0,0,1),m.push(x/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<a;y++){const x=y+l*p,b=y+l*(p+1),L=y+1+l*(p+1),A=y+1+l*p;f.push(x,b,A),f.push(b,L,A)}this.setIndex(f),this.setAttribute("position",new vt(g,3)),this.setAttribute("normal",new vt(v,3)),this.setAttribute("uv",new vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qo(e.width,e.height,e.widthSegments,e.heightSegments)}}var Q3=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$3=`#ifdef USE_ALPHAHASH
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
#endif`,e5=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,t5=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,n5=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,i5=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,s5=`#ifdef USE_AOMAP
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
#endif`,r5=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,o5=`#ifdef USE_BATCHING
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
#endif`,a5=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,c5=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,l5=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,u5=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,d5=`#ifdef USE_IRIDESCENCE
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
#endif`,h5=`#ifdef USE_BUMPMAP
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
#endif`,f5=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,p5=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,m5=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,g5=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,v5=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,x5=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,_5=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,M5=`#if defined( USE_COLOR_ALPHA )
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
#endif`,y5=`#define PI 3.141592653589793
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
} // validated`,S5=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,b5=`vec3 transformedNormal = objectNormal;
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
#endif`,E5=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,T5=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,A5=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,w5=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,D5="gl_FragColor = linearToOutputTexel( gl_FragColor );",C5=`
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
}`,P5=`#ifdef USE_ENVMAP
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
#endif`,R5=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,L5=`#ifdef USE_ENVMAP
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
#endif`,I5=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,H5=`#ifdef USE_ENVMAP
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
#endif`,U5=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,N5=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,O5=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,z5=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,F5=`#ifdef USE_GRADIENTMAP
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
}`,B5=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,k5=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,G5=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,W5=`uniform bool receiveShadow;
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
#endif`,V5=`#ifdef USE_ENVMAP
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
#endif`,X5=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Y5=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,j5=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,q5=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,K5=`PhysicalMaterial material;
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
#endif`,Z5=`struct PhysicalMaterial {
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
}`,J5=`
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
#endif`,Q5=`#if defined( RE_IndirectDiffuse )
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
#endif`,$5=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ep=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,tp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,np=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ip=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,sp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,rp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,op=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ap=`#if defined( USE_POINTS_UV )
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
#endif`,cp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,lp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,up=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,dp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fp=`#ifdef USE_MORPHTARGETS
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
#endif`,pp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,gp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,vp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_p=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Mp=`#ifdef USE_NORMALMAP
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
#endif`,yp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Sp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ep=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ap=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,wp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Cp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Pp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Lp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ip=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Hp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Up=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Np=`float getShadowMask() {
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
}`,Op=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zp=`#ifdef USE_SKINNING
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
#endif`,Fp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Bp=`#ifdef USE_SKINNING
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
#endif`,kp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Xp=`#ifdef USE_TRANSMISSION
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
#endif`,Yp=`#ifdef USE_TRANSMISSION
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
#endif`,jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Jp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Qp=`uniform sampler2D t2D;
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
}`,$p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,e9=`#ifdef ENVMAP_TYPE_CUBE
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
}`,t9=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,n9=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,i9=`#include <common>
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
}`,s9=`#if DEPTH_PACKING == 3200
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
}`,r9=`#define DISTANCE
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
}`,o9=`#define DISTANCE
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
}`,a9=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,c9=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,l9=`uniform float scale;
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
}`,u9=`uniform vec3 diffuse;
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
}`,d9=`#include <common>
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
}`,h9=`uniform vec3 diffuse;
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
}`,f9=`#define LAMBERT
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
}`,p9=`#define LAMBERT
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
}`,m9=`#define MATCAP
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
}`,g9=`#define MATCAP
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
}`,v9=`#define NORMAL
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
}`,x9=`#define NORMAL
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
}`,_9=`#define PHONG
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
}`,M9=`#define PHONG
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
}`,y9=`#define STANDARD
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
}`,S9=`#define STANDARD
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
}`,b9=`#define TOON
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
}`,E9=`#define TOON
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
}`,T9=`uniform float size;
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
}`,A9=`uniform vec3 diffuse;
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
}`,w9=`#include <common>
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
}`,D9=`uniform vec3 color;
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
}`,C9=`uniform float rotation;
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
}`,P9=`uniform vec3 diffuse;
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
}`,qe={alphahash_fragment:Q3,alphahash_pars_fragment:$3,alphamap_fragment:e5,alphamap_pars_fragment:t5,alphatest_fragment:n5,alphatest_pars_fragment:i5,aomap_fragment:s5,aomap_pars_fragment:r5,batching_pars_vertex:o5,batching_vertex:a5,begin_vertex:c5,beginnormal_vertex:l5,bsdfs:u5,iridescence_fragment:d5,bumpmap_pars_fragment:h5,clipping_planes_fragment:f5,clipping_planes_pars_fragment:p5,clipping_planes_pars_vertex:m5,clipping_planes_vertex:g5,color_fragment:v5,color_pars_fragment:x5,color_pars_vertex:_5,color_vertex:M5,common:y5,cube_uv_reflection_fragment:S5,defaultnormal_vertex:b5,displacementmap_pars_vertex:E5,displacementmap_vertex:T5,emissivemap_fragment:A5,emissivemap_pars_fragment:w5,colorspace_fragment:D5,colorspace_pars_fragment:C5,envmap_fragment:P5,envmap_common_pars_fragment:R5,envmap_pars_fragment:L5,envmap_pars_vertex:I5,envmap_physical_pars_fragment:V5,envmap_vertex:H5,fog_vertex:U5,fog_pars_vertex:N5,fog_fragment:O5,fog_pars_fragment:z5,gradientmap_pars_fragment:F5,lightmap_pars_fragment:B5,lights_lambert_fragment:k5,lights_lambert_pars_fragment:G5,lights_pars_begin:W5,lights_toon_fragment:X5,lights_toon_pars_fragment:Y5,lights_phong_fragment:j5,lights_phong_pars_fragment:q5,lights_physical_fragment:K5,lights_physical_pars_fragment:Z5,lights_fragment_begin:J5,lights_fragment_maps:Q5,lights_fragment_end:$5,logdepthbuf_fragment:ep,logdepthbuf_pars_fragment:tp,logdepthbuf_pars_vertex:np,logdepthbuf_vertex:ip,map_fragment:sp,map_pars_fragment:rp,map_particle_fragment:op,map_particle_pars_fragment:ap,metalnessmap_fragment:cp,metalnessmap_pars_fragment:lp,morphinstance_vertex:up,morphcolor_vertex:dp,morphnormal_vertex:hp,morphtarget_pars_vertex:fp,morphtarget_vertex:pp,normal_fragment_begin:mp,normal_fragment_maps:gp,normal_pars_fragment:vp,normal_pars_vertex:xp,normal_vertex:_p,normalmap_pars_fragment:Mp,clearcoat_normal_fragment_begin:yp,clearcoat_normal_fragment_maps:Sp,clearcoat_pars_fragment:bp,iridescence_pars_fragment:Ep,opaque_fragment:Tp,packing:Ap,premultiplied_alpha_fragment:wp,project_vertex:Dp,dithering_fragment:Cp,dithering_pars_fragment:Pp,roughnessmap_fragment:Rp,roughnessmap_pars_fragment:Lp,shadowmap_pars_fragment:Ip,shadowmap_pars_vertex:Hp,shadowmap_vertex:Up,shadowmask_pars_fragment:Np,skinbase_vertex:Op,skinning_pars_vertex:zp,skinning_vertex:Fp,skinnormal_vertex:Bp,specularmap_fragment:kp,specularmap_pars_fragment:Gp,tonemapping_fragment:Wp,tonemapping_pars_fragment:Vp,transmission_fragment:Xp,transmission_pars_fragment:Yp,uv_pars_fragment:jp,uv_pars_vertex:qp,uv_vertex:Kp,worldpos_vertex:Zp,background_vert:Jp,background_frag:Qp,backgroundCube_vert:$p,backgroundCube_frag:e9,cube_vert:t9,cube_frag:n9,depth_vert:i9,depth_frag:s9,distanceRGBA_vert:r9,distanceRGBA_frag:o9,equirect_vert:a9,equirect_frag:c9,linedashed_vert:l9,linedashed_frag:u9,meshbasic_vert:d9,meshbasic_frag:h9,meshlambert_vert:f9,meshlambert_frag:p9,meshmatcap_vert:m9,meshmatcap_frag:g9,meshnormal_vert:v9,meshnormal_frag:x9,meshphong_vert:_9,meshphong_frag:M9,meshphysical_vert:y9,meshphysical_frag:S9,meshtoon_vert:b9,meshtoon_frag:E9,points_vert:T9,points_frag:A9,shadow_vert:w9,shadow_frag:D9,sprite_vert:C9,sprite_frag:P9},ge={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},fn={basic:{uniforms:sn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:sn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new je(0)}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:sn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:sn([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:sn([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new je(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:sn([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:sn([ge.points,ge.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:sn([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:sn([ge.common,ge.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:sn([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:sn([ge.sprite,ge.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distanceRGBA:{uniforms:sn([ge.common,ge.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distanceRGBA_vert,fragmentShader:qe.distanceRGBA_frag},shadow:{uniforms:sn([ge.lights,ge.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};fn.physical={uniforms:sn([fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const Ea={r:0,b:0,g:0},hs=new Vn,R9=new ot;function L9(n,e,t,i,s,r,o){const a=new je(0);let c=r===!0?0:1,l,u,d=null,h=0,f=null;function g(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?t:e).get(x)),x}function v(y){let x=!1;const b=g(y);b===null?p(a,c):b&&b.isColor&&(p(b,1),x=!0);const L=n.xr.getEnvironmentBlendMode();L==="additive"?i.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(y,x){const b=g(x);b&&(b.isCubeTexture||b.mapping===H0)?(u===void 0&&(u=new Dt(new jo(1,1,1),new _t({name:"BackgroundCubeMaterial",uniforms:Dr(fn.backgroundCube.uniforms),vertexShader:fn.backgroundCube.vertexShader,fragmentShader:fn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(L,A,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),hs.copy(x.backgroundRotation),hs.x*=-1,hs.y*=-1,hs.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(hs.y*=-1,hs.z*=-1),u.material.uniforms.envMap.value=b,u.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(R9.makeRotationFromEuler(hs)),u.material.toneMapped=rt.getTransfer(b.colorSpace)!==mt,(d!==b||h!==b.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,d=b,h=b.version,f=n.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new Dt(new qo(2,2),new _t({name:"BackgroundMaterial",uniforms:Dr(fn.background.uniforms),vertexShader:fn.background.vertexShader,fragmentShader:fn.background.fragmentShader,side:Ri,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=rt.getTransfer(b.colorSpace)!==mt,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||h!==b.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,d=b,h=b.version,f=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,x){y.getRGB(Ea,Gd(n)),i.buffers.color.setClear(Ea.r,Ea.g,Ea.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(y,x=1){a.set(y),c=x,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(a,c)},render:v,addToRenderList:m}}function I9(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,o=!1;function a(S,P,O,z,X){let j=!1;const k=d(z,O,P);r!==k&&(r=k,l(r.object)),j=f(S,z,O,X),j&&g(S,z,O,X),X!==null&&e.update(X,n.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,b(S,P,O,z),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function c(){return n.createVertexArray()}function l(S){return n.bindVertexArray(S)}function u(S){return n.deleteVertexArray(S)}function d(S,P,O){const z=O.wireframe===!0;let X=i[S.id];X===void 0&&(X={},i[S.id]=X);let j=X[P.id];j===void 0&&(j={},X[P.id]=j);let k=j[z];return k===void 0&&(k=h(c()),j[z]=k),k}function h(S){const P=[],O=[],z=[];for(let X=0;X<t;X++)P[X]=0,O[X]=0,z[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:O,attributeDivisors:z,object:S,attributes:{},index:null}}function f(S,P,O,z){const X=r.attributes,j=P.attributes;let k=0;const K=O.getAttributes();for(const G in K)if(K[G].location>=0){const ce=X[G];let ue=j[G];if(ue===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(ue=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(ue=S.instanceColor)),ce===void 0||ce.attribute!==ue||ue&&ce.data!==ue.data)return!0;k++}return r.attributesNum!==k||r.index!==z}function g(S,P,O,z){const X={},j=P.attributes;let k=0;const K=O.getAttributes();for(const G in K)if(K[G].location>=0){let ce=j[G];ce===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(ce=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(ce=S.instanceColor));const ue={};ue.attribute=ce,ce&&ce.data&&(ue.data=ce.data),X[G]=ue,k++}r.attributes=X,r.attributesNum=k,r.index=z}function v(){const S=r.newAttributes;for(let P=0,O=S.length;P<O;P++)S[P]=0}function m(S){p(S,0)}function p(S,P){const O=r.newAttributes,z=r.enabledAttributes,X=r.attributeDivisors;O[S]=1,z[S]===0&&(n.enableVertexAttribArray(S),z[S]=1),X[S]!==P&&(n.vertexAttribDivisor(S,P),X[S]=P)}function y(){const S=r.newAttributes,P=r.enabledAttributes;for(let O=0,z=P.length;O<z;O++)P[O]!==S[O]&&(n.disableVertexAttribArray(O),P[O]=0)}function x(S,P,O,z,X,j,k){k===!0?n.vertexAttribIPointer(S,P,O,X,j):n.vertexAttribPointer(S,P,O,z,X,j)}function b(S,P,O,z){v();const X=z.attributes,j=O.getAttributes(),k=P.defaultAttributeValues;for(const K in j){const G=j[K];if(G.location>=0){let ne=X[K];if(ne===void 0&&(K==="instanceMatrix"&&S.instanceMatrix&&(ne=S.instanceMatrix),K==="instanceColor"&&S.instanceColor&&(ne=S.instanceColor)),ne!==void 0){const ce=ne.normalized,ue=ne.itemSize,Te=e.get(ne);if(Te===void 0)continue;const Ue=Te.buffer,q=Te.type,Y=Te.bytesPerElement,te=q===n.INT||q===n.UNSIGNED_INT||ne.gpuType===s1;if(ne.isInterleavedBufferAttribute){const ae=ne.data,xe=ae.stride,we=ne.offset;if(ae.isInstancedInterleavedBuffer){for(let Ee=0;Ee<G.locationSize;Ee++)p(G.location+Ee,ae.meshPerAttribute);S.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Ee=0;Ee<G.locationSize;Ee++)m(G.location+Ee);n.bindBuffer(n.ARRAY_BUFFER,Ue);for(let Ee=0;Ee<G.locationSize;Ee++)x(G.location+Ee,ue/G.locationSize,q,ce,xe*Y,(we+ue/G.locationSize*Ee)*Y,te)}else{if(ne.isInstancedBufferAttribute){for(let ae=0;ae<G.locationSize;ae++)p(G.location+ae,ne.meshPerAttribute);S.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let ae=0;ae<G.locationSize;ae++)m(G.location+ae);n.bindBuffer(n.ARRAY_BUFFER,Ue);for(let ae=0;ae<G.locationSize;ae++)x(G.location+ae,ue/G.locationSize,q,ce,ue*Y,ue/G.locationSize*ae*Y,te)}}else if(k!==void 0){const ce=k[K];if(ce!==void 0)switch(ce.length){case 2:n.vertexAttrib2fv(G.location,ce);break;case 3:n.vertexAttrib3fv(G.location,ce);break;case 4:n.vertexAttrib4fv(G.location,ce);break;default:n.vertexAttrib1fv(G.location,ce)}}}}y()}function L(){I();for(const S in i){const P=i[S];for(const O in P){const z=P[O];for(const X in z)u(z[X].object),delete z[X];delete P[O]}delete i[S]}}function A(S){if(i[S.id]===void 0)return;const P=i[S.id];for(const O in P){const z=P[O];for(const X in z)u(z[X].object),delete z[X];delete P[O]}delete i[S.id]}function D(S){for(const P in i){const O=i[P];if(O[S.id]===void 0)continue;const z=O[S.id];for(const X in z)u(z[X].object),delete z[X];delete O[S.id]}}function I(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:E,dispose:L,releaseStatesOfGeometry:A,releaseStatesOfProgram:D,initAttributes:v,enableAttribute:m,disableUnusedAttributes:y}}function H9(n,e,t){let i;function s(l){i=l}function r(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function o(l,u,d){d!==0&&(n.drawArraysInstanced(i,l,u,d),t.update(u,i,d))}function a(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let f=0;for(let g=0;g<d;g++)f+=u[g];t.update(f,i,1)}function c(l,u,d,h){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],u[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(i,l,0,u,0,h,0,d);let g=0;for(let v=0;v<d;v++)g+=u[v];for(let v=0;v<h.length;v++)t.update(g,i,h[v])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function U9(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==Bn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const D=A===bn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Li&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==$n&&!D)}function c(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),v=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),b=f>0,L=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,maxTextures:h,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:v,maxAttributes:m,maxVertexUniforms:p,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:b,maxSamples:L}}function N9(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new Yi,a=new Ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||i!==0||s;return s=h,i=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{const y=r?0:i,x=y*4;let b=p.clippingState||null;c.value=b,b=u(g,h,x,f);for(let L=0;L!==x;++L)b[L]=t[L];p.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,f,g){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const p=f+v*4,y=h.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,b=f;x!==v;++x,b+=4)o.copy(d[x]).applyMatrix4(y,a),o.normal.toArray(m,b),m[b+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function O9(n){let e=new WeakMap;function t(o,a){return a===nl?o.mapping=br:a===il&&(o.mapping=Er),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===nl||a===il)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new q3(c.height);return l.fromEquirectangularTexture(n,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class Yd extends Wd{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ur=4,_2=[.125,.215,.35,.446,.526,.582],Ms=20,vc=new Yd,M2=new je;let xc=null,_c=0,Mc=0,yc=!1;const vs=(1+Math.sqrt(5))/2,nr=1/vs,y2=[new R(-vs,nr,0),new R(vs,nr,0),new R(-nr,0,vs),new R(nr,0,vs),new R(0,vs,-nr),new R(0,vs,nr),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)];class S2{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){xc=this._renderer.getRenderTarget(),_c=this._renderer.getActiveCubeFace(),Mc=this._renderer.getActiveMipmapLevel(),yc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=T2(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=E2(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(xc,_c,Mc),this._renderer.xr.enabled=yc,e.scissorTest=!1,Ta(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===br||e.mapping===Er?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),xc=this._renderer.getRenderTarget(),_c=this._renderer.getActiveCubeFace(),Mc=this._renderer.getActiveMipmapLevel(),yc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Rn,minFilter:Rn,generateMipmaps:!1,type:bn,format:Bn,colorSpace:is,depthBuffer:!1},s=b2(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=b2(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=z9(r)),this._blurMaterial=F9(r,e,t)}return s}_compileMaterial(e){const t=new Dt(this._lodPlanes[0],e);this._renderer.compile(t,vc)}_sceneToCubeUV(e,t,i,s){const a=new Mn(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(M2),u.toneMapping=Ji,u.autoClear=!1;const f=new Fr({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1}),g=new Dt(new jo,f);let v=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,v=!0):(f.color.copy(M2),v=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):y===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const x=this._cubeSize;Ta(s,y*x,p>2?x:0,x,x),u.setRenderTarget(s),v&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===br||e.mapping===Er;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=T2()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=E2());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Dt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;Ta(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,vc)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=y2[(s-r-1)%y2.length];this._blur(e,r-1,r,o,a)}t.autoClear=i}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Dt(this._lodPlanes[s],l),h=l.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ms-1),v=r/g,m=isFinite(r)?1+Math.floor(u*v):Ms;m>Ms&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ms}`);const p=[];let y=0;for(let D=0;D<Ms;++D){const I=D/v,E=Math.exp(-I*I/2);p.push(E),D===0?y+=E:D<m&&(y+=2*E)}for(let D=0;D<p.length;D++)p[D]=p[D]/y;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:x}=this;h.dTheta.value=g,h.mipInt.value=x-i;const b=this._sizeLods[s],L=3*b*(s>x-ur?s-x+ur:0),A=4*(this._cubeSize-b);Ta(t,L,A,3*b,2*b),c.setRenderTarget(t),c.render(d,vc)}}function z9(n){const e=[],t=[],i=[];let s=n;const r=n-ur+1+_2.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>n-ur?c=_2[o-n+ur-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,v=3,m=2,p=1,y=new Float32Array(v*g*f),x=new Float32Array(m*g*f),b=new Float32Array(p*g*f);for(let A=0;A<f;A++){const D=A%3*2/3-1,I=A>2?0:-1,E=[D,I,0,D+2/3,I,0,D+2/3,I+1,0,D,I,0,D+2/3,I+1,0,D,I+1,0];y.set(E,v*g*A),x.set(h,m*g*A);const S=[A,A,A,A,A,A];b.set(S,p*g*A)}const L=new yt;L.setAttribute("position",new Kt(y,v)),L.setAttribute("uv",new Kt(x,m)),L.setAttribute("faceIndex",new Kt(b,p)),e.push(L),s>ur&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function b2(n,e,t){const i=new cn(n,e,t);return i.texture.mapping=H0,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ta(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function F9(n,e,t){const i=new Float32Array(Ms),s=new R(0,1,0);return new _t({name:"SphericalGaussianBlur",defines:{n:Ms,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:m1(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function E2(){return new _t({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:m1(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function T2(){return new _t({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:m1(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function m1(){return`

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
	`}function B9(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===nl||c===il,u=c===br||c===Er;if(l||u){let d=e.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new S2(n)),d=l?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const f=a.image;return l&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new S2(n)),d=l?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function k9(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&vr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function G9(n,e,t,i){const s={},r=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const v=h.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)e.remove(v[m])}h.removeEventListener("dispose",o),delete s[h.id];const f=r.get(h);f&&(e.remove(f),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,t.memory.geometries++),h}function c(d){const h=d.attributes;for(const g in h)e.update(h[g],n.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const v=f[g];for(let m=0,p=v.length;m<p;m++)e.update(v[m],n.ARRAY_BUFFER)}}function l(d){const h=[],f=d.index,g=d.attributes.position;let v=0;if(f!==null){const y=f.array;v=f.version;for(let x=0,b=y.length;x<b;x+=3){const L=y[x+0],A=y[x+1],D=y[x+2];h.push(L,A,A,D,D,L)}}else if(g!==void 0){const y=g.array;v=g.version;for(let x=0,b=y.length/3-1;x<b;x+=3){const L=x+0,A=x+1,D=x+2;h.push(L,A,A,D,D,L)}}else return;const m=new(Nd(h)?kd:Bd)(h,1);m.version=v;const p=r.get(d);p&&e.remove(p),r.set(d,m)}function u(d){const h=r.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function W9(n,e,t){let i;function s(h){i=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function c(h,f){n.drawElements(i,f,r,h*o),t.update(f,i,1)}function l(h,f,g){g!==0&&(n.drawElementsInstanced(i,f,r,h*o,g),t.update(f,i,g))}function u(h,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,h,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,i,1)}function d(h,f,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)l(h[p]/o,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,r,h,0,v,0,g);let p=0;for(let y=0;y<g;y++)p+=f[y];for(let y=0;y<v.length;y++)t.update(p,i,v[y])}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function V9(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function X9(n,e,t){const i=new WeakMap,s=new ct;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==d){let S=function(){I.dispose(),i.delete(a),a.removeEventListener("dispose",S)};var f=S;h!==void 0&&h.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let b=0;g===!0&&(b=1),v===!0&&(b=2),m===!0&&(b=3);let L=a.attributes.position.count*b,A=1;L>e.maxTextureSize&&(A=Math.ceil(L/e.maxTextureSize),L=e.maxTextureSize);const D=new Float32Array(L*A*4*d),I=new zd(D,L,A,d);I.type=$n,I.needsUpdate=!0;const E=b*4;for(let P=0;P<d;P++){const O=p[P],z=y[P],X=x[P],j=L*A*4*P;for(let k=0;k<O.count;k++){const K=k*E;g===!0&&(s.fromBufferAttribute(O,k),D[j+K+0]=s.x,D[j+K+1]=s.y,D[j+K+2]=s.z,D[j+K+3]=0),v===!0&&(s.fromBufferAttribute(z,k),D[j+K+4]=s.x,D[j+K+5]=s.y,D[j+K+6]=s.z,D[j+K+7]=0),m===!0&&(s.fromBufferAttribute(X,k),D[j+K+8]=s.x,D[j+K+9]=s.y,D[j+K+10]=s.z,D[j+K+11]=X.itemSize===4?s.w:1)}}h={count:d,texture:I,size:new be(L,A)},i.set(a,h),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const v=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",v),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function Y9(n,e,t,i){let s=new WeakMap;function r(c){const l=i.render.frame,u=c.geometry,d=e.get(c,u);if(s.get(d)!==l&&(e.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;s.get(h)!==l&&(h.update(),s.set(h,l))}return d}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class jd extends It{constructor(e,t,i,s,r,o,a,c,l,u=gr){if(u!==gr&&u!==wr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===gr&&(i=Ps),i===void 0&&u===wr&&(i=Ar),super(null,s,r,o,a,c,u,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:kt,this.minFilter=c!==void 0?c:kt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const qd=new It,A2=new jd(1,1),Kd=new zd,Zd=new I3,Jd=new Vd,w2=[],D2=[],C2=new Float32Array(16),P2=new Float32Array(9),R2=new Float32Array(4);function Br(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=w2[s];if(r===void 0&&(r=new Float32Array(s),w2[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function Ht(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ut(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function N0(n,e){let t=D2[e];t===void 0&&(t=new Int32Array(e),D2[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function j9(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function q9(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;n.uniform2fv(this.addr,e),Ut(t,e)}}function K9(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;n.uniform3fv(this.addr,e),Ut(t,e)}}function Z9(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;n.uniform4fv(this.addr,e),Ut(t,e)}}function J9(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ht(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(Ht(t,i))return;R2.set(i),n.uniformMatrix2fv(this.addr,!1,R2),Ut(t,i)}}function Q9(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ht(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(Ht(t,i))return;P2.set(i),n.uniformMatrix3fv(this.addr,!1,P2),Ut(t,i)}}function $9(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ht(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(Ht(t,i))return;C2.set(i),n.uniformMatrix4fv(this.addr,!1,C2),Ut(t,i)}}function e4(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function t4(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;n.uniform2iv(this.addr,e),Ut(t,e)}}function n4(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;n.uniform3iv(this.addr,e),Ut(t,e)}}function i4(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;n.uniform4iv(this.addr,e),Ut(t,e)}}function s4(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function r4(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;n.uniform2uiv(this.addr,e),Ut(t,e)}}function o4(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;n.uniform3uiv(this.addr,e),Ut(t,e)}}function a4(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;n.uniform4uiv(this.addr,e),Ut(t,e)}}function c4(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(A2.compareFunction=Ud,r=A2):r=qd,t.setTexture2D(e||r,s)}function l4(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Zd,s)}function u4(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Jd,s)}function d4(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Kd,s)}function h4(n){switch(n){case 5126:return j9;case 35664:return q9;case 35665:return K9;case 35666:return Z9;case 35674:return J9;case 35675:return Q9;case 35676:return $9;case 5124:case 35670:return e4;case 35667:case 35671:return t4;case 35668:case 35672:return n4;case 35669:case 35673:return i4;case 5125:return s4;case 36294:return r4;case 36295:return o4;case 36296:return a4;case 35678:case 36198:case 36298:case 36306:case 35682:return c4;case 35679:case 36299:case 36307:return l4;case 35680:case 36300:case 36308:case 36293:return u4;case 36289:case 36303:case 36311:case 36292:return d4}}function f4(n,e){n.uniform1fv(this.addr,e)}function p4(n,e){const t=Br(e,this.size,2);n.uniform2fv(this.addr,t)}function m4(n,e){const t=Br(e,this.size,3);n.uniform3fv(this.addr,t)}function g4(n,e){const t=Br(e,this.size,4);n.uniform4fv(this.addr,t)}function v4(n,e){const t=Br(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function x4(n,e){const t=Br(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function _4(n,e){const t=Br(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function M4(n,e){n.uniform1iv(this.addr,e)}function y4(n,e){n.uniform2iv(this.addr,e)}function S4(n,e){n.uniform3iv(this.addr,e)}function b4(n,e){n.uniform4iv(this.addr,e)}function E4(n,e){n.uniform1uiv(this.addr,e)}function T4(n,e){n.uniform2uiv(this.addr,e)}function A4(n,e){n.uniform3uiv(this.addr,e)}function w4(n,e){n.uniform4uiv(this.addr,e)}function D4(n,e,t){const i=this.cache,s=e.length,r=N0(t,s);Ht(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||qd,r[o])}function C4(n,e,t){const i=this.cache,s=e.length,r=N0(t,s);Ht(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Zd,r[o])}function P4(n,e,t){const i=this.cache,s=e.length,r=N0(t,s);Ht(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Jd,r[o])}function R4(n,e,t){const i=this.cache,s=e.length,r=N0(t,s);Ht(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Kd,r[o])}function L4(n){switch(n){case 5126:return f4;case 35664:return p4;case 35665:return m4;case 35666:return g4;case 35674:return v4;case 35675:return x4;case 35676:return _4;case 5124:case 35670:return M4;case 35667:case 35671:return y4;case 35668:case 35672:return S4;case 35669:case 35673:return b4;case 5125:return E4;case 36294:return T4;case 36295:return A4;case 36296:return w4;case 35678:case 36198:case 36298:case 36306:case 35682:return D4;case 35679:case 36299:case 36307:return C4;case 35680:case 36300:case 36308:case 36293:return P4;case 36289:case 36303:case 36311:case 36292:return R4}}class I4{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=h4(t.type)}}class H4{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=L4(t.type)}}class U4{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const Sc=/(\w+)(\])?(\[|\.)?/g;function L2(n,e){n.seq.push(e),n.map[e.id]=e}function N4(n,e,t){const i=n.name,s=i.length;for(Sc.lastIndex=0;;){const r=Sc.exec(i),o=Sc.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){L2(t,l===void 0?new I4(a,n,e):new H4(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new U4(a),L2(t,d)),t=d}}}class n0{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);N4(r,o,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function I2(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const O4=37297;let z4=0;function F4(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function B4(n){const e=rt.getPrimaries(rt.workingColorSpace),t=rt.getPrimaries(n);let i;switch(e===t?i="":e===h0&&t===d0?i="LinearDisplayP3ToLinearSRGB":e===d0&&t===h0&&(i="LinearSRGBToLinearDisplayP3"),n){case is:case U0:return[i,"LinearTransferOETF"];case wt:case d1:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function H2(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+F4(n.getShaderSource(e),o)}else return s}function k4(n,e){const t=B4(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function G4(n,e){let t;switch(e){case xd:t="Linear";break;case _d:t="Reinhard";break;case Md:t="Cineon";break;case i1:t="ACESFilmic";break;case yd:t="AgX";break;case Sd:t="Neutral";break;case Qf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Aa=new R;function W4(){rt.getLuminanceCoefficients(Aa);const n=Aa.x.toFixed(4),e=Aa.y.toFixed(4),t=Aa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function V4(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(lo).join(`
`)}function X4(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Y4(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function lo(n){return n!==""}function U2(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function N2(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const j4=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ll(n){return n.replace(j4,K4)}const q4=new Map;function K4(n,e){let t=qe[e];if(t===void 0){const i=q4.get(e);if(i!==void 0)t=qe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ll(t)}const Z4=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function O2(n){return n.replace(Z4,J4)}function J4(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function z2(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function Q4(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===md?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===gd?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===yi&&(e="SHADOWMAP_TYPE_VSM"),e}function $4(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case br:case Er:e="ENVMAP_TYPE_CUBE";break;case H0:e="ENVMAP_TYPE_CUBE_UV";break}return e}function em(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Er:e="ENVMAP_MODE_REFRACTION";break}return e}function tm(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case vd:e="ENVMAP_BLENDING_MULTIPLY";break;case Zf:e="ENVMAP_BLENDING_MIX";break;case Jf:e="ENVMAP_BLENDING_ADD";break}return e}function nm(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function im(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Q4(t),l=$4(t),u=em(t),d=tm(t),h=nm(t),f=V4(t),g=X4(r),v=s.createProgram();let m,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(lo).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(lo).join(`
`),p.length>0&&(p+=`
`)):(m=[z2(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(lo).join(`
`),p=[z2(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ji?"#define TONE_MAPPING":"",t.toneMapping!==Ji?qe.tonemapping_pars_fragment:"",t.toneMapping!==Ji?G4("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,k4("linearToOutputTexel",t.outputColorSpace),W4(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(lo).join(`
`)),o=Ll(o),o=U2(o,t),o=N2(o,t),a=Ll(a),a=U2(a,t),a=N2(a,t),o=O2(o),a=O2(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Q1?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Q1?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=y+m+o,b=y+p+a,L=I2(s,s.VERTEX_SHADER,x),A=I2(s,s.FRAGMENT_SHADER,b);s.attachShader(v,L),s.attachShader(v,A),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function D(P){if(n.debug.checkShaderErrors){const O=s.getProgramInfoLog(v).trim(),z=s.getShaderInfoLog(L).trim(),X=s.getShaderInfoLog(A).trim();let j=!0,k=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,L,A);else{const K=H2(s,L,"vertex"),G=H2(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+K+`
`+G)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(z===""||X==="")&&(k=!1);k&&(P.diagnostics={runnable:j,programLog:O,vertexShader:{log:z,prefix:m},fragmentShader:{log:X,prefix:p}})}s.deleteShader(L),s.deleteShader(A),I=new n0(s,v),E=Y4(s,v)}let I;this.getUniforms=function(){return I===void 0&&D(this),I};let E;this.getAttributes=function(){return E===void 0&&D(this),E};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(v,O4)),S},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=z4++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=L,this.fragmentShader=A,this}let sm=0;class rm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new om(e),t.set(e,i)),i}}class om{constructor(e){this.id=sm++,this.code=e,this.usedTimes=0}}function am(n,e,t,i,s,r,o){const a=new f1,c=new rm,l=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,S,P,O,z){const X=O.fog,j=z.geometry,k=E.isMeshStandardMaterial?O.environment:null,K=(E.isMeshStandardMaterial?t:e).get(E.envMap||k),G=K&&K.mapping===H0?K.image.height:null,ne=g[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const ce=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ue=ce!==void 0?ce.length:0;let Te=0;j.morphAttributes.position!==void 0&&(Te=1),j.morphAttributes.normal!==void 0&&(Te=2),j.morphAttributes.color!==void 0&&(Te=3);let Ue,q,Y,te;if(ne){const Xe=fn[ne];Ue=Xe.vertexShader,q=Xe.fragmentShader}else Ue=E.vertexShader,q=E.fragmentShader,c.update(E),Y=c.getVertexShaderID(E),te=c.getFragmentShaderID(E);const ae=n.getRenderTarget(),xe=z.isInstancedMesh===!0,we=z.isBatchedMesh===!0,Ee=!!E.map,Ve=!!E.matcap,C=!!K,Be=!!E.aoMap,Me=!!E.lightMap,Pe=!!E.bumpMap,he=!!E.normalMap,Ie=!!E.displacementMap,fe=!!E.emissiveMap,ve=!!E.metalnessMap,w=!!E.roughnessMap,M=E.anisotropy>0,B=E.clearcoat>0,Z=E.dispersion>0,J=E.iridescence>0,Q=E.sheen>0,Ae=E.transmission>0,re=M&&!!E.anisotropyMap,de=B&&!!E.clearcoatMap,Le=B&&!!E.clearcoatNormalMap,ie=B&&!!E.clearcoatRoughnessMap,me=J&&!!E.iridescenceMap,_=J&&!!E.iridescenceThicknessMap,Re=Q&&!!E.sheenColorMap,pe=Q&&!!E.sheenRoughnessMap,ze=!!E.specularMap,Fe=!!E.specularColorMap,Je=!!E.specularIntensityMap,H=Ae&&!!E.transmissionMap,se=Ae&&!!E.thicknessMap,ee=!!E.gradientMap,$=!!E.alphaMap,le=E.alphaTest>0,Ne=!!E.alphaHash,Ge=!!E.extensions;let Qe=Ji;E.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Qe=n.toneMapping);const ut={shaderID:ne,shaderType:E.type,shaderName:E.name,vertexShader:Ue,fragmentShader:q,defines:E.defines,customVertexShaderID:Y,customFragmentShaderID:te,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:we,batchingColor:we&&z._colorsTexture!==null,instancing:xe,instancingColor:xe&&z.instanceColor!==null,instancingMorph:xe&&z.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ae===null?n.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:is,alphaToCoverage:!!E.alphaToCoverage,map:Ee,matcap:Ve,envMap:C,envMapMode:C&&K.mapping,envMapCubeUVHeight:G,aoMap:Be,lightMap:Me,bumpMap:Pe,normalMap:he,displacementMap:h&&Ie,emissiveMap:fe,normalMapObjectSpace:he&&E.normalMapType===t3,normalMapTangentSpace:he&&E.normalMapType===Hd,metalnessMap:ve,roughnessMap:w,anisotropy:M,anisotropyMap:re,clearcoat:B,clearcoatMap:de,clearcoatNormalMap:Le,clearcoatRoughnessMap:ie,dispersion:Z,iridescence:J,iridescenceMap:me,iridescenceThicknessMap:_,sheen:Q,sheenColorMap:Re,sheenRoughnessMap:pe,specularMap:ze,specularColorMap:Fe,specularIntensityMap:Je,transmission:Ae,transmissionMap:H,thicknessMap:se,gradientMap:ee,opaque:E.transparent===!1&&E.blending===mr&&E.alphaToCoverage===!1,alphaMap:$,alphaTest:le,alphaHash:Ne,combine:E.combine,mapUv:Ee&&v(E.map.channel),aoMapUv:Be&&v(E.aoMap.channel),lightMapUv:Me&&v(E.lightMap.channel),bumpMapUv:Pe&&v(E.bumpMap.channel),normalMapUv:he&&v(E.normalMap.channel),displacementMapUv:Ie&&v(E.displacementMap.channel),emissiveMapUv:fe&&v(E.emissiveMap.channel),metalnessMapUv:ve&&v(E.metalnessMap.channel),roughnessMapUv:w&&v(E.roughnessMap.channel),anisotropyMapUv:re&&v(E.anisotropyMap.channel),clearcoatMapUv:de&&v(E.clearcoatMap.channel),clearcoatNormalMapUv:Le&&v(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&v(E.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&v(E.iridescenceMap.channel),iridescenceThicknessMapUv:_&&v(E.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&v(E.sheenColorMap.channel),sheenRoughnessMapUv:pe&&v(E.sheenRoughnessMap.channel),specularMapUv:ze&&v(E.specularMap.channel),specularColorMapUv:Fe&&v(E.specularColorMap.channel),specularIntensityMapUv:Je&&v(E.specularIntensityMap.channel),transmissionMapUv:H&&v(E.transmissionMap.channel),thicknessMapUv:se&&v(E.thicknessMap.channel),alphaMapUv:$&&v(E.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(he||M),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!j.attributes.uv&&(Ee||$),fog:!!X,useFog:E.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:z.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:ue,morphTextureStride:Te,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:Qe,decodeVideoTexture:Ee&&E.map.isVideoTexture===!0&&rt.getTransfer(E.map.colorSpace)===mt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Pn,flipSided:E.side===en,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Ge&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ge&&E.extensions.multiDraw===!0||we)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return ut.vertexUv1s=l.has(1),ut.vertexUv2s=l.has(2),ut.vertexUv3s=l.has(3),l.clear(),ut}function p(E){const S=[];if(E.shaderID?S.push(E.shaderID):(S.push(E.customVertexShaderID),S.push(E.customFragmentShaderID)),E.defines!==void 0)for(const P in E.defines)S.push(P),S.push(E.defines[P]);return E.isRawShaderMaterial===!1&&(y(S,E),x(S,E),S.push(n.outputColorSpace)),S.push(E.customProgramCacheKey),S.join()}function y(E,S){E.push(S.precision),E.push(S.outputColorSpace),E.push(S.envMapMode),E.push(S.envMapCubeUVHeight),E.push(S.mapUv),E.push(S.alphaMapUv),E.push(S.lightMapUv),E.push(S.aoMapUv),E.push(S.bumpMapUv),E.push(S.normalMapUv),E.push(S.displacementMapUv),E.push(S.emissiveMapUv),E.push(S.metalnessMapUv),E.push(S.roughnessMapUv),E.push(S.anisotropyMapUv),E.push(S.clearcoatMapUv),E.push(S.clearcoatNormalMapUv),E.push(S.clearcoatRoughnessMapUv),E.push(S.iridescenceMapUv),E.push(S.iridescenceThicknessMapUv),E.push(S.sheenColorMapUv),E.push(S.sheenRoughnessMapUv),E.push(S.specularMapUv),E.push(S.specularColorMapUv),E.push(S.specularIntensityMapUv),E.push(S.transmissionMapUv),E.push(S.thicknessMapUv),E.push(S.combine),E.push(S.fogExp2),E.push(S.sizeAttenuation),E.push(S.morphTargetsCount),E.push(S.morphAttributeCount),E.push(S.numDirLights),E.push(S.numPointLights),E.push(S.numSpotLights),E.push(S.numSpotLightMaps),E.push(S.numHemiLights),E.push(S.numRectAreaLights),E.push(S.numDirLightShadows),E.push(S.numPointLightShadows),E.push(S.numSpotLightShadows),E.push(S.numSpotLightShadowsWithMaps),E.push(S.numLightProbes),E.push(S.shadowMapType),E.push(S.toneMapping),E.push(S.numClippingPlanes),E.push(S.numClipIntersection),E.push(S.depthPacking)}function x(E,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.skinning&&a.enable(4),S.morphTargets&&a.enable(5),S.morphNormals&&a.enable(6),S.morphColors&&a.enable(7),S.premultipliedAlpha&&a.enable(8),S.shadowMapEnabled&&a.enable(9),S.doubleSided&&a.enable(10),S.flipSided&&a.enable(11),S.useDepthPacking&&a.enable(12),S.dithering&&a.enable(13),S.transmission&&a.enable(14),S.sheen&&a.enable(15),S.opaque&&a.enable(16),S.pointsUvs&&a.enable(17),S.decodeVideoTexture&&a.enable(18),S.alphaToCoverage&&a.enable(19),E.push(a.mask)}function b(E){const S=g[E.type];let P;if(S){const O=fn[S];P=Gn.clone(O.uniforms)}else P=E.uniforms;return P}function L(E,S){let P;for(let O=0,z=u.length;O<z;O++){const X=u[O];if(X.cacheKey===S){P=X,++P.usedTimes;break}}return P===void 0&&(P=new im(n,S,E,r),u.push(P)),P}function A(E){if(--E.usedTimes===0){const S=u.indexOf(E);u[S]=u[u.length-1],u.pop(),E.destroy()}}function D(E){c.remove(E)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:b,acquireProgram:L,releaseProgram:A,releaseShaderCache:D,programs:u,dispose:I}}function cm(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function lm(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function F2(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function B2(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(d,h,f,g,v,m){let p=n[e];return p===void 0?(p={id:d.id,object:d,geometry:h,material:f,groupOrder:g,renderOrder:d.renderOrder,z:v,group:m},n[e]=p):(p.id=d.id,p.object=d,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=v,p.group=m),e++,p}function a(d,h,f,g,v,m){const p=o(d,h,f,g,v,m);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):t.push(p)}function c(d,h,f,g,v,m){const p=o(d,h,f,g,v,m);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function l(d,h){t.length>1&&t.sort(d||lm),i.length>1&&i.sort(h||F2),s.length>1&&s.sort(h||F2)}function u(){for(let d=e,h=n.length;d<h;d++){const f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:c,finish:u,sort:l}}function um(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new B2,n.set(i,[o])):s>=r.length?(o=new B2,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function dm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new je};break;case"SpotLight":t={position:new R,direction:new R,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new je,groundColor:new je};break;case"RectAreaLight":t={color:new je,position:new R,halfWidth:new R,halfHeight:new R};break}return n[e.id]=t,t}}}function hm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let fm=0;function pm(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function mm(n){const e=new dm,t=hm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new R);const s=new R,r=new ot,o=new ot;function a(l){let u=0,d=0,h=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,y=0,x=0,b=0,L=0,A=0,D=0;l.sort(pm);for(let E=0,S=l.length;E<S;E++){const P=l[E],O=P.color,z=P.intensity,X=P.distance,j=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=O.r*z,d+=O.g*z,h+=O.b*z;else if(P.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(P.sh.coefficients[k],z);D++}else if(P.isDirectionalLight){const k=e.get(P);if(k.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const K=P.shadow,G=t.get(P);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,i.directionalShadow[f]=G,i.directionalShadowMap[f]=j,i.directionalShadowMatrix[f]=P.shadow.matrix,y++}i.directional[f]=k,f++}else if(P.isSpotLight){const k=e.get(P);k.position.setFromMatrixPosition(P.matrixWorld),k.color.copy(O).multiplyScalar(z),k.distance=X,k.coneCos=Math.cos(P.angle),k.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),k.decay=P.decay,i.spot[v]=k;const K=P.shadow;if(P.map&&(i.spotLightMap[L]=P.map,L++,K.updateMatrices(P),P.castShadow&&A++),i.spotLightMatrix[v]=K.matrix,P.castShadow){const G=t.get(P);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,i.spotShadow[v]=G,i.spotShadowMap[v]=j,b++}v++}else if(P.isRectAreaLight){const k=e.get(P);k.color.copy(O).multiplyScalar(z),k.halfWidth.set(P.width*.5,0,0),k.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=k,m++}else if(P.isPointLight){const k=e.get(P);if(k.color.copy(P.color).multiplyScalar(P.intensity),k.distance=P.distance,k.decay=P.decay,P.castShadow){const K=P.shadow,G=t.get(P);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,G.shadowCameraNear=K.camera.near,G.shadowCameraFar=K.camera.far,i.pointShadow[g]=G,i.pointShadowMap[g]=j,i.pointShadowMatrix[g]=P.shadow.matrix,x++}i.point[g]=k,g++}else if(P.isHemisphereLight){const k=e.get(P);k.skyColor.copy(P.color).multiplyScalar(z),k.groundColor.copy(P.groundColor).multiplyScalar(z),i.hemi[p]=k,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ge.LTC_FLOAT_1,i.rectAreaLTC2=ge.LTC_FLOAT_2):(i.rectAreaLTC1=ge.LTC_HALF_1,i.rectAreaLTC2=ge.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const I=i.hash;(I.directionalLength!==f||I.pointLength!==g||I.spotLength!==v||I.rectAreaLength!==m||I.hemiLength!==p||I.numDirectionalShadows!==y||I.numPointShadows!==x||I.numSpotShadows!==b||I.numSpotMaps!==L||I.numLightProbes!==D)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=b+L-A,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=D,I.directionalLength=f,I.pointLength=g,I.spotLength=v,I.rectAreaLength=m,I.hemiLength=p,I.numDirectionalShadows=y,I.numPointShadows=x,I.numSpotShadows=b,I.numSpotMaps=L,I.numLightProbes=D,i.version=fm++)}function c(l,u){let d=0,h=0,f=0,g=0,v=0;const m=u.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){const x=l[p];if(x.isDirectionalLight){const b=i.directional[d];b.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),d++}else if(x.isSpotLight){const b=i.spot[f];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),f++}else if(x.isRectAreaLight){const b=i.rectArea[g];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(m),o.identity(),r.copy(x.matrixWorld),r.premultiply(m),o.extractRotation(r),b.halfWidth.set(x.width*.5,0,0),b.halfHeight.set(0,x.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const b=i.point[h];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(m),h++}else if(x.isHemisphereLight){const b=i.hemi[v];b.direction.setFromMatrixPosition(x.matrixWorld),b.direction.transformDirection(m),v++}}}return{setup:a,setupView:c,state:i}}function k2(n){const e=new mm(n),t=[],i=[];function s(u){l.camera=u,t.length=0,i.length=0}function r(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function gm(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new k2(n),e.set(s,[a])):r>=o.length?(a=new k2(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}class Qd extends ss{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class vm extends ss{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const xm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_m=`uniform sampler2D shadow_pass;
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
}`;function Mm(n,e,t){let i=new p1;const s=new be,r=new be,o=new ct,a=new Qd({depthPacking:Id}),c=new vm,l={},u=t.maxTextureSize,d={[Ri]:en,[en]:Ri,[Pn]:Pn},h=new _t({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new be},radius:{value:4}},vertexShader:xm,fragmentShader:_m}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new yt;g.setAttribute("position",new Kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Dt(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=md;let p=this.type;this.render=function(A,D,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const E=n.getRenderTarget(),S=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),O=n.state;O.setBlending(si),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const z=p!==yi&&this.type===yi,X=p===yi&&this.type!==yi;for(let j=0,k=A.length;j<k;j++){const K=A[j],G=K.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const ne=G.getFrameExtents();if(s.multiply(ne),r.copy(G.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ne.x),s.x=r.x*ne.x,G.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ne.y),s.y=r.y*ne.y,G.mapSize.y=r.y)),G.map===null||z===!0||X===!0){const ue=this.type!==yi?{minFilter:kt,magFilter:kt}:{};G.map!==null&&G.map.dispose(),G.map=new cn(s.x,s.y,ue),G.map.texture.name=K.name+".shadowMap",G.camera.updateProjectionMatrix()}n.setRenderTarget(G.map),n.clear();const ce=G.getViewportCount();for(let ue=0;ue<ce;ue++){const Te=G.getViewport(ue);o.set(r.x*Te.x,r.y*Te.y,r.x*Te.z,r.y*Te.w),O.viewport(o),G.updateMatrices(K,ue),i=G.getFrustum(),b(D,I,G.camera,K,this.type)}G.isPointLightShadow!==!0&&this.type===yi&&y(G,I),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(E,S,P)};function y(A,D){const I=e.update(v);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new cn(s.x,s.y)),h.uniforms.shadow_pass.value=A.map.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(D,null,I,h,v,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(D,null,I,f,v,null)}function x(A,D,I,E){let S=null;const P=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)S=P;else if(S=I.isPointLight===!0?c:a,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0){const O=S.uuid,z=D.uuid;let X=l[O];X===void 0&&(X={},l[O]=X);let j=X[z];j===void 0&&(j=S.clone(),X[z]=j,D.addEventListener("dispose",L)),S=j}if(S.visible=D.visible,S.wireframe=D.wireframe,E===yi?S.side=D.shadowSide!==null?D.shadowSide:D.side:S.side=D.shadowSide!==null?D.shadowSide:d[D.side],S.alphaMap=D.alphaMap,S.alphaTest=D.alphaTest,S.map=D.map,S.clipShadows=D.clipShadows,S.clippingPlanes=D.clippingPlanes,S.clipIntersection=D.clipIntersection,S.displacementMap=D.displacementMap,S.displacementScale=D.displacementScale,S.displacementBias=D.displacementBias,S.wireframeLinewidth=D.wireframeLinewidth,S.linewidth=D.linewidth,I.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const O=n.properties.get(S);O.light=I}return S}function b(A,D,I,E,S){if(A.visible===!1)return;if(A.layers.test(D.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&S===yi)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);const z=e.update(A),X=A.material;if(Array.isArray(X)){const j=z.groups;for(let k=0,K=j.length;k<K;k++){const G=j[k],ne=X[G.materialIndex];if(ne&&ne.visible){const ce=x(A,ne,E,S);A.onBeforeShadow(n,A,D,I,z,ce,G),n.renderBufferDirect(I,null,z,ce,A,G),A.onAfterShadow(n,A,D,I,z,ce,G)}}}else if(X.visible){const j=x(A,X,E,S);A.onBeforeShadow(n,A,D,I,z,j,null),n.renderBufferDirect(I,null,z,j,A,null),A.onAfterShadow(n,A,D,I,z,j,null)}}const O=A.children;for(let z=0,X=O.length;z<X;z++)b(O[z],D,I,E,S)}function L(A){A.target.removeEventListener("dispose",L);for(const I in l){const E=l[I],S=A.target.uuid;S in E&&(E[S].dispose(),delete E[S])}}}function ym(n){function e(){let H=!1;const se=new ct;let ee=null;const $=new ct(0,0,0,0);return{setMask:function(le){ee!==le&&!H&&(n.colorMask(le,le,le,le),ee=le)},setLocked:function(le){H=le},setClear:function(le,Ne,Ge,Qe,ut){ut===!0&&(le*=Qe,Ne*=Qe,Ge*=Qe),se.set(le,Ne,Ge,Qe),$.equals(se)===!1&&(n.clearColor(le,Ne,Ge,Qe),$.copy(se))},reset:function(){H=!1,ee=null,$.set(-1,0,0,0)}}}function t(){let H=!1,se=null,ee=null,$=null;return{setTest:function(le){le?te(n.DEPTH_TEST):ae(n.DEPTH_TEST)},setMask:function(le){se!==le&&!H&&(n.depthMask(le),se=le)},setFunc:function(le){if(ee!==le){switch(le){case Wf:n.depthFunc(n.NEVER);break;case Vf:n.depthFunc(n.ALWAYS);break;case Xf:n.depthFunc(n.LESS);break;case l0:n.depthFunc(n.LEQUAL);break;case Yf:n.depthFunc(n.EQUAL);break;case jf:n.depthFunc(n.GEQUAL);break;case qf:n.depthFunc(n.GREATER);break;case Kf:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ee=le}},setLocked:function(le){H=le},setClear:function(le){$!==le&&(n.clearDepth(le),$=le)},reset:function(){H=!1,se=null,ee=null,$=null}}}function i(){let H=!1,se=null,ee=null,$=null,le=null,Ne=null,Ge=null,Qe=null,ut=null;return{setTest:function(Xe){H||(Xe?te(n.STENCIL_TEST):ae(n.STENCIL_TEST))},setMask:function(Xe){se!==Xe&&!H&&(n.stencilMask(Xe),se=Xe)},setFunc:function(Xe,Mt,ht){(ee!==Xe||$!==Mt||le!==ht)&&(n.stencilFunc(Xe,Mt,ht),ee=Xe,$=Mt,le=ht)},setOp:function(Xe,Mt,ht){(Ne!==Xe||Ge!==Mt||Qe!==ht)&&(n.stencilOp(Xe,Mt,ht),Ne=Xe,Ge=Mt,Qe=ht)},setLocked:function(Xe){H=Xe},setClear:function(Xe){ut!==Xe&&(n.clearStencil(Xe),ut=Xe)},reset:function(){H=!1,se=null,ee=null,$=null,le=null,Ne=null,Ge=null,Qe=null,ut=null}}}const s=new e,r=new t,o=new i,a=new WeakMap,c=new WeakMap;let l={},u={},d=new WeakMap,h=[],f=null,g=!1,v=null,m=null,p=null,y=null,x=null,b=null,L=null,A=new je(0,0,0),D=0,I=!1,E=null,S=null,P=null,O=null,z=null;const X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,k=0;const K=n.getParameter(n.VERSION);K.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(K)[1]),j=k>=1):K.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),j=k>=2);let G=null,ne={};const ce=n.getParameter(n.SCISSOR_BOX),ue=n.getParameter(n.VIEWPORT),Te=new ct().fromArray(ce),Ue=new ct().fromArray(ue);function q(H,se,ee,$){const le=new Uint8Array(4),Ne=n.createTexture();n.bindTexture(H,Ne),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ge=0;Ge<ee;Ge++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(se,0,n.RGBA,1,1,$,0,n.RGBA,n.UNSIGNED_BYTE,le):n.texImage2D(se+Ge,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,le);return Ne}const Y={};Y[n.TEXTURE_2D]=q(n.TEXTURE_2D,n.TEXTURE_2D,1),Y[n.TEXTURE_CUBE_MAP]=q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[n.TEXTURE_2D_ARRAY]=q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Y[n.TEXTURE_3D]=q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),te(n.DEPTH_TEST),r.setFunc(l0),Pe(!1),he(q1),te(n.CULL_FACE),Be(si);function te(H){l[H]!==!0&&(n.enable(H),l[H]=!0)}function ae(H){l[H]!==!1&&(n.disable(H),l[H]=!1)}function xe(H,se){return u[H]!==se?(n.bindFramebuffer(H,se),u[H]=se,H===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=se),H===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=se),!0):!1}function we(H,se){let ee=h,$=!1;if(H){ee=d.get(se),ee===void 0&&(ee=[],d.set(se,ee));const le=H.textures;if(ee.length!==le.length||ee[0]!==n.COLOR_ATTACHMENT0){for(let Ne=0,Ge=le.length;Ne<Ge;Ne++)ee[Ne]=n.COLOR_ATTACHMENT0+Ne;ee.length=le.length,$=!0}}else ee[0]!==n.BACK&&(ee[0]=n.BACK,$=!0);$&&n.drawBuffers(ee)}function Ee(H){return f!==H?(n.useProgram(H),f=H,!0):!1}const Ve={[_s]:n.FUNC_ADD,[Af]:n.FUNC_SUBTRACT,[wf]:n.FUNC_REVERSE_SUBTRACT};Ve[Df]=n.MIN,Ve[Cf]=n.MAX;const C={[Pf]:n.ZERO,[Rf]:n.ONE,[Lf]:n.SRC_COLOR,[el]:n.SRC_ALPHA,[zf]:n.SRC_ALPHA_SATURATE,[Nf]:n.DST_COLOR,[Hf]:n.DST_ALPHA,[If]:n.ONE_MINUS_SRC_COLOR,[tl]:n.ONE_MINUS_SRC_ALPHA,[Of]:n.ONE_MINUS_DST_COLOR,[Uf]:n.ONE_MINUS_DST_ALPHA,[Ff]:n.CONSTANT_COLOR,[Bf]:n.ONE_MINUS_CONSTANT_COLOR,[kf]:n.CONSTANT_ALPHA,[Gf]:n.ONE_MINUS_CONSTANT_ALPHA};function Be(H,se,ee,$,le,Ne,Ge,Qe,ut,Xe){if(H===si){g===!0&&(ae(n.BLEND),g=!1);return}if(g===!1&&(te(n.BLEND),g=!0),H!==Tf){if(H!==v||Xe!==I){if((m!==_s||x!==_s)&&(n.blendEquation(n.FUNC_ADD),m=_s,x=_s),Xe)switch(H){case mr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ai:n.blendFunc(n.ONE,n.ONE);break;case K1:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Z1:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case mr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ai:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case K1:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Z1:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}p=null,y=null,b=null,L=null,A.set(0,0,0),D=0,v=H,I=Xe}return}le=le||se,Ne=Ne||ee,Ge=Ge||$,(se!==m||le!==x)&&(n.blendEquationSeparate(Ve[se],Ve[le]),m=se,x=le),(ee!==p||$!==y||Ne!==b||Ge!==L)&&(n.blendFuncSeparate(C[ee],C[$],C[Ne],C[Ge]),p=ee,y=$,b=Ne,L=Ge),(Qe.equals(A)===!1||ut!==D)&&(n.blendColor(Qe.r,Qe.g,Qe.b,ut),A.copy(Qe),D=ut),v=H,I=!1}function Me(H,se){H.side===Pn?ae(n.CULL_FACE):te(n.CULL_FACE);let ee=H.side===en;se&&(ee=!ee),Pe(ee),H.blending===mr&&H.transparent===!1?Be(si):Be(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),r.setFunc(H.depthFunc),r.setTest(H.depthTest),r.setMask(H.depthWrite),s.setMask(H.colorWrite);const $=H.stencilWrite;o.setTest($),$&&(o.setMask(H.stencilWriteMask),o.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),o.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),fe(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?te(n.SAMPLE_ALPHA_TO_COVERAGE):ae(n.SAMPLE_ALPHA_TO_COVERAGE)}function Pe(H){E!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),E=H)}function he(H){H!==bf?(te(n.CULL_FACE),H!==S&&(H===q1?n.cullFace(n.BACK):H===Ef?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ae(n.CULL_FACE),S=H}function Ie(H){H!==P&&(j&&n.lineWidth(H),P=H)}function fe(H,se,ee){H?(te(n.POLYGON_OFFSET_FILL),(O!==se||z!==ee)&&(n.polygonOffset(se,ee),O=se,z=ee)):ae(n.POLYGON_OFFSET_FILL)}function ve(H){H?te(n.SCISSOR_TEST):ae(n.SCISSOR_TEST)}function w(H){H===void 0&&(H=n.TEXTURE0+X-1),G!==H&&(n.activeTexture(H),G=H)}function M(H,se,ee){ee===void 0&&(G===null?ee=n.TEXTURE0+X-1:ee=G);let $=ne[ee];$===void 0&&($={type:void 0,texture:void 0},ne[ee]=$),($.type!==H||$.texture!==se)&&(G!==ee&&(n.activeTexture(ee),G=ee),n.bindTexture(H,se||Y[H]),$.type=H,$.texture=se)}function B(){const H=ne[G];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function Z(){try{n.compressedTexImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function J(){try{n.compressedTexImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Q(){try{n.texSubImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ae(){try{n.texSubImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function re(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function de(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Le(){try{n.texStorage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ie(){try{n.texStorage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function me(){try{n.texImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function _(){try{n.texImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Re(H){Te.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),Te.copy(H))}function pe(H){Ue.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),Ue.copy(H))}function ze(H,se){let ee=c.get(se);ee===void 0&&(ee=new WeakMap,c.set(se,ee));let $=ee.get(H);$===void 0&&($=n.getUniformBlockIndex(se,H.name),ee.set(H,$))}function Fe(H,se){const $=c.get(se).get(H);a.get(se)!==$&&(n.uniformBlockBinding(se,$,H.__bindingPointIndex),a.set(se,$))}function Je(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),l={},G=null,ne={},u={},d=new WeakMap,h=[],f=null,g=!1,v=null,m=null,p=null,y=null,x=null,b=null,L=null,A=new je(0,0,0),D=0,I=!1,E=null,S=null,P=null,O=null,z=null,Te.set(0,0,n.canvas.width,n.canvas.height),Ue.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:te,disable:ae,bindFramebuffer:xe,drawBuffers:we,useProgram:Ee,setBlending:Be,setMaterial:Me,setFlipSided:Pe,setCullFace:he,setLineWidth:Ie,setPolygonOffset:fe,setScissorTest:ve,activeTexture:w,bindTexture:M,unbindTexture:B,compressedTexImage2D:Z,compressedTexImage3D:J,texImage2D:me,texImage3D:_,updateUBOMapping:ze,uniformBlockBinding:Fe,texStorage2D:Le,texStorage3D:ie,texSubImage2D:Q,texSubImage3D:Ae,compressedTexSubImage2D:re,compressedTexSubImage3D:de,scissor:Re,viewport:pe,reset:Je}}function G2(n,e,t,i){const s=Sm(i);switch(t){case wd:return n*e;case Cd:return n*e;case Pd:return n*e*2;case a1:return n*e/s.components*s.byteLength;case c1:return n*e/s.components*s.byteLength;case Rd:return n*e*2/s.components*s.byteLength;case l1:return n*e*2/s.components*s.byteLength;case Dd:return n*e*3/s.components*s.byteLength;case Bn:return n*e*4/s.components*s.byteLength;case u1:return n*e*4/s.components*s.byteLength;case Ja:case Qa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case $a:case e0:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ol:case cl:return Math.max(n,16)*Math.max(e,8)/4;case rl:case al:return Math.max(n,8)*Math.max(e,8)/2;case ll:case ul:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case dl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case hl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case fl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case pl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ml:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case gl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case vl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case xl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case _l:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ml:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case yl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Sl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case bl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case El:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Tl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case t0:case Al:case wl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Ld:case Dl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Cl:case Pl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Sm(n){switch(n){case Li:case Ed:return{byteLength:1,components:1};case Ao:case Td:case bn:return{byteLength:2,components:1};case r1:case o1:return{byteLength:2,components:4};case Ps:case s1:case $n:return{byteLength:4,components:1};case Ad:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function bm(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new be,u=new WeakMap;let d;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,M){return f?new OffscreenCanvas(w,M):Do("canvas")}function v(w,M,B){let Z=1;const J=ve(w);if((J.width>B||J.height>B)&&(Z=B/Math.max(J.width,J.height)),Z<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const Q=Math.floor(Z*J.width),Ae=Math.floor(Z*J.height);d===void 0&&(d=g(Q,Ae));const re=M?g(Q,Ae):d;return re.width=Q,re.height=Ae,re.getContext("2d").drawImage(w,0,0,Q,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+Q+"x"+Ae+")."),re}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),w;return w}function m(w){return w.generateMipmaps&&w.minFilter!==kt&&w.minFilter!==Rn}function p(w){n.generateMipmap(w)}function y(w,M,B,Z,J=!1){if(w!==null){if(n[w]!==void 0)return n[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let Q=M;if(M===n.RED&&(B===n.FLOAT&&(Q=n.R32F),B===n.HALF_FLOAT&&(Q=n.R16F),B===n.UNSIGNED_BYTE&&(Q=n.R8)),M===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(Q=n.R8UI),B===n.UNSIGNED_SHORT&&(Q=n.R16UI),B===n.UNSIGNED_INT&&(Q=n.R32UI),B===n.BYTE&&(Q=n.R8I),B===n.SHORT&&(Q=n.R16I),B===n.INT&&(Q=n.R32I)),M===n.RG&&(B===n.FLOAT&&(Q=n.RG32F),B===n.HALF_FLOAT&&(Q=n.RG16F),B===n.UNSIGNED_BYTE&&(Q=n.RG8)),M===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(Q=n.RG8UI),B===n.UNSIGNED_SHORT&&(Q=n.RG16UI),B===n.UNSIGNED_INT&&(Q=n.RG32UI),B===n.BYTE&&(Q=n.RG8I),B===n.SHORT&&(Q=n.RG16I),B===n.INT&&(Q=n.RG32I)),M===n.RGB&&B===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),M===n.RGBA){const Ae=J?u0:rt.getTransfer(Z);B===n.FLOAT&&(Q=n.RGBA32F),B===n.HALF_FLOAT&&(Q=n.RGBA16F),B===n.UNSIGNED_BYTE&&(Q=Ae===mt?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function x(w,M){let B;return w?M===null||M===Ps||M===Ar?B=n.DEPTH24_STENCIL8:M===$n?B=n.DEPTH32F_STENCIL8:M===Ao&&(B=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Ps||M===Ar?B=n.DEPTH_COMPONENT24:M===$n?B=n.DEPTH_COMPONENT32F:M===Ao&&(B=n.DEPTH_COMPONENT16),B}function b(w,M){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==kt&&w.minFilter!==Rn?Math.log2(Math.max(M.width,M.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?M.mipmaps.length:1}function L(w){const M=w.target;M.removeEventListener("dispose",L),D(M),M.isVideoTexture&&u.delete(M)}function A(w){const M=w.target;M.removeEventListener("dispose",A),E(M)}function D(w){const M=i.get(w);if(M.__webglInit===void 0)return;const B=w.source,Z=h.get(B);if(Z){const J=Z[M.__cacheKey];J.usedTimes--,J.usedTimes===0&&I(w),Object.keys(Z).length===0&&h.delete(B)}i.remove(w)}function I(w){const M=i.get(w);n.deleteTexture(M.__webglTexture);const B=w.source,Z=h.get(B);delete Z[M.__cacheKey],o.memory.textures--}function E(w){const M=i.get(w);if(w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(M.__webglFramebuffer[Z]))for(let J=0;J<M.__webglFramebuffer[Z].length;J++)n.deleteFramebuffer(M.__webglFramebuffer[Z][J]);else n.deleteFramebuffer(M.__webglFramebuffer[Z]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[Z])}else{if(Array.isArray(M.__webglFramebuffer))for(let Z=0;Z<M.__webglFramebuffer.length;Z++)n.deleteFramebuffer(M.__webglFramebuffer[Z]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Z=0;Z<M.__webglColorRenderbuffer.length;Z++)M.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[Z]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const B=w.textures;for(let Z=0,J=B.length;Z<J;Z++){const Q=i.get(B[Z]);Q.__webglTexture&&(n.deleteTexture(Q.__webglTexture),o.memory.textures--),i.remove(B[Z])}i.remove(w)}let S=0;function P(){S=0}function O(){const w=S;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),S+=1,w}function z(w){const M=[];return M.push(w.wrapS),M.push(w.wrapT),M.push(w.wrapR||0),M.push(w.magFilter),M.push(w.minFilter),M.push(w.anisotropy),M.push(w.internalFormat),M.push(w.format),M.push(w.type),M.push(w.generateMipmaps),M.push(w.premultiplyAlpha),M.push(w.flipY),M.push(w.unpackAlignment),M.push(w.colorSpace),M.join()}function X(w,M){const B=i.get(w);if(w.isVideoTexture&&Ie(w),w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){const Z=w.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ue(B,w,M);return}}t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+M)}function j(w,M){const B=i.get(w);if(w.version>0&&B.__version!==w.version){Ue(B,w,M);return}t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+M)}function k(w,M){const B=i.get(w);if(w.version>0&&B.__version!==w.version){Ue(B,w,M);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+M)}function K(w,M){const B=i.get(w);if(w.version>0&&B.__version!==w.version){q(B,w,M);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+M)}const G={[Tr]:n.REPEAT,[Ss]:n.CLAMP_TO_EDGE,[sl]:n.MIRRORED_REPEAT},ne={[kt]:n.NEAREST,[$f]:n.NEAREST_MIPMAP_NEAREST,[ra]:n.NEAREST_MIPMAP_LINEAR,[Rn]:n.LINEAR,[Q0]:n.LINEAR_MIPMAP_NEAREST,[bs]:n.LINEAR_MIPMAP_LINEAR},ce={[n3]:n.NEVER,[c3]:n.ALWAYS,[i3]:n.LESS,[Ud]:n.LEQUAL,[s3]:n.EQUAL,[a3]:n.GEQUAL,[r3]:n.GREATER,[o3]:n.NOTEQUAL};function ue(w,M){if(M.type===$n&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Rn||M.magFilter===Q0||M.magFilter===ra||M.magFilter===bs||M.minFilter===Rn||M.minFilter===Q0||M.minFilter===ra||M.minFilter===bs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,G[M.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,G[M.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,G[M.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,ne[M.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,ne[M.minFilter]),M.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,ce[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===kt||M.minFilter!==ra&&M.minFilter!==bs||M.type===$n&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function Te(w,M){let B=!1;w.__webglInit===void 0&&(w.__webglInit=!0,M.addEventListener("dispose",L));const Z=M.source;let J=h.get(Z);J===void 0&&(J={},h.set(Z,J));const Q=z(M);if(Q!==w.__cacheKey){J[Q]===void 0&&(J[Q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,B=!0),J[Q].usedTimes++;const Ae=J[w.__cacheKey];Ae!==void 0&&(J[w.__cacheKey].usedTimes--,Ae.usedTimes===0&&I(M)),w.__cacheKey=Q,w.__webglTexture=J[Q].texture}return B}function Ue(w,M,B){let Z=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Z=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Z=n.TEXTURE_3D);const J=Te(w,M),Q=M.source;t.bindTexture(Z,w.__webglTexture,n.TEXTURE0+B);const Ae=i.get(Q);if(Q.version!==Ae.__version||J===!0){t.activeTexture(n.TEXTURE0+B);const re=rt.getPrimaries(rt.workingColorSpace),de=M.colorSpace===Jn?null:rt.getPrimaries(M.colorSpace),Le=M.colorSpace===Jn||re===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);let ie=v(M.image,!1,s.maxTextureSize);ie=fe(M,ie);const me=r.convert(M.format,M.colorSpace),_=r.convert(M.type);let Re=y(M.internalFormat,me,_,M.colorSpace,M.isVideoTexture);ue(Z,M);let pe;const ze=M.mipmaps,Fe=M.isVideoTexture!==!0,Je=Ae.__version===void 0||J===!0,H=Q.dataReady,se=b(M,ie);if(M.isDepthTexture)Re=x(M.format===wr,M.type),Je&&(Fe?t.texStorage2D(n.TEXTURE_2D,1,Re,ie.width,ie.height):t.texImage2D(n.TEXTURE_2D,0,Re,ie.width,ie.height,0,me,_,null));else if(M.isDataTexture)if(ze.length>0){Fe&&Je&&t.texStorage2D(n.TEXTURE_2D,se,Re,ze[0].width,ze[0].height);for(let ee=0,$=ze.length;ee<$;ee++)pe=ze[ee],Fe?H&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,pe.width,pe.height,me,_,pe.data):t.texImage2D(n.TEXTURE_2D,ee,Re,pe.width,pe.height,0,me,_,pe.data);M.generateMipmaps=!1}else Fe?(Je&&t.texStorage2D(n.TEXTURE_2D,se,Re,ie.width,ie.height),H&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ie.width,ie.height,me,_,ie.data)):t.texImage2D(n.TEXTURE_2D,0,Re,ie.width,ie.height,0,me,_,ie.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Fe&&Je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,se,Re,ze[0].width,ze[0].height,ie.depth);for(let ee=0,$=ze.length;ee<$;ee++)if(pe=ze[ee],M.format!==Bn)if(me!==null)if(Fe){if(H)if(M.layerUpdates.size>0){const le=G2(pe.width,pe.height,M.format,M.type);for(const Ne of M.layerUpdates){const Ge=pe.data.subarray(Ne*le/pe.data.BYTES_PER_ELEMENT,(Ne+1)*le/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,Ne,pe.width,pe.height,1,me,Ge,0,0)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,pe.width,pe.height,ie.depth,me,pe.data,0,0)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,Re,pe.width,pe.height,ie.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?H&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,pe.width,pe.height,ie.depth,me,_,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,Re,pe.width,pe.height,ie.depth,0,me,_,pe.data)}else{Fe&&Je&&t.texStorage2D(n.TEXTURE_2D,se,Re,ze[0].width,ze[0].height);for(let ee=0,$=ze.length;ee<$;ee++)pe=ze[ee],M.format!==Bn?me!==null?Fe?H&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,pe.width,pe.height,me,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,Re,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?H&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,pe.width,pe.height,me,_,pe.data):t.texImage2D(n.TEXTURE_2D,ee,Re,pe.width,pe.height,0,me,_,pe.data)}else if(M.isDataArrayTexture)if(Fe){if(Je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,se,Re,ie.width,ie.height,ie.depth),H)if(M.layerUpdates.size>0){const ee=G2(ie.width,ie.height,M.format,M.type);for(const $ of M.layerUpdates){const le=ie.data.subarray($*ee/ie.data.BYTES_PER_ELEMENT,($+1)*ee/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,$,ie.width,ie.height,1,me,_,le)}M.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,me,_,ie.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Re,ie.width,ie.height,ie.depth,0,me,_,ie.data);else if(M.isData3DTexture)Fe?(Je&&t.texStorage3D(n.TEXTURE_3D,se,Re,ie.width,ie.height,ie.depth),H&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,me,_,ie.data)):t.texImage3D(n.TEXTURE_3D,0,Re,ie.width,ie.height,ie.depth,0,me,_,ie.data);else if(M.isFramebufferTexture){if(Je)if(Fe)t.texStorage2D(n.TEXTURE_2D,se,Re,ie.width,ie.height);else{let ee=ie.width,$=ie.height;for(let le=0;le<se;le++)t.texImage2D(n.TEXTURE_2D,le,Re,ee,$,0,me,_,null),ee>>=1,$>>=1}}else if(ze.length>0){if(Fe&&Je){const ee=ve(ze[0]);t.texStorage2D(n.TEXTURE_2D,se,Re,ee.width,ee.height)}for(let ee=0,$=ze.length;ee<$;ee++)pe=ze[ee],Fe?H&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,me,_,pe):t.texImage2D(n.TEXTURE_2D,ee,Re,me,_,pe);M.generateMipmaps=!1}else if(Fe){if(Je){const ee=ve(ie);t.texStorage2D(n.TEXTURE_2D,se,Re,ee.width,ee.height)}H&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,me,_,ie)}else t.texImage2D(n.TEXTURE_2D,0,Re,me,_,ie);m(M)&&p(Z),Ae.__version=Q.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function q(w,M,B){if(M.image.length!==6)return;const Z=Te(w,M),J=M.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+B);const Q=i.get(J);if(J.version!==Q.__version||Z===!0){t.activeTexture(n.TEXTURE0+B);const Ae=rt.getPrimaries(rt.workingColorSpace),re=M.colorSpace===Jn?null:rt.getPrimaries(M.colorSpace),de=M.colorSpace===Jn||Ae===re?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const Le=M.isCompressedTexture||M.image[0].isCompressedTexture,ie=M.image[0]&&M.image[0].isDataTexture,me=[];for(let $=0;$<6;$++)!Le&&!ie?me[$]=v(M.image[$],!0,s.maxCubemapSize):me[$]=ie?M.image[$].image:M.image[$],me[$]=fe(M,me[$]);const _=me[0],Re=r.convert(M.format,M.colorSpace),pe=r.convert(M.type),ze=y(M.internalFormat,Re,pe,M.colorSpace),Fe=M.isVideoTexture!==!0,Je=Q.__version===void 0||Z===!0,H=J.dataReady;let se=b(M,_);ue(n.TEXTURE_CUBE_MAP,M);let ee;if(Le){Fe&&Je&&t.texStorage2D(n.TEXTURE_CUBE_MAP,se,ze,_.width,_.height);for(let $=0;$<6;$++){ee=me[$].mipmaps;for(let le=0;le<ee.length;le++){const Ne=ee[le];M.format!==Bn?Re!==null?Fe?H&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le,0,0,Ne.width,Ne.height,Re,Ne.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le,ze,Ne.width,Ne.height,0,Ne.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le,0,0,Ne.width,Ne.height,Re,pe,Ne.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le,ze,Ne.width,Ne.height,0,Re,pe,Ne.data)}}}else{if(ee=M.mipmaps,Fe&&Je){ee.length>0&&se++;const $=ve(me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,se,ze,$.width,$.height)}for(let $=0;$<6;$++)if(ie){Fe?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,me[$].width,me[$].height,Re,pe,me[$].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,ze,me[$].width,me[$].height,0,Re,pe,me[$].data);for(let le=0;le<ee.length;le++){const Ge=ee[le].image[$].image;Fe?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le+1,0,0,Ge.width,Ge.height,Re,pe,Ge.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le+1,ze,Ge.width,Ge.height,0,Re,pe,Ge.data)}}else{Fe?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Re,pe,me[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,ze,Re,pe,me[$]);for(let le=0;le<ee.length;le++){const Ne=ee[le];Fe?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le+1,0,0,Re,pe,Ne.image[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le+1,ze,Re,pe,Ne.image[$])}}}m(M)&&p(n.TEXTURE_CUBE_MAP),Q.__version=J.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function Y(w,M,B,Z,J,Q){const Ae=r.convert(B.format,B.colorSpace),re=r.convert(B.type),de=y(B.internalFormat,Ae,re,B.colorSpace);if(!i.get(M).__hasExternalTextures){const ie=Math.max(1,M.width>>Q),me=Math.max(1,M.height>>Q);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,Q,de,ie,me,M.depth,0,Ae,re,null):t.texImage2D(J,Q,de,ie,me,0,Ae,re,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),he(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,J,i.get(B).__webglTexture,0,Pe(M)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Z,J,i.get(B).__webglTexture,Q),t.bindFramebuffer(n.FRAMEBUFFER,null)}function te(w,M,B){if(n.bindRenderbuffer(n.RENDERBUFFER,w),M.depthBuffer){const Z=M.depthTexture,J=Z&&Z.isDepthTexture?Z.type:null,Q=x(M.stencilBuffer,J),Ae=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=Pe(M);he(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,re,Q,M.width,M.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,re,Q,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,Q,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ae,n.RENDERBUFFER,w)}else{const Z=M.textures;for(let J=0;J<Z.length;J++){const Q=Z[J],Ae=r.convert(Q.format,Q.colorSpace),re=r.convert(Q.type),de=y(Q.internalFormat,Ae,re,Q.colorSpace),Le=Pe(M);B&&he(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Le,de,M.width,M.height):he(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Le,de,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,de,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ae(w,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),X(M.depthTexture,0);const Z=i.get(M.depthTexture).__webglTexture,J=Pe(M);if(M.depthTexture.format===gr)he(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0);else if(M.depthTexture.format===wr)he(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function xe(w){const M=i.get(w),B=w.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==w.depthTexture){const Z=w.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Z){const J=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Z.removeEventListener("dispose",J)};Z.addEventListener("dispose",J),M.__depthDisposeCallback=J}M.__boundDepthTexture=Z}if(w.depthTexture&&!M.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");ae(M.__webglFramebuffer,w)}else if(B){M.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[Z]),M.__webglDepthbuffer[Z]===void 0)M.__webglDepthbuffer[Z]=n.createRenderbuffer(),te(M.__webglDepthbuffer[Z],w,!1);else{const J=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=M.__webglDepthbuffer[Z];n.bindRenderbuffer(n.RENDERBUFFER,Q),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,Q)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),te(M.__webglDepthbuffer,w,!1);else{const Z=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,J)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function we(w,M,B){const Z=i.get(w);M!==void 0&&Y(Z.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&xe(w)}function Ee(w){const M=w.texture,B=i.get(w),Z=i.get(M);w.addEventListener("dispose",A);const J=w.textures,Q=w.isWebGLCubeRenderTarget===!0,Ae=J.length>1;if(Ae||(Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture()),Z.__version=M.version,o.memory.textures++),Q){B.__webglFramebuffer=[];for(let re=0;re<6;re++)if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer[re]=[];for(let de=0;de<M.mipmaps.length;de++)B.__webglFramebuffer[re][de]=n.createFramebuffer()}else B.__webglFramebuffer[re]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer=[];for(let re=0;re<M.mipmaps.length;re++)B.__webglFramebuffer[re]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(Ae)for(let re=0,de=J.length;re<de;re++){const Le=i.get(J[re]);Le.__webglTexture===void 0&&(Le.__webglTexture=n.createTexture(),o.memory.textures++)}if(w.samples>0&&he(w)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let re=0;re<J.length;re++){const de=J[re];B.__webglColorRenderbuffer[re]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[re]);const Le=r.convert(de.format,de.colorSpace),ie=r.convert(de.type),me=y(de.internalFormat,Le,ie,de.colorSpace,w.isXRRenderTarget===!0),_=Pe(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,_,me,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,B.__webglColorRenderbuffer[re])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),te(B.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Q){t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),ue(n.TEXTURE_CUBE_MAP,M);for(let re=0;re<6;re++)if(M.mipmaps&&M.mipmaps.length>0)for(let de=0;de<M.mipmaps.length;de++)Y(B.__webglFramebuffer[re][de],w,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,de);else Y(B.__webglFramebuffer[re],w,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);m(M)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let re=0,de=J.length;re<de;re++){const Le=J[re],ie=i.get(Le);t.bindTexture(n.TEXTURE_2D,ie.__webglTexture),ue(n.TEXTURE_2D,Le),Y(B.__webglFramebuffer,w,Le,n.COLOR_ATTACHMENT0+re,n.TEXTURE_2D,0),m(Le)&&p(n.TEXTURE_2D)}t.unbindTexture()}else{let re=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(re=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(re,Z.__webglTexture),ue(re,M),M.mipmaps&&M.mipmaps.length>0)for(let de=0;de<M.mipmaps.length;de++)Y(B.__webglFramebuffer[de],w,M,n.COLOR_ATTACHMENT0,re,de);else Y(B.__webglFramebuffer,w,M,n.COLOR_ATTACHMENT0,re,0);m(M)&&p(re),t.unbindTexture()}w.depthBuffer&&xe(w)}function Ve(w){const M=w.textures;for(let B=0,Z=M.length;B<Z;B++){const J=M[B];if(m(J)){const Q=w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,Ae=i.get(J).__webglTexture;t.bindTexture(Q,Ae),p(Q),t.unbindTexture()}}}const C=[],Be=[];function Me(w){if(w.samples>0){if(he(w)===!1){const M=w.textures,B=w.width,Z=w.height;let J=n.COLOR_BUFFER_BIT;const Q=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ae=i.get(w),re=M.length>1;if(re)for(let de=0;de<M.length;de++)t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let de=0;de<M.length;de++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),re){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ae.__webglColorRenderbuffer[de]);const Le=i.get(M[de]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Le,0)}n.blitFramebuffer(0,0,B,Z,0,0,B,Z,J,n.NEAREST),c===!0&&(C.length=0,Be.length=0,C.push(n.COLOR_ATTACHMENT0+de),w.depthBuffer&&w.resolveDepthBuffer===!1&&(C.push(Q),Be.push(Q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Be)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,C))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),re)for(let de=0;de<M.length;de++){t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,Ae.__webglColorRenderbuffer[de]);const Le=i.get(M[de]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,Le,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const M=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function Pe(w){return Math.min(s.maxSamples,w.samples)}function he(w){const M=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Ie(w){const M=o.render.frame;u.get(w)!==M&&(u.set(w,M),w.update())}function fe(w,M){const B=w.colorSpace,Z=w.format,J=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||B!==is&&B!==Jn&&(rt.getTransfer(B)===mt?(Z!==Bn||J!==Li)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),M}function ve(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=O,this.resetTextureUnits=P,this.setTexture2D=X,this.setTexture2DArray=j,this.setTexture3D=k,this.setTextureCube=K,this.rebindTextures=we,this.setupRenderTarget=Ee,this.updateRenderTargetMipmap=Ve,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=xe,this.setupFrameBufferTexture=Y,this.useMultisampledRTT=he}function Em(n,e){function t(i,s=Jn){let r;const o=rt.getTransfer(s);if(i===Li)return n.UNSIGNED_BYTE;if(i===r1)return n.UNSIGNED_SHORT_4_4_4_4;if(i===o1)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ad)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Ed)return n.BYTE;if(i===Td)return n.SHORT;if(i===Ao)return n.UNSIGNED_SHORT;if(i===s1)return n.INT;if(i===Ps)return n.UNSIGNED_INT;if(i===$n)return n.FLOAT;if(i===bn)return n.HALF_FLOAT;if(i===wd)return n.ALPHA;if(i===Dd)return n.RGB;if(i===Bn)return n.RGBA;if(i===Cd)return n.LUMINANCE;if(i===Pd)return n.LUMINANCE_ALPHA;if(i===gr)return n.DEPTH_COMPONENT;if(i===wr)return n.DEPTH_STENCIL;if(i===a1)return n.RED;if(i===c1)return n.RED_INTEGER;if(i===Rd)return n.RG;if(i===l1)return n.RG_INTEGER;if(i===u1)return n.RGBA_INTEGER;if(i===Ja||i===Qa||i===$a||i===e0)if(o===mt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ja)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Qa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===$a)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===e0)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ja)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Qa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===$a)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===e0)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===rl||i===ol||i===al||i===cl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===rl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ol)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===al)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===cl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ll||i===ul||i===dl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ll||i===ul)return o===mt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===dl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===hl||i===fl||i===pl||i===ml||i===gl||i===vl||i===xl||i===_l||i===Ml||i===yl||i===Sl||i===bl||i===El||i===Tl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===hl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===pl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ml)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===gl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===vl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===xl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===_l)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ml)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===yl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Sl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===bl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===El)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Tl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===t0||i===Al||i===wl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===t0)return o===mt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Al)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===wl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ld||i===Dl||i===Cl||i===Pl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===t0)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Dl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Cl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Pl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ar?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class Tm extends Mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ti extends qt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Am={type:"move"};class bc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ti,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ti,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ti,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&h>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Am)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ti;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const wm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Dm=`
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

}`;class Cm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const s=new It,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new _t({vertexShader:wm,fragmentShader:Dm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Dt(new qo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Pm extends Fs{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,h=null,f=null,g=null;const v=new Cm,m=t.getContextAttributes();let p=null,y=null;const x=[],b=[],L=new be;let A=null;const D=new Mn;D.layers.enable(1),D.viewport=new ct;const I=new Mn;I.layers.enable(2),I.viewport=new ct;const E=[D,I],S=new Tm;S.layers.enable(1),S.layers.enable(2);let P=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Y=x[q];return Y===void 0&&(Y=new bc,x[q]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(q){let Y=x[q];return Y===void 0&&(Y=new bc,x[q]=Y),Y.getGripSpace()},this.getHand=function(q){let Y=x[q];return Y===void 0&&(Y=new bc,x[q]=Y),Y.getHandSpace()};function z(q){const Y=b.indexOf(q.inputSource);if(Y===-1)return;const te=x[Y];te!==void 0&&(te.update(q.inputSource,q.frame,l||o),te.dispatchEvent({type:q.type,data:q.inputSource}))}function X(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",j);for(let q=0;q<x.length;q++){const Y=b[q];Y!==null&&(b[q]=null,x[q].disconnect(Y))}P=null,O=null,v.reset(),e.setRenderTarget(p),f=null,h=null,d=null,s=null,y=null,Ue.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",X),s.addEventListener("inputsourceschange",j),m.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(L),s.renderState.layers===void 0){const Y={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,Y),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new cn(f.framebufferWidth,f.framebufferHeight,{format:Bn,type:Li,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let Y=null,te=null,ae=null;m.depth&&(ae=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Y=m.stencil?wr:gr,te=m.stencil?Ar:Ps);const xe={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:r};d=new XRWebGLBinding(s,t),h=d.createProjectionLayer(xe),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new cn(h.textureWidth,h.textureHeight,{format:Bn,type:Li,depthTexture:new jd(h.textureWidth,h.textureHeight,te,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Ue.setContext(s),Ue.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function j(q){for(let Y=0;Y<q.removed.length;Y++){const te=q.removed[Y],ae=b.indexOf(te);ae>=0&&(b[ae]=null,x[ae].disconnect(te))}for(let Y=0;Y<q.added.length;Y++){const te=q.added[Y];let ae=b.indexOf(te);if(ae===-1){for(let we=0;we<x.length;we++)if(we>=b.length){b.push(te),ae=we;break}else if(b[we]===null){b[we]=te,ae=we;break}if(ae===-1)break}const xe=x[ae];xe&&xe.connect(te)}}const k=new R,K=new R;function G(q,Y,te){k.setFromMatrixPosition(Y.matrixWorld),K.setFromMatrixPosition(te.matrixWorld);const ae=k.distanceTo(K),xe=Y.projectionMatrix.elements,we=te.projectionMatrix.elements,Ee=xe[14]/(xe[10]-1),Ve=xe[14]/(xe[10]+1),C=(xe[9]+1)/xe[5],Be=(xe[9]-1)/xe[5],Me=(xe[8]-1)/xe[0],Pe=(we[8]+1)/we[0],he=Ee*Me,Ie=Ee*Pe,fe=ae/(-Me+Pe),ve=fe*-Me;if(Y.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(ve),q.translateZ(fe),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),xe[10]===-1)q.projectionMatrix.copy(Y.projectionMatrix),q.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const w=Ee+fe,M=Ve+fe,B=he-ve,Z=Ie+(ae-ve),J=C*Ve/M*w,Q=Be*Ve/M*w;q.projectionMatrix.makePerspective(B,Z,J,Q,w,M),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function ne(q,Y){Y===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Y.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let Y=q.near,te=q.far;v.texture!==null&&(v.depthNear>0&&(Y=v.depthNear),v.depthFar>0&&(te=v.depthFar)),S.near=I.near=D.near=Y,S.far=I.far=D.far=te,(P!==S.near||O!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),P=S.near,O=S.far);const ae=q.parent,xe=S.cameras;ne(S,ae);for(let we=0;we<xe.length;we++)ne(xe[we],ae);xe.length===2?G(S,D,I):S.projectionMatrix.copy(D.projectionMatrix),ce(q,S,ae)};function ce(q,Y,te){te===null?q.matrix.copy(Y.matrixWorld):(q.matrix.copy(te.matrixWorld),q.matrix.invert(),q.matrix.multiply(Y.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Y.projectionMatrix),q.projectionMatrixInverse.copy(Y.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=wo*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&f===null))return c},this.setFoveation=function(q){c=q,h!==null&&(h.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(S)};let ue=null;function Te(q,Y){if(u=Y.getViewerPose(l||o),g=Y,u!==null){const te=u.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let ae=!1;te.length!==S.cameras.length&&(S.cameras.length=0,ae=!0);for(let we=0;we<te.length;we++){const Ee=te[we];let Ve=null;if(f!==null)Ve=f.getViewport(Ee);else{const Be=d.getViewSubImage(h,Ee);Ve=Be.viewport,we===0&&(e.setRenderTargetTextures(y,Be.colorTexture,h.ignoreDepthValues?void 0:Be.depthStencilTexture),e.setRenderTarget(y))}let C=E[we];C===void 0&&(C=new Mn,C.layers.enable(we),C.viewport=new ct,E[we]=C),C.matrix.fromArray(Ee.transform.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale),C.projectionMatrix.fromArray(Ee.projectionMatrix),C.projectionMatrixInverse.copy(C.projectionMatrix).invert(),C.viewport.set(Ve.x,Ve.y,Ve.width,Ve.height),we===0&&(S.matrix.copy(C.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ae===!0&&S.cameras.push(C)}const xe=s.enabledFeatures;if(xe&&xe.includes("depth-sensing")){const we=d.getDepthInformation(te[0]);we&&we.isValid&&we.texture&&v.init(e,we,s.renderState)}}for(let te=0;te<x.length;te++){const ae=b[te],xe=x[te];ae!==null&&xe!==void 0&&xe.update(ae,Y,l||o)}ue&&ue(q,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),g=null}const Ue=new Xd;Ue.setAnimationLoop(Te),this.setAnimationLoop=function(q){ue=q},this.dispose=function(){}}}const fs=new Vn,Rm=new ot;function Lm(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Gd(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,x,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,b)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,y,x):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===en&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===en&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p),x=y.envMap,b=y.envMapRotation;x&&(m.envMap.value=x,fs.copy(b),fs.x*=-1,fs.y*=-1,fs.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(fs.y*=-1,fs.z*=-1),m.envMapRotation.value.setFromMatrix4(Rm.makeRotationFromEuler(fs)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,y,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===en&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Im(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,x){const b=x.program;i.uniformBlockBinding(y,b)}function l(y,x){let b=s[y.id];b===void 0&&(g(y),b=u(y),s[y.id]=b,y.addEventListener("dispose",m));const L=x.program;i.updateUBOMapping(y,L);const A=e.render.frame;r[y.id]!==A&&(h(y),r[y.id]=A)}function u(y){const x=d();y.__bindingPointIndex=x;const b=n.createBuffer(),L=y.__size,A=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,L,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,b),b}function d(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){const x=s[y.id],b=y.uniforms,L=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let A=0,D=b.length;A<D;A++){const I=Array.isArray(b[A])?b[A]:[b[A]];for(let E=0,S=I.length;E<S;E++){const P=I[E];if(f(P,A,E,L)===!0){const O=P.__offset,z=Array.isArray(P.value)?P.value:[P.value];let X=0;for(let j=0;j<z.length;j++){const k=z[j],K=v(k);typeof k=="number"||typeof k=="boolean"?(P.__data[0]=k,n.bufferSubData(n.UNIFORM_BUFFER,O+X,P.__data)):k.isMatrix3?(P.__data[0]=k.elements[0],P.__data[1]=k.elements[1],P.__data[2]=k.elements[2],P.__data[3]=0,P.__data[4]=k.elements[3],P.__data[5]=k.elements[4],P.__data[6]=k.elements[5],P.__data[7]=0,P.__data[8]=k.elements[6],P.__data[9]=k.elements[7],P.__data[10]=k.elements[8],P.__data[11]=0):(k.toArray(P.__data,X),X+=K.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(y,x,b,L){const A=y.value,D=x+"_"+b;if(L[D]===void 0)return typeof A=="number"||typeof A=="boolean"?L[D]=A:L[D]=A.clone(),!0;{const I=L[D];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return L[D]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function g(y){const x=y.uniforms;let b=0;const L=16;for(let D=0,I=x.length;D<I;D++){const E=Array.isArray(x[D])?x[D]:[x[D]];for(let S=0,P=E.length;S<P;S++){const O=E[S],z=Array.isArray(O.value)?O.value:[O.value];for(let X=0,j=z.length;X<j;X++){const k=z[X],K=v(k),G=b%L,ne=G%K.boundary,ce=G+ne;b+=ne,ce!==0&&L-ce<K.storage&&(b+=L-ce),O.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=b,b+=K.storage}}}const A=b%L;return A>0&&(b+=L-A),y.__size=b,y.__cache={},this}function v(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function m(y){const x=y.target;x.removeEventListener("dispose",m);const b=o.indexOf(x.__bindingPointIndex);o.splice(b,1),n.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(const y in s)n.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class Hm{constructor(e={}){const{canvas:t=A3(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=o;const f=new Uint32Array(4),g=new Int32Array(4);let v=null,m=null;const p=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=wt,this.toneMapping=Ji,this.toneMappingExposure=1;const x=this;let b=!1,L=0,A=0,D=null,I=-1,E=null;const S=new ct,P=new ct;let O=null;const z=new je(0);let X=0,j=t.width,k=t.height,K=1,G=null,ne=null;const ce=new ct(0,0,j,k),ue=new ct(0,0,j,k);let Te=!1;const Ue=new p1;let q=!1,Y=!1;const te=new ot,ae=new R,xe=new ct,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ee=!1;function Ve(){return D===null?K:1}let C=i;function Be(T,N){return t.getContext(T,N)}try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${n1}`),t.addEventListener("webglcontextlost",ee,!1),t.addEventListener("webglcontextrestored",$,!1),t.addEventListener("webglcontextcreationerror",le,!1),C===null){const N="webgl2";if(C=Be(N,T),C===null)throw Be(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Me,Pe,he,Ie,fe,ve,w,M,B,Z,J,Q,Ae,re,de,Le,ie,me,_,Re,pe,ze,Fe,Je;function H(){Me=new k9(C),Me.init(),ze=new Em(C,Me),Pe=new U9(C,Me,e,ze),he=new ym(C),Ie=new V9(C),fe=new cm,ve=new bm(C,Me,he,fe,Pe,ze,Ie),w=new O9(x),M=new B9(x),B=new J3(C),Fe=new I9(C,B),Z=new G9(C,B,Ie,Fe),J=new Y9(C,Z,B,Ie),_=new X9(C,Pe,ve),Le=new N9(fe),Q=new am(x,w,M,Me,Pe,Fe,Le),Ae=new Lm(x,fe),re=new um,de=new gm(Me),me=new L9(x,w,M,he,J,h,c),ie=new Mm(x,J,Pe),Je=new Im(C,Ie,Pe,he),Re=new H9(C,Me,Ie),pe=new W9(C,Me,Ie),Ie.programs=Q.programs,x.capabilities=Pe,x.extensions=Me,x.properties=fe,x.renderLists=re,x.shadowMap=ie,x.state=he,x.info=Ie}H();const se=new Pm(x,C);this.xr=se,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const T=Me.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Me.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(T){T!==void 0&&(K=T,this.setSize(j,k,!1))},this.getSize=function(T){return T.set(j,k)},this.setSize=function(T,N,W=!0){if(se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}j=T,k=N,t.width=Math.floor(T*K),t.height=Math.floor(N*K),W===!0&&(t.style.width=T+"px",t.style.height=N+"px"),this.setViewport(0,0,T,N)},this.getDrawingBufferSize=function(T){return T.set(j*K,k*K).floor()},this.setDrawingBufferSize=function(T,N,W){j=T,k=N,K=W,t.width=Math.floor(T*W),t.height=Math.floor(N*W),this.setViewport(0,0,T,N)},this.getCurrentViewport=function(T){return T.copy(S)},this.getViewport=function(T){return T.copy(ce)},this.setViewport=function(T,N,W,V){T.isVector4?ce.set(T.x,T.y,T.z,T.w):ce.set(T,N,W,V),he.viewport(S.copy(ce).multiplyScalar(K).round())},this.getScissor=function(T){return T.copy(ue)},this.setScissor=function(T,N,W,V){T.isVector4?ue.set(T.x,T.y,T.z,T.w):ue.set(T,N,W,V),he.scissor(P.copy(ue).multiplyScalar(K).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(T){he.setScissorTest(Te=T)},this.setOpaqueSort=function(T){G=T},this.setTransparentSort=function(T){ne=T},this.getClearColor=function(T){return T.copy(me.getClearColor())},this.setClearColor=function(){me.setClearColor.apply(me,arguments)},this.getClearAlpha=function(){return me.getClearAlpha()},this.setClearAlpha=function(){me.setClearAlpha.apply(me,arguments)},this.clear=function(T=!0,N=!0,W=!0){let V=0;if(T){let U=!1;if(D!==null){const oe=D.texture.format;U=oe===u1||oe===l1||oe===c1}if(U){const oe=D.texture.type,Se=oe===Li||oe===Ps||oe===Ao||oe===Ar||oe===r1||oe===o1,De=me.getClearColor(),Ce=me.getClearAlpha(),We=De.r,ke=De.g,He=De.b;Se?(f[0]=We,f[1]=ke,f[2]=He,f[3]=Ce,C.clearBufferuiv(C.COLOR,0,f)):(g[0]=We,g[1]=ke,g[2]=He,g[3]=Ce,C.clearBufferiv(C.COLOR,0,g))}else V|=C.COLOR_BUFFER_BIT}N&&(V|=C.DEPTH_BUFFER_BIT),W&&(V|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ee,!1),t.removeEventListener("webglcontextrestored",$,!1),t.removeEventListener("webglcontextcreationerror",le,!1),re.dispose(),de.dispose(),fe.dispose(),w.dispose(),M.dispose(),J.dispose(),Fe.dispose(),Je.dispose(),Q.dispose(),se.dispose(),se.removeEventListener("sessionstart",ht),se.removeEventListener("sessionend",Ye),ft.stop()};function ee(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function $(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const T=Ie.autoReset,N=ie.enabled,W=ie.autoUpdate,V=ie.needsUpdate,U=ie.type;H(),Ie.autoReset=T,ie.enabled=N,ie.autoUpdate=W,ie.needsUpdate=V,ie.type=U}function le(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ne(T){const N=T.target;N.removeEventListener("dispose",Ne),Ge(N)}function Ge(T){Qe(T),fe.remove(T)}function Qe(T){const N=fe.get(T).programs;N!==void 0&&(N.forEach(function(W){Q.releaseProgram(W)}),T.isShaderMaterial&&Q.releaseShaderCache(T))}this.renderBufferDirect=function(T,N,W,V,U,oe){N===null&&(N=we);const Se=U.isMesh&&U.matrixWorld.determinant()<0,De=gn(T,N,W,V,U);he.setMaterial(V,Se);let Ce=W.index,We=1;if(V.wireframe===!0){if(Ce=Z.getWireframeAttribute(W),Ce===void 0)return;We=2}const ke=W.drawRange,He=W.attributes.position;let et=ke.start*We,pt=(ke.start+ke.count)*We;oe!==null&&(et=Math.max(et,oe.start*We),pt=Math.min(pt,(oe.start+oe.count)*We)),Ce!==null?(et=Math.max(et,0),pt=Math.min(pt,Ce.count)):He!=null&&(et=Math.max(et,0),pt=Math.min(pt,He.count));const at=pt-et;if(at<0||at===1/0)return;Fe.setup(U,V,De,W,Ce);let Tt,tt=Re;if(Ce!==null&&(Tt=B.get(Ce),tt=pe,tt.setIndex(Tt)),U.isMesh)V.wireframe===!0?(he.setLineWidth(V.wireframeLinewidth*Ve()),tt.setMode(C.LINES)):tt.setMode(C.TRIANGLES);else if(U.isLine){let Oe=V.linewidth;Oe===void 0&&(Oe=1),he.setLineWidth(Oe*Ve()),U.isLineSegments?tt.setMode(C.LINES):U.isLineLoop?tt.setMode(C.LINE_LOOP):tt.setMode(C.LINE_STRIP)}else U.isPoints?tt.setMode(C.POINTS):U.isSprite&&tt.setMode(C.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)tt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Me.get("WEBGL_multi_draw"))tt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Oe=U._multiDrawStarts,At=U._multiDrawCounts,nt=U._multiDrawCount,Nt=Ce?B.get(Ce).bytesPerElement:1,qn=fe.get(V).currentProgram.getUniforms();for(let Wt=0;Wt<nt;Wt++)qn.setValue(C,"_gl_DrawID",Wt),tt.render(Oe[Wt]/Nt,At[Wt])}else if(U.isInstancedMesh)tt.renderInstances(et,at,U.count);else if(W.isInstancedBufferGeometry){const Oe=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,At=Math.min(W.instanceCount,Oe);tt.renderInstances(et,at,At)}else tt.render(et,at)};function ut(T,N,W){T.transparent===!0&&T.side===Pn&&T.forceSinglePass===!1?(T.side=en,T.needsUpdate=!0,jn(T,N,W),T.side=Ri,T.needsUpdate=!0,jn(T,N,W),T.side=Pn):jn(T,N,W)}this.compile=function(T,N,W=null){W===null&&(W=T),m=de.get(W),m.init(N),y.push(m),W.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(m.pushLight(U),U.castShadow&&m.pushShadow(U))}),T!==W&&T.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(m.pushLight(U),U.castShadow&&m.pushShadow(U))}),m.setupLights();const V=new Set;return T.traverse(function(U){const oe=U.material;if(oe)if(Array.isArray(oe))for(let Se=0;Se<oe.length;Se++){const De=oe[Se];ut(De,W,U),V.add(De)}else ut(oe,W,U),V.add(oe)}),y.pop(),m=null,V},this.compileAsync=function(T,N,W=null){const V=this.compile(T,N,W);return new Promise(U=>{function oe(){if(V.forEach(function(Se){fe.get(Se).currentProgram.isReady()&&V.delete(Se)}),V.size===0){U(T);return}setTimeout(oe,10)}Me.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let Xe=null;function Mt(T){Xe&&Xe(T)}function ht(){ft.stop()}function Ye(){ft.start()}const ft=new Xd;ft.setAnimationLoop(Mt),typeof self<"u"&&ft.setContext(self),this.setAnimationLoop=function(T){Xe=T,se.setAnimationLoop(T),T===null?ft.stop():ft.start()},se.addEventListener("sessionstart",ht),se.addEventListener("sessionend",Ye),this.render=function(T,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(se.cameraAutoUpdate===!0&&se.updateCamera(N),N=se.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,N,D),m=de.get(T,y.length),m.init(N),y.push(m),te.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Ue.setFromProjectionMatrix(te),Y=this.localClippingEnabled,q=Le.init(this.clippingPlanes,Y),v=re.get(T,p.length),v.init(),p.push(v),se.enabled===!0&&se.isPresenting===!0){const oe=x.xr.getDepthSensingMesh();oe!==null&&Ct(oe,N,-1/0,x.sortObjects)}Ct(T,N,0,x.sortObjects),v.finish(),x.sortObjects===!0&&v.sort(G,ne),Ee=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,Ee&&me.addToRenderList(v,T),this.info.render.frame++,q===!0&&Le.beginShadows();const W=m.state.shadowsArray;ie.render(W,T,N),q===!0&&Le.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=v.opaque,U=v.transmissive;if(m.setupLights(),N.isArrayCamera){const oe=N.cameras;if(U.length>0)for(let Se=0,De=oe.length;Se<De;Se++){const Ce=oe[Se];it(V,U,T,Ce)}Ee&&me.render(T);for(let Se=0,De=oe.length;Se<De;Se++){const Ce=oe[Se];Tn(v,T,Ce,Ce.viewport)}}else U.length>0&&it(V,U,T,N),Ee&&me.render(T),Tn(v,T,N);D!==null&&(ve.updateMultisampleRenderTarget(D),ve.updateRenderTargetMipmap(D)),T.isScene===!0&&T.onAfterRender(x,T,N),Fe.resetDefaultState(),I=-1,E=null,y.pop(),y.length>0?(m=y[y.length-1],q===!0&&Le.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,p.pop(),p.length>0?v=p[p.length-1]:v=null};function Ct(T,N,W,V){if(T.visible===!1)return;if(T.layers.test(N.layers)){if(T.isGroup)W=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(N);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Ue.intersectsSprite(T)){V&&xe.setFromMatrixPosition(T.matrixWorld).applyMatrix4(te);const Se=J.update(T),De=T.material;De.visible&&v.push(T,Se,De,W,xe.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Ue.intersectsObject(T))){const Se=J.update(T),De=T.material;if(V&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),xe.copy(T.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),xe.copy(Se.boundingSphere.center)),xe.applyMatrix4(T.matrixWorld).applyMatrix4(te)),Array.isArray(De)){const Ce=Se.groups;for(let We=0,ke=Ce.length;We<ke;We++){const He=Ce[We],et=De[He.materialIndex];et&&et.visible&&v.push(T,Se,et,W,xe.z,He)}}else De.visible&&v.push(T,Se,De,W,xe.z,null)}}const oe=T.children;for(let Se=0,De=oe.length;Se<De;Se++)Ct(oe[Se],N,W,V)}function Tn(T,N,W,V){const U=T.opaque,oe=T.transmissive,Se=T.transparent;m.setupLightsView(W),q===!0&&Le.setGlobalState(x.clippingPlanes,W),V&&he.viewport(S.copy(V)),U.length>0&&Yn(U,N,W),oe.length>0&&Yn(oe,N,W),Se.length>0&&Yn(Se,N,W),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function it(T,N,W,V){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[V.id]===void 0&&(m.state.transmissionRenderTarget[V.id]=new cn(1,1,{generateMipmaps:!0,type:Me.has("EXT_color_buffer_half_float")||Me.has("EXT_color_buffer_float")?bn:Li,minFilter:bs,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:rt.workingColorSpace}));const oe=m.state.transmissionRenderTarget[V.id],Se=V.viewport||S;oe.setSize(Se.z,Se.w);const De=x.getRenderTarget();x.setRenderTarget(oe),x.getClearColor(z),X=x.getClearAlpha(),X<1&&x.setClearColor(16777215,.5),x.clear(),Ee&&me.render(W);const Ce=x.toneMapping;x.toneMapping=Ji;const We=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),m.setupLightsView(V),q===!0&&Le.setGlobalState(x.clippingPlanes,V),Yn(T,W,V),ve.updateMultisampleRenderTarget(oe),ve.updateRenderTargetMipmap(oe),Me.has("WEBGL_multisampled_render_to_texture")===!1){let ke=!1;for(let He=0,et=N.length;He<et;He++){const pt=N[He],at=pt.object,Tt=pt.geometry,tt=pt.material,Oe=pt.group;if(tt.side===Pn&&at.layers.test(V.layers)){const At=tt.side;tt.side=en,tt.needsUpdate=!0,ui(at,W,V,Tt,tt,Oe),tt.side=At,tt.needsUpdate=!0,ke=!0}}ke===!0&&(ve.updateMultisampleRenderTarget(oe),ve.updateRenderTargetMipmap(oe))}x.setRenderTarget(De),x.setClearColor(z,X),We!==void 0&&(V.viewport=We),x.toneMapping=Ce}function Yn(T,N,W){const V=N.isScene===!0?N.overrideMaterial:null;for(let U=0,oe=T.length;U<oe;U++){const Se=T[U],De=Se.object,Ce=Se.geometry,We=V===null?Se.material:V,ke=Se.group;De.layers.test(W.layers)&&ui(De,N,W,Ce,We,ke)}}function ui(T,N,W,V,U,oe){T.onBeforeRender(x,N,W,V,U,oe),T.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),U.onBeforeRender(x,N,W,V,T,oe),U.transparent===!0&&U.side===Pn&&U.forceSinglePass===!1?(U.side=en,U.needsUpdate=!0,x.renderBufferDirect(W,N,V,U,T,oe),U.side=Ri,U.needsUpdate=!0,x.renderBufferDirect(W,N,V,U,T,oe),U.side=Pn):x.renderBufferDirect(W,N,V,U,T,oe),T.onAfterRender(x,N,W,V,U,oe)}function jn(T,N,W){N.isScene!==!0&&(N=we);const V=fe.get(T),U=m.state.lights,oe=m.state.shadowsArray,Se=U.state.version,De=Q.getParameters(T,U.state,oe,N,W),Ce=Q.getProgramCacheKey(De);let We=V.programs;V.environment=T.isMeshStandardMaterial?N.environment:null,V.fog=N.fog,V.envMap=(T.isMeshStandardMaterial?M:w).get(T.envMap||V.environment),V.envMapRotation=V.environment!==null&&T.envMap===null?N.environmentRotation:T.envMapRotation,We===void 0&&(T.addEventListener("dispose",Ne),We=new Map,V.programs=We);let ke=We.get(Ce);if(ke!==void 0){if(V.currentProgram===ke&&V.lightsStateVersion===Se)return An(T,De),ke}else De.uniforms=Q.getUniforms(T),T.onBeforeCompile(De,x),ke=Q.acquireProgram(De,Ce),We.set(Ce,ke),V.uniforms=De.uniforms;const He=V.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(He.clippingPlanes=Le.uniform),An(T,De),V.needsLights=un(T),V.lightsStateVersion=Se,V.needsLights&&(He.ambientLightColor.value=U.state.ambient,He.lightProbe.value=U.state.probe,He.directionalLights.value=U.state.directional,He.directionalLightShadows.value=U.state.directionalShadow,He.spotLights.value=U.state.spot,He.spotLightShadows.value=U.state.spotShadow,He.rectAreaLights.value=U.state.rectArea,He.ltc_1.value=U.state.rectAreaLTC1,He.ltc_2.value=U.state.rectAreaLTC2,He.pointLights.value=U.state.point,He.pointLightShadows.value=U.state.pointShadow,He.hemisphereLights.value=U.state.hemi,He.directionalShadowMap.value=U.state.directionalShadowMap,He.directionalShadowMatrix.value=U.state.directionalShadowMatrix,He.spotShadowMap.value=U.state.spotShadowMap,He.spotLightMatrix.value=U.state.spotLightMatrix,He.spotLightMap.value=U.state.spotLightMap,He.pointShadowMap.value=U.state.pointShadowMap,He.pointShadowMatrix.value=U.state.pointShadowMatrix),V.currentProgram=ke,V.uniformsList=null,ke}function zi(T){if(T.uniformsList===null){const N=T.currentProgram.getUniforms();T.uniformsList=n0.seqWithValue(N.seq,T.uniforms)}return T.uniformsList}function An(T,N){const W=fe.get(T);W.outputColorSpace=N.outputColorSpace,W.batching=N.batching,W.batchingColor=N.batchingColor,W.instancing=N.instancing,W.instancingColor=N.instancingColor,W.instancingMorph=N.instancingMorph,W.skinning=N.skinning,W.morphTargets=N.morphTargets,W.morphNormals=N.morphNormals,W.morphColors=N.morphColors,W.morphTargetsCount=N.morphTargetsCount,W.numClippingPlanes=N.numClippingPlanes,W.numIntersection=N.numClipIntersection,W.vertexAlphas=N.vertexAlphas,W.vertexTangents=N.vertexTangents,W.toneMapping=N.toneMapping}function gn(T,N,W,V,U){N.isScene!==!0&&(N=we),ve.resetTextureUnits();const oe=N.fog,Se=V.isMeshStandardMaterial?N.environment:null,De=D===null?x.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:is,Ce=(V.isMeshStandardMaterial?M:w).get(V.envMap||Se),We=V.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,ke=!!W.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),He=!!W.morphAttributes.position,et=!!W.morphAttributes.normal,pt=!!W.morphAttributes.color;let at=Ji;V.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(at=x.toneMapping);const Tt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,tt=Tt!==void 0?Tt.length:0,Oe=fe.get(V),At=m.state.lights;if(q===!0&&(Y===!0||T!==E)){const Jt=T===E&&V.id===I;Le.setState(V,T,Jt)}let nt=!1;V.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==At.state.version||Oe.outputColorSpace!==De||U.isBatchedMesh&&Oe.batching===!1||!U.isBatchedMesh&&Oe.batching===!0||U.isBatchedMesh&&Oe.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Oe.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Oe.instancing===!1||!U.isInstancedMesh&&Oe.instancing===!0||U.isSkinnedMesh&&Oe.skinning===!1||!U.isSkinnedMesh&&Oe.skinning===!0||U.isInstancedMesh&&Oe.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Oe.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Oe.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Oe.instancingMorph===!1&&U.morphTexture!==null||Oe.envMap!==Ce||V.fog===!0&&Oe.fog!==oe||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==Le.numPlanes||Oe.numIntersection!==Le.numIntersection)||Oe.vertexAlphas!==We||Oe.vertexTangents!==ke||Oe.morphTargets!==He||Oe.morphNormals!==et||Oe.morphColors!==pt||Oe.toneMapping!==at||Oe.morphTargetsCount!==tt)&&(nt=!0):(nt=!0,Oe.__version=V.version);let Nt=Oe.currentProgram;nt===!0&&(Nt=jn(V,N,U));let qn=!1,Wt=!1,di=!1;const xt=Nt.getUniforms(),dn=Oe.uniforms;if(he.useProgram(Nt.program)&&(qn=!0,Wt=!0,di=!0),V.id!==I&&(I=V.id,Wt=!0),qn||E!==T){xt.setValue(C,"projectionMatrix",T.projectionMatrix),xt.setValue(C,"viewMatrix",T.matrixWorldInverse);const Jt=xt.map.cameraPosition;Jt!==void 0&&Jt.setValue(C,ae.setFromMatrixPosition(T.matrixWorld)),Pe.logarithmicDepthBuffer&&xt.setValue(C,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&xt.setValue(C,"isOrthographic",T.isOrthographicCamera===!0),E!==T&&(E=T,Wt=!0,di=!0)}if(U.isSkinnedMesh){xt.setOptional(C,U,"bindMatrix"),xt.setOptional(C,U,"bindMatrixInverse");const Jt=U.skeleton;Jt&&(Jt.boneTexture===null&&Jt.computeBoneTexture(),xt.setValue(C,"boneTexture",Jt.boneTexture,ve))}U.isBatchedMesh&&(xt.setOptional(C,U,"batchingTexture"),xt.setValue(C,"batchingTexture",U._matricesTexture,ve),xt.setOptional(C,U,"batchingIdTexture"),xt.setValue(C,"batchingIdTexture",U._indirectTexture,ve),xt.setOptional(C,U,"batchingColorTexture"),U._colorsTexture!==null&&xt.setValue(C,"batchingColorTexture",U._colorsTexture,ve));const as=W.morphAttributes;if((as.position!==void 0||as.normal!==void 0||as.color!==void 0)&&_.update(U,W,Nt),(Wt||Oe.receiveShadow!==U.receiveShadow)&&(Oe.receiveShadow=U.receiveShadow,xt.setValue(C,"receiveShadow",U.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(dn.envMap.value=Ce,dn.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&N.environment!==null&&(dn.envMapIntensity.value=N.environmentIntensity),Wt&&(xt.setValue(C,"toneMappingExposure",x.toneMappingExposure),Oe.needsLights&&Et(dn,di),oe&&V.fog===!0&&Ae.refreshFogUniforms(dn,oe),Ae.refreshMaterialUniforms(dn,V,K,k,m.state.transmissionRenderTarget[T.id]),n0.upload(C,zi(Oe),dn,ve)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(n0.upload(C,zi(Oe),dn,ve),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&xt.setValue(C,"center",U.center),xt.setValue(C,"modelViewMatrix",U.modelViewMatrix),xt.setValue(C,"normalMatrix",U.normalMatrix),xt.setValue(C,"modelMatrix",U.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Jt=V.uniformsGroups;for(let jr=0,J0=Jt.length;jr<J0;jr++){const sa=Jt[jr];Je.update(sa,Nt),Je.bind(sa,Nt)}}return Nt}function Et(T,N){T.ambientLightColor.needsUpdate=N,T.lightProbe.needsUpdate=N,T.directionalLights.needsUpdate=N,T.directionalLightShadows.needsUpdate=N,T.pointLights.needsUpdate=N,T.pointLightShadows.needsUpdate=N,T.spotLights.needsUpdate=N,T.spotLightShadows.needsUpdate=N,T.rectAreaLights.needsUpdate=N,T.hemisphereLights.needsUpdate=N}function un(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(T,N,W){fe.get(T.texture).__webglTexture=N,fe.get(T.depthTexture).__webglTexture=W;const V=fe.get(T);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=W===void 0,V.__autoAllocateDepthBuffer||Me.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,N){const W=fe.get(T);W.__webglFramebuffer=N,W.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(T,N=0,W=0){D=T,L=N,A=W;let V=!0,U=null,oe=!1,Se=!1;if(T){const Ce=fe.get(T);if(Ce.__useDefaultFramebuffer!==void 0)he.bindFramebuffer(C.FRAMEBUFFER,null),V=!1;else if(Ce.__webglFramebuffer===void 0)ve.setupRenderTarget(T);else if(Ce.__hasExternalTextures)ve.rebindTextures(T,fe.get(T.texture).__webglTexture,fe.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const He=T.depthTexture;if(Ce.__boundDepthTexture!==He){if(He!==null&&fe.has(He)&&(T.width!==He.image.width||T.height!==He.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ve.setupDepthRenderbuffer(T)}}const We=T.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(Se=!0);const ke=fe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ke[N])?U=ke[N][W]:U=ke[N],oe=!0):T.samples>0&&ve.useMultisampledRTT(T)===!1?U=fe.get(T).__webglMultisampledFramebuffer:Array.isArray(ke)?U=ke[W]:U=ke,S.copy(T.viewport),P.copy(T.scissor),O=T.scissorTest}else S.copy(ce).multiplyScalar(K).floor(),P.copy(ue).multiplyScalar(K).floor(),O=Te;if(he.bindFramebuffer(C.FRAMEBUFFER,U)&&V&&he.drawBuffers(T,U),he.viewport(S),he.scissor(P),he.setScissorTest(O),oe){const Ce=fe.get(T.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+N,Ce.__webglTexture,W)}else if(Se){const Ce=fe.get(T.texture),We=N||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,Ce.__webglTexture,W||0,We)}I=-1},this.readRenderTargetPixels=function(T,N,W,V,U,oe,Se){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=fe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Se!==void 0&&(De=De[Se]),De){he.bindFramebuffer(C.FRAMEBUFFER,De);try{const Ce=T.texture,We=Ce.format,ke=Ce.type;if(!Pe.textureFormatReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pe.textureTypeReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=T.width-V&&W>=0&&W<=T.height-U&&C.readPixels(N,W,V,U,ze.convert(We),ze.convert(ke),oe)}finally{const Ce=D!==null?fe.get(D).__webglFramebuffer:null;he.bindFramebuffer(C.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(T,N,W,V,U,oe,Se){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let De=fe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Se!==void 0&&(De=De[Se]),De){he.bindFramebuffer(C.FRAMEBUFFER,De);try{const Ce=T.texture,We=Ce.format,ke=Ce.type;if(!Pe.textureFormatReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pe.textureTypeReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=T.width-V&&W>=0&&W<=T.height-U){const He=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,He),C.bufferData(C.PIXEL_PACK_BUFFER,oe.byteLength,C.STREAM_READ),C.readPixels(N,W,V,U,ze.convert(We),ze.convert(ke),0),C.flush();const et=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);await w3(C,et,4);try{C.bindBuffer(C.PIXEL_PACK_BUFFER,He),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,oe)}finally{C.deleteBuffer(He),C.deleteSync(et)}return oe}}finally{const Ce=D!==null?fe.get(D).__webglFramebuffer:null;he.bindFramebuffer(C.FRAMEBUFFER,Ce)}}},this.copyFramebufferToTexture=function(T,N=null,W=0){T.isTexture!==!0&&(vr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,T=arguments[1]);const V=Math.pow(2,-W),U=Math.floor(T.image.width*V),oe=Math.floor(T.image.height*V),Se=N!==null?N.x:0,De=N!==null?N.y:0;ve.setTexture2D(T,0),C.copyTexSubImage2D(C.TEXTURE_2D,W,0,0,Se,De,U,oe),he.unbindTexture()},this.copyTextureToTexture=function(T,N,W=null,V=null,U=0){T.isTexture!==!0&&(vr("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,T=arguments[1],N=arguments[2],U=arguments[3]||0,W=null);let oe,Se,De,Ce,We,ke;W!==null?(oe=W.max.x-W.min.x,Se=W.max.y-W.min.y,De=W.min.x,Ce=W.min.y):(oe=T.image.width,Se=T.image.height,De=0,Ce=0),V!==null?(We=V.x,ke=V.y):(We=0,ke=0);const He=ze.convert(N.format),et=ze.convert(N.type);ve.setTexture2D(N,0),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,N.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,N.unpackAlignment);const pt=C.getParameter(C.UNPACK_ROW_LENGTH),at=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Tt=C.getParameter(C.UNPACK_SKIP_PIXELS),tt=C.getParameter(C.UNPACK_SKIP_ROWS),Oe=C.getParameter(C.UNPACK_SKIP_IMAGES),At=T.isCompressedTexture?T.mipmaps[U]:T.image;C.pixelStorei(C.UNPACK_ROW_LENGTH,At.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,At.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,De),C.pixelStorei(C.UNPACK_SKIP_ROWS,Ce),T.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,U,We,ke,oe,Se,He,et,At.data):T.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,U,We,ke,At.width,At.height,He,At.data):C.texSubImage2D(C.TEXTURE_2D,U,We,ke,oe,Se,He,et,At),C.pixelStorei(C.UNPACK_ROW_LENGTH,pt),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,at),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Tt),C.pixelStorei(C.UNPACK_SKIP_ROWS,tt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Oe),U===0&&N.generateMipmaps&&C.generateMipmap(C.TEXTURE_2D),he.unbindTexture()},this.copyTextureToTexture3D=function(T,N,W=null,V=null,U=0){T.isTexture!==!0&&(vr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,V=arguments[1]||null,T=arguments[2],N=arguments[3],U=arguments[4]||0);let oe,Se,De,Ce,We,ke,He,et,pt;const at=T.isCompressedTexture?T.mipmaps[U]:T.image;W!==null?(oe=W.max.x-W.min.x,Se=W.max.y-W.min.y,De=W.max.z-W.min.z,Ce=W.min.x,We=W.min.y,ke=W.min.z):(oe=at.width,Se=at.height,De=at.depth,Ce=0,We=0,ke=0),V!==null?(He=V.x,et=V.y,pt=V.z):(He=0,et=0,pt=0);const Tt=ze.convert(N.format),tt=ze.convert(N.type);let Oe;if(N.isData3DTexture)ve.setTexture3D(N,0),Oe=C.TEXTURE_3D;else if(N.isDataArrayTexture||N.isCompressedArrayTexture)ve.setTexture2DArray(N,0),Oe=C.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,N.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,N.unpackAlignment);const At=C.getParameter(C.UNPACK_ROW_LENGTH),nt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Nt=C.getParameter(C.UNPACK_SKIP_PIXELS),qn=C.getParameter(C.UNPACK_SKIP_ROWS),Wt=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,at.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,at.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ce),C.pixelStorei(C.UNPACK_SKIP_ROWS,We),C.pixelStorei(C.UNPACK_SKIP_IMAGES,ke),T.isDataTexture||T.isData3DTexture?C.texSubImage3D(Oe,U,He,et,pt,oe,Se,De,Tt,tt,at.data):N.isCompressedArrayTexture?C.compressedTexSubImage3D(Oe,U,He,et,pt,oe,Se,De,Tt,at.data):C.texSubImage3D(Oe,U,He,et,pt,oe,Se,De,Tt,tt,at),C.pixelStorei(C.UNPACK_ROW_LENGTH,At),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,nt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Nt),C.pixelStorei(C.UNPACK_SKIP_ROWS,qn),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Wt),U===0&&N.generateMipmaps&&C.generateMipmap(Oe),he.unbindTexture()},this.initRenderTarget=function(T){fe.get(T).__webglFramebuffer===void 0&&ve.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?ve.setTextureCube(T,0):T.isData3DTexture?ve.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?ve.setTexture2DArray(T,0):ve.setTexture2D(T,0),he.unbindTexture()},this.resetState=function(){L=0,A=0,D=null,he.reset(),Fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===d1?"display-p3":"srgb",t.unpackColorSpace=rt.workingColorSpace===U0?"display-p3":"srgb"}}class Um extends qt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vn,this.environmentIntensity=1,this.environmentRotation=new Vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class $d{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Rl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=wi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return vr("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const nn=new R;class ei{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix4(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)nn.fromBufferAttribute(this,t),nn.applyNormalMatrix(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)nn.fromBufferAttribute(this,t),nn.transformDirection(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=zn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=lt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=zn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=zn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=zn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=zn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),s=lt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),s=lt(s,this.array),r=lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Kt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ei(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Co extends ss{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new je(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ir;const $r=new R,sr=new R,rr=new R,or=new be,eo=new be,eh=new ot,wa=new R,to=new R,Da=new R,W2=new be,Ec=new be,V2=new be;class p0 extends qt{constructor(e=new Co){if(super(),this.isSprite=!0,this.type="Sprite",ir===void 0){ir=new yt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new $d(t,5);ir.setIndex([0,1,2,0,2,3]),ir.setAttribute("position",new ei(i,3,0,!1)),ir.setAttribute("uv",new ei(i,2,3,!1))}this.geometry=ir,this.material=e,this.center=new be(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),sr.setFromMatrixScale(this.matrixWorld),eh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),rr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&sr.multiplyScalar(-rr.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const o=this.center;Ca(wa.set(-.5,-.5,0),rr,o,sr,s,r),Ca(to.set(.5,-.5,0),rr,o,sr,s,r),Ca(Da.set(.5,.5,0),rr,o,sr,s,r),W2.set(0,0),Ec.set(1,0),V2.set(1,1);let a=e.ray.intersectTriangle(wa,to,Da,!1,$r);if(a===null&&(Ca(to.set(-.5,.5,0),rr,o,sr,s,r),Ec.set(0,1),a=e.ray.intersectTriangle(wa,Da,to,!1,$r),a===null))return;const c=e.ray.origin.distanceTo($r);c<e.near||c>e.far||t.push({distance:c,point:$r.clone(),uv:Fn.getInterpolation($r,wa,to,Da,W2,Ec,V2,new be),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ca(n,e,t,i,s,r){or.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(eo.x=r*or.x-s*or.y,eo.y=s*or.x+r*or.y):eo.copy(or),n.copy(e),n.x+=eo.x,n.y+=eo.y,n.applyMatrix4(eh)}class Nm extends It{constructor(e=null,t=1,i=1,s,r,o,a,c,l=kt,u=kt,d,h){super(null,o,a,c,l,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class X2 extends Kt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ar=new ot,Y2=new ot,Pa=[],j2=new li,Om=new ot,no=new Dt,io=new Oi;class zm extends Dt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new X2(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Om)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new li),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ar),j2.copy(e.boundingBox).applyMatrix4(ar),this.boundingBox.union(j2)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Oi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ar),io.copy(e.boundingSphere).applyMatrix4(ar),this.boundingSphere.union(io)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=e*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(no.geometry=this.geometry,no.material=this.material,no.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),io.copy(this.boundingSphere),io.applyMatrix4(i),e.ray.intersectsSphere(io)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ar),Y2.multiplyMatrices(i,ar),no.matrixWorld=Y2,no.raycast(e,Pa);for(let o=0,a=Pa.length;o<a;o++){const c=Pa[o];c.instanceId=r,c.object=this,t.push(c)}Pa.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new X2(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Nm(new Float32Array(s*this.count),s,this.count,a1,$n));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(i,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Po extends ss{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const m0=new R,g0=new R,q2=new ot,so=new Yo,Ra=new Oi,Tc=new R,K2=new R;class v0 extends qt{constructor(e=new yt,t=new Po){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)m0.fromBufferAttribute(t,s-1),g0.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=m0.distanceTo(g0);e.setAttribute("lineDistance",new vt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ra.copy(i.boundingSphere),Ra.applyMatrix4(s),Ra.radius+=r,e.ray.intersectsSphere(Ra)===!1)return;q2.copy(s).invert(),so.copy(e.ray).applyMatrix4(q2);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let v=f,m=g-1;v<m;v+=l){const p=u.getX(v),y=u.getX(v+1),x=La(this,e,so,c,p,y);x&&t.push(x)}if(this.isLineLoop){const v=u.getX(g-1),m=u.getX(f),p=La(this,e,so,c,v,m);p&&t.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=f,m=g-1;v<m;v+=l){const p=La(this,e,so,c,v,v+1);p&&t.push(p)}if(this.isLineLoop){const v=La(this,e,so,c,g-1,f);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function La(n,e,t,i,s,r){const o=n.geometry.attributes.position;if(m0.fromBufferAttribute(o,s),g0.fromBufferAttribute(o,r),t.distanceSqToSegment(m0,g0,Tc,K2)>i)return;Tc.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Tc);if(!(c<e.near||c>e.far))return{distance:c,point:K2.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,object:n}}const Z2=new R,J2=new R;class Q2 extends v0{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Z2.fromBufferAttribute(t,s),J2.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Z2.distanceTo(J2);e.setAttribute("lineDistance",new vt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class x0 extends ss{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const $2=new ot,Il=new Yo,Ia=new Oi,Ha=new R;class Ro extends qt{constructor(e=new yt,t=new x0){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ia.copy(i.boundingSphere),Ia.applyMatrix4(s),Ia.radius+=r,e.ray.intersectsSphere(Ia)===!1)return;$2.copy(s).invert(),Il.copy(e.ray).applyMatrix4($2);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,d=i.attributes.position;if(l!==null){const h=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=h,v=f;g<v;g++){const m=l.getX(g);Ha.fromBufferAttribute(d,m),eu(Ha,m,c,s,e,t,this)}}else{const h=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=h,v=f;g<v;g++)Ha.fromBufferAttribute(d,g),eu(Ha,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function eu(n,e,t,i,s,r,o){const a=Il.distanceSqToPoint(n);if(a<t){const c=new R;Il.closestPointToPoint(n,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:o})}}class kr extends It{constructor(e,t,i,s,r,o,a,c,l){super(e,t,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class g1 extends yt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],o=[];a(s),l(i),u(),this.setAttribute("position",new vt(r,3)),this.setAttribute("normal",new vt(r.slice(),3)),this.setAttribute("uv",new vt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const x=new R,b=new R,L=new R;for(let A=0;A<t.length;A+=3)f(t[A+0],x),f(t[A+1],b),f(t[A+2],L),c(x,b,L,y)}function c(y,x,b,L){const A=L+1,D=[];for(let I=0;I<=A;I++){D[I]=[];const E=y.clone().lerp(b,I/A),S=x.clone().lerp(b,I/A),P=A-I;for(let O=0;O<=P;O++)O===0&&I===A?D[I][O]=E:D[I][O]=E.clone().lerp(S,O/P)}for(let I=0;I<A;I++)for(let E=0;E<2*(A-I)-1;E++){const S=Math.floor(E/2);E%2===0?(h(D[I][S+1]),h(D[I+1][S]),h(D[I][S])):(h(D[I][S+1]),h(D[I+1][S+1]),h(D[I+1][S]))}}function l(y){const x=new R;for(let b=0;b<r.length;b+=3)x.x=r[b+0],x.y=r[b+1],x.z=r[b+2],x.normalize().multiplyScalar(y),r[b+0]=x.x,r[b+1]=x.y,r[b+2]=x.z}function u(){const y=new R;for(let x=0;x<r.length;x+=3){y.x=r[x+0],y.y=r[x+1],y.z=r[x+2];const b=m(y)/2/Math.PI+.5,L=p(y)/Math.PI+.5;o.push(b,1-L)}g(),d()}function d(){for(let y=0;y<o.length;y+=6){const x=o[y+0],b=o[y+2],L=o[y+4],A=Math.max(x,b,L),D=Math.min(x,b,L);A>.9&&D<.1&&(x<.2&&(o[y+0]+=1),b<.2&&(o[y+2]+=1),L<.2&&(o[y+4]+=1))}}function h(y){r.push(y.x,y.y,y.z)}function f(y,x){const b=y*3;x.x=e[b+0],x.y=e[b+1],x.z=e[b+2]}function g(){const y=new R,x=new R,b=new R,L=new R,A=new be,D=new be,I=new be;for(let E=0,S=0;E<r.length;E+=9,S+=6){y.set(r[E+0],r[E+1],r[E+2]),x.set(r[E+3],r[E+4],r[E+5]),b.set(r[E+6],r[E+7],r[E+8]),A.set(o[S+0],o[S+1]),D.set(o[S+2],o[S+3]),I.set(o[S+4],o[S+5]),L.copy(y).add(x).add(b).divideScalar(3);const P=m(L);v(A,S+0,y,P),v(D,S+2,x,P),v(I,S+4,b,P)}}function v(y,x,b,L){L<0&&y.x===1&&(o[x]=y.x-1),b.x===0&&b.z===0&&(o[x]=L/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new g1(e.vertices,e.indices,e.radius,e.details)}}class v1 extends g1{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new v1(e.radius,e.detail)}}class _0 extends yt{constructor(e=.5,t=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],c=[],l=[],u=[];let d=e;const h=(t-e)/s,f=new R,g=new be;for(let v=0;v<=s;v++){for(let m=0;m<=i;m++){const p=r+m/i*o;f.x=d*Math.cos(p),f.y=d*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}d+=h}for(let v=0;v<s;v++){const m=v*(i+1);for(let p=0;p<i;p++){const y=p+m,x=y,b=y+i+1,L=y+i+2,A=y+1;a.push(x,b,A),a.push(b,L,A)}}this.setIndex(a),this.setAttribute("position",new vt(c,3)),this.setAttribute("normal",new vt(l,3)),this.setAttribute("uv",new vt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _0(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Rs extends yt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const u=[],d=new R,h=new R,f=[],g=[],v=[],m=[];for(let p=0;p<=i;p++){const y=[],x=p/i;let b=0;p===0&&o===0?b=.5/t:p===i&&c===Math.PI&&(b=-.5/t);for(let L=0;L<=t;L++){const A=L/t;d.x=-e*Math.cos(s+A*r)*Math.sin(o+x*a),d.y=e*Math.cos(o+x*a),d.z=e*Math.sin(s+A*r)*Math.sin(o+x*a),g.push(d.x,d.y,d.z),h.copy(d).normalize(),v.push(h.x,h.y,h.z),m.push(A+b,1-x),y.push(l++)}u.push(y)}for(let p=0;p<i;p++)for(let y=0;y<t;y++){const x=u[p][y+1],b=u[p][y],L=u[p+1][y],A=u[p+1][y+1];(p!==0||o>0)&&f.push(x,b,A),(p!==i-1||c<Math.PI)&&f.push(b,L,A)}this.setIndex(f),this.setAttribute("position",new vt(g,3)),this.setAttribute("normal",new vt(v,3)),this.setAttribute("uv",new vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Fm extends yt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],i=new Set,s=new R,r=new R;if(e.index!==null){const o=e.attributes.position,a=e.index;let c=e.groups;c.length===0&&(c=[{start:0,count:a.count,materialIndex:0}]);for(let l=0,u=c.length;l<u;++l){const d=c[l],h=d.start,f=d.count;for(let g=h,v=h+f;g<v;g+=3)for(let m=0;m<3;m++){const p=a.getX(g+m),y=a.getX(g+(m+1)%3);s.fromBufferAttribute(o,p),r.fromBufferAttribute(o,y),tu(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{const o=e.attributes.position;for(let a=0,c=o.count/3;a<c;a++)for(let l=0;l<3;l++){const u=3*a+l,d=3*a+(l+1)%3;s.fromBufferAttribute(o,u),r.fromBufferAttribute(o,d),tu(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new vt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function tu(n,e,t){const i=`${n.x},${n.y},${n.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${n.x},${n.y},${n.z}`;return t.has(i)===!0||t.has(s)===!0?!1:(t.add(i),t.add(s),!0)}class Bm extends _t{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Lo extends ss{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Hd,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const nu={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class km{constructor(e,t,i){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){const d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){const f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}}const Gm=new km;class x1{constructor(e){this.manager=e!==void 0?e:Gm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}x1.DEFAULT_MATERIAL_NAME="__DEFAULT";class Wm extends x1{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=nu.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=Do("img");function c(){u(),nu.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(d){u(),s&&s(d),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class _1 extends x1{constructor(e){super(e)}load(e,t,i,s){const r=new It,o=new Wm(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}}class th extends qt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Ac=new ot,iu=new R,su=new R;class Vm{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new be(512,512),this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new p1,this._frameExtents=new be(1,1),this._viewportCount=1,this._viewports=[new ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;iu.setFromMatrixPosition(e.matrixWorld),t.position.copy(iu),su.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(su),t.updateMatrixWorld(),Ac.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ac),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ac)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ru=new ot,ro=new R,wc=new R;class Xm extends Vm{constructor(){super(new Mn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new be(4,2),this._viewportCount=6,this._viewports=[new ct(2,1,1,1),new ct(0,1,1,1),new ct(3,1,1,1),new ct(1,1,1,1),new ct(3,0,1,1),new ct(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),ro.setFromMatrixPosition(e.matrixWorld),i.position.copy(ro),wc.copy(i.position),wc.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(wc),i.updateMatrixWorld(),s.makeTranslation(-ro.x,-ro.y,-ro.z),ru.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ru)}}class Ym extends th{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Xm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class jm extends th{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class qm extends yt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class Km{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ou(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=ou();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function ou(){return(typeof performance>"u"?Date:performance).now()}class Hl extends $d{constructor(e,t,i=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}const au=new ot;class nh{constructor(e,t,i=0,s=1/0){this.ray=new Yo(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new f1,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return au.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(au),this}intersectObject(e,t=!0,i=[]){return Ul(e,this,i,t),i.sort(cu),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Ul(e[s],this,i,t);return i.sort(cu),i}}function cu(n,e){return n.distance-e.distance}function Ul(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)Ul(r[o],e,t,!0)}}class lu{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(jt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const uu=new R,Ua=new R;class Zm{constructor(e=new R,t=new R){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){uu.subVectors(e,this.start),Ua.subVectors(this.end,this.start);const i=Ua.dot(Ua);let r=Ua.dot(uu)/i;return t&&(r=jt(r,0,1)),r}closestPointToPoint(e,t,i){const s=this.closestPointToPointParameter(e,t);return this.delta(i).multiplyScalar(s).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}class Jm extends Fs{constructor(e,t){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:n1}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=n1);const Ln=Date.UTC(2e3,0,1,12,0,0),ji=36525,Xn=1495978707e-1;class Qm{days;logMag=0;reversed=!1;paused=!1;constructor(e=Date.now()){this.days=(e-Ln)/864e5}get t(){return this.days}setDate(e){const t=e instanceof Date?e.getTime():e;this.days=(t-Ln)/864e5}getSpeed(){return(this.reversed?-1:1)*10**this.logMag}setLogSpeed(e){this.logMag=e}getLogSpeed(){return this.logMag}get isReversed(){return this.reversed}setReversed(e){this.reversed=e}get isPaused(){return this.paused}setPaused(e){this.paused=e}tick(e){this.paused||(this.days+=this.getSpeed()*e)}preScrubPaused=!1;beginScrub(){this.preScrubPaused=this.paused,this.paused=!0}endScrub(){this.paused=this.preScrubPaused}toDate(){return new Date(Ln+this.days*864e5)}}const ye=n=>[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255],M1={id:"sun",name:"Sun",kind:"star",radiusKm:695700,rotationHours:609.12,tiltDeg:7.25,color:ye(16765567),color2:ye(16751935),texture:"sun"},on=[{id:"mercury",name:"Mercury",kind:"planet",parent:"sun",elements:{a:.38709843,e:.20563661,i:7.00559432,node:48.33961819,peri:29.118100759999997,M0:174.79394829,n:4.09233444,rates:{a:0,e:2123e-8,i:-.00590158,node:-.12214182,peri:.28154195}},radiusKm:2439.7,rotationHours:1407.5,tiltDeg:.034,color:ye(10263708),color2:ye(7828591),texture:"rock"},{id:"venus",name:"Venus",kind:"planet",parent:"sun",elements:{a:.72332102,e:.00676399,i:3.39777545,node:76.67261496,peri:55.094942169999996,M0:50.21215136999999,n:1.60212892,rates:{a:-26e-8,e:-5107e-8,i:43494e-8,node:-.27274174,peri:.32953822}},radiusKm:6051.8,rotationHours:-5832.5,tiltDeg:177.36,color:ye(15124874),color2:ye(13215850),texture:"gas"},{id:"earth",name:"Earth",kind:"planet",parent:"sun",elements:{a:1.00000018,e:.01673163,i:-54346e-8,node:-5.11260389,peri:108.04266274,M0:-2.4631431299999917,n:.98560041,rates:{a:-3e-8,e:-3661e-8,i:-.01337178,node:-.24123856,peri:.5591911599999999}},radiusKm:6371,rotationHours:23.93,tiltDeg:23.44,color:ye(5211846),color2:ye(4160831),texture:"earth"},{id:"mars",name:"Mars",kind:"planet",parent:"sun",elements:{a:1.52371243,e:.09336511,i:1.85181869,node:49.71320984,peri:-73.63065768,M0:19.3493162,n:.52402045,rates:{a:97e-8,e:9149e-8,i:-.00724757,node:-.26852431,peri:.72076056}},radiusKm:3389.5,rotationHours:24.62,tiltDeg:25.19,color:ye(12671035),color2:ye(9387304),texture:"rock"},{id:"jupiter",name:"Jupiter",kind:"planet",parent:"sun",elements:{a:5.20248019,e:.0485359,i:1.29861416,node:100.29282654,peri:-86.0178741,M0:20.059839080000003,n:.08308615,rates:{a:-2864e-8,e:18026e-8,i:-.00322699,node:.13024619,peri:.051745769999999996},periodicM:[{b:-12452e-8,c:.0606406,s:-.35635438,f:38.35125}]},radiusKm:69911,rotationHours:9.93,tiltDeg:3.13,color:ye(14203277),color2:ye(11041872),texture:"gas"},{id:"saturn",name:"Saturn",kind:"planet",parent:"sun",elements:{a:9.54149883,e:.05550825,i:2.49424102,node:113.63998702,peri:-20.778626390000014,M0:-42.78564733999999,n:.03344485,rates:{a:-3065e-8,e:-32044e-8,i:.00451969,node:-.25015002,peri:.7919448},periodicM:[{b:25899e-8,c:-.13434469,s:.87320147,f:38.35125}]},radiusKm:58232,rotationHours:10.66,tiltDeg:26.73,color:ye(14930851),color2:ye(12560250),texture:"gas",rings:{inner:1.24,outer:2.27,opacity:.85,color:ye(13616294)}},{id:"uranus",name:"Uranus",kind:"planet",parent:"sun",elements:{a:19.18797948,e:.0468574,i:.77298127,node:73.96250215,peri:98.47154226,M0:141.76872184,n:.01172902,rates:{a:-20455e-8,e:-155e-7,i:-.00180155,node:.05739699,peri:.035272859999999996},periodicM:[{b:58331e-8,c:-.97731848,s:.17689245,f:7.67025}]},radiusKm:25362,rotationHours:-17.24,tiltDeg:97.77,color:ye(10475744),color2:ye(8176332),texture:"ice",rings:{inner:1.64,outer:2,opacity:.25,color:ye(10467520)}},{id:"neptune",name:"Neptune",kind:"planet",parent:"sun",elements:{a:30.06952752,e:.00895439,i:1.7700552,node:131.78635853,peri:-85.10477129,M0:257.54130563,n:.00598097,rates:{a:6447e-8,e:818e-8,i:224e-6,node:-.00606302,peri:.0161624},periodicM:[{b:-41348e-8,c:.68346318,s:-.10162547,f:7.67025}]},radiusKm:24622,rotationHours:16.11,tiltDeg:28.32,color:ye(4613833),color2:ye(3099294),texture:"ice"}],$m=[{id:"pluto",name:"Pluto",kind:"dwarf",parent:"sun",elements:{a:39.48211675,e:.2488273,i:17.14,node:110.299,peri:113.834,M0:14.53,n:.003964},radiusKm:1188.3,rotationHours:-153.29,tiltDeg:119.6,color:ye(12101268),color2:ye(9404270),texture:"rock"},{id:"ceres",name:"Ceres",kind:"dwarf",parent:"sun",elements:{a:2.7675,e:.0758,i:10.594,node:80.305,peri:73.597,M0:32.84,n:.21426},radiusKm:469.7,rotationHours:9.07,tiltDeg:3.8,color:ye(9211020),color2:ye(6974058),texture:"rock"},{id:"eris",name:"Eris",kind:"dwarf",parent:"sun",elements:{a:67.864,e:.436,i:44.04,node:35.95,peri:151.61,M0:235.7,n:.001763},radiusKm:1163,rotationHours:25.9,tiltDeg:26.6,color:ye(12895428),color2:ye(10132122),texture:"ice"},{id:"haumea",name:"Haumea",kind:"dwarf",parent:"sun",elements:{a:43.11,e:.1948,i:28.26,node:122.29,peri:239.75,M0:202.4,n:.003482},radiusKm:745,rotationHours:15.94,tiltDeg:0,color:ye(14210252),color2:ye(11052188),texture:"ice"},{id:"makemake",name:"Makemake",kind:"dwarf",parent:"sun",elements:{a:45.43,e:.1611,i:29,node:79.35,peri:294.2,M0:16.2,n:.003219},radiusKm:715,rotationHours:22.8,tiltDeg:0,color:ye(12884600),color2:ye(10122328),texture:"ice"}],y1=[{id:"moon",name:"Moon",kind:"moon",parent:"earth",elements:{a:384400,e:.0549,i:5.145,node:125.08,peri:318.15,M0:115.36,n:13.17635},radiusKm:1737.4,rotationHours:655.72,tiltDeg:6.68,color:ye(12434877),color2:ye(9408399),texture:"rock"},{id:"iss",name:"ISS",kind:"moon",parent:"earth",radiusKm:100,rotationHours:1.5,tiltDeg:0,color:ye(14211296),color2:ye(10132136),texture:"rock"},{id:"phobos",name:"Phobos",kind:"moon",parent:"mars",elements:{a:9376,e:.0151,i:1.075,node:318.7,peri:260,M0:140,n:1128.96},radiusKm:11.27,rotationHours:7.65,tiltDeg:1.08,color:ye(9076594),texture:"rock"},{id:"deimos",name:"Deimos",kind:"moon",parent:"mars",elements:{a:23460,e:3e-4,i:1.796,node:104.4,peri:305.6,M0:180,n:285.16},radiusKm:6.2,rotationHours:30.3,tiltDeg:1.78,color:ye(10260612),texture:"rock"},{id:"io",name:"Io",kind:"moon",parent:"jupiter",elements:{a:421700,e:.0041,i:.04,node:150.8,peri:137.3,M0:100,n:203.494},radiusKm:1821.6,rotationHours:42.46,tiltDeg:.05,color:ye(14271850),color2:ye(12092987),texture:"volcanic"},{id:"europa",name:"Europa",kind:"moon",parent:"jupiter",elements:{a:671100,e:.009,i:.47,node:124.8,peri:160.4,M0:100,n:101.375},radiusKm:1560.8,rotationHours:43.45,tiltDeg:.47,color:ye(13616302),color2:ye(10521976),texture:"ice"},{id:"ganymede",name:"Ganymede",kind:"moon",parent:"jupiter",elements:{a:1070400,e:.0013,i:.2,node:197,peri:118.5,M0:105,n:50.318},radiusKm:2634.1,rotationHours:71.94,tiltDeg:.2,color:ye(11050124),color2:ye(8221800),texture:"rock"},{id:"callisto",name:"Callisto",kind:"moon",parent:"jupiter",elements:{a:1882700,e:.0074,i:.19,node:308.5,peri:332.5,M0:35,n:21.57},radiusKm:2410.3,rotationHours:89.56,tiltDeg:.19,color:ye(8221800),color2:ye(6051405),texture:"rock"},{id:"titan",name:"Titan",kind:"moon",parent:"saturn",elements:{a:1221870,e:.0288,i:.35,node:125.8,peri:346.8,M0:100,n:22.577},radiusKm:2574.7,rotationHours:15.94,tiltDeg:.35,color:ye(14068058),color2:ye(11042364),texture:"gas"},{id:"triton",name:"Triton",kind:"moon",parent:"neptune",elements:{a:354759,e:16e-6,i:156.74,node:47.4,peri:5.4,M0:145,n:61.256},radiusKm:1353.4,rotationHours:-5.88,tiltDeg:156.74,color:ye(13156270),color2:ye(10261636),texture:"ice"},{id:"amalthea",name:"Amalthea",kind:"moon",parent:"jupiter",elements:{a:181353,e:.0761,i:.32,node:206.9,peri:271.2,M0:200,n:722.57},radiusKm:85.5,rotationHours:11.96,tiltDeg:.32,color:ye(9062970),color2:ye(7223852),texture:"rock"},{id:"himalia",name:"Himalia",kind:"moon",parent:"jupiter",elements:{a:11509150,e:.1137,i:28.57,node:96.9,peri:186,M0:100,n:2.131},radiusKm:85,rotationHours:382.7,tiltDeg:28.57,color:ye(9209984),color2:ye(6973024),texture:"rock"},{id:"enceladus",name:"Enceladus",kind:"moon",parent:"saturn",elements:{a:237948,e:.0047,i:.01,node:272.9,peri:130.8,M0:200,n:262.74},radiusKm:252.1,rotationHours:32.89,tiltDeg:.01,color:ye(15266034),color2:ye(12899544),texture:"ice"},{id:"tethys",name:"Tethys",kind:"moon",parent:"saturn",elements:{a:294600,e:1e-4,i:1.09,node:127,peri:193.8,M0:90,n:225.87},radiusKm:531.1,rotationHours:38.25,tiltDeg:1.09,color:ye(14210248),color2:ye(11841700),texture:"ice"},{id:"dione",name:"Dione",kind:"moon",parent:"saturn",elements:{a:377300,e:.0022,i:.02,node:117.3,peri:127.4,M0:200,n:131.53},radiusKm:561.4,rotationHours:65.69,tiltDeg:.02,color:ye(12631216),color2:ye(10262668),texture:"ice"},{id:"rhea",name:"Rhea",kind:"moon",parent:"saturn",elements:{a:527108,e:.0013,i:.35,node:250.4,peri:130.1,M0:100,n:79.68},radiusKm:763.8,rotationHours:108.44,tiltDeg:.35,color:ye(11578528),color2:ye(9209984),texture:"ice"},{id:"iapetus",name:"Iapetus",kind:"moon",parent:"saturn",elements:{a:3560820,e:.0286,i:15.47,node:213.9,peri:198.1,M0:200,n:4.54},radiusKm:734.5,rotationHours:1903.7,tiltDeg:15.47,color:ye(10127992),color2:ye(5129272),texture:"rock"},{id:"miranda",name:"Miranda",kind:"moon",parent:"uranus",elements:{a:129390,e:.0013,i:.1,node:180.9,peri:222.9,M0:100,n:254.69},radiusKm:235.8,rotationHours:33.92,tiltDeg:.1,color:ye(11052188),color2:ye(8683642),texture:"rock"},{id:"ariel",name:"Ariel",kind:"moon",parent:"uranus",elements:{a:190900,e:.0012,i:.26,node:169.5,peri:294.9,M0:100,n:142.86},radiusKm:578.9,rotationHours:60.48,tiltDeg:.26,color:ye(12631214),color2:ye(10263182),texture:"ice"},{id:"umbriel",name:"Umbriel",kind:"moon",parent:"uranus",elements:{a:266e3,e:.0039,i:.13,node:133.3,peri:250.7,M0:100,n:86.87},radiusKm:584.7,rotationHours:99.46,tiltDeg:.13,color:ye(7236196),color2:ye(5525578),texture:"ice"},{id:"titania",name:"Titania",kind:"moon",parent:"uranus",elements:{a:435910,e:.0011,i:.34,node:98.7,peri:290.8,M0:100,n:41.35},radiusKm:788.4,rotationHours:208.9,tiltDeg:.34,color:ye(10262156),color2:ye(8025194),texture:"ice"},{id:"oberon",name:"Oberon",kind:"moon",parent:"uranus",elements:{a:583520,e:8e-4,i:.06,node:79.3,peri:70.6,M0:100,n:26.75},radiusKm:761.4,rotationHours:323,tiltDeg:.06,color:ye(8946298),color2:ye(6709338),texture:"ice"},{id:"nereid",name:"Nereid",kind:"moon",parent:"neptune",elements:{a:5513700,e:.7482,i:7.31,node:130,peri:5.2,M0:100,n:1.1731},radiusKm:170,rotationHours:5.2,tiltDeg:7.31,color:ye(9472120),color2:ye(6972504),texture:"rock"}],Ko=[M1,...on,...$m,...y1],e7={sun:["solar","star"],moon:["luna","earth moon","the moon"],mercury:["mercury"],venus:["venus","morning star"],earth:["earth","world"],mars:["mars"],jupiter:["jupiter"],saturn:["saturn"],uranus:["uranus"],neptune:["neptune"],pluto:["pluto"],ceres:["ceres"],eris:["eris"],haumea:["haumea"],makemake:["makemake"]};function ih(n){const e=[],t=new Set,i=s=>s.name;for(const s of n)if(s.kind!=="moon"){if(s.kind==="star"){e.push({id:s.id,name:i(s),kind:s.kind,sub:"the star"}),t.add(s.id);continue}if(s.kind!=="dwarf"){e.push({id:s.id,name:i(s),kind:s.kind,sub:"planet"}),t.add(s.id);for(const r of n)r.kind!=="moon"||r.parent!==s.id||(e.push({id:r.id,name:i(r),kind:"moon",parentName:i(s),sub:`moon of ${i(s)}`}),t.add(r.id))}}for(const s of n)s.kind==="dwarf"&&!t.has(s.id)&&(e.push({id:s.id,name:i(s),kind:s.kind,parentName:"sun",sub:"dwarf planet"}),t.add(s.id));return e}const Dn=n=>n.toLowerCase().trim().replace(/\s+/g," ");function t7(n,e,t){const i=new Set;i.add(Dn(e.name)),i.add(Dn(e.kind));for(const s of e7[n]??[])i.add(Dn(s));return t&&(i.add(Dn(t)),i.add(Dn(`${e.kind} of ${t}`)),i.add(Dn(`${t} ${e.kind}`))),[...i]}function n7(n,e,t,i){const s=t7(n,e,i);let r=-1;if(t===Dn(e.name))r=100;else if(Dn(e.name).startsWith(t))r=80;else if(Dn(e.name).includes(t))r=60;else{for(const o of s)if(o.includes(t)){r=o===t?70:40;break}if(r<0)return-1}return i&&Dn(i).includes(t)&&(r+=10),r-=Dn(e.name).length/4,r}function i7(n,e){const t=Dn(e),i=ih(n);return t?i.map(r=>({e:r,s:n7(r.id,r,t,r.parentName)})).filter(r=>r.s>=0).sort((r,o)=>o.s-r.s||r.e.name.localeCompare(o.e.name)).map(r=>({id:r.e.id,name:r.e.name,kind:r.e.kind,parentName:r.e.parentName})):i.map(r=>({id:r.id,name:r.name,kind:r.kind,parentName:r.parentName}))}function O0(n,e){const t=Math.PI/180,i=n*15*t,s=e*t,r=Math.cos(s),o=r*Math.cos(i),a=r*Math.sin(i),c=Math.sin(s);return[-o,c,-a]}const tn=[{name:"Andromeda",stars:[{name:"Alpheratz",raHours:.1398,decDeg:29.0908},{name:"HIP 3092",raHours:.6554,decDeg:30.8612},{name:"Mirach",raHours:1.1622,decDeg:35.6208},{name:"Almach",raHours:2.065,decDeg:42.3298},{name:"Alfarasalkamil",raHours:23.032,decDeg:42.326},{name:"Rasalnaqa",raHours:23.6356,decDeg:43.2681},{name:"Kaffalmusalsala",raHours:23.6735,decDeg:44.334},{name:"Udkadua",raHours:23.626,decDeg:46.4592},{name:"HIP 2912",raHours:.6147,decDeg:33.7194},{name:"HIP 4436",raHours:.9459,decDeg:38.4993},{name:"HIP 3881",raHours:.8302,decDeg:41.079},{name:"Junnanmen",raHours:1.1584,decDeg:47.2418},{name:"Nembus",raHours:1.6332,decDeg:48.6285},{name:"HIP 3031",raHours:.6426,decDeg:29.3124},{name:"Shimu",raHours:.789,decDeg:24.2674},{name:"Kui",raHours:.9535,decDeg:23.4178}],lines:[[0,1],[1,2],[2,3],[4,5],[5,6],[6,7],[5,8],[8,1],[8,2],[2,9],[9,10],[10,11],[11,12],[1,13],[13,14],[14,15]]},{name:"Antlia",stars:[{name:"HIP 53502",raHours:10.9453,decDeg:-37.1375},{name:"HIP 51172",raHours:10.4525,decDeg:-31.0678},{name:"HIP 46515",raHours:9.4874,decDeg:-35.9513}],lines:[[0,1],[1,2]]},{name:"Apus",stars:[{name:"Paradys",raHours:14.7977,decDeg:-79.0447},{name:"HIP 81065",raHours:16.5576,decDeg:-78.897},{name:"HIP 80047",raHours:16.3391,decDeg:-78.6957},{name:"HIP 81852",raHours:16.7182,decDeg:-77.5166}],lines:[[0,1],[2,3],[3,1]]},{name:"Aquarius",stars:[{name:"Albali",raHours:20.7946,decDeg:-9.4957},{name:"Sadalsuud",raHours:21.526,decDeg:-5.5712},{name:"Sadalmelik",raHours:22.0964,decDeg:-.3198},{name:"Sadachbia",raHours:22.3609,decDeg:-1.3874},{name:"Sadaltager",raHours:22.4805,decDeg:-.0201},{name:"HIP 111497",raHours:22.5893,decDeg:-.1174},{name:"Seat",raHours:22.4213,decDeg:1.3774},{name:"HIP 109139",raHours:22.1073,decDeg:-13.8695},{name:"Ancha",raHours:22.2805,decDeg:-7.7832},{name:"Hydor",raHours:22.8769,decDeg:-7.5797},{name:"HIP 114724",raHours:23.2387,decDeg:-6.0485},{name:"HIP 115033",raHours:23.2984,decDeg:-9.1825},{name:"HIP 115438",raHours:23.3829,decDeg:-20.1003},{name:"Safina",raHours:23.1574,decDeg:-21.1725},{name:"Skat",raHours:22.9108,decDeg:-15.8208},{name:"HIP 112716",raHours:22.8265,decDeg:-13.5925}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[4,6],[6,2],[7,1],[2,8],[8,9],[9,10],[10,11],[11,12],[11,13],[11,14],[14,15],[15,9]]},{name:"Aquila",stars:[{name:"Alshain",raHours:19.9219,decDeg:6.4079},{name:"Altair",raHours:19.8463,decDeg:8.8674},{name:"Tarazed",raHours:19.771,decDeg:10.6133},{name:"Almizan I",raHours:19.4249,decDeg:3.1146},{name:"Al Thalimain Prior",raHours:19.1042,decDeg:-4.8823},{name:"Okab",raHours:19.0902,decDeg:13.8637},{name:"Almizan II",raHours:19.8745,decDeg:1.0057},{name:"Almizan III",raHours:20.1884,decDeg:-.8215},{name:"Deneb al Okab Borealis",raHours:18.9937,decDeg:15.0685},{name:"HIP 93429",raHours:19.028,decDeg:-5.739},{name:"Al Thalimain Posterior",raHours:19.612,decDeg:-1.2866}],lines:[[0,1],[1,2],[2,3],[3,4],[3,5],[3,6],[6,7],[8,5],[4,9],[7,10],[10,4],[4,5]]},{name:"Ara",stars:[{name:"HIP 85267",raHours:17.4232,decDeg:-56.3777},{name:"HIP 85727",raHours:17.5183,decDeg:-60.6836},{name:"HIP 82363",raHours:16.8298,decDeg:-59.0413},{name:"HIP 83081",raHours:16.977,decDeg:-55.9901},{name:"HIP 83153",raHours:16.9931,decDeg:-53.1605},{name:"HIP 85792",raHours:17.5307,decDeg:-49.876},{name:"HIP 88714",raHours:18.1105,decDeg:-50.0915},{name:"HIP 85258",raHours:17.4217,decDeg:-55.5298}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[5,7]]},{name:"Aries",stars:[{name:"Mesarthim",raHours:1.8922,decDeg:19.2941},{name:"Sheratan",raHours:1.9107,decDeg:20.8083},{name:"Hamal",raHours:2.1195,decDeg:23.4628},{name:"Bharani",raHours:2.8331,decDeg:27.2608}],lines:[[0,1],[1,2],[2,3]]},{name:"Auriga",stars:[{name:"Elnath",raHours:5.4382,decDeg:28.6079},{name:"Hassaleh",raHours:4.9499,decDeg:33.1661},{name:"Haedus",raHours:5.1086,decDeg:41.2346},{name:"Capella",raHours:5.2781,decDeg:45.999},{name:"Menkalinan",raHours:5.9922,decDeg:44.9474},{name:"Mahasim",raHours:5.9953,decDeg:37.2128},{name:"Saclateni",raHours:5.0413,decDeg:41.0759},{name:"Almaaz",raHours:5.0328,decDeg:43.8233},{name:"Prijipati",raHours:5.9921,decDeg:54.285}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[2,6],[6,7],[7,3],[3,8],[8,4]]},{name:"Boötes",stars:[{name:"Arcturus",raHours:14.2612,decDeg:19.1873},{name:"Izar",raHours:14.7498,decDeg:27.0742},{name:"Thiba",raHours:15.2584,decDeg:33.3151},{name:"Nekkar",raHours:15.0324,decDeg:40.3906},{name:"Seginus",raHours:14.5347,decDeg:38.3079},{name:"Kalasungsang",raHours:14.5305,decDeg:30.3711},{name:"Muphrid",raHours:13.9114,decDeg:18.3986},{name:"Tepiamenit",raHours:13.7878,decDeg:17.4568},{name:"HIP 71795",raHours:14.6858,decDeg:13.7283},{name:"Xuange",raHours:14.2731,decDeg:46.0879},{name:"First Donkey",raHours:14.42,decDeg:51.8517},{name:"Asellus Tertius",raHours:14.2247,decDeg:51.79}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,6],[6,7],[0,8],[4,9],[9,10],[10,11],[11,9]]},{name:"Caelum",stars:[{name:"HIP 23595",raHours:5.0734,decDeg:-35.4829},{name:"HIP 21861",raHours:4.701,decDeg:-37.1448},{name:"HIP 21770",raHours:4.6761,decDeg:-41.8636},{name:"HIP 21060",raHours:4.5139,decDeg:-44.9537}],lines:[[0,1],[1,2],[2,3]]},{name:"Camelopardalis",stars:[{name:"HIP 23040",raHours:4.9548,decDeg:53.7521},{name:"HIP 23522",raHours:5.057,decDeg:60.4423},{name:"HIP 22783",raHours:4.9008,decDeg:66.3427},{name:"Shangwei",raHours:6.3141,decDeg:69.32},{name:"Tonglingxing",raHours:7.0011,decDeg:76.9774},{name:"Shaowei",raHours:3.8393,decDeg:71.3324},{name:"Custos",raHours:3.8254,decDeg:65.526},{name:"HIP 16228",raHours:3.4845,decDeg:59.9403}],lines:[[0,1],[1,2],[2,3],[3,4],[2,5],[5,6],[6,7]]},{name:"Cancer",stars:[{name:"Acubens",raHours:8.9748,decDeg:11.8578},{name:"Asellus Australis",raHours:8.7448,decDeg:18.1549},{name:"Tarf",raHours:8.2753,decDeg:9.1857},{name:"Asellus Borealis",raHours:8.7214,decDeg:21.4686},{name:"Zubanah",raHours:8.7783,decDeg:28.76}],lines:[[0,1],[1,2],[1,3],[3,4]]},{name:"Canes Venatici",stars:[{name:"Cor Caroli",raHours:12.9338,decDeg:38.3182},{name:"Chara",raHours:12.5625,decDeg:41.3568}],lines:[[0,1]]},{name:"Canis Major",stars:[{name:"Mirzam",raHours:6.3783,decDeg:-17.9559},{name:"Sirius",raHours:6.7526,decDeg:-16.7131},{name:"Wezen",raHours:7.1399,decDeg:-26.3932},{name:"Adhara",raHours:6.9771,decDeg:-28.9721},{name:"Aludra",raHours:7.4016,decDeg:-29.3031},{name:"HIP 31592",raHours:6.6114,decDeg:-19.2557},{name:"Udra",raHours:6.9022,decDeg:-24.1842},{name:"HIP 33347",raHours:6.9356,decDeg:-17.0542},{name:"Muliphein",raHours:7.0626,decDeg:-15.6333},{name:"HIP 33160",raHours:6.9032,decDeg:-12.0386}],lines:[[0,1],[1,2],[2,3],[2,4],[0,5],[5,6],[6,3],[1,7],[7,8],[8,9],[9,7]]},{name:"Canis Minor",stars:[{name:"Procyon",raHours:7.6551,decDeg:5.2275},{name:"Gomeisa",raHours:7.4525,decDeg:8.2894}],lines:[[0,1]]},{name:"Capricornus",stars:[{name:"Algedi",raHours:20.3009,decDeg:-12.5449},{name:"Dabih",raHours:20.3502,decDeg:-14.7814},{name:"HIP 102485",raHours:20.7683,decDeg:-25.2705},{name:"HIP 102978",raHours:20.8637,decDeg:-26.9191},{name:"HIP 105881",raHours:21.4445,decDeg:-22.4114},{name:"HIP 106723",raHours:21.618,decDeg:-19.466},{name:"Deneb Algedi",raHours:21.784,decDeg:-16.1266},{name:"Nashira",raHours:21.6682,decDeg:-16.6623},{name:"Udang",raHours:21.0991,decDeg:-17.2327}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,0]]},{name:"Carina",stars:[{name:"Canopus",raHours:6.3992,decDeg:-52.6957},{name:"Miaplacidus",raHours:9.2201,decDeg:-69.7175},{name:"HIP 50099",raHours:10.229,decDeg:-70.0379},{name:"HIP 52419",raHours:10.716,decDeg:-64.3945},{name:"HIP 51576",raHours:10.5337,decDeg:-61.6854},{name:"HIP 50371",raHours:10.2847,decDeg:-61.3323},{name:"Aspidiske",raHours:9.2848,decDeg:-59.2753},{name:"Alsephina",raHours:8.7451,decDeg:-54.7086},{name:"HIP 53253",raHours:10.8915,decDeg:-58.8533},{name:"HIP 54301",raHours:11.109,decDeg:-62.4241},{name:"HIP 54751",raHours:11.21,decDeg:-60.3176},{name:"HIP 54463",raHours:11.1432,decDeg:-58.975},{name:"Avior",raHours:8.3752,decDeg:-59.5095},{name:"HIP 38827",raHours:7.9463,decDeg:-52.9824},{name:"Regor",raHours:8.1589,decDeg:-47.3366}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[4,8],[3,9],[9,10],[10,11],[11,8],[6,12],[12,13],[13,14]]},{name:"Cassiopeia",stars:[{name:"Caph",raHours:.1528,decDeg:59.1502},{name:"Schedar",raHours:.6751,decDeg:56.5374},{name:"Navi",raHours:.9451,decDeg:60.7167},{name:"Ruchbah",raHours:1.4302,decDeg:60.2354},{name:"Segin",raHours:1.9066,decDeg:63.6701}],lines:[[0,1],[1,2],[2,3],[3,4]]},{name:"Centaurus",stars:[{name:"Muhlifain",raHours:12.692,decDeg:-48.9599},{name:"HIP 66657",raHours:13.6648,decDeg:-53.4664},{name:"Hadar",raHours:14.0637,decDeg:-60.373},{name:"Rigil Kentaurus",raHours:14.6614,decDeg:-60.8351},{name:"Alnair",raHours:13.9257,decDeg:-47.2883},{name:"HIP 68282",raHours:13.978,decDeg:-44.8035},{name:"HIP 68245",raHours:13.9712,decDeg:-42.1007},{name:"HIP 71352",raHours:14.5918,decDeg:-42.1577},{name:"HIP 68862",raHours:14.1008,decDeg:-41.1796},{name:"HIP 70090",raHours:14.3426,decDeg:-37.8853},{name:"Menkent",raHours:14.1115,decDeg:-36.3687},{name:"Heng",raHours:13.8251,decDeg:-41.6877},{name:"HIP 55425",raHours:11.3501,decDeg:-54.491},{name:"HIP 59196",raHours:12.1393,decDeg:-50.7224},{name:"HIP 60823",raHours:12.4673,decDeg:-50.2306},{name:"HIP 59449",raHours:12.1942,decDeg:-52.3684},{name:"HIP 56243",raHours:11.5295,decDeg:-59.4421},{name:"HIP 65936",raHours:13.5174,decDeg:-39.4073},{name:"Kulou",raHours:13.3434,decDeg:-36.7121},{name:"HIP 61789",raHours:12.6646,decDeg:-39.9872},{name:"HIP 73334",raHours:14.986,decDeg:-42.1041}],lines:[[0,1],[1,2],[2,3],[1,4],[4,0],[4,5],[5,6],[6,7],[6,8],[8,9],[9,10],[10,11],[11,4],[12,13],[13,14],[14,0],[14,15],[15,16],[11,17],[17,18],[18,19],[7,20]]},{name:"Cepheus",stars:[{name:"Kabalfird",raHours:20.7548,decDeg:61.8368},{name:"Alderamin",raHours:21.3096,decDeg:62.5855},{name:"Alfirk",raHours:21.4777,decDeg:70.5607},{name:"HIP 112724",raHours:22.828,decDeg:66.2007},{name:"Errai",raHours:23.6558,decDeg:77.632},{name:"HIP 110991",raHours:22.4862,decDeg:58.4152},{name:"HIP 109492",raHours:22.1809,decDeg:58.2012},{name:"HIP 109857",raHours:22.2505,decDeg:57.0435},{name:"The Garnet Star",raHours:21.7251,decDeg:58.7801},{name:"Al Kidr",raHours:20.493,decDeg:62.9941}],lines:[[0,1],[1,2],[2,3],[2,4],[4,3],[3,5],[5,6],[6,7],[7,8],[8,1],[9,0]]},{name:"Cetus",stars:[{name:"Kaffaljidhma",raHours:2.7217,decDeg:3.2362},{name:"Menkar",raHours:3.038,decDeg:4.0899},{name:"Menkar (13954)",raHours:2.9952,decDeg:8.9074},{name:"Al Kaff al Jidhmah IV",raHours:2.749,decDeg:10.1142},{name:"Al Kaff al Jidhmah II",raHours:2.4693,decDeg:8.4601},{name:"Al Kaff al Jidhmah III",raHours:2.658,decDeg:.3285},{name:"Mira",raHours:2.3224,decDeg:-2.9771},{name:"Baten Kaitos",raHours:1.8577,decDeg:-10.3349},{name:"Al Naymat II",raHours:1.7348,decDeg:-15.9396},{name:"Diphda",raHours:.7265,decDeg:-17.9867},{name:"Deneb Kaitos Shemali",raHours:.3238,decDeg:-8.8238},{name:"Dheneb",raHours:1.1431,decDeg:-10.1819},{name:"Al Naymat I",raHours:1.4004,decDeg:-8.1828}],lines:[[0,1],[1,2],[2,3],[3,4],[4,0],[0,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,7]]},{name:"Chamaeleon",stars:[{name:"HIP 40702",raHours:8.3087,decDeg:-76.92},{name:"HIP 51839",raHours:10.5912,decDeg:-78.6078},{name:"HIP 52633",raHours:10.7631,decDeg:-80.5402},{name:"HIP 60000",raHours:12.3058,decDeg:-79.3123},{name:"HIP 58484",raHours:11.9938,decDeg:-78.2218}],lines:[[0,1],[1,2],[2,3],[3,4],[4,1]]},{name:"Circinus",stars:[{name:"HIP 74824",raHours:15.2919,decDeg:-58.8009},{name:"Xami",raHours:14.7085,decDeg:-64.9746},{name:"HIP 75323",raHours:15.3896,decDeg:-59.3207}],lines:[[0,1],[1,2]]},{name:"Columba",stars:[{name:"Phact",raHours:5.6608,decDeg:-34.074},{name:"Wazn",raHours:5.8493,decDeg:-35.7693},{name:"HIP 25859",raHours:5.5202,decDeg:-35.4704},{name:"HIP 28328",raHours:5.9858,decDeg:-42.8151},{name:"HIP 28199",raHours:5.9589,decDeg:-35.2833},{name:"HIP 30277",raHours:6.3686,decDeg:-33.4363}],lines:[[0,1],[2,0],[3,1],[1,4],[4,5]]},{name:"Coma Berenices",stars:[{name:"Diadem",raHours:13.1665,decDeg:17.5291},{name:"HIP 64394",raHours:13.198,decDeg:27.876},{name:"Al Dafirah",raHours:12.449,decDeg:28.2686}],lines:[[0,1],[1,2]]},{name:"Corona Australis",stars:[{name:"HIP 93825",raHours:19.107,decDeg:-37.0628},{name:"Meridiana",raHours:19.1579,decDeg:-37.9042},{name:"HIP 94160",raHours:19.1672,decDeg:-39.3407},{name:"HIP 94005",raHours:19.1391,decDeg:-40.4966},{name:"HIP 90982",raHours:18.5584,decDeg:-42.3125}],lines:[[0,1],[1,2],[2,3],[3,4]]},{name:"Corona Borealis",stars:[{name:"Guansuo",raHours:15.5488,decDeg:31.3592},{name:"Nusakan",raHours:15.4638,decDeg:29.1055},{name:"Alphecca",raHours:15.5781,decDeg:26.7149},{name:"Baltesha",raHours:15.7124,decDeg:26.2955},{name:"Matrichakra",raHours:15.8266,decDeg:26.0685},{name:"HIP 78159",raHours:15.9598,decDeg:26.878},{name:"Aurwandilsta",raHours:16.0241,decDeg:29.8511}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]]},{name:"Corvus",stars:[{name:"Algorab",raHours:12.4978,decDeg:-16.5151},{name:"Gienah",raHours:12.2635,decDeg:-17.542},{name:"Minkar",raHours:12.1688,decDeg:-22.6198},{name:"Kraz",raHours:12.5731,decDeg:-23.3966},{name:"Alchiba",raHours:12.1402,decDeg:-24.7288}],lines:[[0,1],[1,2],[2,3],[3,0],[2,4]]},{name:"Crater",stars:[{name:"Alkes",raHours:10.9963,decDeg:-18.2991},{name:"Al Sharasif",raHours:11.1943,decDeg:-22.8256},{name:"HIP 55705",raHours:11.4147,decDeg:-17.684},{name:"HIP 57283",raHours:11.746,decDeg:-18.3506},{name:"HIP 58188",raHours:11.9336,decDeg:-17.1508},{name:"HIP 55282",raHours:11.3224,decDeg:-14.779},{name:"HIP 55687",raHours:11.4102,decDeg:-10.8594},{name:"HIP 56633",raHours:11.6114,decDeg:-9.8023}],lines:[[0,1],[1,2],[2,3],[3,4],[2,5],[5,6],[6,7],[5,0]]},{name:"Crux",stars:[{name:"Acrux",raHours:12.4433,decDeg:-63.0991},{name:"Gacrux",raHours:12.5194,decDeg:-57.1126},{name:"Mimosa",raHours:12.7954,decDeg:-59.6887},{name:"Imai",raHours:12.2524,decDeg:-58.7489}],lines:[[0,1],[2,3]]},{name:"Cygnus",stars:[{name:"Deneb",raHours:20.6905,decDeg:45.2803},{name:"Sadr",raHours:20.3705,decDeg:40.2567},{name:"Aljanah",raHours:20.7701,decDeg:33.9695},{name:"Albireo",raHours:19.512,decDeg:27.9597},{name:"Fawaris",raHours:19.7496,decDeg:45.1307},{name:"HIP 95853",raHours:19.4951,decDeg:51.7295},{name:"Fawaris I",raHours:19.285,decDeg:53.3682},{name:"HIP 99848",raHours:20.2579,decDeg:47.7142},{name:"HIP 103413",raHours:20.9529,decDeg:41.1672},{name:"Fawaris III",raHours:21.2156,decDeg:30.2271}],lines:[[0,1],[1,2],[1,3],[1,4],[4,5],[5,6],[5,7],[7,0],[0,8],[8,9],[9,2]]},{name:"Delphinus",stars:[{name:"Aldulfin",raHours:20.5535,decDeg:11.3033},{name:"Rotanev",raHours:20.6258,decDeg:14.5952},{name:"Sualocin",raHours:20.6606,decDeg:15.9121},{name:"Al Salib",raHours:20.7776,decDeg:16.1248},{name:"Al Ukud",raHours:20.7243,decDeg:15.0747}],lines:[[0,1],[1,2],[2,3],[3,4],[4,1]]},{name:"Dorado",stars:[{name:"HIP 19893",raHours:4.2671,decDeg:-51.4871},{name:"HIP 21281",raHours:4.5666,decDeg:-55.045},{name:"HIP 23693",raHours:5.0919,decDeg:-57.473},{name:"HIP 26069",raHours:5.5604,decDeg:-62.4899},{name:"HIP 27100",raHours:5.7462,decDeg:-65.7355},{name:"HIP 27890",raHours:5.9016,decDeg:-63.091}],lines:[[0,1],[1,2],[2,3],[3,1],[3,4],[4,5],[5,3]]},{name:"Draco",stars:[{name:"Giausar",raHours:11.5234,decDeg:69.3311},{name:"HIP 61281",raHours:12.5581,decDeg:69.7882},{name:"Thuban",raHours:14.0732,decDeg:64.3758},{name:"Edasich",raHours:15.4155,decDeg:58.966},{name:"HIP 78527",raHours:16.0316,decDeg:58.5644},{name:"Athebyne",raHours:16.3999,decDeg:61.5141},{name:"Aldhibah",raHours:17.1465,decDeg:65.7146},{name:"Aldhiba",raHours:18.346,decDeg:71.3377},{name:"Alahakan",raHours:18.3506,decDeg:72.7337},{name:"Altais",raHours:19.2092,decDeg:67.6613},{name:"Tyl",raHours:19.8028,decDeg:70.2678},{name:"Grumium",raHours:17.8921,decDeg:56.8725},{name:"Kuma",raHours:17.5377,decDeg:55.1728},{name:"Rastaban",raHours:17.5072,decDeg:52.3014},{name:"Eltanin",raHours:17.9434,decDeg:51.489}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[7,9],[9,10],[9,11],[11,12],[12,13],[13,14],[14,11]]},{name:"Equuleus",stars:[{name:"Kitalpha",raHours:21.2637,decDeg:5.2481},{name:"HIP 104858",raHours:21.2413,decDeg:10.0077},{name:"HIP 104521",raHours:21.1724,decDeg:10.1319}],lines:[[0,1],[1,2]]},{name:"Eridanus",stars:[{name:"Cursa",raHours:5.1308,decDeg:-5.0863},{name:"HIP 22109",raHours:4.7584,decDeg:-3.2546},{name:"HIP 21444",raHours:4.6053,decDeg:-3.3524},{name:"Beid",raHours:4.1978,decDeg:-6.8378},{name:"Zaurak",raHours:3.9671,decDeg:-13.5082},{name:"HIP 17593",raHours:3.769,decDeg:-12.1017},{name:"Rana",raHours:3.7208,decDeg:-9.7652},{name:"Ran",raHours:3.549,decDeg:-9.4583},{name:"Azha",raHours:2.9404,decDeg:-8.8976},{name:"Sadr al Kaitos IV",raHours:2.7354,decDeg:-13.8587},{name:"HIP 12843",raHours:2.7517,decDeg:-18.5727},{name:"HIP 14146",raHours:3.0399,decDeg:-23.6243},{name:"HIP 15474",raHours:3.3253,decDeg:-21.7579},{name:"HIP 16611",raHours:3.5631,decDeg:-21.6328},{name:"HIP 17651",raHours:3.7808,decDeg:-23.2484},{name:"HIP 18216",raHours:3.8952,decDeg:-24.6122},{name:"HIP 18673",raHours:3.9987,decDeg:-24.0163},{name:"Beemim",raHours:4.5585,decDeg:-29.7658},{name:"Theemin",raHours:4.5925,decDeg:-30.5623},{name:"Beemim (20535)",raHours:4.4006,decDeg:-34.017},{name:"Beemim I",raHours:4.2982,decDeg:-33.7983},{name:"HIP 17874",raHours:3.8242,decDeg:-36.2001},{name:"HIP 16870",raHours:3.6182,decDeg:-40.2745},{name:"HIP 15510",raHours:3.3315,decDeg:-43.0715},{name:"Acamar",raHours:2.971,decDeg:-40.3047},{name:"HIP 12486",raHours:2.6778,decDeg:-39.8553},{name:"HIP 12413",raHours:2.6633,decDeg:-42.8916},{name:"HIP 11407",raHours:2.4498,decDeg:-47.7038},{name:"HIP 9007",raHours:1.9325,decDeg:-51.6096},{name:"Achernar",raHours:1.6285,decDeg:-57.2367}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],[17,18],[18,19],[19,20],[20,21],[21,22],[22,23],[23,24],[24,25],[25,26],[26,27],[27,28],[28,29]]},{name:"Fornax",stars:[{name:"Dalim",raHours:3.2012,decDeg:-28.9891},{name:"HIP 13147",raHours:2.8182,decDeg:-32.4063},{name:"HIP 9677",raHours:2.0748,decDeg:-29.2968}],lines:[[0,1],[1,2]]},{name:"Gemini",stars:[{name:"Alzirr",raHours:6.7548,decDeg:12.8961},{name:"HIP 35350",raHours:7.3016,decDeg:16.5405},{name:"Wasat",raHours:7.3354,decDeg:21.9823},{name:"Mekbuda",raHours:7.0685,decDeg:20.5703},{name:"Alhena",raHours:6.6285,decDeg:16.3994},{name:"HIP 36962",raHours:7.5987,decDeg:26.896},{name:"HIP 37740",raHours:7.7408,decDeg:24.3981},{name:"Pollux",raHours:7.7554,decDeg:28.0263},{name:"HIP 36046",raHours:7.4288,decDeg:27.7983},{name:"HIP 34693",raHours:7.1857,decDeg:30.2453},{name:"Castor",raHours:7.5767,decDeg:31.8886},{name:"HIP 33018",raHours:6.8798,decDeg:33.9614},{name:"Mebsuta",raHours:6.7322,decDeg:25.1312},{name:"Nucatai",raHours:6.4827,decDeg:20.2122},{name:"Tejat",raHours:6.3827,decDeg:22.5139},{name:"Propus",raHours:6.248,decDeg:22.5068},{name:"HIP 28734",raHours:6.0687,decDeg:23.2636}],lines:[[0,1],[1,2],[2,3],[3,4],[2,5],[5,6],[5,7],[5,8],[8,9],[9,10],[9,11],[9,12],[12,13],[12,14],[14,15],[15,16]]},{name:"Grus",stars:[{name:"Aldhanab",raHours:21.8988,decDeg:-37.3648},{name:"HIP 109111",raHours:22.1019,decDeg:-39.543},{name:"HIP 110997",raHours:22.4878,decDeg:-43.4956},{name:"Alnair",raHours:22.1372,decDeg:-46.9606},{name:"Tiaki",raHours:22.7111,decDeg:-46.8846},{name:"HIP 112623",raHours:22.8092,decDeg:-51.3167},{name:"HIP 113638",raHours:23.0147,decDeg:-52.7541}],lines:[[0,1],[1,2],[2,3],[3,4],[4,2],[4,5],[5,6]]},{name:"Hercules",stars:[{name:"Sarin",raHours:17.2505,decDeg:24.8396},{name:"Rasalgethi",raHours:17.2441,decDeg:14.3903},{name:"Kornephoros",raHours:16.5037,decDeg:21.4896},{name:"Nasak Shamiya III",raHours:16.3653,decDeg:19.153},{name:"Tianji",raHours:16.6882,decDeg:31.6019},{name:"Khepdenreret",raHours:17.0048,decDeg:30.9263},{name:"HIP 81833",raHours:16.7149,decDeg:38.9225},{name:"HIP 81126",raHours:16.5684,decDeg:42.4369},{name:"Asuusiha",raHours:16.329,decDeg:46.3133},{name:"Nuchuang",raHours:17.2508,decDeg:36.8092},{name:"HIP 85112",raHours:17.3947,decDeg:37.1459},{name:"HIP 87808",raHours:17.9375,decDeg:37.2505},{name:"Tianbang",raHours:17.6577,decDeg:46.0063},{name:"Maasym",raHours:17.5123,decDeg:26.1106},{name:"HIP 86974",raHours:17.7744,decDeg:27.7225},{name:"HIP 87933",raHours:17.9627,decDeg:29.2479},{name:"HIP 88794",raHours:18.1257,decDeg:28.7625},{name:"HIP 77760",raHours:15.8778,decDeg:42.45},{name:"HIP 79101",raHours:16.1462,decDeg:44.9348},{name:"Cujam",raHours:16.4236,decDeg:14.0334},{name:"HIP 81008",raHours:16.5434,decDeg:11.4882}],lines:[[0,1],[1,2],[2,3],[2,4],[4,5],[4,6],[6,7],[7,8],[6,9],[9,10],[10,11],[11,12],[9,5],[5,0],[0,13],[13,14],[14,15],[15,16],[17,18],[18,8],[3,19],[19,20]]},{name:"Horologium",stars:[{name:"HIP 19747",raHours:4.2334,decDeg:-42.2939},{name:"HIP 12653",raHours:2.7092,decDeg:-50.8008},{name:"HIP 12225",raHours:2.6234,decDeg:-52.5431},{name:"HIP 12484",raHours:2.6777,decDeg:-54.5499},{name:"HIP 14240",raHours:3.0603,decDeg:-59.7376},{name:"HIP 13884",raHours:2.9799,decDeg:-64.0713}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5]]},{name:"Hydra",stars:[{name:"Minazal IV",raHours:8.8072,decDeg:5.8379},{name:"Minazal II",raHours:8.7204,decDeg:3.3987},{name:"Minchir",raHours:8.646,decDeg:3.3415},{name:"Minazal I",raHours:8.6276,decDeg:5.7038},{name:"Ashlesha",raHours:8.7796,decDeg:6.4189},{name:"Minazal V",raHours:8.9232,decDeg:5.9455},{name:"HIP 45336",raHours:9.2394,decDeg:2.315},{name:"Ukdah",raHours:9.6643,decDeg:-1.1427},{name:"Alphard",raHours:9.4598,decDeg:-8.6587},{name:"Zhang",raHours:9.858,decDeg:-14.8465},{name:"HIP 49402",raHours:10.0854,decDeg:-13.0647},{name:"HIP 49841",raHours:10.1765,decDeg:-12.3538},{name:"HIP 51069",raHours:10.4349,decDeg:-16.8361},{name:"HIP 52943",raHours:10.8271,decDeg:-16.1941},{name:"Alkes",raHours:10.9963,decDeg:-18.2991},{name:"Al Sharasif",raHours:11.1943,decDeg:-22.8256},{name:"HIP 56343",raHours:11.5501,decDeg:-31.8575},{name:"HIP 57936",raHours:11.8818,decDeg:-33.9081},{name:"Naga",raHours:13.3153,decDeg:-23.1714},{name:"HIP 68895",raHours:14.1062,decDeg:-26.682},{name:"Solitaire",raHours:14.8382,decDeg:-27.9602}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[15,16],[16,17],[17,18],[18,19],[19,20]]},{name:"Hydrus",stars:[{name:"HIP 2021",raHours:.4276,decDeg:-77.255},{name:"HIP 17678",raHours:3.7873,decDeg:-74.2392},{name:"HIP 11001",raHours:2.3625,decDeg:-68.6594},{name:"HIP 9236",raHours:1.9794,decDeg:-61.5699}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Indus",stars:[{name:"HIP 103227",raHours:20.9135,decDeg:-58.4541},{name:"HIP 102333",raHours:20.7339,decDeg:-51.9208},{name:"Persian",raHours:20.6261,decDeg:-47.2917},{name:"HIP 105319",raHours:21.3311,decDeg:-53.4493},{name:"HIP 108431",raHours:21.9653,decDeg:-54.9926}],lines:[[0,1],[1,2],[2,3],[3,4],[4,0]]},{name:"Lacerta",stars:[{name:"HIP 111022",raHours:22.4922,decDeg:47.7069},{name:"Stellio",raHours:22.5215,decDeg:50.2824},{name:"HIP 110538",raHours:22.3927,decDeg:52.2295},{name:"HIP 110609",raHours:22.4086,decDeg:49.4764},{name:"HIP 110351",raHours:22.3504,decDeg:46.5366},{name:"HIP 111104",raHours:22.5081,decDeg:43.1234},{name:"HIP 111944",raHours:22.6752,decDeg:44.2763},{name:"HIP 109754",raHours:22.2313,decDeg:39.7149},{name:"HIP 109937",raHours:22.2662,decDeg:37.7487}],lines:[[0,1],[1,2],[2,3],[3,0],[0,4],[4,5],[5,6],[6,0],[5,7],[7,8]]},{name:"Leo",stars:[{name:"Regulus",raHours:10.1396,decDeg:11.9672},{name:"Al Jabhah",raHours:10.1222,decDeg:16.7627},{name:"Algieba",raHours:10.3328,decDeg:19.8419},{name:"Adhafera",raHours:10.2782,decDeg:23.4173},{name:"Rasalas",raHours:9.8794,decDeg:26.0071},{name:"Algenubi",raHours:9.7642,decDeg:23.7743},{name:"Zosma",raHours:11.2351,decDeg:20.524},{name:"Denebola",raHours:11.8177,decDeg:14.5723},{name:"Chertan",raHours:11.2373,decDeg:15.4298},{name:"Al Minlear al Asad",raHours:9.4109,decDeg:26.1824},{name:"Alterf",raHours:9.5287,decDeg:22.9681},{name:"Tsze Tseang",raHours:11.3987,decDeg:10.5297},{name:"HIP 55434",raHours:11.3523,decDeg:6.0294}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[2,6],[6,7],[7,8],[8,6],[8,1],[4,9],[9,10],[10,5],[5,1],[8,11],[11,12]]},{name:"Leo Minor",stars:[{name:"HIP 46952",raHours:9.5704,decDeg:36.3976},{name:"HIP 49593",raHours:10.1238,decDeg:35.2447},{name:"HIP 51233",raHours:10.4647,decDeg:36.7075},{name:"Praecipua",raHours:10.8885,decDeg:34.2156},{name:"HIP 51056",raHours:10.4319,decDeg:33.7963}],lines:[[0,1],[1,2],[2,3],[3,4],[4,1]]},{name:"Lepus",stars:[{name:"Ping",raHours:5.091,decDeg:-22.3709},{name:"Bade",raHours:5.2155,decDeg:-16.2054},{name:"Arneb",raHours:5.5455,decDeg:-17.8223},{name:"Nihal",raHours:5.4708,decDeg:-20.7592},{name:"HIP 24845",raHours:5.3263,decDeg:-13.1768},{name:"HIP 24327",raHours:5.2205,decDeg:-12.9413},{name:"Kursi al Jabbar",raHours:5.7411,decDeg:-22.4475},{name:"Arsh al Jauzah",raHours:5.8553,decDeg:-20.8775},{name:"HIP 28910",raHours:6.1026,decDeg:-14.9353},{name:"HIP 28103",raHours:5.9401,decDeg:-14.168},{name:"Darlugal",raHours:5.7826,decDeg:-14.8219}],lines:[[0,1],[1,2],[2,3],[3,0],[4,1],[1,5],[3,6],[6,7],[7,8],[8,9],[9,10],[10,2]]},{name:"Libra",stars:[{name:"Zubenelgenubi",raHours:14.848,decDeg:-16.0416},{name:"Zubeneschamali",raHours:15.2835,decDeg:-9.3829},{name:"Brachium",raHours:15.0679,decDeg:-25.2819},{name:"Zubenelhakrabi",raHours:15.5921,decDeg:-14.7896},{name:"HIP 76470",raHours:15.6171,decDeg:-28.1351},{name:"HIP 76600",raHours:15.6443,decDeg:-29.7777}],lines:[[0,1],[0,2],[1,3],[3,0],[3,4],[4,5]]},{name:"Lupus",stars:[{name:"Uridim",raHours:14.6988,decDeg:-47.3881},{name:"HIP 74395",raHours:15.2048,decDeg:-52.0991},{name:"HIP 75264",raHours:15.378,decDeg:-44.6896},{name:"HIP 76297",raHours:15.5857,decDeg:-41.1667},{name:"HIP 75141",raHours:15.3562,decDeg:-40.6475},{name:"HIP 73273",raHours:14.9755,decDeg:-43.1339},{name:"HIP 78384",raHours:16.002,decDeg:-38.3966},{name:"HIP 75177",raHours:15.3635,decDeg:-36.2612},{name:"HIP 77634",raHours:15.8493,decDeg:-33.6271}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[3,6],[6,7],[7,8],[8,6],[6,1]]},{name:"Lynx",stars:[{name:"HIP 45860",raHours:9.351,decDeg:34.3925},{name:"HIP 45688",raHours:9.3141,decDeg:36.8029},{name:"HIP 44700",raHours:9.1088,decDeg:38.4523},{name:"HIP 44248",raHours:9.0108,decDeg:41.7834},{name:"Alsciaukat",raHours:8.3806,decDeg:43.1884},{name:"HIP 36145",raHours:7.4452,decDeg:49.2116},{name:"HIP 33449",raHours:6.9546,decDeg:58.4231},{name:"HIP 30060",raHours:6.3271,decDeg:59.0109}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]},{name:"Lyra",stars:[{name:"Vega",raHours:18.6156,decDeg:38.783},{name:"Double Double I",raHours:18.739,decDeg:39.67},{name:"Nasr Alwaki I",raHours:18.7462,decDeg:37.6051},{name:"Jiantai",raHours:18.9084,decDeg:36.8986},{name:"Sulafat",raHours:18.9824,decDeg:32.6896},{name:"Sheliak",raHours:18.8347,decDeg:33.3627}],lines:[[0,1],[1,2],[2,0],[2,3],[3,4],[4,5],[5,2]]},{name:"Mensa",stars:[{name:"Hoerikwaggo",raHours:6.1706,decDeg:-74.7525},{name:"HIP 23467",raHours:5.0453,decDeg:-71.3143}],lines:[[0,1]]},{name:"Microscopium",stars:[{name:"HIP 102831",raHours:20.8328,decDeg:-33.7797},{name:"HIP 102989",raHours:20.8663,decDeg:-33.178}],lines:[[0,1]]},{name:"Monoceros",stars:[{name:"HIP 31978",raHours:6.683,decDeg:9.8958},{name:"HIP 31216",raHours:6.5484,decDeg:7.333},{name:"HIP 30419",raHours:6.3961,decDeg:4.5928},{name:"HIP 32578",raHours:6.7977,decDeg:2.4122},{name:"HIP 34769",raHours:7.1977,decDeg:-.4928},{name:"HIP 30867",raHours:6.4803,decDeg:-7.0331},{name:"HIP 29651",raHours:6.2476,decDeg:-6.2747},{name:"HIP 39863",raHours:8.1432,decDeg:-2.9838},{name:"HIP 37447",raHours:7.6875,decDeg:-9.5511}],lines:[[0,1],[1,2],[2,3],[3,1],[3,4],[4,5],[5,6],[4,7],[7,8]]},{name:"Musca",stars:[{name:"HIP 57363",raHours:11.7602,decDeg:-66.7288},{name:"HIP 59929",raHours:12.293,decDeg:-67.9607},{name:"HIP 61585",raHours:12.6197,decDeg:-69.1355},{name:"HIP 62322",raHours:12.7714,decDeg:-68.1081},{name:"HIP 63613",raHours:13.0377,decDeg:-71.5488},{name:"HIP 61199",raHours:12.5411,decDeg:-72.133}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,2]]},{name:"Norma",stars:[{name:"HIP 78639",raHours:16.0536,decDeg:-49.2297},{name:"HIP 80000",raHours:16.3307,decDeg:-50.1554},{name:"Yaqana",raHours:16.4531,decDeg:-47.5547},{name:"HIP 78914",raHours:16.1082,decDeg:-45.1733}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Octans",stars:[{name:"HIP 70638",raHours:14.4488,decDeg:-83.6679},{name:"HIP 107089",raHours:21.6912,decDeg:-77.3895},{name:"HIP 112405",raHours:22.7677,decDeg:-81.3816}],lines:[[0,1],[1,2],[2,0]]},{name:"Ophiuchus",stars:[{name:"Rasalhague",raHours:17.5822,decDeg:12.5606},{name:"HIP 83000",raHours:16.9612,decDeg:9.3751},{name:"Marfik",raHours:16.5152,decDeg:1.9841},{name:"Yed Prior",raHours:16.2391,decDeg:-3.694},{name:"Yed Posterior",raHours:16.3053,decDeg:-4.6926},{name:"HIP 80628",raHours:16.4634,decDeg:-8.3717},{name:"Saik",raHours:16.6193,decDeg:-10.5672},{name:"Sabik",raHours:17.173,decDeg:-15.7251},{name:"Cebalrai",raHours:17.7245,decDeg:4.5669},{name:"Muliphen",raHours:17.7982,decDeg:2.7075},{name:"HIP 88048",raHours:17.9838,decDeg:-9.7733},{name:"Garafsa",raHours:17.3668,decDeg:-24.9995},{name:"HIP 85423",raHours:17.4559,decDeg:-29.8667},{name:"HIP 80894",raHours:16.519,decDeg:-16.6126},{name:"HIP 80569",raHours:16.4504,decDeg:-18.4562},{name:"HIP 80343",raHours:16.4017,decDeg:-20.0372},{name:"HIP 80473",raHours:16.4264,decDeg:-23.4471}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[1,6],[6,7],[7,8],[8,9],[9,10],[8,0],[7,11],[11,12],[6,13],[13,14],[14,15],[15,16]]},{name:"Orion",stars:[{name:"Betelgeuse",raHours:5.9195,decDeg:7.407},{name:"Alnitak",raHours:5.6793,decDeg:-1.9426},{name:"Saiph",raHours:5.7959,decDeg:-9.6696},{name:"Alnilam",raHours:5.6036,decDeg:-1.2019},{name:"Mintaka",raHours:5.5334,decDeg:-.2991},{name:"Bellatrix",raHours:5.4189,decDeg:6.3497},{name:"Saif al Jabbar",raHours:5.4079,decDeg:-2.3971},{name:"Rigel",raHours:5.2423,decDeg:-8.2016},{name:"Meissa",raHours:5.5856,decDeg:9.9342},{name:"HIP 23607",raHours:5.0761,decDeg:15.4042},{name:"Al Kumm II",raHours:4.9395,decDeg:13.5146},{name:"Al Taj IV",raHours:4.9149,decDeg:10.1511},{name:"Al Taj I",raHours:4.8435,decDeg:8.9003},{name:"Tabit",raHours:4.8306,decDeg:6.9612},{name:"Al Taj II",raHours:4.8534,decDeg:5.6051},{name:"Al Taj III",raHours:4.9042,decDeg:2.4407},{name:"Al Taj V",raHours:4.9758,decDeg:1.714},{name:"HIP 28614",raHours:6.0397,decDeg:9.6474},{name:"HIP 29038",raHours:6.1262,decDeg:14.7685},{name:"HIP 29426",raHours:6.199,decDeg:14.2088},{name:"HIP 28716",raHours:6.0653,decDeg:20.1385},{name:"HIP 27913",raHours:5.9064,decDeg:20.2764}],lines:[[0,1],[1,2],[1,3],[3,4],[4,5],[4,6],[6,7],[0,5],[5,8],[8,0],[9,10],[10,11],[11,12],[12,13],[13,5],[13,14],[14,15],[15,16],[0,17],[17,18],[19,20],[20,21],[21,18]]},{name:"Pavo",stars:[{name:"Peacock",raHours:20.4275,decDeg:-56.7349},{name:"HIP 99240",raHours:20.145,decDeg:-66.1793},{name:"HIP 102395",raHours:20.7493,decDeg:-66.2032},{name:"HIP 105858",raHours:21.4407,decDeg:-65.3681},{name:"HIP 91792",raHours:18.7173,decDeg:-71.4277},{name:"HIP 98495",raHours:20.0098,decDeg:-72.9102},{name:"HIP 93015",raHours:18.9492,decDeg:-67.2335},{name:"HIP 88866",raHours:18.143,decDeg:-63.668},{name:"HIP 86929",raHours:17.7622,decDeg:-64.7237},{name:"HIP 90098",raHours:18.3871,decDeg:-61.4939},{name:"HIP 92609",raHours:18.8703,decDeg:-62.1876}],lines:[[0,1],[1,2],[0,3],[3,2],[4,1],[1,5],[1,6],[6,7],[7,8],[7,9],[9,10],[10,1]]},{name:"Pegasus",stars:[{name:"HIP 109410",raHours:22.1665,decDeg:33.1783},{name:"Matar",raHours:22.7167,decDeg:30.2213},{name:"Scheat",raHours:23.0629,decDeg:28.0825},{name:"Sadalbari",raHours:22.8334,decDeg:24.6017},{name:"Sadalnazi",raHours:22.7755,decDeg:23.5657},{name:"HIP 109176",raHours:22.1168,decDeg:25.345},{name:"HIP 107354",raHours:21.7441,decDeg:25.645},{name:"Alpheratz",raHours:.1398,decDeg:29.0908},{name:"Markab",raHours:23.0793,decDeg:15.2054},{name:"Algenib",raHours:.2206,decDeg:15.1836},{name:"Enif",raHours:21.7364,decDeg:9.875},{name:"Biham",raHours:22.1699,decDeg:6.1978},{name:"Homam",raHours:22.691,decDeg:10.8314}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[7,2],[2,8],[8,9],[9,7],[10,11],[11,12],[12,8]]},{name:"Perseus",stars:[{name:"Atik",raHours:3.7386,decDeg:32.2883},{name:"Atik (18246)",raHours:3.9022,decDeg:31.8837},{name:"Menkib",raHours:3.9827,decDeg:35.791},{name:"Aldu",raHours:3.9642,decDeg:40.0103},{name:"Sarvvis",raHours:3.7154,decDeg:47.7877},{name:"Mirfak",raHours:3.4054,decDeg:49.8612},{name:"HIP 14328",raHours:3.0799,decDeg:53.5065},{name:"Miram",raHours:2.8449,decDeg:55.8955},{name:"HIP 13531",raHours:2.9043,decDeg:52.7625},{name:"HIP 14632",raHours:3.1508,decDeg:49.6135},{name:"Misam",raHours:3.1582,decDeg:44.8579},{name:"Algol",raHours:3.1361,decDeg:40.9557},{name:"Gorgonea Tertia",raHours:3.0862,decDeg:38.8405},{name:"HIP 19343",raHours:4.1444,decDeg:47.7126},{name:"HIP 19812",raHours:4.2483,decDeg:48.4094},{name:"HIP 20070",raHours:4.304,decDeg:50.2956},{name:"HIP 19167",raHours:4.1097,decDeg:50.3514},{name:"HIP 12777",raHours:2.7366,decDeg:49.2287},{name:"Dajiangjunbei",raHours:1.7277,decDeg:50.6888}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,6],[8,9],[9,5],[9,10],[10,11],[11,3],[11,12],[4,13],[13,14],[14,15],[15,16],[9,17],[17,18]]},{name:"Phoenix",stars:[{name:"Ankaa",raHours:.438,decDeg:-42.3051},{name:"Alrial III",raHours:1.1014,decDeg:-46.7185},{name:"Alrial V",raHours:1.4728,decDeg:-43.3177},{name:"HIP 765",raHours:.1568,decDeg:-45.747},{name:"Wurren",raHours:1.1397,decDeg:-55.2458},{name:"HIP 7083",raHours:1.5208,decDeg:-49.0731}],lines:[[0,1],[1,2],[0,3],[3,1],[1,4],[4,5],[5,2]]},{name:"Pictor",stars:[{name:"HIP 32607",raHours:6.8032,decDeg:-61.942},{name:"HIP 27530",raHours:5.8304,decDeg:-56.1665},{name:"HIP 27321",raHours:5.7881,decDeg:-51.0667}],lines:[[0,1],[1,2]]},{name:"Pisces",stars:[{name:"HIP 5742",raHours:1.2291,decDeg:24.5838},{name:"HIP 6193",raHours:1.3244,decDeg:27.2641},{name:"HIP 5586",raHours:1.1943,decDeg:30.0897},{name:"Alpherg",raHours:1.5247,decDeg:15.3458},{name:"Torcular",raHours:1.7566,decDeg:9.1576},{name:"Alrescha",raHours:2.0341,decDeg:2.7638},{name:"HIP 7884",raHours:1.6905,decDeg:5.4876},{name:"HIP 4906",raHours:1.0491,decDeg:7.8901},{name:"Kuton I",raHours:.8114,decDeg:7.5852},{name:"HIP 118268",raHours:23.9885,decDeg:6.8636},{name:"HIP 116771",raHours:23.6658,decDeg:5.6274},{name:"HIP 115830",raHours:23.4662,decDeg:6.3791},{name:"HIP 114971",raHours:23.286,decDeg:3.2822},{name:"HIP 115738",raHours:23.4489,decDeg:1.2558},{name:"HIP 116928",raHours:23.7008,decDeg:1.7804}],lines:[[0,1],[1,2],[2,0],[0,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,10]]},{name:"Piscis Austrinus",stars:[{name:"Fomalhaut",raHours:22.9608,decDeg:-29.6218},{name:"HIP 113246",raHours:22.9325,decDeg:-32.5397},{name:"HIP 112948",raHours:22.8754,decDeg:-32.8755},{name:"Fum al Hui",raHours:22.5251,decDeg:-32.346},{name:"HIP 109285",raHours:22.1397,decDeg:-32.9884},{name:"HIP 107380",raHours:21.7491,decDeg:-33.0256},{name:"HIP 107608",raHours:21.7956,decDeg:-30.8983},{name:"HIP 111954",raHours:22.6776,decDeg:-27.0436}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,4],[4,7],[7,0]]},{name:"Puppis",stars:[{name:"Regor",raHours:8.1589,decDeg:-47.3366},{name:"Naos",raHours:8.0597,decDeg:-40.0032},{name:"Tureis",raHours:8.1258,decDeg:-24.3044},{name:"Azmidi",raHours:7.8216,decDeg:-24.8598},{name:"HIP 37229",raHours:7.6472,decDeg:-26.8039},{name:"HIP 36917",raHours:7.5897,decDeg:-28.3693},{name:"HIP 35264",raHours:7.2857,decDeg:-37.0975},{name:"Pipit",raHours:6.6294,decDeg:-43.1959},{name:"Canopus",raHours:6.3992,decDeg:-52.6957},{name:"HIP 37677",raHours:7.7301,decDeg:-28.9548},{name:"HIP 38070",raHours:7.8014,decDeg:-25.9372}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,3]]},{name:"Pyxis",stars:[{name:"Naos",raHours:8.0597,decDeg:-40.0032},{name:"HIP 42515",raHours:8.6684,decDeg:-35.3083},{name:"HIP 42828",raHours:8.7265,decDeg:-33.1864},{name:"HIP 43409",raHours:8.8422,decDeg:-27.7101}],lines:[[0,1],[1,2],[2,3]]},{name:"Reticulum",stars:[{name:"Rhombus",raHours:4.2404,decDeg:-62.474},{name:"HIP 17440",raHours:3.7365,decDeg:-64.8071},{name:"HIP 18597",raHours:3.9791,decDeg:-61.4002},{name:"HIP 19921",raHours:4.2747,decDeg:-59.3017}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Sagitta",stars:[{name:"Telum",raHours:19.9793,decDeg:19.4921},{name:"Zuoqi",raHours:19.7898,decDeg:18.5343},{name:"Sham",raHours:19.6683,decDeg:18.0139},{name:"Shakh",raHours:19.6841,decDeg:17.4761}],lines:[[0,1],[1,2],[1,3]]},{name:"Sagittarius",stars:[{name:"Kaus Australis",raHours:18.4029,decDeg:-34.3843},{name:"Alnasl",raHours:18.0968,decDeg:-30.4237},{name:"Kaus Media",raHours:18.3499,decDeg:-29.828},{name:"Kaus Borealis",raHours:18.4662,decDeg:-25.4212},{name:"Namalsadirah I",raHours:18.7609,decDeg:-26.9908},{name:"Nunki",raHours:18.9211,decDeg:-26.2966},{name:"Namalsadirah II",raHours:19.1157,decDeg:-27.6698},{name:"Ascella",raHours:19.0435,decDeg:-29.8801},{name:"Hamalwarid",raHours:18.2938,decDeg:-36.7613},{name:"Polis",raHours:18.2294,decDeg:-21.0588},{name:"HIP 95168",raHours:19.3612,decDeg:-17.8473},{name:"Albaldah",raHours:19.1627,decDeg:-21.0235},{name:"HIP 93683",raHours:19.078,decDeg:-21.7414},{name:"HIP 93085",raHours:18.9622,decDeg:-21.1066}],lines:[[0,1],[1,2],[2,0],[2,3],[3,4],[4,2],[4,5],[5,6],[6,7],[7,4],[7,0],[0,8],[3,9],[10,11],[11,12],[12,13],[13,11]]},{name:"Scorpius",stars:[{name:"Acrab",raHours:16.0906,decDeg:-19.8054},{name:"Dschubba",raHours:16.0056,decDeg:-22.6216},{name:"Fang",raHours:15.9809,decDeg:-26.114},{name:"Alniyat",raHours:16.3531,decDeg:-25.5928},{name:"Antares",raHours:16.4901,decDeg:-26.4319},{name:"Paikauhale",raHours:16.598,decDeg:-28.216},{name:"Larawag",raHours:16.8362,decDeg:-34.2926},{name:"Xamidimura",raHours:16.8645,decDeg:-38.0473},{name:"HIP 82729",raHours:16.9098,decDeg:-42.3608},{name:"HIP 84143",raHours:17.2025,decDeg:-43.2385},{name:"Sargas",raHours:17.622,decDeg:-42.9978},{name:"Girtab",raHours:17.7931,decDeg:-40.127},{name:"Mula",raHours:17.7081,decDeg:-39.0299},{name:"Lesath",raHours:17.5127,decDeg:-37.2957},{name:"Shaula",raHours:17.5601,decDeg:-37.1037},{name:"Fuyue",raHours:17.831,decDeg:-37.0434},{name:"Jabbah",raHours:16.1999,decDeg:-19.4606},{name:"Iklil",raHours:15.9481,decDeg:-29.214}],lines:[[0,1],[1,2],[1,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[0,16],[2,17]]},{name:"Sculptor",stars:[{name:"HIP 4577",raHours:.9768,decDeg:-29.3575},{name:"HIP 117452",raHours:23.8154,decDeg:-28.13},{name:"HIP 115102",raHours:23.3137,decDeg:-32.5318},{name:"HIP 116231",raHours:23.5495,decDeg:-37.8184}],lines:[[0,1],[1,2],[2,3]]},{name:"Scutum",stars:[{name:"HIP 92175",raHours:18.7862,decDeg:-4.7478},{name:"Tianbian",raHours:18.5868,decDeg:-8.2433},{name:"HIP 90595",raHours:18.4866,decDeg:-14.5658},{name:"HIP 91726",raHours:18.7046,decDeg:-9.0526}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Serpens",stars:[{name:"Chow",raHours:15.7698,decDeg:15.4219},{name:"Nasak Shamiya II",raHours:15.9408,decDeg:15.6647},{name:"Gudja",raHours:15.8123,decDeg:18.1418},{name:"HIP 76852",raHours:15.6925,decDeg:19.6705},{name:"Nasak Yamani I",raHours:15.5801,decDeg:10.5389},{name:"Unukalhai",raHours:15.7378,decDeg:6.4255},{name:"Nasak Yamani II",raHours:15.8469,decDeg:4.4776},{name:"HIP 77516",raHours:15.827,decDeg:-3.4301},{name:"Yed Prior",raHours:16.2391,decDeg:-3.694},{name:"Sabik",raHours:17.173,decDeg:-15.7251},{name:"HIP 86263",raHours:17.6265,decDeg:-15.3984},{name:"HIP 88048",raHours:17.9838,decDeg:-9.7733},{name:"HIP 89962",raHours:18.3553,decDeg:-2.8971},{name:"Alya",raHours:18.937,decDeg:4.2035}],lines:[[0,1],[1,2],[2,3],[3,0],[0,4],[4,5],[5,6],[6,7],[7,8],[9,10],[10,11],[11,12],[12,13]]},{name:"Sextans",stars:[{name:"HIP 48437",raHours:9.8751,decDeg:-8.1049},{name:"HIP 49641",raHours:10.1323,decDeg:-.3716},{name:"HIP 51437",raHours:10.5049,decDeg:-.637},{name:"HIP 51362",raHours:10.4913,decDeg:-2.739}],lines:[[0,1],[1,2],[2,3]]},{name:"Taurus",stars:[{name:"Tianguan",raHours:5.6274,decDeg:21.1426},{name:"Aldebaran",raHours:4.5987,decDeg:16.5098},{name:"Chamukuy",raHours:4.4777,decDeg:15.8709},{name:"Prima Hyadum",raHours:4.3299,decDeg:15.6277},{name:"Secunda Hyadum",raHours:4.3822,decDeg:17.5426},{name:"Ain",raHours:4.4769,decDeg:19.1805},{name:"Elnath",raHours:5.4382,decDeg:28.6079},{name:"HIP 16083",raHours:3.4528,decDeg:9.7328},{name:"HIP 18907",raHours:4.0526,decDeg:5.9893},{name:"HIP 15900",raHours:3.4136,decDeg:9.0291},{name:"HIP 16852",raHours:3.6146,decDeg:.4028},{name:"Bibing",raHours:4.0113,decDeg:12.4904}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[7,8],[9,10],[3,11],[11,7]]},{name:"Telescopium",stars:[{name:"HIP 89112",raHours:18.1872,decDeg:-45.9543},{name:"HIP 90422",raHours:18.4496,decDeg:-45.9683},{name:"HIP 90568",raHours:18.4805,decDeg:-49.07}],lines:[[0,1],[1,2]]},{name:"Triangulum",stars:[{name:"Mothallah",raHours:1.8847,decDeg:29.5794},{name:"Mizan",raHours:2.159,decDeg:34.9874},{name:"Apdu",raHours:2.2886,decDeg:33.8473}],lines:[[0,1],[1,2],[2,0]]},{name:"Triangulum Australe",stars:[{name:"Atria",raHours:16.8111,decDeg:-69.0276},{name:"HIP 77952",raHours:15.9191,decDeg:-63.4297},{name:"HIP 76440",raHours:15.612,decDeg:-66.3169},{name:"HIP 74946",raHours:15.3152,decDeg:-68.6795}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Tucana",stars:[{name:"HIP 2484",raHours:.5257,decDeg:-62.9581},{name:"HIP 1599",raHours:.3339,decDeg:-64.8776},{name:"HIP 118322",raHours:23.9986,decDeg:-65.5771},{name:"HIP 110838",raHours:22.4555,decDeg:-64.9664},{name:"Lang-Exster",raHours:22.3084,decDeg:-60.2595},{name:"HIP 114996",raHours:23.2905,decDeg:-58.2359}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},{name:"Ursa Major",stars:[{name:"Phecda",raHours:11.8972,decDeg:53.6947},{name:"Taiyangshou",raHours:11.7675,decDeg:47.7793},{name:"HIP 54539",raHours:11.1611,decDeg:44.4986},{name:"Tania Australis",raHours:10.3722,decDeg:41.4994},{name:"Tania Borealis",raHours:10.285,decDeg:42.9145},{name:"Alula Borealis",raHours:11.308,decDeg:33.0942},{name:"Alula Australis",raHours:11.3031,decDeg:31.5308},{name:"Megrez",raHours:12.2571,decDeg:57.0326},{name:"Dubhe",raHours:11.0622,decDeg:61.7511},{name:"Merak",raHours:11.0307,decDeg:56.3823},{name:"Alioth",raHours:12.9005,decDeg:55.9598},{name:"Mizar",raHours:13.3987,decDeg:54.9254},{name:"Alkaid",raHours:13.7924,decDeg:49.3133},{name:"Alhaud IV",raHours:9.5254,decDeg:63.0618},{name:"Alhaud VI",raHours:9.8499,decDeg:59.0391},{name:"Muscida",raHours:8.5045,decDeg:60.7184},{name:"Alhaud V",raHours:9.5479,decDeg:51.6786},{name:"Alkaphrah",raHours:9.0604,decDeg:47.1567},{name:"Talitha",raHours:8.9869,decDeg:48.0423}],lines:[[0,1],[1,2],[2,3],[3,4],[1,5],[5,6],[7,8],[8,9],[9,0],[0,7],[7,10],[10,11],[11,12],[8,13],[13,14],[13,15],[15,14],[14,9],[14,16],[16,17],[17,18]]},{name:"Ursa Minor",stars:[{name:"Polaris",raHours:2.5297,decDeg:89.2641},{name:"Yildun",raHours:17.5369,decDeg:86.5863},{name:"Circitores",raHours:16.7662,decDeg:82.0373},{name:"Akfa Farkadain",raHours:15.7343,decDeg:77.7945},{name:"Anwa Farkadain",raHours:16.2918,decDeg:75.7547},{name:"Pherkad",raHours:15.3455,decDeg:71.834},{name:"Kochab",raHours:14.8451,decDeg:74.1555}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]]},{name:"Vela",stars:[{name:"Alsephina",raHours:8.7451,decDeg:-54.7086},{name:"Regor",raHours:8.1589,decDeg:-47.3366},{name:"Suhail",raHours:9.1333,decDeg:-43.4326},{name:"HIP 46651",raHours:9.5117,decDeg:-40.4669},{name:"HIP 50191",raHours:10.2456,decDeg:-42.1221},{name:"HIP 52727",raHours:10.7795,decDeg:-49.4201},{name:"HIP 48774",raHours:9.9477,decDeg:-54.5678},{name:"Markeb",raHours:9.3686,decDeg:-55.0107}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0]]},{name:"Virgo",stars:[{name:"Zaniah",raHours:12.3318,decDeg:-.6667},{name:"HIP 58948",raHours:12.0869,decDeg:8.7328},{name:"HIP 57380",raHours:11.7643,decDeg:6.5298},{name:"Zavijava",raHours:11.8448,decDeg:1.7654},{name:"Porrima",raHours:12.6944,decDeg:-1.4495},{name:"Minelauva",raHours:12.9268,decDeg:3.3976},{name:"Vindemiatrix",raHours:13.0363,decDeg:10.9591},{name:"HIP 64238",raHours:13.1658,decDeg:-5.5389},{name:"Spica",raHours:13.4199,decDeg:-11.1612},{name:"Heze",raHours:13.5783,decDeg:-.5959},{name:"HIP 68520",raHours:14.0274,decDeg:1.5446},{name:"Maenalus",raHours:14.7708,decDeg:1.8929},{name:"Syrma",raHours:14.2669,decDeg:-5.9995},{name:"Rijl al Awwa",raHours:14.7177,decDeg:-5.6574}],lines:[[0,1],[1,2],[2,3],[3,0],[0,4],[4,5],[5,6],[4,7],[7,8],[4,9],[9,10],[10,11],[9,12],[12,13]]},{name:"Volans",stars:[{name:"HIP 44382",raHours:9.0408,decDeg:-66.3958},{name:"HIP 41312",raHours:8.429,decDeg:-66.1365},{name:"HIP 39794",raHours:8.1322,decDeg:-68.6171},{name:"HIP 35228",raHours:7.2805,decDeg:-67.9572},{name:"HIP 34481",raHours:7.1458,decDeg:-70.4992}],lines:[[0,1],[1,2],[2,3],[3,4],[4,2],[2,0]]},{name:"Vulpecula",stars:[{name:"Anser",raHours:19.4784,decDeg:24.6652},{name:"HIP 97886",raHours:19.891,decDeg:24.0795}],lines:[[0,1]]}],Io="const:";function s7(n){return`${Io}${n.name}`}function sh(){return tn.map(n=>({id:s7(n),name:n.name,sub:"constellation"}))}const rh=n=>n.toLowerCase().trim().replace(/\s+/g," ");function r7(n,e){const t=rh(n);return t===e?100:t.startsWith(e)?80:t.includes(e)?60:-1}function o7(n){const e=rh(n),t=sh();return e?t.map(i=>({e:i,s:r7(i.name,e)})).filter(i=>i.s>=0).sort((i,s)=>s.s-i.s||i.e.name.localeCompare(s.e.name)).map(i=>i.e):t}const du={type:"change"},S1={type:"start"},oh={type:"end"},Na=new Yo,hu=new Yi,a7=Math.cos(70*Wn.DEG2RAD),Lt=new R,hn=2*Math.PI,dt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Dc=1e-6;class c7 extends Jm{constructor(e,t=null){super(e,t),this.state=dt.NONE,this.enabled=!0,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:pr.ROTATE,MIDDLE:pr.DOLLY,RIGHT:pr.PAN},this.touches={ONE:lr.ROTATE,TWO:lr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new es,this._lastTargetPosition=new R,this._quat=new es().setFromUnitVectors(e.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new lu,this._sphericalDelta=new lu,this._scale=1,this._panOffset=new R,this._rotateStart=new be,this._rotateEnd=new be,this._rotateDelta=new be,this._panStart=new be,this._panEnd=new be,this._panDelta=new be,this._dollyStart=new be,this._dollyEnd=new be,this._dollyDelta=new be,this._dollyDirection=new R,this._mouse=new be,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=u7.bind(this),this._onPointerDown=l7.bind(this),this._onPointerUp=d7.bind(this),this._onContextMenu=x7.bind(this),this._onMouseWheel=p7.bind(this),this._onKeyDown=m7.bind(this),this._onTouchStart=g7.bind(this),this._onTouchMove=v7.bind(this),this._onMouseDown=h7.bind(this),this._onMouseMove=f7.bind(this),this._interceptControlDown=_7.bind(this),this._interceptControlUp=M7.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(du),this.update(),this.state=dt.NONE}update(e=null){const t=this.object.position;Lt.copy(t).sub(this.target),Lt.applyQuaternion(this._quat),this._spherical.setFromVector3(Lt),this.autoRotate&&this.state===dt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=hn:i>Math.PI&&(i-=hn),s<-Math.PI?s+=hn:s>Math.PI&&(s-=hn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Lt.setFromSpherical(this._spherical),Lt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Lt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Lt.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new R(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new R(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Lt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Na.origin.copy(this.object.position),Na.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Na.direction))<a7?this.object.lookAt(this.target):(hu.setFromNormalAndCoplanarPoint(this.object.up,this.target),Na.intersectPlane(hu,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Dc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Dc||this._lastTargetPosition.distanceToSquared(this.target)>Dc?(this.dispatchEvent(du),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?hn/60*this.autoRotateSpeed*e:hn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Lt.setFromMatrixColumn(t,0),Lt.multiplyScalar(-e),this._panOffset.add(Lt)}_panUp(e,t){this.screenSpacePanning===!0?Lt.setFromMatrixColumn(t,1):(Lt.setFromMatrixColumn(t,0),Lt.crossVectors(this.object.up,Lt)),Lt.multiplyScalar(e),this._panOffset.add(Lt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Lt.copy(s).sub(this.target);let r=Lt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(hn*this._rotateDelta.x/t.clientHeight),this._rotateUp(hn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(hn*this._rotateDelta.x/t.clientHeight),this._rotateUp(hn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new be,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function l7(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function u7(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function d7(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(oh),this.state=dt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function h7(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case pr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=dt.DOLLY;break;case pr.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=dt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=dt.ROTATE}break;case pr.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=dt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=dt.PAN}break;default:this.state=dt.NONE}this.state!==dt.NONE&&this.dispatchEvent(S1)}function f7(n){switch(this.state){case dt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case dt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case dt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function p7(n){this.enabled===!1||this.enableZoom===!1||this.state!==dt.NONE||(n.preventDefault(),this.dispatchEvent(S1),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(oh))}function m7(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function g7(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case lr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=dt.TOUCH_ROTATE;break;case lr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=dt.TOUCH_PAN;break;default:this.state=dt.NONE}break;case 2:switch(this.touches.TWO){case lr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=dt.TOUCH_DOLLY_PAN;break;case lr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=dt.TOUCH_DOLLY_ROTATE;break;default:this.state=dt.NONE}break;default:this.state=dt.NONE}this.state!==dt.NONE&&this.dispatchEvent(S1)}function v7(n){switch(this._trackPointer(n),this.state){case dt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case dt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case dt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case dt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=dt.NONE}}function x7(n){this.enabled!==!1&&n.preventDefault()}function _7(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function M7(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}ge.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new be(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};fn.line={uniforms:Gn.merge([ge.common,ge.fog,ge.line]),vertexShader:`
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
		`};class Nl extends _t{constructor(e){super({type:"LineMaterial",uniforms:Gn.clone(fn.line.uniforms),vertexShader:fn.line.vertexShader,fragmentShader:fn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const fu=new li,Oa=new R;class Ol extends qm{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new vt(e,3)),this.setAttribute("uv",new vt(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const i=new Hl(t,6,1);return this.setAttribute("instanceStart",new ei(i,3,0)),this.setAttribute("instanceEnd",new ei(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const i=new Hl(t,6,1);return this.setAttribute("instanceColorStart",new ei(i,3,0)),this.setAttribute("instanceColorEnd",new ei(i,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new Fm(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new li);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),fu.setFromBufferAttribute(t),this.boundingBox.union(fu))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Oi),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Oa.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Oa)),Oa.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Oa));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}const Cc=new ct,pu=new R,mu=new R,Vt=new ct,Xt=new ct,Kn=new ct,Pc=new R,Rc=new ot,Yt=new Zm,gu=new R,za=new li,Fa=new Oi,Zn=new ct;let Qn,ws;function vu(n,e,t){return Zn.set(0,0,-e,1).applyMatrix4(n.projectionMatrix),Zn.multiplyScalar(1/Zn.w),Zn.x=ws/t.width,Zn.y=ws/t.height,Zn.applyMatrix4(n.projectionMatrixInverse),Zn.multiplyScalar(1/Zn.w),Math.abs(Math.max(Zn.x,Zn.y))}function y7(n,e){const t=n.matrixWorld,i=n.geometry,s=i.attributes.instanceStart,r=i.attributes.instanceEnd,o=Math.min(i.instanceCount,s.count);for(let a=0,c=o;a<c;a++){Yt.start.fromBufferAttribute(s,a),Yt.end.fromBufferAttribute(r,a),Yt.applyMatrix4(t);const l=new R,u=new R;Qn.distanceSqToSegment(Yt.start,Yt.end,u,l),u.distanceTo(l)<ws*.5&&e.push({point:u,pointOnLine:l,distance:Qn.origin.distanceTo(u),object:n,face:null,faceIndex:a,uv:null,uv1:null})}}function S7(n,e,t){const i=e.projectionMatrix,r=n.material.resolution,o=n.matrixWorld,a=n.geometry,c=a.attributes.instanceStart,l=a.attributes.instanceEnd,u=Math.min(a.instanceCount,c.count),d=-e.near;Qn.at(1,Kn),Kn.w=1,Kn.applyMatrix4(e.matrixWorldInverse),Kn.applyMatrix4(i),Kn.multiplyScalar(1/Kn.w),Kn.x*=r.x/2,Kn.y*=r.y/2,Kn.z=0,Pc.copy(Kn),Rc.multiplyMatrices(e.matrixWorldInverse,o);for(let h=0,f=u;h<f;h++){if(Vt.fromBufferAttribute(c,h),Xt.fromBufferAttribute(l,h),Vt.w=1,Xt.w=1,Vt.applyMatrix4(Rc),Xt.applyMatrix4(Rc),Vt.z>d&&Xt.z>d)continue;if(Vt.z>d){const x=Vt.z-Xt.z,b=(Vt.z-d)/x;Vt.lerp(Xt,b)}else if(Xt.z>d){const x=Xt.z-Vt.z,b=(Xt.z-d)/x;Xt.lerp(Vt,b)}Vt.applyMatrix4(i),Xt.applyMatrix4(i),Vt.multiplyScalar(1/Vt.w),Xt.multiplyScalar(1/Xt.w),Vt.x*=r.x/2,Vt.y*=r.y/2,Xt.x*=r.x/2,Xt.y*=r.y/2,Yt.start.copy(Vt),Yt.start.z=0,Yt.end.copy(Xt),Yt.end.z=0;const v=Yt.closestPointToPointParameter(Pc,!0);Yt.at(v,gu);const m=Wn.lerp(Vt.z,Xt.z,v),p=m>=-1&&m<=1,y=Pc.distanceTo(gu)<ws*.5;if(p&&y){Yt.start.fromBufferAttribute(c,h),Yt.end.fromBufferAttribute(l,h),Yt.start.applyMatrix4(o),Yt.end.applyMatrix4(o);const x=new R,b=new R;Qn.distanceSqToSegment(Yt.start,Yt.end,b,x),t.push({point:b,pointOnLine:x,distance:Qn.origin.distanceTo(b),object:n,face:null,faceIndex:h,uv:null,uv1:null})}}}class Lc extends Dt{constructor(e=new Ol,t=new Nl({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let o=0,a=0,c=t.count;o<c;o++,a+=2)pu.fromBufferAttribute(t,o),mu.fromBufferAttribute(i,o),s[a]=a===0?0:s[a-1],s[a+1]=s[a]+pu.distanceTo(mu);const r=new Hl(s,2,1);return e.setAttribute("instanceDistanceStart",new ei(r,1,0)),e.setAttribute("instanceDistanceEnd",new ei(r,1,1)),this}raycast(e,t){const i=this.material.worldUnits,s=e.camera;s===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;Qn=e.ray;const o=this.matrixWorld,a=this.geometry,c=this.material;ws=c.linewidth+r,a.boundingSphere===null&&a.computeBoundingSphere(),Fa.copy(a.boundingSphere).applyMatrix4(o);let l;if(i)l=ws*.5;else{const d=Math.max(s.near,Fa.distanceToPoint(Qn.origin));l=vu(s,d,c.resolution)}if(Fa.radius+=l,Qn.intersectsSphere(Fa)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),za.copy(a.boundingBox).applyMatrix4(o);let u;if(i)u=ws*.5;else{const d=Math.max(s.near,za.distanceToPoint(Qn.origin));u=vu(s,d,c.resolution)}za.expandByScalar(u),Qn.intersectsBox(za)!==!1&&(i?y7(this,t):S7(this,s,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Cc),this.material.uniforms.resolution.value.set(Cc.z,Cc.w))}}const dr=Math.PI/180;function b7(n,e,t=1e-10){const i=n%(2*Math.PI);let s=e<.8?i:Math.PI;for(let r=0;r<64;r++){const o=s-e*Math.sin(s)-i,a=1-e*Math.cos(s),c=o/a;if(s-=c,Math.abs(c)<t)break}return s}function ah(n,e){const t=e/ji,i=n.rates;return{a:n.a+(i?.a??0)*t,e:n.e+(i?.e??0)*t,i:n.i+(i?.i??0)*t,node:n.node+(i?.node??0)*t,peri:n.peri+(i?.peri??0)*t,M0:n.M0+(i?.M0??0)*t+ch(n,e),n:n.n}}function ch(n,e){if(!n.periodicM)return 0;const t=e/ji;let i=0;for(const s of n.periodicM){const r=s.f*t;i+=s.b*t*t+s.c*Math.cos(r*dr)+s.s*Math.sin(r*dr)}return i}function Ft(n,e){return M0(n,e,{x:0,y:0,z:0})}function M0(n,e,t){const i=n.a+(n.rates?.a??0)*(e/ji),s=n.e+(n.rates?.e??0)*(e/ji),r=n.i+(n.rates?.i??0)*(e/ji),o=n.node+(n.rates?.node??0)*(e/ji),a=n.peri+(n.rates?.peri??0)*(e/ji),c=n.M0+(n.rates?.M0??0)*(e/ji)+ch(n,e);return lh(i,s,r,o,a,c,n.n,e,t)}function E7(n,e){return lh(n.a,n.e,n.i,n.node,n.peri,n.M0,n.n,0,{x:0,y:0,z:0},e)}function lh(n,e,t,i,s,r,o,a,c,l){const u=l??(r+o*a)*dr,d=b7(u,e),h=n*(Math.cos(d)-e),f=n*Math.sqrt(1-e*e)*Math.sin(d),g=s*dr,v=i*dr,m=t*dr,p=Math.cos(v),y=Math.sin(v),x=Math.cos(g),b=Math.sin(g),L=Math.cos(m),A=Math.sin(m);return c.x=(p*x-y*b*L)*h+(-p*b-y*x*L)*f,c.y=(y*x+p*b*L)*h+(-y*b+p*x*L)*f,c.z=b*A*h+x*A*f,c}function T7(n,e,t=256){const i=ah(n,e),s=[];for(let r=0;r<=t;r++){const o=r*(2*Math.PI/t);s.push(E7(i,o))}return s}const On=Math.PI/180,A7=1495978707e-1,w7=[[0,0,1,0,6288770,-20905400],[2,0,-1,0,1274030,-3699110],[2,0,0,0,658314,-2955970],[0,0,2,0,213618,-569925],[0,1,0,0,-185116,48888],[0,0,0,2,-114332,-3149],[2,0,-2,0,58793,246158],[2,-1,-1,0,57066,-152138],[2,0,1,0,53322,-170733],[2,-1,0,0,45758,-204586],[0,1,-1,0,-40923,-129620],[1,0,0,0,-34720,108743],[0,1,1,0,-30383,104755],[2,0,0,-2,15327,10321],[0,0,1,2,-12528,0],[0,0,1,-2,10980,79661],[4,0,-1,0,10675,-34782],[0,0,3,0,10034,-23210],[4,0,-2,0,8548,-21636],[2,1,-1,0,-7888,24208],[2,1,0,0,-6766,30824],[1,0,-1,0,-5163,-8379],[1,1,0,0,4987,-16675],[2,-1,1,0,4036,-12831],[2,0,2,0,3994,-10445],[4,0,0,0,3861,-11650],[2,0,-3,0,3665,14403],[0,1,-2,0,-2689,-7003],[2,0,-1,2,-2602,0],[2,-1,-2,0,2390,10056],[1,0,1,0,-2348,6322],[2,-2,0,0,2236,-9884],[0,1,2,0,-2120,5751],[0,2,0,0,-2069,0],[2,-2,-1,0,2048,-4950],[2,0,1,-2,-1773,4130],[2,0,0,2,-1595,0],[4,-1,-1,0,1215,-3958],[0,0,2,2,-1110,0],[3,0,-1,0,-892,3258],[2,1,1,0,-810,2616],[4,-1,-2,0,759,-1897],[0,2,-1,0,-713,-2117],[2,2,-1,0,-700,2354],[2,1,-2,0,691,0],[2,-1,0,-2,596,0],[4,0,1,0,549,-1423],[0,0,4,0,537,-1117],[4,-1,0,0,520,-1571],[1,0,-2,0,-487,-1739],[2,1,0,-2,-399,0],[0,0,2,-2,-381,-4421],[1,1,1,0,351,0],[3,0,-2,0,-340,0],[4,0,-3,0,330,0],[2,-1,2,0,327,0],[0,2,1,0,-323,1165],[1,1,-1,0,299,0],[2,0,3,0,294,0],[2,0,-1,-2,0,8752]],D7=[[0,0,0,1,5128120],[0,0,1,1,280602],[0,0,1,-1,277693],[2,0,0,-1,173237],[2,0,-1,1,55413],[2,0,-1,-1,46271],[2,0,0,1,32573],[0,0,2,1,17198],[2,0,1,-1,9266],[0,0,2,-1,8822],[2,-1,0,-1,8216],[2,0,-2,-1,4324],[2,0,1,1,4200],[2,1,0,-1,-3359],[2,-1,-1,1,2463],[2,-1,0,1,2211],[2,-1,-1,-1,2065],[0,1,-1,-1,-1870],[4,0,-1,-1,1828],[0,1,0,1,-1794],[0,0,0,3,-1749],[0,1,-1,1,-1565],[1,0,0,1,-1491],[0,1,1,1,-1475],[0,1,1,-1,-1410],[0,1,0,-1,-1344],[1,0,0,-1,-1335],[0,0,3,1,1107],[4,0,0,-1,1021],[4,0,-1,1,833],[0,0,1,-3,777],[4,0,-2,1,671],[2,0,0,-3,607],[2,0,2,-1,596],[2,-1,1,-1,491],[2,0,-2,1,-451],[0,0,3,-1,439],[2,0,2,1,422],[2,0,-3,-1,421],[2,1,-1,1,-366],[2,1,0,1,-351],[4,0,0,1,331],[2,-1,1,1,315],[2,-2,0,-1,302],[0,0,1,3,-283],[2,1,1,-1,-229],[1,1,0,-1,223],[1,1,0,1,223],[0,1,-2,-1,-220],[2,1,-1,-1,-220],[1,0,1,1,-185],[2,-1,-2,-1,181],[0,1,2,1,-177],[4,0,-2,-1,176],[4,-1,-1,-1,166],[1,0,1,-1,-164],[4,0,1,-1,132],[1,0,-1,-1,-119],[4,-1,0,-1,115],[2,-2,0,1,107]];function vi(n){let e=n%360;return e<0&&(e+=360),e}function C7(n){const e=n/36525,t=218.3164477+(481267.8812342+(-.0015786+(1/538841-e/65194e3)*e)*e)*e,i=297.8501921+(445267.1114034+(-.0018819+(1/545868-e/113065e3)*e)*e)*e,s=357.5291092+(35999.0502909+(-1536e-7+e/2449e4)*e)*e,r=134.9633964+(477198.8675055+(.0087414+(1/69699.9+e/14712e3)*e)*e)*e,o=93.272095+(483202.0175233+(-.0036539+(-1/3526e3+e/86331e4)*e)*e)*e,a=119.75+131.849*e,c=53.09+479264.29*e,l=313.45+481266.484*e,u=1+(-.002516-74e-7*e)*e,d=u*u,h=vi(t)*On,f=vi(i)*On,g=vi(s)*On,v=vi(r)*On,m=vi(o)*On,p=vi(a)*On,y=vi(c)*On,x=vi(l)*On;let b=0,L=0;for(const S of w7){const[P,O,z,X,j,k]=S,K=P*f+O*g+z*v+X*m;let G=j,ne=k;Math.abs(O)===1?(G*=u,ne*=u):Math.abs(O)===2&&(G*=d,ne*=d),b+=G*Math.sin(K),L+=ne*Math.cos(K)}b+=3958*Math.sin(p)+1962*Math.sin(h-m)+318*Math.sin(y);let A=0;for(const S of D7){const[P,O,z,X,j]=S,k=P*f+O*g+z*v+X*m;let K=j;Math.abs(O)===1?K*=u:Math.abs(O)===2&&(K*=d),A+=K*Math.sin(k)}A+=-2235*Math.sin(h)+382*Math.sin(x)+175*Math.sin(p-m)+175*Math.sin(p+m)+127*Math.sin(h-v)-115*Math.sin(h+v);const D=vi(t+b/1e6),I=A/1e6,E=385000.56+L/1e3;return{lon:D,lat:I,deltaAu:E/A7}}function P7(n,e,t){const i=t/36525,s=(5028.796195*i+.556602*i*i)/3600,r=-46.836769*i+.005971*i*i,o=n-s,a=e-Math.cos(n*On)*r/3600;return{lon:o,lat:a}}function Gr(n){const e=C7(n),t=P7(e.lon,e.lat,n),i=t.lon*On,s=t.lat*On,r=e.deltaAu;return[r*Math.cos(s)*Math.cos(i),r*Math.cos(s)*Math.sin(i),r*Math.sin(s)]}const Ii=Math.PI,bt=Ii*2,uo=Ii/180,R7=1440,L7=398600.8,yn=6378.135,Ai=60/Math.sqrt(yn*yn*yn/L7),Ic=yn*Ai/60,I7=1/Ai,Es=.001082616,H7=-253881e-11,U7=-165597e-11,Ts=H7/Es,Ho=2/3,Hc=1440/(2*Ii);function N7(n,e){const t=[31,n%4===0?29:28,31,30,31,30,31,31,30,31,30,31],i=Math.floor(e);let s=1,r=0;for(;i>r+t[s-1]&&s<12;)r+=t[s-1],s+=1;const o=s,a=i-r;let c=(e-i)*24;const l=Math.floor(c);c=(c-l)*60;const u=Math.floor(c),d=(c-u)*60;return{mon:o,day:a,hr:l,minute:u,sec:d}}function xu(n,e,t,i,s,r,o=0){return 367*n-Math.floor(7*(n+Math.floor((e+9)/12))*.25)+Math.floor(275*e/9)+t+17210135e-1+((o/6e4+r/60+s)/60+i)/24}function b1(n,e,t,i,s,r,o=0){if(n instanceof Date){const a=n;return xu(a.getUTCFullYear(),a.getUTCMonth()+1,a.getUTCDate(),a.getUTCHours(),a.getUTCMinutes(),a.getUTCSeconds(),a.getUTCMilliseconds())}return xu(n,e,t,i,s,r,o)}function uh(n,e){const{e3:t,ee2:i,peo:s,pgho:r,pho:o,pinco:a,plo:c,se2:l,se3:u,sgh2:d,sgh3:h,sgh4:f,sh2:g,sh3:v,si2:m,si3:p,sl2:y,sl3:x,sl4:b,t:L,xgh2:A,xgh3:D,xgh4:I,xh2:E,xh3:S,xi2:P,xi3:O,xl2:z,xl3:X,xl4:j,zmol:k,zmos:K}=n,{init:G,opsmode:ne}=e;let{ep:ce,inclp:ue,nodep:Te,argpp:Ue,mp:q}=e,Y,te,ae,xe,we,Ee,Ve,C,Be,Me,Pe,he,Ie,fe,ve,w,M,B,Z,J,Q;const Ae=119459e-10,re=.01675,de=.00015835218,Le=.0549;Q=K+Ae*L,G==="y"&&(Q=K),J=Q+2*re*Math.sin(Q),M=Math.sin(J),Me=.5*M*M-.25,Pe=-.5*M*Math.cos(J);const ie=l*Me+u*Pe,me=m*Me+p*Pe,_=y*Me+x*Pe+b*M,Re=d*Me+h*Pe+f*M,pe=g*Me+v*Pe;Q=k+de*L,G==="y"&&(Q=k),J=Q+2*Le*Math.sin(Q),M=Math.sin(J),Me=.5*M*M-.25,Pe=-.5*M*Math.cos(J);const ze=i*Me+t*Pe,Fe=P*Me+O*Pe,Je=z*Me+X*Pe+j*M,H=A*Me+D*Pe+I*M,se=E*Me+S*Pe;return he=ie+ze,ve=me+Fe,w=_+Je,Ie=Re+H,fe=pe+se,G==="n"&&(he-=s,ve-=a,w-=c,Ie-=r,fe-=o,ue+=ve,ce+=he,xe=Math.sin(ue),ae=Math.cos(ue),ue>=.2?(fe/=xe,Ie-=ae*fe,Ue+=Ie,Te+=fe,q+=w):(Ee=Math.sin(Te),we=Math.cos(Te),Y=xe*Ee,te=xe*we,Ve=fe*we+ve*ae*Ee,C=-fe*Ee+ve*ae*we,Y+=Ve,te+=C,Te%=bt,Te<0&&ne==="a"&&(Te+=bt),B=q+Ue+ae*Te,Be=w+Ie-ve*Te*xe,B+=Be,Z=Te,Te=Math.atan2(Y,te),Te<0&&ne==="a"&&(Te+=bt),Math.abs(Z-Te)>Ii&&(Te<Z?Te+=bt:Te-=bt),q+=w,Ue=B-q-ae*Te)),{ep:ce,inclp:ue,nodep:Te,argpp:Ue,mp:q}}function O7(n){const{epoch:e,ep:t,argpp:i,tc:s,inclp:r,nodep:o,np:a}=n;let c,l,u,d,h,f,g,v,m,p,y,x,b,L,A,D,I,E,S,P,O,z,X,j,k,K,G,ne,ce,ue,Te,Ue,q,Y,te,ae,xe,we,Ee,Ve,C,Be,Me,Pe,he,Ie,fe,ve,w,M,B,Z,J,Q,Ae,re,de,Le,ie,me,_,Re,pe;const ze=.01675,Fe=.0549,Je=29864797e-13,H=47968065e-14,se=.39785416,ee=.91744867,$=.1945905,le=-.98088458,Ne=a,Ge=t,Qe=Math.sin(o),ut=Math.cos(o),Xe=Math.sin(i),Mt=Math.cos(i),ht=Math.sin(r),Ye=Math.cos(r),ft=Ge*Ge,Ct=1-ft,Tn=Math.sqrt(Ct),it=0,Yn=0,ui=0,jn=0,zi=0,An=e+18261.5+s/1440,gn=(4.523602-.00092422029*An)%bt,Et=Math.sin(gn),un=Math.cos(gn),T=.91375164-.03568096*un,N=Math.sqrt(1-T*T),W=.089683511*Et/N,V=Math.sqrt(1-W*W),U=5.8351514+.001944368*An;let oe=.39785416*Et/N;const Se=V*un+.91744867*W*Et;oe=Math.atan2(oe,Se),oe+=U-gn;const De=Math.cos(oe),Ce=Math.sin(oe);P=$,O=le,j=ee,k=se,z=ut,X=Qe,y=Je;const We=1/Ne;let ke=0;for(;ke<2;)ke+=1,c=P*z+O*j*X,u=-O*z+P*j*X,g=-P*X+O*j*z,v=O*k,m=O*X+P*j*z,p=P*k,l=Ye*g+ht*v,d=Ye*m+ht*p,h=-ht*g+Ye*v,f=-ht*m+Ye*p,x=c*Mt+l*Xe,b=u*Mt+d*Xe,L=-c*Xe+l*Mt,A=-u*Xe+d*Mt,D=h*Xe,I=f*Xe,E=h*Mt,S=f*Mt,_=12*x*x-3*L*L,Re=24*x*b-6*L*A,pe=12*b*b-3*A*A,Z=3*(c*c+l*l)+_*ft,J=6*(c*u+l*d)+Re*ft,Q=3*(u*u+d*d)+pe*ft,Ae=-6*c*h+ft*(-24*x*E-6*L*D),re=-6*(c*f+u*h)+ft*(-24*(b*E+x*S)+-6*(L*I+A*D)),de=-6*u*f+ft*(-24*b*S-6*A*I),Le=6*l*h+ft*(24*x*D-6*L*E),ie=6*(d*h+l*f)+ft*(24*(b*D+x*I)-6*(A*E+L*S)),me=6*d*f+ft*(24*b*I-6*A*S),Z=Z+Z+Ct*_,J=J+J+Ct*Re,Q=Q+Q+Ct*pe,fe=y*We,Ie=-.5*fe/Tn,ve=fe*Tn,he=-15*Ge*ve,w=x*L+b*A,M=b*L+x*A,B=b*A-x*L,ke===1&&(K=he,G=Ie,ne=fe,ce=ve,ue=w,Te=M,Ue=B,q=Z,Y=J,te=Q,ae=Ae,xe=re,we=de,Ee=Le,Ve=ie,C=me,Be=_,Me=Re,Pe=pe,P=De,O=Ce,j=T,k=N,z=V*ut+W*Qe,X=Qe*V-ut*W,y=H);const He=(4.7199672+(.2299715*An-U))%bt,et=(6.2565837+.017201977*An)%bt,pt=2*K*Te,at=2*K*Ue,Tt=2*G*xe,tt=2*G*(we-ae),Oe=-2*ne*Y,At=-2*ne*(te-q),nt=-2*ne*(-21-9*ft)*ze,Nt=2*ce*Me,qn=2*ce*(Pe-Be),Wt=-18*ce*ze,di=-2*G*Ve,xt=-2*G*(C-Ee),dn=2*he*M,as=2*he*B,Jt=2*Ie*re,jr=2*Ie*(de-Ae),J0=-2*fe*J,sa=-2*fe*(Q-Z),vf=-2*fe*(-21-9*ft)*Fe,xf=2*ve*Re,_f=2*ve*(pe-_),Mf=-18*ve*Fe,yf=-2*Ie*ie,Sf=-2*Ie*(me-Le);return{snodm:Qe,cnodm:ut,sinim:ht,cosim:Ye,sinomm:Xe,cosomm:Mt,day:An,e3:as,ee2:dn,em:Ge,emsq:ft,gam:U,peo:it,pgho:jn,pho:zi,pinco:Yn,plo:ui,rtemsq:Tn,se2:pt,se3:at,sgh2:Nt,sgh3:qn,sgh4:Wt,sh2:di,sh3:xt,si2:Tt,si3:tt,sl2:Oe,sl3:At,sl4:nt,s1:he,s2:Ie,s3:fe,s4:ve,s5:w,s6:M,s7:B,ss1:K,ss2:G,ss3:ne,ss4:ce,ss5:ue,ss6:Te,ss7:Ue,sz1:q,sz2:Y,sz3:te,sz11:ae,sz12:xe,sz13:we,sz21:Ee,sz22:Ve,sz23:C,sz31:Be,sz32:Me,sz33:Pe,xgh2:xf,xgh3:_f,xgh4:Mf,xh2:yf,xh3:Sf,xi2:Jt,xi3:jr,xl2:J0,xl3:sa,xl4:vf,nm:Ne,z1:Z,z2:J,z3:Q,z11:Ae,z12:re,z13:de,z21:Le,z22:ie,z23:me,z31:_,z32:Re,z33:pe,zmol:He,zmos:et}}function z7(n){const{cosim:e,argpo:t,s1:i,s2:s,s3:r,s4:o,s5:a,sinim:c,ss1:l,ss2:u,ss3:d,ss4:h,ss5:f,sz1:g,sz3:v,sz11:m,sz13:p,sz21:y,sz23:x,sz31:b,sz33:L,t:A,tc:D,gsto:I,mo:E,mdot:S,no:P,nodeo:O,nodedot:z,xpidot:X,z1:j,z3:k,z11:K,z13:G,z21:ne,z23:ce,z31:ue,z33:Te,ecco:Ue,eccsq:q}=n;let{emsq:Y,em:te,argpm:ae,inclm:xe,mm:we,nm:Ee,nodem:Ve,irez:C,atime:Be,d2201:Me,d2211:Pe,d3210:he,d3222:Ie,d4410:fe,d4422:ve,d5220:w,d5232:M,d5421:B,d5433:Z,dedt:J,didt:Q,dmdt:Ae,dnodt:re,domdt:de,del1:Le,del2:ie,del3:me,xfact:_,xlamo:Re,xli:pe,xni:ze}=n,Fe,Je,H,se,ee,$,le,Ne,Ge,Qe,ut,Xe,Mt,ht,Ye,ft,Ct,Tn,it,Yn,ui,jn,zi,An,gn,Et,un,T,N,W,V,U;const oe=17891679e-13,Se=21460748e-13,De=22123015e-14,Ce=17891679e-13,We=73636953e-16,ke=21765803e-16,He=.0043752690880113,et=37393792e-14,pt=11428639e-14,at=.00015835218,Tt=119459e-10;C=0,Ee<.0052359877&&Ee>.0034906585&&(C=1),Ee>=.00826&&Ee<=.00924&&te>=.5&&(C=2);const tt=l*Tt*f,Oe=u*Tt*(m+p),At=-Tt*d*(g+v-14-6*Y),nt=h*Tt*(b+L-6);let Nt=-Tt*u*(y+x);(xe<.052359877||xe>Ii-.052359877)&&(Nt=0),c!==0&&(Nt/=c);const qn=nt-e*Nt;J=tt+i*at*a,Q=Oe+s*at*(K+G),Ae=At-at*r*(j+k-14-6*Y);const Wt=o*at*(ue+Te-6);let di=-at*s*(ne+ce);(xe<.052359877||xe>Ii-.052359877)&&(di=0),de=qn+Wt,re=Nt,c!==0&&(de-=e/c*di,re+=di/c);const xt=0,dn=(I+D*He)%bt;if(te+=J*A,xe+=Q*A,ae+=de*A,Ve+=re*A,we+=Ae*A,C!==0){if(W=(Ee/Ai)**Ho,C===2){V=e*e;const as=te;te=Ue;const Jt=Y;Y=q,U=te*Y,ht=-.306-(te-.64)*.44,te<=.65?(Ye=3.616-13.247*te+16.29*Y,Ct=-19.302+117.39*te-228.419*Y+156.591*U,Tn=-18.9068+109.7927*te-214.6334*Y+146.5816*U,it=-41.122+242.694*te-471.094*Y+313.953*U,Yn=-146.407+841.88*te-1629.014*Y+1083.435*U,ui=-532.114+3017.977*te-5740.032*Y+3708.276*U):(Ye=-72.099+331.819*te-508.738*Y+266.724*U,Ct=-346.844+1582.851*te-2415.925*Y+1246.113*U,Tn=-342.585+1554.908*te-2366.899*Y+1215.972*U,it=-1052.797+4758.686*te-7193.992*Y+3651.957*U,Yn=-3581.69+16178.11*te-24462.77*Y+12422.52*U,te>.715?ui=-5149.66+29936.92*te-54087.36*Y+31324.56*U:ui=1464.74-4664.75*te+3763.64*Y),te<.7?(An=-919.2277+4988.61*te-9064.77*Y+5542.21*U,jn=-822.71072+4568.6173*te-8491.4146*Y+5337.524*U,zi=-853.666+4690.25*te-8624.77*Y+5341.4*U):(An=-37995.78+161616.52*te-229838.2*Y+109377.94*U,jn=-51752.104+218913.95*te-309468.16*Y+146349.42*U,zi=-40023.88+170470.89*te-242699.48*Y+115605.82*U),gn=c*c,Fe=.75*(1+2*e+V),Je=1.5*gn,se=1.875*c*(1-2*e-3*V),ee=-1.875*c*(1+2*e-3*V),le=35*gn*Fe,Ne=39.375*gn*gn,Ge=9.84375*c*(gn*(1-2*e-5*V)+.33333333*(-2+4*e+6*V)),Qe=c*(4.92187512*gn*(-2-4*e+10*V)+6.56250012*(1+2*e-3*V)),ut=29.53125*c*(2-8*e+V*(-12+8*e+10*V)),Xe=29.53125*c*(-2-8*e+V*(12+8*e-10*V)),T=Ee*Ee,N=W*W,un=3*T*N,Et=un*Ce,Me=Et*Fe*ht,Pe=Et*Je*Ye,un*=W,Et=un*et,he=Et*se*Ct,Ie=Et*ee*Tn,un*=W,Et=2*un*We,fe=Et*le*it,ve=Et*Ne*Yn,un*=W,Et=un*pt,w=Et*Ge*ui,M=Et*Qe*zi,Et=2*un*ke,B=Et*ut*jn,Z=Et*Xe*An,Re=(E+O+O-(dn+dn))%bt,_=S+Ae+2*(z+re-He)-P,te=as,Y=Jt}C===1&&(Mt=1+Y*(-2.5+.8125*Y),Ct=1+2*Y,ft=1+Y*(-6+6.60937*Y),Fe=.75*(1+e)*(1+e),H=.9375*c*c*(1+3*e)-.75*(1+e),$=1+e,$=1.875*$*$*$,Le=3*Ee*Ee*W*W,ie=2*Le*Fe*Mt*oe,me=3*Le*$*ft*De*W,Le=Le*H*Ct*Se*W,Re=(E+O+t-dn)%bt,_=S+X+Ae+de+re-(P+He)),pe=Re,ze=P,Be=0,Ee=P+xt}return{em:te,argpm:ae,inclm:xe,mm:we,nm:Ee,nodem:Ve,irez:C,atime:Be,d2201:Me,d2211:Pe,d3210:he,d3222:Ie,d4410:fe,d4422:ve,d5220:w,d5232:M,d5421:B,d5433:Z,dedt:J,didt:Q,dmdt:Ae,dndt:xt,dnodt:re,domdt:de,del1:Le,del2:ie,del3:me,xfact:_,xlamo:Re,xli:pe,xni:ze}}function _u(n){const e=(n-2451545)/36525;let t=-62e-7*e*e*e+.093104*e*e+(876600*3600+8640184812866e-6)*e+67310.54841;return t=t*uo/240%bt,t<0&&(t+=bt),t}function F7(n,e,t,i,s,r,o){return n instanceof Date?_u(b1(n)):_u(n)}function B7(n){const{ecco:e,epoch:t,inclo:i,opsmode:s}=n;let{no:r}=n;const o=e*e,a=1-o,c=Math.sqrt(a),l=Math.cos(i),u=l*l,d=(Ai/r)**Ho,h=.75*Es*(3*u-1)/(c*a);let f=h/(d*d);const g=d*(1-f*f-f*(1/3+134*f*f/81));f=h/(g*g),r/=1+f;const v=(Ai/r)**Ho,m=Math.sin(i),p=v*a,y=1-5*u,x=-y-u-u,b=1/v,L=p*p,A=v*(1-e),D="n";let I;if(s==="a"){const E=t-7305,S=Math.floor(E+1e-8),P=E-S,O=.017202791694070362,z=1.7321343856509375,X=5075514194322695e-30,j=O+bt;I=(z+O*S+j*P+E*E*X)%bt,I<0&&(I+=bt)}else I=F7(t+24332815e-1);return{no:r,method:D,ainv:b,ao:v,con41:x,con42:y,cosio:l,cosio2:u,eccsq:o,omeosq:a,posq:L,rp:A,rteosq:c,sinio:m,gsto:I}}function k7(n){const{irez:e,d2201:t,d2211:i,d3210:s,d3222:r,d4410:o,d4422:a,d5220:c,d5232:l,d5421:u,d5433:d,dedt:h,del1:f,del2:g,del3:v,didt:m,dmdt:p,dnodt:y,domdt:x,argpo:b,argpdot:L,t:A,tc:D,gsto:I,xfact:E,xlamo:S,no:P}=n;let{atime:O,em:z,argpm:X,inclm:j,xli:k,mm:K,xni:G,nodem:ne,nm:ce}=n;const ue=.13130908,Te=2.8843198,Ue=.37448087,q=5.7686396,Y=.95240898,te=1.8014998,ae=1.050833,xe=4.4108898,we=.0043752690880113,Ee=720,Ve=-720,C=259200;let Be,Me,Pe,he,Ie,fe,ve,w,M=0,B=0;const Z=(I+D*we)%bt;if(z+=h*A,j+=m*A,X+=x*A,ne+=y*A,K+=p*A,e!==0){(O===0||A*O<=0||Math.abs(A)<Math.abs(O))&&(O=0,G=P,k=S),A>0?Be=Ee:Be=Ve;let J=381;for(;J===381;)e!==2?(ve=f*Math.sin(k-ue)+g*Math.sin(2*(k-Te))+v*Math.sin(3*(k-Ue)),Ie=G+E,fe=f*Math.cos(k-ue)+2*g*Math.cos(2*(k-Te))+3*v*Math.cos(3*(k-Ue)),fe*=Ie):(w=b+L*O,Pe=w+w,Me=k+k,ve=t*Math.sin(Pe+k-q)+i*Math.sin(k-q)+s*Math.sin(w+k-Y)+r*Math.sin(-w+k-Y)+o*Math.sin(Pe+Me-te)+a*Math.sin(Me-te)+c*Math.sin(w+k-ae)+l*Math.sin(-w+k-ae)+u*Math.sin(w+Me-xe)+d*Math.sin(-w+Me-xe),Ie=G+E,fe=t*Math.cos(Pe+k-q)+i*Math.cos(k-q)+s*Math.cos(w+k-Y)+r*Math.cos(-w+k-Y)+c*Math.cos(w+k-ae)+l*Math.cos(-w+k-ae)+2*(o*Math.cos(Pe+Me-te)+a*Math.cos(Me-te)+u*Math.cos(w+Me-xe)+d*Math.cos(-w+Me-xe)),fe*=Ie),Math.abs(A-O)>=Ee?J=381:(B=A-O,J=0),J===381&&(k+=Ie*Be+ve*C,G+=ve*Be+fe*C,O+=Be);ce=G+ve*B+fe*B*B*.5,he=k+Ie*B+ve*B*B*.5,e!==1?(K=he-2*ne+2*Z,M=ce-P):(K=he-ne-X+Z,M=ce-P),ce=P+M}return{atime:O,em:z,argpm:X,inclm:j,xli:k,mm:K,xni:G,nodem:ne,dndt:M,nm:ce}}var Si;(function(n){n[n.None=0]="None",n[n.MeanEccentricityOutOfRange=1]="MeanEccentricityOutOfRange",n[n.MeanMotionBelowZero=2]="MeanMotionBelowZero",n[n.PerturbedEccentricityOutOfRange=3]="PerturbedEccentricityOutOfRange",n[n.SemiLatusRectumBelowZero=4]="SemiLatusRectumBelowZero",n[n.Decayed=6]="Decayed"})(Si||(Si={}));function dh(n,e){let t,i,s,r,o,a,c,l,u,d,h,f,g,v,m,p,y,x,b,L,A,D,I,E,S,P,O;n.t=e,n.error=Si.None;const X=n.mo+n.mdot*n.t,j=n.argpo+n.argpdot*n.t,k=n.nodeo+n.nodedot*n.t;u=j,A=X;const K=n.t*n.t;if(I=k+n.nodecf*K,y=1-n.cc1*n.t,x=n.bstar*n.cc4*n.t,b=n.t2cof*K,n.isimp!==1){c=n.omgcof*n.t;const Ge=1+n.eta*Math.cos(X);a=n.xmcof*(Ge*Ge*Ge-n.delmo),p=c+a,A=X+p,u=j-p,f=K*n.t,g=f*n.t,y=y-n.d2*K-n.d3*f-n.d4*g,x+=n.bstar*n.cc5*(Math.sin(A)-n.sinmao),b=b+n.t3cof*f+g*(n.t4cof+n.t*n.t5cof)}n.tempa=y,D=n.no;let G=n.ecco;if(L=n.inclo,n.method==="d"){v=n.t;const Ge={irez:n.irez,d2201:n.d2201,d2211:n.d2211,d3210:n.d3210,d3222:n.d3222,d4410:n.d4410,d4422:n.d4422,d5220:n.d5220,d5232:n.d5232,d5421:n.d5421,d5433:n.d5433,dedt:n.dedt,del1:n.del1,del2:n.del2,del3:n.del3,didt:n.didt,dmdt:n.dmdt,dnodt:n.dnodt,domdt:n.domdt,argpo:n.argpo,argpdot:n.argpdot,t:n.t,tc:v,gsto:n.gsto,xfact:n.xfact,xlamo:n.xlamo,no:n.no,atime:n.atime,em:G,argpm:u,inclm:L,xli:n.xli,mm:A,xni:n.xni,nodem:I,nm:D};({em:G,argpm:u,inclm:L,mm:A,nodem:I,nm:D}=k7(Ge))}if(D<=0)return n.error=Si.MeanMotionBelowZero,null;const ne=(Ai/D)**Ho*y*y;if(D=Ai/ne**1.5,G-=x,G>=1||G<-.001)return n.error=Si.MeanEccentricityOutOfRange,null;G<1e-6&&(G=1e-6),A+=n.no*b,S=A+u+I,I%=bt,u%=bt,S%=bt,A=(S-u-I)%bt;const ce={am:ne,em:G,im:L,Om:I,om:u,mm:A,nm:D},ue=Math.sin(L),Te=Math.cos(L);let Ue=G;if(E=L,d=u,O=I,P=A,r=ue,s=Te,n.method==="d"){const Ge={inclo:n.inclo,init:"n",ep:Ue,inclp:E,nodep:O,argpp:d,mp:P,opsmode:n.operationmode},Qe=uh(n,Ge);if({ep:Ue,nodep:O,argpp:d,mp:P}=Qe,E=Qe.inclp,E<0&&(E=-E,O+=Ii,d-=Ii),Ue<0||Ue>1)return n.error=Si.PerturbedEccentricityOutOfRange,null}n.method==="d"&&(r=Math.sin(E),s=Math.cos(E),n.aycof=-.5*Ts*r,Math.abs(s+1)>15e-13?n.xlcof=-.25*Ts*r*(3+5*s)/(1+s):n.xlcof=-.25*Ts*r*(3+5*s)/15e-13);const q=Ue*Math.cos(d);p=1/(ne*(1-Ue*Ue));const Y=Ue*Math.sin(d)+p*n.aycof,ae=(P+d+O+p*n.xlcof*q-O)%bt;l=ae,m=9999.9;let xe=1;for(;Math.abs(m)>=1e-12&&xe<=10;)i=Math.sin(l),t=Math.cos(l),m=1-t*q-i*Y,m=(ae-Y*t+q*i-l)/m,Math.abs(m)>=.95&&(m>0?m=.95:m=-.95),l+=m,xe+=1;const we=q*t+Y*i,Ee=q*i-Y*t,Ve=q*q+Y*Y,C=ne*(1-Ve);if(C<0)return n.error=Si.SemiLatusRectumBelowZero,null;const Be=ne*(1-we),Me=Math.sqrt(ne)*Ee/Be,Pe=Math.sqrt(C)/Be,he=Math.sqrt(1-Ve);p=Ee/(1+he);const Ie=ne/Be*(i-Y-q*p),fe=ne/Be*(t-q+Y*p);h=Math.atan2(Ie,fe);const ve=(fe+fe)*Ie,w=1-2*Ie*Ie;p=1/C;const M=.5*Es*p,B=M*p;n.method==="d"&&(o=s*s,n.con41=3*o-1,n.x1mth2=1-o,n.x7thm1=7*o-1);const Z=Be*(1-1.5*B*he*n.con41)+.5*M*n.x1mth2*w;if(Z<1)return n.error=Si.Decayed,null;h-=.25*B*n.x7thm1*ve;const J=O+1.5*B*s*ve,Q=E+1.5*B*s*r*w,Ae=Me-D*M*n.x1mth2*ve/Ai,re=Pe+D*M*(n.x1mth2*w+1.5*n.con41)/Ai,de=Math.sin(h),Le=Math.cos(h),ie=Math.sin(J),me=Math.cos(J),_=Math.sin(Q),Re=Math.cos(Q),pe=-ie*Re,ze=me*Re,Fe=pe*de+me*Le,Je=ze*de+ie*Le,H=_*de,se=pe*Le-me*de,ee=ze*Le-ie*de,$=_*Le,le={x:Z*Fe*yn,y:Z*Je*yn,z:Z*H*yn},Ne={x:(Ae*Fe+re*se)*Ic,y:(Ae*Je+re*ee)*Ic,z:(Ae*H+re*$)*Ic};return{position:le,velocity:Ne,meanElements:ce}}function G7(n,e){const{opsmode:t,epoch:i,xbstar:s,xecco:r,xargpo:o,xinclo:a,xmo:c,xno:l,xnodeo:u}=e;let d,h,f,g,v,m,p,y,x,b,L,A,D,I,E,S,P,O,z,X,j,k,K,G,ne,ce,ue,Te,Ue,q,Y,te,ae,xe,we,Ee,Ve,C,Be,Me,Pe,he,Ie,fe,ve,w,M,B,Z,J,Q,Ae,re,de,Le,ie;const me=15e-13,_=n;_.isimp=0,_.method="n",_.aycof=0,_.con41=0,_.cc1=0,_.cc4=0,_.cc5=0,_.d2=0,_.d3=0,_.d4=0,_.delmo=0,_.eta=0,_.argpdot=0,_.omgcof=0,_.sinmao=0,_.t=0,_.t2cof=0,_.t3cof=0,_.t4cof=0,_.t5cof=0,_.x1mth2=0,_.x7thm1=0,_.mdot=0,_.nodedot=0,_.xlcof=0,_.xmcof=0,_.nodecf=0,_.irez=0,_.d2201=0,_.d2211=0,_.d3210=0,_.d3222=0,_.d4410=0,_.d4422=0,_.d5220=0,_.d5232=0,_.d5421=0,_.d5433=0,_.dedt=0,_.del1=0,_.del2=0,_.del3=0,_.didt=0,_.dmdt=0,_.dnodt=0,_.domdt=0,_.e3=0,_.ee2=0,_.peo=0,_.pgho=0,_.pho=0,_.pinco=0,_.plo=0,_.se2=0,_.se3=0,_.sgh2=0,_.sgh3=0,_.sgh4=0,_.sh2=0,_.sh3=0,_.si2=0,_.si3=0,_.sl2=0,_.sl3=0,_.sl4=0,_.gsto=0,_.xfact=0,_.xgh2=0,_.xgh3=0,_.xgh4=0,_.xh2=0,_.xh3=0,_.xi2=0,_.xi3=0,_.xl2=0,_.xl3=0,_.xl4=0,_.xlamo=0,_.zmol=0,_.zmos=0,_.atime=0,_.xli=0,_.xni=0,_.bstar=s,_.ecco=r,_.argpo=o,_.inclo=a,_.mo=c,_.no=l,_.nokozai=l,_.nodeo=u,_.operationmode=t;const Re=78/yn+1,pe=42/yn,ze=pe*pe*pe*pe;_.init="y",_.t=0;const Fe={ecco:_.ecco,epoch:i,inclo:_.inclo,no:_.no,method:_.method,opsmode:_.operationmode},Je=B7(Fe),{ao:H,con42:se,cosio:ee,cosio2:$,eccsq:le,omeosq:Ne,posq:Ge,rp:Qe,rteosq:ut,sinio:Xe}=Je;if(_.no=Je.no,_.con41=Je.con41,_.gsto=Je.gsto,_.a=(_.no*I7)**(-2/3),_.alta=_.a*(1+_.ecco)-1,_.altp=_.a*(1-_.ecco)-1,_.error=0,Ne>=0||_.no>=0){if(_.isimp=0,Qe<220/yn+1&&(_.isimp=1),ue=Re,j=ze,O=(Qe-1)*yn,O<156){ue=O-78,O<98&&(ue=20);const ht=(120-ue)/yn;j=ht*ht*ht*ht,ue=ue/yn+1}z=1/Ge,w=1/(H-ue),_.eta=H*_.ecco*w,A=_.eta*_.eta,L=_.ecco*_.eta,X=Math.abs(1-A),m=j*w**4,p=m/X**3.5,g=p*_.no*(H*(1+1.5*A+L*(4+A))+.375*Es*w/X*_.con41*(8+3*A*(8+A))),_.cc1=_.bstar*g,v=0,_.ecco>1e-4&&(v=-2*m*w*Ts*_.no*Xe/_.ecco),_.x1mth2=1-$,_.cc4=2*_.no*p*H*Ne*(_.eta*(2+.5*A)+_.ecco*(.5+2*A)-Es*w/(H*X)*(-3*_.con41*(1-2*L+A*(1.5-.5*L))+.75*_.x1mth2*(2*A-L*(1+A))*Math.cos(2*_.argpo))),_.cc5=2*p*H*Ne*(1+2.75*(A+L)+L*A),y=$*$,Ie=1.5*Es*z*_.no,fe=.5*Ie*Es*z,ve=-.46875*U7*z*z*_.no,_.mdot=_.no+.5*Ie*ut*_.con41+.0625*fe*ut*(13-78*$+137*y),_.argpdot=-.5*Ie*se+.0625*fe*(7-114*$+395*y)+ve*(3-36*$+49*y),B=-Ie*ee,_.nodedot=B+(.5*fe*(4-19*$)+2*ve*(3-7*$))*ee,M=_.argpdot+_.nodedot,_.omgcof=_.bstar*v*Math.cos(_.argpo),_.xmcof=0,_.ecco>1e-4&&(_.xmcof=-Ho*m*_.bstar/L),_.nodecf=3.5*Ne*B*_.cc1,_.t2cof=1.5*_.cc1,Math.abs(ee+1)>15e-13?_.xlcof=-.25*Ts*Xe*(3+5*ee)/(1+ee):_.xlcof=-.25*Ts*Xe*(3+5*ee)/me,_.aycof=-.5*Ts*Xe;const Mt=1+_.eta*Math.cos(_.mo);if(_.delmo=Mt*Mt*Mt,_.sinmao=Math.sin(_.mo),_.x7thm1=7*$-1,2*Ii/_.no>=225){_.method="d",_.isimp=1,Pe=0,E=_.inclo;const ht={epoch:i,ep:_.ecco,argpp:_.argpo,tc:Pe,inclp:_.inclo,nodep:_.nodeo,np:_.no,e3:_.e3,ee2:_.ee2,peo:_.peo,pgho:_.pgho,pho:_.pho,pinco:_.pinco,plo:_.plo,se2:_.se2,se3:_.se3,sgh2:_.sgh2,sgh3:_.sgh3,sgh4:_.sgh4,sh2:_.sh2,sh3:_.sh3,si2:_.si2,si3:_.si3,sl2:_.sl2,sl3:_.sl3,sl4:_.sl4,xgh2:_.xgh2,xgh3:_.xgh3,xgh4:_.xgh4,xh2:_.xh2,xh3:_.xh3,xi2:_.xi2,xi3:_.xi3,xl2:_.xl2,xl3:_.xl3,xl4:_.xl4,zmol:_.zmol,zmos:_.zmos},Ye=O7(ht);_.e3=Ye.e3,_.ee2=Ye.ee2,_.peo=Ye.peo,_.pgho=Ye.pgho,_.pho=Ye.pho,_.pinco=Ye.pinco,_.plo=Ye.plo,_.se2=Ye.se2,_.se3=Ye.se3,_.sgh2=Ye.sgh2,_.sgh3=Ye.sgh3,_.sgh4=Ye.sgh4,_.sh2=Ye.sh2,_.sh3=Ye.sh3,_.si2=Ye.si2,_.si3=Ye.si3,_.sl2=Ye.sl2,_.sl3=Ye.sl3,_.sl4=Ye.sl4,{sinim:h,cosim:d,em:x,emsq:b,s1:k,s2:K,s3:G,s4:ne,s5:ce,ss1:Te,ss2:Ue,ss3:q,ss4:Y,ss5:te,sz1:ae,sz3:xe,sz11:we,sz13:Ee,sz21:Ve,sz23:C,sz31:Be,sz33:Me}=Ye,_.xgh2=Ye.xgh2,_.xgh3=Ye.xgh3,_.xgh4=Ye.xgh4,_.xh2=Ye.xh2,_.xh3=Ye.xh3,_.xi2=Ye.xi2,_.xi3=Ye.xi3,_.xl2=Ye.xl2,_.xl3=Ye.xl3,_.xl4=Ye.xl4,_.zmol=Ye.zmol,_.zmos=Ye.zmos,{nm:P,z1:Z,z3:J,z11:Q,z13:Ae,z21:re,z23:de,z31:Le,z33:ie}=Ye;const ft={init:_.init,ep:_.ecco,inclp:_.inclo,nodep:_.nodeo,argpp:_.argpo,mp:_.mo,opsmode:_.operationmode},Ct=uh(_,ft);_.ecco=Ct.ep,_.inclo=Ct.inclp,_.nodeo=Ct.nodep,_.argpo=Ct.argpp,_.mo=Ct.mp,D=0,I=0,S=0;const Tn={cosim:d,emsq:b,argpo:_.argpo,s1:k,s2:K,s3:G,s4:ne,s5:ce,sinim:h,ss1:Te,ss2:Ue,ss3:q,ss4:Y,ss5:te,sz1:ae,sz3:xe,sz11:we,sz13:Ee,sz21:Ve,sz23:C,sz31:Be,sz33:Me,t:_.t,tc:Pe,gsto:_.gsto,mo:_.mo,mdot:_.mdot,no:_.no,nodeo:_.nodeo,nodedot:_.nodedot,xpidot:M,z1:Z,z3:J,z11:Q,z13:Ae,z21:re,z23:de,z31:Le,z33:ie,ecco:_.ecco,eccsq:le,em:x,argpm:D,inclm:E,mm:S,nm:P,nodem:I,irez:_.irez,atime:_.atime,d2201:_.d2201,d2211:_.d2211,d3210:_.d3210,d3222:_.d3222,d4410:_.d4410,d4422:_.d4422,d5220:_.d5220,d5232:_.d5232,d5421:_.d5421,d5433:_.d5433,dedt:_.dedt,didt:_.didt,dmdt:_.dmdt,dnodt:_.dnodt,domdt:_.domdt,del1:_.del1,del2:_.del2,del3:_.del3,xfact:_.xfact,xlamo:_.xlamo,xli:_.xli,xni:_.xni},it=z7(Tn);_.irez=it.irez,_.atime=it.atime,_.d2201=it.d2201,_.d2211=it.d2211,_.d3210=it.d3210,_.d3222=it.d3222,_.d4410=it.d4410,_.d4422=it.d4422,_.d5220=it.d5220,_.d5232=it.d5232,_.d5421=it.d5421,_.d5433=it.d5433,_.dedt=it.dedt,_.didt=it.didt,_.dmdt=it.dmdt,_.dnodt=it.dnodt,_.domdt=it.domdt,_.del1=it.del1,_.del2=it.del2,_.del3=it.del3,_.xfact=it.xfact,_.xlamo=it.xlamo,_.xli=it.xli,_.xni=it.xni}_.isimp!==1&&(f=_.cc1*_.cc1,_.d2=4*H*w*f,he=_.d2*w*_.cc1/3,_.d3=(17*H+ue)*he,_.d4=.5*he*H*w*(221*H+31*ue)*_.cc1,_.t3cof=_.d2+2*f,_.t4cof=.25*(3*_.d3+_.cc1*(12*_.d2+10*f)),_.t5cof=.2*(3*_.d4+12*_.cc1*_.d3+6*_.d2*_.d2+15*f*(2*_.d2+f)))}dh(_,0),_.init="n"}function W7(n,e){G7(n,{opsmode:e,satn:n.satnum,epoch:n.jdsatepoch-24332815e-1,xbstar:n.bstar,xecco:n.ecco,xargpo:n.argpo,xinclo:n.inclo,xmo:n.mo,xno:n.no,xnodeo:n.nodeo})}function V7(n,e){const t="i",s=n.substring(2,7),r=parseInt(n.substring(18,20),10),o=parseFloat(n.substring(20,32));let a=parseFloat(n.substring(33,43)),c=parseFloat(`${n.substring(44,45)}.${n.substring(45,50)}E${n.substring(50,52)}`);const l=parseFloat(`${n.substring(53,54)}.${n.substring(54,59)}E${n.substring(59,61)}`),u=parseFloat(e.substring(8,16))*uo,d=parseFloat(e.substring(17,25))*uo,h=parseFloat(`.${e.substring(26,33).replace(/\s/g,"0")}`),f=parseFloat(e.substring(34,42))*uo,g=parseFloat(e.substring(43,51))*uo,v=parseFloat(e.substring(52,63))/Hc;a/=Hc*1440,c/=Hc*1440*1440;const m=r<57?r+2e3:r+1900,p=N7(m,o),{mon:y,day:x,hr:b,minute:L,sec:A}=p,D=b1(m,y,x,b,L,A),I={error:0,satnum:s,epochyr:r,epochdays:o,ndot:a,nddot:c,bstar:l,inclo:u,nodeo:d,ecco:h,argpo:f,mo:g,no:v,jdsatepoch:D};return W7(I,t),I}const X7=n=>n.tempa<=0;function Y7(n,...e){const t=e.at(-1),i=typeof t=="object"&&!(t instanceof Date)?t:void 0,s=i?e.slice(0,-1):e,o=(b1(...s)-n.jdsatepoch)*R7,a=dh(n,o);return i?.communityDecayCheckEnabled&&a&&X7(n)?(n.error=Si.Decayed,null):a}const j7=69.184,q7=Date.UTC(2e3,0,1,12,0,0),K7=23.439281,Z7=1495978707e-1,J7=.0643;function Q7(n){const e=V7(n.line1,n.line2);if(e.error!==0||!isFinite(e.no)||!isFinite(e.inclo)||!isFinite(e.ecco))throw new Error(`TLE parse failed for ${n.name} (error ${e.error})`);return{satrec:e,tle:n}}function $7(n){return q7+(n-j7/86400)*864e5}function e8(n,e=K7){const t=e*Math.PI/180,i=Math.cos(t),s=Math.sin(t),[r,o,a]=n;return[r,o*i-a*s,o*s+a*i]}function hh(n,e){const t=new Date($7(e)),i=Y7(n.satrec,t);if(!i||!isFinite(i.position.x)||!isFinite(i.position.y)||!isFinite(i.position.z))return null;const s={position:[i.position.x,i.position.y,i.position.z],velocity:[i.velocity.x,i.velocity.y,i.velocity.z]};return{posAu:e8(s.position).map(o=>o/Z7),eci:s}}function t8(n){let e=n>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function n8(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function _n(n,e,t){const i=s=>Math.round(255*(n[s]+(e[s]-n[s])*t));return`rgb(${i(0)},${i(1)},${i(2)})`}function i8(n){const i=document.createElement("canvas");i.width=512,i.height=256;const s=i.getContext("2d"),r=t8(n8(n.id)),o=n.color,a=n.color2??n.color,c=n.texture??"rock";if(c==="sun"){const u=s.createLinearGradient(0,0,0,256);u.addColorStop(0,_n(o,a,.6)),u.addColorStop(.5,_n(o,a,.2)),u.addColorStop(1,_n(o,a,.6)),s.fillStyle=u,s.fillRect(0,0,512,256);for(let d=0;d<900;d++){const h=r()*512,f=r()*256,g=1+r()*5;s.fillStyle=r()>.5?`rgba(255,220,140,${.05+r()*.1})`:`rgba(255,140,40,${.05+r()*.08})`,s.beginPath(),s.arc(h,f,g,0,Math.PI*2),s.fill()}}else if(c==="gas"){const u=14+Math.floor(r()*8);for(let d=0;d<u;d++){const h=d/u*256,f=256/u,g=.5+.5*Math.sin(d/u*Math.PI*(2+r()*2));s.fillStyle=_n(o,a,g),s.fillRect(0,h,512,f+1)}for(let d=0;d<260;d++){const h=r()*512,f=r()*256,g=20+r()*90,v=2+r()*6;s.fillStyle=`rgba(255,255,255,${.02+r()*.05})`,s.fillRect(h,f,g,v)}if(r()>.4){const d=r()*512,h=256*(.3+r()*.4),f=26+r()*20,g=10+r()*8;s.fillStyle=_n(a,[1,.95,.9],.55),s.beginPath(),s.ellipse(d,h,f,g,0,0,Math.PI*2),s.fill()}}else if(c==="ice"){const u=s.createLinearGradient(0,0,0,256);u.addColorStop(0,_n(o,[1,1,1],.25)),u.addColorStop(.5,_n(o,a,.3)),u.addColorStop(1,_n(o,[1,1,1],.25)),s.fillStyle=u,s.fillRect(0,0,512,256);for(let d=0;d<40;d++){const h=r()*256;s.fillStyle=`rgba(255,255,255,${.03+r()*.05})`,s.fillRect(0,h,512,1+r()*3)}}else if(c==="earth"){s.fillStyle=_n(o,[0,.1,.35],.3),s.fillRect(0,0,512,256);const u=_n(n.color2??o,[.3,.5,.25],.5);for(let d=0;d<26;d++){const h=r()*512,f=256*(.15+r()*.7);s.fillStyle=r()>.25?u:_n(o,[.4,.35,.25],.5);const g=6+Math.floor(r()*8);for(let v=0;v<g;v++){const m=h+(r()-.5)*90,p=f+(r()-.5)*44;s.beginPath(),s.arc(m,p,6+r()*18,0,Math.PI*2),s.fill()}}s.fillStyle="rgba(245,248,252,0.9)",s.fillRect(0,0,512,14),s.fillRect(0,242,512,14);for(let d=0;d<120;d++){const h=r()*512,f=r()*256;s.fillStyle=`rgba(255,255,255,${.06+r()*.12})`,s.beginPath(),s.ellipse(h,f,8+r()*26,2+r()*5,0,0,Math.PI*2),s.fill()}}else if(c==="volcanic"){s.fillStyle=_n(o,a,.4),s.fillRect(0,0,512,256);for(let u=0;u<300;u++){const d=r()*512,h=r()*256,f=1+r()*4;s.fillStyle=r()>.7?`rgba(255,90,20,${.25+r()*.4})`:`rgba(60,40,30,${.1+r()*.2})`,s.beginPath(),s.arc(d,h,f,0,Math.PI*2),s.fill()}}else{s.fillStyle=_n(o,a,.3),s.fillRect(0,0,512,256);for(let u=0;u<700;u++){const d=r()*512,h=r()*256,f=.5+r()*3,g=r()>.5?"255,255,255":"0,0,0";s.fillStyle=`rgba(${g},${.03+r()*.08})`,s.beginPath(),s.arc(d,h,f,0,Math.PI*2),s.fill()}for(let u=0;u<90;u++){const d=r()*512,h=r()*256,f=2+r()*9;s.fillStyle=`rgba(0,0,0,${.12+r()*.12})`,s.beginPath(),s.arc(d,h,f,0,Math.PI*2),s.fill(),s.strokeStyle=`rgba(255,255,255,${.08+r()*.1})`,s.lineWidth=1,s.beginPath(),s.arc(d,h,f,-.4*Math.PI,.6*Math.PI),s.stroke()}}const l=new kr(i);return l.colorSpace=wt,l.wrapS=Tr,l}const s8={A:690,B:665,C:725,D:725,E:620,F:580,G:770,H:755,I:350,J:430,K:720,L:565,M:945,N:760,O:775,P:635,Q:775,R:695,S:610,T:630,U:730,V:680,W:1020,X:680,Y:670,Z:600},Cn=512,fh=128,r8=60,o8=464,ph=.24;function z0(n){const e=n.toUpperCase(),t=e.split("").map(u=>s8[u]??600),i=t.reduce((u,d)=>u+d,0)/1e3,s=ph,r=Math.min(r8,o8/(i+s*(e.length-1))),o=t.map(u=>u/1e3*r),a=r*s,c=o.reduce((u,d)=>u+d,0)+a*(e.length-1),l=Cn/2-c/2;return{fontSize:r,inkStartX:l,inkWidthPx:c,charWidths:o}}function a8(n,e,t="base"){n.textAlign="center",n.textBaseline="middle";const i=e.toUpperCase(),{fontSize:s,inkStartX:r,inkWidthPx:o,charWidths:a}=z0(e),c=s*ph;n.font=`${s}px Georgia, "Times New Roman", serif`;const l=()=>{let h=r;for(let f=0;f<i.length;f++)n.fillText(i[f],h+a[f]/2,50),h+=a[f]+c},u=t==="green"?{glow:"rgba(124, 252, 90, 0.9)",halo:"rgba(150, 255, 120, 0.85)",core:"#eaffe8",flourish:"rgba(124, 252, 90, 0.5)",diamond:"rgba(190, 255, 160, 0.85)"}:{glow:"rgba(143, 176, 255, 0.9)",halo:"rgba(190, 210, 250, 0.9)",core:"#eef4ff",flourish:"rgba(160, 185, 235, 0.5)",diamond:"rgba(205, 224, 255, 0.85)"};n.shadowColor=u.glow,n.shadowBlur=14,n.fillStyle=u.halo,l(),l(),n.shadowBlur=0,n.fillStyle=u.core,l();const d=90;n.strokeStyle=u.flourish,n.lineWidth=2,n.beginPath(),n.moveTo(r-16,d),n.lineTo(Cn/2-10,d),n.moveTo(Cn/2+10,d),n.lineTo(r+o+16,d),n.stroke(),n.fillStyle=u.diamond,n.beginPath(),n.moveTo(Cn/2,d-5),n.lineTo(Cn/2+5,d),n.lineTo(Cn/2,d+5),n.lineTo(Cn/2-5,d),n.closePath(),n.fill()}function c8(n){const e=document.createElement("canvas");e.width=256,e.height=64;const t=e.getContext("2d");t.font="600 30px system-ui, sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillStyle="rgba(10,14,24,0.45)";const i=t.measureText(n).width;t.fillRect(128-i/2-10,12,i+20,40),t.fillStyle="#dbe6f5",t.fillText(n,128,33);const s=new kr(e);return s.colorSpace=wt,s}const l8=[{id:"asteroid-belt",name:"Main asteroid belt",count:1100,seed:24301,a:[2.1,3.3],e:[0,.25],i:[0,12],baseSize:.027,sizeJitter:.5,color:11575945,farPointSize:.75},{id:"kuiper-belt",name:"Kuiper belt",count:1400,seed:6923,a:[30,48],e:[0,.3],i:[0,8],baseSize:.05,sizeJitter:.6,color:12374766,farPointSize:.7}];function u8(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function d8(n){const e=u8(n.seed),t=(s,r)=>s+e()*(r-s),i=[];for(let s=0;s<n.count;s++){const r=t(n.a[0],n.a[1]),o=t(n.e[0],n.e[1]),a=t(n.i[0],n.i[1]),c=365.25*Math.pow(r,1.5);i.push({elements:{a:r,e:o,i:a,node:t(0,360),peri:t(0,360),M0:t(0,360),n:360/c},size:n.baseSize*(1-n.sizeJitter+2*n.sizeJitter*e()),spin:[e()*Math.PI*2,e()*Math.PI*2,e()*Math.PI*2],shade:e()})}return i}const h8=120,f8=40;function p8(n,e){const t=n-(e+h8),i=m8(t/f8),s=1-i*i*(3-2*i);return{mode:s>=.5?"near":"far",blend:s}}function m8(n){return n<0?0:n>1?1:n}const g8=new v1(1,0),v8=new ot,x8=new R,_8=new es,M8=new R,y8=new Vn,S8={x:0,y:0,z:0};function b8(n){const e=d8(n),t=e.length,i=new Lo({color:n.color,emissive:new je(n.color).multiplyScalar(.05),roughness:.85,metalness:0,transparent:!0}),s=new zm(g8,i,t);s.name=n.name,s.castShadow=!1,s.receiveShadow=!1,s.frustumCulled=!1;const r=new je(n.color),o=new je;for(let h=0;h<t;h++){const f=.65+.5*e[h].shade;o.copy(r).multiplyScalar(f),s.setColorAt(h,o)}s.instanceColor&&(s.instanceColor.needsUpdate=!0);const a=new yt,c=new Float32Array(t*3),l=new Float32Array(t*3);for(let h=0;h<t;h++){const f=.65+.5*e[h].shade;o.copy(r).multiplyScalar(f),l[h*3]=o.r,l[h*3+1]=o.g,l[h*3+2]=o.b}a.setAttribute("position",new Kt(c,3).setUsage(l3)),a.setAttribute("color",new Kt(l,3));const u=new x0({size:n.farPointSize??1.5,sizeAttenuation:!0,vertexColors:!0,transparent:!0,opacity:0,depthWrite:!1,blending:ai}),d=new Ro(a,u);return d.name=n.name+" (far)",d.frustumCulled=!1,d.visible=!1,{def:n,mesh:s,points:d,objects:e,dispose:()=>{i.dispose(),u.dispose(),a.dispose()}}}function E8(n,e,t,i=1){const{objects:s,mesh:r}=n,o=v8,a=x8,c=_8,l=M8,u=y8,d=S8,h=n.points.geometry.getAttribute("position"),f=h.array;for(let g=0;g<s.length;g++){const v=s[g];M0(v.elements,e,d),a.set(-d.x,d.z,-d.y);const m=Math.hypot(d.x,d.y,d.z),p=t.planetDistance(m)/Math.max(1e-9,m);a.multiplyScalar(p),u.set(v.spin[0]+e*.05,v.spin[1],v.spin[2]),c.setFromEuler(u),l.setScalar(Math.max(1e-6,v.size*i)),o.compose(a,c,l),r.setMatrixAt(g,o),f[g*3]=a.x,f[g*3+1]=a.y,f[g*3+2]=a.z}r.instanceMatrix.needsUpdate=!0,h.needsUpdate=!0}function mh(n,e,t,i){let s=p8(e,t);i<.25&&(s={mode:"far",blend:0});const{mesh:r,points:o}=n,a=r.material,c=o.material;return r.visible=s.blend>.02,o.visible=s.blend<.98,a.opacity=s.blend,c.opacity=(1-s.blend)*.45,s.mode}const T8=[{constellation:"Andromeda",centerRAHours:1.0395,centerDecDeg:38.3081,sizeW:33.58,sizeH:33.58,rotationDeg:104.8},{constellation:"Antlia",centerRAHours:10.2756,centerDecDeg:-28.7018,sizeW:18.52,sizeH:18.52,rotationDeg:-7.06},{constellation:"Apus",centerRAHours:15.2834,centerDecDeg:-81.9025,sizeW:14.06,sizeH:14.06,rotationDeg:-8.04},{constellation:"Aquarius",centerRAHours:22.2682,centerDecDeg:-12.0784,sizeW:39.52,sizeH:39.52,rotationDeg:36.19},{constellation:"Aquila",centerRAHours:19.3715,centerDecDeg:4.6274,sizeW:33.34,sizeH:33.34,rotationDeg:8.17},{constellation:"Ara",centerRAHours:17.4865,centerDecDeg:-54.3975,sizeW:14.37,sizeH:14.37,rotationDeg:123.01},{constellation:"Aries",centerRAHours:2.4582,centerDecDeg:21.6925,sizeW:15.47,sizeH:15.47,rotationDeg:53.16},{constellation:"Auriga",centerRAHours:5.6464,centerDecDeg:37.7631,sizeW:27.38,sizeH:27.38,rotationDeg:-50.09},{constellation:"Boötes",centerRAHours:14.0786,centerDecDeg:30.7778,sizeW:41.45,sizeH:41.45,rotationDeg:-59.35},{constellation:"Caelum",centerRAHours:4.8036,centerDecDeg:-38.5623,sizeW:8.61,sizeH:8.61,rotationDeg:-64.4},{constellation:"Camelopardalis",centerRAHours:4.8352,centerDecDeg:66.1305,sizeW:27.7,sizeH:27.7,rotationDeg:31.64},{constellation:"Cancer",centerRAHours:8.514,centerDecDeg:18.7572,sizeW:23.95,sizeH:23.95,rotationDeg:-36.21},{constellation:"Canes Venatici",centerRAHours:12.374,centerDecDeg:37.7938,sizeW:13.4,sizeH:13.4,rotationDeg:-1.44},{constellation:"Canis Major",centerRAHours:6.7685,centerDecDeg:-22.5863,sizeW:21.77,sizeH:21.77,rotationDeg:-22.51},{constellation:"Canis Minor",centerRAHours:7.511,centerDecDeg:6.5471,sizeW:8.05,sizeH:8.05,rotationDeg:-15.14},{constellation:"Capricornus",centerRAHours:20.9965,centerDecDeg:-16.7297,sizeW:19.54,sizeH:19.54,rotationDeg:38.18},{constellation:"Carina",centerRAHours:8.5278,centerDecDeg:-49.9536,sizeW:56.59,sizeH:56.59,rotationDeg:5.3},{constellation:"Cassiopeia",centerRAHours:1.012,centerDecDeg:61.2874,sizeW:14.38,sizeH:14.38,rotationDeg:-174.71},{constellation:"Centaurus",centerRAHours:13.4657,centerDecDeg:-48.339,sizeW:43.27,sizeH:43.27,rotationDeg:19.52},{constellation:"Cepheus",centerRAHours:21.8497,centerDecDeg:62.7364,sizeW:27.44,sizeH:27.44,rotationDeg:110.54},{constellation:"Cetus",centerRAHours:1.9036,centerDecDeg:-4.0029,sizeW:46.26,sizeH:46.26,rotationDeg:-30.44},{constellation:"Chamaeleon",centerRAHours:9.806,centerDecDeg:-80.5706,sizeW:12.92,sizeH:12.92,rotationDeg:38.7},{constellation:"Circinus",centerRAHours:15.068,centerDecDeg:-62.052,sizeW:6.08,sizeH:6.08,rotationDeg:-80},{constellation:"Columba",centerRAHours:6.0208,centerDecDeg:-36.9013,sizeW:12.03,sizeH:12.03,rotationDeg:-59.17},{constellation:"Coma Berenices",centerRAHours:12.7221,centerDecDeg:21.8852,sizeW:13.67,sizeH:13.67,rotationDeg:-5.4},{constellation:"Corona Australis",centerRAHours:18.9382,centerDecDeg:-38.9407,sizeW:5.73,sizeH:5.73,rotationDeg:49.76},{constellation:"Corona Borealis",centerRAHours:15.7454,centerDecDeg:28.8407,sizeW:7.46,sizeH:7.46,rotationDeg:35.96},{constellation:"Corvus",centerRAHours:12.3689,centerDecDeg:-19.8,sizeW:10.05,sizeH:10.05,rotationDeg:12.08},{constellation:"Crater",centerRAHours:11.4061,centerDecDeg:-16.6513,sizeW:15.03,sizeH:15.03,rotationDeg:-59.19},{constellation:"Crux",centerRAHours:12.4909,centerDecDeg:-59.4203,sizeW:6.16,sizeH:6.16,rotationDeg:-51},{constellation:"Cygnus",centerRAHours:20.5417,centerDecDeg:40.7423,sizeW:33.49,sizeH:33.49,rotationDeg:-3.98},{constellation:"Delphinus",centerRAHours:20.6889,centerDecDeg:14.1666,sizeW:5.38,sizeH:5.38,rotationDeg:11.94},{constellation:"Dorado",centerRAHours:4.9914,centerDecDeg:-59.9197,sizeW:17.18,sizeH:17.18,rotationDeg:2.95},{constellation:"Draco",centerRAHours:16.4625,centerDecDeg:68.1989,sizeW:53.91,sizeH:53.91,rotationDeg:157.16},{constellation:"Equuleus",centerRAHours:21.2857,centerDecDeg:7.0768,sizeW:6.82,sizeH:6.82,rotationDeg:140.86},{constellation:"Eridanus",centerRAHours:3.6997,centerDecDeg:-29.3322,sizeW:62.38,sizeH:62.38,rotationDeg:15.76},{constellation:"Fornax",centerRAHours:2.9332,centerDecDeg:-27.6337,sizeW:10.35,sizeH:10.35,rotationDeg:32.8},{constellation:"Gemini",centerRAHours:6.8661,centerDecDeg:23.0133,sizeW:23.64,sizeH:23.64,rotationDeg:-16.6},{constellation:"Grus",centerRAHours:22.4926,centerDecDeg:-45.9337,sizeW:21.03,sizeH:21.03,rotationDeg:-3.05},{constellation:"Hercules",centerRAHours:16.9534,centerDecDeg:32.6047,sizeW:34.25,sizeH:34.25,rotationDeg:-154.02},{constellation:"Horologium",centerRAHours:3.3301,centerDecDeg:-52.1545,sizeW:21.4,sizeH:21.4,rotationDeg:82.8},{constellation:"Hydra",centerRAHours:10.7434,centerDecDeg:-13.0387,sizeW:69,sizeH:69,rotationDeg:25.08},{constellation:"Hydrus",centerRAHours:1.7871,centerDecDeg:-70.8057,sizeW:18.13,sizeH:18.13,rotationDeg:116.07},{constellation:"Indus",centerRAHours:20.9868,centerDecDeg:-51.0624,sizeW:19.37,sizeH:19.37,rotationDeg:158.9},{constellation:"Lacerta",centerRAHours:22.4731,centerDecDeg:43.7246,sizeW:14.83,sizeH:14.83,rotationDeg:-52.15},{constellation:"Leo",centerRAHours:10.6939,centerDecDeg:15.7158,sizeW:34.87,sizeH:34.87,rotationDeg:41.32},{constellation:"Leo Minor",centerRAHours:10.0684,centerDecDeg:33.1938,sizeW:15.92,sizeH:15.92,rotationDeg:-30.85},{constellation:"Lepus",centerRAHours:5.5834,centerDecDeg:-18.7299,sizeW:15.47,sizeH:15.47,rotationDeg:-17.59},{constellation:"Libra",centerRAHours:15.4844,centerDecDeg:-18.4806,sizeW:20.85,sizeH:20.85,rotationDeg:56.73},{constellation:"Lupus",centerRAHours:15.2093,centerDecDeg:-44.014,sizeW:24.43,sizeH:24.43,rotationDeg:-95.96},{constellation:"Lynx",centerRAHours:7.8559,centerDecDeg:43.9368,sizeW:41.1,sizeH:41.1,rotationDeg:-19.6},{constellation:"Lyra",centerRAHours:18.837,centerDecDeg:34.8687,sizeW:12.31,sizeH:12.31,rotationDeg:17.08},{constellation:"Mensa",centerRAHours:5.3062,centerDecDeg:-72.4754,sizeW:10.83,sizeH:10.83,rotationDeg:85.44},{constellation:"Microscopium",centerRAHours:20.8316,centerDecDeg:-33.2382,sizeW:2.54,sizeH:2.54,rotationDeg:60.01},{constellation:"Monoceros",centerRAHours:7.186,centerDecDeg:-.671,sizeW:30.36,sizeH:30.36,rotationDeg:.47},{constellation:"Musca",centerRAHours:12.3534,centerDecDeg:-69.5563,sizeW:8.77,sizeH:8.77,rotationDeg:-118.48},{constellation:"Norma",centerRAHours:16.293,centerDecDeg:-52.2943,sizeW:8.41,sizeH:8.41,rotationDeg:112.64},{constellation:"Octans",centerRAHours:21.5805,centerDecDeg:-81.1772,sizeW:9.36,sizeH:9.36,rotationDeg:-168.38},{constellation:"Ophiuchus",centerRAHours:17.1828,centerDecDeg:-4.6091,sizeW:56.3,sizeH:56.3,rotationDeg:3.97},{constellation:"Orion",centerRAHours:5.6152,centerDecDeg:3.5699,sizeW:29.12,sizeH:29.12,rotationDeg:27.5},{constellation:"Pavo",centerRAHours:19.4327,centerDecDeg:-65.8902,sizeW:26.78,sizeH:26.78,rotationDeg:.78},{constellation:"Pegasus",centerRAHours:23.0709,centerDecDeg:21.6673,sizeW:48.7,sizeH:48.7,rotationDeg:138.12},{constellation:"Perseus",centerRAHours:3.5718,centerDecDeg:44.6834,sizeW:29.4,sizeH:29.4,rotationDeg:-8.39},{constellation:"Phoenix",centerRAHours:.9855,centerDecDeg:-47.5277,sizeW:16.91,sizeH:16.91,rotationDeg:54.9},{constellation:"Pictor",centerRAHours:6.1132,centerDecDeg:-57.6748,sizeW:13.08,sizeH:13.08,rotationDeg:-2.22},{constellation:"Pisces",centerRAHours:.6197,centerDecDeg:9.4168,sizeW:44.47,sizeH:44.47,rotationDeg:40.9},{constellation:"Piscis Austrinus",centerRAHours:22.3306,centerDecDeg:-32.5012,sizeW:14.14,sizeH:14.14,rotationDeg:-124.26},{constellation:"Puppis",centerRAHours:7.608,centerDecDeg:-36.52,sizeW:43.46,sizeH:21.14,rotationDeg:67.2},{constellation:"Pyxis",centerRAHours:8.7629,centerDecDeg:-31.3781,sizeW:7.45,sizeH:7.45,rotationDeg:-67.04},{constellation:"Reticulum",centerRAHours:4.057,centerDecDeg:-62.2078,sizeW:6.14,sizeH:6.14,rotationDeg:104.71},{constellation:"Sagitta",centerRAHours:19.8636,centerDecDeg:18.8067,sizeW:4.97,sizeH:4.97,rotationDeg:-115.1},{constellation:"Sagittarius",centerRAHours:18.9367,centerDecDeg:-29.5732,sizeW:30.49,sizeH:30.49,rotationDeg:23.71},{constellation:"Scorpius",centerRAHours:16.7957,centerDecDeg:-32.1996,sizeW:26.41,sizeH:26.41,rotationDeg:-.89},{constellation:"Sculptor",centerRAHours:.2885,centerDecDeg:-31.0322,sizeW:23.27,sizeH:23.27,rotationDeg:41.08},{constellation:"Scutum",centerRAHours:18.6347,centerDecDeg:-9.8787,sizeW:11.56,sizeH:11.56,rotationDeg:34.15},{constellation:"Sextans",centerRAHours:10.2407,centerDecDeg:-2.1621,sizeW:15.91,sizeH:15.91,rotationDeg:20.26},{constellation:"Taurus",centerRAHours:4.3438,centerDecDeg:18.0278,sizeW:34.74,sizeH:34.74,rotationDeg:-19.7},{constellation:"Telescopium",centerRAHours:18.39,centerDecDeg:-46.7658,sizeW:4.91,sizeH:4.91,rotationDeg:12.21},{constellation:"Triangulum",centerRAHours:2.0458,centerDecDeg:31.5524,sizeW:7.92,sizeH:7.92,rotationDeg:32.51},{constellation:"Triangulum Australe",centerRAHours:16.142,centerDecDeg:-68.6055,sizeW:9.97,sizeH:9.97,rotationDeg:58.74},{constellation:"Tucana",centerRAHours:23.3453,centerDecDeg:-62.819,sizeW:23.69,sizeH:23.69,rotationDeg:-16.67},{constellation:"Ursa Major",centerRAHours:11.4059,centerDecDeg:54.6756,sizeW:55.12,sizeH:55.12,rotationDeg:-34.58},{constellation:"Ursa Minor",centerRAHours:14.914,centerDecDeg:78.7873,sizeW:18.67,sizeH:18.67,rotationDeg:49.09},{constellation:"Vela",centerRAHours:9.494,centerDecDeg:-49.58,sizeW:32.58,sizeH:19.03,rotationDeg:-171.6},{constellation:"Virgo",centerRAHours:13.2926,centerDecDeg:1.7026,sizeW:40.52,sizeH:40.52,rotationDeg:34.44},{constellation:"Volans",centerRAHours:7.9189,centerDecDeg:-71.7208,sizeW:11.99,sizeH:11.99,rotationDeg:-9.09},{constellation:"Vulpecula",centerRAHours:19.7674,centerDecDeg:25.1729,sizeW:14.78,sizeH:14.78,rotationDeg:31.89}];function A8(n){const e=n.centerRAHours*15*Math.PI/180,t=n.centerDecDeg*Math.PI/180,i=Math.cos(t),s=[-i*Math.cos(e),Math.sin(t),-i*Math.sin(e)];let r=[-s[1]*s[0],1-s[1]*s[1],-s[1]*s[2]];r[0]*r[0]+r[1]*r[1]+r[2]*r[2]<1e-6&&(r=[1,0,0]);const o=w8(r);return{position:s,upHint:o,planeSize:[n.sizeW*Math.PI/180,n.sizeH*Math.PI/180],rotationRad:n.rotationDeg*Math.PI/180}}function w8(n){const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]}const xs={mapSize:2048,near:.05,far:140,bias:-4e-4,normalBias:.02};function D8(n,e=xs.far){n.castShadow=!0;const t=n.shadow;t.mapSize.set(xs.mapSize,xs.mapSize),t.camera.near=xs.near,t.camera.far=e,t.bias=xs.bias,t.normalBias=xs.normalBias}function C8(n,e){n.castShadow=!e,n.receiveShadow=!e}const Uc=1.35,xi=[[.387098,5],[.723321,9.724486],[1,15.051293],[1.523712,23.211311],[2.7675,28.814579],[5.20248,43.956733],[9.541499,66.964136],[19.187979,84.022651],[30.069528,102.130054],[39.482117,126.602786],[43.11,128.602786],[45.43,130.602786],[67.864,132.602786]];function gh(n){if(n<=xi[0][0])return xi[0][1];for(let r=1;r<xi.length;r++){const[o,a]=xi[r];if(n<=o){const[c,l]=xi[r-1];return l+(n-c)/(o-c)*(a-l)}}const[e,t]=xi[xi.length-2],[i,s]=xi[xi.length-1];return s+(n-i)/(i-e)*(s-t)}function vh(n){return .8+.45*Math.log10(n/100+1)}function xh(n){return .15+.3*Math.log10(n/100+1)}function P8(n){return Math.max(.08,.08+.09*Math.log10(n/100+1))}function _h(n){return .9+1.7*Math.sqrt(n/4e5)}const R8={moon:{floor:2.208715,cap:3.111655},iss:{floor:1.95,cap:2.05},phobos:{floor:1.978417,cap:2.79312},deimos:{floor:2.294943,cap:2.794943},amalthea:{floor:2.584476,cap:11.023209},io:{floor:3.034156,cap:10.93183},europa:{floor:3.569515,cap:10.937531},ganymede:{floor:4.118656,cap:10.918046},callisto:{floor:4.683945,cap:10.921384},himalia:{floor:5.143966,cap:11.023314},enceladus:{floor:5.170574,cap:8.103596},tethys:{floor:5.601783,cap:8.080787},dione:{floor:6.057633,cap:8.078954},rhea:{floor:6.525752,cap:8.068518},titan:{floor:7.048484,cap:8.024341},iapetus:{floor:7.569867,cap:8.069867},miranda:{floor:4.292651,cap:6.671852},ariel:{floor:4.72486,cap:6.644337},umbriel:{floor:5.184918,cap:6.644004},titania:{floor:5.655488,cap:6.633825},oberon:{floor:6.135031,cap:6.635031},triton:{floor:2.461502,cap:9.679395},nereid:{floor:8.720057,cap:9.745187}};function L8(n,e){const t=R8[n];if(!t)return null;let i=_h(e);return i<t.floor&&(i=t.floor),t.cap!==void 0&&i>t.cap&&(i=t.cap),i}function I8(n,e=!1){const t=e?xh(n):vh(n);return Math.max(3,t*6)}const Mh={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class rs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const H8=new Yd(-1,1,1,-1,0,1);class U8 extends yt{constructor(){super(),this.setAttribute("position",new vt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new vt([0,2,0,0,2,0],2))}}const N8=new U8;class Zo{constructor(e){this._mesh=new Dt(N8,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,H8)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class O8 extends rs{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof _t?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Gn.clone(e.uniforms),this.material=new _t({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Zo(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Mu extends rs{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class z8 extends rs{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class F8{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new be);this._width=i.width,this._height=i.height,t=new cn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:bn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new O8(Mh),this.copyPass.material.blending=si,this.clock=new Km}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){const a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Mu!==void 0&&(o instanceof Mu?i=!0:o instanceof z8&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new be);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class B8 extends rs{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new je}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}}const k8={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new je(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Cr extends rs{constructor(e,t,i,s){super(),this.strength=t!==void 0?t:1,this.radius=i,this.threshold=s,this.resolution=e!==void 0?new be(e.x,e.y):new be(256,256),this.clearColor=new je(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new cn(r,o,{type:bn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const h=new cn(r,o,{type:bn});h.texture.name="UnrealBloomPass.h"+d,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const f=new cn(r,o,{type:bn});f.texture.name="UnrealBloomPass.v"+d,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=k8;this.highPassUniforms=Gn.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new _t({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new be(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Mh;this.copyUniforms=Gn.clone(u.uniforms),this.blendMaterial=new _t({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:ai,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new je,this.oldClearAlpha=1,this.basic=new Fr,this.fsQuad=new Zo(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new be(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(e,t,i,s,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=Cr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Cr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this.fsQuad.render(e),a=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){const t=[];for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new _t({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new be(.5,.5)},direction:{value:new be(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(e){return new _t({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Cr.BlurDirectionX=new be(1,0);Cr.BlurDirectionY=new be(0,1);const G8={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class W8 extends rs{constructor(){super();const e=G8;this.uniforms=Gn.clone(e.uniforms),this.material=new Bm({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Zo(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},rt.getTransfer(this._outputColorSpace)===mt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===xd?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===_d?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Md?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===i1?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===yd?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Sd&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Ba={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new be(1/1024,1/512)}},vertexShader:`

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

		}`},ka={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new be(1/1024,1/512)}},vertexShader:`

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

		}`},Nc={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new be(1/1024,1/512)}},vertexShader:`

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

		}`};class V8 extends rs{constructor(e,t){super(),this.edgesRT=new cn(e,t,{depthBuffer:!1,type:bn}),this.edgesRT.texture.name="SMAAPass.edges",this.weightsRT=new cn(e,t,{depthBuffer:!1,type:bn}),this.weightsRT.texture.name="SMAAPass.weights";const i=this,s=new Image;s.src=this.getAreaTexture(),s.onload=function(){i.areaTexture.needsUpdate=!0},this.areaTexture=new It,this.areaTexture.name="SMAAPass.area",this.areaTexture.image=s,this.areaTexture.minFilter=Rn,this.areaTexture.generateMipmaps=!1,this.areaTexture.flipY=!1;const r=new Image;r.src=this.getSearchTexture(),r.onload=function(){i.searchTexture.needsUpdate=!0},this.searchTexture=new It,this.searchTexture.name="SMAAPass.search",this.searchTexture.image=r,this.searchTexture.magFilter=kt,this.searchTexture.minFilter=kt,this.searchTexture.generateMipmaps=!1,this.searchTexture.flipY=!1,this.uniformsEdges=Gn.clone(Ba.uniforms),this.uniformsEdges.resolution.value.set(1/e,1/t),this.materialEdges=new _t({defines:Object.assign({},Ba.defines),uniforms:this.uniformsEdges,vertexShader:Ba.vertexShader,fragmentShader:Ba.fragmentShader}),this.uniformsWeights=Gn.clone(ka.uniforms),this.uniformsWeights.resolution.value.set(1/e,1/t),this.uniformsWeights.tDiffuse.value=this.edgesRT.texture,this.uniformsWeights.tArea.value=this.areaTexture,this.uniformsWeights.tSearch.value=this.searchTexture,this.materialWeights=new _t({defines:Object.assign({},ka.defines),uniforms:this.uniformsWeights,vertexShader:ka.vertexShader,fragmentShader:ka.fragmentShader}),this.uniformsBlend=Gn.clone(Nc.uniforms),this.uniformsBlend.resolution.value.set(1/e,1/t),this.uniformsBlend.tDiffuse.value=this.weightsRT.texture,this.materialBlend=new _t({uniforms:this.uniformsBlend,vertexShader:Nc.vertexShader,fragmentShader:Nc.fragmentShader}),this.fsQuad=new Zo(null)}render(e,t,i){this.uniformsEdges.tDiffuse.value=i.texture,this.fsQuad.material=this.materialEdges,e.setRenderTarget(this.edgesRT),this.clear&&e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.materialWeights,e.setRenderTarget(this.weightsRT),this.clear&&e.clear(),this.fsQuad.render(e),this.uniformsBlend.tColor.value=i.texture,this.fsQuad.material=this.materialBlend,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.fsQuad.render(e))}setSize(e,t){this.edgesRT.setSize(e,t),this.weightsRT.setSize(e,t),this.materialEdges.uniforms.resolution.value.set(1/e,1/t),this.materialWeights.uniforms.resolution.value.set(1/e,1/t),this.materialBlend.uniforms.resolution.value.set(1/e,1/t)}getAreaTexture(){return"data:image/png;base64,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"}getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}dispose(){this.edgesRT.dispose(),this.weightsRT.dispose(),this.areaTexture.dispose(),this.searchTexture.dispose(),this.materialEdges.dispose(),this.materialWeights.dispose(),this.materialBlend.dispose(),this.fsQuad.dispose()}}const X8={defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`};class Y8 extends rs{constructor(e,t,i){super(),this.scene=e,this.camera=t;const s=i.focus!==void 0?i.focus:1,r=i.aperture!==void 0?i.aperture:.025,o=i.maxblur!==void 0?i.maxblur:1;this.renderTargetDepth=new cn(1,1,{minFilter:kt,magFilter:kt,type:bn}),this.renderTargetDepth.texture.name="BokehPass.depth",this.materialDepth=new Qd,this.materialDepth.depthPacking=Id,this.materialDepth.blending=si;const a=X8,c=Gn.clone(a.uniforms);c.tDepth.value=this.renderTargetDepth.texture,c.focus.value=s,c.aspect.value=t.aspect,c.aperture.value=r,c.maxblur.value=o,c.nearClip.value=t.near,c.farClip.value=t.far,this.materialBokeh=new _t({defines:Object.assign({},a.defines),uniforms:c,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.uniforms=c,this.fsQuad=new Zo(this.materialBokeh),this._oldClearColor=new je}render(e,t,i){this.scene.overrideMaterial=this.materialDepth,e.getClearColor(this._oldClearColor);const s=e.getClearAlpha(),r=e.autoClear;e.autoClear=!1,e.setClearColor(16777215),e.setClearAlpha(1),e.setRenderTarget(this.renderTargetDepth),e.clear(),e.render(this.scene,this.camera),this.uniforms.tColor.value=i.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),e.clear(),this.fsQuad.render(e)),this.scene.overrideMaterial=null,e.setClearColor(this._oldClearColor),e.setClearAlpha(s),e.autoClear=r}setSize(e,t){this.materialBokeh.uniforms.aspect.value=e/t,this.renderTargetDepth.setSize(e,t)}dispose(){this.renderTargetDepth.dispose(),this.materialDepth.dispose(),this.materialBokeh.dispose(),this.fsQuad.dispose()}}function j8(n,e,t,i,s){n.toneMapping=i1,n.toneMappingExposure=1.15,n.outputColorSpace=wt;const r=n.getPixelRatio(),o=new cn(Math.max(1,Math.round(i*r)),Math.max(1,Math.round(s*r)),{type:bn,colorSpace:Jn}),a=new F8(n,o);a.setPixelRatio(r),a.setSize(i,s),a.addPass(new B8(e,t));const c=new Cr(new be(i,s),.32,.3,.96);a.addPass(c);const l=new V8(i,s);a.addPass(l);const u=new W8;a.addPass(u);const d=new Y8(e,t,{focus:1,aperture:5e-5,maxblur:.008});d.enabled=!1,a.insertPass(d,a.passes.indexOf(u));const h=t6();return t.add(h.group),h.group.visible=!1,{composer:a,flare:h,setDOF:v=>{d.enabled=v},dofEnabled:()=>d.enabled,setDOFFocus:v=>{d.uniforms.focus.value=v},setSize:(v,m)=>{const p=n.getPixelRatio();c.resolution.set(v*p,m*p),a.setPixelRatio(p),a.setSize(v,m)},dispose:()=>{a.dispose(),o.dispose(),t.remove(h.group),h.dispose()}}}let _o=null;function q8(){if(_o)return _o;const n=256,e=document.createElement("canvas");e.width=n,e.height=n;const t=e.getContext("2d"),i=n/2,s=t.createRadialGradient(i,i,0,i,i,i);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.1,"rgba(255,248,224,0.9)"),s.addColorStop(.2,"rgba(255,214,140,0.5)"),s.addColorStop(.35,"rgba(255,170,80,0.18)"),s.addColorStop(.55,"rgba(230,80,20,0.04)"),s.addColorStop(.8,"rgba(180,50,10,0.008)"),s.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=s,t.fillRect(0,0,n,n);const r=new kr(e);return r.colorSpace=wt,_o=r,r}function K8(n){const e=q8(),t=new Co({map:e,color:16777215,blending:ai,depthWrite:!1,depthTest:!0,transparent:!0,opacity:.6}),i=new p0(t);return i.scale.set(n*4.5,n*4.5,1),i.name="sun-glow",i.renderOrder=2,{sprite:i,dispose:()=>{t.dispose(),_o===e&&(e.dispose(),_o=null)}}}const Z8=`
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`,J8=`
  precision highp float;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  // --- value noise + FBM (cheap, no texture fetch) -------------------------
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float vnoise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i + vec3(0.0, 0.0, 0.0)), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
          mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
      mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
          mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
      f.z);
  }
  float fbm(vec3 p) {
    float a = 0.5;
    float s = 0.0;
    for (int i = 0; i < 5; i++) {
      s += a * vnoise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return s;
  }

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vViewDir);
    float mu = clamp(dot(n, v), 0.0, 1.0); // 1 at disc centre, 0 at limb

    // Churning granulation: 3D noise over the surface, drifting slowly in
    // time. Two octaves of the FBM give the mottled cell structure.
    float g = fbm(n * 4.0 + vec3(0.0, uTime * 0.03, uTime * 0.02));
    g += 0.5 * fbm(n * 9.0 - vec3(uTime * 0.05, 0.0, uTime * 0.04));
    g = clamp(g, 0.0, 1.0);

    // Photosphere colour ramp: deep orange in the granulation troughs to a
    // near-white hot peak. Values exceed 1.0 so the core blooms.
    vec3 deep = vec3(1.0, 0.42, 0.06);
    vec3 mid  = vec3(1.0, 0.72, 0.28);
    vec3 hot  = vec3(1.0, 0.96, 0.82) * 1.7;
    vec3 col = mix(deep, mid, smoothstep(0.35, 0.65, g));
    col = mix(col, hot, smoothstep(0.65, 0.95, g));

    // Limb darkening: a real star is dimmest at the edge. mu^0.6 gives a
    // gentle falloff; the limb also shifts cooler (toward orange).
    float ld = pow(mu, 0.6);
    col *= mix(0.55, 1.0, ld);
    col = mix(col * vec3(1.0, 0.82, 0.6), col, ld);

    // Hot limb rim: a thin bright ring right at the edge (the chromosphere)
    // that blooms into the halo.
    float rim = smoothstep(0.0, 0.12, 1.0 - mu) * (1.0 - smoothstep(0.12, 0.3, 1.0 - mu));
    col += vec3(1.0, 0.55, 0.2) * rim * 1.3;

    gl_FragColor = vec4(col, 1.0);
  }
`;function Q8(){const n=new _t({vertexShader:Z8,fragmentShader:J8,uniforms:{uTime:{value:0}},fog:!1,toneMapped:!1});return{material:n,setTime:e=>{n.uniforms.uTime.value=e},dispose:()=>n.dispose()}}let Mo=null,yo=null;function $8(){if(Mo)return Mo;const n=128,e=document.createElement("canvas");e.width=n,e.height=n;const t=e.getContext("2d"),i=n/2,s=t.createRadialGradient(i,i,0,i,i,i);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.25,"rgba(255,240,210,0.55)"),s.addColorStop(.5,"rgba(255,200,120,0.18)"),s.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=s,t.fillRect(0,0,n,n);const r=new kr(e);return r.colorSpace=wt,Mo=r,r}function e6(){if(yo)return yo;const n=256,e=32,t=document.createElement("canvas");t.width=n,t.height=e;const i=t.getContext("2d"),s=i.createLinearGradient(0,0,n,0);s.addColorStop(0,"rgba(255,255,255,0)"),s.addColorStop(.35,"rgba(255,245,225,0.35)"),s.addColorStop(.5,"rgba(255,255,255,0.9)"),s.addColorStop(.65,"rgba(255,245,225,0.35)"),s.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=s,i.fillRect(0,0,n,e);const r=i.createLinearGradient(0,0,0,e);r.addColorStop(0,"rgba(0,0,0,0)"),r.addColorStop(.5,"rgba(0,0,0,1)"),r.addColorStop(1,"rgba(0,0,0,0)"),i.globalCompositeOperation="destination-in",i.fillStyle=r,i.fillRect(0,0,n,e);const o=new kr(t);return o.colorSpace=wt,yo=o,o}function t6(){const n=$8(),e=e6(),t=new Ti;t.name="sun-flare",t.renderOrder=3;const i=new p0(new Co({map:e,color:16774368,blending:ai,depthWrite:!1,depthTest:!1,transparent:!0,opacity:.55}));i.renderOrder=3,i.userData.isStreak=!0,t.add(i);const s=[{t:0,size:1,opacity:.5,color:16773848},{t:.35,size:.28,opacity:.22,color:16767392},{t:.7,size:.16,opacity:.16,color:13623551},{t:1.15,size:.34,opacity:.12,color:16769200},{t:1.6,size:.12,opacity:.1,color:12374271}],r=[];for(const l of s){const u=new Co({map:n,color:l.color,blending:ai,depthWrite:!1,depthTest:!1,transparent:!0,opacity:l.opacity}),d=new p0(u);d.renderOrder=3,d.userData.flareT=l.t,d.userData.flareSize=l.size,t.add(d),r.push(d)}const o=1;return{group:t,update:(l,u)=>{const d=l,h=Math.tan(Wn.degToRad((d.fov??45)/2))*o,f=h*(d.aspect??1);i.position.set(u.x*f,u.y*h,-o),i.scale.set(f*1.4,h*.06,1);for(const g of r){const v=g.userData.flareT,m=g.userData.flareSize,p=1-v;g.position.set(u.x*p*f,u.y*p*h,-o),g.scale.setScalar(m*h)}},dispose:()=>{for(const l of r)l.material.dispose();i.material.dispose(),Mo===n&&(n.dispose(),Mo=null),yo===e&&(e.dispose(),yo=null)}}}function n6(n,e,t){const i=n.getWorldPosition(i6),s=s6.subVectors(e,i),r=s.length();if(r<1e-6)return!1;s.divideScalar(r);for(const o of t){if(!o.visible)continue;o.getWorldPosition(yu);const a=r6.subVectors(yu,i),c=a.dot(s);if(c<=0||c>=r)continue;Su.copy(a).addScaledVector(s,-c);const l=Su.length(),u=o6(o);if(l<u)return!0}return!1}const i6=new R,s6=new R,yu=new R,r6=new R,Su=new R;function o6(n){const e=n.geometry;if(e){e.boundingSphere||e.computeBoundingSphere();const t=n.getWorldScale(a6),i=Math.max(t.x,t.y,t.z)||1;return(e.boundingSphere?.radius??0)*i}return 0}const a6=new R,c6=9e3,l6=5e3,u6=5600,d6=9e3,h6=96,bu=4e3,Oc=.3,f6=[[.6,.72,1],[.79,.85,1],[.95,.97,1],[1,.96,.86],[1,.85,.62],[1,.62,.42]],Eu=[.04,.09,.18,.34,.24,.11];function p6(n){let e=n>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function m6(n){let e=n();for(let t=0;t<Eu.length;t++)if(e-=Eu[t],e<=0)return t;return 3}function g6(n,e,t,i=1592598566){const s=p6(i),r=new Float32Array(n*3),o=new Float32Array(n*3),a=new Float32Array(n);for(let c=0;c<n;c++){const l=s(),u=s(),d=2*Math.PI*l,h=Math.acos(2*u-1),f=e+s()*(t-e);r[c*3]=f*Math.sin(h)*Math.cos(d),r[c*3+1]=f*Math.cos(h),r[c*3+2]=f*Math.sin(h)*Math.sin(d);const[g,v,m]=f6[m6(s)],p=.45+s()*.55;o[c*3]=g*p,o[c*3+1]=v*p,o[c*3+2]=m*p,a[c]=.8+Math.pow(s(),3)*2.6}return{position:r,color:o,size:a}}function v6(n,e){const t=new Ti;t.name="deep-sky";const i=[],s=n.load(e);s.colorSpace=wt,s.wrapS=Tr;const r=new Rs(c6,h6,48),o=new Fr({map:s,color:new je(Oc,Oc,Oc),side:en,depthWrite:!1,toneMapped:!1}),a=new Dt(r,o);a.name="milkyway-skybox",a.renderOrder=-10,t.add(a),i.push(r,o,s);const{position:c,color:l,size:u}=g6(d6,l6,u6),d=new yt;d.setAttribute("position",new Kt(c,3)),d.setAttribute("color",new Kt(l,3)),d.setAttribute("aSize",new Kt(u,1));const h=new _t({uniforms:{uPixelRatio:{value:1}},vertexColors:!0,transparent:!0,depthWrite:!1,depthTest:!0,blending:ai,vertexShader:`
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
    `});h.toneMapped=!1;const f=new Ro(d,h);f.name="starfield",f.renderOrder=-9,t.add(f),i.push(d,h);const g=new Rs(bu,64,16,0,Math.PI*2,0,Math.PI/2),v=new _t({uniforms:{uColor:{value:new je(1,.85,.62)},uPeak:{value:.015},uR:{value:bu},uCamPos:{value:new R(0,16,30)}},transparent:!0,side:en,depthWrite:!1,depthTest:!0,blending:ai,vertexShader:`
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
    `});v.toneMapped=!1;const m=new Dt(g,v);m.name="zodiacal-light",m.renderOrder=-8,t.add(m),i.push(g,v);const p=new R;return{group:t,update(y){y.getWorldPosition(p),v.uniforms.uCamPos.value.copy(p)},dispose:()=>{for(const y of i)y.dispose()}}}const x6=`
  varying float vNdotView;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 viewDir = normalize(-mvPosition.xyz);
    vec3 nrm = normalize(normalMatrix * normal);
    vNdotView = dot(nrm, viewDir);
    gl_Position = projectionMatrix * mvPosition;
  }
`,_6=`
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
`,M6={earth:{tint:[.35,.6,1],power:3,intensity:1},venus:{tint:[1,.82,.55],power:2.6,intensity:.95},mars:{tint:[1,.55,.35],power:4,intensity:.4},jupiter:{tint:[.95,.8,.6],power:3.2,intensity:.55},saturn:{tint:[1,.9,.65],power:3.2,intensity:.5},uranus:{tint:[.6,.85,.95],power:3.2,intensity:.6},neptune:{tint:[.35,.5,.95],power:3.2,intensity:.6}};function y6(n){return M6[n]??null}function S6(n,e,t){const i=t?.power??3.2,s=t?.intensity??.9,r=t?.base??.08,o=new Rs(n*1.06,48,32),a=new _t({vertexShader:x6,fragmentShader:_6,uniforms:{uColor:{value:new je(...e)},uBase:{value:r},uPower:{value:i},uIntensity:{value:s}},transparent:!0,blending:ai,side:Ri,depthWrite:!1});a.toneMapped=!1;const c=new Dt(o,a);return c.renderOrder=2,c.frustumCulled=!1,c.name="atmosphere",c.disposeAtmosphere=()=>{o.dispose(),a.dispose()},c}function b6(n,e){const i=1-Math.abs(n-.42)*1.4,s=1-Math.abs(n-.86)*2.2;let r=Math.max(i,s*.8);r*=1-Math.exp(-Math.pow((n-.72)/.012,2))*.9,r*=1-Math.exp(-Math.pow((n-.95)/.008,2))*.5;const o=Math.min(n,1-n);return r*=Wn.clamp(o/.03,0,1),Wn.clamp(r,0,1)}function zt(n){const t=74732.31999999999,i=2.27*60268;return Wn.clamp((n-t)/(i-t),0,1)}const E6=[{name:"C",t0:zt(74658),t1:zt(91975),opacity:.42},{name:"Maxwell",t0:zt(87480),t1:zt(87539),opacity:.6},{name:"Bond",t0:zt(88702),t1:zt(88719),opacity:.55},{name:"Dawes",t0:zt(90138),t1:zt(90200),opacity:.4},{name:"B",t0:zt(91975),t1:zt(117570),opacity:1},{name:"Cassini",t0:zt(117570),t1:zt(122170),opacity:.06},{name:"A",t0:zt(122170),t1:zt(136780),opacity:.72},{name:"Encke",t0:zt(133589),t1:zt(133599),opacity:.05},{name:"Huygens",t0:zt(129480),t1:zt(129880),opacity:.12}];function Tu(n,e,t){const i=Wn.clamp((n-e)/(t-e||1),0,1);return i*i*(3-2*i)}function T6(n){if(n<0||n>1)return 0;let e=0;for(const o of E6)if(n>=o.t0&&n<=o.t1){const a=Tu(n,o.t0-.004,o.t0+.004),c=1-Tu(n,o.t1-.004,o.t1+.004),l=Math.min(a,c);e=Math.max(e,o.opacity*l)}const t=.5+.5*Math.sin(n*220)*Math.sin(n*61+1.7)*Math.sin(n*13+.4),i=.12*e;let s=e+(t-.5)*2*i;const r=Math.min(n,1-n);return s*=Wn.clamp(r/.02,0,1),Wn.clamp(s,0,1)}function A6(n){const e=[214,196,158],t=[226,224,214],i=Wn.clamp(n,0,1);return[Math.round(e[0]+(t[0]-e[0])*i),Math.round(e[1]+(t[1]-e[1])*i),Math.round(e[2]+(t[2]-e[2])*i)]}function w6(n,e){const s=document.createElement("canvas");s.width=1024,s.height=1;const r=s.getContext("2d"),o=r.createImageData(1024,1),a=e==="saturn";for(let l=0;l<1024;l++){const u=l/1023;let d,h,f,g;if(a)g=T6(u),[d,h,f]=A6(u);else{g=b6(u);const[v,m,p]=n,y=g;d=v*(.7+.3*y),h=m*(.7+.3*y),f=p*(.7+.3*y)}o.data[l*4+0]=d,o.data[l*4+1]=h,o.data[l*4+2]=f,o.data[l*4+3]=g*255}r.putImageData(o,0,0);const c=new kr(s);return c.colorSpace=wt,c.anisotropy=4,c.needsUpdate=!0,c}function D6(n){const e=n.attributes.position,t=n.attributes.uv;for(let o=0;o<e.count;o++){const a=e.getX(o),c=e.getY(o),l=Math.hypot(a,c);t.setXY(o,l,0)}let i=1/0,s=-1/0;for(let o=0;o<e.count;o++){const a=Math.hypot(e.getX(o),e.getY(o));a<i&&(i=a),a>s&&(s=a)}const r=s-i||1;for(let o=0;o<e.count;o++){const a=Math.hypot(e.getX(o),e.getY(o));t.setXY(o,(a-i)/r,0)}t.needsUpdate=!0}const Ga=1,ys=1495978707e-1,Au=new Map;function C6(n,e){let t=Au.get(n);return t||(t=w6(e,n),Au.set(n,t)),t}const Ds={bodyRadiusKm:vh,dwarfRadiusKm:xh,moonRadiusKm:P8,planetDistance:gh,moonDistance:(n,e)=>(e?L8(e,n):null)??_h(n),followDistanceKm:I8,beltSizeFactor:1},ti={bodyRadiusKm:n=>n/ys*Ga,dwarfRadiusKm:n=>n/ys*Ga,moonRadiusKm:n=>n/ys*Ga,planetDistance:n=>n,moonDistance:n=>n/ys*Ga,followDistanceKm:n=>Math.max(1.5,n/ys*8),beltSizeFactor:0};function P6(n,e,t){const i=(s,r)=>s+(r-s)*t;return{bodyRadiusKm:s=>i(n.bodyRadiusKm(s),e.bodyRadiusKm(s)),dwarfRadiusKm:s=>i(n.dwarfRadiusKm(s),e.dwarfRadiusKm(s)),moonRadiusKm:s=>i(n.moonRadiusKm(s),e.moonRadiusKm(s)),planetDistance:s=>i(n.planetDistance(s),e.planetDistance(s)),moonDistance:(s,r)=>i(n.moonDistance(s,r),e.moonDistance(s,r)),followDistanceKm:(s,r)=>i(n.followDistanceKm(s,r),e.followDistanceKm(s,r)),beltSizeFactor:i(n.beltSizeFactor??1,e.beltSizeFactor??0)}}function Uo(n){return new R(-n.x,n.z,-n.y)}function zc(n,e){return e.set(-n.x,n.z,-n.y),e}function R6(n,e){const t=T7(n,0,256),i=t.map(u=>{const d=Math.hypot(u.x,u.y,u.z);return Uo(u).multiplyScalar(e(d)/Math.max(1e-9,d))}),s=new yt().setFromPoints(i),r=new Po({color:5599392,transparent:!0,opacity:.45}),o=new v0(s,r),a=t.length,c=new Float32Array(a),l=new Float32Array(a*3);for(let u=0;u<a;u++){const d=t[u];c[u]=Math.hypot(d.x,d.y,d.z);const h=Uo(d).normalize();l[u*3]=h.x,l[u*3+1]=h.y,l[u*3+2]=h.z}return o.userData.radii=c,o.userData.unitDirs=l,o.userData.geo=s,o.userData.mat=r,o}function L6(n,e,t){const i=new Hm({canvas:n,antialias:!0,preserveDrawingBuffer:!0});i.setPixelRatio(Math.min(window.devicePixelRatio,2)),i.setSize(window.innerWidth,window.innerHeight),i.outputColorSpace=wt,i.shadowMap.enabled=!0,i.shadowMap.type=gd;const s=new Um;s.background=new je(5);const r=new Mn(50,window.innerWidth/window.innerHeight,5e-4,2e4);r.position.set(0,16,30),s.add(r);const o=new c7(r,i.domElement);o.enableDamping=!0,o.dampingFactor=.08,o.enablePan=!1;const a=new Ym(16773848,3.5,0,0);D8(a,xs.far),s.add(a),s.add(new jm(2240580,.4));const c=v6(new _1,"textures/milkyway_equirect.png");c.group.traverse(x=>{x instanceof Ro&&x.material instanceof _t&&(x.material.uniforms.uPixelRatio.value=i.getPixelRatio())}),s.add(c.group);const l=ng();s.add(l);const u=sg();s.add(u);const d=j8(i,s,r,window.innerWidth,window.innerHeight),h=K8(Uc*4.5);s.add(h.sprite);const f=Q8(),g=[c,d,h,f],v=new Map,m=[...e.filter(x=>x.kind!=="moon"),...e.filter(x=>x.kind==="moon")];for(const x of m){const b=x.kind==="star",L=x.kind==="moon",A=x.kind==="dwarf",D=b?t===ti?x.radiusKm/ys*1.15:Uc:L?t.moonRadiusKm(x.radiusKm):A?t.dwarfRadiusKm(x.radiusKm):t.bodyRadiusKm(x.radiusKm),I=b?x.radiusKm/ys*1.15:L?ti.moonRadiusKm(x.radiusKm):A?ti.dwarfRadiusKm(x.radiusKm):ti.bodyRadiusKm(x.radiusKm),E=b?Uc:L?Ds.moonRadiusKm(x.radiusKm):A?Ds.dwarfRadiusKm(x.radiusKm):Ds.bodyRadiusKm(x.radiusKm),S=new Rs(D,48,32),P=b?null:i8(x),O=b?f.material:new Lo({map:P,roughness:.92,metalness:0});g.push(S,O,...P?[P]:[]);const z=new Dt(S,O);z.name=x.name,z.userData.id=x.id,C8(z,b);const X=new Ti;X.name=`pivot:${x.name}`,X.rotation.z=Wn.degToRad(x.tiltDeg??0),X.add(z),s.add(X);const j=new _0(1.03,1.08,64),k=new Fr({color:8378623,side:Pn,transparent:!0,opacity:0,depthWrite:!1}),K=new Dt(j,k);K.rotation.x=-Math.PI/2,K.scale.setScalar(Math.max(.001,D)),K.visible=!1,X.add(K),g.push(j,k);let G=null;if(x.rings){const we=D*x.rings.inner,Ee=D*x.rings.outer,Ve=new _0(we,Ee,96,16);D6(Ve);const C=C6(x.id,x.rings.color),Be=new Lo({map:C,color:16777215,side:Pn,transparent:!0,opacity:x.rings.opacity,roughness:.85,metalness:0,depthWrite:!1}),Me=new Dt(Ve,Be);Me.rotation.x=-Math.PI/2,Me.castShadow=!0,Me.receiveShadow=!0,Me.renderOrder=1,X.add(Me),G=Me,g.push(Ve,Be)}let ne=null;const ce=y6(x.id);ce&&!b&&!L&&(ne=S6(D,ce.tint,{power:ce.power,intensity:ce.intensity}),X.add(ne));const ue=c8(x.name),Te=new Co({map:ue,depthTest:!1}),Ue=new p0(Te),q=b?3.4:Math.max(1.3,D*2.4);Ue.scale.set(q,q*.25,1),Ue.position.y=D+q*.35,Ue.visible=!1,X.add(Ue),g.push(ue,Te);let Y=null;if(x.elements){const we=Ee=>L?t.moonDistance(Ee,x.id):t.planetDistance(Ee);if(x.id==="moon"){const Ve=[],C=new Float32Array(129),Be=new Float32Array(129*3);for(let he=0;he<=128;he++){const Ie=Gr(0+he/128*27.55455),fe=Math.hypot(Ie[0],Ie[1],Ie[2]),ve=fe*Xn,w=Uo({x:Ie[0],y:Ie[1],z:Ie[2]});Ve.push(w.clone().multiplyScalar(t.moonDistance(ve,"moon")/Math.max(1e-9,fe))),C[he]=ve;const M=w.normalize();Be[he*3]=M.x,Be[he*3+1]=M.y,Be[he*3+2]=M.z}const Me=new yt().setFromPoints(Ve),Pe=new Po({color:5599392,transparent:!0,opacity:.45});Y=new v0(Me,Pe),Y.userData.geo=Me,Y.userData.mat=Pe,Y.userData.radii=C,Y.userData.unitDirs=Be,g.push(Me,Pe)}else Y=R6(x.elements,we),L||s.add(Y)}const te=L&&x.parent?v.get(x.parent)??null:null,ae=x.rings?2*D*x.rings.outer:2*D,xe={def:x,pivot:X,mesh:z,label:Ue,orbit:Y,orbitEmphasis:K,ringsMesh:G,atmosphereMesh:ne,parent:te,spin:0,worldPos:new R,sceneRadius:D,visibleRadius:E,trueRadius:I,builtRadius:D,cloudsMesh:null,frameExtent:ae,satellite:null};x.id==="iss"&&(xe.mesh.visible=!1),v.set(x.id,xe)}for(const x of v.values())x.orbit&&x.parent&&(x.orbit.removeFromParent(),x.parent.pivot.add(x.orbit));{const x=v.get("iss"),b=v.get("earth");if(x&&b){const A=[],D=new Float32Array(97),I=new Float32Array(97*3),E=t.moonDistance(420,"iss")??2;for(let z=0;z<=96;z++){const X=z/96*Math.PI*2,j=E*Math.cos(X),k=E*Math.sin(X),K=0;A.push(new R(j,k,K)),D[z]=420;const G=Math.hypot(j,k,K)||1;I[z*3]=j/G,I[z*3+1]=k/G,I[z*3+2]=K/G}const S=new yt().setFromPoints(A),P=new Po({color:8956620,transparent:!0,opacity:.4}),O=new v0(S,P);O.userData.geo=S,O.userData.mat=P,O.userData.radii=D,O.userData.unitDirs=I,O.visible=!1,b.pivot.add(O),x.orbit=O,g.push(S,P)}}const p=[];for(const x of l8){const b=b8(x);p.push(b),s.add(b.mesh),s.add(b.points)}Th({belts:p},0,t,0);function y(){for(const x of g)x.dispose();for(const x of p)x.dispose();for(const x of v.values())x.cloudsMesh&&(x.cloudsMesh.geometry.dispose(),x.cloudsMesh.material.dispose()),x.atmosphereMesh&&x.atmosphereMesh.disposeAtmosphere();l.userData.dispose?.();for(const x of u.children){const b=x;b.geometry.dispose(),b.material.dispose()}o.dispose(),i.dispose()}return{renderer:i,camera:r,controls:o,scene:s,bodies:v,belts:p,sunLight:a,skybox:c,constellations:l,constellationFigures:u,post:d,sunGlow:h.sprite,sunShader:f,userData:{},dispose:y}}const Rt=4800;function E1(n){let e=0,t=0,i=0;for(const r of n.stars){const[o,a,c]=O0(r.raHours,r.decDeg);e+=o,t+=a,i+=c}const s=Math.hypot(e,t,i)||1;return[e/s,t/s,i/s]}function So(n,e){return n[0]*e[0]+n[1]*e[1]+n[2]*e[2]}function y0(n,e){return[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]]}function i0(n){const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]}function F0(n){const e=E1(n),t=n.stars.map(m=>O0(m.raHours,m.decDeg)),i=Math.abs(e[1])<.9?[0,1,0]:[1,0,0],s=i0(y0(e,i)),r=y0(e,s);let o=0,a=0,c=0;for(const m of t){const p=So(m,s),y=So(m,r);o+=p*p,c+=p*y,a+=y*y}const l=.5*Math.atan2(2*c,o-a),u=Math.cos(l),d=Math.sin(l);let h=[s[0]*u+r[0]*d,s[1]*u+r[1]*d,s[2]*u+r[2]*d],f=0,g=0;for(const m of t){const p=So(m,h);p>f&&(f=p),-p>g&&(g=-p)}return g>f&&(h=[-h[0],-h[1],-h[2]]),{halfExtent:Math.max(f,g),axis:h,labelDir:m=>{const p=Math.cos(m),y=Math.sin(m);return[e[0]*p+h[0]*y,e[1]*p+h[1]*y,e[2]*p+h[2]*y]}}}const wu=22,Fc=48;function I6(n,e){const t=n[0]*e[0]+n[1]*e[1]+n[2]*e[2],i=Math.PI/180,s=Math.acos(Math.min(1,Math.max(-1,t)))/i;return s<=wu?1:s>=Fc?0:(Fc-s)/(Fc-wu)}const hr=.28,Du=1,H6=.5,Cu=.05,U6=1,N6=.75;function T1(n){return Cu+(U6-Cu)*Math.pow(n,N6)}const bo=9416959,zl=8191066,O6=0,Fl=.45,z6=.7,F6=8,B6=11,k6=.15,G6=2.5;function ho(n){const e=2*Math.PI*(n/G6);return 1-k6*(1-Math.sin(e))/2}const W6=.02,V6=.35,X6=.016,Y6=.011,j6=.018;function A1(n){return F0(n).halfExtent<=j6?Y6:X6}function q6(n){const e=A1(n),t=z0(n.name).fontSize;return e*(Cn/t)}function w1(n){return z0(n.name).inkWidthPx/Cn*q6(n)}function K6(n){const e=F0(n);return Math.min(e.halfExtent,V6)+W6+w1(n)/2}const Pu=.006;function Z6(n,e){const t=i0(e),i=w1(n)/2,s=A1(n)/2,r=Math.abs(t[1])<.9?[0,1,0]:[1,0,0],o=i0(y0(t,r)),a=i0(y0(t,o)),c=n.stars.map(u=>O0(u.raHours,u.decDeg)),l=u=>Math.abs(So(u,o))<i+Pu&&Math.abs(So(u,a))<s+Pu;for(const[u,d]of n.lines)for(let h=0;h<=1.0001;h+=.05){const f=[c[u][0]+(c[d][0]-c[u][0])*h,c[u][1]+(c[d][1]-c[u][1])*h,c[u][2]+(c[d][2]-c[u][2])*h];if(l(f))return!0}for(const u of c)if(l(u))return!0;return!1}const J6=[1,1.5],Q6=[1,-1],Ru=.004,$6=.25,eg=10;function yh(n){const e=n.map((s,r)=>{const o=F0(s),a=E1(s);return{i:r,pose:o,dir:a,margin0:K6(s),inkHalf:w1(s)/2,halfH:A1(s)/2+Ru/2}}),t=e.map(s=>s.i).sort((s,r)=>{const o=e[r].pose.halfExtent-e[s].pose.halfExtent;return o!==0?o:n[s].name.localeCompare(n[r].name)}),i=new Array(n.length).fill(null);for(const s of t){const r=e[s];let o=null;for(const c of Q6)for(const l of J6){const u=r.margin0*l,d=Math.cos(u),h=c*Math.sin(u),f=[r.dir[0]*d+r.pose.axis[0]*h,r.dir[1]*d+r.pose.axis[1]*h,r.dir[2]*d+r.pose.axis[2]*h];let g=$6*(l-1);Z6(n[s],f)&&(g+=eg);for(const v of t){const m=i[v];m&&(g+=tg(r,f,m))}(!o||g<o.score)&&(o={score:g,side:c,marginScale:l,dir:f,offset:u})}const a=o;i[s]={side:a.side,marginScale:a.marginScale,dir:a.dir,inkHalf:r.inkHalf+Ru/2,halfH:r.halfH,offset:a.offset}}return i}function tg(n,e,t){const i=n.inkHalf+t.inkHalf,s=n.halfH+t.halfH;let r=e[0]+t.dir[0],o=e[1]+t.dir[1],a=e[2]+t.dir[2];const c=Math.hypot(r,o,a);if(c<1e-6)return 0;r/=c,o/=c,a/=c;let l=o*e[2]-a*e[1],u=a*e[0]-r*e[2],d=r*e[1]-o*e[0];const h=Math.hypot(l,u,d);if(h<1e-6)return 0;l/=h,u/=h,d/=h;const f=o*d-a*u,g=a*l-r*d,v=r*u-o*l,m=l*e[0]+u*e[1]+d*e[2],p=f*e[0]+g*e[1]+v*e[2],y=l*t.dir[0]+u*t.dir[1]+d*t.dir[2],x=f*t.dir[0]+g*t.dir[1]+v*t.dir[2],b=(m-y)/i,L=(p-x)/s,A=b*b+L*L;return A<1?1-A:0}const Bc=2,Lu=2756,kc=.5;function Sh(n){if(n<=Bc)return kc;if(n>=Lu)return 1;const e=(n-Bc)/(Lu-Bc);return kc+(1-kc)*e*e*(3-2*e)}function ng(){const n=new Ti;n.name="constellations";const e=new x0({color:13623551,size:3.2,sizeAttenuation:!1,transparent:!0,opacity:.9,depthWrite:!1}),t=yh(tn),i=[],s=[],r=[],o=[],a=[],c=[],l=[],u=[];for(let f=0;f<tn.length;f++){i.push(t[f].dir);const g=tn[f],v=g.stars.map(j=>{const[k,K,G]=O0(j.raHours,j.decDeg);return[k*Rt,K*Rt,G*Rt]}),m=[];for(const[j,k]of g.lines)m.push(...v[j],...v[k]);const p=new yt;p.setAttribute("position",new vt(m,3));const y=new Po({color:bo,transparent:!0,opacity:hr,depthWrite:!1});y.userData.baseColor=bo;const x=new Q2(p,y);x.name=`constellation-lines-core:${g.name}`,x.renderOrder=3,n.add(x);const b=new Ol;b.setPositions(m);const L=new Nl({color:bo,transparent:!0,opacity:hr,depthWrite:!1,linewidth:F6,worldUnits:!0});L.resolution.set(1,1);const A=new Lc(b,L);A.name=`constellation-lines:${g.name}`,A.renderOrder=2,A.computeLineDistances(),n.add(A),a.push(b),c.push(L);const D=new Ol;D.setPositions(m);const I=new Nl({color:O6,transparent:!0,opacity:Fl,depthWrite:!1,linewidth:B6,worldUnits:!0});I.resolution.set(1,1);const E=new Lc(D,I);E.name=`constellation-lines-halo:${g.name}`,E.renderOrder=1,E.computeLineDistances(),n.add(E),l.push(D),u.push(I);const S=(Rt+4)/Rt,P=[];for(const j of v)P.push(j[0]*S,j[1]*S,j[2]*S);const O=new yt;O.setAttribute("position",new vt(P,3));const z=new x0({color:zl,size:5.2,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1}),X=new Ro(O,z);X.name=`constellation-stars-emph:${g.name}`,X.visible=!1,X.renderOrder=4,n.add(X),r.push(O),o.push(z);for(const j of v)s.push(...j)}const d=new yt;d.setAttribute("position",new vt(s,3));const h=new Ro(d,e);return h.name="constellation-stars",h.renderOrder=4,n.add(h),n.userData.labelDirs=i,n.userData.dispose=()=>{for(const f of n.children){const g=f;(g instanceof Q2||g instanceof Lc)&&(g.geometry.dispose(),g.material.dispose())}for(const f of r)f.dispose();for(const f of o)f.dispose();for(const f of a)f.dispose();for(const f of c)f.dispose();for(const f of l)f.dispose();for(const f of u)f.dispose();d.dispose(),e.dispose()},n}const Eo=new Map(tn.map((n,e)=>[n.name,e])),Iu=new Map;function ig(n){return`constellation-figures/${n.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g,"_")}.png`}function sg(){const n=new Ti;n.name="constellation-figures",n.visible=!1;const e=new _1;for(const t of T8){if(!Eo.has(t.constellation))continue;let i=Iu.get(t.constellation);i||(i=e.load(ig(t.constellation)),Iu.set(t.constellation,i)),i.colorSpace=wt,i.anisotropy=4;const s=A8(t),r=new Fr({map:i,transparent:!0,opacity:0,depthWrite:!1,side:Pn}),o=new Dt(new qo(1,1),r),a=Rt*.998;o.position.set(s.position[0]*a,s.position[1]*a,s.position[2]*a),o.up.set(s.upHint[0],s.upHint[1],s.upHint[2]),o.lookAt(0,0,0),o.rotateZ(s.rotationRad),o.scale.set(s.planeSize[0]*Rt,s.planeSize[1]*Rt,1),o.name=`constellation-figure:${t.constellation}`,n.add(o)}return n}function rg(n,e,t){for(const i of n.children){const s=i.name??"";if(!s.startsWith("constellation-figure:"))continue;const r=Eo.get(s.slice(21));if(r===void 0)continue;const o=e[r]??0,a=Math.min(H6,T1(o))*t;i.visible=a>.005,i.material.opacity=a}}function og(n,e,t=1,i,s=0){for(const r of n.children){const o=r.name??"";if(o==="constellation-stars"){r.material.opacity=t;continue}if(o.startsWith("constellation-stars-emph:")){if(Eo.get(o.slice(25))===void 0)continue;const v=i!=null&&i!==""&&o===`constellation-stars-emph:${i}`,m=r.material;v?m.opacity=ho(s):m.opacity=0,r.visible=m.opacity>.005;continue}const a=o.startsWith("constellation-lines-halo:")?o.slice(25):null;if(a!==null){const g=Eo.get(a);if(g===void 0)continue;const v=e[g]??0,m=i!=null&&i!==""&&a===i,p=r.material;m?p.opacity=ho(s):p.opacity=(Fl+(z6-Fl)*v)*t;continue}const c=o.startsWith("constellation-lines-core:")?o.slice(25):null,l=c===null&&o.startsWith("constellation-lines:")?o.slice(20):null,u=c??l;if(u===null)continue;const d=Eo.get(u);if(d===void 0)continue;const h=e[d]??0,f=i!=null&&i!==""&&u===i;if(c!==null){const g=r.material;f?(g.color.setHex(zl),g.opacity=ho(s)):(g.color.setHex(bo),g.opacity=(hr+(Du-hr)*h)*t);continue}{const g=r.material;f?(g.color.setHex(zl),g.opacity=ho(s)):(g.color.setHex(bo),g.opacity=(hr+(Du-hr)*h)*t)}}}function bh(n,e,t){let i=n.userData.updateOrder;i||(i=[...n.bodies.values()].sort((o,a)=>{const c=o.parent?1:0,l=a.parent?1:0;return c-l}),n.userData.updateOrder=i);const s=ag,r=cg;for(const o of i){const{def:a,pivot:c}=o;if(a.kind==="star")c.position.set(0,0,0),o.worldPos.set(0,0,0);else if((a.kind==="planet"||a.kind==="dwarf")&&a.elements){const l=M0(a.elements,e,r),u=zc(l,s),d=Math.hypot(l.x,l.y,l.z),h=t.planetDistance(d)/Math.max(1e-9,d);c.position.copy(u.multiplyScalar(h)),o.worldPos.copy(c.position)}else if(a.kind==="moon"&&a.elements){let l;if(a.id==="moon"){const m=Gr(e);l={x:m[0],y:m[1],z:m[2]}}else l=M0(a.elements,e,r);const u=zc(l,s),d=Math.hypot(l.x,l.y,l.z),h=a.id==="moon"?d*Xn:d,f=t.moonDistance(h,a.id)/Math.max(1e-9,d),g=u.multiplyScalar(f),v=o.parent;v?(g.applyQuaternion(v.pivot.quaternion),c.position.copy(v.worldPos).add(g)):c.position.copy(g),o.worldPos.copy(c.position)}else if(a.id==="iss"&&o.satellite){const l=hh(o.satellite,e);if(l){const[u,d,h]=l.posAu,f=zc({x:u,y:d,z:h},s),g=Math.hypot(u,d,h),v=g*Xn,m=t.moonDistance(v,"iss")/Math.max(1e-9,g),p=f.multiplyScalar(m),y=o.parent;y?(p.applyQuaternion(y.pivot.quaternion),c.position.copy(y.worldPos).add(p)):c.position.copy(p),o.worldPos.copy(c.position)}}}}const ag=new R,cg={x:0,y:0,z:0},Hu=new Map;function Eh(n){let e=Hu.get(n.def.id);if(e===void 0){const t=(n.def.a[0]+n.def.a[1])/2;e=gh(t),Hu.set(n.def.id,e)}return e}function Th(n,e,t,i){for(const s of n.belts)E8(s,e,t,t.beltSizeFactor),mh(s,i,Eh(s),t.beltSizeFactor??1)}function lg(n,e,t){for(const i of n.belts)mh(i,t,Eh(i),e.beltSizeFactor??1)}function ug(n,e){for(const i of n.bodies.values()){const s=i.visibleRadius+(i.trueRadius-i.visibleRadius)*e,r=Math.max(1e-7,s/i.builtRadius);i.mesh.scale.setScalar(r),i.ringsMesh&&i.ringsMesh.scale.setScalar(r),i.atmosphereMesh&&i.atmosphereMesh.scale.setScalar(r),i.orbitEmphasis.scale.setScalar(Math.max(.001,s));const o=i.def.kind==="star"?3.4:Math.max(1.3,s*2.4);i.label.scale.set(o,o*.25,1),i.label.position.y=s+o*.35,i.label.material.opacity=1,i.sceneRadius=s}const t=n.bodies.get("sun");t&&n.sunGlow.scale.set(t.sceneRadius*4.5,t.sceneRadius*4.5,1)}function dg(n,e,t){const i=n.userData.radii,s=n.userData.unitDirs,r=n.userData.geo;if(!i||!s||!r)return;const o=r.getAttribute("position"),a=i.length;for(let c=0;c<a;c++){const l=i[c],u=t?e.moonDistance(l,t):e.planetDistance(l);o.setXYZ(c,s[c*3]*u,s[c*3+1]*u,s[c*3+2]*u)}o.needsUpdate=!0,r.computeBoundingSphere()}function Ah(n,e,t){const i=n.userData.radii,s=n.userData.unitDirs,r=n.userData.geo;if(!i||!s||!r)return;const o=r.getAttribute("position"),a=27.55455;for(let c=0;c<=128;c++){const l=Gr(e+c/128*a),d=Math.hypot(l[0],l[1],l[2])*Xn,f=Uo({x:l[0],y:l[1],z:l[2]}).normalize();i[c]=d,s[c*3]=f.x,s[c*3+1]=f.y,s[c*3+2]=f.z;const g=t.moonDistance(d,"moon");o.setXYZ(c,f.x*g,f.y*g,f.z*g)}o.needsUpdate=!0,r.computeBoundingSphere()}function wh(n,e,t,i){const s=n.bodies.get("iss");s&&(s.satellite=e,s.mesh.visible=!0,s.label.visible=!0,s.orbit&&(s.orbit.visible=!0,D1(s.orbit,e,t,i)))}function D1(n,e,t,i){const s=n.userData.geo;if(!s)return;const r=s.getAttribute("position"),o=r.count,a=J7;for(let c=0;c<o;c++){const l=hh(e,t+c/(o-1)*a);if(!l)continue;const[u,d,h]=l.posAu,g=Math.hypot(u,d,h)*Xn,m=Uo({x:u,y:d,z:h}).normalize(),p=i.moonDistance(g,"iss")??2;r.setXYZ(c,m.x*p,m.y*p,m.z*p)}r.needsUpdate=!0,s.computeBoundingSphere()}function hg(n,e){for(const t of n.bodies.values()){if(!t.def.rotationHours)continue;const i=t.def.rotationHours/24;t.spin+=e/Math.abs(i)*Math.PI*2*Math.sign(i),t.mesh.rotation.y=t.spin,t.cloudsMesh&&(t.cloudsMesh.rotation.y=t.spin*.05)}}function fg(n,e){const t=n.elements?n.elements.a:0;return e.moonDistance(t,n.id)}function Dh(n,e){let t=0;for(const i of y1)i.parent===n&&(t=Math.max(t,fg(i,e)));return t}function pg(n,e,t,i){const s=e!==""&&n===e,r=.5+.5*Math.sin(i*3.4);return{ringVisible:s,ringOpacity:s?.35+.55*r:0,ringBreath:1+.12*r,orbitOpacity:t?s?.95:.45:null,orbitColor:t?s?8378623:5599392:null}}function mg(n,e,t){for(const i of n.bodies.values()){const s=pg(i.def.id,e,i.orbit!==null,t);if(i.orbitEmphasis.visible=s.ringVisible,s.ringVisible){const r=i.orbitEmphasis.material;r.opacity=s.ringOpacity,i.orbitEmphasis.scale.setScalar(i.sceneRadius*s.ringBreath)}if(i.orbit&&s.orbitOpacity!==null&&s.orbitColor!==null){const r=i.orbit.material;r.opacity=s.orbitOpacity,r.color.set(s.orbitColor)}}}const gg="https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=tle",vg={name:"ISS (ZARYA)",noradId:25544,line1:"1 25544U 98067A   26259.14303184  .00007008  00000+0  13461-3 0  9990",line2:"2 25544  51.6310 209.9325 0004907 145.2560 214.8750 15.49133683585852"};function xg(n){const e=n.split(/\r?\n/).map(o=>o.trim()).filter(o=>o.length>0),t=e.find(o=>o.startsWith("1 ")),i=e.find(o=>o.startsWith("2 "));if(!t||!i)return null;const s=t.slice(2,7).trim();if(!/^\d{3,7}$/.test(s))return null;const r=i.slice(8,16).trim();return/^\d{1,2}\.\d{4}$/.test(r)?{name:e[0]&&!e[0].startsWith("1 ")&&!e[0].startsWith("2 ")?e[0]:`NORAD ${s}`,noradId:parseInt(s,10),line1:t,line2:i}:null}async function _g(n=8e3){const e=new AbortController,t=setTimeout(()=>e.abort(),n);try{const i=await fetch(gg,{signal:e.signal,headers:{Accept:"text/plain"}});if(!i.ok)return null;const s=await i.text();return xg(s)}catch{return null}finally{clearTimeout(t)}}const Uu=22,Mg=.04,yg=220,Sg=8,bg=5,Gc=18,Nu=120,Ou=.55,zu=14,ps=new R;function Bl(n,e,t,i){if(ps.copy(n),ps.applyMatrix4(e.matrixWorldInverse),ps.z>=-e.near)return{x:0,y:0,ok:!1};const s=ps.x/-ps.z,r=ps.y/-ps.z,o=(s*.5+.5)*t,a=(-r*.5+.5)*i;return!Number.isFinite(o)||!Number.isFinite(a)?{x:0,y:0,ok:!1}:{x:o,y:a,ok:!0}}function Eg(n){return n<=Gc?1:n>=Nu?Ou:1-(n-Gc)/(Nu-Gc)*(1-Ou)}function Tg(n,e,t,i,s=Sg){const r=yg,o=bg,a=d=>d.length*Uu*.55,c=[];for(const d of n){const h=Bl(d.world,e,t,i);if(!h.ok||h.x<-r||h.x>t+r||h.y<-r||h.y>i+r)continue;const g=d.tier===0||d.id==="sun"?1:Eg(d.dist);if(g<=Mg)continue;const v=Uu,m=a(d.name),p=m+16;c.push({id:d.id,name:d.name,tier:d.tier,dist:d.dist,bx:h.x,by:h.y,discR:d.discRadiusPx,inkW:m,h:v,w:p,opacity:Math.min(1,g),emphasized:d.tier===0})}c.sort((d,h)=>d.tier-h.tier||d.dist-h.dist);const l=[],u=[];for(const d of c){if(l.length>=s)break;const f=(d.by>i/2?-1:1)*(d.discR+zu+d.h/2),g=d.discR+zu*.5;let v=d.bx+g,m=d.by+f;v=Math.max(d.w/2+2,Math.min(t-d.w/2-2,v)),m=Math.max(d.h/2+2,Math.min(i-d.h/2-2,m));const p=v-d.inkW/2-o,y=v+d.inkW/2+o,x=m-d.h/2-o,b=m+d.h/2+o;let L=!1;for(const A of u)if(p<A.x2&&y>A.x1&&x<A.y2&&b>A.y1){L=!0;break}L||(u.push({x1:p,x2:y,y1:x,y2:b}),l.push({id:d.id,name:d.name,bx:d.bx,by:d.by,discR:d.discR,x:v,y:m,w:d.w,h:d.h,opacity:d.opacity,emphasized:d.emphasized}))}return l}function Ag(n,e){for(const t of e){n.globalAlpha=t.opacity;const i=t.x-t.bx,s=t.y-t.by,r=Math.hypot(i,s)||1,o=i/r,a=s/r,c=t.bx+o*t.discR,l=t.by+a*t.discR;n.strokeStyle=t.emphasized?"rgba(120,220,160,0.7)":"rgba(180,200,230,0.45)",n.lineWidth=1,n.beginPath(),n.moveTo(c,l),n.lineTo(t.x-o*(t.w/2),t.y-a*(t.h/2)),n.stroke(),n.font="600 15px system-ui, sans-serif",n.textAlign="center",n.textBaseline="middle";const u=n.measureText(t.name).width;n.fillStyle="rgba(10,14,24,0.5)",n.fillRect(t.x-u/2-6,t.y-10,u+12,20),n.fillStyle=t.emphasized?"#7ddba8":"#dbe6f5",n.fillText(t.name,t.x,t.y)}n.globalAlpha=1}function wg(n){const e=document.createElement("canvas");return e.id="planet-labels",e.style.cssText="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:6;",n.insertAdjacentElement("afterend",e),{canvas:e,setVisible:t=>{e.style.display=t?"block":"none"},dispose:()=>{e.remove()}}}function Dg(n,e,t,i,s){const r=n.canvas,o=Math.min(window.devicePixelRatio,2),a=Math.max(1,Math.round(i*o)),c=Math.max(1,Math.round(s*o));r.width!==a&&(r.width=a),r.height!==c&&(r.height=c);const l=r.getContext("2d");l.setTransform(o,0,0,o,0,0),l.clearRect(0,0,i,s);const u=Tg(t,e,i,s);Ag(l,u)}const Cg=30,kl=.02,Pg=260,Rg=8,ms=new R;function Lg(n,e,t,i){if(ms.set(n[0]*Rt,n[1]*Rt,n[2]*Rt),ms.applyMatrix4(e.matrixWorldInverse),ms.z>=-e.near)return{x:0,y:0,ok:!1};const s=ms.x/-ms.z,r=ms.y/-ms.z,o=(s*.5+.5)*t,a=(-r*.5+.5)*i;return!Number.isFinite(o)||!Number.isFinite(a)?{x:0,y:0,ok:!1}:{x:o,y:a,ok:!0}}const Gl=new Map;function Ig(n,e="base"){const t=`${e}:${n}`;let i=Gl.get(t);return i||(i=document.createElement("canvas"),i.width=Cn,i.height=fh,a8(i.getContext("2d"),n,e),Gl.set(t,i)),i}function Hg(n){const e=document.createElement("canvas");e.id="cst-labels",e.style.cssText="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:5;";const t=n.parentElement;return t&&(t.style.position=t.style.position||"relative"),n.insertAdjacentElement("afterend",e),{canvas:e,setVisible:i=>{e.style.display=i?"block":"none"},dispose:()=>{e.remove(),Gl.clear()}}}const Ug=4;function Ng(n,e,t,i,s,r=Rg){if(s<=kl)return[];const o=Pg,a=Ug,c=Cn/fh,l=[];for(const h of n){if(h.occluded||!h.emphasized&&h.emphasis<=0)continue;const f=T1(h.emphasis)*s;if(f<=kl)continue;const g=Lg(h.dir,e,t,i);if(!g.ok||g.x<-o||g.x>t+o||g.y<-o||g.y>i+o)continue;const v=Cg*(h.emphasized?1.12:1),m=c*v,p=z0(h.name).inkWidthPx/Cn;l.push({name:h.name,emphasized:h.emphasized,emphasis:h.emphasis,rank:h.emphasized?1:0,x:g.x,y:g.y,inkW:m*p,h:v,w:m,opacity:Math.min(1,f)})}l.sort((h,f)=>f.rank-h.rank||f.emphasis-h.emphasis);const u=[],d=[];for(const h of l){if(u.length>=r)break;const f=h.x-h.inkW/2-a,g=h.x+h.inkW/2+a,v=h.y-h.h/2-a,m=h.y+h.h/2+a;let p=!1;for(const y of d)if(f<y.x2&&g>y.x1&&v<y.y2&&m>y.y1){p=!0;break}p||(d.push({x1:f,x2:g,y1:v,y2:m}),u.push({name:h.name,emphasized:h.emphasized,x:h.x,y:h.y,w:h.w,h:h.h,opacity:h.opacity}))}return u}function Og(n,e,t,i,s,r){const o=n.canvas,a=Math.min(window.devicePixelRatio,2),c=Math.max(1,Math.round(s*a)),l=Math.max(1,Math.round(r*a));o.width!==c&&(o.width=c),o.height!==l&&(o.height=l);const u=o.getContext("2d");if(u.setTransform(a,0,0,a,0,0),u.clearRect(0,0,s,r),i<=.01)return;const d=Ng(t,e,s,r,i);for(const h of d){const f=Ig(h.name,h.emphasized?"green":"base");u.globalAlpha=h.opacity,u.drawImage(f,h.x-h.w/2,h.y-h.h/2,h.w,h.h)}u.globalAlpha=1}function C1(n){const e=Math.min(1,Math.max(0,n));return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2}function Ch(n){const e=Math.min(1,Math.max(0,n));return e<.5?16*e*e*e*e*e:1-Math.pow(-2*e+2,5)/2}function Fu(n,e){return[n[0]-e[0],n[1]-e[1],n[2]-e[2]]}function zg(n,e){return[n[0]+e[0],n[1]+e[1],n[2]+e[2]]}const Bu=.62,Fg=38;function Ph(n,e,t,i=1){const s=t*Math.PI/360,r=Math.atan(Math.tan(s)*i),o=Math.max(e/(2*Bu*Math.tan(s)),e/(2*Bu*Math.tan(r)),.35),a=Fg*Math.PI/180,c=Math.sin(a),l=Math.cos(a);return{pos:[n[0],n[1]+o*c,n[2]+o*l],target:n}}function Bg(n,e,t=.85){const i=e*Math.PI/360,s=n/(t*Math.tan(i)),r=.42;return{pos:[0,s*r,s*Math.sqrt(1-r*r)],target:[0,0,0]}}function kg(n,e,t){const i=t*Math.PI/360,s=e/(.08*Math.tan(i)),r=Math.min(s,n*.82),o=.35;return{pos:[0,r*o,r*Math.sqrt(1-o*o)],target:[0,0,0],fov:120}}function Gg(n,e,t,i,s=1,r=.55,o=6,a=120){const l=Math.atan2(t*Math.sin(e),t*Math.cos(e)-i)/r,u=180/Math.PI,d=2*l*u,h=2*Math.atan(l/s)*u,f=Math.min(a,Math.max(o,Math.max(d,h)));return{pos:[n[0]*i,n[1]*i,n[2]*i],target:[n[0]*t,n[1]*t,n[2]*t],fov:f}}function Wg(n,e,t){n.t+=e;const s=(n.cine?Ch:C1)(n.t/n.duration),r=(u,d)=>u+(d-u)*s,o=t??n.toTarget,a=[r(n.fromTarget[0],o[0]),r(n.fromTarget[1],o[1]),r(n.fromTarget[2],o[2])],c=[r(n.fromOffset[0],n.toOffset[0]),r(n.fromOffset[1],n.toOffset[1]),r(n.fromOffset[2],n.toOffset[2])],l=n.fromFov+(n.toFov-n.fromFov)*s;return{target:a,offset:c,pos:zg(a,c),fov:l,done:n.t>=n.duration}}function Jo(n,e,t,i,s,r,o,a=!1){return{fromTarget:e,fromOffset:Fu(n,e),toTarget:t.target,toOffset:Fu(t.pos,t.target),duration:i,t:0,followId:s,toFov:t.fov??o,fromFov:r,cine:a}}const Vg="textures/planets",Xg={day:"_day.jpg",normal:"_normal.jpg",roughness:"_roughness.jpg",clouds:"_clouds.png",night:"_night.png"};function Yg(n,e="day"){return`${Vg}/${n}${Xg[e]}`}const ku=new Map;function jg(n,e=fetch){let t=ku.get(n);return t||(t=e(n,{method:"HEAD"}).then(i=>i.ok).catch(()=>!1),ku.set(n,t)),t}const Gu=new Map;async function oo(n,e,t,i=fetch){const s=`${n}:${e}`,r=Gu.get(s);if(r)return r;const o=Yg(n,e);if(!await jg(o,i))return null;const a=await new Promise((c,l)=>{t.load(o,c,void 0,l)}).catch(()=>null);return a?(a.colorSpace=e==="normal"||e==="roughness"?Jn:wt,a.wrapS=Tr,Gu.set(s,a),a):null}async function qg(n,e,t=fetch){const i=await oo(n,"day",e,t);if(!i)return null;const[s,r,o,a]=await Promise.all([oo(n,"normal",e,t),oo(n,"roughness",e,t),oo(n,"clouds",e,t),oo(n,"night",e,t)]);return{day:i,normal:s,roughness:r,clouds:o,night:a}}function Kg(n,e,t){const i=t*1.015,s=new Rs(i,48,32),r=new Lo({map:e,transparent:!0,opacity:.85,depthWrite:!1,roughness:1,metalness:0}),o=new Dt(s,r);return o.name=`clouds:${n.def.name}`,o.castShadow=!1,o.receiveShadow=!1,n.pivot.add(o),{mesh:o,geo:s,mat:r}}async function Zg(n,e,t=fetch){let i=0;for(const s of n){const r=s.def.id,o=await qg(r,e,t);if(!o)continue;const a=s.mesh.material;if(a.map=o.day,a instanceof Lo&&(o.normal&&(a.normalMap=o.normal,a.normalScale=new be(.8,.8)),o.roughness&&(a.roughnessMap=o.roughness,a.roughness=1),o.night&&Jg(a,o.night)),a.needsUpdate=!0,i+=1,o.clouds&&!s.cloudsMesh){const{mesh:c}=Kg(s,o.clouds,s.builtRadius);s.cloudsMesh=c}}return i}function Jg(n,e){n.onBeforeCompile=t=>{t.uniforms.uNightMap={value:e},t.uniforms.uNightIntensity={value:1.8},t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vNLWorldPos;
varying vec3 vNLWorldNormal;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
vNLWorldPos = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
vNLWorldNormal = normalize( mat3( modelMatrix ) * objectNormal );`),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vNLWorldPos;
varying vec3 vNLWorldNormal;
uniform sampler2D uNightMap;
uniform float uNightIntensity;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
{
  vec3 nlNormal = normalize( vNLWorldNormal );
  vec3 nlSunDir = normalize( -vNLWorldPos );
  float nlDay = smoothstep( -0.15, 0.15, dot( nlNormal, nlSunDir ) );
  vec4 nlNight = texture2D( uNightMap, vMapUv );
  totalEmissiveRadiance += nlNight.rgb * ( 1.0 - nlDay ) * uNightIntensity;
}`)},n.customProgramCacheKey=()=>"earth-night-lights"}const P1=[{bodyId:"sun",duration:2,zoom:3},{bodyId:"sun",duration:1.6,zoom:1},{bodyId:"earth",duration:2.2,zoom:1}],Rh=P1.reduce((n,e)=>n+e.duration,0),Wc=.3,Wu=1.4;function Qg(n,e,t,i){return!(n||e==="0"||t||i)}const Lh="solar_intro_seen";function $g(n){const e=Rh+No,t=e-1.6,i=e-.6;return n<Wc||n>i?0:n<Wu?(n-Wc)/(Wu-Wc):n<t?1:(i-n)/(i-t)}const No=2.5;function ev(n,e,t){const i=Ch(n/No);return e+(t-e)*i}function tv(n){const e=No,t=e*.4,i=e*.75;return n<=0?0:n<t?n/t:n<i?1:n>=e?0:(e-n)/(e-i)}const R1=[{id:"pause",key:"Space",keys:["Space"],label:"Play / pause",hint:"Toggle the clock",group:"time"},{id:"speed-up",key:"ArrowUp",keys:["↑"],label:"Speed up",hint:"Raise sim speed",group:"time"},{id:"speed-down",key:"ArrowDown",keys:["↓"],label:"Slow down",hint:"Lower sim speed",group:"time"},{id:"now",key:"n",keys:["N"],label:"Jump to now",hint:"Reset the clock to today",group:"time"},{id:"reverse",key:"r",keys:["R"],label:"Reverse time",hint:"Run the clock backwards",group:"time"},{id:"orbits",key:"o",keys:["O"],label:"Toggle orbits",hint:"Show / hide orbit lines",group:"view"},{id:"labels",key:"l",keys:["L"],label:"Toggle labels",hint:"Show / hide body labels",group:"view"},{id:"belts",key:"b",keys:["B"],label:"Toggle belts",hint:"Show / hide the asteroid belts",group:"view"},{id:"figures",key:"f",keys:["F"],label:"Toggle figures",hint:"Show / hide constellation figures",group:"view"},{id:"milkyway",key:"m",keys:["M"],label:"Toggle Milky Way",hint:"Show / hide the deep-sky background",group:"sky"},{id:"zodiacal",key:"z",keys:["Z"],label:"Toggle zodiacal light",hint:"Show / hide the sunlit dust glow",group:"sky"},{id:"atmospheres",key:"a",keys:["A"],label:"Toggle atmospheres",hint:"Show / hide the fresnel rims",group:"sky"},{id:"post",key:"p",keys:["P"],label:"Toggle bloom / HDR",hint:"Post-processing on / off (F2)",group:"sky"},{id:"scale",key:"t",keys:["T"],label:"True / visible scale",hint:"Swap the scale mode",group:"camera"},{id:"camera-preset",key:"c",keys:["C"],label:"Camera preset",hint:"Cycle top / side view",group:"camera"},{id:"release",key:"Escape",keys:["Esc"],label:"Release follow",hint:"Stop tracking the picked body",group:"camera"},{id:"screenshot",key:"s",keys:["S"],label:"Save screenshot",hint:"Download a PNG of the view",group:"system"}];function nv(n){return n.map(e=>({id:`jump-${e.id}`,keys:[],label:`Go to ${e.name}`,hint:"Fly the camera to this body",group:"jump"}))}function iv(n){return[...R1.map(t=>({id:t.id,keys:t.keys,label:t.label,hint:t.hint,group:t.group})),...nv(n)]}function sv(n){const e=n.length===1?n.toLowerCase():n;for(const t of R1)if((t.key.length===1?t.key.toLowerCase():t.key)===e)return t.id;return/^[1-9]$/.test(n)?`jump-digit-${n}`:n==="0"?"jump-digit-0":null}function rv(n,e,t){if(n==="0")return t;const i=parseInt(n,10)-1;return i<0||i>=e.length?null:e[i].id}function ov(n,e){const t=n.elements;if(!t)return null;const i=ah(t,e);if(i.n===0)return null;const s=Ft(t,e),r=n.kind==="moon"?1:Xn;return{periodDays:360/Math.abs(i.n),distanceKm:Math.hypot(s.x,s.y,s.z)*r,perihelionKm:i.a*(1-i.e)*r,aphelionKm:i.a*(1+i.e)*r}}function av(n){if(!Number.isFinite(n)||n<=0)return"—";if(n<2)return`${(n*24).toFixed(1)} h`;if(n<365)return`${n.toFixed(1)} d`;const e=n/365.25;return`${e>=100?e.toFixed(0):e>=10?e.toFixed(1):e.toFixed(2)} yr`}function fr(n){return!Number.isFinite(n)||n<0?"—":n<1e6?`${Math.round(n).toLocaleString("en-US")} km`:n<1e8?`${(n/1e6).toFixed(1)} M km`:`${(n/1e9).toFixed(2)} B km`}const cv={sun:"The Sun holds 99.86% of the Solar System’s mass.",mercury:"A Mercury year is just 88 days, yet one of its days lasts 176 Earth days.",venus:"Venus spins backwards, so there the Sun rises in the west.",earth:"The only known world with liquid-water oceans on its surface.",mars:"Home to Olympus Mons, the tallest volcano in the Solar System.",jupiter:"The Great Red Spot is a storm wider than Earth, raging for centuries.",saturn:"Its rings are mostly water ice, yet the system is barely 1 km thick in places.",uranus:"Uranus rolls around the Sun on its side — tilted about 98°.",neptune:"Winds here reach ~2,100 km/h, the fastest in the Solar System.",moon:"The Moon drifts away from Earth by about 3.8 cm each year.",pluto:"Pluto’s bright heart is Sputnik Planitia, a nitrogen-ice plain."};function lv(n){if(!Number.isFinite(n)||n===0)return"—";const e=n<0,t=Math.abs(n),i=t<48?`${t.toFixed(1)} h`:`${(t/24).toFixed(1)} d`;return e?`${i} (retrograde)`:i}function uv(n){const e=[{label:"Radius",value:fr(n.radiusKm)},{label:"Day length",value:lv(n.rotationHours)},{label:"Axial tilt",value:`${n.tiltDeg.toFixed(0)}°`}],t=cv[n.id];return t&&e.push({label:"Fun fact",value:t}),e}function dv(n){return n.paused&&!n.cameraMoving&&!n.scrubbing&&!n.flightActive&&!n.morphActive&&!n.skyTourActive&&!n.introActive}const Ih=Number.isFinite;function Vu(n){if(n==null||n==="")return;const e=Number(n);return Ih(e)?e:void 0}function Xi(n){if(!(n==null||n===""))return n==="1"||n==="true"}function hv(n){const t=new URL(n,"http://localhost").searchParams,i={},s=Vu(t.get("t"));s!==void 0&&(i.timeMs=s);const r=Vu(t.get("sp"));r!==void 0&&(i.speedLog=r);const o=t.get("f");o!=null&&(i.follow=o);const a=t.get("c");a!=null&&(i.constellation=a);const c=t.get("sc");c==="t"?i.scale="true":c==="v"&&(i.scale="visible");const l=Xi(t.get("o"));l!==void 0&&(i.orbits=l);const u=Xi(t.get("l"));u!==void 0&&(i.labels=u);const d=Xi(t.get("b"));d!==void 0&&(i.belts=d);const h=Xi(t.get("fig"));h!==void 0&&(i.figures=h);const f=Xi(t.get("dof"));f!==void 0&&(i.dof=f);const g=Xi(t.get("p"));g!==void 0&&(i.paused=g);const v=Xi(t.get("rv"));v!==void 0&&(i.reversed=v);const m=Xi(t.get("ev"));m!==void 0&&(i.eventsOpen=m);const p=t.get("cam");if(p){const y=p.split(",").map(Number);y.length===6&&y.every(Ih)&&(i.cam={pos:[y[0],y[1],y[2]],target:[y[3],y[4],y[5]]})}return i}function Hh(n,e){const t=new URL(n,"http://localhost"),i=t.searchParams,s=(a,c)=>{c===void 0?i.delete(a):i.set(a,c)};if(s("t",e.timeMs!==void 0?String(Math.round(e.timeMs)):void 0),s("sp",e.speedLog!==void 0?String(Xu(e.speedLog)):void 0),s("f",e.follow===void 0?void 0:e.follow),s("c",e.constellation===void 0?void 0:e.constellation),s("sc",e.scale===void 0?void 0:e.scale==="true"?"t":"v"),s("o",e.orbits===void 0?void 0:e.orbits?"1":"0"),s("l",e.labels===void 0?void 0:e.labels?"1":"0"),s("b",e.belts===void 0?void 0:e.belts?"1":"0"),s("fig",e.figures===void 0?void 0:e.figures?"1":"0"),s("dof",e.dof===void 0?void 0:e.dof?"1":"0"),s("p",e.paused===void 0?void 0:e.paused?"1":"0"),s("rv",e.reversed===void 0?void 0:e.reversed?"1":"0"),s("ev",e.eventsOpen===void 0?void 0:e.eventsOpen?"1":"0"),e.cam){const[a,c,l,u,d,h]=[...e.cam.pos,...e.cam.target].map(Xu);s("cam",`${a},${c},${l},${u},${d},${h}`)}else i.delete("cam");const r=i.toString();return`${t.origin.startsWith("http")&&n.includes("://")?`${t.origin}${t.pathname}`:t.pathname}${r?`?${r}`:""}${t.hash}`}function Xu(n){return Math.round(n*1e6)/1e6}const Vc=Math.PI/180,L1=180/Math.PI,Pr=on.map(n=>n.id),B0=new Map(on.map(n=>[n.id,n])),Sn=B0.get("earth"),fv=y1.find(n=>n.id==="moon"),pv=["mercury","venus"],mv=["mars","jupiter","saturn","uranus","neptune"];function ts(n){return Math.hypot(n.x,n.y,n.z)}function Ls(n,e){return{x:n.x-e.x,y:n.y-e.y,z:n.z-e.z}}function Oo(n){return{x:-n.x,y:-n.y,z:-n.z}}function Is(n,e){const t=n.x*e.x+n.y*e.y+n.z*e.z,i=ts(n),s=ts(e);if(i===0||s===0)return 0;const r=Math.min(1,Math.max(-1,t/(i*s)));return Math.acos(r)*L1}function Cs(n,e){const t=n/e;return t>=1?90:t<=0?0:Math.asin(t)*L1}function gv(n){return Ln+Math.round(n*864e5)}function Qo(n,e){return e||Math.min(2,Math.max(.25,n/2e4))}function I1(n,e,t){const i=[];for(let s=n;s<=e+1e-9;s+=t)i.push(s);return(i.length===0||i[i.length-1]<e)&&i.push(e),i}function $o(n,e,t,i,s=48){const r=(Math.sqrt(5)-1)/2,o=u=>i?-n(u):n(u);let a=e,c=t;for(let u=0;u<s;u++){const d=c-r*(c-a),h=a+r*(c-a);o(d)<o(h)?c=h:a=d}const l=(a+c)/2;return{t:l,value:n(l)}}function Rr(n,e,t,i,s,r){return{type:n,tDays:e,dateMs:gv(e),title:t,detail:i,bodyId:s,bodyId2:r}}function H1(n,e,t){const i=I1(n,e,t),s=on.map(r=>i.map(o=>Ft(r.elements,o)));return{times:i,pos:s}}function U1(n,e,t){return Ls(n.pos[e][t],n.pos[Pr.indexOf("earth")][t])}function Xc(n){const e=Ft(Sn.elements,n),t=Oo(e),[i,s,r]=Gr(n),o={x:i,y:s,z:r},a=Is(t,o),c=ts(e)*Xn,l=ts(o)*Xn;return{sep:a,sunR:Cs(M1.radiusKm,c),moonR:Cs(fv.radiusKm,l),dSunKm:c,dMoonKm:l}}function vv(n,e,t){const i=Qo(e-n,t?.coarseStepDays),s=I1(n,e,i),r=s.map(a=>Xc(a).sep),o=[];for(let a=1;a<r.length-1;a++){const c=r[a],l=c<r[a-1]&&c<r[a+1],u=c>r[a-1]&&c>r[a+1];if(!l&&!u)continue;const d=s[a],{t:h}=$o(g=>Xc(g).sep,d-2,d+2,u),f=Xc(h);if(l){const g=Cs(Sn.radiusKm,f.dMoonKm);if(f.sep<f.sunR+f.moonR+g){const v=f.sep<f.moonR-f.sunR?"Total solar eclipse":f.sep<f.sunR-f.moonR?"Annular solar eclipse":"Partial solar eclipse";o.push(Rr("solar-eclipse",h,"Solar eclipse",`${v} · Sun–Moon sep ${f.sep.toFixed(2)}°`,"sun","moon"))}}else{const g=180-f.sep,[v,m,p]=Gr(h),y=ts({x:v,y:m,z:p})*Xn,x=Cs(Sn.radiusKm,y)-f.sunR,b=Cs(Sn.radiusKm,y)+f.sunR;if(g<f.moonR+b){const L=g<x-f.moonR?"Total lunar eclipse":g<x+f.moonR?"Partial lunar eclipse":"Penumbral lunar eclipse";o.push(Rr("lunar-eclipse",h,"Lunar eclipse",`${L} · ${g.toFixed(2)}° from opposition`,"moon"))}}}return o}function xv(n,e,t){const i=H1(n,e,Qo(e-n,t?.coarseStepDays)),s=Pr.indexOf("earth"),r=[];for(const o of pv){const a=Pr.indexOf(o),c=B0.get(o),l=i.times.map((u,d)=>{const h=U1(i,a,d),f=Oo(i.pos[s][d]);return Is(h,f)});for(let u=1;u<l.length-1;u++){if(!(l[u]<l[u-1]&&l[u]<l[u+1])||l[u]>30)continue;const d=i.times[u],h=b=>{const L=Ls(Ft(c.elements,b),Ft(Sn.elements,b)),A=Oo(Ft(Sn.elements,b));return Is(L,A)},{t:f,value:g}=$o(h,d-2,d+2,!1),v=ts(Ft(Sn.elements,f))*Xn,m=Ls(Ft(c.elements,f),Ft(Sn.elements,f)),p=ts(m)*Xn,y=Cs(M1.radiusKm,v),x=Cs(c.radiusKm,p);if(g<y+x){const b=g<y-x?"Transit (planet fully on the Sun)":"Partial transit";r.push(Rr("transit",f,`${c.name} transit`,`${b} · sep ${g.toFixed(2)}°`,o))}}}return r}function _v(n,e,t){const i=t?.conjunctionDeg??1,s=H1(n,e,Qo(e-n,t?.coarseStepDays));Pr.indexOf("earth");const r=s.times.length,o=[],a=on.map((c,l)=>{const u=new Array(r);for(let d=0;d<r;d++)u[d]=U1(s,l,d);return u});for(let c=0;c<on.length;c++)for(let l=c+1;l<on.length;l++){const u=d=>Is(a[c][d],a[l][d]);for(let d=1;d<r-1;d++){const h=u(d);if(!(h<u(d-1)&&h<u(d+1))||h>i*2.5)continue;const f=s.times[d],g=p=>{const y=Ls(Ft(on[c].elements,p),Ft(Sn.elements,p)),x=Ls(Ft(on[l].elements,p),Ft(Sn.elements,p));return Is(y,x)},{t:v,value:m}=$o(g,f-2,f+2,!1);if(m<i){const p=on[c].name,y=on[l].name;o.push(Rr("conjunction",v,`${p}–${y} conjunction`,`sep ${m.toFixed(2)}°`,on[c].id,on[l].id))}}}return o}function Mv(n,e,t){const i=t?.oppositionDeg??170,s=H1(n,e,Qo(e-n,t?.coarseStepDays)),r=Pr.indexOf("earth"),o=[];for(const a of mv){const c=Pr.indexOf(a),l=B0.get(a),u=s.times.map((d,h)=>Is(U1(s,c,h),Oo(s.pos[r][h])));for(let d=1;d<u.length-1;d++){if(!(u[d]>u[d-1]&&u[d]>u[d+1])||u[d]<170)continue;const h=s.times[d],f=m=>Is(Ls(Ft(l.elements,m),Ft(Sn.elements,m)),Oo(Ft(Sn.elements,m))),{t:g,value:v}=$o(f,h-3,h+3,!0);v>i&&o.push(Rr("opposition",g,`${l.name} opposition`,`elongation ${v.toFixed(2)}° from the Sun`,a))}}return o}function yv(){const n=40.588*Vc,e=83.537*Vc,t=23.4392911*Vc,i=Math.cos(e)*Math.cos(n),s=Math.cos(e)*Math.sin(n),r=Math.sin(e),o=s*Math.cos(t)+r*Math.sin(t),a=-s*Math.sin(t)+r*Math.cos(t),c=Math.hypot(i,o,a);return{x:i/c,y:o/c,z:a/c}}const Yc=yv();function Yu(n){const e=Ft(B0.get("saturn").elements,n),t=Ft(Sn.elements,n),i=Ls(t,e),s=Math.abs(i.x*Yc.x+i.y*Yc.y+i.z*Yc.z),r=Math.min(1,s/(ts(i)||1));return 90-Math.acos(r)*L1}function Sv(n,e,t){const i=t?.edgeOnDeg??2,s=Qo(e-n,t?.coarseStepDays),r=I1(n,e,s),o=r.map(Yu),a=[];for(let l=1;l<o.length-1;l++){if(!(o[l]<o[l-1]&&o[l]<o[l+1])||o[l]>i*2.5)continue;const u=r[l],{t:d,value:h}=$o(Yu,u-45,u+45,!1);h<i&&a.push(Rr("saturn-edge-on",d,"Saturn rings edge-on",`ring plane tilt ${h.toFixed(2)}° from Earth`,"saturn"))}a.sort((l,u)=>l.tDays-u.tDays);const c=[];for(const l of a){const u=c[c.length-1];if(u&&l.tDays-u.tDays<30){const d=h=>parseFloat(h.detail.match(/tilt ([\d.]+)/)?.[1]??"99");d(l)<d(u)&&(c[c.length-1]=l)}else c.push(l)}return c}function Uh(n,e,t){const i=[...vv(n,e,t),...xv(n,e,t),..._v(n,e,t),...Mv(n,e,{coarseStepDays:t?.coarseStepDays}),...Sv(n,e,t)];return i.sort((s,r)=>s.dateMs-r.dateMs),i}const bv=1457,Ev=[9739.5,.0022814093761039703,.0010657882573773733,.00019166966050073787,9739.75,.0022092635358797698,.0011975123439639922,.00019873936361813706,9740,.0021294060276930544,.001324980075009912,.00020510802557444438,9740.25,.00204207344799821,.0014477197155785449,.00021074936657614602,9740.5,.0019475326713205311,.001565272330777805,.0002156395566442163,9740.75,.0018460802307598279,.0016771938678742566,.00021975735162508065,9741,.0017380415497911545,.001783057212799702,.00022308422009369,9741.25,.00162377002640369,.001882454211237934,.0002256044604177073,9741.5,.0015036459709077512,.0019749976446602185,.0002273053072803729,9741.75,.001378075398964151,.0020603231517611364,.00022817702697742743,9742,.001247488681585079,.0021380910857113637,.00022821300081053182,9742.25,.0011123390540622397,.002207988297479862,.00022740979589704974,9742.5,.0009731009860405907,.002269729835184287,.00022576722270583563,9742.75,.0008302684153197911,.00232306054901506,.00022328837861375892,9743,.0006843528484744964,.0023677565907665064,.00021997967676178748,9743.25,.0005358813320790745,.002403626796430356,.00021585085947705546,9743.5,.0003853942992363506,.002430513939707131,.00021091499552356152,9743.75,.00023344329726870564,.0024482958437245118,.00020518846045451143,9744,8058860384386901e-20,.002456886337773598,.0001986908993687068,9744.25,-7260325951924637e-20,.002456236045567813,.00019144517142855827,9744.5,-.00022556210570999415,.002446332991438709,.00018347727558069136,9744.75,-.0003777167390793351,.0024272030111185208,.00017481625703902833,9745,-.0005284976760478135,.0023989099543390954,.00016549409424353954,9745.25,-.0006773399116765911,.0023615556674987702,.00015554556620006311,9745.5,-.0008236857122606961,.0023152797461344944,.0001450081003353552,9745.75,-.0009669874117557224,.002260259048914798,.00013392160126445357,9746,-.001106710187811349,.002196706967346984,.00012232826115993035,9746.25,-.0012423347914707085,.002124872448347387,.00011027235272760003,9746.5,-.0013733602033156934,.002045038770207534,9780000612156027e-20,9746.75,-.0014993061880982663,.0019575220762270075,8495897146228721e-20,9747,-.0016197157197857057,.0018626696742764682,7179836894281611e-20,9747.25,-.00173415724953107,.0017608581146799996,58368428807008186e-21,9747.5,-.0018422267903990023,.0016524910629214238,4472022374728856e-20,9747.75,-.0019435497947382168,.0015379969876301765,3090539648451262e-20,9748,-.0020377828028731574,.0014178266879581562,16975885450500426e-21,9748.25,-.002124614845216596,.0012924506876298215,29836515826292166e-22,9748.5,-.002203768583911019,.001162356525549929,-11019590743550122e-21,9748.75,-.002275001184523941,.0010280459747364064,-2498263567749985e-20,9749,-.0023381049130592013,.0008900322224560601,-3885503792259261e-20,9749.25,-.0023929074583921395,.0007488370447171332,-5258735220788164e-20,9749.5,-.002439271985050567,.0006049880077129909,-6613135785184217e-20,9749.75,-.0024770969258775316,.00045901572744183253,-794402663937807e-19,9750,-.0025063155283704492,.000311451216610769,-9246891063756385e-20,9750.25,-.002526895172263632,.00016282334516271228,-.0001051739138500299,9750.5,-.002538836479103632,1365643745869288e-20,-.00011751383826871328,9750.75,-.0025421722370840005,-.0001355319745598809,-.00012944931248619573,9751,-.0025369661662134595,-.00028423322687277377,-.00014094313767814176,9751.25,-.002523311549977368,-.0004319494162752554,-.00015196037301699102,9751.5,-.0025013297600395006,-.0005781951034597887,-.00016246840095361846,9751.75,-.002471168700268865,-.0007224988230029601,-.0001724369733476557,9752,-.0024330011955043837,-.0008644044006509246,-.00018183823967712017,9752.25,-.0023870233491202447,-.001003472081638731,-.00019064675875894637,9752.5,-.00233345289166183,-.001139279476722865,-.00019883949556051978,9752.75,-.0022725275407275386,-.0012714223351185194,-.00020639580478235838,9753,-.0022045033899421277,-.0013995151555833804,-.00021329740294443424,9753.25,-.002129653342407409,-.0015231916484875919,-.00021952833071900768,9753.5,-.0020482656015019646,-.0016421050628650305,-.00022507490722559746,9753.75,-.0019606422294053435,-.0017559283931831119,-.00022992567794457623,9754,-.001867097781304087,-.0018643544809354633,-.00023407135782073545,9754.25,-.0017679580209437149,-.0019670960261976424,-.00023750477102266385,9754.5,-.0016635587210572585,-.0020638855240372924,-.000240220788703299,9754.75,-.00155424455025085,-.002154475140184427,-.0002422162659764209,9755,-.001440368046173777,-.0022386365396916664,-.00024348997918750427,9755.25,-.0013222886732494183,-.002316160681491565,-.00024404256441893778,9755.5,-.0012003719618912353,-.0023868575908270124,-.00024387645803200183,9755.75,-.001074988724966159,-.002450556120524176,-.00024299583991341402,9756,-.0009465143462876141,-.0025071037110300483,-.0002414065799650629,9756.25,-.0008153281351000213,-.0025563661580611436,-.00023911618825165764,9756.5,-.0006818127398475552,-.002598227395635912,-.0002361337691044801,9756.75,-.0005463536139785328,-.0026325893011955276,-.0002324699793693886,9757,-.00040933852611090845,-.002659371528468986,-.00022813699088423478,9757.25,-.0002711571065561063,-.0026785113727119366,-.00022314845717427608,9757.5,-.00013220042195509891,-.002689963671946223,-.00021751948426357304,9757.75,7139430389434868e-21,-.0026937007468472553,-.00021126660541508072,9758,.00014646971700718673,-.002689712380965575,-.00020440775953147288,9758.25,.0002853974601515022,-.0026780058420223267,-.00019696227287199262,9758.5,.0004235298356536932,-.0026586059440798352,-.0001889508436671394,9758.75,.0005604745852481483,-.0026315551494518656,-.00018039552914230243,9759,.0006958404517632202,-.002596913708277339,-.00017131973439306295,9759.25,.0008292376454007999,-.0025547598327310215,-.00016174820248871866,9759.5,.0009602783490888632,-.0025051899018810786,-.0001517070051165638,9759.75,.0010885772705765571,-.002448318692224435,-.00014122353301797646,9760,.0012137522485401425,-.002384279627936997,-.0001303264854088678,9760.25,.0013354249194650917,-.0023132250438697086,-.0001190458575225142,9760.5,.0014532214514548208,-.0022353264533126606,-.0001074129253634223,9760.75,.0015667733503697443,-.002150774811542826,-9546022671797729e-20,9761,.0016757183428146242,-.002059780765189885,-8322153743336911e-20,9761.25,.0017797013394488816,-.001962574876510671,-7073184195244372e-20,9761.5,.0018783754808866296,-.0018594078107843097,-58027297081243576e-21,9761.75,.001971403267073418,-.0017505504742550706,-4514518797055183e-20,9762,.0020584577694727816,-.001636294089390157,-321238753153805e-19,9762.25,.002139223923671575,-.00151695019372155,-1900273281962242e-20,9762.5,.002213399898130422,-.0013928505482432713,-5822074039527462e-21,9762.75,.0022806985327838616,-.0012643469412777805,7376932188620925e-21,9763,.002340848839062652,-.0011318108739464285,20552358412570523e-21,9763.25,.0023935975507064734,-.0009956331139153206,3366162784923032e-20,9763.5,.002438710712507869,-.0008562231049716204,4666163664544678e-20,9763.75,.002475975291936362,-.0007140082212409605,5950888926701882e-20,9764,.0025052007964965557,-.0005694328564938399,7215964694147423e-20,9764.25,.0025262208777598405,-.00042295734101690797,8457008883127218e-20,9764.5,.002538894901331444,-.0002750566809217481,9669648534777556e-20,9764.75,.002543109460683477,-.00012621911750563538,.000108495382739678,9765,.002538779811833866,23055492684595692e-21,.00011992379780805544,9765.25,.0025258512053834762,.00017225747316640586,.00013093942132367362,9765.5,.0025043000924755525,.00032086929087609843,.000141500828458702,9765.75,.0024741351818556444,.000468367676753621,.000151567694303913,9766,.0024353983264089074,.0006142258893238775,.00016110101233309448,9766.25,.0023881652193321052,.0007579161037793656,.0001700633135073162,9766.5,.0023325458824318946,.0008989119060816299,.00017841888359028477,9766.75,.0022686849318775807,.0010366908689929558,.0001861339761781988,9767,.0021967616100022017,.001170737184821281,.0001931770189372779,9767.25,.002116989575345516,.0013005443280904568,.00019951881059121683,9767.5,.0020296164469520623,.0014256177203927102,.00020513270630829228,9767.75,.0019349231028508117,.001545477369372295,.00020999478930019784,9768,.0018332227365419629,.0016596604541386539,.00021408402665756794,9768.25,.0017248596790396169,.001767723830382588,.00021738240770041283,9768.5,.001610207997491199,.001869246430038337,.00021987506340934466,9768.75,.001489669884479303,.0019638315323988343,.00022155036581127403,9769,.001363673854749436,.0020511088860927186,.0002224000065139069,9769.25,.0012326727682263423,.002130736664135497,.00022241905390294917,9769.5,.0010971416997543804,.0022024032372766128,.00022160598882560692,9769.75,.0009575756770149703,.0022658287539624256,.00021996271887422475,9770,.0008144873085530027,.0023207665183110357,.00021749457164687178,9770.25,.0006684043238237643,.002367004160449757,.00021421026759154836,9770.5,.000519867046710243,.0024043645963161614,.00021012187323365822,9770.75,.0003694258231287419,.0024327067765020664,.00020524473574067042,9771,.00021763842221909536,.002451926225878072,.00019959739989345283,9771.25,6506742928887408e-20,.0024619553775465397,.00019320150861252321,9771.5,-8772235276676777e-20,.002462763706127838,.00018608168823291496,9771.75,-.0002401664783376575,.0024543576665012755,.00017826541973831037,9772,-.0003917033964944284,.0024367804449088593,.00016978289715760487,9772.25,-.0005417769385111279,.002410111529856173,.00016066687430345018,9772.5,-.0006898387443587706,.0023744661105230586,.00015095250099566974,9772.75,-.0008353506180870942,.0023299943105144104,.00014067714987105743,9773,-.000977786802901666,.0022768802647717907,.0001298802348383664,9773.25,-.0011166361674458064,.002215341047402421,.00011860302219912152,9773.5,-.0012514042953216133,.002145625458110272,.00010688843542431878,9773.75,-.0013816154702529521,.0020680126748833993,9478085455699491e-20,9774,-.001506814549536747,.0019828107806432183,8232591120265992e-20,9774.25,-.001626568718586011,.0018903551717251864,6957028007423083e-20,9774.5,-.0017404691194826906,.0017910068563551857,56561468074737054e-21,9774.75,-.0018481323465769242,.001685150651719726,43347601928113876e-21,9775,-.0019492018023382076,.0015731932887975298,2997721540339883e-20,9775.25,-.002043348906927081,.0014555614348102592,16499037217362427e-21,9775.5,-.0021302741553522724,.0013326996439349114,29617807411921114e-22,9775.75,-.002209708016639189,.0012050682477642652,-10586063325947842e-21,9776,-.0022814116701847832,.001073141197870118,-24096430123561e-18,9776.25,-.0023451775754219912,.0009374038736568923,-3752187842596407e-20,9776.5,-.002400829872068452,.0007983508694598091,-50815781854241256e-21,9776.75,-.0024482246095732726,.0006564837754736611,-6393251230670476e-20,9777,-.0024872498058875264,.00051230896756833,-7682761444764314e-20,9777.25,-.0025178253373306543,.00036633542130036517,-8945797015435616e-20,9777.5,-.002539902663068275,.00021907256544067332,-.00010178195190597302,9777.75,-.0025534643895087986,7102819008195756e-20,-.00011375956420389827,9778,-.002558523681713787,-7729357614767508e-20,-.00012535257224147067,9778.25,-.0025551235306457824,-.00022539420605729104,-.00013652461718696937,9778.5,-.0025433358866941047,-.00037278261843351934,-.00014724131760607634,9778.75,-.0025232606713736,-.0005189769158684412,-.00015747035672321325,9779,-.0024950246803390553,-.0006635060061501701,-.00016718155540126455,9779.25,-.0024587803918620075,-.0008059110992244243,-.00017634693090124237,9779.5,-.00241470469565041,-.0009457470735988285,-.00018494074166252415,9779.75,-.002362997557338781,-.001082583708004306,-.0001929395185156854,9780,-.0023038806341263386,-.0012160067761046041,-.00020032208289965089,9780.25,-.0022375958569056708,-.001345619003992512,-.0002070695527986669,9780.5,-.0021644039938073867,-.0014710408920959382,-.00021316533723992752,9780.75,-.002084583209420285,-.0015919114048847055,-.00021859512029705856,9781,-.001998427633050381,-.001707888533389864,-.00022334683562664004,9781.25,-.0019062459482972023,-.0018186497369887986,-.0002274106326240169,9781.5,-.0018083600149854842,-.0019238922721514962,-.000230778835320854,9781.75,-.001705103533133831,-.0020233334168721067,-.00023344589516107562,9782,-.0015968207572079314,-.0021167106003195956,-.00023540833878537214,9782.25,-.0014838652674309262,-.0022037814478328564,-.0002366647119292087,9782.5,-.0013665988034408769,-.002284323751766555,-.00023721552049740276,9782.75,-.001245390164124719,-.0023581353788762645,-.00023706316982218876,9783,-.0011206141760450438,-.002425034124931253,-.0002362119030437633,9783.25,-.0009926507315311294,-.002484857527079318,-.00023466773947499345,9783.5,-.000861883896243806,-.0025374626441807767,-.00023243841372761314,9783.75,-.0007287010848553475,-.002582725814898871,-.0002295333162878817,9784,-.0005934923024206493,-.0026205424028013916,-.00022596343613743577,9784.25,-.00045664944805037794,-.0026508265371135895,-.00022174130592120164,9784.5,-.00031856567663755397,-.002673510857081233,-.00021688095007043554,9784.75,-.00017963481362662137,-.0026885462671721763,-.00021139783619596628,9785,-402508171470613e-19,-.002695901709575618,-.00020530882997543982,9785.25,9919271874666115e-20,-.0026955639596620623,-.0001986321536691555,9785.5,.0002383030264870975,-.002687537449250208,-.00019138734831224334,9785.75,.00037668860024343224,-.002671844121694217,-.0001835952395464316,9786,.0005139596115561467,-.002648523321958456,-.00017527790697234258,9786.25,.000649728313206234,-.0026176317239862633,-.00016645865682284608,9786.5,.0007836094394153608,-.0025792432967926262,-.00015716199767915642,9786.75,.000915220610667784,-.002533449309813668,-.00014741361887360616,9787,.001044182751587288,-.0024803583771236624,-.00013724037114604901,9787.25,.0011701205303909744,-.002420096539176861,-.0001266702490442388,9787.5,.0012926628284714878,-.002352807379740485,-.00011573237448210973,9787.75,.0014114432486224794,-.0022786521746507287,-.00010445698079355525,9788,.0015261006703083965,-.0021978100679416112,-9287539654329894e-20,9788.25,.0016362798601746364,-.002110478269760604,-8102002828098677e-20,9788.5,.0017416321456801018,-.002016872269301138,-6892434135101376e-20,9788.75,.0018418161592941636,-.0019172260547406577,-5662283779893805e-20,9789,.0019364986601070648,-.0018117923308961692,-44151030348623006e-21,9789.25,.002025355438937129,-.0017008427239949392,-31545411363243806e-21,9789.5,.0021080723120518964,-.0015846679616313478,-18843415651273514e-21,9789.75,.0021843462074286686,-.0014635780146657184,-6083375938491678e-21,9790,.002253886346039563,-.0013379021865486734,66955301975708145e-22,9790.25,.0023164155189361654,-.0012079891343663377,1945334313944589e-20,9790.5,.002371671458913939,-.0010742068048476563,3214939497758277e-20,9790.75,.0024194083032493207,-.0009369422677131462,4474239533641993e-20,9791,.002459398141425824,-.0007966014281399716,57190530339824126e-21,9791.25,.0024914326389157905,-.0006536085998427775,6945157565803342e-20,9791.5,.002515324724993386,-.0005084059204005095,814830244170752e-19,9791.75,.002530910329272642,-.00036145259107491054,9324223054488062e-20,9792,.0025380501482630043,-.0002132239245296347,.00010468656787481088,9792.25,.0025366314198107306,-6421018565969608e-20,.00011577360502503289,9792.5,.0025265696799420504,8508478681466614e-20,.00012646129572535267,9792.75,.002507810473521876,.00023414518714905092,.00013670818387306814,9793,.0024803309873758397,.00038244508308157664,.00014647362217635858,9793.25,.0024441415723140086,.0005294504908023314,.00015571800279525456,9793.5,.002399287118974604,.0006746216799918938,.00016440299793088746,9793.75,.0023458482517373733,.0008174156988897009,.0001724918078590725,9794,.0022839423052846528,.0009572891033594164,.00017994941347244925,9794.25,.002213724049825033,.0010937008677702257,.00018674283000626616,9794.5,.0021353861336084186,.0012261154494382753,.00019284135829687862,9794.75,.002049159215171784,.0013540059726218148,.00019821682967881155,9795,.001955311762724397,.0014768574928975076,.00020284384048342943,9795.25,.0018541495041080752,.001594170298422376,.00020669997207425233,9795.5,.0017460145176789847,.0017054632013498105,.0002097659924504562,9795.75,.0016312839620168898,.0018102767707240122,.00021202603567495865,9796,.0015103684503422615,.001908176457640925,.0002134677557339121,9796.25,.001383710083515923,.0019987555644645485,.0002140824519007624,9796.5,.0012517801632914284,.002081638012397872,.00021386516324754215,9796.75,.0011150766146485332,.0021564808656249525,.00021281473058961154,9797,.000974121152365644,.002222976575493525,.00021093382485296938,9797.25,.0008294562321564535,.002280854914488495,.00020822894157622706,9797.5,.0006816418305510769,.0023298845768333016,.0002047103619784027,9797.75,.0005312521001168305,.002369874430133923,.0002003920817090691,9798,.000378871947541609,.0024006744102198457,.00019529170902219173,9798.25,.00022509358158068074,.00242217605892374,.00018943033465751034,9798.5,7051307600343219e-20,.002434312711690192,.0001828323761574459,9798.75,-8427301036530891e-20,.0024370593483651237,.00017552539968265728,9799,-.00023867091842587855,.0024304321260926963,.00016753992261089076,9799.25,-.00039209284506482386,.002414487617797804,.00015890920031296757,9799.5,-.0005439599427726496,.0023893217831939934,.0001496690005042423,9799.75,-.0006937051399390239,.002355068701625048,.000139857368481471,9800,-.0008407757646146224,.002311899097305059,.0001295143863822991,9800.25,-.000984635959770957,.0022600186878573426,.00011868192937404116,9800.5,-.0011247688829898125,.0021996663864625107,.00010740342139528488,9800.75,-.0012606786879176813,.002131112386649325,9572359276364514e-20,9801,-.0013918922886431947,.0020546561568869433,8368824163636001e-20,9801.25,-.0015179609113576422,.0019706243698520394,7134400098340151e-20,9801.5,-.0016384614402183576,.0018793687886829475,58738112416419895e-21,9801.75,-.0017529975662678669,.0017812641298339269,4591820792074611e-20,9802,-.001861200749607766,.0016767059194270353,3293210026892697e-20,9802.25,-.0019627310058411246,.0015661083573665626,19827582657624438e-21,9802.5,-.002057277528148354,.0014499022010112156,6652237907781284e-21,9802.75,-.0021445591563239337,.0013285326779520065,-6546742598447586e-21,9803,-.0022243247037534667,.0012024574354605859,-19722730202097337e-21,9803.25,-.0022963531527290222,.0010721445324769039,-3282982053005515e-20,9803.5,-.002360453727757046,.0009380704786031746,-45822985461965404e-21,9803.75,-.0024164658556722796,.0008007183234568339,-58658215670272304e-21,9804,-.0024642590205012703,.0006605757989021633,-7129265392291504e-20,9804.25,-.0025037325201540724,.0005181335160867475,-836847193412523e-19,9804.5,-.0025348151312224207,.0003738832188452365,-9579422279496563e-20,9804.75,-.002557464687446922,.0002283160948480382,-.00010758247359573923,9805,-.0025716675768144514,8192114584073515e-20,-.00011901237762582038,9805.25,-.0025774381617740816,-6481638160236914e-20,-.0001300485270100497,9805.5,-.0025748181267232226,-.0002114165032346328,-.00014065728141357021,9805.75,-.0025638757567159136,-.00035740594043575443,-.00015080684102484836,9806,-.0025447051512766847,-.0005023194976872864,-.00016046731126704019,9806.25,-.0025174253772547828,-.0006457013720846849,-.0001696107592717101,9806.5,-.0024821795648091757,-.0007871063926187047,-.00017821126214852352,9806.75,-.0024391339508551013,-.0009261011869003983,-.00018624494709332893,9807,-.002388476874606232,-.0010622652730293213,-.0001936900233950927,9807.25,-.002330417730189202,-.0011951920744241356,-.00020052680642903664,9807.5,-.0022651858816651813,-.0013244898556534182,-.00020673773375820483,9807.75,-.002193029546142727,-.0014497825776219589,-.00021230737350736966,9808,-.0021142146509849705,-.0015707106708818318,-.00021722242522037718,9808.25,-.0020290236713816604,-.001686931726335016,-.00022147171346274417,9808.5,-.0019377544547555128,-.001798121103168697,-.00022504617448419563,9808.75,-.0018407190385877736,-.0019039724544947672,-.00022793883630859503,9809,-.0017382424682697863,-.0020041981718393618,-.00023014479266996135,9809.25,-.0016306616215082132,-.002098529750324362,-.00023166117126097676,9809.5,-.0015183240456285612,-.0021867180770835716,-.0002324870968031708,9809.75,-.0014015868138355027,-.002268533646142814,-.00023262364948444783,9810,-.0012808154061029393,-.0023437667036476577,-.00023207381933867228,9810.25,-.0011563826198891642,-.0024122273279288675,-.0002308424571628546,9810.5,-.0010286675153121413,-.0024737454494400683,-.0002289362225794918,9810.75,-.0008980543987885151,-.0025281708160730734,-.00022636352985457006,9811,-.000764931848450103,-.002575372909744596,-.00022313449207561267,9811.25,-.0006296917839170307,-.0026152408204474105,-.00021926086427911975,9811.5,-.000492728582240898,-.002647683084165972,-.00021475598609329807,9811.75,-.0003544382410478769,-.0026726274911699262,-.00020963472443067175,9812,-.00021521758912284499,-.0026900208712181783,-.00020391341672658107,9812.25,-7546354389320416e-20,-.0026998288621370753,-.00019760981517477223,9812.5,6442758549543294e-20,-.0027020356680788815,-.00019074303236070616,9812.75,.00020406075156100535,-.002696643813530097,-.00018333348863805213,9813,.00034304278108380316,-.0026836738988257162,-.00017540286153451307,9813.25,.0004809829503551027,-.0026631643625432875,-.00016697403741064245,9813.5,.0006174935271410429,-.002635171255704224,-.00015807106553010204,9813.75,.0007521902840164403,-.0025997680322044315,-.00014871911463247111,9814,.0008846929882675784,-.002557045359336345,-.00013894443203064382,9814.25,.0010146258740614362,-.002507110951653058,-.00012877430518435295,9814.5,.0011416181030306798,-.0024500894307643863,-.00011823702562963347,9814.75,.0012653042198283503,-.0023861222129450063,-.00010736185507118613,9815,.0013853246095622792,-.0023153674256759446,-961789933706971e-19,9815.25,.0015013259643248005,-.002237999853430686,-8471954808917539e-20,9815.5,.0016129617662848494,-.0021542109121532797,-7301550516533128e-20,9815.75,.001719892795002032,-.002064208650954067,-6109970023487664e-20,9816,.0018217876667477875,-.0019682177785661646,-4900579001766026e-20,9816.25,.0019183234136694997,-.0018664797110558723,-36768223120641365e-21,9816.5,.0020091861105914007,-.0017592526361637421,-2442220952592945e-20,9816.75,.0020940715571055746,-.0016468115884609694,-12003687954093075e-21,9817,.002172686022334429,-.0015294485282461325,45070978403197327e-23,9817.25,.002244747059332672,-.0014074724157756527,12903698408480918e-21,9817.5,.002309984395509532,-.0012812092710282146,25317383795651233e-21,9817.75,.002368140904663215,-.0011510022077606302,3765331370249065e-20,9818,.002418973665199442,-.0010172114291382638,4987253573675602e-20,9818.25,.0024622551078221856,-.0008802141707442853,6193566376028748e-20,9818.5,.0024977742544051267,-.0007404045753247629,7380295393396399e-20,9818.75,.0025253380478472967,-.000598193482257977,8543439161208135e-20,9819,.0025447727704612875,-.00045400811350411035,9678979026478765e-20,9819.25,.0025559255458202194,-.000308291636765799,.00010782890354406898,9819.5,.002558665915993485,-.00016150258585388925,.00011851155150524507,9819.75,.002552887482739176,-1411411790097852e-20,.00012879776184564546,9820,.002538509597529773,.00013338691280820626,.00013864792682024405,9820.25,.0025154790813047114,.00028050108388031936,.000148022976232813,9820.5,.002483771950673011,.0004267177548242247,.0001568845665828804,9820.75,.0024433951230180126,.000571516653844475,.0001651952860619729,9821,.0023943880687589147,.0007143697141453679,.00017291887465148474,9821.25,.002336824375058693,.0008547431683675308,.0001800204580723263,9821.5,.0022708131817606243,.0009920999047021543,.00018646679378843533,9821.75,.0021965004475186646,.0011259020821856812,.0001922265266848496,9822,.002114070002211904,.0012556139957322315,.00019727045144392674,9822.25,.002023744341054766,.0013807051737545896,.0002015717780539744,9822.5,.0019257851165698251,.0015006536829728287,.00020510639633091558,9822.75,.0018204932869784359,.0016149496064958384,.00020785313484640542,9823,.0017082088837263398,.001723098652829282,.00020979400926711902,9823.25,.0015893103668580078,.0018246258455129364,.0002109144548516034,9823.5,.0014642135447458387,.0019190792360686615,.00021120353775328128,9823.75,.0013333700441110256,.0020060335773043492,.00021065413986554664,9824,.0011972653270817652,.0020850938901037877,.00020926311222787118,9824.25,.001056416263791891,.0021558988551351084,.00020703139250379942,9824.5,.0009113682813630703,.0022181239615661143,.00020396408273326815,9824.75,.0007626921222409732,.002271484348054578,.00020007048442361808,9825,.0006109802564985686,.0023157372770382877,.00019536408906561278,9825.25,.0004568430029943484,.0023506841914260166,.00018986252327814424,9825.5,.00030090442280482306,.002376172312922521,.00018358744895954467,9825.75,.00014379805466749855,.002392095752953465,.00017656441999724367,9826,-13837434062476827e-21,.0023983961199251485,.00016882269820282819,9826.25,-.00017136260637439958,.0023950626197434934,.00016039503214416968,9826.5,-.00032814155153961894,.0023821316594994707,.0001513174033957753,9826.75,-.0004835460492310084,.0023596859764043383,.0001416287453883213,9827,-.0006369595394082748,.0023278533248953653,.00013137064048564397,9827.25,-.0007877808437445949,.002286804763904982,.00012058700114327103,9827.5,-.0009354275938606606,.0022367525933137218,.00010932374101358597,9827.75,-.00107933933187504,.002177947993457781,9762844167793488e-20,9828,-.0012189802593916366,.0021106784241255797,8555002031751078e-20,9828.25,-.0013538416212873377,.0020352648400360366,7313840314139466e-20,9828.5,-.0014834437203883012,.0019520587783474915,604442087796531e-19,9828.75,-.0016073375678337882,.0018614393707671183,4751844518137406e-20,9829,-.0017251061814335244,.0017638103285067984,34412222855500216e-21,9829.25,-.0018363655505039935,.0016595969430977726,21176486594046562e-21,9829.5,-.0019407652904473774,.0015492431402321324,786176714811663e-20,9829.75,-.002037989013739776,.0014332086176677373,-5482046291054687e-21,9830,-.002127754446110737,.0013119660920955895,-1880591250533915e-20,9830.25,-.002209813317651812,.0011859986739524758,-32061823731755444e-21,9830.5,-.002283951058543879,.0010557973836434246,-4520297078214893e-20,9830.75,-.002349986328213821,.000921858817646815,-5818388868251119e-20,9831,-.0024077704051980904,.0007846829685933766,-7096058394917463e-20,9831.25,-.00245718646297353,.0006447711996803454,-8349064478230145e-20,9831.5,-.0024981487546660544,.0005026243707059591,-9573333555593243e-20,9831.75,-.002530601726997266,.00035874111056355233,-.00010764967702696608,9832,-.002554519081225255,.0002136162292072001,-.00011920251368131172,9832.25,-.0025699027962195918,6773926078445239e-20,-.00013035656959397638,9832.5,-.0025767821263196914,-7840687117608434e-20,-.00014107849410836172,9832.75,-.0025752125842704427,-.00022434707604359258,-.0001513368985469959,9833,-.0025652749173773236,-.00036961521540491423,-.00016110238505794106,9833.25,-.002547074083089677,-.0005137551287704479,-.00017034756858421817,9833.5,-.0025207382285244296,-.0006563215745559878,-.0001790470928228787,9833.75,-.002486417676987823,-.0007968810946051989,-.00018717764092006413,9834,-.002444283923336671,-.0009350128097715652,-.00019471794153193053,9834.25,-.0023945286390349794,-.001070309153255608,-.00020164877077136643,9834.5,-.002337362686993681,-.001202376547530739,-.00020795295045905886,9834.75,-.0022730151457146593,-.0013308360298216718,-.0002136153430061485,9835,-.002201732341876728,-.0014553238302501537,-.0002186228431754564,9835.25,-.0021237768902808416,-.0015754919059565227,-.00022296436689965514,9835.5,-.0020394267399945092,-.001691008433760253,-.00022663083727802013,9835.75,-.0019489742255803866,-.0018015582632525762,-.00022961516782849445,9836,-.001852725122437832,-.001906843331630878,-.0002319122430382956,9836.25,-.0017509977055129096,-.002006583041093845,-.00023351889623378987,9836.5,-.0016441218109166744,-.0021005145992243285,-.00023443388477793978,9836.75,-.001532437900317338,-.0021883933224941224,-.0002346578626004974,9837,-.0014162961283197956,-.00226999290283081,-.00023419335007117588,9837.25,-.0012960554133983808,-.00234510563708826,-.00023304470123813417,9837.5,-.0011720825132900698,-.0024135426192536972,-.00023121806847202806,9837.75,-.0010447511060713815,-.0024751338952983225,-.00022872136457830733,9838,-.0009144408784201366,-.0025297285807261522,-.00022556422246608585,9838.25,-.0007815366227924346,-.0025771949410868487,-.00022175795248940744,9838.5,-.0006464273454169475,-.0026174204359811788,-.0002173154976048553,9838.75,-.0005095053871162755,-.0026503117273903604,-.00021225138651688992,9839,-.0003711655590041569,-.0026757946534900095,-.00020658168500798315,9839.25,-.000231804295075211,-.0026938141694530264,-.00020032394567339642,9839.5,-9181882360036746e-20,-.00270433425709074,-.00019349715629946867,9839.75,4839364093226526e-20,-.002707337805515806,-.00018612168713872036,9840,.0001884366838320251,-.0027028264653222857,-.0001782192373442425,9840.25,.0003279154529786915,-.0026908204790573272,-.00016981278082930495,9840.5,.00046643739751566307,-.0026713584909956217,-.00016092651181546104,9840.75,.0006036129820319971,-.0026444973394140338,-.00015158579032348895,9841,.0007390563762509215,-.002610311834692633,-.00014181708784620115,9841.25,.0008723861207235352,-.0025688945266340306,-.00013164793342050108,9841.5,.001003225769531828,-.0025203554643913515,-.00012110686028829715,9841.75,.0011312045115260843,-.0024648219523227227,-.00011022335330215655,9842,.0012559577721494028,-.0024024383049450005,-9902779719225871e-20,9842.25,.0013771277984281464,-.0023333656039398925,-8755142576666496e-20,9842.5,.0014943642302235063,-.0022577814598711545,-758262720674918e-19,9842.75,.0016073246613381165,-.002175879780901748,-6388511945176567e-20,9843,.0017156751945451862,-.002087870550354826,-5176145350789752e-20,9843.25,.001819090995048162,-.0019939796144423246,-3948941465734168e-20,9843.5,.0019172568472791533,-.0018944484808898821,-2710375122650121e-20,9843.75,.0020098677202962526,-.0017895341285168388,-14639772706771964e-21,9844,.002096629347334043,-.0016795088270853652,-21333028513249327e-22,9844.25,.002177258825291199,-.0015646599659129355,10379367813811331e-21,9844.5,.002251485240088231,-.001445289888847968,22861530558667885e-21,9844.75,.002319050323893725,-.0013217157322395353,35276108665019974e-21,9845,.0023797091501738593,-.0011942692614903229,4758570992713142e-20,9845.25,.002433230872361148,-.001063296700669804,59752682145937026e-21,9845.5,.002479399511640749,-.0009291585484864058,7173917239199028e-20,9845.75,.0025180147988961236,-.0007922293726806722,8350719087468663e-20,9846,.002548893075217849,-.0006528975736168831,9501868031063006e-20,9846.25,.002571868254534509,-.0005115651065338763,.00010623559173001425,9846.5,.0025867928508455096,-.00036864715058856136,.00011711996769344981,9846.75,.0025935390711945426,-.00022457171151660682,.00012763403390920325,9847,.0025919999738925107,-7977914348129703e-20,.000137740300238147,9847.25,.0025820906895551686,6527842546944794e-20,.00014740167204615643,9847.5,.002563749700242251,.00021013778090861143,.00015658157280592312,9847.75,.0025369401693571473,.00035432543982958395,.00016524407875646082,9848,.002501651311995106,.0004973586165236743,.00017335406629374826,9848.25,.0024578997921025874,.0006387463543608855,.00018087737258208635,9848.5,.002405731129213315,.0007779908408607825,.00018778096964263444,9848.75,.0023452210936250393,.0009145889223491061,.0001940331518791621,9849,.002276477064873281,.0010480338327329046,.00019960373665111375,9849.25,.002199639324258309,.0011778171483060942,.00020446427708822773,9849.5,.0021148822481967186,.0013034309769702726,.00020858828586744975,9849.75,.0020224153654777055,.0014243703857493208,.00021195146814657746,9850,.0019224842383215059,.0015401360649511945,.0002145319612792737,9850.25,.0018153711247177674,.0016502372208021681,.00021631057833819195,9850.5,.0017013953781399938,.0017541946809262801,.0002172710518680037,9850.75,.0015809135406663545,.0018515441888139938,.00021740027370417974,9851,.0014543190870486568,.0019418398546436945,.0002166885261570844,9851.25,.0013220417805873805,.002024657720795716,.0002151296994087912,9851.5,.0011845466069657327,.0020995993915294132,.00021272148964009927,9851.75,.0010423322595533042,.0021662956680515554,.00020946557223552683,9852,.0008959291590336399,.0022244101230318256,.00020536774443170899,9852.25,.0007458970014066097,.002273642543172993,.0002004380320183859,9852.5,.0005928218412162602,.0023137321650328097,.00019469075517924896,9852.75,.0004373127305207451,.002344460628589462,.00018814454927809678,9853,.00027999794850384386,.0023656545751254833,.00018082233735157823,9853.25,.00012152087060481986,.0023771878212478868,.00017275125222646195,9853.5,-37464460900416674e-21,.002378983049141734,.0001639625074992121,9853.75,-.0001962979915828688,.0023710129642782003,.00015449121804104055,9854,-.0003543184526030421,.002353300885356227,.0001443761721528215,9854.25,-.0005108682133731217,.0023259207466369823,.00013365955891661224,9854.5,-.0006652980984305272,.0022889965092792175,.00012238665559956857,9854.75,-.0008169720787897392,.0022427009949674793,.00011060548109265943,9855,-.000965271752522737,.0021872541711899776,9836642225241291e-20,9855.25,-.0011096005370438392,.0021229209321556594,8572184061631594e-20,9855.5,-.0012493875060286704,.0020500084318286183,7272566725991315e-20,9855.75,-.0013840908164018655,.001968863035365015,59432993556128934e-21,9856,-.0015132006849067313,.0018798669620582581,4589966529004624e-20,9856.25,-.00163624188818537,.0017834346965291581,3218188703044687e-20,9856.5,-.001752775774799746,.0016800092454396713,1833584288394129e-20,9856.75,-.0018624017912053578,.0015700583147779845,44173388374763165e-22,9857,-.001964758535932068,.0014540704779875862,-9518529130007465e-21,9857.25,-.0020595243667066213,.0013325513985463404,-234176780459598e-19,9857.5,-.0021464175937008605,.0012060201624815574,-3722730998071731e-20,9857.75,-.002225196298399431,.0010750057672917594,-50896152042364384e-21,9858,-.002295657821778407,.0009400438043567563,-6437466415032664e-20,9858.25,-.0023576379677028784,.000801673362599528,-7761521519199906e-20,9858.5,-.0024110099678973894,.0006604341722822879,-9057222882037346e-20,9858.75,-.002455683253782044,.0005168639996603866,-.00010320230066861127,9859,-.0024916020781918635,.0003714962959844978,-.00011546428914187212,9859.25,-.0025187440268043784,.00022485809815272155,-.00012731938220569768,9859.5,-.0025371184552658564,7746817320265964e-20,-.0001387311427369806,9859.75,-.002546764883775367,-7016460522487196e-20,-.00014966553505349367,9860,-.002547751376515906,-.00021754266329812442,-.0001600909352037488,9860.25,-.002540172928922106,-.00036418093327493403,-.00016997812750400311,9860.5,-.002524149881566485,-.0005096078778893594,-.0001793002896614272,9860.75,-.002499826375469282,-.0006533663516735142,-.0001880329686412799,9861,-.0024673688600050044,-.000795014318032494,-.00019615404923145922,9861.25,-.002426964661312284,-.0009341254404160548,-.00020364371704105922,9861.5,-.0023788206162423864,-.001070289565091469,-.0002104844174491505,9861.75,-.002323161774406375,-.0012031131119129821,-.00021666081180270508,9862,-.002260230168789138,-.0013322193881866128,-.0002221597319535179,9862.25,-.0021902836536695923,-.0014572488393136207,-.00022697013402685995,9862.5,-.002113594807193723,-.0015778592484187097,-.00023108305213197849,9862.75,-.002030449894859971,-.0016937258956760287,-.00023449155255796106,9863,-.001941147889362583,-.0018045416865735198,-.00023719068884867704,9863.25,-.0018459995416656742,-.0019100172569318538,-.00023917745801766598,9863.5,-.0017453264978195123,-.002009881061138312,-.00024045075804771901,9863.75,-.0016394604558532498,-.0021038794487830796,-.00024101134672002437,9864,-.001528742357051552,-.0021917767337077698,-.0002408618017330604,9864.25,-.0014135216060355183,-.0022733552583961794,-.00024000648200156398,9864.5,-.0012941553142845983,-.0023484154556634063,-.00023845148996937162,9864.75,-.001171007562047598,-.002416775908730321,-.00023620463472617936,9865,-.0010444486739735548,-.0024782734100075626,-.000233275395686131,9865.25,-.0009148545042341196,-.002532763018255572,-.00022967488656470275,9865.5,-.0007826057273928278,-.0025801181132328265,-.00022541581937873443,9865.75,-.0006480871317900562,-.002620230446491196,-.00022051246819164915,9866,-.0005116869127434227,-.002653010186621955,-.0002149806323310906,9866.25,-.0003737959634003017,-.002678385956995015,-.00020883759881840165,9866.5,-.00023480716161113625,-.0026963048638630506,-.000202102103767714,9866.75,-951146517091096e-19,-.0027067325126164912,-.0001947942925359373,9867,4488687942611809e-20,-.002709653009969242,-.00018693567843271967,9867.25,.0001848029321844656,-.002705068949922056,-.00017854909983048778,9867.5,.0003242399296687882,-.0026930013814834173,-.00016965867554800913,9867.75,.0004628059581463579,-.0026734897563186334,-.00016028975841550513,9868,.0006001115115781666,-.0026465918547375874,-.00015046888696425048,9868.25,.0007357702390468169,-.002612383688710632,-.00014022373521767553,9868.5,.0008693996937198587,-.002570959380910257,-.00012958306059346358,9868.75,.00100062208187061,-.002522431019102149,-.00011857664995585845,9869,.001129065010433341,-.0024669284855425343,-.00010723526388365727,9869.25,.0012543622315946315,-.0024045992613671878,-9559057924122386e-20,9869.5,.0013761543830157303,-.0023356082062702213,-8367513015669761e-20,9869.75,.0014940897224387881,-.002260137314056516,-7152224752272066e-20,9870,.0016078248556479296,-.00217838544489973,-5916599714000933e-20,9870.25,.0017170254570282237,-.0020905680353381865,-466411166226126e-19,9870.5,.0018213669822838283,-.001996916787184477,-3398295117545591e-20,9870.75,.0019205353732322402,-.0018976793366031264,-21227388339798048e-21,9871,.0020142277549745733,-.00179311890461711,-8410791780492703e-21,9871.25,.002102153126141261,-.0016835139302325665,4430065839243262e-21,9871.5,.002184033043316673,-.0015691576872172495,17258070884186216e-21,9871.75,.0022596023011425717,-.0014503578853289308,30035837703179298e-21,9872,.00232860960997589,-.001327436256463071,42725778588493735e-21,9872.25,.0023908182733180937,-.0012007281257747067,552901748612699e-19,9872.5,.0024460068675257415,-.001070581967327796,6769124925839028e-20,9872.75,.0024939699265439748,-.0009373589432396566,7989123985114422e-20,9873,.002534518634556828,-.0008014324246213894,918524757821539e-19,9873.25,.002567481529509837,-.000663187491873709,.00010353745516315715,9873.5,.0025927052204132157,-.0005230204110882892,.00011490892553083813,9873.75,.0026100551211621593,-.00038133808243689124,.0001259299673093573,9874,.0026194162032982878,-.00023855745551611547,.00013656408077475805,9874.25,.0026206937696658154,-9510490566899633e-20,.00014677527705599024,9874.5,.0026138142502704163,48584435656228006e-21,.00015652817373758645,9874.75,.0025987260208109437,.00019206740440325134,.00016578809564751347,9875,.0025754002433079765,.00033489359007333325,.00017452118141756138,9875.25,.0025438317269839434,.00047660619422604976,.0001826944963897163,9875.5,.002504039806044558,.0006167429717328783,.00019027615240686699,9875.75,.0024560692292613924,.0007548372658055033,.00019723543496626315,9876,.002399991054262155,.00089041914822719,.0002035429381258474,9876.25,.002335903537189529,.001023016676365703,.00020917070743221223,9876.5,.0022639330059390874,.0011521572783802156,.00021409239098305844,9876.75,.0021842347024994967,.001277369277472714,.0002182833985390677,9877,.00209699357711696,.0013981835650178384,.0002217210683631256,9877.25,.0020024250140813857,.0015141354308462422,.00022438484118204386,9877.5,.0019007754660062526,.001624766556790582,.00022625644033994884,9877.75,.0017923229706495796,.0017296271767668224,.00022732005684478182,9878,.0016773775217265637,.0018282784031065597,.00022756253760384274,9878.25,.0015562812629541045,.0019202947145519616,.000226973574708418,9878.5,.001429408472925527,.0020052665962783586,.00022554589317233203,9878.75,.0012971653075375465,.002082803316565163,.00022327543406952514,9879,.0011599892667851022,.0021525358183856445,.00022016152957002983,9879.25,.001018348354005891,.002214119697378249,.00021620706596449079,9879.5,.0008727398982888205,.0022672382306084976,.0002114186304210485,9879.75,.0007236890149186455,.0023116054135090226,.00020580663696420187,9880,.0005717466844741379,.002346968955704458,.00019938542702862644,9880.25,.0004174874386089491,.002373113180542094,.0001921733399589411,9880.5,.00026150664952761377,.002389861768301713,.00018419274901069593,9880.75,.00010441743048279417,.002397080279979907,.0001754700587961975,9881,-53152833898383006e-21,.0023946783972255644,.00016603566070099536,9881.25,-.00021056629656042206,.0023826118151522337,.0001559238435902503,9881.5,-.00036717875308804897,.0023608837284129526,.00014517265810561167,9881.75,-.0005223439879452968,.0023295458572411072,.00013382373399711586,9882,-.0006754182962443469,.0022886989691189505,.0001219220512007017,9882.25,-.0008257651064757555,.002238492863104407,.00010951566670575901,9882.5,-.0009727596230534858,.0021791257972166665,9665540059497312e-20,9882.75,-.0011157934037849605,.002110843354092411,8339448591221694e-20,9883,-.0012542787868076903,.002033936755698922,6978818815520308e-20,9883.25,-.0013876530842902273,.0019487406534613911,5589340113469995e-20,9883.5,-.0015153824661938166,.0018556304349060147,4176822663766922e-20,9883.75,-.0016369654663262758,.001755019101055724,27471545740049917e-21,9884,-.0017519360544538882,.001647353779858687,13062589721680298e-21,9884.25,-.0018598662315067898,.0015331119490664116,-1399481666158018e-21,9884.5,-.001960368119486502,.001412797447166871,-15855987318355127e-21,9884.75,-.002053095532530509,.0012869363530154704,-30249110744894576e-21,9885,-.002137745030172045,.00115607281366015,-4452225929649838e-20,9885.25,-.002214056467344189,.0010207648959768383,-586203921229336e-19,9885.5,-.0022818130676310463,.0008815805314149569,-724903134920732e-19,9885.75,-.0023408410562417467,.0007390936149315687,-8608092926886138e-20,9886,-.002391008896919201,.0005938803096520534,-9934346548664767e-20,9886.25,-.0024322261824051296,.0004465155985047095,-.00011223164899314528,9886.5,-.0024644422312156654,.0002975701135702361,-.0001247018510845081,9886.75,-.00248764444450058,.00014760726364131368,-.00013671319582940467,9887,-.0025018564759129018,-28193290988179447e-22,-.00014822763541679347,9887.25,-.002507136265012839,-.00015316808099714526,-.00015920999533322122,9887.5,-.0025035739811117537,-.0003029113926579316,-.00016962799249516499,9887.75,-.0024912899199660095,-.0004515372999465772,-.00017945222964294426,9888,-.0024704323906444728,-.0005985508466282649,-.00018865616935121785,9888.25,-.002441175624559862,-.0007434751987806248,-.00019721609096636126,9888.5,-.0024037177332538458,-.0008858525236250565,-.00020511103364169683,9888.75,-.0023582787362862565,-.0010252446569680312,-.00021232272844352084,9889,-.0023050986756452192,-.0011612335840626602,-.0002188355222548784,9889.25,-.002244435828559154,-.0012934217585880714,-.00022463629592942548,9889.5,-.0021765650265273945,-.0014214322837299643,-.00022971437885806298,9889.75,-.002101776084823819,-.0015449089781704494,-.00023406146181811514,9890,-.002020372343671753,-.0016635163482848303,-.00023767150968782613,9890.25,-.0019326693197241627,-.0017769394861053799,-.0002405406753347331,9890.5,-.0018389934643828051,-.001884883910738586,-.00024266721572984652,9890.75,-.001739681023815021,-.0019870753689878976,-.00024405141110362243,9891,-.0016350769942334393,-.0020832596089982954,-.00024469548774610936,9891.25,-.0015255341650458373,-.0021732021388473095,-.0002446035448628746,9891.5,-.0014114122418165448,-.0022566879801907296,-.00024378148573008223,9891.75,-.0012930770405659264,-.002333521425351539,-.00024223695324548114,9892,-.0011708997447210546,-.0024035258046393583,-.00023997926984570896,9892.25,-.0010452562160028183,-.002466543269196937,-.00023701938165273507,9892.5,-.0009165263506403973,-.0025224345933093553,-.00023336980662177473,9892.75,-.0007850934725329471,-.0025710789988658837,-.00022904458638794666,9893,-.0006513437552997012,-.002612374003538063,-.00022405924144781785,9893.25,-.0005156656655586744,-.002646235293221441,-.0002184307292632783,9893.5,-.00037844942023475075,-.0026725966183781965,-.0002121774048376283,9893.75,-.00024008645120818036,-.0026914097131073853,-.00020531898328625652,9894,-.00010096887116470845,-.0027026442350530553,-.00019787650390582848,9894.25,38511064909181475e-21,-.002706287723633102,-.00018987229523566082,9894.5,.0001779615075347306,-.002702345573529321,-.00018132994060233803,9894.75,.0003169915741744064,-.0026908410199183224,-.00017227424364292006,9895,.00045521192796959344,-.0026718151315412862,-.00016273119331297917,9895.25,.0005922353768096784,-.0026453268074059133,-.0001527279279026023,9895.5,.0007276774951031907,-.0026114527726853924,-.00014229269760614857,9895.75,.0008611572699659896,-.002570287569225693,-.00013145482521948704,9896,.0009922977728918719,-.0025219435359922354,-.00012024466457125115,9896.25,.0011207268573350405,-.0024665507747807223,-.0001086935563319423,9896.5,.001246077882016887,-.0024042570965805915,-9683378088585809e-20,9896.75,.0013679904591804835,-.0023352279441133973,-8469850799536108e-20,9897,.0014861112264612053,-.0022596462862670033,-7232174303408397e-20,9897.25,.0016000946405299264,-.002177712480406983,-5973826961468256e-20,9897.5,.0017096037902032848,-.0020896440988626996,-46983588486709755e-21,9897.75,.0018143112263109868,-.0019956757162501735,-340938526302367e-19,9898,.0019138998052695057,-.0018960586546988329,-21105798519970973e-21,9898.25,.002008063543040333,-.0017910606844847206,-8056673581809177e-21,9898.5,.0020965084759531362,-.0016809656780277424,50158400920192315e-22,9898.75,.0021789535247522043,-.0015660732156730123,1807370566279796e-20,9899,.002255131358178821,-.0014466981421337826,3107861495837658e-20,9899.25,.002324789252431064,-.0013231700729125404,4399207520800239e-20,9899.5,.0023876899429418875,-.0011958328504245402,5677549890429697e-20,9899.75,.0024436124650796184,-.001065043949911344,6939029658147708e-20,9900,.002492352980594121,-.000931173835539845,8179797228993661e-20,9900.25,.002533725586894651,-.0007946052673225034,9396022154571503e-20,9900.5,.0025675631065397338,-.0006557325596602058,.00010583903153898648,9900.75,.002593717854629777,-.0005149607923915757,.00011739678339819318,9901,.002612062382102735,-.0003727049752288873,.00012859635632502415,9901.25,.002622490193224718,-.00022938916636837414,.00013940123343926205,9901.5,.0026249164358220544,-8544554588357033e-20,.00014977560920033972,9901.75,.0026192785630001873,58686555750995035e-21,.00015968449830279665,9902,.0026055369652191293,.0002025616739939649,.0001690938459740491,9902.25,.0025836755716269364,.0003457292718156836,.00017797063963307408,9902.5,.0025537024194746205,.00048773484735361824,.00018628302189568514,9902.75,.002515650190232869,.0006281210889525317,.00019400040493382117,9903,.0024695767106894737,.0007664290793800202,.00020109358621033356,9903.25,.0024155654168161664,.0009021995514729469,.00020753486561472944,9903.5,.002353725777547426,.0010349741978887494,.00021329816401674843,9903.75,.002284193674808387,.0011642970379759122,.0002183591432310763,9904,.002207131735167224,.0012897158450061485,.00022269532734568308,9904.25,.002122729607372216,.0014107836370890418,.00022628622530571267,9904.5,.002031204178790575,.0015270602349810698,.00022911345456341412,9904.75,.0019327997223938154,.001638113889662941,.00023116086549925335,9905,.0018277879644933114,.001743522981954607,.00023241466619097938,9905.25,.001716468061931258,.001842877795525535,.00023286354695388614,9905.5,.0015991664759410443,.0019357823634041727,.00023249880389814815,9905.75,.0014762367284655944,.0020218563864647866,.00023131446054928183,9906,.0013480590254323801,.0021007372203498513,.00022930738635806774,9906.25,.001215039730413238,.0021720819248604835,.00022647741069082252,9906.5,.0010776106713401457,.0022355693670202915,.00022282743064565627,9906.75,.0009362282626062518,.0022909023658116523,.00021836351079290603,9907,.0007913724250605441,.0023378098630429146,.00021309497269776933,9907.25,.0006435452872111513,.0023760491010008634,.00020703447186164837,9907.5,.0004932696524906038,.0024054077835754337,.00020019805952914437,9907.75,.0003410872197989638,.002425706193545332,.0001926052266649252,9908,.0001875565477783175,.0024367992348378075,.00018427892732271342,9908.25,332507574573568e-19,.0024385783650420602,.00017524557862730385,9908.5,-.00012124502701306618,.002430973380401074,.00016553503467647794,9908.75,-.00027533649383250445,.0024139540133076456,.00015518053186975022,9909,-.0004284232028151286,.0023875313010192868,.00014421860347765613,9909.25,-.0005799018687088712,.0023517586842863106,.00013268896169957352,9909.5,-.0007291698411669085,.002306732795952602,.00012063434601114915,9909.75,-.0008756287462456048,.0022525939024983384,.00010810033726842712,9910,-.0010186882468641355,.0021895259660416055,9513513780101732e-20,9910.25,-.001157769872884937,.0021177563004939905,817893185680667e-19,9910.5,-.0012923108657490667,.0020375548032688646,6811553533784081e-20,9910.75,-.001421767978297821,.0019492327529697941,5416821674812002e-20,9911,-.0015456211678587656,.0018531411735475366,4000322797009602e-20,9911.25,-.001663377120127549,.0017496687761244347,2567751449059854e-20,9911.5,-.0017745725429954948,.0016392395005745222,11248731203468347e-21,9911.75,-.0018787771732935818,.0015223096895019877,-32251374779076154e-22,9912,-.001975596445363444,.0013993649370805884,-1768616043190498e-20,9912.25,-.002064673778190231,.0012709166636409967,-320768393769256e-19,9912.5,-.0021456924472779745,.0011374984737002865,-4634047904904191e-20,9912.75,-.002218377017943299,.000999662359894549,-6042154218792153e-20,9913,-.0022824943279623304,.0008579748178160093,-7426598399977835e-20,9913.25,-.002337854018820879,.0007130129370352282,-8782156141968496e-20,9913.5,-.0023843086257828035,.0005653605316462887,-.00010103811328592019,9913.75,-.002421753247120493,.0004156043696947158,-.00011386780842402378,9914,-.0024501248217367487,.0002643305551269802,-.00012626535957285407,9914.25,-.0024694010517546596,.00011212110879938013,-.0001381882020259592,9914.5,-.002479599012274576,-4044921299207479e-20,-.00014959663676913993,9914.75,-.002480773494311409,-.00019281583262963114,-.00016045393873437587,9915,-.002473015128945085,-.000344426976883893,-.0001707264315330962,9915.25,-.0024564483410485106,-.0004947460017097247,-.00018038353065811605,9915.5,-.0024312291797946384,-.0006432534116393527,-.00018939775764327955,9915.75,-.002397543070729621,-.0007894485765368538,-.00019774472804082364,9916,-.002355602530701495,-.0009328511547436958,-.000205403116312985,9916.25,-.0023056448827881546,-.0010730022369143922,-.00021235460086163973,9916.5,-.0022479300036518744,-.0012094652289695654,-.0002185837924321298,9916.75,-.0021827381308279063,-.0013418264956945442,-.00022407814905479876,9917,-.0021103677524792505,-.0014696957885771314,-.00022882788053837062,9917.25,-.0020311335973076145,-.0015927064826463282,-.0002328258453241807,9917.5,-.0019453647377345275,-.00171051564743929,-.0002360674422640219,9917.75,-.0018534028152547893,-.0018228039769154123,-.00023855049961198462,9918,-.0017556003930808,-.0019292756022839244,-.00024027516323515694,9918.25,-.0016523194378750522,-.0020296578104366182,-.0002412437857600826,9918.5,-.0015439299295193552,-.00212370068909255,-.00024146081809002875,9918.75,-.0014308085954835086,-.0022111767179674342,-.0002409327044589661,9919,-.0013133377644085479,-.002291880323364081,-.0002396677819364119,9919.25,-.001191904331975873,-.0023656274116134455,-.000237676185065996,9919.5,-.0010668988309533453,-.00243225489483316,-.00023496975611125707,9919.75,-.000938714596450626,-.002491620220552897,-.0002315619611951534,9920,-.000807747016830511,-.002543600914930625,-.0002274678124555884,9920.25,-.0006743928603765896,-.0025880941475424106,-.00022270379619526495,9920.5,-.0005390496676630463,-.002625016324116029,-.00021728780688076954,9920.75,-.00040211519958079355,-.0026543027120758036,-.00021123908673991443,9921,-.0002639869311121064,-.002675907102386892,-.00020457817061695293,9921.25,-.00012506158118828794,-.0026898015099217592,-.00019732683567023687,9921.5,14265330709648964e-21,-.0026959759134153297,-.00018950805543452745,9921.75,.0001535999101558777,-.0026944380350199513,-.0001811459577189614,9922,.0002925503040944054,-.0026852131585077803,-.00017226578577016105,9922.25,.0004307271158797274,-.0026683439842877365,-.00016289386209698446,9922.5,.0005677438265347055,-.002643890518598651,-.00015305755432799186,9922.75,.0007032172291585632,-.0026119299935024754,-.0001427852424540873,9923,.0008367678828280796,-.002572556813625519,-.00013210628679649803,9923.25,.0009680205917139911,-.0025258825249775104,-.0001210509960339189,9923.5,.0010966049144814968,-.0024720358006155444,-.00010965059462217914,9923.75,.0012221557083572955,-.002411162437412404,-9793718894523731e-20,9924,.001344313711524497,-.0023434253577360987,-8594373154771134e-20,9924.25,.0014627261667496277,-.002269004609455468,-7370398281697656e-20,9924.5,.0015770474883538641,-.002188097357356334,-6125246950716317e-20,9924.75,.001686939973812312,-.0021009178587931125,-48624439528777795e-21,9925,.0017920745604062993,-.0020076974162158883,-3585581246617244e-20,9925.25,.0018921316264658662,-.0019086842991119636,-22983125331168763e-21,9925.5,.001986801835830865,-.0018041436278904564,-10043473114843994e-21,9925.75,.002075787023237625,-.0016943572123258102,29255562392364172e-22,9926,.0021588011174144186,-.0015796233373675205,15885952748347106e-21,9926.25,.0022355710977558234,-.0014602564894238934,2879936142281596e-20,9926.5,.002305837979558053,-.0013365870166400526,41627165567432634e-21,9926.75,.002369357821950444,-.001208960717215294,54330576414973515e-21,9927,.0024259027518693166,-.0010777383504398765,6687072906313452e-20,9927.25,.0024752619967067417,-.000943295065871074,7920878459173992e-20,9927.5,.0025172429176454404,-.0008060197469035354,9130603814152169e-20,9927.75,.002551672035178456,-.0006663142659071947,.00010312403264091873,9928,.0025783960379207366,-.0005245926490924181,.00011462467777497143,9928.25,.002597282765563985,-.0003812801502952971,.0001257703737028866,9928.5,.0026082221567099426,-.00023681223393875266,.00013652413894963493,9928.75,.002611127152349069,-9163346848810631e-20,.00014684974182458904,9929,.0026059345459266336,5380366723462869e-20,.00015671183465764852,9929.25,.0025926057712543295,.00019904006151562814,.00016607609009253172,9929.5,.0025711276199706567,.00034361132670161104,.00017490933863865458,9929.75,.002541512880812626,.00048704923050861613,.00018317970665791329,9930,.00250380089361554,.0006288831958258524,.000190856753950919,9930.25,.002458058011683409,.0007686418625461853,.00019791161010837552,9930.5,.0024043779669437305,.0009058547044800726,.00020431710880644956,9930.75,.0023428821330892307,.0010400536940710268,.00021004791924874276,9931,.0022737196826873416,.0011707750074258704,.00021508067399001062,9931.25,.002197067634978121,.0012975607620938031,.00021939409241586517,9931.5,.002113130791757377,.001419960780059772,.000222969099195768,9931.75,.002022141559331516,.0015375343685391822,.00022578893707091702,9932,.0019243596550180039,.001649852111351059,.00022783927338167773,9932.25,.0018200716970352034,.001756497663869915,.00022910829977763536,9932.5,.0017095906768775735,.0018570695447895724,.00022958682458555185,9932.75,.001593255313400975,.0019511829181330163,.00022926835733316664,9933,.0014714292878662619,.0020384713590857447,.00022814918493928746,9933.25,.001344500359116673,.0021185885972783616,.0002262284390808141,9933.5,.001212879357924388,.002191210231071288,.00022350815423518384,9933.75,.0010769990593647908,.0022560354061761452,.00021999331587231743,9934,.0009373129319009767,.00231278845156589,.00021569189823442936,9934.25,.0007942937617293894,.002361220465069068,.00021061489109691587,9934.5,.0006484321508979871,.0024011108403113436,.0002047763148517021,9934.75,.0005002348878110016,.0024322687257687355,.0001981932231995065,9935,.0003502231890297886,.0024545344056518246,.00019088569268384508,9935.25,.00019893081181619976,.002467780591180693,.0001828767982523831,9935.5,4690203768894999e-20,.0024719136095816287,.0001741925739962482,9935.75,-.00010531047158686352,.002466874476896657,.0001648619582014379,9936,-.00025714794265837453,.0024526398395095916,.0001549167218543203,9936.25,-.0004080478791000333,.0024292227682492173,.00014439137978318286,9936.5,-.0005574465627663956,.0023966733880929378,.00013332308369298583,9936.75,-.0007047816583760554,.0023550793259980627,.00012175149647054818,9937,-.0008494949088462247,.0023045659592714064,.00010971864730060581,9937.25,-.0009910349057746857,.002245296447289213,9726876734683952e-20,9937.5,-.001128859916198484,.002177471530353195,8444810601361053e-20,9937.75,-.0012624407434555197,.0021013290810827988,7130472811200147e-20,9938,-.001391263596765974,.0020171433960453574,5788829260334814e-20,9938.25,-.0015148329411838373,.0019252242183284932,4424981397684161e-20,9938.5,-.0016326742970027147,.001825915485442955,3044140772422963e-20,9938.75,-.0017443369556933855,.001719593801253178,1651602179083344e-20,9939,-.0018493965781539064,.001606666635474614,2527156292675584e-21,9939.25,-.0019474576406000046,.0014875702595198703,-11471425822524947e-21,9939.5,-.0020381556939216825,.0013627674329485927,-25425994145605445e-21,9939.75,-.002121159403850504,.0012327448602776102,-3928314889424628e-20,9940,-.0021961723418354733,.0010980104432540415,-5299011819012892e-20,9940.25,-.002262934500096572,.0009590903586029565,-6649505087058627e-20,9940.5,-.002321223508841225,.0008165259955909721,-7974730115138999e-20,9940.75,-.002370855538914211,.0006708707912245947,-926977015328616e-19,9941,-.002411685879104995,.0005226870034274915,-.00010529882052248624,9941.25,-.002443609183670789,.0003725424639440042,-.00011750520202821104,9941.5,-.0024665593921520197,.000221007352951775,-.00012927358364906295,9941.75,-.002480509330005723,6865103641590857e-20,-.00014056309153976756,9942,-.002485470004712159,-8396099487773385e-20,-.00015133541003596934,9942.25,-.0024814896175983435,-.0002362700488119778,-.00016155492477632727,9942.5,-.0024686523164793054,-.00038772698619011006,-.0001711888386257828,9942.75,-.002447076718193476,-.0005377947787440378,-.0001802072602692081,9943,-.002416914233097872,-.0006859508491589212,-.0001885832658860593,9943.25,-.0023783472255389515,-.0008316891769346622,-.0001962929348164493,9943.5,-.0023315870452316795,-.0009745221595411787,-.00020331536057253215,9943.75,-.002276871964415651,-.0011139822238346933,-.00020963263892543436,9944,-.002214465054653032,-.001249623187921102,-.00021522983509819933,9944.25,-.0021446520353876736,-.0013810213784079637,-.00022009493231930756,9944.5,-.0020677391239393543,-.0015077765121881959,-.00022421876413551242,9944.75,-.0019840509136872814,-.0016295123554636224,-.00022759493295476665,9945,-.0018939283039027294,-.0017458771755942306,-.0002302197172922923,9945.25,-.0017977265011938502,-.0018565440035565903,-.00023209197013617059,9945.5,-.0016958131089472748,-.001961210726322822,-.00023321301074107103,9945.75,-.001588566317609373,-.002059600029374013,-.00023358651201003006,9946,-.00147637320524295,-.0021514592098999656,-.00023321838544454148,9946.25,-.0013596281545985034,-.002236559881081197,-.0002321166654420407,9946.5,-.0012387313900085594,-.0023146975872753816,-.00023029139450569518,9946.75,-.0011140876347858187,-.0023856913490170675,-.00022775451071186873,9947,-.0009861048875012364,-.0024493831555631746,-.00022451973856216933,9947.25,-.00085519331354168,-.002505637421348567,-.000220602484134872,9947.5,-.0007217642466906477,-.002554340421217965,-.00021601973524849844,9947.75,-.0005862292941225722,-.002595399717726039,-.00021078996716116763,9948,-.00044899953713589246,-.002628743592203332,-.00020493305415590705,9948.25,-.00031048481913193186,-.002654320489689387,-.00019847018720335825,9948.5,-.0001710931117618213,-.0026720984862863085,-.00019142379775176336,9948.75,-31229949770712166e-21,-.002682064785990005,-.0001838174875676787,9949,.00010870207515423581,-.0026842252526356174,-.0001756759644397948,9949.25,.0002483037713084381,-.0026786039812516063,-.00016702498346100506,9949.5,.0003871797644091022,-.002665242911857771,-.00015789129351940644,9949.75,.0005249388851609763,-.0026442014875646294,-.000148302588555864,9950,.0006611945363521967,-.002615556357730781,-.00013828746308277318,9950.25,.0007955650486113404,-.002579401125904786,-.00012787537140448917,9950.5,.0009276740336306552,-.0025358461413111516,-.000117096589933363,9950.75,.0010571507432878577,-.00248501833172826,-.00010598218195551958,9951,.001183630442683863,-.002427061074741188,-9456396416657654e-20,9951.25,.0013067548046575052,-.002362134103527225,-8287447426890924e-20,9951.5,.001426172332839071,-.002290413442540314,-7094693889848355e-20,9951.75,.001541538819758575,-.0022120913676984158,-5881524113062284e-20,9952,.0016525178459275204,-.0021273763849414765,-4651388680039392e-20,9952.25,.0017587813251556535,-.002036493220318477,-3407796886518697e-20,9952.5,.0018600101006424508,-.0019396828140821173,-21543129034910476e-21,9952.75,.001955894595584678,-.0018372023106225882,-8945515900000635e-21,9953,.002046135521163461,-.001729325035469707,36782611999067593e-22,9953.25,.0021304446438064227,-.0016163404500429551,1629118330212364e-20,9953.5,.002208545612559695,-.0014985540743482522,2885587864542e-17,9953.75,.002280174846248239,-.0013762873674252392,413346858529527e-19,9954,.0023450824788513506,-.001249877555058912,53689724077387486e-21,9954.25,.0024030333601779883,-.0011196773941060019,6588297064174591e-20,9954.5,.002453808107503056,-.0009860548627725998,7787634662436209e-20,9954.75,.002497204202335151,-.0008493927663382184,8963181073559659e-20,9955,.0025330371249484155,-.0007100882481750826,.00010111146171735124,9955.25,.0025611415177514175,-.0005685521964802975,.00011227764936412421,9955.5,.0025813723670163745,-.0004252085379402955,.00012309309411711927,9955.75,.0025936061909897995,-.00028049341059406215,.00013352101502218927,9956,.002597742220989528,-.0001348542094582811,.00014352526567018925,9956.25,.0025937035608152937,11251499973825009e-21,.00015307047755769965,9956.5,.0025814383086955597,.0001573572034631151,.0001621222101201151,9956.75,.0025609206251287573,.0003029887960818062,.00017064710650292842,9957,.002532151729375292,.0004476660755023461,.00017861305395429892,9957.25,.002495160807079138,.0005909043670827083,.00018598934754900106,9957.5,.0024500058115684035,.0007322162748774652,.00019274685579552398,9957.75,.0023967741418299934,.0008711135502322575,.00019885818654003244,9958,.0023355831809894574,.0010071090671775497,.00020429785146843494,9958.25,.0022665806803533824,.0011397188914965078,.00020904242742566184,9958.5,.0021899449756731778,.0012684644281732956,.00021307071272332116,9958.75,.002105885024236555,.00139287463000153,.0002163638765960576,9959,.0020146402536428487,.0015124882485119224,.00021890559999481813,9959.25,.0019164802156136558,.0016268561071182113,.00022068220597206561,9959.5,.0018117040408606854,.00173554337552372,.00022168277801838229,9959.75,.0017006396937995442,.001838131824004583,.00022189926484890584,9960,.0015836430286908763,.0019342220362017356,.000221326570308232,9960.25,.001461096651504949,.0020234355595027025,.00021996262725686633,9960.5,.0013334085943897938,.0021054169729595473,.00021780845451674154,9960.75,.0012010108119800882,.0021798358539169846,.000214868196178333,9961,.0010643575108732707,.0022463886260794476,.00021114914280268176,9961.25,.0009239233253605474,.002304800273545992,.0002066617342790382,9961.5,.0007802013539090273,.0023548259073239972,.0002014195443172308,9961.75,.0006337010719319238,.00239625217291981,.0001954392467570892,9962,.00048494613705839864,.0024288984897201755,.00018874056406038763,9962.25,.0003344721034424814,.0024526181149524037,.0001813461985102308,9962.5,.00018282406166462945,.0024672990269813864,.0001732817467764327,9962.75,3055422052446674e-20,.002472864624516049,.00016457559861245927,9963,-.00012178055344809103,.0024692742399167306,.00015525882053040553,9963.25,-.0002736212235654083,.002456523466192961,.0001453650253570912,9963.5,-.00042440908316671006,.002434644298448923,.00013493022860971103,9963.75,-.000573588254706952,.0024037050914769336,.00012399269264749276,9964,-.0007206081747942954,.0023638103359243977,.00011259275955989481,9964.25,-.000864926052904755,.002315100256014568,.0001007726737485737,9964.5,-.0010060092920932177,.002257750232199449,8857639515206851e-20,9964.75,-.0011433378604794923,.0021919700524330875,7604940405571234e-20,9965,-.001276406602612259,.0021180029960028482,6323849842674853e-20,9965.25,-.0014047274799942639,.0020361247541101544,5019158472082314e-20,9965.5,-.0015278317301036994,.0019466421916915079,3695746312273274e-20,9965.75,-.0016452719331917945,.0018498919553602783,23585608213183843e-21,9966,-.0017566239760082637,.0017462389328679142,10125946094852574e-21,9966.25,-.0018614889014470387,.0016360745701576025,-3371370935484474e-21,9966.5,-.0019594946329636992,.0015198150529303143,-16856191018443138e-21,9966.75,-.002050297562546117,.0013978993606672259,-30278589446126983e-21,9967,-.0021335839910749366,.0012707872022454081,-435890941637137e-19,9967.25,-.002209071410142736,.0011389568436235083,-56738908690521853e-21,9967.5,-.002276509614857495,.001002902839524809,-6968013102608981e-20,9967.75,-.0023356816378766574,.0008631336825581837,-8236596705230798e-20,9968,-.002386404495928474,.0007201693847444047,-9475093690490523e-20,9968.25,-.0024285297413961793,.0005745390078749214,-.00010679107277300373,9968.5,-.002461943813165746,.00042677816047809164,-.00011844410659685867,9968.75,-.0024865681828513215,.0002774264803058223,-.00012966964617656935,9969,-.002502359294688595,.00012702512214540413,-.00014042933827935295,9969.25,-.0025093082997713874,-2388572867660856e-20,-.0001506870174420944,9969.5,-.002507440587843722,-.00017476929653558541,-.00016040883930825588,9969.75,-.002496815122477097,-.0003250945891397732,-.00016956339751195365,9970,-.002477523588081061,-.00047433868482812003,-.00017812182332365158,9970.25,-.002449689359732187,-.0006219889148709301,-.00018605786749656666,9970.5,-.0024134663091807834,-.0007675449235781329,-.00019334796399450858,9970.75,-.0023690374625292515,-.0009105205908656922,-.00019997127553362813,9971,-.0023166135269024573,-.0010504458041052064,-.00020590972112510404,9971.25,-.002256431304892114,-.0011868680685233825,-.00021114798605564945,9971.5,-.0021887520166131813,-.0013193539480530368,-.0002156735149805546,9971.75,-.0021138595498366897,-.0014474903312855503,-.00021947648902305593,9972,-.0020320586588451163,-.0015708855199669557,-.00022254978796870382,9972.25,-.0019436731324144897,-.0016891701402156013,-.00022488893880872823,9972.5,-.0018490439506686183,-.0018019978792685163,-.00022649205201932915,9972.75,-.001748527449530363,-.0019090460530019526,-.0002273597470621522,9973,-.0016424935101432337,-.0020100160116745458,-.00022749506865388916,9973.25,-.001531323789022514,-.00210463339326117,-.00022690339538097607,9973.5,-.0014154100028721621,-.0021926482353537397,-.00022559234223021345,9973.75,-.001295152280034839,-.0022738349578846372,-.00022357165857042212,9974,-.0011709575884892164,-.0023479922298743254,-.0002208531230574748,9974.25,-.0010432382482281682,-.002414942734023934,-.000217450436849109,9974.5,-.0009124105337947654,-.0024745328432824267,-.00021337911641099443,9974.75,-.0007788933707651449,-.002526632223540186,-.00020865638707592629,9975,-.0006431071280855261,-.002571133376366161,-.0002033010783879703,9975.25,-.0005054725064241844,-.0026079511352474077,-.00019733352212683976,9975.5,-.0003664095211078906,-.0026370221281432713,-.00019077545376828872,9975.75,-.00022633657678845505,-.0026583042183667307,-.00018364991799695062,9976,-8566962974110172e-20,-.0026717759348865245,-.0001759811787517631,9976.25,551785673790239e-19,-.0026774359021379335,-.00016779463415243564,9976.5,.0001957991443941371,-.0026753022783651227,-.00015911673653058728,9976.75,.00033578772288721535,-.0026654122104194356,-.00014997491767179786,9977,.0004747449633109692,-.0026478213118258055,-.00014039751926589943,9977.25,.000612277057772502,-.002622603169820632,-.00013041372846245747,9977.5,.0007479961766705701,-.002589848885971191,-.00012005351833667725,9977.75,.0008815208775796674,-.0025496666539175233,-.0001093475929875296,9978,.0010124764848966404,-.0025021813767380436,-9832733691434734e-20,9978.25,.0011404954488034543,-.002447534325431716,-8702476824980946e-20,9978.5,.001265217692064593,-.002385882839032236,-7547249536552689e-20,9978.75,.0013862909530779905,-.0023174000659205367,-6370367631064129e-20,9979,.0015033711334406193,-.00224227474497716,-51751980493359104e-21,9979.25,.0016161226580777572,-.0021607110243104825,-3965155196959797e-20,9979.5,.0017242188557194003,-.0020729283144050206,-27436973661517886e-21,9979.75,.001827342367186777,-.0019791611716506747,-1514323179146149e-20,9980,.0019251855885732267,-.0018796592073344325,-2805679783560425e-21,9980.25,.002017451155958674,-.0017746870162961886,9539999143686208e-21,9980.5,.0021038524777779485,-.0016645241185714518,2185783149472085e-20,9980.75,.002184114320359417,-.0015494649064604201,3411159594397625e-20,9981,.0022579734514479,-.0014298185885872788,4626486954472629e-20,9981.25,.0023251793457125104,-.0013059091216451539,5828107853651532e-20,9981.5,.002385494955300711,-.0011780751196761828,7012355458324094e-20,9981.75,.002438697547420491,-.0010466697299277782,8175559725804026e-20,9982,.0024845796097005164,-.0009120604635752066,9314054356192104e-20,9982.25,.002522949822682544,-.0007746289689328614,.00010424184521831132,9982.5,.0025536340972341417,-.0006347707342231366,.00011502315442294721,9982.75,.0025764766729305787,-.0004928947065682627,.00012544841864539722,9983,.002591341271546907,-.0003494228136569082,.0001354819849727666,9983.25,.0025981122977368366,-.00020478937455715003,.00014508871435575896,9983.5,.0025966960767758503,-5944038644722384e-20,.00015423410596069795,9983.75,.0025870221169444875,861673253375182e-19,.00016288443164738203,9984,.0025690443817691145,.0002315671055502313,.00017100688038214815,9984.25,.0025427425549805318,.000376283625767302,.00017856971215852454,9984.5,.0025081232787585346,.0005198342079722,.0001855424207380079,9984.75,.00246522134370272,.000661730321025947,.0001918959042431312,9985,.0024141008070741213,.0008014792533008366,.00019760264234134045,9985.25,.002354856014312236,.0009385859615238435,.0002026368784570481,9985.5,.0022876124977394374,.0010725550922382387,.00020697480515020615,9985.75,.0022125277258236175,.0012028931683038266,.0002105947505130107,9986,.00212979167647716,.0013291109286020005,.00021347736317328051,9986.25,.002039627208706747,.0014507258047056527,.00021560579326595987,9986.5,.0019422902085528342,.001567264513853683,.00021696586655547045,9986.75,.0018380694877011136,.0016782657432911365,.00021754624877311687,9987,.0017272864164095956,.001783282897066213,.00021733859718597393,9987.25,.0016102942764342088,.001881886872887303,.00021633769644509,9987.5,.0014874773243695055,.001973668833809277,.00021454157587719904,9987.75,.0013592495611236056,.0020582429374954667,.00021195160558750052,9988,.0012260532089785983,.002135248984696319,.00020857256902950962,9988.25,.0010883569036188266,.0022043549485275724,.0002044127100653727,9988.5,.0009466536144902703,.002265259347136788,.00019948375297802084,9988.75,.0008014583125821831,.0023176934244209858,.00019380089438658275,9989,.0006533054100663218,.002361423106571959,.00018738276654850603,9989.25,.0005027460009113292,.0023962507062461487,.00018025137208009943,9989.5,.0003503449354732338,.0024220163509536866,.00017243199067492625,9989.75,.00019667776500287542,.0024385991176503934,.0001639530589258121,9990,4232759391110335e-20,.0024459178612841375,.00015484602484167043,9990.25,-.00011211812154544725,.0024439317309704212,.00014514517907835027,9990.5,-.0002660707897372377,.002432640373329993,.00013488746526013208,9990.75,-.00041894387811758496,.0024120838281044272,.00012411227204584533,9991,-.0005701560506310336,.002382342126287135,.0001128612097854066,9991.25,-.0007191342159518138,.0023435346055141206,.00010117787471777458,9991.5,-.0008653164579311657,.002295818961241716,8910760368351534e-20,9991.75,-.001008154823545782,.0022393900552329527,7669722227154668e-20,9992,-.0011471179478186096,.0021744785050257843,6399478919591902e-20,9992.25,-.001281693499395185,.002101349079427514,51049339523130326e-21,9992.5,-.001411390434613753,.0020202989256570113,3791062914825137e-20,9992.75,-.0015357410518261102,.0019316556536706452,24628882668507396e-21,9993,-.0016543028413220251,.0018357753025111142,11254546534657548e-21,9993.25,-.0017666601293999371,.0017330402123490306,-2161950912530009e-21,9993.5,-.0018724255178608356,.0016238568243460215,-1557043118170594e-20,9993.75,-.001971241122457616,.0015086534286718348,-2892118806195201e-20,9994,-.002062779615610585,.0013878778790661697,-42165199895327294e-21,9994.25,-.0021467450800230123,.0012619952903458586,-5525433104994537e-20,9994.5,-.002222873680736889,.0011314857333029026,-6814152213349258e-20,9994.75,-.0022909341637086062,.0009968419395876863,-8078096863868659e-20,9995,-.002350728189215627,.0008585670274778524,-9312828783467163e-20,9995.25,-.0024020905083910705,.0007171722579337768,-.00010514067381333525,9995.5,-.002444888990986161,.0005731748290561495,-.0001167770406696875,9995.75,-.0024790245121410343,.0004270957159955595,-.00012799815384414515,9996,-.0025044307055619923,.00027945756252515394,-.00013876674968509538,9996.25,-.0025210735901026863,.0001307826298382854,-.00014904764330761448,9996.5,-.002528951076375854,-1840919232389494e-20,-.0001588078248315134,9996.75,-.0025280923597119464,-.00016760230742584055,-.00016801654408411416,9997,-.0025185572055569454,-.0003162872621762095,-.0001766453838531004,9997.25,-.002500435133281087,-.0004639625203710376,-.00018466832177629024,9997.5,-.002473844504359729,-.0006101361561301027,-.00019206178096069272,9997.75,-.002438931520987074,-.0007543274621737828,-.0001988046694349242,9998,-.0023958691413850024,-.000896068468868421,-.0002048784085585269,9998.25,-.002344855918358703,-.0010349053698989923,-.00021026695053980024,9998.5,-.0022861147680086733,-.0011703998506317538,-.00021495678525064945,9998.75,-.002219891675911671,-.001302130315524215,-.00021893693657228552,9999,-.002146454348505536,-.0014296930113367986,-.0002221989485584958,9999.25,-.0020660908178273003,-.0015527030434053474,-.00022473686176222566,9999.5,-.001979108008133669,-.001670795282844625,-.00022654718013459714,9999.75,-.0018858302732521373,-.0017836251632625919,-.00022762882897109558,1e4,-.0017865979137471942,-.0018908693663648828,-.00022798310444555698,10000.25,-.0016817656831188549,-.0019922263966948416,-.00022761361533596514,10000.5,-.0015717012922658077,-.0020874170466750742,-.00022652621760529235,10000.75,-.001456783921331984,-.002176184754060298,-.0002247289425530554,10001,-.001337402747807777,-.002258295854861513,-.00022223191929746092,10001.25,-.001213955499375686,-.0023335397357284638,-.0002190472923821702,10001.5,-.0010868470394790907,-.002401728890659904,-.0002151891353247611,10001.75,-.0009564879929613178,-.002462698887727099,-.00021067336093507388,10002,-.0008232934183830306,-.002516308252225669,-.0002055176292304303,10002.25,-.0006876815327951329,-.002562438273298203,-.00019974125376116868,10002.5,-.0005500724938400567,-.0026009927415829373,-.000193365107134488,10002.75,-.0004108872430959387,-.002631897625833388,-.0001864115264878926,10003,-.00027054641358591056,-.002655100696715416,-.0001789042196165962,10003.25,-.00012946930336831794,-.002670571106120671,-.0001708681724032492,10003.5,11927083878147847e-21,-.0026782989303414367,-.0001623295581346733,10003.75,.0001532289313405791,-.0026782946853372955,-.00015331564922039736,10004,.0002940264356381382,-.0026705888220943164,-.0001438547317529823,10004.25,.00043391456937091097,-.0026552312097466247,-.00013397602327213347,10004.5,.00057249378238647,-.002632290613704062,-.00012370959401443118,10004.75,.0007093706452644958,-.002601854175524363,-.0001130862918496979,10005,.0008441584392113813,-.002564026900692145,-.00010213767102443124,10005.25,.0009764776971720387,-.00251893115983366,-9089592475343529e-20,10005.5,.001105956701503819,-.0024667062082151547,-7939382162341673e-20,10005.75,.001232231944018053,-.0024075077276535387,-6766464569753372e-20,10006,.001354948554580022,-.0023415073942189813,-5574214013803118e-20,10006.25,.00147376070477077,-.002268892474336619,-4366045409547419e-20,10006.5,.0015883319933569502,-.002189865451103567,-3145409254781896e-20,10006.75,.0016983358204910467,-.0021046436818312965,-19157868710647948e-21,10007,.0018034557576761287,-.002013459087003945,-6806858581362844e-21,10007.25,.0019033859205788665,-.001916557870010847,55636428751451825e-22,10007.5,.0019978313517621683,-.0018142002661656338,179181644438609e-19,10007.75,.002086508420333807,-.001706660318663049,30221100873406454e-21,10008,.00216914524536714,-.001594225678247178,4243675522508431e-20,10008.25,.0022454821497403777,-.0014771974224666925,5452938203826666e-20,10008.5,.0023152721507528414,-.0013558898894762137,6646323203131825e-20,10008.75,.002378281493506469,-.0012306305204018537,7820259909136963e-20,10009,.0024342902325696974,-.0011017597033305543,8971187033478747e-20,10009.25,.002483092866862332,-.0009696306110047829,.00010095558004275131,10009.5,.0025244990319947956,-.0008346090233152624,.00011189846829118639,10009.75,.0025583342534467876,-.0006970731246940536,.00012250554509973116,10010,.0025844407629612314,-.0005574132655323782,.000132742160918436,10010.25,.002602678379340864,-.0004160316758016622,.00014257408425107372,10010.5,.002612925453448706,-.0002733421181681922,.0001519675871775113,10010.75,.0026150798756143473,-.00012976946709385785,.00016088953948153984,10011,.0026090601418231117,1425080025301788e-20,.00016930751201167993,10011.25,.002594806473008277,.00015827321594511192,.00017718988979747237,10011.5,.00257228197947773,.0003018430510320273,.00018450599530932637,10011.75,.0025414738599960005,.0004444971779650281,.00019122622208305002,10012,.0025023946223384536,.0005857650802290113,.0001973221787288679,10012.25,.00245508330926531,.000725170022881807,.0002027668431057859,10012.5,.0023996067109027294,.0008622303964147193,.00020753472616848965,10012.75,.0023360605415180097,.0009964612444627445,.0002116020446809259,10013,.0022645705557621746,.0011273759834409943,.0002149469016486112,10013.25,.0021852935767188077,.00125448831904537,.00021754947294931875,10013.5,.002098418405695025,.0013773143607534043,.00021939219825049502,10013.75,.0020041665817699954,.0014953749309982126,.0002204599739017064,10014,.001902792957842374,.0016081980606019455,.00022074034509463492,10014.25,.0017945860594598471,.0017153216564308352,.0002202236942080859,10014.5,.0016798681932343794,.0018162963212038656,.00021890342191991367,10014.75,.0015589952732884642,.0019106882991276723,.00021677611739191627,10015,.0014323563370509786,.0019980825147600245,.0002138417136382724,10015.25,.0013003727258911106,.0020780856664817985,.0002101036240931088,10015.5,.001163496911552177,.002150329330479709,.00020556885641697482,10015.75,.0010222109560582208,.0022144730265230496,.0002002480997402768,10016,.0008770246005725028,.002270207193311165,.00019415578184029623,10016.25,.0007284729873517906,.0023172560191409212,.00018731009319417728,10016.5,.0005771140282363674,.0023553800732249944,.000179732975436295,10016.75,.0004235254425250239,.002384378684420587,.00017145007245520014,10017,.00026830149642860957,.002404092017432049,.00016249064318291833,10017.25,.00011204948493911626,.002414402801722291,.0001528874360154432,10017.5,-4461399540949659e-20,.002415237675259724,.0001426765257288959,10017.75,-.00020106692817652358,.002406568113603987,.0001318971146802564,10018,-.00035668585383175614,.0023884109243600153,.00012059130096260209,10018.25,-.0005108498799930683,.002360828297297965,.00010880381698281733,10018.5,-.0006629446628391593,.0023239274109941956,9658174260988978e-20,10018.75,-.000812366299033898,.0022778596072302246,8397419757550307e-20,10019,-.0009585250710384609,.0022228191541427784,7103201817515141e-20,10019.25,-.0011008489939713475,.002159041627845237,5780742350672219e-20,10019.5,-.0012387871188843393,.0020868019496111854,4435367649537038e-20,10019.75,-.0013718125550725463,.0020064121214936658,3072474479947482e-20,10020,-.0014994251825442314,.0019182187072911893,16974966381512116e-21,10020.25,-.0016211540344322863,.0018226001080679508,31587241001519934e-22,10020.5,-.0017365593377769676,.0017199636819894832,-10669866854100458e-21,10020.75,-.0018452342092568194,.0016107427572692873,-24457255451719124e-21,10021,-.0019468060098814237,.0014953935846481652,-38150732651519455e-21,10021.25,-.0020409373691628835,.001374392272371227,-5169868860790178e-20,10021.5,-.002127326894715088,.00124823174231624,-650508479246452e-19,10021.75,-.0022057095875228205,.001117418741041738,-7815848220367385e-20,10022,-.0022758569862736965,.0009824709343305915,-9097459966285209e-20,10022.25,-.0023375770662031913,.000843914108538208,-.00010345411205520756,10022.5,-.0023907139189559903,.0007022794969142219,-.0001155539795066569,10022.75,-.0024351472401345606,.0005581012442159027,-.00012723333419808718,10023,-.0024707916506259506,.0004119140184962338,-.00013845358405186698,10023.25,-.0024975958766159105,.000264250775015228,-.0001491784977468537,10023.5,-.0025155418115578075,.00011564067383328853,-.00015937427248636997,10023.75,-.0025246434813958,-33392850186714014e-21,-.0001690095859884249,10024,-.0025249459321837354,-.0001823338684884287,-.00017805563416387657,10024.25,-.002516524056978721,-.00033067559631658677,-.00018648615590766113,10024.5,-.002499481376638144,-.00047792189310276846,-.00019427744635636932,10024.75,-.0024739487869642027,-.0006235886330635654,-.0002014083598724514,10025,-.002440083282591244,-.0007672049537590645,-.00020786030390744582,10025.25,-.0023980666661332297,-.0009083143904708437,-.00021361722478064737,10025.5,-.0023481042494322563,-.0010464759041096526,-.00021866558629096846,10025.75,-.0022904235522898378,-.001181264810011586,-.00022299434196297168,10026,-.0022252730028262243,-.0013122736144814576,-.00022659490161682693,10026.25,-.002152920642597029,-.0014391127653415993,-.00022946109284908075,10026.5,-.0020736528387918806,-.0015614113220862992,-.00023158911791864228,10026.75,-.0019877730052325453,-.00167881755056391,-.00023297750645167385,10027,-.001895600333459699,-.0017909994464421427,-.0002336270643108235,10027.25,-.0017974685349274615,-.0018976451910831648,-.0002335408189187278,10027.5,-.0016937245951907378,-.0019984635428842916,-.00023272396128267466,10027.75,-.0015847275409492717,-.0020931841666424504,-.00023118378493619543,10028,-.0014708472208784414,-.002181557903089454,-.00022892962199323806,10028.25,-.0013524631013107802,-.002263356980422488,-.00022597277650031547,10028.5,-.0012299630780079835,-.0023383751694277446,-.00022232645527035753,10028.75,-.0011037423054618713,-.0024064278836597275,-.00021800569638736304,10029,-.0009742020453652173,-.002467352226092834,-.00021302729558197181,10029.25,-.0008417485360814464,-.002521006983697268,-.00020740973069308628,10029.5,-.0007067918851017825,-.00256727257149954,-.00020117308444812473,10029.75,-.0005697449865968687,-.002606050927857917,-.00019433896581299242,10030,-.00043102246623723657,-.0026372653629027558,-.00018693043018088294,10030.25,-.0002910396554660768,-.002660860362347856,-.00017897189868534795,10030.5,-.00015021159735389048,-.002676801349157966,-.00017048907693658076,10030.75,-8952086045700475e-21,-.0026850744058461743,-.0001615088734895114,10031,.0001323272583722712,-.002685685960459676,-.00015205931835739225,10031.25,.0002732178780058152,-.0026786624395810283,-.00014216948188439064,10031.5,.0004133151270095118,-.0026640498919131865,-.00013186939428496775,10031.75,.0005522190822471202,-.0026419135862203245,-.00012118996614625566,10032,.0006895353142375395,-.0026123375875536023,-.00011016291017214025,10032.25,.0008248756183061107,-.002575424315795657,-9882066442462521e-20,10032.5,.0009578587063278033,-.00253129409060291,-871963172892747e-19,10032.75,.001088110859933496,-.002480084666808358,-7532353435781076e-20,10033,.0012152665465456748,-.0024219507642659122,-6323648738243927e-20,10033.25,.0013389690001052604,-.002357063595970378,-5096978541398557e-20,10033.5,.001458870768838998,-.002285610398074871,-3855840818990064e-20,10033.75,.0015746342328889565,-.002207793965150994,-2603764178929187e-20,10034,.0016859320950747565,-.0021238321936986283,-13443016520966952e-21,10034.25,.0017924478484787213,-.002033957636514267,-8102469576477883e-22,10034.5,.001893876224928344,-.001938417070072279,11824826024400875e-21,10034.75,.0019899236287940223,-.0018374710765652546,24426291395545676e-21,10035,.002080308560818048,-.0017313936416907057,36958222562475307e-21,10035.25,.002164762036938927,-.0016204717686645117,49384730701155846e-21,10035.5,.002243028007268697,-.0015050051082889987,6167001718993734e-20,10035.75,.0023148637805157275,-.0013853056042075357,7377842555150092e-20,10036,.002380040459215614,-.0012616971517402428,856744933622522e-19,10036.25,.0024383433911345093,-.0011345152679176384,9732300463548284e-20,10036.5,.002489572642132147,-.0010041067695137937,.00010868904322924739,10036.75,.002533543495614232,-.0008708294550282627,.00011973804787127267,10037,.002570086983448821,-.0007350517856808567,.0001304358694299054,10037.25,.0025990504528648956,-.0005971525595677114,.0001407488310917057,10037.5,.0026202981733774618,-.00045752057218687064,.0001506437921313127,10037.75,.002633711987178655,-.0003165542555842014,.00016008821597628903,10038,.0026391920056835737,-.000174661287406211,.00016905024327710803,10038.25,.002636657354005886,-3225816018923314e-20,.000177498770688274,10038.5,.002626046964044146,.00011023029971679985,.00018540353604841329,10038.75,.002607320415567607,.0002523714750732381,.00019273521061236555,10039,.0025804588231841796,.00039372557481102006,.00019946549893392,10039.25,.002545465765339095,.0005338463381917704,.00020556724692066412,10039.5,.002502368249520454,.0006722818395640133,.00021101455847900602,10039.75,.0024512177056326603,.0008085754075153652,.00021578292103428497,10040,.0023920909970512176,.0009422666722579823,.00021984934004519585,10040.25,.002325091436192825,.0010728927547735043,.0002231924824289604,10040.5,.0022503497885887776,.0011999896105345182,.0002257928285752137,10040.75,.002168025246424592,.0013230935393940657,.00022763283234435692,10041,.0020783063494520405,.001441742871474616,.0002286970881291905,10041.25,.0019814118281122296,.0015554798364704053,.0002289725037009266,10041.5,.0018775913407847104,.0016638526206690615,.00022844847717081024,10041.75,.0017671260744328706,.0017664176121543061,.00022711707598304753,10042,.001650329175710374,.001862741830050265,.0002249732154232594,10042.25,.0015275459780140876,.0019524055283279952,.00022201483369323785,10042.5,.0013991539892175477,.002035004958679541,.00021824306018506355,10042.75,.0012655626050988012,.002110155270387263,.00021366237320648323,10043,.0011272125149799023,.002177493518144533,.00020828074308832032,10043.25,.0009845747689913966,.0022366817416463796,.00020210975636906277,10043.5,.0008381494807966288,.002287410073759099,.00019516471662866128,10043.75,.0006884641456277941,.002329399827545194,.0001874647175590246,10044,.0005360715610549365,.0023624065067007777,.00017903268403024282,10044.25,.00038154734695017127,.002386222679549726,.00016989537726365232,10044.5,.00022548707144166022,.0024006806538670483,.000160083360757423,10044.75,685030007761704e-19,.0024056548890457005,.00014963092432794268,10045,-8877949722154951e-20,.0024010640835026393,.0001385759645224335,10045.25,-.00024572585478154966,.0023868728791374633,.00012695982069475432,10045.5,-.0004016964585519012,.0023630931310364015,.0001148270671834556,10045.75,-.0005560509944673417,.002329784699373956,.00010222526324174132,10046,-.0007081529128172118,.0022870557313543847,8920466358694416e-20,10046.25,-.0008573739374044259,.0022350624136327304,7581789360267299e-20,10046.5,-.0010030985395411923,.002174008189407412,6211959428037222e-20,10046.75,-.001144728297372887,.002104142448642836,4816604287350554e-20,10047,-.0012816860637315723,.0020257587139752807,3401475591015756e-20,10047.25,-.0014134198712829108,.0019391923580899721,1972408163436861e-20,10047.5,-.0015394065118260825,.0018448179000832155,5352789105321977e-21,10047.75,-.0016591547367585354,.0017430459380019779,-9040338923459818e-21,10048,-.0017722080375457746,.001634319782065667,-23396902588788124e-21,10048.25,-.0018781469775901096,.0015191118576609595,-3765926479204052e-20,10048.5,-.001976591059884607,.001397919949101747,-5177090896403868e-20,10048.75,-.00206720012739138,.001271263354478823,-6567677022331945e-20,10049,-.0021496753047922394,.00113967901880715,-7932353642345887e-20,10049.25,-.0022237595006316772,.0010037177076162936,-9265991660478896e-20,10049.5,-.0022892374976035794,.0008639402764621015,-.0001056368753707332,10049.75,-.002345935665626503,.0007209140840444242,-.00011820783265638388,10050,-.002393721337338635,.0005752095881736862,-.00013032882921301038,10050.25,-.002432501888763498,.00042739715516923243,-.00014195865887355188,10050.5,-.0024622235692803593,.0002780441047714574,-.0001530589692766817,10050.75,-.0024828701248745706,.00012771200462276247,-.00016359433320500732,10051,-.0024944612571823994,-23045778935463064e-21,-.00017353229303786842,10051.25,-.002497050958344615,-.00017368627342365632,-.0001828433810388134,10051.5,-.0024907257584053425,-.0003236788412685695,-.00019150111830515507,10051.75,-.002475602918183757,-.00047250687891982606,-.00019948199521764752,10052,-.002451828596443335,-.000619669287033342,-.00020676543615452686,10052.25,-.0024195760159630023,-.0007646817272807414,-.00021333375110103525,10052.5,-.0023790436489608095,-.0009070776829762765,-.00021917207660025563,10052.75,-.0023304534383361527,-.0010464093416458883,-.00022426830827482875,10053,-.002274049067495319,-.0011822483179359754,-.00022861302691210074,10053.25,-.0022100942881556605,-.001314186235012948,-.00023219941985935927,10053.5,-.0021388713125311725,-.001441835181936808,-.00023502319923012396,10053.75,-.0020606792737020542,-.0015648280635037416,-.00023708251818416485,10054,-.001975832755761753,-.0016828188578341817,-.0002383778863184301,10054.25,-.0018846603935042,-.0017954827956114421,-.00023891208499721449,10054.5,-.0017875035399396607,-.0019025164734179664,-.00023869008326022237,10054.75,-.0016847149987815858,-.002003637912126498,-.00023771895477809287,10055,-.0015766578181969197,-.002098586569826589,-.0002360077961769513,10055.25,-.0014637041415247532,-.002187123317338025,-.00023356764692648713,10055.5,-.001346234110310645,-.002269030383007905,-.00023041141087927358,10055.75,-.0012246348148447377,-.00234411127222638,-.00022655377946154037,10056,-.0010992992873933654,-.0024121906659451816,-.00022201115644589613,10056.25,-.0009706255334597801,-.0024731143014441255,-.0002168015841835166,10056.5,-.0008390155966594918,-.0025267488376771647,-.00021094467113506638,10056.75,-.0007048746531353672,-.002572981706736456,-.00020446152051493833,10057,-.0005686101318396739,-.0026117209523028903,-.0001973746598504264,10057.25,-.0004306308574567285,-.002642895055400077,-.0001897079712547911,10057.5,-.0002913462132122296,-.002666452747331859,-.00018148662221927048,10057.75,-.00015116532129781177,-.0026823628093547943,-.00017273699674243769,10058,-10496239117516946e-21,-.002690613858409666,-.00016348662663455331,10058.25,.00013025482997581236,-.002691214118101918,-.0001537641228582843,10058.5,.0002706843123528582,-.0026841911740710994,-.00014359910679411804,10058.75,.00041039202669160643,-.002669591712914467,-.00013302214134769012,10059,.0005489819336248486,-.002647481243919741,-.00012206466184597955,10059.25,.0006860628723051833,-.0026179438030061682,-.00011075890669873124,10059.5,.0008212492834998192,-.0025810816384606366,-9913784782959181e-20,10059.75,.000954161918646633,-.0025370148782755874,-8723512090734626e-20,10060,.001084428534184529,-.002485881179136802,-7508495543050628e-20,10060.25,.001211684570416174,-.0024278353573607132,-627221047375984e-19,10060.5,.001335573814168484,-.002363049002332135,-5018177603026281e-20,10060.75,.0014557490445835845,-.0022917100732335097,-3749956050618186e-20,10061,.001571872661497128,-.0022140224800765874,-2471136370360605e-20,10061.25,.0016836172960367022,-.0021302056502374446,-11853336158552798e-21,10061.5,.0017906664032949636,-.0020404940818477472,10381955304216326e-22,10061.75,.0018927148371932557,-.001945136885501974,13926797146652696e-21,10062,.001989469407944163,-.001844397315795507,26775994742791458e-21,10062.25,.002080649422837445,-.0017385522942068683,39549341927103924e-21,10062.5,.0021659872114043175,-.001627891924774912,5221048653135431e-20,10062.75,.0022452286363508762,-.0015127190038953591,647232366740737e-19,10063,.0023181335919833152,-.0013933485253687548,7705162626784092e-20,10063.25,.002384476492165708,-.0012701071815729014,8915998005716489e-20,10063.5,.002444046750146089,-.0011433328613070113,.0001010129783139614,10063.75,.0024966492528485994,-.0010133741444633864,.00011257572135974547,10064,.002542104832448702,-.0008805897932268637,.00012381379412671262,10064.25,.0025802507382159455,-.0007453482389857412,.00013469333101305607,10064.5,.002610941111712754,-.00060802706356325,.00014518108133014965,10064.75,.002634047468471686,-.0004690124727508261,.00015524447567987878,10065,.0026494591892227224,-.00032869875944811024,.00016485169363809343,10065.25,.0026570840235999337,-.00018748775299649585,.0001739717331540219,10065.5,.002656848609010175,-4578825054049049e-20,.000182574482104165,10065.75,.0026486990069840267,959845745267131e-19,.0001906307924613297,10066,.0026326012588395974,.00023740979276919342,.00019811255755359646,10066.25,.0026085419618605853,.00037806137409465517,.0002049927928924629,10066.5,.0025765288664086985,.0005175088856280564,.00021124572104230346,10066.75,.0025365914934449185,.0006553182401227538,.00021684686098260797,10067,.002488781770812778,.0007910525036447127,.00022177312237795484,10067.25,.0024331746853299236,.0009242727718646019,.00022600290511597246,10067.5,.002369868946233726,.0010545391247728637,.00022951620439805843,10067.75,.002298987653828093,.001181411669955505,.00023229472156868986,10068,.0022206789652872033,.0013044516846895437,.0002343219807444744,10068.25,.002135116747483585,.0014232228669853958,.0002355834511502576,10068.5,.0020425012044692583,.0015372927052686447,.0002360666748867571,10068.75,.001943059464826383,.00164623397558663,.0002357613996365764,10069,.0018370461116300194,.0017496263739981309,.00023465971556790497,10069.25,.0017247436352277928,.0018470582900832688,.00023275619541311015,10069.5,.0016064627865512936,.00193812872524362,.00023004803638740576,10069.75,.0014825428063256465,.002022449356599668,.0002265352022743431,10070,.0013533515034522621,.0020996467437968663,.00022222056364584836,10070.25,.0012192851541476307,.0021693646718873895,.0002171100338138787,10070.5,.0010807681922897336,.0022312666186751146,.00021121269774062622,10070.75,.0009382526610270323,.0022850383295451994,.00020454093077964874,10071,.0007922173962215748,.002330390476937862,.00019711050379936634,10071.25,.0006431669139034815,.002367061375409125,.00018894067097391718,10071.5,.0004916299767748674,.002394819716846088,.00018005423633796642,10071.75,.00033815781905210815,.002413467284125868,.00017047759511670704,10072,.0001833220146234137,.002422841595606296,.00016024074588036468,10072.25,27711980686759094e-21,.0024228184277258805,.00014937726976357307,10072.5,-.00012806788237772318,.0024133141588856756,.0001379242733402386,10072.75,-.0002834014043684041,.0023942878753570175,.0001259222922800009,10073,-.00043766419053067174,.0023657431791838423,.0001134151536195166,10073.25,-.0005902274660938607,.0023277296395800328,.00010044979536593946,10073.5,-.0007404621760262696,.0022803438331950037,8707604318351425e-20,10073.75,-.0008877432850111255,.0022237299249696974,7334634506621638e-20,10074,-.0010314542127764904,.0021580797501159744,59315466126118115e-21,10074.25,-.0011709913317231855,.002083632368815529,4504014687373335e-20,10074.5,-.0013057684478405942,.0020006730781720362,3057872957119396e-20,10074.75,-.0014352211826428496,.0019095318802422774,1599075833781381e-20,10075,-.0015588111736265764,.0018105814199834533,1336559618680606e-21,10075.25,-.001676030013700958,.0017042344219606658,-13323189664567559e-21,10075.5,-.0017864028561104996,.0015909406688746526,-27927898519322705e-21,10075.75,-.00188949162028632,.001471183577638939,-4241749493330919e-20,10076,-.0019848977454968593,.001345476439381421,-5673284781118931e-20,10076.25,-.002072264452329617,.0012143583975667016,-7081617047898524e-20,10076.5,-.0021512784864820573,.0010783902433677119,-846113991476778e-19,10076.75,-.0022216713340761822,.000938150109243595,-9806454064564986e-20,10077,-.0022832199122179526,.0007942291403516742,-.00011112398482429797,10077.25,-.0023357467519741246,.0006472272193604033,-.00012374077822861212,10077.5,-.0023791197028518556,.0004977488137203308,-.0001358688568537161,10077.75,-.002413251197801122,.0003463990060122112,-.00014746523701688718,10078,-.0024380971254422293,.00019377975820733244,-.00015849016450776557,10078.25,-.002453655361545282,40486450119956124e-21,-.00016890722319493417,10078.5,-.002459964014793459,-.00011289527844985478,-.0001786834051342634,10078.75,-.0024570994427027394,-.00026579236290138363,-.0001877891449242837,10079,-.0024451740924943213,-.0004176468172013168,-.0001961983215783131,10079.25,-.0024243342190346817,-.0005679179051304393,-.00020388823153473021,10079.5,-.002394757528024198,-.0007160839867564533,-.0002108395366184456,10079.75,-.0023566507877802096,-.0008616440538476803,-.0002170361908170528,10080,-.002310247447515934,-.0010041189728685158,-.00022246534965516472,10080.25,-.002255805294340104,-.0011430524579514548,-.00022711726578278975,10080.5,-.002193604175467249,-.0012780117986555795,-.00023098517414028315,10080.75,-.002123943806589702,-.0014085883687227235,-.00023406516976099743,10081,-.002047141682168126,-.0015343979424677235,-.0002363560809359047,10081.25,-.0019635310986477372,-.0016550808450969264,-.00023785934011192307,10081.5,-.0018734592973803968,-.0017703019622796144,-.00023857885454139793,10081.75,-.001777285730360221,-.0018797506328517303,-.0002385208783556475,10082,-.0016753804487656537,-.0019831404467466163,-.00023769388740922873,10082.25,-.0015681226117272625,-.0020802089682406297,-.0002361084579395699,10082.5,-.001455899110675913,-.0021707174024714906,-.0002337771498126683,10082.75,-.0013391033030270359,-.00225445022101578,-.0002307143948816151,10083,-.0012181338477741121,-.002331214760163955,-.00022693639077126703,10083.25,-.0010933936347463568,-.0024008408034558613,-.00022246100021885843,10083.5,-.0009652887987828908,-.002463180158070922,-.00021730765594532974,10083.75,-.0008342278098418616,-.0025181062328280034,-.0002114972709038423,10084,-.000700620630042112,-.002565513623864263,-.00020505215364785483,10084.25,-.0005648779288075374,-.0026053177125204426,-.00019799592847933974,10084.5,-.0004274103475916209,-.0026374542785833083,-.00019035345997540167,10084.75,-.0002886278060882035,-.002661879130807466,-.00018215078144674047,10085,-.00014893884234822228,-.0026785677555620263,-.00017341502685179678,10085.25,-8749979802503626e-21,-.00268751498351209,-.00016417436567406243,10085.5,.00013153488518252213,-.0026887346734443696,-.00015445794026515915,10085.75,.00027151508093177555,-.002682259411671936,-.00014429580516124693,10086,.0004107937483116227,-.0026681402248968393,-.00013371886789372332,10086.25,.0005489784231621209,-.0026464463039630117,-.0001227588308356785,10086.5,.0006856816169922151,-.0026172647355878808,-.00011144813365212311,10086.75,.0008205213989520053,-.0025807002389120473,-9981989595349302e-20,10087,.0009531219814482721,-.0025368749035452167,-8790785978747946e-20,10087.25,.0010831143111468499,-.0024859279257066044,-7574633164295174e-20,10087.5,.0012101366665142068,-.002428015339052693,-6337012368077894e-20,10087.75,.001333835262496558,-.002363309736848288,-5081449394897807e-20,10088,.0014538648624221851,-.002291999982260638,-3811508538302736e-20,10088.25,.001569889396747913,-.0022142909037357198,-2530786343560084e-20,10088.5,.0016815825878561308,-.0021304029726417267,-1242905222274067e-20,10088.75,.0017886285797500882,-.0020405719606309772,4849308852403914e-22,10089,.0018907225711941038,-.0019450485744690702,13397542260669658e-21,10089.25,.0019875714506051444,-.0018440980664010194,2627218059947199e-20,10089.5,.0020788944308240557,-.0017379998184591783,3907225704957123e-20,10089.75,.002164423681778973,-.0016270468994578043,51761266821362484e-21,10090,.002243904958999459,-.0015115455937546156,6430286219071376e-20,10090.25,.002317098225945662,-.001391814901181123,7666092678581862e-20,10090.5,.0023837782681789036,-.0012681860078414338,8879965103544412e-20,10090.75,.002443735297513696,-.0011410017277445153,.00010068360864793252,10091,.0024967755444503244,-.0010106159154590027,.00011227783398779822,10091.25,.0025427218373840843,-.0008773928501547791,.00012354790021986906,10091.5,.0025814141673133283,-.0007417065915147963,.00013445999809943158,10091.75,.002612710237013513,-.0006039403080583941,.0001449810153004176,10092,.0026364859938978152,-.000464485578409435,.0001550786161917999,10092.25,.0026526361460341256,-.0003237416659660344,.00016472132199435557,10092.5,.002661074661020949,-.00018211476728263954,.00017387859127500992,10092.75,.0026617352476284526,-40017234260332696e-21,.00018252090076315572,10093,.002654571820270833,.00010213323003979329,.00019061982650148056,10093.25,.002639558946480296,.00024391440248786898,.00019814812537178187,10093.5,.0026166922775869993,.00038490039880609744,.0002050798170626418,10093.75,.002585988962760549,.0005246625616875071,.00021139026656920228,10094,.00254748804642456,.0006627703799590806,.00021705626733413354,10094.25,.0025012508488047648,.0007987924411355262,.00022205612515157833,10094.5,.0024473613290024745,.0009322974202156904,.0002263697429607122,10094.75,.0023859264294895537,.0010628551080671424,.00022997870665084205,10095,.00231707640029092,.001190037483205147,.00023286637198389757,10095.25,.002240965100350506,.0013134198311767075,.00023501795271098908,10095.5,.0021577702726636445,.001432581916082573,.00023642060991562556,10095.75,.002067693788703323,.0015471092089811927,.00023706354255551023,10096,.001970961856475721,.0016565941779870669,.00023693807909609934,10096.25,.0018678251852159967,.0017606376447676414,.00023603777003054966,10096.5,.0017585590983079395,.0018588502118217028,.00023435848096218492,10096.75,.0016434635844769956,.0019508537643501908,.00023189848578467276,10097,.0015228632757320589,.0020362830496694112,.00022865855933404172,10097.25,.0013971073389256181,.0021147873359290905,.00022464206870387524,10097.5,.001266569266233317,.00218603215034851,.00021985506221312845,10097.75,.0011316465483833002,.0022497010952435116,.00021430635479756553,10098,.0009927602131661083,.002305497737763472,.00020800760836451387,10098.25,.0008503542107156891,.002353147566479997,.00020097340541208359,10098.5,.0007048946263720444,.002392400004773175,.00019322131397549018,10098.75,.0005568687017249892,.002423030467372367,.0001847719417337896,10099,.0004067836448107718,.002444842442476338,.00017564897690113012,10099.25,.000255165211504598,.00245766957768056,.0001658792133503006,10099.5,.00010255604203652553,.002461377743589193,.00015549255728755095,10099.75,-5048626064293613e-20,.002455867044633114,.00014452201273225992,10100,-.00020339132015369918,.002441073742426339,.00013300364306717845,10100.25,-.0003555784483222644,.0024169720532187422,.00012097650603512582,10100.5,-.0005064593780475069,.0023835757777920146,.00010848255977075629,10100.75,-.0006554412594874771,.0023409397199401303,95566537797812e-18,10101,-.0008019299040700471,.002289160848490284,8227579138067011e-20,10101.25,-.00094533325259734,.0022283791581324177,6866009821193016e-20,10101.5,-.001085065035141184,.0021587781862302266,54771437129755144e-21,10101.75,-.0012205485818512689,.0020805851464623815,406637293768871e-19,10102,-.001351220735618963,.0019940706456895232,26392547815766536e-21,10102.25,-.0014765358102000973,.0018995479578392664,12014796468944322e-21,10102.5,-.0015959695313511185,.001797371837709879,-24116362788167117e-22,10102.75,-.0017090228942035265,.0016879368681617447,-16828246545654794e-21,10103,-.0018152258678643873,.0015716753458328364,-31176300759277124e-21,10103.25,-.0019141408783702458,.0014490547228127408,-45397232552936915e-21,10103.5,-.0020053660038011696,.0013205746340694809,-5943304434535884e-20],Tv={n:bv,data:Ev},Av=Tv;function wv(n){const{data:e,n:t}=Av,i=e[0],s=e[(t-1)*4];if(n<i||n>s)return null;let r=0,o=t-1;for(;o-r>1;){const f=r+o>>1;e[f*4]<=n?r=f:o=f}const a=n-e[r*4],c=e[o*4]-e[r*4],l=c>0?a/c:0,u=e[r*4+1]+l*(e[o*4+1]-e[r*4+1]),d=e[r*4+2]+l*(e[o*4+2]-e[r*4+2]),h=e[r*4+3]+l*(e[o*4+3]-e[r*4+3]);return[u,d,h]}function Dv(n,e){const t=wv(e);if(!t)return null;const i=1495978707e-1,s=Math.hypot(t[0],t[1],t[2])*i,r=(t[0]-n[0])*i,o=(t[1]-n[1])*i,a=(t[2]-n[2])*i;return{rangeKm:s,residualKm:Math.hypot(r,o,a)}}const Cv=1,Pv=.01,Rv=-3,Lv=2.5;function Nh(n){const e=Date.UTC(n,0,1),t=Date.UTC(n+1,0,1);return{span0Days:(e-Ln)/864e5,spanLenDays:(t-e)/864e5}}function Iv(n,e,t,i){const s=n+i*Cv;return Math.max(e,Math.min(e+t-1e-6,s))}function Hv(n,e){const t=n-e*Pv;return Math.max(Rv,Math.min(Lv,t))}const Uv={sun:"☀️",moon:"🌙",mercury:"⚪",venus:"💛",earth:"🌍",mars:"🔴",jupiter:"🟠",saturn:"🪐",uranus:"🔵",neptune:"🟣"},Nv={"solar-eclipse":"🌑","lunar-eclipse":"🌕","saturn-edge-on":"🪐"};function Ov(n){const e=Nv[n.type];if(e)return e;const t=i=>i&&Uv[i]||"●";return n.type==="transit"?t(n.bodyId):n.type==="conjunction"?t(n.bodyId)+t(n.bodyId2):n.type==="opposition"?t(n.bodyId):"✦"}const zv=40;function k0(n,e,t,i,s=zv){const r=e>0?e:1,o=l=>Math.max(0,Math.min(1,(l-n)/r)),a=t.filter(l=>l.tDays>=n-1e-6&&l.tDays<n+r+1e-6).map(l=>({frac:o(l.tDays),emoji:Ov(l),title:l.title})).sort((l,u)=>l.frac-u.frac),c=Math.max(0,a.length-s);return{markers:a.slice(0,s),overflow:c,caretFrac:o(i)}}const Oh=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Fv(n){const e=n,t=[];for(let i=0;i<12;i++){const s=(Date.UTC(2001,i,1)-Date.UTC(2001,0,1))/864e5;s>=e||t.push({abbr:Oh[i],day:s,frac:s/e})}return t}function ju(n,e){const t=new Date(Date.UTC(n,0,1+Math.floor(e)));return`${Oh[t.getUTCMonth()]} ${t.getUTCDate()}`}function Bv(n,e,t){let i=null,s=1/0;for(const r of n){const o=Math.abs(r.x-e);o<=t&&o<s&&(s=o,i=r)}return i}const rn=56,kv=4;function Gv(n){const e=Math.max(0,1-n/rn);return 1+(kv-1)*e*e}function Wa(n,e){const t=Math.sqrt(n*n+e*e);if(t>=rn)return null;const i=Gv(t);return{x:n*i,y:e*i,scale:i}}function qu(n,e){return Math.max(0,Math.min(e,n))}const Wv=["January","February","March","April","May","June","July","August","September","October","November","December"];function Vv(n,e){return new Date(Date.UTC(n,e+1,0)).getUTCDate()}function Xv(n,e){return new Date(Date.UTC(n,e,1)).getUTCDay()}function Yv(n,e){const t=Vv(n,e),i=Xv(n,e),s=new Array(42).fill(0);for(let r=1;r<=t;r++)s[i+(r-1)]=r;return{grid:s,daysInMonth:t,firstWeekday:i}}function jv(n,e){return`${Wv[e]} ${n}`}function Ku(n,e){return n.getUTCFullYear()===e.getUTCFullYear()&&n.getUTCMonth()===e.getUTCMonth()&&n.getUTCDate()===e.getUTCDate()}const qv=.5,Zu=864e5,Wl=new Map;function N1(n){const e=Date.UTC(n,0,1),t=Date.UTC(n+1,0,1);return{span0Days:(e-Ln)/Zu,spanLenDays:(t-e)/Zu}}function zh(n){return Wl.has(n)}function Fh(n){const e=Wl.get(n);if(e)return e;const{span0Days:t,spanLenDays:i}=N1(n),s=Uh(t,t+i,{coarseStepDays:qv}),r={year:n,span0Days:t,spanLenDays:i,events:s};return Wl.set(n,r),r}"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js").catch(()=>{})});const Kv=.15;let Qi=null,S0=!1;function zo(){Qi&&(Qi=null,F.controls.enabled=!0,F.controls.update())}function Zv(){const n=F.camera.position,e=n.length();if(e<1e-6)return;const t=Math.acos(Math.min(1,Math.max(-1,n.y/e)));Qi={theta:Math.atan2(n.x,n.z),phi:t,radius:e},F.controls.enabled=!1}function Jv(n){if(!Qi)return;Qi.theta+=Kv*n;const{theta:e,phi:t,radius:i}=Qi,s=Math.sin(t);F.camera.position.set(i*s*Math.sin(e),i*Math.cos(t),i*s*Math.cos(e)),F.camera.lookAt(0,0,0)}for(const n of["pointerdown","wheel","keydown","touchstart"])window.addEventListener(n,zo,{passive:!0});const b0=tn.map(n=>E1(n)),Qv=tn.map(n=>F0(n).halfExtent),E0=new Float32Array(tn.length),$v=200;let Ju=0,Lr="";const Va=new R;let Hs=null,Ir=null;const ex=yh(tn).map(n=>n.dir),jc=new nh,Qu=new R;function tx(){Va.set(0,0,-1).applyQuaternion(F.camera.quaternion);const n=Va.x,e=Va.y,t=Va.z;for(let i=0;i<b0.length;i++){const s=b0[i];E0[i]=I6(s,[n,e,t])}}function nx(n){if(n-Ju<$v)return;const e=F.camera.position,t=`${e.x.toFixed(2)}|${e.y.toFixed(2)}|${e.z.toFixed(2)}|${F.camera.quaternion.w.toFixed(3)}|${ln}`;if(t===Lr)return;Ju=n,Lr=t;const i=Sh(F.camera.position.length());og(F.constellations,E0,i,ln||null,n/1e3),Wr&&rg(F.constellationFigures,E0,i)}function ix(n){if(!ln)return;const e=F.constellations.children.find(t=>t.name===`constellation-lines:${ln}`);e&&(e.material.opacity=ho(n/1e3))}const Gt=document.getElementById("app"),En=document.getElementById("date"),Us=document.getElementById("speed"),sx=document.getElementById("speed-value"),T0=document.getElementById("pause"),_r=document.getElementById("reverse"),rx=document.getElementById("now"),ns=document.getElementById("find"),Di=document.getElementById("find-list"),Hr=document.getElementById("orbits"),In=document.getElementById("labels"),Ur=document.getElementById("belts"),Mr=document.getElementById("figures"),G0=document.getElementById("dof");let Wr=!1;const Xa=document.getElementById("share"),fo=document.getElementById("screenshot"),po=document.getElementById("tooltip"),ao=document.getElementById("info"),A0=document.getElementById("gl-lost");let gt=null;const yr=document.getElementById("intro"),Ya=document.getElementById("intro-title"),Ki=document.getElementById("intro-skip"),Fo=document.getElementById("palette"),As=document.getElementById("palette-input"),mo=document.getElementById("palette-list");let Nr=!1,w0="",qi=0,Bo=[],qc=!0,D0=!0,Vl=!0,ja=0;const ox=document.getElementById("gl-reload"),O1=document.getElementById("hud-mini"),Vr=document.getElementById("hud-date"),z1=document.getElementById("hud-speed"),ri=document.getElementById("hud-timeline"),ea=document.getElementById("hud-timeline-track"),Xl=document.getElementById("hud-timeline-dynamic"),Bh=document.getElementById("hud-timeline-fill"),kh=document.getElementById("hud-timeline-caret"),ax=document.getElementById("hud-timeline-bar"),Yl=document.getElementById("hud-timeline-year"),cr=document.getElementById("hud-tl-tip"),jl=document.getElementById("hud-tl-lens"),s0=document.getElementById("hud-tl-lens-canvas"),cx=document.getElementById("hud-tl-lens-date"),C0=document.getElementById("date-cal"),lx=document.getElementById("date-cal-title"),ux=document.getElementById("date-cal-prev"),dx=document.getElementById("date-cal-next"),hx=document.getElementById("date-cal-grid"),fx=document.getElementById("date-cal-today"),px=document.getElementById("date-cal-y-5"),mx=document.getElementById("date-cal-y-1"),gx=document.getElementById("date-cal-y+1"),vx=document.getElementById("date-cal-y+5");let kn=0,ni=0,Ns=!1,ql=-1,Kl=window.innerWidth<560;const $u=document.getElementById("info-name"),ed=document.getElementById("info-period"),td=document.getElementById("info-distance"),nd=document.getElementById("info-range"),qa=document.getElementById("info-facts"),id=document.getElementById("info-label-1"),sd=document.getElementById("info-label-2"),rd=document.getElementById("info-label-3"),Zl=document.getElementById("events-toggle"),Gh=document.getElementById("events-range"),Zi=document.getElementById("events-row"),Sr=document.getElementById("events-list"),To=document.getElementById("date-pick"),Or=new Map(Ko.map(n=>[n.id,n])),ko=new Map(Ko.filter(n=>n.kind==="moon"&&n.parent).map(n=>[n.id,n.parent])),_e=new Qm(Date.now());let F,Zt=Ds,St="",oi=!0,ci="",ln="",od=_e.t,Jl=performance.now(),Go=0,P0=null,Ql=!0;function mn(){Ql=!0}const _i={x:0,y:0,z:0},Mi={x:0,y:0,z:0};let ad=!1,Kc=!1,F1=!1,an=null;const xx=3;let $e=null;const $l=document.getElementById("scale-real"),Wh=document.getElementById("scale-visible"),Zc=document.getElementById("scale-caption"),cd=[[0,"Morphing to real scale…"],[.2,"Sizes snap to reality — the default view exaggerates radii ~300× (Sun) to ~40,000× (Earth)."],[.5,"Distances snap to reality — Earth is 150 million km from the Sun, not 15 units."],[.8,"At real scale Neptune is 4.5 BILLION km out. Most of this view is empty space."]];function _x(n){let e=cd[0][1];for(const[t,i]of cd)n>=t&&(e=i);return e}function Vh(){return $e?$e.dir===0?$e.p>=.5?"real":"visible":$e.dir===1?"real":"visible":Zt===ti?"real":"visible"}function B1(){const n=Vh()==="real";for(const e of[$l,Wh]){if(!e)continue;const t=e===$l?n:!n;e.classList.toggle("active",t),e.setAttribute("aria-checked",String(t))}Zc&&(Zc.hidden=!$e,$e&&(Zc.textContent=$e.dir===-1?"Returning to the visible view…":$e.dir===0?"Real scale — sizes and distances to the same ratio. Toggle back any time.":_x(C1($e.p))))}function Mx(){$e&&($e.p>=1?($e={p:1,dir:0,reframed:!1},Zt=ti):($e=null,Zt=Ds),B1(),st())}function e1(n){Vh()!==n&&(mn(),$e&&$e.dir!==0?($e.dir=n==="real"?1:-1,$e.reframed=!1):n==="real"?(an=null,zo(),$e={p:0,dir:1,reframed:!1}):(an=null,zo(),$e={p:1,dir:-1,reframed:!1}),B1())}function os(){const n=F.bodies.get("moon");n?.orbit&&Ah(n.orbit,_e.t,Zt);const e=F.bodies.get("iss");e?.orbit&&e.satellite&&D1(e.orbit,e.satellite,_e.t,Zt),Go=performance.now()}function yx(n){F&&F.dispose(),F=L6(Gt,Ko,n),F.controls.addEventListener("change",st);for(const t of F.bodies.values())t.orbit&&t.parent&&t.parent.pivot.add(t.orbit);P0&&wh(F,P0,_e.t,Zt),ii(),bh(F,_e.t,Zt);const e=new _1;if(Zg(F.bodies.values(),e),St){const t=F.bodies.get(St);if(t){const i=Zt.followDistanceKm(t.def.radiusKm,t.def.kind==="dwarf");F.controls.target.copy(t.worldPos),F.camera.position.copy(t.worldPos).add(new R(i,i*.6,i))}}return F}const Hi=50;function ld(n=!1){let e=0;for(const t of F.bodies.values()){const i=t.def.elements;if(i&&(t.def.kind==="planet"||!n&&t.def.kind==="dwarf")){const s=i.a*(1+i.e);e=Math.max(e,Zt.planetDistance(s))}}return Math.max(e,1)}function Wo(n){return n==="constellations"?kg(Rt,ld(),Hi):Bg(ld(!0),Hi,.95)}function Ui(n){const e=F.bodies.get(n);if(!e)return null;const t=ko.get(n)??n,i=F.bodies.get(t)??e,s=Dh(t,Zt),r=Math.max(i.frameExtent,s>0?2*s+i.sceneRadius:0);return Ph([i.worldPos.x,i.worldPos.y,i.worldPos.z],r,Hi,F.camera.aspect)}function Sx(n){const e=tn.findIndex(t=>t.name===n);return e<0?null:Gg(b0[e],Qv[e],Rt,Rt/8,F.camera.aspect)}function Ci(n,e=1.4,t=null,i=!1){St=t??"",Os(St),ci=t??"",ln="",Lr="",st(),zo(),S0=i,Y0();const s=t?ko.has(t)?ko.get(t):t:null;an=Jo([F.camera.position.x,F.camera.position.y,F.camera.position.z],[F.controls.target.x,F.controls.target.y,F.controls.target.z],n,e,s,F.camera.fov,Hi)}function bx(n){const e=Sx(n);e&&(ln=n,St="",ci="",zo(),S0=!1,Lr="",Y0(),an=Jo([F.camera.position.x,F.camera.position.y,F.camera.position.z],[F.controls.target.x,F.controls.target.y,F.controls.target.z],e,1.6,null,F.camera.fov,Hi),st())}function Ex(){const n=document.getElementById("anchors");n&&(n.addEventListener("click",e=>{const t=e.target.closest("button[data-fly]");if(!t)return;const i=t.dataset.fly;if(i==="system")Ci(Wo("system"),1.6,"sun");else if(i==="constellations")Ci(Wo("constellations"),1.8,"sun",!0);else{const s=Ui(i);s&&Ci(s,1.4,i)}st()}),$l?.addEventListener("click",()=>e1("real")),Wh?.addEventListener("click",()=>e1("visible")))}function ii(){mn();for(const n of F.bodies.values())n.orbit&&(n.orbit.material.visible=Hr.checked);Hs?.setVisible(In.checked),Ir?.setVisible(In.checked);for(const n of F.belts)n.mesh.visible=Ur.checked;F.constellationFigures.visible=Wr,F.post.setDOF(G0.checked&&oi)}const Jc=new R,gs=new R,ud=new R;let Ka=null;function Tx(){const n=F.camera,e=F.bodies.get("sun"),t=F.post.flare;if(!e){t.group.visible=!1;return}if(e.mesh.getWorldPosition(Jc),gs.copy(Jc).project(n),!(gs.z<1&&gs.x>-1.05&&gs.x<1.05&&gs.y>-1.05&&gs.y<1.05))t.group.visible=!1;else{if(Ka===null){Ka=[];for(const r of F.bodies.values())r.def.id!=="sun"&&Ka.push(r.mesh)}const s=n6(n,Jc,Ka);t.group.visible=!s,s||t.update(n,gs)}if(F.post.dofEnabled()){const s=St||ci||"sun",r=F.bodies.get(s);let o=1;r&&(r.mesh.getWorldPosition(ud),o=n.position.distanceTo(ud)),F.post.setDOFFocus(o)}}function Ax(){const n=_e.getSpeed(),e=_e.isReversed?"← ":"",t=Math.abs(n);let i,s;return t>=100?(i=t.toFixed(0),s="d/s"):t>=1?(i=t.toFixed(1),s="d/s"):t>=.1?(i=t.toFixed(2),s="d/s"):(i=(t*24).toFixed(2),s="h/s"),`${e}${i} ${s}`}function W0(){const n=Ax();sx.textContent=n,z1.textContent=n}function k1(){const n=_e.toDate(),e=n.getUTCFullYear(),t=String(n.getUTCMonth()+1).padStart(2,"0"),i=String(n.getUTCDate()).padStart(2,"0"),s=String(n.getUTCHours()).padStart(2,"0"),r=String(n.getUTCMinutes()).padStart(2,"0");En.textContent=`${e}-${t}-${i} ${s}:${r} UTC`,Vr.textContent=Kl?`${e}-${t}-${i}`:`${e}-${t}-${i} ${s}:${r}`;const o=String(e);if(Yl.textContent!==o&&(Yl.textContent=o),document.activeElement!==To){const a=`${e}-${t}-${i}`;To.value!==a&&(To.value=a)}}function wx(){const n=To.value;if(!n)return;const[e,t,i]=n.split("-").map(Number);if(!e||!t||!i)return;const s=_e.toDate(),r=new Date(Date.UTC(e,t-1,i,s.getUTCHours(),s.getUTCMinutes()));Math.abs(r.getTime()-s.getTime())<6e4||(_e.setDate(r),os(),mn(),En.classList.remove("flash"),En.offsetWidth,En.classList.add("flash"),q0()&&Yr(),st())}function Xr(){lx.textContent=jv(kn,ni);const{grid:n}=Yv(kn,ni),e=_e.toDate(),t=new Date,i=document.createDocumentFragment();for(const s of n){const r=document.createElement("div");if(r.className="cal-day",s===0)r.classList.add("blank");else{r.textContent=String(s);const o=new Date(Date.UTC(kn,ni,s));Ku(o,e)&&r.classList.add("sel"),Ku(o,t)&&kn===t.getUTCFullYear()&&ni===t.getUTCMonth()&&r.classList.add("today"),r.addEventListener("click",()=>Dx(s))}i.appendChild(r)}hx.replaceChildren(i)}function Dx(n){const e=_e.toDate(),t=new Date(Date.UTC(kn,ni,n,e.getUTCHours(),e.getUTCMinutes()));Math.abs(t.getTime()-e.getTime())<6e4||(_e.setDate(t),os(),mn(),En.classList.remove("flash"),En.offsetWidth,En.classList.add("flash"),q0()&&Yr(),st(),Xr())}function Xh(){const n=_e.toDate();kn=n.getUTCFullYear(),ni=n.getUTCMonth(),ql=n.getUTCDate(),Ns=!0,C0.classList.add("open"),C0.setAttribute("aria-hidden","false"),Xr()}function V0(){Ns&&(Ns=!1,C0.classList.remove("open"),C0.setAttribute("aria-hidden","true"))}function Yh(n){const e=kn*12+ni+n;kn=Math.floor(e/12),ni=(e%12+12)%12,Xr()}function X0(n){kn+=n,Xr()}px.addEventListener("click",()=>X0(-5));mx.addEventListener("click",()=>X0(-1));gx.addEventListener("click",()=>X0(1));vx.addEventListener("click",()=>X0(5));Vr.addEventListener("click",()=>{Ns?V0():Xh()});Vr.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),Ns?V0():Xh())});ux.addEventListener("click",()=>Yh(-1));dx.addEventListener("click",()=>Yh(1));fx.addEventListener("click",()=>{const n=new Date,e=_e.toDate(),t=new Date(Date.UTC(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate(),e.getUTCHours(),e.getUTCMinutes()));_e.setDate(t),os(),En.classList.remove("flash"),En.offsetWidth,En.classList.add("flash"),q0()&&Yr(),st(),kn=n.getUTCFullYear(),ni=n.getUTCMonth(),Xr()});document.addEventListener("pointerdown",n=>{if(!Ns)return;const e=n.target;e&&(e.closest("#date-cal")||e===Vr)||V0()});document.addEventListener("keydown",n=>{n.key==="Escape"?V0():n.key==="F2"&&(n.preventDefault(),oi=!oi,F.sunGlow.visible=oi,mn())});function Y0(){if(!St){if(ln){const t=tn.findIndex(l=>l.name===ln),i=t>=0?tn[t]:void 0;if(!i){ao.hidden=!0,co(null);return}const[s,r,o]=b0[t],a=Math.asin(Math.min(1,Math.max(-1,r)))*180/Math.PI;let c=Math.atan2(-o,-s)*180/Math.PI/15;c<0&&(c+=24),ao.hidden=!1,$u.textContent=`${i.name} — constellation`,id.textContent="Center RA",sd.textContent="Center Dec",rd.textContent="Stars",ed.textContent=`${c.toFixed(1)}h`,td.textContent=`${a>=0?"+":""}${a.toFixed(1)}°`,nd.textContent=`${i.stars.length} stars`,co(null);return}ao.hidden=!0,co(null);return}const n=Or.get(St),e=n?ov(n,_e.t):null;if(!n||!e){ao.hidden=!0,co(null);return}ao.hidden=!1,$u.textContent=n.name,id.textContent="Orbit period",sd.textContent="Distance",rd.textContent="Peri / Apo",ed.textContent=av(e.periodDays),td.textContent=n.kind==="moon"?`${fr(e.distanceKm)} from ${Or.get(n.parent??"")?.name??"parent"}`:`${fr(e.distanceKm)} from Sun`,nd.textContent=`${fr(e.perihelionKm)} / ${fr(e.aphelionKm)}`,co(n,_e.t)}function co(n,e){if(qa&&(qa.replaceChildren(),!!n)){for(const t of uv(n)){const i=document.createElement("div");i.className="info-row";const s=document.createElement("span");s.textContent=t.label;const r=document.createElement("span");r.className="value",r.textContent=t.value,i.append(s,r),qa.appendChild(i)}if(n.id==="moon"&&e!==void 0){const t=Gr(e),i=Dv(t,e);if(i){const s=[{label:"JPL Horizons range",value:fr(i.rangeKm)},{label:"Meeus vs DE441",value:`Δ ${i.residualKm.toFixed(1)} km`}];for(const r of s){const o=document.createElement("div");o.className="info-row";const a=document.createElement("span");a.textContent=r.label;const c=document.createElement("span");c.className="value",c.textContent=r.value,o.append(a,c),qa.appendChild(o)}}}}}function j0(n){Us.value=String(n),_e.setLogSpeed(n),mn(),W0(),st()}Us.addEventListener("input",()=>{j0(parseFloat(Us.value))});T0.addEventListener("click",()=>{_e.setPaused(!_e.isPaused),T0.textContent=_e.isPaused?"Resume":"Pause",mn(),st()});_r.addEventListener("click",()=>{_e.setReversed(!_e.isReversed),_r.textContent=_e.isReversed?"Reverse ←":"Reverse →",_r.classList.toggle("active",_e.isReversed),mn(),W0(),st()});rx.addEventListener("click",()=>{_e.setDate(new Date),os(),mn(),st()});function q0(){return!Zi.hidden}function Cx(n){Sr.textContent=n,Sr.classList.add("computing")}function Px(){Sr.classList.remove("computing")}function Yr(){if(!q0())return;const n=parseInt(Gh.value,10)||5;Cx("Computing events…"),requestAnimationFrame(()=>{const e=_e.toDate().getTime(),t=n*365.25*864e5,i=(e-t-Ln)/864e5,s=(e+t-Ln)/864e5,r=Uh(i,s,{coarseStepDays:.2});Rx(r)})}function Rx(n){if(Px(),Sr.replaceChildren(),n.length===0){const t=document.createElement("p");t.className="ev-note",t.textContent="No events in this window.",Sr.appendChild(t);return}const e=document.createDocumentFragment();for(const t of n){const i=document.createElement("div");i.className="ev "+Lx(t);const s=new Date(t.dateMs),r=s.getUTCFullYear(),o=String(s.getUTCMonth()+1).padStart(2,"0"),a=String(s.getUTCDate()).padStart(2,"0"),c=document.createElement("span");c.className="ev-date",c.textContent=`${r}-${o}-${a}`;const l=document.createElement("span");l.className="ev-what",l.textContent=t.title,l.title=t.detail;const u=document.createElement("span");u.className="ev-detail",u.textContent=t.detail,l.appendChild(u),i.append(c,l),i.addEventListener("click",()=>{_e.setDate(new Date(t.dateMs)),os(),st(),En.classList.remove("flash"),En.offsetWidth,En.classList.add("flash");const d=t.bodyId;if(d){const h=Ui(d);h&&Ci(h,1.4,d)}}),e.appendChild(i)}Sr.appendChild(e)}function Lx(n){switch(n.type){case"solar-eclipse":return"ecl-solar";case"lunar-eclipse":return"ecl-lunar";case"transit":return"transit";case"saturn-edge-on":return"saturn";default:return""}}Zl.addEventListener("click",()=>{Zi.hidden=!Zi.hidden,Zl.classList.toggle("active",!Zi.hidden),Zi.hidden||Yr(),st()});Gh.addEventListener("change",()=>{Yr()});To.addEventListener("change",()=>{wx()});const Ix=ih(Ko),Hx=sh(),Ux=15;let bi=-1;function Nx(n){const e=[];if(!n.trim()){for(const s of Ix)e.push({c:!1,id:s.id,name:s.name,sub:s.sub});for(const s of Hx.slice(0,Ux))e.push({c:!0,id:s.id,name:s.name,sub:s.sub});return e}const t=i7(Ko,n);for(const s of t)e.push({c:!1,id:s.id,name:s.name,sub:s.parentName?`moon of ${s.parentName}`:s.kind});const i=o7(n);for(const s of i)e.push({c:!0,id:s.id,name:s.name,sub:s.sub});return e}function jh(n){return n.startsWith(Io)?n.slice(Io.length):Or.get(n)?.name??n}function Os(n){ns.value=jh(n)}function G1(){Di.hidden=!0,bi=-1}function t1(){const n=Di.querySelectorAll(".fr");n.forEach((e,t)=>e.classList.toggle("active",t===bi)),n[bi]?.scrollIntoView({block:"nearest"})}function qh(n){const e=Nx(n);Di.replaceChildren();const t=document.createDocumentFragment();if(e.length===0){const i=document.createElement("div");i.className="fr-empty",i.textContent="No matches",t.appendChild(i)}else for(const i of e){const s=document.createElement("div");s.className=i.c?"fr fr-const":"fr",s.innerHTML=`<span class="fr-name">${i.name}</span><span class="fr-sub">${i.sub}</span>`,s.addEventListener("click",()=>Kh(i.id)),t.appendChild(s)}Di.appendChild(t),bi=0,t1(),Di.hidden=!1}function Kh(n){if(ns.value=jh(n),G1(),ns.blur(),n.startsWith(Io)){bx(n.slice(Io.length));return}const e=n&&Ui(n)?n:"sun",t=Ui(e);t&&Ci(t,1.4,e)}ns.addEventListener("focus",()=>qh(ns.value));ns.addEventListener("input",()=>{qh(ns.value)});ns.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),Di.hidden?Kh(""):G1();return}if(Di.hidden)return;const e=Di.querySelectorAll(".fr");if(n.key==="ArrowDown")n.preventDefault(),bi=Math.min(e.length-1,bi+1),t1();else if(n.key==="ArrowUp")n.preventDefault(),bi=Math.max(0,bi-1),t1();else if(n.key==="Enter"){n.preventDefault();const t=e[bi];t&&t.click()}});document.addEventListener("pointerdown",n=>{!Di.hidden&&!n.target?.closest("#find-wrap")&&G1()});Hr.addEventListener("change",()=>{ii(),st()});In.addEventListener("change",()=>{ii(),st()});Ur.addEventListener("change",()=>{ii(),st()});Mr.addEventListener("change",()=>{Wr=Mr.checked,ii(),st()});G0.addEventListener("change",()=>{ii(),st()});function Ox(){qc=!qc;for(const n of F.bodies.values())n.atmosphereMesh&&(n.atmosphereMesh.visible=qc)}function dd(){mn();const n=F.skybox.group,e=n.getObjectByName("milkyway-skybox"),t=n.getObjectByName("starfield"),i=n.getObjectByName("zodiacal-light");e&&(e.visible=D0),t&&(t.visible=D0),i&&(i.visible=Vl)}function zx(){ja=(ja+1)%3;const n=St||"sun",e=F.bodies.get(n);if(!e)return;const t=F.camera.aspect;if(ja===2){const c=Ui(n);c&&Ci(c,.9,n);return}const i=e.radius??1,s=Math.max(i*2,.5),r=Ph([e.worldPos.x,e.worldPos.y,e.worldPos.z],s,Hi,t),o=Math.hypot(r.pos[0]-r.target[0],r.pos[1]-r.target[1],r.pos[2]-r.target[2]),a=ja===0?{pos:[r.target[0],r.target[1]+o,r.target[2]],target:r.target}:{pos:[r.target[0],r.target[1],r.target[2]+o],target:r.target};Ci(a,.9,n)}function hd(n){const e=Ui(n);e&&Ci(e,1.4,n)}function Zh(){St="",ci="",ln="",Lr="",Os(""),Y0(),st()}function K0(n){if(mn(),n.startsWith("jump-digit-")){const e=n.slice(11),t=rv(e,on,"sun");t&&hd(t);return}if(n.startsWith("jump-")){hd(n.slice(5));return}switch(n){case"pause":_e.setPaused(!_e.isPaused),T0.textContent=_e.isPaused?"Resume":"Pause",st();break;case"speed-up":case"speed-down":{const e=n==="speed-up"?.25:-.25,t=Math.max(-3,Math.min(2.5,parseFloat(Us.value)+e));j0(t);break}case"now":_e.setDate(new Date),os(),st();break;case"reverse":_e.setReversed(!_e.isReversed),_r.textContent=_e.isReversed?"Reverse ←":"Reverse →",_r.classList.toggle("active",_e.isReversed),W0(),st();break;case"orbits":Hr.checked=!Hr.checked,ii(),st();break;case"labels":In.checked=!In.checked,ii(),st();break;case"belts":Ur.checked=!Ur.checked,ii(),st();break;case"figures":Mr.checked=!Mr.checked,Wr=Mr.checked,ii(),st();break;case"milkyway":D0=!D0,dd();break;case"zodiacal":Vl=!Vl,dd();break;case"atmospheres":Ox();break;case"post":oi=!oi,F.sunGlow.visible=oi;break;case"scale":e1(Zt===ti?"visible":"real");break;case"camera-preset":zx();break;case"release":Zh();break;case"screenshot":fo.click();break;case"palette":Nr?zs():$h();break}}function Fx(){if(gt||!Ya||!yr)return;yr.hidden=!1,yr.setAttribute("aria-hidden","false"),Ya.hidden=!1,Ya.style.opacity="0",Ki&&(Ki.hidden=!1);const n=Wo("system"),e={pos:[n.pos[0]*3,n.pos[1]*3,n.pos[2]*3]};F.camera.position.set(e.pos[0],e.pos[1],e.pos[2]),F.controls.target.set(0,0,0),gt={leg:0,titleEl:Ya,tail:!1,tailT:0,tailFromSpeed:0},F.controls.enabled=!1,r0=0,Jh(0)}function Jh(n){if(!gt)return;const e=P1[n],t=Ui(e.bodyId)??Wo("system");n===0&&(t.pos=[t.pos[0]*e.zoom,t.pos[1]*e.zoom,t.pos[2]*e.zoom]),St=e.bodyId,Os(e.bodyId),ci=e.bodyId,ln="",gt.leg=n,F.controls.enabled=!1,an=Jo([F.camera.position.x,F.camera.position.y,F.camera.position.z],[F.controls.target.x,F.controls.target.y,F.controls.target.z],t,e.duration,e.bodyId,F.camera.fov,Hi,!0)}let r0=0;function Bx(n){if(gt){if(r0+=n,gt.titleEl&&(gt.titleEl.style.opacity=String($g(r0))),gt.tail){gt.tailT+=n,kx(gt.tailT),gt.tailT>=No&&Vo(!1);return}r0>Rh+No+1.5&&Vo(!1)}}function kx(n){Z0(),ia();const e=df(),{span0Days:t,spanLenDays:i}=N1(e),s=Math.min(1,Math.max(0,(_e.t-t)/i));Y1(s);const r=tv(n);ri.style.boxShadow=r>.01?`0 0 ${18*r}px ${6*r}px rgba(120, 200, 255, ${.55*r})`:"";const o=gt?.tailFromSpeed??0;j0(ev(n,o,1.5)),Gx(r,s)}function Gx(n,e){if(n<=.01)return;let t=document.getElementById("intro-tail-marker");t||(t=document.createElement("div"),t.id="intro-tail-marker",ax.appendChild(t)),t.style.left=`${e*100}%`;const i=.6+.8*n;t.style.transform=`translate(-50%, -50%) scale(${i})`,t.style.opacity=String(n)}function Wx(){gt&&(gt.leg<P1.length-1?Jh(gt.leg+1):(gt.tail=!0,gt.tailT=0,gt.tailFromSpeed=parseFloat(Us.value)||0,mn()))}function Vo(n){if(!gt)return;const e=gt.titleEl;gt=null;try{sessionStorage.setItem(Lh,"1")}catch{}ri.style.boxShadow="";const t=document.getElementById("intro-tail-marker");if(t&&t.remove(),n&&ri.classList.remove("visible"),yr&&(yr.hidden=!0,yr.setAttribute("aria-hidden","true")),!(St==="earth")){const r=Ui("earth");if(r){St="earth",Os("earth"),ci="earth",ln="",an=Jo([F.camera.position.x,F.camera.position.y,F.camera.position.z],[F.controls.target.x,F.controls.target.y,F.controls.target.z],r,n?.6:1,"earth",F.camera.fov,Hi),F.controls.enabled=!1,e&&(e.style.opacity="0",e.hidden=!0),Ki&&(Ki.hidden=!0),st();return}}F.controls.enabled=!0,F.controls.update();const s=F.bodies.get(St);s&&F.controls.target.copy(s.worldPos),e&&(e.style.opacity="0",e.hidden=!0),Ki&&(Ki.hidden=!0),st()}for(const n of["pointerdown","wheel","touchstart"])Gt.addEventListener(n,()=>{gt&&Vo(!0)});window.addEventListener("keydown",n=>{if(!gt||n.key==="/"||n.key==="?"||n.ctrlKey||n.metaKey||n.altKey)return;const e=n.target?.tagName;e==="INPUT"||e==="TEXTAREA"||Vo(!0)});Ki&&Ki.addEventListener("click",()=>Vo(!0));window.addEventListener("keydown",n=>{if(n.ctrlKey||n.metaKey||n.altKey)return;const e=n.target?.tagName;if(e==="INPUT"||e==="TEXTAREA")return;if(n.key==="/"||n.key==="?"){n.preventDefault(),Nr?zs():$h();return}if(n.key==="Escape"){Nr?zs():Zh();return}const t=n.key.length===1?n.key.toLowerCase():n.key,i=sv(t);i&&(n.preventDefault(),K0(i))});function Qh(n,e,t,i){if(!i)return!0;const s=i.toLowerCase();return n.includes(s)||e.toLowerCase().includes(s)||t.toLowerCase().includes(s)}function o0(){if(!mo)return;mo.replaceChildren();const n=w0.trim();let e=0;for(let t=0;t<Bo.length;t++){const i=Bo[t];if(!Qh(i.id,i.label,i.hint,n))continue;const s=document.createElement("div");s.className="pal-item"+(t===qi?" active":"");const r=document.createElement("span");r.className="pal-keys",r.textContent=i.keys.join(" ")||"•";const o=document.createElement("span");o.className="pal-label",o.textContent=i.label;const a=document.createElement("span");a.className="pal-hint",a.textContent=i.hint,s.append(r,o,a),s.addEventListener("click",()=>{K0(i.id),zs()}),mo.appendChild(s),e++}if(e===0){const t=document.createElement("div");t.className="pal-empty",t.textContent="No matching commands",mo.appendChild(t)}}function $h(){!Fo||!As||!mo||(Nr=!0,w0="",qi=0,Fo.hidden=!1,As.value="",Bo=iv(on.map(n=>({id:n.id,name:n.name}))).map(n=>({id:n.id,label:n.label,keys:n.keys,hint:n.hint})),o0(),requestAnimationFrame(()=>As.focus()))}function zs(){Fo&&(Nr=!1,Fo.hidden=!0)}As&&(As.addEventListener("input",()=>{w0=As.value,qi=0,o0()}),As.addEventListener("keydown",n=>{if(n.stopPropagation(),n.key==="Escape")zs();else if(n.key==="ArrowDown")n.preventDefault(),qi=Math.min(Bo.length-1,qi+1),o0();else if(n.key==="ArrowUp")n.preventDefault(),qi=Math.max(0,qi-1),o0();else if(n.key==="Enter"){n.preventDefault();const e=w0.trim();let t=0;for(const i of Bo)if(Qh(i.id,i.label,i.hint,e)){if(t===qi){K0(i.id),zs();break}t++}}}));document.addEventListener("pointerdown",n=>{Nr&&Fo&&!n.target?.closest("#palette")&&zs()});window.addEventListener("resize",()=>{mn(),F.camera.aspect=window.innerWidth/window.innerHeight,F.camera.updateProjectionMatrix(),F.renderer.setSize(window.innerWidth,window.innerHeight),F.post.setSize(window.innerWidth,window.innerHeight);const n=window.innerWidth<560;n!==Kl&&(Kl=n,k1())});const Ze=hv(window.location.href);Ze.timeMs!=null&&_e.setDate(new Date(Ze.timeMs));if(Ze.speedLog!=null){const n=Math.max(-3,Math.min(2.5,Ze.speedLog));Us.value=String(n),_e.setLogSpeed(n)}Ze.reversed!=null&&(_e.setReversed(Ze.reversed),_r.textContent=Ze.reversed?"Reverse ←":"Reverse →");Ze.scale&&(Zt=Ze.scale==="true"?ti:Ds);Ze.orbits!=null&&(Hr.checked=Ze.orbits);Ze.labels!=null&&(In.checked=Ze.labels);new URL(window.location.href,"http://localhost").searchParams.get("post")==="0"&&(oi=!1);Ze.belts!=null&&(Ur.checked=Ze.belts);Ze.figures!=null&&(Mr.checked=Ze.figures,Wr=Ze.figures);Ze.dof!=null&&(G0.checked=Ze.dof);Ze.paused!=null&&(_e.setPaused(Ze.paused),T0.textContent=Ze.paused?"Resume":"Pause");Ze.eventsOpen!=null&&(Zi.hidden=!Ze.eventsOpen,Zl.classList.toggle("active",Ze.eventsOpen));Zi.hidden||Yr();const a0=Ze.constellation&&tn.some(n=>n.name===Ze.constellation)?Ze.constellation:null;Ze.follow&&Or.has(Ze.follow)?(Os(Ze.follow),St=Ze.follow,ci=Ze.follow):a0||(Os("sun"),St="sun",ci="sun");a0&&(ln=a0,Os(`const:${a0}`),Lr="");function ef(){return{timeMs:_e.toDate().getTime(),speedLog:parseFloat(Us.value),reversed:_e.isReversed,follow:St||void 0,constellation:ln||void 0,scale:Zt===ti?"true":"visible",orbits:Hr.checked,labels:In.checked,belts:Ur.checked,figures:Wr,dof:G0.checked,paused:_e.isPaused,eventsOpen:!Zi.hidden,cam:{pos:[F.camera.position.x,F.camera.position.y,F.camera.position.z],target:[F.controls.target.x,F.controls.target.y,F.controls.target.z]}}}let Qc;function st(){Qc===void 0&&(Qc=setTimeout(()=>{Qc=void 0,window.history.replaceState(null,"",Hh(window.location.href,ef()))},300))}Xa.addEventListener("click",async()=>{const n=Hh(window.location.href,ef());window.history.replaceState(null,"",n);try{await navigator.clipboard.writeText(n),Xa.textContent="Link copied ✓"}catch{Xa.textContent="Link in address bar"}setTimeout(()=>{Xa.textContent="Copy share link"},1500)});fo.addEventListener("click",async()=>{const n=F.renderer.domElement,e=_e.toDate(),t=c=>String(c).padStart(2,"0"),i=`${e.getUTCFullYear()}-${t(e.getUTCMonth()+1)}-${t(e.getUTCDate())}T${t(e.getUTCHours())}${t(e.getUTCMinutes())}Z`,s=[Hs,Ir].filter(c=>!!c&&In.checked);let r=n;if(s.length>0){r=document.createElement("canvas"),r.width=n.width,r.height=n.height;const c=r.getContext("2d");c.drawImage(n,0,0);for(const l of s)c.drawImage(l.canvas,0,0,n.width,n.height)}const o=await new Promise(c=>r.toBlob(l=>c(l),"image/png"));if(!o){fo.textContent="Export failed";return}const a=document.createElement("a");a.href=URL.createObjectURL(o),a.download=`solar-system-${i}.png`,a.click(),setTimeout(()=>URL.revokeObjectURL(a.href),5e3),fo.textContent="Saved ✓",setTimeout(()=>{fo.textContent="Save screenshot"},1500)});yx(Zt);F.sunGlow.visible=oi;function tf(n){try{P0=Q7(n),wh(F,P0,_e.t,Zt)}catch(e){console.warn("[iss] TLE parse failed:",e)}}tf(vg);_g().then(n=>{n&&tf(n)}).catch(n=>console.warn("[iss] TLE fetch failed, using fallback:",n));Hs=Hg(Gt);Hs.setVisible(In.checked);Ir=wg(Gt);Ir.setVisible(In.checked);Ex();B1();Ze.cam&&(F.camera.position.set(...Ze.cam.pos),F.controls.target.set(...Ze.cam.target),F.controls.update());W0();k1();const $i=new URLSearchParams(window.location.search).get("cmd")?.toLowerCase()??null,nf=new Set(R1.map(n=>n.id));nf.add("palette");const sf=$i!=null&&/^[0-9]$/.test($i),rf=$i!=null&&(sf||nf.has($i));$i&&rf&&K0(sf?`jump-digit-${$i}`:$i);{const n=window.matchMedia("(prefers-reduced-motion: reduce)").matches,e=new URLSearchParams(window.location.search).get("intro"),t=!!Ze.follow||!!Ze.constellation||!!Ze.cam||!!($i&&rf);let i=!1;try{i=sessionStorage.getItem(Lh)==="1"}catch{}Qg(n,e,t,i)&&Fx()}window.__solar={get scene(){return F.scene},get camera(){return F.camera},get controls(){return F.controls},get renderer(){return F.renderer},get labelLayer(){return Hs},get bodies(){return F.bodies},satelliteExtentScene:n=>Dh(n,Zt),clock:_e};const R0=new nh,L0=new be;let of=0,af=0,W1=!1,fd=0,V1=!1;function cf(){const n=[];for(const e of F.bodies.values())n.push(e.mesh);return n}function Vx(n,e){po.innerHTML=`${n}${e?`<span class="sub"> ${e}</span>`:""}`,po.style.left=`${of}px`,po.style.top=`${af}px`,po.classList.add("show")}function I0(){po.classList.remove("show")}function Xx(){if(!W1||V1){I0();return}R0.setFromCamera(L0,F.camera);const n=R0.intersectObjects(cf(),!1);if(n.length>0){const e=n[0].object.userData.id,t=e?Or.get(e):void 0;if(t){const i=t.kind==="moon"?`moon of ${Or.get(t.parent??"")?.name??""}`:t.kind.charAt(0).toUpperCase()+t.kind.slice(1);Vx(t.name,i);return}}I0()}Gt.addEventListener("pointermove",n=>{W1=!0,of=n.clientX,af=n.clientY,L0.set(n.clientX/window.innerWidth*2-1,-(n.clientY/window.innerHeight)*2+1);const e=performance.now();e-fd<50||(fd=e,Xx())});Gt.addEventListener("pointerleave",()=>{W1=!1,I0()});Gt.addEventListener("pointerdown",()=>{V1=!0,I0()});window.addEventListener("pointerup",()=>{V1=!1});let lf=0,uf=0;Gt.addEventListener("pointerdown",n=>{lf=n.clientX,uf=n.clientY});Gt.addEventListener("pointerup",n=>{if(c0)return;if(zr){zr=!1;return}if(n.pointerType==="touch"&&Bt.size>1||n.button===2||Math.hypot(n.clientX-lf,n.clientY-uf)>6)return;const e=Gt.getBoundingClientRect();L0.set((n.clientX-e.left)/e.width*2-1,-((n.clientY-e.top)/e.height)*2+1),R0.setFromCamera(L0,F.camera);const t=R0.intersectObjects(cf(),!1);if(t.length>0){const i=t[0].object.userData.id,s=i?Ui(i):null;s&&Ci(s,1.4,i)}});let pn=null,zr=!1;function X1(){O1.classList.remove("scrubbing"),Vr.classList.remove("hot"),z1.classList.remove("hot"),Pi=null,go.clear(),Xo=[],Xl.replaceChildren(),Bh.style.width="0%",kh.style.left="0%",j1(),hf(),ri.classList.remove("visible")}let Pi=null;const go=new Set;let ta=0,na=365,Xo=[];function df(){return new Date(Ln+_e.t*864e5).getUTCFullYear()}function Z0(){ri.classList.contains("visible")||ri.classList.add("visible")}function Y1(n){kh.style.left=`${n*100}%`,Bh.style.width=`${n*100}%`}function $c(n){const{span0Days:e,spanLenDays:t}=N1(n);ta=e,na=t;const i=zh(n)?Fh(n).events:[],{markers:s,overflow:r,caretFrac:o}=k0(e,t,i,_e.t);Yl.textContent=String(n),Xl.replaceChildren();const a=ea.clientWidth||window.innerWidth,l=Math.max(1,a-2*12),u=document.createDocumentFragment();Xo=[];for(const d of s){const h=document.createElement("span");h.className="tl-event",h.style.left=`${d.frac*100}%`,h.textContent=d.emoji,h.title=d.title,u.appendChild(h),Xo.push({day:d.frac*t,x:d.frac*l,emoji:d.emoji,title:d.title})}if(r>0){const d=document.createElement("span");d.className="tl-overflow",d.textContent=`+${r}`,u.appendChild(d)}Xl.appendChild(u),Y1(o)}const Yx=0,jx=120,qx=24,Kx=Fv(365);function j1(){cr.classList.remove("show")}function hf(){jl.classList.remove("show"),s0.getContext("2d")?.clearRect(0,0,s0.width,s0.height)}function Zx(n){const e=s0,t=window.devicePixelRatio||1,i=rn*2;(e.width!==i*t||e.height!==i*t)&&(e.width=Math.round(i*t),e.height=Math.round(i*t));const s=e.getContext("2d");if(!s)return;s.setTransform(t,0,0,t,0,0),s.clearRect(0,0,i,i);const r=ea.clientWidth||window.innerWidth,o=12,a=Math.max(1,r-2*o),c=k0(ta,na,[],_e.t).caretFrac,l=n-o;s.lineCap="round",s.strokeStyle="rgba(160, 190, 220, 0.5)",s.lineWidth=20,s.beginPath(),s.moveTo(2,rn),s.lineTo(i-2,rn),s.stroke();for(const u of Kx){const d=u.frac*a-l,h=Wa(d,0);if(!h)continue;const f=rn+h.x;s.strokeStyle="rgba(120, 150, 200, 0.55)",s.lineWidth=Math.max(1,h.scale),s.beginPath(),s.moveTo(f,rn-4.5*h.scale),s.lineTo(f,rn+4.5*h.scale),s.stroke();const g=Wa(d,9);g&&(s.save(),s.translate(rn+g.x,rn+g.y),s.rotate(Math.PI/4),s.scale(g.scale,g.scale),s.fillStyle="#7d90ad",s.font="10px system-ui, sans-serif",s.fillText(u.abbr,0,9),s.restore())}for(const u of Xo){const d=u.x-l,h=Wa(d,0);h&&(s.save(),s.translate(rn+h.x,rn+h.y),s.scale(h.scale,h.scale),s.font="13px system-ui, sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText(u.emoji,0,0),s.restore())}if(ri.classList.contains("visible")){const u=c*a-l,d=Wa(u,0);if(d){const h=rn+d.x;s.fillStyle="#57c785",s.shadowColor="rgba(87, 199, 133, 0.7)",s.shadowBlur=6*d.scale;const f=Math.max(2,3*d.scale);s.fillRect(h-f/2,rn-7.5*d.scale,f,15*d.scale),s.shadowBlur=0}}}function Jx(){const n=ea.clientWidth||window.innerWidth,e=12,t=Math.max(1,n-2*e),i=k0(ta,na,[],_e.t).caretFrac;return e+i*t}function ff(n){if(Pi===null)return;const e=ea.getBoundingClientRect();if(e.width<2)return;const t=e.width,i=!!(pn?.movedX||Ni?.live),s=Math.max(0,Math.min(t,n-e.left)),r=qu(i?Jx():s,t),o=r-12,a=Bv(Xo,o,qx);if(a){const l=ju(Pi,a.day);cr.innerHTML=`<span class="tl-tip-date">${l}</span>${a.emoji} ${a.title}`;const u=O1.getBoundingClientRect(),d=cr.offsetWidth,h=u.right-4,f=Math.max(12,h-d);cr.style.left=`${f}px`,cr.style.top=`${u.bottom+6}px`,cr.classList.add("show")}else j1();jl.style.left=`${r-rn}px`,Zx(r);const c=i?Math.max(0,_e.t-ta):r/t*na;cx.textContent=ju(Pi,c),jl.classList.add("show")}function Qx(){Pi!==null&&(ia(),Z0(),ff(Number.POSITIVE_INFINITY))}window.addEventListener("pointermove",n=>{if(n.pointerType!=="mouse")return;const e=ea.getBoundingClientRect();n.clientY>=e.top-Yx&&n.clientY<=e.bottom+jx?(ia(),ri.classList.contains("hover")||ri.classList.add("hover"),ff(n.clientX)):(j1(),hf(),ri.classList.remove("hover"))});function ia(){const n=df();if(!(n===Pi&&!go.has(n))){if(Pi=n,zh(n)){$c(n);return}go.has(n)||(go.add(n),$c(n),requestAnimationFrame(()=>{go.delete(n),Fh(n),Pi===n&&$c(n)}))}}function $x(){if(Pi===null)return;const{caretFrac:n}=k0(ta,na,[],_e.t);Y1(n)}function pf(n,e,t){let i=!1;const s=!n.movedX&&Math.abs(e)>6,r=!n.movedY&&Math.abs(t)>4;return s&&(n.movedX=!0),r&&(n.movedY=!0),(s||r)&&O1.classList.add("scrubbing"),n.movedX&&(Vr.classList.add("hot"),_e.setDate(new Date(Ln+Iv(n.startDays,n.span0Days,n.spanLenDays,e)*864e5)),i=!0),n.movedY&&(z1.classList.add("hot"),j0(Hv(n.startLog,t)),i=!0),i}Gt.addEventListener("contextmenu",n=>n.preventDefault());Gt.addEventListener("pointerdown",n=>{if(zr=!1,n.pointerType!=="mouse"||n.button!==2)return;const e=new Date(Ln+_e.t*864e5).getUTCFullYear(),t=Nh(e);pn={startX:n.clientX,startY:n.clientY,startDays:_e.t,startLog:_e.getLogSpeed(),movedX:!1,movedY:!1,span0Days:t.span0Days,spanLenDays:t.spanLenDays},_e.beginScrub()});window.addEventListener("pointermove",n=>{if(!pn||n.pointerType!=="mouse"||!(n.buttons&4))return;const e=n.clientX-pn.startX,t=n.clientY-pn.startY;pf(pn,e,t)&&(Go=performance.now(),st()),(pn.movedX||pn.movedY)&&(Z0(),ia())});window.addEventListener("pointerup",n=>{if(!pn||n.pointerType!=="mouse"||n.button!==2)return;const e=pn;pn=null,_e.endScrub(),(e.movedX||e.movedY)&&(os(),zr=!0),X1()});window.addEventListener("pointercancel",n=>{!pn||n.pointerType!=="mouse"||(pn=null,_e.endScrub(),X1())});const Bt=new Map;let Ni=null,c0=!1;function mf(n){const e=Ni;!e||e.ended||(e.ended=!0,_e.endScrub(),n&&(os(),zr=!0),X1())}Gt.addEventListener("pointerdown",n=>{if(n.pointerType!=="touch"||Bt.size>=4||(Bt.set(n.pointerId,{x:n.clientX,y:n.clientY}),Bt.size!==3))return;const e=[...Bt.values()],t=(e[0].x+e[1].x+e[2].x)/3,i=(e[0].y+e[1].y+e[2].y)/3,s=new Date(Ln+_e.t*864e5).getUTCFullYear(),r=Nh(s);Ni={startX:t,startY:i,startDays:_e.t,startLog:_e.getLogSpeed(),movedX:!1,movedY:!1,live:!1,ended:!1,span0Days:r.span0Days,spanLenDays:r.spanLenDays},_e.beginScrub()});Gt.addEventListener("pointermove",n=>{if(n.pointerType!=="touch"||!Bt.has(n.pointerId))return;Bt.set(n.pointerId,{x:n.clientX,y:n.clientY});const e=Ni;if(!e||e.ended||Bt.size<3)return;const t=[...Bt.values()],i=(t[0].x+t[1].x+t[2].x)/3,s=(t[0].y+t[1].y+t[2].y)/3;pf(e,i-e.startX,s-e.startY)&&(e.live=!0,Go=performance.now(),st()),(e.movedX||e.movedY)&&(Z0(),ia(),Qx())});window.addEventListener("pointerup",n=>{if(n.pointerType!=="touch"||c0||Bt.size===0)return;const e=Bt.size>=3;Bt.delete(n.pointerId);const t=Ni;if(t&&e&&!t.ended&&(zr=!0,mf(t.live),Ni=null,Bt.size===2)){const i=[...Bt.keys()][0],s=Bt.get(i);c0=!0,Gt.dispatchEvent(new PointerEvent("pointerup",{pointerId:i,pointerType:"touch",clientX:s.x,clientY:s.y})),Gt.dispatchEvent(new PointerEvent("pointerdown",{pointerId:i,pointerType:"touch",clientX:s.x,clientY:s.y})),c0=!1}});window.addEventListener("pointercancel",n=>{if(n.pointerType!=="touch")return;Bt.delete(n.pointerId);const e=Ni;e&&!e.ended&&Bt.size<3&&mf(e.live),e&&Bt.size<3&&(Ni=null)});function e_(){if(!Hs||!In.checked)return;const n=F.camera,e=n.position,t=e.x,i=e.y,s=e.z,r=Sh(e.length()),o=ln?tn.findIndex(c=>c.name===ln):-1,a=[];for(let c=0;c<tn.length;c++){const l=E0[c];if(T1(l)*r<=kl)continue;const u=ex[c],d=t*u[0]+i*u[1]+s*u[2],h=Math.sqrt(Rt*Rt+(t*t+i*i+s*s)-2*Rt*d);jc.set(e,Qu.set(u[0]*Rt-t,u[1]*Rt-i,u[2]*Rt-s).normalize());let f=!1;const g=Qu;for(const v of F.bodies.values()){if(!v.mesh.visible)continue;const m=v.worldPos,p=m.x-t,y=m.y-i,x=m.z-s,b=Math.sqrt(p*p+y*y+x*x);if(b<1e-6)continue;const L=1/b,A=p*L,D=y*L,I=x*L,E=D*g.z-I*g.y,S=I*g.x-A*g.z,P=A*g.y-D*g.x,O=Math.sqrt(Math.min(1,E*E+S*S+P*P)),z=Math.max(1,v.frameExtent>0?v.frameExtent/2:v.sceneRadius);if(O>(z+2)/b)continue;jc.far=b*2;const X=jc.intersectObject(v.mesh,!1);if(X.length>0&&X[0].distance<h){f=!0;break}}a.push({name:tn[c].name,dir:u,emphasis:l,emphasized:o>=0?c===o:!1,occluded:f})}Og(Hs,n,a,r,window.innerWidth,window.innerHeight)}const pd=new R,Za=new R;function t_(){if(!Ir||!In.checked)return;const n=F.camera,e=n.position,t=window.innerWidth,i=window.innerHeight,s=[];for(const r of F.bodies.values()){if(!r.mesh.visible)continue;const o=r.worldPos,a=e.distanceTo(o);Za.copy(o).sub(e).normalize(),pd.copy(o);const c=Bl(pd,n,t,i);if(!c.ok)continue;Za.copy(o).addScaledVector(Za,-r.sceneRadius);const l=Bl(Za,n,t,i),u=l.ok?Math.hypot(l.x-c.x,l.y-c.y):0,d=r.def.id===ci?0:r.def.kind==="star"||r.def.kind==="planet"?1:2;s.push({id:r.def.id,name:r.def.name,world:o,dist:a,discRadiusPx:u,tier:d})}Dg(Ir,n,s,t,i)}function gf(){if(requestAnimationFrame(gf),F1)return;const n=performance.now(),e=Math.min(.1,(n-Jl)/1e3);Jl=n,ad||(_i.x=F.camera.position.x,_i.y=F.camera.position.y,_i.z=F.camera.position.z,Mi.x=F.controls.target.x,Mi.y=F.controls.target.y,Mi.z=F.controls.target.z,ad=!0),gt&&Bx(e),_e.tick(e);const t=_e.t-od;od=_e.t;let i=Zt;if($e){$e.dir!==0&&($e.p=Math.min(1,Math.max(0,$e.p+$e.dir*e/xx)),($e.dir===1&&$e.p>=1||$e.dir===-1&&$e.p<=0)&&Mx());const a=$e.dir===0?1:C1($e.p);i=P6(Ds,ti,a),ug(F,a);for(const c of F.bodies.values())c.orbit&&dg(c.orbit,i,c.parent?c.def.id:null);$e.dir===0?$e.reframed||($e.reframed=!0,an=Jo([F.camera.position.x,F.camera.position.y,F.camera.position.z],[F.controls.target.x,F.controls.target.y,F.controls.target.z],Wo("system"),1.2,null,F.camera.fov,Hi),F.controls.enabled=!1):an&&$e.reframed&&(an=null,F.controls.enabled=!0,F.controls.update())}{const a=performance.now();if(a-Go>250){Go=a;const c=F.bodies.get("moon");c?.orbit&&Ah(c.orbit,_e.t,i);const l=F.bodies.get("iss");l?.orbit&&l.satellite&&D1(l.orbit,l.satellite,_e.t,i)}}if(bh(F,_e.t,i),_e.isPaused||Th(F,_e.t,i,F.camera.position.length()),hg(F,t),an){F.controls.enabled=!1;let a;if(an.followId){const u=F.bodies.get(an.followId);u&&(a=[u.worldPos.x,u.worldPos.y,u.worldPos.z])}const c=Wg(an,e,a),l=c.target;if(F.controls.target.set(l[0],l[1],l[2]),F.camera.position.set(l[0]+c.offset[0],l[1]+c.offset[1],l[2]+c.offset[2]),Math.abs(F.camera.fov-c.fov)>.001&&(F.camera.fov=c.fov,F.camera.updateProjectionMatrix()),F.camera.lookAt(l[0],l[1],l[2]),c.done){if(an=null,gt)Wx();else if(S0)S0=!1,Zv();else if(F.controls.enabled=!0,F.controls.update(),St){const u=F.bodies.get(St);u&&F.controls.target.copy(u.worldPos)}st()}}else if(Qi)Jv(e);else if(St){const a=F.bodies.get(St),c=a&&ko.has(St)?F.bodies.get(ko.get(St)):a;c&&F.controls.target.lerp(c.worldPos,.2),F.controls.update()}else F.controls.update();{const a=F.camera.position,c=F.controls.target;if(Kc=Math.abs(a.x-_i.x)+Math.abs(a.y-_i.y)+Math.abs(a.z-_i.z)+Math.abs(c.x-Mi.x)+Math.abs(c.y-Mi.y)+Math.abs(c.z-Mi.z)>1e-4,_e.isPaused&&Kc&&lg(F,i,a.length()),!Ql&&dv({paused:_e.isPaused,cameraMoving:Kc,scrubbing:!!(pn?.movedX||Ni?.live),flightActive:an!==null,morphActive:$e!==null,skyTourActive:Qi!==null,introActive:gt!==null}))return;_i.x=a.x,_i.y=a.y,_i.z=a.z,Mi.x=c.x,Mi.y=c.y,Mi.z=c.z,Ql=!1}tx(),nx(n),ix(n),mg(F,ci,n/1e3),F.sunShader.setTime(n/1e3),Tx();const o=F.camera.position.length()<=170;if(o!==F.sunLight.castShadow&&(F.sunLight.castShadow=o),F.skybox.update(F.camera),oi?F.post.composer.render():F.renderer.render(F.scene,F.camera),e_(),t_(),k1(),Ns){const a=_e.toDate();if(a.getUTCFullYear()===kn&&a.getUTCMonth()===ni){const c=a.getUTCDate();c!==ql&&(ql=c,Xr())}}$x(),Y0()}requestAnimationFrame(gf);Gt.addEventListener("webglcontextlost",n=>{n.preventDefault(),F1=!0,A0.hidden=!1,A0.classList.add("show")});Gt.addEventListener("webglcontextrestored",()=>{F1=!1,mn(),A0.hidden=!0,A0.classList.remove("show"),F.renderer.setSize(window.innerWidth,window.innerHeight),Jl=performance.now()});ox.addEventListener("click",()=>window.location.reload());
