import math

# ================= FINAL FORMULAS (mirror of src/render/visibleScale.ts) =================
SUN_R = 1.35
def planetR(km): return 0.8 + 0.45*math.log10(km/100.0 + 1.0)
def moonR(km):   return max(0.08, 0.08 + 0.09*math.log10(km/100.0 + 1.0))
def baseMoon(dkm): return 0.9 + 1.7*math.sqrt(dkm/400000.0)   # g(d): radial remap
GAP_MOON = 0.15
MARGIN   = 0.50   # extra buffer between adjacent planet orbits (visual separation)
GAP_BODY = 0.40
S_TNO = 2.6          # slope [neptune anchor, pluto anchor]: clears Neptune's
                     # moon stack at Haumea/Makemake/Eris perihelia
TNO_MIN_STEP = 2.0   # min anchor spacing between trans-Neptunian ellipses

# ---------------- real data (src/data/bodies.ts) ----------------
PLANETS = [
 ("mercury", 0.38709843, 0.20563661, 2439.7, 0),
 ("venus",   0.72332102, 0.00676399, 6051.8, 0),
 ("earth",   1.00000018, 0.01673163, 6371.0, 0),
 ("mars",    1.52371243, 0.09336511, 3389.5, 0),
 ("ceres",   2.7675,     0.0758,     469.7,  0),
 ("jupiter", 5.20248019, 0.0485359,  69911,  0),
 ("saturn",  9.54149883, 0.05550825, 58232,  2.27),
 ("uranus",  19.18797948,0.0468574,  25362,  2.0),
 ("neptune", 30.06952752,0.00895439, 24622,  0),
 ("pluto",   39.48211675,0.2488273,  1188.3, 0),
 ("haumea",  43.11,      0.1948,     745,    0),
 ("makemake",45.43,      0.1611,     715,    0),
 ("eris",    67.864,     0.436,      1163,   0),
]
MOONS = [
 ("moon",384400,0.0549,1737.4,"earth"),
 ("phobos",9376,0.0151,11.27,"mars"),("deimos",23460,0.0003,6.2,"mars"),
 ("amalthea",181353,0.0761,85.5,"jupiter"),("io",421700,0.0041,1821.6,"jupiter"),
 ("europa",671100,0.009,1560.8,"jupiter"),("ganymede",1070400,0.0013,2634.1,"jupiter"),
 ("callisto",1882700,0.0074,2410.3,"jupiter"),("himalia",11509150,0.1137,85.0,"jupiter"),
 ("enceladus",237948,0.0047,252.1,"saturn"),("tethys",294600,0.0001,531.1,"saturn"),
 ("dione",377300,0.0022,561.4,"saturn"),("rhea",527108,0.0013,763.8,"saturn"),
 ("titan",1221870,0.0288,2574.7,"saturn"),("iapetus",3560820,0.0286,734.5,"saturn"),
 ("miranda",129390,0.0013,235.8,"uranus"),("ariel",190900,0.0012,578.9,"uranus"),
 ("umbriel",266000,0.0039,584.7,"uranus"),("titania",435910,0.0011,788.4,"uranus"),
 ("oberon",583520,0.0008,761.4,"uranus"),
 ("triton",354759,0.000016,1353.4,"neptune"),("nereid",5513700,0.7482,170.0,"neptune"),
]
IRREG = {"himalia","iapetus","nereid"}
TNO = {"pluto","haumea","makemake","eris"}

order=[p[0] for p in PLANETS]
a  ={p[0]:p[1] for p in PLANETS}; ec={p[0]:p[2] for p in PLANETS}
R  ={p[0]:planetR(p[3]) for p in PLANETS}
EXT={p[0]:(R[p[0]]*p[4] if p[4]>0 else R[p[0]]) for p in PLANETS}
peri={p:a[p]*(1-ec[p]) for p in order}; apo={p:a[p]*(1+ec[p]) for p in order}

def crosses(i,o):
    i0,o0=min(i,o),max(i,o)
    return (i0=="neptune" and o0 in TNO) or (i0 in TNO and o0 in TNO)

byParent={}
for m,ak,e,r,p in MOONS: byParent.setdefault(p,[]).append((m,ak,e,r))

