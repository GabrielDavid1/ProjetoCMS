import React from "react";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";

interface Propriedades {
    id: string;
    status: boolean;
}

export const UploadImagem = ({status}:Propriedades) => (
  <Uploady
    destination={{ url: "my-server.com/upload" }}
    fileFilter={filterBySize}
    accept="image/*"
  >
   {status === false ? <UploadButton />  : <> </>}
    <UploadPreview />   
  </Uploady>
);

const filterBySize = (file:any) => {
    return file.size <= 5242880;
};
