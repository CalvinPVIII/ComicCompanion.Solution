import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getErrorMessage } from "../../helpers/helperFunctions";
import { userSelector } from "../../redux/store";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";
import { ReadingListWithUserInfoAPIResponse, ReadingListAPIResponse, ReadingListDto } from "../../types";
import ReadingListInfo from "../Utility/ReadingListInfo";
import { useParams } from "react-router-dom";
import { Alert } from "@mui/material";
import Loading from "../Utility/Loading";

type ReadingListUserInfo = {
  favorite: boolean;
  rating: boolean | null;
};

export default function SharedReadingListInfoPage() {
  const { listId } = useParams();
  const currentUser = useSelector(userSelector);
  const [apiResult, setApiResult] = useState<ReadingListDto | null>(null);
  const [userInfo, setUserInfo] = useState<ReadingListUserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        if (!listId) return;
        let readingList = await ComicCompanionAPIService.getReadingList(listId, currentUser?.token);
        if (readingList.status === "error") {
          throw new Error(readingList.data as unknown as string);
        }
        if (currentUser) {
          readingList = readingList as ReadingListWithUserInfoAPIResponse;
          setApiResult(readingList.data.list);
          setUserInfo(readingList.data.userInfo);
        } else {
          readingList = readingList as ReadingListAPIResponse;
          setApiResult(readingList.data);
        }
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        setError(errorMessage);
      }
      setLoading(false);
    };
    getData();
  }, [listId]);

  const handleRateReadingList = async (rating: boolean) => {
    if (!currentUser || !apiResult || !userInfo) return;
    if (currentUser.userId === apiResult.userId) {
      // alert popup
      return;
    }
    const response = await ComicCompanionAPIService.rateReadingList(apiResult.readingListId, rating, currentUser.token);
    if (userInfo.rating === rating) {
      setUserInfo({ ...userInfo, rating: null });
    } else {
      setUserInfo({ ...userInfo, rating: rating });
    }
    setApiResult(response.data.content);
  };
  return (
    <>
      {apiResult ? (
        <div className="readinglist-info-page">
          <ReadingListInfo readingList={apiResult} userInfo={userInfo} rateReadingList={handleRateReadingList} />
        </div>
      ) : !loading && error ? (
        <>
          <Alert severity="error">{error} </Alert>
        </>
      ) : loading ? (
        <Loading />
      ) : (
        <></>
      )}
    </>
  );
}
