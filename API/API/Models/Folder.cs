namespace API.Models;

public class Folder
{
    public Folder(string name, string fullPath) 
    {
        Name = name;
        FullPath = fullPath;
    }

    public string Name { get; private set; }
    public string FullPath { get; private set; }
}