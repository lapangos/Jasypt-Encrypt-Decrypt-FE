import axios from "axios";
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

const filter = createFilterOptions();

class ReactSelect extends Component {
  constructor() {
    super();
    this.state = {
      submittedLeft: false,
      submittedRight: false,
      items: [],
      encryptedText: "",
      decryptedText: "",
    };
    this.handleLeftSubmit = this.handleLeftSubmit.bind(this);
    this.handleRightSubmit = this.handleRightSubmit.bind(this);
  }

  getData() {
    axios.get("https://jasypt-encrypt-decrypt.herokuapp.com/getAlgorithm").then((res) => {
      var data = res.data.algorithm;
      this.setState({ items: data });
    });
  }

  componentDidMount() {
    this.getData();
  }

  handleLeftSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    if (!data.get("plainText") || !data.get("secretKey")) {
      alert("Missing required fields.");
    } else {
      var jasyptRequest = {
        plainText: data.get("plainText"),
        password: data.get("secretKey"),
        algorithm: data.get("algorithm"),
      };

      axios
        .post("https://jasypt-encrypt-decrypt.herokuapp.com/getEncryptedText", jasyptRequest)
        .then((res) => {
          var data = res.data.encryptedString;
          this.setState({
            submittedLeft: true,
            encryptedText: data,
          });
        })
        .catch((res) => {
          console.log("error msg: " + res);
          this.setState({
            submittedLeft: true,
            encryptedText: "Encryption Not possible",
          });
        });
    }
  }

  handleRightSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    if (!data.get("plainText") || !data.get("secretKey")) {
      alert("Missing required fields.");
    } else {
      var jasyptRequest = {
        plainText: data.get("plainText"),
        password: data.get("secretKey"),
        algorithm: data.get("algorithm"),
      };

      axios
        .post("https://jasypt-encrypt-decrypt.herokuapp.com/getDecryptedText", jasyptRequest)
        .then((res) => {
          var data = res.data.decryptedString;
          this.setState({
            submittedRight: true,
            decryptedText: data,
          });
        })
        .catch((res) => {
          console.log("error msg: " + res);
          this.setState({
            submittedRight: true,
            decryptedText: "Not a valid encrypted String or secret Key",
          });
        });
    }
  }

  render() {
    return (
      <div className="mainContainer" style={mainContainer}>
        <div className="header" style={header}>
          Online Jasypt Encryption & Decryption
        </div>
        <div className="paragraph" style={paragraph}>
          {"    "}Jasypt stands for{" "}
          <span
            class="str"
            style={str}
            onClick={() => window.open("http://www.jasypt.org/", "_blank")}
          >
            Java Simplified Encryption
          </span>
          .It provides basic encryption of plain-text, numbers, binaries to
          secure confidential data.It is completely thread safe and provides
          high performance in multi-processor too. Jasypt provides simpler ways
          to encrypt and decrypt text and it does not require any deep knowledge
          of cryptography to get started with it.Simply, feed a plain text that
          you want to encrypt and Jasypt will do the rest of calculation and
          result an encrypted text for you.This kind of encryption is one-way
          encryption.It also provides two way encryption mechanism. While
          implementing two-way encryption, apart from feeding plain-text you
          also require to feed the secret text and this secret text can be used
          to decrypt the encrypted text.
        </div>
        <div
          className="paragraph"
          style={(paragraph, { padding: "14px 40px" })}
        >
          {"    "}By default, Jasypt uses{" "}
          <span
            class="str"
            style={str}
            onClick={() =>
              window.open("https://en.wikipedia.org/wiki/MD5", "_blank")
            }
          >
            PBEWithMD5AndDES
          </span>{" "}
          encryption algorithm but it provides options to select other stronger
          encryption options too such as{" "}
          <span
            class="str"
            style={str}
            onClick={() =>
              window.open("https://en.wikipedia.org/wiki/Triple_DES", "_blank")
            }
          >
            PBEWithMD5AndTripleDES
          </span>{" "}
          The free Jasypt Online Encryption and Decryption tool below provides
          option for one way as well two way(simple) encryption and
          decryption.It also provides option to compare a plain text with Jasypt
          encrypted password.
        </div>
        <div className="floatContainer" style={floatContainer}>
          <div className="leftContainer" style={floatChild}>
            <div className="floatChildLeft" style={floatChildLeft}>
              <form onSubmit={this.handleLeftSubmit}>
                <TextField
                  style={inputField}
                  label="Enter the Plain Text"
                  variant="outlined"
                  name="plainText"
                />
                <br />
                <TextField
                  style={inputField}
                  label="Enter the Secret Key"
                  variant="outlined"
                  name="secretKey"
                />
                <br />
                <Autocomplete
                  filterOptions={(items, params) => {
                    const filtered = filter(items, params);
                    if (params.inputValue !== "") {
                      filtered.push(`Add "${params.inputValue}"`);
                    }
                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  options={this.state.items}
                  renderOption={(option) => option}
                  style={inputAlgorithm}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Enter the Algorithm"
                      variant="outlined"
                      name="algorithm"
                    />
                  )}
                />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button style={button}>Submit</button>
                </div>
              </form>
              <div>
                <p style={{ textAlign: "center" }}>Encrypted String </p>
                <p style={outputString} placeholder="Encrypted String">
                  {this.state.submittedLeft ? this.state.encryptedText : ""}
                </p>
              </div>
            </div>
          </div>
          <div className="rightContainer" style={floatChildRight}>
            <div className="floatChildLeft" style={floatChildLeft}>
              <form onSubmit={this.handleRightSubmit}>
                <TextField
                  style={inputField}
                  label="Enter the Plain Text"
                  variant="outlined"
                  name="plainText"
                />
                <br />
                <TextField
                  style={inputField}
                  label="Enter the Secret Key"
                  variant="outlined"
                  name="secretKey"
                />
                <br />
                <Autocomplete
                  filterOptions={(items, params) => {
                    const filtered = filter(items, params);
                    if (params.inputValue !== "") {
                      filtered.push(`Add "${params.inputValue}"`);
                    }
                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  options={this.state.items}
                  renderOption={(option) => option}
                  style={inputAlgorithm}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Enter the Algorithm"
                      variant="outlined"
                      name="algorithm"
                    />
                  )}
                />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button style={button}>Submit</button>
                </div>
              </form>
              <div>
                <p style={{ textAlign: "center" }}>Decrypted String </p>
                <p style={outputString} placeholder="Decrypted String">
                  {this.state.submittedRight ? this.state.decryptedText : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mainContainer = {
  color: "black",
  backgroundColor: "lightblue",
  padding: "10px",
  fontFamily: "Arial",
  // height: "100%",
  width: "intrinsic",
  flexDirection: "row",
  justifyContent: "space-between",
};

const header = {
  color: "black",
  fontWeight: "bold",
  fontSize: 39,
  textAlign: "center",
  margin: "20px 0px 0px 0px",
};

const floatContainer = {
  margin: "0px 10px 0px 0px",
  // border: "3px solid #fff",
  padding: "10px",
  display: "flex",
};

const floatChild = {
  flex: 1,
  float: "left",
  padding: "10px",
  // border: "2px solid red",
  borderRight: "3px solid #2C0EA5",
};
const floatChildLeft = {
  flex: 1,
  width: "50%",
  float: "left",
  padding: "10px",
  marginLeft: "100px",
  // border: "2px solid red",
  // borderRight: "3px solid #2C0EA5",
};

const floatChildRight = {
  flex: 1,
  // width: "100%",
  float: "left",
  padding: "10px",
};

const paragraph = {
  padding: "40px",
  fontSize: 16,
};

const inputField = {
  marginTop: 10,
  fontSize: 16,
  color: "#E0E0E0",
};

const button = {
  marginTop: 20,
  itemAlign: "center",
  backgroundColor: "blue",
  color: "white",
  fontSize: "16px",
};

const outputString = {
  background: "#E0E0E0",
  height: "40px",
  border: "1px solid #A0A0A0",
  borderRadius: 5,
  width: "120%",
};

const inputAlgorithm = {
  // width: "50%",
  marginTop: 10,
  fontSize: 16,
  color: "#E0E0E0",
};

const str = {
  color: "#080",
  fontWeight: "bold",
  cursor: "pointer",
};

export default ReactSelect;
