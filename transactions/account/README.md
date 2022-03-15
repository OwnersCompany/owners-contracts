
# Generate multisignature account

## Generate new keys pair

```console
flow keys generate
```

```console
🔴️ Store private key safely and don't share with anyone! 
Private Key      15fa6720a2f72cd682738e742a319dee28c689aea3df573c53c65d8e28b2af01 
Public Key       eb0ec6dabd0fdce2e72bf195efa07e70117afd336f7523901f4d8030a58a30fb8cc148eb4ef3c03fba028a84cd576febd4c7bcaa3a456f68e68a55050af3241d
```

## Get UInt array from the generated public key

```console
node cadence/transactions/account/hex-to-uint-array.js eb0ec6dabd0fdce2e72bf195efa07e70117afd336f7523901f4d8030a58a30fb8cc148eb4ef3c03fba028a84cd576febd4c7bcaa3a456f68e68a55050af3241d
```

```consosle
Uint8Array(64) [
  235,  14, 198, 218, 189,  15, 220, 226, 231,  43, 241,
  149, 239, 160, 126, 112,  17, 122, 253,  51, 111, 117,
   35, 144,  31,  77, 128,  48, 165, 138,  48, 251, 140,
  193,  72, 235,  78, 243, 192,  63, 186,   2, 138, 132,
  205,  87, 111, 235, 212, 199, 188, 170,  58,  69, 111,
  104, 230, 138,  85,   5,  10, 243,  36,  29
]
```

## Create new flow account
