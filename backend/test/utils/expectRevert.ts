import { expect } from 'chai'
async function expectException(promise: Promise<Error>, expectedError: string) {

    try {
      await promise;
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.indexOf(expectedError) === -1) {
          const actualError = error.message.replace(
            /Returned error: VM Exception while processing transaction: (revert )?/,
            '',
          );
          
          expect(actualError).to.equal(expectedError, 'Wrong kind of exception received');
        }
        return;
      }
    }
  
    expect.fail('Expected an exception but none was received');
  }

export const expectRevert = async (promise: Promise<any>, expectedError: string) => {
    promise.catch(() => { });
  
    if (!expectedError) {
      throw Error('No revert reason specified: call expectRevert with the reason string, or use expectRevert.unspecified \
  if your \'require\' statement doesn\'t have one.');
    }
  
    await expectException(promise, expectedError);
  };