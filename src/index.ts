import WebUSBController from './WebUSBController';

(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    const Controller = new WebUSBController();
    const textDecoder = new TextDecoder('utf-8');
    const $connectArea =
      document.querySelector<HTMLDivElement>('#connect-area');
    const $connectButton =
      document.querySelector<HTMLButtonElement>('#connect');
    const $connectButtonSkip =
      document.querySelector<HTMLButtonElement>('#connect-skip');
    const $status = document.querySelector<HTMLButtonElement>('#status');

    /**
     * Methods
     */

    /**
     * Setup
     */

    $connectButton.addEventListener('click', async () => {
      await Controller.connect({ filters: [{ vendorId: 0x2e8a }] });
    });

    $connectButtonSkip.addEventListener('click', async () => {
      $connectArea.style.display = 'none';
    });

    Controller.onReceive((data) => {
      if (data.byteLength === 1 && data.getInt8(0) === 1) {
        $status.innerText = 'PRESSED';
      } else if (data.byteLength === 1) {
        $status.innerText = 'NOT PRESSED';
      } else {
        console.log('received', { data, decoded: data.getInt8(0) });
      }
    });

    Controller.onDeviceConnect((device) => {
      console.log({ device });
      if (device) {
        $connectArea.style.display = 'none';
      } else {
        $connectArea.style.display = 'flex';
      }
    });
  });
})();
