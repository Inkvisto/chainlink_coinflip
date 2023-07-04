// Modifies `artifacts.require(X)` so that instead of X it loads the XUpgradeable contract.
// This allows us to run the same test suite on both the original and the transpiled and renamed Upgradeable contracts.
import { extendEnvironment } from 'hardhat/config';
import {HardhatError}  from 'hardhat/internal/core/errors';


extendEnvironment((hre) => {
    const artifactsRequire = hre.artifacts.require;
  
    hre.artifacts.require = name => {
      for (const suffix of ['UpgradeableWithInit', 'Upgradeable', '']) {
        try {
          return artifactsRequire(name + suffix);
        } catch (e) {
          // HH700: Artifact not found - from https://hardhat.org/hardhat-runner/docs/errors#HH700
          if (HardhatError.isHardhatError(e) && e.number === 700 && suffix !== '') {
            continue;
          } else {
            throw e;
          }
        }
      }
      throw new Error('Unreachable');
    };
  });