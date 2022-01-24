using API.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FoldersController : Controller
{
    [HttpGet]
    public ActionResult GetFolders(string path)
    {
        var folders = new List<Folder>();

        if (path == null)
        {
            foreach (var d in DriveInfo.GetDrives())
                folders.Add(new Folder(d.Name, d.Name));
        }
        else if (Directory.Exists(path))
        {
            foreach (var f in new DirectoryInfo(path).GetDirectories().Where(f => !f.Attributes.HasFlag(FileAttributes.Hidden)))
                folders.Add(new Folder(f.Name, f.FullName));
        }

        return Ok(folders);
    }

    [HttpPost]
    public ActionResult CreateFoldersByJson(JsonRequest jsonRequest)
    {
        JsonFolders jsonFolders = JsonConvert.DeserializeObject<JsonFolders>(jsonRequest.JsonString);
        CreateFoldersByPath(jsonFolders, jsonRequest.FullPath.Replace(@"\\", @"\"));
        return Ok();
    }

    private void CreateFoldersByPath(JsonFolders node, string currentFullPath)
    {
        if (node.Name != "")
        {
            DirectoryInfo directoryInfo = new DirectoryInfo(currentFullPath + @"\" + node.Name);
            if (!directoryInfo.Exists) 
                directoryInfo.Create();
        }

        if (node.Childs.Count > 0)
            foreach (var dir in node.Childs)
                CreateFoldersByPath(dir, currentFullPath + @"\" + node.Name);
    }
}