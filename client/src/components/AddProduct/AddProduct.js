import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";
import caro from './CaroUpdateSection/CaroUpdateSection'

function AddProduct() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    desci: "",
    price: 0,
    stock: 0,
    category: "",
    condition: "",
  });


  const nameHandler = () => {
    const value = document.getElementById("ProductName1").value;
    setData({
      name: value,
      desci: data.desci,
      price: data.price,
      stock: data.stock,
      category: data.category,
      condition: data.condition,
    });
  };

  const descriHandler = () => {
    const value = document.getElementById("descri1").value;
    setData({
      name: data.name,
      desci: value,
      price: data.price,
      stock: data.stock,
      category: data.category,
      condition: data.condition,
    });
  };

  const priceHandler = () => {
    const value = document.getElementById("Price1").value;
    setData({
      name: data.name,
      desci: data.desci,
      price: value,
      stock: data.stock,
      category: data.category,
      condition: data.condition,
    });
  };

  const stockHandler = () => {
    const value = document.getElementById("Stock1").value;
    setData({
      name: data.name,
      desci: data.desci,
      price: data.price,
      stock: value,
      category: data.category,
      condition: data.condition,
    });
  };

  useEffect(async () => {
    const response = await fetch(
      `http://localhost:8000/api/v1/user/me/${localStorage.getItem("token")}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    if (result.success) {
      if (result.user.role === "seller") {
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);

  const imagesToSend = [];

  const SelectorCategory = (string) => {
    setData({
      name: data.name,
      desci: data.desci,
      price: data.price,
      stock: data.stock,
      category: string,
      condition: data.condition,
    });
    const divs = document.querySelectorAll(".AddNewProductsCategory  ");
    for (let i = 0; i < divs.length; i++) {
      divs[i].style.backgroundColor = "white";
    }
    const divs2 = document.querySelectorAll(".AddNewProductsCategorya");
    for (let i = 0; i < divs2.length; i++) {
      divs2[i].style.color = "rgba(0 ,  0 , 0 , 0.5)";
    }
    document.getElementById(string).style.backgroundColor = "rgb(21, 58, 91)";
    document.getElementById(string + "a").style.color = "white";
  };

  const SelectorConditon = (string) => {
    setData({
      name: data.name,
      desci: data.desci,
      price: data.price,
      stock: data.stock,
      category: data.category,
      condition: string,
    });
    const divs = document.querySelectorAll(".AddNewProductsCondition");
    for (let i = 0; i < divs.length; i++) {
      divs[i].style.backgroundColor = "white";
    }
    const divs2 = document.querySelectorAll(".AddNewProductsConditiona");
    for (let i = 0; i < divs2.length; i++) {
      divs2[i].style.color = "rgba(0 ,  0 , 0 , 0.5)";
    }
    document.getElementById(string).style.backgroundColor = "rgb(21, 58, 91)";
    document.getElementById(string + "a").style.color = "white";
  };

  const submitHandler = async () => {
    const response = await fetch(
      "http://localhost:8000/api/v5/image/upload/single",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: previewSource1,
        }),
      }
    );
    const result = await response.json();
    if (result.success) {
      imagesToSend.push(result.url);
      const response1 = await fetch(
        "http://localhost:8000/api/v5/image/upload/single",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: previewSource2,
          }),
        }
      );
      const result1 = await response1.json();
      if (result1.success) {
        imagesToSend.push(result1.url);
        const response2 = await fetch(
          "http://localhost:8000/api/v5/image/upload/single",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: previewSource3,
            }),
          }
        );
        const result2 = await response2.json();
        if (result2.success) {
          imagesToSend.push(result2.url);
          const response3 = await fetch(
            "http://localhost:8000/api/v5/image/upload/single",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: previewSource4,
              }),
            }
          );
          const result3 = await response3.json();
          if (result3.success) {
            imagesToSend.push(result3.url);
            const response4 = await fetch(
              "http://localhost:8000/api/v5/image/upload/single",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  data: previewSource5,
                }),
              }
            );
            const result4 = await response4.json();
            if (result4.success) {
              imagesToSend.push(result4.url);
              const response5 = await fetch(
                "http://localhost:8000/api/v5/image/upload/single",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    data: previewSource6,
                  }),
                }
              );
              const result5 = await response5.json();
              if (result5.success) {
                imagesToSend.push(result5.url);
                const response6 = await fetch('http://localhost:8000/api/v5/image/upload/single' , {
                  method : "POST" ,
                  headers : {"Content-Type" : "application/json"} ,
                  body : JSON.stringify({
                    data : previewSource
                  })
                })
                const result6 = await response6.json();
                if (result6.success) {
                  const response7 = await fetch(
                    `http://localhost:8000/api/v3/seller/product/add/${localStorage.getItem(
                      "token"
                    )}`,
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: data.name,
                        description: data.desci,
                        price: data.price,
                        stock: data.stock,
                        category: data.category,
                        condition: data.condition,
                        mainPhoto: result6.url,
                        images: imagesToSend,
                      }),
                    }
                  );
                  const result7 = await response7.json();
                  if (result7.success) {
                    navigate("/");
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  const [previewSource, setpreviewSource] = useState("");
  const [previewSource1, setpreviewSource1] = useState("");
  const [previewSource2, setpreviewSource2] = useState("");
  const [previewSource3, setpreviewSource3] = useState("");
  const [previewSource4, setpreviewSource4] = useState("");
  const [previewSource5, setpreviewSource5] = useState("");
  const [previewSource6, setpreviewSource6] = useState("");

  const previewFileSource = (file) => {
    const uploadReader = new FileReader();
    uploadReader.readAsDataURL(file);
    uploadReader.onloadend = () => {
      setpreviewSource(uploadReader.result);
    };
  };

  const changeHandler = (e) => {
    const files = e.target.files[0];
    previewFileSource(files);
  };

  const previewFileSource1 = (file) => {
    const uploadReader = new FileReader();
    uploadReader.readAsDataURL(file);
    uploadReader.onloadend = () => {
      setpreviewSource1(uploadReader.result);
    };
  };

  const changeHandler1 = (e) => {
    const files = e.target.files[0];
    previewFileSource1(files);
  };

  const previewFileSource2 = (file) => {
    const uploadReader = new FileReader();
    uploadReader.readAsDataURL(file);
    uploadReader.onloadend = () => {
      setpreviewSource2(uploadReader.result);
    };
  };

  const changeHandler2 = (e) => {
    const files = e.target.files[0];
    previewFileSource2(files);
  };

  const previewFileSource3 = (file) => {
    const uploadReader = new FileReader();
    uploadReader.readAsDataURL(file);
    uploadReader.onloadend = () => {
      setpreviewSource3(uploadReader.result);
    };
  };

  const changeHandler3 = (e) => {
    const files = e.target.files[0];
    previewFileSource3(files);
  };

  const previewFileSource4 = (file) => {
    const uploadReader = new FileReader();
    uploadReader.readAsDataURL(file);
    uploadReader.onloadend = () => {
      setpreviewSource4(uploadReader.result);
    };
  };

  const changeHandler4 = (e) => {
    const files = e.target.files[0];
    previewFileSource4(files);
  };

  const previewFileSource5 = (file) => {
    const uploadReader = new FileReader();
    uploadReader.readAsDataURL(file);
    uploadReader.onloadend = () => {
      setpreviewSource5(uploadReader.result);
    };
  };

  const changeHandler5 = (e) => {
    const files = e.target.files[0];
    previewFileSource5(files);
  };

  const previewFileSource6 = (file) => {
    const uploadReader = new FileReader();
    uploadReader.readAsDataURL(file);
    uploadReader.onloadend = () => {
      setpreviewSource6(uploadReader.result);
    };
  };

  const changeHandler6 = (e) => {
    const files = e.target.files[0];
    previewFileSource6(files);
  };

  return (
    <div className="AddProduct">
      <div className="wrapper301">
        <div className="productNameAddProduct">
          <div className="productNameHeading AddProductHeading">
            Product Name
          </div>
          <div className="productNameInputTag">
            <div class="input-group">
              <input
                type="text"
                id="ProductName1"
                value={data.name}
                onChange={() => {
                  nameHandler();
                }}
                required
              />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label className="label">Name</label>
            </div>
          </div>
        </div>
        <div className="mainPhotoAddProductHeading AddProductHeading">
          Select The Primary Photo of Product
        </div>
        <div className="mainPhotoAddProduct">
          <label htmlFor="mainPhoto" className="MainPhotoLabel">
            {previewSource ? (
              <img
                src={previewSource}
                alt="change"
                className="MainPhotoImage"
              />
            ) : (
              "+"
            )}
          </label>
          <input
            type="file"
            name="mainPhoto"
            id="mainPhoto"
            onChange={changeHandler}
          />
        </div>
        <div className="caroAddProductHeading AddProductHeading">
          Select the photos for the Product
        </div>
        <div className="caroAddProduct">
        <div className="mainPhotoAddProduct">
        <label htmlFor = {'Photo0'} className="MainPhotoLabel">
          {previewSource1 ? (
            <img src={previewSource1} alt="change" className="MainPhotoImage" />
          ) : (
            "+"
          )}
        </label>
        <input
          type="file"
          name="mainPhoto"
          id = "Photo0"
          onChange={changeHandler1}
          className = "MainPhotoInput"
        />
      </div>
      <div className="mainPhotoAddProduct">
        <label htmlFor = "Photo1" className="MainPhotoLabel">
          {previewSource2 ? (
            <img src={previewSource2} alt="change" className="MainPhotoImage" />
          ) : (
            "+"
          )}
        </label>
        <input
          type="file"
          name="mainPhoto"
          id = "Photo1"
          onChange={changeHandler2}
          className = "MainPhotoInput"
        />
      </div>
      <div className="mainPhotoAddProduct">
        <label htmlFor = "Photo2" className="MainPhotoLabel">
          {previewSource3 ? (
            <img src={previewSource3} alt="change" className="MainPhotoImage" />
          ) : (
            "+"
          )}
        </label>
        <input
          type="file"
          name="mainPhoto"
          id = "Photo2"
          onChange={changeHandler3}
          className = "MainPhotoInput"
        />
      </div>
      <div className="mainPhotoAddProduct">
        <label htmlFor = "Photo3" className="MainPhotoLabel">
          {previewSource4 ? (
            <img src={previewSource4} alt="change" className="MainPhotoImage" />
          ) : (
            "+"
          )}
        </label>
        <input
          type="file"
          name="mainPhoto"
          id = "Photo3"
          onChange={changeHandler4}
          className = "MainPhotoInput"
        />
      </div>
      <div className="mainPhotoAddProduct">
        <label htmlFor = "Photo4" className="MainPhotoLabel">
          {previewSource5 ? (
            <img src={previewSource5} alt="change" className="MainPhotoImage" />
          ) : (
            "+"
          )}
        </label>
        <input
          type="file"
          name="mainPhoto"
          id = "Photo4"
          onChange={changeHandler5}
          className = "MainPhotoInput"
        />
      </div>
      <div className="mainPhotoAddProduct">
        <label htmlFor = "Photo5" className="MainPhotoLabel">
          {previewSource6 ? (
            <img src={previewSource6} alt="change" className="MainPhotoImage" />
          ) : (
            "+"
          )}
        </label>
        <input
          type="file"
          name="mainPhoto"
          id = "Photo5"
          onChange={changeHandler6}
          className = "MainPhotoInput"
        />
      </div>
        </div>
        <div className="descriptionAddProduct">
          <div className="descriptionHeading AddProductHeading">
            Tell Us about the product
          </div>
          <div className="descriptionInputTag">
            <textarea
              id="descri1"
              value={data.desci}
              onChange={() => {
                descriHandler();
              }}
            />
          </div>
        </div>
        <div className="priceAddProduct">
          <div className="priceHeading AddProductHeading">Price</div>
          <div className="priceInputTag">
            <div class="input-group">
              <input
                type="number"
                id="Price1"
                value={data.price}
                onChange={() => {
                  priceHandler();
                }}
                required
              />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label className="label">Price</label>
            </div>
          </div>
        </div>
        <div className="stockAddProduct">
          <div className="stockHeading AddProductHeading">
            Quantity Available
          </div>
          <div className="stockInputTag">
            <div class="input-group Login">
              <input
                type="number"
                id="Stock1"
                value={data.stock}
                onChange={() => {
                  stockHandler();
                }}
                required
              />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label className="label">Quantity</label>
            </div>
          </div>
        </div>
        <div className="CategoryAddProduct">
          <div className="categoryHeading AddProductHeading">
            What is the Category of the Product
          </div>
          <div className="CategoryInputTag">
            <ul>
              <li className="AddNewProductsCategory" id="MobilePhone">
                <a
                  id="MobilePhonea"
                  className="AddNewProductsCategorya"
                  onClick={() => {
                    SelectorCategory("MobilePhone");
                  }}
                >
                  Mobile Phone
                </a>
              </li>
              <li className="AddNewProductsCategory" id="Book">
                <a
                  id="Booka"
                  className="AddNewProductsCategorya"
                  onClick={() => {
                    SelectorCategory("Book");
                  }}
                >
                  Book
                </a>
              </li>
              <li className="AddNewProductsCategory" id="Furniture">
                <a
                  id="Furniturea"
                  className="AddNewProductsCategorya"
                  onClick={() => {
                    SelectorCategory("Furniture");
                  }}
                >
                  Furniture
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="ConditionAddProduct">
          <div className="ConditionHeading AddProductHeading">
            What is the condition of the product
          </div>
          <div className="conditionInputTag">
            <ul>
              <li id="BrandNew" className="AddNewProductsCondition">
                <a
                  id="BrandNewa"
                  className="AddNewProductsConditiona"
                  onClick={() => {
                    SelectorConditon("BrandNew");
                  }}
                >
                  Brand New
                </a>
              </li>
              <li id="JustUnboxed" className="AddNewProductsCondition">
                <a
                  id="JustUnboxeda"
                  className="AddNewProductsConditiona"
                  onClick={() => {
                    SelectorConditon("JustUnboxed");
                  }}
                >
                  Just Unboxed
                </a>
              </li>
              <li id="Excellent" className="AddNewProductsCondition">
                <a
                  id="Excellenta"
                  className="AddNewProductsConditiona"
                  onClick={() => {
                    SelectorConditon("Excellent");
                  }}
                >
                  Excellent
                </a>
              </li>
              <li id="Good" className="AddNewProductsCondition">
                <a
                  id="Gooda"
                  className="AddNewProductsConditiona"
                  onClick={() => {
                    SelectorConditon("Good");
                  }}
                >
                  Good
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="submitButtonForAddingProduct">
          <a
            onClick={() => {
              submitHandler();
            }}
            className="submitButtonForAddingProducta"
          >
            Submit
          </a>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
