namespace ComicCompanion.Models;


public class Comic 
{
    public string ComicId {get;set;}
    public string Name {get;set;}
    public string CoverImg {get;set;}
    public string[] Issues {get;set;}
}