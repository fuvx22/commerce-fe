export const convertUrlToFile = async (url: string, fileType: string) => {
  const fileName = "avatar.jpg";

  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], fileName, { type: fileType });
};

export const calculateDiscountPrice = (price: number, discount: number) => {
  return price - (price * discount) / 100;
};
