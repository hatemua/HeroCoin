import React, { useEffect } from "react";
import { Modal } from "bootstrap";

//import WalletConnect from "@walletconnect/client";
//import QRCodeModal from "@walletconnect/qrcode-modal";

function ExchangeModal(props) {
  useEffect(() => {
    if (props.show) {
      const modal = new Modal(document.getElementById("exchangeActionSheet"), {
        keyboard: false,
      });
      modal.show();
    }

    return () => {
      props.onClose();
    };
  }, [props.show]);
  /*
  const connectWalletProcess = async () => { //TODO: implement
 
    console.log("ok");
      
    const connectorV = new WalletConnect({
    bridge: "https://bridge.walletconnect.org", // Required
    qrcodeModal: QRCodeModal,
      });
     if (!connectorV.connected) {
        // create new session
        connectorV.createSession();
        connectorV.on("connect", (error, payload) => {
        if (error) {
        throw error;
        }
         
        // Get provided accounts and chainId
        const { accounts, chainId } = payload.params[0];
        setWorM("WC");
        setWallet(accounts);
       });
       }
       setConnector(connectorV);
   
   };
   const connectWalletPressedWC = async () => { //TODO: implement
         handleClose();
      const a= await connectWalletProcess();
      
      };
*/
  return (
    <div
      className="modal fade action-sheet"
      id="exchangeActionSheet"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn btn-primary btn-block btn-lg"
              data-bs-dismiss="modal"
              //onClick={() => connectWalletPressedWC()}
            >
              Connect Wallet
            </button>
            <h5 className="modal-title">Exchange</h5>
          </div>
          <div className="modal-body">
            <div className="action-sheet-content">
              <form>
                <div className="form-group basic">
                  <div className="input-wrapper">
                    <label className="label" for="account2d">
                      Select Field Label
                    </label>
                    <select
                      className="form-control custom-select"
                      id="account2d"
                    >
                      <option value="0">Celo</option>
                      <option value="1">cusd</option>
                    </select>
                  </div>
                </div>

                <div className="form-group basic">
                  <label className="label">Amount</label>
                  <div className="input-group mb-2">
                    <span className="input-group-text" id="basic-addonb1">
                      $
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter an amount"
                      value=""
                    />
                  </div>
                </div>

                <div className="form-group basic">
                  <button
                    type="button"
                    className="btn btn-primary btn-block btn-lg"
                    data-bs-dismiss="modal"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExchangeModal;
