#!/usr/bin/env python3
"""Zero-dependency deterministic validation of *inputs*, not a MiroFish simulation."""
import json
from pathlib import Path

here = Path(__file__).resolve().parent
d = json.loads((here / "experiment.json").read_text(encoding="utf-8"))
assert d["agent_target"]["total"] == sum(d["agent_target"]["personas"].values()) == 30
assert d["pricing_brl_per_month"] == [149, 249, 399]
assert d["max_rounds"] <= 12
assert d["max_estimated_api_spend_brl"] == 0
assert d["real_customers"] == 0
assert (here / "seed.md").is_file()
print("OK: experiment input verified; actual MiroFish simulation NOT executed.")
