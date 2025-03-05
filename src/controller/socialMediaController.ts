import {
  checkFacebookUrl,
  checkInstaUrl,
  checkTeraBoxUrl,
  checkYouTubeUrl,
  isValidUrl,
} from "../regex";
import { instagram, terabox, youtube, facebook } from "./media";

// export async function socialMediaCntrollerWeb(req: any, res: any) {
//   try {
//     const { link } = req.body;

//     if (!isValidUrl(link)) {
//       return res.status(200).send({ status: true, data: "invalid url" });
//     }
//     if (checkTeraBoxUrl(link)) {
//       const results = await terabox(link);
//       return res.status(200).send({ status: true, data: results });
//     } else if (checkYouTubeUrl(link)) {
//       const results = await youtube(link);

//       return res.status(200).send({ status: true, data: results });
//     } else if (checkInstaUrl(link)) {
//       const results = await instagram(link);
//       return res.status(200).send({ status: true, data: results });
//     } else if (checkFacebookUrl(link)) {
//       const results = await facebook(link);
//       return res.status(200).send({ status: true, data: results });
//     } else {
//       return res.status(400).send({ status: true, data: "unknown url" });
//     }
//   } catch (error) {
//     console.log("error in bot function:-", error);
//   }
// }

export async function socialMediaController(link: string) {
  try {
    if (!isValidUrl(link)) {
      return { status: true, data: "invalid url" };
    }
    if (checkTeraBoxUrl(link)) {
      const results = await terabox(link);
      return { status: true, data: results,platform: "terabox" };
    } else if (checkYouTubeUrl(link)) {
      const results = await youtube(link);
      return { status: true, data: results, platform: "youtube" };
    } else if (checkInstaUrl(link)) {
      const results = await instagram(link);
      return { status: true, data: results, platform: "instagram" };
    } else if (checkFacebookUrl(link)) {
      const results = await facebook(link);
      return { status: true, data: results,platform: "facebook" };
    } else {
      return { status: true, data: "unknown url" };
    }
  } catch (error) {
    console.log("error in bot function:-", error);
  }
}