# ============ PHASE 1: moon floors/offsets (floor-stack per parent) ============
# Each moon's displayed orbit radius is clamp(baseMoon(d), floor, cap - r).
# floor: clears the parent surface (perigee-aware) and the inner sibling's
#        outer surface; cap: keeps the moon inside the corridor to the next
#        orbit (computed in phase 3).
FLOOR={}; OFF={}
for p,lst in byParent.items():
    regs=sorted([x for x in lst if x[0] not in IRREG], key=lambda t:t[1])
    irr =sorted([x for x in lst if x[0] in IRREG],  key=lambda t:t[1])
    seq=regs+irr
    for k,(m,ak,e,r) in enumerate(seq):
        if k==0:
            fl = EXT[p]+moonR(r)+GAP_BODY
        else:
            pm,_,_,r2=seq[k-1]
            fl = OFF[pm]+moonR(r2)+moonR(r)+GAP_MOON
        # eccentric moons: perigee must still clear the parent surface
        fl = max(fl, (EXT[p]+moonR(r)+GAP_BODY*0.5)/max(1e-9,1-e))
        FLOOR[m]=fl
        OFF[m]=max(baseMoon(ak*(1+e)), fl)

def stack_outer(p):
    if p not in byParent: return 0.0
    return max(OFF[m]+moonR(r) for m,_,_,r in byParent[p])
def envelope(p):
    return max(EXT[p], stack_outer(p))

print("== moon offsets (final) ==")
for p,lst in byParent.items():
    print(f" {p}: stack_outer={stack_outer(p):.3f} envelope={envelope(p):.3f}")
    for m,ak,e,r in sorted(lst,key=lambda t:t[1]):
        print(f"  {m:10s} a={ak:10.0f} e={e:7.4f} floor={FLOOR[m]:8.4f} off={OFF[m]:8.4f} +r={OFF[m]+moonR(r):8.4f}")

# ============ PHASE 2: planet anchors ============
D={}; D["mercury"]=5.0
def ramp(au, Dmap):
    an=sorted((a[p],Dmap[p]) for p in Dmap)
    if au<=an[0][0]: return an[0][1]
    for (a0,d0),(a1,d1) in zip(an,an[1:]):
        if au<=a1: return d0+(au-a0)/(a1-a0)*(d1-d0)
    a0,d0=an[-2]; a1,d1=an[-1]
    return d1+(au-a1)/(a1-a0)*(d1-d0)   # extend past last anchor

def need(i,o):
    # full clearance between the two orbits' worst-case apses: each body's
    # envelope = its body + rings + its outermost moon stack, plus a small
    # positive buffer so orbits are visibly separated, not exactly tangent.
    return envelope(i) + envelope(o) + MARGIN

for k in range(len(order)-1):
    o=order[k+1]; prev=order[k]
    if o=="pluto":
        # fixed steep slope so Neptune's moon stack clears the TNO perihelia
        D[o]=D[prev]+S_TNO*(a[o]-a[prev])
        continue
    lower=D[prev]+(TNO_MIN_STEP if o in TNO else 1.0)
    for i in order[:k+1]:
        if crosses(i,o): continue
        n=need(i,o)
        if peri[o] <= a[prev]:
            r0=ramp(peri[o],D)-ramp(apo[i],D)
            if r0<n: print(f"  INFEASIBLE {i}->{o}: room {r0:.3f} < need {n:.3f}")
            continue
        lo,hi=lower, lower+700
        if ramp(peri[o],{**D,o:hi})-ramp(apo[i],{**D,o:hi}) < n:
            print(f"  INFEASIBLE {i}->{o} even at hi={hi}"); continue
        for _ in range(70):
            mid=(lo+hi)/2
            if ramp(peri[o],{**D,o:mid})-ramp(apo[i],{**D,o:mid}) >= n: hi=mid
            else: lo=mid
        lower=max(lower,hi)
    D[o]=lower

print("\n== planet anchors (final) ==")
for p in order:
    print(f"  [{a[p]:.6f}, {D[p]:.6f}],  // {p}")
planetDistance=lambda au: ramp(au,D)

# ============ PHASE 3: per-parent moon caps ============
CAP={}
for p in byParent:
    idx=order.index(p); cap=None
    if idx>0:
        i=order[idx-1]
        if not crosses(i,p):
            c=planetDistance(peri[p])-planetDistance(apo[i])-envelope(i)
            cap=c if cap is None else min(cap,c)
    if idx<len(order)-1:
        n=order[idx+1]
        if not crosses(p,n):
            c=planetDistance(peri[n])-planetDistance(apo[p])-envelope(n)
            cap=c if cap is None else min(cap,c)
    CAP[p]=cap
    print(f" cap[{p}]={'%.4f'%cap if cap is not None else 'none'} stack={stack_outer(p):.4f} ok={cap is not None and cap>=stack_outer(p)}")

