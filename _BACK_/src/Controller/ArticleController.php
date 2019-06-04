<?php

namespace App\Controller;

use App\Entity\Article;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ArticleController extends AbstractController
{
    /**
     * @Route("api/saveArticle", name="api_article_save", methods={"POST"})
     */
    public function saveArticle(Request $request, EntityManagerInterface $em)
    {
        $data = json_decode($request->getContent(),true);

        $source_id = $data["source"]["id"];
        $source_name = $data["source"]["name"];
        $author = $data["author"];
        $title = $data["title"];
        $description = $data["description"];
        $url = $data["url"];
        $urlToImage = $data["urlToImage"];
        $publishedAt = $data["publishedAt"];
        $content = $data["content"];

        try{
            $article = new Article();

            $article
                ->setSourceId($source_id)
                ->setSourceName($source_name)
                ->setAuthor($author)
                ->setTitle($title)
                ->setDescription($description)
                ->setUrl($url)
                ->setUrlToImage($urlToImage)
                ->setPublishedAt($publishedAt)
                ->setContent($content);
            $em->persist($article);
            $em->flush();
//            dd($article);
        } catch (\Exception $exception) {
            return new JsonResponse([
                "error" => $exception->getMessage()
            ], 500);
        }
        return new JsonResponse([
            "success" => "The article '" .$article->getTitle(). "' has been saved!"
        ], 200);
    }
}
