#!/usr/bin/env python3
"""Batch window tests: run isolate_win.main() programmatically for a list of windows."""
import sys
import io
import contextlib
import importlib.util

spec = importlib.util.spec_from_file_location("iw", "/opt/data/solar-system-3d/assets/constellation-figures/isolate_win.py")
iw = importlib.util.module_from_spec(spec)

TESTS = [
    # (path, fx0, fy0, fx1, fy1, label)
    ("src/Orion_und_Haase.jpg", 0.05, 0.15, 0.60, 0.85, "ORION left-half"),
    ("src/Orion_und_Haase.jpg", 0.10, 0.25, 0.55, 0.80, "ORION tight"),
    ("src/Ursa_Major.jpg", 0.05, 0.10, 0.95, 0.95, "UMA full"),
    ("src/Ursa_Major.jpg", 0.15, 0.15, 0.85, 0.80, "UMA tight"),
    ("src/Cygnus_Lacerta_and_Lyra.jpg", 0.30, 0.20, 0.90, 0.80, "CYG+LYR mid-right"),
    ("src/Cygnus_Lacerta_and_Lyra.jpg", 0.55, 0.25, 0.95, 0.65, "LYRA right-top"),
    ("src/Scorpio_and_Libra.jpg", 0.30, 0.40, 0.95, 0.98, "SCO lower-right"),
]

for path, fx0, fy0, fx1, fy1, label in TESTS:
    print(f"\n===== {label} =====")
    old_argv = sys.argv
    sys.argv = ["x", "/opt/data/solar-system-3d/assets/constellation-figures/" + path,
                str(fx0), str(fy0), str(fx1), str(fy1), "150", "40", "1"]
    spec.loader.exec_module.__self__ if False else None
    # re-exec module body with new argv: simplest is to run main via fresh import
    try:
        with contextlib.redirect_stdout(io.StringIO()) as buf:
            # exec fresh to reset module state with new argv
            g = {"__name__": "__main__", "__file__": "/opt/data/solar-system-3d/assets/constellation-figures/isolate_win.py"}
            sys.argv = ["x", "/opt/data/solar-system-3d/assets/constellation-figures/" + path,
                        str(fx0), str(fy0), str(fx1), str(fy1), "150", "40", "1"]
            exec(open("/opt/data/solar-system-3d/assets/constellation-figures/isolate_win.py").read(), g)
    finally:
        sys.argv = old_argv
