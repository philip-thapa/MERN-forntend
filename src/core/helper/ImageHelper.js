import React from "react";
import { API } from "../../backend";
import "./ImageHelper.css";

const ImageHelper = ({ product }) => {
  const imageURL = product
    ? `${API}product/photo/${product._id}`
    : `https://lh3.googleusercontent.com/KdJb6O3AlNcHXYpN16mf38N5tPQHjJOkEOwB4aVive1dHag1WP_05JXeYi-Y7KBg9TM2BqmQjmDxlWBqFJprLl7donGPBoRUGDUfSUre2gDIKk2B2FbFaTxlshSlhWM4Zb7ZTybA55r7Qir9RaJeP0dq30lJX2k_lA0mPux9BZqOyyqpg63ycC4cswFEOnqEmk3uHgWSxUz06R8zhmC7Fa30xiLcBd7kEHPSgm0l7i4WSudbLQjE4VFrvhVtD-c2esd3DOKjOVtrYxuXOHCfbWLJqOuYs6fbTPAzmStx5jfhYVJ7gZcwTz4-pgtxq4wL-8d68GzcgaMkgoyjQ0AedZrWKYzHRW2O3cKuqjM2cZbnSqQGNtMVkxyOBXf08uEGbhIxxQh8_v_RJp4KDYoA5BJxwwDJx_4CWUzFzs_swq1CvtLiH9GxZ_crvU0LyQupukYo97lslWVEgP4gq2v1LvvbgFNTIWJSunYWw-Avz8kgQj34PL7wJ9QTnchr8tGMlfiUn1g3nzy2jj1Zp_xIa1IbJ0_ZpNVMLRUn-6hq1G8vEdElTM7-Fnz_c_w0QCqD3Nhjen7Xl47bkNopP_Zm-7W0FVsasaCskiiJogR01x9AsUQPFVjD6utBixUywmBXiDUTYo8llGin7-_GPTuEYlguQeD6rabJ2E6zpBkZbDlQDzQ4EoByQarOpufC=w888-h1578-no?authuser=0`;
  return (
    <div>
      <img
        src={imageURL}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="img-fluid d-block mx-auto mb-3 imageHelper__img"
      />
    </div>
  );
};

export default ImageHelper;
