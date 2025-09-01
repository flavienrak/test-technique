/* 
----------------------------
1. Organisation des données
----------------------------

Créer une collection conversations,
chaque doc représentant une conversation unique entre deux utilisateurs.

Un doc va être identifié par une clé unique
(conversationId = userAId_userBId trié alphabétiquement pour éviter les doublons).

= conversations/{conversationId} =

{
participants: ["userA", "userB"],
  lastMessage: {
    text: "Salut !",
    senderId: "userA",
    receiverId: "userB",
    timestamp: 2025-09-01T10:00:00Z
  },
  updatedAt: 2025-09-01T10:00:00Z
}

Et dans une sous-collection messages de cette conversation, on stocke l’historique complet :

= conversations/{conversationId}/messages/{messageId} =

---------------------
2. Requêtes efficaces
---------------------

Pour afficher la liste des conversations d’un utilisateur avec le dernier message :

db.collection("conversations")
  .where("participants", "array-contains", userId)
  .orderBy("updatedAt", "desc");

Retourne directement toutes les conversations d’un utilisateur avec le dernier message déjà inclus

----------------------------------------------
3. Mise à jour automatique du dernier message
----------------------------------------------

À chaque envoi de message, ajouter le message dans :

= conversations/{conversationId}/messages =


Mettre à jour lastMessage + updatedAt dans le document :

= conversations/{conversationId} =


Ceci peut être fait côté client (transaction) ou via Cloud Function onCreate sur messages.


-------------
4. Indexation
-------------

Index automatique Firestore : participants (array-contains) + updatedAt

--------------------------
 Pourquoi c’est efficace ?
--------------------------

Pas besoin de N requêtes (1 par conversation). 
Une seule requête ramène toutes les conversations avec leur dernier message.

Scalable : même si un utilisateur a +1 000 messages dans une conversation, 
           on ne récupères que le champ lastMessage (1 document par conversation).

Ordonné : grâce à updatedAt, les conversations sont listées dans l’ordre chronologique 

Avec une indexation adaptée qui permet de garder les requêtes performantes.

*/
