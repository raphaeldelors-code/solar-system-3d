(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const nd="168",fr={ROTATE:0,DOLLY:1,PAN:2},lr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},b0=0,qd=1,E0=2,gp=1,xp=2,yi=3,Ri=0,en=1,Cn=2,si=0,pr=1,ai=2,Kd=3,Zd=4,T0=5,_s=100,A0=101,D0=102,w0=103,P0=104,C0=200,R0=201,L0=202,I0=203,eu=204,tu=205,H0=206,U0=207,N0=208,O0=209,z0=210,F0=211,B0=212,k0=213,G0=214,W0=0,V0=1,X0=2,cc=3,Y0=4,j0=5,q0=6,K0=7,vp=0,Z0=1,J0=2,Ji=0,_p=1,Mp=2,yp=3,id=4,Q0=5,Sp=6,bp=7,Ep=300,Sr=301,br=302,nu=303,iu=304,Ic=306,Er=1e3,Ss=1001,su=1002,kt=1003,$0=1004,ra=1005,Rn=1006,Jc=1007,bs=1008,Li=1009,Tp=1010,Ap=1011,To=1012,sd=1013,Cs=1014,$n=1015,bn=1016,rd=1017,od=1018,Tr=1020,Dp=35902,wp=1021,Pp=1022,Bn=1023,Cp=1024,Rp=1025,mr=1026,Ar=1027,ad=1028,cd=1029,Lp=1030,ld=1031,ud=1033,Za=33776,Ja=33777,Qa=33778,$a=33779,ru=35840,ou=35841,au=35842,cu=35843,lu=36196,uu=37492,du=37496,hu=37808,fu=37809,pu=37810,mu=37811,gu=37812,xu=37813,vu=37814,_u=37815,Mu=37816,yu=37817,Su=37818,bu=37819,Eu=37820,Tu=37821,ec=36492,Au=36494,Du=36495,Ip=36283,wu=36284,Pu=36285,Cu=36286,eg=3200,Hp=3201,Up=0,tg=1,Jn="",Dt="srgb",is="srgb-linear",dd="display-p3",Hc="display-p3-linear",lc="linear",mt="srgb",uc="rec709",dc="p3",Bs=7680,Jd=519,ng=512,ig=513,sg=514,Np=515,rg=516,og=517,ag=518,cg=519,Ru=35044,lg=35048,Qd="300 es",Ei=2e3,hc=2001;class Fs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let $d=1234567;const go=Math.PI/180,Ao=180/Math.PI;function Di(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Qt[n&255]+Qt[n>>8&255]+Qt[n>>16&255]+Qt[n>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[t&63|128]+Qt[t>>8&255]+"-"+Qt[t>>16&255]+Qt[t>>24&255]+Qt[i&255]+Qt[i>>8&255]+Qt[i>>16&255]+Qt[i>>24&255]).toLowerCase()}function jt(n,e,t){return Math.max(e,Math.min(t,n))}function hd(n,e){return(n%e+e)%e}function ug(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function dg(n,e,t){return n!==e?(t-n)/(e-n):0}function xo(n,e,t){return(1-t)*n+t*e}function hg(n,e,t,i){return xo(n,e,1-Math.exp(-t*i))}function fg(n,e=1){return e-Math.abs(hd(n,e*2)-e)}function pg(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function mg(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function gg(n,e){return n+Math.floor(Math.random()*(e-n+1))}function xg(n,e){return n+Math.random()*(e-n)}function vg(n){return n*(.5-Math.random())}function _g(n){n!==void 0&&($d=n);let e=$d+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Mg(n){return n*go}function yg(n){return n*Ao}function Sg(n){return(n&n-1)===0&&n!==0}function bg(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Eg(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Tg(n,e,t,i,s){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+i)/2),u=o((e+i)/2),d=r((e-i)/2),h=o((e-i)/2),f=r((i-e)/2),g=o((i-e)/2);switch(s){case"XYX":n.set(a*u,c*d,c*h,a*l);break;case"YZY":n.set(c*h,a*u,c*d,a*l);break;case"ZXZ":n.set(c*d,c*h,a*u,a*l);break;case"XZX":n.set(a*u,c*g,c*f,a*l);break;case"YXY":n.set(c*f,a*u,c*g,a*l);break;case"ZYZ":n.set(c*g,c*f,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function zn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function lt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Wn={DEG2RAD:go,RAD2DEG:Ao,generateUUID:Di,clamp:jt,euclideanModulo:hd,mapLinear:ug,inverseLerp:dg,lerp:xo,damp:hg,pingpong:fg,smoothstep:pg,smootherstep:mg,randInt:gg,randFloat:xg,randFloatSpread:vg,seededRandom:_g,degToRad:Mg,radToDeg:yg,isPowerOfTwo:Sg,ceilPowerOfTwo:bg,floorPowerOfTwo:Eg,setQuaternionFromProperEuler:Tg,normalize:lt,denormalize:zn};class be{constructor(e=0,t=0){be.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(jt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ke{constructor(e,t,i,s,r,o,a,c,l){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l)}set(e,t,i,s,r,o,a,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],d=i[7],h=i[2],f=i[5],g=i[8],x=s[0],m=s[3],p=s[6],y=s[1],v=s[4],b=s[7],L=s[2],A=s[5],w=s[8];return r[0]=o*x+a*y+c*L,r[3]=o*m+a*v+c*A,r[6]=o*p+a*b+c*w,r[1]=l*x+u*y+d*L,r[4]=l*m+u*v+d*A,r[7]=l*p+u*b+d*w,r[2]=h*x+f*y+g*L,r[5]=h*m+f*v+g*A,r[8]=h*p+f*b+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-i*r*u+i*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*o-a*l,h=a*c-u*r,f=l*r-o*c,g=t*d+i*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=d*x,e[1]=(s*l-u*i)*x,e[2]=(a*i-s*o)*x,e[3]=h*x,e[4]=(u*t-s*c)*x,e[5]=(s*r-a*t)*x,e[6]=f*x,e[7]=(i*c-l*t)*x,e[8]=(o*t-i*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Qc.makeScale(e,t)),this}rotate(e){return this.premultiply(Qc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Qc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Qc=new Ke;function Op(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Do(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ag(){const n=Do("canvas");return n.style.display="block",n}const eh={};function gr(n){n in eh||(eh[n]=!0,console.warn(n))}function Dg(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const th=new Ke().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),nh=new Ke().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Yr={[is]:{transfer:lc,primaries:uc,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[Dt]:{transfer:mt,primaries:uc,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Hc]:{transfer:lc,primaries:dc,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(nh),fromReference:n=>n.applyMatrix3(th)},[dd]:{transfer:mt,primaries:dc,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(nh),fromReference:n=>n.applyMatrix3(th).convertLinearToSRGB()}},wg=new Set([is,Hc]),rt={enabled:!0,_workingColorSpace:is,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!wg.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Yr[e].toReference,s=Yr[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Yr[n].primaries},getTransfer:function(n){return n===Jn?lc:Yr[n].transfer},getLuminanceCoefficients:function(n,e=this._workingColorSpace){return n.fromArray(Yr[e].luminanceCoefficients)}};function xr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function $c(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ks;class Pg{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ks===void 0&&(ks=Do("canvas")),ks.width=e.width,ks.height=e.height;const i=ks.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=ks}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Do("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=xr(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(xr(t[i]/255)*255):t[i]=xr(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Cg=0;class zp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Cg++}),this.uuid=Di(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(el(s[o].image)):r.push(el(s[o]))}else r=el(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function el(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Pg.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Rg=0;class It extends Fs{constructor(e=It.DEFAULT_IMAGE,t=It.DEFAULT_MAPPING,i=Ss,s=Ss,r=Rn,o=bs,a=Bn,c=Li,l=It.DEFAULT_ANISOTROPY,u=Jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rg++}),this.uuid=Di(),this.name="",this.source=new zp(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new be(0,0),this.repeat=new be(1,1),this.center=new be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ep)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Er:e.x=e.x-Math.floor(e.x);break;case Ss:e.x=e.x<0?0:1;break;case su:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Er:e.y=e.y-Math.floor(e.y);break;case Ss:e.y=e.y<0?0:1;break;case su:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}It.DEFAULT_IMAGE=null;It.DEFAULT_MAPPING=Ep;It.DEFAULT_ANISOTROPY=1;class ct{constructor(e=0,t=0,i=0,s=1){ct.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],f=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(l+1)/2,b=(f+1)/2,L=(p+1)/2,A=(u+h)/4,w=(d+x)/4,I=(g+m)/4;return v>b&&v>L?v<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(v),s=A/i,r=w/i):b>L?b<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),i=A/s,r=I/s):L<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),i=w/r,s=I/r),this.set(i,s,r,t),this}let y=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(d-x)/y,this.z=(h-u)/y,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Lg extends Fs{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t);const s={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new It(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new zp(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cn extends Lg{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Fp extends It{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=kt,this.minFilter=kt,this.wrapR=Ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ig extends It{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=kt,this.minFilter=kt,this.wrapR=Ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class es{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let c=i[s+0],l=i[s+1],u=i[s+2],d=i[s+3];const h=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(d!==x||c!==h||l!==f||u!==g){let m=1-a;const p=c*h+l*f+u*g+d*x,y=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const L=Math.sqrt(v),A=Math.atan2(L,p*y);m=Math.sin(m*A)/L,a=Math.sin(a*A)/L}const b=a*y;if(c=c*m+h*b,l=l*m+f*b,u=u*m+g*b,d=d*m+x*b,m===1-a){const L=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=L,l*=L,u*=L,d*=L}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],c=i[s+1],l=i[s+2],u=i[s+3],d=r[o],h=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+u*d+c*f-l*h,e[t+1]=c*g+u*h+l*d-a*f,e[t+2]=l*g+u*f+a*h-c*d,e[t+3]=u*g-a*d-c*h-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(s/2),d=a(r/2),h=c(i/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"YZX":this._x=h*u*d+l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d-h*f*g;break;case"XZY":this._x=h*u*d-l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=i+a+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(i>a&&i>d){const f=2*Math.sqrt(1+i-a-d);this._w=(u-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>d){const f=2*Math.sqrt(1+a-i-d);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+d-i-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(jt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-i*l,this._z=r*u+o*l+i*c-s*a,this._w=o*u-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+i*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),d=Math.sin((1-t)*u)/l,h=Math.sin(t*u)/l;return this._w=o*d+this._w*h,this._x=i*d+this._x*h,this._y=s*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,i=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ih.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ih.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*i),u=2*(a*t-r*s),d=2*(r*i-o*t);return this.x=t+c*l+o*d-a*u,this.y=i+c*u+a*l-r*d,this.z=s+c*d+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return tl.copy(this).projectOnVector(e),this.sub(tl)}reflect(e){return this.sub(tl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(jt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const tl=new R,ih=new es;class li{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Hn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Hn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Hn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Hn):Hn.fromBufferAttribute(r,o),Hn.applyMatrix4(e.matrixWorld),this.expandByPoint(Hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),oa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),oa.copy(i.boundingBox)),oa.applyMatrix4(e.matrixWorld),this.union(oa)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Hn),Hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(jr),aa.subVectors(this.max,jr),Gs.subVectors(e.a,jr),Ws.subVectors(e.b,jr),Vs.subVectors(e.c,jr),Fi.subVectors(Ws,Gs),Bi.subVectors(Vs,Ws),cs.subVectors(Gs,Vs);let t=[0,-Fi.z,Fi.y,0,-Bi.z,Bi.y,0,-cs.z,cs.y,Fi.z,0,-Fi.x,Bi.z,0,-Bi.x,cs.z,0,-cs.x,-Fi.y,Fi.x,0,-Bi.y,Bi.x,0,-cs.y,cs.x,0];return!nl(t,Gs,Ws,Vs,aa)||(t=[1,0,0,0,1,0,0,0,1],!nl(t,Gs,Ws,Vs,aa))?!1:(ca.crossVectors(Fi,Bi),t=[ca.x,ca.y,ca.z],nl(t,Gs,Ws,Vs,aa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(hi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const hi=[new R,new R,new R,new R,new R,new R,new R,new R],Hn=new R,oa=new li,Gs=new R,Ws=new R,Vs=new R,Fi=new R,Bi=new R,cs=new R,jr=new R,aa=new R,ca=new R,ls=new R;function nl(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){ls.fromArray(n,r);const a=s.x*Math.abs(ls.x)+s.y*Math.abs(ls.y)+s.z*Math.abs(ls.z),c=e.dot(ls),l=t.dot(ls),u=i.dot(ls);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Hg=new li,qr=new R,il=new R;class Oi{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Hg.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qr.subVectors(e,this.center);const t=qr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(qr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(il.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qr.copy(e.center).add(il)),this.expandByPoint(qr.copy(e.center).sub(il))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fi=new R,sl=new R,la=new R,ki=new R,rl=new R,ua=new R,ol=new R;class Xo{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fi.copy(this.origin).addScaledVector(this.direction,t),fi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){sl.copy(e).add(t).multiplyScalar(.5),la.copy(t).sub(e).normalize(),ki.copy(this.origin).sub(sl);const r=e.distanceTo(t)*.5,o=-this.direction.dot(la),a=ki.dot(this.direction),c=-ki.dot(la),l=ki.lengthSq(),u=Math.abs(1-o*o);let d,h,f,g;if(u>0)if(d=o*c-a,h=o*a-c,g=r*u,d>=0)if(h>=-g)if(h<=g){const x=1/u;d*=x,h*=x,f=d*(d+o*h+2*a)+h*(o*d+h+2*c)+l}else h=r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;else h=-r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;else h<=-g?(d=Math.max(0,-(-o*r+a)),h=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+h*(h+2*c)+l):h<=g?(d=0,h=Math.min(Math.max(-r,-c),r),f=h*(h+2*c)+l):(d=Math.max(0,-(o*r+a)),h=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+h*(h+2*c)+l);else h=o>0?-r:r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(sl).addScaledVector(la,h),f}intersectSphere(e,t){fi.subVectors(e.center,this.origin);const i=fi.dot(this.direction),s=fi.dot(fi)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,s=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,s=(e.min.x-h.x)*l),u>=0?(r=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,fi)!==null}intersectTriangle(e,t,i,s,r){rl.subVectors(t,e),ua.subVectors(i,e),ol.crossVectors(rl,ua);let o=this.direction.dot(ol),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ki.subVectors(this.origin,e);const c=a*this.direction.dot(ua.crossVectors(ki,ua));if(c<0)return null;const l=a*this.direction.dot(rl.cross(ki));if(l<0||c+l>o)return null;const u=-a*ki.dot(ol);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ot{constructor(e,t,i,s,r,o,a,c,l,u,d,h,f,g,x,m){ot.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l,u,d,h,f,g,x,m)}set(e,t,i,s,r,o,a,c,l,u,d,h,f,g,x,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ot().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Xs.setFromMatrixColumn(e,0).length(),r=1/Xs.setFromMatrixColumn(e,1).length(),o=1/Xs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const h=o*u,f=o*d,g=a*u,x=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=f+g*l,t[5]=h-x*l,t[9]=-a*c,t[2]=x-h*l,t[6]=g+f*l,t[10]=o*c}else if(e.order==="YXZ"){const h=c*u,f=c*d,g=l*u,x=l*d;t[0]=h+x*a,t[4]=g*a-f,t[8]=o*l,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=f*a-g,t[6]=x+h*a,t[10]=o*c}else if(e.order==="ZXY"){const h=c*u,f=c*d,g=l*u,x=l*d;t[0]=h-x*a,t[4]=-o*d,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*u,t[9]=x-h*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const h=o*u,f=o*d,g=a*u,x=a*d;t[0]=c*u,t[4]=g*l-f,t[8]=h*l+x,t[1]=c*d,t[5]=x*l+h,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const h=o*c,f=o*l,g=a*c,x=a*l;t[0]=c*u,t[4]=x-h*d,t[8]=g*d+f,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=f*d+g,t[10]=h-x*d}else if(e.order==="XZY"){const h=o*c,f=o*l,g=a*c,x=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+x,t[5]=o*u,t[9]=f*d-g,t[2]=g*d-f,t[6]=a*u,t[10]=x*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ug,e,Ng)}lookAt(e,t,i){const s=this.elements;return xn.subVectors(e,t),xn.lengthSq()===0&&(xn.z=1),xn.normalize(),Gi.crossVectors(i,xn),Gi.lengthSq()===0&&(Math.abs(i.z)===1?xn.x+=1e-4:xn.z+=1e-4,xn.normalize(),Gi.crossVectors(i,xn)),Gi.normalize(),da.crossVectors(xn,Gi),s[0]=Gi.x,s[4]=da.x,s[8]=xn.x,s[1]=Gi.y,s[5]=da.y,s[9]=xn.y,s[2]=Gi.z,s[6]=da.z,s[10]=xn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],d=i[5],h=i[9],f=i[13],g=i[2],x=i[6],m=i[10],p=i[14],y=i[3],v=i[7],b=i[11],L=i[15],A=s[0],w=s[4],I=s[8],E=s[12],S=s[1],C=s[5],O=s[9],z=s[13],X=s[2],j=s[6],k=s[10],K=s[14],G=s[3],ne=s[7],ce=s[11],ue=s[15];return r[0]=o*A+a*S+c*X+l*G,r[4]=o*w+a*C+c*j+l*ne,r[8]=o*I+a*O+c*k+l*ce,r[12]=o*E+a*z+c*K+l*ue,r[1]=u*A+d*S+h*X+f*G,r[5]=u*w+d*C+h*j+f*ne,r[9]=u*I+d*O+h*k+f*ce,r[13]=u*E+d*z+h*K+f*ue,r[2]=g*A+x*S+m*X+p*G,r[6]=g*w+x*C+m*j+p*ne,r[10]=g*I+x*O+m*k+p*ce,r[14]=g*E+x*z+m*K+p*ue,r[3]=y*A+v*S+b*X+L*G,r[7]=y*w+v*C+b*j+L*ne,r[11]=y*I+v*O+b*k+L*ce,r[15]=y*E+v*z+b*K+L*ue,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15];return g*(+r*c*d-s*l*d-r*a*h+i*l*h+s*a*f-i*c*f)+x*(+t*c*f-t*l*h+r*o*h-s*o*f+s*l*u-r*c*u)+m*(+t*l*d-t*a*f-r*o*d+i*o*f+r*a*u-i*l*u)+p*(-s*a*u-t*c*d+t*a*h+s*o*d-i*o*h+i*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],y=d*m*l-x*h*l+x*c*f-a*m*f-d*c*p+a*h*p,v=g*h*l-u*m*l-g*c*f+o*m*f+u*c*p-o*h*p,b=u*x*l-g*d*l+g*a*f-o*x*f-u*a*p+o*d*p,L=g*d*c-u*x*c-g*a*h+o*x*h+u*a*m-o*d*m,A=t*y+i*v+s*b+r*L;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/A;return e[0]=y*w,e[1]=(x*h*r-d*m*r-x*s*f+i*m*f+d*s*p-i*h*p)*w,e[2]=(a*m*r-x*c*r+x*s*l-i*m*l-a*s*p+i*c*p)*w,e[3]=(d*c*r-a*h*r-d*s*l+i*h*l+a*s*f-i*c*f)*w,e[4]=v*w,e[5]=(u*m*r-g*h*r+g*s*f-t*m*f-u*s*p+t*h*p)*w,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*p-t*c*p)*w,e[7]=(o*h*r-u*c*r+u*s*l-t*h*l-o*s*f+t*c*f)*w,e[8]=b*w,e[9]=(g*d*r-u*x*r-g*i*f+t*x*f+u*i*p-t*d*p)*w,e[10]=(o*x*r-g*a*r+g*i*l-t*x*l-o*i*p+t*a*p)*w,e[11]=(u*a*r-o*d*r-u*i*l+t*d*l+o*i*f-t*a*f)*w,e[12]=L*w,e[13]=(u*x*s-g*d*s+g*i*h-t*x*h-u*i*m+t*d*m)*w,e[14]=(g*a*s-o*x*s-g*i*c+t*x*c+o*i*m-t*a*m)*w,e[15]=(o*d*s-u*a*s+u*i*c-t*d*c-o*i*h+t*a*h)*w,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+i,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,d=a+a,h=r*l,f=r*u,g=r*d,x=o*u,m=o*d,p=a*d,y=c*l,v=c*u,b=c*d,L=i.x,A=i.y,w=i.z;return s[0]=(1-(x+p))*L,s[1]=(f+b)*L,s[2]=(g-v)*L,s[3]=0,s[4]=(f-b)*A,s[5]=(1-(h+p))*A,s[6]=(m+y)*A,s[7]=0,s[8]=(g+v)*w,s[9]=(m-y)*w,s[10]=(1-(h+x))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=Xs.set(s[0],s[1],s[2]).length();const o=Xs.set(s[4],s[5],s[6]).length(),a=Xs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Un.copy(this);const l=1/r,u=1/o,d=1/a;return Un.elements[0]*=l,Un.elements[1]*=l,Un.elements[2]*=l,Un.elements[4]*=u,Un.elements[5]*=u,Un.elements[6]*=u,Un.elements[8]*=d,Un.elements[9]*=d,Un.elements[10]*=d,t.setFromRotationMatrix(Un),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=Ei){const c=this.elements,l=2*r/(t-e),u=2*r/(i-s),d=(t+e)/(t-e),h=(i+s)/(i-s);let f,g;if(a===Ei)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===hc)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=Ei){const c=this.elements,l=1/(t-e),u=1/(i-s),d=1/(o-r),h=(t+e)*l,f=(i+s)*u;let g,x;if(a===Ei)g=(o+r)*d,x=-2*d;else if(a===hc)g=r*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Xs=new R,Un=new ot,Ug=new R(0,0,0),Ng=new R(1,1,1),Gi=new R,da=new R,xn=new R,sh=new ot,rh=new es;class Vn{constructor(e=0,t=0,i=0,s=Vn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-jt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-jt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(jt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return sh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return rh.setFromEuler(this),this.setFromQuaternion(rh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vn.DEFAULT_ORDER="XYZ";class fd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Og=0;const oh=new R,Ys=new es,pi=new ot,ha=new R,Kr=new R,zg=new R,Fg=new es,ah=new R(1,0,0),ch=new R(0,1,0),lh=new R(0,0,1),uh={type:"added"},Bg={type:"removed"},js={type:"childadded",child:null},al={type:"childremoved",child:null};class qt extends Fs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Og++}),this.uuid=Di(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qt.DEFAULT_UP.clone();const e=new R,t=new Vn,i=new es,s=new R(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ot},normalMatrix:{value:new Ke}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=qt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ys.setFromAxisAngle(e,t),this.quaternion.multiply(Ys),this}rotateOnWorldAxis(e,t){return Ys.setFromAxisAngle(e,t),this.quaternion.premultiply(Ys),this}rotateX(e){return this.rotateOnAxis(ah,e)}rotateY(e){return this.rotateOnAxis(ch,e)}rotateZ(e){return this.rotateOnAxis(lh,e)}translateOnAxis(e,t){return oh.copy(e).applyQuaternion(this.quaternion),this.position.add(oh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ah,e)}translateY(e){return this.translateOnAxis(ch,e)}translateZ(e){return this.translateOnAxis(lh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ha.copy(e):ha.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Kr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pi.lookAt(Kr,ha,this.up):pi.lookAt(ha,Kr,this.up),this.quaternion.setFromRotationMatrix(pi),s&&(pi.extractRotation(s.matrixWorld),Ys.setFromRotationMatrix(pi),this.quaternion.premultiply(Ys.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(uh),js.child=e,this.dispatchEvent(js),js.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Bg),al.child=e,this.dispatchEvent(al),al.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pi.multiply(e.parent.matrixWorld)),e.applyMatrix4(pi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(uh),js.child=e,this.dispatchEvent(js),js.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Kr,e,zg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Kr,Fg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}qt.DEFAULT_UP=new R(0,1,0);qt.DEFAULT_MATRIX_AUTO_UPDATE=!0;qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Nn=new R,mi=new R,cl=new R,gi=new R,qs=new R,Ks=new R,dh=new R,ll=new R,ul=new R,dl=new R;class Fn{constructor(e=new R,t=new R,i=new R){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Nn.subVectors(e,t),s.cross(Nn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Nn.subVectors(s,t),mi.subVectors(i,t),cl.subVectors(e,t);const o=Nn.dot(Nn),a=Nn.dot(mi),c=Nn.dot(cl),l=mi.dot(mi),u=mi.dot(cl),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;const h=1/d,f=(l*c-a*u)*h,g=(o*u-a*c)*h;return r.set(1-f-g,g,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,gi)===null?!1:gi.x>=0&&gi.y>=0&&gi.x+gi.y<=1}static getInterpolation(e,t,i,s,r,o,a,c){return this.getBarycoord(e,t,i,s,gi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,gi.x),c.addScaledVector(o,gi.y),c.addScaledVector(a,gi.z),c)}static isFrontFacing(e,t,i,s){return Nn.subVectors(i,t),mi.subVectors(e,t),Nn.cross(mi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Nn.subVectors(this.c,this.b),mi.subVectors(this.a,this.b),Nn.cross(mi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Fn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Fn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Fn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Fn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Fn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;qs.subVectors(s,i),Ks.subVectors(r,i),ll.subVectors(e,i);const c=qs.dot(ll),l=Ks.dot(ll);if(c<=0&&l<=0)return t.copy(i);ul.subVectors(e,s);const u=qs.dot(ul),d=Ks.dot(ul);if(u>=0&&d<=u)return t.copy(s);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(i).addScaledVector(qs,o);dl.subVectors(e,r);const f=qs.dot(dl),g=Ks.dot(dl);if(g>=0&&f<=g)return t.copy(r);const x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(i).addScaledVector(Ks,a);const m=u*g-f*d;if(m<=0&&d-u>=0&&f-g>=0)return dh.subVectors(r,s),a=(d-u)/(d-u+(f-g)),t.copy(s).addScaledVector(dh,a);const p=1/(m+x+h);return o=x*p,a=h*p,t.copy(i).addScaledVector(qs,o).addScaledVector(Ks,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Bp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wi={h:0,s:0,l:0},fa={h:0,s:0,l:0};function hl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class je{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=rt.workingColorSpace){return this.r=e,this.g=t,this.b=i,rt.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=rt.workingColorSpace){if(e=hd(e,1),t=jt(t,0,1),i=jt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=hl(o,r,e+1/3),this.g=hl(o,r,e),this.b=hl(o,r,e-1/3)}return rt.toWorkingColorSpace(this,s),this}setStyle(e,t=Dt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Dt){const i=Bp[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=xr(e.r),this.g=xr(e.g),this.b=xr(e.b),this}copyLinearToSRGB(e){return this.r=$c(e.r),this.g=$c(e.g),this.b=$c(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Dt){return rt.fromWorkingColorSpace($t.copy(this),e),Math.round(jt($t.r*255,0,255))*65536+Math.round(jt($t.g*255,0,255))*256+Math.round(jt($t.b*255,0,255))}getHexString(e=Dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=rt.workingColorSpace){rt.fromWorkingColorSpace($t.copy(this),t);const i=$t.r,s=$t.g,r=$t.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case i:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-i)/d+2;break;case r:c=(i-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=rt.workingColorSpace){return rt.fromWorkingColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=Dt){rt.fromWorkingColorSpace($t.copy(this),e);const t=$t.r,i=$t.g,s=$t.b;return e!==Dt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Wi),this.setHSL(Wi.h+e,Wi.s+t,Wi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Wi),e.getHSL(fa);const i=xo(Wi.h,fa.h,t),s=xo(Wi.s,fa.s,t),r=xo(Wi.l,fa.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const $t=new je;je.NAMES=Bp;let kg=0;class ss extends Fs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:kg++}),this.uuid=Di(),this.name="",this.type="Material",this.blending=pr,this.side=Ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=eu,this.blendDst=tu,this.blendEquation=_s,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=cc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bs,this.stencilZFail=Bs,this.stencilZPass=Bs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==pr&&(i.blending=this.blending),this.side!==Ri&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==eu&&(i.blendSrc=this.blendSrc),this.blendDst!==tu&&(i.blendDst=this.blendDst),this.blendEquation!==_s&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==cc&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Bs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Bs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Bs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class zr extends ss{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=vp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ct=new R,pa=new be;class Kt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ru,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=$n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return gr("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)pa.fromBufferAttribute(this,t),pa.applyMatrix3(e),this.setXY(t,pa.x,pa.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix3(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix4(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyNormalMatrix(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.transformDirection(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=zn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=lt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=zn(t,this.array)),t}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=zn(t,this.array)),t}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=zn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=zn(t,this.array)),t}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),s=lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),s=lt(s,this.array),r=lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ru&&(e.usage=this.usage),e}}class kp extends Kt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Gp extends Kt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class xt extends Kt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Gg=0;const Dn=new ot,fl=new qt,Zs=new R,vn=new li,Zr=new li,Ot=new R;class yt extends Fs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Gg++}),this.uuid=Di(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Op(e)?Gp:kp)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ke().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Dn.makeRotationFromQuaternion(e),this.applyMatrix4(Dn),this}rotateX(e){return Dn.makeRotationX(e),this.applyMatrix4(Dn),this}rotateY(e){return Dn.makeRotationY(e),this.applyMatrix4(Dn),this}rotateZ(e){return Dn.makeRotationZ(e),this.applyMatrix4(Dn),this}translate(e,t,i){return Dn.makeTranslation(e,t,i),this.applyMatrix4(Dn),this}scale(e,t,i){return Dn.makeScale(e,t,i),this.applyMatrix4(Dn),this}lookAt(e){return fl.lookAt(e),fl.updateMatrix(),this.applyMatrix4(fl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zs).negate(),this.translate(Zs.x,Zs.y,Zs.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new xt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new li);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];vn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,vn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,vn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(vn.min),this.boundingBox.expandByPoint(vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Oi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){const i=this.boundingSphere.center;if(vn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Zr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ot.addVectors(vn.min,Zr.min),vn.expandByPoint(Ot),Ot.addVectors(vn.max,Zr.max),vn.expandByPoint(Ot)):(vn.expandByPoint(Zr.min),vn.expandByPoint(Zr.max))}vn.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Ot.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Ot));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ot.fromBufferAttribute(a,l),c&&(Zs.fromBufferAttribute(e,l),Ot.add(Zs)),s=Math.max(s,i.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Kt(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<i.count;I++)a[I]=new R,c[I]=new R;const l=new R,u=new R,d=new R,h=new be,f=new be,g=new be,x=new R,m=new R;function p(I,E,S){l.fromBufferAttribute(i,I),u.fromBufferAttribute(i,E),d.fromBufferAttribute(i,S),h.fromBufferAttribute(r,I),f.fromBufferAttribute(r,E),g.fromBufferAttribute(r,S),u.sub(l),d.sub(l),f.sub(h),g.sub(h);const C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(C),m.copy(d).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(C),a[I].add(x),a[E].add(x),a[S].add(x),c[I].add(m),c[E].add(m),c[S].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let I=0,E=y.length;I<E;++I){const S=y[I],C=S.start,O=S.count;for(let z=C,X=C+O;z<X;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const v=new R,b=new R,L=new R,A=new R;function w(I){L.fromBufferAttribute(s,I),A.copy(L);const E=a[I];v.copy(E),v.sub(L.multiplyScalar(L.dot(E))).normalize(),b.crossVectors(A,E);const C=b.dot(c[I])<0?-1:1;o.setXYZW(I,v.x,v.y,v.z,C)}for(let I=0,E=y.length;I<E;++I){const S=y[I],C=S.start,O=S.count;for(let z=C,X=C+O;z<X;z+=3)w(e.getX(z+0)),w(e.getX(z+1)),w(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Kt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);const s=new R,r=new R,o=new R,a=new R,c=new R,l=new R,u=new R,d=new R;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),x=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,m),a.add(u),c.add(u),l.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,d=a.normalized,h=new l.constructor(c.length*u);let f=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?f=c[x]*a.data.stride+a.offset:f=c[x]*u;for(let p=0;p<u;p++)h[g++]=l[f++]}return new Kt(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new yt,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,i);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,d=l.length;u<d;u++){const h=l[u],f=e(h,i);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const f=l[d];u.push(f.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],d=r[l];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,u=o.length;l<u;l++){const d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const hh=new ot,us=new Xo,ma=new Oi,fh=new R,Js=new R,Qs=new R,$s=new R,pl=new R,ga=new R,xa=new be,va=new be,_a=new be,ph=new R,mh=new R,gh=new R,Ma=new R,ya=new R;class wt extends qt{constructor(e=new yt,t=new zr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){ga.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],d=r[c];u!==0&&(pl.fromBufferAttribute(d,e),o?ga.addScaledVector(pl,u):ga.addScaledVector(pl.sub(t),u))}t.add(ga)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ma.copy(i.boundingSphere),ma.applyMatrix4(r),us.copy(e.ray).recast(e.near),!(ma.containsPoint(us.origin)===!1&&(us.intersectSphere(ma,fh)===null||us.origin.distanceToSquared(fh)>(e.far-e.near)**2))&&(hh.copy(r).invert(),us.copy(e.ray).applyMatrix4(hh),!(i.boundingBox!==null&&us.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,us)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=h.length;g<x;g++){const m=h[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),v=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let b=y,L=v;b<L;b+=3){const A=a.getX(b),w=a.getX(b+1),I=a.getX(b+2);s=Sa(this,p,e,i,l,u,d,A,w,I),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const y=a.getX(m),v=a.getX(m+1),b=a.getX(m+2);s=Sa(this,o,e,i,l,u,d,y,v,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=h.length;g<x;g++){const m=h[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),v=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let b=y,L=v;b<L;b+=3){const A=b,w=b+1,I=b+2;s=Sa(this,p,e,i,l,u,d,A,w,I),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const y=m,v=m+1,b=m+2;s=Sa(this,o,e,i,l,u,d,y,v,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Wg(n,e,t,i,s,r,o,a){let c;if(e.side===en?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,e.side===Ri,a),c===null)return null;ya.copy(a),ya.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(ya);return l<t.near||l>t.far?null:{distance:l,point:ya.clone(),object:n}}function Sa(n,e,t,i,s,r,o,a,c,l){n.getVertexPosition(a,Js),n.getVertexPosition(c,Qs),n.getVertexPosition(l,$s);const u=Wg(n,e,t,i,Js,Qs,$s,Ma);if(u){s&&(xa.fromBufferAttribute(s,a),va.fromBufferAttribute(s,c),_a.fromBufferAttribute(s,l),u.uv=Fn.getInterpolation(Ma,Js,Qs,$s,xa,va,_a,new be)),r&&(xa.fromBufferAttribute(r,a),va.fromBufferAttribute(r,c),_a.fromBufferAttribute(r,l),u.uv1=Fn.getInterpolation(Ma,Js,Qs,$s,xa,va,_a,new be)),o&&(ph.fromBufferAttribute(o,a),mh.fromBufferAttribute(o,c),gh.fromBufferAttribute(o,l),u.normal=Fn.getInterpolation(Ma,Js,Qs,$s,ph,mh,gh,new R),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new R,materialIndex:0};Fn.getNormal(Js,Qs,$s,d.normal),u.face=d}return u}class Yo extends yt{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],d=[];let h=0,f=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,s,o,2),g("x","z","y",1,-1,e,i,-t,s,o,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new xt(l,3)),this.setAttribute("normal",new xt(u,3)),this.setAttribute("uv",new xt(d,2));function g(x,m,p,y,v,b,L,A,w,I,E){const S=b/w,C=L/I,O=b/2,z=L/2,X=A/2,j=w+1,k=I+1;let K=0,G=0;const ne=new R;for(let ce=0;ce<k;ce++){const ue=ce*C-z;for(let Te=0;Te<j;Te++){const Ue=Te*S-O;ne[x]=Ue*y,ne[m]=ue*v,ne[p]=X,l.push(ne.x,ne.y,ne.z),ne[x]=0,ne[m]=0,ne[p]=A>0?1:-1,u.push(ne.x,ne.y,ne.z),d.push(Te/w),d.push(1-ce/I),K+=1}}for(let ce=0;ce<I;ce++)for(let ue=0;ue<w;ue++){const Te=h+ue+j*ce,Ue=h+ue+j*(ce+1),q=h+(ue+1)+j*(ce+1),Y=h+(ue+1)+j*ce;c.push(Te,Ue,Y),c.push(Ue,q,Y),G+=6}a.addGroup(f,G,E),f+=G,h+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Dr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function sn(n){const e={};for(let t=0;t<n.length;t++){const i=Dr(n[t]);for(const s in i)e[s]=i[s]}return e}function Vg(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Wp(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:rt.workingColorSpace}const Gn={clone:Dr,merge:sn};var Xg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _t extends ss{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Xg,this.fragmentShader=Yg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Dr(e.uniforms),this.uniformsGroups=Vg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Vp extends qt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=Ei}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Vi=new R,xh=new be,vh=new be;class Mn extends Vp{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ao*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(go*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ao*2*Math.atan(Math.tan(go*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Vi.x,Vi.y).multiplyScalar(-e/Vi.z),Vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Vi.x,Vi.y).multiplyScalar(-e/Vi.z)}getViewSize(e,t){return this.getViewBounds(e,xh,vh),t.subVectors(vh,xh)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(go*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const er=-90,tr=1;class jg extends qt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Mn(er,tr,e,t);s.layers=this.layers,this.add(s);const r=new Mn(er,tr,e,t);r.layers=this.layers,this.add(r);const o=new Mn(er,tr,e,t);o.layers=this.layers,this.add(o);const a=new Mn(er,tr,e,t);a.layers=this.layers,this.add(a);const c=new Mn(er,tr,e,t);c.layers=this.layers,this.add(c);const l=new Mn(er,tr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===Ei)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===hc)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,c),e.setRenderTarget(i,4,s),e.render(t,l),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Xp extends It{constructor(e,t,i,s,r,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:Sr,super(e,t,i,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class qg extends cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Xp(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Rn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Yo(5,5,5),r=new _t({name:"CubemapFromEquirect",uniforms:Dr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:en,blending:si});r.uniforms.tEquirect.value=t;const o=new wt(s,r),a=t.minFilter;return t.minFilter===bs&&(t.minFilter=Rn),new jg(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}const ml=new R,Kg=new R,Zg=new Ke;class Yi{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=ml.subVectors(i,t).cross(Kg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(ml),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Zg.getNormalMatrix(e),s=this.coplanarPoint(ml).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ds=new Oi,ba=new R;class pd{constructor(e=new Yi,t=new Yi,i=new Yi,s=new Yi,r=new Yi,o=new Yi){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ei){const i=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],u=s[5],d=s[6],h=s[7],f=s[8],g=s[9],x=s[10],m=s[11],p=s[12],y=s[13],v=s[14],b=s[15];if(i[0].setComponents(c-r,h-l,m-f,b-p).normalize(),i[1].setComponents(c+r,h+l,m+f,b+p).normalize(),i[2].setComponents(c+o,h+u,m+g,b+y).normalize(),i[3].setComponents(c-o,h-u,m-g,b-y).normalize(),i[4].setComponents(c-a,h-d,m-x,b-v).normalize(),t===Ei)i[5].setComponents(c+a,h+d,m+x,b+v).normalize();else if(t===hc)i[5].setComponents(a,d,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ds.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ds.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ds)}intersectsSprite(e){return ds.center.set(0,0,0),ds.radius=.7071067811865476,ds.applyMatrix4(e.matrixWorld),this.intersectsSphere(ds)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(ba.x=s.normal.x>0?e.max.x:e.min.x,ba.y=s.normal.y>0?e.max.y:e.min.y,ba.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ba)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Yp(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Jg(n){const e=new WeakMap;function t(a,c){const l=a.array,u=a.usage,d=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,u),a.onUploadCallback();let f;if(l instanceof Float32Array)f=n.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=n.SHORT;else if(l instanceof Uint32Array)f=n.UNSIGNED_INT;else if(l instanceof Int32Array)f=n.INT;else if(l instanceof Int8Array)f=n.BYTE;else if(l instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,c,l){const u=c.array,d=c._updateRange,h=c.updateRanges;if(n.bindBuffer(l,a),d.count===-1&&h.length===0&&n.bufferSubData(l,0,u),h.length!==0){for(let f=0,g=h.length;f<g;f++){const x=h[f];n.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}d.count!==-1&&(n.bufferSubData(l,d.offset*u.BYTES_PER_ELEMENT,u,d.offset,d.count),d.count=-1),c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class jo extends yt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),c=Math.floor(s),l=a+1,u=c+1,d=e/a,h=t/c,f=[],g=[],x=[],m=[];for(let p=0;p<u;p++){const y=p*h-o;for(let v=0;v<l;v++){const b=v*d-r;g.push(b,-y,0),x.push(0,0,1),m.push(v/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<a;y++){const v=y+l*p,b=y+l*(p+1),L=y+1+l*(p+1),A=y+1+l*p;f.push(v,b,A),f.push(b,L,A)}this.setIndex(f),this.setAttribute("position",new xt(g,3)),this.setAttribute("normal",new xt(x,3)),this.setAttribute("uv",new xt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jo(e.width,e.height,e.widthSegments,e.heightSegments)}}var Qg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$g=`#ifdef USE_ALPHAHASH
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
#endif`,e1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,t1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,n1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,i1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,s1=`#ifdef USE_AOMAP
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
#endif`,r1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,o1=`#ifdef USE_BATCHING
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
#endif`,a1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,c1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,l1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,u1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,d1=`#ifdef USE_IRIDESCENCE
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
#endif`,h1=`#ifdef USE_BUMPMAP
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
#endif`,f1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,p1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,m1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,g1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,x1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,v1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,_1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,M1=`#if defined( USE_COLOR_ALPHA )
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
#endif`,y1=`#define PI 3.141592653589793
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
} // validated`,S1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,b1=`vec3 transformedNormal = objectNormal;
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
#endif`,E1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,T1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,A1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,D1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,w1="gl_FragColor = linearToOutputTexel( gl_FragColor );",P1=`
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
}`,C1=`#ifdef USE_ENVMAP
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
#endif`,R1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,L1=`#ifdef USE_ENVMAP
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
#endif`,I1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,H1=`#ifdef USE_ENVMAP
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
#endif`,U1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,N1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,O1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,z1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,F1=`#ifdef USE_GRADIENTMAP
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
}`,B1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,k1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,G1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,W1=`uniform bool receiveShadow;
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
#endif`,V1=`#ifdef USE_ENVMAP
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
#endif`,X1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Y1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,j1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,q1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,K1=`PhysicalMaterial material;
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
#endif`,Z1=`struct PhysicalMaterial {
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
}`,J1=`
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
#endif`,Q1=`#if defined( RE_IndirectDiffuse )
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
#endif`,$1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,e2=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,t2=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,n2=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,i2=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,s2=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,r2=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,o2=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,a2=`#if defined( USE_POINTS_UV )
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
#endif`,c2=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,l2=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,u2=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,d2=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,h2=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,f2=`#ifdef USE_MORPHTARGETS
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
#endif`,p2=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,m2=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,g2=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,x2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,v2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_2=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,M2=`#ifdef USE_NORMALMAP
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
#endif`,y2=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,S2=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,b2=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,E2=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,T2=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,A2=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,D2=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,w2=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,P2=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,C2=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,R2=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,L2=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,I2=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,H2=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,U2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,N2=`float getShadowMask() {
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
}`,O2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,z2=`#ifdef USE_SKINNING
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
#endif`,F2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,B2=`#ifdef USE_SKINNING
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
#endif`,k2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,G2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,W2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,V2=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,X2=`#ifdef USE_TRANSMISSION
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
#endif`,Y2=`#ifdef USE_TRANSMISSION
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
#endif`,j2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,q2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,K2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Z2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const J2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Q2=`uniform sampler2D t2D;
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
}`,$2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ex=`#ifdef ENVMAP_TYPE_CUBE
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
}`,tx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ix=`#include <common>
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
}`,sx=`#if DEPTH_PACKING == 3200
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
}`,rx=`#define DISTANCE
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
}`,ox=`#define DISTANCE
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
}`,ax=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lx=`uniform float scale;
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
}`,ux=`uniform vec3 diffuse;
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
}`,dx=`#include <common>
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
}`,hx=`uniform vec3 diffuse;
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
}`,fx=`#define LAMBERT
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
}`,px=`#define LAMBERT
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
}`,mx=`#define MATCAP
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
}`,gx=`#define MATCAP
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
}`,xx=`#define NORMAL
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
}`,vx=`#define NORMAL
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
}`,_x=`#define PHONG
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
}`,Mx=`#define PHONG
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
}`,yx=`#define STANDARD
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
}`,Sx=`#define STANDARD
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
}`,bx=`#define TOON
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
}`,Ex=`#define TOON
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
}`,Tx=`uniform float size;
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
}`,Ax=`uniform vec3 diffuse;
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
}`,Dx=`#include <common>
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
}`,wx=`uniform vec3 color;
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
}`,Px=`uniform float rotation;
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
}`,Cx=`uniform vec3 diffuse;
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
}`,qe={alphahash_fragment:Qg,alphahash_pars_fragment:$g,alphamap_fragment:e1,alphamap_pars_fragment:t1,alphatest_fragment:n1,alphatest_pars_fragment:i1,aomap_fragment:s1,aomap_pars_fragment:r1,batching_pars_vertex:o1,batching_vertex:a1,begin_vertex:c1,beginnormal_vertex:l1,bsdfs:u1,iridescence_fragment:d1,bumpmap_pars_fragment:h1,clipping_planes_fragment:f1,clipping_planes_pars_fragment:p1,clipping_planes_pars_vertex:m1,clipping_planes_vertex:g1,color_fragment:x1,color_pars_fragment:v1,color_pars_vertex:_1,color_vertex:M1,common:y1,cube_uv_reflection_fragment:S1,defaultnormal_vertex:b1,displacementmap_pars_vertex:E1,displacementmap_vertex:T1,emissivemap_fragment:A1,emissivemap_pars_fragment:D1,colorspace_fragment:w1,colorspace_pars_fragment:P1,envmap_fragment:C1,envmap_common_pars_fragment:R1,envmap_pars_fragment:L1,envmap_pars_vertex:I1,envmap_physical_pars_fragment:V1,envmap_vertex:H1,fog_vertex:U1,fog_pars_vertex:N1,fog_fragment:O1,fog_pars_fragment:z1,gradientmap_pars_fragment:F1,lightmap_pars_fragment:B1,lights_lambert_fragment:k1,lights_lambert_pars_fragment:G1,lights_pars_begin:W1,lights_toon_fragment:X1,lights_toon_pars_fragment:Y1,lights_phong_fragment:j1,lights_phong_pars_fragment:q1,lights_physical_fragment:K1,lights_physical_pars_fragment:Z1,lights_fragment_begin:J1,lights_fragment_maps:Q1,lights_fragment_end:$1,logdepthbuf_fragment:e2,logdepthbuf_pars_fragment:t2,logdepthbuf_pars_vertex:n2,logdepthbuf_vertex:i2,map_fragment:s2,map_pars_fragment:r2,map_particle_fragment:o2,map_particle_pars_fragment:a2,metalnessmap_fragment:c2,metalnessmap_pars_fragment:l2,morphinstance_vertex:u2,morphcolor_vertex:d2,morphnormal_vertex:h2,morphtarget_pars_vertex:f2,morphtarget_vertex:p2,normal_fragment_begin:m2,normal_fragment_maps:g2,normal_pars_fragment:x2,normal_pars_vertex:v2,normal_vertex:_2,normalmap_pars_fragment:M2,clearcoat_normal_fragment_begin:y2,clearcoat_normal_fragment_maps:S2,clearcoat_pars_fragment:b2,iridescence_pars_fragment:E2,opaque_fragment:T2,packing:A2,premultiplied_alpha_fragment:D2,project_vertex:w2,dithering_fragment:P2,dithering_pars_fragment:C2,roughnessmap_fragment:R2,roughnessmap_pars_fragment:L2,shadowmap_pars_fragment:I2,shadowmap_pars_vertex:H2,shadowmap_vertex:U2,shadowmask_pars_fragment:N2,skinbase_vertex:O2,skinning_pars_vertex:z2,skinning_vertex:F2,skinnormal_vertex:B2,specularmap_fragment:k2,specularmap_pars_fragment:G2,tonemapping_fragment:W2,tonemapping_pars_fragment:V2,transmission_fragment:X2,transmission_pars_fragment:Y2,uv_pars_fragment:j2,uv_pars_vertex:q2,uv_vertex:K2,worldpos_vertex:Z2,background_vert:J2,background_frag:Q2,backgroundCube_vert:$2,backgroundCube_frag:ex,cube_vert:tx,cube_frag:nx,depth_vert:ix,depth_frag:sx,distanceRGBA_vert:rx,distanceRGBA_frag:ox,equirect_vert:ax,equirect_frag:cx,linedashed_vert:lx,linedashed_frag:ux,meshbasic_vert:dx,meshbasic_frag:hx,meshlambert_vert:fx,meshlambert_frag:px,meshmatcap_vert:mx,meshmatcap_frag:gx,meshnormal_vert:xx,meshnormal_frag:vx,meshphong_vert:_x,meshphong_frag:Mx,meshphysical_vert:yx,meshphysical_frag:Sx,meshtoon_vert:bx,meshtoon_frag:Ex,points_vert:Tx,points_frag:Ax,shadow_vert:Dx,shadow_frag:wx,sprite_vert:Px,sprite_frag:Cx},ge={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},fn={basic:{uniforms:sn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:sn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new je(0)}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:sn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:sn([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:sn([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new je(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:sn([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:sn([ge.points,ge.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:sn([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:sn([ge.common,ge.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:sn([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:sn([ge.sprite,ge.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distanceRGBA:{uniforms:sn([ge.common,ge.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distanceRGBA_vert,fragmentShader:qe.distanceRGBA_frag},shadow:{uniforms:sn([ge.lights,ge.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};fn.physical={uniforms:sn([fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const Ea={r:0,b:0,g:0},hs=new Vn,Rx=new ot;function Lx(n,e,t,i,s,r,o){const a=new je(0);let c=r===!0?0:1,l,u,d=null,h=0,f=null;function g(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?t:e).get(v)),v}function x(y){let v=!1;const b=g(y);b===null?p(a,c):b&&b.isColor&&(p(b,1),v=!0);const L=n.xr.getEnvironmentBlendMode();L==="additive"?i.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(y,v){const b=g(v);b&&(b.isCubeTexture||b.mapping===Ic)?(u===void 0&&(u=new wt(new Yo(1,1,1),new _t({name:"BackgroundCubeMaterial",uniforms:Dr(fn.backgroundCube.uniforms),vertexShader:fn.backgroundCube.vertexShader,fragmentShader:fn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(L,A,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),hs.copy(v.backgroundRotation),hs.x*=-1,hs.y*=-1,hs.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(hs.y*=-1,hs.z*=-1),u.material.uniforms.envMap.value=b,u.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Rx.makeRotationFromEuler(hs)),u.material.toneMapped=rt.getTransfer(b.colorSpace)!==mt,(d!==b||h!==b.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,d=b,h=b.version,f=n.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new wt(new jo(2,2),new _t({name:"BackgroundMaterial",uniforms:Dr(fn.background.uniforms),vertexShader:fn.background.vertexShader,fragmentShader:fn.background.fragmentShader,side:Ri,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=rt.getTransfer(b.colorSpace)!==mt,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||h!==b.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,d=b,h=b.version,f=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,v){y.getRGB(Ea,Wp(n)),i.buffers.color.setClear(Ea.r,Ea.g,Ea.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(y,v=1){a.set(y),c=v,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(a,c)},render:x,addToRenderList:m}}function Ix(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,o=!1;function a(S,C,O,z,X){let j=!1;const k=d(z,O,C);r!==k&&(r=k,l(r.object)),j=f(S,z,O,X),j&&g(S,z,O,X),X!==null&&e.update(X,n.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,b(S,C,O,z),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function c(){return n.createVertexArray()}function l(S){return n.bindVertexArray(S)}function u(S){return n.deleteVertexArray(S)}function d(S,C,O){const z=O.wireframe===!0;let X=i[S.id];X===void 0&&(X={},i[S.id]=X);let j=X[C.id];j===void 0&&(j={},X[C.id]=j);let k=j[z];return k===void 0&&(k=h(c()),j[z]=k),k}function h(S){const C=[],O=[],z=[];for(let X=0;X<t;X++)C[X]=0,O[X]=0,z[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:O,attributeDivisors:z,object:S,attributes:{},index:null}}function f(S,C,O,z){const X=r.attributes,j=C.attributes;let k=0;const K=O.getAttributes();for(const G in K)if(K[G].location>=0){const ce=X[G];let ue=j[G];if(ue===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(ue=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(ue=S.instanceColor)),ce===void 0||ce.attribute!==ue||ue&&ce.data!==ue.data)return!0;k++}return r.attributesNum!==k||r.index!==z}function g(S,C,O,z){const X={},j=C.attributes;let k=0;const K=O.getAttributes();for(const G in K)if(K[G].location>=0){let ce=j[G];ce===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(ce=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(ce=S.instanceColor));const ue={};ue.attribute=ce,ce&&ce.data&&(ue.data=ce.data),X[G]=ue,k++}r.attributes=X,r.attributesNum=k,r.index=z}function x(){const S=r.newAttributes;for(let C=0,O=S.length;C<O;C++)S[C]=0}function m(S){p(S,0)}function p(S,C){const O=r.newAttributes,z=r.enabledAttributes,X=r.attributeDivisors;O[S]=1,z[S]===0&&(n.enableVertexAttribArray(S),z[S]=1),X[S]!==C&&(n.vertexAttribDivisor(S,C),X[S]=C)}function y(){const S=r.newAttributes,C=r.enabledAttributes;for(let O=0,z=C.length;O<z;O++)C[O]!==S[O]&&(n.disableVertexAttribArray(O),C[O]=0)}function v(S,C,O,z,X,j,k){k===!0?n.vertexAttribIPointer(S,C,O,X,j):n.vertexAttribPointer(S,C,O,z,X,j)}function b(S,C,O,z){x();const X=z.attributes,j=O.getAttributes(),k=C.defaultAttributeValues;for(const K in j){const G=j[K];if(G.location>=0){let ne=X[K];if(ne===void 0&&(K==="instanceMatrix"&&S.instanceMatrix&&(ne=S.instanceMatrix),K==="instanceColor"&&S.instanceColor&&(ne=S.instanceColor)),ne!==void 0){const ce=ne.normalized,ue=ne.itemSize,Te=e.get(ne);if(Te===void 0)continue;const Ue=Te.buffer,q=Te.type,Y=Te.bytesPerElement,te=q===n.INT||q===n.UNSIGNED_INT||ne.gpuType===sd;if(ne.isInterleavedBufferAttribute){const ae=ne.data,ve=ae.stride,De=ne.offset;if(ae.isInstancedInterleavedBuffer){for(let Ee=0;Ee<G.locationSize;Ee++)p(G.location+Ee,ae.meshPerAttribute);S.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Ee=0;Ee<G.locationSize;Ee++)m(G.location+Ee);n.bindBuffer(n.ARRAY_BUFFER,Ue);for(let Ee=0;Ee<G.locationSize;Ee++)v(G.location+Ee,ue/G.locationSize,q,ce,ve*Y,(De+ue/G.locationSize*Ee)*Y,te)}else{if(ne.isInstancedBufferAttribute){for(let ae=0;ae<G.locationSize;ae++)p(G.location+ae,ne.meshPerAttribute);S.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let ae=0;ae<G.locationSize;ae++)m(G.location+ae);n.bindBuffer(n.ARRAY_BUFFER,Ue);for(let ae=0;ae<G.locationSize;ae++)v(G.location+ae,ue/G.locationSize,q,ce,ue*Y,ue/G.locationSize*ae*Y,te)}}else if(k!==void 0){const ce=k[K];if(ce!==void 0)switch(ce.length){case 2:n.vertexAttrib2fv(G.location,ce);break;case 3:n.vertexAttrib3fv(G.location,ce);break;case 4:n.vertexAttrib4fv(G.location,ce);break;default:n.vertexAttrib1fv(G.location,ce)}}}}y()}function L(){I();for(const S in i){const C=i[S];for(const O in C){const z=C[O];for(const X in z)u(z[X].object),delete z[X];delete C[O]}delete i[S]}}function A(S){if(i[S.id]===void 0)return;const C=i[S.id];for(const O in C){const z=C[O];for(const X in z)u(z[X].object),delete z[X];delete C[O]}delete i[S.id]}function w(S){for(const C in i){const O=i[C];if(O[S.id]===void 0)continue;const z=O[S.id];for(const X in z)u(z[X].object),delete z[X];delete O[S.id]}}function I(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:E,dispose:L,releaseStatesOfGeometry:A,releaseStatesOfProgram:w,initAttributes:x,enableAttribute:m,disableUnusedAttributes:y}}function Hx(n,e,t){let i;function s(l){i=l}function r(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function o(l,u,d){d!==0&&(n.drawArraysInstanced(i,l,u,d),t.update(u,i,d))}function a(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let f=0;for(let g=0;g<d;g++)f+=u[g];t.update(f,i,1)}function c(l,u,d,h){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],u[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(i,l,0,u,0,h,0,d);let g=0;for(let x=0;x<d;x++)g+=u[x];for(let x=0;x<h.length;x++)t.update(g,i,h[x])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Ux(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==Bn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const w=A===bn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Li&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==$n&&!w)}function c(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),b=f>0,L=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,maxTextures:h,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:x,maxAttributes:m,maxVertexUniforms:p,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:b,maxSamples:L}}function Nx(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new Yi,a=new Ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||i!==0||s;return s=h,i=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{const y=r?0:i,v=y*4;let b=p.clippingState||null;c.value=b,b=u(g,h,v,f);for(let L=0;L!==v;++L)b[L]=t[L];p.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,f,g){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=c.value,g!==!0||m===null){const p=f+x*4,y=h.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,b=f;v!==x;++v,b+=4)o.copy(d[v]).applyMatrix4(y,a),o.normal.toArray(m,b),m[b+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Ox(n){let e=new WeakMap;function t(o,a){return a===nu?o.mapping=Sr:a===iu&&(o.mapping=br),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===nu||a===iu)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new qg(c.height);return l.fromEquirectangularTexture(n,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class jp extends Vp{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ur=4,_h=[.125,.215,.35,.446,.526,.582],Ms=20,gl=new jp,Mh=new je;let xl=null,vl=0,_l=0,Ml=!1;const xs=(1+Math.sqrt(5))/2,nr=1/xs,yh=[new R(-xs,nr,0),new R(xs,nr,0),new R(-nr,0,xs),new R(nr,0,xs),new R(0,xs,-nr),new R(0,xs,nr),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)];class Sh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){xl=this._renderer.getRenderTarget(),vl=this._renderer.getActiveCubeFace(),_l=this._renderer.getActiveMipmapLevel(),Ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Th(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Eh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(xl,vl,_l),this._renderer.xr.enabled=Ml,e.scissorTest=!1,Ta(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Sr||e.mapping===br?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),xl=this._renderer.getRenderTarget(),vl=this._renderer.getActiveCubeFace(),_l=this._renderer.getActiveMipmapLevel(),Ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Rn,minFilter:Rn,generateMipmaps:!1,type:bn,format:Bn,colorSpace:is,depthBuffer:!1},s=bh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bh(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=zx(r)),this._blurMaterial=Fx(r,e,t)}return s}_compileMaterial(e){const t=new wt(this._lodPlanes[0],e);this._renderer.compile(t,gl)}_sceneToCubeUV(e,t,i,s){const a=new Mn(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(Mh),u.toneMapping=Ji,u.autoClear=!1;const f=new zr({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1}),g=new wt(new Yo,f);let x=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,x=!0):(f.color.copy(Mh),x=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):y===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const v=this._cubeSize;Ta(s,y*v,p>2?v:0,v,v),u.setRenderTarget(s),x&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Sr||e.mapping===br;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Th()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Eh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new wt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;Ta(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,gl)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=yh[(s-r-1)%yh.length];this._blur(e,r-1,r,o,a)}t.autoClear=i}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new wt(this._lodPlanes[s],l),h=l.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ms-1),x=r/g,m=isFinite(r)?1+Math.floor(u*x):Ms;m>Ms&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ms}`);const p=[];let y=0;for(let w=0;w<Ms;++w){const I=w/x,E=Math.exp(-I*I/2);p.push(E),w===0?y+=E:w<m&&(y+=2*E)}for(let w=0;w<p.length;w++)p[w]=p[w]/y;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:v}=this;h.dTheta.value=g,h.mipInt.value=v-i;const b=this._sizeLods[s],L=3*b*(s>v-ur?s-v+ur:0),A=4*(this._cubeSize-b);Ta(t,L,A,3*b,2*b),c.setRenderTarget(t),c.render(d,gl)}}function zx(n){const e=[],t=[],i=[];let s=n;const r=n-ur+1+_h.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>n-ur?c=_h[o-n+ur-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,x=3,m=2,p=1,y=new Float32Array(x*g*f),v=new Float32Array(m*g*f),b=new Float32Array(p*g*f);for(let A=0;A<f;A++){const w=A%3*2/3-1,I=A>2?0:-1,E=[w,I,0,w+2/3,I,0,w+2/3,I+1,0,w,I,0,w+2/3,I+1,0,w,I+1,0];y.set(E,x*g*A),v.set(h,m*g*A);const S=[A,A,A,A,A,A];b.set(S,p*g*A)}const L=new yt;L.setAttribute("position",new Kt(y,x)),L.setAttribute("uv",new Kt(v,m)),L.setAttribute("faceIndex",new Kt(b,p)),e.push(L),s>ur&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function bh(n,e,t){const i=new cn(n,e,t);return i.texture.mapping=Ic,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ta(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Fx(n,e,t){const i=new Float32Array(Ms),s=new R(0,1,0);return new _t({name:"SphericalGaussianBlur",defines:{n:Ms,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:md(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function Eh(){return new _t({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:md(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function Th(){return new _t({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:md(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function md(){return`

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
	`}function Bx(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===nu||c===iu,u=c===Sr||c===br;if(l||u){let d=e.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new Sh(n)),d=l?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const f=a.image;return l&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new Sh(n)),d=l?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function kx(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&gr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Gx(n,e,t,i){const s={},r=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const x=h.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)e.remove(x[m])}h.removeEventListener("dispose",o),delete s[h.id];const f=r.get(h);f&&(e.remove(f),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,t.memory.geometries++),h}function c(d){const h=d.attributes;for(const g in h)e.update(h[g],n.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const x=f[g];for(let m=0,p=x.length;m<p;m++)e.update(x[m],n.ARRAY_BUFFER)}}function l(d){const h=[],f=d.index,g=d.attributes.position;let x=0;if(f!==null){const y=f.array;x=f.version;for(let v=0,b=y.length;v<b;v+=3){const L=y[v+0],A=y[v+1],w=y[v+2];h.push(L,A,A,w,w,L)}}else if(g!==void 0){const y=g.array;x=g.version;for(let v=0,b=y.length/3-1;v<b;v+=3){const L=v+0,A=v+1,w=v+2;h.push(L,A,A,w,w,L)}}else return;const m=new(Op(h)?Gp:kp)(h,1);m.version=x;const p=r.get(d);p&&e.remove(p),r.set(d,m)}function u(d){const h=r.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function Wx(n,e,t){let i;function s(h){i=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function c(h,f){n.drawElements(i,f,r,h*o),t.update(f,i,1)}function l(h,f,g){g!==0&&(n.drawElementsInstanced(i,f,r,h*o,g),t.update(f,i,g))}function u(h,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,h,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,i,1)}function d(h,f,g,x){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)l(h[p]/o,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,r,h,0,x,0,g);let p=0;for(let y=0;y<g;y++)p+=f[y];for(let y=0;y<x.length;y++)t.update(p,i,x[y])}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Vx(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Xx(n,e,t){const i=new WeakMap,s=new ct;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==d){let S=function(){I.dispose(),i.delete(a),a.removeEventListener("dispose",S)};var f=S;h!==void 0&&h.texture.dispose();const g=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let b=0;g===!0&&(b=1),x===!0&&(b=2),m===!0&&(b=3);let L=a.attributes.position.count*b,A=1;L>e.maxTextureSize&&(A=Math.ceil(L/e.maxTextureSize),L=e.maxTextureSize);const w=new Float32Array(L*A*4*d),I=new Fp(w,L,A,d);I.type=$n,I.needsUpdate=!0;const E=b*4;for(let C=0;C<d;C++){const O=p[C],z=y[C],X=v[C],j=L*A*4*C;for(let k=0;k<O.count;k++){const K=k*E;g===!0&&(s.fromBufferAttribute(O,k),w[j+K+0]=s.x,w[j+K+1]=s.y,w[j+K+2]=s.z,w[j+K+3]=0),x===!0&&(s.fromBufferAttribute(z,k),w[j+K+4]=s.x,w[j+K+5]=s.y,w[j+K+6]=s.z,w[j+K+7]=0),m===!0&&(s.fromBufferAttribute(X,k),w[j+K+8]=s.x,w[j+K+9]=s.y,w[j+K+10]=s.z,w[j+K+11]=X.itemSize===4?s.w:1)}}h={count:d,texture:I,size:new be(L,A)},i.set(a,h),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const x=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function Yx(n,e,t,i){let s=new WeakMap;function r(c){const l=i.render.frame,u=c.geometry,d=e.get(c,u);if(s.get(d)!==l&&(e.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;s.get(h)!==l&&(h.update(),s.set(h,l))}return d}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class qp extends It{constructor(e,t,i,s,r,o,a,c,l,u=mr){if(u!==mr&&u!==Ar)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===mr&&(i=Cs),i===void 0&&u===Ar&&(i=Tr),super(null,s,r,o,a,c,u,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:kt,this.minFilter=c!==void 0?c:kt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Kp=new It,Ah=new qp(1,1),Zp=new Fp,Jp=new Ig,Qp=new Xp,Dh=[],wh=[],Ph=new Float32Array(16),Ch=new Float32Array(9),Rh=new Float32Array(4);function Fr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Dh[s];if(r===void 0&&(r=new Float32Array(s),Dh[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function Ht(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ut(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Uc(n,e){let t=wh[e];t===void 0&&(t=new Int32Array(e),wh[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function jx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function qx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;n.uniform2fv(this.addr,e),Ut(t,e)}}function Kx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;n.uniform3fv(this.addr,e),Ut(t,e)}}function Zx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;n.uniform4fv(this.addr,e),Ut(t,e)}}function Jx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ht(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(Ht(t,i))return;Rh.set(i),n.uniformMatrix2fv(this.addr,!1,Rh),Ut(t,i)}}function Qx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ht(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(Ht(t,i))return;Ch.set(i),n.uniformMatrix3fv(this.addr,!1,Ch),Ut(t,i)}}function $x(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ht(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(Ht(t,i))return;Ph.set(i),n.uniformMatrix4fv(this.addr,!1,Ph),Ut(t,i)}}function ev(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function tv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;n.uniform2iv(this.addr,e),Ut(t,e)}}function nv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;n.uniform3iv(this.addr,e),Ut(t,e)}}function iv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;n.uniform4iv(this.addr,e),Ut(t,e)}}function sv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function rv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;n.uniform2uiv(this.addr,e),Ut(t,e)}}function ov(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;n.uniform3uiv(this.addr,e),Ut(t,e)}}function av(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;n.uniform4uiv(this.addr,e),Ut(t,e)}}function cv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Ah.compareFunction=Np,r=Ah):r=Kp,t.setTexture2D(e||r,s)}function lv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Jp,s)}function uv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Qp,s)}function dv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Zp,s)}function hv(n){switch(n){case 5126:return jx;case 35664:return qx;case 35665:return Kx;case 35666:return Zx;case 35674:return Jx;case 35675:return Qx;case 35676:return $x;case 5124:case 35670:return ev;case 35667:case 35671:return tv;case 35668:case 35672:return nv;case 35669:case 35673:return iv;case 5125:return sv;case 36294:return rv;case 36295:return ov;case 36296:return av;case 35678:case 36198:case 36298:case 36306:case 35682:return cv;case 35679:case 36299:case 36307:return lv;case 35680:case 36300:case 36308:case 36293:return uv;case 36289:case 36303:case 36311:case 36292:return dv}}function fv(n,e){n.uniform1fv(this.addr,e)}function pv(n,e){const t=Fr(e,this.size,2);n.uniform2fv(this.addr,t)}function mv(n,e){const t=Fr(e,this.size,3);n.uniform3fv(this.addr,t)}function gv(n,e){const t=Fr(e,this.size,4);n.uniform4fv(this.addr,t)}function xv(n,e){const t=Fr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function vv(n,e){const t=Fr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function _v(n,e){const t=Fr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Mv(n,e){n.uniform1iv(this.addr,e)}function yv(n,e){n.uniform2iv(this.addr,e)}function Sv(n,e){n.uniform3iv(this.addr,e)}function bv(n,e){n.uniform4iv(this.addr,e)}function Ev(n,e){n.uniform1uiv(this.addr,e)}function Tv(n,e){n.uniform2uiv(this.addr,e)}function Av(n,e){n.uniform3uiv(this.addr,e)}function Dv(n,e){n.uniform4uiv(this.addr,e)}function wv(n,e,t){const i=this.cache,s=e.length,r=Uc(t,s);Ht(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Kp,r[o])}function Pv(n,e,t){const i=this.cache,s=e.length,r=Uc(t,s);Ht(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Jp,r[o])}function Cv(n,e,t){const i=this.cache,s=e.length,r=Uc(t,s);Ht(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Qp,r[o])}function Rv(n,e,t){const i=this.cache,s=e.length,r=Uc(t,s);Ht(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Zp,r[o])}function Lv(n){switch(n){case 5126:return fv;case 35664:return pv;case 35665:return mv;case 35666:return gv;case 35674:return xv;case 35675:return vv;case 35676:return _v;case 5124:case 35670:return Mv;case 35667:case 35671:return yv;case 35668:case 35672:return Sv;case 35669:case 35673:return bv;case 5125:return Ev;case 36294:return Tv;case 36295:return Av;case 36296:return Dv;case 35678:case 36198:case 36298:case 36306:case 35682:return wv;case 35679:case 36299:case 36307:return Pv;case 35680:case 36300:case 36308:case 36293:return Cv;case 36289:case 36303:case 36311:case 36292:return Rv}}class Iv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=hv(t.type)}}class Hv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Lv(t.type)}}class Uv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const yl=/(\w+)(\])?(\[|\.)?/g;function Lh(n,e){n.seq.push(e),n.map[e.id]=e}function Nv(n,e,t){const i=n.name,s=i.length;for(yl.lastIndex=0;;){const r=yl.exec(i),o=yl.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Lh(t,l===void 0?new Iv(a,n,e):new Hv(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new Uv(a),Lh(t,d)),t=d}}}class tc{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Nv(r,o,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function Ih(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Ov=37297;let zv=0;function Fv(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function Bv(n){const e=rt.getPrimaries(rt.workingColorSpace),t=rt.getPrimaries(n);let i;switch(e===t?i="":e===dc&&t===uc?i="LinearDisplayP3ToLinearSRGB":e===uc&&t===dc&&(i="LinearSRGBToLinearDisplayP3"),n){case is:case Hc:return[i,"LinearTransferOETF"];case Dt:case dd:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Hh(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Fv(n.getShaderSource(e),o)}else return s}function kv(n,e){const t=Bv(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Gv(n,e){let t;switch(e){case _p:t="Linear";break;case Mp:t="Reinhard";break;case yp:t="Cineon";break;case id:t="ACESFilmic";break;case Sp:t="AgX";break;case bp:t="Neutral";break;case Q0:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Aa=new R;function Wv(){rt.getLuminanceCoefficients(Aa);const n=Aa.x.toFixed(4),e=Aa.y.toFixed(4),t=Aa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Vv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ao).join(`
`)}function Xv(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Yv(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function ao(n){return n!==""}function Uh(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Nh(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const jv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lu(n){return n.replace(jv,Kv)}const qv=new Map;function Kv(n,e){let t=qe[e];if(t===void 0){const i=qv.get(e);if(i!==void 0)t=qe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Lu(t)}const Zv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Oh(n){return n.replace(Zv,Jv)}function Jv(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function zh(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function Qv(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===gp?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===xp?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===yi&&(e="SHADOWMAP_TYPE_VSM"),e}function $v(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Sr:case br:e="ENVMAP_TYPE_CUBE";break;case Ic:e="ENVMAP_TYPE_CUBE_UV";break}return e}function e_(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case br:e="ENVMAP_MODE_REFRACTION";break}return e}function t_(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case vp:e="ENVMAP_BLENDING_MULTIPLY";break;case Z0:e="ENVMAP_BLENDING_MIX";break;case J0:e="ENVMAP_BLENDING_ADD";break}return e}function n_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function i_(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Qv(t),l=$v(t),u=e_(t),d=t_(t),h=n_(t),f=Vv(t),g=Xv(r),x=s.createProgram();let m,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ao).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ao).join(`
`),p.length>0&&(p+=`
`)):(m=[zh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ao).join(`
`),p=[zh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ji?"#define TONE_MAPPING":"",t.toneMapping!==Ji?qe.tonemapping_pars_fragment:"",t.toneMapping!==Ji?Gv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,kv("linearToOutputTexel",t.outputColorSpace),Wv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ao).join(`
`)),o=Lu(o),o=Uh(o,t),o=Nh(o,t),a=Lu(a),a=Uh(a,t),a=Nh(a,t),o=Oh(o),a=Oh(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Qd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Qd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=y+m+o,b=y+p+a,L=Ih(s,s.VERTEX_SHADER,v),A=Ih(s,s.FRAGMENT_SHADER,b);s.attachShader(x,L),s.attachShader(x,A),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function w(C){if(n.debug.checkShaderErrors){const O=s.getProgramInfoLog(x).trim(),z=s.getShaderInfoLog(L).trim(),X=s.getShaderInfoLog(A).trim();let j=!0,k=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,L,A);else{const K=Hh(s,L,"vertex"),G=Hh(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+O+`
`+K+`
`+G)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(z===""||X==="")&&(k=!1);k&&(C.diagnostics={runnable:j,programLog:O,vertexShader:{log:z,prefix:m},fragmentShader:{log:X,prefix:p}})}s.deleteShader(L),s.deleteShader(A),I=new tc(s,x),E=Yv(s,x)}let I;this.getUniforms=function(){return I===void 0&&w(this),I};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(x,Ov)),S},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=zv++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=L,this.fragmentShader=A,this}let s_=0;class r_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new o_(e),t.set(e,i)),i}}class o_{constructor(e){this.id=s_++,this.code=e,this.usedTimes=0}}function a_(n,e,t,i,s,r,o){const a=new fd,c=new r_,l=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,S,C,O,z){const X=O.fog,j=z.geometry,k=E.isMeshStandardMaterial?O.environment:null,K=(E.isMeshStandardMaterial?t:e).get(E.envMap||k),G=K&&K.mapping===Ic?K.image.height:null,ne=g[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const ce=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ue=ce!==void 0?ce.length:0;let Te=0;j.morphAttributes.position!==void 0&&(Te=1),j.morphAttributes.normal!==void 0&&(Te=2),j.morphAttributes.color!==void 0&&(Te=3);let Ue,q,Y,te;if(ne){const Xe=fn[ne];Ue=Xe.vertexShader,q=Xe.fragmentShader}else Ue=E.vertexShader,q=E.fragmentShader,c.update(E),Y=c.getVertexShaderID(E),te=c.getFragmentShaderID(E);const ae=n.getRenderTarget(),ve=z.isInstancedMesh===!0,De=z.isBatchedMesh===!0,Ee=!!E.map,Ve=!!E.matcap,P=!!K,Be=!!E.aoMap,Me=!!E.lightMap,Ce=!!E.bumpMap,he=!!E.normalMap,Ie=!!E.displacementMap,fe=!!E.emissiveMap,xe=!!E.metalnessMap,D=!!E.roughnessMap,M=E.anisotropy>0,B=E.clearcoat>0,Z=E.dispersion>0,J=E.iridescence>0,Q=E.sheen>0,Ae=E.transmission>0,re=M&&!!E.anisotropyMap,de=B&&!!E.clearcoatMap,Le=B&&!!E.clearcoatNormalMap,ie=B&&!!E.clearcoatRoughnessMap,me=J&&!!E.iridescenceMap,_=J&&!!E.iridescenceThicknessMap,Re=Q&&!!E.sheenColorMap,pe=Q&&!!E.sheenRoughnessMap,ze=!!E.specularMap,Fe=!!E.specularColorMap,Je=!!E.specularIntensityMap,H=Ae&&!!E.transmissionMap,se=Ae&&!!E.thicknessMap,ee=!!E.gradientMap,$=!!E.alphaMap,le=E.alphaTest>0,Ne=!!E.alphaHash,Ge=!!E.extensions;let Qe=Ji;E.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Qe=n.toneMapping);const ut={shaderID:ne,shaderType:E.type,shaderName:E.name,vertexShader:Ue,fragmentShader:q,defines:E.defines,customVertexShaderID:Y,customFragmentShaderID:te,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:De,batchingColor:De&&z._colorsTexture!==null,instancing:ve,instancingColor:ve&&z.instanceColor!==null,instancingMorph:ve&&z.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ae===null?n.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:is,alphaToCoverage:!!E.alphaToCoverage,map:Ee,matcap:Ve,envMap:P,envMapMode:P&&K.mapping,envMapCubeUVHeight:G,aoMap:Be,lightMap:Me,bumpMap:Ce,normalMap:he,displacementMap:h&&Ie,emissiveMap:fe,normalMapObjectSpace:he&&E.normalMapType===tg,normalMapTangentSpace:he&&E.normalMapType===Up,metalnessMap:xe,roughnessMap:D,anisotropy:M,anisotropyMap:re,clearcoat:B,clearcoatMap:de,clearcoatNormalMap:Le,clearcoatRoughnessMap:ie,dispersion:Z,iridescence:J,iridescenceMap:me,iridescenceThicknessMap:_,sheen:Q,sheenColorMap:Re,sheenRoughnessMap:pe,specularMap:ze,specularColorMap:Fe,specularIntensityMap:Je,transmission:Ae,transmissionMap:H,thicknessMap:se,gradientMap:ee,opaque:E.transparent===!1&&E.blending===pr&&E.alphaToCoverage===!1,alphaMap:$,alphaTest:le,alphaHash:Ne,combine:E.combine,mapUv:Ee&&x(E.map.channel),aoMapUv:Be&&x(E.aoMap.channel),lightMapUv:Me&&x(E.lightMap.channel),bumpMapUv:Ce&&x(E.bumpMap.channel),normalMapUv:he&&x(E.normalMap.channel),displacementMapUv:Ie&&x(E.displacementMap.channel),emissiveMapUv:fe&&x(E.emissiveMap.channel),metalnessMapUv:xe&&x(E.metalnessMap.channel),roughnessMapUv:D&&x(E.roughnessMap.channel),anisotropyMapUv:re&&x(E.anisotropyMap.channel),clearcoatMapUv:de&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:Le&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:_&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:pe&&x(E.sheenRoughnessMap.channel),specularMapUv:ze&&x(E.specularMap.channel),specularColorMapUv:Fe&&x(E.specularColorMap.channel),specularIntensityMapUv:Je&&x(E.specularIntensityMap.channel),transmissionMapUv:H&&x(E.transmissionMap.channel),thicknessMapUv:se&&x(E.thicknessMap.channel),alphaMapUv:$&&x(E.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(he||M),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!j.attributes.uv&&(Ee||$),fog:!!X,useFog:E.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:z.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:ue,morphTextureStride:Te,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:Qe,decodeVideoTexture:Ee&&E.map.isVideoTexture===!0&&rt.getTransfer(E.map.colorSpace)===mt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Cn,flipSided:E.side===en,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Ge&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ge&&E.extensions.multiDraw===!0||De)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return ut.vertexUv1s=l.has(1),ut.vertexUv2s=l.has(2),ut.vertexUv3s=l.has(3),l.clear(),ut}function p(E){const S=[];if(E.shaderID?S.push(E.shaderID):(S.push(E.customVertexShaderID),S.push(E.customFragmentShaderID)),E.defines!==void 0)for(const C in E.defines)S.push(C),S.push(E.defines[C]);return E.isRawShaderMaterial===!1&&(y(S,E),v(S,E),S.push(n.outputColorSpace)),S.push(E.customProgramCacheKey),S.join()}function y(E,S){E.push(S.precision),E.push(S.outputColorSpace),E.push(S.envMapMode),E.push(S.envMapCubeUVHeight),E.push(S.mapUv),E.push(S.alphaMapUv),E.push(S.lightMapUv),E.push(S.aoMapUv),E.push(S.bumpMapUv),E.push(S.normalMapUv),E.push(S.displacementMapUv),E.push(S.emissiveMapUv),E.push(S.metalnessMapUv),E.push(S.roughnessMapUv),E.push(S.anisotropyMapUv),E.push(S.clearcoatMapUv),E.push(S.clearcoatNormalMapUv),E.push(S.clearcoatRoughnessMapUv),E.push(S.iridescenceMapUv),E.push(S.iridescenceThicknessMapUv),E.push(S.sheenColorMapUv),E.push(S.sheenRoughnessMapUv),E.push(S.specularMapUv),E.push(S.specularColorMapUv),E.push(S.specularIntensityMapUv),E.push(S.transmissionMapUv),E.push(S.thicknessMapUv),E.push(S.combine),E.push(S.fogExp2),E.push(S.sizeAttenuation),E.push(S.morphTargetsCount),E.push(S.morphAttributeCount),E.push(S.numDirLights),E.push(S.numPointLights),E.push(S.numSpotLights),E.push(S.numSpotLightMaps),E.push(S.numHemiLights),E.push(S.numRectAreaLights),E.push(S.numDirLightShadows),E.push(S.numPointLightShadows),E.push(S.numSpotLightShadows),E.push(S.numSpotLightShadowsWithMaps),E.push(S.numLightProbes),E.push(S.shadowMapType),E.push(S.toneMapping),E.push(S.numClippingPlanes),E.push(S.numClipIntersection),E.push(S.depthPacking)}function v(E,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.skinning&&a.enable(4),S.morphTargets&&a.enable(5),S.morphNormals&&a.enable(6),S.morphColors&&a.enable(7),S.premultipliedAlpha&&a.enable(8),S.shadowMapEnabled&&a.enable(9),S.doubleSided&&a.enable(10),S.flipSided&&a.enable(11),S.useDepthPacking&&a.enable(12),S.dithering&&a.enable(13),S.transmission&&a.enable(14),S.sheen&&a.enable(15),S.opaque&&a.enable(16),S.pointsUvs&&a.enable(17),S.decodeVideoTexture&&a.enable(18),S.alphaToCoverage&&a.enable(19),E.push(a.mask)}function b(E){const S=g[E.type];let C;if(S){const O=fn[S];C=Gn.clone(O.uniforms)}else C=E.uniforms;return C}function L(E,S){let C;for(let O=0,z=u.length;O<z;O++){const X=u[O];if(X.cacheKey===S){C=X,++C.usedTimes;break}}return C===void 0&&(C=new i_(n,S,E,r),u.push(C)),C}function A(E){if(--E.usedTimes===0){const S=u.indexOf(E);u[S]=u[u.length-1],u.pop(),E.destroy()}}function w(E){c.remove(E)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:b,acquireProgram:L,releaseProgram:A,releaseShaderCache:w,programs:u,dispose:I}}function c_(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function l_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Fh(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Bh(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(d,h,f,g,x,m){let p=n[e];return p===void 0?(p={id:d.id,object:d,geometry:h,material:f,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},n[e]=p):(p.id=d.id,p.object=d,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=x,p.group=m),e++,p}function a(d,h,f,g,x,m){const p=o(d,h,f,g,x,m);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):t.push(p)}function c(d,h,f,g,x,m){const p=o(d,h,f,g,x,m);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function l(d,h){t.length>1&&t.sort(d||l_),i.length>1&&i.sort(h||Fh),s.length>1&&s.sort(h||Fh)}function u(){for(let d=e,h=n.length;d<h;d++){const f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:c,finish:u,sort:l}}function u_(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new Bh,n.set(i,[o])):s>=r.length?(o=new Bh,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function d_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new je};break;case"SpotLight":t={position:new R,direction:new R,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new je,groundColor:new je};break;case"RectAreaLight":t={color:new je,position:new R,halfWidth:new R,halfHeight:new R};break}return n[e.id]=t,t}}}function h_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let f_=0;function p_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function m_(n){const e=new d_,t=h_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new R);const s=new R,r=new ot,o=new ot;function a(l){let u=0,d=0,h=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,y=0,v=0,b=0,L=0,A=0,w=0;l.sort(p_);for(let E=0,S=l.length;E<S;E++){const C=l[E],O=C.color,z=C.intensity,X=C.distance,j=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=O.r*z,d+=O.g*z,h+=O.b*z;else if(C.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(C.sh.coefficients[k],z);w++}else if(C.isDirectionalLight){const k=e.get(C);if(k.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const K=C.shadow,G=t.get(C);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,i.directionalShadow[f]=G,i.directionalShadowMap[f]=j,i.directionalShadowMatrix[f]=C.shadow.matrix,y++}i.directional[f]=k,f++}else if(C.isSpotLight){const k=e.get(C);k.position.setFromMatrixPosition(C.matrixWorld),k.color.copy(O).multiplyScalar(z),k.distance=X,k.coneCos=Math.cos(C.angle),k.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),k.decay=C.decay,i.spot[x]=k;const K=C.shadow;if(C.map&&(i.spotLightMap[L]=C.map,L++,K.updateMatrices(C),C.castShadow&&A++),i.spotLightMatrix[x]=K.matrix,C.castShadow){const G=t.get(C);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,i.spotShadow[x]=G,i.spotShadowMap[x]=j,b++}x++}else if(C.isRectAreaLight){const k=e.get(C);k.color.copy(O).multiplyScalar(z),k.halfWidth.set(C.width*.5,0,0),k.halfHeight.set(0,C.height*.5,0),i.rectArea[m]=k,m++}else if(C.isPointLight){const k=e.get(C);if(k.color.copy(C.color).multiplyScalar(C.intensity),k.distance=C.distance,k.decay=C.decay,C.castShadow){const K=C.shadow,G=t.get(C);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,G.shadowCameraNear=K.camera.near,G.shadowCameraFar=K.camera.far,i.pointShadow[g]=G,i.pointShadowMap[g]=j,i.pointShadowMatrix[g]=C.shadow.matrix,v++}i.point[g]=k,g++}else if(C.isHemisphereLight){const k=e.get(C);k.skyColor.copy(C.color).multiplyScalar(z),k.groundColor.copy(C.groundColor).multiplyScalar(z),i.hemi[p]=k,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ge.LTC_FLOAT_1,i.rectAreaLTC2=ge.LTC_FLOAT_2):(i.rectAreaLTC1=ge.LTC_HALF_1,i.rectAreaLTC2=ge.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const I=i.hash;(I.directionalLength!==f||I.pointLength!==g||I.spotLength!==x||I.rectAreaLength!==m||I.hemiLength!==p||I.numDirectionalShadows!==y||I.numPointShadows!==v||I.numSpotShadows!==b||I.numSpotMaps!==L||I.numLightProbes!==w)&&(i.directional.length=f,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=b+L-A,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=w,I.directionalLength=f,I.pointLength=g,I.spotLength=x,I.rectAreaLength=m,I.hemiLength=p,I.numDirectionalShadows=y,I.numPointShadows=v,I.numSpotShadows=b,I.numSpotMaps=L,I.numLightProbes=w,i.version=f_++)}function c(l,u){let d=0,h=0,f=0,g=0,x=0;const m=u.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){const v=l[p];if(v.isDirectionalLight){const b=i.directional[d];b.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),d++}else if(v.isSpotLight){const b=i.spot[f];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),f++}else if(v.isRectAreaLight){const b=i.rectArea[g];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),b.halfWidth.set(v.width*.5,0,0),b.halfHeight.set(0,v.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const b=i.point[h];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(m),h++}else if(v.isHemisphereLight){const b=i.hemi[x];b.direction.setFromMatrixPosition(v.matrixWorld),b.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:i}}function kh(n){const e=new m_(n),t=[],i=[];function s(u){l.camera=u,t.length=0,i.length=0}function r(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function g_(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new kh(n),e.set(s,[a])):r>=o.length?(a=new kh(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}class $p extends ss{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=eg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class x_ extends ss{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const v_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,__=`uniform sampler2D shadow_pass;
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
}`;function M_(n,e,t){let i=new pd;const s=new be,r=new be,o=new ct,a=new $p({depthPacking:Hp}),c=new x_,l={},u=t.maxTextureSize,d={[Ri]:en,[en]:Ri,[Cn]:Cn},h=new _t({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new be},radius:{value:4}},vertexShader:v_,fragmentShader:__}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new yt;g.setAttribute("position",new Kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new wt(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gp;let p=this.type;this.render=function(A,w,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const E=n.getRenderTarget(),S=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),O=n.state;O.setBlending(si),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const z=p!==yi&&this.type===yi,X=p===yi&&this.type!==yi;for(let j=0,k=A.length;j<k;j++){const K=A[j],G=K.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const ne=G.getFrameExtents();if(s.multiply(ne),r.copy(G.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ne.x),s.x=r.x*ne.x,G.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ne.y),s.y=r.y*ne.y,G.mapSize.y=r.y)),G.map===null||z===!0||X===!0){const ue=this.type!==yi?{minFilter:kt,magFilter:kt}:{};G.map!==null&&G.map.dispose(),G.map=new cn(s.x,s.y,ue),G.map.texture.name=K.name+".shadowMap",G.camera.updateProjectionMatrix()}n.setRenderTarget(G.map),n.clear();const ce=G.getViewportCount();for(let ue=0;ue<ce;ue++){const Te=G.getViewport(ue);o.set(r.x*Te.x,r.y*Te.y,r.x*Te.z,r.y*Te.w),O.viewport(o),G.updateMatrices(K,ue),i=G.getFrustum(),b(w,I,G.camera,K,this.type)}G.isPointLightShadow!==!0&&this.type===yi&&y(G,I),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(E,S,C)};function y(A,w){const I=e.update(x);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new cn(s.x,s.y)),h.uniforms.shadow_pass.value=A.map.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(w,null,I,h,x,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(w,null,I,f,x,null)}function v(A,w,I,E){let S=null;const C=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(C!==void 0)S=C;else if(S=I.isPointLight===!0?c:a,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const O=S.uuid,z=w.uuid;let X=l[O];X===void 0&&(X={},l[O]=X);let j=X[z];j===void 0&&(j=S.clone(),X[z]=j,w.addEventListener("dispose",L)),S=j}if(S.visible=w.visible,S.wireframe=w.wireframe,E===yi?S.side=w.shadowSide!==null?w.shadowSide:w.side:S.side=w.shadowSide!==null?w.shadowSide:d[w.side],S.alphaMap=w.alphaMap,S.alphaTest=w.alphaTest,S.map=w.map,S.clipShadows=w.clipShadows,S.clippingPlanes=w.clippingPlanes,S.clipIntersection=w.clipIntersection,S.displacementMap=w.displacementMap,S.displacementScale=w.displacementScale,S.displacementBias=w.displacementBias,S.wireframeLinewidth=w.wireframeLinewidth,S.linewidth=w.linewidth,I.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const O=n.properties.get(S);O.light=I}return S}function b(A,w,I,E,S){if(A.visible===!1)return;if(A.layers.test(w.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&S===yi)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);const z=e.update(A),X=A.material;if(Array.isArray(X)){const j=z.groups;for(let k=0,K=j.length;k<K;k++){const G=j[k],ne=X[G.materialIndex];if(ne&&ne.visible){const ce=v(A,ne,E,S);A.onBeforeShadow(n,A,w,I,z,ce,G),n.renderBufferDirect(I,null,z,ce,A,G),A.onAfterShadow(n,A,w,I,z,ce,G)}}}else if(X.visible){const j=v(A,X,E,S);A.onBeforeShadow(n,A,w,I,z,j,null),n.renderBufferDirect(I,null,z,j,A,null),A.onAfterShadow(n,A,w,I,z,j,null)}}const O=A.children;for(let z=0,X=O.length;z<X;z++)b(O[z],w,I,E,S)}function L(A){A.target.removeEventListener("dispose",L);for(const I in l){const E=l[I],S=A.target.uuid;S in E&&(E[S].dispose(),delete E[S])}}}function y_(n){function e(){let H=!1;const se=new ct;let ee=null;const $=new ct(0,0,0,0);return{setMask:function(le){ee!==le&&!H&&(n.colorMask(le,le,le,le),ee=le)},setLocked:function(le){H=le},setClear:function(le,Ne,Ge,Qe,ut){ut===!0&&(le*=Qe,Ne*=Qe,Ge*=Qe),se.set(le,Ne,Ge,Qe),$.equals(se)===!1&&(n.clearColor(le,Ne,Ge,Qe),$.copy(se))},reset:function(){H=!1,ee=null,$.set(-1,0,0,0)}}}function t(){let H=!1,se=null,ee=null,$=null;return{setTest:function(le){le?te(n.DEPTH_TEST):ae(n.DEPTH_TEST)},setMask:function(le){se!==le&&!H&&(n.depthMask(le),se=le)},setFunc:function(le){if(ee!==le){switch(le){case W0:n.depthFunc(n.NEVER);break;case V0:n.depthFunc(n.ALWAYS);break;case X0:n.depthFunc(n.LESS);break;case cc:n.depthFunc(n.LEQUAL);break;case Y0:n.depthFunc(n.EQUAL);break;case j0:n.depthFunc(n.GEQUAL);break;case q0:n.depthFunc(n.GREATER);break;case K0:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ee=le}},setLocked:function(le){H=le},setClear:function(le){$!==le&&(n.clearDepth(le),$=le)},reset:function(){H=!1,se=null,ee=null,$=null}}}function i(){let H=!1,se=null,ee=null,$=null,le=null,Ne=null,Ge=null,Qe=null,ut=null;return{setTest:function(Xe){H||(Xe?te(n.STENCIL_TEST):ae(n.STENCIL_TEST))},setMask:function(Xe){se!==Xe&&!H&&(n.stencilMask(Xe),se=Xe)},setFunc:function(Xe,Mt,ht){(ee!==Xe||$!==Mt||le!==ht)&&(n.stencilFunc(Xe,Mt,ht),ee=Xe,$=Mt,le=ht)},setOp:function(Xe,Mt,ht){(Ne!==Xe||Ge!==Mt||Qe!==ht)&&(n.stencilOp(Xe,Mt,ht),Ne=Xe,Ge=Mt,Qe=ht)},setLocked:function(Xe){H=Xe},setClear:function(Xe){ut!==Xe&&(n.clearStencil(Xe),ut=Xe)},reset:function(){H=!1,se=null,ee=null,$=null,le=null,Ne=null,Ge=null,Qe=null,ut=null}}}const s=new e,r=new t,o=new i,a=new WeakMap,c=new WeakMap;let l={},u={},d=new WeakMap,h=[],f=null,g=!1,x=null,m=null,p=null,y=null,v=null,b=null,L=null,A=new je(0,0,0),w=0,I=!1,E=null,S=null,C=null,O=null,z=null;const X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,k=0;const K=n.getParameter(n.VERSION);K.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(K)[1]),j=k>=1):K.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),j=k>=2);let G=null,ne={};const ce=n.getParameter(n.SCISSOR_BOX),ue=n.getParameter(n.VIEWPORT),Te=new ct().fromArray(ce),Ue=new ct().fromArray(ue);function q(H,se,ee,$){const le=new Uint8Array(4),Ne=n.createTexture();n.bindTexture(H,Ne),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ge=0;Ge<ee;Ge++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(se,0,n.RGBA,1,1,$,0,n.RGBA,n.UNSIGNED_BYTE,le):n.texImage2D(se+Ge,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,le);return Ne}const Y={};Y[n.TEXTURE_2D]=q(n.TEXTURE_2D,n.TEXTURE_2D,1),Y[n.TEXTURE_CUBE_MAP]=q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[n.TEXTURE_2D_ARRAY]=q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Y[n.TEXTURE_3D]=q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),te(n.DEPTH_TEST),r.setFunc(cc),Ce(!1),he(qd),te(n.CULL_FACE),Be(si);function te(H){l[H]!==!0&&(n.enable(H),l[H]=!0)}function ae(H){l[H]!==!1&&(n.disable(H),l[H]=!1)}function ve(H,se){return u[H]!==se?(n.bindFramebuffer(H,se),u[H]=se,H===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=se),H===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=se),!0):!1}function De(H,se){let ee=h,$=!1;if(H){ee=d.get(se),ee===void 0&&(ee=[],d.set(se,ee));const le=H.textures;if(ee.length!==le.length||ee[0]!==n.COLOR_ATTACHMENT0){for(let Ne=0,Ge=le.length;Ne<Ge;Ne++)ee[Ne]=n.COLOR_ATTACHMENT0+Ne;ee.length=le.length,$=!0}}else ee[0]!==n.BACK&&(ee[0]=n.BACK,$=!0);$&&n.drawBuffers(ee)}function Ee(H){return f!==H?(n.useProgram(H),f=H,!0):!1}const Ve={[_s]:n.FUNC_ADD,[A0]:n.FUNC_SUBTRACT,[D0]:n.FUNC_REVERSE_SUBTRACT};Ve[w0]=n.MIN,Ve[P0]=n.MAX;const P={[C0]:n.ZERO,[R0]:n.ONE,[L0]:n.SRC_COLOR,[eu]:n.SRC_ALPHA,[z0]:n.SRC_ALPHA_SATURATE,[N0]:n.DST_COLOR,[H0]:n.DST_ALPHA,[I0]:n.ONE_MINUS_SRC_COLOR,[tu]:n.ONE_MINUS_SRC_ALPHA,[O0]:n.ONE_MINUS_DST_COLOR,[U0]:n.ONE_MINUS_DST_ALPHA,[F0]:n.CONSTANT_COLOR,[B0]:n.ONE_MINUS_CONSTANT_COLOR,[k0]:n.CONSTANT_ALPHA,[G0]:n.ONE_MINUS_CONSTANT_ALPHA};function Be(H,se,ee,$,le,Ne,Ge,Qe,ut,Xe){if(H===si){g===!0&&(ae(n.BLEND),g=!1);return}if(g===!1&&(te(n.BLEND),g=!0),H!==T0){if(H!==x||Xe!==I){if((m!==_s||v!==_s)&&(n.blendEquation(n.FUNC_ADD),m=_s,v=_s),Xe)switch(H){case pr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ai:n.blendFunc(n.ONE,n.ONE);break;case Kd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Zd:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case pr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ai:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Kd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Zd:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}p=null,y=null,b=null,L=null,A.set(0,0,0),w=0,x=H,I=Xe}return}le=le||se,Ne=Ne||ee,Ge=Ge||$,(se!==m||le!==v)&&(n.blendEquationSeparate(Ve[se],Ve[le]),m=se,v=le),(ee!==p||$!==y||Ne!==b||Ge!==L)&&(n.blendFuncSeparate(P[ee],P[$],P[Ne],P[Ge]),p=ee,y=$,b=Ne,L=Ge),(Qe.equals(A)===!1||ut!==w)&&(n.blendColor(Qe.r,Qe.g,Qe.b,ut),A.copy(Qe),w=ut),x=H,I=!1}function Me(H,se){H.side===Cn?ae(n.CULL_FACE):te(n.CULL_FACE);let ee=H.side===en;se&&(ee=!ee),Ce(ee),H.blending===pr&&H.transparent===!1?Be(si):Be(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),r.setFunc(H.depthFunc),r.setTest(H.depthTest),r.setMask(H.depthWrite),s.setMask(H.colorWrite);const $=H.stencilWrite;o.setTest($),$&&(o.setMask(H.stencilWriteMask),o.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),o.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),fe(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?te(n.SAMPLE_ALPHA_TO_COVERAGE):ae(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(H){E!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),E=H)}function he(H){H!==b0?(te(n.CULL_FACE),H!==S&&(H===qd?n.cullFace(n.BACK):H===E0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ae(n.CULL_FACE),S=H}function Ie(H){H!==C&&(j&&n.lineWidth(H),C=H)}function fe(H,se,ee){H?(te(n.POLYGON_OFFSET_FILL),(O!==se||z!==ee)&&(n.polygonOffset(se,ee),O=se,z=ee)):ae(n.POLYGON_OFFSET_FILL)}function xe(H){H?te(n.SCISSOR_TEST):ae(n.SCISSOR_TEST)}function D(H){H===void 0&&(H=n.TEXTURE0+X-1),G!==H&&(n.activeTexture(H),G=H)}function M(H,se,ee){ee===void 0&&(G===null?ee=n.TEXTURE0+X-1:ee=G);let $=ne[ee];$===void 0&&($={type:void 0,texture:void 0},ne[ee]=$),($.type!==H||$.texture!==se)&&(G!==ee&&(n.activeTexture(ee),G=ee),n.bindTexture(H,se||Y[H]),$.type=H,$.texture=se)}function B(){const H=ne[G];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function Z(){try{n.compressedTexImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function J(){try{n.compressedTexImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Q(){try{n.texSubImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ae(){try{n.texSubImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function re(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function de(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Le(){try{n.texStorage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ie(){try{n.texStorage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function me(){try{n.texImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function _(){try{n.texImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Re(H){Te.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),Te.copy(H))}function pe(H){Ue.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),Ue.copy(H))}function ze(H,se){let ee=c.get(se);ee===void 0&&(ee=new WeakMap,c.set(se,ee));let $=ee.get(H);$===void 0&&($=n.getUniformBlockIndex(se,H.name),ee.set(H,$))}function Fe(H,se){const $=c.get(se).get(H);a.get(se)!==$&&(n.uniformBlockBinding(se,$,H.__bindingPointIndex),a.set(se,$))}function Je(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),l={},G=null,ne={},u={},d=new WeakMap,h=[],f=null,g=!1,x=null,m=null,p=null,y=null,v=null,b=null,L=null,A=new je(0,0,0),w=0,I=!1,E=null,S=null,C=null,O=null,z=null,Te.set(0,0,n.canvas.width,n.canvas.height),Ue.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:te,disable:ae,bindFramebuffer:ve,drawBuffers:De,useProgram:Ee,setBlending:Be,setMaterial:Me,setFlipSided:Ce,setCullFace:he,setLineWidth:Ie,setPolygonOffset:fe,setScissorTest:xe,activeTexture:D,bindTexture:M,unbindTexture:B,compressedTexImage2D:Z,compressedTexImage3D:J,texImage2D:me,texImage3D:_,updateUBOMapping:ze,uniformBlockBinding:Fe,texStorage2D:Le,texStorage3D:ie,texSubImage2D:Q,texSubImage3D:Ae,compressedTexSubImage2D:re,compressedTexSubImage3D:de,scissor:Re,viewport:pe,reset:Je}}function Gh(n,e,t,i){const s=S_(i);switch(t){case wp:return n*e;case Cp:return n*e;case Rp:return n*e*2;case ad:return n*e/s.components*s.byteLength;case cd:return n*e/s.components*s.byteLength;case Lp:return n*e*2/s.components*s.byteLength;case ld:return n*e*2/s.components*s.byteLength;case Pp:return n*e*3/s.components*s.byteLength;case Bn:return n*e*4/s.components*s.byteLength;case ud:return n*e*4/s.components*s.byteLength;case Za:case Ja:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Qa:case $a:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ou:case cu:return Math.max(n,16)*Math.max(e,8)/4;case ru:case au:return Math.max(n,8)*Math.max(e,8)/2;case lu:case uu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case du:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case hu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case fu:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case pu:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case mu:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case gu:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case xu:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case vu:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case _u:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Mu:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case yu:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Su:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case bu:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Eu:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Tu:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ec:case Au:case Du:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Ip:case wu:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Pu:case Cu:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function S_(n){switch(n){case Li:case Tp:return{byteLength:1,components:1};case To:case Ap:case bn:return{byteLength:2,components:1};case rd:case od:return{byteLength:2,components:4};case Cs:case sd:case $n:return{byteLength:4,components:1};case Dp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function b_(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new be,u=new WeakMap;let d;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(D,M){return f?new OffscreenCanvas(D,M):Do("canvas")}function x(D,M,B){let Z=1;const J=xe(D);if((J.width>B||J.height>B)&&(Z=B/Math.max(J.width,J.height)),Z<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const Q=Math.floor(Z*J.width),Ae=Math.floor(Z*J.height);d===void 0&&(d=g(Q,Ae));const re=M?g(Q,Ae):d;return re.width=Q,re.height=Ae,re.getContext("2d").drawImage(D,0,0,Q,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+Q+"x"+Ae+")."),re}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),D;return D}function m(D){return D.generateMipmaps&&D.minFilter!==kt&&D.minFilter!==Rn}function p(D){n.generateMipmap(D)}function y(D,M,B,Z,J=!1){if(D!==null){if(n[D]!==void 0)return n[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let Q=M;if(M===n.RED&&(B===n.FLOAT&&(Q=n.R32F),B===n.HALF_FLOAT&&(Q=n.R16F),B===n.UNSIGNED_BYTE&&(Q=n.R8)),M===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(Q=n.R8UI),B===n.UNSIGNED_SHORT&&(Q=n.R16UI),B===n.UNSIGNED_INT&&(Q=n.R32UI),B===n.BYTE&&(Q=n.R8I),B===n.SHORT&&(Q=n.R16I),B===n.INT&&(Q=n.R32I)),M===n.RG&&(B===n.FLOAT&&(Q=n.RG32F),B===n.HALF_FLOAT&&(Q=n.RG16F),B===n.UNSIGNED_BYTE&&(Q=n.RG8)),M===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(Q=n.RG8UI),B===n.UNSIGNED_SHORT&&(Q=n.RG16UI),B===n.UNSIGNED_INT&&(Q=n.RG32UI),B===n.BYTE&&(Q=n.RG8I),B===n.SHORT&&(Q=n.RG16I),B===n.INT&&(Q=n.RG32I)),M===n.RGB&&B===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),M===n.RGBA){const Ae=J?lc:rt.getTransfer(Z);B===n.FLOAT&&(Q=n.RGBA32F),B===n.HALF_FLOAT&&(Q=n.RGBA16F),B===n.UNSIGNED_BYTE&&(Q=Ae===mt?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function v(D,M){let B;return D?M===null||M===Cs||M===Tr?B=n.DEPTH24_STENCIL8:M===$n?B=n.DEPTH32F_STENCIL8:M===To&&(B=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Cs||M===Tr?B=n.DEPTH_COMPONENT24:M===$n?B=n.DEPTH_COMPONENT32F:M===To&&(B=n.DEPTH_COMPONENT16),B}function b(D,M){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==kt&&D.minFilter!==Rn?Math.log2(Math.max(M.width,M.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?M.mipmaps.length:1}function L(D){const M=D.target;M.removeEventListener("dispose",L),w(M),M.isVideoTexture&&u.delete(M)}function A(D){const M=D.target;M.removeEventListener("dispose",A),E(M)}function w(D){const M=i.get(D);if(M.__webglInit===void 0)return;const B=D.source,Z=h.get(B);if(Z){const J=Z[M.__cacheKey];J.usedTimes--,J.usedTimes===0&&I(D),Object.keys(Z).length===0&&h.delete(B)}i.remove(D)}function I(D){const M=i.get(D);n.deleteTexture(M.__webglTexture);const B=D.source,Z=h.get(B);delete Z[M.__cacheKey],o.memory.textures--}function E(D){const M=i.get(D);if(D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(M.__webglFramebuffer[Z]))for(let J=0;J<M.__webglFramebuffer[Z].length;J++)n.deleteFramebuffer(M.__webglFramebuffer[Z][J]);else n.deleteFramebuffer(M.__webglFramebuffer[Z]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[Z])}else{if(Array.isArray(M.__webglFramebuffer))for(let Z=0;Z<M.__webglFramebuffer.length;Z++)n.deleteFramebuffer(M.__webglFramebuffer[Z]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Z=0;Z<M.__webglColorRenderbuffer.length;Z++)M.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[Z]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const B=D.textures;for(let Z=0,J=B.length;Z<J;Z++){const Q=i.get(B[Z]);Q.__webglTexture&&(n.deleteTexture(Q.__webglTexture),o.memory.textures--),i.remove(B[Z])}i.remove(D)}let S=0;function C(){S=0}function O(){const D=S;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),S+=1,D}function z(D){const M=[];return M.push(D.wrapS),M.push(D.wrapT),M.push(D.wrapR||0),M.push(D.magFilter),M.push(D.minFilter),M.push(D.anisotropy),M.push(D.internalFormat),M.push(D.format),M.push(D.type),M.push(D.generateMipmaps),M.push(D.premultiplyAlpha),M.push(D.flipY),M.push(D.unpackAlignment),M.push(D.colorSpace),M.join()}function X(D,M){const B=i.get(D);if(D.isVideoTexture&&Ie(D),D.isRenderTargetTexture===!1&&D.version>0&&B.__version!==D.version){const Z=D.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ue(B,D,M);return}}t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+M)}function j(D,M){const B=i.get(D);if(D.version>0&&B.__version!==D.version){Ue(B,D,M);return}t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+M)}function k(D,M){const B=i.get(D);if(D.version>0&&B.__version!==D.version){Ue(B,D,M);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+M)}function K(D,M){const B=i.get(D);if(D.version>0&&B.__version!==D.version){q(B,D,M);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+M)}const G={[Er]:n.REPEAT,[Ss]:n.CLAMP_TO_EDGE,[su]:n.MIRRORED_REPEAT},ne={[kt]:n.NEAREST,[$0]:n.NEAREST_MIPMAP_NEAREST,[ra]:n.NEAREST_MIPMAP_LINEAR,[Rn]:n.LINEAR,[Jc]:n.LINEAR_MIPMAP_NEAREST,[bs]:n.LINEAR_MIPMAP_LINEAR},ce={[ng]:n.NEVER,[cg]:n.ALWAYS,[ig]:n.LESS,[Np]:n.LEQUAL,[sg]:n.EQUAL,[ag]:n.GEQUAL,[rg]:n.GREATER,[og]:n.NOTEQUAL};function ue(D,M){if(M.type===$n&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Rn||M.magFilter===Jc||M.magFilter===ra||M.magFilter===bs||M.minFilter===Rn||M.minFilter===Jc||M.minFilter===ra||M.minFilter===bs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(D,n.TEXTURE_WRAP_S,G[M.wrapS]),n.texParameteri(D,n.TEXTURE_WRAP_T,G[M.wrapT]),(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)&&n.texParameteri(D,n.TEXTURE_WRAP_R,G[M.wrapR]),n.texParameteri(D,n.TEXTURE_MAG_FILTER,ne[M.magFilter]),n.texParameteri(D,n.TEXTURE_MIN_FILTER,ne[M.minFilter]),M.compareFunction&&(n.texParameteri(D,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(D,n.TEXTURE_COMPARE_FUNC,ce[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===kt||M.minFilter!==ra&&M.minFilter!==bs||M.type===$n&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(D,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function Te(D,M){let B=!1;D.__webglInit===void 0&&(D.__webglInit=!0,M.addEventListener("dispose",L));const Z=M.source;let J=h.get(Z);J===void 0&&(J={},h.set(Z,J));const Q=z(M);if(Q!==D.__cacheKey){J[Q]===void 0&&(J[Q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,B=!0),J[Q].usedTimes++;const Ae=J[D.__cacheKey];Ae!==void 0&&(J[D.__cacheKey].usedTimes--,Ae.usedTimes===0&&I(M)),D.__cacheKey=Q,D.__webglTexture=J[Q].texture}return B}function Ue(D,M,B){let Z=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Z=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Z=n.TEXTURE_3D);const J=Te(D,M),Q=M.source;t.bindTexture(Z,D.__webglTexture,n.TEXTURE0+B);const Ae=i.get(Q);if(Q.version!==Ae.__version||J===!0){t.activeTexture(n.TEXTURE0+B);const re=rt.getPrimaries(rt.workingColorSpace),de=M.colorSpace===Jn?null:rt.getPrimaries(M.colorSpace),Le=M.colorSpace===Jn||re===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);let ie=x(M.image,!1,s.maxTextureSize);ie=fe(M,ie);const me=r.convert(M.format,M.colorSpace),_=r.convert(M.type);let Re=y(M.internalFormat,me,_,M.colorSpace,M.isVideoTexture);ue(Z,M);let pe;const ze=M.mipmaps,Fe=M.isVideoTexture!==!0,Je=Ae.__version===void 0||J===!0,H=Q.dataReady,se=b(M,ie);if(M.isDepthTexture)Re=v(M.format===Ar,M.type),Je&&(Fe?t.texStorage2D(n.TEXTURE_2D,1,Re,ie.width,ie.height):t.texImage2D(n.TEXTURE_2D,0,Re,ie.width,ie.height,0,me,_,null));else if(M.isDataTexture)if(ze.length>0){Fe&&Je&&t.texStorage2D(n.TEXTURE_2D,se,Re,ze[0].width,ze[0].height);for(let ee=0,$=ze.length;ee<$;ee++)pe=ze[ee],Fe?H&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,pe.width,pe.height,me,_,pe.data):t.texImage2D(n.TEXTURE_2D,ee,Re,pe.width,pe.height,0,me,_,pe.data);M.generateMipmaps=!1}else Fe?(Je&&t.texStorage2D(n.TEXTURE_2D,se,Re,ie.width,ie.height),H&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ie.width,ie.height,me,_,ie.data)):t.texImage2D(n.TEXTURE_2D,0,Re,ie.width,ie.height,0,me,_,ie.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Fe&&Je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,se,Re,ze[0].width,ze[0].height,ie.depth);for(let ee=0,$=ze.length;ee<$;ee++)if(pe=ze[ee],M.format!==Bn)if(me!==null)if(Fe){if(H)if(M.layerUpdates.size>0){const le=Gh(pe.width,pe.height,M.format,M.type);for(const Ne of M.layerUpdates){const Ge=pe.data.subarray(Ne*le/pe.data.BYTES_PER_ELEMENT,(Ne+1)*le/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,Ne,pe.width,pe.height,1,me,Ge,0,0)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,pe.width,pe.height,ie.depth,me,pe.data,0,0)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,Re,pe.width,pe.height,ie.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?H&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,pe.width,pe.height,ie.depth,me,_,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,Re,pe.width,pe.height,ie.depth,0,me,_,pe.data)}else{Fe&&Je&&t.texStorage2D(n.TEXTURE_2D,se,Re,ze[0].width,ze[0].height);for(let ee=0,$=ze.length;ee<$;ee++)pe=ze[ee],M.format!==Bn?me!==null?Fe?H&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,pe.width,pe.height,me,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,Re,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?H&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,pe.width,pe.height,me,_,pe.data):t.texImage2D(n.TEXTURE_2D,ee,Re,pe.width,pe.height,0,me,_,pe.data)}else if(M.isDataArrayTexture)if(Fe){if(Je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,se,Re,ie.width,ie.height,ie.depth),H)if(M.layerUpdates.size>0){const ee=Gh(ie.width,ie.height,M.format,M.type);for(const $ of M.layerUpdates){const le=ie.data.subarray($*ee/ie.data.BYTES_PER_ELEMENT,($+1)*ee/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,$,ie.width,ie.height,1,me,_,le)}M.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,me,_,ie.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Re,ie.width,ie.height,ie.depth,0,me,_,ie.data);else if(M.isData3DTexture)Fe?(Je&&t.texStorage3D(n.TEXTURE_3D,se,Re,ie.width,ie.height,ie.depth),H&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,me,_,ie.data)):t.texImage3D(n.TEXTURE_3D,0,Re,ie.width,ie.height,ie.depth,0,me,_,ie.data);else if(M.isFramebufferTexture){if(Je)if(Fe)t.texStorage2D(n.TEXTURE_2D,se,Re,ie.width,ie.height);else{let ee=ie.width,$=ie.height;for(let le=0;le<se;le++)t.texImage2D(n.TEXTURE_2D,le,Re,ee,$,0,me,_,null),ee>>=1,$>>=1}}else if(ze.length>0){if(Fe&&Je){const ee=xe(ze[0]);t.texStorage2D(n.TEXTURE_2D,se,Re,ee.width,ee.height)}for(let ee=0,$=ze.length;ee<$;ee++)pe=ze[ee],Fe?H&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,me,_,pe):t.texImage2D(n.TEXTURE_2D,ee,Re,me,_,pe);M.generateMipmaps=!1}else if(Fe){if(Je){const ee=xe(ie);t.texStorage2D(n.TEXTURE_2D,se,Re,ee.width,ee.height)}H&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,me,_,ie)}else t.texImage2D(n.TEXTURE_2D,0,Re,me,_,ie);m(M)&&p(Z),Ae.__version=Q.version,M.onUpdate&&M.onUpdate(M)}D.__version=M.version}function q(D,M,B){if(M.image.length!==6)return;const Z=Te(D,M),J=M.source;t.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+B);const Q=i.get(J);if(J.version!==Q.__version||Z===!0){t.activeTexture(n.TEXTURE0+B);const Ae=rt.getPrimaries(rt.workingColorSpace),re=M.colorSpace===Jn?null:rt.getPrimaries(M.colorSpace),de=M.colorSpace===Jn||Ae===re?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const Le=M.isCompressedTexture||M.image[0].isCompressedTexture,ie=M.image[0]&&M.image[0].isDataTexture,me=[];for(let $=0;$<6;$++)!Le&&!ie?me[$]=x(M.image[$],!0,s.maxCubemapSize):me[$]=ie?M.image[$].image:M.image[$],me[$]=fe(M,me[$]);const _=me[0],Re=r.convert(M.format,M.colorSpace),pe=r.convert(M.type),ze=y(M.internalFormat,Re,pe,M.colorSpace),Fe=M.isVideoTexture!==!0,Je=Q.__version===void 0||Z===!0,H=J.dataReady;let se=b(M,_);ue(n.TEXTURE_CUBE_MAP,M);let ee;if(Le){Fe&&Je&&t.texStorage2D(n.TEXTURE_CUBE_MAP,se,ze,_.width,_.height);for(let $=0;$<6;$++){ee=me[$].mipmaps;for(let le=0;le<ee.length;le++){const Ne=ee[le];M.format!==Bn?Re!==null?Fe?H&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le,0,0,Ne.width,Ne.height,Re,Ne.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le,ze,Ne.width,Ne.height,0,Ne.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le,0,0,Ne.width,Ne.height,Re,pe,Ne.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le,ze,Ne.width,Ne.height,0,Re,pe,Ne.data)}}}else{if(ee=M.mipmaps,Fe&&Je){ee.length>0&&se++;const $=xe(me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,se,ze,$.width,$.height)}for(let $=0;$<6;$++)if(ie){Fe?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,me[$].width,me[$].height,Re,pe,me[$].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,ze,me[$].width,me[$].height,0,Re,pe,me[$].data);for(let le=0;le<ee.length;le++){const Ge=ee[le].image[$].image;Fe?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le+1,0,0,Ge.width,Ge.height,Re,pe,Ge.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le+1,ze,Ge.width,Ge.height,0,Re,pe,Ge.data)}}else{Fe?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Re,pe,me[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,ze,Re,pe,me[$]);for(let le=0;le<ee.length;le++){const Ne=ee[le];Fe?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le+1,0,0,Re,pe,Ne.image[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le+1,ze,Re,pe,Ne.image[$])}}}m(M)&&p(n.TEXTURE_CUBE_MAP),Q.__version=J.version,M.onUpdate&&M.onUpdate(M)}D.__version=M.version}function Y(D,M,B,Z,J,Q){const Ae=r.convert(B.format,B.colorSpace),re=r.convert(B.type),de=y(B.internalFormat,Ae,re,B.colorSpace);if(!i.get(M).__hasExternalTextures){const ie=Math.max(1,M.width>>Q),me=Math.max(1,M.height>>Q);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,Q,de,ie,me,M.depth,0,Ae,re,null):t.texImage2D(J,Q,de,ie,me,0,Ae,re,null)}t.bindFramebuffer(n.FRAMEBUFFER,D),he(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,J,i.get(B).__webglTexture,0,Ce(M)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Z,J,i.get(B).__webglTexture,Q),t.bindFramebuffer(n.FRAMEBUFFER,null)}function te(D,M,B){if(n.bindRenderbuffer(n.RENDERBUFFER,D),M.depthBuffer){const Z=M.depthTexture,J=Z&&Z.isDepthTexture?Z.type:null,Q=v(M.stencilBuffer,J),Ae=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=Ce(M);he(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,re,Q,M.width,M.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,re,Q,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,Q,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ae,n.RENDERBUFFER,D)}else{const Z=M.textures;for(let J=0;J<Z.length;J++){const Q=Z[J],Ae=r.convert(Q.format,Q.colorSpace),re=r.convert(Q.type),de=y(Q.internalFormat,Ae,re,Q.colorSpace),Le=Ce(M);B&&he(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Le,de,M.width,M.height):he(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Le,de,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,de,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ae(D,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,D),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),X(M.depthTexture,0);const Z=i.get(M.depthTexture).__webglTexture,J=Ce(M);if(M.depthTexture.format===mr)he(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0);else if(M.depthTexture.format===Ar)he(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function ve(D){const M=i.get(D),B=D.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==D.depthTexture){const Z=D.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Z){const J=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Z.removeEventListener("dispose",J)};Z.addEventListener("dispose",J),M.__depthDisposeCallback=J}M.__boundDepthTexture=Z}if(D.depthTexture&&!M.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");ae(M.__webglFramebuffer,D)}else if(B){M.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[Z]),M.__webglDepthbuffer[Z]===void 0)M.__webglDepthbuffer[Z]=n.createRenderbuffer(),te(M.__webglDepthbuffer[Z],D,!1);else{const J=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=M.__webglDepthbuffer[Z];n.bindRenderbuffer(n.RENDERBUFFER,Q),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,Q)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),te(M.__webglDepthbuffer,D,!1);else{const Z=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,J)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function De(D,M,B){const Z=i.get(D);M!==void 0&&Y(Z.__webglFramebuffer,D,D.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&ve(D)}function Ee(D){const M=D.texture,B=i.get(D),Z=i.get(M);D.addEventListener("dispose",A);const J=D.textures,Q=D.isWebGLCubeRenderTarget===!0,Ae=J.length>1;if(Ae||(Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture()),Z.__version=M.version,o.memory.textures++),Q){B.__webglFramebuffer=[];for(let re=0;re<6;re++)if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer[re]=[];for(let de=0;de<M.mipmaps.length;de++)B.__webglFramebuffer[re][de]=n.createFramebuffer()}else B.__webglFramebuffer[re]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer=[];for(let re=0;re<M.mipmaps.length;re++)B.__webglFramebuffer[re]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(Ae)for(let re=0,de=J.length;re<de;re++){const Le=i.get(J[re]);Le.__webglTexture===void 0&&(Le.__webglTexture=n.createTexture(),o.memory.textures++)}if(D.samples>0&&he(D)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let re=0;re<J.length;re++){const de=J[re];B.__webglColorRenderbuffer[re]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[re]);const Le=r.convert(de.format,de.colorSpace),ie=r.convert(de.type),me=y(de.internalFormat,Le,ie,de.colorSpace,D.isXRRenderTarget===!0),_=Ce(D);n.renderbufferStorageMultisample(n.RENDERBUFFER,_,me,D.width,D.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,B.__webglColorRenderbuffer[re])}n.bindRenderbuffer(n.RENDERBUFFER,null),D.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),te(B.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Q){t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),ue(n.TEXTURE_CUBE_MAP,M);for(let re=0;re<6;re++)if(M.mipmaps&&M.mipmaps.length>0)for(let de=0;de<M.mipmaps.length;de++)Y(B.__webglFramebuffer[re][de],D,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,de);else Y(B.__webglFramebuffer[re],D,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);m(M)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let re=0,de=J.length;re<de;re++){const Le=J[re],ie=i.get(Le);t.bindTexture(n.TEXTURE_2D,ie.__webglTexture),ue(n.TEXTURE_2D,Le),Y(B.__webglFramebuffer,D,Le,n.COLOR_ATTACHMENT0+re,n.TEXTURE_2D,0),m(Le)&&p(n.TEXTURE_2D)}t.unbindTexture()}else{let re=n.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(re=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(re,Z.__webglTexture),ue(re,M),M.mipmaps&&M.mipmaps.length>0)for(let de=0;de<M.mipmaps.length;de++)Y(B.__webglFramebuffer[de],D,M,n.COLOR_ATTACHMENT0,re,de);else Y(B.__webglFramebuffer,D,M,n.COLOR_ATTACHMENT0,re,0);m(M)&&p(re),t.unbindTexture()}D.depthBuffer&&ve(D)}function Ve(D){const M=D.textures;for(let B=0,Z=M.length;B<Z;B++){const J=M[B];if(m(J)){const Q=D.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,Ae=i.get(J).__webglTexture;t.bindTexture(Q,Ae),p(Q),t.unbindTexture()}}}const P=[],Be=[];function Me(D){if(D.samples>0){if(he(D)===!1){const M=D.textures,B=D.width,Z=D.height;let J=n.COLOR_BUFFER_BIT;const Q=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ae=i.get(D),re=M.length>1;if(re)for(let de=0;de<M.length;de++)t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let de=0;de<M.length;de++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),re){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ae.__webglColorRenderbuffer[de]);const Le=i.get(M[de]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Le,0)}n.blitFramebuffer(0,0,B,Z,0,0,B,Z,J,n.NEAREST),c===!0&&(P.length=0,Be.length=0,P.push(n.COLOR_ATTACHMENT0+de),D.depthBuffer&&D.resolveDepthBuffer===!1&&(P.push(Q),Be.push(Q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Be)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,P))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),re)for(let de=0;de<M.length;de++){t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,Ae.__webglColorRenderbuffer[de]);const Le=i.get(M[de]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,Le,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&c){const M=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function Ce(D){return Math.min(s.maxSamples,D.samples)}function he(D){const M=i.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Ie(D){const M=o.render.frame;u.get(D)!==M&&(u.set(D,M),D.update())}function fe(D,M){const B=D.colorSpace,Z=D.format,J=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||B!==is&&B!==Jn&&(rt.getTransfer(B)===mt?(Z!==Bn||J!==Li)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),M}function xe(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=O,this.resetTextureUnits=C,this.setTexture2D=X,this.setTexture2DArray=j,this.setTexture3D=k,this.setTextureCube=K,this.rebindTextures=De,this.setupRenderTarget=Ee,this.updateRenderTargetMipmap=Ve,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=ve,this.setupFrameBufferTexture=Y,this.useMultisampledRTT=he}function E_(n,e){function t(i,s=Jn){let r;const o=rt.getTransfer(s);if(i===Li)return n.UNSIGNED_BYTE;if(i===rd)return n.UNSIGNED_SHORT_4_4_4_4;if(i===od)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Dp)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Tp)return n.BYTE;if(i===Ap)return n.SHORT;if(i===To)return n.UNSIGNED_SHORT;if(i===sd)return n.INT;if(i===Cs)return n.UNSIGNED_INT;if(i===$n)return n.FLOAT;if(i===bn)return n.HALF_FLOAT;if(i===wp)return n.ALPHA;if(i===Pp)return n.RGB;if(i===Bn)return n.RGBA;if(i===Cp)return n.LUMINANCE;if(i===Rp)return n.LUMINANCE_ALPHA;if(i===mr)return n.DEPTH_COMPONENT;if(i===Ar)return n.DEPTH_STENCIL;if(i===ad)return n.RED;if(i===cd)return n.RED_INTEGER;if(i===Lp)return n.RG;if(i===ld)return n.RG_INTEGER;if(i===ud)return n.RGBA_INTEGER;if(i===Za||i===Ja||i===Qa||i===$a)if(o===mt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Za)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ja)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Qa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===$a)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Za)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ja)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Qa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===$a)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ru||i===ou||i===au||i===cu)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ru)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ou)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===au)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===cu)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===lu||i===uu||i===du)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===lu||i===uu)return o===mt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===du)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===hu||i===fu||i===pu||i===mu||i===gu||i===xu||i===vu||i===_u||i===Mu||i===yu||i===Su||i===bu||i===Eu||i===Tu)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===hu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===pu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===mu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===gu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===xu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===vu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===_u)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Mu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===yu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Su)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===bu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Eu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Tu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ec||i===Au||i===Du)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===ec)return o===mt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Au)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Du)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ip||i===wu||i===Pu||i===Cu)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===ec)return r.COMPRESSED_RED_RGTC1_EXT;if(i===wu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Pu)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Cu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Tr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class T_ extends Mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ti extends qt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const A_={type:"move"};class Sl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ti,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ti,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ti,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&h>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(A_)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ti;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const D_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,w_=`
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

}`;class P_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const s=new It,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new _t({vertexShader:D_,fragmentShader:w_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new wt(new jo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class C_ extends Fs{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,h=null,f=null,g=null;const x=new P_,m=t.getContextAttributes();let p=null,y=null;const v=[],b=[],L=new be;let A=null;const w=new Mn;w.layers.enable(1),w.viewport=new ct;const I=new Mn;I.layers.enable(2),I.viewport=new ct;const E=[w,I],S=new T_;S.layers.enable(1),S.layers.enable(2);let C=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Y=v[q];return Y===void 0&&(Y=new Sl,v[q]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(q){let Y=v[q];return Y===void 0&&(Y=new Sl,v[q]=Y),Y.getGripSpace()},this.getHand=function(q){let Y=v[q];return Y===void 0&&(Y=new Sl,v[q]=Y),Y.getHandSpace()};function z(q){const Y=b.indexOf(q.inputSource);if(Y===-1)return;const te=v[Y];te!==void 0&&(te.update(q.inputSource,q.frame,l||o),te.dispatchEvent({type:q.type,data:q.inputSource}))}function X(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",j);for(let q=0;q<v.length;q++){const Y=b[q];Y!==null&&(b[q]=null,v[q].disconnect(Y))}C=null,O=null,x.reset(),e.setRenderTarget(p),f=null,h=null,d=null,s=null,y=null,Ue.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",X),s.addEventListener("inputsourceschange",j),m.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(L),s.renderState.layers===void 0){const Y={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,Y),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new cn(f.framebufferWidth,f.framebufferHeight,{format:Bn,type:Li,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let Y=null,te=null,ae=null;m.depth&&(ae=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Y=m.stencil?Ar:mr,te=m.stencil?Tr:Cs);const ve={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:r};d=new XRWebGLBinding(s,t),h=d.createProjectionLayer(ve),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new cn(h.textureWidth,h.textureHeight,{format:Bn,type:Li,depthTexture:new qp(h.textureWidth,h.textureHeight,te,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Ue.setContext(s),Ue.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function j(q){for(let Y=0;Y<q.removed.length;Y++){const te=q.removed[Y],ae=b.indexOf(te);ae>=0&&(b[ae]=null,v[ae].disconnect(te))}for(let Y=0;Y<q.added.length;Y++){const te=q.added[Y];let ae=b.indexOf(te);if(ae===-1){for(let De=0;De<v.length;De++)if(De>=b.length){b.push(te),ae=De;break}else if(b[De]===null){b[De]=te,ae=De;break}if(ae===-1)break}const ve=v[ae];ve&&ve.connect(te)}}const k=new R,K=new R;function G(q,Y,te){k.setFromMatrixPosition(Y.matrixWorld),K.setFromMatrixPosition(te.matrixWorld);const ae=k.distanceTo(K),ve=Y.projectionMatrix.elements,De=te.projectionMatrix.elements,Ee=ve[14]/(ve[10]-1),Ve=ve[14]/(ve[10]+1),P=(ve[9]+1)/ve[5],Be=(ve[9]-1)/ve[5],Me=(ve[8]-1)/ve[0],Ce=(De[8]+1)/De[0],he=Ee*Me,Ie=Ee*Ce,fe=ae/(-Me+Ce),xe=fe*-Me;if(Y.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(xe),q.translateZ(fe),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),ve[10]===-1)q.projectionMatrix.copy(Y.projectionMatrix),q.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const D=Ee+fe,M=Ve+fe,B=he-xe,Z=Ie+(ae-xe),J=P*Ve/M*D,Q=Be*Ve/M*D;q.projectionMatrix.makePerspective(B,Z,J,Q,D,M),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function ne(q,Y){Y===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Y.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let Y=q.near,te=q.far;x.texture!==null&&(x.depthNear>0&&(Y=x.depthNear),x.depthFar>0&&(te=x.depthFar)),S.near=I.near=w.near=Y,S.far=I.far=w.far=te,(C!==S.near||O!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),C=S.near,O=S.far);const ae=q.parent,ve=S.cameras;ne(S,ae);for(let De=0;De<ve.length;De++)ne(ve[De],ae);ve.length===2?G(S,w,I):S.projectionMatrix.copy(w.projectionMatrix),ce(q,S,ae)};function ce(q,Y,te){te===null?q.matrix.copy(Y.matrixWorld):(q.matrix.copy(te.matrixWorld),q.matrix.invert(),q.matrix.multiply(Y.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Y.projectionMatrix),q.projectionMatrixInverse.copy(Y.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Ao*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&f===null))return c},this.setFoveation=function(q){c=q,h!==null&&(h.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(S)};let ue=null;function Te(q,Y){if(u=Y.getViewerPose(l||o),g=Y,u!==null){const te=u.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let ae=!1;te.length!==S.cameras.length&&(S.cameras.length=0,ae=!0);for(let De=0;De<te.length;De++){const Ee=te[De];let Ve=null;if(f!==null)Ve=f.getViewport(Ee);else{const Be=d.getViewSubImage(h,Ee);Ve=Be.viewport,De===0&&(e.setRenderTargetTextures(y,Be.colorTexture,h.ignoreDepthValues?void 0:Be.depthStencilTexture),e.setRenderTarget(y))}let P=E[De];P===void 0&&(P=new Mn,P.layers.enable(De),P.viewport=new ct,E[De]=P),P.matrix.fromArray(Ee.transform.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale),P.projectionMatrix.fromArray(Ee.projectionMatrix),P.projectionMatrixInverse.copy(P.projectionMatrix).invert(),P.viewport.set(Ve.x,Ve.y,Ve.width,Ve.height),De===0&&(S.matrix.copy(P.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ae===!0&&S.cameras.push(P)}const ve=s.enabledFeatures;if(ve&&ve.includes("depth-sensing")){const De=d.getDepthInformation(te[0]);De&&De.isValid&&De.texture&&x.init(e,De,s.renderState)}}for(let te=0;te<v.length;te++){const ae=b[te],ve=v[te];ae!==null&&ve!==void 0&&ve.update(ae,Y,l||o)}ue&&ue(q,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),g=null}const Ue=new Yp;Ue.setAnimationLoop(Te),this.setAnimationLoop=function(q){ue=q},this.dispose=function(){}}}const fs=new Vn,R_=new ot;function L_(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Wp(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,v,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,b)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,y,v):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===en&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===en&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p),v=y.envMap,b=y.envMapRotation;v&&(m.envMap.value=v,fs.copy(b),fs.x*=-1,fs.y*=-1,fs.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(fs.y*=-1,fs.z*=-1),m.envMapRotation.value.setFromMatrix4(R_.makeRotationFromEuler(fs)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,y,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=v*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===en&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function I_(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,v){const b=v.program;i.uniformBlockBinding(y,b)}function l(y,v){let b=s[y.id];b===void 0&&(g(y),b=u(y),s[y.id]=b,y.addEventListener("dispose",m));const L=v.program;i.updateUBOMapping(y,L);const A=e.render.frame;r[y.id]!==A&&(h(y),r[y.id]=A)}function u(y){const v=d();y.__bindingPointIndex=v;const b=n.createBuffer(),L=y.__size,A=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,L,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,b),b}function d(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){const v=s[y.id],b=y.uniforms,L=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let A=0,w=b.length;A<w;A++){const I=Array.isArray(b[A])?b[A]:[b[A]];for(let E=0,S=I.length;E<S;E++){const C=I[E];if(f(C,A,E,L)===!0){const O=C.__offset,z=Array.isArray(C.value)?C.value:[C.value];let X=0;for(let j=0;j<z.length;j++){const k=z[j],K=x(k);typeof k=="number"||typeof k=="boolean"?(C.__data[0]=k,n.bufferSubData(n.UNIFORM_BUFFER,O+X,C.__data)):k.isMatrix3?(C.__data[0]=k.elements[0],C.__data[1]=k.elements[1],C.__data[2]=k.elements[2],C.__data[3]=0,C.__data[4]=k.elements[3],C.__data[5]=k.elements[4],C.__data[6]=k.elements[5],C.__data[7]=0,C.__data[8]=k.elements[6],C.__data[9]=k.elements[7],C.__data[10]=k.elements[8],C.__data[11]=0):(k.toArray(C.__data,X),X+=K.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(y,v,b,L){const A=y.value,w=v+"_"+b;if(L[w]===void 0)return typeof A=="number"||typeof A=="boolean"?L[w]=A:L[w]=A.clone(),!0;{const I=L[w];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return L[w]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function g(y){const v=y.uniforms;let b=0;const L=16;for(let w=0,I=v.length;w<I;w++){const E=Array.isArray(v[w])?v[w]:[v[w]];for(let S=0,C=E.length;S<C;S++){const O=E[S],z=Array.isArray(O.value)?O.value:[O.value];for(let X=0,j=z.length;X<j;X++){const k=z[X],K=x(k),G=b%L,ne=G%K.boundary,ce=G+ne;b+=ne,ce!==0&&L-ce<K.storage&&(b+=L-ce),O.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=b,b+=K.storage}}}const A=b%L;return A>0&&(b+=L-A),y.__size=b,y.__cache={},this}function x(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function m(y){const v=y.target;v.removeEventListener("dispose",m);const b=o.indexOf(v.__bindingPointIndex);o.splice(b,1),n.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(const y in s)n.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class H_{constructor(e={}){const{canvas:t=Ag(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=o;const f=new Uint32Array(4),g=new Int32Array(4);let x=null,m=null;const p=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Dt,this.toneMapping=Ji,this.toneMappingExposure=1;const v=this;let b=!1,L=0,A=0,w=null,I=-1,E=null;const S=new ct,C=new ct;let O=null;const z=new je(0);let X=0,j=t.width,k=t.height,K=1,G=null,ne=null;const ce=new ct(0,0,j,k),ue=new ct(0,0,j,k);let Te=!1;const Ue=new pd;let q=!1,Y=!1;const te=new ot,ae=new R,ve=new ct,De={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ee=!1;function Ve(){return w===null?K:1}let P=i;function Be(T,N){return t.getContext(T,N)}try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${nd}`),t.addEventListener("webglcontextlost",ee,!1),t.addEventListener("webglcontextrestored",$,!1),t.addEventListener("webglcontextcreationerror",le,!1),P===null){const N="webgl2";if(P=Be(N,T),P===null)throw Be(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Me,Ce,he,Ie,fe,xe,D,M,B,Z,J,Q,Ae,re,de,Le,ie,me,_,Re,pe,ze,Fe,Je;function H(){Me=new kx(P),Me.init(),ze=new E_(P,Me),Ce=new Ux(P,Me,e,ze),he=new y_(P),Ie=new Vx(P),fe=new c_,xe=new b_(P,Me,he,fe,Ce,ze,Ie),D=new Ox(v),M=new Bx(v),B=new Jg(P),Fe=new Ix(P,B),Z=new Gx(P,B,Ie,Fe),J=new Yx(P,Z,B,Ie),_=new Xx(P,Ce,xe),Le=new Nx(fe),Q=new a_(v,D,M,Me,Ce,Fe,Le),Ae=new L_(v,fe),re=new u_,de=new g_(Me),me=new Lx(v,D,M,he,J,h,c),ie=new M_(v,J,Ce),Je=new I_(P,Ie,Ce,he),Re=new Hx(P,Me,Ie),pe=new Wx(P,Me,Ie),Ie.programs=Q.programs,v.capabilities=Ce,v.extensions=Me,v.properties=fe,v.renderLists=re,v.shadowMap=ie,v.state=he,v.info=Ie}H();const se=new C_(v,P);this.xr=se,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const T=Me.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Me.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(T){T!==void 0&&(K=T,this.setSize(j,k,!1))},this.getSize=function(T){return T.set(j,k)},this.setSize=function(T,N,W=!0){if(se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}j=T,k=N,t.width=Math.floor(T*K),t.height=Math.floor(N*K),W===!0&&(t.style.width=T+"px",t.style.height=N+"px"),this.setViewport(0,0,T,N)},this.getDrawingBufferSize=function(T){return T.set(j*K,k*K).floor()},this.setDrawingBufferSize=function(T,N,W){j=T,k=N,K=W,t.width=Math.floor(T*W),t.height=Math.floor(N*W),this.setViewport(0,0,T,N)},this.getCurrentViewport=function(T){return T.copy(S)},this.getViewport=function(T){return T.copy(ce)},this.setViewport=function(T,N,W,V){T.isVector4?ce.set(T.x,T.y,T.z,T.w):ce.set(T,N,W,V),he.viewport(S.copy(ce).multiplyScalar(K).round())},this.getScissor=function(T){return T.copy(ue)},this.setScissor=function(T,N,W,V){T.isVector4?ue.set(T.x,T.y,T.z,T.w):ue.set(T,N,W,V),he.scissor(C.copy(ue).multiplyScalar(K).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(T){he.setScissorTest(Te=T)},this.setOpaqueSort=function(T){G=T},this.setTransparentSort=function(T){ne=T},this.getClearColor=function(T){return T.copy(me.getClearColor())},this.setClearColor=function(){me.setClearColor.apply(me,arguments)},this.getClearAlpha=function(){return me.getClearAlpha()},this.setClearAlpha=function(){me.setClearAlpha.apply(me,arguments)},this.clear=function(T=!0,N=!0,W=!0){let V=0;if(T){let U=!1;if(w!==null){const oe=w.texture.format;U=oe===ud||oe===ld||oe===cd}if(U){const oe=w.texture.type,Se=oe===Li||oe===Cs||oe===To||oe===Tr||oe===rd||oe===od,we=me.getClearColor(),Pe=me.getClearAlpha(),We=we.r,ke=we.g,He=we.b;Se?(f[0]=We,f[1]=ke,f[2]=He,f[3]=Pe,P.clearBufferuiv(P.COLOR,0,f)):(g[0]=We,g[1]=ke,g[2]=He,g[3]=Pe,P.clearBufferiv(P.COLOR,0,g))}else V|=P.COLOR_BUFFER_BIT}N&&(V|=P.DEPTH_BUFFER_BIT),W&&(V|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ee,!1),t.removeEventListener("webglcontextrestored",$,!1),t.removeEventListener("webglcontextcreationerror",le,!1),re.dispose(),de.dispose(),fe.dispose(),D.dispose(),M.dispose(),J.dispose(),Fe.dispose(),Je.dispose(),Q.dispose(),se.dispose(),se.removeEventListener("sessionstart",ht),se.removeEventListener("sessionend",Ye),ft.stop()};function ee(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function $(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const T=Ie.autoReset,N=ie.enabled,W=ie.autoUpdate,V=ie.needsUpdate,U=ie.type;H(),Ie.autoReset=T,ie.enabled=N,ie.autoUpdate=W,ie.needsUpdate=V,ie.type=U}function le(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ne(T){const N=T.target;N.removeEventListener("dispose",Ne),Ge(N)}function Ge(T){Qe(T),fe.remove(T)}function Qe(T){const N=fe.get(T).programs;N!==void 0&&(N.forEach(function(W){Q.releaseProgram(W)}),T.isShaderMaterial&&Q.releaseShaderCache(T))}this.renderBufferDirect=function(T,N,W,V,U,oe){N===null&&(N=De);const Se=U.isMesh&&U.matrixWorld.determinant()<0,we=gn(T,N,W,V,U);he.setMaterial(V,Se);let Pe=W.index,We=1;if(V.wireframe===!0){if(Pe=Z.getWireframeAttribute(W),Pe===void 0)return;We=2}const ke=W.drawRange,He=W.attributes.position;let et=ke.start*We,pt=(ke.start+ke.count)*We;oe!==null&&(et=Math.max(et,oe.start*We),pt=Math.min(pt,(oe.start+oe.count)*We)),Pe!==null?(et=Math.max(et,0),pt=Math.min(pt,Pe.count)):He!=null&&(et=Math.max(et,0),pt=Math.min(pt,He.count));const at=pt-et;if(at<0||at===1/0)return;Fe.setup(U,V,we,W,Pe);let Tt,tt=Re;if(Pe!==null&&(Tt=B.get(Pe),tt=pe,tt.setIndex(Tt)),U.isMesh)V.wireframe===!0?(he.setLineWidth(V.wireframeLinewidth*Ve()),tt.setMode(P.LINES)):tt.setMode(P.TRIANGLES);else if(U.isLine){let Oe=V.linewidth;Oe===void 0&&(Oe=1),he.setLineWidth(Oe*Ve()),U.isLineSegments?tt.setMode(P.LINES):U.isLineLoop?tt.setMode(P.LINE_LOOP):tt.setMode(P.LINE_STRIP)}else U.isPoints?tt.setMode(P.POINTS):U.isSprite&&tt.setMode(P.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)tt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Me.get("WEBGL_multi_draw"))tt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Oe=U._multiDrawStarts,At=U._multiDrawCounts,nt=U._multiDrawCount,Nt=Pe?B.get(Pe).bytesPerElement:1,qn=fe.get(V).currentProgram.getUniforms();for(let Wt=0;Wt<nt;Wt++)qn.setValue(P,"_gl_DrawID",Wt),tt.render(Oe[Wt]/Nt,At[Wt])}else if(U.isInstancedMesh)tt.renderInstances(et,at,U.count);else if(W.isInstancedBufferGeometry){const Oe=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,At=Math.min(W.instanceCount,Oe);tt.renderInstances(et,at,At)}else tt.render(et,at)};function ut(T,N,W){T.transparent===!0&&T.side===Cn&&T.forceSinglePass===!1?(T.side=en,T.needsUpdate=!0,jn(T,N,W),T.side=Ri,T.needsUpdate=!0,jn(T,N,W),T.side=Cn):jn(T,N,W)}this.compile=function(T,N,W=null){W===null&&(W=T),m=de.get(W),m.init(N),y.push(m),W.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(m.pushLight(U),U.castShadow&&m.pushShadow(U))}),T!==W&&T.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(m.pushLight(U),U.castShadow&&m.pushShadow(U))}),m.setupLights();const V=new Set;return T.traverse(function(U){const oe=U.material;if(oe)if(Array.isArray(oe))for(let Se=0;Se<oe.length;Se++){const we=oe[Se];ut(we,W,U),V.add(we)}else ut(oe,W,U),V.add(oe)}),y.pop(),m=null,V},this.compileAsync=function(T,N,W=null){const V=this.compile(T,N,W);return new Promise(U=>{function oe(){if(V.forEach(function(Se){fe.get(Se).currentProgram.isReady()&&V.delete(Se)}),V.size===0){U(T);return}setTimeout(oe,10)}Me.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let Xe=null;function Mt(T){Xe&&Xe(T)}function ht(){ft.stop()}function Ye(){ft.start()}const ft=new Yp;ft.setAnimationLoop(Mt),typeof self<"u"&&ft.setContext(self),this.setAnimationLoop=function(T){Xe=T,se.setAnimationLoop(T),T===null?ft.stop():ft.start()},se.addEventListener("sessionstart",ht),se.addEventListener("sessionend",Ye),this.render=function(T,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(se.cameraAutoUpdate===!0&&se.updateCamera(N),N=se.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,N,w),m=de.get(T,y.length),m.init(N),y.push(m),te.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Ue.setFromProjectionMatrix(te),Y=this.localClippingEnabled,q=Le.init(this.clippingPlanes,Y),x=re.get(T,p.length),x.init(),p.push(x),se.enabled===!0&&se.isPresenting===!0){const oe=v.xr.getDepthSensingMesh();oe!==null&&Pt(oe,N,-1/0,v.sortObjects)}Pt(T,N,0,v.sortObjects),x.finish(),v.sortObjects===!0&&x.sort(G,ne),Ee=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,Ee&&me.addToRenderList(x,T),this.info.render.frame++,q===!0&&Le.beginShadows();const W=m.state.shadowsArray;ie.render(W,T,N),q===!0&&Le.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=x.opaque,U=x.transmissive;if(m.setupLights(),N.isArrayCamera){const oe=N.cameras;if(U.length>0)for(let Se=0,we=oe.length;Se<we;Se++){const Pe=oe[Se];it(V,U,T,Pe)}Ee&&me.render(T);for(let Se=0,we=oe.length;Se<we;Se++){const Pe=oe[Se];Tn(x,T,Pe,Pe.viewport)}}else U.length>0&&it(V,U,T,N),Ee&&me.render(T),Tn(x,T,N);w!==null&&(xe.updateMultisampleRenderTarget(w),xe.updateRenderTargetMipmap(w)),T.isScene===!0&&T.onAfterRender(v,T,N),Fe.resetDefaultState(),I=-1,E=null,y.pop(),y.length>0?(m=y[y.length-1],q===!0&&Le.setGlobalState(v.clippingPlanes,m.state.camera)):m=null,p.pop(),p.length>0?x=p[p.length-1]:x=null};function Pt(T,N,W,V){if(T.visible===!1)return;if(T.layers.test(N.layers)){if(T.isGroup)W=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(N);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Ue.intersectsSprite(T)){V&&ve.setFromMatrixPosition(T.matrixWorld).applyMatrix4(te);const Se=J.update(T),we=T.material;we.visible&&x.push(T,Se,we,W,ve.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Ue.intersectsObject(T))){const Se=J.update(T),we=T.material;if(V&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ve.copy(T.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),ve.copy(Se.boundingSphere.center)),ve.applyMatrix4(T.matrixWorld).applyMatrix4(te)),Array.isArray(we)){const Pe=Se.groups;for(let We=0,ke=Pe.length;We<ke;We++){const He=Pe[We],et=we[He.materialIndex];et&&et.visible&&x.push(T,Se,et,W,ve.z,He)}}else we.visible&&x.push(T,Se,we,W,ve.z,null)}}const oe=T.children;for(let Se=0,we=oe.length;Se<we;Se++)Pt(oe[Se],N,W,V)}function Tn(T,N,W,V){const U=T.opaque,oe=T.transmissive,Se=T.transparent;m.setupLightsView(W),q===!0&&Le.setGlobalState(v.clippingPlanes,W),V&&he.viewport(S.copy(V)),U.length>0&&Yn(U,N,W),oe.length>0&&Yn(oe,N,W),Se.length>0&&Yn(Se,N,W),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function it(T,N,W,V){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[V.id]===void 0&&(m.state.transmissionRenderTarget[V.id]=new cn(1,1,{generateMipmaps:!0,type:Me.has("EXT_color_buffer_half_float")||Me.has("EXT_color_buffer_float")?bn:Li,minFilter:bs,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:rt.workingColorSpace}));const oe=m.state.transmissionRenderTarget[V.id],Se=V.viewport||S;oe.setSize(Se.z,Se.w);const we=v.getRenderTarget();v.setRenderTarget(oe),v.getClearColor(z),X=v.getClearAlpha(),X<1&&v.setClearColor(16777215,.5),v.clear(),Ee&&me.render(W);const Pe=v.toneMapping;v.toneMapping=Ji;const We=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),m.setupLightsView(V),q===!0&&Le.setGlobalState(v.clippingPlanes,V),Yn(T,W,V),xe.updateMultisampleRenderTarget(oe),xe.updateRenderTargetMipmap(oe),Me.has("WEBGL_multisampled_render_to_texture")===!1){let ke=!1;for(let He=0,et=N.length;He<et;He++){const pt=N[He],at=pt.object,Tt=pt.geometry,tt=pt.material,Oe=pt.group;if(tt.side===Cn&&at.layers.test(V.layers)){const At=tt.side;tt.side=en,tt.needsUpdate=!0,ui(at,W,V,Tt,tt,Oe),tt.side=At,tt.needsUpdate=!0,ke=!0}}ke===!0&&(xe.updateMultisampleRenderTarget(oe),xe.updateRenderTargetMipmap(oe))}v.setRenderTarget(we),v.setClearColor(z,X),We!==void 0&&(V.viewport=We),v.toneMapping=Pe}function Yn(T,N,W){const V=N.isScene===!0?N.overrideMaterial:null;for(let U=0,oe=T.length;U<oe;U++){const Se=T[U],we=Se.object,Pe=Se.geometry,We=V===null?Se.material:V,ke=Se.group;we.layers.test(W.layers)&&ui(we,N,W,Pe,We,ke)}}function ui(T,N,W,V,U,oe){T.onBeforeRender(v,N,W,V,U,oe),T.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),U.onBeforeRender(v,N,W,V,T,oe),U.transparent===!0&&U.side===Cn&&U.forceSinglePass===!1?(U.side=en,U.needsUpdate=!0,v.renderBufferDirect(W,N,V,U,T,oe),U.side=Ri,U.needsUpdate=!0,v.renderBufferDirect(W,N,V,U,T,oe),U.side=Cn):v.renderBufferDirect(W,N,V,U,T,oe),T.onAfterRender(v,N,W,V,U,oe)}function jn(T,N,W){N.isScene!==!0&&(N=De);const V=fe.get(T),U=m.state.lights,oe=m.state.shadowsArray,Se=U.state.version,we=Q.getParameters(T,U.state,oe,N,W),Pe=Q.getProgramCacheKey(we);let We=V.programs;V.environment=T.isMeshStandardMaterial?N.environment:null,V.fog=N.fog,V.envMap=(T.isMeshStandardMaterial?M:D).get(T.envMap||V.environment),V.envMapRotation=V.environment!==null&&T.envMap===null?N.environmentRotation:T.envMapRotation,We===void 0&&(T.addEventListener("dispose",Ne),We=new Map,V.programs=We);let ke=We.get(Pe);if(ke!==void 0){if(V.currentProgram===ke&&V.lightsStateVersion===Se)return An(T,we),ke}else we.uniforms=Q.getUniforms(T),T.onBeforeCompile(we,v),ke=Q.acquireProgram(we,Pe),We.set(Pe,ke),V.uniforms=we.uniforms;const He=V.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(He.clippingPlanes=Le.uniform),An(T,we),V.needsLights=un(T),V.lightsStateVersion=Se,V.needsLights&&(He.ambientLightColor.value=U.state.ambient,He.lightProbe.value=U.state.probe,He.directionalLights.value=U.state.directional,He.directionalLightShadows.value=U.state.directionalShadow,He.spotLights.value=U.state.spot,He.spotLightShadows.value=U.state.spotShadow,He.rectAreaLights.value=U.state.rectArea,He.ltc_1.value=U.state.rectAreaLTC1,He.ltc_2.value=U.state.rectAreaLTC2,He.pointLights.value=U.state.point,He.pointLightShadows.value=U.state.pointShadow,He.hemisphereLights.value=U.state.hemi,He.directionalShadowMap.value=U.state.directionalShadowMap,He.directionalShadowMatrix.value=U.state.directionalShadowMatrix,He.spotShadowMap.value=U.state.spotShadowMap,He.spotLightMatrix.value=U.state.spotLightMatrix,He.spotLightMap.value=U.state.spotLightMap,He.pointShadowMap.value=U.state.pointShadowMap,He.pointShadowMatrix.value=U.state.pointShadowMatrix),V.currentProgram=ke,V.uniformsList=null,ke}function zi(T){if(T.uniformsList===null){const N=T.currentProgram.getUniforms();T.uniformsList=tc.seqWithValue(N.seq,T.uniforms)}return T.uniformsList}function An(T,N){const W=fe.get(T);W.outputColorSpace=N.outputColorSpace,W.batching=N.batching,W.batchingColor=N.batchingColor,W.instancing=N.instancing,W.instancingColor=N.instancingColor,W.instancingMorph=N.instancingMorph,W.skinning=N.skinning,W.morphTargets=N.morphTargets,W.morphNormals=N.morphNormals,W.morphColors=N.morphColors,W.morphTargetsCount=N.morphTargetsCount,W.numClippingPlanes=N.numClippingPlanes,W.numIntersection=N.numClipIntersection,W.vertexAlphas=N.vertexAlphas,W.vertexTangents=N.vertexTangents,W.toneMapping=N.toneMapping}function gn(T,N,W,V,U){N.isScene!==!0&&(N=De),xe.resetTextureUnits();const oe=N.fog,Se=V.isMeshStandardMaterial?N.environment:null,we=w===null?v.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:is,Pe=(V.isMeshStandardMaterial?M:D).get(V.envMap||Se),We=V.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,ke=!!W.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),He=!!W.morphAttributes.position,et=!!W.morphAttributes.normal,pt=!!W.morphAttributes.color;let at=Ji;V.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(at=v.toneMapping);const Tt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,tt=Tt!==void 0?Tt.length:0,Oe=fe.get(V),At=m.state.lights;if(q===!0&&(Y===!0||T!==E)){const Jt=T===E&&V.id===I;Le.setState(V,T,Jt)}let nt=!1;V.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==At.state.version||Oe.outputColorSpace!==we||U.isBatchedMesh&&Oe.batching===!1||!U.isBatchedMesh&&Oe.batching===!0||U.isBatchedMesh&&Oe.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Oe.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Oe.instancing===!1||!U.isInstancedMesh&&Oe.instancing===!0||U.isSkinnedMesh&&Oe.skinning===!1||!U.isSkinnedMesh&&Oe.skinning===!0||U.isInstancedMesh&&Oe.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Oe.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Oe.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Oe.instancingMorph===!1&&U.morphTexture!==null||Oe.envMap!==Pe||V.fog===!0&&Oe.fog!==oe||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==Le.numPlanes||Oe.numIntersection!==Le.numIntersection)||Oe.vertexAlphas!==We||Oe.vertexTangents!==ke||Oe.morphTargets!==He||Oe.morphNormals!==et||Oe.morphColors!==pt||Oe.toneMapping!==at||Oe.morphTargetsCount!==tt)&&(nt=!0):(nt=!0,Oe.__version=V.version);let Nt=Oe.currentProgram;nt===!0&&(Nt=jn(V,N,U));let qn=!1,Wt=!1,di=!1;const vt=Nt.getUniforms(),dn=Oe.uniforms;if(he.useProgram(Nt.program)&&(qn=!0,Wt=!0,di=!0),V.id!==I&&(I=V.id,Wt=!0),qn||E!==T){vt.setValue(P,"projectionMatrix",T.projectionMatrix),vt.setValue(P,"viewMatrix",T.matrixWorldInverse);const Jt=vt.map.cameraPosition;Jt!==void 0&&Jt.setValue(P,ae.setFromMatrixPosition(T.matrixWorld)),Ce.logarithmicDepthBuffer&&vt.setValue(P,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&vt.setValue(P,"isOrthographic",T.isOrthographicCamera===!0),E!==T&&(E=T,Wt=!0,di=!0)}if(U.isSkinnedMesh){vt.setOptional(P,U,"bindMatrix"),vt.setOptional(P,U,"bindMatrixInverse");const Jt=U.skeleton;Jt&&(Jt.boneTexture===null&&Jt.computeBoneTexture(),vt.setValue(P,"boneTexture",Jt.boneTexture,xe))}U.isBatchedMesh&&(vt.setOptional(P,U,"batchingTexture"),vt.setValue(P,"batchingTexture",U._matricesTexture,xe),vt.setOptional(P,U,"batchingIdTexture"),vt.setValue(P,"batchingIdTexture",U._indirectTexture,xe),vt.setOptional(P,U,"batchingColorTexture"),U._colorsTexture!==null&&vt.setValue(P,"batchingColorTexture",U._colorsTexture,xe));const as=W.morphAttributes;if((as.position!==void 0||as.normal!==void 0||as.color!==void 0)&&_.update(U,W,Nt),(Wt||Oe.receiveShadow!==U.receiveShadow)&&(Oe.receiveShadow=U.receiveShadow,vt.setValue(P,"receiveShadow",U.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(dn.envMap.value=Pe,dn.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&N.environment!==null&&(dn.envMapIntensity.value=N.environmentIntensity),Wt&&(vt.setValue(P,"toneMappingExposure",v.toneMappingExposure),Oe.needsLights&&Et(dn,di),oe&&V.fog===!0&&Ae.refreshFogUniforms(dn,oe),Ae.refreshMaterialUniforms(dn,V,K,k,m.state.transmissionRenderTarget[T.id]),tc.upload(P,zi(Oe),dn,xe)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(tc.upload(P,zi(Oe),dn,xe),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&vt.setValue(P,"center",U.center),vt.setValue(P,"modelViewMatrix",U.modelViewMatrix),vt.setValue(P,"normalMatrix",U.normalMatrix),vt.setValue(P,"modelMatrix",U.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Jt=V.uniformsGroups;for(let Xr=0,Zc=Jt.length;Xr<Zc;Xr++){const sa=Jt[Xr];Je.update(sa,Nt),Je.bind(sa,Nt)}}return Nt}function Et(T,N){T.ambientLightColor.needsUpdate=N,T.lightProbe.needsUpdate=N,T.directionalLights.needsUpdate=N,T.directionalLightShadows.needsUpdate=N,T.pointLights.needsUpdate=N,T.pointLightShadows.needsUpdate=N,T.spotLights.needsUpdate=N,T.spotLightShadows.needsUpdate=N,T.rectAreaLights.needsUpdate=N,T.hemisphereLights.needsUpdate=N}function un(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(T,N,W){fe.get(T.texture).__webglTexture=N,fe.get(T.depthTexture).__webglTexture=W;const V=fe.get(T);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=W===void 0,V.__autoAllocateDepthBuffer||Me.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,N){const W=fe.get(T);W.__webglFramebuffer=N,W.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(T,N=0,W=0){w=T,L=N,A=W;let V=!0,U=null,oe=!1,Se=!1;if(T){const Pe=fe.get(T);if(Pe.__useDefaultFramebuffer!==void 0)he.bindFramebuffer(P.FRAMEBUFFER,null),V=!1;else if(Pe.__webglFramebuffer===void 0)xe.setupRenderTarget(T);else if(Pe.__hasExternalTextures)xe.rebindTextures(T,fe.get(T.texture).__webglTexture,fe.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const He=T.depthTexture;if(Pe.__boundDepthTexture!==He){if(He!==null&&fe.has(He)&&(T.width!==He.image.width||T.height!==He.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");xe.setupDepthRenderbuffer(T)}}const We=T.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(Se=!0);const ke=fe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ke[N])?U=ke[N][W]:U=ke[N],oe=!0):T.samples>0&&xe.useMultisampledRTT(T)===!1?U=fe.get(T).__webglMultisampledFramebuffer:Array.isArray(ke)?U=ke[W]:U=ke,S.copy(T.viewport),C.copy(T.scissor),O=T.scissorTest}else S.copy(ce).multiplyScalar(K).floor(),C.copy(ue).multiplyScalar(K).floor(),O=Te;if(he.bindFramebuffer(P.FRAMEBUFFER,U)&&V&&he.drawBuffers(T,U),he.viewport(S),he.scissor(C),he.setScissorTest(O),oe){const Pe=fe.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+N,Pe.__webglTexture,W)}else if(Se){const Pe=fe.get(T.texture),We=N||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Pe.__webglTexture,W||0,We)}I=-1},this.readRenderTargetPixels=function(T,N,W,V,U,oe,Se){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=fe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Se!==void 0&&(we=we[Se]),we){he.bindFramebuffer(P.FRAMEBUFFER,we);try{const Pe=T.texture,We=Pe.format,ke=Pe.type;if(!Ce.textureFormatReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ce.textureTypeReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=T.width-V&&W>=0&&W<=T.height-U&&P.readPixels(N,W,V,U,ze.convert(We),ze.convert(ke),oe)}finally{const Pe=w!==null?fe.get(w).__webglFramebuffer:null;he.bindFramebuffer(P.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(T,N,W,V,U,oe,Se){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=fe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Se!==void 0&&(we=we[Se]),we){he.bindFramebuffer(P.FRAMEBUFFER,we);try{const Pe=T.texture,We=Pe.format,ke=Pe.type;if(!Ce.textureFormatReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ce.textureTypeReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=T.width-V&&W>=0&&W<=T.height-U){const He=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,He),P.bufferData(P.PIXEL_PACK_BUFFER,oe.byteLength,P.STREAM_READ),P.readPixels(N,W,V,U,ze.convert(We),ze.convert(ke),0),P.flush();const et=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);await Dg(P,et,4);try{P.bindBuffer(P.PIXEL_PACK_BUFFER,He),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,oe)}finally{P.deleteBuffer(He),P.deleteSync(et)}return oe}}finally{const Pe=w!==null?fe.get(w).__webglFramebuffer:null;he.bindFramebuffer(P.FRAMEBUFFER,Pe)}}},this.copyFramebufferToTexture=function(T,N=null,W=0){T.isTexture!==!0&&(gr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,T=arguments[1]);const V=Math.pow(2,-W),U=Math.floor(T.image.width*V),oe=Math.floor(T.image.height*V),Se=N!==null?N.x:0,we=N!==null?N.y:0;xe.setTexture2D(T,0),P.copyTexSubImage2D(P.TEXTURE_2D,W,0,0,Se,we,U,oe),he.unbindTexture()},this.copyTextureToTexture=function(T,N,W=null,V=null,U=0){T.isTexture!==!0&&(gr("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,T=arguments[1],N=arguments[2],U=arguments[3]||0,W=null);let oe,Se,we,Pe,We,ke;W!==null?(oe=W.max.x-W.min.x,Se=W.max.y-W.min.y,we=W.min.x,Pe=W.min.y):(oe=T.image.width,Se=T.image.height,we=0,Pe=0),V!==null?(We=V.x,ke=V.y):(We=0,ke=0);const He=ze.convert(N.format),et=ze.convert(N.type);xe.setTexture2D(N,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);const pt=P.getParameter(P.UNPACK_ROW_LENGTH),at=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Tt=P.getParameter(P.UNPACK_SKIP_PIXELS),tt=P.getParameter(P.UNPACK_SKIP_ROWS),Oe=P.getParameter(P.UNPACK_SKIP_IMAGES),At=T.isCompressedTexture?T.mipmaps[U]:T.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,At.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,At.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,we),P.pixelStorei(P.UNPACK_SKIP_ROWS,Pe),T.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,U,We,ke,oe,Se,He,et,At.data):T.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,U,We,ke,At.width,At.height,He,At.data):P.texSubImage2D(P.TEXTURE_2D,U,We,ke,oe,Se,He,et,At),P.pixelStorei(P.UNPACK_ROW_LENGTH,pt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,at),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Tt),P.pixelStorei(P.UNPACK_SKIP_ROWS,tt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Oe),U===0&&N.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),he.unbindTexture()},this.copyTextureToTexture3D=function(T,N,W=null,V=null,U=0){T.isTexture!==!0&&(gr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,V=arguments[1]||null,T=arguments[2],N=arguments[3],U=arguments[4]||0);let oe,Se,we,Pe,We,ke,He,et,pt;const at=T.isCompressedTexture?T.mipmaps[U]:T.image;W!==null?(oe=W.max.x-W.min.x,Se=W.max.y-W.min.y,we=W.max.z-W.min.z,Pe=W.min.x,We=W.min.y,ke=W.min.z):(oe=at.width,Se=at.height,we=at.depth,Pe=0,We=0,ke=0),V!==null?(He=V.x,et=V.y,pt=V.z):(He=0,et=0,pt=0);const Tt=ze.convert(N.format),tt=ze.convert(N.type);let Oe;if(N.isData3DTexture)xe.setTexture3D(N,0),Oe=P.TEXTURE_3D;else if(N.isDataArrayTexture||N.isCompressedArrayTexture)xe.setTexture2DArray(N,0),Oe=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);const At=P.getParameter(P.UNPACK_ROW_LENGTH),nt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Nt=P.getParameter(P.UNPACK_SKIP_PIXELS),qn=P.getParameter(P.UNPACK_SKIP_ROWS),Wt=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,at.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,at.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Pe),P.pixelStorei(P.UNPACK_SKIP_ROWS,We),P.pixelStorei(P.UNPACK_SKIP_IMAGES,ke),T.isDataTexture||T.isData3DTexture?P.texSubImage3D(Oe,U,He,et,pt,oe,Se,we,Tt,tt,at.data):N.isCompressedArrayTexture?P.compressedTexSubImage3D(Oe,U,He,et,pt,oe,Se,we,Tt,at.data):P.texSubImage3D(Oe,U,He,et,pt,oe,Se,we,Tt,tt,at),P.pixelStorei(P.UNPACK_ROW_LENGTH,At),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,nt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Nt),P.pixelStorei(P.UNPACK_SKIP_ROWS,qn),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Wt),U===0&&N.generateMipmaps&&P.generateMipmap(Oe),he.unbindTexture()},this.initRenderTarget=function(T){fe.get(T).__webglFramebuffer===void 0&&xe.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?xe.setTextureCube(T,0):T.isData3DTexture?xe.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?xe.setTexture2DArray(T,0):xe.setTexture2D(T,0),he.unbindTexture()},this.resetState=function(){L=0,A=0,w=null,he.reset(),Fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===dd?"display-p3":"srgb",t.unpackColorSpace=rt.workingColorSpace===Hc?"display-p3":"srgb"}}class U_ extends qt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vn,this.environmentIntensity=1,this.environmentRotation=new Vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class em{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ru,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Di()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return gr("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const nn=new R;class ei{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix4(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)nn.fromBufferAttribute(this,t),nn.applyNormalMatrix(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)nn.fromBufferAttribute(this,t),nn.transformDirection(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=zn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=lt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=zn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=zn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=zn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=zn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),s=lt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),s=lt(s,this.array),r=lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Kt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ei(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class wo extends ss{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new je(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ir;const Jr=new R,sr=new R,rr=new R,or=new be,Qr=new be,tm=new ot,Da=new R,$r=new R,wa=new R,Wh=new be,bl=new be,Vh=new be;class fc extends qt{constructor(e=new wo){if(super(),this.isSprite=!0,this.type="Sprite",ir===void 0){ir=new yt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new em(t,5);ir.setIndex([0,1,2,0,2,3]),ir.setAttribute("position",new ei(i,3,0,!1)),ir.setAttribute("uv",new ei(i,2,3,!1))}this.geometry=ir,this.material=e,this.center=new be(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),sr.setFromMatrixScale(this.matrixWorld),tm.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),rr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&sr.multiplyScalar(-rr.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const o=this.center;Pa(Da.set(-.5,-.5,0),rr,o,sr,s,r),Pa($r.set(.5,-.5,0),rr,o,sr,s,r),Pa(wa.set(.5,.5,0),rr,o,sr,s,r),Wh.set(0,0),bl.set(1,0),Vh.set(1,1);let a=e.ray.intersectTriangle(Da,$r,wa,!1,Jr);if(a===null&&(Pa($r.set(-.5,.5,0),rr,o,sr,s,r),bl.set(0,1),a=e.ray.intersectTriangle(Da,wa,$r,!1,Jr),a===null))return;const c=e.ray.origin.distanceTo(Jr);c<e.near||c>e.far||t.push({distance:c,point:Jr.clone(),uv:Fn.getInterpolation(Jr,Da,$r,wa,Wh,bl,Vh,new be),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Pa(n,e,t,i,s,r){or.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(Qr.x=r*or.x-s*or.y,Qr.y=s*or.x+r*or.y):Qr.copy(or),n.copy(e),n.x+=Qr.x,n.y+=Qr.y,n.applyMatrix4(tm)}class N_ extends It{constructor(e=null,t=1,i=1,s,r,o,a,c,l=kt,u=kt,d,h){super(null,o,a,c,l,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xh extends Kt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ar=new ot,Yh=new ot,Ca=[],jh=new li,O_=new ot,eo=new wt,to=new Oi;class z_ extends wt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Xh(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,O_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new li),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ar),jh.copy(e.boundingBox).applyMatrix4(ar),this.boundingBox.union(jh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Oi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ar),to.copy(e.boundingSphere).applyMatrix4(ar),this.boundingSphere.union(to)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=e*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(eo.geometry=this.geometry,eo.material=this.material,eo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),to.copy(this.boundingSphere),to.applyMatrix4(i),e.ray.intersectsSphere(to)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ar),Yh.multiplyMatrices(i,ar),eo.matrixWorld=Yh,eo.raycast(e,Ca);for(let o=0,a=Ca.length;o<a;o++){const c=Ca[o];c.instanceId=r,c.object=this,t.push(c)}Ca.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Xh(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new N_(new Float32Array(s*this.count),s,this.count,ad,$n));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(i,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Po extends ss{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const pc=new R,mc=new R,qh=new ot,no=new Xo,Ra=new Oi,El=new R,Kh=new R;class gc extends qt{constructor(e=new yt,t=new Po){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)pc.fromBufferAttribute(t,s-1),mc.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=pc.distanceTo(mc);e.setAttribute("lineDistance",new xt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ra.copy(i.boundingSphere),Ra.applyMatrix4(s),Ra.radius+=r,e.ray.intersectsSphere(Ra)===!1)return;qh.copy(s).invert(),no.copy(e.ray).applyMatrix4(qh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=l){const p=u.getX(x),y=u.getX(x+1),v=La(this,e,no,c,p,y);v&&t.push(v)}if(this.isLineLoop){const x=u.getX(g-1),m=u.getX(f),p=La(this,e,no,c,x,m);p&&t.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=l){const p=La(this,e,no,c,x,x+1);p&&t.push(p)}if(this.isLineLoop){const x=La(this,e,no,c,g-1,f);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function La(n,e,t,i,s,r){const o=n.geometry.attributes.position;if(pc.fromBufferAttribute(o,s),mc.fromBufferAttribute(o,r),t.distanceSqToSegment(pc,mc,El,Kh)>i)return;El.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(El);if(!(c<e.near||c>e.far))return{distance:c,point:Kh.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,object:n}}const Zh=new R,Jh=new R;class Qh extends gc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Zh.fromBufferAttribute(t,s),Jh.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Zh.distanceTo(Jh);e.setAttribute("lineDistance",new xt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class xc extends ss{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const $h=new ot,Iu=new Xo,Ia=new Oi,Ha=new R;class Co extends qt{constructor(e=new yt,t=new xc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ia.copy(i.boundingSphere),Ia.applyMatrix4(s),Ia.radius+=r,e.ray.intersectsSphere(Ia)===!1)return;$h.copy(s).invert(),Iu.copy(e.ray).applyMatrix4($h);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,d=i.attributes.position;if(l!==null){const h=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=h,x=f;g<x;g++){const m=l.getX(g);Ha.fromBufferAttribute(d,m),ef(Ha,m,c,s,e,t,this)}}else{const h=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=h,x=f;g<x;g++)Ha.fromBufferAttribute(d,g),ef(Ha,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ef(n,e,t,i,s,r,o){const a=Iu.distanceSqToPoint(n);if(a<t){const c=new R;Iu.closestPointToPoint(n,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:o})}}class Br extends It{constructor(e,t,i,s,r,o,a,c,l){super(e,t,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class gd extends yt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],o=[];a(s),l(i),u(),this.setAttribute("position",new xt(r,3)),this.setAttribute("normal",new xt(r.slice(),3)),this.setAttribute("uv",new xt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const v=new R,b=new R,L=new R;for(let A=0;A<t.length;A+=3)f(t[A+0],v),f(t[A+1],b),f(t[A+2],L),c(v,b,L,y)}function c(y,v,b,L){const A=L+1,w=[];for(let I=0;I<=A;I++){w[I]=[];const E=y.clone().lerp(b,I/A),S=v.clone().lerp(b,I/A),C=A-I;for(let O=0;O<=C;O++)O===0&&I===A?w[I][O]=E:w[I][O]=E.clone().lerp(S,O/C)}for(let I=0;I<A;I++)for(let E=0;E<2*(A-I)-1;E++){const S=Math.floor(E/2);E%2===0?(h(w[I][S+1]),h(w[I+1][S]),h(w[I][S])):(h(w[I][S+1]),h(w[I+1][S+1]),h(w[I+1][S]))}}function l(y){const v=new R;for(let b=0;b<r.length;b+=3)v.x=r[b+0],v.y=r[b+1],v.z=r[b+2],v.normalize().multiplyScalar(y),r[b+0]=v.x,r[b+1]=v.y,r[b+2]=v.z}function u(){const y=new R;for(let v=0;v<r.length;v+=3){y.x=r[v+0],y.y=r[v+1],y.z=r[v+2];const b=m(y)/2/Math.PI+.5,L=p(y)/Math.PI+.5;o.push(b,1-L)}g(),d()}function d(){for(let y=0;y<o.length;y+=6){const v=o[y+0],b=o[y+2],L=o[y+4],A=Math.max(v,b,L),w=Math.min(v,b,L);A>.9&&w<.1&&(v<.2&&(o[y+0]+=1),b<.2&&(o[y+2]+=1),L<.2&&(o[y+4]+=1))}}function h(y){r.push(y.x,y.y,y.z)}function f(y,v){const b=y*3;v.x=e[b+0],v.y=e[b+1],v.z=e[b+2]}function g(){const y=new R,v=new R,b=new R,L=new R,A=new be,w=new be,I=new be;for(let E=0,S=0;E<r.length;E+=9,S+=6){y.set(r[E+0],r[E+1],r[E+2]),v.set(r[E+3],r[E+4],r[E+5]),b.set(r[E+6],r[E+7],r[E+8]),A.set(o[S+0],o[S+1]),w.set(o[S+2],o[S+3]),I.set(o[S+4],o[S+5]),L.copy(y).add(v).add(b).divideScalar(3);const C=m(L);x(A,S+0,y,C),x(w,S+2,v,C),x(I,S+4,b,C)}}function x(y,v,b,L){L<0&&y.x===1&&(o[v]=y.x-1),b.x===0&&b.z===0&&(o[v]=L/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gd(e.vertices,e.indices,e.radius,e.details)}}class xd extends gd{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new xd(e.radius,e.detail)}}class vc extends yt{constructor(e=.5,t=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],c=[],l=[],u=[];let d=e;const h=(t-e)/s,f=new R,g=new be;for(let x=0;x<=s;x++){for(let m=0;m<=i;m++){const p=r+m/i*o;f.x=d*Math.cos(p),f.y=d*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}d+=h}for(let x=0;x<s;x++){const m=x*(i+1);for(let p=0;p<i;p++){const y=p+m,v=y,b=y+i+1,L=y+i+2,A=y+1;a.push(v,b,A),a.push(b,L,A)}}this.setIndex(a),this.setAttribute("position",new xt(c,3)),this.setAttribute("normal",new xt(l,3)),this.setAttribute("uv",new xt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Rs extends yt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const u=[],d=new R,h=new R,f=[],g=[],x=[],m=[];for(let p=0;p<=i;p++){const y=[],v=p/i;let b=0;p===0&&o===0?b=.5/t:p===i&&c===Math.PI&&(b=-.5/t);for(let L=0;L<=t;L++){const A=L/t;d.x=-e*Math.cos(s+A*r)*Math.sin(o+v*a),d.y=e*Math.cos(o+v*a),d.z=e*Math.sin(s+A*r)*Math.sin(o+v*a),g.push(d.x,d.y,d.z),h.copy(d).normalize(),x.push(h.x,h.y,h.z),m.push(A+b,1-v),y.push(l++)}u.push(y)}for(let p=0;p<i;p++)for(let y=0;y<t;y++){const v=u[p][y+1],b=u[p][y],L=u[p+1][y],A=u[p+1][y+1];(p!==0||o>0)&&f.push(v,b,A),(p!==i-1||c<Math.PI)&&f.push(b,L,A)}this.setIndex(f),this.setAttribute("position",new xt(g,3)),this.setAttribute("normal",new xt(x,3)),this.setAttribute("uv",new xt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class F_ extends yt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],i=new Set,s=new R,r=new R;if(e.index!==null){const o=e.attributes.position,a=e.index;let c=e.groups;c.length===0&&(c=[{start:0,count:a.count,materialIndex:0}]);for(let l=0,u=c.length;l<u;++l){const d=c[l],h=d.start,f=d.count;for(let g=h,x=h+f;g<x;g+=3)for(let m=0;m<3;m++){const p=a.getX(g+m),y=a.getX(g+(m+1)%3);s.fromBufferAttribute(o,p),r.fromBufferAttribute(o,y),tf(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{const o=e.attributes.position;for(let a=0,c=o.count/3;a<c;a++)for(let l=0;l<3;l++){const u=3*a+l,d=3*a+(l+1)%3;s.fromBufferAttribute(o,u),r.fromBufferAttribute(o,d),tf(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new xt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function tf(n,e,t){const i=`${n.x},${n.y},${n.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${n.x},${n.y},${n.z}`;return t.has(i)===!0||t.has(s)===!0?!1:(t.add(i),t.add(s),!0)}class B_ extends _t{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ro extends ss{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Up,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const nf={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class k_{constructor(e,t,i){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){const d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){const f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}}const G_=new k_;class vd{constructor(e){this.manager=e!==void 0?e:G_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}vd.DEFAULT_MATERIAL_NAME="__DEFAULT";class W_ extends vd{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=nf.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=Do("img");function c(){u(),nf.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(d){u(),s&&s(d),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class _d extends vd{constructor(e){super(e)}load(e,t,i,s){const r=new It,o=new W_(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}}class nm extends qt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Tl=new ot,sf=new R,rf=new R;class V_{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new be(512,512),this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new pd,this._frameExtents=new be(1,1),this._viewportCount=1,this._viewports=[new ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;sf.setFromMatrixPosition(e.matrixWorld),t.position.copy(sf),rf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rf),t.updateMatrixWorld(),Tl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Tl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Tl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const of=new ot,io=new R,Al=new R;class X_ extends V_{constructor(){super(new Mn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new be(4,2),this._viewportCount=6,this._viewports=[new ct(2,1,1,1),new ct(0,1,1,1),new ct(3,1,1,1),new ct(1,1,1,1),new ct(3,0,1,1),new ct(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),io.setFromMatrixPosition(e.matrixWorld),i.position.copy(io),Al.copy(i.position),Al.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Al),i.updateMatrixWorld(),s.makeTranslation(-io.x,-io.y,-io.z),of.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(of)}}class Y_ extends nm{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new X_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class j_ extends nm{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class q_ extends yt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class K_{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=af(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=af();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function af(){return(typeof performance>"u"?Date:performance).now()}class Hu extends em{constructor(e,t,i=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}const cf=new ot;class im{constructor(e,t,i=0,s=1/0){this.ray=new Xo(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new fd,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return cf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(cf),this}intersectObject(e,t=!0,i=[]){return Uu(e,this,i,t),i.sort(lf),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Uu(e[s],this,i,t);return i.sort(lf),i}}function lf(n,e){return n.distance-e.distance}function Uu(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)Uu(r[o],e,t,!0)}}class uf{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(jt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const df=new R,Ua=new R;class Z_{constructor(e=new R,t=new R){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){df.subVectors(e,this.start),Ua.subVectors(this.end,this.start);const i=Ua.dot(Ua);let r=Ua.dot(df)/i;return t&&(r=jt(r,0,1)),r}closestPointToPoint(e,t,i){const s=this.closestPointToPointParameter(e,t);return this.delta(i).multiplyScalar(s).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}class J_ extends Fs{constructor(e,t){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:nd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=nd);const Ln=Date.UTC(2e3,0,1,12,0,0),ji=36525,Xn=1495978707e-1;class Q_{days;logMag=0;reversed=!1;paused=!1;constructor(e=Date.now()){this.days=(e-Ln)/864e5}get t(){return this.days}setDate(e){const t=e instanceof Date?e.getTime():e;this.days=(t-Ln)/864e5}getSpeed(){return(this.reversed?-1:1)*10**this.logMag}setLogSpeed(e){this.logMag=e}getLogSpeed(){return this.logMag}get isReversed(){return this.reversed}setReversed(e){this.reversed=e}get isPaused(){return this.paused}setPaused(e){this.paused=e}tick(e){this.paused||(this.days+=this.getSpeed()*e)}preScrubPaused=!1;beginScrub(){this.preScrubPaused=this.paused,this.paused=!0}endScrub(){this.paused=this.preScrubPaused}toDate(){return new Date(Ln+this.days*864e5)}}const ye=n=>[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255],Md={id:"sun",name:"Sun",kind:"star",radiusKm:695700,rotationHours:609.12,tiltDeg:7.25,color:ye(16765567),color2:ye(16751935),texture:"sun"},on=[{id:"mercury",name:"Mercury",kind:"planet",parent:"sun",elements:{a:.38709843,e:.20563661,i:7.00559432,node:48.33961819,peri:29.118100759999997,M0:174.79394829,n:4.09233444,rates:{a:0,e:2123e-8,i:-.00590158,node:-.12214182,peri:.28154195}},radiusKm:2439.7,rotationHours:1407.5,tiltDeg:.034,color:ye(10263708),color2:ye(7828591),texture:"rock"},{id:"venus",name:"Venus",kind:"planet",parent:"sun",elements:{a:.72332102,e:.00676399,i:3.39777545,node:76.67261496,peri:55.094942169999996,M0:50.21215136999999,n:1.60212892,rates:{a:-26e-8,e:-5107e-8,i:43494e-8,node:-.27274174,peri:.32953822}},radiusKm:6051.8,rotationHours:-5832.5,tiltDeg:177.36,color:ye(15124874),color2:ye(13215850),texture:"gas"},{id:"earth",name:"Earth",kind:"planet",parent:"sun",elements:{a:1.00000018,e:.01673163,i:-54346e-8,node:-5.11260389,peri:108.04266274,M0:-2.4631431299999917,n:.98560041,rates:{a:-3e-8,e:-3661e-8,i:-.01337178,node:-.24123856,peri:.5591911599999999}},radiusKm:6371,rotationHours:23.93,tiltDeg:23.44,color:ye(5211846),color2:ye(4160831),texture:"earth"},{id:"mars",name:"Mars",kind:"planet",parent:"sun",elements:{a:1.52371243,e:.09336511,i:1.85181869,node:49.71320984,peri:-73.63065768,M0:19.3493162,n:.52402045,rates:{a:97e-8,e:9149e-8,i:-.00724757,node:-.26852431,peri:.72076056}},radiusKm:3389.5,rotationHours:24.62,tiltDeg:25.19,color:ye(12671035),color2:ye(9387304),texture:"rock"},{id:"jupiter",name:"Jupiter",kind:"planet",parent:"sun",elements:{a:5.20248019,e:.0485359,i:1.29861416,node:100.29282654,peri:-86.0178741,M0:20.059839080000003,n:.08308615,rates:{a:-2864e-8,e:18026e-8,i:-.00322699,node:.13024619,peri:.051745769999999996},periodicM:[{b:-12452e-8,c:.0606406,s:-.35635438,f:38.35125}]},radiusKm:69911,rotationHours:9.93,tiltDeg:3.13,color:ye(14203277),color2:ye(11041872),texture:"gas"},{id:"saturn",name:"Saturn",kind:"planet",parent:"sun",elements:{a:9.54149883,e:.05550825,i:2.49424102,node:113.63998702,peri:-20.778626390000014,M0:-42.78564733999999,n:.03344485,rates:{a:-3065e-8,e:-32044e-8,i:.00451969,node:-.25015002,peri:.7919448},periodicM:[{b:25899e-8,c:-.13434469,s:.87320147,f:38.35125}]},radiusKm:58232,rotationHours:10.66,tiltDeg:26.73,color:ye(14930851),color2:ye(12560250),texture:"gas",rings:{inner:1.24,outer:2.27,opacity:.85,color:ye(13616294)}},{id:"uranus",name:"Uranus",kind:"planet",parent:"sun",elements:{a:19.18797948,e:.0468574,i:.77298127,node:73.96250215,peri:98.47154226,M0:141.76872184,n:.01172902,rates:{a:-20455e-8,e:-155e-7,i:-.00180155,node:.05739699,peri:.035272859999999996},periodicM:[{b:58331e-8,c:-.97731848,s:.17689245,f:7.67025}]},radiusKm:25362,rotationHours:-17.24,tiltDeg:97.77,color:ye(10475744),color2:ye(8176332),texture:"ice",rings:{inner:1.64,outer:2,opacity:.25,color:ye(10467520)}},{id:"neptune",name:"Neptune",kind:"planet",parent:"sun",elements:{a:30.06952752,e:.00895439,i:1.7700552,node:131.78635853,peri:-85.10477129,M0:257.54130563,n:.00598097,rates:{a:6447e-8,e:818e-8,i:224e-6,node:-.00606302,peri:.0161624},periodicM:[{b:-41348e-8,c:.68346318,s:-.10162547,f:7.67025}]},radiusKm:24622,rotationHours:16.11,tiltDeg:28.32,color:ye(4613833),color2:ye(3099294),texture:"ice"}],$_=[{id:"pluto",name:"Pluto",kind:"dwarf",parent:"sun",elements:{a:39.48211675,e:.2488273,i:17.14,node:110.299,peri:113.834,M0:14.53,n:.003964},radiusKm:1188.3,rotationHours:-153.29,tiltDeg:119.6,color:ye(12101268),color2:ye(9404270),texture:"rock"},{id:"ceres",name:"Ceres",kind:"dwarf",parent:"sun",elements:{a:2.7675,e:.0758,i:10.594,node:80.305,peri:73.597,M0:32.84,n:.21426},radiusKm:469.7,rotationHours:9.07,tiltDeg:3.8,color:ye(9211020),color2:ye(6974058),texture:"rock"},{id:"eris",name:"Eris",kind:"dwarf",parent:"sun",elements:{a:67.864,e:.436,i:44.04,node:35.95,peri:151.61,M0:235.7,n:.001763},radiusKm:1163,rotationHours:25.9,tiltDeg:26.6,color:ye(12895428),color2:ye(10132122),texture:"ice"},{id:"haumea",name:"Haumea",kind:"dwarf",parent:"sun",elements:{a:43.11,e:.1948,i:28.26,node:122.29,peri:239.75,M0:202.4,n:.003482},radiusKm:745,rotationHours:15.94,tiltDeg:0,color:ye(14210252),color2:ye(11052188),texture:"ice"},{id:"makemake",name:"Makemake",kind:"dwarf",parent:"sun",elements:{a:45.43,e:.1611,i:29,node:79.35,peri:294.2,M0:16.2,n:.003219},radiusKm:715,rotationHours:22.8,tiltDeg:0,color:ye(12884600),color2:ye(10122328),texture:"ice"}],yd=[{id:"moon",name:"Moon",kind:"moon",parent:"earth",elements:{a:384400,e:.0549,i:5.145,node:125.08,peri:318.15,M0:115.36,n:13.17635},radiusKm:1737.4,rotationHours:655.72,tiltDeg:6.68,color:ye(12434877),color2:ye(9408399),texture:"rock"},{id:"iss",name:"ISS",kind:"moon",parent:"earth",radiusKm:100,rotationHours:1.5,tiltDeg:0,color:ye(14211296),color2:ye(10132136),texture:"rock"},{id:"phobos",name:"Phobos",kind:"moon",parent:"mars",elements:{a:9376,e:.0151,i:1.075,node:318.7,peri:260,M0:140,n:1128.96},radiusKm:11.27,rotationHours:7.65,tiltDeg:1.08,color:ye(9076594),texture:"rock"},{id:"deimos",name:"Deimos",kind:"moon",parent:"mars",elements:{a:23460,e:3e-4,i:1.796,node:104.4,peri:305.6,M0:180,n:285.16},radiusKm:6.2,rotationHours:30.3,tiltDeg:1.78,color:ye(10260612),texture:"rock"},{id:"io",name:"Io",kind:"moon",parent:"jupiter",elements:{a:421700,e:.0041,i:.04,node:150.8,peri:137.3,M0:100,n:203.494},radiusKm:1821.6,rotationHours:42.46,tiltDeg:.05,color:ye(14271850),color2:ye(12092987),texture:"volcanic"},{id:"europa",name:"Europa",kind:"moon",parent:"jupiter",elements:{a:671100,e:.009,i:.47,node:124.8,peri:160.4,M0:100,n:101.375},radiusKm:1560.8,rotationHours:43.45,tiltDeg:.47,color:ye(13616302),color2:ye(10521976),texture:"ice"},{id:"ganymede",name:"Ganymede",kind:"moon",parent:"jupiter",elements:{a:1070400,e:.0013,i:.2,node:197,peri:118.5,M0:105,n:50.318},radiusKm:2634.1,rotationHours:71.94,tiltDeg:.2,color:ye(11050124),color2:ye(8221800),texture:"rock"},{id:"callisto",name:"Callisto",kind:"moon",parent:"jupiter",elements:{a:1882700,e:.0074,i:.19,node:308.5,peri:332.5,M0:35,n:21.57},radiusKm:2410.3,rotationHours:89.56,tiltDeg:.19,color:ye(8221800),color2:ye(6051405),texture:"rock"},{id:"titan",name:"Titan",kind:"moon",parent:"saturn",elements:{a:1221870,e:.0288,i:.35,node:125.8,peri:346.8,M0:100,n:22.577},radiusKm:2574.7,rotationHours:15.94,tiltDeg:.35,color:ye(14068058),color2:ye(11042364),texture:"gas"},{id:"triton",name:"Triton",kind:"moon",parent:"neptune",elements:{a:354759,e:16e-6,i:156.74,node:47.4,peri:5.4,M0:145,n:61.256},radiusKm:1353.4,rotationHours:-5.88,tiltDeg:156.74,color:ye(13156270),color2:ye(10261636),texture:"ice"},{id:"amalthea",name:"Amalthea",kind:"moon",parent:"jupiter",elements:{a:181353,e:.0761,i:.32,node:206.9,peri:271.2,M0:200,n:722.57},radiusKm:85.5,rotationHours:11.96,tiltDeg:.32,color:ye(9062970),color2:ye(7223852),texture:"rock"},{id:"himalia",name:"Himalia",kind:"moon",parent:"jupiter",elements:{a:11509150,e:.1137,i:28.57,node:96.9,peri:186,M0:100,n:2.131},radiusKm:85,rotationHours:382.7,tiltDeg:28.57,color:ye(9209984),color2:ye(6973024),texture:"rock"},{id:"enceladus",name:"Enceladus",kind:"moon",parent:"saturn",elements:{a:237948,e:.0047,i:.01,node:272.9,peri:130.8,M0:200,n:262.74},radiusKm:252.1,rotationHours:32.89,tiltDeg:.01,color:ye(15266034),color2:ye(12899544),texture:"ice"},{id:"tethys",name:"Tethys",kind:"moon",parent:"saturn",elements:{a:294600,e:1e-4,i:1.09,node:127,peri:193.8,M0:90,n:225.87},radiusKm:531.1,rotationHours:38.25,tiltDeg:1.09,color:ye(14210248),color2:ye(11841700),texture:"ice"},{id:"dione",name:"Dione",kind:"moon",parent:"saturn",elements:{a:377300,e:.0022,i:.02,node:117.3,peri:127.4,M0:200,n:131.53},radiusKm:561.4,rotationHours:65.69,tiltDeg:.02,color:ye(12631216),color2:ye(10262668),texture:"ice"},{id:"rhea",name:"Rhea",kind:"moon",parent:"saturn",elements:{a:527108,e:.0013,i:.35,node:250.4,peri:130.1,M0:100,n:79.68},radiusKm:763.8,rotationHours:108.44,tiltDeg:.35,color:ye(11578528),color2:ye(9209984),texture:"ice"},{id:"iapetus",name:"Iapetus",kind:"moon",parent:"saturn",elements:{a:3560820,e:.0286,i:15.47,node:213.9,peri:198.1,M0:200,n:4.54},radiusKm:734.5,rotationHours:1903.7,tiltDeg:15.47,color:ye(10127992),color2:ye(5129272),texture:"rock"},{id:"miranda",name:"Miranda",kind:"moon",parent:"uranus",elements:{a:129390,e:.0013,i:.1,node:180.9,peri:222.9,M0:100,n:254.69},radiusKm:235.8,rotationHours:33.92,tiltDeg:.1,color:ye(11052188),color2:ye(8683642),texture:"rock"},{id:"ariel",name:"Ariel",kind:"moon",parent:"uranus",elements:{a:190900,e:.0012,i:.26,node:169.5,peri:294.9,M0:100,n:142.86},radiusKm:578.9,rotationHours:60.48,tiltDeg:.26,color:ye(12631214),color2:ye(10263182),texture:"ice"},{id:"umbriel",name:"Umbriel",kind:"moon",parent:"uranus",elements:{a:266e3,e:.0039,i:.13,node:133.3,peri:250.7,M0:100,n:86.87},radiusKm:584.7,rotationHours:99.46,tiltDeg:.13,color:ye(7236196),color2:ye(5525578),texture:"ice"},{id:"titania",name:"Titania",kind:"moon",parent:"uranus",elements:{a:435910,e:.0011,i:.34,node:98.7,peri:290.8,M0:100,n:41.35},radiusKm:788.4,rotationHours:208.9,tiltDeg:.34,color:ye(10262156),color2:ye(8025194),texture:"ice"},{id:"oberon",name:"Oberon",kind:"moon",parent:"uranus",elements:{a:583520,e:8e-4,i:.06,node:79.3,peri:70.6,M0:100,n:26.75},radiusKm:761.4,rotationHours:323,tiltDeg:.06,color:ye(8946298),color2:ye(6709338),texture:"ice"},{id:"nereid",name:"Nereid",kind:"moon",parent:"neptune",elements:{a:5513700,e:.7482,i:7.31,node:130,peri:5.2,M0:100,n:1.1731},radiusKm:170,rotationHours:5.2,tiltDeg:7.31,color:ye(9472120),color2:ye(6972504),texture:"rock"}],qo=[Md,...on,...$_,...yd],eM={sun:["solar","star"],moon:["luna","earth moon","the moon"],mercury:["mercury"],venus:["venus","morning star"],earth:["earth","world"],mars:["mars"],jupiter:["jupiter"],saturn:["saturn"],uranus:["uranus"],neptune:["neptune"],pluto:["pluto"],ceres:["ceres"],eris:["eris"],haumea:["haumea"],makemake:["makemake"]};function sm(n){const e=[],t=new Set,i=s=>s.name;for(const s of n)if(s.kind!=="moon"){if(s.kind==="star"){e.push({id:s.id,name:i(s),kind:s.kind,sub:"the star"}),t.add(s.id);continue}if(s.kind!=="dwarf"){e.push({id:s.id,name:i(s),kind:s.kind,sub:"planet"}),t.add(s.id);for(const r of n)r.kind!=="moon"||r.parent!==s.id||(e.push({id:r.id,name:i(r),kind:"moon",parentName:i(s),sub:`moon of ${i(s)}`}),t.add(r.id))}}for(const s of n)s.kind==="dwarf"&&!t.has(s.id)&&(e.push({id:s.id,name:i(s),kind:s.kind,parentName:"sun",sub:"dwarf planet"}),t.add(s.id));return e}const wn=n=>n.toLowerCase().trim().replace(/\s+/g," ");function tM(n,e,t){const i=new Set;i.add(wn(e.name)),i.add(wn(e.kind));for(const s of eM[n]??[])i.add(wn(s));return t&&(i.add(wn(t)),i.add(wn(`${e.kind} of ${t}`)),i.add(wn(`${t} ${e.kind}`))),[...i]}function nM(n,e,t,i){const s=tM(n,e,i);let r=-1;if(t===wn(e.name))r=100;else if(wn(e.name).startsWith(t))r=80;else if(wn(e.name).includes(t))r=60;else{for(const o of s)if(o.includes(t)){r=o===t?70:40;break}if(r<0)return-1}return i&&wn(i).includes(t)&&(r+=10),r-=wn(e.name).length/4,r}function iM(n,e){const t=wn(e),i=sm(n);return t?i.map(r=>({e:r,s:nM(r.id,r,t,r.parentName)})).filter(r=>r.s>=0).sort((r,o)=>o.s-r.s||r.e.name.localeCompare(o.e.name)).map(r=>({id:r.e.id,name:r.e.name,kind:r.e.kind,parentName:r.e.parentName})):i.map(r=>({id:r.id,name:r.name,kind:r.kind,parentName:r.parentName}))}function Nc(n,e){const t=Math.PI/180,i=n*15*t,s=e*t,r=Math.cos(s),o=r*Math.cos(i),a=r*Math.sin(i),c=Math.sin(s);return[-o,c,-a]}const tn=[{name:"Andromeda",stars:[{name:"Alpheratz",raHours:.1398,decDeg:29.0908},{name:"HIP 3092",raHours:.6554,decDeg:30.8612},{name:"Mirach",raHours:1.1622,decDeg:35.6208},{name:"Almach",raHours:2.065,decDeg:42.3298},{name:"Alfarasalkamil",raHours:23.032,decDeg:42.326},{name:"Rasalnaqa",raHours:23.6356,decDeg:43.2681},{name:"Kaffalmusalsala",raHours:23.6735,decDeg:44.334},{name:"Udkadua",raHours:23.626,decDeg:46.4592},{name:"HIP 2912",raHours:.6147,decDeg:33.7194},{name:"HIP 4436",raHours:.9459,decDeg:38.4993},{name:"HIP 3881",raHours:.8302,decDeg:41.079},{name:"Junnanmen",raHours:1.1584,decDeg:47.2418},{name:"Nembus",raHours:1.6332,decDeg:48.6285},{name:"HIP 3031",raHours:.6426,decDeg:29.3124},{name:"Shimu",raHours:.789,decDeg:24.2674},{name:"Kui",raHours:.9535,decDeg:23.4178}],lines:[[0,1],[1,2],[2,3],[4,5],[5,6],[6,7],[5,8],[8,1],[8,2],[2,9],[9,10],[10,11],[11,12],[1,13],[13,14],[14,15]]},{name:"Antlia",stars:[{name:"HIP 53502",raHours:10.9453,decDeg:-37.1375},{name:"HIP 51172",raHours:10.4525,decDeg:-31.0678},{name:"HIP 46515",raHours:9.4874,decDeg:-35.9513}],lines:[[0,1],[1,2]]},{name:"Apus",stars:[{name:"Paradys",raHours:14.7977,decDeg:-79.0447},{name:"HIP 81065",raHours:16.5576,decDeg:-78.897},{name:"HIP 80047",raHours:16.3391,decDeg:-78.6957},{name:"HIP 81852",raHours:16.7182,decDeg:-77.5166}],lines:[[0,1],[2,3],[3,1]]},{name:"Aquarius",stars:[{name:"Albali",raHours:20.7946,decDeg:-9.4957},{name:"Sadalsuud",raHours:21.526,decDeg:-5.5712},{name:"Sadalmelik",raHours:22.0964,decDeg:-.3198},{name:"Sadachbia",raHours:22.3609,decDeg:-1.3874},{name:"Sadaltager",raHours:22.4805,decDeg:-.0201},{name:"HIP 111497",raHours:22.5893,decDeg:-.1174},{name:"Seat",raHours:22.4213,decDeg:1.3774},{name:"HIP 109139",raHours:22.1073,decDeg:-13.8695},{name:"Ancha",raHours:22.2805,decDeg:-7.7832},{name:"Hydor",raHours:22.8769,decDeg:-7.5797},{name:"HIP 114724",raHours:23.2387,decDeg:-6.0485},{name:"HIP 115033",raHours:23.2984,decDeg:-9.1825},{name:"HIP 115438",raHours:23.3829,decDeg:-20.1003},{name:"Safina",raHours:23.1574,decDeg:-21.1725},{name:"Skat",raHours:22.9108,decDeg:-15.8208},{name:"HIP 112716",raHours:22.8265,decDeg:-13.5925}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[4,6],[6,2],[7,1],[2,8],[8,9],[9,10],[10,11],[11,12],[11,13],[11,14],[14,15],[15,9]]},{name:"Aquila",stars:[{name:"Alshain",raHours:19.9219,decDeg:6.4079},{name:"Altair",raHours:19.8463,decDeg:8.8674},{name:"Tarazed",raHours:19.771,decDeg:10.6133},{name:"Almizan I",raHours:19.4249,decDeg:3.1146},{name:"Al Thalimain Prior",raHours:19.1042,decDeg:-4.8823},{name:"Okab",raHours:19.0902,decDeg:13.8637},{name:"Almizan II",raHours:19.8745,decDeg:1.0057},{name:"Almizan III",raHours:20.1884,decDeg:-.8215},{name:"Deneb al Okab Borealis",raHours:18.9937,decDeg:15.0685},{name:"HIP 93429",raHours:19.028,decDeg:-5.739},{name:"Al Thalimain Posterior",raHours:19.612,decDeg:-1.2866}],lines:[[0,1],[1,2],[2,3],[3,4],[3,5],[3,6],[6,7],[8,5],[4,9],[7,10],[10,4],[4,5]]},{name:"Ara",stars:[{name:"HIP 85267",raHours:17.4232,decDeg:-56.3777},{name:"HIP 85727",raHours:17.5183,decDeg:-60.6836},{name:"HIP 82363",raHours:16.8298,decDeg:-59.0413},{name:"HIP 83081",raHours:16.977,decDeg:-55.9901},{name:"HIP 83153",raHours:16.9931,decDeg:-53.1605},{name:"HIP 85792",raHours:17.5307,decDeg:-49.876},{name:"HIP 88714",raHours:18.1105,decDeg:-50.0915},{name:"HIP 85258",raHours:17.4217,decDeg:-55.5298}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[5,7]]},{name:"Aries",stars:[{name:"Mesarthim",raHours:1.8922,decDeg:19.2941},{name:"Sheratan",raHours:1.9107,decDeg:20.8083},{name:"Hamal",raHours:2.1195,decDeg:23.4628},{name:"Bharani",raHours:2.8331,decDeg:27.2608}],lines:[[0,1],[1,2],[2,3]]},{name:"Auriga",stars:[{name:"Elnath",raHours:5.4382,decDeg:28.6079},{name:"Hassaleh",raHours:4.9499,decDeg:33.1661},{name:"Haedus",raHours:5.1086,decDeg:41.2346},{name:"Capella",raHours:5.2781,decDeg:45.999},{name:"Menkalinan",raHours:5.9922,decDeg:44.9474},{name:"Mahasim",raHours:5.9953,decDeg:37.2128},{name:"Saclateni",raHours:5.0413,decDeg:41.0759},{name:"Almaaz",raHours:5.0328,decDeg:43.8233},{name:"Prijipati",raHours:5.9921,decDeg:54.285}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[2,6],[6,7],[7,3],[3,8],[8,4]]},{name:"Boötes",stars:[{name:"Arcturus",raHours:14.2612,decDeg:19.1873},{name:"Izar",raHours:14.7498,decDeg:27.0742},{name:"Thiba",raHours:15.2584,decDeg:33.3151},{name:"Nekkar",raHours:15.0324,decDeg:40.3906},{name:"Seginus",raHours:14.5347,decDeg:38.3079},{name:"Kalasungsang",raHours:14.5305,decDeg:30.3711},{name:"Muphrid",raHours:13.9114,decDeg:18.3986},{name:"Tepiamenit",raHours:13.7878,decDeg:17.4568},{name:"HIP 71795",raHours:14.6858,decDeg:13.7283},{name:"Xuange",raHours:14.2731,decDeg:46.0879},{name:"First Donkey",raHours:14.42,decDeg:51.8517},{name:"Asellus Tertius",raHours:14.2247,decDeg:51.79}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,6],[6,7],[0,8],[4,9],[9,10],[10,11],[11,9]]},{name:"Caelum",stars:[{name:"HIP 23595",raHours:5.0734,decDeg:-35.4829},{name:"HIP 21861",raHours:4.701,decDeg:-37.1448},{name:"HIP 21770",raHours:4.6761,decDeg:-41.8636},{name:"HIP 21060",raHours:4.5139,decDeg:-44.9537}],lines:[[0,1],[1,2],[2,3]]},{name:"Camelopardalis",stars:[{name:"HIP 23040",raHours:4.9548,decDeg:53.7521},{name:"HIP 23522",raHours:5.057,decDeg:60.4423},{name:"HIP 22783",raHours:4.9008,decDeg:66.3427},{name:"Shangwei",raHours:6.3141,decDeg:69.32},{name:"Tonglingxing",raHours:7.0011,decDeg:76.9774},{name:"Shaowei",raHours:3.8393,decDeg:71.3324},{name:"Custos",raHours:3.8254,decDeg:65.526},{name:"HIP 16228",raHours:3.4845,decDeg:59.9403}],lines:[[0,1],[1,2],[2,3],[3,4],[2,5],[5,6],[6,7]]},{name:"Cancer",stars:[{name:"Acubens",raHours:8.9748,decDeg:11.8578},{name:"Asellus Australis",raHours:8.7448,decDeg:18.1549},{name:"Tarf",raHours:8.2753,decDeg:9.1857},{name:"Asellus Borealis",raHours:8.7214,decDeg:21.4686},{name:"Zubanah",raHours:8.7783,decDeg:28.76}],lines:[[0,1],[1,2],[1,3],[3,4]]},{name:"Canes Venatici",stars:[{name:"Cor Caroli",raHours:12.9338,decDeg:38.3182},{name:"Chara",raHours:12.5625,decDeg:41.3568}],lines:[[0,1]]},{name:"Canis Major",stars:[{name:"Mirzam",raHours:6.3783,decDeg:-17.9559},{name:"Sirius",raHours:6.7526,decDeg:-16.7131},{name:"Wezen",raHours:7.1399,decDeg:-26.3932},{name:"Adhara",raHours:6.9771,decDeg:-28.9721},{name:"Aludra",raHours:7.4016,decDeg:-29.3031},{name:"HIP 31592",raHours:6.6114,decDeg:-19.2557},{name:"Udra",raHours:6.9022,decDeg:-24.1842},{name:"HIP 33347",raHours:6.9356,decDeg:-17.0542},{name:"Muliphein",raHours:7.0626,decDeg:-15.6333},{name:"HIP 33160",raHours:6.9032,decDeg:-12.0386}],lines:[[0,1],[1,2],[2,3],[2,4],[0,5],[5,6],[6,3],[1,7],[7,8],[8,9],[9,7]]},{name:"Canis Minor",stars:[{name:"Procyon",raHours:7.6551,decDeg:5.2275},{name:"Gomeisa",raHours:7.4525,decDeg:8.2894}],lines:[[0,1]]},{name:"Capricornus",stars:[{name:"Algedi",raHours:20.3009,decDeg:-12.5449},{name:"Dabih",raHours:20.3502,decDeg:-14.7814},{name:"HIP 102485",raHours:20.7683,decDeg:-25.2705},{name:"HIP 102978",raHours:20.8637,decDeg:-26.9191},{name:"HIP 105881",raHours:21.4445,decDeg:-22.4114},{name:"HIP 106723",raHours:21.618,decDeg:-19.466},{name:"Deneb Algedi",raHours:21.784,decDeg:-16.1266},{name:"Nashira",raHours:21.6682,decDeg:-16.6623},{name:"Udang",raHours:21.0991,decDeg:-17.2327}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,0]]},{name:"Carina",stars:[{name:"Canopus",raHours:6.3992,decDeg:-52.6957},{name:"Miaplacidus",raHours:9.2201,decDeg:-69.7175},{name:"HIP 50099",raHours:10.229,decDeg:-70.0379},{name:"HIP 52419",raHours:10.716,decDeg:-64.3945},{name:"HIP 51576",raHours:10.5337,decDeg:-61.6854},{name:"HIP 50371",raHours:10.2847,decDeg:-61.3323},{name:"Aspidiske",raHours:9.2848,decDeg:-59.2753},{name:"Alsephina",raHours:8.7451,decDeg:-54.7086},{name:"HIP 53253",raHours:10.8915,decDeg:-58.8533},{name:"HIP 54301",raHours:11.109,decDeg:-62.4241},{name:"HIP 54751",raHours:11.21,decDeg:-60.3176},{name:"HIP 54463",raHours:11.1432,decDeg:-58.975},{name:"Avior",raHours:8.3752,decDeg:-59.5095},{name:"HIP 38827",raHours:7.9463,decDeg:-52.9824},{name:"Regor",raHours:8.1589,decDeg:-47.3366}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[4,8],[3,9],[9,10],[10,11],[11,8],[6,12],[12,13],[13,14]]},{name:"Cassiopeia",stars:[{name:"Caph",raHours:.1528,decDeg:59.1502},{name:"Schedar",raHours:.6751,decDeg:56.5374},{name:"Navi",raHours:.9451,decDeg:60.7167},{name:"Ruchbah",raHours:1.4302,decDeg:60.2354},{name:"Segin",raHours:1.9066,decDeg:63.6701}],lines:[[0,1],[1,2],[2,3],[3,4]]},{name:"Centaurus",stars:[{name:"Muhlifain",raHours:12.692,decDeg:-48.9599},{name:"HIP 66657",raHours:13.6648,decDeg:-53.4664},{name:"Hadar",raHours:14.0637,decDeg:-60.373},{name:"Rigil Kentaurus",raHours:14.6614,decDeg:-60.8351},{name:"Alnair",raHours:13.9257,decDeg:-47.2883},{name:"HIP 68282",raHours:13.978,decDeg:-44.8035},{name:"HIP 68245",raHours:13.9712,decDeg:-42.1007},{name:"HIP 71352",raHours:14.5918,decDeg:-42.1577},{name:"HIP 68862",raHours:14.1008,decDeg:-41.1796},{name:"HIP 70090",raHours:14.3426,decDeg:-37.8853},{name:"Menkent",raHours:14.1115,decDeg:-36.3687},{name:"Heng",raHours:13.8251,decDeg:-41.6877},{name:"HIP 55425",raHours:11.3501,decDeg:-54.491},{name:"HIP 59196",raHours:12.1393,decDeg:-50.7224},{name:"HIP 60823",raHours:12.4673,decDeg:-50.2306},{name:"HIP 59449",raHours:12.1942,decDeg:-52.3684},{name:"HIP 56243",raHours:11.5295,decDeg:-59.4421},{name:"HIP 65936",raHours:13.5174,decDeg:-39.4073},{name:"Kulou",raHours:13.3434,decDeg:-36.7121},{name:"HIP 61789",raHours:12.6646,decDeg:-39.9872},{name:"HIP 73334",raHours:14.986,decDeg:-42.1041}],lines:[[0,1],[1,2],[2,3],[1,4],[4,0],[4,5],[5,6],[6,7],[6,8],[8,9],[9,10],[10,11],[11,4],[12,13],[13,14],[14,0],[14,15],[15,16],[11,17],[17,18],[18,19],[7,20]]},{name:"Cepheus",stars:[{name:"Kabalfird",raHours:20.7548,decDeg:61.8368},{name:"Alderamin",raHours:21.3096,decDeg:62.5855},{name:"Alfirk",raHours:21.4777,decDeg:70.5607},{name:"HIP 112724",raHours:22.828,decDeg:66.2007},{name:"Errai",raHours:23.6558,decDeg:77.632},{name:"HIP 110991",raHours:22.4862,decDeg:58.4152},{name:"HIP 109492",raHours:22.1809,decDeg:58.2012},{name:"HIP 109857",raHours:22.2505,decDeg:57.0435},{name:"The Garnet Star",raHours:21.7251,decDeg:58.7801},{name:"Al Kidr",raHours:20.493,decDeg:62.9941}],lines:[[0,1],[1,2],[2,3],[2,4],[4,3],[3,5],[5,6],[6,7],[7,8],[8,1],[9,0]]},{name:"Cetus",stars:[{name:"Kaffaljidhma",raHours:2.7217,decDeg:3.2362},{name:"Menkar",raHours:3.038,decDeg:4.0899},{name:"Menkar (13954)",raHours:2.9952,decDeg:8.9074},{name:"Al Kaff al Jidhmah IV",raHours:2.749,decDeg:10.1142},{name:"Al Kaff al Jidhmah II",raHours:2.4693,decDeg:8.4601},{name:"Al Kaff al Jidhmah III",raHours:2.658,decDeg:.3285},{name:"Mira",raHours:2.3224,decDeg:-2.9771},{name:"Baten Kaitos",raHours:1.8577,decDeg:-10.3349},{name:"Al Naymat II",raHours:1.7348,decDeg:-15.9396},{name:"Diphda",raHours:.7265,decDeg:-17.9867},{name:"Deneb Kaitos Shemali",raHours:.3238,decDeg:-8.8238},{name:"Dheneb",raHours:1.1431,decDeg:-10.1819},{name:"Al Naymat I",raHours:1.4004,decDeg:-8.1828}],lines:[[0,1],[1,2],[2,3],[3,4],[4,0],[0,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,7]]},{name:"Chamaeleon",stars:[{name:"HIP 40702",raHours:8.3087,decDeg:-76.92},{name:"HIP 51839",raHours:10.5912,decDeg:-78.6078},{name:"HIP 52633",raHours:10.7631,decDeg:-80.5402},{name:"HIP 60000",raHours:12.3058,decDeg:-79.3123},{name:"HIP 58484",raHours:11.9938,decDeg:-78.2218}],lines:[[0,1],[1,2],[2,3],[3,4],[4,1]]},{name:"Circinus",stars:[{name:"HIP 74824",raHours:15.2919,decDeg:-58.8009},{name:"Xami",raHours:14.7085,decDeg:-64.9746},{name:"HIP 75323",raHours:15.3896,decDeg:-59.3207}],lines:[[0,1],[1,2]]},{name:"Columba",stars:[{name:"Phact",raHours:5.6608,decDeg:-34.074},{name:"Wazn",raHours:5.8493,decDeg:-35.7693},{name:"HIP 25859",raHours:5.5202,decDeg:-35.4704},{name:"HIP 28328",raHours:5.9858,decDeg:-42.8151},{name:"HIP 28199",raHours:5.9589,decDeg:-35.2833},{name:"HIP 30277",raHours:6.3686,decDeg:-33.4363}],lines:[[0,1],[2,0],[3,1],[1,4],[4,5]]},{name:"Coma Berenices",stars:[{name:"Diadem",raHours:13.1665,decDeg:17.5291},{name:"HIP 64394",raHours:13.198,decDeg:27.876},{name:"Al Dafirah",raHours:12.449,decDeg:28.2686}],lines:[[0,1],[1,2]]},{name:"Corona Australis",stars:[{name:"HIP 93825",raHours:19.107,decDeg:-37.0628},{name:"Meridiana",raHours:19.1579,decDeg:-37.9042},{name:"HIP 94160",raHours:19.1672,decDeg:-39.3407},{name:"HIP 94005",raHours:19.1391,decDeg:-40.4966},{name:"HIP 90982",raHours:18.5584,decDeg:-42.3125}],lines:[[0,1],[1,2],[2,3],[3,4]]},{name:"Corona Borealis",stars:[{name:"Guansuo",raHours:15.5488,decDeg:31.3592},{name:"Nusakan",raHours:15.4638,decDeg:29.1055},{name:"Alphecca",raHours:15.5781,decDeg:26.7149},{name:"Baltesha",raHours:15.7124,decDeg:26.2955},{name:"Matrichakra",raHours:15.8266,decDeg:26.0685},{name:"HIP 78159",raHours:15.9598,decDeg:26.878},{name:"Aurwandilsta",raHours:16.0241,decDeg:29.8511}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]]},{name:"Corvus",stars:[{name:"Algorab",raHours:12.4978,decDeg:-16.5151},{name:"Gienah",raHours:12.2635,decDeg:-17.542},{name:"Minkar",raHours:12.1688,decDeg:-22.6198},{name:"Kraz",raHours:12.5731,decDeg:-23.3966},{name:"Alchiba",raHours:12.1402,decDeg:-24.7288}],lines:[[0,1],[1,2],[2,3],[3,0],[2,4]]},{name:"Crater",stars:[{name:"Alkes",raHours:10.9963,decDeg:-18.2991},{name:"Al Sharasif",raHours:11.1943,decDeg:-22.8256},{name:"HIP 55705",raHours:11.4147,decDeg:-17.684},{name:"HIP 57283",raHours:11.746,decDeg:-18.3506},{name:"HIP 58188",raHours:11.9336,decDeg:-17.1508},{name:"HIP 55282",raHours:11.3224,decDeg:-14.779},{name:"HIP 55687",raHours:11.4102,decDeg:-10.8594},{name:"HIP 56633",raHours:11.6114,decDeg:-9.8023}],lines:[[0,1],[1,2],[2,3],[3,4],[2,5],[5,6],[6,7],[5,0]]},{name:"Crux",stars:[{name:"Acrux",raHours:12.4433,decDeg:-63.0991},{name:"Gacrux",raHours:12.5194,decDeg:-57.1126},{name:"Mimosa",raHours:12.7954,decDeg:-59.6887},{name:"Imai",raHours:12.2524,decDeg:-58.7489}],lines:[[0,1],[2,3]]},{name:"Cygnus",stars:[{name:"Deneb",raHours:20.6905,decDeg:45.2803},{name:"Sadr",raHours:20.3705,decDeg:40.2567},{name:"Aljanah",raHours:20.7701,decDeg:33.9695},{name:"Albireo",raHours:19.512,decDeg:27.9597},{name:"Fawaris",raHours:19.7496,decDeg:45.1307},{name:"HIP 95853",raHours:19.4951,decDeg:51.7295},{name:"Fawaris I",raHours:19.285,decDeg:53.3682},{name:"HIP 99848",raHours:20.2579,decDeg:47.7142},{name:"HIP 103413",raHours:20.9529,decDeg:41.1672},{name:"Fawaris III",raHours:21.2156,decDeg:30.2271}],lines:[[0,1],[1,2],[1,3],[1,4],[4,5],[5,6],[5,7],[7,0],[0,8],[8,9],[9,2]]},{name:"Delphinus",stars:[{name:"Aldulfin",raHours:20.5535,decDeg:11.3033},{name:"Rotanev",raHours:20.6258,decDeg:14.5952},{name:"Sualocin",raHours:20.6606,decDeg:15.9121},{name:"Al Salib",raHours:20.7776,decDeg:16.1248},{name:"Al Ukud",raHours:20.7243,decDeg:15.0747}],lines:[[0,1],[1,2],[2,3],[3,4],[4,1]]},{name:"Dorado",stars:[{name:"HIP 19893",raHours:4.2671,decDeg:-51.4871},{name:"HIP 21281",raHours:4.5666,decDeg:-55.045},{name:"HIP 23693",raHours:5.0919,decDeg:-57.473},{name:"HIP 26069",raHours:5.5604,decDeg:-62.4899},{name:"HIP 27100",raHours:5.7462,decDeg:-65.7355},{name:"HIP 27890",raHours:5.9016,decDeg:-63.091}],lines:[[0,1],[1,2],[2,3],[3,1],[3,4],[4,5],[5,3]]},{name:"Draco",stars:[{name:"Giausar",raHours:11.5234,decDeg:69.3311},{name:"HIP 61281",raHours:12.5581,decDeg:69.7882},{name:"Thuban",raHours:14.0732,decDeg:64.3758},{name:"Edasich",raHours:15.4155,decDeg:58.966},{name:"HIP 78527",raHours:16.0316,decDeg:58.5644},{name:"Athebyne",raHours:16.3999,decDeg:61.5141},{name:"Aldhibah",raHours:17.1465,decDeg:65.7146},{name:"Aldhiba",raHours:18.346,decDeg:71.3377},{name:"Alahakan",raHours:18.3506,decDeg:72.7337},{name:"Altais",raHours:19.2092,decDeg:67.6613},{name:"Tyl",raHours:19.8028,decDeg:70.2678},{name:"Grumium",raHours:17.8921,decDeg:56.8725},{name:"Kuma",raHours:17.5377,decDeg:55.1728},{name:"Rastaban",raHours:17.5072,decDeg:52.3014},{name:"Eltanin",raHours:17.9434,decDeg:51.489}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[7,9],[9,10],[9,11],[11,12],[12,13],[13,14],[14,11]]},{name:"Equuleus",stars:[{name:"Kitalpha",raHours:21.2637,decDeg:5.2481},{name:"HIP 104858",raHours:21.2413,decDeg:10.0077},{name:"HIP 104521",raHours:21.1724,decDeg:10.1319}],lines:[[0,1],[1,2]]},{name:"Eridanus",stars:[{name:"Cursa",raHours:5.1308,decDeg:-5.0863},{name:"HIP 22109",raHours:4.7584,decDeg:-3.2546},{name:"HIP 21444",raHours:4.6053,decDeg:-3.3524},{name:"Beid",raHours:4.1978,decDeg:-6.8378},{name:"Zaurak",raHours:3.9671,decDeg:-13.5082},{name:"HIP 17593",raHours:3.769,decDeg:-12.1017},{name:"Rana",raHours:3.7208,decDeg:-9.7652},{name:"Ran",raHours:3.549,decDeg:-9.4583},{name:"Azha",raHours:2.9404,decDeg:-8.8976},{name:"Sadr al Kaitos IV",raHours:2.7354,decDeg:-13.8587},{name:"HIP 12843",raHours:2.7517,decDeg:-18.5727},{name:"HIP 14146",raHours:3.0399,decDeg:-23.6243},{name:"HIP 15474",raHours:3.3253,decDeg:-21.7579},{name:"HIP 16611",raHours:3.5631,decDeg:-21.6328},{name:"HIP 17651",raHours:3.7808,decDeg:-23.2484},{name:"HIP 18216",raHours:3.8952,decDeg:-24.6122},{name:"HIP 18673",raHours:3.9987,decDeg:-24.0163},{name:"Beemim",raHours:4.5585,decDeg:-29.7658},{name:"Theemin",raHours:4.5925,decDeg:-30.5623},{name:"Beemim (20535)",raHours:4.4006,decDeg:-34.017},{name:"Beemim I",raHours:4.2982,decDeg:-33.7983},{name:"HIP 17874",raHours:3.8242,decDeg:-36.2001},{name:"HIP 16870",raHours:3.6182,decDeg:-40.2745},{name:"HIP 15510",raHours:3.3315,decDeg:-43.0715},{name:"Acamar",raHours:2.971,decDeg:-40.3047},{name:"HIP 12486",raHours:2.6778,decDeg:-39.8553},{name:"HIP 12413",raHours:2.6633,decDeg:-42.8916},{name:"HIP 11407",raHours:2.4498,decDeg:-47.7038},{name:"HIP 9007",raHours:1.9325,decDeg:-51.6096},{name:"Achernar",raHours:1.6285,decDeg:-57.2367}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],[17,18],[18,19],[19,20],[20,21],[21,22],[22,23],[23,24],[24,25],[25,26],[26,27],[27,28],[28,29]]},{name:"Fornax",stars:[{name:"Dalim",raHours:3.2012,decDeg:-28.9891},{name:"HIP 13147",raHours:2.8182,decDeg:-32.4063},{name:"HIP 9677",raHours:2.0748,decDeg:-29.2968}],lines:[[0,1],[1,2]]},{name:"Gemini",stars:[{name:"Alzirr",raHours:6.7548,decDeg:12.8961},{name:"HIP 35350",raHours:7.3016,decDeg:16.5405},{name:"Wasat",raHours:7.3354,decDeg:21.9823},{name:"Mekbuda",raHours:7.0685,decDeg:20.5703},{name:"Alhena",raHours:6.6285,decDeg:16.3994},{name:"HIP 36962",raHours:7.5987,decDeg:26.896},{name:"HIP 37740",raHours:7.7408,decDeg:24.3981},{name:"Pollux",raHours:7.7554,decDeg:28.0263},{name:"HIP 36046",raHours:7.4288,decDeg:27.7983},{name:"HIP 34693",raHours:7.1857,decDeg:30.2453},{name:"Castor",raHours:7.5767,decDeg:31.8886},{name:"HIP 33018",raHours:6.8798,decDeg:33.9614},{name:"Mebsuta",raHours:6.7322,decDeg:25.1312},{name:"Nucatai",raHours:6.4827,decDeg:20.2122},{name:"Tejat",raHours:6.3827,decDeg:22.5139},{name:"Propus",raHours:6.248,decDeg:22.5068},{name:"HIP 28734",raHours:6.0687,decDeg:23.2636}],lines:[[0,1],[1,2],[2,3],[3,4],[2,5],[5,6],[5,7],[5,8],[8,9],[9,10],[9,11],[9,12],[12,13],[12,14],[14,15],[15,16]]},{name:"Grus",stars:[{name:"Aldhanab",raHours:21.8988,decDeg:-37.3648},{name:"HIP 109111",raHours:22.1019,decDeg:-39.543},{name:"HIP 110997",raHours:22.4878,decDeg:-43.4956},{name:"Alnair",raHours:22.1372,decDeg:-46.9606},{name:"Tiaki",raHours:22.7111,decDeg:-46.8846},{name:"HIP 112623",raHours:22.8092,decDeg:-51.3167},{name:"HIP 113638",raHours:23.0147,decDeg:-52.7541}],lines:[[0,1],[1,2],[2,3],[3,4],[4,2],[4,5],[5,6]]},{name:"Hercules",stars:[{name:"Sarin",raHours:17.2505,decDeg:24.8396},{name:"Rasalgethi",raHours:17.2441,decDeg:14.3903},{name:"Kornephoros",raHours:16.5037,decDeg:21.4896},{name:"Nasak Shamiya III",raHours:16.3653,decDeg:19.153},{name:"Tianji",raHours:16.6882,decDeg:31.6019},{name:"Khepdenreret",raHours:17.0048,decDeg:30.9263},{name:"HIP 81833",raHours:16.7149,decDeg:38.9225},{name:"HIP 81126",raHours:16.5684,decDeg:42.4369},{name:"Asuusiha",raHours:16.329,decDeg:46.3133},{name:"Nuchuang",raHours:17.2508,decDeg:36.8092},{name:"HIP 85112",raHours:17.3947,decDeg:37.1459},{name:"HIP 87808",raHours:17.9375,decDeg:37.2505},{name:"Tianbang",raHours:17.6577,decDeg:46.0063},{name:"Maasym",raHours:17.5123,decDeg:26.1106},{name:"HIP 86974",raHours:17.7744,decDeg:27.7225},{name:"HIP 87933",raHours:17.9627,decDeg:29.2479},{name:"HIP 88794",raHours:18.1257,decDeg:28.7625},{name:"HIP 77760",raHours:15.8778,decDeg:42.45},{name:"HIP 79101",raHours:16.1462,decDeg:44.9348},{name:"Cujam",raHours:16.4236,decDeg:14.0334},{name:"HIP 81008",raHours:16.5434,decDeg:11.4882}],lines:[[0,1],[1,2],[2,3],[2,4],[4,5],[4,6],[6,7],[7,8],[6,9],[9,10],[10,11],[11,12],[9,5],[5,0],[0,13],[13,14],[14,15],[15,16],[17,18],[18,8],[3,19],[19,20]]},{name:"Horologium",stars:[{name:"HIP 19747",raHours:4.2334,decDeg:-42.2939},{name:"HIP 12653",raHours:2.7092,decDeg:-50.8008},{name:"HIP 12225",raHours:2.6234,decDeg:-52.5431},{name:"HIP 12484",raHours:2.6777,decDeg:-54.5499},{name:"HIP 14240",raHours:3.0603,decDeg:-59.7376},{name:"HIP 13884",raHours:2.9799,decDeg:-64.0713}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5]]},{name:"Hydra",stars:[{name:"Minazal IV",raHours:8.8072,decDeg:5.8379},{name:"Minazal II",raHours:8.7204,decDeg:3.3987},{name:"Minchir",raHours:8.646,decDeg:3.3415},{name:"Minazal I",raHours:8.6276,decDeg:5.7038},{name:"Ashlesha",raHours:8.7796,decDeg:6.4189},{name:"Minazal V",raHours:8.9232,decDeg:5.9455},{name:"HIP 45336",raHours:9.2394,decDeg:2.315},{name:"Ukdah",raHours:9.6643,decDeg:-1.1427},{name:"Alphard",raHours:9.4598,decDeg:-8.6587},{name:"Zhang",raHours:9.858,decDeg:-14.8465},{name:"HIP 49402",raHours:10.0854,decDeg:-13.0647},{name:"HIP 49841",raHours:10.1765,decDeg:-12.3538},{name:"HIP 51069",raHours:10.4349,decDeg:-16.8361},{name:"HIP 52943",raHours:10.8271,decDeg:-16.1941},{name:"Alkes",raHours:10.9963,decDeg:-18.2991},{name:"Al Sharasif",raHours:11.1943,decDeg:-22.8256},{name:"HIP 56343",raHours:11.5501,decDeg:-31.8575},{name:"HIP 57936",raHours:11.8818,decDeg:-33.9081},{name:"Naga",raHours:13.3153,decDeg:-23.1714},{name:"HIP 68895",raHours:14.1062,decDeg:-26.682},{name:"Solitaire",raHours:14.8382,decDeg:-27.9602}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[15,16],[16,17],[17,18],[18,19],[19,20]]},{name:"Hydrus",stars:[{name:"HIP 2021",raHours:.4276,decDeg:-77.255},{name:"HIP 17678",raHours:3.7873,decDeg:-74.2392},{name:"HIP 11001",raHours:2.3625,decDeg:-68.6594},{name:"HIP 9236",raHours:1.9794,decDeg:-61.5699}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Indus",stars:[{name:"HIP 103227",raHours:20.9135,decDeg:-58.4541},{name:"HIP 102333",raHours:20.7339,decDeg:-51.9208},{name:"Persian",raHours:20.6261,decDeg:-47.2917},{name:"HIP 105319",raHours:21.3311,decDeg:-53.4493},{name:"HIP 108431",raHours:21.9653,decDeg:-54.9926}],lines:[[0,1],[1,2],[2,3],[3,4],[4,0]]},{name:"Lacerta",stars:[{name:"HIP 111022",raHours:22.4922,decDeg:47.7069},{name:"Stellio",raHours:22.5215,decDeg:50.2824},{name:"HIP 110538",raHours:22.3927,decDeg:52.2295},{name:"HIP 110609",raHours:22.4086,decDeg:49.4764},{name:"HIP 110351",raHours:22.3504,decDeg:46.5366},{name:"HIP 111104",raHours:22.5081,decDeg:43.1234},{name:"HIP 111944",raHours:22.6752,decDeg:44.2763},{name:"HIP 109754",raHours:22.2313,decDeg:39.7149},{name:"HIP 109937",raHours:22.2662,decDeg:37.7487}],lines:[[0,1],[1,2],[2,3],[3,0],[0,4],[4,5],[5,6],[6,0],[5,7],[7,8]]},{name:"Leo",stars:[{name:"Regulus",raHours:10.1396,decDeg:11.9672},{name:"Al Jabhah",raHours:10.1222,decDeg:16.7627},{name:"Algieba",raHours:10.3328,decDeg:19.8419},{name:"Adhafera",raHours:10.2782,decDeg:23.4173},{name:"Rasalas",raHours:9.8794,decDeg:26.0071},{name:"Algenubi",raHours:9.7642,decDeg:23.7743},{name:"Zosma",raHours:11.2351,decDeg:20.524},{name:"Denebola",raHours:11.8177,decDeg:14.5723},{name:"Chertan",raHours:11.2373,decDeg:15.4298},{name:"Al Minlear al Asad",raHours:9.4109,decDeg:26.1824},{name:"Alterf",raHours:9.5287,decDeg:22.9681},{name:"Tsze Tseang",raHours:11.3987,decDeg:10.5297},{name:"HIP 55434",raHours:11.3523,decDeg:6.0294}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[2,6],[6,7],[7,8],[8,6],[8,1],[4,9],[9,10],[10,5],[5,1],[8,11],[11,12]]},{name:"Leo Minor",stars:[{name:"HIP 46952",raHours:9.5704,decDeg:36.3976},{name:"HIP 49593",raHours:10.1238,decDeg:35.2447},{name:"HIP 51233",raHours:10.4647,decDeg:36.7075},{name:"Praecipua",raHours:10.8885,decDeg:34.2156},{name:"HIP 51056",raHours:10.4319,decDeg:33.7963}],lines:[[0,1],[1,2],[2,3],[3,4],[4,1]]},{name:"Lepus",stars:[{name:"Ping",raHours:5.091,decDeg:-22.3709},{name:"Bade",raHours:5.2155,decDeg:-16.2054},{name:"Arneb",raHours:5.5455,decDeg:-17.8223},{name:"Nihal",raHours:5.4708,decDeg:-20.7592},{name:"HIP 24845",raHours:5.3263,decDeg:-13.1768},{name:"HIP 24327",raHours:5.2205,decDeg:-12.9413},{name:"Kursi al Jabbar",raHours:5.7411,decDeg:-22.4475},{name:"Arsh al Jauzah",raHours:5.8553,decDeg:-20.8775},{name:"HIP 28910",raHours:6.1026,decDeg:-14.9353},{name:"HIP 28103",raHours:5.9401,decDeg:-14.168},{name:"Darlugal",raHours:5.7826,decDeg:-14.8219}],lines:[[0,1],[1,2],[2,3],[3,0],[4,1],[1,5],[3,6],[6,7],[7,8],[8,9],[9,10],[10,2]]},{name:"Libra",stars:[{name:"Zubenelgenubi",raHours:14.848,decDeg:-16.0416},{name:"Zubeneschamali",raHours:15.2835,decDeg:-9.3829},{name:"Brachium",raHours:15.0679,decDeg:-25.2819},{name:"Zubenelhakrabi",raHours:15.5921,decDeg:-14.7896},{name:"HIP 76470",raHours:15.6171,decDeg:-28.1351},{name:"HIP 76600",raHours:15.6443,decDeg:-29.7777}],lines:[[0,1],[0,2],[1,3],[3,0],[3,4],[4,5]]},{name:"Lupus",stars:[{name:"Uridim",raHours:14.6988,decDeg:-47.3881},{name:"HIP 74395",raHours:15.2048,decDeg:-52.0991},{name:"HIP 75264",raHours:15.378,decDeg:-44.6896},{name:"HIP 76297",raHours:15.5857,decDeg:-41.1667},{name:"HIP 75141",raHours:15.3562,decDeg:-40.6475},{name:"HIP 73273",raHours:14.9755,decDeg:-43.1339},{name:"HIP 78384",raHours:16.002,decDeg:-38.3966},{name:"HIP 75177",raHours:15.3635,decDeg:-36.2612},{name:"HIP 77634",raHours:15.8493,decDeg:-33.6271}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[3,6],[6,7],[7,8],[8,6],[6,1]]},{name:"Lynx",stars:[{name:"HIP 45860",raHours:9.351,decDeg:34.3925},{name:"HIP 45688",raHours:9.3141,decDeg:36.8029},{name:"HIP 44700",raHours:9.1088,decDeg:38.4523},{name:"HIP 44248",raHours:9.0108,decDeg:41.7834},{name:"Alsciaukat",raHours:8.3806,decDeg:43.1884},{name:"HIP 36145",raHours:7.4452,decDeg:49.2116},{name:"HIP 33449",raHours:6.9546,decDeg:58.4231},{name:"HIP 30060",raHours:6.3271,decDeg:59.0109}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]},{name:"Lyra",stars:[{name:"Vega",raHours:18.6156,decDeg:38.783},{name:"Double Double I",raHours:18.739,decDeg:39.67},{name:"Nasr Alwaki I",raHours:18.7462,decDeg:37.6051},{name:"Jiantai",raHours:18.9084,decDeg:36.8986},{name:"Sulafat",raHours:18.9824,decDeg:32.6896},{name:"Sheliak",raHours:18.8347,decDeg:33.3627}],lines:[[0,1],[1,2],[2,0],[2,3],[3,4],[4,5],[5,2]]},{name:"Mensa",stars:[{name:"Hoerikwaggo",raHours:6.1706,decDeg:-74.7525},{name:"HIP 23467",raHours:5.0453,decDeg:-71.3143}],lines:[[0,1]]},{name:"Microscopium",stars:[{name:"HIP 102831",raHours:20.8328,decDeg:-33.7797},{name:"HIP 102989",raHours:20.8663,decDeg:-33.178}],lines:[[0,1]]},{name:"Monoceros",stars:[{name:"HIP 31978",raHours:6.683,decDeg:9.8958},{name:"HIP 31216",raHours:6.5484,decDeg:7.333},{name:"HIP 30419",raHours:6.3961,decDeg:4.5928},{name:"HIP 32578",raHours:6.7977,decDeg:2.4122},{name:"HIP 34769",raHours:7.1977,decDeg:-.4928},{name:"HIP 30867",raHours:6.4803,decDeg:-7.0331},{name:"HIP 29651",raHours:6.2476,decDeg:-6.2747},{name:"HIP 39863",raHours:8.1432,decDeg:-2.9838},{name:"HIP 37447",raHours:7.6875,decDeg:-9.5511}],lines:[[0,1],[1,2],[2,3],[3,1],[3,4],[4,5],[5,6],[4,7],[7,8]]},{name:"Musca",stars:[{name:"HIP 57363",raHours:11.7602,decDeg:-66.7288},{name:"HIP 59929",raHours:12.293,decDeg:-67.9607},{name:"HIP 61585",raHours:12.6197,decDeg:-69.1355},{name:"HIP 62322",raHours:12.7714,decDeg:-68.1081},{name:"HIP 63613",raHours:13.0377,decDeg:-71.5488},{name:"HIP 61199",raHours:12.5411,decDeg:-72.133}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,2]]},{name:"Norma",stars:[{name:"HIP 78639",raHours:16.0536,decDeg:-49.2297},{name:"HIP 80000",raHours:16.3307,decDeg:-50.1554},{name:"Yaqana",raHours:16.4531,decDeg:-47.5547},{name:"HIP 78914",raHours:16.1082,decDeg:-45.1733}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Octans",stars:[{name:"HIP 70638",raHours:14.4488,decDeg:-83.6679},{name:"HIP 107089",raHours:21.6912,decDeg:-77.3895},{name:"HIP 112405",raHours:22.7677,decDeg:-81.3816}],lines:[[0,1],[1,2],[2,0]]},{name:"Ophiuchus",stars:[{name:"Rasalhague",raHours:17.5822,decDeg:12.5606},{name:"HIP 83000",raHours:16.9612,decDeg:9.3751},{name:"Marfik",raHours:16.5152,decDeg:1.9841},{name:"Yed Prior",raHours:16.2391,decDeg:-3.694},{name:"Yed Posterior",raHours:16.3053,decDeg:-4.6926},{name:"HIP 80628",raHours:16.4634,decDeg:-8.3717},{name:"Saik",raHours:16.6193,decDeg:-10.5672},{name:"Sabik",raHours:17.173,decDeg:-15.7251},{name:"Cebalrai",raHours:17.7245,decDeg:4.5669},{name:"Muliphen",raHours:17.7982,decDeg:2.7075},{name:"HIP 88048",raHours:17.9838,decDeg:-9.7733},{name:"Garafsa",raHours:17.3668,decDeg:-24.9995},{name:"HIP 85423",raHours:17.4559,decDeg:-29.8667},{name:"HIP 80894",raHours:16.519,decDeg:-16.6126},{name:"HIP 80569",raHours:16.4504,decDeg:-18.4562},{name:"HIP 80343",raHours:16.4017,decDeg:-20.0372},{name:"HIP 80473",raHours:16.4264,decDeg:-23.4471}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[1,6],[6,7],[7,8],[8,9],[9,10],[8,0],[7,11],[11,12],[6,13],[13,14],[14,15],[15,16]]},{name:"Orion",stars:[{name:"Betelgeuse",raHours:5.9195,decDeg:7.407},{name:"Alnitak",raHours:5.6793,decDeg:-1.9426},{name:"Saiph",raHours:5.7959,decDeg:-9.6696},{name:"Alnilam",raHours:5.6036,decDeg:-1.2019},{name:"Mintaka",raHours:5.5334,decDeg:-.2991},{name:"Bellatrix",raHours:5.4189,decDeg:6.3497},{name:"Saif al Jabbar",raHours:5.4079,decDeg:-2.3971},{name:"Rigel",raHours:5.2423,decDeg:-8.2016},{name:"Meissa",raHours:5.5856,decDeg:9.9342},{name:"HIP 23607",raHours:5.0761,decDeg:15.4042},{name:"Al Kumm II",raHours:4.9395,decDeg:13.5146},{name:"Al Taj IV",raHours:4.9149,decDeg:10.1511},{name:"Al Taj I",raHours:4.8435,decDeg:8.9003},{name:"Tabit",raHours:4.8306,decDeg:6.9612},{name:"Al Taj II",raHours:4.8534,decDeg:5.6051},{name:"Al Taj III",raHours:4.9042,decDeg:2.4407},{name:"Al Taj V",raHours:4.9758,decDeg:1.714},{name:"HIP 28614",raHours:6.0397,decDeg:9.6474},{name:"HIP 29038",raHours:6.1262,decDeg:14.7685},{name:"HIP 29426",raHours:6.199,decDeg:14.2088},{name:"HIP 28716",raHours:6.0653,decDeg:20.1385},{name:"HIP 27913",raHours:5.9064,decDeg:20.2764}],lines:[[0,1],[1,2],[1,3],[3,4],[4,5],[4,6],[6,7],[0,5],[5,8],[8,0],[9,10],[10,11],[11,12],[12,13],[13,5],[13,14],[14,15],[15,16],[0,17],[17,18],[19,20],[20,21],[21,18]]},{name:"Pavo",stars:[{name:"Peacock",raHours:20.4275,decDeg:-56.7349},{name:"HIP 99240",raHours:20.145,decDeg:-66.1793},{name:"HIP 102395",raHours:20.7493,decDeg:-66.2032},{name:"HIP 105858",raHours:21.4407,decDeg:-65.3681},{name:"HIP 91792",raHours:18.7173,decDeg:-71.4277},{name:"HIP 98495",raHours:20.0098,decDeg:-72.9102},{name:"HIP 93015",raHours:18.9492,decDeg:-67.2335},{name:"HIP 88866",raHours:18.143,decDeg:-63.668},{name:"HIP 86929",raHours:17.7622,decDeg:-64.7237},{name:"HIP 90098",raHours:18.3871,decDeg:-61.4939},{name:"HIP 92609",raHours:18.8703,decDeg:-62.1876}],lines:[[0,1],[1,2],[0,3],[3,2],[4,1],[1,5],[1,6],[6,7],[7,8],[7,9],[9,10],[10,1]]},{name:"Pegasus",stars:[{name:"HIP 109410",raHours:22.1665,decDeg:33.1783},{name:"Matar",raHours:22.7167,decDeg:30.2213},{name:"Scheat",raHours:23.0629,decDeg:28.0825},{name:"Sadalbari",raHours:22.8334,decDeg:24.6017},{name:"Sadalnazi",raHours:22.7755,decDeg:23.5657},{name:"HIP 109176",raHours:22.1168,decDeg:25.345},{name:"HIP 107354",raHours:21.7441,decDeg:25.645},{name:"Alpheratz",raHours:.1398,decDeg:29.0908},{name:"Markab",raHours:23.0793,decDeg:15.2054},{name:"Algenib",raHours:.2206,decDeg:15.1836},{name:"Enif",raHours:21.7364,decDeg:9.875},{name:"Biham",raHours:22.1699,decDeg:6.1978},{name:"Homam",raHours:22.691,decDeg:10.8314}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[7,2],[2,8],[8,9],[9,7],[10,11],[11,12],[12,8]]},{name:"Perseus",stars:[{name:"Atik",raHours:3.7386,decDeg:32.2883},{name:"Atik (18246)",raHours:3.9022,decDeg:31.8837},{name:"Menkib",raHours:3.9827,decDeg:35.791},{name:"Aldu",raHours:3.9642,decDeg:40.0103},{name:"Sarvvis",raHours:3.7154,decDeg:47.7877},{name:"Mirfak",raHours:3.4054,decDeg:49.8612},{name:"HIP 14328",raHours:3.0799,decDeg:53.5065},{name:"Miram",raHours:2.8449,decDeg:55.8955},{name:"HIP 13531",raHours:2.9043,decDeg:52.7625},{name:"HIP 14632",raHours:3.1508,decDeg:49.6135},{name:"Misam",raHours:3.1582,decDeg:44.8579},{name:"Algol",raHours:3.1361,decDeg:40.9557},{name:"Gorgonea Tertia",raHours:3.0862,decDeg:38.8405},{name:"HIP 19343",raHours:4.1444,decDeg:47.7126},{name:"HIP 19812",raHours:4.2483,decDeg:48.4094},{name:"HIP 20070",raHours:4.304,decDeg:50.2956},{name:"HIP 19167",raHours:4.1097,decDeg:50.3514},{name:"HIP 12777",raHours:2.7366,decDeg:49.2287},{name:"Dajiangjunbei",raHours:1.7277,decDeg:50.6888}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,6],[8,9],[9,5],[9,10],[10,11],[11,3],[11,12],[4,13],[13,14],[14,15],[15,16],[9,17],[17,18]]},{name:"Phoenix",stars:[{name:"Ankaa",raHours:.438,decDeg:-42.3051},{name:"Alrial III",raHours:1.1014,decDeg:-46.7185},{name:"Alrial V",raHours:1.4728,decDeg:-43.3177},{name:"HIP 765",raHours:.1568,decDeg:-45.747},{name:"Wurren",raHours:1.1397,decDeg:-55.2458},{name:"HIP 7083",raHours:1.5208,decDeg:-49.0731}],lines:[[0,1],[1,2],[0,3],[3,1],[1,4],[4,5],[5,2]]},{name:"Pictor",stars:[{name:"HIP 32607",raHours:6.8032,decDeg:-61.942},{name:"HIP 27530",raHours:5.8304,decDeg:-56.1665},{name:"HIP 27321",raHours:5.7881,decDeg:-51.0667}],lines:[[0,1],[1,2]]},{name:"Pisces",stars:[{name:"HIP 5742",raHours:1.2291,decDeg:24.5838},{name:"HIP 6193",raHours:1.3244,decDeg:27.2641},{name:"HIP 5586",raHours:1.1943,decDeg:30.0897},{name:"Alpherg",raHours:1.5247,decDeg:15.3458},{name:"Torcular",raHours:1.7566,decDeg:9.1576},{name:"Alrescha",raHours:2.0341,decDeg:2.7638},{name:"HIP 7884",raHours:1.6905,decDeg:5.4876},{name:"HIP 4906",raHours:1.0491,decDeg:7.8901},{name:"Kuton I",raHours:.8114,decDeg:7.5852},{name:"HIP 118268",raHours:23.9885,decDeg:6.8636},{name:"HIP 116771",raHours:23.6658,decDeg:5.6274},{name:"HIP 115830",raHours:23.4662,decDeg:6.3791},{name:"HIP 114971",raHours:23.286,decDeg:3.2822},{name:"HIP 115738",raHours:23.4489,decDeg:1.2558},{name:"HIP 116928",raHours:23.7008,decDeg:1.7804}],lines:[[0,1],[1,2],[2,0],[0,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,10]]},{name:"Piscis Austrinus",stars:[{name:"Fomalhaut",raHours:22.9608,decDeg:-29.6218},{name:"HIP 113246",raHours:22.9325,decDeg:-32.5397},{name:"HIP 112948",raHours:22.8754,decDeg:-32.8755},{name:"Fum al Hui",raHours:22.5251,decDeg:-32.346},{name:"HIP 109285",raHours:22.1397,decDeg:-32.9884},{name:"HIP 107380",raHours:21.7491,decDeg:-33.0256},{name:"HIP 107608",raHours:21.7956,decDeg:-30.8983},{name:"HIP 111954",raHours:22.6776,decDeg:-27.0436}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,4],[4,7],[7,0]]},{name:"Puppis",stars:[{name:"Regor",raHours:8.1589,decDeg:-47.3366},{name:"Naos",raHours:8.0597,decDeg:-40.0032},{name:"Tureis",raHours:8.1258,decDeg:-24.3044},{name:"Azmidi",raHours:7.8216,decDeg:-24.8598},{name:"HIP 37229",raHours:7.6472,decDeg:-26.8039},{name:"HIP 36917",raHours:7.5897,decDeg:-28.3693},{name:"HIP 35264",raHours:7.2857,decDeg:-37.0975},{name:"Pipit",raHours:6.6294,decDeg:-43.1959},{name:"Canopus",raHours:6.3992,decDeg:-52.6957},{name:"HIP 37677",raHours:7.7301,decDeg:-28.9548},{name:"HIP 38070",raHours:7.8014,decDeg:-25.9372}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,3]]},{name:"Pyxis",stars:[{name:"Naos",raHours:8.0597,decDeg:-40.0032},{name:"HIP 42515",raHours:8.6684,decDeg:-35.3083},{name:"HIP 42828",raHours:8.7265,decDeg:-33.1864},{name:"HIP 43409",raHours:8.8422,decDeg:-27.7101}],lines:[[0,1],[1,2],[2,3]]},{name:"Reticulum",stars:[{name:"Rhombus",raHours:4.2404,decDeg:-62.474},{name:"HIP 17440",raHours:3.7365,decDeg:-64.8071},{name:"HIP 18597",raHours:3.9791,decDeg:-61.4002},{name:"HIP 19921",raHours:4.2747,decDeg:-59.3017}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Sagitta",stars:[{name:"Telum",raHours:19.9793,decDeg:19.4921},{name:"Zuoqi",raHours:19.7898,decDeg:18.5343},{name:"Sham",raHours:19.6683,decDeg:18.0139},{name:"Shakh",raHours:19.6841,decDeg:17.4761}],lines:[[0,1],[1,2],[1,3]]},{name:"Sagittarius",stars:[{name:"Kaus Australis",raHours:18.4029,decDeg:-34.3843},{name:"Alnasl",raHours:18.0968,decDeg:-30.4237},{name:"Kaus Media",raHours:18.3499,decDeg:-29.828},{name:"Kaus Borealis",raHours:18.4662,decDeg:-25.4212},{name:"Namalsadirah I",raHours:18.7609,decDeg:-26.9908},{name:"Nunki",raHours:18.9211,decDeg:-26.2966},{name:"Namalsadirah II",raHours:19.1157,decDeg:-27.6698},{name:"Ascella",raHours:19.0435,decDeg:-29.8801},{name:"Hamalwarid",raHours:18.2938,decDeg:-36.7613},{name:"Polis",raHours:18.2294,decDeg:-21.0588},{name:"HIP 95168",raHours:19.3612,decDeg:-17.8473},{name:"Albaldah",raHours:19.1627,decDeg:-21.0235},{name:"HIP 93683",raHours:19.078,decDeg:-21.7414},{name:"HIP 93085",raHours:18.9622,decDeg:-21.1066}],lines:[[0,1],[1,2],[2,0],[2,3],[3,4],[4,2],[4,5],[5,6],[6,7],[7,4],[7,0],[0,8],[3,9],[10,11],[11,12],[12,13],[13,11]]},{name:"Scorpius",stars:[{name:"Acrab",raHours:16.0906,decDeg:-19.8054},{name:"Dschubba",raHours:16.0056,decDeg:-22.6216},{name:"Fang",raHours:15.9809,decDeg:-26.114},{name:"Alniyat",raHours:16.3531,decDeg:-25.5928},{name:"Antares",raHours:16.4901,decDeg:-26.4319},{name:"Paikauhale",raHours:16.598,decDeg:-28.216},{name:"Larawag",raHours:16.8362,decDeg:-34.2926},{name:"Xamidimura",raHours:16.8645,decDeg:-38.0473},{name:"HIP 82729",raHours:16.9098,decDeg:-42.3608},{name:"HIP 84143",raHours:17.2025,decDeg:-43.2385},{name:"Sargas",raHours:17.622,decDeg:-42.9978},{name:"Girtab",raHours:17.7931,decDeg:-40.127},{name:"Mula",raHours:17.7081,decDeg:-39.0299},{name:"Lesath",raHours:17.5127,decDeg:-37.2957},{name:"Shaula",raHours:17.5601,decDeg:-37.1037},{name:"Fuyue",raHours:17.831,decDeg:-37.0434},{name:"Jabbah",raHours:16.1999,decDeg:-19.4606},{name:"Iklil",raHours:15.9481,decDeg:-29.214}],lines:[[0,1],[1,2],[1,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[0,16],[2,17]]},{name:"Sculptor",stars:[{name:"HIP 4577",raHours:.9768,decDeg:-29.3575},{name:"HIP 117452",raHours:23.8154,decDeg:-28.13},{name:"HIP 115102",raHours:23.3137,decDeg:-32.5318},{name:"HIP 116231",raHours:23.5495,decDeg:-37.8184}],lines:[[0,1],[1,2],[2,3]]},{name:"Scutum",stars:[{name:"HIP 92175",raHours:18.7862,decDeg:-4.7478},{name:"Tianbian",raHours:18.5868,decDeg:-8.2433},{name:"HIP 90595",raHours:18.4866,decDeg:-14.5658},{name:"HIP 91726",raHours:18.7046,decDeg:-9.0526}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Serpens",stars:[{name:"Chow",raHours:15.7698,decDeg:15.4219},{name:"Nasak Shamiya II",raHours:15.9408,decDeg:15.6647},{name:"Gudja",raHours:15.8123,decDeg:18.1418},{name:"HIP 76852",raHours:15.6925,decDeg:19.6705},{name:"Nasak Yamani I",raHours:15.5801,decDeg:10.5389},{name:"Unukalhai",raHours:15.7378,decDeg:6.4255},{name:"Nasak Yamani II",raHours:15.8469,decDeg:4.4776},{name:"HIP 77516",raHours:15.827,decDeg:-3.4301},{name:"Yed Prior",raHours:16.2391,decDeg:-3.694},{name:"Sabik",raHours:17.173,decDeg:-15.7251},{name:"HIP 86263",raHours:17.6265,decDeg:-15.3984},{name:"HIP 88048",raHours:17.9838,decDeg:-9.7733},{name:"HIP 89962",raHours:18.3553,decDeg:-2.8971},{name:"Alya",raHours:18.937,decDeg:4.2035}],lines:[[0,1],[1,2],[2,3],[3,0],[0,4],[4,5],[5,6],[6,7],[7,8],[9,10],[10,11],[11,12],[12,13]]},{name:"Sextans",stars:[{name:"HIP 48437",raHours:9.8751,decDeg:-8.1049},{name:"HIP 49641",raHours:10.1323,decDeg:-.3716},{name:"HIP 51437",raHours:10.5049,decDeg:-.637},{name:"HIP 51362",raHours:10.4913,decDeg:-2.739}],lines:[[0,1],[1,2],[2,3]]},{name:"Taurus",stars:[{name:"Tianguan",raHours:5.6274,decDeg:21.1426},{name:"Aldebaran",raHours:4.5987,decDeg:16.5098},{name:"Chamukuy",raHours:4.4777,decDeg:15.8709},{name:"Prima Hyadum",raHours:4.3299,decDeg:15.6277},{name:"Secunda Hyadum",raHours:4.3822,decDeg:17.5426},{name:"Ain",raHours:4.4769,decDeg:19.1805},{name:"Elnath",raHours:5.4382,decDeg:28.6079},{name:"HIP 16083",raHours:3.4528,decDeg:9.7328},{name:"HIP 18907",raHours:4.0526,decDeg:5.9893},{name:"HIP 15900",raHours:3.4136,decDeg:9.0291},{name:"HIP 16852",raHours:3.6146,decDeg:.4028},{name:"Bibing",raHours:4.0113,decDeg:12.4904}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[7,8],[9,10],[3,11],[11,7]]},{name:"Telescopium",stars:[{name:"HIP 89112",raHours:18.1872,decDeg:-45.9543},{name:"HIP 90422",raHours:18.4496,decDeg:-45.9683},{name:"HIP 90568",raHours:18.4805,decDeg:-49.07}],lines:[[0,1],[1,2]]},{name:"Triangulum",stars:[{name:"Mothallah",raHours:1.8847,decDeg:29.5794},{name:"Mizan",raHours:2.159,decDeg:34.9874},{name:"Apdu",raHours:2.2886,decDeg:33.8473}],lines:[[0,1],[1,2],[2,0]]},{name:"Triangulum Australe",stars:[{name:"Atria",raHours:16.8111,decDeg:-69.0276},{name:"HIP 77952",raHours:15.9191,decDeg:-63.4297},{name:"HIP 76440",raHours:15.612,decDeg:-66.3169},{name:"HIP 74946",raHours:15.3152,decDeg:-68.6795}],lines:[[0,1],[1,2],[2,3],[3,0]]},{name:"Tucana",stars:[{name:"HIP 2484",raHours:.5257,decDeg:-62.9581},{name:"HIP 1599",raHours:.3339,decDeg:-64.8776},{name:"HIP 118322",raHours:23.9986,decDeg:-65.5771},{name:"HIP 110838",raHours:22.4555,decDeg:-64.9664},{name:"Lang-Exster",raHours:22.3084,decDeg:-60.2595},{name:"HIP 114996",raHours:23.2905,decDeg:-58.2359}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},{name:"Ursa Major",stars:[{name:"Phecda",raHours:11.8972,decDeg:53.6947},{name:"Taiyangshou",raHours:11.7675,decDeg:47.7793},{name:"HIP 54539",raHours:11.1611,decDeg:44.4986},{name:"Tania Australis",raHours:10.3722,decDeg:41.4994},{name:"Tania Borealis",raHours:10.285,decDeg:42.9145},{name:"Alula Borealis",raHours:11.308,decDeg:33.0942},{name:"Alula Australis",raHours:11.3031,decDeg:31.5308},{name:"Megrez",raHours:12.2571,decDeg:57.0326},{name:"Dubhe",raHours:11.0622,decDeg:61.7511},{name:"Merak",raHours:11.0307,decDeg:56.3823},{name:"Alioth",raHours:12.9005,decDeg:55.9598},{name:"Mizar",raHours:13.3987,decDeg:54.9254},{name:"Alkaid",raHours:13.7924,decDeg:49.3133},{name:"Alhaud IV",raHours:9.5254,decDeg:63.0618},{name:"Alhaud VI",raHours:9.8499,decDeg:59.0391},{name:"Muscida",raHours:8.5045,decDeg:60.7184},{name:"Alhaud V",raHours:9.5479,decDeg:51.6786},{name:"Alkaphrah",raHours:9.0604,decDeg:47.1567},{name:"Talitha",raHours:8.9869,decDeg:48.0423}],lines:[[0,1],[1,2],[2,3],[3,4],[1,5],[5,6],[7,8],[8,9],[9,0],[0,7],[7,10],[10,11],[11,12],[8,13],[13,14],[13,15],[15,14],[14,9],[14,16],[16,17],[17,18]]},{name:"Ursa Minor",stars:[{name:"Polaris",raHours:2.5297,decDeg:89.2641},{name:"Yildun",raHours:17.5369,decDeg:86.5863},{name:"Circitores",raHours:16.7662,decDeg:82.0373},{name:"Akfa Farkadain",raHours:15.7343,decDeg:77.7945},{name:"Anwa Farkadain",raHours:16.2918,decDeg:75.7547},{name:"Pherkad",raHours:15.3455,decDeg:71.834},{name:"Kochab",raHours:14.8451,decDeg:74.1555}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]]},{name:"Vela",stars:[{name:"Alsephina",raHours:8.7451,decDeg:-54.7086},{name:"Regor",raHours:8.1589,decDeg:-47.3366},{name:"Suhail",raHours:9.1333,decDeg:-43.4326},{name:"HIP 46651",raHours:9.5117,decDeg:-40.4669},{name:"HIP 50191",raHours:10.2456,decDeg:-42.1221},{name:"HIP 52727",raHours:10.7795,decDeg:-49.4201},{name:"HIP 48774",raHours:9.9477,decDeg:-54.5678},{name:"Markeb",raHours:9.3686,decDeg:-55.0107}],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0]]},{name:"Virgo",stars:[{name:"Zaniah",raHours:12.3318,decDeg:-.6667},{name:"HIP 58948",raHours:12.0869,decDeg:8.7328},{name:"HIP 57380",raHours:11.7643,decDeg:6.5298},{name:"Zavijava",raHours:11.8448,decDeg:1.7654},{name:"Porrima",raHours:12.6944,decDeg:-1.4495},{name:"Minelauva",raHours:12.9268,decDeg:3.3976},{name:"Vindemiatrix",raHours:13.0363,decDeg:10.9591},{name:"HIP 64238",raHours:13.1658,decDeg:-5.5389},{name:"Spica",raHours:13.4199,decDeg:-11.1612},{name:"Heze",raHours:13.5783,decDeg:-.5959},{name:"HIP 68520",raHours:14.0274,decDeg:1.5446},{name:"Maenalus",raHours:14.7708,decDeg:1.8929},{name:"Syrma",raHours:14.2669,decDeg:-5.9995},{name:"Rijl al Awwa",raHours:14.7177,decDeg:-5.6574}],lines:[[0,1],[1,2],[2,3],[3,0],[0,4],[4,5],[5,6],[4,7],[7,8],[4,9],[9,10],[10,11],[9,12],[12,13]]},{name:"Volans",stars:[{name:"HIP 44382",raHours:9.0408,decDeg:-66.3958},{name:"HIP 41312",raHours:8.429,decDeg:-66.1365},{name:"HIP 39794",raHours:8.1322,decDeg:-68.6171},{name:"HIP 35228",raHours:7.2805,decDeg:-67.9572},{name:"HIP 34481",raHours:7.1458,decDeg:-70.4992}],lines:[[0,1],[1,2],[2,3],[3,4],[4,2],[2,0]]},{name:"Vulpecula",stars:[{name:"Anser",raHours:19.4784,decDeg:24.6652},{name:"HIP 97886",raHours:19.891,decDeg:24.0795}],lines:[[0,1]]}],Lo="const:";function sM(n){return`${Lo}${n.name}`}function rm(){return tn.map(n=>({id:sM(n),name:n.name,sub:"constellation"}))}const om=n=>n.toLowerCase().trim().replace(/\s+/g," ");function rM(n,e){const t=om(n);return t===e?100:t.startsWith(e)?80:t.includes(e)?60:-1}function oM(n){const e=om(n),t=rm();return e?t.map(i=>({e:i,s:rM(i.name,e)})).filter(i=>i.s>=0).sort((i,s)=>s.s-i.s||i.e.name.localeCompare(s.e.name)).map(i=>i.e):t}const hf={type:"change"},Sd={type:"start"},am={type:"end"},Na=new Xo,ff=new Yi,aM=Math.cos(70*Wn.DEG2RAD),Lt=new R,hn=2*Math.PI,dt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Dl=1e-6;class cM extends J_{constructor(e,t=null){super(e,t),this.state=dt.NONE,this.enabled=!0,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:fr.ROTATE,MIDDLE:fr.DOLLY,RIGHT:fr.PAN},this.touches={ONE:lr.ROTATE,TWO:lr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new es,this._lastTargetPosition=new R,this._quat=new es().setFromUnitVectors(e.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new uf,this._sphericalDelta=new uf,this._scale=1,this._panOffset=new R,this._rotateStart=new be,this._rotateEnd=new be,this._rotateDelta=new be,this._panStart=new be,this._panEnd=new be,this._panDelta=new be,this._dollyStart=new be,this._dollyEnd=new be,this._dollyDelta=new be,this._dollyDirection=new R,this._mouse=new be,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=uM.bind(this),this._onPointerDown=lM.bind(this),this._onPointerUp=dM.bind(this),this._onContextMenu=vM.bind(this),this._onMouseWheel=pM.bind(this),this._onKeyDown=mM.bind(this),this._onTouchStart=gM.bind(this),this._onTouchMove=xM.bind(this),this._onMouseDown=hM.bind(this),this._onMouseMove=fM.bind(this),this._interceptControlDown=_M.bind(this),this._interceptControlUp=MM.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(hf),this.update(),this.state=dt.NONE}update(e=null){const t=this.object.position;Lt.copy(t).sub(this.target),Lt.applyQuaternion(this._quat),this._spherical.setFromVector3(Lt),this.autoRotate&&this.state===dt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=hn:i>Math.PI&&(i-=hn),s<-Math.PI?s+=hn:s>Math.PI&&(s-=hn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Lt.setFromSpherical(this._spherical),Lt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Lt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Lt.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new R(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new R(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Lt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Na.origin.copy(this.object.position),Na.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Na.direction))<aM?this.object.lookAt(this.target):(ff.setFromNormalAndCoplanarPoint(this.object.up,this.target),Na.intersectPlane(ff,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Dl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Dl||this._lastTargetPosition.distanceToSquared(this.target)>Dl?(this.dispatchEvent(hf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?hn/60*this.autoRotateSpeed*e:hn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Lt.setFromMatrixColumn(t,0),Lt.multiplyScalar(-e),this._panOffset.add(Lt)}_panUp(e,t){this.screenSpacePanning===!0?Lt.setFromMatrixColumn(t,1):(Lt.setFromMatrixColumn(t,0),Lt.crossVectors(this.object.up,Lt)),Lt.multiplyScalar(e),this._panOffset.add(Lt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Lt.copy(s).sub(this.target);let r=Lt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(hn*this._rotateDelta.x/t.clientHeight),this._rotateUp(hn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(hn*this._rotateDelta.x/t.clientHeight),this._rotateUp(hn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new be,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function lM(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function uM(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function dM(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(am),this.state=dt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function hM(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case fr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=dt.DOLLY;break;case fr.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=dt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=dt.ROTATE}break;case fr.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=dt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=dt.PAN}break;default:this.state=dt.NONE}this.state!==dt.NONE&&this.dispatchEvent(Sd)}function fM(n){switch(this.state){case dt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case dt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case dt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function pM(n){this.enabled===!1||this.enableZoom===!1||this.state!==dt.NONE||(n.preventDefault(),this.dispatchEvent(Sd),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(am))}function mM(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function gM(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case lr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=dt.TOUCH_ROTATE;break;case lr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=dt.TOUCH_PAN;break;default:this.state=dt.NONE}break;case 2:switch(this.touches.TWO){case lr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=dt.TOUCH_DOLLY_PAN;break;case lr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=dt.TOUCH_DOLLY_ROTATE;break;default:this.state=dt.NONE}break;default:this.state=dt.NONE}this.state!==dt.NONE&&this.dispatchEvent(Sd)}function xM(n){switch(this._trackPointer(n),this.state){case dt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case dt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case dt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case dt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=dt.NONE}}function vM(n){this.enabled!==!1&&n.preventDefault()}function _M(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function MM(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}ge.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new be(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};fn.line={uniforms:Gn.merge([ge.common,ge.fog,ge.line]),vertexShader:`
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
		`};class Nu extends _t{constructor(e){super({type:"LineMaterial",uniforms:Gn.clone(fn.line.uniforms),vertexShader:fn.line.vertexShader,fragmentShader:fn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const pf=new li,Oa=new R;class Ou extends q_{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new xt(e,3)),this.setAttribute("uv",new xt(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const i=new Hu(t,6,1);return this.setAttribute("instanceStart",new ei(i,3,0)),this.setAttribute("instanceEnd",new ei(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const i=new Hu(t,6,1);return this.setAttribute("instanceColorStart",new ei(i,3,0)),this.setAttribute("instanceColorEnd",new ei(i,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new F_(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new li);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),pf.setFromBufferAttribute(t),this.boundingBox.union(pf))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Oi),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Oa.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Oa)),Oa.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Oa));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}const wl=new ct,mf=new R,gf=new R,Vt=new ct,Xt=new ct,Kn=new ct,Pl=new R,Cl=new ot,Yt=new Z_,xf=new R,za=new li,Fa=new Oi,Zn=new ct;let Qn,Ds;function vf(n,e,t){return Zn.set(0,0,-e,1).applyMatrix4(n.projectionMatrix),Zn.multiplyScalar(1/Zn.w),Zn.x=Ds/t.width,Zn.y=Ds/t.height,Zn.applyMatrix4(n.projectionMatrixInverse),Zn.multiplyScalar(1/Zn.w),Math.abs(Math.max(Zn.x,Zn.y))}function yM(n,e){const t=n.matrixWorld,i=n.geometry,s=i.attributes.instanceStart,r=i.attributes.instanceEnd,o=Math.min(i.instanceCount,s.count);for(let a=0,c=o;a<c;a++){Yt.start.fromBufferAttribute(s,a),Yt.end.fromBufferAttribute(r,a),Yt.applyMatrix4(t);const l=new R,u=new R;Qn.distanceSqToSegment(Yt.start,Yt.end,u,l),u.distanceTo(l)<Ds*.5&&e.push({point:u,pointOnLine:l,distance:Qn.origin.distanceTo(u),object:n,face:null,faceIndex:a,uv:null,uv1:null})}}function SM(n,e,t){const i=e.projectionMatrix,r=n.material.resolution,o=n.matrixWorld,a=n.geometry,c=a.attributes.instanceStart,l=a.attributes.instanceEnd,u=Math.min(a.instanceCount,c.count),d=-e.near;Qn.at(1,Kn),Kn.w=1,Kn.applyMatrix4(e.matrixWorldInverse),Kn.applyMatrix4(i),Kn.multiplyScalar(1/Kn.w),Kn.x*=r.x/2,Kn.y*=r.y/2,Kn.z=0,Pl.copy(Kn),Cl.multiplyMatrices(e.matrixWorldInverse,o);for(let h=0,f=u;h<f;h++){if(Vt.fromBufferAttribute(c,h),Xt.fromBufferAttribute(l,h),Vt.w=1,Xt.w=1,Vt.applyMatrix4(Cl),Xt.applyMatrix4(Cl),Vt.z>d&&Xt.z>d)continue;if(Vt.z>d){const v=Vt.z-Xt.z,b=(Vt.z-d)/v;Vt.lerp(Xt,b)}else if(Xt.z>d){const v=Xt.z-Vt.z,b=(Xt.z-d)/v;Xt.lerp(Vt,b)}Vt.applyMatrix4(i),Xt.applyMatrix4(i),Vt.multiplyScalar(1/Vt.w),Xt.multiplyScalar(1/Xt.w),Vt.x*=r.x/2,Vt.y*=r.y/2,Xt.x*=r.x/2,Xt.y*=r.y/2,Yt.start.copy(Vt),Yt.start.z=0,Yt.end.copy(Xt),Yt.end.z=0;const x=Yt.closestPointToPointParameter(Pl,!0);Yt.at(x,xf);const m=Wn.lerp(Vt.z,Xt.z,x),p=m>=-1&&m<=1,y=Pl.distanceTo(xf)<Ds*.5;if(p&&y){Yt.start.fromBufferAttribute(c,h),Yt.end.fromBufferAttribute(l,h),Yt.start.applyMatrix4(o),Yt.end.applyMatrix4(o);const v=new R,b=new R;Qn.distanceSqToSegment(Yt.start,Yt.end,b,v),t.push({point:b,pointOnLine:v,distance:Qn.origin.distanceTo(b),object:n,face:null,faceIndex:h,uv:null,uv1:null})}}}class Rl extends wt{constructor(e=new Ou,t=new Nu({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let o=0,a=0,c=t.count;o<c;o++,a+=2)mf.fromBufferAttribute(t,o),gf.fromBufferAttribute(i,o),s[a]=a===0?0:s[a-1],s[a+1]=s[a]+mf.distanceTo(gf);const r=new Hu(s,2,1);return e.setAttribute("instanceDistanceStart",new ei(r,1,0)),e.setAttribute("instanceDistanceEnd",new ei(r,1,1)),this}raycast(e,t){const i=this.material.worldUnits,s=e.camera;s===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;Qn=e.ray;const o=this.matrixWorld,a=this.geometry,c=this.material;Ds=c.linewidth+r,a.boundingSphere===null&&a.computeBoundingSphere(),Fa.copy(a.boundingSphere).applyMatrix4(o);let l;if(i)l=Ds*.5;else{const d=Math.max(s.near,Fa.distanceToPoint(Qn.origin));l=vf(s,d,c.resolution)}if(Fa.radius+=l,Qn.intersectsSphere(Fa)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),za.copy(a.boundingBox).applyMatrix4(o);let u;if(i)u=Ds*.5;else{const d=Math.max(s.near,za.distanceToPoint(Qn.origin));u=vf(s,d,c.resolution)}za.expandByScalar(u),Qn.intersectsBox(za)!==!1&&(i?yM(this,t):SM(this,s,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(wl),this.material.uniforms.resolution.value.set(wl.z,wl.w))}}const dr=Math.PI/180;function bM(n,e,t=1e-10){const i=n%(2*Math.PI);let s=e<.8?i:Math.PI;for(let r=0;r<64;r++){const o=s-e*Math.sin(s)-i,a=1-e*Math.cos(s),c=o/a;if(s-=c,Math.abs(c)<t)break}return s}function cm(n,e){const t=e/ji,i=n.rates;return{a:n.a+(i?.a??0)*t,e:n.e+(i?.e??0)*t,i:n.i+(i?.i??0)*t,node:n.node+(i?.node??0)*t,peri:n.peri+(i?.peri??0)*t,M0:n.M0+(i?.M0??0)*t+lm(n,e),n:n.n}}function lm(n,e){if(!n.periodicM)return 0;const t=e/ji;let i=0;for(const s of n.periodicM){const r=s.f*t;i+=s.b*t*t+s.c*Math.cos(r*dr)+s.s*Math.sin(r*dr)}return i}function Ft(n,e){return _c(n,e,{x:0,y:0,z:0})}function _c(n,e,t){const i=n.a+(n.rates?.a??0)*(e/ji),s=n.e+(n.rates?.e??0)*(e/ji),r=n.i+(n.rates?.i??0)*(e/ji),o=n.node+(n.rates?.node??0)*(e/ji),a=n.peri+(n.rates?.peri??0)*(e/ji),c=n.M0+(n.rates?.M0??0)*(e/ji)+lm(n,e);return um(i,s,r,o,a,c,n.n,e,t)}function EM(n,e){return um(n.a,n.e,n.i,n.node,n.peri,n.M0,n.n,0,{x:0,y:0,z:0},e)}function um(n,e,t,i,s,r,o,a,c,l){const u=l??(r+o*a)*dr,d=bM(u,e),h=n*(Math.cos(d)-e),f=n*Math.sqrt(1-e*e)*Math.sin(d),g=s*dr,x=i*dr,m=t*dr,p=Math.cos(x),y=Math.sin(x),v=Math.cos(g),b=Math.sin(g),L=Math.cos(m),A=Math.sin(m);return c.x=(p*v-y*b*L)*h+(-p*b-y*v*L)*f,c.y=(y*v+p*b*L)*h+(-y*b+p*v*L)*f,c.z=b*A*h+v*A*f,c}function TM(n,e,t=256){const i=cm(n,e),s=[];for(let r=0;r<=t;r++){const o=r*(2*Math.PI/t);s.push(EM(i,o))}return s}const On=Math.PI/180,AM=1495978707e-1,DM=[[0,0,1,0,6288770,-20905400],[2,0,-1,0,1274030,-3699110],[2,0,0,0,658314,-2955970],[0,0,2,0,213618,-569925],[0,1,0,0,-185116,48888],[0,0,0,2,-114332,-3149],[2,0,-2,0,58793,246158],[2,-1,-1,0,57066,-152138],[2,0,1,0,53322,-170733],[2,-1,0,0,45758,-204586],[0,1,-1,0,-40923,-129620],[1,0,0,0,-34720,108743],[0,1,1,0,-30383,104755],[2,0,0,-2,15327,10321],[0,0,1,2,-12528,0],[0,0,1,-2,10980,79661],[4,0,-1,0,10675,-34782],[0,0,3,0,10034,-23210],[4,0,-2,0,8548,-21636],[2,1,-1,0,-7888,24208],[2,1,0,0,-6766,30824],[1,0,-1,0,-5163,-8379],[1,1,0,0,4987,-16675],[2,-1,1,0,4036,-12831],[2,0,2,0,3994,-10445],[4,0,0,0,3861,-11650],[2,0,-3,0,3665,14403],[0,1,-2,0,-2689,-7003],[2,0,-1,2,-2602,0],[2,-1,-2,0,2390,10056],[1,0,1,0,-2348,6322],[2,-2,0,0,2236,-9884],[0,1,2,0,-2120,5751],[0,2,0,0,-2069,0],[2,-2,-1,0,2048,-4950],[2,0,1,-2,-1773,4130],[2,0,0,2,-1595,0],[4,-1,-1,0,1215,-3958],[0,0,2,2,-1110,0],[3,0,-1,0,-892,3258],[2,1,1,0,-810,2616],[4,-1,-2,0,759,-1897],[0,2,-1,0,-713,-2117],[2,2,-1,0,-700,2354],[2,1,-2,0,691,0],[2,-1,0,-2,596,0],[4,0,1,0,549,-1423],[0,0,4,0,537,-1117],[4,-1,0,0,520,-1571],[1,0,-2,0,-487,-1739],[2,1,0,-2,-399,0],[0,0,2,-2,-381,-4421],[1,1,1,0,351,0],[3,0,-2,0,-340,0],[4,0,-3,0,330,0],[2,-1,2,0,327,0],[0,2,1,0,-323,1165],[1,1,-1,0,299,0],[2,0,3,0,294,0],[2,0,-1,-2,0,8752]],wM=[[0,0,0,1,5128120],[0,0,1,1,280602],[0,0,1,-1,277693],[2,0,0,-1,173237],[2,0,-1,1,55413],[2,0,-1,-1,46271],[2,0,0,1,32573],[0,0,2,1,17198],[2,0,1,-1,9266],[0,0,2,-1,8822],[2,-1,0,-1,8216],[2,0,-2,-1,4324],[2,0,1,1,4200],[2,1,0,-1,-3359],[2,-1,-1,1,2463],[2,-1,0,1,2211],[2,-1,-1,-1,2065],[0,1,-1,-1,-1870],[4,0,-1,-1,1828],[0,1,0,1,-1794],[0,0,0,3,-1749],[0,1,-1,1,-1565],[1,0,0,1,-1491],[0,1,1,1,-1475],[0,1,1,-1,-1410],[0,1,0,-1,-1344],[1,0,0,-1,-1335],[0,0,3,1,1107],[4,0,0,-1,1021],[4,0,-1,1,833],[0,0,1,-3,777],[4,0,-2,1,671],[2,0,0,-3,607],[2,0,2,-1,596],[2,-1,1,-1,491],[2,0,-2,1,-451],[0,0,3,-1,439],[2,0,2,1,422],[2,0,-3,-1,421],[2,1,-1,1,-366],[2,1,0,1,-351],[4,0,0,1,331],[2,-1,1,1,315],[2,-2,0,-1,302],[0,0,1,3,-283],[2,1,1,-1,-229],[1,1,0,-1,223],[1,1,0,1,223],[0,1,-2,-1,-220],[2,1,-1,-1,-220],[1,0,1,1,-185],[2,-1,-2,-1,181],[0,1,2,1,-177],[4,0,-2,-1,176],[4,-1,-1,-1,166],[1,0,1,-1,-164],[4,0,1,-1,132],[1,0,-1,-1,-119],[4,-1,0,-1,115],[2,-2,0,1,107]];function xi(n){let e=n%360;return e<0&&(e+=360),e}function PM(n){const e=n/36525,t=218.3164477+(481267.8812342+(-.0015786+(1/538841-e/65194e3)*e)*e)*e,i=297.8501921+(445267.1114034+(-.0018819+(1/545868-e/113065e3)*e)*e)*e,s=357.5291092+(35999.0502909+(-1536e-7+e/2449e4)*e)*e,r=134.9633964+(477198.8675055+(.0087414+(1/69699.9+e/14712e3)*e)*e)*e,o=93.272095+(483202.0175233+(-.0036539+(-1/3526e3+e/86331e4)*e)*e)*e,a=119.75+131.849*e,c=53.09+479264.29*e,l=313.45+481266.484*e,u=1+(-.002516-74e-7*e)*e,d=u*u,h=xi(t)*On,f=xi(i)*On,g=xi(s)*On,x=xi(r)*On,m=xi(o)*On,p=xi(a)*On,y=xi(c)*On,v=xi(l)*On;let b=0,L=0;for(const S of DM){const[C,O,z,X,j,k]=S,K=C*f+O*g+z*x+X*m;let G=j,ne=k;Math.abs(O)===1?(G*=u,ne*=u):Math.abs(O)===2&&(G*=d,ne*=d),b+=G*Math.sin(K),L+=ne*Math.cos(K)}b+=3958*Math.sin(p)+1962*Math.sin(h-m)+318*Math.sin(y);let A=0;for(const S of wM){const[C,O,z,X,j]=S,k=C*f+O*g+z*x+X*m;let K=j;Math.abs(O)===1?K*=u:Math.abs(O)===2&&(K*=d),A+=K*Math.sin(k)}A+=-2235*Math.sin(h)+382*Math.sin(v)+175*Math.sin(p-m)+175*Math.sin(p+m)+127*Math.sin(h-x)-115*Math.sin(h+x);const w=xi(t+b/1e6),I=A/1e6,E=385000.56+L/1e3;return{lon:w,lat:I,deltaAu:E/AM}}function CM(n,e,t){const i=t/36525,s=(5028.796195*i+.556602*i*i)/3600,r=-46.836769*i+.005971*i*i,o=n-s,a=e-Math.cos(n*On)*r/3600;return{lon:o,lat:a}}function Ko(n){const e=PM(n),t=CM(e.lon,e.lat,n),i=t.lon*On,s=t.lat*On,r=e.deltaAu;return[r*Math.cos(s)*Math.cos(i),r*Math.cos(s)*Math.sin(i),r*Math.sin(s)]}const Ii=Math.PI,bt=Ii*2,co=Ii/180,RM=1440,LM=398600.8,yn=6378.135,Ai=60/Math.sqrt(yn*yn*yn/LM),Ll=yn*Ai/60,IM=1/Ai,Es=.001082616,HM=-253881e-11,UM=-165597e-11,Ts=HM/Es,Io=2/3,Il=1440/(2*Ii);function NM(n,e){const t=[31,n%4===0?29:28,31,30,31,30,31,31,30,31,30,31],i=Math.floor(e);let s=1,r=0;for(;i>r+t[s-1]&&s<12;)r+=t[s-1],s+=1;const o=s,a=i-r;let c=(e-i)*24;const l=Math.floor(c);c=(c-l)*60;const u=Math.floor(c),d=(c-u)*60;return{mon:o,day:a,hr:l,minute:u,sec:d}}function _f(n,e,t,i,s,r,o=0){return 367*n-Math.floor(7*(n+Math.floor((e+9)/12))*.25)+Math.floor(275*e/9)+t+17210135e-1+((o/6e4+r/60+s)/60+i)/24}function bd(n,e,t,i,s,r,o=0){if(n instanceof Date){const a=n;return _f(a.getUTCFullYear(),a.getUTCMonth()+1,a.getUTCDate(),a.getUTCHours(),a.getUTCMinutes(),a.getUTCSeconds(),a.getUTCMilliseconds())}return _f(n,e,t,i,s,r,o)}function dm(n,e){const{e3:t,ee2:i,peo:s,pgho:r,pho:o,pinco:a,plo:c,se2:l,se3:u,sgh2:d,sgh3:h,sgh4:f,sh2:g,sh3:x,si2:m,si3:p,sl2:y,sl3:v,sl4:b,t:L,xgh2:A,xgh3:w,xgh4:I,xh2:E,xh3:S,xi2:C,xi3:O,xl2:z,xl3:X,xl4:j,zmol:k,zmos:K}=n,{init:G,opsmode:ne}=e;let{ep:ce,inclp:ue,nodep:Te,argpp:Ue,mp:q}=e,Y,te,ae,ve,De,Ee,Ve,P,Be,Me,Ce,he,Ie,fe,xe,D,M,B,Z,J,Q;const Ae=119459e-10,re=.01675,de=.00015835218,Le=.0549;Q=K+Ae*L,G==="y"&&(Q=K),J=Q+2*re*Math.sin(Q),M=Math.sin(J),Me=.5*M*M-.25,Ce=-.5*M*Math.cos(J);const ie=l*Me+u*Ce,me=m*Me+p*Ce,_=y*Me+v*Ce+b*M,Re=d*Me+h*Ce+f*M,pe=g*Me+x*Ce;Q=k+de*L,G==="y"&&(Q=k),J=Q+2*Le*Math.sin(Q),M=Math.sin(J),Me=.5*M*M-.25,Ce=-.5*M*Math.cos(J);const ze=i*Me+t*Ce,Fe=C*Me+O*Ce,Je=z*Me+X*Ce+j*M,H=A*Me+w*Ce+I*M,se=E*Me+S*Ce;return he=ie+ze,xe=me+Fe,D=_+Je,Ie=Re+H,fe=pe+se,G==="n"&&(he-=s,xe-=a,D-=c,Ie-=r,fe-=o,ue+=xe,ce+=he,ve=Math.sin(ue),ae=Math.cos(ue),ue>=.2?(fe/=ve,Ie-=ae*fe,Ue+=Ie,Te+=fe,q+=D):(Ee=Math.sin(Te),De=Math.cos(Te),Y=ve*Ee,te=ve*De,Ve=fe*De+xe*ae*Ee,P=-fe*Ee+xe*ae*De,Y+=Ve,te+=P,Te%=bt,Te<0&&ne==="a"&&(Te+=bt),B=q+Ue+ae*Te,Be=D+Ie-xe*Te*ve,B+=Be,Z=Te,Te=Math.atan2(Y,te),Te<0&&ne==="a"&&(Te+=bt),Math.abs(Z-Te)>Ii&&(Te<Z?Te+=bt:Te-=bt),q+=D,Ue=B-q-ae*Te)),{ep:ce,inclp:ue,nodep:Te,argpp:Ue,mp:q}}function OM(n){const{epoch:e,ep:t,argpp:i,tc:s,inclp:r,nodep:o,np:a}=n;let c,l,u,d,h,f,g,x,m,p,y,v,b,L,A,w,I,E,S,C,O,z,X,j,k,K,G,ne,ce,ue,Te,Ue,q,Y,te,ae,ve,De,Ee,Ve,P,Be,Me,Ce,he,Ie,fe,xe,D,M,B,Z,J,Q,Ae,re,de,Le,ie,me,_,Re,pe;const ze=.01675,Fe=.0549,Je=29864797e-13,H=47968065e-14,se=.39785416,ee=.91744867,$=.1945905,le=-.98088458,Ne=a,Ge=t,Qe=Math.sin(o),ut=Math.cos(o),Xe=Math.sin(i),Mt=Math.cos(i),ht=Math.sin(r),Ye=Math.cos(r),ft=Ge*Ge,Pt=1-ft,Tn=Math.sqrt(Pt),it=0,Yn=0,ui=0,jn=0,zi=0,An=e+18261.5+s/1440,gn=(4.523602-.00092422029*An)%bt,Et=Math.sin(gn),un=Math.cos(gn),T=.91375164-.03568096*un,N=Math.sqrt(1-T*T),W=.089683511*Et/N,V=Math.sqrt(1-W*W),U=5.8351514+.001944368*An;let oe=.39785416*Et/N;const Se=V*un+.91744867*W*Et;oe=Math.atan2(oe,Se),oe+=U-gn;const we=Math.cos(oe),Pe=Math.sin(oe);C=$,O=le,j=ee,k=se,z=ut,X=Qe,y=Je;const We=1/Ne;let ke=0;for(;ke<2;)ke+=1,c=C*z+O*j*X,u=-O*z+C*j*X,g=-C*X+O*j*z,x=O*k,m=O*X+C*j*z,p=C*k,l=Ye*g+ht*x,d=Ye*m+ht*p,h=-ht*g+Ye*x,f=-ht*m+Ye*p,v=c*Mt+l*Xe,b=u*Mt+d*Xe,L=-c*Xe+l*Mt,A=-u*Xe+d*Mt,w=h*Xe,I=f*Xe,E=h*Mt,S=f*Mt,_=12*v*v-3*L*L,Re=24*v*b-6*L*A,pe=12*b*b-3*A*A,Z=3*(c*c+l*l)+_*ft,J=6*(c*u+l*d)+Re*ft,Q=3*(u*u+d*d)+pe*ft,Ae=-6*c*h+ft*(-24*v*E-6*L*w),re=-6*(c*f+u*h)+ft*(-24*(b*E+v*S)+-6*(L*I+A*w)),de=-6*u*f+ft*(-24*b*S-6*A*I),Le=6*l*h+ft*(24*v*w-6*L*E),ie=6*(d*h+l*f)+ft*(24*(b*w+v*I)-6*(A*E+L*S)),me=6*d*f+ft*(24*b*I-6*A*S),Z=Z+Z+Pt*_,J=J+J+Pt*Re,Q=Q+Q+Pt*pe,fe=y*We,Ie=-.5*fe/Tn,xe=fe*Tn,he=-15*Ge*xe,D=v*L+b*A,M=b*L+v*A,B=b*A-v*L,ke===1&&(K=he,G=Ie,ne=fe,ce=xe,ue=D,Te=M,Ue=B,q=Z,Y=J,te=Q,ae=Ae,ve=re,De=de,Ee=Le,Ve=ie,P=me,Be=_,Me=Re,Ce=pe,C=we,O=Pe,j=T,k=N,z=V*ut+W*Qe,X=Qe*V-ut*W,y=H);const He=(4.7199672+(.2299715*An-U))%bt,et=(6.2565837+.017201977*An)%bt,pt=2*K*Te,at=2*K*Ue,Tt=2*G*ve,tt=2*G*(De-ae),Oe=-2*ne*Y,At=-2*ne*(te-q),nt=-2*ne*(-21-9*ft)*ze,Nt=2*ce*Me,qn=2*ce*(Ce-Be),Wt=-18*ce*ze,di=-2*G*Ve,vt=-2*G*(P-Ee),dn=2*he*M,as=2*he*B,Jt=2*Ie*re,Xr=2*Ie*(de-Ae),Zc=-2*fe*J,sa=-2*fe*(Q-Z),x0=-2*fe*(-21-9*ft)*Fe,v0=2*xe*Re,_0=2*xe*(pe-_),M0=-18*xe*Fe,y0=-2*Ie*ie,S0=-2*Ie*(me-Le);return{snodm:Qe,cnodm:ut,sinim:ht,cosim:Ye,sinomm:Xe,cosomm:Mt,day:An,e3:as,ee2:dn,em:Ge,emsq:ft,gam:U,peo:it,pgho:jn,pho:zi,pinco:Yn,plo:ui,rtemsq:Tn,se2:pt,se3:at,sgh2:Nt,sgh3:qn,sgh4:Wt,sh2:di,sh3:vt,si2:Tt,si3:tt,sl2:Oe,sl3:At,sl4:nt,s1:he,s2:Ie,s3:fe,s4:xe,s5:D,s6:M,s7:B,ss1:K,ss2:G,ss3:ne,ss4:ce,ss5:ue,ss6:Te,ss7:Ue,sz1:q,sz2:Y,sz3:te,sz11:ae,sz12:ve,sz13:De,sz21:Ee,sz22:Ve,sz23:P,sz31:Be,sz32:Me,sz33:Ce,xgh2:v0,xgh3:_0,xgh4:M0,xh2:y0,xh3:S0,xi2:Jt,xi3:Xr,xl2:Zc,xl3:sa,xl4:x0,nm:Ne,z1:Z,z2:J,z3:Q,z11:Ae,z12:re,z13:de,z21:Le,z22:ie,z23:me,z31:_,z32:Re,z33:pe,zmol:He,zmos:et}}function zM(n){const{cosim:e,argpo:t,s1:i,s2:s,s3:r,s4:o,s5:a,sinim:c,ss1:l,ss2:u,ss3:d,ss4:h,ss5:f,sz1:g,sz3:x,sz11:m,sz13:p,sz21:y,sz23:v,sz31:b,sz33:L,t:A,tc:w,gsto:I,mo:E,mdot:S,no:C,nodeo:O,nodedot:z,xpidot:X,z1:j,z3:k,z11:K,z13:G,z21:ne,z23:ce,z31:ue,z33:Te,ecco:Ue,eccsq:q}=n;let{emsq:Y,em:te,argpm:ae,inclm:ve,mm:De,nm:Ee,nodem:Ve,irez:P,atime:Be,d2201:Me,d2211:Ce,d3210:he,d3222:Ie,d4410:fe,d4422:xe,d5220:D,d5232:M,d5421:B,d5433:Z,dedt:J,didt:Q,dmdt:Ae,dnodt:re,domdt:de,del1:Le,del2:ie,del3:me,xfact:_,xlamo:Re,xli:pe,xni:ze}=n,Fe,Je,H,se,ee,$,le,Ne,Ge,Qe,ut,Xe,Mt,ht,Ye,ft,Pt,Tn,it,Yn,ui,jn,zi,An,gn,Et,un,T,N,W,V,U;const oe=17891679e-13,Se=21460748e-13,we=22123015e-14,Pe=17891679e-13,We=73636953e-16,ke=21765803e-16,He=.0043752690880113,et=37393792e-14,pt=11428639e-14,at=.00015835218,Tt=119459e-10;P=0,Ee<.0052359877&&Ee>.0034906585&&(P=1),Ee>=.00826&&Ee<=.00924&&te>=.5&&(P=2);const tt=l*Tt*f,Oe=u*Tt*(m+p),At=-Tt*d*(g+x-14-6*Y),nt=h*Tt*(b+L-6);let Nt=-Tt*u*(y+v);(ve<.052359877||ve>Ii-.052359877)&&(Nt=0),c!==0&&(Nt/=c);const qn=nt-e*Nt;J=tt+i*at*a,Q=Oe+s*at*(K+G),Ae=At-at*r*(j+k-14-6*Y);const Wt=o*at*(ue+Te-6);let di=-at*s*(ne+ce);(ve<.052359877||ve>Ii-.052359877)&&(di=0),de=qn+Wt,re=Nt,c!==0&&(de-=e/c*di,re+=di/c);const vt=0,dn=(I+w*He)%bt;if(te+=J*A,ve+=Q*A,ae+=de*A,Ve+=re*A,De+=Ae*A,P!==0){if(W=(Ee/Ai)**Io,P===2){V=e*e;const as=te;te=Ue;const Jt=Y;Y=q,U=te*Y,ht=-.306-(te-.64)*.44,te<=.65?(Ye=3.616-13.247*te+16.29*Y,Pt=-19.302+117.39*te-228.419*Y+156.591*U,Tn=-18.9068+109.7927*te-214.6334*Y+146.5816*U,it=-41.122+242.694*te-471.094*Y+313.953*U,Yn=-146.407+841.88*te-1629.014*Y+1083.435*U,ui=-532.114+3017.977*te-5740.032*Y+3708.276*U):(Ye=-72.099+331.819*te-508.738*Y+266.724*U,Pt=-346.844+1582.851*te-2415.925*Y+1246.113*U,Tn=-342.585+1554.908*te-2366.899*Y+1215.972*U,it=-1052.797+4758.686*te-7193.992*Y+3651.957*U,Yn=-3581.69+16178.11*te-24462.77*Y+12422.52*U,te>.715?ui=-5149.66+29936.92*te-54087.36*Y+31324.56*U:ui=1464.74-4664.75*te+3763.64*Y),te<.7?(An=-919.2277+4988.61*te-9064.77*Y+5542.21*U,jn=-822.71072+4568.6173*te-8491.4146*Y+5337.524*U,zi=-853.666+4690.25*te-8624.77*Y+5341.4*U):(An=-37995.78+161616.52*te-229838.2*Y+109377.94*U,jn=-51752.104+218913.95*te-309468.16*Y+146349.42*U,zi=-40023.88+170470.89*te-242699.48*Y+115605.82*U),gn=c*c,Fe=.75*(1+2*e+V),Je=1.5*gn,se=1.875*c*(1-2*e-3*V),ee=-1.875*c*(1+2*e-3*V),le=35*gn*Fe,Ne=39.375*gn*gn,Ge=9.84375*c*(gn*(1-2*e-5*V)+.33333333*(-2+4*e+6*V)),Qe=c*(4.92187512*gn*(-2-4*e+10*V)+6.56250012*(1+2*e-3*V)),ut=29.53125*c*(2-8*e+V*(-12+8*e+10*V)),Xe=29.53125*c*(-2-8*e+V*(12+8*e-10*V)),T=Ee*Ee,N=W*W,un=3*T*N,Et=un*Pe,Me=Et*Fe*ht,Ce=Et*Je*Ye,un*=W,Et=un*et,he=Et*se*Pt,Ie=Et*ee*Tn,un*=W,Et=2*un*We,fe=Et*le*it,xe=Et*Ne*Yn,un*=W,Et=un*pt,D=Et*Ge*ui,M=Et*Qe*zi,Et=2*un*ke,B=Et*ut*jn,Z=Et*Xe*An,Re=(E+O+O-(dn+dn))%bt,_=S+Ae+2*(z+re-He)-C,te=as,Y=Jt}P===1&&(Mt=1+Y*(-2.5+.8125*Y),Pt=1+2*Y,ft=1+Y*(-6+6.60937*Y),Fe=.75*(1+e)*(1+e),H=.9375*c*c*(1+3*e)-.75*(1+e),$=1+e,$=1.875*$*$*$,Le=3*Ee*Ee*W*W,ie=2*Le*Fe*Mt*oe,me=3*Le*$*ft*we*W,Le=Le*H*Pt*Se*W,Re=(E+O+t-dn)%bt,_=S+X+Ae+de+re-(C+He)),pe=Re,ze=C,Be=0,Ee=C+vt}return{em:te,argpm:ae,inclm:ve,mm:De,nm:Ee,nodem:Ve,irez:P,atime:Be,d2201:Me,d2211:Ce,d3210:he,d3222:Ie,d4410:fe,d4422:xe,d5220:D,d5232:M,d5421:B,d5433:Z,dedt:J,didt:Q,dmdt:Ae,dndt:vt,dnodt:re,domdt:de,del1:Le,del2:ie,del3:me,xfact:_,xlamo:Re,xli:pe,xni:ze}}function Mf(n){const e=(n-2451545)/36525;let t=-62e-7*e*e*e+.093104*e*e+(876600*3600+8640184812866e-6)*e+67310.54841;return t=t*co/240%bt,t<0&&(t+=bt),t}function FM(n,e,t,i,s,r,o){return n instanceof Date?Mf(bd(n)):Mf(n)}function BM(n){const{ecco:e,epoch:t,inclo:i,opsmode:s}=n;let{no:r}=n;const o=e*e,a=1-o,c=Math.sqrt(a),l=Math.cos(i),u=l*l,d=(Ai/r)**Io,h=.75*Es*(3*u-1)/(c*a);let f=h/(d*d);const g=d*(1-f*f-f*(1/3+134*f*f/81));f=h/(g*g),r/=1+f;const x=(Ai/r)**Io,m=Math.sin(i),p=x*a,y=1-5*u,v=-y-u-u,b=1/x,L=p*p,A=x*(1-e),w="n";let I;if(s==="a"){const E=t-7305,S=Math.floor(E+1e-8),C=E-S,O=.017202791694070362,z=1.7321343856509375,X=5075514194322695e-30,j=O+bt;I=(z+O*S+j*C+E*E*X)%bt,I<0&&(I+=bt)}else I=FM(t+24332815e-1);return{no:r,method:w,ainv:b,ao:x,con41:v,con42:y,cosio:l,cosio2:u,eccsq:o,omeosq:a,posq:L,rp:A,rteosq:c,sinio:m,gsto:I}}function kM(n){const{irez:e,d2201:t,d2211:i,d3210:s,d3222:r,d4410:o,d4422:a,d5220:c,d5232:l,d5421:u,d5433:d,dedt:h,del1:f,del2:g,del3:x,didt:m,dmdt:p,dnodt:y,domdt:v,argpo:b,argpdot:L,t:A,tc:w,gsto:I,xfact:E,xlamo:S,no:C}=n;let{atime:O,em:z,argpm:X,inclm:j,xli:k,mm:K,xni:G,nodem:ne,nm:ce}=n;const ue=.13130908,Te=2.8843198,Ue=.37448087,q=5.7686396,Y=.95240898,te=1.8014998,ae=1.050833,ve=4.4108898,De=.0043752690880113,Ee=720,Ve=-720,P=259200;let Be,Me,Ce,he,Ie,fe,xe,D,M=0,B=0;const Z=(I+w*De)%bt;if(z+=h*A,j+=m*A,X+=v*A,ne+=y*A,K+=p*A,e!==0){(O===0||A*O<=0||Math.abs(A)<Math.abs(O))&&(O=0,G=C,k=S),A>0?Be=Ee:Be=Ve;let J=381;for(;J===381;)e!==2?(xe=f*Math.sin(k-ue)+g*Math.sin(2*(k-Te))+x*Math.sin(3*(k-Ue)),Ie=G+E,fe=f*Math.cos(k-ue)+2*g*Math.cos(2*(k-Te))+3*x*Math.cos(3*(k-Ue)),fe*=Ie):(D=b+L*O,Ce=D+D,Me=k+k,xe=t*Math.sin(Ce+k-q)+i*Math.sin(k-q)+s*Math.sin(D+k-Y)+r*Math.sin(-D+k-Y)+o*Math.sin(Ce+Me-te)+a*Math.sin(Me-te)+c*Math.sin(D+k-ae)+l*Math.sin(-D+k-ae)+u*Math.sin(D+Me-ve)+d*Math.sin(-D+Me-ve),Ie=G+E,fe=t*Math.cos(Ce+k-q)+i*Math.cos(k-q)+s*Math.cos(D+k-Y)+r*Math.cos(-D+k-Y)+c*Math.cos(D+k-ae)+l*Math.cos(-D+k-ae)+2*(o*Math.cos(Ce+Me-te)+a*Math.cos(Me-te)+u*Math.cos(D+Me-ve)+d*Math.cos(-D+Me-ve)),fe*=Ie),Math.abs(A-O)>=Ee?J=381:(B=A-O,J=0),J===381&&(k+=Ie*Be+xe*P,G+=xe*Be+fe*P,O+=Be);ce=G+xe*B+fe*B*B*.5,he=k+Ie*B+xe*B*B*.5,e!==1?(K=he-2*ne+2*Z,M=ce-C):(K=he-ne-X+Z,M=ce-C),ce=C+M}return{atime:O,em:z,argpm:X,inclm:j,xli:k,mm:K,xni:G,nodem:ne,dndt:M,nm:ce}}var Si;(function(n){n[n.None=0]="None",n[n.MeanEccentricityOutOfRange=1]="MeanEccentricityOutOfRange",n[n.MeanMotionBelowZero=2]="MeanMotionBelowZero",n[n.PerturbedEccentricityOutOfRange=3]="PerturbedEccentricityOutOfRange",n[n.SemiLatusRectumBelowZero=4]="SemiLatusRectumBelowZero",n[n.Decayed=6]="Decayed"})(Si||(Si={}));function hm(n,e){let t,i,s,r,o,a,c,l,u,d,h,f,g,x,m,p,y,v,b,L,A,w,I,E,S,C,O;n.t=e,n.error=Si.None;const X=n.mo+n.mdot*n.t,j=n.argpo+n.argpdot*n.t,k=n.nodeo+n.nodedot*n.t;u=j,A=X;const K=n.t*n.t;if(I=k+n.nodecf*K,y=1-n.cc1*n.t,v=n.bstar*n.cc4*n.t,b=n.t2cof*K,n.isimp!==1){c=n.omgcof*n.t;const Ge=1+n.eta*Math.cos(X);a=n.xmcof*(Ge*Ge*Ge-n.delmo),p=c+a,A=X+p,u=j-p,f=K*n.t,g=f*n.t,y=y-n.d2*K-n.d3*f-n.d4*g,v+=n.bstar*n.cc5*(Math.sin(A)-n.sinmao),b=b+n.t3cof*f+g*(n.t4cof+n.t*n.t5cof)}n.tempa=y,w=n.no;let G=n.ecco;if(L=n.inclo,n.method==="d"){x=n.t;const Ge={irez:n.irez,d2201:n.d2201,d2211:n.d2211,d3210:n.d3210,d3222:n.d3222,d4410:n.d4410,d4422:n.d4422,d5220:n.d5220,d5232:n.d5232,d5421:n.d5421,d5433:n.d5433,dedt:n.dedt,del1:n.del1,del2:n.del2,del3:n.del3,didt:n.didt,dmdt:n.dmdt,dnodt:n.dnodt,domdt:n.domdt,argpo:n.argpo,argpdot:n.argpdot,t:n.t,tc:x,gsto:n.gsto,xfact:n.xfact,xlamo:n.xlamo,no:n.no,atime:n.atime,em:G,argpm:u,inclm:L,xli:n.xli,mm:A,xni:n.xni,nodem:I,nm:w};({em:G,argpm:u,inclm:L,mm:A,nodem:I,nm:w}=kM(Ge))}if(w<=0)return n.error=Si.MeanMotionBelowZero,null;const ne=(Ai/w)**Io*y*y;if(w=Ai/ne**1.5,G-=v,G>=1||G<-.001)return n.error=Si.MeanEccentricityOutOfRange,null;G<1e-6&&(G=1e-6),A+=n.no*b,S=A+u+I,I%=bt,u%=bt,S%=bt,A=(S-u-I)%bt;const ce={am:ne,em:G,im:L,Om:I,om:u,mm:A,nm:w},ue=Math.sin(L),Te=Math.cos(L);let Ue=G;if(E=L,d=u,O=I,C=A,r=ue,s=Te,n.method==="d"){const Ge={inclo:n.inclo,init:"n",ep:Ue,inclp:E,nodep:O,argpp:d,mp:C,opsmode:n.operationmode},Qe=dm(n,Ge);if({ep:Ue,nodep:O,argpp:d,mp:C}=Qe,E=Qe.inclp,E<0&&(E=-E,O+=Ii,d-=Ii),Ue<0||Ue>1)return n.error=Si.PerturbedEccentricityOutOfRange,null}n.method==="d"&&(r=Math.sin(E),s=Math.cos(E),n.aycof=-.5*Ts*r,Math.abs(s+1)>15e-13?n.xlcof=-.25*Ts*r*(3+5*s)/(1+s):n.xlcof=-.25*Ts*r*(3+5*s)/15e-13);const q=Ue*Math.cos(d);p=1/(ne*(1-Ue*Ue));const Y=Ue*Math.sin(d)+p*n.aycof,ae=(C+d+O+p*n.xlcof*q-O)%bt;l=ae,m=9999.9;let ve=1;for(;Math.abs(m)>=1e-12&&ve<=10;)i=Math.sin(l),t=Math.cos(l),m=1-t*q-i*Y,m=(ae-Y*t+q*i-l)/m,Math.abs(m)>=.95&&(m>0?m=.95:m=-.95),l+=m,ve+=1;const De=q*t+Y*i,Ee=q*i-Y*t,Ve=q*q+Y*Y,P=ne*(1-Ve);if(P<0)return n.error=Si.SemiLatusRectumBelowZero,null;const Be=ne*(1-De),Me=Math.sqrt(ne)*Ee/Be,Ce=Math.sqrt(P)/Be,he=Math.sqrt(1-Ve);p=Ee/(1+he);const Ie=ne/Be*(i-Y-q*p),fe=ne/Be*(t-q+Y*p);h=Math.atan2(Ie,fe);const xe=(fe+fe)*Ie,D=1-2*Ie*Ie;p=1/P;const M=.5*Es*p,B=M*p;n.method==="d"&&(o=s*s,n.con41=3*o-1,n.x1mth2=1-o,n.x7thm1=7*o-1);const Z=Be*(1-1.5*B*he*n.con41)+.5*M*n.x1mth2*D;if(Z<1)return n.error=Si.Decayed,null;h-=.25*B*n.x7thm1*xe;const J=O+1.5*B*s*xe,Q=E+1.5*B*s*r*D,Ae=Me-w*M*n.x1mth2*xe/Ai,re=Ce+w*M*(n.x1mth2*D+1.5*n.con41)/Ai,de=Math.sin(h),Le=Math.cos(h),ie=Math.sin(J),me=Math.cos(J),_=Math.sin(Q),Re=Math.cos(Q),pe=-ie*Re,ze=me*Re,Fe=pe*de+me*Le,Je=ze*de+ie*Le,H=_*de,se=pe*Le-me*de,ee=ze*Le-ie*de,$=_*Le,le={x:Z*Fe*yn,y:Z*Je*yn,z:Z*H*yn},Ne={x:(Ae*Fe+re*se)*Ll,y:(Ae*Je+re*ee)*Ll,z:(Ae*H+re*$)*Ll};return{position:le,velocity:Ne,meanElements:ce}}function GM(n,e){const{opsmode:t,epoch:i,xbstar:s,xecco:r,xargpo:o,xinclo:a,xmo:c,xno:l,xnodeo:u}=e;let d,h,f,g,x,m,p,y,v,b,L,A,w,I,E,S,C,O,z,X,j,k,K,G,ne,ce,ue,Te,Ue,q,Y,te,ae,ve,De,Ee,Ve,P,Be,Me,Ce,he,Ie,fe,xe,D,M,B,Z,J,Q,Ae,re,de,Le,ie;const me=15e-13,_=n;_.isimp=0,_.method="n",_.aycof=0,_.con41=0,_.cc1=0,_.cc4=0,_.cc5=0,_.d2=0,_.d3=0,_.d4=0,_.delmo=0,_.eta=0,_.argpdot=0,_.omgcof=0,_.sinmao=0,_.t=0,_.t2cof=0,_.t3cof=0,_.t4cof=0,_.t5cof=0,_.x1mth2=0,_.x7thm1=0,_.mdot=0,_.nodedot=0,_.xlcof=0,_.xmcof=0,_.nodecf=0,_.irez=0,_.d2201=0,_.d2211=0,_.d3210=0,_.d3222=0,_.d4410=0,_.d4422=0,_.d5220=0,_.d5232=0,_.d5421=0,_.d5433=0,_.dedt=0,_.del1=0,_.del2=0,_.del3=0,_.didt=0,_.dmdt=0,_.dnodt=0,_.domdt=0,_.e3=0,_.ee2=0,_.peo=0,_.pgho=0,_.pho=0,_.pinco=0,_.plo=0,_.se2=0,_.se3=0,_.sgh2=0,_.sgh3=0,_.sgh4=0,_.sh2=0,_.sh3=0,_.si2=0,_.si3=0,_.sl2=0,_.sl3=0,_.sl4=0,_.gsto=0,_.xfact=0,_.xgh2=0,_.xgh3=0,_.xgh4=0,_.xh2=0,_.xh3=0,_.xi2=0,_.xi3=0,_.xl2=0,_.xl3=0,_.xl4=0,_.xlamo=0,_.zmol=0,_.zmos=0,_.atime=0,_.xli=0,_.xni=0,_.bstar=s,_.ecco=r,_.argpo=o,_.inclo=a,_.mo=c,_.no=l,_.nokozai=l,_.nodeo=u,_.operationmode=t;const Re=78/yn+1,pe=42/yn,ze=pe*pe*pe*pe;_.init="y",_.t=0;const Fe={ecco:_.ecco,epoch:i,inclo:_.inclo,no:_.no,method:_.method,opsmode:_.operationmode},Je=BM(Fe),{ao:H,con42:se,cosio:ee,cosio2:$,eccsq:le,omeosq:Ne,posq:Ge,rp:Qe,rteosq:ut,sinio:Xe}=Je;if(_.no=Je.no,_.con41=Je.con41,_.gsto=Je.gsto,_.a=(_.no*IM)**(-2/3),_.alta=_.a*(1+_.ecco)-1,_.altp=_.a*(1-_.ecco)-1,_.error=0,Ne>=0||_.no>=0){if(_.isimp=0,Qe<220/yn+1&&(_.isimp=1),ue=Re,j=ze,O=(Qe-1)*yn,O<156){ue=O-78,O<98&&(ue=20);const ht=(120-ue)/yn;j=ht*ht*ht*ht,ue=ue/yn+1}z=1/Ge,D=1/(H-ue),_.eta=H*_.ecco*D,A=_.eta*_.eta,L=_.ecco*_.eta,X=Math.abs(1-A),m=j*D**4,p=m/X**3.5,g=p*_.no*(H*(1+1.5*A+L*(4+A))+.375*Es*D/X*_.con41*(8+3*A*(8+A))),_.cc1=_.bstar*g,x=0,_.ecco>1e-4&&(x=-2*m*D*Ts*_.no*Xe/_.ecco),_.x1mth2=1-$,_.cc4=2*_.no*p*H*Ne*(_.eta*(2+.5*A)+_.ecco*(.5+2*A)-Es*D/(H*X)*(-3*_.con41*(1-2*L+A*(1.5-.5*L))+.75*_.x1mth2*(2*A-L*(1+A))*Math.cos(2*_.argpo))),_.cc5=2*p*H*Ne*(1+2.75*(A+L)+L*A),y=$*$,Ie=1.5*Es*z*_.no,fe=.5*Ie*Es*z,xe=-.46875*UM*z*z*_.no,_.mdot=_.no+.5*Ie*ut*_.con41+.0625*fe*ut*(13-78*$+137*y),_.argpdot=-.5*Ie*se+.0625*fe*(7-114*$+395*y)+xe*(3-36*$+49*y),B=-Ie*ee,_.nodedot=B+(.5*fe*(4-19*$)+2*xe*(3-7*$))*ee,M=_.argpdot+_.nodedot,_.omgcof=_.bstar*x*Math.cos(_.argpo),_.xmcof=0,_.ecco>1e-4&&(_.xmcof=-Io*m*_.bstar/L),_.nodecf=3.5*Ne*B*_.cc1,_.t2cof=1.5*_.cc1,Math.abs(ee+1)>15e-13?_.xlcof=-.25*Ts*Xe*(3+5*ee)/(1+ee):_.xlcof=-.25*Ts*Xe*(3+5*ee)/me,_.aycof=-.5*Ts*Xe;const Mt=1+_.eta*Math.cos(_.mo);if(_.delmo=Mt*Mt*Mt,_.sinmao=Math.sin(_.mo),_.x7thm1=7*$-1,2*Ii/_.no>=225){_.method="d",_.isimp=1,Ce=0,E=_.inclo;const ht={epoch:i,ep:_.ecco,argpp:_.argpo,tc:Ce,inclp:_.inclo,nodep:_.nodeo,np:_.no,e3:_.e3,ee2:_.ee2,peo:_.peo,pgho:_.pgho,pho:_.pho,pinco:_.pinco,plo:_.plo,se2:_.se2,se3:_.se3,sgh2:_.sgh2,sgh3:_.sgh3,sgh4:_.sgh4,sh2:_.sh2,sh3:_.sh3,si2:_.si2,si3:_.si3,sl2:_.sl2,sl3:_.sl3,sl4:_.sl4,xgh2:_.xgh2,xgh3:_.xgh3,xgh4:_.xgh4,xh2:_.xh2,xh3:_.xh3,xi2:_.xi2,xi3:_.xi3,xl2:_.xl2,xl3:_.xl3,xl4:_.xl4,zmol:_.zmol,zmos:_.zmos},Ye=OM(ht);_.e3=Ye.e3,_.ee2=Ye.ee2,_.peo=Ye.peo,_.pgho=Ye.pgho,_.pho=Ye.pho,_.pinco=Ye.pinco,_.plo=Ye.plo,_.se2=Ye.se2,_.se3=Ye.se3,_.sgh2=Ye.sgh2,_.sgh3=Ye.sgh3,_.sgh4=Ye.sgh4,_.sh2=Ye.sh2,_.sh3=Ye.sh3,_.si2=Ye.si2,_.si3=Ye.si3,_.sl2=Ye.sl2,_.sl3=Ye.sl3,_.sl4=Ye.sl4,{sinim:h,cosim:d,em:v,emsq:b,s1:k,s2:K,s3:G,s4:ne,s5:ce,ss1:Te,ss2:Ue,ss3:q,ss4:Y,ss5:te,sz1:ae,sz3:ve,sz11:De,sz13:Ee,sz21:Ve,sz23:P,sz31:Be,sz33:Me}=Ye,_.xgh2=Ye.xgh2,_.xgh3=Ye.xgh3,_.xgh4=Ye.xgh4,_.xh2=Ye.xh2,_.xh3=Ye.xh3,_.xi2=Ye.xi2,_.xi3=Ye.xi3,_.xl2=Ye.xl2,_.xl3=Ye.xl3,_.xl4=Ye.xl4,_.zmol=Ye.zmol,_.zmos=Ye.zmos,{nm:C,z1:Z,z3:J,z11:Q,z13:Ae,z21:re,z23:de,z31:Le,z33:ie}=Ye;const ft={init:_.init,ep:_.ecco,inclp:_.inclo,nodep:_.nodeo,argpp:_.argpo,mp:_.mo,opsmode:_.operationmode},Pt=dm(_,ft);_.ecco=Pt.ep,_.inclo=Pt.inclp,_.nodeo=Pt.nodep,_.argpo=Pt.argpp,_.mo=Pt.mp,w=0,I=0,S=0;const Tn={cosim:d,emsq:b,argpo:_.argpo,s1:k,s2:K,s3:G,s4:ne,s5:ce,sinim:h,ss1:Te,ss2:Ue,ss3:q,ss4:Y,ss5:te,sz1:ae,sz3:ve,sz11:De,sz13:Ee,sz21:Ve,sz23:P,sz31:Be,sz33:Me,t:_.t,tc:Ce,gsto:_.gsto,mo:_.mo,mdot:_.mdot,no:_.no,nodeo:_.nodeo,nodedot:_.nodedot,xpidot:M,z1:Z,z3:J,z11:Q,z13:Ae,z21:re,z23:de,z31:Le,z33:ie,ecco:_.ecco,eccsq:le,em:v,argpm:w,inclm:E,mm:S,nm:C,nodem:I,irez:_.irez,atime:_.atime,d2201:_.d2201,d2211:_.d2211,d3210:_.d3210,d3222:_.d3222,d4410:_.d4410,d4422:_.d4422,d5220:_.d5220,d5232:_.d5232,d5421:_.d5421,d5433:_.d5433,dedt:_.dedt,didt:_.didt,dmdt:_.dmdt,dnodt:_.dnodt,domdt:_.domdt,del1:_.del1,del2:_.del2,del3:_.del3,xfact:_.xfact,xlamo:_.xlamo,xli:_.xli,xni:_.xni},it=zM(Tn);_.irez=it.irez,_.atime=it.atime,_.d2201=it.d2201,_.d2211=it.d2211,_.d3210=it.d3210,_.d3222=it.d3222,_.d4410=it.d4410,_.d4422=it.d4422,_.d5220=it.d5220,_.d5232=it.d5232,_.d5421=it.d5421,_.d5433=it.d5433,_.dedt=it.dedt,_.didt=it.didt,_.dmdt=it.dmdt,_.dnodt=it.dnodt,_.domdt=it.domdt,_.del1=it.del1,_.del2=it.del2,_.del3=it.del3,_.xfact=it.xfact,_.xlamo=it.xlamo,_.xli=it.xli,_.xni=it.xni}_.isimp!==1&&(f=_.cc1*_.cc1,_.d2=4*H*D*f,he=_.d2*D*_.cc1/3,_.d3=(17*H+ue)*he,_.d4=.5*he*H*D*(221*H+31*ue)*_.cc1,_.t3cof=_.d2+2*f,_.t4cof=.25*(3*_.d3+_.cc1*(12*_.d2+10*f)),_.t5cof=.2*(3*_.d4+12*_.cc1*_.d3+6*_.d2*_.d2+15*f*(2*_.d2+f)))}hm(_,0),_.init="n"}function WM(n,e){GM(n,{opsmode:e,satn:n.satnum,epoch:n.jdsatepoch-24332815e-1,xbstar:n.bstar,xecco:n.ecco,xargpo:n.argpo,xinclo:n.inclo,xmo:n.mo,xno:n.no,xnodeo:n.nodeo})}function VM(n,e){const t="i",s=n.substring(2,7),r=parseInt(n.substring(18,20),10),o=parseFloat(n.substring(20,32));let a=parseFloat(n.substring(33,43)),c=parseFloat(`${n.substring(44,45)}.${n.substring(45,50)}E${n.substring(50,52)}`);const l=parseFloat(`${n.substring(53,54)}.${n.substring(54,59)}E${n.substring(59,61)}`),u=parseFloat(e.substring(8,16))*co,d=parseFloat(e.substring(17,25))*co,h=parseFloat(`.${e.substring(26,33).replace(/\s/g,"0")}`),f=parseFloat(e.substring(34,42))*co,g=parseFloat(e.substring(43,51))*co,x=parseFloat(e.substring(52,63))/Il;a/=Il*1440,c/=Il*1440*1440;const m=r<57?r+2e3:r+1900,p=NM(m,o),{mon:y,day:v,hr:b,minute:L,sec:A}=p,w=bd(m,y,v,b,L,A),I={error:0,satnum:s,epochyr:r,epochdays:o,ndot:a,nddot:c,bstar:l,inclo:u,nodeo:d,ecco:h,argpo:f,mo:g,no:x,jdsatepoch:w};return WM(I,t),I}const XM=n=>n.tempa<=0;function YM(n,...e){const t=e.at(-1),i=typeof t=="object"&&!(t instanceof Date)?t:void 0,s=i?e.slice(0,-1):e,o=(bd(...s)-n.jdsatepoch)*RM,a=hm(n,o);return i?.communityDecayCheckEnabled&&a&&XM(n)?(n.error=Si.Decayed,null):a}const jM=69.184,qM=Date.UTC(2e3,0,1,12,0,0),KM=23.439281,ZM=1495978707e-1,JM=.0643;function QM(n){const e=VM(n.line1,n.line2);if(e.error!==0||!isFinite(e.no)||!isFinite(e.inclo)||!isFinite(e.ecco))throw new Error(`TLE parse failed for ${n.name} (error ${e.error})`);return{satrec:e,tle:n}}function $M(n){return qM+(n-jM/86400)*864e5}function ey(n,e=KM){const t=e*Math.PI/180,i=Math.cos(t),s=Math.sin(t),[r,o,a]=n;return[r,o*i-a*s,o*s+a*i]}function fm(n,e){const t=new Date($M(e)),i=YM(n.satrec,t);if(!i||!isFinite(i.position.x)||!isFinite(i.position.y)||!isFinite(i.position.z))return null;const s={position:[i.position.x,i.position.y,i.position.z],velocity:[i.velocity.x,i.velocity.y,i.velocity.z]};return{posAu:ey(s.position).map(o=>o/ZM),eci:s}}function ty(n){let e=n>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function ny(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function _n(n,e,t){const i=s=>Math.round(255*(n[s]+(e[s]-n[s])*t));return`rgb(${i(0)},${i(1)},${i(2)})`}function iy(n){const i=document.createElement("canvas");i.width=512,i.height=256;const s=i.getContext("2d"),r=ty(ny(n.id)),o=n.color,a=n.color2??n.color,c=n.texture??"rock";if(c==="sun"){const u=s.createLinearGradient(0,0,0,256);u.addColorStop(0,_n(o,a,.6)),u.addColorStop(.5,_n(o,a,.2)),u.addColorStop(1,_n(o,a,.6)),s.fillStyle=u,s.fillRect(0,0,512,256);for(let d=0;d<900;d++){const h=r()*512,f=r()*256,g=1+r()*5;s.fillStyle=r()>.5?`rgba(255,220,140,${.05+r()*.1})`:`rgba(255,140,40,${.05+r()*.08})`,s.beginPath(),s.arc(h,f,g,0,Math.PI*2),s.fill()}}else if(c==="gas"){const u=14+Math.floor(r()*8);for(let d=0;d<u;d++){const h=d/u*256,f=256/u,g=.5+.5*Math.sin(d/u*Math.PI*(2+r()*2));s.fillStyle=_n(o,a,g),s.fillRect(0,h,512,f+1)}for(let d=0;d<260;d++){const h=r()*512,f=r()*256,g=20+r()*90,x=2+r()*6;s.fillStyle=`rgba(255,255,255,${.02+r()*.05})`,s.fillRect(h,f,g,x)}if(r()>.4){const d=r()*512,h=256*(.3+r()*.4),f=26+r()*20,g=10+r()*8;s.fillStyle=_n(a,[1,.95,.9],.55),s.beginPath(),s.ellipse(d,h,f,g,0,0,Math.PI*2),s.fill()}}else if(c==="ice"){const u=s.createLinearGradient(0,0,0,256);u.addColorStop(0,_n(o,[1,1,1],.25)),u.addColorStop(.5,_n(o,a,.3)),u.addColorStop(1,_n(o,[1,1,1],.25)),s.fillStyle=u,s.fillRect(0,0,512,256);for(let d=0;d<40;d++){const h=r()*256;s.fillStyle=`rgba(255,255,255,${.03+r()*.05})`,s.fillRect(0,h,512,1+r()*3)}}else if(c==="earth"){s.fillStyle=_n(o,[0,.1,.35],.3),s.fillRect(0,0,512,256);const u=_n(n.color2??o,[.3,.5,.25],.5);for(let d=0;d<26;d++){const h=r()*512,f=256*(.15+r()*.7);s.fillStyle=r()>.25?u:_n(o,[.4,.35,.25],.5);const g=6+Math.floor(r()*8);for(let x=0;x<g;x++){const m=h+(r()-.5)*90,p=f+(r()-.5)*44;s.beginPath(),s.arc(m,p,6+r()*18,0,Math.PI*2),s.fill()}}s.fillStyle="rgba(245,248,252,0.9)",s.fillRect(0,0,512,14),s.fillRect(0,242,512,14);for(let d=0;d<120;d++){const h=r()*512,f=r()*256;s.fillStyle=`rgba(255,255,255,${.06+r()*.12})`,s.beginPath(),s.ellipse(h,f,8+r()*26,2+r()*5,0,0,Math.PI*2),s.fill()}}else if(c==="volcanic"){s.fillStyle=_n(o,a,.4),s.fillRect(0,0,512,256);for(let u=0;u<300;u++){const d=r()*512,h=r()*256,f=1+r()*4;s.fillStyle=r()>.7?`rgba(255,90,20,${.25+r()*.4})`:`rgba(60,40,30,${.1+r()*.2})`,s.beginPath(),s.arc(d,h,f,0,Math.PI*2),s.fill()}}else{s.fillStyle=_n(o,a,.3),s.fillRect(0,0,512,256);for(let u=0;u<700;u++){const d=r()*512,h=r()*256,f=.5+r()*3,g=r()>.5?"255,255,255":"0,0,0";s.fillStyle=`rgba(${g},${.03+r()*.08})`,s.beginPath(),s.arc(d,h,f,0,Math.PI*2),s.fill()}for(let u=0;u<90;u++){const d=r()*512,h=r()*256,f=2+r()*9;s.fillStyle=`rgba(0,0,0,${.12+r()*.12})`,s.beginPath(),s.arc(d,h,f,0,Math.PI*2),s.fill(),s.strokeStyle=`rgba(255,255,255,${.08+r()*.1})`,s.lineWidth=1,s.beginPath(),s.arc(d,h,f,-.4*Math.PI,.6*Math.PI),s.stroke()}}const l=new Br(i);return l.colorSpace=Dt,l.wrapS=Er,l}const sy={A:690,B:665,C:725,D:725,E:620,F:580,G:770,H:755,I:350,J:430,K:720,L:565,M:945,N:760,O:775,P:635,Q:775,R:695,S:610,T:630,U:730,V:680,W:1020,X:680,Y:670,Z:600},Pn=512,pm=128,ry=60,oy=464,mm=.24;function Oc(n){const e=n.toUpperCase(),t=e.split("").map(u=>sy[u]??600),i=t.reduce((u,d)=>u+d,0)/1e3,s=mm,r=Math.min(ry,oy/(i+s*(e.length-1))),o=t.map(u=>u/1e3*r),a=r*s,c=o.reduce((u,d)=>u+d,0)+a*(e.length-1),l=Pn/2-c/2;return{fontSize:r,inkStartX:l,inkWidthPx:c,charWidths:o}}function ay(n,e,t="base"){n.textAlign="center",n.textBaseline="middle";const i=e.toUpperCase(),{fontSize:s,inkStartX:r,inkWidthPx:o,charWidths:a}=Oc(e),c=s*mm;n.font=`${s}px Georgia, "Times New Roman", serif`;const l=()=>{let h=r;for(let f=0;f<i.length;f++)n.fillText(i[f],h+a[f]/2,50),h+=a[f]+c},u=t==="green"?{glow:"rgba(124, 252, 90, 0.9)",halo:"rgba(150, 255, 120, 0.85)",core:"#eaffe8",flourish:"rgba(124, 252, 90, 0.5)",diamond:"rgba(190, 255, 160, 0.85)"}:{glow:"rgba(143, 176, 255, 0.9)",halo:"rgba(190, 210, 250, 0.9)",core:"#eef4ff",flourish:"rgba(160, 185, 235, 0.5)",diamond:"rgba(205, 224, 255, 0.85)"};n.shadowColor=u.glow,n.shadowBlur=14,n.fillStyle=u.halo,l(),l(),n.shadowBlur=0,n.fillStyle=u.core,l();const d=90;n.strokeStyle=u.flourish,n.lineWidth=2,n.beginPath(),n.moveTo(r-16,d),n.lineTo(Pn/2-10,d),n.moveTo(Pn/2+10,d),n.lineTo(r+o+16,d),n.stroke(),n.fillStyle=u.diamond,n.beginPath(),n.moveTo(Pn/2,d-5),n.lineTo(Pn/2+5,d),n.lineTo(Pn/2,d+5),n.lineTo(Pn/2-5,d),n.closePath(),n.fill()}function cy(n){const e=document.createElement("canvas");e.width=256,e.height=64;const t=e.getContext("2d");t.font="600 30px system-ui, sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillStyle="rgba(10,14,24,0.45)";const i=t.measureText(n).width;t.fillRect(128-i/2-10,12,i+20,40),t.fillStyle="#dbe6f5",t.fillText(n,128,33);const s=new Br(e);return s.colorSpace=Dt,s}const ly=[{id:"asteroid-belt",name:"Main asteroid belt",count:1100,seed:24301,a:[2.1,3.3],e:[0,.25],i:[0,12],baseSize:.027,sizeJitter:.5,color:11575945,farPointSize:.75},{id:"kuiper-belt",name:"Kuiper belt",count:1400,seed:6923,a:[30,48],e:[0,.3],i:[0,8],baseSize:.05,sizeJitter:.6,color:12374766,farPointSize:.7}];function uy(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function dy(n){const e=uy(n.seed),t=(s,r)=>s+e()*(r-s),i=[];for(let s=0;s<n.count;s++){const r=t(n.a[0],n.a[1]),o=t(n.e[0],n.e[1]),a=t(n.i[0],n.i[1]),c=365.25*Math.pow(r,1.5);i.push({elements:{a:r,e:o,i:a,node:t(0,360),peri:t(0,360),M0:t(0,360),n:360/c},size:n.baseSize*(1-n.sizeJitter+2*n.sizeJitter*e()),spin:[e()*Math.PI*2,e()*Math.PI*2,e()*Math.PI*2],shade:e()})}return i}const hy=120,fy=40;function py(n,e){const t=n-(e+hy),i=my(t/fy),s=1-i*i*(3-2*i);return{mode:s>=.5?"near":"far",blend:s}}function my(n){return n<0?0:n>1?1:n}const gy=new xd(1,0),xy=new ot,vy=new R,_y=new es,My=new R,yy=new Vn,Sy={x:0,y:0,z:0};function by(n){const e=dy(n),t=e.length,i=new Ro({color:n.color,emissive:new je(n.color).multiplyScalar(.05),roughness:.85,metalness:0,transparent:!0}),s=new z_(gy,i,t);s.name=n.name,s.castShadow=!1,s.receiveShadow=!1,s.frustumCulled=!1;const r=new je(n.color),o=new je;for(let h=0;h<t;h++){const f=.65+.5*e[h].shade;o.copy(r).multiplyScalar(f),s.setColorAt(h,o)}s.instanceColor&&(s.instanceColor.needsUpdate=!0);const a=new yt,c=new Float32Array(t*3),l=new Float32Array(t*3);for(let h=0;h<t;h++){const f=.65+.5*e[h].shade;o.copy(r).multiplyScalar(f),l[h*3]=o.r,l[h*3+1]=o.g,l[h*3+2]=o.b}a.setAttribute("position",new Kt(c,3).setUsage(lg)),a.setAttribute("color",new Kt(l,3));const u=new xc({size:n.farPointSize??1.5,sizeAttenuation:!0,vertexColors:!0,transparent:!0,opacity:0,depthWrite:!1,blending:ai}),d=new Co(a,u);return d.name=n.name+" (far)",d.frustumCulled=!1,d.visible=!1,{def:n,mesh:s,points:d,objects:e,dispose:()=>{i.dispose(),u.dispose(),a.dispose()}}}function Ey(n,e,t,i=1){const{objects:s,mesh:r}=n,o=xy,a=vy,c=_y,l=My,u=yy,d=Sy,h=n.points.geometry.getAttribute("position"),f=h.array;for(let g=0;g<s.length;g++){const x=s[g];_c(x.elements,e,d),a.set(-d.x,d.z,-d.y);const m=Math.hypot(d.x,d.y,d.z),p=t.planetDistance(m)/Math.max(1e-9,m);a.multiplyScalar(p),u.set(x.spin[0]+e*.05,x.spin[1],x.spin[2]),c.setFromEuler(u),l.setScalar(Math.max(1e-6,x.size*i)),o.compose(a,c,l),r.setMatrixAt(g,o),f[g*3]=a.x,f[g*3+1]=a.y,f[g*3+2]=a.z}r.instanceMatrix.needsUpdate=!0,h.needsUpdate=!0}function gm(n,e,t,i){let s=py(e,t);i<.25&&(s={mode:"far",blend:0});const{mesh:r,points:o}=n,a=r.material,c=o.material;return r.visible=s.blend>.02,o.visible=s.blend<.98,a.opacity=s.blend,c.opacity=(1-s.blend)*.45,s.mode}const Ty=[{constellation:"Andromeda",centerRAHours:1.0395,centerDecDeg:38.3081,sizeW:33.58,sizeH:33.58,rotationDeg:104.8},{constellation:"Antlia",centerRAHours:10.2756,centerDecDeg:-28.7018,sizeW:18.52,sizeH:18.52,rotationDeg:-7.06},{constellation:"Apus",centerRAHours:15.2834,centerDecDeg:-81.9025,sizeW:14.06,sizeH:14.06,rotationDeg:-8.04},{constellation:"Aquarius",centerRAHours:22.2682,centerDecDeg:-12.0784,sizeW:39.52,sizeH:39.52,rotationDeg:36.19},{constellation:"Aquila",centerRAHours:19.3715,centerDecDeg:4.6274,sizeW:33.34,sizeH:33.34,rotationDeg:8.17},{constellation:"Ara",centerRAHours:17.4865,centerDecDeg:-54.3975,sizeW:14.37,sizeH:14.37,rotationDeg:123.01},{constellation:"Aries",centerRAHours:2.4582,centerDecDeg:21.6925,sizeW:15.47,sizeH:15.47,rotationDeg:53.16},{constellation:"Auriga",centerRAHours:5.6464,centerDecDeg:37.7631,sizeW:27.38,sizeH:27.38,rotationDeg:-50.09},{constellation:"Boötes",centerRAHours:14.0786,centerDecDeg:30.7778,sizeW:41.45,sizeH:41.45,rotationDeg:-59.35},{constellation:"Caelum",centerRAHours:4.8036,centerDecDeg:-38.5623,sizeW:8.61,sizeH:8.61,rotationDeg:-64.4},{constellation:"Camelopardalis",centerRAHours:4.8352,centerDecDeg:66.1305,sizeW:27.7,sizeH:27.7,rotationDeg:31.64},{constellation:"Cancer",centerRAHours:8.514,centerDecDeg:18.7572,sizeW:23.95,sizeH:23.95,rotationDeg:-36.21},{constellation:"Canes Venatici",centerRAHours:12.374,centerDecDeg:37.7938,sizeW:13.4,sizeH:13.4,rotationDeg:-1.44},{constellation:"Canis Major",centerRAHours:6.7685,centerDecDeg:-22.5863,sizeW:21.77,sizeH:21.77,rotationDeg:-22.51},{constellation:"Canis Minor",centerRAHours:7.511,centerDecDeg:6.5471,sizeW:8.05,sizeH:8.05,rotationDeg:-15.14},{constellation:"Capricornus",centerRAHours:20.9965,centerDecDeg:-16.7297,sizeW:19.54,sizeH:19.54,rotationDeg:38.18},{constellation:"Carina",centerRAHours:8.5278,centerDecDeg:-49.9536,sizeW:56.59,sizeH:56.59,rotationDeg:5.3},{constellation:"Cassiopeia",centerRAHours:1.012,centerDecDeg:61.2874,sizeW:14.38,sizeH:14.38,rotationDeg:-174.71},{constellation:"Centaurus",centerRAHours:13.4657,centerDecDeg:-48.339,sizeW:43.27,sizeH:43.27,rotationDeg:19.52},{constellation:"Cepheus",centerRAHours:21.8497,centerDecDeg:62.7364,sizeW:27.44,sizeH:27.44,rotationDeg:110.54},{constellation:"Cetus",centerRAHours:1.9036,centerDecDeg:-4.0029,sizeW:46.26,sizeH:46.26,rotationDeg:-30.44},{constellation:"Chamaeleon",centerRAHours:9.806,centerDecDeg:-80.5706,sizeW:12.92,sizeH:12.92,rotationDeg:38.7},{constellation:"Circinus",centerRAHours:15.068,centerDecDeg:-62.052,sizeW:6.08,sizeH:6.08,rotationDeg:-80},{constellation:"Columba",centerRAHours:6.0208,centerDecDeg:-36.9013,sizeW:12.03,sizeH:12.03,rotationDeg:-59.17},{constellation:"Coma Berenices",centerRAHours:12.7221,centerDecDeg:21.8852,sizeW:13.67,sizeH:13.67,rotationDeg:-5.4},{constellation:"Corona Australis",centerRAHours:18.9382,centerDecDeg:-38.9407,sizeW:5.73,sizeH:5.73,rotationDeg:49.76},{constellation:"Corona Borealis",centerRAHours:15.7454,centerDecDeg:28.8407,sizeW:7.46,sizeH:7.46,rotationDeg:35.96},{constellation:"Corvus",centerRAHours:12.3689,centerDecDeg:-19.8,sizeW:10.05,sizeH:10.05,rotationDeg:12.08},{constellation:"Crater",centerRAHours:11.4061,centerDecDeg:-16.6513,sizeW:15.03,sizeH:15.03,rotationDeg:-59.19},{constellation:"Crux",centerRAHours:12.4909,centerDecDeg:-59.4203,sizeW:6.16,sizeH:6.16,rotationDeg:-51},{constellation:"Cygnus",centerRAHours:20.5417,centerDecDeg:40.7423,sizeW:33.49,sizeH:33.49,rotationDeg:-3.98},{constellation:"Delphinus",centerRAHours:20.6889,centerDecDeg:14.1666,sizeW:5.38,sizeH:5.38,rotationDeg:11.94},{constellation:"Dorado",centerRAHours:4.9914,centerDecDeg:-59.9197,sizeW:17.18,sizeH:17.18,rotationDeg:2.95},{constellation:"Draco",centerRAHours:16.4625,centerDecDeg:68.1989,sizeW:53.91,sizeH:53.91,rotationDeg:157.16},{constellation:"Equuleus",centerRAHours:21.2857,centerDecDeg:7.0768,sizeW:6.82,sizeH:6.82,rotationDeg:140.86},{constellation:"Eridanus",centerRAHours:3.6997,centerDecDeg:-29.3322,sizeW:62.38,sizeH:62.38,rotationDeg:15.76},{constellation:"Fornax",centerRAHours:2.9332,centerDecDeg:-27.6337,sizeW:10.35,sizeH:10.35,rotationDeg:32.8},{constellation:"Gemini",centerRAHours:6.8661,centerDecDeg:23.0133,sizeW:23.64,sizeH:23.64,rotationDeg:-16.6},{constellation:"Grus",centerRAHours:22.4926,centerDecDeg:-45.9337,sizeW:21.03,sizeH:21.03,rotationDeg:-3.05},{constellation:"Hercules",centerRAHours:16.9534,centerDecDeg:32.6047,sizeW:34.25,sizeH:34.25,rotationDeg:-154.02},{constellation:"Horologium",centerRAHours:3.3301,centerDecDeg:-52.1545,sizeW:21.4,sizeH:21.4,rotationDeg:82.8},{constellation:"Hydra",centerRAHours:10.7434,centerDecDeg:-13.0387,sizeW:69,sizeH:69,rotationDeg:25.08},{constellation:"Hydrus",centerRAHours:1.7871,centerDecDeg:-70.8057,sizeW:18.13,sizeH:18.13,rotationDeg:116.07},{constellation:"Indus",centerRAHours:20.9868,centerDecDeg:-51.0624,sizeW:19.37,sizeH:19.37,rotationDeg:158.9},{constellation:"Lacerta",centerRAHours:22.4731,centerDecDeg:43.7246,sizeW:14.83,sizeH:14.83,rotationDeg:-52.15},{constellation:"Leo",centerRAHours:10.6939,centerDecDeg:15.7158,sizeW:34.87,sizeH:34.87,rotationDeg:41.32},{constellation:"Leo Minor",centerRAHours:10.0684,centerDecDeg:33.1938,sizeW:15.92,sizeH:15.92,rotationDeg:-30.85},{constellation:"Lepus",centerRAHours:5.5834,centerDecDeg:-18.7299,sizeW:15.47,sizeH:15.47,rotationDeg:-17.59},{constellation:"Libra",centerRAHours:15.4844,centerDecDeg:-18.4806,sizeW:20.85,sizeH:20.85,rotationDeg:56.73},{constellation:"Lupus",centerRAHours:15.2093,centerDecDeg:-44.014,sizeW:24.43,sizeH:24.43,rotationDeg:-95.96},{constellation:"Lynx",centerRAHours:7.8559,centerDecDeg:43.9368,sizeW:41.1,sizeH:41.1,rotationDeg:-19.6},{constellation:"Lyra",centerRAHours:18.837,centerDecDeg:34.8687,sizeW:12.31,sizeH:12.31,rotationDeg:17.08},{constellation:"Mensa",centerRAHours:5.3062,centerDecDeg:-72.4754,sizeW:10.83,sizeH:10.83,rotationDeg:85.44},{constellation:"Microscopium",centerRAHours:20.8316,centerDecDeg:-33.2382,sizeW:2.54,sizeH:2.54,rotationDeg:60.01},{constellation:"Monoceros",centerRAHours:7.186,centerDecDeg:-.671,sizeW:30.36,sizeH:30.36,rotationDeg:.47},{constellation:"Musca",centerRAHours:12.3534,centerDecDeg:-69.5563,sizeW:8.77,sizeH:8.77,rotationDeg:-118.48},{constellation:"Norma",centerRAHours:16.293,centerDecDeg:-52.2943,sizeW:8.41,sizeH:8.41,rotationDeg:112.64},{constellation:"Octans",centerRAHours:21.5805,centerDecDeg:-81.1772,sizeW:9.36,sizeH:9.36,rotationDeg:-168.38},{constellation:"Ophiuchus",centerRAHours:17.1828,centerDecDeg:-4.6091,sizeW:56.3,sizeH:56.3,rotationDeg:3.97},{constellation:"Orion",centerRAHours:5.6152,centerDecDeg:3.5699,sizeW:29.12,sizeH:29.12,rotationDeg:27.5},{constellation:"Pavo",centerRAHours:19.4327,centerDecDeg:-65.8902,sizeW:26.78,sizeH:26.78,rotationDeg:.78},{constellation:"Pegasus",centerRAHours:23.0709,centerDecDeg:21.6673,sizeW:48.7,sizeH:48.7,rotationDeg:138.12},{constellation:"Perseus",centerRAHours:3.5718,centerDecDeg:44.6834,sizeW:29.4,sizeH:29.4,rotationDeg:-8.39},{constellation:"Phoenix",centerRAHours:.9855,centerDecDeg:-47.5277,sizeW:16.91,sizeH:16.91,rotationDeg:54.9},{constellation:"Pictor",centerRAHours:6.1132,centerDecDeg:-57.6748,sizeW:13.08,sizeH:13.08,rotationDeg:-2.22},{constellation:"Pisces",centerRAHours:.6197,centerDecDeg:9.4168,sizeW:44.47,sizeH:44.47,rotationDeg:40.9},{constellation:"Piscis Austrinus",centerRAHours:22.3306,centerDecDeg:-32.5012,sizeW:14.14,sizeH:14.14,rotationDeg:-124.26},{constellation:"Puppis",centerRAHours:7.608,centerDecDeg:-36.52,sizeW:43.46,sizeH:21.14,rotationDeg:67.2},{constellation:"Pyxis",centerRAHours:8.7629,centerDecDeg:-31.3781,sizeW:7.45,sizeH:7.45,rotationDeg:-67.04},{constellation:"Reticulum",centerRAHours:4.057,centerDecDeg:-62.2078,sizeW:6.14,sizeH:6.14,rotationDeg:104.71},{constellation:"Sagitta",centerRAHours:19.8636,centerDecDeg:18.8067,sizeW:4.97,sizeH:4.97,rotationDeg:-115.1},{constellation:"Sagittarius",centerRAHours:18.9367,centerDecDeg:-29.5732,sizeW:30.49,sizeH:30.49,rotationDeg:23.71},{constellation:"Scorpius",centerRAHours:16.7957,centerDecDeg:-32.1996,sizeW:26.41,sizeH:26.41,rotationDeg:-.89},{constellation:"Sculptor",centerRAHours:.2885,centerDecDeg:-31.0322,sizeW:23.27,sizeH:23.27,rotationDeg:41.08},{constellation:"Scutum",centerRAHours:18.6347,centerDecDeg:-9.8787,sizeW:11.56,sizeH:11.56,rotationDeg:34.15},{constellation:"Sextans",centerRAHours:10.2407,centerDecDeg:-2.1621,sizeW:15.91,sizeH:15.91,rotationDeg:20.26},{constellation:"Taurus",centerRAHours:4.3438,centerDecDeg:18.0278,sizeW:34.74,sizeH:34.74,rotationDeg:-19.7},{constellation:"Telescopium",centerRAHours:18.39,centerDecDeg:-46.7658,sizeW:4.91,sizeH:4.91,rotationDeg:12.21},{constellation:"Triangulum",centerRAHours:2.0458,centerDecDeg:31.5524,sizeW:7.92,sizeH:7.92,rotationDeg:32.51},{constellation:"Triangulum Australe",centerRAHours:16.142,centerDecDeg:-68.6055,sizeW:9.97,sizeH:9.97,rotationDeg:58.74},{constellation:"Tucana",centerRAHours:23.3453,centerDecDeg:-62.819,sizeW:23.69,sizeH:23.69,rotationDeg:-16.67},{constellation:"Ursa Major",centerRAHours:11.4059,centerDecDeg:54.6756,sizeW:55.12,sizeH:55.12,rotationDeg:-34.58},{constellation:"Ursa Minor",centerRAHours:14.914,centerDecDeg:78.7873,sizeW:18.67,sizeH:18.67,rotationDeg:49.09},{constellation:"Vela",centerRAHours:9.494,centerDecDeg:-49.58,sizeW:32.58,sizeH:19.03,rotationDeg:-171.6},{constellation:"Virgo",centerRAHours:13.2926,centerDecDeg:1.7026,sizeW:40.52,sizeH:40.52,rotationDeg:34.44},{constellation:"Volans",centerRAHours:7.9189,centerDecDeg:-71.7208,sizeW:11.99,sizeH:11.99,rotationDeg:-9.09},{constellation:"Vulpecula",centerRAHours:19.7674,centerDecDeg:25.1729,sizeW:14.78,sizeH:14.78,rotationDeg:31.89}];function Ay(n){const e=n.centerRAHours*15*Math.PI/180,t=n.centerDecDeg*Math.PI/180,i=Math.cos(t),s=[-i*Math.cos(e),Math.sin(t),-i*Math.sin(e)];let r=[-s[1]*s[0],1-s[1]*s[1],-s[1]*s[2]];r[0]*r[0]+r[1]*r[1]+r[2]*r[2]<1e-6&&(r=[1,0,0]);const o=Dy(r);return{position:s,upHint:o,planeSize:[n.sizeW*Math.PI/180,n.sizeH*Math.PI/180],rotationRad:n.rotationDeg*Math.PI/180}}function Dy(n){const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]}const vs={mapSize:2048,near:.05,far:140,bias:-4e-4,normalBias:.02};function wy(n,e=vs.far){n.castShadow=!0;const t=n.shadow;t.mapSize.set(vs.mapSize,vs.mapSize),t.camera.near=vs.near,t.camera.far=e,t.bias=vs.bias,t.normalBias=vs.normalBias}function Py(n,e){n.castShadow=!e,n.receiveShadow=!e}const Hl=1.35,vi=[[.387098,5],[.723321,9.724486],[1,15.051293],[1.523712,23.211311],[2.7675,28.814579],[5.20248,43.956733],[9.541499,66.964136],[19.187979,84.022651],[30.069528,102.130054],[39.482117,126.602786],[43.11,128.602786],[45.43,130.602786],[67.864,132.602786]];function xm(n){if(n<=vi[0][0])return vi[0][1];for(let r=1;r<vi.length;r++){const[o,a]=vi[r];if(n<=o){const[c,l]=vi[r-1];return l+(n-c)/(o-c)*(a-l)}}const[e,t]=vi[vi.length-2],[i,s]=vi[vi.length-1];return s+(n-i)/(i-e)*(s-t)}function vm(n){return .8+.45*Math.log10(n/100+1)}function _m(n){return .15+.3*Math.log10(n/100+1)}function Cy(n){return Math.max(.08,.08+.09*Math.log10(n/100+1))}function Mm(n){return .9+1.7*Math.sqrt(n/4e5)}const Ry={moon:{floor:2.208715,cap:3.111655},iss:{floor:1.95,cap:2.05},phobos:{floor:1.978417,cap:2.79312},deimos:{floor:2.294943,cap:2.794943},amalthea:{floor:2.584476,cap:11.023209},io:{floor:3.034156,cap:10.93183},europa:{floor:3.569515,cap:10.937531},ganymede:{floor:4.118656,cap:10.918046},callisto:{floor:4.683945,cap:10.921384},himalia:{floor:5.143966,cap:11.023314},enceladus:{floor:5.170574,cap:8.103596},tethys:{floor:5.601783,cap:8.080787},dione:{floor:6.057633,cap:8.078954},rhea:{floor:6.525752,cap:8.068518},titan:{floor:7.048484,cap:8.024341},iapetus:{floor:7.569867,cap:8.069867},miranda:{floor:4.292651,cap:6.671852},ariel:{floor:4.72486,cap:6.644337},umbriel:{floor:5.184918,cap:6.644004},titania:{floor:5.655488,cap:6.633825},oberon:{floor:6.135031,cap:6.635031},triton:{floor:2.461502,cap:9.679395},nereid:{floor:8.720057,cap:9.745187}};function Ly(n,e){const t=Ry[n];if(!t)return null;let i=Mm(e);return i<t.floor&&(i=t.floor),t.cap!==void 0&&i>t.cap&&(i=t.cap),i}function Iy(n,e=!1){const t=e?_m(n):vm(n);return Math.max(3,t*6)}const ym={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class rs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Hy=new jp(-1,1,1,-1,0,1);class Uy extends yt{constructor(){super(),this.setAttribute("position",new xt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new xt([0,2,0,0,2,0],2))}}const Ny=new Uy;class Zo{constructor(e){this._mesh=new wt(Ny,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Hy)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Oy extends rs{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof _t?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Gn.clone(e.uniforms),this.material=new _t({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Zo(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class yf extends rs{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class zy extends rs{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Fy{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new be);this._width=i.width,this._height=i.height,t=new cn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:bn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Oy(ym),this.copyPass.material.blending=si,this.clock=new K_}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){const a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}yf!==void 0&&(o instanceof yf?i=!0:o instanceof zy&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new be);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class By extends rs{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new je}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}}const ky={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new je(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class wr extends rs{constructor(e,t,i,s){super(),this.strength=t!==void 0?t:1,this.radius=i,this.threshold=s,this.resolution=e!==void 0?new be(e.x,e.y):new be(256,256),this.clearColor=new je(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new cn(r,o,{type:bn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const h=new cn(r,o,{type:bn});h.texture.name="UnrealBloomPass.h"+d,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const f=new cn(r,o,{type:bn});f.texture.name="UnrealBloomPass.v"+d,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=ky;this.highPassUniforms=Gn.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new _t({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new be(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=ym;this.copyUniforms=Gn.clone(u.uniforms),this.blendMaterial=new _t({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:ai,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new je,this.oldClearAlpha=1,this.basic=new zr,this.fsQuad=new Zo(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new be(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(e,t,i,s,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=wr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=wr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this.fsQuad.render(e),a=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){const t=[];for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new _t({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new be(.5,.5)},direction:{value:new be(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}}wr.BlurDirectionX=new be(1,0);wr.BlurDirectionY=new be(0,1);const Gy={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Wy extends rs{constructor(){super();const e=Gy;this.uniforms=Gn.clone(e.uniforms),this.material=new B_({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Zo(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},rt.getTransfer(this._outputColorSpace)===mt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===_p?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Mp?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===yp?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===id?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Sp?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===bp&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Ba={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new be(1/1024,1/512)}},vertexShader:`

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

		}`},Ul={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new be(1/1024,1/512)}},vertexShader:`

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

		}`};class Vy extends rs{constructor(e,t){super(),this.edgesRT=new cn(e,t,{depthBuffer:!1,type:bn}),this.edgesRT.texture.name="SMAAPass.edges",this.weightsRT=new cn(e,t,{depthBuffer:!1,type:bn}),this.weightsRT.texture.name="SMAAPass.weights";const i=this,s=new Image;s.src=this.getAreaTexture(),s.onload=function(){i.areaTexture.needsUpdate=!0},this.areaTexture=new It,this.areaTexture.name="SMAAPass.area",this.areaTexture.image=s,this.areaTexture.minFilter=Rn,this.areaTexture.generateMipmaps=!1,this.areaTexture.flipY=!1;const r=new Image;r.src=this.getSearchTexture(),r.onload=function(){i.searchTexture.needsUpdate=!0},this.searchTexture=new It,this.searchTexture.name="SMAAPass.search",this.searchTexture.image=r,this.searchTexture.magFilter=kt,this.searchTexture.minFilter=kt,this.searchTexture.generateMipmaps=!1,this.searchTexture.flipY=!1,this.uniformsEdges=Gn.clone(Ba.uniforms),this.uniformsEdges.resolution.value.set(1/e,1/t),this.materialEdges=new _t({defines:Object.assign({},Ba.defines),uniforms:this.uniformsEdges,vertexShader:Ba.vertexShader,fragmentShader:Ba.fragmentShader}),this.uniformsWeights=Gn.clone(ka.uniforms),this.uniformsWeights.resolution.value.set(1/e,1/t),this.uniformsWeights.tDiffuse.value=this.edgesRT.texture,this.uniformsWeights.tArea.value=this.areaTexture,this.uniformsWeights.tSearch.value=this.searchTexture,this.materialWeights=new _t({defines:Object.assign({},ka.defines),uniforms:this.uniformsWeights,vertexShader:ka.vertexShader,fragmentShader:ka.fragmentShader}),this.uniformsBlend=Gn.clone(Ul.uniforms),this.uniformsBlend.resolution.value.set(1/e,1/t),this.uniformsBlend.tDiffuse.value=this.weightsRT.texture,this.materialBlend=new _t({uniforms:this.uniformsBlend,vertexShader:Ul.vertexShader,fragmentShader:Ul.fragmentShader}),this.fsQuad=new Zo(null)}render(e,t,i){this.uniformsEdges.tDiffuse.value=i.texture,this.fsQuad.material=this.materialEdges,e.setRenderTarget(this.edgesRT),this.clear&&e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.materialWeights,e.setRenderTarget(this.weightsRT),this.clear&&e.clear(),this.fsQuad.render(e),this.uniformsBlend.tColor.value=i.texture,this.fsQuad.material=this.materialBlend,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.fsQuad.render(e))}setSize(e,t){this.edgesRT.setSize(e,t),this.weightsRT.setSize(e,t),this.materialEdges.uniforms.resolution.value.set(1/e,1/t),this.materialWeights.uniforms.resolution.value.set(1/e,1/t),this.materialBlend.uniforms.resolution.value.set(1/e,1/t)}getAreaTexture(){return"data:image/png;base64,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"}getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}dispose(){this.edgesRT.dispose(),this.weightsRT.dispose(),this.areaTexture.dispose(),this.searchTexture.dispose(),this.materialEdges.dispose(),this.materialWeights.dispose(),this.materialBlend.dispose(),this.fsQuad.dispose()}}const Xy={defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

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

		}`};class Yy extends rs{constructor(e,t,i){super(),this.scene=e,this.camera=t;const s=i.focus!==void 0?i.focus:1,r=i.aperture!==void 0?i.aperture:.025,o=i.maxblur!==void 0?i.maxblur:1;this.renderTargetDepth=new cn(1,1,{minFilter:kt,magFilter:kt,type:bn}),this.renderTargetDepth.texture.name="BokehPass.depth",this.materialDepth=new $p,this.materialDepth.depthPacking=Hp,this.materialDepth.blending=si;const a=Xy,c=Gn.clone(a.uniforms);c.tDepth.value=this.renderTargetDepth.texture,c.focus.value=s,c.aspect.value=t.aspect,c.aperture.value=r,c.maxblur.value=o,c.nearClip.value=t.near,c.farClip.value=t.far,this.materialBokeh=new _t({defines:Object.assign({},a.defines),uniforms:c,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.uniforms=c,this.fsQuad=new Zo(this.materialBokeh),this._oldClearColor=new je}render(e,t,i){this.scene.overrideMaterial=this.materialDepth,e.getClearColor(this._oldClearColor);const s=e.getClearAlpha(),r=e.autoClear;e.autoClear=!1,e.setClearColor(16777215),e.setClearAlpha(1),e.setRenderTarget(this.renderTargetDepth),e.clear(),e.render(this.scene,this.camera),this.uniforms.tColor.value=i.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),e.clear(),this.fsQuad.render(e)),this.scene.overrideMaterial=null,e.setClearColor(this._oldClearColor),e.setClearAlpha(s),e.autoClear=r}setSize(e,t){this.materialBokeh.uniforms.aspect.value=e/t,this.renderTargetDepth.setSize(e,t)}dispose(){this.renderTargetDepth.dispose(),this.materialDepth.dispose(),this.materialBokeh.dispose(),this.fsQuad.dispose()}}function jy(n,e,t,i,s){n.toneMapping=id,n.toneMappingExposure=1.15,n.outputColorSpace=Dt;const r=n.getPixelRatio(),o=new cn(Math.max(1,Math.round(i*r)),Math.max(1,Math.round(s*r)),{type:bn,colorSpace:Jn}),a=new Fy(n,o);a.setPixelRatio(r),a.setSize(i,s),a.addPass(new By(e,t));const c=new wr(new be(i,s),.32,.3,.96);a.addPass(c);const l=new Vy(i,s);a.addPass(l);const u=new Wy;a.addPass(u);const d=new Yy(e,t,{focus:1,aperture:5e-5,maxblur:.008});d.enabled=!1,a.insertPass(d,a.passes.indexOf(u));const h=tS();return t.add(h.group),h.group.visible=!1,{composer:a,flare:h,setDOF:x=>{d.enabled=x},dofEnabled:()=>d.enabled,setDOFFocus:x=>{d.uniforms.focus.value=x},setSize:(x,m)=>{const p=n.getPixelRatio();c.resolution.set(x*p,m*p),a.setPixelRatio(p),a.setSize(x,m)},dispose:()=>{a.dispose(),o.dispose(),t.remove(h.group),h.dispose()}}}let vo=null;function qy(){if(vo)return vo;const n=256,e=document.createElement("canvas");e.width=n,e.height=n;const t=e.getContext("2d"),i=n/2,s=t.createRadialGradient(i,i,0,i,i,i);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.1,"rgba(255,248,224,0.9)"),s.addColorStop(.2,"rgba(255,214,140,0.5)"),s.addColorStop(.35,"rgba(255,170,80,0.18)"),s.addColorStop(.55,"rgba(230,80,20,0.04)"),s.addColorStop(.8,"rgba(180,50,10,0.008)"),s.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=s,t.fillRect(0,0,n,n);const r=new Br(e);return r.colorSpace=Dt,vo=r,r}function Ky(n){const e=qy(),t=new wo({map:e,color:16777215,blending:ai,depthWrite:!1,depthTest:!0,transparent:!0,opacity:.6}),i=new fc(t);return i.scale.set(n*4.5,n*4.5,1),i.name="sun-glow",i.renderOrder=2,{sprite:i,dispose:()=>{t.dispose(),vo===e&&(e.dispose(),vo=null)}}}const Zy=`
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`,Jy=`
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
`;function Qy(){const n=new _t({vertexShader:Zy,fragmentShader:Jy,uniforms:{uTime:{value:0}},fog:!1,toneMapped:!1});return{material:n,setTime:e=>{n.uniforms.uTime.value=e},dispose:()=>n.dispose()}}let _o=null,Mo=null;function $y(){if(_o)return _o;const n=128,e=document.createElement("canvas");e.width=n,e.height=n;const t=e.getContext("2d"),i=n/2,s=t.createRadialGradient(i,i,0,i,i,i);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.25,"rgba(255,240,210,0.55)"),s.addColorStop(.5,"rgba(255,200,120,0.18)"),s.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=s,t.fillRect(0,0,n,n);const r=new Br(e);return r.colorSpace=Dt,_o=r,r}function eS(){if(Mo)return Mo;const n=256,e=32,t=document.createElement("canvas");t.width=n,t.height=e;const i=t.getContext("2d"),s=i.createLinearGradient(0,0,n,0);s.addColorStop(0,"rgba(255,255,255,0)"),s.addColorStop(.35,"rgba(255,245,225,0.35)"),s.addColorStop(.5,"rgba(255,255,255,0.9)"),s.addColorStop(.65,"rgba(255,245,225,0.35)"),s.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=s,i.fillRect(0,0,n,e);const r=i.createLinearGradient(0,0,0,e);r.addColorStop(0,"rgba(0,0,0,0)"),r.addColorStop(.5,"rgba(0,0,0,1)"),r.addColorStop(1,"rgba(0,0,0,0)"),i.globalCompositeOperation="destination-in",i.fillStyle=r,i.fillRect(0,0,n,e);const o=new Br(t);return o.colorSpace=Dt,Mo=o,o}function tS(){const n=$y(),e=eS(),t=new Ti;t.name="sun-flare",t.renderOrder=3;const i=new fc(new wo({map:e,color:16774368,blending:ai,depthWrite:!1,depthTest:!1,transparent:!0,opacity:.55}));i.renderOrder=3,i.userData.isStreak=!0,t.add(i);const s=[{t:0,size:1,opacity:.5,color:16773848},{t:.35,size:.28,opacity:.22,color:16767392},{t:.7,size:.16,opacity:.16,color:13623551},{t:1.15,size:.34,opacity:.12,color:16769200},{t:1.6,size:.12,opacity:.1,color:12374271}],r=[];for(const l of s){const u=new wo({map:n,color:l.color,blending:ai,depthWrite:!1,depthTest:!1,transparent:!0,opacity:l.opacity}),d=new fc(u);d.renderOrder=3,d.userData.flareT=l.t,d.userData.flareSize=l.size,t.add(d),r.push(d)}const o=1;return{group:t,update:(l,u)=>{const d=l,h=Math.tan(Wn.degToRad((d.fov??45)/2))*o,f=h*(d.aspect??1);i.position.set(u.x*f,u.y*h,-o),i.scale.set(f*1.4,h*.06,1);for(const g of r){const x=g.userData.flareT,m=g.userData.flareSize,p=1-x;g.position.set(u.x*p*f,u.y*p*h,-o),g.scale.setScalar(m*h)}},dispose:()=>{for(const l of r)l.material.dispose();i.material.dispose(),_o===n&&(n.dispose(),_o=null),Mo===e&&(e.dispose(),Mo=null)}}}function nS(n,e,t){const i=n.getWorldPosition(iS),s=sS.subVectors(e,i),r=s.length();if(r<1e-6)return!1;s.divideScalar(r);for(const o of t){if(!o.visible)continue;o.getWorldPosition(Sf);const a=rS.subVectors(Sf,i),c=a.dot(s);if(c<=0||c>=r)continue;bf.copy(a).addScaledVector(s,-c);const l=bf.length(),u=oS(o);if(l<u)return!0}return!1}const iS=new R,sS=new R,Sf=new R,rS=new R,bf=new R;function oS(n){const e=n.geometry;if(e){e.boundingSphere||e.computeBoundingSphere();const t=n.getWorldScale(aS),i=Math.max(t.x,t.y,t.z)||1;return(e.boundingSphere?.radius??0)*i}return 0}const aS=new R,cS=9e3,lS=5e3,uS=5600,dS=9e3,hS=96,Ef=4e3,Nl=.3,fS=[[.6,.72,1],[.79,.85,1],[.95,.97,1],[1,.96,.86],[1,.85,.62],[1,.62,.42]],Tf=[.04,.09,.18,.34,.24,.11];function pS(n){let e=n>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function mS(n){let e=n();for(let t=0;t<Tf.length;t++)if(e-=Tf[t],e<=0)return t;return 3}function gS(n,e,t,i=1592598566){const s=pS(i),r=new Float32Array(n*3),o=new Float32Array(n*3),a=new Float32Array(n);for(let c=0;c<n;c++){const l=s(),u=s(),d=2*Math.PI*l,h=Math.acos(2*u-1),f=e+s()*(t-e);r[c*3]=f*Math.sin(h)*Math.cos(d),r[c*3+1]=f*Math.cos(h),r[c*3+2]=f*Math.sin(h)*Math.sin(d);const[g,x,m]=fS[mS(s)],p=.45+s()*.55;o[c*3]=g*p,o[c*3+1]=x*p,o[c*3+2]=m*p,a[c]=.8+Math.pow(s(),3)*2.6}return{position:r,color:o,size:a}}function xS(n,e){const t=new Ti;t.name="deep-sky";const i=[],s=n.load(e);s.colorSpace=Dt,s.wrapS=Er;const r=new Rs(cS,hS,48),o=new zr({map:s,color:new je(Nl,Nl,Nl),side:en,depthWrite:!1,toneMapped:!1}),a=new wt(r,o);a.name="milkyway-skybox",a.renderOrder=-10,t.add(a),i.push(r,o,s);const{position:c,color:l,size:u}=gS(dS,lS,uS),d=new yt;d.setAttribute("position",new Kt(c,3)),d.setAttribute("color",new Kt(l,3)),d.setAttribute("aSize",new Kt(u,1));const h=new _t({uniforms:{uPixelRatio:{value:1}},vertexColors:!0,transparent:!0,depthWrite:!1,depthTest:!0,blending:ai,vertexShader:`
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
    `});h.toneMapped=!1;const f=new Co(d,h);f.name="starfield",f.renderOrder=-9,t.add(f),i.push(d,h);const g=new Rs(Ef,64,16,0,Math.PI*2,0,Math.PI/2),x=new _t({uniforms:{uColor:{value:new je(1,.85,.62)},uPeak:{value:.015},uR:{value:Ef},uCamPos:{value:new R(0,16,30)}},transparent:!0,side:en,depthWrite:!1,depthTest:!0,blending:ai,vertexShader:`
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
    `});x.toneMapped=!1;const m=new wt(g,x);m.name="zodiacal-light",m.renderOrder=-8,t.add(m),i.push(g,x);const p=new R;return{group:t,update(y){y.getWorldPosition(p),x.uniforms.uCamPos.value.copy(p)},dispose:()=>{for(const y of i)y.dispose()}}}const vS=`
  varying float vNdotView;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 viewDir = normalize(-mvPosition.xyz);
    vec3 nrm = normalize(normalMatrix * normal);
    vNdotView = dot(nrm, viewDir);
    gl_Position = projectionMatrix * mvPosition;
  }
`,_S=`
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
`,MS={earth:{tint:[.35,.6,1],power:3,intensity:1},venus:{tint:[1,.82,.55],power:2.6,intensity:.95},mars:{tint:[1,.55,.35],power:4,intensity:.4},jupiter:{tint:[.95,.8,.6],power:3.2,intensity:.55},saturn:{tint:[1,.9,.65],power:3.2,intensity:.5},uranus:{tint:[.6,.85,.95],power:3.2,intensity:.6},neptune:{tint:[.35,.5,.95],power:3.2,intensity:.6}};function yS(n){return MS[n]??null}function SS(n,e,t){const i=t?.power??3.2,s=t?.intensity??.9,r=t?.base??.08,o=new Rs(n*1.06,48,32),a=new _t({vertexShader:vS,fragmentShader:_S,uniforms:{uColor:{value:new je(...e)},uBase:{value:r},uPower:{value:i},uIntensity:{value:s}},transparent:!0,blending:ai,side:Ri,depthWrite:!1});a.toneMapped=!1;const c=new wt(o,a);return c.renderOrder=2,c.frustumCulled=!1,c.name="atmosphere",c.disposeAtmosphere=()=>{o.dispose(),a.dispose()},c}function bS(n,e){const i=1-Math.abs(n-.42)*1.4,s=1-Math.abs(n-.86)*2.2;let r=Math.max(i,s*.8);r*=1-Math.exp(-Math.pow((n-.72)/.012,2))*.9,r*=1-Math.exp(-Math.pow((n-.95)/.008,2))*.5;const o=Math.min(n,1-n);return r*=Wn.clamp(o/.03,0,1),Wn.clamp(r,0,1)}function zt(n){const t=74732.31999999999,i=2.27*60268;return Wn.clamp((n-t)/(i-t),0,1)}const ES=[{name:"C",t0:zt(74658),t1:zt(91975),opacity:.42},{name:"Maxwell",t0:zt(87480),t1:zt(87539),opacity:.6},{name:"Bond",t0:zt(88702),t1:zt(88719),opacity:.55},{name:"Dawes",t0:zt(90138),t1:zt(90200),opacity:.4},{name:"B",t0:zt(91975),t1:zt(117570),opacity:1},{name:"Cassini",t0:zt(117570),t1:zt(122170),opacity:.06},{name:"A",t0:zt(122170),t1:zt(136780),opacity:.72},{name:"Encke",t0:zt(133589),t1:zt(133599),opacity:.05},{name:"Huygens",t0:zt(129480),t1:zt(129880),opacity:.12}];function Af(n,e,t){const i=Wn.clamp((n-e)/(t-e||1),0,1);return i*i*(3-2*i)}function TS(n){if(n<0||n>1)return 0;let e=0;for(const o of ES)if(n>=o.t0&&n<=o.t1){const a=Af(n,o.t0-.004,o.t0+.004),c=1-Af(n,o.t1-.004,o.t1+.004),l=Math.min(a,c);e=Math.max(e,o.opacity*l)}const t=.5+.5*Math.sin(n*220)*Math.sin(n*61+1.7)*Math.sin(n*13+.4),i=.12*e;let s=e+(t-.5)*2*i;const r=Math.min(n,1-n);return s*=Wn.clamp(r/.02,0,1),Wn.clamp(s,0,1)}function AS(n){const e=[214,196,158],t=[226,224,214],i=Wn.clamp(n,0,1);return[Math.round(e[0]+(t[0]-e[0])*i),Math.round(e[1]+(t[1]-e[1])*i),Math.round(e[2]+(t[2]-e[2])*i)]}function DS(n,e){const s=document.createElement("canvas");s.width=1024,s.height=1;const r=s.getContext("2d"),o=r.createImageData(1024,1),a=e==="saturn";for(let l=0;l<1024;l++){const u=l/1023;let d,h,f,g;if(a)g=TS(u),[d,h,f]=AS(u);else{g=bS(u);const[x,m,p]=n,y=g;d=x*(.7+.3*y),h=m*(.7+.3*y),f=p*(.7+.3*y)}o.data[l*4+0]=d,o.data[l*4+1]=h,o.data[l*4+2]=f,o.data[l*4+3]=g*255}r.putImageData(o,0,0);const c=new Br(s);return c.colorSpace=Dt,c.anisotropy=4,c.needsUpdate=!0,c}function wS(n){const e=n.attributes.position,t=n.attributes.uv;for(let o=0;o<e.count;o++){const a=e.getX(o),c=e.getY(o),l=Math.hypot(a,c);t.setXY(o,l,0)}let i=1/0,s=-1/0;for(let o=0;o<e.count;o++){const a=Math.hypot(e.getX(o),e.getY(o));a<i&&(i=a),a>s&&(s=a)}const r=s-i||1;for(let o=0;o<e.count;o++){const a=Math.hypot(e.getX(o),e.getY(o));t.setXY(o,(a-i)/r,0)}t.needsUpdate=!0}const Ga=1,ys=1495978707e-1,Df=new Map;function PS(n,e){let t=Df.get(n);return t||(t=DS(e,n),Df.set(n,t)),t}const ws={bodyRadiusKm:vm,dwarfRadiusKm:_m,moonRadiusKm:Cy,planetDistance:xm,moonDistance:(n,e)=>(e?Ly(e,n):null)??Mm(n),followDistanceKm:Iy,beltSizeFactor:1},ti={bodyRadiusKm:n=>n/ys*Ga,dwarfRadiusKm:n=>n/ys*Ga,moonRadiusKm:n=>n/ys*Ga,planetDistance:n=>n,moonDistance:n=>n/ys*Ga,followDistanceKm:n=>Math.max(1.5,n/ys*8),beltSizeFactor:0};function CS(n,e,t){const i=(s,r)=>s+(r-s)*t;return{bodyRadiusKm:s=>i(n.bodyRadiusKm(s),e.bodyRadiusKm(s)),dwarfRadiusKm:s=>i(n.dwarfRadiusKm(s),e.dwarfRadiusKm(s)),moonRadiusKm:s=>i(n.moonRadiusKm(s),e.moonRadiusKm(s)),planetDistance:s=>i(n.planetDistance(s),e.planetDistance(s)),moonDistance:(s,r)=>i(n.moonDistance(s,r),e.moonDistance(s,r)),followDistanceKm:(s,r)=>i(n.followDistanceKm(s,r),e.followDistanceKm(s,r)),beltSizeFactor:i(n.beltSizeFactor??1,e.beltSizeFactor??0)}}function Ho(n){return new R(-n.x,n.z,-n.y)}function Ol(n,e){return e.set(-n.x,n.z,-n.y),e}function RS(n,e){const t=TM(n,0,256),i=t.map(u=>{const d=Math.hypot(u.x,u.y,u.z);return Ho(u).multiplyScalar(e(d)/Math.max(1e-9,d))}),s=new yt().setFromPoints(i),r=new Po({color:5599392,transparent:!0,opacity:.45}),o=new gc(s,r),a=t.length,c=new Float32Array(a),l=new Float32Array(a*3);for(let u=0;u<a;u++){const d=t[u];c[u]=Math.hypot(d.x,d.y,d.z);const h=Ho(d).normalize();l[u*3]=h.x,l[u*3+1]=h.y,l[u*3+2]=h.z}return o.userData.radii=c,o.userData.unitDirs=l,o.userData.geo=s,o.userData.mat=r,o}function LS(n,e,t){const i=new H_({canvas:n,antialias:!0,preserveDrawingBuffer:!0});i.setPixelRatio(Math.min(window.devicePixelRatio,2)),i.setSize(window.innerWidth,window.innerHeight),i.outputColorSpace=Dt,i.shadowMap.enabled=!0,i.shadowMap.type=xp;const s=new U_;s.background=new je(5);const r=new Mn(50,window.innerWidth/window.innerHeight,5e-4,2e4);r.position.set(0,16,30),s.add(r);const o=new cM(r,i.domElement);o.enableDamping=!0,o.dampingFactor=.08,o.enablePan=!1;const a=new Y_(16773848,3.5,0,0);wy(a,vs.far),s.add(a),s.add(new j_(2240580,.4));const c=xS(new _d,"textures/milkyway_equirect.png");c.group.traverse(v=>{v instanceof Co&&v.material instanceof _t&&(v.material.uniforms.uPixelRatio.value=i.getPixelRatio())}),s.add(c.group);const l=n3();s.add(l);const u=s3();s.add(u);const d=jy(i,s,r,window.innerWidth,window.innerHeight),h=Ky(Hl*4.5);s.add(h.sprite);const f=Qy(),g=[c,d,h,f],x=new Map,m=[...e.filter(v=>v.kind!=="moon"),...e.filter(v=>v.kind==="moon")];for(const v of m){const b=v.kind==="star",L=v.kind==="moon",A=v.kind==="dwarf",w=b?t===ti?v.radiusKm/ys*1.15:Hl:L?t.moonRadiusKm(v.radiusKm):A?t.dwarfRadiusKm(v.radiusKm):t.bodyRadiusKm(v.radiusKm),I=b?v.radiusKm/ys*1.15:L?ti.moonRadiusKm(v.radiusKm):A?ti.dwarfRadiusKm(v.radiusKm):ti.bodyRadiusKm(v.radiusKm),E=b?Hl:L?ws.moonRadiusKm(v.radiusKm):A?ws.dwarfRadiusKm(v.radiusKm):ws.bodyRadiusKm(v.radiusKm),S=new Rs(w,48,32),C=b?null:iy(v),O=b?f.material:new Ro({map:C,roughness:.92,metalness:0});g.push(S,O,...C?[C]:[]);const z=new wt(S,O);z.name=v.name,z.userData.id=v.id,Py(z,b);const X=new Ti;X.name=`pivot:${v.name}`,X.rotation.z=Wn.degToRad(v.tiltDeg??0),X.add(z),s.add(X);const j=new vc(1.03,1.08,64),k=new zr({color:8378623,side:Cn,transparent:!0,opacity:0,depthWrite:!1}),K=new wt(j,k);K.rotation.x=-Math.PI/2,K.scale.setScalar(Math.max(.001,w)),K.visible=!1,X.add(K),g.push(j,k);let G=null;if(v.rings){const De=w*v.rings.inner,Ee=w*v.rings.outer,Ve=new vc(De,Ee,96,16);wS(Ve);const P=PS(v.id,v.rings.color),Be=new Ro({map:P,color:16777215,side:Cn,transparent:!0,opacity:v.rings.opacity,roughness:.85,metalness:0,depthWrite:!1}),Me=new wt(Ve,Be);Me.rotation.x=-Math.PI/2,Me.castShadow=!0,Me.receiveShadow=!0,Me.renderOrder=1,X.add(Me),G=Me,g.push(Ve,Be)}let ne=null;const ce=yS(v.id);ce&&!b&&!L&&(ne=SS(w,ce.tint,{power:ce.power,intensity:ce.intensity}),X.add(ne));const ue=cy(v.name),Te=new wo({map:ue,depthTest:!1}),Ue=new fc(Te),q=b?3.4:Math.max(1.3,w*2.4);Ue.scale.set(q,q*.25,1),Ue.position.y=w+q*.35,Ue.visible=!1,X.add(Ue),g.push(ue,Te);let Y=null;if(v.elements){const De=Ee=>L?t.moonDistance(Ee,v.id):t.planetDistance(Ee);if(v.id==="moon"){const Ve=[],P=new Float32Array(129),Be=new Float32Array(129*3);for(let he=0;he<=128;he++){const Ie=Ko(0+he/128*27.55455),fe=Math.hypot(Ie[0],Ie[1],Ie[2]),xe=fe*Xn,D=Ho({x:Ie[0],y:Ie[1],z:Ie[2]});Ve.push(D.clone().multiplyScalar(t.moonDistance(xe,"moon")/Math.max(1e-9,fe))),P[he]=xe;const M=D.normalize();Be[he*3]=M.x,Be[he*3+1]=M.y,Be[he*3+2]=M.z}const Me=new yt().setFromPoints(Ve),Ce=new Po({color:5599392,transparent:!0,opacity:.45});Y=new gc(Me,Ce),Y.userData.geo=Me,Y.userData.mat=Ce,Y.userData.radii=P,Y.userData.unitDirs=Be,g.push(Me,Ce)}else Y=RS(v.elements,De),L||s.add(Y)}const te=L&&v.parent?x.get(v.parent)??null:null,ae=v.rings?2*w*v.rings.outer:2*w,ve={def:v,pivot:X,mesh:z,label:Ue,orbit:Y,orbitEmphasis:K,ringsMesh:G,atmosphereMesh:ne,parent:te,spin:0,worldPos:new R,sceneRadius:w,visibleRadius:E,trueRadius:I,builtRadius:w,cloudsMesh:null,frameExtent:ae,satellite:null};v.id==="iss"&&(ve.mesh.visible=!1),x.set(v.id,ve)}for(const v of x.values())v.orbit&&v.parent&&(v.orbit.removeFromParent(),v.parent.pivot.add(v.orbit));{const v=x.get("iss"),b=x.get("earth");if(v&&b){const A=[],w=new Float32Array(97),I=new Float32Array(97*3),E=t.moonDistance(420,"iss")??2;for(let z=0;z<=96;z++){const X=z/96*Math.PI*2,j=E*Math.cos(X),k=E*Math.sin(X),K=0;A.push(new R(j,k,K)),w[z]=420;const G=Math.hypot(j,k,K)||1;I[z*3]=j/G,I[z*3+1]=k/G,I[z*3+2]=K/G}const S=new yt().setFromPoints(A),C=new Po({color:8956620,transparent:!0,opacity:.4}),O=new gc(S,C);O.userData.geo=S,O.userData.mat=C,O.userData.radii=w,O.userData.unitDirs=I,O.visible=!1,b.pivot.add(O),v.orbit=O,g.push(S,C)}}const p=[];for(const v of ly){const b=by(v);p.push(b),s.add(b.mesh),s.add(b.points)}Am({belts:p},0,t,0);function y(){for(const v of g)v.dispose();for(const v of p)v.dispose();for(const v of x.values())v.cloudsMesh&&(v.cloudsMesh.geometry.dispose(),v.cloudsMesh.material.dispose()),v.atmosphereMesh&&v.atmosphereMesh.disposeAtmosphere();l.userData.dispose?.();for(const v of u.children){const b=v;b.geometry.dispose(),b.material.dispose()}o.dispose(),i.dispose()}return{renderer:i,camera:r,controls:o,scene:s,bodies:x,belts:p,sunLight:a,skybox:c,constellations:l,constellationFigures:u,post:d,sunGlow:h.sprite,sunShader:f,userData:{},dispose:y}}const Rt=4800;function Ed(n){let e=0,t=0,i=0;for(const r of n.stars){const[o,a,c]=Nc(r.raHours,r.decDeg);e+=o,t+=a,i+=c}const s=Math.hypot(e,t,i)||1;return[e/s,t/s,i/s]}function yo(n,e){return n[0]*e[0]+n[1]*e[1]+n[2]*e[2]}function Mc(n,e){return[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]]}function nc(n){const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]}function zc(n){const e=Ed(n),t=n.stars.map(m=>Nc(m.raHours,m.decDeg)),i=Math.abs(e[1])<.9?[0,1,0]:[1,0,0],s=nc(Mc(e,i)),r=Mc(e,s);let o=0,a=0,c=0;for(const m of t){const p=yo(m,s),y=yo(m,r);o+=p*p,c+=p*y,a+=y*y}const l=.5*Math.atan2(2*c,o-a),u=Math.cos(l),d=Math.sin(l);let h=[s[0]*u+r[0]*d,s[1]*u+r[1]*d,s[2]*u+r[2]*d],f=0,g=0;for(const m of t){const p=yo(m,h);p>f&&(f=p),-p>g&&(g=-p)}return g>f&&(h=[-h[0],-h[1],-h[2]]),{halfExtent:Math.max(f,g),axis:h,labelDir:m=>{const p=Math.cos(m),y=Math.sin(m);return[e[0]*p+h[0]*y,e[1]*p+h[1]*y,e[2]*p+h[2]*y]}}}const wf=22,zl=48;function IS(n,e){const t=n[0]*e[0]+n[1]*e[1]+n[2]*e[2],i=Math.PI/180,s=Math.acos(Math.min(1,Math.max(-1,t)))/i;return s<=wf?1:s>=zl?0:(zl-s)/(zl-wf)}const hr=.28,Pf=1,HS=.5,Cf=.05,US=1,NS=.75;function Td(n){return Cf+(US-Cf)*Math.pow(n,NS)}const So=9416959,zu=8191066,OS=0,Fu=.45,zS=.7,FS=8,BS=11,kS=.15,GS=2.5;function lo(n){const e=2*Math.PI*(n/GS);return 1-kS*(1-Math.sin(e))/2}const WS=.02,VS=.35,XS=.016,YS=.011,jS=.018;function Ad(n){return zc(n).halfExtent<=jS?YS:XS}function qS(n){const e=Ad(n),t=Oc(n.name).fontSize;return e*(Pn/t)}function Dd(n){return Oc(n.name).inkWidthPx/Pn*qS(n)}function KS(n){const e=zc(n);return Math.min(e.halfExtent,VS)+WS+Dd(n)/2}const Rf=.006;function ZS(n,e){const t=nc(e),i=Dd(n)/2,s=Ad(n)/2,r=Math.abs(t[1])<.9?[0,1,0]:[1,0,0],o=nc(Mc(t,r)),a=nc(Mc(t,o)),c=n.stars.map(u=>Nc(u.raHours,u.decDeg)),l=u=>Math.abs(yo(u,o))<i+Rf&&Math.abs(yo(u,a))<s+Rf;for(const[u,d]of n.lines)for(let h=0;h<=1.0001;h+=.05){const f=[c[u][0]+(c[d][0]-c[u][0])*h,c[u][1]+(c[d][1]-c[u][1])*h,c[u][2]+(c[d][2]-c[u][2])*h];if(l(f))return!0}for(const u of c)if(l(u))return!0;return!1}const JS=[1,1.5],QS=[1,-1],Lf=.004,$S=.25,e3=10;function Sm(n){const e=n.map((s,r)=>{const o=zc(s),a=Ed(s);return{i:r,pose:o,dir:a,margin0:KS(s),inkHalf:Dd(s)/2,halfH:Ad(s)/2+Lf/2}}),t=e.map(s=>s.i).sort((s,r)=>{const o=e[r].pose.halfExtent-e[s].pose.halfExtent;return o!==0?o:n[s].name.localeCompare(n[r].name)}),i=new Array(n.length).fill(null);for(const s of t){const r=e[s];let o=null;for(const c of QS)for(const l of JS){const u=r.margin0*l,d=Math.cos(u),h=c*Math.sin(u),f=[r.dir[0]*d+r.pose.axis[0]*h,r.dir[1]*d+r.pose.axis[1]*h,r.dir[2]*d+r.pose.axis[2]*h];let g=$S*(l-1);ZS(n[s],f)&&(g+=e3);for(const x of t){const m=i[x];m&&(g+=t3(r,f,m))}(!o||g<o.score)&&(o={score:g,side:c,marginScale:l,dir:f,offset:u})}const a=o;i[s]={side:a.side,marginScale:a.marginScale,dir:a.dir,inkHalf:r.inkHalf+Lf/2,halfH:r.halfH,offset:a.offset}}return i}function t3(n,e,t){const i=n.inkHalf+t.inkHalf,s=n.halfH+t.halfH;let r=e[0]+t.dir[0],o=e[1]+t.dir[1],a=e[2]+t.dir[2];const c=Math.hypot(r,o,a);if(c<1e-6)return 0;r/=c,o/=c,a/=c;let l=o*e[2]-a*e[1],u=a*e[0]-r*e[2],d=r*e[1]-o*e[0];const h=Math.hypot(l,u,d);if(h<1e-6)return 0;l/=h,u/=h,d/=h;const f=o*d-a*u,g=a*l-r*d,x=r*u-o*l,m=l*e[0]+u*e[1]+d*e[2],p=f*e[0]+g*e[1]+x*e[2],y=l*t.dir[0]+u*t.dir[1]+d*t.dir[2],v=f*t.dir[0]+g*t.dir[1]+x*t.dir[2],b=(m-y)/i,L=(p-v)/s,A=b*b+L*L;return A<1?1-A:0}const Fl=2,If=2756,Bl=.5;function bm(n){if(n<=Fl)return Bl;if(n>=If)return 1;const e=(n-Fl)/(If-Fl);return Bl+(1-Bl)*e*e*(3-2*e)}function n3(){const n=new Ti;n.name="constellations";const e=new xc({color:13623551,size:3.2,sizeAttenuation:!1,transparent:!0,opacity:.9,depthWrite:!1}),t=Sm(tn),i=[],s=[],r=[],o=[],a=[],c=[],l=[],u=[];for(let f=0;f<tn.length;f++){i.push(t[f].dir);const g=tn[f],x=g.stars.map(j=>{const[k,K,G]=Nc(j.raHours,j.decDeg);return[k*Rt,K*Rt,G*Rt]}),m=[];for(const[j,k]of g.lines)m.push(...x[j],...x[k]);const p=new yt;p.setAttribute("position",new xt(m,3));const y=new Po({color:So,transparent:!0,opacity:hr,depthWrite:!1});y.userData.baseColor=So;const v=new Qh(p,y);v.name=`constellation-lines-core:${g.name}`,v.renderOrder=3,n.add(v);const b=new Ou;b.setPositions(m);const L=new Nu({color:So,transparent:!0,opacity:hr,depthWrite:!1,linewidth:FS,worldUnits:!0});L.resolution.set(1,1);const A=new Rl(b,L);A.name=`constellation-lines:${g.name}`,A.renderOrder=2,A.computeLineDistances(),n.add(A),a.push(b),c.push(L);const w=new Ou;w.setPositions(m);const I=new Nu({color:OS,transparent:!0,opacity:Fu,depthWrite:!1,linewidth:BS,worldUnits:!0});I.resolution.set(1,1);const E=new Rl(w,I);E.name=`constellation-lines-halo:${g.name}`,E.renderOrder=1,E.computeLineDistances(),n.add(E),l.push(w),u.push(I);const S=(Rt+4)/Rt,C=[];for(const j of x)C.push(j[0]*S,j[1]*S,j[2]*S);const O=new yt;O.setAttribute("position",new xt(C,3));const z=new xc({color:zu,size:5.2,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1}),X=new Co(O,z);X.name=`constellation-stars-emph:${g.name}`,X.visible=!1,X.renderOrder=4,n.add(X),r.push(O),o.push(z);for(const j of x)s.push(...j)}const d=new yt;d.setAttribute("position",new xt(s,3));const h=new Co(d,e);return h.name="constellation-stars",h.renderOrder=4,n.add(h),n.userData.labelDirs=i,n.userData.dispose=()=>{for(const f of n.children){const g=f;(g instanceof Qh||g instanceof Rl)&&(g.geometry.dispose(),g.material.dispose())}for(const f of r)f.dispose();for(const f of o)f.dispose();for(const f of a)f.dispose();for(const f of c)f.dispose();for(const f of l)f.dispose();for(const f of u)f.dispose();d.dispose(),e.dispose()},n}const bo=new Map(tn.map((n,e)=>[n.name,e])),Hf=new Map;function i3(n){return`constellation-figures/${n.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g,"_")}.png`}function s3(){const n=new Ti;n.name="constellation-figures",n.visible=!1;const e=new _d;for(const t of Ty){if(!bo.has(t.constellation))continue;let i=Hf.get(t.constellation);i||(i=e.load(i3(t.constellation)),Hf.set(t.constellation,i)),i.colorSpace=Dt,i.anisotropy=4;const s=Ay(t),r=new zr({map:i,transparent:!0,opacity:0,depthWrite:!1,side:Cn}),o=new wt(new jo(1,1),r),a=Rt*.998;o.position.set(s.position[0]*a,s.position[1]*a,s.position[2]*a),o.up.set(s.upHint[0],s.upHint[1],s.upHint[2]),o.lookAt(0,0,0),o.rotateZ(s.rotationRad),o.scale.set(s.planeSize[0]*Rt,s.planeSize[1]*Rt,1),o.name=`constellation-figure:${t.constellation}`,n.add(o)}return n}function r3(n,e,t){for(const i of n.children){const s=i.name??"";if(!s.startsWith("constellation-figure:"))continue;const r=bo.get(s.slice(21));if(r===void 0)continue;const o=e[r]??0,a=Math.min(HS,Td(o))*t;i.visible=a>.005,i.material.opacity=a}}function o3(n,e,t=1,i,s=0){for(const r of n.children){const o=r.name??"";if(o==="constellation-stars"){r.material.opacity=t;continue}if(o.startsWith("constellation-stars-emph:")){if(bo.get(o.slice(25))===void 0)continue;const x=i!=null&&i!==""&&o===`constellation-stars-emph:${i}`,m=r.material;x?m.opacity=lo(s):m.opacity=0,r.visible=m.opacity>.005;continue}const a=o.startsWith("constellation-lines-halo:")?o.slice(25):null;if(a!==null){const g=bo.get(a);if(g===void 0)continue;const x=e[g]??0,m=i!=null&&i!==""&&a===i,p=r.material;m?p.opacity=lo(s):p.opacity=(Fu+(zS-Fu)*x)*t;continue}const c=o.startsWith("constellation-lines-core:")?o.slice(25):null,l=c===null&&o.startsWith("constellation-lines:")?o.slice(20):null,u=c??l;if(u===null)continue;const d=bo.get(u);if(d===void 0)continue;const h=e[d]??0,f=i!=null&&i!==""&&u===i;if(c!==null){const g=r.material;f?(g.color.setHex(zu),g.opacity=lo(s)):(g.color.setHex(So),g.opacity=(hr+(Pf-hr)*h)*t);continue}{const g=r.material;f?(g.color.setHex(zu),g.opacity=lo(s)):(g.color.setHex(So),g.opacity=(hr+(Pf-hr)*h)*t)}}}function Em(n,e,t){let i=n.userData.updateOrder;i||(i=[...n.bodies.values()].sort((o,a)=>{const c=o.parent?1:0,l=a.parent?1:0;return c-l}),n.userData.updateOrder=i);const s=a3,r=c3;for(const o of i){const{def:a,pivot:c}=o;if(a.kind==="star")c.position.set(0,0,0),o.worldPos.set(0,0,0);else if((a.kind==="planet"||a.kind==="dwarf")&&a.elements){const l=_c(a.elements,e,r),u=Ol(l,s),d=Math.hypot(l.x,l.y,l.z),h=t.planetDistance(d)/Math.max(1e-9,d);c.position.copy(u.multiplyScalar(h)),o.worldPos.copy(c.position)}else if(a.kind==="moon"&&a.elements){let l;if(a.id==="moon"){const m=Ko(e);l={x:m[0],y:m[1],z:m[2]}}else l=_c(a.elements,e,r);const u=Ol(l,s),d=Math.hypot(l.x,l.y,l.z),h=a.id==="moon"?d*Xn:d,f=t.moonDistance(h,a.id)/Math.max(1e-9,d),g=u.multiplyScalar(f),x=o.parent;x?(g.applyQuaternion(x.pivot.quaternion),c.position.copy(x.worldPos).add(g)):c.position.copy(g),o.worldPos.copy(c.position)}else if(a.id==="iss"&&o.satellite){const l=fm(o.satellite,e);if(l){const[u,d,h]=l.posAu,f=Ol({x:u,y:d,z:h},s),g=Math.hypot(u,d,h),x=g*Xn,m=t.moonDistance(x,"iss")/Math.max(1e-9,g),p=f.multiplyScalar(m),y=o.parent;y?(p.applyQuaternion(y.pivot.quaternion),c.position.copy(y.worldPos).add(p)):c.position.copy(p),o.worldPos.copy(c.position)}}}}const a3=new R,c3={x:0,y:0,z:0},Uf=new Map;function Tm(n){let e=Uf.get(n.def.id);if(e===void 0){const t=(n.def.a[0]+n.def.a[1])/2;e=xm(t),Uf.set(n.def.id,e)}return e}function Am(n,e,t,i){for(const s of n.belts)Ey(s,e,t,t.beltSizeFactor),gm(s,i,Tm(s),t.beltSizeFactor??1)}function l3(n,e,t){for(const i of n.belts)gm(i,t,Tm(i),e.beltSizeFactor??1)}function u3(n,e){for(const i of n.bodies.values()){const s=i.visibleRadius+(i.trueRadius-i.visibleRadius)*e,r=Math.max(1e-7,s/i.builtRadius);i.mesh.scale.setScalar(r),i.ringsMesh&&i.ringsMesh.scale.setScalar(r),i.atmosphereMesh&&i.atmosphereMesh.scale.setScalar(r),i.orbitEmphasis.scale.setScalar(Math.max(.001,s));const o=i.def.kind==="star"?3.4:Math.max(1.3,s*2.4);i.label.scale.set(o,o*.25,1),i.label.position.y=s+o*.35,i.label.material.opacity=1,i.sceneRadius=s}const t=n.bodies.get("sun");t&&n.sunGlow.scale.set(t.sceneRadius*4.5,t.sceneRadius*4.5,1)}function d3(n,e,t){const i=n.userData.radii,s=n.userData.unitDirs,r=n.userData.geo;if(!i||!s||!r)return;const o=r.getAttribute("position"),a=i.length;for(let c=0;c<a;c++){const l=i[c],u=t?e.moonDistance(l,t):e.planetDistance(l);o.setXYZ(c,s[c*3]*u,s[c*3+1]*u,s[c*3+2]*u)}o.needsUpdate=!0,r.computeBoundingSphere()}function Dm(n,e,t){const i=n.userData.radii,s=n.userData.unitDirs,r=n.userData.geo;if(!i||!s||!r)return;const o=r.getAttribute("position"),a=27.55455;for(let c=0;c<=128;c++){const l=Ko(e+c/128*a),d=Math.hypot(l[0],l[1],l[2])*Xn,f=Ho({x:l[0],y:l[1],z:l[2]}).normalize();i[c]=d,s[c*3]=f.x,s[c*3+1]=f.y,s[c*3+2]=f.z;const g=t.moonDistance(d,"moon");o.setXYZ(c,f.x*g,f.y*g,f.z*g)}o.needsUpdate=!0,r.computeBoundingSphere()}function wm(n,e,t,i){const s=n.bodies.get("iss");s&&(s.satellite=e,s.mesh.visible=!0,s.label.visible=!0,s.orbit&&(s.orbit.visible=!0,wd(s.orbit,e,t,i)))}function wd(n,e,t,i){const s=n.userData.geo;if(!s)return;const r=s.getAttribute("position"),o=r.count,a=JM;for(let c=0;c<o;c++){const l=fm(e,t+c/(o-1)*a);if(!l)continue;const[u,d,h]=l.posAu,g=Math.hypot(u,d,h)*Xn,m=Ho({x:u,y:d,z:h}).normalize(),p=i.moonDistance(g,"iss")??2;r.setXYZ(c,m.x*p,m.y*p,m.z*p)}r.needsUpdate=!0,s.computeBoundingSphere()}function h3(n,e){for(const t of n.bodies.values()){if(!t.def.rotationHours)continue;const i=t.def.rotationHours/24;t.spin+=e/Math.abs(i)*Math.PI*2*Math.sign(i),t.mesh.rotation.y=t.spin,t.cloudsMesh&&(t.cloudsMesh.rotation.y=t.spin*.05)}}function f3(n,e){const t=n.elements?n.elements.a:0;return e.moonDistance(t,n.id)}function Pm(n,e){let t=0;for(const i of yd)i.parent===n&&(t=Math.max(t,f3(i,e)));return t}function p3(n,e,t,i){const s=e!==""&&n===e,r=.5+.5*Math.sin(i*3.4);return{ringVisible:s,ringOpacity:s?.35+.55*r:0,ringBreath:1+.12*r,orbitOpacity:t?s?.95:.45:null,orbitColor:t?s?8378623:5599392:null}}function m3(n,e,t){for(const i of n.bodies.values()){const s=p3(i.def.id,e,i.orbit!==null,t);if(i.orbitEmphasis.visible=s.ringVisible,s.ringVisible){const r=i.orbitEmphasis.material;r.opacity=s.ringOpacity,i.orbitEmphasis.scale.setScalar(i.sceneRadius*s.ringBreath)}if(i.orbit&&s.orbitOpacity!==null&&s.orbitColor!==null){const r=i.orbit.material;r.opacity=s.orbitOpacity,r.color.set(s.orbitColor)}}}const g3="https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=tle",x3={name:"ISS (ZARYA)",noradId:25544,line1:"1 25544U 98067A   26259.14303184  .00007008  00000+0  13461-3 0  9990",line2:"2 25544  51.6310 209.9325 0004907 145.2560 214.8750 15.49133683585852"};function v3(n){const e=n.split(/\r?\n/).map(o=>o.trim()).filter(o=>o.length>0),t=e.find(o=>o.startsWith("1 ")),i=e.find(o=>o.startsWith("2 "));if(!t||!i)return null;const s=t.slice(2,7).trim();if(!/^\d{3,7}$/.test(s))return null;const r=i.slice(8,16).trim();return/^\d{1,2}\.\d{4}$/.test(r)?{name:e[0]&&!e[0].startsWith("1 ")&&!e[0].startsWith("2 ")?e[0]:`NORAD ${s}`,noradId:parseInt(s,10),line1:t,line2:i}:null}async function _3(n=8e3){const e=new AbortController,t=setTimeout(()=>e.abort(),n);try{const i=await fetch(g3,{signal:e.signal,headers:{Accept:"text/plain"}});if(!i.ok)return null;const s=await i.text();return v3(s)}catch{return null}finally{clearTimeout(t)}}const Nf=22,M3=.04,y3=220,S3=8,b3=5,kl=18,Of=120,zf=.55,Ff=14,ps=new R;function Bu(n,e,t,i){if(ps.copy(n),ps.applyMatrix4(e.matrixWorldInverse),ps.z>=-e.near)return{x:0,y:0,ok:!1};const s=ps.x/-ps.z,r=ps.y/-ps.z,o=(s*.5+.5)*t,a=(-r*.5+.5)*i;return!Number.isFinite(o)||!Number.isFinite(a)?{x:0,y:0,ok:!1}:{x:o,y:a,ok:!0}}function E3(n){return n<=kl?1:n>=Of?zf:1-(n-kl)/(Of-kl)*(1-zf)}function T3(n,e,t,i,s=S3){const r=y3,o=b3,a=d=>d.length*Nf*.55,c=[];for(const d of n){const h=Bu(d.world,e,t,i);if(!h.ok||h.x<-r||h.x>t+r||h.y<-r||h.y>i+r)continue;const g=d.tier===0||d.id==="sun"?1:E3(d.dist);if(g<=M3)continue;const x=Nf,m=a(d.name),p=m+16;c.push({id:d.id,name:d.name,tier:d.tier,dist:d.dist,bx:h.x,by:h.y,discR:d.discRadiusPx,inkW:m,h:x,w:p,opacity:Math.min(1,g),emphasized:d.tier===0})}c.sort((d,h)=>d.tier-h.tier||d.dist-h.dist);const l=[],u=[];for(const d of c){if(l.length>=s)break;const f=(d.by>i/2?-1:1)*(d.discR+Ff+d.h/2),g=d.discR+Ff*.5;let x=d.bx+g,m=d.by+f;x=Math.max(d.w/2+2,Math.min(t-d.w/2-2,x)),m=Math.max(d.h/2+2,Math.min(i-d.h/2-2,m));const p=x-d.inkW/2-o,y=x+d.inkW/2+o,v=m-d.h/2-o,b=m+d.h/2+o;let L=!1;for(const A of u)if(p<A.x2&&y>A.x1&&v<A.y2&&b>A.y1){L=!0;break}L||(u.push({x1:p,x2:y,y1:v,y2:b}),l.push({id:d.id,name:d.name,bx:d.bx,by:d.by,discR:d.discR,x,y:m,w:d.w,h:d.h,opacity:d.opacity,emphasized:d.emphasized}))}return l}function A3(n,e){for(const t of e){n.globalAlpha=t.opacity;const i=t.x-t.bx,s=t.y-t.by,r=Math.hypot(i,s)||1,o=i/r,a=s/r,c=t.bx+o*t.discR,l=t.by+a*t.discR;n.strokeStyle=t.emphasized?"rgba(120,220,160,0.7)":"rgba(180,200,230,0.45)",n.lineWidth=1,n.beginPath(),n.moveTo(c,l),n.lineTo(t.x-o*(t.w/2),t.y-a*(t.h/2)),n.stroke(),n.font="600 15px system-ui, sans-serif",n.textAlign="center",n.textBaseline="middle";const u=n.measureText(t.name).width;n.fillStyle="rgba(10,14,24,0.5)",n.fillRect(t.x-u/2-6,t.y-10,u+12,20),n.fillStyle=t.emphasized?"#7ddba8":"#dbe6f5",n.fillText(t.name,t.x,t.y)}n.globalAlpha=1}function D3(n){const e=document.createElement("canvas");return e.id="planet-labels",e.style.cssText="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:6;",n.insertAdjacentElement("afterend",e),{canvas:e,setVisible:t=>{e.style.display=t?"block":"none"},dispose:()=>{e.remove()}}}function w3(n,e,t,i,s){const r=n.canvas,o=Math.min(window.devicePixelRatio,2),a=Math.max(1,Math.round(i*o)),c=Math.max(1,Math.round(s*o));r.width!==a&&(r.width=a),r.height!==c&&(r.height=c);const l=r.getContext("2d");l.setTransform(o,0,0,o,0,0),l.clearRect(0,0,i,s);const u=T3(t,e,i,s);A3(l,u)}const P3=30,ku=.02,C3=260,R3=8,ms=new R;function L3(n,e,t,i){if(ms.set(n[0]*Rt,n[1]*Rt,n[2]*Rt),ms.applyMatrix4(e.matrixWorldInverse),ms.z>=-e.near)return{x:0,y:0,ok:!1};const s=ms.x/-ms.z,r=ms.y/-ms.z,o=(s*.5+.5)*t,a=(-r*.5+.5)*i;return!Number.isFinite(o)||!Number.isFinite(a)?{x:0,y:0,ok:!1}:{x:o,y:a,ok:!0}}const Gu=new Map;function I3(n,e="base"){const t=`${e}:${n}`;let i=Gu.get(t);return i||(i=document.createElement("canvas"),i.width=Pn,i.height=pm,ay(i.getContext("2d"),n,e),Gu.set(t,i)),i}function H3(n){const e=document.createElement("canvas");e.id="cst-labels",e.style.cssText="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:5;";const t=n.parentElement;return t&&(t.style.position=t.style.position||"relative"),n.insertAdjacentElement("afterend",e),{canvas:e,setVisible:i=>{e.style.display=i?"block":"none"},dispose:()=>{e.remove(),Gu.clear()}}}const U3=4;function N3(n,e,t,i,s,r=R3){if(s<=ku)return[];const o=C3,a=U3,c=Pn/pm,l=[];for(const h of n){if(h.occluded||!h.emphasized&&h.emphasis<=0)continue;const f=Td(h.emphasis)*s;if(f<=ku)continue;const g=L3(h.dir,e,t,i);if(!g.ok||g.x<-o||g.x>t+o||g.y<-o||g.y>i+o)continue;const x=P3*(h.emphasized?1.12:1),m=c*x,p=Oc(h.name).inkWidthPx/Pn;l.push({name:h.name,emphasized:h.emphasized,emphasis:h.emphasis,rank:h.emphasized?1:0,x:g.x,y:g.y,inkW:m*p,h:x,w:m,opacity:Math.min(1,f)})}l.sort((h,f)=>f.rank-h.rank||f.emphasis-h.emphasis);const u=[],d=[];for(const h of l){if(u.length>=r)break;const f=h.x-h.inkW/2-a,g=h.x+h.inkW/2+a,x=h.y-h.h/2-a,m=h.y+h.h/2+a;let p=!1;for(const y of d)if(f<y.x2&&g>y.x1&&x<y.y2&&m>y.y1){p=!0;break}p||(d.push({x1:f,x2:g,y1:x,y2:m}),u.push({name:h.name,emphasized:h.emphasized,x:h.x,y:h.y,w:h.w,h:h.h,opacity:h.opacity}))}return u}function O3(n,e,t,i,s,r){const o=n.canvas,a=Math.min(window.devicePixelRatio,2),c=Math.max(1,Math.round(s*a)),l=Math.max(1,Math.round(r*a));o.width!==c&&(o.width=c),o.height!==l&&(o.height=l);const u=o.getContext("2d");if(u.setTransform(a,0,0,a,0,0),u.clearRect(0,0,s,r),i<=.01)return;const d=N3(t,e,s,r,i);for(const h of d){const f=I3(h.name,h.emphasized?"green":"base");u.globalAlpha=h.opacity,u.drawImage(f,h.x-h.w/2,h.y-h.h/2,h.w,h.h)}u.globalAlpha=1}function Pd(n){const e=Math.min(1,Math.max(0,n));return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2}function Cm(n){const e=Math.min(1,Math.max(0,n));return e<.5?16*e*e*e*e*e:1-Math.pow(-2*e+2,5)/2}function Bf(n,e){return[n[0]-e[0],n[1]-e[1],n[2]-e[2]]}function z3(n,e){return[n[0]+e[0],n[1]+e[1],n[2]+e[2]]}const kf=.62,F3=38;function Rm(n,e,t,i=1){const s=t*Math.PI/360,r=Math.atan(Math.tan(s)*i),o=Math.max(e/(2*kf*Math.tan(s)),e/(2*kf*Math.tan(r)),.35),a=F3*Math.PI/180,c=Math.sin(a),l=Math.cos(a);return{pos:[n[0],n[1]+o*c,n[2]+o*l],target:n}}function B3(n,e,t=.85){const i=e*Math.PI/360,s=n/(t*Math.tan(i)),r=.42;return{pos:[0,s*r,s*Math.sqrt(1-r*r)],target:[0,0,0]}}function k3(n,e,t){const i=t*Math.PI/360,s=e/(.08*Math.tan(i)),r=Math.min(s,n*.82),o=.35;return{pos:[0,r*o,r*Math.sqrt(1-o*o)],target:[0,0,0],fov:120}}function G3(n,e,t,i,s=1,r=.55,o=6,a=120){const l=Math.atan2(t*Math.sin(e),t*Math.cos(e)-i)/r,u=180/Math.PI,d=2*l*u,h=2*Math.atan(l/s)*u,f=Math.min(a,Math.max(o,Math.max(d,h)));return{pos:[n[0]*i,n[1]*i,n[2]*i],target:[n[0]*t,n[1]*t,n[2]*t],fov:f}}function W3(n,e,t){n.t+=e;const s=(n.cine?Cm:Pd)(n.t/n.duration),r=(u,d)=>u+(d-u)*s,o=t??n.toTarget,a=[r(n.fromTarget[0],o[0]),r(n.fromTarget[1],o[1]),r(n.fromTarget[2],o[2])],c=[r(n.fromOffset[0],n.toOffset[0]),r(n.fromOffset[1],n.toOffset[1]),r(n.fromOffset[2],n.toOffset[2])],l=n.fromFov+(n.toFov-n.fromFov)*s;return{target:a,offset:c,pos:z3(a,c),fov:l,done:n.t>=n.duration}}function Jo(n,e,t,i,s,r,o,a=!1){return{fromTarget:e,fromOffset:Bf(n,e),toTarget:t.target,toOffset:Bf(t.pos,t.target),duration:i,t:0,followId:s,toFov:t.fov??o,fromFov:r,cine:a}}const V3="textures/planets",X3={day:"_day.jpg",normal:"_normal.jpg",roughness:"_roughness.jpg",clouds:"_clouds.png",night:"_night.png"};function Y3(n,e="day"){return`${V3}/${n}${X3[e]}`}const Gf=new Map;function j3(n,e=fetch){let t=Gf.get(n);return t||(t=e(n,{method:"HEAD"}).then(i=>i.ok).catch(()=>!1),Gf.set(n,t)),t}const Wf=new Map;async function so(n,e,t,i=fetch){const s=`${n}:${e}`,r=Wf.get(s);if(r)return r;const o=Y3(n,e);if(!await j3(o,i))return null;const a=await new Promise((c,l)=>{t.load(o,c,void 0,l)}).catch(()=>null);return a?(a.colorSpace=e==="normal"||e==="roughness"?Jn:Dt,a.wrapS=Er,Wf.set(s,a),a):null}async function q3(n,e,t=fetch){const i=await so(n,"day",e,t);if(!i)return null;const[s,r,o,a]=await Promise.all([so(n,"normal",e,t),so(n,"roughness",e,t),so(n,"clouds",e,t),so(n,"night",e,t)]);return{day:i,normal:s,roughness:r,clouds:o,night:a}}function K3(n,e,t){const i=t*1.015,s=new Rs(i,48,32),r=new Ro({map:e,transparent:!0,opacity:.85,depthWrite:!1,roughness:1,metalness:0}),o=new wt(s,r);return o.name=`clouds:${n.def.name}`,o.castShadow=!1,o.receiveShadow=!1,n.pivot.add(o),{mesh:o,geo:s,mat:r}}async function Z3(n,e,t=fetch){let i=0;for(const s of n){const r=s.def.id,o=await q3(r,e,t);if(!o)continue;const a=s.mesh.material;if(a.map=o.day,a instanceof Ro&&(o.normal&&(a.normalMap=o.normal,a.normalScale=new be(.8,.8)),o.roughness&&(a.roughnessMap=o.roughness,a.roughness=1),o.night&&J3(a,o.night)),a.needsUpdate=!0,i+=1,o.clouds&&!s.cloudsMesh){const{mesh:c}=K3(s,o.clouds,s.builtRadius);s.cloudsMesh=c}}return i}function J3(n,e){n.onBeforeCompile=t=>{t.uniforms.uNightMap={value:e},t.uniforms.uNightIntensity={value:1.8},t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
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
}`)},n.customProgramCacheKey=()=>"earth-night-lights"}const Cd=[{bodyId:"sun",duration:2,zoom:3},{bodyId:"sun",duration:1.6,zoom:1},{bodyId:"earth",duration:2.2,zoom:1}],Lm=Cd.reduce((n,e)=>n+e.duration,0),Gl=.3,Vf=1.4;function Q3(n,e,t,i){return!(n||e==="0"||t||i)}const Im="solar_intro_seen";function $3(n){const e=Lm+Uo,t=e-1.6,i=e-.6;return n<Gl||n>i?0:n<Vf?(n-Gl)/(Vf-Gl):n<t?1:(i-n)/(i-t)}const Uo=2.5;function eb(n,e,t){const i=Cm(n/Uo);return e+(t-e)*i}function tb(n){const e=Uo,t=e*.4,i=e*.75;return n<=0?0:n<t?n/t:n<i?1:n>=e?0:(e-n)/(e-i)}const Rd=[{id:"pause",key:"Space",keys:["Space"],label:"Play / pause",hint:"Toggle the clock",group:"time"},{id:"speed-up",key:"ArrowUp",keys:["↑"],label:"Speed up",hint:"Raise sim speed",group:"time"},{id:"speed-down",key:"ArrowDown",keys:["↓"],label:"Slow down",hint:"Lower sim speed",group:"time"},{id:"now",key:"n",keys:["N"],label:"Jump to now",hint:"Reset the clock to today",group:"time"},{id:"reverse",key:"r",keys:["R"],label:"Reverse time",hint:"Run the clock backwards",group:"time"},{id:"orbits",key:"o",keys:["O"],label:"Toggle orbits",hint:"Show / hide orbit lines",group:"view"},{id:"labels",key:"l",keys:["L"],label:"Toggle labels",hint:"Show / hide body labels",group:"view"},{id:"belts",key:"b",keys:["B"],label:"Toggle belts",hint:"Show / hide the asteroid belts",group:"view"},{id:"figures",key:"f",keys:["F"],label:"Toggle figures",hint:"Show / hide constellation figures",group:"view"},{id:"milkyway",key:"m",keys:["M"],label:"Toggle Milky Way",hint:"Show / hide the deep-sky background",group:"sky"},{id:"zodiacal",key:"z",keys:["Z"],label:"Toggle zodiacal light",hint:"Show / hide the sunlit dust glow",group:"sky"},{id:"atmospheres",key:"a",keys:["A"],label:"Toggle atmospheres",hint:"Show / hide the fresnel rims",group:"sky"},{id:"post",key:"p",keys:["P"],label:"Toggle bloom / HDR",hint:"Post-processing on / off (F2)",group:"sky"},{id:"scale",key:"t",keys:["T"],label:"True / visible scale",hint:"Swap the scale mode",group:"camera"},{id:"camera-preset",key:"c",keys:["C"],label:"Camera preset",hint:"Cycle top / side view",group:"camera"},{id:"release",key:"Escape",keys:["Esc"],label:"Release follow",hint:"Stop tracking the picked body",group:"camera"},{id:"screenshot",key:"s",keys:["S"],label:"Save screenshot",hint:"Download a PNG of the view",group:"system"}];function nb(n){return n.map(e=>({id:`jump-${e.id}`,keys:[],label:`Go to ${e.name}`,hint:"Fly the camera to this body",group:"jump"}))}function ib(n){return[...Rd.map(t=>({id:t.id,keys:t.keys,label:t.label,hint:t.hint,group:t.group})),...nb(n)]}function sb(n){const e=n.length===1?n.toLowerCase():n;for(const t of Rd)if((t.key.length===1?t.key.toLowerCase():t.key)===e)return t.id;return/^[1-9]$/.test(n)?`jump-digit-${n}`:n==="0"?"jump-digit-0":null}function rb(n,e,t){if(n==="0")return t;const i=parseInt(n,10)-1;return i<0||i>=e.length?null:e[i].id}function ob(n,e){const t=n.elements;if(!t)return null;const i=cm(t,e);if(i.n===0)return null;const s=Ft(t,e),r=n.kind==="moon"?1:Xn;return{periodDays:360/Math.abs(i.n),distanceKm:Math.hypot(s.x,s.y,s.z)*r,perihelionKm:i.a*(1-i.e)*r,aphelionKm:i.a*(1+i.e)*r}}function ab(n){if(!Number.isFinite(n)||n<=0)return"—";if(n<2)return`${(n*24).toFixed(1)} h`;if(n<365)return`${n.toFixed(1)} d`;const e=n/365.25;return`${e>=100?e.toFixed(0):e>=10?e.toFixed(1):e.toFixed(2)} yr`}function uo(n){return!Number.isFinite(n)||n<0?"—":n<1e6?`${Math.round(n).toLocaleString("en-US")} km`:n<1e8?`${(n/1e6).toFixed(1)} M km`:`${(n/1e9).toFixed(2)} B km`}const cb={sun:"The Sun holds 99.86% of the Solar System’s mass.",mercury:"A Mercury year is just 88 days, yet one of its days lasts 176 Earth days.",venus:"Venus spins backwards, so there the Sun rises in the west.",earth:"The only known world with liquid-water oceans on its surface.",mars:"Home to Olympus Mons, the tallest volcano in the Solar System.",jupiter:"The Great Red Spot is a storm wider than Earth, raging for centuries.",saturn:"Its rings are mostly water ice, yet the system is barely 1 km thick in places.",uranus:"Uranus rolls around the Sun on its side — tilted about 98°.",neptune:"Winds here reach ~2,100 km/h, the fastest in the Solar System.",moon:"The Moon drifts away from Earth by about 3.8 cm each year.",pluto:"Pluto’s bright heart is Sputnik Planitia, a nitrogen-ice plain."};function lb(n){if(!Number.isFinite(n)||n===0)return"—";const e=n<0,t=Math.abs(n),i=t<48?`${t.toFixed(1)} h`:`${(t/24).toFixed(1)} d`;return e?`${i} (retrograde)`:i}function ub(n){const e=[{label:"Radius",value:uo(n.radiusKm)},{label:"Day length",value:lb(n.rotationHours)},{label:"Axial tilt",value:`${n.tiltDeg.toFixed(0)}°`}],t=cb[n.id];return t&&e.push({label:"Fun fact",value:t}),e}function db(n){return n.paused&&!n.cameraMoving&&!n.scrubbing&&!n.flightActive&&!n.morphActive&&!n.skyTourActive&&!n.introActive}const Hm=Number.isFinite;function Xf(n){if(n==null||n==="")return;const e=Number(n);return Hm(e)?e:void 0}function Xi(n){if(!(n==null||n===""))return n==="1"||n==="true"}function hb(n){const t=new URL(n,"http://localhost").searchParams,i={},s=Xf(t.get("t"));s!==void 0&&(i.timeMs=s);const r=Xf(t.get("sp"));r!==void 0&&(i.speedLog=r);const o=t.get("f");o!=null&&(i.follow=o);const a=t.get("c");a!=null&&(i.constellation=a);const c=t.get("sc");c==="t"?i.scale="true":c==="v"&&(i.scale="visible");const l=Xi(t.get("o"));l!==void 0&&(i.orbits=l);const u=Xi(t.get("l"));u!==void 0&&(i.labels=u);const d=Xi(t.get("b"));d!==void 0&&(i.belts=d);const h=Xi(t.get("fig"));h!==void 0&&(i.figures=h);const f=Xi(t.get("dof"));f!==void 0&&(i.dof=f);const g=Xi(t.get("p"));g!==void 0&&(i.paused=g);const x=Xi(t.get("rv"));x!==void 0&&(i.reversed=x);const m=Xi(t.get("ev"));m!==void 0&&(i.eventsOpen=m);const p=t.get("cam");if(p){const y=p.split(",").map(Number);y.length===6&&y.every(Hm)&&(i.cam={pos:[y[0],y[1],y[2]],target:[y[3],y[4],y[5]]})}return i}function Um(n,e){const t=new URL(n,"http://localhost"),i=t.searchParams,s=(a,c)=>{c===void 0?i.delete(a):i.set(a,c)};if(s("t",e.timeMs!==void 0?String(Math.round(e.timeMs)):void 0),s("sp",e.speedLog!==void 0?String(Yf(e.speedLog)):void 0),s("f",e.follow===void 0?void 0:e.follow),s("c",e.constellation===void 0?void 0:e.constellation),s("sc",e.scale===void 0?void 0:e.scale==="true"?"t":"v"),s("o",e.orbits===void 0?void 0:e.orbits?"1":"0"),s("l",e.labels===void 0?void 0:e.labels?"1":"0"),s("b",e.belts===void 0?void 0:e.belts?"1":"0"),s("fig",e.figures===void 0?void 0:e.figures?"1":"0"),s("dof",e.dof===void 0?void 0:e.dof?"1":"0"),s("p",e.paused===void 0?void 0:e.paused?"1":"0"),s("rv",e.reversed===void 0?void 0:e.reversed?"1":"0"),s("ev",e.eventsOpen===void 0?void 0:e.eventsOpen?"1":"0"),e.cam){const[a,c,l,u,d,h]=[...e.cam.pos,...e.cam.target].map(Yf);s("cam",`${a},${c},${l},${u},${d},${h}`)}else i.delete("cam");const r=i.toString();return`${t.origin.startsWith("http")&&n.includes("://")?`${t.origin}${t.pathname}`:t.pathname}${r?`?${r}`:""}${t.hash}`}function Yf(n){return Math.round(n*1e6)/1e6}const Wl=Math.PI/180,Ld=180/Math.PI,Pr=on.map(n=>n.id),Fc=new Map(on.map(n=>[n.id,n])),Sn=Fc.get("earth"),fb=yd.find(n=>n.id==="moon"),pb=["mercury","venus"],mb=["mars","jupiter","saturn","uranus","neptune"];function ts(n){return Math.hypot(n.x,n.y,n.z)}function Ls(n,e){return{x:n.x-e.x,y:n.y-e.y,z:n.z-e.z}}function No(n){return{x:-n.x,y:-n.y,z:-n.z}}function Is(n,e){const t=n.x*e.x+n.y*e.y+n.z*e.z,i=ts(n),s=ts(e);if(i===0||s===0)return 0;const r=Math.min(1,Math.max(-1,t/(i*s)));return Math.acos(r)*Ld}function Ps(n,e){const t=n/e;return t>=1?90:t<=0?0:Math.asin(t)*Ld}function gb(n){return Ln+Math.round(n*864e5)}function Qo(n,e){return e||Math.min(2,Math.max(.25,n/2e4))}function Id(n,e,t){const i=[];for(let s=n;s<=e+1e-9;s+=t)i.push(s);return(i.length===0||i[i.length-1]<e)&&i.push(e),i}function $o(n,e,t,i,s=48){const r=(Math.sqrt(5)-1)/2,o=u=>i?-n(u):n(u);let a=e,c=t;for(let u=0;u<s;u++){const d=c-r*(c-a),h=a+r*(c-a);o(d)<o(h)?c=h:a=d}const l=(a+c)/2;return{t:l,value:n(l)}}function Cr(n,e,t,i,s,r){return{type:n,tDays:e,dateMs:gb(e),title:t,detail:i,bodyId:s,bodyId2:r}}function Hd(n,e,t){const i=Id(n,e,t),s=on.map(r=>i.map(o=>Ft(r.elements,o)));return{times:i,pos:s}}function Ud(n,e,t){return Ls(n.pos[e][t],n.pos[Pr.indexOf("earth")][t])}function Vl(n){const e=Ft(Sn.elements,n),t=No(e),[i,s,r]=Ko(n),o={x:i,y:s,z:r},a=Is(t,o),c=ts(e)*Xn,l=ts(o)*Xn;return{sep:a,sunR:Ps(Md.radiusKm,c),moonR:Ps(fb.radiusKm,l),dSunKm:c,dMoonKm:l}}function xb(n,e,t){const i=Qo(e-n,t?.coarseStepDays),s=Id(n,e,i),r=s.map(a=>Vl(a).sep),o=[];for(let a=1;a<r.length-1;a++){const c=r[a],l=c<r[a-1]&&c<r[a+1],u=c>r[a-1]&&c>r[a+1];if(!l&&!u)continue;const d=s[a],{t:h}=$o(g=>Vl(g).sep,d-2,d+2,u),f=Vl(h);if(l){const g=Ps(Sn.radiusKm,f.dMoonKm);if(f.sep<f.sunR+f.moonR+g){const x=f.sep<f.moonR-f.sunR?"Total solar eclipse":f.sep<f.sunR-f.moonR?"Annular solar eclipse":"Partial solar eclipse";o.push(Cr("solar-eclipse",h,"Solar eclipse",`${x} · Sun–Moon sep ${f.sep.toFixed(2)}°`,"sun","moon"))}}else{const g=180-f.sep,[x,m,p]=Ko(h),y=ts({x,y:m,z:p})*Xn,v=Ps(Sn.radiusKm,y)-f.sunR,b=Ps(Sn.radiusKm,y)+f.sunR;if(g<f.moonR+b){const L=g<v-f.moonR?"Total lunar eclipse":g<v+f.moonR?"Partial lunar eclipse":"Penumbral lunar eclipse";o.push(Cr("lunar-eclipse",h,"Lunar eclipse",`${L} · ${g.toFixed(2)}° from opposition`,"moon"))}}}return o}function vb(n,e,t){const i=Hd(n,e,Qo(e-n,t?.coarseStepDays)),s=Pr.indexOf("earth"),r=[];for(const o of pb){const a=Pr.indexOf(o),c=Fc.get(o),l=i.times.map((u,d)=>{const h=Ud(i,a,d),f=No(i.pos[s][d]);return Is(h,f)});for(let u=1;u<l.length-1;u++){if(!(l[u]<l[u-1]&&l[u]<l[u+1])||l[u]>30)continue;const d=i.times[u],h=b=>{const L=Ls(Ft(c.elements,b),Ft(Sn.elements,b)),A=No(Ft(Sn.elements,b));return Is(L,A)},{t:f,value:g}=$o(h,d-2,d+2,!1),x=ts(Ft(Sn.elements,f))*Xn,m=Ls(Ft(c.elements,f),Ft(Sn.elements,f)),p=ts(m)*Xn,y=Ps(Md.radiusKm,x),v=Ps(c.radiusKm,p);if(g<y+v){const b=g<y-v?"Transit (planet fully on the Sun)":"Partial transit";r.push(Cr("transit",f,`${c.name} transit`,`${b} · sep ${g.toFixed(2)}°`,o))}}}return r}function _b(n,e,t){const i=t?.conjunctionDeg??1,s=Hd(n,e,Qo(e-n,t?.coarseStepDays));Pr.indexOf("earth");const r=s.times.length,o=[],a=on.map((c,l)=>{const u=new Array(r);for(let d=0;d<r;d++)u[d]=Ud(s,l,d);return u});for(let c=0;c<on.length;c++)for(let l=c+1;l<on.length;l++){const u=d=>Is(a[c][d],a[l][d]);for(let d=1;d<r-1;d++){const h=u(d);if(!(h<u(d-1)&&h<u(d+1))||h>i*2.5)continue;const f=s.times[d],g=p=>{const y=Ls(Ft(on[c].elements,p),Ft(Sn.elements,p)),v=Ls(Ft(on[l].elements,p),Ft(Sn.elements,p));return Is(y,v)},{t:x,value:m}=$o(g,f-2,f+2,!1);if(m<i){const p=on[c].name,y=on[l].name;o.push(Cr("conjunction",x,`${p}–${y} conjunction`,`sep ${m.toFixed(2)}°`,on[c].id,on[l].id))}}}return o}function Mb(n,e,t){const i=t?.oppositionDeg??170,s=Hd(n,e,Qo(e-n,t?.coarseStepDays)),r=Pr.indexOf("earth"),o=[];for(const a of mb){const c=Pr.indexOf(a),l=Fc.get(a),u=s.times.map((d,h)=>Is(Ud(s,c,h),No(s.pos[r][h])));for(let d=1;d<u.length-1;d++){if(!(u[d]>u[d-1]&&u[d]>u[d+1])||u[d]<170)continue;const h=s.times[d],f=m=>Is(Ls(Ft(l.elements,m),Ft(Sn.elements,m)),No(Ft(Sn.elements,m))),{t:g,value:x}=$o(f,h-3,h+3,!0);x>i&&o.push(Cr("opposition",g,`${l.name} opposition`,`elongation ${x.toFixed(2)}° from the Sun`,a))}}return o}function yb(){const n=40.588*Wl,e=83.537*Wl,t=23.4392911*Wl,i=Math.cos(e)*Math.cos(n),s=Math.cos(e)*Math.sin(n),r=Math.sin(e),o=s*Math.cos(t)+r*Math.sin(t),a=-s*Math.sin(t)+r*Math.cos(t),c=Math.hypot(i,o,a);return{x:i/c,y:o/c,z:a/c}}const Xl=yb();function jf(n){const e=Ft(Fc.get("saturn").elements,n),t=Ft(Sn.elements,n),i=Ls(t,e),s=Math.abs(i.x*Xl.x+i.y*Xl.y+i.z*Xl.z),r=Math.min(1,s/(ts(i)||1));return 90-Math.acos(r)*Ld}function Sb(n,e,t){const i=t?.edgeOnDeg??2,s=Qo(e-n,t?.coarseStepDays),r=Id(n,e,s),o=r.map(jf),a=[];for(let l=1;l<o.length-1;l++){if(!(o[l]<o[l-1]&&o[l]<o[l+1])||o[l]>i*2.5)continue;const u=r[l],{t:d,value:h}=$o(jf,u-45,u+45,!1);h<i&&a.push(Cr("saturn-edge-on",d,"Saturn rings edge-on",`ring plane tilt ${h.toFixed(2)}° from Earth`,"saturn"))}a.sort((l,u)=>l.tDays-u.tDays);const c=[];for(const l of a){const u=c[c.length-1];if(u&&l.tDays-u.tDays<30){const d=h=>parseFloat(h.detail.match(/tilt ([\d.]+)/)?.[1]??"99");d(l)<d(u)&&(c[c.length-1]=l)}else c.push(l)}return c}function Nm(n,e,t){const i=[...xb(n,e,t),...vb(n,e,t),..._b(n,e,t),...Mb(n,e,{coarseStepDays:t?.coarseStepDays}),...Sb(n,e,t)];return i.sort((s,r)=>s.dateMs-r.dateMs),i}const bb=1,Eb=.01,Tb=-3,Ab=2.5;function Om(n){const e=Date.UTC(n,0,1),t=Date.UTC(n+1,0,1);return{span0Days:(e-Ln)/864e5,spanLenDays:(t-e)/864e5}}function Db(n,e,t,i){const s=n+i*bb;return Math.max(e,Math.min(e+t-1e-6,s))}function wb(n,e){const t=n-e*Eb;return Math.max(Tb,Math.min(Ab,t))}const Pb={sun:"☀️",moon:"🌙",mercury:"⚪",venus:"💛",earth:"🌍",mars:"🔴",jupiter:"🟠",saturn:"🪐",uranus:"🔵",neptune:"🟣"},Cb={"solar-eclipse":"🌑","lunar-eclipse":"🌕","saturn-edge-on":"🪐"};function Rb(n){const e=Cb[n.type];if(e)return e;const t=i=>i&&Pb[i]||"●";return n.type==="transit"?t(n.bodyId):n.type==="conjunction"?t(n.bodyId)+t(n.bodyId2):n.type==="opposition"?t(n.bodyId):"✦"}const Lb=40;function Bc(n,e,t,i,s=Lb){const r=e>0?e:1,o=l=>Math.max(0,Math.min(1,(l-n)/r)),a=t.filter(l=>l.tDays>=n-1e-6&&l.tDays<n+r+1e-6).map(l=>({frac:o(l.tDays),emoji:Rb(l),title:l.title})).sort((l,u)=>l.frac-u.frac),c=Math.max(0,a.length-s);return{markers:a.slice(0,s),overflow:c,caretFrac:o(i)}}const zm=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Ib(n){const e=n,t=[];for(let i=0;i<12;i++){const s=(Date.UTC(2001,i,1)-Date.UTC(2001,0,1))/864e5;s>=e||t.push({abbr:zm[i],day:s,frac:s/e})}return t}function qf(n,e){const t=new Date(Date.UTC(n,0,1+Math.floor(e)));return`${zm[t.getUTCMonth()]} ${t.getUTCDate()}`}function Hb(n,e,t){let i=null,s=1/0;for(const r of n){const o=Math.abs(r.x-e);o<=t&&o<s&&(s=o,i=r)}return i}const rn=56,Ub=4;function Nb(n){const e=Math.max(0,1-n/rn);return 1+(Ub-1)*e*e}function Wa(n,e){const t=Math.sqrt(n*n+e*e);if(t>=rn)return null;const i=Nb(t);return{x:n*i,y:e*i,scale:i}}function Kf(n,e){return Math.max(0,Math.min(e,n))}const Ob=["January","February","March","April","May","June","July","August","September","October","November","December"];function zb(n,e){return new Date(Date.UTC(n,e+1,0)).getUTCDate()}function Fb(n,e){return new Date(Date.UTC(n,e,1)).getUTCDay()}function Bb(n,e){const t=zb(n,e),i=Fb(n,e),s=new Array(42).fill(0);for(let r=1;r<=t;r++)s[i+(r-1)]=r;return{grid:s,daysInMonth:t,firstWeekday:i}}function kb(n,e){return`${Ob[e]} ${n}`}function Zf(n,e){return n.getUTCFullYear()===e.getUTCFullYear()&&n.getUTCMonth()===e.getUTCMonth()&&n.getUTCDate()===e.getUTCDate()}const Gb=.5,Jf=864e5,Wu=new Map;function Nd(n){const e=Date.UTC(n,0,1),t=Date.UTC(n+1,0,1);return{span0Days:(e-Ln)/Jf,spanLenDays:(t-e)/Jf}}function Fm(n){return Wu.has(n)}function Bm(n){const e=Wu.get(n);if(e)return e;const{span0Days:t,spanLenDays:i}=Nd(n),s=Nm(t,t+i,{coarseStepDays:Gb}),r={year:n,span0Days:t,spanLenDays:i,events:s};return Wu.set(n,r),r}"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js").catch(()=>{})});const Wb=.15;let Qi=null,yc=!1;function Oo(){Qi&&(Qi=null,F.controls.enabled=!0,F.controls.update())}function Vb(){const n=F.camera.position,e=n.length();if(e<1e-6)return;const t=Math.acos(Math.min(1,Math.max(-1,n.y/e)));Qi={theta:Math.atan2(n.x,n.z),phi:t,radius:e},F.controls.enabled=!1}function Xb(n){if(!Qi)return;Qi.theta+=Wb*n;const{theta:e,phi:t,radius:i}=Qi,s=Math.sin(t);F.camera.position.set(i*s*Math.sin(e),i*Math.cos(t),i*s*Math.cos(e)),F.camera.lookAt(0,0,0)}for(const n of["pointerdown","wheel","keydown","touchstart"])window.addEventListener(n,Oo,{passive:!0});const Sc=tn.map(n=>Ed(n)),Yb=tn.map(n=>zc(n).halfExtent),bc=new Float32Array(tn.length),jb=200;let Qf=0,Rr="";const Va=new R;let Hs=null,Lr=null;const qb=Sm(tn).map(n=>n.dir),Yl=new im,$f=new R;function Kb(){Va.set(0,0,-1).applyQuaternion(F.camera.quaternion);const n=Va.x,e=Va.y,t=Va.z;for(let i=0;i<Sc.length;i++){const s=Sc[i];bc[i]=IS(s,[n,e,t])}}function Zb(n){if(n-Qf<jb)return;const e=F.camera.position,t=`${e.x.toFixed(2)}|${e.y.toFixed(2)}|${e.z.toFixed(2)}|${F.camera.quaternion.w.toFixed(3)}|${ln}`;if(t===Rr)return;Qf=n,Rr=t;const i=bm(F.camera.position.length());o3(F.constellations,bc,i,ln||null,n/1e3),kr&&r3(F.constellationFigures,bc,i)}function Jb(n){if(!ln)return;const e=F.constellations.children.find(t=>t.name===`constellation-lines:${ln}`);e&&(e.material.opacity=lo(n/1e3))}const Gt=document.getElementById("app"),En=document.getElementById("date"),Us=document.getElementById("speed"),Qb=document.getElementById("speed-value"),Ec=document.getElementById("pause"),vr=document.getElementById("reverse"),$b=document.getElementById("now"),ns=document.getElementById("find"),wi=document.getElementById("find-list"),Ir=document.getElementById("orbits"),In=document.getElementById("labels"),Hr=document.getElementById("belts"),_r=document.getElementById("figures"),kc=document.getElementById("dof");let kr=!1;const Xa=document.getElementById("share"),ho=document.getElementById("screenshot"),fo=document.getElementById("tooltip"),ro=document.getElementById("info"),Tc=document.getElementById("gl-lost");let gt=null;const Mr=document.getElementById("intro"),Ya=document.getElementById("intro-title"),Ki=document.getElementById("intro-skip"),zo=document.getElementById("palette"),As=document.getElementById("palette-input"),po=document.getElementById("palette-list");let Ur=!1,Ac="",qi=0,Fo=[],jl=!0,Dc=!0,Vu=!0,ja=0;const eE=document.getElementById("gl-reload"),Od=document.getElementById("hud-mini"),Gr=document.getElementById("hud-date"),zd=document.getElementById("hud-speed"),ri=document.getElementById("hud-timeline"),ea=document.getElementById("hud-timeline-track"),Xu=document.getElementById("hud-timeline-dynamic"),km=document.getElementById("hud-timeline-fill"),Gm=document.getElementById("hud-timeline-caret"),tE=document.getElementById("hud-timeline-bar"),Yu=document.getElementById("hud-timeline-year"),cr=document.getElementById("hud-tl-tip"),ju=document.getElementById("hud-tl-lens"),ic=document.getElementById("hud-tl-lens-canvas"),nE=document.getElementById("hud-tl-lens-date"),wc=document.getElementById("date-cal"),iE=document.getElementById("date-cal-title"),sE=document.getElementById("date-cal-prev"),rE=document.getElementById("date-cal-next"),oE=document.getElementById("date-cal-grid"),aE=document.getElementById("date-cal-today"),cE=document.getElementById("date-cal-y-5"),lE=document.getElementById("date-cal-y-1"),uE=document.getElementById("date-cal-y+1"),dE=document.getElementById("date-cal-y+5");let kn=0,ni=0,Ns=!1,qu=-1,Ku=window.innerWidth<560;const ep=document.getElementById("info-name"),tp=document.getElementById("info-period"),np=document.getElementById("info-distance"),ip=document.getElementById("info-range"),ql=document.getElementById("info-facts"),sp=document.getElementById("info-label-1"),rp=document.getElementById("info-label-2"),op=document.getElementById("info-label-3"),Zu=document.getElementById("events-toggle"),Wm=document.getElementById("events-range"),Zi=document.getElementById("events-row"),yr=document.getElementById("events-list"),Eo=document.getElementById("date-pick"),Nr=new Map(qo.map(n=>[n.id,n])),Bo=new Map(qo.filter(n=>n.kind==="moon"&&n.parent).map(n=>[n.id,n.parent])),_e=new Q_(Date.now());let F,Zt=ws,St="",oi=!0,ci="",ln="",ap=_e.t,Ju=performance.now(),ko=0,Pc=null,Qu=!0;function mn(){Qu=!0}const _i={x:0,y:0,z:0},Mi={x:0,y:0,z:0};let cp=!1,Kl=!1,Fd=!1,an=null;const hE=3;let $e=null;const $u=document.getElementById("scale-real"),Vm=document.getElementById("scale-visible"),Zl=document.getElementById("scale-caption"),lp=[[0,"Morphing to real scale…"],[.2,"Sizes snap to reality — the default view exaggerates radii ~300× (Sun) to ~40,000× (Earth)."],[.5,"Distances snap to reality — Earth is 150 million km from the Sun, not 15 units."],[.8,"At real scale Neptune is 4.5 BILLION km out. Most of this view is empty space."]];function fE(n){let e=lp[0][1];for(const[t,i]of lp)n>=t&&(e=i);return e}function Xm(){return $e?$e.dir===0?$e.p>=.5?"real":"visible":$e.dir===1?"real":"visible":Zt===ti?"real":"visible"}function Bd(){const n=Xm()==="real";for(const e of[$u,Vm]){if(!e)continue;const t=e===$u?n:!n;e.classList.toggle("active",t),e.setAttribute("aria-checked",String(t))}Zl&&(Zl.hidden=!$e,$e&&(Zl.textContent=$e.dir===-1?"Returning to the visible view…":$e.dir===0?"Real scale — sizes and distances to the same ratio. Toggle back any time.":fE(Pd($e.p))))}function pE(){$e&&($e.p>=1?($e={p:1,dir:0,reframed:!1},Zt=ti):($e=null,Zt=ws),Bd(),st())}function ed(n){Xm()!==n&&(mn(),$e&&$e.dir!==0?($e.dir=n==="real"?1:-1,$e.reframed=!1):n==="real"?(an=null,Oo(),$e={p:0,dir:1,reframed:!1}):(an=null,Oo(),$e={p:1,dir:-1,reframed:!1}),Bd())}function os(){const n=F.bodies.get("moon");n?.orbit&&Dm(n.orbit,_e.t,Zt);const e=F.bodies.get("iss");e?.orbit&&e.satellite&&wd(e.orbit,e.satellite,_e.t,Zt),ko=performance.now()}function mE(n){F&&F.dispose(),F=LS(Gt,qo,n),F.controls.addEventListener("change",st);for(const t of F.bodies.values())t.orbit&&t.parent&&t.parent.pivot.add(t.orbit);Pc&&wm(F,Pc,_e.t,Zt),ii(),Em(F,_e.t,Zt);const e=new _d;if(Z3(F.bodies.values(),e),St){const t=F.bodies.get(St);if(t){const i=Zt.followDistanceKm(t.def.radiusKm,t.def.kind==="dwarf");F.controls.target.copy(t.worldPos),F.camera.position.copy(t.worldPos).add(new R(i,i*.6,i))}}return F}const Hi=50;function up(n=!1){let e=0;for(const t of F.bodies.values()){const i=t.def.elements;if(i&&(t.def.kind==="planet"||!n&&t.def.kind==="dwarf")){const s=i.a*(1+i.e);e=Math.max(e,Zt.planetDistance(s))}}return Math.max(e,1)}function Go(n){return n==="constellations"?k3(Rt,up(),Hi):B3(up(!0),Hi,.95)}function Ui(n){const e=F.bodies.get(n);if(!e)return null;const t=Bo.get(n)??n,i=F.bodies.get(t)??e,s=Pm(t,Zt),r=Math.max(i.frameExtent,s>0?2*s+i.sceneRadius:0);return Rm([i.worldPos.x,i.worldPos.y,i.worldPos.z],r,Hi,F.camera.aspect)}function gE(n){const e=tn.findIndex(t=>t.name===n);return e<0?null:G3(Sc[e],Yb[e],Rt,Rt/8,F.camera.aspect)}function Pi(n,e=1.4,t=null,i=!1){St=t??"",Os(St),ci=t??"",ln="",Rr="",st(),Oo(),yc=i,Xc();const s=t?Bo.has(t)?Bo.get(t):t:null;an=Jo([F.camera.position.x,F.camera.position.y,F.camera.position.z],[F.controls.target.x,F.controls.target.y,F.controls.target.z],n,e,s,F.camera.fov,Hi)}function xE(n){const e=gE(n);e&&(ln=n,St="",ci="",Oo(),yc=!1,Rr="",Xc(),an=Jo([F.camera.position.x,F.camera.position.y,F.camera.position.z],[F.controls.target.x,F.controls.target.y,F.controls.target.z],e,1.6,null,F.camera.fov,Hi),st())}function vE(){const n=document.getElementById("anchors");n&&(n.addEventListener("click",e=>{const t=e.target.closest("button[data-fly]");if(!t)return;const i=t.dataset.fly;if(i==="system")Pi(Go("system"),1.6,"sun");else if(i==="constellations")Pi(Go("constellations"),1.8,"sun",!0);else{const s=Ui(i);s&&Pi(s,1.4,i)}st()}),$u?.addEventListener("click",()=>ed("real")),Vm?.addEventListener("click",()=>ed("visible")))}function ii(){mn();for(const n of F.bodies.values())n.orbit&&(n.orbit.material.visible=Ir.checked);Hs?.setVisible(In.checked),Lr?.setVisible(In.checked);for(const n of F.belts)n.mesh.visible=Hr.checked;F.constellationFigures.visible=kr,F.post.setDOF(kc.checked&&oi)}const Jl=new R,gs=new R,dp=new R;let qa=null;function _E(){const n=F.camera,e=F.bodies.get("sun"),t=F.post.flare;if(!e){t.group.visible=!1;return}if(e.mesh.getWorldPosition(Jl),gs.copy(Jl).project(n),!(gs.z<1&&gs.x>-1.05&&gs.x<1.05&&gs.y>-1.05&&gs.y<1.05))t.group.visible=!1;else{if(qa===null){qa=[];for(const r of F.bodies.values())r.def.id!=="sun"&&qa.push(r.mesh)}const s=nS(n,Jl,qa);t.group.visible=!s,s||t.update(n,gs)}if(F.post.dofEnabled()){const s=St||ci||"sun",r=F.bodies.get(s);let o=1;r&&(r.mesh.getWorldPosition(dp),o=n.position.distanceTo(dp)),F.post.setDOFFocus(o)}}function ME(){const n=_e.getSpeed(),e=_e.isReversed?"← ":"",t=Math.abs(n);let i,s;return t>=100?(i=t.toFixed(0),s="d/s"):t>=1?(i=t.toFixed(1),s="d/s"):t>=.1?(i=t.toFixed(2),s="d/s"):(i=(t*24).toFixed(2),s="h/s"),`${e}${i} ${s}`}function Gc(){const n=ME();Qb.textContent=n,zd.textContent=n}function kd(){const n=_e.toDate(),e=n.getUTCFullYear(),t=String(n.getUTCMonth()+1).padStart(2,"0"),i=String(n.getUTCDate()).padStart(2,"0"),s=String(n.getUTCHours()).padStart(2,"0"),r=String(n.getUTCMinutes()).padStart(2,"0");En.textContent=`${e}-${t}-${i} ${s}:${r} UTC`,Gr.textContent=Ku?`${e}-${t}-${i}`:`${e}-${t}-${i} ${s}:${r}`;const o=String(e);if(Yu.textContent!==o&&(Yu.textContent=o),document.activeElement!==Eo){const a=`${e}-${t}-${i}`;Eo.value!==a&&(Eo.value=a)}}function yE(){const n=Eo.value;if(!n)return;const[e,t,i]=n.split("-").map(Number);if(!e||!t||!i)return;const s=_e.toDate(),r=new Date(Date.UTC(e,t-1,i,s.getUTCHours(),s.getUTCMinutes()));Math.abs(r.getTime()-s.getTime())<6e4||(_e.setDate(r),os(),mn(),En.classList.remove("flash"),En.offsetWidth,En.classList.add("flash"),jc()&&Vr(),st())}function Wr(){iE.textContent=kb(kn,ni);const{grid:n}=Bb(kn,ni),e=_e.toDate(),t=new Date,i=document.createDocumentFragment();for(const s of n){const r=document.createElement("div");if(r.className="cal-day",s===0)r.classList.add("blank");else{r.textContent=String(s);const o=new Date(Date.UTC(kn,ni,s));Zf(o,e)&&r.classList.add("sel"),Zf(o,t)&&kn===t.getUTCFullYear()&&ni===t.getUTCMonth()&&r.classList.add("today"),r.addEventListener("click",()=>SE(s))}i.appendChild(r)}oE.replaceChildren(i)}function SE(n){const e=_e.toDate(),t=new Date(Date.UTC(kn,ni,n,e.getUTCHours(),e.getUTCMinutes()));Math.abs(t.getTime()-e.getTime())<6e4||(_e.setDate(t),os(),mn(),En.classList.remove("flash"),En.offsetWidth,En.classList.add("flash"),jc()&&Vr(),st(),Wr())}function Ym(){const n=_e.toDate();kn=n.getUTCFullYear(),ni=n.getUTCMonth(),qu=n.getUTCDate(),Ns=!0,wc.classList.add("open"),wc.setAttribute("aria-hidden","false"),Wr()}function Wc(){Ns&&(Ns=!1,wc.classList.remove("open"),wc.setAttribute("aria-hidden","true"))}function jm(n){const e=kn*12+ni+n;kn=Math.floor(e/12),ni=(e%12+12)%12,Wr()}function Vc(n){kn+=n,Wr()}cE.addEventListener("click",()=>Vc(-5));lE.addEventListener("click",()=>Vc(-1));uE.addEventListener("click",()=>Vc(1));dE.addEventListener("click",()=>Vc(5));Gr.addEventListener("click",()=>{Ns?Wc():Ym()});Gr.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),Ns?Wc():Ym())});sE.addEventListener("click",()=>jm(-1));rE.addEventListener("click",()=>jm(1));aE.addEventListener("click",()=>{const n=new Date,e=_e.toDate(),t=new Date(Date.UTC(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate(),e.getUTCHours(),e.getUTCMinutes()));_e.setDate(t),os(),En.classList.remove("flash"),En.offsetWidth,En.classList.add("flash"),jc()&&Vr(),st(),kn=n.getUTCFullYear(),ni=n.getUTCMonth(),Wr()});document.addEventListener("pointerdown",n=>{if(!Ns)return;const e=n.target;e&&(e.closest("#date-cal")||e===Gr)||Wc()});document.addEventListener("keydown",n=>{n.key==="Escape"?Wc():n.key==="F2"&&(n.preventDefault(),oi=!oi,F.sunGlow.visible=oi,mn())});function Xc(){if(!St){if(ln){const t=tn.findIndex(l=>l.name===ln),i=t>=0?tn[t]:void 0;if(!i){ro.hidden=!0,oo(null);return}const[s,r,o]=Sc[t],a=Math.asin(Math.min(1,Math.max(-1,r)))*180/Math.PI;let c=Math.atan2(-o,-s)*180/Math.PI/15;c<0&&(c+=24),ro.hidden=!1,ep.textContent=`${i.name} — constellation`,sp.textContent="Center RA",rp.textContent="Center Dec",op.textContent="Stars",tp.textContent=`${c.toFixed(1)}h`,np.textContent=`${a>=0?"+":""}${a.toFixed(1)}°`,ip.textContent=`${i.stars.length} stars`,oo(null);return}ro.hidden=!0,oo(null);return}const n=Nr.get(St),e=n?ob(n,_e.t):null;if(!n||!e){ro.hidden=!0,oo(null);return}ro.hidden=!1,ep.textContent=n.name,sp.textContent="Orbit period",rp.textContent="Distance",op.textContent="Peri / Apo",tp.textContent=ab(e.periodDays),np.textContent=n.kind==="moon"?`${uo(e.distanceKm)} from ${Nr.get(n.parent??"")?.name??"parent"}`:`${uo(e.distanceKm)} from Sun`,ip.textContent=`${uo(e.perihelionKm)} / ${uo(e.aphelionKm)}`,oo(n)}function oo(n){if(ql&&(ql.replaceChildren(),!!n))for(const e of ub(n)){const t=document.createElement("div");t.className="info-row";const i=document.createElement("span");i.textContent=e.label;const s=document.createElement("span");s.className="value",s.textContent=e.value,t.append(i,s),ql.appendChild(t)}}function Yc(n){Us.value=String(n),_e.setLogSpeed(n),mn(),Gc(),st()}Us.addEventListener("input",()=>{Yc(parseFloat(Us.value))});Ec.addEventListener("click",()=>{_e.setPaused(!_e.isPaused),Ec.textContent=_e.isPaused?"Resume":"Pause",mn(),st()});vr.addEventListener("click",()=>{_e.setReversed(!_e.isReversed),vr.textContent=_e.isReversed?"Reverse ←":"Reverse →",vr.classList.toggle("active",_e.isReversed),mn(),Gc(),st()});$b.addEventListener("click",()=>{_e.setDate(new Date),os(),mn(),st()});function jc(){return!Zi.hidden}function bE(n){yr.textContent=n,yr.classList.add("computing")}function EE(){yr.classList.remove("computing")}function Vr(){if(!jc())return;const n=parseInt(Wm.value,10)||5;bE("Computing events…"),requestAnimationFrame(()=>{const e=_e.toDate().getTime(),t=n*365.25*864e5,i=(e-t-Ln)/864e5,s=(e+t-Ln)/864e5,r=Nm(i,s,{coarseStepDays:.2});TE(r)})}function TE(n){if(EE(),yr.replaceChildren(),n.length===0){const t=document.createElement("p");t.className="ev-note",t.textContent="No events in this window.",yr.appendChild(t);return}const e=document.createDocumentFragment();for(const t of n){const i=document.createElement("div");i.className="ev "+AE(t);const s=new Date(t.dateMs),r=s.getUTCFullYear(),o=String(s.getUTCMonth()+1).padStart(2,"0"),a=String(s.getUTCDate()).padStart(2,"0"),c=document.createElement("span");c.className="ev-date",c.textContent=`${r}-${o}-${a}`;const l=document.createElement("span");l.className="ev-what",l.textContent=t.title,l.title=t.detail;const u=document.createElement("span");u.className="ev-detail",u.textContent=t.detail,l.appendChild(u),i.append(c,l),i.addEventListener("click",()=>{_e.setDate(new Date(t.dateMs)),os(),st(),En.classList.remove("flash"),En.offsetWidth,En.classList.add("flash");const d=t.bodyId;if(d){const h=Ui(d);h&&Pi(h,1.4,d)}}),e.appendChild(i)}yr.appendChild(e)}function AE(n){switch(n.type){case"solar-eclipse":return"ecl-solar";case"lunar-eclipse":return"ecl-lunar";case"transit":return"transit";case"saturn-edge-on":return"saturn";default:return""}}Zu.addEventListener("click",()=>{Zi.hidden=!Zi.hidden,Zu.classList.toggle("active",!Zi.hidden),Zi.hidden||Vr(),st()});Wm.addEventListener("change",()=>{Vr()});Eo.addEventListener("change",()=>{yE()});const DE=sm(qo),wE=rm(),PE=15;let bi=-1;function CE(n){const e=[];if(!n.trim()){for(const s of DE)e.push({c:!1,id:s.id,name:s.name,sub:s.sub});for(const s of wE.slice(0,PE))e.push({c:!0,id:s.id,name:s.name,sub:s.sub});return e}const t=iM(qo,n);for(const s of t)e.push({c:!1,id:s.id,name:s.name,sub:s.parentName?`moon of ${s.parentName}`:s.kind});const i=oM(n);for(const s of i)e.push({c:!0,id:s.id,name:s.name,sub:s.sub});return e}function qm(n){return n.startsWith(Lo)?n.slice(Lo.length):Nr.get(n)?.name??n}function Os(n){ns.value=qm(n)}function Gd(){wi.hidden=!0,bi=-1}function td(){const n=wi.querySelectorAll(".fr");n.forEach((e,t)=>e.classList.toggle("active",t===bi)),n[bi]?.scrollIntoView({block:"nearest"})}function Km(n){const e=CE(n);wi.replaceChildren();const t=document.createDocumentFragment();if(e.length===0){const i=document.createElement("div");i.className="fr-empty",i.textContent="No matches",t.appendChild(i)}else for(const i of e){const s=document.createElement("div");s.className=i.c?"fr fr-const":"fr",s.innerHTML=`<span class="fr-name">${i.name}</span><span class="fr-sub">${i.sub}</span>`,s.addEventListener("click",()=>Zm(i.id)),t.appendChild(s)}wi.appendChild(t),bi=0,td(),wi.hidden=!1}function Zm(n){if(ns.value=qm(n),Gd(),ns.blur(),n.startsWith(Lo)){xE(n.slice(Lo.length));return}const e=n&&Ui(n)?n:"sun",t=Ui(e);t&&Pi(t,1.4,e)}ns.addEventListener("focus",()=>Km(ns.value));ns.addEventListener("input",()=>{Km(ns.value)});ns.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),wi.hidden?Zm(""):Gd();return}if(wi.hidden)return;const e=wi.querySelectorAll(".fr");if(n.key==="ArrowDown")n.preventDefault(),bi=Math.min(e.length-1,bi+1),td();else if(n.key==="ArrowUp")n.preventDefault(),bi=Math.max(0,bi-1),td();else if(n.key==="Enter"){n.preventDefault();const t=e[bi];t&&t.click()}});document.addEventListener("pointerdown",n=>{!wi.hidden&&!n.target?.closest("#find-wrap")&&Gd()});Ir.addEventListener("change",()=>{ii(),st()});In.addEventListener("change",()=>{ii(),st()});Hr.addEventListener("change",()=>{ii(),st()});_r.addEventListener("change",()=>{kr=_r.checked,ii(),st()});kc.addEventListener("change",()=>{ii(),st()});function RE(){jl=!jl;for(const n of F.bodies.values())n.atmosphereMesh&&(n.atmosphereMesh.visible=jl)}function hp(){mn();const n=F.skybox.group,e=n.getObjectByName("milkyway-skybox"),t=n.getObjectByName("starfield"),i=n.getObjectByName("zodiacal-light");e&&(e.visible=Dc),t&&(t.visible=Dc),i&&(i.visible=Vu)}function LE(){ja=(ja+1)%3;const n=St||"sun",e=F.bodies.get(n);if(!e)return;const t=F.camera.aspect;if(ja===2){const c=Ui(n);c&&Pi(c,.9,n);return}const i=e.radius??1,s=Math.max(i*2,.5),r=Rm([e.worldPos.x,e.worldPos.y,e.worldPos.z],s,Hi,t),o=Math.hypot(r.pos[0]-r.target[0],r.pos[1]-r.target[1],r.pos[2]-r.target[2]),a=ja===0?{pos:[r.target[0],r.target[1]+o,r.target[2]],target:r.target}:{pos:[r.target[0],r.target[1],r.target[2]+o],target:r.target};Pi(a,.9,n)}function fp(n){const e=Ui(n);e&&Pi(e,1.4,n)}function Jm(){St="",ci="",ln="",Rr="",Os(""),Xc(),st()}function qc(n){if(mn(),n.startsWith("jump-digit-")){const e=n.slice(11),t=rb(e,on,"sun");t&&fp(t);return}if(n.startsWith("jump-")){fp(n.slice(5));return}switch(n){case"pause":_e.setPaused(!_e.isPaused),Ec.textContent=_e.isPaused?"Resume":"Pause",st();break;case"speed-up":case"speed-down":{const e=n==="speed-up"?.25:-.25,t=Math.max(-3,Math.min(2.5,parseFloat(Us.value)+e));Yc(t);break}case"now":_e.setDate(new Date),os(),st();break;case"reverse":_e.setReversed(!_e.isReversed),vr.textContent=_e.isReversed?"Reverse ←":"Reverse →",vr.classList.toggle("active",_e.isReversed),Gc(),st();break;case"orbits":Ir.checked=!Ir.checked,ii(),st();break;case"labels":In.checked=!In.checked,ii(),st();break;case"belts":Hr.checked=!Hr.checked,ii(),st();break;case"figures":_r.checked=!_r.checked,kr=_r.checked,ii(),st();break;case"milkyway":Dc=!Dc,hp();break;case"zodiacal":Vu=!Vu,hp();break;case"atmospheres":RE();break;case"post":oi=!oi,F.sunGlow.visible=oi;break;case"scale":ed(Zt===ti?"visible":"real");break;case"camera-preset":LE();break;case"release":Jm();break;case"screenshot":ho.click();break;case"palette":Ur?zs():e0();break}}function IE(){if(gt||!Ya||!Mr)return;Mr.hidden=!1,Mr.setAttribute("aria-hidden","false"),Ya.hidden=!1,Ya.style.opacity="0",Ki&&(Ki.hidden=!1);const n=Go("system"),e={pos:[n.pos[0]*3,n.pos[1]*3,n.pos[2]*3]};F.camera.position.set(e.pos[0],e.pos[1],e.pos[2]),F.controls.target.set(0,0,0),gt={leg:0,titleEl:Ya,tail:!1,tailT:0,tailFromSpeed:0},F.controls.enabled=!1,sc=0,Qm(0)}function Qm(n){if(!gt)return;const e=Cd[n],t=Ui(e.bodyId)??Go("system");n===0&&(t.pos=[t.pos[0]*e.zoom,t.pos[1]*e.zoom,t.pos[2]*e.zoom]),St=e.bodyId,Os(e.bodyId),ci=e.bodyId,ln="",gt.leg=n,F.controls.enabled=!1,an=Jo([F.camera.position.x,F.camera.position.y,F.camera.position.z],[F.controls.target.x,F.controls.target.y,F.controls.target.z],t,e.duration,e.bodyId,F.camera.fov,Hi,!0)}let sc=0;function HE(n){if(gt){if(sc+=n,gt.titleEl&&(gt.titleEl.style.opacity=String($3(sc))),gt.tail){gt.tailT+=n,UE(gt.tailT),gt.tailT>=Uo&&Wo(!1);return}sc>Lm+Uo+1.5&&Wo(!1)}}function UE(n){Kc(),ia();const e=d0(),{span0Days:t,spanLenDays:i}=Nd(e),s=Math.min(1,Math.max(0,(_e.t-t)/i));Yd(s);const r=tb(n);ri.style.boxShadow=r>.01?`0 0 ${18*r}px ${6*r}px rgba(120, 200, 255, ${.55*r})`:"";const o=gt?.tailFromSpeed??0;Yc(eb(n,o,1.5)),NE(r,s)}function NE(n,e){if(n<=.01)return;let t=document.getElementById("intro-tail-marker");t||(t=document.createElement("div"),t.id="intro-tail-marker",tE.appendChild(t)),t.style.left=`${e*100}%`;const i=.6+.8*n;t.style.transform=`translate(-50%, -50%) scale(${i})`,t.style.opacity=String(n)}function OE(){gt&&(gt.leg<Cd.length-1?Qm(gt.leg+1):(gt.tail=!0,gt.tailT=0,gt.tailFromSpeed=parseFloat(Us.value)||0,mn()))}function Wo(n){if(!gt)return;const e=gt.titleEl;gt=null;try{sessionStorage.setItem(Im,"1")}catch{}ri.style.boxShadow="";const t=document.getElementById("intro-tail-marker");if(t&&t.remove(),n&&ri.classList.remove("visible"),Mr&&(Mr.hidden=!0,Mr.setAttribute("aria-hidden","true")),!(St==="earth")){const r=Ui("earth");if(r){St="earth",Os("earth"),ci="earth",ln="",an=Jo([F.camera.position.x,F.camera.position.y,F.camera.position.z],[F.controls.target.x,F.controls.target.y,F.controls.target.z],r,n?.6:1,"earth",F.camera.fov,Hi),F.controls.enabled=!1,e&&(e.style.opacity="0",e.hidden=!0),Ki&&(Ki.hidden=!0),st();return}}F.controls.enabled=!0,F.controls.update();const s=F.bodies.get(St);s&&F.controls.target.copy(s.worldPos),e&&(e.style.opacity="0",e.hidden=!0),Ki&&(Ki.hidden=!0),st()}for(const n of["pointerdown","wheel","touchstart"])Gt.addEventListener(n,()=>{gt&&Wo(!0)});window.addEventListener("keydown",n=>{if(!gt||n.key==="/"||n.key==="?"||n.ctrlKey||n.metaKey||n.altKey)return;const e=n.target?.tagName;e==="INPUT"||e==="TEXTAREA"||Wo(!0)});Ki&&Ki.addEventListener("click",()=>Wo(!0));window.addEventListener("keydown",n=>{if(n.ctrlKey||n.metaKey||n.altKey)return;const e=n.target?.tagName;if(e==="INPUT"||e==="TEXTAREA")return;if(n.key==="/"||n.key==="?"){n.preventDefault(),Ur?zs():e0();return}if(n.key==="Escape"){Ur?zs():Jm();return}const t=n.key.length===1?n.key.toLowerCase():n.key,i=sb(t);i&&(n.preventDefault(),qc(i))});function $m(n,e,t,i){if(!i)return!0;const s=i.toLowerCase();return n.includes(s)||e.toLowerCase().includes(s)||t.toLowerCase().includes(s)}function rc(){if(!po)return;po.replaceChildren();const n=Ac.trim();let e=0;for(let t=0;t<Fo.length;t++){const i=Fo[t];if(!$m(i.id,i.label,i.hint,n))continue;const s=document.createElement("div");s.className="pal-item"+(t===qi?" active":"");const r=document.createElement("span");r.className="pal-keys",r.textContent=i.keys.join(" ")||"•";const o=document.createElement("span");o.className="pal-label",o.textContent=i.label;const a=document.createElement("span");a.className="pal-hint",a.textContent=i.hint,s.append(r,o,a),s.addEventListener("click",()=>{qc(i.id),zs()}),po.appendChild(s),e++}if(e===0){const t=document.createElement("div");t.className="pal-empty",t.textContent="No matching commands",po.appendChild(t)}}function e0(){!zo||!As||!po||(Ur=!0,Ac="",qi=0,zo.hidden=!1,As.value="",Fo=ib(on.map(n=>({id:n.id,name:n.name}))).map(n=>({id:n.id,label:n.label,keys:n.keys,hint:n.hint})),rc(),requestAnimationFrame(()=>As.focus()))}function zs(){zo&&(Ur=!1,zo.hidden=!0)}As&&(As.addEventListener("input",()=>{Ac=As.value,qi=0,rc()}),As.addEventListener("keydown",n=>{if(n.stopPropagation(),n.key==="Escape")zs();else if(n.key==="ArrowDown")n.preventDefault(),qi=Math.min(Fo.length-1,qi+1),rc();else if(n.key==="ArrowUp")n.preventDefault(),qi=Math.max(0,qi-1),rc();else if(n.key==="Enter"){n.preventDefault();const e=Ac.trim();let t=0;for(const i of Fo)if($m(i.id,i.label,i.hint,e)){if(t===qi){qc(i.id),zs();break}t++}}}));document.addEventListener("pointerdown",n=>{Ur&&zo&&!n.target?.closest("#palette")&&zs()});window.addEventListener("resize",()=>{mn(),F.camera.aspect=window.innerWidth/window.innerHeight,F.camera.updateProjectionMatrix(),F.renderer.setSize(window.innerWidth,window.innerHeight),F.post.setSize(window.innerWidth,window.innerHeight);const n=window.innerWidth<560;n!==Ku&&(Ku=n,kd())});const Ze=hb(window.location.href);Ze.timeMs!=null&&_e.setDate(new Date(Ze.timeMs));if(Ze.speedLog!=null){const n=Math.max(-3,Math.min(2.5,Ze.speedLog));Us.value=String(n),_e.setLogSpeed(n)}Ze.reversed!=null&&(_e.setReversed(Ze.reversed),vr.textContent=Ze.reversed?"Reverse ←":"Reverse →");Ze.scale&&(Zt=Ze.scale==="true"?ti:ws);Ze.orbits!=null&&(Ir.checked=Ze.orbits);Ze.labels!=null&&(In.checked=Ze.labels);new URL(window.location.href,"http://localhost").searchParams.get("post")==="0"&&(oi=!1);Ze.belts!=null&&(Hr.checked=Ze.belts);Ze.figures!=null&&(_r.checked=Ze.figures,kr=Ze.figures);Ze.dof!=null&&(kc.checked=Ze.dof);Ze.paused!=null&&(_e.setPaused(Ze.paused),Ec.textContent=Ze.paused?"Resume":"Pause");Ze.eventsOpen!=null&&(Zi.hidden=!Ze.eventsOpen,Zu.classList.toggle("active",Ze.eventsOpen));Zi.hidden||Vr();const oc=Ze.constellation&&tn.some(n=>n.name===Ze.constellation)?Ze.constellation:null;Ze.follow&&Nr.has(Ze.follow)?(Os(Ze.follow),St=Ze.follow,ci=Ze.follow):oc||(Os("sun"),St="sun",ci="sun");oc&&(ln=oc,Os(`const:${oc}`),Rr="");function t0(){return{timeMs:_e.toDate().getTime(),speedLog:parseFloat(Us.value),reversed:_e.isReversed,follow:St||void 0,constellation:ln||void 0,scale:Zt===ti?"true":"visible",orbits:Ir.checked,labels:In.checked,belts:Hr.checked,figures:kr,dof:kc.checked,paused:_e.isPaused,eventsOpen:!Zi.hidden,cam:{pos:[F.camera.position.x,F.camera.position.y,F.camera.position.z],target:[F.controls.target.x,F.controls.target.y,F.controls.target.z]}}}let Ql;function st(){Ql===void 0&&(Ql=setTimeout(()=>{Ql=void 0,window.history.replaceState(null,"",Um(window.location.href,t0()))},300))}Xa.addEventListener("click",async()=>{const n=Um(window.location.href,t0());window.history.replaceState(null,"",n);try{await navigator.clipboard.writeText(n),Xa.textContent="Link copied ✓"}catch{Xa.textContent="Link in address bar"}setTimeout(()=>{Xa.textContent="Copy share link"},1500)});ho.addEventListener("click",async()=>{const n=F.renderer.domElement,e=_e.toDate(),t=c=>String(c).padStart(2,"0"),i=`${e.getUTCFullYear()}-${t(e.getUTCMonth()+1)}-${t(e.getUTCDate())}T${t(e.getUTCHours())}${t(e.getUTCMinutes())}Z`,s=[Hs,Lr].filter(c=>!!c&&In.checked);let r=n;if(s.length>0){r=document.createElement("canvas"),r.width=n.width,r.height=n.height;const c=r.getContext("2d");c.drawImage(n,0,0);for(const l of s)c.drawImage(l.canvas,0,0,n.width,n.height)}const o=await new Promise(c=>r.toBlob(l=>c(l),"image/png"));if(!o){ho.textContent="Export failed";return}const a=document.createElement("a");a.href=URL.createObjectURL(o),a.download=`solar-system-${i}.png`,a.click(),setTimeout(()=>URL.revokeObjectURL(a.href),5e3),ho.textContent="Saved ✓",setTimeout(()=>{ho.textContent="Save screenshot"},1500)});mE(Zt);F.sunGlow.visible=oi;function n0(n){try{Pc=QM(n),wm(F,Pc,_e.t,Zt)}catch(e){console.warn("[iss] TLE parse failed:",e)}}n0(x3);_3().then(n=>{n&&n0(n)}).catch(n=>console.warn("[iss] TLE fetch failed, using fallback:",n));Hs=H3(Gt);Hs.setVisible(In.checked);Lr=D3(Gt);Lr.setVisible(In.checked);vE();Bd();Ze.cam&&(F.camera.position.set(...Ze.cam.pos),F.controls.target.set(...Ze.cam.target),F.controls.update());Gc();kd();const $i=new URLSearchParams(window.location.search).get("cmd")?.toLowerCase()??null,i0=new Set(Rd.map(n=>n.id));i0.add("palette");const s0=$i!=null&&/^[0-9]$/.test($i),r0=$i!=null&&(s0||i0.has($i));$i&&r0&&qc(s0?`jump-digit-${$i}`:$i);{const n=window.matchMedia("(prefers-reduced-motion: reduce)").matches,e=new URLSearchParams(window.location.search).get("intro"),t=!!Ze.follow||!!Ze.constellation||!!Ze.cam||!!($i&&r0);let i=!1;try{i=sessionStorage.getItem(Im)==="1"}catch{}Q3(n,e,t,i)&&IE()}window.__solar={get scene(){return F.scene},get camera(){return F.camera},get controls(){return F.controls},get renderer(){return F.renderer},get labelLayer(){return Hs},get bodies(){return F.bodies},satelliteExtentScene:n=>Pm(n,Zt),clock:_e};const Cc=new im,Rc=new be;let o0=0,a0=0,Wd=!1,pp=0,Vd=!1;function c0(){const n=[];for(const e of F.bodies.values())n.push(e.mesh);return n}function zE(n,e){fo.innerHTML=`${n}${e?`<span class="sub"> ${e}</span>`:""}`,fo.style.left=`${o0}px`,fo.style.top=`${a0}px`,fo.classList.add("show")}function Lc(){fo.classList.remove("show")}function FE(){if(!Wd||Vd){Lc();return}Cc.setFromCamera(Rc,F.camera);const n=Cc.intersectObjects(c0(),!1);if(n.length>0){const e=n[0].object.userData.id,t=e?Nr.get(e):void 0;if(t){const i=t.kind==="moon"?`moon of ${Nr.get(t.parent??"")?.name??""}`:t.kind.charAt(0).toUpperCase()+t.kind.slice(1);zE(t.name,i);return}}Lc()}Gt.addEventListener("pointermove",n=>{Wd=!0,o0=n.clientX,a0=n.clientY,Rc.set(n.clientX/window.innerWidth*2-1,-(n.clientY/window.innerHeight)*2+1);const e=performance.now();e-pp<50||(pp=e,FE())});Gt.addEventListener("pointerleave",()=>{Wd=!1,Lc()});Gt.addEventListener("pointerdown",()=>{Vd=!0,Lc()});window.addEventListener("pointerup",()=>{Vd=!1});let l0=0,u0=0;Gt.addEventListener("pointerdown",n=>{l0=n.clientX,u0=n.clientY});Gt.addEventListener("pointerup",n=>{if(ac)return;if(Or){Or=!1;return}if(n.pointerType==="touch"&&Bt.size>1||n.button===2||Math.hypot(n.clientX-l0,n.clientY-u0)>6)return;const e=Gt.getBoundingClientRect();Rc.set((n.clientX-e.left)/e.width*2-1,-((n.clientY-e.top)/e.height)*2+1),Cc.setFromCamera(Rc,F.camera);const t=Cc.intersectObjects(c0(),!1);if(t.length>0){const i=t[0].object.userData.id,s=i?Ui(i):null;s&&Pi(s,1.4,i)}});let pn=null,Or=!1;function Xd(){Od.classList.remove("scrubbing"),Gr.classList.remove("hot"),zd.classList.remove("hot"),Ci=null,mo.clear(),Vo=[],Xu.replaceChildren(),km.style.width="0%",Gm.style.left="0%",jd(),h0(),ri.classList.remove("visible")}let Ci=null;const mo=new Set;let ta=0,na=365,Vo=[];function d0(){return new Date(Ln+_e.t*864e5).getUTCFullYear()}function Kc(){ri.classList.contains("visible")||ri.classList.add("visible")}function Yd(n){Gm.style.left=`${n*100}%`,km.style.width=`${n*100}%`}function $l(n){const{span0Days:e,spanLenDays:t}=Nd(n);ta=e,na=t;const i=Fm(n)?Bm(n).events:[],{markers:s,overflow:r,caretFrac:o}=Bc(e,t,i,_e.t);Yu.textContent=String(n),Xu.replaceChildren();const a=ea.clientWidth||window.innerWidth,l=Math.max(1,a-2*12),u=document.createDocumentFragment();Vo=[];for(const d of s){const h=document.createElement("span");h.className="tl-event",h.style.left=`${d.frac*100}%`,h.textContent=d.emoji,h.title=d.title,u.appendChild(h),Vo.push({day:d.frac*t,x:d.frac*l,emoji:d.emoji,title:d.title})}if(r>0){const d=document.createElement("span");d.className="tl-overflow",d.textContent=`+${r}`,u.appendChild(d)}Xu.appendChild(u),Yd(o)}const BE=0,kE=120,GE=24,WE=Ib(365);function jd(){cr.classList.remove("show")}function h0(){ju.classList.remove("show"),ic.getContext("2d")?.clearRect(0,0,ic.width,ic.height)}function VE(n){const e=ic,t=window.devicePixelRatio||1,i=rn*2;(e.width!==i*t||e.height!==i*t)&&(e.width=Math.round(i*t),e.height=Math.round(i*t));const s=e.getContext("2d");if(!s)return;s.setTransform(t,0,0,t,0,0),s.clearRect(0,0,i,i);const r=ea.clientWidth||window.innerWidth,o=12,a=Math.max(1,r-2*o),c=Bc(ta,na,[],_e.t).caretFrac,l=n-o;s.lineCap="round",s.strokeStyle="rgba(160, 190, 220, 0.5)",s.lineWidth=20,s.beginPath(),s.moveTo(2,rn),s.lineTo(i-2,rn),s.stroke();for(const u of WE){const d=u.frac*a-l,h=Wa(d,0);if(!h)continue;const f=rn+h.x;s.strokeStyle="rgba(120, 150, 200, 0.55)",s.lineWidth=Math.max(1,h.scale),s.beginPath(),s.moveTo(f,rn-4.5*h.scale),s.lineTo(f,rn+4.5*h.scale),s.stroke();const g=Wa(d,9);g&&(s.save(),s.translate(rn+g.x,rn+g.y),s.rotate(Math.PI/4),s.scale(g.scale,g.scale),s.fillStyle="#7d90ad",s.font="10px system-ui, sans-serif",s.fillText(u.abbr,0,9),s.restore())}for(const u of Vo){const d=u.x-l,h=Wa(d,0);h&&(s.save(),s.translate(rn+h.x,rn+h.y),s.scale(h.scale,h.scale),s.font="13px system-ui, sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText(u.emoji,0,0),s.restore())}if(ri.classList.contains("visible")){const u=c*a-l,d=Wa(u,0);if(d){const h=rn+d.x;s.fillStyle="#57c785",s.shadowColor="rgba(87, 199, 133, 0.7)",s.shadowBlur=6*d.scale;const f=Math.max(2,3*d.scale);s.fillRect(h-f/2,rn-7.5*d.scale,f,15*d.scale),s.shadowBlur=0}}}function XE(){const n=ea.clientWidth||window.innerWidth,e=12,t=Math.max(1,n-2*e),i=Bc(ta,na,[],_e.t).caretFrac;return e+i*t}function f0(n){if(Ci===null)return;const e=ea.getBoundingClientRect();if(e.width<2)return;const t=e.width,i=!!(pn?.movedX||Ni?.live),s=Math.max(0,Math.min(t,n-e.left)),r=Kf(i?XE():s,t),o=r-12,a=Hb(Vo,o,GE);if(a){const l=qf(Ci,a.day);cr.innerHTML=`<span class="tl-tip-date">${l}</span>${a.emoji} ${a.title}`;const u=Od.getBoundingClientRect(),d=cr.offsetWidth,h=u.right-4,f=Math.max(12,h-d);cr.style.left=`${f}px`,cr.style.top=`${u.bottom+6}px`,cr.classList.add("show")}else jd();ju.style.left=`${r-rn}px`,VE(r);const c=i?Math.max(0,_e.t-ta):r/t*na;nE.textContent=qf(Ci,c),ju.classList.add("show")}function YE(){Ci!==null&&(ia(),Kc(),f0(Number.POSITIVE_INFINITY))}window.addEventListener("pointermove",n=>{if(n.pointerType!=="mouse")return;const e=ea.getBoundingClientRect();n.clientY>=e.top-BE&&n.clientY<=e.bottom+kE?(ia(),ri.classList.contains("hover")||ri.classList.add("hover"),f0(n.clientX)):(jd(),h0(),ri.classList.remove("hover"))});function ia(){const n=d0();if(!(n===Ci&&!mo.has(n))){if(Ci=n,Fm(n)){$l(n);return}mo.has(n)||(mo.add(n),$l(n),requestAnimationFrame(()=>{mo.delete(n),Bm(n),Ci===n&&$l(n)}))}}function jE(){if(Ci===null)return;const{caretFrac:n}=Bc(ta,na,[],_e.t);Yd(n)}function p0(n,e,t){let i=!1;const s=!n.movedX&&Math.abs(e)>6,r=!n.movedY&&Math.abs(t)>4;return s&&(n.movedX=!0),r&&(n.movedY=!0),(s||r)&&Od.classList.add("scrubbing"),n.movedX&&(Gr.classList.add("hot"),_e.setDate(new Date(Ln+Db(n.startDays,n.span0Days,n.spanLenDays,e)*864e5)),i=!0),n.movedY&&(zd.classList.add("hot"),Yc(wb(n.startLog,t)),i=!0),i}Gt.addEventListener("contextmenu",n=>n.preventDefault());Gt.addEventListener("pointerdown",n=>{if(Or=!1,n.pointerType!=="mouse"||n.button!==2)return;const e=new Date(Ln+_e.t*864e5).getUTCFullYear(),t=Om(e);pn={startX:n.clientX,startY:n.clientY,startDays:_e.t,startLog:_e.getLogSpeed(),movedX:!1,movedY:!1,span0Days:t.span0Days,spanLenDays:t.spanLenDays},_e.beginScrub()});window.addEventListener("pointermove",n=>{if(!pn||n.pointerType!=="mouse"||!(n.buttons&4))return;const e=n.clientX-pn.startX,t=n.clientY-pn.startY;p0(pn,e,t)&&(ko=performance.now(),st()),(pn.movedX||pn.movedY)&&(Kc(),ia())});window.addEventListener("pointerup",n=>{if(!pn||n.pointerType!=="mouse"||n.button!==2)return;const e=pn;pn=null,_e.endScrub(),(e.movedX||e.movedY)&&(os(),Or=!0),Xd()});window.addEventListener("pointercancel",n=>{!pn||n.pointerType!=="mouse"||(pn=null,_e.endScrub(),Xd())});const Bt=new Map;let Ni=null,ac=!1;function m0(n){const e=Ni;!e||e.ended||(e.ended=!0,_e.endScrub(),n&&(os(),Or=!0),Xd())}Gt.addEventListener("pointerdown",n=>{if(n.pointerType!=="touch"||Bt.size>=4||(Bt.set(n.pointerId,{x:n.clientX,y:n.clientY}),Bt.size!==3))return;const e=[...Bt.values()],t=(e[0].x+e[1].x+e[2].x)/3,i=(e[0].y+e[1].y+e[2].y)/3,s=new Date(Ln+_e.t*864e5).getUTCFullYear(),r=Om(s);Ni={startX:t,startY:i,startDays:_e.t,startLog:_e.getLogSpeed(),movedX:!1,movedY:!1,live:!1,ended:!1,span0Days:r.span0Days,spanLenDays:r.spanLenDays},_e.beginScrub()});Gt.addEventListener("pointermove",n=>{if(n.pointerType!=="touch"||!Bt.has(n.pointerId))return;Bt.set(n.pointerId,{x:n.clientX,y:n.clientY});const e=Ni;if(!e||e.ended||Bt.size<3)return;const t=[...Bt.values()],i=(t[0].x+t[1].x+t[2].x)/3,s=(t[0].y+t[1].y+t[2].y)/3;p0(e,i-e.startX,s-e.startY)&&(e.live=!0,ko=performance.now(),st()),(e.movedX||e.movedY)&&(Kc(),ia(),YE())});window.addEventListener("pointerup",n=>{if(n.pointerType!=="touch"||ac||Bt.size===0)return;const e=Bt.size>=3;Bt.delete(n.pointerId);const t=Ni;if(t&&e&&!t.ended&&(Or=!0,m0(t.live),Ni=null,Bt.size===2)){const i=[...Bt.keys()][0],s=Bt.get(i);ac=!0,Gt.dispatchEvent(new PointerEvent("pointerup",{pointerId:i,pointerType:"touch",clientX:s.x,clientY:s.y})),Gt.dispatchEvent(new PointerEvent("pointerdown",{pointerId:i,pointerType:"touch",clientX:s.x,clientY:s.y})),ac=!1}});window.addEventListener("pointercancel",n=>{if(n.pointerType!=="touch")return;Bt.delete(n.pointerId);const e=Ni;e&&!e.ended&&Bt.size<3&&m0(e.live),e&&Bt.size<3&&(Ni=null)});function qE(){if(!Hs||!In.checked)return;const n=F.camera,e=n.position,t=e.x,i=e.y,s=e.z,r=bm(e.length()),o=ln?tn.findIndex(c=>c.name===ln):-1,a=[];for(let c=0;c<tn.length;c++){const l=bc[c];if(Td(l)*r<=ku)continue;const u=qb[c],d=t*u[0]+i*u[1]+s*u[2],h=Math.sqrt(Rt*Rt+(t*t+i*i+s*s)-2*Rt*d);Yl.set(e,$f.set(u[0]*Rt-t,u[1]*Rt-i,u[2]*Rt-s).normalize());let f=!1;const g=$f;for(const x of F.bodies.values()){if(!x.mesh.visible)continue;const m=x.worldPos,p=m.x-t,y=m.y-i,v=m.z-s,b=Math.sqrt(p*p+y*y+v*v);if(b<1e-6)continue;const L=1/b,A=p*L,w=y*L,I=v*L,E=w*g.z-I*g.y,S=I*g.x-A*g.z,C=A*g.y-w*g.x,O=Math.sqrt(Math.min(1,E*E+S*S+C*C)),z=Math.max(1,x.frameExtent>0?x.frameExtent/2:x.sceneRadius);if(O>(z+2)/b)continue;Yl.far=b*2;const X=Yl.intersectObject(x.mesh,!1);if(X.length>0&&X[0].distance<h){f=!0;break}}a.push({name:tn[c].name,dir:u,emphasis:l,emphasized:o>=0?c===o:!1,occluded:f})}O3(Hs,n,a,r,window.innerWidth,window.innerHeight)}const mp=new R,Ka=new R;function KE(){if(!Lr||!In.checked)return;const n=F.camera,e=n.position,t=window.innerWidth,i=window.innerHeight,s=[];for(const r of F.bodies.values()){if(!r.mesh.visible)continue;const o=r.worldPos,a=e.distanceTo(o);Ka.copy(o).sub(e).normalize(),mp.copy(o);const c=Bu(mp,n,t,i);if(!c.ok)continue;Ka.copy(o).addScaledVector(Ka,-r.sceneRadius);const l=Bu(Ka,n,t,i),u=l.ok?Math.hypot(l.x-c.x,l.y-c.y):0,d=r.def.id===ci?0:r.def.kind==="star"||r.def.kind==="planet"?1:2;s.push({id:r.def.id,name:r.def.name,world:o,dist:a,discRadiusPx:u,tier:d})}w3(Lr,n,s,t,i)}function g0(){if(requestAnimationFrame(g0),Fd)return;const n=performance.now(),e=Math.min(.1,(n-Ju)/1e3);Ju=n,cp||(_i.x=F.camera.position.x,_i.y=F.camera.position.y,_i.z=F.camera.position.z,Mi.x=F.controls.target.x,Mi.y=F.controls.target.y,Mi.z=F.controls.target.z,cp=!0),gt&&HE(e),_e.tick(e);const t=_e.t-ap;ap=_e.t;let i=Zt;if($e){$e.dir!==0&&($e.p=Math.min(1,Math.max(0,$e.p+$e.dir*e/hE)),($e.dir===1&&$e.p>=1||$e.dir===-1&&$e.p<=0)&&pE());const a=$e.dir===0?1:Pd($e.p);i=CS(ws,ti,a),u3(F,a);for(const c of F.bodies.values())c.orbit&&d3(c.orbit,i,c.parent?c.def.id:null);$e.dir===0?$e.reframed||($e.reframed=!0,an=Jo([F.camera.position.x,F.camera.position.y,F.camera.position.z],[F.controls.target.x,F.controls.target.y,F.controls.target.z],Go("system"),1.2,null,F.camera.fov,Hi),F.controls.enabled=!1):an&&$e.reframed&&(an=null,F.controls.enabled=!0,F.controls.update())}{const a=performance.now();if(a-ko>250){ko=a;const c=F.bodies.get("moon");c?.orbit&&Dm(c.orbit,_e.t,i);const l=F.bodies.get("iss");l?.orbit&&l.satellite&&wd(l.orbit,l.satellite,_e.t,i)}}if(Em(F,_e.t,i),_e.isPaused||Am(F,_e.t,i,F.camera.position.length()),h3(F,t),an){F.controls.enabled=!1;let a;if(an.followId){const u=F.bodies.get(an.followId);u&&(a=[u.worldPos.x,u.worldPos.y,u.worldPos.z])}const c=W3(an,e,a),l=c.target;if(F.controls.target.set(l[0],l[1],l[2]),F.camera.position.set(l[0]+c.offset[0],l[1]+c.offset[1],l[2]+c.offset[2]),Math.abs(F.camera.fov-c.fov)>.001&&(F.camera.fov=c.fov,F.camera.updateProjectionMatrix()),F.camera.lookAt(l[0],l[1],l[2]),c.done){if(an=null,gt)OE();else if(yc)yc=!1,Vb();else if(F.controls.enabled=!0,F.controls.update(),St){const u=F.bodies.get(St);u&&F.controls.target.copy(u.worldPos)}st()}}else if(Qi)Xb(e);else if(St){const a=F.bodies.get(St),c=a&&Bo.has(St)?F.bodies.get(Bo.get(St)):a;c&&F.controls.target.lerp(c.worldPos,.2),F.controls.update()}else F.controls.update();{const a=F.camera.position,c=F.controls.target;if(Kl=Math.abs(a.x-_i.x)+Math.abs(a.y-_i.y)+Math.abs(a.z-_i.z)+Math.abs(c.x-Mi.x)+Math.abs(c.y-Mi.y)+Math.abs(c.z-Mi.z)>1e-4,_e.isPaused&&Kl&&l3(F,i,a.length()),!Qu&&db({paused:_e.isPaused,cameraMoving:Kl,scrubbing:!!(pn?.movedX||Ni?.live),flightActive:an!==null,morphActive:$e!==null,skyTourActive:Qi!==null,introActive:gt!==null}))return;_i.x=a.x,_i.y=a.y,_i.z=a.z,Mi.x=c.x,Mi.y=c.y,Mi.z=c.z,Qu=!1}Kb(),Zb(n),Jb(n),m3(F,ci,n/1e3),F.sunShader.setTime(n/1e3),_E();const o=F.camera.position.length()<=170;if(o!==F.sunLight.castShadow&&(F.sunLight.castShadow=o),F.skybox.update(F.camera),oi?F.post.composer.render():F.renderer.render(F.scene,F.camera),qE(),KE(),kd(),Ns){const a=_e.toDate();if(a.getUTCFullYear()===kn&&a.getUTCMonth()===ni){const c=a.getUTCDate();c!==qu&&(qu=c,Wr())}}jE(),Xc()}requestAnimationFrame(g0);Gt.addEventListener("webglcontextlost",n=>{n.preventDefault(),Fd=!0,Tc.hidden=!1,Tc.classList.add("show")});Gt.addEventListener("webglcontextrestored",()=>{Fd=!1,mn(),Tc.hidden=!0,Tc.classList.remove("show"),F.renderer.setSize(window.innerWidth,window.innerHeight),Ju=performance.now()});eE.addEventListener("click",()=>window.location.reload());
