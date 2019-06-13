<?php

namespace App\Controller;

use App\Entity\HistoryArticle;
use App\Entity\ReadLaterArticle;
use App\Repository\HistoryArticleRepository;
use App\Repository\ReadLaterArticleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

//All controllers that comes from route /api/* will be first authenticated
class ArticleController extends AbstractController
{
    /**
     * @Route("api/article/saveHistoryArticle", name="api_article_save", methods={"POST"})
     * Method to save article that has been read by the registered user
     */
    public function saveHistoryArticle(Request $request, EntityManagerInterface $em)
    {
        //Get the user id from token
        $user = $this->getUser();
        //Get the content from the given json
        $data = json_decode($request->getContent(),true);

        $source_id = $data["source"]["id"];
        $source_name = $data["source"]["name"];
        $author = $data["author"];
        $url = $data["url"];
        $urlToImage = $data["urlToImage"];
        $publishedAt = $data["publishedAt"];
        $content = $data["content"];
        date_default_timezone_set('Europe/Brussels');

        //Save the article using orm doctrine functions
        try{
            $article = new HistoryArticle();

            $article
                ->setSourceId($source_id)
                ->setSourceName($source_name)
                ->setAuthor($author)
                ->setUrl($url)
                ->setUrlToImage($urlToImage)
                ->setPublishedAt($publishedAt)
                ->setContent($content)
                ->setAddedAt(new \DateTime())
                ->setUser($user);
                if (isset($data["description"])) {
                    $article->setDescription($data["description"]);
                } elseif (!isset($data["description"])) {
                    $article->setDescription('No description!');
                }
                if (isset($data["title"])) {
                    $article->setTitle($data["title"]);
                } elseif (!isset($data["title"])) {
                    $article->setDescription('No title!');
                }
            $em->persist($article);
            $em->flush();
        } catch (\Exception $exception) {
            return new JsonResponse([
                "error" => $exception->getMessage()
            ], 500);
        }
        return new JsonResponse([
            "success" => "The article '" .$article->getTitle(). "' has been saved!"
        ], 200);
    }

    /**
     * @Route("api/article/saveReadLaterArticle", name="api_read_later_article_save", methods={"POST"})
     * Controller to save article to read later, by the registered user
     */
    public function saveReadLaterArticle(Request $request, EntityManagerInterface $em)
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(),true);
        date_default_timezone_set('Europe/Brussels');

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
            $article = new ReadLaterArticle();

            $article
                ->setSourceId($source_id)
                ->setSourceName($source_name)
                ->setAuthor($author)
                ->setUrl($url)
                ->setUrlToImage($urlToImage)
                ->setPublishedAt($publishedAt)
                ->setContent($content)
                ->setAddedAt(new \DateTime())
                ->setUser($user);
                if (isset($data["description"])) {
                    $article->setDescription($data["description"]);
                } elseif (!isset($data["description"])) {
                    $article->setDescription('No description!');
                }
                if (isset($data["title"])) {
                    $article->setTitle($data["title"]);
                } elseif (!isset($data["title"])) {
                    $article->setDescription('No title!');
                }
            $em->persist($article);
            $em->flush();
        } catch (\Exception $exception) {
            return new JsonResponse([
                "error" => $exception->getMessage()
            ], 500);
        }
        return new JsonResponse([
            "success" => "The article '" .$article->getTitle(). "' has been saved!"
        ], 200);
    }

    /**
     * @Route("/api/article/getHistoryArticles")
     * @return JsonResponse
     * Controller to get all read articles from the database
     * Will send the results to frontend  in json format
     */
    public function getHistoryArticles(HistoryArticleRepository $historyArticleRepository)
    {
        return new JsonResponse([
        "article" => $historyArticleRepository->findArticleById($this->getUser()->getId())
        ], 200);
    }

    /**
     * @Route("/api/article/deleteHistoryArticle/{id}")
     * Controller to delete article from 'history' db with the given id
     */
    public function deleteHistoryArticle(EntityManagerInterface $em, HistoryArticleRepository $historyArticleRepository, $id)
    {
        try{
            $article = $historyArticleRepository->findOneBy(['id' => $id]);
            $em->remove($article);
            $em->flush();
        } catch (\Exception $exception) {
            return new JsonResponse([
                "error" => $exception->getMessage()
            ], 500);
        }
        return new JsonResponse([
            "success" => 'The article has been deleted!'
        ], 200);
    }

    /**
     * @Route("/api/article/getReadLaterArticles")
     * @return JsonResponse
     * Controller to get all saved 'read later' articles from the database
     * Will send the results to frontend  in json format
     */
    public function getReadLaterArticles(ReadLaterArticleRepository $readLaterArticleRepository)
    {
        return new JsonResponse([
        "article" => $readLaterArticleRepository->findArticleById($this->getUser()->getId())
        ], 200);
    }

    /**
     * @Route("/api/article/deleteReadLaterArticle/{id}")
     * Controller to delete article from 'read later' db with the given id
     */
    public function deleteReadLaterArticle(EntityManagerInterface $em, ReadLaterArticleRepository $readLaterArticleRepository, $id)
    {
        try{
            $article = $readLaterArticleRepository->findOneBy(['id' => $id]);
            $em->remove($article);
            $em->flush();
        } catch (\Exception $exception) {
            return new JsonResponse([
                "error" => $exception->getMessage()
            ], 500);
        }
        return new JsonResponse([
            "success" => 'The article has been deleted!'
        ], 200);
    }
}
