import React from "react";

var resultImg = [];

function ResultBox(props) {
  let result = props.results;

  for (var i = 0; i < result.length; i++) {
    if (result[i]) {
      resultImg[i] =
        "https://icon-library.net/images/success-icon/success-icon-5.jpg";
    } else {
      resultImg[i] = "https://png.pngtree.com/svg/20170918/fail_641034.png";
    }
  }

  return (
    <div class="d-flex justify-content-center">
      <img src={resultImg[0]} alt="..." class="result stage1" />
      <img src={resultImg[1]} alt="..." class="result stage2" />
    </div>
  );
}

export default ResultBox;