# ============ VERIFICATION ============
def dvis(m,d):
    p=next(x[4] for x in MOONS if x[0]==m)
    r=next(x[3] for x in MOONS if x[0]==m)
    v=baseMoon(d)
    if v<FLOOR[m]: v=FLOOR[m]
    if CAP[p] is not None:
        ce=CAP[p]-moonR(r)
        if v>ce: v=ce
    return v

fails=0
def chk(ok,msg):
    global fails
    if not ok:
        fails+=1
        print("  FAIL:",msg)

print("\n== planet adjacency (all non-crossing pairs, worst-case apse) ==")
for k in range(len(order)-1):
    i,o=order[k],order[k+1]
    if crosses(i,o):
        print(f"  X   {i}->{o}  accepted real-space radial crossing")
        continue
    r0=planetDistance(peri[o])-planetDistance(apo[i])
    n=need(i,o)
    chk(r0>=n-1e-9, f"{i}->{o} room {r0:.3f} < need {n:.3f}")
    print(f"  ok  {i}->{o} room={r0:.3f} need={n:.3f} (margin {r0-n:+.3f})")

print("\n== moons: parent clearance (perigee) + corridor (apoapsis) ==")
for p,lst in byParent.items():
    for m,ak,e,r in sorted(lst,key=lambda t:t[1]):
        vperi=dvis(m,ak*(1-e)); vapo=dvis(m,ak*(1+e))
        chk(vperi>=EXT[p]-1e-9, f"{p}/{m} perigee {vperi:.3f} inside parent extent {EXT[p]:.3f}")
        if CAP[p] is not None:
            chk(vapo+moonR(r)<=CAP[p]+1e-9, f"{p}/{m} apo surface {vapo+moonR(r):.3f} > corridor {CAP[p]:.3f}")
        print(f"  ok  {p:8s} {m:10s} peri={vperi:8.4f} apo={vapo:8.4f}")

print("\n== sibling moons (inner apo vs outer peri) ==")
for p,lst in byParent.items():
    regs=sorted([x for x in lst if x[0] not in IRREG],key=lambda t:t[1])
    irr =sorted([x for x in lst if x[0] in IRREG],key=lambda t:t[1])
    seq=regs+irr
    for k in range(len(seq)-1):
        m1,a1,e1,r1=seq[k]; m2,ak2,e2,r2=seq[k+1]
        gap=dvis(m2,ak2*(1-e2)) - dvis(m1,a1*(1+e1))
        needG=moonR(r1)+moonR(r2)+GAP_MOON
        chk(gap>=needG-1e-9, f"{p}: {m1}/{m2} gap {gap:.3f} < {needG:.3f}")
        print(f"  ok  {p:8s} {m1:10s}/{m2:10s} gap={gap:.3f} need={needG:.3f}")

print("\n== sun & belts & extent ==")
chk(planetDistance(peri['mercury'])-R['mercury']>=SUN_R+GAP_BODY, "sun->mercury")
print(f"  sun->mercury inner edge {planetDistance(peri['mercury'])-R['mercury']:.3f} >= {SUN_R+GAP_BODY:.3f}")
print(f"  asteroid belt {planetDistance(2.1):.2f}..{planetDistance(3.3):.2f}")
print(f"  kuiper belt    {planetDistance(30):.2f}..{planetDistance(48):.2f}")
maxrad=planetDistance(a['eris']*(1+ec['eris']))
print(f"  max scene radius (eris apo) = {maxrad:.2f}  -> shadow far must be >= {maxrad+2:.0f}")

print("\nTOTAL FAILS:",fails)

# ============ EMIT PER-MOON CLAMP TABLE (for visibleScale.ts) ============
print("\n== MOON_CLAMPS (per-moon, for visibleScale.ts) ==")
for p,lst in byParent.items():
    for m,ak,e,r in sorted(lst,key=lambda t:t[1]):
        eff_cap=(CAP[p]-moonR(r)) if CAP[p] is not None else float('inf')
        print(f"  {m}: {{ floor: {FLOOR[m]:.6f}, cap: {eff_cap:.6f} }},")
