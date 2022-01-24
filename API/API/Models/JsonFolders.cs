namespace API.Models;

public class JsonFolders
{
    public string Name { get; set; }
    public string FullPath { get; set; }
    public List<JsonFolders> Childs { get; set; } = new List<JsonFolders>();
}