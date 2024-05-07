import Pupppeteer from "../Puppeteer/Puppeteer";
import { Request, Response } from "express";

class DataController {

  static async refreshVenueData(request: Request, response: Response) {
       Pupppeteer.scrapePeerspace();
       return response.status(202).json({
         message: `images processing started.`,
       });
  }
}

export default DataController;
