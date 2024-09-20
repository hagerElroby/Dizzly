"use client";

import { useRef, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { centerCrop, makeAspectCrop, convertToPixelCrop, Crop } from "react-image-crop";
import setCanvasPreview from "./setCanvasPreview";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;
const MAX_FILE_SIZE = 200 * 1024;

const Page = () => {
  const avatarUrl = useRef<string>("https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [crop, setCrop] = useState<Crop | undefined>(undefined);
  const [error, setError] = useState<string>("");
  const [zoom, setZoom] = useState<number>(1);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const updateAvatar = (imgSrc: string) => {
    avatarUrl.current = imgSrc;
  };

  const closeModal = () => {
    setModalOpen(false);
    setImgSrc("");
    setCrop(undefined);
    setError("");
    setZoom(1);
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget as HTMLImageElement;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height } = e.currentTarget as HTMLImageElement;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop(
      { unit: "%", width: cropWidthInPercent },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const getResizedImage = (canvas: HTMLCanvasElement) => {
    return new Promise<string | ArrayBuffer | null>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            if (blob.size <= MAX_FILE_SIZE) {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = () => {
                resolve(reader.result);
              };
            } else {
              const compressionRatio = MAX_FILE_SIZE / blob.size;
              const tempCanvas = document.createElement('canvas');
              const ctx = tempCanvas.getContext('2d');
              if (!ctx) return;
              tempCanvas.width = canvas.width * compressionRatio;
              tempCanvas.height = canvas.height * compressionRatio;
              ctx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);
              tempCanvas.toBlob((compressedBlob) => {
                if (compressedBlob) {
                  const reader = new FileReader();
                  reader.readAsDataURL(compressedBlob);
                  reader.onloadend = () => {
                    console.log("Compressed image size: ", (compressedBlob.size / 1024) + "KB");
                    resolve(reader.result);
                  };
                } else {
                  resolve(null);
                }
              }, 'image/jpeg');
            }
          } else {
            resolve(null);
          }
        },
        "image/jpeg", 0.8
      );
    });
  };

  const handleCropComplete = async () => {
    if (!crop || !imgRef.current || !previewCanvasRef.current) return;

    setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(
        crop,
        imgRef.current.width,
        imgRef.current.height
      )
    );

    const resizedImage = await getResizedImage(previewCanvasRef.current);
    updateAvatar(resizedImage as string);
    closeModal();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md mt-6 min-h-[80vh]">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h1>
      <div className="flex justify-center items-center pt-12">
        <div className="relative inline-block">
          <img src={avatarUrl.current} alt="Avatar" className="w-36 h-36 rounded-full border-2 border-gray-300" />
          <button onClick={() => setModalOpen(true)} className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 border border-gray-600 text-white rounded-full p-2 cursor-pointer hover:bg-gray-600">
            <i className="fa fa-pencil"></i>
          </button>
        </div>
        {modalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-[70vw] h-[70vh] max-w-2xl max-h-[70vh]">
              <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                <i className="fa fa-times"></i>
              </button>
              <label className="block mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onSelectFile}
                  className="hidden"
                />
                <span className="block text-blue-500 cursor-pointer">Choose a file</span>
              </label>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {imgSrc && (
                <div className="relative">
                  <ReactCrop
                    crop={crop}
                    onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                    circularCrop
                    keepSelection
                    aspect={ASPECT_RATIO}
                    minWidth={MIN_DIMENSION}
                  >
                    <img ref={imgRef} src={imgSrc} alt="Upload" onLoad={onImageLoad} className="w-full h-auto object-cover" />
                  </ReactCrop>

                  <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    onClick={handleCropComplete}
                  >
                    Crop Image
                  </button>
                </div>
              )}
              {crop && (
                <canvas
                  ref={previewCanvasRef}
                  className="hidden"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
